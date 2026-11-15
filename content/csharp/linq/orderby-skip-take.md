---
title: OrderBy, Skip, Take
keywords: LINQ, сортировка OrderBy, ThenBy, пагинация Skip и Take, разбиение на пакеты Chunk, TakeWhile, IOrderedEnumerable, стабильная сортировка
---

# Сортировка и разбиение: OrderBy, Skip, Take и Chunk

Как упорядочить коллекцию сразу по нескольким полям, организовать постраничный вывод (пагинацию) и разбить поток данных на пакеты фиксированного размера?

Операторы сортировки и разбиения управляют порядком и количеством элементов в запросе LINQ. Первичную сортировку задают методы `OrderBy` и `OrderByDescending`, возвращающие специальный интерфейс `IOrderedEnumerable<T>`, к которому можно пристыковать вторичные критерии через `ThenBy` и `ThenByDescending`. Операторы разбиения (*partitioning*) отсекают нужную часть последовательности: `Skip` и `Take` позволяют выбрать окно элементов для пагинации, `SkipWhile` и `TakeWhile` работают по условию с начала потока, а `Chunk` разрезает коллекцию на отдельные массивы заданного размера для пакетной обработки.

## Основные операторы сортировки и разбиения

| Оператор | Параметр / делегат | Назначение и поведение |
| --- | --- | --- |
| `OrderBy` / `OrderByDescending` | `Func<TSource, TKey>` *(и опционально `IComparer<TKey>`)* | Задаёт основной порядок сортировки по возрастанию или убыванию; возвращает `IOrderedEnumerable<T>` |
| `ThenBy` / `ThenByDescending` | `Func<TSource, TKey>` | Добавляет дополнительные уровни сортировки для элементов с одинаковым первичным ключом |
| `Skip(n)` / `Take(n)` | `int count` *(или `Range` в `Take`)* | Пропускает первые `n` элементов / берёт следующие `n` элементов; основа постраничного вывода |
| `SkipLast(n)` / `TakeLast(n)` | `int count` | Отбрасывает или выбирает `n` элементов с самого конца последовательности |
| `SkipWhile` / `TakeWhile` | `Func<TSource, bool>` | Пропускает или берёт элементы с начала, пока условие истинно; останавливается на первом `false` |
| `Chunk(size)` | `int size` *(введено в .NET 6)* | Разбивает поток данных на пакеты (массивы `TSource[]`) длиной не более `size` элементов |

## Пример кода

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<Product> catalog = new List<Product>
        {
            new Product("Ноутбук Pro", "Электроника", 95000m),
            new Product("Кружка", "Посуда", 600m),
            new Product("Смартфон", "Электроника", 65000m),
            new Product("Тарелка", "Посуда", 900m),
            new Product("Наушники", "Электроника", 12000m),
            new Product("Чайник", "Посуда", 3200m)
        };

        // 1. Многоуровневая сортировка: сначала по категории (А-Я), внутри неё — по цене от дорогих к дешёвым
        List<Product> sorted = catalog
            .OrderBy(p => p.Category)
            .ThenByDescending(p => p.Price)
            .ToList();

        Console.WriteLine("Отсортированный каталог:");
        foreach (Product item in sorted)
        {
            Console.WriteLine($"  [{item.Category}] {item.Name} — {item.Price} руб.");
        }

        // 2. Пагинация (постраничный вывод): берём 2-ю страницу по 2 товара на странице
        int pageNumber = 2;
        int pageSize = 2;
        IEnumerable<Product> pageTwo = sorted
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize);

        Console.WriteLine($"\nСтраница {pageNumber} (по {pageSize} шт.):");
        foreach (Product item in pageTwo)
        {
            Console.WriteLine($"  {item.Name} ({item.Price} руб.)");
        }

        // 3. Разбиение на пакеты (Chunk): удобно для отправки данных пачками в БД или API
        Console.WriteLine("\nРазбиение на пакеты по 3 товара:");
        int batchIndex = 1;
        foreach (Product[] batch in sorted.Chunk(3))
        {
            string names = string.Join(", ", batch.Select(p => p.Name));
            Console.WriteLine($"  Пакет #{batchIndex++}: {names}");
        }

        // ❌ Ловушка: второй вызов OrderBy полностью перезаписывает первую сортировку по Category!
        // var brokenSort = catalog.OrderBy(p => p.Category).OrderByDescending(p => p.Price);
    }
}

record Product(string Name, string Category, decimal Price);

```

## Важные нюансы

* **Ловушка повторного `OrderBy` вместо `ThenBy`:** если написать `items.OrderBy(x => x.Category).OrderBy(x => x.Price)`, второй вызов `OrderBy` полностью отменит сортировку по категориям и пересортирует всю коллекцию заново только по цене. Для добавления второго, третьего и последующих критериев всегда используйте `ThenBy` или `ThenByDescending`.
* **Стабильность сортировки и полная буферизация:** сортировка в LINQ является **стабильной** (*stable sort*) — если у двух элементов совпадают ключи сортировки, их взаимный порядок из исходной коллекции гарантированно сохранится. Кроме того, в отличие от потоковых `Where` и `Take`, метод `OrderBy` вынужден сначала вычитать *всю* последовательность в промежуточный буфер, прежде чем отдать первый элемент, поэтому его нельзя применять к бесконечным генераторам `yield`.
* **Безопасность границ в `Skip` / `Take` и отличие `TakeWhile` от `Where`:** методы `Skip` и `Take` никогда не выбрасывают `IndexOutOfRangeException` — если запросить `Take(100)` у списка из 5 элементов, вернутся все 5 элементов; а начиная с .NET 6 в `Take` можно передавать диапазоны `Range` (например, `items.Take(1..4)`). При этом не путайте `TakeWhile` с `Where`: `TakeWhile` прекращает работу навсегда на первом же элементе, не прошедшем проверку, игнорируя оставшуюся часть коллекции.
* **Связь со следующей темой:** пользовательские правила сравнения строк (например, без учёта регистра через `StringComparer.OrdinalIgnoreCase`) передаются вторым аргументом в `OrderBy` и опираются на контракт `IComparer<T>` из группы 160 (*Обобщения и контракты*). В следующей карточке разберём, как извлекать конкретные элементы и проверять условия по всей коллекции (*Поиск и проверки: `First`, `Single`, `Any` и `All`*).

