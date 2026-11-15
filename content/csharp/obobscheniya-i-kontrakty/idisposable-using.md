---
title: IDisposable & using
keywords: интерфейс IDisposable, метод Dispose, конструкция using, освобождение ресурсов, неуправляемые ресурсы, try finally, ObjectDisposedException, ошибка CS1674, сборщик мусора
---

# `IDisposable` и `using`: освобождение ресурсов

Как гарантированно закрыть файл, сетевое соединение или подключение к базе данных сразу после работы, не дожидаясь сборщика мусора и даже при возникновении ошибки?

Сборщик мусора (*Garbage Collector*) автоматически очищает только оперативную память в управляемой куче (*Heap*), но ничего не знает о внешних ресурсах операционной системы: открытых файлах, сокетах, подключениях к БД или дескрипторах графики. Чтобы программа вовремя освобождала такие **неуправляемые ресурсы**, в .NET используют стандартный интерфейс `IDisposable` с единственным методом `Dispose()`. А ключевое слово `using` избавляет от ручного написания блоков `try / finally` — компилятор сам гарантированно вызывает `Dispose()` при выходе из области видимости, даже если внутри выбросилось исключение.

## Способы работы с ресурсами через `IDisposable`

| Способ | Синтаксис | Когда вызывается `Dispose()` | Когда применять |
| --- | --- | --- | --- |
| **Объявление `using**` *(C# 8+)* | `using var file = new FileStream(...);` | В конце текущего блока или метода, в котором объявлена переменная | Основной современный способ — не создаёт лишнюю вложенность скобок |
| **Блок `using**` | `using (var conn = new DbConnection()) { ... }` | Сразу при достижении закрывающей фигурной скобки `}` | Когда ресурс нужно освободить досрочно, задолго до конца длинного метода |
| **Асинхронный `await using**` | `await using var stream = ...;` | При выходе из области видимости для типов с `IAsyncDisposable` | При работе с асинхронными потоками и сетевыми клиентами |
| **Ручной `try / finally**` | `try { ... } finally { res?.Dispose(); }` | В блоке `finally` независимо от успеха или ошибки в `try` | Именно в такой код компилятор разворачивает любой `using` под капотом |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. Блок using: ресурс освободится строго на закрывающей скобке '}'
        using (DatabaseSession quickSession = new DatabaseSession("AnalyticsDB"))
        {
            quickSession.ExecuteQuery("SELECT COUNT(*) FROM Users");
        }
        Console.WriteLine("Код после блока using: соединение уже закрыто.\n");

        // 2. Объявление using (C# 8+): без лишних скобок, освободится в конце метода Main
        RunWithDeclaration();

        // ❌ Ошибка компиляции (CS1674): в using можно передавать только типы с IDisposable
        // using string text = "Обычная строка не требует закрытия";
    }

    static void RunWithDeclaration()
    {
        using DatabaseSession session = new DatabaseSession("OrdersDB");
        session.ExecuteQuery("UPDATE Orders SET Status = 'Paid'");
        Console.WriteLine("Завершаем метод RunWithDeclaration...");
    } // <-- Здесь компилятор автоматически вызовет session.Dispose()
}

// Контракт IDisposable сигнализирует: объект удерживает ресурс и требует явного закрытия
class DatabaseSession : IDisposable
{
    public string DatabaseName { get; }
    private bool _isDisposed;

    public DatabaseSession(string databaseName)
    {
        DatabaseName = databaseName;
        Console.WriteLine($"[Открыто] Подключение к БД «{DatabaseName}» установлено.");
    }

    public void ExecuteQuery(string sql)
    {
        // Защита от обращения к уже закрытому ресурсу
        ObjectDisposedException.ThrowIf(_isDisposed, this);
        Console.WriteLine($"[Запрос в {DatabaseName}]: {sql}");
    }

    // Обязательный метод интерфейса IDisposable для освобождения ресурсов
    public void Dispose()
    {
        if (_isDisposed)
            return;

        _isDisposed = true;
        Console.WriteLine($"[Закрыто] Подключение к БД «{DatabaseName}» освобождено.");
    }
}

```

## Важные нюансы

* **Почему нельзя надеяться на сборщик мусора:** сборщик мусора (*Garbage Collector*) запускается только тогда, когда программе не хватает оперативной памяти. Если не вызвать `Dispose()` у файла или подключения к БД, файл останется заблокированным для других программ, а пул соединений переполнится задолго до следующего запуска сборки мусора.
* **Идемпотентность `Dispose()` и `ObjectDisposedException`:** повторный вызов `Dispose()` не должен приводить к ошибке — метод обязан просто ничего не делать, если ресурс уже освобождён (для этого хранят флаг `_isDisposed`). А при попытке вызвать рабочие методы у закрытого объекта принято выбрасывать исключение `ObjectDisposedException`.
* **Скрытый `using` внутри цикла `foreach`:** обобщённый интерфейс перечислителя `IEnumerator<T>` наследует `IDisposable`. Поэтому каждый цикл `foreach` автоматически оборачивает работу с перечислителем в `try / finally` и вызывает `Dispose()` при завершении или досрочном выходе через `break`, гарантируя освобождение ресурсов внутри генераторов с `yield return`.
* **Связь с теорией и следующей темой:** подробнее о том, как устроены поколения кучи и очистка памяти, рассказано в теоретическом разделе (*Сборщик мусора — Garbage Collector*), а в следующей заключительной карточке мы подведём итоги всей группы (*Обобщения и контракты*).

