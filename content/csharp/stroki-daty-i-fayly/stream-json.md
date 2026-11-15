---
title: Stream & JSON
keywords: потоки Stream, FileStream, StreamReader и StreamWriter, кодировка UTF-8, System.Text.Json, сериализация JSON, JsonSerializerOptions, управление ресурсами using
---

# Потоки (Stream), кодировки и System.Text.Json

Как читать и записывать многогигабайтные файлы порциями без переполнения памяти, не испортить кириллицу неверной кодировкой и превращать C#-объекты в JSON и обратно?

Класс `Stream` из пространства имён `System.IO` описывает абстрактный поток байтов (файл на диске, сетевое соединение или буфер в памяти), позволяя обрабатывать данные любого объёма последовательно небольшими порциями без загрузки всего файла в ОЗУ. Для перевода текста в байты и обратно поверх байтовых потоков используют текстовые обёртки `StreamReader` и `StreamWriter` с явным указанием кодировки (`Encoding.UTF8`). Для обмена структурированными данными в современном .NET служит встроенный высокопроизводительный сериализатор `System.Text.Json`, который преобразует C#-объекты в JSON и обратно с минимальными выделениями памяти.

## Основные классы для потоков, кодировок и JSON

| Инструмент / метод | Синтаксис / пример | Назначение и особенности |
| --- | --- | --- |
| **`FileStream`** | `using var fs = new FileStream(path, ...);` | Низкоуровневый поток байтов файла; обязательно освобождается через блок `using` |
| **`StreamReader` / `StreamWriter**` | `using var reader = new StreamReader(fs, Encoding.UTF8);` | Построчное чтение и запись текста поверх потока с преобразованием символов по заданной кодировке |
| **`UTF8Encoding` / `Encoding.UTF8**` | `new UTF8Encoding(encoderShouldEmitUTF8Identifier: false)` | Определяет правила перевода символов в байты (UTF-8 без BOM — современный стандарт веба и Linux) |
| **`JsonSerializer.Serialize` / `Deserialize**` | `JsonSerializer.Serialize(stream, obj, options)` | Сериализует C#-объекты в строку или напрямую в поток JSON и восстанавливает их обратно |
| **`JsonSerializerOptions`** | `new JsonSerializerOptions(JsonSerializerDefaults.Web)` | Настраивает стиль имён (`camelCase`), отступы (`WriteIndented`) и нечувствительность к регистру при чтении |

## Пример кода

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;

class Program
{
    static void Main()
    {
        string tempDir = Path.Combine(Path.GetTempPath(), $"stream_demo_{Guid.NewGuid():N}");
        Directory.CreateDirectory(tempDir);

        string logPath = Path.Combine(tempDir, "events.log");
        string configPath = Path.Combine(tempDir, "config.json");

        // 1. Потоковая запись текста в UTF-8 без BOM: память не тратится на сборку гигантской строки
        Encoding utf8WithoutBom = new UTF8Encoding(encoderShouldEmitUTF8Identifier: false);
        using (StreamWriter writer = new StreamWriter(logPath, append: false, encoding: utf8WithoutBom))
        {
            writer.WriteLine("[INFO] Сервис запущен.");
            writer.WriteLine("[WARN] Высокая нагрузка на диск.");
            writer.WriteLine("[INFO] Резервное копирование завершено.");
        } // При выходе из using буфер сбрасывается на диск, а дескриптор файла закрывается

        // 2. Потоковое чтение построчно: подходит для логов размером в десятки гигабайт
        Console.WriteLine("Фильтрация строк из файла через StreamReader:");
        using (StreamReader reader = new StreamReader(logPath, Encoding.UTF8))
        {
            string? line;
            while ((line = reader.ReadLine()) != null)
            {
                if (line.Contains("[INFO]"))
                {
                    Console.WriteLine($"  {line}");
                }
            }
        }

        // 3. System.Text.Json: настройка опций и сериализация объекта напрямую в файловый поток
        AppConfig config = new AppConfig("Сервер отчётов", MaxRetries: 3, new List<string> { "Admin", "Operator" });
        JsonSerializerOptions jsonOptions = new JsonSerializerOptions(JsonSerializerDefaults.Web)
        {
            WriteIndented = true,
            Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping // Сохраняет кириллицу читаемой без \u0421...
        };

        using (FileStream writeStream = File.Create(configPath))
        {
            JsonSerializer.Serialize(writeStream, config, jsonOptions);
        }

        Console.WriteLine($"\nСодержимое JSON-файла:\n{File.ReadAllText(configPath)}");

        // 4. Десериализация из потока обратно в C#-объект
        using (FileStream readStream = File.OpenRead(configPath))
        {
            AppConfig? restored = JsonSerializer.Deserialize<AppConfig>(readStream, jsonOptions);
            Console.WriteLine($"\nВосстановлен объект: {restored?.AppName}, попыток: {restored?.MaxRetries}");
        }

        Directory.Delete(tempDir, recursive: true);

        // ❌ Ошибка 1: отсутствие using у StreamWriter оставляет данные в буфере памяти и блокирует файл на диске
        // var leakyWriter = new StreamWriter(logPath);
        // leakyWriter.WriteLine("Эта строка может не попасть на диск при аварийном завершении!");

        // ❌ Ошибка 2: чтение файла в неверной кодировке превращает кириллицу в нечитаемые символы («кракозябры»)
        // string brokenText = File.ReadAllText(logPath, Encoding.ASCII);
    }
}

record AppConfig(string AppName, int MaxRetries, List<string> AllowedRoles);

```

## Важные нюансы

* **Зачем нужен `using` и внутренний буфер потоков:** `StreamWriter` и `FileStream` не записывают каждый символ на диск мгновенно — они накапливают данные в промежуточном буфере в оперативной памяти (обычно 4 КБ) и сбрасывают их пачкой. Если забыть закрыть поток через блок `using`, последние данные из буфера останутся в памяти и не попадут в файл, а сам файл останется заблокированным операционной системой (`IOException`).
* **Кодировка UTF-8 с BOM и без BOM:** стандартное свойство `Encoding.UTF8` в .NET добавляет в самое начало файла 3 служебных байта метки порядка байтов (BOM — `EF BB BF`), из-за чего некоторые Linux-утилиты и парсеры конфигураций могут выдавать ошибку. Чтобы записывать чистый UTF-8 без BOM, передавайте `new UTF8Encoding(encoderShouldEmitUTF8Identifier: false)`.
* **Особенности `System.Text.Json` (свойства, регистр и кириллица):** по умолчанию `JsonSerializer` сериализует только публичные свойства (`get; set;` или `init;`), игнорирует обычные поля класса, чувствителен к регистру имён при чтении и экранирует кириллицу в последовательности вида `\u0421...`. Чтобы включить стиль `camelCase` и нечувствительность к регистру, передавайте `new JsonSerializerOptions(JsonSerializerDefaults.Web)`, а для читаемой кириллицы в файле добавляйте `Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping`.
* **Связь с теорией и следующей темой:** освобождение дескрипторов файлов в `FileStream` и `StreamReader` опирается на паттерн `IDisposable` из раздела управления ресурсами, а в следующей заключительной карточке группы мы сведём воедино все инструменты работы со строками, датами и файлами (*Строки, даты и файлы*).

