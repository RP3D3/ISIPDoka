---
title: Console.ForegroundColor
keywords: Console.ForegroundColor, System.Console, ConsoleColor, Console.ResetColor, цвет текста, шрифт, консоль, покраска, подсветка, вывод, терминал, перечисление
---

# Свойство Console.ForegroundColor
Как поменять цвет букв, чтобы выделить важные сообщения в консоли?

`Console.ForegroundColor` — это статическое свойство класса `System.Console`, которое задаёт цвет текста (символов), выводимого в консоль. Значение выбирается из встроенного перечисления `ConsoleColor`.

### Особенности работы

* **Действует на весь последующий вывод:** после изменения свойства весь текст печатается новым цветом до тех пор, пока цвет не сменят снова или не вызовут `Console.ResetColor()`.
* **Не меняет уже выведенный текст:** перекрашиваются только те символы, которые появятся в консоли после присваивания цвета.
* **Доступно чтение и запись:** исходный цвет можно сохранить в переменную типа `ConsoleColor`, временно поменять его для важного сообщения, а затем вернуть обратно.

### Доступные цвета (ConsoleColor)

Перечисление содержит 16 стандартных цветов:

* **Базовые:** `Black`, `White`, `Gray`, `DarkGray`
* **Яркие:** `Red`, `Green`, `Blue`, `Yellow`, `Cyan`, `Magenta`
* **Тёмные:** `DarkRed`, `DarkGreen`, `DarkBlue`, `DarkYellow`, `DarkCyan`, `DarkMagenta`

### Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // Сохраняем текущий цвет текста перед изменением
        ConsoleColor defaultColor = Console.ForegroundColor;

        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine("Загрузка модулей...");

        Console.ForegroundColor = ConsoleColor.Yellow;
        Console.WriteLine("Предупреждение: проверьте подключение к сети.");

        // Возвращаем исходный цвет текста
        Console.ForegroundColor = defaultColor;
        Console.WriteLine("Работа завершена в штатном режиме.");
    }
}

```

