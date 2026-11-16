---
title: Практика: самопроверка — сравнения и логика
keywords: практика операторов c#, сравнение, равно, не равно, логическое И, ИЛИ, НЕ, приоритет операторов, скобки, bool, задания, самопроверка
---

# Проверь себя: сравнения и логика

Как из простых проверок собрать одно надёжное условие и не перепутать `=` с `==`?

Ниже — десять заданий для пропускного пункта космопорта. Пока достаточно выводить `bool`-значения: ветвления будут в следующей группе.

## Задания

1. **Сравнения чисел.** Для `age = 20` выведи результаты `age > 18`, `age == 18`, `age != 18` и `age <= 21`.
2. **Сравнение строк.** Сравни `"Марс"` и `"марс"` через `==`. Объясни результат и предложи, как сравнивать без учёта регистра.
3. **И и ИЛИ.** Для `hasTicket = true` и `hasPassport = false` выведи `hasTicket && hasPassport` и `hasTicket || hasPassport`.
4. **НЕ.** Для `isBlocked = false` выведи `!isBlocked`. Что изменится, если поставить `true`?
5. **Приоритет.** Вычисли `true || false && false` без скобок. Объясни, почему получился именно такой ответ.
6. **Скобки.** Сравни `true || false && false` и `(true || false) && false`. Почему результаты разные?
7. **Допуск.** Для `age = 20`, `hasTicket = true`, `isBlocked = false` собери условие `canEnter` через `&&` и `!`.
8. **VIP или приглашение.** Для `isVip = false` и `hasInvitation = true` получи `canSkipQueue` через `||`.
9. **Найди ошибку.** Почему `bool ok = age = 18;` не компилируется? Исправь строку.
10. **Мини-валидатор.** Для `hasTicket`, `hasPassport`, `isAdult` и `isBanned` собери `canEnter` так, чтобы нужны были билет, паспорт и совершеннолетие, а бан блокировал вход.

## Решения

### 1. Сравнения чисел

```csharp
using System;

class Program
{
    static void Main()
    {
        int age = 20;

        Console.WriteLine(age > 18);   // True
        Console.WriteLine(age == 18);  // False
        Console.WriteLine(age != 18);  // True
        Console.WriteLine(age <= 21);  // True
    }
}
```

Сравнение возвращает `bool` — логическое значение `true` или `false`.

### 2. Сравнение строк

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Марс" == "марс");                  // False
        Console.WriteLine("Марс".ToLower() == "марс".ToLower()); // True
    }
}
```

`==` для строк учитывает регистр. Чтобы сравнивать без учёта регистра, приводят обе строки к одному регистру.

### 3. И и ИЛИ

```csharp
using System;

class Program
{
    static void Main()
    {
        bool hasTicket = true;
        bool hasPassport = false;

        Console.WriteLine(hasTicket && hasPassport); // False
        Console.WriteLine(hasTicket || hasPassport); // True
    }
}
```

`&&` требует выполнения обоих условий, `||` — хотя бы одного.

### 4. НЕ

```csharp
using System;

class Program
{
    static void Main()
    {
        bool isBlocked = false;

        Console.WriteLine(!isBlocked); // True
        Console.WriteLine(!true);      // False
    }
}
```

`!` переворачивает логическое значение.

### 5. Приоритет

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine(true || false && false); // True
    }
}
```

Сначала выполняется `&&`: `false && false` даёт `false`. Затем `true || false` даёт `true`. У `&&` приоритет выше, чем у `||`.

### 6. Скобки

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine(true || false && false);   // True
        Console.WriteLine((true || false) && false); // False
    }
}
```

Скобки меняют порядок: во втором случае сначала считается `true || false` → `true`, затем `true && false` → `false`.

### 7. Допуск

```csharp
using System;

class Program
{
    static void Main()
    {
        int age = 20;
        bool hasTicket = true;
        bool isBlocked = false;

        bool canEnter = age >= 18 && hasTicket && !isBlocked;
        Console.WriteLine(canEnter); // True
    }
}
```

Условие читается почти как фраза: «совершеннолетний **и** есть билет **и** не заблокирован».

### 8. VIP или приглашение

```csharp
using System;

class Program
{
    static void Main()
    {
        bool isVip = false;
        bool hasInvitation = true;

        bool canSkipQueue = isVip || hasInvitation;
        Console.WriteLine(canSkipQueue); // True
    }
}
```

### 9. Найди ошибку

```csharp
using System;

class Program
{
    static void Main()
    {
        int age = 20;

        // bool ok = age = 18; // ошибка: это присваивание, а не сравнение
        bool ok = age == 18;

        Console.WriteLine(ok); // False
    }
}
```

Одинарное `=` записывает значение в переменную и возвращает число, а не `bool`. Для сравнения нужно `==`.

### 10. Мини-валидатор

```csharp
using System;

class Program
{
    static void Main()
    {
        bool hasTicket = true;
        bool hasPassport = true;
        bool isAdult = true;
        bool isBanned = false;

        bool canEnter = hasTicket && hasPassport && isAdult && !isBanned;

        Console.WriteLine("Билет: " + hasTicket);
        Console.WriteLine("Паспорт: " + hasPassport);
        Console.WriteLine("Совершеннолетний: " + isAdult);
        Console.WriteLine("Забанен: " + isBanned);
        Console.WriteLine("Можно войти: " + canEnter); // True
    }
}
```

## Блиц

```quiz
{
  "type": "radio",
  "question": "Чему равно `true || false && false`?",
  "options": [
    { "text": "`true`", "correct": true, "explanation": "Сначала `false && false` → `false`, затем `true || false` → `true`." },
    { "text": "`false`", "correct": false, "explanation": "Так было бы при выполнении `||` раньше `&&`." },
    { "text": "Ошибка компиляции", "correct": false, "explanation": "Выражение синтаксически корректно." }
  ],
  "explanation": "У `&&` приоритет выше, чем у `||`; скобки помогают явно задать порядок."
}
```
