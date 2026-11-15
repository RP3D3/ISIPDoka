---
title: Рантайм, память и метапрограммирование
keywords: рантайм .NET, сборщик мусора GC, ArrayPool и Span, рефлексия Reflection, UnsafeAccessor, Source Generators, Expression Trees, Native AOT, карта языка C#
---

# Рантайм, память и метапрограммирование: полная карта C#

Как находить баланс между предельной скоростью без аллокаций и гибкостью динамического кода, когда отказываться от рефлексии в пользу генераторов компиляции и как устроена полная карта языка C#?

Работа «под капотом» среды выполнения CLR сводится к управлению двумя ресурсами: памятью и метаданными типов. Чтобы не перегружать сборщик мусора (`GC`) и не провоцировать фрагментацию кучи больших объектов (`LOH`), высоконагруженный код опирается на стековые буферы (`stackalloc`, `Span<T>`), аренду массивов (`ArrayPool<T>`) и структуры `Memory<T>`, прибегая к `unsafe`-указателям и нативным вызовам (`[LibraryImport]`) лишь на стыке с системными библиотеками C/C++. В метапрограммировании современный .NET сместил фокус с медленной рантайм-рефлексии (`Type`, `Activator`) и динамической компиляции деревьев выражений (`Expression<T>`) в сторону инструментов времени компиляции — генераторов исходного кода (`Source Generators`) и прямых аксессоров `[UnsafeAccessor]`, полностью совместимых с Native AOT.

## Сводная карта инструментов группы

| Категория и инструменты | Суть механизма | Когда применять |
| --- | --- | --- |
| **Управление кучей и GC** (`GC`, поколения Gen 0–2, `LOH`, `WeakReference<T>`) | Автоматическая очистка достижимых объектов с уплотнением памяти и выделением буферов $\ge 85\,000$ байт в LOH | Для контроля жизненного цикла кэшей (`WeakReference`) и диагностики потребления ОЗУ без ручного `GC.Collect()` |
| **Буферы без аллокаций** (`Span<T>`, `Memory<T>`, `ArrayPool<T>`, `stackalloc`) | Стековые срезы без копирования, асинхронные обёртки буферов и аренда многоразовых массивов из пула | `stackalloc` — для буферов $\le 1$ КБ; `ArrayPool<T>` — для крупных временных массивов; `Memory<T>` — для `async`-методов |
| **Рантайм-рефлексия** (`Type`, `Activator`, `PropertyInfo`, `MethodInfo`) | Исследование метаданных сборок, создание объектов и вызов членов во время выполнения программы | Для систем плагинов и инспекции неизвестных типов на старте с обязательным кэшированием в `CreateDelegate<T>()` |
| **Атрибуты и генерация при сборке** (`[Attribute]`, `[UnsafeAccessor]`, `Source Generators`) | Декларативная разметка, прямой zero-allocation доступ к `private`-членам и генерация C#-кода компилятором Roslyn | Стандарт для сериализаторов, DI и валидации в современном .NET с поддержкой Native AOT |
| **Деревья выражений** (`Expression<TDelegate>`, `Expression.Parameter`, `.Compile()`) | Представление кода в виде дерева узлов AST для анализа и генерации IL-делегатов на лету | Для трансляции запросов в SQL (`IQueryable<T>`) и сборки динамических фильтров с кэшированием результата `.Compile()` |
| **Нативная память и P/Invoke** (`unsafe`, `fixed`, `NativeMemory`, `[LibraryImport]`) | Прямая арифметика указателей, закрепление объектов в куче от сдвига GC и вызов функций C/C++ | Только для низкоуровневой оптимизации и интеграции с нативными библиотеками ОС (`StringMarshalling.Utf8`) |

## Пример кода

```csharp
using System;
using System.Buffers;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;

class Program
{
    static void Main()
    {
        // 1. ArrayPool<T> + Span<T>: обработка временного буфера без выделения новой памяти для GC
        int[] rented = ArrayPool<int>.Shared.Rent(minimumLength: 4);
        try
        {
            Span<int> window = rented.AsSpan(0, 4);
            window[0] = 15;
            window[1] = 40;
            window[2] = 85;
            window[3] = 120;

            // 2. Expression Trees: динамически собираем фильтр (x => x >= 50) и компилируем в быстрый делегат
            Func<int, bool> thresholdFilter = BuildMinThresholdFilter(minThreshold: 50);

            int passedSum = 0;
            foreach (int value in window)
            {
                if (thresholdFilter(value)) passedSum += value;
            }

            // 3. [UnsafeAccessor]: обновляем закрытое поле целевого объекта без рефлексии и аллокаций
            ScoreEngine engine = new ScoreEngine();
            ref int internalScore = ref EngineAccessors.AccessRawScore(engine);
            internalScore = passedSum;

            Console.WriteLine($"Итоговый счёт движка: {engine.GetFormattedScore()}");
            Console.WriteLine($"Занято в управляемой куче: {GC.GetTotalMemory(forceFullCollection: false):N0} байт");
        }
        finally
        {
            ArrayPool<int>.Shared.Return(rented);
        }

        // ❌ Типичные ошибки группы:
        // 1. Ручной вызов GC.Collect() в продакшене и использование stackalloc внутри циклов
        // 2. Вызов MethodInfo.Invoke() или Expression.Compile() в горячем цикле без кэширования делегата
        // 3. Сохранение указателя из блока fixed после его закрытия или утечка NativeMemory.Alloc без Free
    }

    static Func<int, bool> BuildMinThresholdFilter(int minThreshold)
    {
        ParameterExpression param = Expression.Parameter(typeof(int), "x");
        BinaryExpression body = Expression.GreaterThanOrEqual(param, Expression.Constant(minThreshold));
        return Expression.Lambda<Func<int, bool>>(body, param).Compile();
    }
}

public sealed class ScoreEngine
{
    private int _rawScore;
    public string GetFormattedScore() => $"{_rawScore} pts";
}

internal static class EngineAccessors
{
    [UnsafeAccessor(UnsafeAccessorKind.Field, Name = "_rawScore")]
    public static extern ref int AccessRawScore(ScoreEngine target);
}

```

## Важные нюансы

* **Лестница метапрограммирования — от `Source Generators` к `Reflection`:** при проектировании библиотек и инфраструктурного кода выбирайте инструменты по возрастанию накладных расходов: сначала **Source Generators** и **`[UnsafeAccessor]`** (нулевые затраты в рантайме, полная совместимость с Native AOT), затем **Expression Trees** с кэшированием `.Compile()` (для динамических правил и трансляции в SQL), и только в последнюю очередь — классическую **рефлексию** (`Invoke`), если типы загружаются из внешних плагинов уже после сборки.
* **Пирамида работы с памятью — безопасность важнее ручных указателей:** прежде чем включать `unsafe` и закреплять массивы через `fixed` (что мешает сборщику мусора сжимать кучу), проверьте безопасные альтернативы: `ReadOnlySpan<T>` и `stackalloc` для мелких локальных буферов, `ArrayPool<T>.Shared` для крупных массивов и `CollectionsMarshal.AsSpan` для прямого доступа к внутреннему массиву списков без копирования.
* **Готовность к обрезке кода (*Trimming*) и Native AOT:** современный .NET умеет компилировать приложения напрямую в нативный машинный код без JIT-компилятора. В таком режиме динамическая загрузка сборок, неаннотированная рефлексия по строковым именам и генерация IL через `Reflection.Emit` перестают работать — поэтому атрибуты `[LibraryImport]`, `[GeneratedRegex]` и генераторы исходного кода стали стандартом языка.
* **Полная карта языка C# (группы 110–210):** на этой карточке замыкается весь путь по ядру C# — от структур данных (`110 Коллекции`), инкапсуляции и памяти (`120 Классы и объекты`, `130 Пользовательские типы и память`), контрактов и обобщений (`140 Наследование и полиморфизм`, `150 Обобщения и контракты`), обработки сбоев и функционального стиля (`160 Исключения и ошибки`, `170 Делегаты, лямбды и события`, `180 LINQ`) до работы с внешними данными (`190 Строки, даты и файлы`), конкурентности (`200 Асинхронность и многопоточность`) и внутреннего устройства CLR (`210 Рантайм, память и метапрограммирование`).

