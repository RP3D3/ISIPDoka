---
title: Практика: самопроверка — методы
keywords: практика методов c#, void, return, параметры, аргументы, ref, out, in, params, перегрузка, рекурсия, области видимости, задания, самопроверка
---

# Проверь себя: методы

Как вынести повторяющийся код в метод, вернуть результат и правильно передать данные по ссылке?

Ниже — десять заданий для библиотеки полезных методов марсианской базы. Каждый метод сначала попробуй спроектировать на бумаге: что он принимает и что возвращает.

## Задания

1. **`void`-метод.** Напиши `PrintHeader()`, который печатает строку `=== МАРСИАНСКАЯ БАЗА ===`, и вызови его дважды.
2. **Возврат значения.** Напиши `Square(int x)`, возвращающий квадрат числа. Вызови для `3`, `5` и `10`.
3. **Параметр.** Напиши `Greet(string name)`, который печатает `Привет, Ада!`, и вызови для двух имён.
4. **`ref`.** Напиши `AddBonus(ref int score, int amount)`, который увеличивает счёт на `amount`. Проверь, что значение меняется у вызывающего кода.
5. **`out`.** Напиши `TryDivide(int a, int b, out double result)`, который возвращает `false` при делении на ноль и `true` с результатом в остальных случаях.
6. **`in`.** Напиши `Multiply(in int a, in int b)`, который возвращает произведение. Объясни, зачем здесь `in`.
7. **`params`.** Напиши `SumAll(params int[] numbers)`, который складывает любое количество чисел. Вызови с `1, 2, 3` и с `10, 20`.
8. **Перегрузка.** Сделай три метода `Print`: для числа, для строки и для строки с числом. Вызови все три.
9. **Рекурсия.** Напиши `Factorial(int n)` через рекурсию и выведи `5!`.
10. **Мини-библиотека.** Собери методы `IsEven`, `Max`, `Clamp` и `PrintReport`. Проверь их на числах `7`, `15` и `120`.

## Решения

### 1. `void`-метод

```csharp
using System;

class Program
{
    static void PrintHeader()
    {
        Console.WriteLine("=== МАРСИАНСКАЯ БАЗА ===");
    }

    static void Main()
    {
        PrintHeader();
        PrintHeader();
    }
}
```

`void` означает, что метод ничего не возвращает: он просто выполняет действия.

### 2. Возврат значения

```csharp
using System;

class Program
{
    static int Square(int x)
    {
        return x * x;
    }

    static void Main()
    {
        Console.WriteLine(Square(3));
        Console.WriteLine(Square(5));
        Console.WriteLine(Square(10));
    }
}
```

`return` сразу завершает метод и отдаёт результат в место вызова.

### 3. Параметр

```csharp
using System;

class Program
{
    static void Greet(string name)
    {
        Console.WriteLine("Привет, " + name + "!");
    }

    static void Main()
    {
        Greet("Ада");
        Greet("Боб");
    }
}
```

Параметр — это переменная внутри метода, которая получает значение аргумента при вызове.

### 4. `ref`

```csharp
using System;

class Program
{
    static void AddBonus(ref int score, int amount)
    {
        score += amount;
    }

    static void Main()
    {
        int score = 100;
        AddBonus(ref score, 25);

        Console.WriteLine(score); // 125
    }
}
```

`ref` передаёт переменную по ссылке: метод меняет именно исходную переменную, а не её копию.

### 5. `out`

```csharp
using System;

class Program
{
    static bool TryDivide(int a, int b, out double result)
    {
        if (b == 0)
        {
            result = 0;
            return false;
        }

        result = (double)a / b;
        return true;
    }

    static void Main()
    {
        if (TryDivide(10, 4, out double value))
        {
            Console.WriteLine(value); // 2.5
        }

        Console.WriteLine(TryDivide(10, 0, out double zero)); // False
    }
}
```

`out` тоже передаёт по ссылке, но метод обязан присвоить значение до выхода. Удобно для «попробовать и вернуть два результата».

### 6. `in`

```csharp
using System;

class Program
{
    static int Multiply(in int a, in int b)
    {
        return a * b;
    }

    static void Main()
    {
        Console.WriteLine(Multiply(3, 4)); // 12
    }
}
```

`in` передаёт значение только для чтения. Для больших структур это экономит копирование и защищает аргумент от изменения.

### 7. `params`

```csharp
using System;

class Program
{
    static int SumAll(params int[] numbers)
    {
        int sum = 0;
        foreach (int n in numbers)
        {
            sum += n;
        }
        return sum;
    }

    static void Main()
    {
        Console.WriteLine(SumAll(1, 2, 3)); // 6
        Console.WriteLine(SumAll(10, 20));  // 30
    }
}
```

`params` позволяет передавать любое количество аргументов, а внутри метод видит их как массив.

### 8. Перегрузка

```csharp
using System;

class Program
{
    static void Print(int value)
    {
        Console.WriteLine("Число: " + value);
    }

    static void Print(string text)
    {
        Console.WriteLine("Текст: " + text);
    }

    static void Print(string label, int value)
    {
        Console.WriteLine(label + ": " + value);
    }

    static void Main()
    {
        Print(42);
        Print("Марс");
        Print("Экипаж", 5);
    }
}
```

Перегрузка — это несколько методов с одним именем, но разными параметрами. Компилятор выбирает подходящий по аргументам.

### 9. Рекурсия

```csharp
using System;

class Program
{
    static long Factorial(int n)
    {
        if (n <= 1)
        {
            return 1;
        }

        return n * Factorial(n - 1);
    }

    static void Main()
    {
        Console.WriteLine(Factorial(5)); // 120
    }
}
```

Рекурсия должна иметь базу — условие остановки. Иначе метод будет вызывать себя бесконечно.

### 10. Мини-библиотека

```csharp
using System;

class Program
{
    static bool IsEven(int n)
    {
        return n % 2 == 0;
    }

    static int Max(int a, int b)
    {
        return a > b ? a : b;
    }

    static int Clamp(int value, int min, int max)
    {
        if (value < min) return min;
        if (value > max) return max;
        return value;
    }

    static void PrintReport(string name, int score)
    {
        Console.WriteLine(name + ": " + score);
    }

    static void Main()
    {
        Console.WriteLine(IsEven(7));        // False
        Console.WriteLine(Max(7, 15));       // 15
        Console.WriteLine(Clamp(120, 0, 100)); // 100

        PrintReport("Здоровье", Clamp(120, 0, 100));
    }
}
```

## Блиц

```quiz
{
  "type": "radio",
  "question": "Чем `out` отличается от `ref`?",
  "options": [
    { "text": "`ref` требует, чтобы переменная была инициализирована, а `out` — чтобы метод присвоил значение", "correct": true, "explanation": "`out` используют для возврата дополнительного результата." },
    { "text": "`out` передаёт копию, а `ref` — ссылку", "correct": false, "explanation": "Оба передают переменную по ссылке." },
    { "text": "`ref` работает только с числами", "correct": false, "explanation": "`ref` работает с любым типом." }
  ],
  "explanation": "`ref` — «изменить существующее», `out` — «вернуть новое через параметр»."
}
```
