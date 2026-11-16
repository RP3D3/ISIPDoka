---
title: Практика: самопроверка — массивы
keywords: практика массивов c#, одномерный массив, перебор, сумма, среднее, минимум, максимум, Array.Sort, двумерный массив, зубчатый массив, задания, самопроверка
---

# Проверь себя: массивы

Как хранить набор однотипных значений, находить в нём минимум и максимум и не перепутать длину с последним индексом?

Ниже — десять заданий для журнала температур марсохода. Сначала решай вручную на бумаге, потом проверяй кодом.

## Задания

1. **Создание и вывод.** Создай массив температур `{ -60, -45, -70, -30, -55 }` и выведи все элементы через `for`.
2. **Сумма и среднее.** Для того же массива найди сумму и среднее значение. Среднее выведи с одним знаком после запятой.
3. **Минимум и максимум.** Найди самую низкую и самую высокую температуру, не используя `Array.Sort`.
4. **Поиск.** В массиве `{ 5, 8, 42, 13 }` найди индекс числа `42`. Если числа нет, выведи `-1`.
5. **Реверс.** Переверни массив `{ 1, 2, 3, 4, 5 }` на месте, меняя элементы местами, и выведи результат.
6. **Сортировка.** Отсортируй `{ 40, 10, 30, 20 }` по возрастанию через `Array.Sort`, затем переверни через `Array.Reverse`.
7. **Чётные элементы.** Посчитай, сколько чётных чисел в массиве `{ 3, 8, 12, 7, 20, 15 }`.
8. **Матрица.** Для `int[,] grid = { {1,2}, {3,4}, {5,6} };` выведи все элементы по строкам и найди общую сумму.
9. **Зубчатый массив.** Создай `int[][] rows` из трёх строк разной длины: `{1}`, `{2,3}`, `{4,5,6}`. Выведи каждую строку отдельно.
10. **Мини-отчёт.** Для семи дневных температур найди минимум, максимум, среднее и количество дней холоднее `-40`.

## Решения

### 1. Создание и вывод

```csharp
using System;

class Program
{
    static void Main()
    {
        int[] temps = { -60, -45, -70, -30, -55 };

        for (int i = 0; i < temps.Length; i++)
        {
            Console.WriteLine(temps[i]);
        }
    }
}
```

`Length` — количество элементов. Последний индекс всегда `Length - 1`.

### 2. Сумма и среднее

```csharp
using System;

class Program
{
    static void Main()
    {
        int[] temps = { -60, -45, -70, -30, -55 };

        int sum = 0;
        foreach (int t in temps)
        {
            sum += t;
        }

        double average = (double)sum / temps.Length;
        Console.WriteLine("Сумма: " + sum);
        Console.WriteLine("Среднее: " + average.ToString("F1"));
    }
}
```

Приведение к `double` нужно, чтобы деление не стало целочисленным.

### 3. Минимум и максимум

```csharp
using System;

class Program
{
    static void Main()
    {
        int[] temps = { -60, -45, -70, -30, -55 };

        int min = temps[0];
        int max = temps[0];

        foreach (int t in temps)
        {
            if (t < min) min = t;
            if (t > max) max = t;
        }

        Console.WriteLine("Минимум: " + min);
        Console.WriteLine("Максимум: " + max);
    }
}
```

Начинаем с первого элемента: он всегда существует, если массив не пуст.

### 4. Поиск

```csharp
using System;

class Program
{
    static void Main()
    {
        int[] data = { 5, 8, 42, 13 };
        int index = -1;

        for (int i = 0; i < data.Length; i++)
        {
            if (data[i] == 42)
            {
                index = i;
                break;
            }
        }

        Console.WriteLine(index); // 2
    }
}
```

`-1` — удобный маркер «не найдено», потому что настоящие индексы начинаются с нуля.

### 5. Реверс

```csharp
using System;

class Program
{
    static void Main()
    {
        int[] numbers = { 1, 2, 3, 4, 5 };

        for (int i = 0; i < numbers.Length / 2; i++)
        {
            int j = numbers.Length - 1 - i;
            int temp = numbers[i];
            numbers[i] = numbers[j];
            numbers[j] = temp;
        }

        foreach (int n in numbers)
        {
            Console.Write(n + " ");
        }
    }
}
```

Меняем только половину элементов: пары обрабатываются одновременно, иначе массив перевернётся дважды.

### 6. Сортировка

```csharp
using System;

class Program
{
    static void Main()
    {
        int[] scores = { 40, 10, 30, 20 };

        Array.Sort(scores);
        Array.Reverse(scores);

        foreach (int score in scores)
        {
            Console.Write(score + " "); // 40 30 20 10
        }
    }
}
```

`Array.Sort` сортирует по возрастанию, `Array.Reverse` переворачивает порядок.

### 7. Чётные элементы

```csharp
using System;

class Program
{
    static void Main()
    {
        int[] numbers = { 3, 8, 12, 7, 20, 15 };
        int evenCount = 0;

        foreach (int n in numbers)
        {
            if (n % 2 == 0)
            {
                evenCount++;
            }
        }

        Console.WriteLine(evenCount); // 3
    }
}
```

### 8. Матрица

```csharp
using System;

class Program
{
    static void Main()
    {
        int[,] grid = { { 1, 2 }, { 3, 4 }, { 5, 6 } };
        int sum = 0;

        for (int row = 0; row < grid.GetLength(0); row++)
        {
            for (int col = 0; col < grid.GetLength(1); col++)
            {
                Console.Write(grid[row, col] + " ");
                sum += grid[row, col];
            }
            Console.WriteLine();
        }

        Console.WriteLine("Сумма: " + sum); // 21
    }
}
```

`GetLength(0)` — число строк, `GetLength(1)` — число столбцов.

### 9. Зубчатый массив

```csharp
using System;

class Program
{
    static void Main()
    {
        int[][] rows = new int[3][];
        rows[0] = new int[] { 1 };
        rows[1] = new int[] { 2, 3 };
        rows[2] = new int[] { 4, 5, 6 };

        for (int r = 0; r < rows.Length; r++)
        {
            for (int c = 0; c < rows[r].Length; c++)
            {
                Console.Write(rows[r][c] + " ");
            }
            Console.WriteLine();
        }
    }
}
```

В зубчатом массиве каждая строка — отдельный массив, поэтому у строк может быть разная длина.

### 10. Мини-отчёт

```csharp
using System;

class Program
{
    static void Main()
    {
        double[] daily = { -42, -38, -55, -47, -30, -60, -41 };

        double min = daily[0];
        double max = daily[0];
        double sum = 0;
        int coldDays = 0;

        foreach (double t in daily)
        {
            sum += t;
            if (t < min) min = t;
            if (t > max) max = t;
            if (t < -40) coldDays++;
        }

        Console.WriteLine("Минимум: " + min);
        Console.WriteLine("Максимум: " + max);
        Console.WriteLine("Среднее: " + (sum / daily.Length).ToString("F1"));
        Console.WriteLine("Холоднее -40: " + coldDays + " дн.");
    }
}
```

## Блиц

```quiz
{
  "type": "radio",
  "question": "Как получить индекс последнего элемента массива `a`?",
  "options": [
    { "text": "`a.Length - 1`", "correct": true, "explanation": "Индексы начинаются с нуля, поэтому последний на единицу меньше длины." },
    { "text": "`a.Length`", "correct": false, "explanation": "Такой индекс уже за границей массива." },
    { "text": "`a.Last`", "correct": false, "explanation": "Такого свойства у массива нет." }
  ],
  "explanation": "Для массива из пяти элементов индексы: `0, 1, 2, 3, 4`."
}
```
