---
title: Делегаты, лямбды и события
keywords: делегаты и события, Action и Func, лямбда-выражения, замыкания closures, EventHandler, издатель и подписчик, выбор между интерфейсом и делегатом, утечки памяти C#
---

# Делегаты, лямбды и события: передача поведения

Как передавать алгоритмы как обычные данные, настраивать гибкие обратные вызовы без жёстких зависимостей между классами и выбирать между интерфейсом, делегатом и событием?

Делегаты, лямбда-выражения и события превращают поведение программы в полноценный объект, который можно сохранить в переменную, передать параметром в метод или разослать десяткам подписчиков. Стандартные обобщённые делегаты `Action`, `Func` и `Predicate` избавляют от создания лишних типов, лямбда-выражения (`=>`) и замыкания позволяют описывать логику прямо в месте вызова с доступом к локальному контексту, а модификатор `event` в связке с `EventHandler<TEventArgs>` защищает механизм оповещений от внешнего вмешательства. Вместе эти инструменты формируют фундамент функционального стиля C# и лежат в основе запросов LINQ и асинхронного программирования.

## Сводная карта инструментов группы

| Инструмент | Суть механизма | Когда применять |
| --- | --- | --- |
| **Делегаты (`Action`, `Func`, `Predicate`)** | Типобезопасные ссылки на методы с заданной сигнатурой и поддержкой цепочек (`+=`) | Когда нужно передать один конкретный алгоритм, стратегию или обратный вызов (*callback*) в метод |
| **Лямбда-выражения (`=>`)** | Компактный синтаксис анонимных функций с автоматическим выводом типов параметров | Для записи коротких правил фильтрации, преобразования и реакций прямо в точке вызова |
| **Замыкания (*Closures*)** | Захват локальных переменных из внешнего метода с переносом их жизни в кучу (*Heap*) | Когда анонимной функции нужен доступ к внешним параметрам или накопление состояния между вызовами |
| **События (`event`, `EventHandler<T>`)** | Защищённая обёртка над многоадресным делегатом (паттерн «издатель — подписчик») | Когда объект должен уведомлять неограниченное число независимых слушателей о смене своего состояния |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        decimal freeDeliveryLimit = 1500m;

        // 1. Func + лямбда с замыканием: анонимная функция захватывает локальную переменную freeDeliveryLimit
        Func<decimal, bool> isFreeDelivery = total => total >= freeDeliveryLimit;

        // 2. Action + static-лямбда: передаём способ логирования без лишних выделений памяти в куче
        Action<string> logger = static text => Console.WriteLine($"[Лог кассы]: {text}");

        CheckoutService checkout = new CheckoutService(isFreeDelivery, logger);

        // 3. Событие (event): подключаем независимого подписчика с автоматической отпиской в Dispose()
        using (ReceiptNotifier notifier = new ReceiptNotifier(checkout))
        {
            checkout.CompletePayment(orderId: 805, amount: 2400m);
        }

        // ❌ Архитектурная ошибка: не делайте события с возвращаемым значением (Func)
        // public event Func<decimal, bool>? CheckLimit; // При нескольких подписчиках вернётся ответ только последнего
    }
}

sealed class PaymentCompletedEventArgs : EventArgs
{
    public int OrderId { get; }
    public decimal Amount { get; }
    public bool FreeDelivery { get; }

    public PaymentCompletedEventArgs(int orderId, decimal amount, bool freeDelivery) =>
        (OrderId, Amount, FreeDelivery) = (orderId, amount, freeDelivery);
}

class CheckoutService
{
    private readonly Func<decimal, bool> _deliveryRule;
    private readonly Action<string> _log;

    // Событие для широковещательного уведомления всех заинтересованных модулей
    public event EventHandler<PaymentCompletedEventArgs>? PaymentCompleted;

    public CheckoutService(Func<decimal, bool> deliveryRule, Action<string> log)
    {
        _deliveryRule = deliveryRule;
        _log = log;
    }

    public void CompletePayment(int orderId, decimal amount)
    {
        bool freeDelivery = _deliveryRule(amount);
        _log($"Заказ #{orderId} на сумму {amount} руб. оплачен (бесплатная доставка: {freeDelivery}).");

        // Безопасный вызов события разрешён только внутри самого класса-издателя
        PaymentCompleted?.Invoke(this, new PaymentCompletedEventArgs(orderId, amount, freeDelivery));
    }
}

class ReceiptNotifier : IDisposable
{
    private readonly CheckoutService _service;

    public ReceiptNotifier(CheckoutService service)
    {
        _service = service;
        _service.PaymentCompleted += OnPaymentCompleted;
    }

    private void OnPaymentCompleted(object? sender, PaymentCompletedEventArgs e) =>
        Console.WriteLine($"  [Чек отправлен]: заказ #{e.OrderId}, сумма {e.Amount} руб.");

    // Обязательная отписка защищает объект от утечки памяти (Lapsed Listener)
    public void Dispose() => _service.PaymentCompleted -= OnPaymentCompleted;
}

```

## Важные нюансы

* **Как выбрать между интерфейсом, делегатом и событием:** одиночный алгоритм с возвратом результата передавайте через `Func<...>` или `Action<...>`; уведомления «один ко многим», где издатель не ждёт ответа от слушателей, оформляйте через `event EventHandler<TEventArgs>`; а когда контракту нужен набор из нескольких взаимосвязанных методов или критична работа без лишних аллокаций в куче — выбирайте интерфейс.
* **Скрытая цена замыканий и забытых отписок:** замыкания выносят захваченные локальные переменные в скрытый класс в управляемой куче (*Heap*), а подписка на событие (`+=`) удерживает жёсткую ссылку на объект подписчика. В критичных к памяти циклах используйте `static`-лямбды, а при подписке на долгоживущие сервисы всегда отписывайтесь через `-=` в методе `Dispose()`.
* **Порядок и надёжность вызова подписчиков:** при срабатывании события обработчики запускаются строго в порядке подписки, но необработанное исключение в одном из них прервёт цепочку для всех остальных. Если издатель обязан уведомить каждого слушателя независимо от чужих сбоев, цепочку обходят поштучно через `GetInvocationList()`.
* **Что дальше:** связка обобщений `<T>`, последовательностей `IEnumerable<T>` и лямбда-выражений (`Func<T, bool>`, `Func<T, TResult>`) напрямую приводит нас к главному инструменту декларативной обработки данных в C# (см. следующую группу: *LINQ — запросы к коллекциям*).

