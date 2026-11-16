---
title: Практика: самопроверка — консоль
keywords: практика консоли c#, Console.ReadLine, Console.ReadKey, Console.Read, Console.Clear, ForegroundColor, BackgroundColor, Console.Title, SetCursorPosition, задания, самопроверка
---

# Проверь себя: консоль

Как сделать консольную программу живой: прочитать ввод, спрятать пароль, покрасить сообщения и управлять курсором?

Ниже — десять заданий для пульта космической станции. Все они линейные: условия и циклы появятся в следующих группах, поэтому здесь достаточно команд, ввода и вывода.

## Задания

1. **Знакомство.** Спроси имя через `Console.ReadLine()` и выведи приветствие вида `Добро пожаловать на борт, Ада!`.
2. **Две координаты.** Прочитай два значения — `x` и `y` — и выведи строку `Прыжок в точку (10, 25)`. Пока считай их обычными строками.
3. **Секретный код.** Считай одну клавишу через `Console.ReadKey(true)`, чтобы символ не появился на экране. Выведи сам символ и имя клавиши (`key.KeyChar` и `key.Key`).
4. **Код символа.** Считай один символ через `Console.Read()` и выведи его числовой код и сам символ, приведя код к `char`.
5. **Светофор.** Выведи `GO` зелёным цветом, затем `STOP` красным. После каждого сообщения возвращай обычные цвета через `Console.ResetColor()`.
6. **Тревога.** Сделай строку ` ALERT ` белым текстом на красном фоне. Не забудь вернуть цвета после вывода.
7. **Имя окна.** Установи заголовок окна `Пульт станции «Арес»` через `Console.Title`.
8. **Курсор в точку.** Очисти экран, поставь курсор в позицию `(10, 3)` и выведи `X`. Затем переставь курсор в `(0, 5)` и выведи пояснение.
9. **Очистка экрана.** Выведи три строки, дождись нажатия любой клавиши через `Console.ReadKey(true)`, очисти экран и выведи `Новая смена началась`.
10. **Мини-пульт.** Собери программу: заголовок окна, цветной заголовок, ожидание клавиши, очистка экрана и зелёное сообщение `Система готова` в позиции `(5, 2)`.

## Решения

### 1. Знакомство

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.Write("Введите имя: ");
        string name = Console.ReadLine();

        Console.WriteLine("Добро пожаловать на борт, " + name + "!");
    }
}
```

### 2. Две координаты

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.Write("x = ");
        string x = Console.ReadLine();

        Console.Write("y = ");
        string y = Console.ReadLine();

        Console.WriteLine("Прыжок в точку (" + x + ", " + y + ")");
    }
}
```

`ReadLine` возвращает строку, поэтому `x` и `y` пока нельзя складывать как числа.

### 3. Секретный код

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.Write("Нажмите секретную клавишу: ");
        ConsoleKeyInfo key = Console.ReadKey(true);

        Console.WriteLine();
        Console.WriteLine("Символ: " + key.KeyChar);
        Console.WriteLine("Клавиша: " + key.Key);
    }
}
```

Аргумент `true` отключает эхо: нажатый символ не печатается. Именно так вводят пароли.

### 4. Код символа

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.Write("Введите один символ: ");
        int code = Console.Read();

        Console.WriteLine("Код: " + code);
        Console.WriteLine("Символ: " + (char)code);
    }
}
```

`Console.Read()` возвращает `int`, а не `char`, поэтому для печати символа нужно приведение `(char)`. Если вызвать `Read()` сразу после `ReadLine()`, он сначала получит оставшийся в буфере Enter с кодом `13`.

### 5. Светофор

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine("GO");
        Console.ResetColor();

        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine("STOP");
        Console.ResetColor();
    }
}
```

### 6. Тревога

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.BackgroundColor = ConsoleColor.Red;
        Console.ForegroundColor = ConsoleColor.White;
        Console.WriteLine(" ALERT ");

        Console.ResetColor();
        Console.WriteLine("Тревога снята.");
    }
}
```

### 7. Имя окна

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.Title = "Пульт станции «Арес»";
        Console.WriteLine("Заголовок окна изменён.");
    }
}
```

### 8. Курсор в точку

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.Clear();

        Console.SetCursorPosition(10, 3);
        Console.Write("X");

        Console.SetCursorPosition(0, 5);
        Console.WriteLine("Маркер установлен в позицию (10, 3).");
    }
}
```

Координаты считаются от левого верхнего угла: `x` — столбец, `y` — строка. Позиция должна помещаться в буфер окна, иначе программа выбросит исключение.

### 9. Очистка экрана

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Смена 1: проверка связи");
        Console.WriteLine("Смена 2: проверка кислорода");
        Console.WriteLine("Смена 3: проверка двигателей");

        Console.WriteLine("Нажмите любую клавишу...");
        Console.ReadKey(true);

        Console.Clear();
        Console.WriteLine("Новая смена началась");
    }
}
```

### 10. Мини-пульт

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.Title = "Пульт станции «Арес»";

        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine("=== ПУЛЬТ СТАНЦИИ ===");
        Console.ResetColor();

        Console.WriteLine("Нажмите любую клавишу для запуска...");
        Console.ReadKey(true);
        Console.Clear();

        Console.SetCursorPosition(5, 2);
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine("Система готова");
        Console.ResetColor();
    }
}
```

## Блиц

```quiz
{
  "type": "radio",
  "question": "Чем `Console.ReadKey(true)` отличается от `Console.ReadKey()`?",
  "options": [
    { "text": "Первый не показывает нажатую клавишу на экране", "correct": true, "explanation": "Аргумент `true` отключает эхо ввода." },
    { "text": "Первый читает целую строку, а не клавишу", "correct": false, "explanation": "Целую строку читает `Console.ReadLine()`." },
    { "text": "Первый работает только с цифрами", "correct": false, "explanation": "`ReadKey` принимает любую клавишу." }
  ],
  "explanation": "`ReadKey(true)` удобен для паролей и пауз «нажмите любую клавишу»."
}
```
