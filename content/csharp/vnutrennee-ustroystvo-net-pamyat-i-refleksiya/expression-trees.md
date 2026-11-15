---
title: Expression Trees
keywords: Expression Trees, деревья выражений C#, System.Linq.Expressions, динамическая компиляция, ExpressionVisitor, IQueryable и AST, метапрограммирование .NET, генерация делегатов
---

# Expression Trees: деревья выражений и генерация кода

Как превратить лямбда-выражение в структуру данных для трансляции в SQL, собрать фильтр динамически по имени свойства из строки и скомпилировать его в быстрый делегат без рефлексии?

Обычный делегат `Func<T, bool>` компилируется в исполняемый IL-код, внутрь которого программа заглянуть не может. Когда же лямбду присваивают типу `Expression<Func<T, bool>>` из пространства имён `System.Linq.Expressions`, компилятор вместо машинного кода строит **дерево выражений** (*Expression Tree* / абстрактное синтаксическое дерево — AST), где каждый узел представляет операцию, свойство, параметр или константу. Этот механизм лежит в основе `IQueryable<T>` (позволяя Entity Framework Core переводить C#-запросы в SQL), а также позволяет в рантайме конструировать новые выражения с помощью фабричных методов класса `Expression` и компилировать их через `.Compile()` в полноценные делегаты, работающие на нативной скорости.

## Основные узлы и фабричные методы Expression Trees

| Инструмент / узел | Синтаксис / пример | Назначение и особенности |
| --- | --- | --- |
| **`Expression<TDelegate>`** | `Expression<Func<Product, bool>> expr = p => p.Price > 100;` | Оборачивает лямбду в дерево данных (`Body`, `Parameters`) вместо компиляции в IL |
| **`Expression.Parameter`** | `var param = Expression.Parameter(typeof(Product), "p");` | Создаёт узел входного параметра (один и тот же экземпляр `param` должен использоваться во всём дереве) |
| **`Expression.Property` / `Field`** | `MemberExpression prop = Expression.Property(param, "Price");` | Строит узел обращения к свойству или полю объекта без затрат `PropertyInfo.GetValue` в цикле |
| **`Expression.Constant`** | `ConstantExpression val = Expression.Constant(100m);` | Создаёт узел литерального значения или переданной константы нужного типа |
| **`Expression.GreaterThan` / `AndAlso`** | `BinaryExpression cmp = Expression.GreaterThan(prop, val);` | Объединяет два подвыражения бинарным оператором сравнения или логическим `&&` (`AndAlso`) |
| **`Expression.Lambda<T>(...).Compile()`** | `Func<Product, bool> fastFunc = lambda.Compile();` | Генерирует IL-код на лету (`DynamicMethod`) и возвращает скомпилированный делегат нативной скорости |

## Пример кода

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

class Program
{
    static void Main()
    {
        // 1. Разбор готового Expression<T>: компилятор строит дерево узлов вместо IL-кода
        Expression<Func<Product, bool>> ruleExpr = p => p.Price >= 5000m;

        BinaryExpression binaryBody = (BinaryExpression)ruleExpr.Body;
        MemberExpression leftMember = (MemberExpression)binaryBody.Left;
        ConstantExpression rightConst = (ConstantExpression)binaryBody.Right;

        Console.WriteLine($"Исходное дерево: {ruleExpr}");
        Console.WriteLine($"  Операция: {binaryBody.NodeType} | Свойство: {leftMember.Member.Name} | Порог: {rightConst.Value}");

        // 2. Динамическая сборка фильтра p => p.Price > 3000m по строковому имени свойства
        Func<Product, bool> dynamicFilter = BuildGreaterThanFilter<Product, decimal>("Price", 3000m);

        List<Product> catalog = new()
        {
            new Product("Механическая клавиатура", 7500m),
            new Product("Коврик для мыши", 1200m),
            new Product("Игровая мышь", 4800m)
        };

        Console.WriteLine("\nТовары дороже 3000 руб. (через скомпилированное дерево):");
        foreach (Product item in catalog.Where(dynamicFilter))
        {
            Console.WriteLine($"  -> {item.Name}: {item.Price} руб.");
        }

        // 3. Замена медленной рефлексии (PropertyInfo.GetValue): собираем быстрый геттер свойства
        Func<object, object?> fastNameGetter = BuildFastPropertyGetter(typeof(Product), nameof(Product.Name));
        Console.WriteLine($"\nЧтение свойства через скомпилированный геттер: {fastNameGetter(catalog[0])}");

        // ❌ Ошибка 1: создание двух разных объектов ParameterExpression с одинаковым именем "p"
        // В Expression Trees параметры связываются по ссылке (ReferenceEquals), а не по строке имени —
        // вызов .Compile() выбросит InvalidOperationException ("variable 'p' is not defined")!

        // ❌ Антипаттерн 2: вызов .Compile() внутри цикла или на каждый HTTP-запрос
        // Компиляция IL требует заметного времени и памяти — компилируйте дерево один раз и кэшируйте делегат!
    }

    // Собираем выражение p => p.<propertyName> > <threshold> и компилируем в Func<T, bool>
    static Func<T, bool> BuildGreaterThanFilter<T, TValue>(string propertyName, TValue threshold)
    {
        ParameterExpression param = Expression.Parameter(typeof(T), "p");
        MemberExpression property = Expression.Property(param, propertyName);
        ConstantExpression constant = Expression.Constant(threshold, typeof(TValue));

        BinaryExpression comparison = Expression.GreaterThan(property, constant);
        Expression<Func<T, bool>> lambda = Expression.Lambda<Func<T, bool>>(comparison, param);

        return lambda.Compile();
    }

    // Собираем аналог: (object obj) => (object)((Product)obj).Name
    static Func<object, object?> BuildFastPropertyGetter(Type targetType, string propertyName)
    {
        ParameterExpression objParam = Expression.Parameter(typeof(object), "obj");
        UnaryExpression typedTarget = Expression.Convert(objParam, targetType);
        MemberExpression propertyAccess = Expression.Property(typedTarget, propertyName);
        UnaryExpression boxedResult = Expression.Convert(propertyAccess, typeof(object));

        return Expression.Lambda<Func<object, object?>>(boxedResult, objParam).Compile();
    }
}

record Product(string Name, decimal Price);

```

## Важные нюансы

* **Почему для баз данных нужен `Expression<Func<T>>`, а не `Func<T>`:** скомпилированный делегат `Func<Product, bool>` — это чёрный ящик из инструкций IL, который можно только выполнить в памяти. Дерево `Expression<Func<Product, bool>>` хранит структуру кода в виде объектов C#, поэтому провайдеры вроде Entity Framework Core обходят его с помощью класса `ExpressionVisitor` и транслируют узлы (`BinaryExpression`, `MemberExpression`) в текстовый запрос `SELECT ... WHERE Price >= 5000`.
* **Узлы параметров сравниваются по ссылке (`ReferenceEquals`):** при ручном построении дерева вы обязаны передать один и тот же экземпляр `ParameterExpression` и в узел обращения к свойству (`Expression.Property(param, ...)`), и в итоговый вызов `Expression.Lambda(..., param)`. Если создать второй объект `Expression.Parameter` с тем же строковым именем `"p"`, компиляция завершится ошибкой области видимости переменной.
* **Стоимость `.Compile()` и поведение в Native AOT:** вызов `.Compile()` генерирует динамический метод в памяти через *Lightweight Code Generation* (`DynamicMethod`), поэтому его нельзя запускать внутри циклов — скомпилированный делегат нужно сохранить в кэш (например, `ConcurrentDictionary<string, Delegate>`), после чего его вызовы работают на скорости обычного C#-метода. В средах без JIT-компиляции (Native AOT / iOS) `.Compile()` автоматически переключается на встроенный интерпретатор выражений: код продолжит работать без падений, но медленнее нативного IL.
* **Ограничения синтаксиса и связь со следующей темой:** компилятор C# умеет преобразовывать в `Expression<T>` только однострочные выражения — многострочные блоки `{ ... }`, циклы `for` / `foreach`, блоки `try / catch`, оператор `await` и условный доступ `?.` в лямбда-выражениях запрещены. В следующей карточке мы спустимся на самый нижний уровень работы с памятью и операционной системой (*`Unsafe`-код, указатели и P/Invoke*).

