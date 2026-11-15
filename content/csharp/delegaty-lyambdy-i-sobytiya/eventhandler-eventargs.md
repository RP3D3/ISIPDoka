---
title: EventHandler & EventArgs
keywords: EventHandler, EventArgs, стандарт событий .NET, утечки памяти C#, отписка от событий, сборщик мусора, sender, паттерн OnEvent
---

# EventHandler и EventArgs: стандарт событий и память

Как оформлять события по единому стандарту библиотек .NET, передавать данные о событии без поломки существующих подписчиков и защитить приложение от утечек памяти из-за забытой отписки?

В стандартной библиотеке .NET для всех событий принят единый контракт на базе обобщённого делегата `EventHandler<TEventArgs>`. Его сигнатура всегда принимает два аргумента: ссылку на источник события (`object? sender`) и объект с подробностями произошедшего (`TEventArgs e`), унаследованный от базового класса `EventArgs`. Такой подход позволяет в будущем добавлять новые поля в класс аргументов, не меняя сигнатуру самого события и не ломая код подписчиков. При этом важно помнить об управлении памятью: издатель хранит жёсткую ссылку на каждого подписчика, поэтому несвоевременная отписка (`-=`) не даёт сборщику мусора удалить устаревшие объекты.

## Стандартные компоненты событий в .NET

| Компонент | Сигнатура или назначение | Когда применяется |
| --- | --- | --- |
| `EventHandler` | `void (object? sender, EventArgs e)` | Для событий без дополнительных данных (передаётся `EventArgs.Empty`) |
| `EventHandler<TEventArgs>` | `void (object? sender, TEventArgs e)` | Основной стандарт для передачи деталей события в пользовательском классе `TEventArgs` |
| `EventArgs` | Базовый класс для аргументов события | Контейнер данных; защищает сигнатуру события от изменений при добавлении новых полей |
| `-=` и `IDisposable` | Отписка от события при завершении работы | Разрывает ссылку от издателя к подписчику, предотвращая утечку памяти (*Lapsed Listener*) |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        OrderTracker tracker = new OrderTracker();

        // Подписчик с жизненным циклом, ограниченным блоком using
        using (AuditLogger logger = new AuditLogger(tracker))
        {
            tracker.ChangeStatus(orderId: 304, status: "Оплачен");
            tracker.ChangeStatus(orderId: 304, status: "Передан в доставку");
        } // В Dispose() произойдёт отписка -=, и сборщик мусора сможет удалить AuditLogger

        tracker.ChangeStatus(orderId: 304, status: "Доставлен"); // Логгер уже отписан

        // ❌ Ловушка отписки: анонимную лямбду невозможно отписать через '-=', так как создаётся новый объект делегата
        // tracker.StatusChanged += (s, e) => Console.WriteLine(e.NewStatus);
        // tracker.StatusChanged -= (s, e) => Console.WriteLine(e.NewStatus); // Не сработает!
    }
}

// 1. Класс аргументов события: наследуется от EventArgs и хранит данные о событии
sealed class OrderStatusEventArgs : EventArgs
{
    public int OrderId { get; }
    public string NewStatus { get; }

    public OrderStatusEventArgs(int orderId, string newStatus)
    {
        OrderId = orderId;
        NewStatus = newStatus;
    }
}

// 2. Класс-издатель: оформляет событие по стандарту EventHandler<TEventArgs>
class OrderTracker
{
    public event EventHandler<OrderStatusEventArgs>? StatusChanged;

    public void ChangeStatus(int orderId, string status)
    {
        Console.WriteLine($"[Трекер]: заказ #{orderId} -> «{status}»");
        OnStatusChanged(new OrderStatusEventArgs(orderId, status));
    }

    // Стандартный защищённый виртуальный метод запуска события (паттерн OnEventName)
    protected virtual void OnStatusChanged(OrderStatusEventArgs e)
    {
        StatusChanged?.Invoke(this, e);
    }
}

// 3. Подписчик: реализует IDisposable для гарантированной отписки от долгоживущего издателя
class AuditLogger : IDisposable
{
    private readonly OrderTracker _tracker;

    public AuditLogger(OrderTracker tracker)
    {
        _tracker = tracker;
        _tracker.StatusChanged += HandleStatusChanged;
    }

    private void HandleStatusChanged(object? sender, OrderStatusEventArgs e)
    {
        Console.WriteLine($"  [Аудит от {sender?.GetType().Name}]: зафиксирован статус «{e.NewStatus}» для #{e.OrderId}");
    }

    public void Dispose()
    {
        _tracker.StatusChanged -= HandleStatusChanged;
    }
}

```

## Важные нюансы

* **Зачем нужны `sender` и наследник `EventArgs`:** параметр `sender` позволяет одному обработчику обслуживать сразу несколько источников (например, десяток кнопок или датчиков), а упаковка данных в класс `TEventArgs` вместо набора отдельных параметров гарантирует обратную совместимость — добавление нового свойства в `OrderStatusEventArgs` не потребует переписывать методы у всех подписчиков.
* **Защищённый виртуальный метод `On...`:** по соглашению .NET запуск события выносят в метод `protected virtual void OnStatusChanged(OrderStatusEventArgs e)`. Это позволяет классам-наследникам переопределить реакцию на событие или дополнить её без необходимости подписываться на собственное событие базового класса.
* **Механизм утечки памяти (*Lapsed Listener Problem*):** когда объект подписывается на событие (`publisher.Event += subscriber.Handler`), издатель сохраняет внутри делегата прямую ссылку на экземпляр подписчика. Если издатель живёт долго (например, глобальный сервис или статический объект), сборщик мусора (*GC*) не сможет удалить подписчика до тех пор, пока тот явно не выполнит отписку `-=` или не завершится работа самого издателя.
* **Связь с теорией и следующей темой:** удержание объектов через скрытые ссылки в делегатах напрямую связано с графом достижимости объектов из раздела *Сборщик мусора (Garbage Collector)*, а в следующей заключительной карточке мы подведём итоги всей группы и разберём, когда выбирать интерфейс, делегат или событие (*Делегаты, лямбды и события*).

