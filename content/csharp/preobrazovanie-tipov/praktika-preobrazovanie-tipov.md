---
title: Практика: самопроверка — преобразование типов
keywords: практика преобразования типов c#, неявное приведение, явное приведение, cast, Parse, TryParse, Convert, ToString, форматирование, потеря данных, задания, самопроверка
---

# Проверь себя: преобразование типов

Когда C# переводит тип сам, когда нужен явный `cast`, и как не уронить программу на вводе «сорок два»?

Ниже — десять заданий для парсера данных космопорта. В каждом важна не только работающий код, но и понимание, что происходит с данными.

## Задания

1. **Неявное расширение.** Объяви `int count = 42;`, затем `long big = count;` и `double d = big;`. Выведи все три значения и объясни, почему потерь нет.
2. **Явное сужение.** Преобразуй `double price = 19.99;` в `int` через `(int)`. Что произойдёт с дробной частью?
3. **Потеря данных.** Преобразуй `long huge = 5_000_000_000;` в `int` через явный `cast`. Сравни результат с исходным числом и объясни расхождение.
4. **`Parse`.** Преврати строку `"1500"` в `int` через `int.Parse` и прибавь `100`. Выведи результат.
5. **`TryParse`.** Проверь два ввода: `"42"` и `"сорок два"`. Для каждого выведи, удалось ли преобразование и какое число получилось.
6. **`Convert`.** Преобразуй `"2026"` в число, число `255` в строку и `"true"` в `bool`. Выведи три результата.
7. **`ToString` с форматом.** Выведи число `3.14159` с двумя знаками после запятой через `ToString("F2")`.
8. **Деление без сюрпризов.** Почему `double result = 5 / 2;` даёт `2`, а не `2.5`? Исправь выражение.
9. **Возраст с клавиатуры.** Прочитай возраст через `ReadLine`, безопасно преобразуй через `int.TryParse` и выведи возраст через год.
10. **Конвертер температуры.** Прочитай температуру в градусах Цельсия, преобразуй в `double` и выведи температуру по Фаренгейту с одним знаком после запятой.

## Решения

### 1. Неявное расширение

```csharp
using System;

class Program
{
    static void Main()
    {
        int count = 42;
        long big = count;
        double d = big;

        Console.WriteLine(count);
        Console.WriteLine(big);
        Console.WriteLine(d);
    }
}
```

`int` полностью помещается в `long`, а `long` — в `double`. Компилятор делает такое расширение сам, без явного приведения.

### 2. Явное сужение

```csharp
using System;

class Program
{
    static void Main()
    {
        double price = 19.99;
        int whole = (int)price;

        Console.WriteLine(whole); // 19
    }
}
```

Приведение к `int` отбрасывает дробную часть, а не округляет. Если нужно округление, используют `Math.Round`.

### 3. Потеря данных

```csharp
using System;

class Program
{
    static void Main()
    {
        long huge = 5_000_000_000;
        int small = (int)huge;

        Console.WriteLine(huge);   // 5000000000
        Console.WriteLine(small);  // 705032704
    }
}
```

`int` не вмещает `5` миллиардов. Старшие биты теряются, и остаётся только часть числа. Явный `cast` разрешает операцию, но не делает её безопасной.

### 4. `Parse`

```csharp
using System;

class Program
{
    static void Main()
    {
        string raw = "1500";
        int price = int.Parse(raw);

        Console.WriteLine(price + 100); // 1600
    }
}
```

`Parse` подходит только для заведомо корректной строки: на буквах он выбрасывает `FormatException`.

### 5. `TryParse`

```csharp
using System;

class Program
{
    static void Main()
    {
        string good = "42";
        string bad = "сорок два";

        bool ok1 = int.TryParse(good, out int first);
        bool ok2 = int.TryParse(bad, out int second);

        Console.WriteLine(ok1 + " → " + first);   // True → 42
        Console.WriteLine(ok2 + " → " + second);  // False → 0
    }
}
```

`TryParse` не падает: он возвращает `true` или `false`, а в переменную после `out` записывает число либо `0`.

### 6. `Convert`

```csharp
using System;

class Program
{
    static void Main()
    {
        int year = Convert.ToInt32("2026");
        string text = Convert.ToString(255);
        bool flag = Convert.ToBoolean("true");

        Console.WriteLine(year);
        Console.WriteLine(text);
        Console.WriteLine(flag);
    }
}
```

`Convert` удобен, когда нужно перевести разные типы по единому шаблону, но на неверном вводе он тоже может выбросить исключение.

### 7. `ToString` с форматом

```csharp
using System;

class Program
{
    static void Main()
    {
        double pi = 3.14159;
        Console.WriteLine(pi.ToString("F2")); // 3,14
    }
}
```

Формат `F2` означает два знака после разделителя. Сам разделитель зависит от региональных настроек: на русской системе это запятая.

### 8. Деление без сюрпризов

```csharp
using System;

class Program
{
    static void Main()
    {
        double wrong = 5 / 2;            // 2
        double right = (double)5 / 2;    // 2.5

        Console.WriteLine(wrong);
        Console.WriteLine(right);
    }
}
```

Сначала выполняется целочисленное деление `5 / 2`, и только потом результат `2` превращается в `2.0`. Приведение одного операнда к `double` заставляет делить как дробные числа.

### 9. Возраст с клавиатуры

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.Write("Введите возраст: ");
        string input = Console.ReadLine();

        if (int.TryParse(input, out int age))
        {
            Console.WriteLine("Через год вам будет " + (age + 1));
        }
        else
        {
            Console.WriteLine("Нужно ввести целое число.");
        }
    }
}
```

### 10. Конвертер температуры

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.Write("Температура в °C: ");
        string input = Console.ReadLine();

        if (double.TryParse(input, out double celsius))
        {
            double fahrenheit = celsius * 9 / 5 + 32;
            Console.WriteLine("По Фаренгейту: " + fahrenheit.ToString("F1"));
        }
        else
        {
            Console.WriteLine("Не удалось разобрать число.");
        }
    }
}
```

На русской системе дробную часть вводят через запятую: `36,6`. Для точки нужна настройка культуры.

## Блиц

```quiz
{
  "type": "radio",
  "question": "Что вернёт выражение `(int)3.99`?",
  "options": [
    { "text": "`3`", "correct": true, "explanation": "Приведение к `int` отбрасывает дробную часть." },
    { "text": "`4`", "correct": false, "explanation": "Это было бы округление, а `cast` не округляет." },
    { "text": "Ошибку выполнения", "correct": false, "explanation": "Явное приведение `double` → `int` допустимо." }
  ],
  "explanation": "Для округления используют `Math.Round`, а не приведение типа."
}
```
