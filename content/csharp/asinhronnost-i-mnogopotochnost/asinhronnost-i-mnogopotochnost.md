---
title: Асинхронность и многопоточность
keywords: асинхронность и многопоточность, async и await, Task и ValueTask, CancellationToken, Task.Run и ThreadPool, lock и SemaphoreSlim, IAsyncEnumerable и Channel, выбор инструмента C#
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
    .waiter { transform-box: fill-box; transform-origin: center; animation: serve 6s ease-in-out infinite; }
    .tray-item { transform-box: fill-box; transform-origin: center; animation: bob 6s ease-in-out infinite; }
    .steam-1 { transform-box: fill-box; transform-origin: center; animation: steam 4s ease-in-out infinite; }
    .steam-2 { transform-box: fill-box; transform-origin: center; animation: steam 4s ease-in-out infinite 1.2s; }
    .route { stroke-dasharray: 5 10; animation: flow 1.5s linear infinite; }
    @keyframes serve {
      0%, 12% { transform: translateX(0px); }
      55%, 78% { transform: translateX(130px); }
      94%, 100% { transform: translateX(0px); }
    }
    @keyframes bob {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-2px); }
    }
    @keyframes steam {
      0%, 100% { transform: translateY(0px); opacity: 0.2; }
      50% { transform: translateY(-6px); opacity: 0.8; }
    }
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

  <line x1="150" y1="198" x2="760" y2="198" class="s-white" stroke-width="4" stroke-linecap="round" />
  <line x1="162" y1="198" x2="162" y2="222" class="s-white" stroke-width="3" stroke-linecap="round" />
  <line x1="748" y1="198" x2="748" y2="222" class="s-white" stroke-width="3" stroke-linecap="round" />

  <path d="M 250 224 C 360 234 470 228 560 212" class="s-white route" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.45" />

  <g transform="translate(205, 120) scale(1.08)">
    <g class="waiter">
      <line x1="-10" y1="44" x2="-16" y2="72" class="s-white" stroke-width="5" stroke-linecap="round" />
      <line x1="10" y1="44" x2="16" y2="72" class="s-white" stroke-width="5" stroke-linecap="round" />

      <rect x="-20" y="-50" width="40" height="62" rx="15" class="c-white s-dark" stroke-width="2.4" />
      <rect x="-14" y="-16" width="28" height="28" rx="8" class="c-accent" />
      <circle cx="0" cy="-70" r="17" class="c-white s-dark" stroke-width="2.4" />
      <circle cx="-6" cy="-72" r="2.6" class="c-dark" />
      <circle cx="7" cy="-72" r="2.6" class="c-dark" />
      <path d="M 4 -63 Q 8 -60 12 -63" class="s-dark" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M -16 -74 Q 0 -90 16 -74" class="c-dark s-white" stroke-width="2" stroke-linejoin="round" />

      <path d="M 16 -36 L 36 -50" class="s-white" stroke-width="5" stroke-linecap="round" />
      <circle cx="37" cy="-51" r="4" class="c-white s-dark" stroke-width="1.6" />
      <ellipse cx="62" cy="-54" rx="40" ry="6" class="c-white s-dark" stroke-width="2.2" />
      <ellipse cx="62" cy="-56" rx="32" ry="4" class="s-dark" stroke-width="1.4" opacity="0.35" />

      <g class="tray-item">
        <rect x="37" y="-72" width="18" height="16" rx="4" class="c-white s-dark" stroke-width="1.8" />
        <rect x="37" y="-68" width="18" height="5" class="c-accent" />
        <path d="M 55 -68 C 61 -68 61 -60 55 -60" class="s-dark" stroke-width="1.8" fill="none" />
      </g>
      <g class="tray-item">
        <ellipse cx="82" cy="-58" rx="14" ry="4" class="c-white s-dark" stroke-width="1.8" />
        <ellipse cx="82" cy="-59" rx="7" ry="2" class="c-accent" />
      </g>

      <g transform="translate(46, -84)">
        <path d="M -8 10 C -16 0 -2 -4 -8 -14" class="s-white steam-1" stroke-width="2" fill="none" stroke-linecap="round" />
        <path d="M 10 12 C 2 2 16 -2 10 -12" class="s-white steam-2" stroke-width="2" fill="none" stroke-linecap="round" />
      </g>
    </g>
  </g>

  <g transform="translate(600, 140)">
    <ellipse cx="0" cy="0" rx="52" ry="11" class="c-white s-dark" stroke-width="2.4" />
    <rect x="-6" y="8" width="12" height="44" rx="5" class="c-white s-dark" stroke-width="2" />
    <ellipse cx="0" cy="54" rx="30" ry="7" class="c-white s-dark" stroke-width="2" />
    <g class="tray-item">
      <ellipse cx="-4" cy="-11" rx="21" ry="5" class="c-white s-dark" stroke-width="1.8" />
      <path d="M -14 -17 H 6 L 3 -9 H -11 Z" class="c-white s-dark" stroke-width="1.8" stroke-linejoin="round" />
      <path d="M 6 -15 C 12 -15 12 -9 6 -9" class="s-dark" stroke-width="1.8" fill="none" />
      <ellipse cx="-4" cy="-18" rx="10" ry="2.5" class="c-accent" />
    </g>
  </g>

  <g transform="translate(600, 96)">
    <path d="M -8 10 C -16 0 -2 -4 -8 -14" class="s-white steam-1" stroke-width="2.2" fill="none" stroke-linecap="round" />
    <path d="M 10 12 C 2 2 16 -2 10 -12" class="s-white steam-2" stroke-width="2.2" fill="none" stroke-linecap="round" />
  </g>

  <g transform="translate(744, 150)">
    <ellipse cx="0" cy="0" rx="46" ry="10" class="c-white s-dark" stroke-width="2.4" />
    <rect x="-6" y="7" width="12" height="38" rx="5" class="c-white s-dark" stroke-width="2" />
    <ellipse cx="0" cy="48" rx="26" ry="6" class="c-white s-dark" stroke-width="2" />
    <rect x="-15" y="-40" width="30" height="36" rx="4" class="c-white s-dark" stroke-width="2" />
    <path d="M -7 -30 L -1 -23 L 8 -34" class="s-accent" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <g transform="translate(112, 150)">
    <rect x="-35" y="-13" width="70" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">async</text>
  </g>
  <g transform="translate(600, 76)">
    <rect x="-44" y="-13" width="88" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">Task</text>
  </g>
  <g transform="translate(744, 250)">
    <rect x="-33" y="-13" width="66" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">await</text>
  </g>
  </svg>
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
* **Итог и дальнейший вектор:** пройдя путь от переменных и коллекций до LINQ, работы с текстом, файлами и асинхронности, вы собрали полный фундамент современного языка C#. Осталась последняя группа — 220 *Внутреннее устройство .NET, память и рефлексия*: она объясняет, что происходит под капотом. Следующим шагом станет применение инструментов в реальной архитектуре приложений (Dependency Injection, логирование и конфигурация, Entity Framework Core и веб-разработка на ASP.NET Core).

## Куда дальше

* [Асинхронное программирование](https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/) — `async`/`await`, `Task` и отмена операций.
* [Task-based Asynchronous Pattern (TAP)](https://learn.microsoft.com/dotnet/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap) — как устроена модель задач в .NET.
