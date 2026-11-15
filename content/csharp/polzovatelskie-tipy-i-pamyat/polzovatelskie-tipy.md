---
title: Пользовательские типы
keywords: выбор типа данных, class, struct, record, enum, Nullable, стек и куча, неизменяемость, сравнение, моделирование сущностей
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

