---
title: Синхронизация и потокобезопасность
keywords: синхронизация потоков, потокобезопасность C#, состояние гонки race condition, lock и Lock, Interlocked, SemaphoreSlim, ConcurrentDictionary, deadlock
---

# Синхронизация и потокобезопасность: lock, Interlocked и SemaphoreSlim

Как защитить общие переменные и коллекции от повреждения при одновременном обращении из десятков потоков, ограничить число параллельных запросов и избежать взаимоблокировок?

Когда несколько потоков одновременно читают и изменяют одни и те же данные в управляемой куче (*Heap*), возникает **состояние гонки** (*race condition*): операции накладываются друг на друга, счётчики теряют значения, а обычные коллекции вроде `List<T>` и `Dictionary<K, V>` повреждают внутреннюю структуру и падают с исключениями. Для защиты общего состояния в .NET применяют инструменты разного уровня: `Interlocked` выполняет атомарные операции на уровне инструкций процессора без блокировок, оператор `lock` (в связке с типом `Lock` в .NET 9+) изолирует короткие синхронные секции кода, `SemaphoreSlim` позволяет ограничивать параллелизм и использовать `await` внутри защищённой зоны, а потокобезопасные коллекции вроде `ConcurrentDictionary<TKey, TValue>` берут синхронизацию на себя.

## Основные инструменты синхронизации и потокобезопасности

| Инструмент / класс | Синтаксис / пример | Назначение и особенности |
| --- | --- | --- |
| **`Interlocked`** | `Interlocked.Increment(ref _count);` | Выполняет неделимые (*атомарные*) операции с числами и ссылками на уровне CPU без блокировки потоков |
| **`lock` / `Lock`** *(NET 9+)* | `lock (_syncLock) { ... }` | Взаимное исключение (*mutex*): пускает в критическую секцию только один поток (только синхронный код) |
| **`SemaphoreSlim`** | `await _semaphore.WaitAsync(ct);` | Асинхронный семафор: ограничивает число одновременных задач и разрешает `await` внутри секции |
| **`ConcurrentDictionary<K, V>`** | `dict.AddOrUpdate(key, 1, (_, v) => v + 1);` | Потокобезопасный словарь с мелкогранулярной блокировкой сегментов для конкурентного чтения и записи |

## Пример кода

```csharp
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    // 1. Выделенный объект блокировки (в .NET 9+ используется специализированный System.Threading.Lock,
    // в более ранних версиях — private static readonly object BalanceLock = new();)
    private static readonly Lock BalanceLock = new();
    private static decimal _sharedBalance = 1000m;

    // 2. Счётчик для атомарных операций без блокировок (Interlocked)
    private static int _totalProcessedRequests = 0;

    // 3. Асинхронный семафор: разрешаем не более 2 одновременных обращений к внешнему сервису
    private static readonly SemaphoreSlim ConcurrencyLimiter = new(initialCount: 2, maxCount: 2);

    // 4. Потокобезопасный словарь для сбора статистики по пользователям из разных потоков
    private static readonly ConcurrentDictionary<string, int> UserStats = new();

    static async Task Main()
    {
        string[] users = { "Роман", "Анна", "Роман", "Елена", "Анна", "Роман" };

        // Запускаем 6 конкурентных задач одновременно
        Task[] tasks = users
            .Select((user, index) => ProcessTransactionAsync(requestId: index + 1, user: user, delta: 100m))
            .ToArray();

        await Task.WhenAll(tasks);

        Console.WriteLine($"\nВсего обработано запросов: {_totalProcessedRequests}");
        Console.WriteLine($"Итоговый баланс: {_sharedBalance} руб.");
        Console.WriteLine("Статистика по пользователям:");
        foreach (var pair in UserStats)
        {
            Console.WriteLine($"  {pair.Key}: {pair.Value} операций");
        }

        // ❌ Ошибка компиляции (CS1996): оператор await нельзя использовать внутри блока lock!
        // lock (BalanceLock) { await Task.Delay(50); }

        // ❌ Антипаттерн: никогда не ставьте lock на this, typeof(...) или строковые литералы ("key") —
        // внешний код может захватить тот же объект и вызвать взаимоблокировку (Deadlock)
    }

    static async Task ProcessTransactionAsync(int requestId, string user, decimal delta)
    {
        // Ограничиваем число одновременно выполняемых асинхронных операций через SemaphoreSlim
        await ConcurrencyLimiter.WaitAsync();
        try
        {
            Console.WriteLine($"[Запрос #{requestId}] Вход в зону обработки для {user}...");
            await Task.Delay(150); // Имитация сетевого вызова (внутри SemaphoreSlim можно делать await!)

            // Атомарный инкремент счётчика за одну инструкцию процессора без lock
            Interlocked.Increment(ref _totalProcessedRequests);

            // Короткая синхронная критическая секция под защитой lock
            lock (BalanceLock)
            {
                _sharedBalance += delta;
            }

            // Потокобезопасное обновление счётчика в ConcurrentDictionary
            UserStats.AddOrUpdate(user, addValue: 1, updateValueFactory: (_, current) => current + 1);
        }
        finally
        {
            // Обязательно освобождаем слот семафора в finally, иначе при исключении он заблокируется навсегда
            ConcurrencyLimiter.Release();
        }
    }
}

```

## Важные нюансы

* **Почему `await` запрещён внутри `lock` и как выручает `SemaphoreSlim`:** классический `lock` привязан к конкретному потоку ОС (*thread affinity*) — снять блокировку обязан тот же поток, который её захватил. Поскольку после `await` продолжение метода часто возобновляется в другом потоке пула, компилятор запрещает `await` внутри `lock` (ошибка `CS1996`). Для защиты асинхронного кода и ограничения параллелизма (например, не более 5 одновременных запросов к API) используйте `SemaphoreSlim` с обязательным вызовом `Release()` в блоке `finally`.
* **На чём можно и нельзя ставить `lock` (и новый тип `Lock` в .NET 9+):** никогда не блокируйтесь на `this`, `typeof(MyClass)` или строковых литералах (`lock ("sync")`) — такие ссылки доступны внешнему коду или интернируются средой выполнения, из-за чего два независимых модуля могут заблокировать друг друга (*deadlock*). Всегда создавайте закрытое поле `private readonly Lock _sync = new();` (.NET 9+, работающее быстрее классического монитора объекта) или `private readonly object _sync = new();` в более ранних версиях .NET.
* **Тонкость `ConcurrentDictionary.GetOrAdd`:** сам словарь гарантирует потокобезопасность внутренней хэш-таблицы, но фабричный делегат `valueFactory` в методе `GetOrAdd(key, k => CreateExpensiveValue(k))` выполняется *вне* блокировки. Если два потока одновременно обратятся по отсутствующему ключу, фабрика может сработать дважды, хотя в словарь сохранится только один результат — если создание объекта дорогое или имеет побочные эффекты, оборачивайте его в `Lazy<T>`.
* **Скорость `Interlocked` и защита от взаимоблокировок (*Deadlock*) (связь со следующей темой):** для простого инкремента, сложения или подмены ссылки (`Interlocked.Exchange`, `CompareExchange`) не нужен `lock` — процессор выполняет операцию атомарно без усыпления потоков. Если же в коде всё-таки захватываются две блокировки одновременно, берите их во всех местах программы в строго одинаковом порядке, иначе два потока заблокируют друг друга навсегда. В следующей карточке мы разберём асинхронные потоки данных, параллельную обработку коллекций и каналы обмена между производителем и потребителем (*`IAsyncEnumerable`, `Parallel` и `Channel<T>`*).


