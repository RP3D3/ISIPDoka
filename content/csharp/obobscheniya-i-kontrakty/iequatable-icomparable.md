---
title: IEquatable & IComparable
keywords: интерфейс IEquatable, интерфейс IComparable, метод CompareTo, сортировка Sort, компаратор IComparer, сравнение без упаковки, переопределение Equals, GetHashCode
---

# `IEquatable<T>` и `IComparable<T>`: равенство и сортировка

Как научить свои классы и структуры быстро сравниваться на равенство без упаковки (*boxing*) и автоматически выстраиваться по порядку в `List<T>.Sort()`?

Стандартные методы из базового класса `object` принимают аргумент типа `object`, из-за чего при сравнении структур происходит упаковка (*boxing*) в куче, а при сравнении классов приходится вручную проверять тип. Обобщённые интерфейсы `IEquatable<T>` и `IComparable<T>` решают эту проблему на уровне компиляции: первый задаёт строгую проверку **равенства** двух объектов одного типа `T`, а второй определяет **правило порядка** («меньше, равно или больше»), которое автоматически используют стандартные алгоритмы сортировки и поиска в .NET.

## Главные интерфейсы сравнения в .NET

| Интерфейс | Обязательный метод | Возвращаемое значение | Где используется автоматически |
| --- | --- | --- | --- |
| `IEquatable<T>` | `bool Equals(T? other)` | `true`, если объекты равны по смыслу; иначе `false` | `List<T>.Contains()`, `Dictionary<TKey, TValue>`, `HashSet<T>` |
| `IComparable<T>` | `int CompareTo(T? other)` | `< 0` (текущий меньше), `0` (равны), `> 0` (текущий больше) | `List<T>.Sort()`, `Array.Sort()`, `SortedSet<T>` |
| `IComparer<T>` | `int Compare(T? x, T? y)` | `< 0`, `0` или `> 0` для двух переданных объектов | Передаётся в `Sort(comparer)` для альтернативной сортировки |

## Пример кода

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<Product> catalog = new List<Product>
        {
            new Product("SKU-30", "Монитор 27\"", 28000m),
            new Product("SKU-10", "Мышь беспроводная", 3500m),
            new Product("SKU-20", "Клавиатура", 7200m)
        };

        // 1. Работает IEquatable<Product>: Contains сравнивает товары по артикулу Sku без лишних приведений
        Product searchTarget = new Product("SKU-20", "Клавиатура (уценка)", 5000m);
        Console.WriteLine($"Товар с таким артикулом есть в каталоге: {catalog.Contains(searchTarget)}");

        // 2. Работает IComparable<Product>: Sort() автоматически выстраивает товары по цене
        catalog.Sort();

        Console.WriteLine("\nКаталог после сортировки по цене:");
        foreach (Product item in catalog)
        {
            Console.WriteLine($"  {item.Sku}: {item.Title} — {item.Price} руб.");
        }
    }
}

class Product : IEquatable<Product>, IComparable<Product>
{
    public string Sku { get; }
    public string Title { get; }
    public decimal Price { get; }

    public Product(string sku, string title, decimal price)
    {
        Sku = sku;
        Title = title;
        Price = price;
    }

    // Контракт IEquatable<Product>: два товара считаются одинаковыми, если совпадает их артикул
    public bool Equals(Product? other)
    {
        if (other is null)
            return false;

        return Sku == other.Sku;
    }

    // Обязательно согласуем базовые методы object.Equals и GetHashCode с IEquatable<T>
    public override bool Equals(object? obj) => Equals(obj as Product);
    public override int GetHashCode() => HashCode.Combine(Sku);

    // Контракт IComparable<Product>: задаём естественный порядок сортировки (по возрастанию цены)
    public int CompareTo(Product? other)
    {
        // По соглашению .NET любой существующий объект считается "больше" значения null
        if (other is null)
            return 1;

        return Price.CompareTo(other.Price);
    }
}

```

## Важные нюансы

* **Защита структур от упаковки (*boxing*):** если реализовать `IEquatable<T>` и `IComparable<T>` в `struct`, методы `Contains()`, `IndexOf()` и `Sort()` будут вызывать типизированные версии `Equals(T)` и `CompareTo(T)` напрямую, не оборачивая структуру в `object` в куче.
* **Согласованность с `object.Equals` и `GetHashCode`:** при реализации `IEquatable<T>` всегда переопределяйте также `object.Equals(object?)` и `GetHashCode()` по тем же полям. Иначе разные части библиотеки .NET (например, необобщённые коллекции или отладчик) будут сравнивать объекты по-разному, а `HashSet<T>` и `Dictionary` перестанут находить дубликаты.
* **Несколько способов сортировки через `IComparer<T>`:** интерфейс `IComparable<T>` задаёт только один *основной* порядок сортировки внутри самого класса (например, по цене). Если нужно отсортировать тот же список по алфавиту или по дате, создают отдельный класс-компаратор с интерфейсом `IComparer<T>` и передают его в `catalog.Sort(comparer)`.
* **Связь с теорией и соседними темами:** правила согласования `Equals` и `GetHashCode` опираются на устройство корзин из теоретического раздела (*Хеш-таблицы*) и карточку *Базовый класс object*, а в следующей карточке разберём последний ключевой контракт этой группы — освобождение неуправляемых ресурсов через `IDisposable` и `using`.

