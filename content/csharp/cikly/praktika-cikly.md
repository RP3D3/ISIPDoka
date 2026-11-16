---
title: Практика: самопроверка — циклы
keywords: практика циклов c#, while, do while, for, foreach, break, continue, вложенные циклы, угадай число, задания, самопроверка
---

# Проверь себя: циклы

Как повторять действия, когда число шагов неизвестно, и когда лучше остановиться?

Ниже — десять заданий для игры «Угадай число» и других циклов. Сначала попробуй решить в уме, потом сверься с кодом.

## Задания

1. **Обратный отсчёт.** Выведи числа от `10` до `1` через `for`, а в конце — `Пуск!`.
2. **Сумма.** Найди сумму чисел от `1` до `100` через `for`. Сколько получилось?
3. **Таблица.** Выведи таблицу умножения `2…5` на `1…5` вложенными циклами.
4. **Энергия.** Начни с `energy = 3` и повторяй, пока она больше нуля: выведи шаг и уменьши на `1`.
5. **Пароль.** Спроси пароль через `do while`, пока он не равен `марс`.
6. **Экипаж.** Для массива `{"Ада", "Боб", "Ева"}` выведи каждого через `foreach`.
7. **Пауза.** Найди первое число от `1` до `100`, которое делится и на `7`, и на `5`. Используй `break`.
8. **Нечётные.** Выведи нечётные числа от `1` до `15`, пропуская чётные через `continue`.
9. **Рамка.** Нарисуй прямоугольник `4×6` из звёзд через вложенные циклы.
10. **Угадай число.** Загадай число `42`, спрашивай варианты через `ReadLine`, считай попытки и подсказывай «больше/меньше», пока не угадаешь.

## Решения

### 1. Обратный отсчёт

```csharp
using System;

class Program
{
    static void Main()
    {
        for (int i = 10; i >= 1; i--)
        {
            Console.Write(i + " ");
        }
        Console.WriteLine("Пуск!");
    }
}
```

### 2. Сумма

```csharp
using System;

class Program
{
    static void Main()
    {
        int sum = 0;
        for (int i = 1; i <= 100; i++)
        {
            sum += i;
        }
        Console.WriteLine(sum); // 5050
    }
}
```

### 3. Таблица

```csharp
using System;

class Program
{
    static void Main()
    {
        for (int i = 2; i <= 5; i++)
        {
            for (int j = 1; j <= 5; j++)
            {
                Console.Write(i + "×" + j + "=" + (i * j) + "  ");
            }
            Console.WriteLine();
        }
    }
}
```

### 4. Энергия

```csharp
using System;

class Program
{
    static void Main()
    {
        int energy = 3;
        while (energy > 0)
        {
            Console.WriteLine("Шаг: " + energy);
            energy--;
        }
    }
}
```

### 5. Пароль

```csharp
using System;

class Program
{
    static void Main()
    {
        string password;
        do
        {
            Console.Write("Пароль: ");
            password = Console.ReadLine();
        }
        while (password != "марс");
    }
}
```

### 6. Экипаж

```csharp
using System;

class Program
{
    static void Main()
    {
        string[] crew = { "Ада", "Боб", "Ева" };
        foreach (string name in crew)
        {
            Console.WriteLine(name);
        }
    }
}
```

### 7. Пауза

```csharp
using System;

class Program
{
    static void Main()
    {
        for (int i = 1; i <= 100; i++)
        {
            if (i % 7 == 0 && i % 5 == 0)
            {
                Console.WriteLine(i); // 35
                break;
            }
        }
    }
}
```

### 8. Нечётные

```csharp
using System;

class Program
{
    static void Main()
    {
        for (int i = 1; i <= 15; i++)
        {
            if (i % 2 == 0) continue;
            Console.Write(i + " ");
        }
    }
}
```

### 9. Рамка

```csharp
using System;

class Program
{
    static void Main()
    {
        for (int row = 0; row < 4; row++)
        {
            for (int col = 0; col < 6; col++)
            {
                Console.Write("*");
            }
            Console.WriteLine();
        }
    }
}
```

### 10. Угадай число

```csharp
using System;

class Program
{
    static void Main()
    {
        int secret = 42;
        int attempts = 0;

        while (true)
        {
            Console.Write("Ваш вариант: ");
            if (!int.TryParse(Console.ReadLine(), out int guess))
            {
                Console.WriteLine("Нужно число.");
                continue;
            }

            attempts++;
            if (guess == secret)
            {
                Console.WriteLine("Угадал за " + attempts + " попыток!");
                break;
            }

            Console.WriteLine(guess < secret ? "Больше" : "Меньше");
        }
    }
}
```

## Блиц

```quiz
{
  "type": "radio",
  "question": "Сколько раз выполнится `for (int i = 0; i < 3; i++)`?",
  "options": [
    { "text": "`3`", "correct": true, "explanation": "Значения `0`, `1`, `2` — три прохода." },
    { "text": "`2`", "correct": false, "explanation": "Второй проход не последний: есть ещё `2`." },
    { "text": "`4`", "correct": false, "explanation": "При `i = 3` условие уже ложно." }
  ],
  "explanation": "Цикл идёт от `0` до `2` включительно."
}
```
