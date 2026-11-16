---
title: Практика: самопроверка — численные типы
keywords: практика численных типов c#, int, long, double, float, decimal, byte, short, MinValue, MaxValue, переполнение, выбор типа, задания, самопроверка
---

# Проверь себя: численные типы

Как выбрать тип, который не потеряет данные, и что происходит, когда число не помещается в свой диапазон?

Ниже — десять заданий для банка межпланетных переводов. Сначала выбери тип сам, а потом сверься с решением и объяснением.

## Задания

1. **Подбери тип.** Выбери минимальный подходящий тип для каждого значения: пассажиры `4`, население `8_000_000_000`, цена `199.99`, температура `-60.5`, возраст в байтах `200`, миллисекунды `1_700_000_000_000`.
2. **Границы диапазонов.** Выведи `int.MinValue`, `int.MaxValue`, `byte.MinValue`, `byte.MaxValue`, `long.MinValue` и `long.MaxValue`.
3. **Переполнение `byte`.** Объяви `byte b = 255;`, увеличь на единицу через `b++` и выведи результат. Объясни, почему получилось именно такое число.
4. **Деньги не любят `double`.** Сравни `0.1 + 0.2` с `0.3` для `double` и для `decimal`. Выведи оба результата сравнения.
5. **Суффиксы.** Объяви три переменные со значением `3.14`: `float`, `double` и `decimal`. Какие суффиксы понадобятся?
6. **Переполнение `int`.** Посчитай `50_000 * 50_000` в `int`, выведи результат и исправь код так, чтобы получить правильные `2_500_000_000`.
7. **`byte` и `short`.** Объяви `byte age = 200;` и `short temperature = -40;`. Почему `byte big = 300;` не компилируется?
8. **Типы для игры.** Подбери типы для здоровья (`100`), очков (`9_000_000_000`), золота (`1250.75`) и урона (`12.5`). Кратко объясни выбор.
9. **Вклад.** Дан вклад `100000m` под `8%` годовых на `5` лет без капитализации. Посчитай доход и итоговую сумму через `decimal`, округли до копеек.
10. **Ловушка максимума.** Что выведет `int max = int.MaxValue; Console.WriteLine(max + 1);`? Объясни результат и предложи безопасный вариант.

## Решения

### 1. Подбери тип

| Значение | Тип | Почему |
| --- | --- | --- |
| `4` пассажира | `int` | Малые целые числа, стандартный выбор |
| `8_000_000_000` | `long` | Не помещается в `int` (максимум ≈ 2,1 млрд) |
| `199.99` цена | `decimal` | Деньги требуют точности без двоичных погрешностей |
| `-60.5` температура | `double` | Дробное измерение, точность `double` достаточна |
| `200` в байте | `byte` | Диапазон `0…255` |
| `1_700_000_000_000` | `long` | Больше `int`, но помещается в `long` |

### 2. Границы диапазонов

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("int: " + int.MinValue + " … " + int.MaxValue);
        Console.WriteLine("byte: " + byte.MinValue + " … " + byte.MaxValue);
        Console.WriteLine("long: " + long.MinValue + " … " + long.MaxValue);
    }
}
```

### 3. Переполнение `byte`

```csharp
using System;

class Program
{
    static void Main()
    {
        byte b = 255;
        b++;

        Console.WriteLine(b); // 0
    }
}
```

`byte` хранит значения `0…255`. После `255` следующий шаг выходит за границу, и по умолчанию C# «заворачивает» счётчик в `0`. Это называется переполнением.

### 4. Деньги не любят `double`

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine(0.1 + 0.2 == 0.3);           // False
        Console.WriteLine(0.1m + 0.2m == 0.3m);        // True
    }
}
```

`double` хранит числа в двоичном формате и не может точно представить `0.1`. У `decimal` точность десятичная, поэтому для денег выбирают его.

### 5. Суффиксы

```csharp
using System;

class Program
{
    static void Main()
    {
        float f = 3.14f;
        double d = 3.14;
        decimal m = 3.14m;

        Console.WriteLine(f);
        Console.WriteLine(d);
        Console.WriteLine(m);
    }
}
```

Без суффикса `f` компилятор считает литерал `double` и не разрешает неявно записать его в `float`. Суффикс `m` обязателен для `decimal`.

### 6. Переполнение `int`

```csharp
using System;

class Program
{
    static void Main()
    {
        int a = 50_000;
        int b = 50_000;

        Console.WriteLine(a * b);          // -1794967296 — переполнение
        Console.WriteLine((long)a * b);    // 2500000000 — правильно
    }
}
```

Умножение двух `int` даёт `int`. Приведение одного множителя к `long` переводит всё выражение в `long`, и результат помещается.

### 7. `byte` и `short`

```csharp
using System;

class Program
{
    static void Main()
    {
        byte age = 200;
        short temperature = -40;

        Console.WriteLine(age);
        Console.WriteLine(temperature);

        // byte big = 300; // ошибка: 300 не помещается в 0…255
        short big = 300;   // а в short помещается
        Console.WriteLine(big);
    }
}
```

`byte` — беззнаковый тип `0…255`, поэтому `300` компилятор не пропустит. `short` хранит `-32 768…32 767`.

### 8. Типы для игры

| Параметр | Тип | Почему |
| --- | --- | --- |
| Здоровье `100` | `int` | Целое, небольшие значения |
| Очки `9_000_000_000` | `long` | Больше предела `int` |
| Золото `1250.75` | `decimal` | Игровая валюта, важна точность |
| Урон `12.5` | `double` | Дробное значение, скорость важнее абсолютной точности |

### 9. Вклад

```csharp
using System;

class Program
{
    static void Main()
    {
        decimal deposit = 100000m;
        decimal rate = 0.08m;
        int years = 5;

        decimal income = deposit * rate * years;
        decimal total = deposit + income;

        Console.WriteLine("Доход: " + Math.Round(income, 2));
        Console.WriteLine("Итого: " + Math.Round(total, 2));
    }
}
```

Доход — `40 000`, итог — `140 000`. Для денег используем `decimal` и округление до двух знаков.

### 10. Ловушка максимума

```csharp
using System;

class Program
{
    static void Main()
    {
        int max = int.MaxValue;
        Console.WriteLine(max + 1);   // -2147483648

        long safe = (long)max + 1;
        Console.WriteLine(safe);      // 2147483648
    }
}
```

При выходе за верхнюю границу `int` значение заворачивается в минимальное. Если число может вырасти, заранее берите `long` или приводите к нему до вычисления.

## Блиц

```quiz
{
  "type": "radio",
  "question": "Какой тип лучше выбрать для денежной суммы?",
  "options": [
    { "text": "`double`", "correct": false, "explanation": "`double` хранит двоичные дроби и накапливает погрешность." },
    { "text": "`decimal`", "correct": true, "explanation": "`decimal` даёт десятичную точность, поэтому подходит для денег." },
    { "text": "`float`", "correct": false, "explanation": "У `float` ещё меньше точности, чем у `double`." }
  ],
  "explanation": "Для цен, вкладов и валюты в C# стандартно используют `decimal`."
}
```
