---
title: Строки, даты и файлы
keywords: строки даты и файлы, StringBuilder и ReadOnlySpan, GeneratedRegex, DateTimeOffset и DateOnly, Path и File, потоки Stream, System.Text.Json, выбор инструмента C#
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
* **Что дальше:** научившись безопасно обрабатывать строки, время и файлы, мы переходим к защите программы от нештатных ситуаций при работе с внешним миром — разберём механизм исключений, создание собственных типов ошибок и инструменты диагностики (см. следующую группу: *Исключения, отладка и диагностика*).

