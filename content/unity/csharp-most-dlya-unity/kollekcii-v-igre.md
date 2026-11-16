---
title: Коллекции в игре
description: Массивы, List, Dictionary и Queue: какую коллекцию выбрать и как не создавать мусор каждый кадр.
keywords: Unity C#, коллекции, массивы, List, Dictionary, Queue, HashSet, GC, производительность

---

# Коллекции в игре

Коллекция хранит несколько значений. В играх чаще всего нужны массивы,
`List<T>`, `Dictionary<TKey, TValue>` и `Queue<T>`.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/csharp-most-dlya-unity/collections.svg"
    alt="Схема коллекций: массив, List, Dictionary и Queue"
    width="900"
  >
  <figcaption>
    Выбирайте коллекцию по операции: индекс, поиск по ключу, очередь или
    фиксированный набор.
  </figcaption>
</figure>

## Массив

```csharp
private int[] _scores = new int[5];

_scores[0] = 10;
```

Размер фиксирован. Быстрый доступ по индексу. Подходит, когда количество
элементов известно заранее.

## List<T>

```csharp
using System.Collections.Generic;
using UnityEngine;

private readonly List<Enemy> _enemies = new();

private void AddEnemy(Enemy enemy)
{
    _enemies.Add(enemy);
}

private void RemoveEnemy(Enemy enemy)
{
    _enemies.Remove(enemy);
}
```

`List<T>` умеет менять размер. Это самая частая коллекция для врагов,
предметов и пуль.

## Dictionary<TKey, TValue>

```csharp
private readonly Dictionary<string, int> _stats = new();

_stats["health"] = 100;
_stats["score"] = 250;

if (_stats.TryGetValue("health", out int health))
{
    Debug.Log(health);
}
```

Быстрый поиск по ключу. Удобно для конфигов, настроек и таблиц. Не
сериализуется в Inspector напрямую.

## Queue<T>

```csharp
private readonly Queue<GameObject> _pool = new();

_pool.Enqueue(bullet);
GameObject next = _pool.Dequeue();
```

Очередь работает по принципу FIFO: первый пришёл — первый вышел. Идеальна для
пула объектов и очереди сообщений.

## HashSet<T>

```csharp
private readonly HashSet<int> _collectedIds = new();

_collectedIds.Add(5);
if (_collectedIds.Contains(5))
{
    // уже собрано
}
```

Быстрая проверка «есть ли элемент». Не хранит порядок и дубликаты.

## Мусор и GC

Не создавайте коллекции в `Update`:

```csharp
// плохо
private void Update()
{
    var enemies = new List<Enemy>();
}
```

Лучше создать поле и переиспользовать:

```csharp
private readonly List<Enemy> _enemies = new();

private void Update()
{
    _enemies.Clear();
    // заполнить заново
}
```

## Частые ошибки

- **`List` в `Update`.** Постоянные аллокации и GC-пики.
- **`Dictionary` в Inspector.** Нужна обёртка.
- **Изменяют коллекцию во время `foreach`.** Используйте `for` или копию.
- **Берут `Queue` для поиска по индексу.** Очередь для другого.
- **Забывают `using System.Collections.Generic`.** `List` и `Dictionary` не
  найдутся.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какая коллекция лучше для поиска по ключу?",
  "options": [
    {
      "text": "`Dictionary<TKey, TValue>`",
      "correct": true,
      "explanation": "Она ищет значение по ключу быстро."
    },
    {
      "text": "`Queue<T>`",
      "correct": false,
      "explanation": "Очередь работает по принципу FIFO."
    },
    {
      "text": "`int[]`",
      "correct": false,
      "explanation": "Массив ищет по индексу, а не по ключу."
    }
  ],
  "explanation": "Dictionary — коллекция ключ-значение."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про коллекции?",
  "options": [
    {
      "text": "`List<T>` умеет менять размер",
      "correct": true
    },
    {
      "text": "`Queue<T>` работает по FIFO",
      "correct": true
    },
    {
      "text": "`HashSet<T>` быстро проверяет наличие",
      "correct": true
    },
    {
      "text": "Массив автоматически расширяется",
      "correct": false,
      "explanation": "Размер массива фиксирован."
    }
  ],
  "explanation": "У каждой коллекции своя сильная сторона."
}
```

## Куда дальше

- [Корутины и IEnumerator](theme.html?path=content/unity/csharp-most-dlya-unity/korutiny-i-ienumerator.md)
- [Null и TryGetComponent](theme.html?path=content/unity/csharp-most-dlya-unity/null-i-trygetcomponent.md)
- [Пулинг и спавн](theme.html?path=content/unity/igrovaya-logika-arhitektura/puling-i-spavn.md)
