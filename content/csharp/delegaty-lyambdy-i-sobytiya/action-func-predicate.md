---
title: Action, Func, Predicate
keywords: стандартные делегаты, Action, Func, Predicate, обобщённые делегаты, передача методов, ошибка CS0029, функциональный стиль C#
---

# `Action`, `Func` и `Predicate`: стандартные делегаты

Как передавать методы и проверки в качестве параметров без объявления десятков однотипных типов `delegate` вручную?

В современном C# объявлять собственный тип `delegate` приходится редко — в пространстве имён `System` уже есть готовые обобщённые шаблоны на все случаи жизни. Семейство `Action` описывает методы, которые выполняют действие и ничего не возвращают (`void`), семейство `Func` — методы с возвращаемым результатом, а `Predicate<T>` предназначен для логических проверок, возвращающих `bool`. Использование этих стандартных делегатов делает код короче и позволяет разным библиотекам легко стыковаться друг с другом.

## Сравнение стандартных делегатов .NET

| Делегат | Сигнатура и возврат | Типичное применение |
| --- | --- | --- |
| `Action` / `Action<T1, ...>` | Принимает от 0 до 16 аргументов, возвращает `void` | Побочные действия: вывод на экран, запись в лог, `List<T>.ForEach()` |
| `Func<..., TResult>` | Принимает от 0 до 16 аргументов, возвращает `TResult` | Вычисления, преобразования данных и все методы запросов LINQ |
| `Predicate<T>` | Принимает 1 аргумент типа `T`, всегда возвращает `bool` | Условия поиска и удаления в методах `List<T>.Find()`, `Exists()`, `RemoveAll()` |

## Пример кода

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<int> scores = new List<int> { 45, 82, 95, 30, 74 };

        // 1. Predicate<T>: метод проверки (принимает int, возвращает bool)
        Predicate<int> passingRule = IsPassingScore;
        List<int> passedScores = scores.FindAll(passingRule);

        // 2. Func<T, TResult>: метод преобразования (принимает int, возвращает double)
        Func<int, double> bonusFormula = AddBonusPercent;

        // 3. Action<T>: процедура без возвращаемого значения (принимает string, возвращает void)
        Action<string> logger = PrintToConsole;

        ProcessResults(passedScores, bonusFormula, logger);

        // ❌ Ошибка компиляции (CS0029): хотя сигнатуры совпадают, Predicate<int> и Func<int, bool> — разные типы
        // Func<int, bool> broken = passingRule;
    }

    static void ProcessResults(
        List<int> items,
        Func<int, double> transformer,
        Action<string> reportAction)
    {
        foreach (int rawScore in items)
        {
            double finalScore = transformer(rawScore);
            reportAction($"Исходный балл: {rawScore} -> Итоговый с бонусом: {finalScore:F1}");
        }
    }

    static bool IsPassingScore(int score) => score >= 60;
    static double AddBonusPercent(int score) => score * 1.1;
    static void PrintToConsole(string message) => Console.WriteLine(message);
}

```

## Важные нюансы

* **Последний параметр `Func` — всегда тип результата:** в записи `Func<string, int, bool>` первые два типа (`string` и `int`) описывают входные параметры метода, а самый последний (`bool`) — возвращаемое значение. Если метод не принимает аргументов, указывают только один тип: например, `Func<DateTime>` для метода, возвращающего текущую дату.
* **Разница между `Predicate<T>` и `Func<T, bool>`:** хотя оба делегата принимают один аргумент `T` и возвращают `bool`, для компилятора это несовместимые типы. Переменную типа `Predicate<int>` нельзя напрямую присвоить в `Func<int, bool>` (возникнет ошибка `CS0029`). В современной разработке и во всём LINQ повсеместно используют `Func<T, bool>`, а `Predicate<T>` остаётся в основном для встроенных методов класса `List<T>`.
* **Встроенная вариантность (`in` и `out`):** все входные параметры в `Action` и `Func` помечены модификатором контравариантности `in`, а возвращаемый тип `TResult` в `Func` — модификатором ковариантности `out`. Благодаря этому `Func<Dog>` можно безопасно передать туда, где ожидается `Func<Animal>`.
* **Связь с теорией и следующей темой:** стандартные делегаты избавляют от создания лишних однометодных интерфейсов при реализации паттерна *Стратегия*, а записывать короткие функции прямо в месте вызова без объявления отдельных методов позволяют анонимные функции (см. следующую карточку: *Лямбда-выражения `=>*`).

