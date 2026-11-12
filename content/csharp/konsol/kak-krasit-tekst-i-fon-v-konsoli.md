---
title: Как красить текст и фон в консоли
keywords: Console.ForegroundColor, Console.BackgroundColor, Console.ResetColor, ConsoleColor, как покрасить текст, цвет шрифта, заливка фона, цветная консоль, оформление вывода
---

## Как красить текст и фон в консоли C#

Для оформления вывода в классе `System.Console` используются два свойства и один метод. Все цвета выбираются из встроенного перечисления `ConsoleColor`, которое содержит 16 стандартных цветов (от базовых `Black`, `White`, `Gray` до ярких `Red`, `Green`, `Yellow`, `Cyan` и тёмных `DarkBlue`, `DarkRed`).

### Шпаргалка по инструментам

| Элемент | Назначение |
| --- | --- |
| `Console.ForegroundColor` | Задаёт цвет символов (текста) |
| `Console.BackgroundColor` | Задаёт цвет заливки фона под текстом |
| `Console.ResetColor()` | Сбрасывает и цвет текста, и цвет фона к стандартным |

### Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. Красим всю строку (вывод статуса)
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine("[OK] Подключение установлено.");
        Console.ResetColor();

        // 2. Красим только одно слово внутри строки через Console.Write
        Console.Write("Ваш баланс: ");
        Console.ForegroundColor = ConsoleColor.Yellow;
        Console.Write("1500 руб.");
        Console.ResetColor();
        Console.WriteLine(" (доступно)");

        // 3. Комбинируем фон и цвет букв для выделения ошибки
        Console.BackgroundColor = ConsoleColor.DarkRed;
        Console.ForegroundColor = ConsoleColor.White;
        Console.WriteLine(" ОШИБКА: Файл не найден! ");
        Console.ResetColor();
    }
}

```

### 4 правила работы с цветом для новичков

* **Цвет работает только вперёд:** изменение свойства не перекрашивает уже напечатанный текст — новый цвет применяется только к следующим вызовам `Write` и `WriteLine`.
* **Всегда делайте сброс:** после цветного фрагмента вызывайте `Console.ResetColor()`, иначе весь остальной текст программы (а в некоторых терминалах и сама командная строка после закрытия программы) останется перекрашенным.
* **Покраска одного слова:** чтобы выделить цветом часть предложения, разбейте вывод на несколько вызовов `Console.Write()`, меняя цвет перед нужным словом и сбрасывая сразу после него.
* **Заливка всего окна:** сам по себе `BackgroundColor` красит фон только под новыми буквами. Чтобы залить цветом весь экран целиком, задайте `Console.BackgroundColor` и сразу вызовите `Console.Clear()`.
