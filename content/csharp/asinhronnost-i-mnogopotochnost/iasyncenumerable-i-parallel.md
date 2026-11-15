---
title: IAsyncEnumerable и Parallel
keywords: IAsyncEnumerable, await foreach, EnumeratorCancellation, Parallel.ForEachAsync, Channel, производитель и потребитель, backpressure, асинхронные потоки
---

# IAsyncEnumerable, Parallel и Channel: потоки и очереди

Как отдавать элементы из асинхронного источника по мере их готовности без ожидания всей коллекции, параллельно обрабатывать тысячи элементов с ограничением нагрузки и связывать фоновых производителей с потребителями?

Когда данные поступают порциями (постраничный ответ API, строки из сети или события датчиков), сбор всей коллекции в `List<T>` перед возвратом из `Task<List<T>>` задерживает старт обработки и расходует лишнюю память. Интерфейс `IAsyncEnumerable<T>` в связке с `yield return` и циклом `await foreach` позволяет получать элементы лениво по мере их асинхронного появления. Для параллельной обработки уже готовой коллекции с контролем степени параллелизма служит `Parallel.ForEachAsync`, а для построения высокопроизводительных конвейеров «производитель — потребитель» (*Producer — Consumer*) в пространстве имён `System.Threading.Channels` предназначены потокобезопасные каналы `Channel<T>`.

## Основные инструменты потоковой и параллельной обработки

| Инструмент / конструкция | Синтаксис / пример | Назначение и особенности |
| --- | --- | --- |
| **`IAsyncEnumerable<T>` + `yield return**` | `async IAsyncEnumerable<int> ReadAsync(...)` | Асинхронный генератор: отдаёт элементы по одному по мере готовности без буферизации всего списка |
| **`await foreach`** | `await foreach (var x in stream.WithCancellation(ct))` | Асинхронно перебирает элементы из `IAsyncEnumerable<T>`, освобождая поток между порциями |
| **`[EnumeratorCancellation]`** | `([EnumeratorCancellation] CancellationToken ct = default)` | Пробрасывает токен отмены из `WithCancellation(ct)` внутрь асинхронного итератора |
| **`Parallel.ForEachAsync`** | `await Parallel.ForEachAsync(items, options, async (x, ct) => ...)` | Параллельно выполняет асинхронную работу над коллекцией с ограничением `MaxDegreeOfParallelism` |
| **`Channel<T>` (`Bounded` / `Unbounded`)** | `var ch = Channel.CreateBounded<Message>(100);` | Потокобезопасная асинхронная очередь для связи производителей (`Writer`) и потребителей (`Reader`) |

## Пример кода

```csharp
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        using CancellationTokenSource cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));

        // 1. IAsyncEnumerable<T> + await foreach: получаем страницы данных по мере их готовности
        Console.WriteLine("Потоковое чтение через IAsyncEnumerable:");
        await foreach (string record in FetchRecordsStreamAsync(totalPages: 3).WithCancellation(cts.Token))
        {
            Console.WriteLine($"  Получено: {record}");
        }

        // 2. Parallel.ForEachAsync: параллельная обработка коллекции с ограничением в 2 одновременные задачи
        string[] endpoints = { "/users", "/orders", "/catalog", "/reports" };
        ParallelOptions parallelOptions = new ParallelOptions
        {
            MaxDegreeOfParallelism = 2,
            CancellationToken = cts.Token
        };

        Console.WriteLine("\nПараллельный опрос эндпоинтов (не более 2 одновременно):");
        await Parallel.ForEachAsync(endpoints, parallelOptions, async (endpoint, token) =>
        {
            await Task.Delay(150, token);
            Console.WriteLine($"  [{endpoint}] обработан в потоке #{Environment.CurrentManagedThreadId}");
        });

        // 3. Channel<T>: асинхронный конвейер «производитель — потребитель» с ограничением буфера (backpressure)
        Channel<string> channel = Channel.CreateBounded<string>(capacity: 2);

        // Запускаем фонового производителя, который кладёт сообщения в канал и закрывает его по завершении
        Task producerTask = Task.Run(async () =>
        {
            for (int i = 1; i <= 4; i++)
            {
                await channel.Writer.WriteAsync($"Событие #{i}", cts.Token);
                Console.WriteLine($"\n[Производитель]: отправил Событие #{i}");
            }
            channel.Writer.Complete(); // Сигнал потребителю, что новых данных больше не будет
        }, cts.Token);

        // Потребитель читает сообщения из канала по мере их поступления
        await foreach (string message in channel.Reader.ReadAllAsync(cts.Token))
        {
            await Task.Delay(100, cts.Token);
            Console.WriteLine($"  [Потребитель]: обработал {message}");
        }

        await producerTask;

        // ❌ Ошибка 1: использование старого Parallel.ForEach с async-лямбдой (компилируется как async void!)
        // Parallel.ForEach не ждёт завершения задач и не ловит исключения из них:
        // Parallel.ForEach(endpoints, async ep => await Task.Delay(100));

        // ❌ Ошибка 2: забытый [EnumeratorCancellation] у параметра CancellationToken в IAsyncEnumerable<T>
        // Без этого атрибута вызов .WithCancellation(ct) не передаст токен внутрь метода-итератора
    }

    // Асинхронный генератор: отдаёт элементы по мере загрузки каждой порции
    static async IAsyncEnumerable<string> FetchRecordsStreamAsync(
        int totalPages,
        [EnumeratorCancellation] CancellationToken ct = default)
    {
        for (int page = 1; page <= totalPages; page++)
        {
            await Task.Delay(120, ct); // Имитация сетевого запроса за очередной страницей
            yield return $"Запись со страницы #{page}";
        }
    }
}

```

## Важные нюансы

* **`IAsyncEnumerable<T>` против `Task<List<T>>` и роль `[EnumeratorCancellation]`:** метод, возвращающий `Task<List<T>>`, вынужден дождаться загрузки всех страниц или записей целиком, прежде чем отдать первый результат, тогда как `IAsyncEnumerable<T>` начинает отдавать данные сразу после получения первой порции. Чтобы цепочка `await foreach (var x in GetItemsAsync().WithCancellation(ct))` корректно пробросила токен отмены внутрь генератора, параметр `CancellationToken` в методе-итераторе обязательно помечают атрибутом `[EnumeratorCancellation]`.
* **Почему для `async`-кода нужен `Parallel.ForEachAsync`, а не `Parallel.ForEach`:** классический `Parallel.ForEach` рассчитан исключительно на синхронные CPU-операции — если передать в него `async`-лямбду, она скомпилируется как `Action` (`async void`), цикл завершится мгновенно, не дождавшись выполнения задач, а выброшенные исключения аварийно завершат процесс. Метод `Parallel.ForEachAsync` (появился в .NET 6) корректно ожидает все асинхронные задачи и ограничивает одновременную нагрузку через `MaxDegreeOfParallelism`.
* **Архитектура `Channel<T>` и противодавление (*Backpressure*):** канал `Channel<T>` разделён на `Writer` (запись) и `Reader` (чтение) и работает быстрее ручной связки `ConcurrentQueue<T>` + `SemaphoreSlim` за счёт оптимизированных конечных автоматов без лишних выделений памяти. На практике почти всегда используют ограниченный канал `Channel.CreateBounded<T>(capacity)`: когда буфер заполняется, `Writer.WriteAsync` автоматически приостанавливает производителя без блокировки потока (*backpressure*), защищая приложение от переполнения памяти при резком всплеске входящих событий.
* **Связь с теорией и следующей темой:** ленивая генерация элементов в `IAsyncEnumerable<T>` развивает идею синхронных итераторов `IEnumerable<T>` и `yield return` из группы 150 (*Обобщения и контракты*), а в следующей заключительной карточке группы мы сведём воедино все инструменты асинхронности и многопоточности и составим алгоритм выбора под конкретную задачу (*Асинхронность и многопоточность*).

