---
title: Коллекции
keywords: коллекции, массив, динамический список, словарь, ключ значение, множество, уникальные элементы, очередь, стек, порядок, поиск, выбор
svg: |
  <svg viewBox="0 0 900 280" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 900px; max-height: 280px; height: auto; display: block; margin: 0 auto 20px;">
  <style>
    .c-white { fill: var(--text-main, #ffffff); }
    .c-dark { fill: var(--bg-main, #222429); }
    .c-accent { fill: var(--domain-accent, #953dac); }
    .s-white { stroke: var(--text-main, #ffffff); }
    .s-dark { stroke: var(--bg-main, #222429); }
    .s-accent { stroke: var(--domain-accent, #953dac); }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .list-items { transform-box: fill-box; transform-origin: center; animation: shiftRow 5s ease-in-out infinite; }
    .dict-card { transform-box: fill-box; transform-origin: center bottom; animation: popCard 5s ease-in-out infinite; }
    .stack-top { transform-box: fill-box; transform-origin: center; animation: bobPlate 5s ease-in-out infinite; }
    .cloud-1 { transform-box: fill-box; transform-origin: center; animation: drift1 8s ease-in-out infinite; }
    .cloud-2 { transform-box: fill-box; transform-origin: center; animation: drift2 9s ease-in-out infinite; }
    @keyframes drift1 { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(7px); } }
    @keyframes drift2 { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(-7px); } }
    @keyframes shiftRow {
      0%, 100% { transform: translateX(0px); }
      45%, 60% { transform: translateX(11px); }
    }
    @keyframes popCard {
      0%, 100% { transform: translateY(0px); }
      45%, 60% { transform: translateY(-14px); }
    }
    @keyframes bobPlate {
      0%, 100% { transform: translateY(0px); }
      45%, 60% { transform: translateY(-7px); }
    }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transform: none !important; opacity: 1 !important; }
    }
  </style>

  <path d="M 52 42 H 32 V 238 H 52" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 848 42 H 868 V 238 H 848" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <g transform="translate(150, 46)">
    <g class="cloud-1">
      <path d="M -26 9 H 26 C 32 9 36 4 36 -1 C 36 -6 32 -10 27 -10 C 25 -17 18 -21 11 -19 C 7 -25 -3 -25 -8 -19 C -15 -20 -21 -15 -21 -8 C -27 -8 -31 -3 -31 2 C -31 6 -29 9 -26 9 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
    </g>
  </g>
  <g transform="translate(742, 40)">
    <g class="cloud-2">
      <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
    </g>
  </g>

  <line x1="186" y1="216" x2="714" y2="216" class="s-white" stroke-width="4" stroke-linecap="round" />
  <line x1="204" y1="216" x2="204" y2="240" class="s-white" stroke-width="3" stroke-linecap="round" />
  <line x1="696" y1="216" x2="696" y2="240" class="s-white" stroke-width="3" stroke-linecap="round" />

  <g transform="translate(276, 168)">
    <rect x="-72" y="-50" width="144" height="50" rx="9" class="c-white s-dark" stroke-width="2.2" />
    <g class="list-items">
      <rect x="-58" y="-38" width="24" height="26" rx="5" class="c-dark" />
      <rect x="-29" y="-38" width="24" height="26" rx="5" class="c-accent" />
      <rect x="0" y="-38" width="24" height="26" rx="5" class="c-dark" />
      <rect x="29" y="-38" width="24" height="26" rx="5" class="c-dark" />
    </g>
  </g>
  <g transform="translate(276, 100)">
    <rect x="-30" y="-14" width="60" height="28" rx="14" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">List</text>
  </g>

  <g transform="translate(450, 168)">
    <rect x="-74" y="-64" width="148" height="64" rx="9" class="c-white s-dark" stroke-width="2.2" />
    <rect x="-56" y="-78" width="30" height="16" rx="4" class="c-dark s-white" stroke-width="1.5" />
    <rect x="-18" y="-78" width="30" height="16" rx="4" class="c-accent" />
    <rect x="20" y="-78" width="30" height="16" rx="4" class="c-dark s-white" stroke-width="1.5" />
    <g class="dict-card">
      <rect x="-24" y="-56" width="48" height="50" rx="6" class="c-white s-dark" stroke-width="2" />
      <line x1="-15" y1="-38" x2="15" y2="-38" class="s-dark" stroke-width="2" stroke-linecap="round" />
      <line x1="-15" y1="-28" x2="5" y2="-28" class="s-accent" stroke-width="2" stroke-linecap="round" />
    </g>
  </g>
  <g transform="translate(450, 74)">
    <rect x="-56" y="-14" width="112" height="28" rx="14" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">Dictionary</text>
  </g>

  <g transform="translate(626, 168)">
    <ellipse cx="0" cy="-8" rx="50" ry="10" class="c-white s-dark" stroke-width="2" />
    <ellipse cx="0" cy="-27" rx="50" ry="10" class="c-white s-dark" stroke-width="2" />
    <g class="stack-top">
      <ellipse cx="0" cy="-46" rx="50" ry="10" class="c-white s-dark" stroke-width="2" />
      <ellipse cx="0" cy="-46" rx="26" ry="5.5" class="c-accent" />
    </g>
  </g>
  <g transform="translate(626, 74)">
    <rect x="-34" y="-14" width="68" height="28" rx="14" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">Stack</text>
  </g>
  </svg>
---

# Шпаргалка по коллекциям: сравнение и выбор

Какой контейнер выбрать для хранения данных — фиксированный массив, динамический список, словарь по ключу, набор уникальных значений, очередь или стек?

Выбор подходящей структуры зависит от того, как программа будет добавлять, искать и извлекать элементы. Одни коллекции дают быстрый доступ по номеру или смысловому ключу, другие автоматически отсеивают дубликаты или поддерживают строгую очерёдность обработки.

## Сводная таблица коллекций

| Коллекция | Размер | Доступ и поиск | Дубликаты | Порядок элементов | Главная задача |
| --- | --- | --- | --- | --- | --- |
| **Массив (`T[]`)** | Фиксированный | По индексу `[i]` (`Length`) | Разрешены | Сохраняется порядок добавления | Известное заранее число элементов, максимальная скорость |
| **Список (`List<T>`)** | Динамический | По индексу `[i]` (`Count`) | Разрешены | Сохраняется порядок добавления | Гибкий набор данных с частым добавлением и удалением |
| **Словарь (`Dictionary<K, V>`)** | Динамический | По уникальному ключу `[key]` | Ключи уникальны, значения — любые | Не гарантируется | Мгновенный поиск данных по имени, ID или артикулу |
| **Множество (`HashSet<T>`)** | Динамический | Проверка наличия `Contains` | Запрещены (отсеиваются) | Не гарантируется | Хранение уникальных записей, пересечение и объединение наборов |
| **Очередь (`Queue<T>`)** | Динамический | Только первый элемент (`Peek` / `Dequeue`) | Разрешены | Строго **FIFO** (первым пришёл — первым вышел) | Обработка задач строго в порядке поступления |
| **Стек (`Stack<T>`)** | Динамический | Только верхний элемент (`Peek` / `Pop`) | Разрешены | Строго **LIFO** (последним пришёл — первым вышел) | Откат действий (Ctrl+Z), история переходов, вложенные вызовы |

## Пример кода

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // 1. Массив — жёсткий размер, доступ по индексу
        string[] days = { "Пн", "Вт", "Ср" };

        // 2. Список — свободно растёт и сжимается
        List<string> tasks = new List<string> { "Код", "Тест" };
        tasks.Add("Релиз");

        // 3. Словарь — мгновенный доступ по смысловому ключу
        Dictionary<string, int> prices = new Dictionary<string, int>
        {
            ["Кофе"] = 250,
            ["Чай"] = 180
        };

        // 4. Множество — хранит только уникальные элементы
        HashSet<int> uniqueIds = new HashSet<int> { 101, 102, 101 }; // Останутся 101 и 102

        // 5. Очередь (FIFO) — первым вошёл, первым вышел
        Queue<string> queue = new Queue<string>();
        queue.Enqueue("Первый клиент");
        queue.Enqueue("Второй клиент");

        // 6. Стек (LIFO) — последним вошёл, первым вышел
        Stack<string> history = new Stack<string>();
        history.Push("Страница 1");
        history.Push("Страница 2");

        Console.WriteLine($"Массив: {days[0]}, Список: {tasks.Count} шт., Цена кофе: {prices["Кофе"]}");
        Console.WriteLine($"Уникальных ID: {uniqueIds.Count}, Из очереди: {queue.Dequeue()}, Из стека: {history.Pop()}");
    }
}

```

## Краткий алгоритм выбора коллекции

* **Размер известен заранее и не будет меняться:** выбирайте обычный массив `T[]`.
* **Нужен универсальный список с доступом по номеру `[i]` и изменением длины:** берите `List<T>`.
* **Данные нужно быстро находить по логину, коду или названию, а не по номеру:** используйте `Dictionary<TKey, TValue>`.
* **Важно автоматически исключить повторы и быстро проверять «есть ли элемент в наборе»:** подойдёт `HashSet<T>`.
* **Элементы обрабатываются строго в порядке поступления (живая очередь):** применяйте `Queue<T>`.
* **Всегда нужен самый последний добавленный элемент (отмена действий):** выбирайте `Stack<T>`.

## Куда дальше

* [Коллекции в .NET](https://learn.microsoft.com/dotnet/standard/collections/) — обзор `List`, `Dictionary`, `HashSet`, `Queue` и `Stack` и правила выбора структуры.
* [Пространство System.Collections.Generic](https://learn.microsoft.com/dotnet/api/system.collections.generic) — справочник API по обобщённым коллекциям.
