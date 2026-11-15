---
title: CancellationToken
keywords: отмена операций C#, CancellationToken, CancellationTokenSource, OperationCanceledException, таймаут async, CancelAfter, CreateLinkedTokenSource, кооперативная отмена
---

# CancellationToken: кооперативная отмена операций

Как вовремя остановить долгий сетевой запрос или фоновый расчёт, если пользователь закрыл страницу или истёк таймаут, не обрывая поток аварийно с повреждением данных?

В .NET используется модель **кооперативной отмены** (*cooperative cancellation*): вызывающий код не «убивает» задачу принудительно, а отправляет сигнал через структуру `CancellationToken`, а сам асинхронный метод периодически проверяет этот токен и корректно завершает работу. Управление отменой разделено на два объекта: владелец операции создаёт управляющий источник `CancellationTokenSource` (CTS), а в вызываемые методы передаёт только лёгкую структуру `cts.Token` для чтения. Когда срабатывает метод `Cancel()` или истекает заданный таймаут (`CancelAfter`), операция выбрасывает `OperationCanceledException`, освобождая ресурсы и не тратя процессорное время впустую.

## Основные компоненты механизма отмены

| Инструмент / метод | Синтаксис / сигнатура | Назначение и особенности |
| --- | --- | --- |
| **`CancellationTokenSource`** | `using var cts = new CancellationTokenSource();` | Создаёт сигнал отмены, управляет им через `Cancel()` и требует освобождения через `using` |
| **`CancellationToken`** | `Task LoadAsync(CancellationToken ct = default)` | Лёгкая структура (передаётся последним параметром), позволяющая только проверять сигнал отмены |
| **`CancelAfter` / таймаут** | `new CancellationTokenSource(TimeSpan.FromSeconds(5))` | Автоматически переводит токен в отменённое состояние по истечении заданного времени |
| **`ThrowIfCancellationRequested()`** | `ct.ThrowIfCancellationRequested();` | Проверяет свойство `IsCancellationRequested` и выбрасывает `OperationCanceledException` при отмене |
| **`CreateLinkedTokenSource`** | `CancellationTokenSource.CreateLinkedTokenSource(ct1, ct2)` | Объединяет несколько токенов в один (сработает при отмене **любого** из исходных токенов) |

## Пример кода

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        // 1. Создаём источник отмены с автоматическим таймаутом 350 мс (обязательно с using!)
        using CancellationTokenSource timeoutCts = new CancellationTokenSource(TimeSpan.FromMilliseconds(350));

        try
        {
            Console.WriteLine("Запуск загрузки отчёта с ограничением по времени...");
            await GenerateReportAsync(itemsCount: 10, cancellationToken: timeoutCts.Token);
            Console.WriteLine("Отчёт успешно сформирован.");
        }
        catch (OperationCanceledException)
        {
            // Сюда попадёт и OperationCanceledException, и его наследник TaskCanceledException
            Console.WriteLine("Операция отменена: превышено время ожидания.");
        }

        // 2. Комбинирование токенов: отмена сработает либо по внешнему сигналу, либо по локальному таймауту
        using CancellationTokenSource userCts = new CancellationTokenSource();
        using CancellationTokenSource localLimitCts = new CancellationTokenSource(TimeSpan.FromSeconds(2));
        using CancellationTokenSource linkedCts = CancellationTokenSource.CreateLinkedTokenSource(
            userCts.Token,
            localLimitCts.Token);

        await QuickCheckAsync(linkedCts.Token);

        // ❌ Ошибка 1: игнорирование токена при вызове встроенных async-методов (задача продолжит висеть)
        // await Task.Delay(5000); // Правильно: await Task.Delay(5000, cancellationToken);

        // ❌ Ошибка 2: перехват общего Exception без исключения OperationCanceledException маскирует отмену под сбой
        // catch (Exception ex) { LogError(ex); } // Правильно добавить: when (ex is not OperationCanceledException)
    }

    // По соглашению .NET параметр CancellationToken всегда ставится последним со значением default
    static async Task GenerateReportAsync(int itemsCount, CancellationToken cancellationToken = default)
    {
        for (int i = 1; i <= itemsCount; i++)
        {
            // Проверяем сигнал отмены перед каждым шагом работы
            cancellationToken.ThrowIfCancellationRequested();

            Console.WriteLine($"  Обработка блока {i} из {itemsCount}...");
            // Пробрасываем токен дальше во все поддерживающие его асинхронные вызовы
            await Task.Delay(100, cancellationToken);
        }
    }

    static async Task QuickCheckAsync(CancellationToken ct = default)
    {
        await Task.Delay(50, ct);
        Console.WriteLine("\nБыстрая проверка с комбинированным токеном завершена.");
    }
}

```

## Важные нюансы

* **Разделение ответственности (`CancellationTokenSource` против `CancellationToken`):** никогда не передавайте сам `CancellationTokenSource` в дочерние методы — это нарушает инкапсуляцию и позволяет любому методу отменить чужую операцию. Передавайте только `cts.Token` самым последним параметром метода со значением по умолчанию `= default` (пустой токен `CancellationToken.None`, который никогда не переходит в отменённое состояние).
* **Иерархия `OperationCanceledException` и `TaskCanceledException`:** встроенные методы .NET (такие как `Task.Delay` или `HttpClient.GetAsync`) при отмене выбрасывают `TaskCanceledException`, который наследуется от `OperationCanceledException`. Поэтому в блоке `catch` всегда перехватывайте базовый тип `OperationCanceledException` — он поймает оба исключения независимо от того, кто именно инициировал отмену.
* **Связывание токенов (`CreateLinkedTokenSource`) и освобождение таймеров:** в реальных сервисах часто нужно отменить запрос, если *либо* клиент разорвал соединение (внешний `ct`), *либо* сработал внутренний таймаут базы данных. Метод `CreateLinkedTokenSource` объединяет несколько токенов в один общий, при этом каждый `CancellationTokenSource` с таймаутом обязательно оборачивают в `using`, чтобы вовремя освободить внутренний системный таймер.
* **Связь с теорией и следующей темой:** кооперативная отмена позволяет корректно остановить проигравшие фоновые задачи после `Task.WhenAny` (см. предыдущую карточку *`WhenAll`, `WhenAny` и `ValueTask*`), а в следующей карточке мы разберём, как устроены потоки операционной системы, чем пул потоков отличается от `async / await` и когда нужно выносить тяжёлые расчёты в фон (*`Thread`, `ThreadPool` и `Task.Run*`).

