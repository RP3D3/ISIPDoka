---
title: Практика: самопроверка — коллекции
keywords: практика коллекций c#, List, Dictionary, HashSet, Queue, Stack, добавление, удаление, поиск, сортировка, ключ значение, задания, самопроверка
---

# Проверь себя: коллекции

Какую коллекцию выбрать, когда нужен список, словарь, множество или очередь?

Ниже — десять заданий для инвентаря марсианской станции. Для каждой задачи сначала назови подходящую коллекцию, потом пиши код.

## Задания

1. **Список.** Создай `List<string>` с предметами `вода`, `еда`, `аптечка`. Выведи количество и все элементы через `foreach`.
2. **Удаление и поиск.** Удали `еда`, проверь наличие `вода` через `Contains` и найди индекс `аптечка` через `IndexOf`.
3. **Сортировка.** Для списка `{ "Ева", "Ада", "Боб" }` вызови `Sort`, затем `Reverse` и выведи результат.
4. **Словарь.** Создай `Dictionary<string, int>` с запасами: `вода` — `10`, `еда` — `5`. Затем добавь ещё `3` единицы воды через индексатор.
5. **Безопасное чтение.** Проверь через `TryGetValue`, есть ли на складе `хлеб`. Выведи запас или сообщение `Нет на складе`.
6. **Обход словаря.** Выведи все пары ключ-значение словаря из задания 4 через `foreach`.
7. **Множество.** Для списка `{ "Ада", "Боб", "Ада", "Ева", "Боб" }` посчитай количество всех записей и количество уникальных имён через `HashSet`.
8. **Очередь.** Поставь в `Queue<string>` трёх человек, выведи первого через `Peek`, затем извлеки его через `Dequeue` и выведи оставшееся количество.
9. **Стек.** Положи в `Stack<string>` три действия, выведи верхнее через `Peek`, затем сними его через `Pop` и выведи новое верхнее.
10. **Мини-инвентарь.** Для списка груза `{ "вода", "еда", "вода", "аптечка" }` посчитай уникальные предметы и количество каждого через `Dictionary`.

## Решения

### 1. Список

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string> items = new List<string>();
        items.Add("вода");
        items.Add("еда");
        items.Add("аптечка");

        Console.WriteLine("Всего: " + items.Count);
        foreach (string item in items)
        {
            Console.WriteLine(item);
        }
    }
}
```

`List<T>` хранит элементы по порядку и позволяет добавлять их без заранее известной длины.

### 2. Удаление и поиск

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string> items = new List<string> { "вода", "еда", "аптечка" };

        items.Remove("еда");

        Console.WriteLine(items.Contains("вода"));    // True
        Console.WriteLine(items.IndexOf("аптечка"));  // 1
    }
}
```

`Remove` удаляет первое совпадение, `Contains` возвращает `bool`, `IndexOf` — индекс или `-1`.

### 3. Сортировка

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string> names = new List<string> { "Ева", "Ада", "Боб" };

        names.Sort();
        names.Reverse();

        foreach (string name in names)
        {
            Console.WriteLine(name); // Ева, Боб, Ада
        }
    }
}
```

`Sort` сортирует по возрастанию, `Reverse` переворачивает уже отсортированный список.

### 4. Словарь

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Dictionary<string, int> stock = new Dictionary<string, int>();
        stock["вода"] = 10;
        stock["еда"] = 5;

        stock["вода"] += 3;

        Console.WriteLine(stock["вода"]); // 13
        Console.WriteLine(stock["еда"]);  // 5
    }
}
```

Словарь хранит пары «ключ — значение». По ключу можно читать и сразу записывать новое значение.

### 5. Безопасное чтение

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Dictionary<string, int> stock = new Dictionary<string, int>();
        stock["вода"] = 10;

        if (stock.TryGetValue("хлеб", out int bread))
        {
            Console.WriteLine("Хлеб: " + bread);
        }
        else
        {
            Console.WriteLine("Нет на складе");
        }
    }
}
```

`TryGetValue` не выбрасывает исключение, если ключа нет: он возвращает `false`, а в переменную после `out` пишет `0`.

### 6. Обход словаря

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Dictionary<string, int> stock = new Dictionary<string, int>();
        stock["вода"] = 13;
        stock["еда"] = 5;

        foreach (KeyValuePair<string, int> pair in stock)
        {
            Console.WriteLine(pair.Key + ": " + pair.Value);
        }
    }
}
```

`KeyValuePair` даёт доступ к ключу через `.Key`, а к значению — через `.Value`.

### 7. Множество

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string> visitors = new List<string> { "Ада", "Боб", "Ада", "Ева", "Боб" };

        HashSet<string> unique = new HashSet<string>();
        foreach (string name in visitors)
        {
            unique.Add(name);
        }

        Console.WriteLine("Всего записей: " + visitors.Count); // 5
        Console.WriteLine("Уникальных: " + unique.Count);      // 3
    }
}
```

`HashSet<T>` автоматически игнорирует повторное добавление. Поэтому `Add` можно вызывать для каждого элемента списка.

### 8. Очередь

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Queue<string> queue = new Queue<string>();
        queue.Enqueue("Ада");
        queue.Enqueue("Боб");
        queue.Enqueue("Ева");

        Console.WriteLine(queue.Peek());    // Ада
        Console.WriteLine(queue.Dequeue()); // Ада
        Console.WriteLine(queue.Count);     // 2
    }
}
```

Очередь работает по принципу «первый пришёл — первый вышел»: `Enqueue` добавляет в конец, `Dequeue` забирает из начала.

### 9. Стек

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Stack<string> actions = new Stack<string>();
        actions.Push("открыть шлюз");
        actions.Push("проверить кислород");
        actions.Push("запустить двигатель");

        Console.WriteLine(actions.Peek()); // запустить двигатель
        Console.WriteLine(actions.Pop());  // запустить двигатель
        Console.WriteLine(actions.Peek()); // проверить кислород
    }
}
```

Стек работает по принципу «последний пришёл — первый вышел»: `Push` кладёт сверху, `Pop` снимает верхний.

### 10. Мини-инвентарь

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string> cargo = new List<string> { "вода", "еда", "вода", "аптечка" };

        HashSet<string> unique = new HashSet<string>();
        Dictionary<string, int> counts = new Dictionary<string, int>();

        foreach (string item in cargo)
        {
            unique.Add(item);

            if (counts.ContainsKey(item))
            {
                counts[item]++;
            }
            else
            {
                counts[item] = 1;
            }
        }

        Console.WriteLine("Уникальных предметов: " + unique.Count); // 3

        foreach (KeyValuePair<string, int> pair in counts)
        {
            Console.WriteLine(pair.Key + ": " + pair.Value);
        }
    }
}
```

`HashSet` отвечает за уникальность, `Dictionary` — за подсчёт. Вместе они решают задачу без вложенных циклов.

## Блиц

```quiz
{
  "type": "radio",
  "question": "Какая коллекция хранит пары «ключ — значение»?",
  "options": [
    { "text": "`Dictionary<TKey, TValue>`", "correct": true, "explanation": "Словарь ищет значение по ключу." },
    { "text": "`List<T>`", "correct": false, "explanation": "Список хранит элементы по индексу, а не по ключу." },
    { "text": "`Queue<T>`", "correct": false, "explanation": "Очередь хранит элементы в порядке добавления." }
  ],
  "explanation": "Для быстрого поиска по ключу выбирают `Dictionary`."
}
```
