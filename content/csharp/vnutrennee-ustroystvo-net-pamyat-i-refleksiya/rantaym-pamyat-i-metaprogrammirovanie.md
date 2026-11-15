---
title: Рантайм, память и метапрограммирование
keywords: рантайм .NET, сборщик мусора GC, ArrayPool и Span, рефлексия Reflection, UnsafeAccessor, Source Generators, Expression Trees, Native AOT, карта языка C#
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
    .truck { transform-box: fill-box; transform-origin: center; animation: driveIn 6s ease-in-out infinite; }
    .wheel { transform-box: fill-box; transform-origin: center; animation: spin 1.4s linear infinite; }
    .arrow { transform-box: fill-box; transform-origin: center; animation: nudge 3s ease-in-out infinite; }
    .fill { opacity: 0.9; }
    @keyframes fillUp {
      0%, 10% { transform: scaleY(0.12); }
      70%, 88% { transform: scaleY(0.85); }
      100% { transform: scaleY(0.12); }
    }
    @keyframes driveIn {
      0%, 8% { transform: translateX(-16px); }
      26%, 84% { transform: translateX(0px); }
      100% { transform: translateX(-16px); }
    }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes nudge { 0%, 100% { transform: translateX(0px); opacity: 0.35; } 50% { transform: translateX(6px); opacity: 1; } }
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

  <line x1="120" y1="212" x2="790" y2="212" class="s-white" stroke-width="4" stroke-linecap="round" />
  <line x1="132" y1="212" x2="132" y2="236" class="s-white" stroke-width="3" stroke-linecap="round" />
  <line x1="778" y1="212" x2="778" y2="236" class="s-white" stroke-width="3" stroke-linecap="round" />

  <g transform="translate(196, 154)">
    <g class="truck">
      <rect x="-68" y="-44" width="92" height="60" rx="7" class="c-white s-dark" stroke-width="2.4" />
      <rect x="-58" y="-34" width="72" height="10" rx="4" class="c-accent" />
      <rect x="28" y="-30" width="44" height="46" rx="9" class="c-white s-dark" stroke-width="2.4" />
      <path d="M 34 -22 H 60 L 66 -6 H 34 Z" class="c-accent s-dark" stroke-width="1.8" stroke-linejoin="round" />
      <rect x="72" y="2" width="8" height="8" rx="2" class="c-dark" />
      <circle cx="-44" cy="20" r="11" class="c-dark s-white" stroke-width="2.2" />
      <circle cx="-44" cy="20" r="4" class="c-white wheel" />
      <circle cx="50" cy="20" r="11" class="c-dark s-white" stroke-width="2.2" />
      <circle cx="50" cy="20" r="4" class="c-white wheel" />
    </g>
  </g>

  <g transform="translate(388, 212)">
    <rect x="-39" y="-72" width="78" height="72" rx="10" class="c-white s-dark" stroke-width="2.4" />
    <rect x="-32" y="-58" width="64" height="46" rx="6" class="c-dark" />
    <rect class="fill" x="-32" y="-58" width="64" height="46" rx="6" fill="var(--domain-accent, #953dac)" style="transform-box: fill-box; transform-origin: center bottom; animation: fillUp 6s ease-in-out infinite 0s;" />
    <rect x="-44" y="-81" width="88" height="12" rx="6" class="c-white s-dark" stroke-width="2.2" />
    <text x="0" y="-92" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">Gen 0</text>
  </g>
  <g transform="translate(522, 212)">
    <rect x="-44" y="-96" width="88" height="96" rx="10" class="c-white s-dark" stroke-width="2.4" />
    <rect x="-37" y="-82" width="74" height="70" rx="6" class="c-dark" />
    <rect class="fill" x="-37" y="-82" width="74" height="70" rx="6" fill="var(--domain-accent, #953dac)" style="transform-box: fill-box; transform-origin: center bottom; animation: fillUp 6s ease-in-out infinite 0.5s;" />
    <rect x="-49" y="-105" width="98" height="12" rx="6" class="c-white s-dark" stroke-width="2.2" />
    <text x="0" y="-116" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">Gen 1</text>
  </g>
  <g transform="translate(664, 212)">
    <rect x="-49" y="-120" width="98" height="120" rx="10" class="c-white s-dark" stroke-width="2.4" />
    <rect x="-42" y="-106" width="84" height="94" rx="6" class="c-dark" />
    <rect class="fill" x="-42" y="-106" width="84" height="94" rx="6" fill="var(--domain-accent, #953dac)" style="transform-box: fill-box; transform-origin: center bottom; animation: fillUp 6s ease-in-out infinite 1s;" />
    <rect x="-54" y="-129" width="108" height="12" rx="6" class="c-white s-dark" stroke-width="2.2" />
    <text x="0" y="-140" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">Gen 2</text>
  </g>

  <g transform="translate(768, 150)">
    <rect x="-42" y="-46" width="84" height="54" rx="7" class="c-white s-dark" stroke-width="2.4" />
    <rect x="-34" y="-38" width="68" height="10" rx="4" class="c-accent" />
    <line x1="-34" y1="-16" x2="34" y2="-16" class="s-dark" stroke-width="2" stroke-dasharray="5 5" opacity="0.5" />
    <line x1="-34" y1="-4" x2="34" y2="-4" class="s-dark" stroke-width="2" stroke-dasharray="5 5" opacity="0.5" />
  </g>
  <g transform="translate(768, 84)">
    <rect x="-27" y="-13" width="54" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">LOH</text>
  </g>

  <g transform="translate(286, 96)">
    <g class="arrow">
      <line x1="0" y1="0" x2="24" y2="0" class="s-white" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 17 -6 L 24 0 L 17 6" class="s-white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </g>
  <g transform="translate(600, 70)">
    <g class="arrow">
      <line x1="0" y1="0" x2="24" y2="0" class="s-white" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 17 -6 L 24 0 L 17 6" class="s-white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </g>

  <g transform="translate(196, 76)">
    <rect x="-23" y="-13" width="46" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">GC</text>
  </g>
  </svg>
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
* **Полная карта языка C# (группы 10–220):** на этой карточке замыкается весь путь по ядру C# — от первой программы, консоли и типов (`10`–`50`), арифметики и ветвлений (`60`–`80`), циклов, массивов и методов (`90`–`110`), структур данных (`120 Коллекции`), инкапсуляции и памяти (`130 Классы и объекты`, `140 Пользовательские типы и память`), контрактов и обобщений (`150 Наследование и полиморфизм`, `160 Обобщения и контракты`), обработки сбоев и функционального стиля (`170 Исключения и ошибки`, `180 Делегаты, лямбды и события`, `190 LINQ`) до работы с внешними данными (`200 Строки, даты и файлы`), конкурентности (`210 Асинхронность и многопоточность`) и внутреннего устройства CLR (`220 Внутреннее устройство .NET, память и рефлексия`).

## Куда дальше

* [Сборка мусора](https://learn.microsoft.com/dotnet/standard/garbage-collection/) — поколения, LOH и диагностика памяти.
* [Управляемый процесс выполнения](https://learn.microsoft.com/dotnet/standard/managed-execution-process) — как CLR загружает и исполняет код.
* [Рефлексия и атрибуты](https://learn.microsoft.com/dotnet/csharp/advanced-topics/reflection-and-attributes/) — метаданные, `Type` и собственные атрибуты.
