---
title: Пользовательские типы
keywords: выбор типа данных, class, struct, record, enum, Nullable, стек и куча, неизменяемость, сравнение, моделирование сущностей
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
    .cube { transform-box: fill-box; transform-origin: center; animation: bobCube 5s ease-in-out infinite; }
    .tag-swing { transform-box: fill-box; transform-origin: top center; animation: swing 5s ease-in-out infinite; }
    .box-lid { transform-box: fill-box; transform-origin: left center; animation: openLid 5s ease-in-out infinite; }
    @keyframes bobCube { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
    @keyframes swing { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(6deg); } }
    @keyframes openLid { 0%, 100% { transform: rotate(0deg); } 45%, 70% { transform: rotate(-38deg); } }
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

  <line x1="196" y1="214" x2="704" y2="214" class="s-white" stroke-width="4" stroke-linecap="round" />
  <line x1="210" y1="214" x2="210" y2="240" class="s-white" stroke-width="3" stroke-linecap="round" />
  <line x1="690" y1="214" x2="690" y2="240" class="s-white" stroke-width="3" stroke-linecap="round" />

  <g transform="translate(300, 168)">
    <g class="cube">
      <path d="M 0 -46 L 38 -25 L 0 -4 L -38 -25 Z" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
    <path d="M -22 -25 L 0 -37 L 22 -25" class="s-accent" stroke-width="2" fill="none" stroke-linejoin="round" />
      <path d="M -38 -25 L 0 -4 L 0 38 L -38 17 Z" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
      <path d="M 38 -25 L 0 -4 L 0 38 L 38 17 Z" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
    </g>
  </g>
  <g transform="translate(300, 84)">
    <rect x="-32" y="-13" width="64" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">struct</text>
  </g>

  <g transform="translate(470, 170)">
    <g class="tag-swing">
      <line x1="0" y1="-56" x2="0" y2="-34" class="s-white" stroke-width="3" stroke-linecap="round" />
      <rect x="-31" y="-34" width="62" height="82" rx="10" class="c-white s-dark" stroke-width="2.5" />
      <circle cx="0" cy="-22" r="5" class="c-dark" />
      <line x1="-18" y1="-4" x2="18" y2="-4" class="s-accent" stroke-width="3" stroke-linecap="round" />
      <line x1="-18" y1="12" x2="8" y2="12" class="s-dark" stroke-width="3" stroke-linecap="round" />
      <line x1="-18" y1="28" x2="14" y2="28" class="s-dark" stroke-width="3" stroke-linecap="round" />
    </g>
  </g>
  <g transform="translate(470, 84)">
    <rect x="-29" y="-13" width="58" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">enum</text>
  </g>

  <g transform="translate(644, 182)">
    <rect x="-48" y="-26" width="96" height="62" rx="7" class="c-white s-dark" stroke-width="2.5" />
    <line x1="-36" y1="10" x2="36" y2="10" class="s-dark" stroke-width="2" stroke-dasharray="6 6" opacity="0.6" />
    <g class="box-lid">
      <rect x="-48" y="-38" width="96" height="13" rx="4" class="c-white s-dark" stroke-width="2.5" />
    </g>
  </g>
  <g transform="translate(644, 84)">
    <rect x="-26" y="-13" width="52" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">null</text>
  </g>

  <g transform="translate(770, 120)">
    <line x1="0" y1="0" x2="14" y2="-12" class="s-white" stroke-width="2.5" stroke-linecap="round" />
    <line x1="8" y1="9" x2="24" y2="8" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
    <circle cx="18" cy="-2" r="3" class="c-white" />
  </g>
  </svg>
---

# Пользовательские типы: как выбрать модель данных

Как безошибочно выбрать между `class`, `struct`, `record` и `enum` при проектировании сущностей программы и правильно учесть работу с памятью и `null`?

В C# разработчик не ограничен встроенными числами и строками — он конструирует собственные типы под каждую задачу. Выбор конкретного инструмента зависит от трёх вопросов: **где должны жить данные** (в стеке или в куче), **будет ли объект меняться** после создания и **нужно ли сравнивать его по содержимому или по ссылке**. Правильная комбинация классов, структур, записей, перечислений и защитных конструкций `Nullable` делает код быстрым, читаемым и защищённым от случайных сбоев.

## Сравнение пользовательских типов в C#

| Тип | Категория и память | Изменяемость | Сравнение (`==`) | Когда выбирать |
| --- | --- | --- | --- | --- |
| `enum` | Тип значений (*Stack*), под капотом целое число | Неизменяемый набор констант | По числовому значению | Фиксированный список статусов, ролей или режимов работы |
| `struct` | Тип значений (*Stack*), копируется целиком | Желательно `readonly struct` | Через переопределение `Equals` | Маленькие неделимые величины до 16–24 байт (точка, цвет, сумма) |
| `record` | Ссылочный (*Heap*) или значимый (`record struct`) | Неизменяемый (`init`) по умолчанию | Автоматически по всем полям | Модели передачи данных (DTO), настройки, события, ключи словарей |
| `class` | Ссылочный тип (*Heap*), передаётся по ссылке | Обычно изменяемый через методы и свойства | По ссылке (адресу в куче) | Сложные бизнес-сущности с поведением, состоянием и наследованием |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. enum — строгий список вариантов вместо магических чисел
        DeliveryStatus status = DeliveryStatus.InTransit;

        // 2. readonly struct — лёгкое значение в стеке без нагрузки на кучу
        GeoPoint destination = new GeoPoint(55.75, 37.61);

        // 3. record — неизменяемая модель данных со сравнением по содержимому и поддержкой with
        OrderItem item = new OrderItem("Механическая клавиатура", 8500m);
        OrderItem discountedItem = item with { Price = 7200m };

        // 4. class — полноценная сущность со своим состоянием, методами и Nullable-полем (GeoPoint?)
        DeliveryOrder order = new DeliveryOrder("ORD-402", discountedItem, status, destination);
        order.PrintSummary();
    }
}

enum DeliveryStatus { Created, InTransit, Delivered }

readonly struct GeoPoint
{
    public double Lat { get; }
    public double Lon { get; }
    public GeoPoint(double lat, double lon) => (Lat, Lon) = (lat, lon);
}

record OrderItem(string Title, decimal Price);

class DeliveryOrder
{
    public string Code { get; }
    public OrderItem Item { get; }
    public DeliveryStatus Status { get; private set; }
    public GeoPoint? TargetPoint { get; } // Nullable-структура: точка доставки может быть не указана

    public DeliveryOrder(string code, OrderItem item, DeliveryStatus status, GeoPoint? targetPoint)
    {
        Code = code;
        Item = item;
        Status = status;
        TargetPoint = targetPoint;
    }

    public void PrintSummary()
    {
        string coords = TargetPoint.HasValue
            ? $"{TargetPoint.Value.Lat}; {TargetPoint.Value.Lon}"
            : "Самовывоз";
        Console.WriteLine($"Заказ {Code}: {Item.Title} ({Item.Price} руб.) | Статус: {Status} | Куда: {coords}");
    }
}

```

## Важные нюансы

* **Короткий алгоритм выбора типа:** если это список фиксированных вариантов — берите `enum`; если компактная математическая или физическая величина без сложной логики — `readonly struct`; если модель для хранения и сравнения данных без мутаций — `record`; во всех остальных случаях — `class`.
* **Осознанная работа с пустотой (`null`):** всегда явно разделяйте обязательные данные и необязательные с помощью `?` (`GeoPoint?`, `string?`), а при извлечении значений используйте безопасные операторы `?.` и `??`, чтобы исключить падение с `NullReferenceException`.
* **Цена удобства и производительности:** ссылочные типы (`class`, `record`) упрощают передачу крупных объектов без копирования, но нагружают сборщик мусора (*Garbage Collector*), тогда как значимые типы (`struct`, `enum`, `record struct`) экономят память кучи, но копируются при каждом присваивании.
* **Что дальше:** мы разобрались, как создавать отдельные типы данных, а следующий шаг в ООП — научиться выстраивать между классами общие иерархии и единые контракты поведения (см. следующую группу: *Наследование и полиморфизм*).

## Куда дальше

* [Структуры](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/struct) — типы значений, копирование и ограничения `struct`.
* [Nullable-типы значений](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/nullable-value-types) — `int?`, `HasValue` и оператор `??`.
* [Записи (record)](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/record) — неизменяемые модели данных и сравнение по содержимому.
