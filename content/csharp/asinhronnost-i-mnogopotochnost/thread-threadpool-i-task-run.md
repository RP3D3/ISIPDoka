---
title: Thread, ThreadPool и Task.Run
keywords: потоки C#, Thread и ThreadPool, Task.Run, CPU-bound и I/O-bound, ConfigureAwait(false), SynchronizationContext, пул потоков, многопоточность .NET
---

# Thread, ThreadPool и Task.Run: потоки и вычисления

Как вынести тяжёлые математические расчёты или обработку изображений в фоновый поток, чтобы не заморозить интерфейс, почему не стоит создавать потоки вручную через `new Thread()` и зачем в библиотеках пишут `ConfigureAwait(false)`?

Асинхронность (`async / await`) сама по себе не создаёт новых потоков — она лишь освобождает текущий поток во время ожидания ввода-вывода (*I/O-bound*). Когда же программе нужно выполнить ресурсоёмкую работу на процессоре (*CPU-bound*: шифрование, сжатие, парсинг больших объёмов данных), её выносят в фоновый поток через `Task.Run`. Под капотом `Task.Run` ставит задачу в очередь **пула потоков** (`ThreadPool`) — готового набора многоразовых фоновых потоков, которым управляет среда .NET, избавляя от дорогостоящего ручного создания объектов `Thread` операционной системы. А метод `ConfigureAwait(false)` позволяет продолжить выполнение кода после `await` в любом свободном потоке пула, не возвращаясь в исходный контекст синхронизации.

## Основные инструменты работы с потоками

| Инструмент / метод | Синтаксис / характеристика | Назначение и когда применять |
| --- | --- | --- |
| **`Thread`** | `var t = new Thread(Work); t.Start();` | Низкоуровневая обёртка над потоком ОС (~1 МБ стека); применяется редко (например, для выделенного STA-потока) |
| **`ThreadPool`** | Управляется CLR автоматически | Пул переиспользуемых фоновых потоков; сам масштабирует число потоков под нагрузку CPU |
| **`Task.Run(...)`** | `await Task.Run(() => HeavyCalc(), ct);` | Ставит CPU-задачу в очередь `ThreadPool` и возвращает `Task` для удобного ожидания и отмены |
| **`TaskCreationOptions.LongRunning`** | `Task.Factory.StartNew(..., LongRunning)` | Подсказка планировщику выделить отдельный поток вне пула для бесконечно долгих фоновых циклов |
| **`ConfigureAwait(false)`** | `await stream.ReadAsync(...).ConfigureAwait(false);` | Запрещает возврат в исходный `SynchronizationContext` после `await`; стандарт для библиотек |

## Пример кода

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        PrintThreadInfo("Старт Main");

        using CancellationTokenSource cts = new CancellationTokenSource(TimeSpan.FromSeconds(2));

        // 1. Task.Run: выносим тяжёлую CPU-нагрузку в поток из ThreadPool, не блокируя текущий поток
        long primeCount = await Task.Run(() => CountPrimesUpTo(limit: 200_000, cts.Token), cts.Token);
        Console.WriteLine($"Найдено простых чисел: {primeCount}");

        // 2. Вызов библиотечного метода с ConfigureAwait(false)
        string processed = await ProcessDataLibraryAsync("исходные_данные");
        Console.WriteLine($"Результат обработки: {processed}");

        // ❌ Антипаттерн 1: не оборачивайте чистый I/O (HttpClient, FileStream, БД) в Task.Run!
        // В серверном приложении (ASP.NET Core) это впустую забирает лишний поток из ThreadPool:
        // var badIo = await Task.Run(() => httpClient.GetStringAsync(url)); // Правильно: просто await httpClient.GetStringAsync(url)

        // ❌ Антипаттерн 2: не создавайте десятки потоков вручную через new Thread()
        // Каждый поток ОС сразу забирает ~1 МБ памяти под стек и замедляет переключение контекста:
        // new Thread(() => DoShortWork()).Start();
    }

    // Тяжёлая синхронная работа на процессоре (CPU-bound)
    static long CountPrimesUpTo(int limit, CancellationToken ct)
    {
        PrintThreadInfo("Внутри Task.Run (ThreadPool)");
        long count = 0;

        for (int number = 2; number <= limit; number++)
        {
            ct.ThrowIfCancellationRequested();
            if (IsPrime(number)) count++;
        }

        return count;
    }

    static bool IsPrime(int n)
    {
        for (int i = 2; i * i <= n; i++)
        {
            if (n % i == 0) return false;
        }
        return true;
    }

    // Библиотечный метод: ConfigureAwait(false) позволяет продолжить работу в любом свободном потоке пула,
    // не тратя время на возврат в UI-поток или исходный SynchronizationContext
    static async Task<string> ProcessDataLibraryAsync(string input)
    {
        await Task.Delay(150).ConfigureAwait(false);
        PrintThreadInfo("После await ConfigureAwait(false)");
        return input.ToUpperInvariant();
    }

    static void PrintThreadInfo(string stage)
    {
        Thread current = Thread.CurrentThread;
        Console.WriteLine(
            $"[{stage}] Поток #{Environment.CurrentManagedThreadId} | Из пула: {current.IsThreadPoolThread}");
    }
}

```

## Важные нюансы

* **Разделение I/O-bound и CPU-bound задач:** для сетевых запросов, чтения файлов и запросов к БД используйте *только* `async / await` без `Task.Run` — операционная система сама уведомит пул потоков по завершении операции. Метод `Task.Run` нужен в двух случаях: чтобы убрать тяжёлые вычисления с главного потока в UI-приложении (WPF, WinUI, MAUI) или распараллелить CPU-нагрузку по ядрам процессора. В веб-приложениях (ASP.NET Core) оборачивать код в `Task.Run` обычно вредно, так как каждый HTTP-запрос уже обрабатывается в потоке пула.
* **Почему `ThreadPool` эффективнее ручного `new Thread()`:** создание потока операционной системы — дорогая операция, требующая выделения около 1 МБ виртуальной памяти под стек и накладных расходов ядра ОС при переключении контекста (*context switching*). `ThreadPool` заранее держит набор фоновых (*background*) потоков, использует локальные очереди с балансировкой нагрузки (*work-stealing*) и сам регулирует их количество под число ядер CPU. Создавать `new Thread()` вручную оправдано лишь для единичных долгоживущих задач с особыми требованиями (например, когда нужен `ApartmentState.STA` для работы с буфером обмена или COM-объектами в Windows).
* **Как работает `ConfigureAwait(false)` и контекст синхронизации:** по умолчанию после `await` среда выполнения запоминает текущий `SynchronizationContext` (например, поток пользовательского интерфейса) и возвращает продолжение метода именно в него, чтобы можно было безопасно обновить кнопки и текст на экране. В библиотеках общего назначения и бизнес-логике возврат в UI-поток не требуется — вызов `.ConfigureAwait(false)` отключает захват контекста, ускоряет возобновление задачи и снижает риск взаимоблокировок (*deadlock*), если вызывающий код по ошибке заблокировал поток через `.Result`.
* **Связь с теорией и следующей темой:** выделение отдельного стека для каждого потока и общие объекты в управляемой куче объясняют, почему несколько потоков могут одновременно менять одну и ту же переменную в памяти (см. теоретический раздел *Стек и куча — Stack & Heap*). В следующей карточке мы разберём, как защитить общие данные от повреждения при одновременном доступе из разных потоков (*Синхронизация и потокобезопасность: `lock`, `Interlocked` и `SemaphoreSlim*`).

