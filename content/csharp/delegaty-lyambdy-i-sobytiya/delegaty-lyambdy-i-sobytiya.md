---
title: Делегаты, лямбды и события
keywords: делегаты и события, Action и Func, лямбда-выражения, замыкания closures, EventHandler, издатель и подписчик, выбор между интерфейсом и делегатом, утечки памяти C#
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
    .btn-press { transform-box: fill-box; transform-origin: center bottom; animation: press 4s ease-in-out infinite; }
    .bell-swing { transform-box: fill-box; transform-origin: top center; animation: ring 4s ease-in-out infinite; }
    .wire { stroke-dasharray: 5 8; animation: flow 1.4s linear infinite; }
    @keyframes press {
      0%, 16%, 60%, 100% { transform: translateY(0px); }
      30%, 44% { transform: translateY(3px); }
    }
    @keyframes ring {
      0%, 55%, 100% { transform: rotate(0deg); }
      66%, 84% { transform: rotate(7deg); }
    }
    @keyframes flow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -13; } }
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

  <g transform="translate(300, 158)">
    <rect x="-50" y="-92" width="100" height="184" rx="18" class="c-white s-dark" stroke-width="2.5" />
    <circle cx="0" cy="-52" r="13" class="c-dark s-white" stroke-width="2" />
    <circle cx="0" cy="-52" r="5.5" class="c-accent" />
    <g class="btn-press">
      <circle cx="0" cy="-6" r="13" class="c-dark s-white" stroke-width="2" />
      <circle cx="0" cy="-6" r="5.5" class="c-accent" />
    </g>
    <circle cx="0" cy="40" r="13" class="c-dark s-white" stroke-width="2" />
    <circle cx="0" cy="40" r="5.5" class="c-accent" />
  </g>
  <g transform="translate(300, 44)">
    <rect x="-37" y="-13" width="74" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">delegate</text>
  </g>

  <path d="M 352 106 C 430 100 510 96 588 120" class="s-white wire" stroke-width="2.5" fill="none" opacity="0.85" />
  <path d="M 352 152 C 430 150 510 146 588 150" class="s-white wire" stroke-width="2.5" fill="none" opacity="0.85" />
  <path d="M 352 198 C 430 196 510 184 588 172" class="s-white wire" stroke-width="2.5" fill="none" opacity="0.85" />

  <g transform="translate(620, 150)">
    <rect x="-12" y="-72" width="24" height="30" rx="6" class="c-dark s-white" stroke-width="2" />
    <g class="bell-swing">
      <path d="M -38 24 C -38 -10 -22 -42 0 -42 C 22 -42 38 -10 38 24 Z" class="c-white s-dark" stroke-width="2.5" stroke-linejoin="round" />
      <line x1="-40" y1="24" x2="40" y2="24" class="s-dark" stroke-width="3" stroke-linecap="round" />
      <circle cx="0" cy="34" r="6" class="c-accent s-dark" stroke-width="1.6" />
      <circle cx="0" cy="-24" r="3" class="c-accent" />
    </g>
  </g>
  <g transform="translate(620, 236)">
    <rect x="-29" y="-13" width="58" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">event</text>
  </g>
  </svg>
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

## Куда дальше

* [Делегаты](https://learn.microsoft.com/dotnet/csharp/programming-guide/delegates/) — объявление, `Action`/`Func` и многоадресные делегаты.
* [События](https://learn.microsoft.com/dotnet/csharp/programming-guide/events/) — схема «издатель — подписчик» и стандартный `EventHandler`.
