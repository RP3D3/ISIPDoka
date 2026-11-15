---
title: LINQ
keywords: LINQ, IEnumerable и IQueryable, деревья выражений, Expression, отложенное выполнение, множественное перечисление, оптимизация запросов, конвейер данных
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
    .cloud-1 { transform-box: fill-box; transform-origin: center; animation: drift1 8s ease-in-out infinite; }
    .cloud-2 { transform-box: fill-box; transform-origin: center; animation: drift2 9s ease-in-out infinite; }
    @keyframes drift1 { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(7px); } }
    @keyframes drift2 { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(-7px); } }
    .item { transform-box: fill-box; transform-origin: center; animation: slide 5s ease-in-out infinite; }
    .fall { transform-box: fill-box; transform-origin: center; animation: fallThrough 5s ease-in infinite; }
    @keyframes slide {
      0%, 100% { transform: translateX(0px); }
      50% { transform: translateX(22px); }
    }
    @keyframes fallThrough {
      0%, 34% { transform: translateY(0px); opacity: 0; }
      46% { opacity: 1; }
      64%, 84% { transform: translateY(34px); opacity: 1; }
      94%, 100% { transform: translateY(34px); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transform: none !important; opacity: 1 !important; }
    }
  </style>

  <path d="M 52 42 H 32 V 238 H 52" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 848 42 H 868 V 238 H 848" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <g transform="translate(170, 46)">
    <g class="cloud-1">
      <path d="M -26 9 H 26 C 32 9 36 4 36 -1 C 36 -6 32 -10 27 -10 C 25 -17 18 -21 11 -19 C 7 -25 -3 -25 -8 -19 C -15 -20 -21 -15 -21 -8 C -27 -8 -31 -3 -31 2 C -31 6 -29 9 -26 9 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
    </g>
  </g>
  <g transform="translate(706, 40)">
    <g class="cloud-2">
      <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
    </g>
  </g>

  <line x1="170" y1="196" x2="730" y2="196" class="s-white" stroke-width="6" stroke-linecap="round" />
  <circle cx="196" cy="196" r="9" class="c-dark s-white" stroke-width="1.6" />
  <circle cx="276" cy="196" r="9" class="c-dark s-white" stroke-width="1.6" />
  <circle cx="356" cy="196" r="9" class="c-dark s-white" stroke-width="1.6" />
  <circle cx="436" cy="196" r="9" class="c-dark s-white" stroke-width="1.6" />
  <circle cx="516" cy="196" r="9" class="c-dark s-white" stroke-width="1.6" />
  <circle cx="596" cy="196" r="9" class="c-dark s-white" stroke-width="1.6" />
  <circle cx="676" cy="196" r="9" class="c-dark s-white" stroke-width="1.6" />

  <g transform="translate(508, 160)">
    <line x1="-28" y1="-26" x2="28" y2="-26" class="s-white" stroke-width="4" stroke-linecap="round" />
    <line x1="-22" y1="-26" x2="-22" y2="36" class="s-white" stroke-width="4" stroke-linecap="round" />
    <line x1="0" y1="-26" x2="0" y2="36" class="s-white" stroke-width="4" stroke-linecap="round" />
    <line x1="22" y1="-26" x2="22" y2="36" class="s-white" stroke-width="4" stroke-linecap="round" />
  </g>

  <g transform="translate(250, 180)"><g class="item">
    <circle cx="0" cy="0" r="11" class="c-white s-dark" stroke-width="2" />
  </g></g>
  <g transform="translate(316, 180)"><g class="item">
    <rect x="-10" y="-10" width="20" height="20" rx="4" class="c-white s-dark" stroke-width="2" />
  </g></g>
  <g transform="translate(382, 180)"><g class="item">
    <path d="M 0 -11 L 11 9 H -11 Z" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
  </g></g>
  <g transform="translate(448, 180)"><g class="item">
    <circle cx="0" cy="0" r="11" class="c-accent s-dark" stroke-width="2" />
  </g></g>

  <circle cx="508" cy="208" r="10" class="c-white s-dark fall" stroke-width="2" />

  <g transform="translate(508, 246)">
    <rect x="-38" y="-14" width="76" height="32" rx="5" class="c-white s-dark" stroke-width="2.2" />
    <line x1="-26" y1="2" x2="26" y2="2" class="s-dark" stroke-width="2" stroke-dasharray="5 5" opacity="0.5" />
  </g>

  <g transform="translate(660, 190)">
    <rect x="-24" y="-34" width="48" height="12" rx="3" class="c-white s-dark" stroke-width="2" />
    <rect x="-24" y="-20" width="48" height="12" rx="3" class="c-white s-dark" stroke-width="2" />
    <rect x="-24" y="-6" width="48" height="12" rx="3" class="c-white s-dark" stroke-width="2" />
    <rect x="-24" y="-34" width="48" height="4" rx="2" class="c-accent" />
  </g>

  <g transform="translate(300, 108)">
    <rect x="-29" y="-13" width="58" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">Where</text>
  </g>
  <g transform="translate(660, 108)">
    <rect x="-30" y="-13" width="60" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">Select</text>
  </g>
  </svg>
---

# LINQ — запросы к коллекциям: IEnumerable и IQueryable

Как выстраивать быстрые конвейеры обработки данных, чем запросы в памяти (`IEnumerable<T>`) принципиально отличаются от запросов к базам данных (`IQueryable<T>`) и как избежать скрытых проблем с производительностью?

**LINQ** превращает работу с коллекциями и внешними источниками данных в единый декларативный конвейер: от фильтрации и сортировки до группировки и агрегации. Большинство операторов работают лениво (**отложенное выполнение**), передавая элементы по цепочке по мере необходимости, и запускаются только в момент **материализации** (`ToList()`, `First()`, `Count()`, `foreach`). Ключевое архитектурное различие проходит между двумя интерфейсами: `IEnumerable<T>` выполняет C#-код (делегаты `Func`) непосредственно в оперативной памяти программы, тогда как `IQueryable<T>` строит **дерево выражений** (`Expression`), которое провайдер (например, Entity Framework Core) переводит в SQL-запрос на стороне сервера.

## Сводная карта инструментов группы

| Инструмент / этап конвейера | Суть механизма | Когда применять |
| --- | --- | --- |
| **Фильтрация и проекция** (`Where`, `Select`, `SelectMany`) | Ленивый отбор элементов, смена формы объекта и разворачивание вложенных списков | На первых шагах конвейера — чтобы максимально сократить объём данных до сортировки и материализации |
| **Сортировка и разбиение** (`OrderBy`, `ThenBy`, `Skip`, `Take`, `Chunk`) | Многоуровневое упорядочивание, постраничный вывод и нарезка на пакеты | Для формирования выдачи пользователю и пакетной обработки данных фиксированными порциями |
| **Поиск, группировка и множества** (`FirstOrDefault`, `Any`, `GroupBy`, `Join`, `MaxBy`) | Короткое замыкание при поиске, распределение по ключам и операции над множествами | Для проверки условий, связывания коллекций за $O(N + M)$ и расчёта итоговых метрик |
| **`IEnumerable<T>`** *(LINQ to Objects)* | Принимает скомпилированные делегаты `Func<T, ...>` и перебирает элементы в памяти | Для массивов, `List<T>`, словарей и любых данных, уже загруженных в оперативную память |
| **`IQueryable<T>`** *(LINQ to Entities / SQL)* | Принимает деревья выражений `Expression<Func<T, ...>>` для трансляции в SQL | Для запросов к БД — чтобы фильтрация и выборка полей выполнялись на сервере, а не в памяти |

## Пример кода

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

class Program
{
    static void Main()
    {
        List<OrderRecord> orders = new List<OrderRecord>
        {
            new OrderRecord(1, "Роман", 4500m, IsCompleted: true),
            new OrderRecord(2, "Анна", 1200m, IsCompleted: false),
            new OrderRecord(3, "Елена", 8900m, IsCompleted: true),
            new OrderRecord(4, "Игорь", 3100m, IsCompleted: true)
        };

        // 1. Правильный порядок конвейера: Where -> OrderByDescending -> Select -> ToList (единая материализация)
        var topCompleted = orders
            .Where(o => o.IsCompleted && o.Total >= 3000m) // Сначала отсекаем лишнее
            .OrderByDescending(o => o.Total)               // Сортируем только отфильтрованный остаток
            .Select(o => $"{o.Customer}: {o.Total} руб.")  // Проецируем в нужный формат
            .ToList();                                     // Материализуем один раз, защищаясь от повторного прохода

        Console.WriteLine($"Отобрано заказов: {topCompleted.Count}");
        foreach (string line in topCompleted)
        {
            Console.WriteLine($"  {line}");
        }

        // 2. IQueryable<T>: запрос хранит дерево выражений (Expression), которое провайдер БД переводит в SQL
        IQueryable<OrderRecord> queryableSource = orders.AsQueryable();
        IQueryable<string> dbPlan = queryableSource
            .Where(o => o.IsCompleted)
            .Select(o => o.Customer);

        Console.WriteLine("\nПлан запроса IQueryable (дерево выражений для трансляции в SQL):");
        Console.WriteLine($"  {dbPlan.Expression}");

        // ❌ Антипаттерн 1 (Multiple Enumeration): повторный обход нематериализованного IEnumerable
        // IEnumerable<OrderRecord> lazy = orders.Where(o => o.IsCompleted);
        // if (lazy.Any()) Console.WriteLine(lazy.Count()); // Фильтрация выполнится дважды!

        // ❌ Антипаттерн 2: вызов ToList() ДО Where() на IQueryable выгрузит всю таблицу из БД в память
        // var slowDbQuery = dbContext.Orders.ToList().Where(o => o.IsCompleted);
    }
}

record OrderRecord(int Id, string Customer, decimal Total, bool IsCompleted);

```

## Важные нюансы

* **`IEnumerable<T>` против `IQueryable<T>` (`Func` против `Expression`):** методы `IEnumerable<T>` принимают обычный скомпилированный делегат `Func<T, bool>`, поэтому внутри них можно вызывать любые локальные C#-методы. Методы `IQueryable<T>` принимают дерево выражений `Expression<Func<T, bool>>` — структуру данных, описывающую код запроса. Провайдер базы данных разбирает это дерево и генерирует SQL (`SELECT ... WHERE ...`), но падает с ошибкой выполнения, если внутри запроса вызван пользовательский C#-метод, у которого нет аналога в SQL. Когда нужно переключиться с серверного SQL на локальную обработку в памяти, в цепочку явно вставляют `.AsEnumerable()`.
* **Порядок операторов в конвейере решает всё:** всегда ставьте `Where` и `Take` как можно раньше, а `OrderBy` и `Select` — после них. Отфильтровать 10 000 записей до 50 и затем отсортировать 50 элементов в десятки раз быстрее, чем сначала отсортировать 10 000 записей и отбросить 9 950. На `IQueryable<T>` никогда не вызывайте `.ToList()` в середине цепочки — это мгновенно вытянет всю таблицу из базы данных в память приложения.
* **Защита от множественного перечисления (*Multiple Enumeration*):** если метод принимает `IEnumerable<T>` и внутри сначала проверяет `items.Any()`, затем считает `items.Count()`, а потом обходит элементы в `foreach`, запрос выполнится три раза подряд (а в случае с БД — отправит три отдельных SQL-запроса). Если по коллекции нужно пройтись больше одного раза, зафиксируйте результат один раз через `.ToList()` или `.ToArray()`.
* **Что дальше:** освоив декларативную обработку коллекций, мы переходим к работе с текстами, временем и внешним хранилищем — разберём устройство строк, `StringBuilder`, современные типы дат и чтение/запись файлов (см. следующую группу: *Строки, даты и файлы*).

## Куда дальше

* [LINQ в C#](https://learn.microsoft.com/dotnet/csharp/linq/) — операторы, отложенное выполнение и `IQueryable`.
* [Отложенное выполнение и ленивые вычисления](https://learn.microsoft.com/dotnet/standard/linq/deferred-execution-lazy-evaluation) — почему запрос выполняется позже, чем объявлен.
