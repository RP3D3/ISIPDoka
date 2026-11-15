---
title: Асинхронность и многопоточность
keywords: асинхронность и многопоточность, async и await, Task и ValueTask, CancellationToken, Task.Run и ThreadPool, lock и SemaphoreSlim, IAsyncEnumerable и Channel, выбор инструмента C#
---

# Асинхронность и многопоточность: выбор инструмента

Как грамотно разделить ожидание ввода-вывода и нагрузку на процессор, ограничить параллелизм, защитить общие данные и не попасть в ловушку взаимоблокировок?

Эффективный конкурентный код в C# строится на чётком разделении двух типов нагрузки: операций ввода-вывода (*I/O-bound*) и вычислений на процессоре (*CPU-bound*). Для сети, файлов и баз данных используют неблокирующий `async / await` в паре с `Task` (или `ValueTask` для горячих кэшей), объединяя независимые запросы через `Task.WhenAll` и передавая `CancellationToken` для своевременной отмены. Тяжёлые вычисления на CPU выносят в пул потоков через `Task.Run` или `Parallel.ForEachAsync`, общее состояние защищают атомарными операциями `Interlocked`, секциями `lock`, семафором `SemaphoreSlim` и потокобезопасными коллекциями, а потоки событий связывают через `IAsyncEnumerable<T>` и каналы `Channel<T>`.

## Сводная карта инструментов группы

| Категория и инструменты | Суть механизма | Когда применять |
| --- | --- | --- |
| **Базовая асинхронность** (`async`, `await`, `Task`, `ValueTask`) | Неблокирующее освобождение потока во время ожидания I/O; `ValueTask` убирает аллокацию при синхронном результате | Для всех сетевых запросов, БД и диска (`Task`); для горячих путей с попаданием в кэш (`ValueTask`) |
| **Комбинаторы и отмена** (`Task.WhenAll`, `Task.WhenAny`, `CancellationToken`) | Конкурентный запуск нескольких задач, гонка до первого ответа и кооперативное прерывание по таймауту | `WhenAll` — для независимых запросов; `CancellationToken` — во всех публичных `async`-методах |
| **Потоки и CPU-нагрузка** (`ThreadPool`, `Task.Run`, `ConfigureAwait(false)`) | Вынос ресурсоёмких синхронных вычислений в фоновые потоки пула без захвата контекста синхронизации | `Task.Run` — для тяжёлых расчётов в UI; `ConfigureAwait(false)` — в библиотечном коде |
| **Синхронизация и защита** (`Interlocked`, `lock`, `SemaphoreSlim`, `ConcurrentDictionary`) | Атомарные операции CPU, синхронное взаимное исключение, асинхронный лимит параллелизма и потокобезопасный словарь | `Interlocked` — для счётчиков; `SemaphoreSlim` — для лимита запросов с `await` внутри |
| **Потоки данных и очереди** (`IAsyncEnumerable<T>`, `Parallel.ForEachAsync`, `Channel<T>`) | Ленивая асинхронная выдача по элементам, параллельный обход с лимитом и очереди с противодавлением (*backpressure*) | `await foreach` — для постраничных API; `Channel<T>` — для паттерна «производитель — потребитель» |

## Пример кода

```csharp
using System;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        // 1. CancellationTokenSource: единый ограничитель времени для всего конвейера
        using CancellationTokenSource cts = new CancellationTokenSource(TimeSpan.FromSeconds(3));

        // 2. Task.WhenAll: конкурентно загружаем справочник и список задач (I/O-операции)
        Task<string> configTask = LoadConfigAsync(cts.Token);
        Task<int[]> itemsTask = LoadItemIdsAsync(cts.Token);

        await Task.WhenAll(configTask, itemsTask);
        Console.WriteLine($"Конфигурация: {await configTask}");

        // 3. Parallel.ForEachAsync + Interlocked + ConcurrentDictionary:
        // ограничиваем нагрузку (не более 2 задач одновременно) и безопасно собираем статистику
        int processedCount = 0;
        ConcurrentDictionary<int, string> results = new();

        ParallelOptions options = new ParallelOptions
        {
            MaxDegreeOfParallelism = 2,
            CancellationToken = cts.Token
        };

        await Parallel.ForEachAsync(await itemsTask, options, async (id, token) =>
        {
            string status = await ProcessSingleItemAsync(id, token);
            results[id] = status;
            Interlocked.Increment(ref processedCount);
        });

        Console.WriteLine($"Успешно обработано элементов: {processedCount}");
        foreach (var entry in results)
        {
            Console.WriteLine($"  Элемент #{entry.Key} -> {entry.Value}");
        }

        // ❌ Типичные ошибки группы:
        // 1. Блокировка потока через .Result / .Wait() (риск Deadlock) и объявление async void вне событий
        // 2. Оборачивание чистого I/O в Task.Run() или попытка использовать await внутри блока lock
        // 3. Игнорирование CancellationToken и забытый вызов SemaphoreSlim.Release() в блоке finally
    }

    static async Task<string> LoadConfigAsync(CancellationToken ct)
    {
        await Task.Delay(120, ct).ConfigureAwait(false);
        return "Production_v2";
    }

    static async Task<int[]> LoadItemIdsAsync(CancellationToken ct)
    {
        await Task.Delay(150, ct).ConfigureAwait(false);
        return new[] { 101, 102, 103, 104 };
    }

    static async Task<string> ProcessSingleItemAsync(int id, CancellationToken ct)
    {
        await Task.Delay(100, ct).ConfigureAwait(false);
        return $"Готово (поток #{Environment.CurrentManagedThreadId})";
    }
}

```

## Важные нюансы

* **Алгоритм выбора между I/O и CPU:** если метод ждёт ответ от сети, диска или базы данных — используйте чистый `async / await` без `Task.Run` (поток пула освобождается и обслуживает другие задачи). Если код интенсивно нагружает процессор (парсинг, шифрование, расчёты) — выносите его в `Task.Run` или `Parallel.ForEachAsync`, чтобы не заморозить главный поток интерфейса и распределить работу по ядрам.
* **Контролируемый параллелизм вместо запуска тысяч задач разом:** одновременный вызов `Task.WhenAll` для нескольких тысяч сетевых запросов способен исчерпать пул сокетов или перегрузить внешний сервер. Всегда ограничивайте ширину потока через `ParallelOptions.MaxDegreeOfParallelism`, семафор `SemaphoreSlim` или ограниченный канал `Channel.CreateBounded<T>(capacity)`.
* **Главные правила безопасности при работе с общим состоянием:** никогда не блокируйте асинхронный код вызовами `.Result` или `.Wait()`, не используйте `async void` (кроме обработчиков событий UI), не ставьте `lock` на публично доступные объекты (`this`, строки, `Type`) и всегда освобождайте `SemaphoreSlim` в блоке `finally`. Для простых счётчиков предпочитайте атомарные методы `Interlocked` вместо блокировок.
* **Итог всего курса (группы 110–200) и дальнейший вектор:** пройдя путь от базовых коллекций, ООП, обобщений, исключений и делегатов до LINQ, работы с текстом/файлами и асинхронности, вы собрали полный фундамент современного языка C# — следующим естественным шагом станет применение этих инструментов в реальной архитектуре приложений (Dependency Injection, логирование и конфигурация, Entity Framework Core и веб-разработка на ASP.NET Core).

