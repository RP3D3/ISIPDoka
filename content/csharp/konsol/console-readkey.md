---
title: Console.ReadKey()
keywords: Console.ReadKey, System.Console, ConsoleKeyInfo, ConsoleKey, KeyChar, нажатие клавиши, без Enter, консольное меню, стрелки, скрытый пароль, intercept, пауза
---

# Метод Console.ReadKey()
Как мгновенно поймать нажатие любой клавиши, не заставляя пользователя жать Enter?

`Console.ReadKey()` — это статический метод класса `System.Console`, который считывает **одно нажатие клавиши** сразу в момент нажатия, не дожидаясь клавиши **Enter**.

### Основные возможности и перегрузки

* **Пауза в конце программы:** позволяет удержать окно консоли открытым до нажатия любой клавиши.
* **Быстрое управление и меню:** обработка стрелок, клавиши `Escape` или ответов `Y/N` без необходимости нажимать Enter.
* **Скрытие нажатого символа (`intercept`):**
* `Console.ReadKey()` или `Console.ReadKey(false)` — отображает нажатый символ на экране.
* `Console.ReadKey(true)` — перехватывает нажатие без вывода символа в консоль (используется для ввода паролей, горячих клавиш и управления в консольных играх).



### Что возвращает метод (ConsoleKeyInfo)

Метод возвращает объект `ConsoleKeyInfo`, через свойства которого можно узнать детали нажатия:

* `Key` — сама клавиша из перечисления `ConsoleKey` (например, `ConsoleKey.Enter`, `ConsoleKey.Escape`, `ConsoleKey.UpArrow`, `ConsoleKey.A`). Не зависит от раскладки клавиатуры.
* `KeyChar` — конкретный символ (`char`), который получился при нажатии (учитывает регистр и текущую раскладку, например `'ф'` или `'A'`).
* `Modifiers` — зажатые клавиши-модификаторы (`Shift`, `Alt`, `Control`).

### Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Нажмите Y для подтверждения или Esc для отмены...");

        // Передаём true, чтобы нажатая буква не печаталась в консоли
        ConsoleKeyInfo keyInfo = Console.ReadKey(true);

        if (keyInfo.Key == ConsoleKey.Y)
        {
            Console.WriteLine("Подтверждено!");
        }
        else if (keyInfo.Key == ConsoleKey.Escape)
        {
            Console.WriteLine("Отмена операции.");
        }
        else
        {
            Console.WriteLine($"Нажата клавиша {keyInfo.Key}, символ: '{keyInfo.KeyChar}'");
        }
    }
}

```

Результат работы в консоли (при нажатии клавиши `Space`):

```text
Нажмите Y для подтверждения или Esc для отмены...
Нажата клавиша Spacebar, символ: ' '

```
