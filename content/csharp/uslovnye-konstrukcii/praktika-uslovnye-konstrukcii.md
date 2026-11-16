---
title: Практика: самопроверка — условные конструкции
keywords: практика if else c#, else if, тернарный оператор, switch, современный switch, switch expression, pattern matching, вложенные условия, задания, самопроверка
---

# Проверь себя: условные конструкции

Как выбрать одну ветку из нескольких, когда лучше `switch`, а когда — тернарный оператор?

Ниже — десять заданий для автомата с напитками и пропускного пункта. В каждом задании сначала определи подходящую конструкцию, потом пиши код.

## Задания

1. **Вход по возрасту.** Для `age = 17` выведи `Вход разрешён`, если возраст не меньше `18`, иначе — `Вход запрещён`.
2. **Оценки.** Для `score = 87` выведи `A` при `90+`, `B` при `80–89`, `C` при `70–79`, иначе `F`. Используй `else if`.
3. **Тернарный оператор.** Для `age = 20` получи строку `status` со значением `взрослый` или `ребёнок` одной строкой.
4. **День недели.** Для `day = 3` выведи название дня через классический `switch` и `default`.
5. **Напиток.** Для строки `drink` выведи цену: `чай` — `80`, `кофе` — `120`, `какао` — `110`, иначе `0`.
6. **Размер стакана.** Для `volume = 0.4` выбери `малый` (до `0.3`), `средний` (до `0.5`) или `большой` через современный `switch`-выражение.
7. **Погода.** Для `temperature = 15.0` выведи `лёд` при минусе, `прохладно` от `0` до `20`, иначе `тепло`. Используй шаблоны с `and`.
8. **Билет и возраст.** Если билет есть, проверь возраст: `18+` — `Проходите`, иначе `Только со взрослым`. Если билета нет — `Нет билета`.
9. **Найди ошибку.** В коде `if (x > 5) ... else if (x > 10) ...` вторая ветка никогда не выполняется. Почему? Исправь порядок.
10. **Мини-автомат.** Прочитай название напитка, определи цену через `switch`, затем через тернарный оператор выведи `доступен` или `нет в меню`.

## Решения

### 1. Вход по возрасту

```csharp
using System;

class Program
{
    static void Main()
    {
        int age = 17;

        if (age >= 18)
        {
            Console.WriteLine("Вход разрешён");
        }
        else
        {
            Console.WriteLine("Вход запрещён");
        }
    }
}
```

### 2. Оценки

```csharp
using System;

class Program
{
    static void Main()
    {
        int score = 87;

        if (score >= 90)
        {
            Console.WriteLine("A");
        }
        else if (score >= 80)
        {
            Console.WriteLine("B");
        }
        else if (score >= 70)
        {
            Console.WriteLine("C");
        }
        else
        {
            Console.WriteLine("F");
        }
    }
}
```

Проверки идут от строгого условия к мягкому. Если начать с `score >= 70`, все высокие оценки тоже попадут в эту ветку.

### 3. Тернарный оператор

```csharp
using System;

class Program
{
    static void Main()
    {
        int age = 20;
        string status = age >= 18 ? "взрослый" : "ребёнок";

        Console.WriteLine(status); // взрослый
    }
}
```

Тернарный оператор хорош для выбора одного из двух значений, а не для длинных ветвлений.

### 4. День недели

```csharp
using System;

class Program
{
    static void Main()
    {
        int day = 3;

        switch (day)
        {
            case 1: Console.WriteLine("Понедельник"); break;
            case 2: Console.WriteLine("Вторник"); break;
            case 3: Console.WriteLine("Среда"); break;
            case 4: Console.WriteLine("Четверг"); break;
            case 5: Console.WriteLine("Пятница"); break;
            case 6: Console.WriteLine("Суббота"); break;
            case 7: Console.WriteLine("Воскресенье"); break;
            default: Console.WriteLine("Неизвестный день"); break;
        }
    }
}
```

`break` завершает выбранную ветку. Без него выполнение «провалится» в следующий `case`.

### 5. Напиток

```csharp
using System;

class Program
{
    static void Main()
    {
        string drink = "кофе";
        int price;

        switch (drink)
        {
            case "чай": price = 80; break;
            case "кофе": price = 120; break;
            case "какао": price = 110; break;
            default: price = 0; break;
        }

        Console.WriteLine(price); // 120
    }
}
```

### 6. Размер стакана

```csharp
using System;

class Program
{
    static void Main()
    {
        double volume = 0.4;

        string size = volume switch
        {
            <= 0.3 => "малый",
            <= 0.5 => "средний",
            _ => "большой"
        };

        Console.WriteLine(size); // средний
    }
}
```

Современный `switch`-выражение возвращает значение и проверяет шаблоны сверху вниз. `_` — ветка «во всех остальных случаях».

### 7. Погода

```csharp
using System;

class Program
{
    static void Main()
    {
        double temperature = 15.0;

        string category = temperature switch
        {
            < 0 => "лёд",
            >= 0 and < 20 => "прохладно",
            _ => "тепло"
        };

        Console.WriteLine(category); // прохладно
    }
}
```

Шаблон `>= 0 and < 20` объединяет два условия в один диапазон.

### 8. Билет и возраст

```csharp
using System;

class Program
{
    static void Main()
    {
        bool hasTicket = true;
        int age = 17;

        if (hasTicket)
        {
            if (age >= 18)
            {
                Console.WriteLine("Проходите");
            }
            else
            {
                Console.WriteLine("Только со взрослым");
            }
        }
        else
        {
            Console.WriteLine("Нет билета");
        }
    }
}
```

Вложенные условия читаются проще, когда внешняя проверка отвечает за «можно ли вообще», а внутренняя — за «на каких условиях».

### 9. Найди ошибку

```csharp
using System;

class Program
{
    static void Main()
    {
        int x = 7;

        if (x > 10)
        {
            Console.WriteLine("B");
        }
        else if (x > 5)
        {
            Console.WriteLine("A");
        }
    }
}
```

Если `x > 5` стоит первым, то для `x = 7` ветка `x > 10` уже недостижима. Более строгое условие должно идти раньше более мягкого.

### 10. Мини-автомат

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.Write("Напиток: ");
        string drink = Console.ReadLine();

        int price;
        switch (drink)
        {
            case "чай": price = 80; break;
            case "кофе": price = 120; break;
            case "какао": price = 110; break;
            default: price = 0; break;
        }

        string status = price > 0 ? "доступен" : "нет в меню";
        Console.WriteLine(drink + ": " + price + " руб., " + status);
    }
}
```

## Блиц

```quiz
{
  "type": "radio",
  "question": "Какая конструкция лучше всего подходит для выбора одного из двух значений?",
  "options": [
    { "text": "Тернарный оператор `?:`", "correct": true, "explanation": "Он возвращает одно из двух значений в одном выражении." },
    { "text": "Классический `switch`", "correct": false, "explanation": "`switch` удобен для многих вариантов, а не для двух значений." },
    { "text": "Цикл `while`", "correct": false, "explanation": "Цикл повторяет действия, а не выбирает значение." }
  ],
  "explanation": "Для двух коротких вариантов `?:` читается компактнее, чем `if/else`."
}
```
