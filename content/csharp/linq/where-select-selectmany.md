---
title: Where, Select, SelectMany
keywords: LINQ, фильтрация Where, проекция Select, SelectMany, OfType и Cast, анонимные типы, плоский поток, преобразование коллекций
---

# Фильтрация и проекция: Where, Select и SelectMany

Как отобрать элементы по условию, преобразовать их в нужную структуру без изменения исходной коллекции и объединить вложенные списки в единый плоский поток?

Операторы фильтрации и проекции образуют ядро любого конвейера данных в LINQ. Метод `Where` пропускает дальше только те элементы последовательности, для которых условие `Func<T, bool>` возвращает `true`, а `OfType<TResult>` безопасно отбирает объекты конкретного типа. Операторы проекции меняют форму элементов: `Select` преобразует каждый элемент один к одному в новый тип, кортеж или анонимный объект, тогда как `SelectMany` разворачивает вложенные коллекции в единую плоскую последовательность («один ко многим»). Все эти методы работают лениво и не изменяют исходную коллекцию.

## Основные операторы отбора и преобразования

| Оператор | Сигнатура делегата / параметра | Назначение и форма результата |
| --- | --- | --- |
| `Where(predicate)` | `Func<TSource, bool>` *(или с индексом `(x, i)`)* | Оставляет только элементы, прошедшие проверку; количество элементов не больше исходного |
| `OfType<TResult>()` | Параметр типа `<TResult>` | Фильтрует разнородную коллекцию по типу, отбрасывая неподходящие объекты и `null` |
| `Select(selector)` | `Func<TSource, TResult>` *(или с индексом `(x, i)`)* | Преобразует каждый элемент в новую форму (проекция 1:1); длина выборки сохраняется |
| `SelectMany(selector)` | `Func<TSource, IEnumerable<TResult>>` | Извлекает вложенную коллекцию из каждого элемента и склеивает их в один плоский поток |

## Пример кода

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<Order> orders = new List<Order>
        {
            new Order(101, "Анна", IsPaid: true, new List<string> { "Клавиатура", "Мышь" }),
            new Order(102, "Игорь", IsPaid: false, new List<string> { "Монитор" }),
            new Order(103, "Елена", IsPaid: true, new List<string> { "Ноутбук", "Рюкзак", "Кабель" })
        };

        // 1. Where + Select: фильтруем оплаченные заказы и проецируем в компактный анонимный тип
        var paidSummaries = orders
            .Where(o => o.IsPaid)
            .Select(o => new
            {
                o.Id,
                Client = o.Customer.ToUpper(),
                ItemsCount = o.Products.Count
            });

        Console.WriteLine("Оплаченные заказы:");
        foreach (var summary in paidSummaries)
        {
            Console.WriteLine($"  Заказ #{summary.Id} ({summary.Client}) — позиций: {summary.ItemsCount}");
        }

        // 2. SelectMany + перегрузка Select с индексом: разворачиваем все товары в плоский нумерованный список
        IEnumerable<string> allSoldProducts = orders
            .Where(o => o.IsPaid)
            .SelectMany(o => o.Products)
            .Select((product, index) => $"{index + 1}. {product}");

        Console.WriteLine("\nВсе оплаченные товары единым списком:");
        foreach (string line in allSoldProducts)
        {
            Console.WriteLine($"  {line}");
        }

        // 3. OfType<T>: безопасный отбор элементов нужного типа из смешанного массива
        object[] rawValues = { "текст", 42, 3.14, 100, null!, "ещё строка" };
        IEnumerable<int> onlyNumbers = rawValues.OfType<int>();
        Console.WriteLine($"\nЧисла из смешанного массива: {string.Join(", ", onlyNumbers)}"); // 42, 100

        // ❌ Ловушка: Select вместо SelectMany вернёт «последовательность списков» (IEnumerable<List<string>>)
        // var nested = orders.Select(o => o.Products);

        // ❌ Опасность: Cast<int>() выбросит InvalidCastException на первой же строке, в отличие от OfType<int>()
        // var broken = rawValues.Cast<int>().ToList();
    }
}

record Order(int Id, string Customer, bool IsPaid, List<string> Products);

```

## Важные нюансы

* **Разница между `Select` и `SelectMany`:** `Select` сохраняет исходную структуру вложенности — если у каждого заказа есть список товаров, `orders.Select(o => o.Products)` вернёт коллекцию коллекций (`IEnumerable<List<string>>`). Метод `SelectMany` раскрывает внутренние списки и объединяет их в единый плоский поток `IEnumerable<string>`, заменяя собой вложенный цикл `foreach`.
* **Перегрузки с порядковым индексом:** у обоих методов (`Where` и `Select`) есть перегрузка, передающая вторым аргументом лямбды индекс элемента в текущей последовательности — например, `.Select((item, idx) => $"{idx + 1}. {item}")` для нумерации строк или `.Where((_, idx) => idx % 2 == 0)` для отбора элементов на чётных позициях.
* **`OfType<T>()` против `Cast<T>()`:** оба оператора приводят элементы последовательности к типу `T`, но ведут себя по-разному при встрече с неподходящим объектом: `OfType<T>()` тихо пропускает элементы других типов и значения `null`, тогда как `Cast<T>()` немедленно выбрасывает `InvalidCastException`.
* **Чистота функций и связь с соседними темами:** внутри `Where` и `Select` не следует изменять свойства исходных объектов или внешние переменные — из-за отложенного выполнения (см. карточку *Основы LINQ и отложенное выполнение*) такие побочные эффекты сработают непредсказуемо. В следующей карточке разберём, как упорядочивать выборку и разбивать её на страницы (*Сортировка и разбиение: `OrderBy`, `Skip` и `Take*`).

