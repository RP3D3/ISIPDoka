---
title: WhenAll, WhenAny и ValueTask
keywords: асинхронность C#, Task.WhenAll, Task.WhenAny, ValueTask, Task.Delay, параллельный запуск задач, оптимизация аллокаций, комбинаторы задач
---

# WhenAll, WhenAny и ValueTask: комбинаторы и кэш

Как запустить несколько независимых асинхронных запросов одновременно вместо последовательного ожидания, получить первый готовый ответ и не выделять память под объект `Task`, когда результат уже лежит в кэше?

Последовательный вызов `await` для независимых операций заставляет программу ждать каждую из них по очереди, складывая время их выполнения. Комбинаторы `Task.WhenAll` и `Task.WhenAny` позволяют запускать задачи конкурентно и объединять их: первый дожидается завершения *всех* переданных задач и собирает их результаты, а второй срабатывает сразу после окончания *самой быстрой* из них. Для горячих участков кода, где метод чаще всего возвращает уже готовый результат синхронно (например, из кэша или внутреннего буфера), используют структуру `ValueTask<TResult>` — она позволяет вернуть значение без выделения объекта `Task` в управляемой куче (*Heap*).

## Основные комбинаторы задач и ValueTask

| Инструмент / метод | Синтаксис / сигнатура | Назначение и особенности |
| --- | --- | --- |
| **`Task.WhenAll(...)`** | `T[] results = await Task.WhenAll(t1, t2);` | Запускает задачи конкурентно и ждёт завершения **всех**; для `Task<T>` возвращает массив результатов `T[]` |
| **`Task.WhenAny(...)`** | `Task<T> winner = await Task.WhenAny(t1, t2);` | Завершается, как только выполнится **любая первая** задача; возвращает саму победившую задачу |
| **`Task.Delay(...)`** | `await Task.Delay(TimeSpan.FromSeconds(1));` | Неблокирующая асинхронная пауза (в отличие от `Thread.Sleep` не удерживает поток пула) |
| **`ValueTask` / `ValueTask<T>**` | `public ValueTask<string> GetAsync(int id)` | Структура-обёртка: возвращает готовый результат без аллокации в куче или оборачивает `Task<T>` при ожидании |

## Пример кода

```csharp
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;

class Program
{
    private static readonly Dictionary<int, string> Cache = new()
    {
        [1] = "Кэшированный профиль: Роман"
    };

    static async Task Main()
    {
        // 1. Task.WhenAll: запускаем 3 независимых запроса одновременно (~300 мс вместо 900 мс)
        Stopwatch sw = Stopwatch.StartNew();

        Task<string> userTask = LoadDataAsync("Профиль", delayMs: 300);
        Task<string> ordersTask = LoadDataAsync("Заказы", delayMs: 250);
        Task<string> balanceTask = LoadDataAsync("Баланс", delayMs: 200);

        string[] results = await Task.WhenAll(userTask, ordersTask, balanceTask);
        sw.Stop();

        Console.WriteLine($"WhenAll завершён за {sw.ElapsedMilliseconds} мс: {string.Join(" | ", results)}");

        // 2. Task.WhenAny: гонка двух зеркал сервера — берём ответ самого быстрого
        Task<string> mirrorA = LoadDataAsync("Зеркало Европа", delayMs: 400);
        Task<string> mirrorB = LoadDataAsync("Зеркало Азия", delayMs: 120);

        Task<string> fastestTask = await Task.WhenAny(mirrorA, mirrorB);
        // Второй await распаковывает результат победившей задачи (или выбрасывает её исключение)
        string fastestResponse = await fastestTask;
        Console.WriteLine($"\nWhenAny выбрал: {fastestResponse}");

        // 3. ValueTask<T>: попадание в кэш не создаёт объект Task<string> в управляемой куче
        string fromCache = await GetUserProfileAsync(userId: 1); // Синхронный путь (0 аллокаций)
        string fromDb = await GetUserProfileAsync(userId: 2);    // Асинхронный путь (оборачивает Task)
        Console.WriteLine($"\nИз кэша: {fromCache}\nИз БД:   {fromDb}");

        // ❌ Ошибка 1: повторный await одного и того же ValueTask<T> нарушает его контракт и ломает состояние
        // ValueTask<string> vt = GetUserProfileAsync(2);
        // string a = await vt;
        // string b = await vt; // Неопределённое поведение / InvalidOperationException!

        // ❌ Ошибка 2: последовательный await вместо WhenAll утраивает время ожидания
        // var r1 = await LoadDataAsync("A", 300);
        // var r2 = await LoadDataAsync("B", 300);
    }

    static async Task<string> LoadDataAsync(string source, int delayMs)
    {
        await Task.Delay(delayMs);
        return $"{source} ({delayMs} мс)";
    }

    // Метод возвращает ValueTask<string>, так как 90% запросов попадают в кэш и завершаются мгновенно
    static async ValueTask<string> GetUserProfileAsync(int userId)
    {
        if (Cache.TryGetValue(userId, out string? cached))
        {
            return cached; // Компилятор вернёт ValueTask<string> без выделения Task в куче
        }

        await Task.Delay(150);
        string loaded = $"Загруженный из БД профиль #{userId}";
        Cache[userId] = loaded;
        return loaded;
    }
}

```

## Важные нюансы

* **Последовательный `await` против `Task.WhenAll` и сбор нескольких ошибок:** чтобы задачи выполнялись параллельно, сначала запустите их все (получив переменные `Task<T>`), и только затем передайте в `await Task.WhenAll(...)`. Если сразу несколько задач внутри `WhenAll` завершатся с ошибкой, конструкция `await` выбросит только *первое* исключение, но все остальные ошибки сохранятся внутри свойства `whenAllTask.Exception?.InnerExceptions` (тип `AggregateException`).
* **Двойной `await` в `Task.WhenAny` и судьба проигравших задач:** метод `Task.WhenAny` возвращает `Task<Task<TResult>>`, поэтому первый `await` даёт саму победившую задачу, а второй `await` (`await await Task.WhenAny(...)`) извлекает её результат или пробрасывает исключение, если победитель упал. При этом `WhenAny` **не отменяет** остальные задачи — они продолжают работать в фоне, пока не завершатся или не будут остановлены вручную.
* **Когда нужен `ValueTask<T>` и его строгие правила:** `ValueTask<T>` является структурой (`struct`) и экономит память только там, где метод в подавляющем большинстве вызовов завершается синхронно (чтение из буфера, кэша или `Channel<T>`). В отличие от обычного `Task<T>`, экземпляр `ValueTask<T>` разрешается ожидать через `await` **строго один раз**, к его свойству `.Result` нельзя обращаться до завершения операции, а для передачи в `Task.WhenAll` его нужно предварительно превратить в обычный `Task` вызовом `.AsTask()`.
* **Связь с теорией и следующей темой:** экономия аллокаций с помощью структуры `ValueTask<T>` опирается на разницу между стеком и кучей из группы 130 (*Пользовательские типы и память*), а в следующей карточке мы разберём, как корректно прерывать зависшие задачи и отменять проигравшие запросы после `Task.WhenAny` (*Отмена операций: `CancellationToken*`).

