---
title: Стандартные исключения
keywords: стандартные исключения, ArgumentNullException, ArgumentOutOfRangeException, ArgumentException, InvalidOperationException, ThrowIfNull, иерархия Exception, защитники аргументов
---

# Стандартные исключения .NET: выбор правильного типа

Какой встроенный класс исключения выбросить при некорректных аргументах или неверном состоянии объекта и как заменить громоздкие проверки `if` современными методами-защитниками?

Все исключения в .NET наследуются от базового класса `System.Exception`, образуя строгую иерархию стандартных типов под разные причины сбоев. Вместо того чтобы выбрасывать общий `new Exception("Ошибка")`, который невозможно точечно перехватить в `catch`, в C# выбирают специализированный встроенный класс — отдельно для неверных аргументов метода и отдельно для недопустимого состояния самого объекта. В современном .NET стандартные классы исключений также содержат статические методы-защитники (*guard helpers*) вроде `ArgumentNullException.ThrowIfNull()`, которые проверяют данные и формируют сообщение об ошибке в одну строку.

## Основные стандартные исключения в .NET

| Класс исключения | Когда возникает или выбрасывается | Современный защитник или типичный случай |
| --- | --- | --- |
| `ArgumentNullException` | В метод передана ссылка `null`, когда ожидался реальный объект | `ArgumentNullException.ThrowIfNull(order);` |
| `ArgumentOutOfRangeException` | Значение аргумента выходит за допустимые границы (например, отрицательная сумма) | `ArgumentOutOfRangeException.ThrowIfNegativeOrZero(amount);` |
| `ArgumentException` | Аргумент не `null`, но некорректен по содержанию (например, пустая строка) | `ArgumentException.ThrowIfNullOrWhiteSpace(owner);` |
| `InvalidOperationException` | Аргументы корректны, но сам объект сейчас не в том состоянии для выполнения операции | Попытка списать деньги с заблокированного счёта или закрыть уже закрытый заказ |
| `NotSupportedException` | Запрошенная операция в принципе не поддерживается данным объектом или режимом | Попытка записи в поток `Stream`, открытый только для чтения |
| `KeyNotFoundException` / `IndexOutOfRangeException` | Обращение по несуществующему ключу в `Dictionary` или выход за границы массива | `scores["unknown"]` или `numbers[100]` |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        BankAccount account = new BankAccount("Роман", 5000m);

        try
        {
            account.Withdraw(-100m); // Нарушение границ аргумента
        }
        catch (ArgumentException ex)
        {
            // Перехватит ArgumentException, ArgumentNullException и ArgumentOutOfRangeException
            Console.WriteLine($"[Ошибка входных данных] {ex.GetType().Name}: {ex.Message}");
        }

        try
        {
            account.Freeze();
            account.Withdraw(1000m); // Аргумент 1000m корректен, но состояние счёта запрещает операцию
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"[Ошибка состояния] {ex.Message}");
        }
    }
}

class BankAccount
{
    public string Owner { get; }
    public decimal Balance { get; private set; }
    public bool IsFrozen { get; private set; }

    public BankAccount(string owner, decimal initialBalance)
    {
        // Современные методы-защитники (guard helpers): проверяют значение и сами подставляют имя параметра
        ArgumentException.ThrowIfNullOrWhiteSpace(owner);
        ArgumentOutOfRangeException.ThrowIfNegative(initialBalance);

        Owner = owner;
        Balance = initialBalance;
    }

    public void Freeze() => IsFrozen = true;

    public void Withdraw(decimal amount)
    {
        // 1. Сначала проверяем корректность входных аргументов
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(amount);

        // 2. Затем проверяем, позволяет ли текущее состояние объекта выполнить действие
        if (IsFrozen)
            throw new InvalidOperationException("Невозможно снять средства: счёт заморожен.");

        if (amount > Balance)
            throw new InvalidOperationException($"Недостаточно средств (баланс: {Balance} руб.).");

        Balance -= amount;

        // ❌ Плохо: выброс базового Exception не даёт вызывающему коду отличить ошибку ввода от сбоя состояния
        // throw new Exception("Что-то пошло не так");
    }
}

```

## Важные нюансы

* **Иерархия семейства `ArgumentException`:** классы `ArgumentNullException` и `ArgumentOutOfRangeException` наследуются от `ArgumentException`. Поэтому в методе стоит выбрасывать максимально точный тип (например, `ArgumentOutOfRangeException`), а вызывающий код при желании сможет поймать либо его отдельно, либо сразу все ошибки аргументов одним блоком `catch (ArgumentException)`.
* **Не выбрасывайте `NullReferenceException` и базовый `Exception` вручную:** исключение `NullReferenceException` зарезервировано за средой выполнения .NET и сигнализирует о баге внутри самого кода; для проверки входных параметров всегда используйте `ArgumentNullException`. Выброс общего `System.Exception` считается антипаттерном, так как вынуждает внешний код писать слепой `catch (Exception)`.
* **Автоматическая подстановка имени параметра:** в методах вроде `ArgumentNullException.ThrowIfNull(owner)` и `ArgumentOutOfRangeException.ThrowIfNegative(amount)` не нужно вручную указывать `nameof(...)` — благодаря атрибуту `[CallerArgumentExpression]` компилятор сам встроит имя переданной переменной в текст ошибки.
* **Связь со следующей темой:** разделение на ошибки аргументов и ошибки состояния опирается на принцип *проектирования по контракту*, а если встроенных типов .NET недостаточно для передачи деталей предметной области (например, кода ответа API или номера транзакции), создают собственные классы ошибок (см. следующую карточку: *Свои исключения*).

