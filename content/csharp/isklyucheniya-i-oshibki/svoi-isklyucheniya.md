---
title: Свои исключения
keywords: свои исключения, пользовательские исключения, наследование от Exception, InnerException, бизнес-ошибки, ApplicationException, конструктор исключения, обработка ошибок
---

# Свои исключения: ошибки предметной области

Как описать специфический сбой бизнес-логики — например, нехватку средств или превышение лимита запросов — и передать в блок `catch` дополнительные данные об ошибке?

Когда встроенных классов .NET вроде `InvalidOperationException` или `ArgumentException` не хватает, чтобы отличить одну бизнес-ошибку от другой, создают **собственные классы исключений**, наследуясь от базового `System.Exception`. Пользовательское исключение позволяет вызывающему коду точечно перехватывать конкретную проблему предметной области и хранить внутри объекта ошибки полезный контекст: код статуса, идентификатор заказа или текущий остаток на счёте.

## Обязательные элементы собственного класса исключения

| Элемент класса | Сигнатура / объявление | Зачем нужен |
| --- | --- | --- |
| **Наследование и суффикс** | `class OrderException : Exception` | Встраивает класс в иерархию ошибок .NET; по соглашению имя всегда оканчивается на `Exception` |
| **Базовый конструктор** | `public OrderException(string message) : base(message)` | Передаёт понятное текстовое описание ошибки в свойство `Message` |
| **Конструктор обёртки** | `public OrderException(string message, Exception inner) : base(message, inner)` | Сохраняет исходную техническую ошибку в `InnerException` при оборачивании |
| **Свойства контекста** | `public decimal Deficit { get; }` | Передаёт в блок `catch` и фильтры `when` конкретные данные для обработки или лога |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        Wallet wallet = new Wallet(balance: 1200m);

        try
        {
            wallet.Pay(orderAmount: 2000m);
        }
        catch (InsufficientFundsException ex)
        {
            // В блоке catch доступны не только Message, но и наши собственные свойства контекста
            Console.WriteLine($"Ошибка оплаты: {ex.Message}");
            Console.WriteLine($"Баланс: {ex.CurrentBalance} руб. | Не хватает: {ex.Shortage} руб.");
        }

        // ❌ Устаревшая практика: не наследуйтесь от ApplicationException — наследуйтесь напрямую от Exception
        // class LegacyException : ApplicationException { }
    }
}

class Wallet
{
    public decimal Balance { get; private set; }

    public Wallet(decimal balance) => Balance = balance;

    public void Pay(decimal orderAmount)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(orderAmount);

        if (orderAmount > Balance)
        {
            throw new InsufficientFundsException(
                message: "Недостаточно средств на кошельке для оплаты заказа.",
                currentBalance: Balance,
                requiredAmount: orderAmount);
        }

        Balance -= orderAmount;
    }
}

// Пользовательский класс исключения: наследуется от Exception и хранит детали сбоя
class InsufficientFundsException : Exception
{
    public decimal CurrentBalance { get; }
    public decimal RequiredAmount { get; }
    public decimal Shortage => RequiredAmount - CurrentBalance;

    public InsufficientFundsException(string message, decimal currentBalance, decimal requiredAmount)
        : base(message)
    {
        CurrentBalance = currentBalance;
        RequiredAmount = requiredAmount;
    }

    // Перегрузка с innerException на случай, если ошибка возникла поверх низкоуровневого сбоя
    public InsufficientFundsException(
        string message,
        decimal currentBalance,
        decimal requiredAmount,
        Exception innerException)
        : base(message, innerException)
    {
        CurrentBalance = currentBalance;
        RequiredAmount = requiredAmount;
    }
}

```

## Важные нюансы

* **Наследуйтесь от `Exception`, а не от `ApplicationException`:** в ранних версиях .NET рекомендовали разделять системные ошибки и ошибки приложений через `ApplicationException`, но эта идея не прижилась и сама Microsoft официально признала её неудачной. Всегда наследуйте свои классы напрямую от `System.Exception`.
* **Поддерживайте цепочку `InnerException`:** даже если вы добавляете в конструктор свои бизнес-параметры (например, код ошибки или баланс), предусмотрите перегрузку конструктора, принимающую `Exception innerException`. Это позволит оборачивать низкоуровневые сбои БД или сети без потери первопричины.
* **Не создавайте лишние классы без необходимости:** заводите собственное исключение только тогда, когда вызывающий код действительно будет обрабатывать его *иначе*, чем стандартные ошибки (например, предложит пополнить баланс или повторит запрос). Если сбой всё равно просто уйдёт в общий лог, достаточно стандартного `InvalidOperationException`.
* **Связь с соседними темами:** собственные исключения удобно комбинировать с фильтрами из карточки *Фильтры `when`* для ветвления по пользовательским свойствам, а в следующей карточке разберём, как читать полную цепочку вызовов при падении программы (*StackTrace и отладка*).

