---
title: Обобщения и контракты
keywords: обобщения generics, ограничения where, вариантность in out, IEnumerable и yield, IEquatable и IComparable, IDisposable и using, ленивые вычисления, контракты .NET, типобезопасность
svg: |
  <svg viewBox="0 0 900 280" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 900px; max-height: 280px; height: auto; display: block; margin: 0 auto 20px;">
  <style>
    .c-white { fill: var(--text-main, #ffffff); }
    .c-dark { fill: var(--bg-main, #222429); }
    .c-accent { fill: var(--domain-accent, #953dac); }
    .s-white { stroke: var(--text-main, #ffffff); }
    .s-dark { stroke: var(--bg-main, #222429); }
    .s-accent { stroke: var(--domain-accent, #953dac); }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .cloud-1 { transform-box: fill-box; transform-origin: center; animation: drift1 8s ease-in-out infinite; }
    .cloud-2 { transform-box: fill-box; transform-origin: center; animation: drift2 9s ease-in-out infinite; }
    @keyframes drift1 { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(7px); } }
    @keyframes drift2 { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(-7px); } }
    .press { transform-box: fill-box; transform-origin: center; animation: press 4.4s ease-in-out infinite; }
    .screw-head { transform-box: fill-box; transform-origin: center; animation: turn 3.2s linear infinite; }
    .bit-1 { transform-box: fill-box; transform-origin: center; animation: bob 4.4s ease-in-out infinite; }
    .bit-2 { transform-box: fill-box; transform-origin: center; animation: bob 4.4s ease-in-out infinite 0.4s; }
    .bit-3 { transform-box: fill-box; transform-origin: center; animation: bob 4.4s ease-in-out infinite 0.8s; }
    .route { stroke-dasharray: 6 9; animation: flow 1.5s linear infinite; }
    @keyframes press {
      0%, 18%, 62%, 100% { transform: translateY(0px); }
      34%, 46% { transform: translateY(4px); }
    }
    @keyframes turn { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes bob { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-4px); } }
    @keyframes flow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -15; } }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transform: none !important; opacity: 1 !important; }
    }
  </style>

  <path d="M 52 42 H 32 V 238 H 52" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 848 42 H 868 V 238 H 848" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <g transform="translate(170, 46)">
    <g class="cloud-1">
      <path d="M -26 9 H 26 C 32 9 36 4 36 -1 C 36 -6 32 -10 27 -10 C 25 -17 18 -21 11 -19 C 7 -25 -3 -25 -8 -19 C -15 -20 -21 -15 -21 -8 C -27 -8 -31 -3 -31 2 C -31 6 -29 9 -26 9 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
    </g>
  </g>
  <g transform="translate(706, 40)">
    <g class="cloud-2">
      <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
    </g>
  </g>

  <line x1="210" y1="206" x2="440" y2="206" class="s-white" stroke-width="4" stroke-linecap="round" />
  <line x1="222" y1="206" x2="222" y2="230" class="s-white" stroke-width="3" stroke-linecap="round" />
  <line x1="428" y1="206" x2="428" y2="230" class="s-white" stroke-width="3" stroke-linecap="round" />

  <g transform="translate(252, 206)">
    <g class="bit-1">
      <rect x="-4" y="-42" width="8" height="42" rx="3" class="c-white s-dark" stroke-width="2" />
      <path d="M 0 -66 L 4 -57 L 14 -57 L 6 -51 L 9 -41 L 0 -47 L -9 -41 L -6 -51 L -14 -57 L -4 -57 Z" class="c-white s-dark" stroke-width="1.8" stroke-linejoin="round" />
    </g>
  </g>
  <g transform="translate(322, 206)">
    <g class="bit-2">
      <rect x="-4" y="-42" width="8" height="42" rx="3" class="c-white s-dark" stroke-width="2" />
      <path d="M 0 -66 L 12 -59 L 12 -45 L 0 -38 L -12 -45 L -12 -59 Z" class="c-white s-dark" stroke-width="1.8" stroke-linejoin="round" />
    </g>
  </g>
  <g transform="translate(392, 206)">
    <g class="bit-3">
      <rect x="-4" y="-42" width="8" height="42" rx="3" class="c-white s-dark" stroke-width="2" />
      <path d="M -6 -61 H 6 V -67 H 13 V -55 H 6 V -43 H -6 V -55 H -13 V -67 H -6 Z" class="c-white s-dark" stroke-width="1.8" stroke-linejoin="round" />
    </g>
  </g>
  <g transform="translate(322, 100)">
    <rect x="-31" y="-13" width="62" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">where</text>
  </g>

  <path d="M 458 150 H 536" class="s-white route" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.85" />
  <path d="M 529 143 L 537 150 L 529 157" class="s-white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />

  <g transform="translate(600, 150)">
    <g class="press">
      <rect x="-30" y="-80" width="60" height="90" rx="18" class="c-white s-dark" stroke-width="2.5" />
      <rect x="-21" y="-70" width="42" height="16" rx="8" class="c-accent" />
      <rect x="-21" y="-46" width="42" height="7" rx="3.5" class="c-dark" opacity="0.22" />
      <rect x="-21" y="-33" width="42" height="7" rx="3.5" class="c-dark" opacity="0.22" />
      <rect x="-7" y="10" width="14" height="52" rx="4" class="c-white s-dark" stroke-width="2" />
      <path d="M -10 62 H 10 L 7 82 H -7 Z" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
    </g>

    <g transform="translate(0, 100)">
      <circle cx="0" cy="0" r="18" class="c-dark s-white" stroke-width="2.2" />
      <g class="screw-head">
        <line x1="-11" y1="0" x2="11" y2="0" class="s-white" stroke-width="3" stroke-linecap="round" />
        <line x1="0" y1="-11" x2="0" y2="11" class="s-white" stroke-width="3" stroke-linecap="round" />
      </g>
    </g>
  </g>
  <g transform="translate(600, 52)">
    <rect x="-22" y="-13" width="44" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">T</text>
  </g>
  </svg>
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
| **`IEnumerable<T>` и `yield`** | Контракт перебора для `foreach` и ленивая генерация элементов по одному через автомат | Когда нужно обрабатывать большие или бесконечные потоки данных без загрузки всего в память |
| **`IEquatable<T>` и `IComparable<T>`** | Типизированное сравнение на равенство и порядок сортировки без приведения к `object` | Когда свои классы и структуры нужно искать в коллекциях и сортировать через `List<T>.Sort()` |
| **`IDisposable` и `using`** | Контракт явного закрытия неуправляемых ресурсов и автоматический вызов `Dispose()` | При работе с файлами, сетевыми потоками, подключениями к БД и любыми системными дескрипторами |

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
* **Что дальше:** связка обобщений `<T>` и ленивых последовательностей `IEnumerable<T>` делает код универсальным, но не защищает от сбоев во время выполнения — поэтому следующим шагом разберём исключения и отладку (см. следующую группу: *Исключения и ошибки*).

## Куда дальше

* [Обобщения](https://learn.microsoft.com/dotnet/csharp/fundamentals/types/generics) — параметры типа, ограничения и типичные сценарии.
* [Итераторы](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/iterators) — `yield return` и ленивые последовательности.
