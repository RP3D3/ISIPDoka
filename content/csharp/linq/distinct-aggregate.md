---
title: Distinct, Aggregate
keywords: LINQ, операции над множествами, DistinctBy, Union, Intersect, Except, агрегация данных, MinBy и MaxBy, Aggregate, свёртка коллекций
---

# Множества и агрегация: Distinct, Union, MinBy и Aggregate

Как убрать дубликаты по нужному полю, найти пересечение или разность двух коллекций, получить объект с максимальным значением за один проход и свернуть последовательность в произвольный итоговый результат?

Операторы работы со множествами (`Distinct`, `Union`, `Intersect`, `Except` и их версии с суффиксом `...By`) удаляют повторы и сравнивают две коллекции как математические множества, работая лениво через внутренний `HashSet<T>`. Операторы агрегации (`Count`, `Sum`, `Average`, `MinBy`, `MaxBy`, `Aggregate`), напротив, выполняются **немедленно** и сводят всю последовательность элементов к одному итоговому значению или объекту.

## Основные операторы множеств и агрегации

| Оператор | Параметры / делегат | Назначение и поведение |
| --- | --- | --- |
| `Distinct()` / `DistinctBy(key)` | Опционально `IEqualityComparer<T>` или `Func<T, TKey>` | Удаляет дубликаты, сохраняя порядок первого появления элементов |
| `Union(second)` / `UnionBy(...)` | `IEnumerable<TSource>` *(или ключей)* | Объединяет две коллекции в одну, автоматически убирая все повторы |
| `Intersect(second)` / `Except(second)` | `IEnumerable<TSource>` *(и `...By` в .NET 6+)* | Возвращает общие элементы (пересечение) или элементы первой коллекции, которых нет во второй (разность) |
| `Count()` / `Sum()` / `Average()` | Опционально предикат или селектор числа | Вычисляют количество, сумму или среднее арифметическое элементов |
| `MinBy(key)` / `MaxBy(key)` | `Func<TSource, TKey>` *(введено в .NET 6)* | Возвращают **весь объект** с минимальным или максимальным ключом за один проход $O(N)$ |
| `Aggregate(seed, func)` | Начальное значение `seed` и аккумулятор `(acc, x) => ...` | Универсальная свёртка (*fold/reduce*): накапливает произвольный итог по всей последовательности |

## Пример кода

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<Sale> sales = new List<Sale>
        {
            new Sale("Ноутбук", "Электроника", 90000m),
            new Sale("Мышь", "Электроника", 2500m),
            new Sale("Ноутбук", "Электроника", 95000m), // Повтор товара с другой ценой
            new Sale("Кресло", "Мебель", 18000m)
        };

        // 1. DistinctBy (.NET 6+): оставляем по одной записи на каждый уникальный товар
        IEnumerable<Sale> uniqueProducts = sales.DistinctBy(s => s.Product);
        Console.WriteLine($"Уникальные товары: {string.Join(", ", uniqueProducts.Select(s => s.Product))}");

        // 2. Операции над множествами: Union, Intersect, Except (с учётом регистра через StringComparer)
        string[] frontendSkills = { "HTML", "CSS", "JavaScript", "TypeScript" };
        string[] backendSkills = { "C#", "SQL", "javascript", "Docker" };

        var commonSkills = frontendSkills.Intersect(backendSkills, StringComparer.OrdinalIgnoreCase);
        var onlyFrontend = frontendSkills.Except(backendSkills, StringComparer.OrdinalIgnoreCase);
        var allUniqueSkills = frontendSkills.Union(backendSkills, StringComparer.OrdinalIgnoreCase);

        Console.WriteLine($"Общие навыки:    {string.Join(", ", commonSkills)}");     // JavaScript
        Console.WriteLine($"Только фронтенд: {string.Join(", ", onlyFrontend)}");     // HTML, CSS, TypeScript
        Console.WriteLine($"Все уникальные:  {string.Join(", ", allUniqueSkills)}");  // 7 навыков без дублей

        // 3. MaxBy / MinBy: получаем целый объект Sale, а не просто число цены
        Sale? topSale = sales.MaxBy(s => s.Amount);
        Console.WriteLine($"\nСамая дорогая продажа: {topSale?.Product} — {topSale?.Amount} руб.");

        // 4. Aggregate (свёртка): рассчитываем итоговую сумму с прогрессивной скидкой 10% на каждый товар дороже 10 000
        decimal discountedTotal = sales.Aggregate(
            seed: 0m,
            func: (acc, sale) => acc + (sale.Amount > 10000m ? sale.Amount * 0.9m : sale.Amount));

        Console.WriteLine($"Итоговая выручка со скидкой: {discountedTotal} руб.");

        // ❌ Опасность 1: Max() / Min() / Average() на пустой коллекции выбрасывают InvalidOperationException
        // decimal brokenAvg = new List<decimal>().Average();

        // ❌ Антипаттерн (O(N log N) вместо O(N)): не сортируйте всю коллекцию ради поиска максимума
        // Sale slowMax = sales.OrderByDescending(s => s.Amount).First();
    }
}

record Sale(string Product, string Category, decimal Amount);

```

## Важные нюансы

* **Как работают операции множеств (`Union` против `Concat`) и суффикс `...By`:** все операторы множеств используют внутреннюю хэш-таблицу (`HashSet<T>`), поэтому для пользовательских классов без переопределённых `Equals` и `GetHashCode` (или `record`) сравнение пойдёт по ссылкам. В .NET 6 появились методы `DistinctBy`, `UnionBy`, `IntersectBy` и `ExceptBy`, позволяющие сравнивать объекты по конкретному свойству без переопределения равенства. Помните также разницу между `Concat` и `Union`: `Concat` просто склеивает две коллекции целиком, а `Union` дополнительно удаляет дубликаты.
* **Преимущество `MinBy` и `MaxBy` над `Min` / `Max` и сортировкой:** обычные `sales.Max(s => s.Amount)` возвращают только число (`95000m`), теряя сам объект `Sale`, а связка `OrderByDescending(...).First()` тратит лишнюю память и время $O(N \log N)$ на полную сортировку. Методы `MaxBy` и `MinBy` находят нужный объект за один линейный проход $O(N)$ и безопасно возвращают `null` (для ссылочных типов) на пустой коллекции.
* **Поведение агрегаторов на пустых коллекциях:** методы `Count()` и `Sum()` на пустой последовательности безопасно возвращают `0`. Напротив, `Min()`, `Max()` и `Average()` для значимых типов (`int`, `decimal`, `double`) выбрасывают `InvalidOperationException`, если элементов нет — чтобы избежать падения, приведите селектор к nullable-типу (например, `items.Average(x => (decimal?)x.Amount) ?? 0m`).
* **Гибкость `Aggregate` и связь со следующей темой:** перегрузка `Aggregate(seed, func, resultSelector)` позволяет не только копить сумму или строить строку, но и выполнить финальное преобразование результата (например, разделить накопленную сумму на счётчик для расчёта взвешенного среднего за один проход). В следующей заключительной карточке группы мы подведём итоги по всему LINQ и разберём, чем запросы в памяти (`IEnumerable<T>`) отличаются от запросов к базам данных (`IQueryable<T>`) (*LINQ — запросы к коллекциям*).

