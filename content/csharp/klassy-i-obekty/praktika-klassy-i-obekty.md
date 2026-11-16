---
title: Практика: самопроверка — классы и объекты
keywords: практика классов c#, class, объект, new, поля, константы, readonly, конструкторы, this, модификаторы доступа, свойства, static, инкапсуляция, задания, самопроверка
---

# Проверь себя: классы и объекты

Как из чертежа класса создать независимые объекты, спрятать внутренние поля и не дать данным выйти за допустимые границы?

Ниже — десять заданий для симулятора марсианской станции. Каждое следующее задание дополняет класс `Astronaut`, поэтому удобно вести один файл и постепенно его расширять.

## Задания

1. **Первый класс.** Создай класс `Astronaut` с публичным полем `Name`. Создай два объекта через `new`, задай имена и выведи их.
2. **Инкапсуляция.** Замени поле энергии на `private int _energy` и публичное свойство `Energy`, которое ограничивает значение диапазоном `0…100`.
3. **Конструкторы.** Добавь конструктор `Astronaut(string name, int energy)` и перегрузку `Astronaut(string name)`, которая вызывает основной через `: this(name, 100)`.
4. **`this`.** В конструкторе используй `this.Name = name;`. Объясни, зачем нужно `this`, если параметр называется так же, как свойство.
5. **Свойства.** Сделай `Name` доступным только для чтения (`{ get; }`), а `Energy` — для чтения снаружи и записи внутри класса (`{ get; private set; }`).
6. **Модификаторы доступа.** Сделай публичный метод `SpendEnergy`, приватный вспомогательный метод и публичный `Report`, который использует приватный метод.
7. **`static`.** Добавь статическое свойство `TotalCreated`, которое увеличивается в конструкторе. Создай трёх астронавтов и выведи счётчик.
8. **`const` и `readonly`.** Добавь `public const int MaxEnergy = 100;` и `public readonly Guid Id = Guid.NewGuid();`. Объясни разницу между ними.
9. **Поведение.** Добавь методы `Feed(int amount)`, `SpendEnergy(int amount)` и `PrintStatus()`. Все изменения энергии должны проходить через проверку диапазона.
10. **Мини-симуляция.** Создай двух астронавтов, покорми одного и потрать энергию другого. Выведи карточки обоих и общее количество созданных объектов.

## Решения

### 1. Первый класс

```csharp
using System;

class Astronaut
{
    public string Name;
}

class Program
{
    static void Main()
    {
        Astronaut ada = new Astronaut();
        ada.Name = "Ада";

        Astronaut bob = new Astronaut();
        bob.Name = "Боб";

        Console.WriteLine(ada.Name);
        Console.WriteLine(bob.Name);
    }
}
```

`new` создаёт отдельный объект в куче. `ada` и `bob` хранят ссылки на разные объекты.

### 2. Инкапсуляция

```csharp
using System;

class Astronaut
{
    private int _energy;

    public int Energy
    {
        get { return _energy; }
        set
        {
            if (value < 0) _energy = 0;
            else if (value > 100) _energy = 100;
            else _energy = value;
        }
    }
}

class Program
{
    static void Main()
    {
        Astronaut ada = new Astronaut();
        ada.Energy = 150;
        Console.WriteLine(ada.Energy); // 100

        ada.Energy = -20;
        Console.WriteLine(ada.Energy); // 0
    }
}
```

Поле `_energy` закрыто, а свойство `Energy` не пускает наружу некорректные значения.

### 3. Конструкторы

```csharp
using System;

class Astronaut
{
    public string Name { get; private set; }
    public int Energy { get; private set; }

    public Astronaut(string name, int energy)
    {
        Name = name;
        Energy = energy;
    }

    public Astronaut(string name) : this(name, 100)
    {
    }
}

class Program
{
    static void Main()
    {
        Astronaut ada = new Astronaut("Ада", 80);
        Astronaut bob = new Astronaut("Боб");

        Console.WriteLine(ada.Energy); // 80
        Console.WriteLine(bob.Energy); // 100
    }
}
```

Цепочка `: this(name, 100)` не дублирует код: она вызывает основной конструктор с энергией по умолчанию.

### 4. `this`

```csharp
using System;

class Astronaut
{
    public string Name { get; private set; }

    public Astronaut(string name)
    {
        this.Name = name;
    }
}

class Program
{
    static void Main()
    {
        Astronaut ada = new Astronaut("Ада");
        Console.WriteLine(ada.Name);
    }
}
```

`this` — ссылка на текущий объект. Если параметр и свойство называются одинаково, `this.Name` явно указывает на свойство класса, а `name` — на параметр.

### 5. Свойства

```csharp
using System;

class Astronaut
{
    public string Name { get; }
    public int Energy { get; private set; }

    public Astronaut(string name, int energy)
    {
        Name = name;
        Energy = energy;
    }

    public void SpendEnergy(int amount)
    {
        Energy -= amount;
    }
}

class Program
{
    static void Main()
    {
        Astronaut ada = new Astronaut("Ада", 100);
        ada.SpendEnergy(30);

        Console.WriteLine(ada.Name);   // Ада
        Console.WriteLine(ada.Energy); // 70
    }
}
```

`Name` можно задать только в конструкторе. `Energy` читается снаружи, но менять его напрямую нельзя — только через методы класса.

### 6. Модификаторы доступа

```csharp
using System;

class Astronaut
{
    private int _energy;

    public int Energy
    {
        get { return _energy; }
    }

    public void SpendEnergy(int amount)
    {
        if (amount > 0)
        {
            _energy -= amount;
            if (_energy < 0) _energy = 0;
        }
    }

    private void Log(string message)
    {
        Console.WriteLine("[log] " + message);
    }

    public void Report()
    {
        Log("Энергия: " + _energy);
    }
}

class Program
{
    static void Main()
    {
        Astronaut ada = new Astronaut();
        ada.SpendEnergy(30);
        ada.Report();
    }
}
```

`Log` — внутренняя деталь класса. Снаружи вызывают `Report`, а как именно он пишет лог, класс решает сам.

### 7. `static`

```csharp
using System;

class Astronaut
{
    public static int TotalCreated { get; private set; }

    public Astronaut()
    {
        TotalCreated++;
    }
}

class Program
{
    static void Main()
    {
        Astronaut ada = new Astronaut();
        Astronaut bob = new Astronaut();
        Astronaut eva = new Astronaut();

        Console.WriteLine(Astronaut.TotalCreated); // 3
    }
}
```

Статическое свойство принадлежит классу целиком, а не отдельному объекту. Поэтому обращаемся к нему через `Astronaut.TotalCreated`.

### 8. `const` и `readonly`

```csharp
using System;

class Astronaut
{
    public const int MaxEnergy = 100;
    public readonly Guid Id = Guid.NewGuid();

    public string Name { get; }

    public Astronaut(string name)
    {
        Name = name;
    }
}

class Program
{
    static void Main()
    {
        Astronaut ada = new Astronaut("Ада");
        Astronaut bob = new Astronaut("Боб");

        Console.WriteLine(Astronaut.MaxEnergy); // 100
        Console.WriteLine(ada.Id);
        Console.WriteLine(bob.Id);
    }
}
```

`const` — общая константа, известная на этапе компиляции. `readonly` — поле, которое задаётся один раз для каждого объекта (здесь — при создании).

### 9. Поведение

```csharp
using System;

class Astronaut
{
    public const int MaxEnergy = 100;

    public string Name { get; }
    public int Energy { get; private set; }

    public Astronaut(string name, int energy)
    {
        Name = name;
        Energy = Clamp(energy);
    }

    public void Feed(int amount)
    {
        if (amount > 0) Energy = Clamp(Energy + amount);
    }

    public void SpendEnergy(int amount)
    {
        if (amount > 0) Energy = Clamp(Energy - amount);
    }

    public void PrintStatus()
    {
        Console.WriteLine(Name + ": " + Energy + "/" + MaxEnergy);
    }

    private static int Clamp(int value)
    {
        if (value < 0) return 0;
        if (value > MaxEnergy) return MaxEnergy;
        return value;
    }
}

class Program
{
    static void Main()
    {
        Astronaut ada = new Astronaut("Ада", 80);
        ada.Feed(50);
        ada.PrintStatus(); // Ада: 100/100

        ada.SpendEnergy(130);
        ada.PrintStatus(); // Ада: 0/100
    }
}
```

Все изменения энергии проходят через `Clamp`, поэтому объект не может выйти за пределы `0…100`.

### 10. Мини-симуляция

```csharp
using System;

class Astronaut
{
    public const int MaxEnergy = 100;
    public static int TotalCreated { get; private set; }

    public readonly Guid Id = Guid.NewGuid();

    public string Name { get; private set; }
    public int Energy { get; private set; }

    public Astronaut(string name, int energy)
    {
        Name = name;
        Energy = Clamp(energy);
        TotalCreated++;
    }

    public Astronaut(string name) : this(name, MaxEnergy)
    {
    }

    public void Feed(int amount)
    {
        if (amount > 0) Energy = Clamp(Energy + amount);
    }

    public void SpendEnergy(int amount)
    {
        if (amount > 0) Energy = Clamp(Energy - amount);
    }

    public void PrintStatus()
    {
        Console.WriteLine(Name + ": " + Energy + "/" + MaxEnergy);
    }

    private static int Clamp(int value)
    {
        if (value < 0) return 0;
        if (value > MaxEnergy) return MaxEnergy;
        return value;
    }
}

class Program
{
    static void Main()
    {
        Astronaut ada = new Astronaut("Ада", 80);
        Astronaut bob = new Astronaut("Боб");

        ada.Feed(15);
        bob.SpendEnergy(30);

        ada.PrintStatus(); // Ада: 95/100
        bob.PrintStatus(); // Боб: 70/100

        Console.WriteLine("Всего создано: " + Astronaut.TotalCreated); // 2
    }
}
```

## Блиц

```quiz
{
  "type": "radio",
  "question": "Что делает оператор `new` при создании объекта?",
  "options": [
    { "text": "Выделяет память и вызывает конструктор", "correct": true, "explanation": "`new` создаёт экземпляр и запускает его конструктор." },
    { "text": "Просто копирует имя класса", "correct": false, "explanation": "Имя класса — это тип, а не объект." },
    { "text": "Удаляет старый объект", "correct": false, "explanation": "Удалением занимается сборщик мусора, а не `new`." }
  ],
  "explanation": "Без `new` переменная класса остаётся пустой ссылкой `null`."
}
```
