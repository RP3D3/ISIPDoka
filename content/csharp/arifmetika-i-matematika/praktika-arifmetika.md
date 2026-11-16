---
title: Практика: самопроверка — арифметика и математика
keywords: практика арифметики c#, операторы, деление, остаток, проценты, инкремент, декремент, Math, округление, Math.Round, задания, самопроверка
---

# Проверь себя: арифметика и математика

Как правильно считать деньги, проценты и остатки, не попадаясь на целочисленном делении и постфиксном инкременте?

Ниже — десять заданий для кассы космического кафе. Считай в уме, потом проверяй кодом.

## Задания

1. **Смена и остаток.** Раздели `17` конфет на `5` человек. Выведи, сколько достанется каждому и сколько останется.
2. **Целочисленное деление.** Для `int a = 7; int b = 2;` выведи `a / b` и `(double)a / b`. Объясни разницу.
3. **Проценты.** Счёт `1250m`, чаевые `10%`. Посчитай сумму чаевых и итог через `decimal`.
4. **Сокращённое присваивание.** Начни со `score = 100` и последовательно примени `+= 50`, `-= 30`, `*= 2`, `/= 4`, `%= 7`. Выведи результат после каждого шага.
5. **Инкремент.** Для `int x = 5;` выведи `x++`, затем `x`, затем `++x`. Объясни порядок вывода.
6. **`Math`.** Выведи `Math.Abs(-7)`, `Math.Sqrt(81)` и `Math.Pow(2, 10)`.
7. **Округление.** Для `3.14159` выведи `Math.Round(..., 2)`, для `2.1` — `Math.Ceiling`, для `2.9` — `Math.Floor`.
8. **Минимум и максимум.** Найди `Math.Max(10, 25)` и `Math.Min(10, 25)`. Придумай, где это пригодится в игре.
9. **Чётность.** Для `number = 42` получи `bool isEven = number % 2 == 0;` и выведи результат.
10. **Мини-чек.** Цена `349.90m`, количество `3`, скидка `15%`, чаевые `10%` от суммы после скидки. Посчитай итог и округли до копеек.

## Решения

### 1. Смена и остаток

```csharp
using System;

class Program
{
    static void Main()
    {
        int candies = 17;
        int people = 5;

        Console.WriteLine("Каждому: " + candies / people);   // 3
        Console.WriteLine("Остаток: " + candies % people);   // 2
    }
}
```

`/` для целых чисел отбрасывает дробную часть, а `%` возвращает остаток от деления.

### 2. Целочисленное деление

```csharp
using System;

class Program
{
    static void Main()
    {
        int a = 7;
        int b = 2;

        Console.WriteLine(a / b);           // 3
        Console.WriteLine((double)a / b);   // 3.5
    }
}
```

Пока оба операнда целые, деление целочисленное. Приведение к `double` переводит выражение в дробную арифметику.

### 3. Проценты

```csharp
using System;

class Program
{
    static void Main()
    {
        decimal bill = 1250m;
        decimal tip = bill * 0.10m;

        Console.WriteLine("Чаевые: " + tip);          // 125,0
        Console.WriteLine("Итого: " + (bill + tip));  // 1375,0
    }
}
```

### 4. Сокращённое присваивание

```csharp
using System;

class Program
{
    static void Main()
    {
        int score = 100;

        score += 50;
        Console.WriteLine(score); // 150

        score -= 30;
        Console.WriteLine(score); // 120

        score *= 2;
        Console.WriteLine(score); // 240

        score /= 4;
        Console.WriteLine(score); // 60

        score %= 7;
        Console.WriteLine(score); // 4
    }
}
```

Каждая запись `x += y` означает `x = x + y` и сразу сохраняет результат в переменную.

### 5. Инкремент

```csharp
using System;

class Program
{
    static void Main()
    {
        int x = 5;

        Console.WriteLine(x++); // 5 — сначала вывод, потом увеличение
        Console.WriteLine(x);   // 6
        Console.WriteLine(++x); // 7 — сначала увеличение, потом вывод
    }
}
```

Постфиксный `x++` возвращает старое значение, префиксный `++x` — уже увеличенное.

### 6. `Math`

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine(Math.Abs(-7));      // 7
        Console.WriteLine(Math.Sqrt(81));     // 9
        Console.WriteLine(Math.Pow(2, 10));   // 1024
    }
}
```

`Math.Pow` возвращает `double`, даже если результат выглядит целым.

### 7. Округление

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine(Math.Round(3.14159, 2)); // 3,14
        Console.WriteLine(Math.Ceiling(2.1));      // 3
        Console.WriteLine(Math.Floor(2.9));        // 2
    }
}
```

`Round` округляет по правилам, `Ceiling` всегда вверх, `Floor` всегда вниз.

### 8. Минимум и максимум

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine(Math.Max(10, 25)); // 25
        Console.WriteLine(Math.Min(10, 25)); // 10

        int health = 120;
        health = Math.Min(health, 100); // не даём здоровью превысить максимум
        Console.WriteLine(health);      // 100
    }
}
```

`Math.Min` и `Math.Max` удобны для ограничения значений: здоровья, громкости, скидки.

### 9. Чётность

```csharp
using System;

class Program
{
    static void Main()
    {
        int number = 42;
        bool isEven = number % 2 == 0;

        Console.WriteLine(isEven); // True
    }
}
```

Если остаток от деления на `2` равен нулю, число чётное.

### 10. Мини-чек

```csharp
using System;

class Program
{
    static void Main()
    {
        decimal price = 349.90m;
        int quantity = 3;
        decimal subtotal = price * quantity;
        decimal discount = subtotal * 0.15m;
        decimal afterDiscount = subtotal - discount;
        decimal tip = afterDiscount * 0.10m;
        decimal total = afterDiscount + tip;

        Console.WriteLine("Итого: " + Math.Round(total, 2)); // 981,47
    }
}
```

Сначала считаем стоимость, затем скидку, потом чаевые уже от суммы после скидки. Порядок операций здесь важнее самих формул.

## Блиц

```quiz
{
  "type": "radio",
  "question": "Чему равно `7 % 3`?",
  "options": [
    { "text": "`1`", "correct": true, "explanation": "`7` делится на `3` с остатком `1`." },
    { "text": "`2`", "correct": false, "explanation": "`2` — это остаток от `8 % 3`, а не от `7 % 3`." },
    { "text": "`2.33`", "correct": false, "explanation": "`%` возвращает остаток, а не результат деления." }
  ],
  "explanation": "Остаток от деления полезен для чётности, циклических индексов и проверок кратности."
}
```
