---
title: Строки, даты и файлы
keywords: строки даты и файлы, StringBuilder и ReadOnlySpan, GeneratedRegex, DateTimeOffset и DateOnly, Path и File, потоки Stream, System.Text.Json, выбор инструмента C#
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
    .paper { transform-box: fill-box; transform-origin: center; animation: feed 5s ease-in-out infinite; }
    .stamp { transform-box: fill-box; transform-origin: center bottom; animation: press 5s ease-in-out infinite; }
    @keyframes feed {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-7px); }
    }
    @keyframes press {
      0%, 22%, 64%, 100% { transform: translateY(0px); }
      38%, 50% { transform: translateY(9px); }
    }
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

  <g transform="translate(356, 172)">
    <g class="paper">
      <rect x="-54" y="-98" width="108" height="56" rx="3" class="c-white s-dark" stroke-width="2" />
      <line x1="-40" y1="-82" x2="40" y2="-82" class="s-dark" stroke-width="2" stroke-linecap="round" />
      <line x1="-40" y1="-72" x2="26" y2="-72" class="s-dark" stroke-width="2" stroke-linecap="round" />
      <line x1="-40" y1="-62" x2="34" y2="-62" class="s-accent" stroke-width="2" stroke-linecap="round" />
    </g>

    <rect x="-60" y="-44" width="120" height="12" rx="6" class="c-dark" />
    <rect x="-92" y="-36" width="184" height="76" rx="10" class="c-white s-dark" stroke-width="2.5" />

    <rect x="-70" y="-16" width="14" height="8" rx="2" class="c-dark" />
    <rect x="-50" y="-16" width="14" height="8" rx="2" class="c-dark" />
    <rect x="-30" y="-16" width="14" height="8" rx="2" class="c-dark" />
    <rect x="-10" y="-16" width="14" height="8" rx="2" class="c-dark" />
    <rect x="10" y="-16" width="14" height="8" rx="2" class="c-dark" />
    <rect x="30" y="-16" width="14" height="8" rx="2" class="c-dark" />
    <rect x="50" y="-16" width="14" height="8" rx="2" class="c-dark" />

    <rect x="-70" y="2" width="14" height="8" rx="2" class="c-dark" />
    <rect x="-50" y="2" width="14" height="8" rx="2" class="c-dark" />
    <rect x="-30" y="2" width="14" height="8" rx="2" class="c-accent" />
    <rect x="-10" y="2" width="14" height="8" rx="2" class="c-dark" />
    <rect x="10" y="2" width="14" height="8" rx="2" class="c-dark" />
    <rect x="30" y="2" width="14" height="8" rx="2" class="c-dark" />
    <rect x="50" y="2" width="14" height="8" rx="2" class="c-dark" />

    <rect x="-70" y="20" width="134" height="8" rx="4" class="c-dark" opacity="0.25" />
  </g>
  <g transform="translate(356, 52)">
    <rect x="-29" y="-13" width="58" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">string</text>
  </g>

  <g transform="translate(660, 176)">
    <rect x="-8" y="-66" width="16" height="56" rx="8" class="c-white s-dark" stroke-width="2" />
    <circle cx="0" cy="-72" r="7" class="c-white s-dark" stroke-width="1.6" />
    <g class="stamp">
      <rect x="-36" y="-12" width="72" height="34" rx="6" class="c-white s-dark" stroke-width="2.5" />
      <text x="0" y="10" text-anchor="middle" class="c-dark mono" font-size="11" font-weight="700">12.03</text>
      <rect x="-32" y="22" width="64" height="9" rx="3" class="c-accent" />
    </g>
    <rect x="-42" y="32" width="84" height="8" rx="4" class="c-dark s-white" stroke-width="1.5" />
  </g>
  <g transform="translate(660, 250)">
    <rect x="-38" y="-13" width="76" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">DateTime</text>
  </g>
  </svg>
---

# Строки, даты и файлы: работа с данными и диском

Как без лишней нагрузки на сборщик мусора, путаницы с часовыми поясами и блокировок файлов выстроить надёжный конвейер разбора текста, учёта времени и сохранения данных на диск?

Работа с внешними данными в C# строится на трёх взаимосвязанных опорах: эффективной обработке текста, строгой модели времени и потоковом вводе-выводе. Неизменяемость `string` защищает текст от случайных изменений в многопоточной среде, но для сборки в цикле требует буфера `StringBuilder`, для нарезки без аллокаций — срезов `ReadOnlySpan<char>`, а для сложных шаблонов — скомпилированного на этапе сборки `[GeneratedRegex]`. Точную хронологию событий фиксируют через `DateTimeOffset` и `DateOnly` с явным `CultureInfo.InvariantCulture`, а для записи на диск выбирают между быстрыми методами `File` (для малых объёмов) и буферизованными потоками `Stream` с `System.Text.Json` внутри блоков `using`.

## Сводная карта инструментов группы

| Категория и инструменты | Суть механизма | Когда применять |
| --- | --- | --- |
| **Сборка и нарезка текста** (`string`, `StringBuilder`, `ReadOnlySpan<char>`) | Неизменяемые строки UTF-16, изменяемый буфер в куче и стековые «окна» без копирования байтов | `$"..."` — для простых строк; `StringBuilder` — для циклов; `AsSpan()` — для быстрого разбора подстрок |
| **Сравнение и шаблоны** (`StringComparison`, `[GeneratedRegex]`) | Посимвольное сравнение без учёта локали ОС и генерация конечного автомата при компиляции | `OrdinalIgnoreCase` — для ключей и ролей; `[GeneratedRegex]` с таймаутом — для валидации и парсинга |
| **Дата, время и интервалы** (`DateTimeOffset`, `DateOnly`, `TimeOnly`, `TimeSpan`) | Момент времени со смещением от UTC, календарная дата без пояса, время суток и длительность | `DateTimeOffset` — для логов и API; `DateOnly` — для дат рождения и дедлайнов; `TimeProvider` — для тестов |
| **Файловая система** (`Path`, `File`, `Directory.EnumerateFiles`, `FileInfo`) | Кроссплатформенная сборка путей, разовые операции с файлами и ленивый обход каталогов | `Path.Combine` — всегда для путей; `File` — для мелких файлов; `EnumerateFiles` — для больших папок |
| **Потоки, кодировки и JSON** (`FileStream`, `StreamReader`, `UTF8Encoding`, `JsonSerializer`) | Последовательное чтение/запись порциями поверх дескрипторов ОС и сериализация объектов | Для файлов любого размера, сетевых потоков, настройки кодировки UTF-8 без BOM и обмена по JSON |

## Пример кода

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;

class Program
{
    static void Main()
    {
        // 1. ReadOnlySpan<char> + DateTimeOffset: разбираем входящую строку без лишних выделений памяти
        string rawEvent = "2026-11-14T18:30:00+03:00|ORDER_904|4850.00";
        ReadOnlySpan<char> span = rawEvent.AsSpan();

        int firstSep = span.IndexOf('|');
        int secondSep = span[(firstSep + 1)..].IndexOf('|') + firstSep + 1;

        DateTimeOffset.TryParseExact(
            span[..firstSep],
            "yyyy-MM-dd'T'HH:mm:sszzz",
            CultureInfo.InvariantCulture,
            DateTimeStyles.None,
            out DateTimeOffset timestamp);

        string orderCode = span[(firstSep + 1)..secondSep].ToString();
        decimal total = decimal.Parse(span[(secondSep + 1)..], CultureInfo.InvariantCulture);

        // 2. DateOnly + StringBuilder: формируем сводку по дате без привязки к часовому поясу
        DateOnly reportDate = DateOnly.FromDateTime(timestamp.DateTime);
        StringBuilder summary = new StringBuilder(capacity: 128);
        summary.Append("Отчёт за ").Append(reportDate.ToString("dd.MM.yyyy", CultureInfo.InvariantCulture))
               .Append(": ").Append(orderCode).Append(" на сумму ").Append(total).Append(" руб.");

        // 3. Path + FileStream + System.Text.Json: безопасно сохраняем результат на диск в UTF-8
        string workDir = Path.Combine(Path.GetTempPath(), $"summary_{Guid.NewGuid():N}");
        Directory.CreateDirectory(workDir);
        string jsonPath = Path.Combine(workDir, "report.json");

        DailyReport report = new DailyReport(reportDate, timestamp, orderCode, total, summary.ToString());
        JsonSerializerOptions options = new JsonSerializerOptions(JsonSerializerDefaults.Web)
        {
            WriteIndented = true,
            Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
        };

        using (FileStream fs = File.Create(jsonPath))
        {
            JsonSerializer.Serialize(fs, report, options);
        }

        Console.WriteLine(File.ReadAllText(jsonPath, Encoding.UTF8));
        Directory.Delete(workDir, recursive: true);

        // ❌ Типичные ошибки группы:
        // 1. Склеивание строк через '+=' в цикле и сравнение через .ToLower() == .ToLower()
        // 2. Хранение дат событий в локальном DateTime.Now и парсинг без CultureInfo.InvariantCulture
        // 3. Загрузка многогигабайтных файлов через File.ReadAllText() и забытый using у FileStream
    }
}

record DailyReport(DateOnly Date, DateTimeOffset RecordedAt, string OrderCode, decimal Total, string Summary);

```

## Важные нюансы

* **Выбор инструмента для строк определяется объёмом и сценарием:** для 2–4 подстановок используйте интерполяцию `$"..."`, для накопления текста в цикле — `StringBuilder` с заданной ёмкостью `capacity`, для разбора готовых строк без аллокаций — `ReadOnlySpan<char>`, а для сложных шаблонов поиска — `[GeneratedRegex]` с обязательным таймаутом от зависаний (*ReDoS*).
* **Хронология без сюрпризов часовых поясов:** моменты событий, логи и метки в БД/API всегда храните в `DateTimeOffset` (или в UTC через `TimeProvider.System.GetUtcNow()`), календарные даты без времени суток выделяйте в `DateOnly`, а при парсинге из текстовых форматов всегда передавайте `CultureInfo.InvariantCulture`.
* **Размер данных диктует способ работы с диском:** статические методы `File.ReadAllText` и `File.WriteAllLines` удобны для небольших конфигураций, но для больших логов и JSON-файлов используйте потоки (`FileStream`, `StreamReader`, `StreamWriter`) в связке с блоком `using` и явной кодировкой `new UTF8Encoding(encoderShouldEmitUTF8Identifier: false)`.
* **Что дальше:** научившись безопасно обрабатывать строки, время и файлы, мы переходим к конкурентности — разберём, как выполнять работу параллельно, не блокируя программу, и защищать общие данные (см. следующую группу: *Асинхронность и многопоточность*).

## Куда дальше

* [Строки](https://learn.microsoft.com/dotnet/csharp/programming-guide/strings/) — неизменяемость, сравнение и интерполяция.
* [Форматирование типов](https://learn.microsoft.com/dotnet/standard/base-types/formatting-types) — стандартные и пользовательские строки формата.
