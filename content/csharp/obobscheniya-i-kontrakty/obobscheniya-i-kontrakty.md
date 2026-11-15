---
title: Обобщения и контракты
keywords: обобщения generics, ограничения where, вариантность in out, IEnumerable и yield, IEquatable и IComparable, IDisposable и using, ленивые вычисления, контракты .NET, типобезопасность
---

# Обобщения и контракты: универсальный и безопасный код

Как проектировать универсальные классы и алгоритмы без дублирования кода, обеспечивать ленивую обработку потоков данных и гарантировать освобождение ресурсов?

Обобщения и стандартные контракты .NET превращают разрозненные классы в единую, типобезопасную экосистему. Параметр типа `<T>` и ограничения `where` позволяют писать универсальные шаблоны без потери производительности и упаковки (*boxing*), а модификаторы вариантности `in` и `out` управляют совместимостью интерфейсов при наследовании. Подключая к своим типам стандартные контракты — `IEnumerable<T>` с ленивыми генераторами `yield`, `IEquatable<T>`, `IComparable<T>` и `IDisposable` с конструкцией `using`, — вы интегрируете свои модели в цикл `foreach`, встроенную сортировку и систему управления ресурсами C#.

## Сводная карта инструментов группы

| Инструмент | Суть механизма | Когда применять |
| --- | --- | --- |
| **Обобщения (`<T>`)** | Универсальный шаблон класса или метода с подстановкой конкретного типа при компиляции | Когда нужно написать один алгоритм или контейнер для разных типов без `object` и упаковки |
| **Ограничения (`where`)** | Фильтрация параметра `T` (`class`, `struct`, `new()`, интерфейсы) и значение `default` | Когда внутри универсального кода нужно вызывать свойства, методы или конструктор типа `T` |
| **Вариантность (`in` / `out`)** | Ковариантность (`out` — только выход) и контравариантность (`in` — только вход) в интерфейсах | Когда нужно безопасно передавать `IEnumerable<Dog>` вместо `IEnumerable<Animal>` и наоборот |
| **`IEnumerable<T>` и `yield**` | Контракт перебора для `foreach` и ленивая генерация элементов по одному через автомат | Когда нужно обрабатывать большие или бесконечные потоки данных без загрузки всего в память |
| **`IEquatable<T>` и `IComparable<T>**` | Типизированное сравнение на равенство и порядок сортировки без приведения к `object` | Когда свои классы и структуры нужно искать в коллекциях и сортировать через `List<T>.Sort()` |
| **`IDisposable` и `using**` | Контракт явного закрытия неуправляемых ресурсов и автоматический вызов `Dispose()` | При работе с файлами, сетевыми потоками, подключениями к БД и любыми системными дескрипторами |

## Пример кода

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // 1. Объявление using гарантирует вызов Dispose() у источника данных в конце метода
        using LogSource source = new LogSource("server.log");

        // 2. Ленивый поток данных (IEnumerable<LogEntry>) на базе yield return
        IEnumerable<LogEntry> stream = source.ReadEntries();

        // 3. Ковариантность (out T): IEnumerable<LogEntry> совместим с IEnumerable<object>
        IEnumerable<object> asObjects = stream;

        // 4. Обобщённый метод с ограничениями where обрабатывает поток, убирает дубли и сортирует
        List<LogEntry> orderedLogs = ToSortedUniqueList(stream);

        Console.WriteLine("Уникальные события после сортировки по приоритету:");
        foreach (LogEntry entry in orderedLogs)
        {
            Console.WriteLine($"  [Уровень {entry.Level}] {entry.Message}");
        }
    }

    // Обобщённый метод: ограничения where открывают доступ к Equals и CompareTo у любого типа T
    static List<T> ToSortedUniqueList<T>(IEnumerable<T> source)
        where T : IEquatable<T>, IComparable<T>
    {
        List<T> result = new List<T>();
        foreach (T item in source)
        {
            if (!result.Contains(item)) // Использует IEquatable<T>.Equals
                result.Add(item);
        }

        result.Sort(); // Использует IComparable<T>.CompareTo
        return result;
    }
}

// Модель данных с контрактами типизированного равенства и сортировки
class LogEntry : IEquatable<LogEntry>, IComparable<LogEntry>
{
    public int Level { get; }
    public string Message { get; }

    public LogEntry(int level, string message) => (Level, Message) = (level, message);

    public bool Equals(LogEntry? other) =>
        other is not null && Level == other.Level && Message == other.Message;

    public override bool Equals(object? obj) => Equals(obj as LogEntry);
    public override int GetHashCode() => HashCode.Combine(Level, Message);

    public int CompareTo(LogEntry? other) =>
        other is null ? 1 : Level.CompareTo(other.Level);
}

// Источник данных с неуправляемым ресурсом (IDisposable) и ленивым генератором (yield return)
class LogSource : IDisposable
{
    private readonly string _fileName;
    private bool _isDisposed;

    public LogSource(string fileName)
    {
        _fileName = fileName;
        Console.WriteLine($"[Ресурс открыт]: {_fileName}");
    }

    public IEnumerable<LogEntry> ReadEntries()
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        yield return new LogEntry(3, "Ошибка подключения к БД");
        yield return new LogEntry(1, "Сервер запущен");
        yield return new LogEntry(3, "Ошибка подключения к БД"); // Дубликат
        yield return new LogEntry(2, "Высокая загрузка памяти");
    }

    public void Dispose()
    {
        if (_isDisposed) return;
        _isDisposed = true;
        Console.WriteLine($"[Ресурс закрыт]: {_fileName}");
    }
}

```

## Важные нюансы

* **Отказ от `object` в пользу `<T>` и типизированных интерфейсов:** использование обобщений вместе с `IEquatable<T>` и `IComparable<T>` полностью устраняет упаковку (*boxing*) значимых типов в куче и переносит проверку ошибок со времени выполнения на этап компиляции.
* **Ленивость `IEnumerable<T>` и дисциплина ресурсов:** последовательность на базе `yield return` не вычисляет элементы до начала цикла `foreach`, а сам цикл автоматически вызывает `Dispose()` у перечислителя в блоке `finally`. Для любых внешних ресурсов (файлов, сокетов, подключений к БД) всегда используйте `using`, не полагаясь на сборщик мусора.
* **Границы вариантности:** модификаторы `out` и `in` работают только в объявлениях интерфейсов и делегатов и исключительно со ссылочными типами; изменяемые коллекции вроде `List<T>` остаются инвариантными для защиты целостности данных.
* **Что дальше:** связка обобщений `<T>` и ленивых последовательностей `IEnumerable<T>` открывает дорогу к декларативной обработке коллекций и передаче функций как параметров (см. следующую группу: *Делегаты, лямбда-выражения и LINQ*).

