---
title: Исключения и ошибки
keywords: обработка исключений, try catch finally, оператор throw, фильтры when, StackTrace, паттерн TryParse, производительность исключений, антипаттерны C#
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
    .ball { transform-box: fill-box; transform-origin: center; animation: fall 4s ease-in infinite; }
    .net { transform-box: fill-box; transform-origin: center top; animation: flex 4s ease-in-out infinite; }
    .spark { transform-box: fill-box; transform-origin: center; animation: sparkPulse 4s ease-in-out infinite; }
    @keyframes fall {
      0% { transform: translateY(0px); opacity: 0; }
      10% { opacity: 1; }
      52% { transform: translateY(62px); opacity: 1; }
      64% { transform: translateY(56px); opacity: 1; }
      78% { transform: translateY(62px); opacity: 1; }
      92%, 100% { transform: translateY(62px); opacity: 0; }
    }
    @keyframes flex {
      0%, 46%, 100% { transform: translateY(0px); }
      54%, 66% { transform: translateY(5px); }
      74% { transform: translateY(2px); }
    }
    @keyframes sparkPulse {
      0%, 40%, 100% { opacity: 0.2; }
      56%, 70% { opacity: 1; }
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

  <g transform="translate(300, 90)">
    <rect x="-6" y="0" width="12" height="124" rx="5" class="c-white s-dark" stroke-width="2.2" />
    <ellipse cx="0" cy="124" rx="18" ry="5" class="c-white s-dark" stroke-width="2" />
  </g>
  <g transform="translate(660, 90)">
    <rect x="-6" y="0" width="12" height="124" rx="5" class="c-white s-dark" stroke-width="2.2" />
    <ellipse cx="0" cy="124" rx="18" ry="5" class="c-white s-dark" stroke-width="2" />
  </g>

  <g class="net">
    <path d="M 330 152 Q 480 162 630 152" class="s-white" stroke-width="3" fill="none" />
    <path d="M 370 202 Q 480 212 590 202" class="s-white" stroke-width="3" fill="none" />
    <path d="M 330 152 L 370 202" class="s-white" stroke-width="2" fill="none" opacity="0.8" />
    <path d="M 630 152 L 590 202" class="s-white" stroke-width="2" fill="none" opacity="0.8" />
    <path d="M 390 154 L 420 203" class="s-white" stroke-width="2" fill="none" opacity="0.65" />
    <path d="M 450 156 L 465 205" class="s-white" stroke-width="2" fill="none" opacity="0.65" />
    <path d="M 510 156 L 495 205" class="s-white" stroke-width="2" fill="none" opacity="0.65" />
    <path d="M 570 154 L 540 203" class="s-white" stroke-width="2" fill="none" opacity="0.65" />
    <path d="M 355 177 Q 480 190 605 177" class="s-white" stroke-width="2" fill="none" opacity="0.55" />
  </g>

  <g class="ball">
    <circle cx="480" cy="120" r="13" class="c-white s-dark" stroke-width="2.2" />
    <text x="480" y="126" text-anchor="middle" class="c-dark mono" font-size="16" font-weight="700">!</text>
  </g>

  <g transform="translate(720, 108)">
    <g class="spark">
      <line x1="0" y1="0" x2="14" y2="-12" class="s-white" stroke-width="2.5" stroke-linecap="round" />
      <line x1="8" y1="9" x2="24" y2="8" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
      <circle cx="18" cy="-2" r="3" class="c-white" />
    </g>
  </g>

  <g transform="translate(300, 64)">
    <rect x="-25" y="-13" width="50" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">try</text>
  </g>
  <g transform="translate(480, 246)">
    <rect x="-32" y="-13" width="64" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">catch</text>
  </g>
  </svg>
---

# Исключения и ошибки: стратегия надёжного кода

Как выстроить единую систему обработки сбоев в приложении, отличить по-настоящему исключительную ситуацию от штатной проверки и не замедлить программу частым выбросом исключений?

Исключения в C# предназначены для сигнализации об аварийных и непредвиденных сбоях, когда метод не может выполнить свой контракт — например, при обрыве сети, отсутствии файла или нарушении инвариантов объекта. Конструкция `try / catch / finally`, оператор `throw;` и фильтры `when` позволяют безопасно перехватывать и оборачивать ошибки без потери трассировки стека (`StackTrace`), а стандартные и пользовательские классы исключений точно описывают причину проблемы. Однако выброс исключения — дорогая для процессора операция, поэтому для штатных и ожидаемых сценариев (ошибок пользовательского ввода или поиска отсутствующего ключа) в .NET используют паттерн `Try...` или возврат объекта результата `Result<T>`.

## Сводная карта инструментов группы

| Инструмент | Суть механизма | Когда применять |
| --- | --- | --- |
| **`try / catch / finally`** | Перехват ошибок от частного к общему и гарантированная очистка в `finally` | На границах приложения или при работе с внешними ресурсами, где сбой можно обработать |
| **`throw;` и `InnerException`** | Повторный проброс с сохранением `StackTrace` и обёртка низкоуровневых сбоев | Когда нужно залогировать ошибку или перевести технический сбой в бизнес-исключение |
| **Фильтры `when`** | Условный перехват по свойствам ошибки или логирование без раскрутки стека | Когда один тип исключения нужно обработать по-разному (например, по коду ответа) |
| **Стандартные и свои исключения** | Типы `ArgumentException`, `InvalidOperationException` и наследники `Exception` | Для чёткого разделения ошибок входных параметров, неверного состояния и бизнес-правил |
| **Паттерн `Try...` / `Result<T>`** | Возврат `bool` с `out`-параметром или структуры результата вместо выброса исключения | Для частых и ожидаемых сценариев: парсинг ввода, валидация форм, поиск по ключу |

## Пример кода

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        OrderProcessor processor = new OrderProcessor();

        // 1. Ожидаемая ошибка ввода: обрабатываем через паттерн Try... без дорогого выброса исключений
        if (!processor.TryParseQuantity("abc", out int quantity))
        {
            Console.WriteLine("Штатная проверка: некорректное количество товара, просим повторить ввод.");
        }

        // 2. Аварийный сбой инфраструктуры: перехватываем исключение, учитывая условие when
        try
        {
            processor.SubmitOrder(orderId: 502, quantity: 3);
        }
        catch (OrderProcessingException ex) when (ex.IsTransient)
        {
            Console.WriteLine($"Временный сбой ({ex.Message}) — можно повторить запрос позже.");
            Console.WriteLine($"Первопричина: {ex.GetBaseException().Message}");
        }
        catch (Exception ex)
        {
            // Всегда логируем полный ex.ToString() со всем StackTrace, а не только ex.Message
            Console.WriteLine($"Критическая ошибка:\n{ex}");
        }
    }
}

class OrderProcessor
{
    // ✅ ПРАВИЛЬНО для штатных проверок: быстрый возврат bool без раскрутки стека
    public bool TryParseQuantity(string? rawInput, out int quantity)
    {
        return int.TryParse(rawInput, out quantity) && quantity > 0;
    }

    // ✅ ПРАВИЛЬНО для нарушения контракта и сбоев внешних систем: выброс исключений
    public void SubmitOrder(int orderId, int quantity)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(quantity);

        try
        {
            SaveToRemoteDatabase(orderId, quantity);
        }
        catch (TimeoutException ex)
        {
            // Оборачиваем технический сбой в своё исключение, сохраняя первопричину в InnerException
            throw new OrderProcessingException(
                $"Сервер заказов временно недоступен (заказ #{orderId}).",
                isTransient: true,
                innerException: ex);
        }
    }

    private void SaveToRemoteDatabase(int orderId, int quantity)
    {
        throw new TimeoutException("Тайм-аут подключения к БД.");
    }

    // ❌ АНТИПАТТЕРН: использовать try/catch вместо обычной проверки наличия ключа в словаре
    public int GetPriceSlow(Dictionary<string, int> prices, string item)
    {
        try { return prices[item]; }
        catch (KeyNotFoundException) { return 0; } // В сотни раз медленнее, чем prices.TryGetValue(...)
    }
}

class OrderProcessingException : Exception
{
    public bool IsTransient { get; }

    public OrderProcessingException(string message, bool isTransient, Exception innerException)
        : base(message, innerException)
    {
        IsTransient = isTransient;
    }
}

```

## Важные нюансы

* **Цена выброса исключений для производительности:** пока ошибка не возникла, сам блок `try` практически не замедляет программу. Но в момент выполнения `throw` среда .NET приостанавливает поток, собирает полную трассировку стека (`StackTrace`) и раскручивает кадры вызовов — это в сотни раз медленнее обычного `return false`. Никогда не используйте исключения для управления обычной логикой программы (*Exceptions for Control Flow*).
* **Правило выбора между исключением и паттерном `Try...` / `Result<T>`:** если неудача — нормальный рабочий сценарий (пользователь опечатался в числе, логин занят, ключа нет в словаре), возвращайте `bool` (как в `int.TryParse` и `Dictionary.TryGetValue`) или структуру `Result<T>`. Исключения оставляйте для ситуаций, которые нарушают договорённости кода: недоступна база данных, повреждён файл или в метод передан `null`.
* **Три главных антипаттерна при работе с ошибками:** избегайте пустого блока `catch { }`, который молча скрывает баги; конструкции `throw ex;`, перезаписывающей реальный `StackTrace` (всегда пишите пустой `throw;`); и логирования одного только `ex.Message` вместо полного `ex.ToString()` с вложенными `InnerException`.
* **Что дальше:** освоив защиту кода от сбоев, мы завершили разбор базовых конструкций языка и готовы перейти к функциональному стилю C# — передаче методов как параметров и декларативной обработке коллекций (см. следующую группу: *Делегаты, лямбда-выражения и LINQ*).

## Куда дальше

* [Исключения (руководство)](https://learn.microsoft.com/dotnet/csharp/fundamentals/exceptions/) — `try / catch / finally` и создание своих исключений.
* [Рекомендации по обработке исключений](https://learn.microsoft.com/dotnet/standard/exceptions/best-practices-for-exceptions) — когда ловить ошибку, а когда пробрасывать.
