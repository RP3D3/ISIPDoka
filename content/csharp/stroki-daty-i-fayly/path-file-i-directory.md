---
title: Path, File и Directory
keywords: файловая система C#, System.IO, Path.Combine, File и Directory, FileInfo, EnumerateFiles, кроссплатформенные пути, чтение и запись файлов
---

# Файловая система: Path, File, Directory и FileInfo

Как собирать пути к файлам без привязки к Windows или Linux, быстро читать и записывать небольшие файлы и обходить огромные каталоги без переполнения памяти?

Пространство имён `System.IO` предоставляет готовый набор инструментов для работы с диском. Статический класс `Path` отвечает за безопасную сборку и разбор строковых путей с учётом разделителей конкретной операционной системы (`\` в Windows и `/` в Linux/macOS). Статические классы `File` и `Directory` идеально подходят для разовых операций (прочитать текст, создать папку, проверить существование), тогда как экземплярные классы `FileInfo` и `DirectoryInfo` кэшируют метаданные объекта и эффективнее при многократном обращении к свойствам одного и того же файла или каталога.

## Основные классы и методы файловой системы

| Инструмент / метод | Синтаксис / пример | Назначение и особенности |
| --- | --- | --- |
| **`Path.Combine` / `Path.Join**` | `Path.Combine(baseDir, "logs", "app.log")` | Склеивает сегменты пути, автоматически подставляя нужный разделитель ОС |
| **`Path.GetExtension` / `ChangeExtension**` | `Path.GetFileNameWithoutExtension(path)` | Извлекает имя файла, расширение или меняет его без ручной нарезки строк |
| **`File.ReadAllText` / `WriteAllLines**` | `string text = File.ReadAllText(path);` | Открывает файл, считывает или записывает всё содержимое целиком и закрывает дескриптор |
| **`Directory.CreateDirectory`** | `Directory.CreateDirectory(nestedPath)` | Рекурсивно создаёт всю цепочку вложенных папок и не падает, если каталог уже существует |
| **`Directory.EnumerateFiles`** | `Directory.EnumerateFiles(dir, "*.log", ...)` | Лениво перебирает файлы через `IEnumerable<string>`, не загружая весь список имён в память разом |
| **`FileInfo` / `DirectoryInfo**` | `var info = new FileInfo(path); info.Length` | Кэшируют метаданные (размер, дату изменения, атрибуты) и позволяют выполнять цепочку действий |

## Пример кода

```csharp
using System;
using System.IO;

class Program
{
    static void Main()
    {
        // 1. Path: кроссплатформенная сборка путей во временной директории системы
        string workDir = Path.Combine(Path.GetTempPath(), $"csharp_io_{Guid.NewGuid():N}");
        string reportsDir = Path.Combine(workDir, "2026", "November");

        // CreateDirectory создаст сразу все недостающие промежуточные папки (workDir -> 2026 -> November)
        Directory.CreateDirectory(reportsDir);

        string reportPath = Path.Combine(reportsDir, "summary.txt");

        // 2. File: быстрая запись и чтение небольших файлов одной командой
        string[] lines =
        {
            "Отчёт сформирован автоматически",
            $"Каталог: {Path.GetFileName(reportsDir)}",
            "Статус: Успешно"
        };
        File.WriteAllLines(reportPath, lines);

        // 3. FileInfo: получаем сразу несколько свойств файла за одно обращение к файловой системе
        FileInfo fileInfo = new FileInfo(reportPath);
        Console.WriteLine($"Файл: {Path.GetFileNameWithoutExtension(fileInfo.Name)}");
        Console.WriteLine($"Расширение: {fileInfo.Extension} | Размер: {fileInfo.Length} байт");
        Console.WriteLine($"Создан (UTC): {fileInfo.CreationTimeUtc:yyyy-MM-dd HH:mm:ss}");

        // 4. EnumerateFiles: ленивый поиск всех .txt файлов во вложенных папках без загрузки массива в память
        Console.WriteLine("\nНайденные текстовые файлы:");
        foreach (string foundFile in Directory.EnumerateFiles(workDir, "*.txt", SearchOption.AllDirectories))
        {
            Console.WriteLine($"  -> {foundFile}");
            Console.WriteLine($"     Первая строка: {File.ReadAllLines(foundFile)[0]}");
        }

        // Очищаем временную папку после демонстрации
        Directory.Delete(workDir, recursive: true);

        // ❌ Ошибка 1: жёсткий слэш '\' в строке сломает работу программы на Linux и macOS
        // string badPath = workDir + "\\2026\\summary.txt";

        // ❌ Ошибка 2: ведущий слэш во втором аргументе Path.Combine отбрасывает первую часть пути!
        // string droppedRoot = Path.Combine(@"C:\Projects", @"\Logs\app.log"); // Вернёт "\Logs\app.log"
    }
}

```

## Важные нюансы

* **Ловушка `Path.Combine` со вторым путём, начинающимся со слэша:** если второй аргумент в `Path.Combine(@"C:\Data", @"\Logs\app.txt")` начинается с разделителя, метод воспринимает его как корневой путь и молча отбрасывает первую часть (`C:\Data`), возвращая `"\Logs\app.txt"`. Когда нужно гарантированно склеить фрагменты без сброса корня, используйте метод `Path.Join` (появился в .NET Core 2.1).
* **`Directory.EnumerateFiles` против `Directory.GetFiles`:** метод `GetFiles` сразу выделяет массив `string[]` и блокирует поток, пока не просканирует весь каталог (на сетевом диске или в папке с сотнями тысяч файлов это вызовет зависание и лишний расход памяти). `EnumerateFiles` возвращает ленивый `IEnumerable<string>`, позволяя обрабатывать файлы по мере обнаружения и при необходимости прервать обход через `.Take(10)`.
* **Статический `File` против экземплярного `FileInfo` и метод `Refresh()`:** каждый вызов `File.Exists(path)` или `File.GetLastWriteTime(path)` делает отдельный системный вызов к ОС и заново проверяет права доступа. Если нужно узнать и размер, и дату создания, и атрибуты одного файла, создайте `new FileInfo(path)` — он считает метаданные за один запрос; но если файл изменится на диске позже, свойства `FileInfo` останутся закэшированными до явного вызова `fileInfo.Refresh()`.
* **Связь с теорией и следующей темой:** методы `File.ReadAllText` и `File.ReadAllBytes` удобны для небольших конфигураций и отчётов, но попытка загрузить ими многогигабайтный лог или архив целиком в оперативную память приведёт к `OutOfMemoryException` — в следующей карточке разберём, как читать и записывать файлы любого размера порциями и работать с форматом JSON (*Потоки `Stream`, кодировки и JSON*).

