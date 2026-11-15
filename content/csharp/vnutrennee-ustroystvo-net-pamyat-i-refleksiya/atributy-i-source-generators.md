---
title: Атрибуты и Source Generators
keywords: атрибуты C#, AttributeUsage, пользовательские атрибуты, UnsafeAccessor, Source Generators, IIncrementalGenerator, метапрограммирование .NET, Native AOT
---

# Атрибуты, [UnsafeAccessor] и Source Generators

Как добавлять собственные декларативные метаданные к классам, обращаться к закрытым полям без накладных расходов рефлексии и переносить генерацию кода на этап компиляции?

Пользовательские **атрибуты** (наследники `System.Attribute`) позволяют прикреплять к классам, свойствам и методам декларативные метаданные, которые сохраняются внутри сборки и считываются в рантайме или во время компиляции. Чтобы избавиться от медленной рефлексии при доступе к инкапсулированным данным, в .NET 8 появился атрибут `[UnsafeAccessor]` — он заставляет компилятор напрямую связывать `static extern`-заглушки с закрытыми полями и методами целевого типа на нативной скорости и с поддержкой Native AOT. Для ещё более масштабных задач (сериализации, маппинга, регистрации зависимостей) применяют **Source Generators** (`IIncrementalGenerator`) — плагины компилятора Roslyn, которые анализируют атрибуты прямо во время сборки и дописывают готовый C#-код в проект.

## Основные инструменты метапрограммирования

| Инструмент / конструкция | Синтаксис / пример | Назначение и особенности |
| --- | --- | --- |
| **Пользовательский `[Attribute]`** | `[AttributeUsage(AttributeTargets.Property)]` | Создаёт декларативную метку с константными параметрами для разметки типов и их членов |
| **`GetCustomAttribute<T>()`** | `var attr = prop.GetCustomAttribute<CsvColumnAttribute>();` | Извлекает экземпляр атрибута из метаданных члена класса в рантайме через рефлексию |
| **`[UnsafeAccessor]`** *(NET 8+)* | `[UnsafeAccessor(UnsafeAccessorKind.Field, Name = "_id")]` | Открывает прямой zero-allocation доступ к `private`-полям (через `ref`), методам и конструкторам |
| **`Source Generators`** *(Roslyn)* | `IIncrementalGenerator` + `partial` классы/методы | Генерирует новые `.cs`-файлы во время компиляции на основе синтаксиса и атрибутов проекта |

## Пример кода

```csharp
using System;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;

class Program
{
    static void Main()
    {
        PaymentRecord payment = new PaymentRecord
        {
            TransactionId = "TX-9042",
            Amount = 4990.50m
        };

        // 1. Чтение пользовательских атрибутов свойств для динамического форматирования
        var columns = typeof(PaymentRecord)
            .GetProperties()
            .Select(p => (Prop: p, Attr: p.GetCustomAttribute<CsvColumnAttribute>()))
            .Where(x => x.Attr is not null)
            .OrderBy(x => x.Attr!.Order);

        Console.WriteLine("Экспорт по метаданным атрибутов:");
        foreach (var (prop, attr) in columns)
        {
            Console.WriteLine($"  [{attr!.Order}] {attr.Header}: {prop.GetValue(payment)}");
        }

        // 2. [UnsafeAccessor] (.NET 8+): прямой доступ к private-полю и private-методу БЕЗ рефлексии!
        // Работает на нативной скорости, без упаковки (boxing) и полностью совместим с Native AOT
        ref string secretHash = ref PaymentAccessors.AccessAuditHash(payment);
        Console.WriteLine($"\nЗакрытый хэш до изменения: {secretHash}");

        secretHash = "SHA256:VERIFIED"; // Изменяем private-поле напрямую по ссылке!
        PaymentAccessors.CallRecalculateHash(payment, "2026");

        Console.WriteLine($"Закрытый хэш после вызова private-метода: {PaymentAccessors.AccessAuditHash(payment)}");

        // ❌ Ошибка компиляции (CS0182): в конструктор атрибута можно передавать ТОЛЬКО константы
        // (примитивы, string, Type, enum, массивы констант) — вызовы вроде DateTime.Now запрещены!

        // ❌ Антипаттерн: вызов GetCustomAttribute<T>() в горячем цикле на каждый запрос
        // В современном .NET такие задачи переносят на этап компиляции через Source Generators (как [GeneratedRegex])
    }
}

// 1. Определение собственного атрибута с ограничением области применения через [AttributeUsage]
[AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
public sealed class CsvColumnAttribute : Attribute
{
    public string Header { get; }
    public int Order { get; set; }

    public CsvColumnAttribute(string header) => Header = header;
}

public class PaymentRecord
{
    // Закрытые члены, недоступные извне обычным кодом
    private string _auditHash = "SHA256:INIT";

    [CsvColumn("Код операции", Order = 1)]
    public string TransactionId { get; init; } = "";

    [CsvColumn("Сумма (руб.)", Order = 2)]
    public decimal Amount { get; init; }

    private void RecalculateHash(string salt)
    {
        _auditHash = $"{_auditHash}_{TransactionId}_{salt}";
    }
}

// 2. Объявление аксессоров для закрытых членов класса PaymentRecord
internal static class PaymentAccessors
{
    // Возврат по ссылке (ref string) позволяет как читать, так и перезаписывать закрытое поле
    [UnsafeAccessor(UnsafeAccessorKind.Field, Name = "_auditHash")]
    public static extern ref string AccessAuditHash(PaymentRecord target);

    // Прямой вызов закрытого метода без MethodInfo.Invoke и массива object[]
    [UnsafeAccessor(UnsafeAccessorKind.Method, Name = "RecalculateHash")]
    public static extern void CallRecalculateHash(PaymentRecord target, string salt);
}

```

## Важные нюансы

* **Ограничения конструкторов атрибутов и `[AttributeUsage]`:** аргументы атрибута вычисляются компилятором и записываются в бинарные метаданные сборки, поэтому в конструктор `Attribute` разрешается передавать только константы времени компиляции (числа, `bool`, `string`, `Type`, `enum` и одномерные массивы таких типов). С помощью `[AttributeUsage]` всегда явно указывайте допустимые цели (`Class`, `Property`, `Method`) и флаг `AllowMultiple`, чтобы компилятор сразу подсвечивал ошибочное размещение атрибута.
* **Как устроен `[UnsafeAccessor]` (.NET 8+) и когда его применять:** атрибут `[UnsafeAccessor]` помечает заглушку `static extern`, а JIT-компилятор (или компилятор Native AOT) напрямую подставляет вызов или смещение поля в памяти без проверок видимости в рантайме и упаковки значимых типов. Поскольку возврат `ref` позволяет перезаписать даже `private readonly` поле, использовать этот механизм стоит строго в низкоуровневом инфраструктурном коде (сериализаторах, ORM, модульных тестах), а не для обхода инкапсуляции в бизнес-логике.
* **Инкрементальные генераторы исходного кода (`IIncrementalGenerator`):** вместо сканирования сборок в рантайме современный .NET (включая `[GeneratedRegex]`, `[LoggerMessage]` и `System.Text.Json`) опирается на генераторы Roslyn. Генератор запускается во время компиляции проекта, находит классы с нужными атрибутами через синтаксическое дерево и дописывает новые `.cs`-файлы (обычно реализуя `partial`-методы или классы). Такой подход полностью избавляет от задержек при старте приложения и лишних аллокаций.
* **Связь со следующей темой:** связка «пользовательский атрибут + Source Generator» превращает декларативные метки в высокопроизводительный статический код без недостатков классической рефлексии (см. предыдущую карточку *Рефлексия `Reflection` и метаданные*). В следующей карточке мы разберём ещё один способ анализа и генерации логики на лету — представление C#-кода в виде структуры данных (*`Expression Trees` — деревья выражений*).

