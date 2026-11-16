---
title: Практика: самопроверка — первые шаги
keywords: практика c#, первая программа, точка входа Main, переменные, var, Console.WriteLine, задания, самопроверка, карточка участника
---

# Проверь себя: первые шаги

Как собрать первую программу, не перепутать типы переменных и понять, где именно начинается выполнение кода?

Ниже — десять небольших заданий. Сначала попробуй решить каждое сам, а потом сверься с решением: так ошибки запоминаются лучше, чем готовый ответ.

## Задания

1. **Космическое приветствие.** Напиши программу с `class Program` и `static void Main()`, которая выводит одну строку: `Привет, Марс!`.
2. **Три факта о миссии.** Выведи тремя разными `Console.WriteLine` название миссии, год запуска и девиз.
3. **Карточка участника.** Объяви переменные `string name = "Ада"; int age = 29; double height = 1.72; bool isReady = true;` и выведи каждую на отдельной строке с подписью.
4. **Всё через `var`.** Перепиши задание 3, заменив типы на `var`. В комментариях укажи, какой тип выведет компилятор.
5. **Переприсваивание.** Создай `int crew = 4;`, выведи значение, затем присвой `crew = 5;` и выведи снова. Объясни, что произошло со старым значением.
6. **Одна строка из кусочков.** Собери из переменных `name` и `crew` строку `Экипаж Ада: 5 человек` с помощью `+` и выведи её.
7. **Найди ошибку.** Почему не компилируется `int crew = "четыре";`? Исправь строку так, чтобы она заработала.
8. **Ещё одна ошибка.** Почему нельзя написать `var planet;`? Исправь объявление двумя разными способами.
9. **Собери программу.** Расставь строки в правильном порядке: `{`, `{`, `using System;`, `Console.WriteLine("Готово");`, `class Program`, `static void Main()`, `}`, `}`.
10. **Мини-карточка.** Собери программу, которая выводит четыре строки о миссии и использует минимум пять переменных, хотя бы одна из них объявлена через `var`.

## Решения

### 1. Космическое приветствие

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Привет, Марс!");
    }
}
```

`using` подключает пространство имён, `Main` — точка входа, а `Console.WriteLine` печатает строку и переводит курсор на новую строку.

### 2. Три факта о миссии

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Миссия «Арес-7»");
        Console.WriteLine("Год запуска: 2031");
        Console.WriteLine("Девиз: дальше, чем кажется горизонт");
    }
}
```

### 3. Карточка участника

```csharp
using System;

class Program
{
    static void Main()
    {
        string name = "Ада";
        int age = 29;
        double height = 1.72;
        bool isReady = true;

        Console.WriteLine("Имя: " + name);
        Console.WriteLine("Возраст: " + age);
        Console.WriteLine("Рост: " + height);
        Console.WriteLine("Готов к полёту: " + isReady);
    }
}
```

### 4. Всё через `var`

```csharp
using System;

class Program
{
    static void Main()
    {
        var name = "Ада";       // string
        var age = 29;           // int
        var height = 1.72;      // double
        var isReady = true;     // bool

        Console.WriteLine(name);
        Console.WriteLine(age);
        Console.WriteLine(height);
        Console.WriteLine(isReady);
    }
}
```

`var` не делает переменную «без типа»: компилятор подставляет конкретный тип по значению справа от `=`.

### 5. Переприсваивание

```csharp
using System;

class Program
{
    static void Main()
    {
        int crew = 4;
        Console.WriteLine("Было: " + crew);

        crew = 5;
        Console.WriteLine("Стало: " + crew);
    }
}
```

Переменная хранит только текущее значение. После присваивания `crew = 5` старое число `4` больше нигде не хранится.

### 6. Одна строка из кусочков

```csharp
using System;

class Program
{
    static void Main()
    {
        string name = "Ада";
        int crew = 5;

        string report = "Экипаж " + name + ": " + crew + " человек";
        Console.WriteLine(report);
    }
}
```

### 7. Найди ошибку

Строка `"четыре"` — это текст (`string`), а переменная объявлена как `int`. Компилятор не умеет автоматически превращать слово в число. Исправление:

```csharp
int crew = 4;
```

Если число приходит текстом, его сначала нужно разобрать через `int.Parse` или `int.TryParse` — это будет в группе «Преобразование типов».

### 8. Ещё одна ошибка

`var` требует значение сразу: компилятору не от чего оттолкнуться, чтобы вывести тип. Два исправления:

```csharp
var planet = "Марс";      // тип выводится как string
```

```csharp
string planet;            // тип указан явно
planet = "Марс";
```

Запись `var planet = null;` тоже не сработает: `null` не относится к конкретному типу.

### 9. Собери программу

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Готово");
    }
}
```

Порядок такой: директива `using`, класс, метод `Main`, тело метода, затем закрывающие скобки.

### 10. Мини-карточка

```csharp
using System;

class Program
{
    static void Main()
    {
        var mission = "Арес-7";
        string pilot = "Ада";
        int crew = 5;
        double distance = 225.0;
        bool isReady = true;

        Console.WriteLine("Миссия: " + mission);
        Console.WriteLine("Пилот: " + pilot);
        Console.WriteLine("Экипаж: " + crew + " человек");
        Console.WriteLine("До Марса: " + distance + " млн км");
        Console.WriteLine("Готовность: " + isReady);
    }
}
```

## Блиц

```quiz
{
  "type": "radio",
  "question": "С какого метода начинается выполнение программы на C#?",
  "options": [
    { "text": "С `using System;`", "correct": false, "explanation": "`using` только подключает пространство имён." },
    { "text": "С метода `Main`", "correct": true, "explanation": "Среда выполнения ищет точку входа `Main`." },
    { "text": "С первой строки файла", "correct": false, "explanation": "Порядок строк в файле не задаёт старт программы." }
  ],
  "explanation": "Точка входа — `Main`; остальные методы и классы только помогают ей."
}
```
