---
title: Практика: самопроверка — строки, символы, bool
keywords: практика string char bool c#, длина строки, индексация, ToUpper, ToLower, пустая строка, IsNullOrWhiteSpace, логический тип, задания, самопроверка
---

# Проверь себя: строки, символы и bool

Как хранить текст и отдельные символы, почему строку нельзя изменить по букве и зачем нужен `bool`?

Ниже — десять заданий в виде анкеты путешественника во времени. Условия пока не нужны: достаточно объявить значения и вывести результат.

## Задания

1. **Строка и её длина.** Создай строку `Время — иллюзия`, выведи её, длину через `.Length`, первый и последний символ по индексам.
2. **Регистр.** Для строки `Марс` выведи результат `ToUpper()` и `ToLower()`. Объясни, изменилась ли исходная строка.
3. **`char` и `string`.** Объяви `char grade = 'A';` и `string letter = "A";`. Выведи обе переменные и объясни разницу в кавычках.
4. **Склейка.** Объяви имя и город, собери строку `Ада прибыла в Олимп` через `+` и выведи её.
5. **Пустая строка.** Проверь через `string.IsNullOrWhiteSpace` три значения: `string.Empty`, `"   "` и `"Марс"`. Выведи три результата.
6. **Флаги.** Объяви `bool hasTicket = true;` и `bool isRaining = false;`. Выведи каждое значение с подписью.
7. **`bool` из сравнения.** Получи `bool isAdult = 20 >= 18;` и `bool isChild = 20 < 18;`. Выведи оба значения.
8. **Выход за границы.** Что произойдёт при обращении к `phrase[100]` для строки из задания 1? Как правильно получить последний символ?
9. **Неизменяемость.** Дан код: `string s = "кот"; s.ToUpper(); Console.WriteLine(s);`. Что выведется и почему? Исправь код, чтобы получить `КОТ`.
10. **Мини-анкета.** Заведи шесть переменных: имя, город, класс (`char`), год, наличие билета и плаща. Выведи четыре строки с этими данными.

## Решения

### 1. Строка и её длина

```csharp
using System;

class Program
{
    static void Main()
    {
        string phrase = "Время — иллюзия";

        Console.WriteLine(phrase);
        Console.WriteLine("Длина: " + phrase.Length);
        Console.WriteLine("Первый символ: " + phrase[0]);
        Console.WriteLine("Последний символ: " + phrase[phrase.Length - 1]);
    }
}
```

Индексы начинаются с `0`, поэтому последний символ имеет индекс `Length - 1`.

### 2. Регистр

```csharp
using System;

class Program
{
    static void Main()
    {
        string planet = "Марс";

        Console.WriteLine(planet.ToUpper()); // МАРС
        Console.WriteLine(planet.ToLower()); // марс
        Console.WriteLine(planet);           // Марс
    }
}
```

Строки неизменяемы: методы возвращают новую строку, а исходная остаётся прежней.

### 3. `char` и `string`

```csharp
using System;

class Program
{
    static void Main()
    {
        char grade = 'A';
        string letter = "A";

        Console.WriteLine(grade);
        Console.WriteLine(letter);
    }
}
```

`char` — ровно один символ в одинарных кавычках, `string` — текст в двойных. Даже один символ в двойных кавычках — это строка.

### 4. Склейка

```csharp
using System;

class Program
{
    static void Main()
    {
        string name = "Ада";
        string city = "Олимп";

        string report = name + " прибыла в " + city;
        Console.WriteLine(report);
    }
}
```

### 5. Пустая строка

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine(string.IsNullOrWhiteSpace(string.Empty)); // True
        Console.WriteLine(string.IsNullOrWhiteSpace("   "));        // True
        Console.WriteLine(string.IsNullOrWhiteSpace("Марс"));       // False
    }
}
```

Метод считает пустой строку, которая пуста или состоит только из пробелов. Это удобно для проверки ввода.

### 6. Флаги

```csharp
using System;

class Program
{
    static void Main()
    {
        bool hasTicket = true;
        bool isRaining = false;

        Console.WriteLine("Есть билет: " + hasTicket);
        Console.WriteLine("Идёт дождь: " + isRaining);
    }
}
```

### 7. `bool` из сравнения

```csharp
using System;

class Program
{
    static void Main()
    {
        bool isAdult = 20 >= 18;
        bool isChild = 20 < 18;

        Console.WriteLine("Взрослый: " + isAdult); // True
        Console.WriteLine("Ребёнок: " + isChild);  // False
    }
}
```

Сравнение возвращает `bool` — его можно сохранить в переменную и вывести.

### 8. Выход за границы

```csharp
using System;

class Program
{
    static void Main()
    {
        string phrase = "Время — иллюзия";

        // Console.WriteLine(phrase[100]); // IndexOutOfRangeException
        Console.WriteLine(phrase[phrase.Length - 1]); // я
    }
}
```

Обращение к несуществующему индексу выбрасывает исключение. Последний индекс всегда `Length - 1`.

### 9. Неизменяемость

```csharp
using System;

class Program
{
    static void Main()
    {
        string s = "кот";
        s.ToUpper();
        Console.WriteLine(s); // кот

        s = s.ToUpper();
        Console.WriteLine(s); // КОТ
    }
}
```

`ToUpper()` не меняет строку на месте, а возвращает новую. Результат нужно присвоить обратно.

### 10. Мини-анкета

```csharp
using System;

class Program
{
    static void Main()
    {
        string name = "Ада";
        string city = "Олимп";
        char travelClass = 'A';
        int year = 2147;
        bool hasTicket = true;
        bool hasCloak = false;

        Console.WriteLine("Имя: " + name + ", город: " + city);
        Console.WriteLine("Класс: " + travelClass + ", год: " + year);
        Console.WriteLine("Билет: " + hasTicket);
        Console.WriteLine("Плащ: " + hasCloak);
    }
}
```

## Блиц

```quiz
{
  "type": "radio",
  "question": "Что выведет `Console.WriteLine(\"A\" + 'B');`?",
  "options": [
    { "text": "`AB`", "correct": true, "explanation": "Строка плюс `char` даёт строку." },
    { "text": "`65 66`", "correct": false, "explanation": "Коды символов не выводятся: `char` приклеивается как символ." },
    { "text": "Ошибку компиляции", "correct": false, "explanation": "`string + char` — допустимая операция." }
  ],
  "explanation": "При склейке со строкой `char` превращается в свой символ."
}
```
