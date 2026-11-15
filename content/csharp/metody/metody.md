---
title: Методы
keywords: методы, сигнатура, возврат, значения, void, return, параметры, аргументы, ссылка, модификаторы, ref, out, in, params, перегрузка
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
    .grain-1 { transform-box: fill-box; transform-origin: center; animation: grainFall 3.8s ease-in infinite; }
    .grain-2 { transform-box: fill-box; transform-origin: center; animation: grainFall 3.8s ease-in infinite 0.7s; }
    .grain-3 { transform-box: fill-box; transform-origin: center; animation: grainFall 3.8s ease-in infinite 1.4s; }
    .btn-press { transform-box: fill-box; transform-origin: center bottom; animation: pressBtn 3.8s ease-in-out infinite; }
    .flow { stroke-dasharray: 6 8; animation: flowDash 1.4s linear infinite; }
    .steam-1 { transform-box: fill-box; transform-origin: center; animation: steam 3.8s ease-in-out infinite; }
    .steam-2 { transform-box: fill-box; transform-origin: center; animation: steam 3.8s ease-in-out infinite 0.9s; }
    .cloud-1 { transform-box: fill-box; transform-origin: center; animation: drift1 8s ease-in-out infinite; }
    .cloud-2 { transform-box: fill-box; transform-origin: center; animation: drift2 9s ease-in-out infinite; }
    @keyframes grainFall {
      0% { transform: translateY(-4px); opacity: 0; }
      20% { opacity: 1; }
      70% { transform: translateY(22px); opacity: 1; }
      100% { transform: translateY(28px); opacity: 0; }
    }
    @keyframes pressBtn {
      0%, 16%, 58%, 100% { transform: translateY(0px); }
      28%, 44% { transform: translateY(3px); }
    }
    @keyframes flowDash { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -14; } }
    @keyframes steam {
      0%, 100% { transform: translateY(0px); opacity: 0.25; }
      50% { transform: translateY(-7px); opacity: 0.85; }
    }
    @keyframes drift1 { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(7px); } }
    @keyframes drift2 { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(-7px); } }
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

  <g transform="translate(410, 150)">
    <path d="M -26 -78 L 26 -78 L 18 -106 L -18 -106 Z" class="c-dark s-white" stroke-width="2" stroke-linejoin="round" />
    <circle cx="-10" cy="-116" r="3" class="c-white grain-1" />
    <circle cx="4" cy="-122" r="3" class="c-white grain-2" />
    <circle cx="16" cy="-114" r="3" class="c-white grain-3" />

    <rect x="-64" y="-78" width="128" height="156" rx="16" class="c-white s-dark" stroke-width="2.5" />

    <path d="M -50 -78 H 50 Q 64 -78 64 -62 V -44 H -64 V -62 Q -64 -78 -50 -78 Z" class="c-dark s-white" stroke-width="1.75" />
    <circle cx="-46" cy="-60" r="4" class="c-accent" />
    <circle cx="-32" cy="-60" r="4" class="c-white" />
    <rect x="4" y="-67" width="56" height="20" rx="10" class="c-accent" />
    <text x="32" y="-53" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">Add(2, 3)</text>

    <g class="btn-press">
      <circle cx="40" cy="-6" r="10" class="c-dark s-white" stroke-width="2" />
      <circle cx="40" cy="-6" r="4" class="c-accent" />
    </g>
    <g class="btn-press">
      <circle cx="40" cy="22" r="10" class="c-dark s-white" stroke-width="2" />
      <circle cx="40" cy="22" r="4" class="c-accent" />
    </g>

    <line x1="-46" y1="46" x2="-4" y2="46" class="s-dark" stroke-width="2" stroke-linecap="round" />
    <line x1="-46" y1="56" x2="-18" y2="56" class="s-dark" stroke-width="2" stroke-linecap="round" />

    <rect x="64" y="6" width="14" height="20" rx="4" class="c-dark s-white" stroke-width="2" />
  </g>

  <path d="M 488 166 C 522 166 538 190 566 190" class="s-dark" stroke-width="12" fill="none" stroke-linecap="round" />
  <path d="M 488 166 C 522 166 538 190 566 190" class="s-white" stroke-width="7" fill="none" stroke-linecap="round" />
  <path d="M 488 166 C 522 166 538 190 566 190" class="s-dark flow" stroke-width="2.5" fill="none" stroke-linecap="round" />

  <g transform="translate(616, 196)">
    <path d="M -32 -22 H 32 L 24 26 H -24 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
    <ellipse cx="0" cy="-22" rx="32" ry="7.5" class="c-accent s-dark" stroke-width="1.8" />
    <path d="M 32 -12 C 48 -12 48 12 32 12" class="s-dark" stroke-width="2.2" fill="none" stroke-linecap="round" />
    <ellipse cx="0" cy="26" rx="24" ry="4.5" class="c-dark" opacity="0.25" />
  </g>

  <g transform="translate(616, 128)">
    <path d="M -8 10 C -16 0 -2 -4 -8 -14" class="s-white steam-1" stroke-width="2.2" fill="none" stroke-linecap="round" />
    <path d="M 10 12 C 2 2 16 -2 10 -12" class="s-white steam-2" stroke-width="2.2" fill="none" stroke-linecap="round" />
  </g>

  <g transform="translate(616, 252)">
    <rect x="-38" y="-13" width="76" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">return</text>
  </g>
  </svg>
---

# Шпаргалка по методам: параметры, модификаторы и выбор

Как правильно спроектировать заголовок метода, выбрать способ передачи данных и вернуть один или несколько результатов?

Любой метод состоит из заголовка и тела `{ ... }`. Заголовок задаёт тип возвращаемого результата (`void` или конкретный тип данных) и **сигнатуру** — имя метода, количество, типы и порядок его параметров. Именно по сигнатуре компилятор различает перегруженные версии одного метода.

## Сводная таблица передачи параметров

| Способ / модификатор | Синтаксис в заголовке | Поведение внутри метода | Когда применять |
| --- | --- | --- | --- |
| **По значению (обычный)** | `int x` | Читает и меняет только локальную копию | Стандартная безопасная передача без изменения оригинала |
| **По умолчанию** | `int x = 1` | Берёт стандартное значение, если аргумент не передан | Когда у параметра есть частый базовый вариант |
| **По ссылке (`ref`)** | `ref int x` | Читает и перезаписывает внешнюю переменную | Когда нужно обновить уже готовую переменную |
| **Выходной (`out`)** | `out int x` | **Обязан** записать значение до завершения метода | Возврат нескольких результатов из одного метода |
| **Только чтение (`in`)** | `in int x` | Только чтение без копирования в памяти | Защита переданных данных от случайной перезаписи |
| **Переменное число (`params`)** | `params int[] arr` | Упаковывает аргументы через запятую в массив | Когда заранее неизвестно количество входных значений |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. Вызов с параметром по умолчанию и перегрузкой
        PrintHeader();
        Console.WriteLine($"Сумма целых: {Sum(4, 6)}");
        Console.WriteLine($"Сумма дробных: {Sum(2.5, 3.5)}");

        // 2. Сочетание ref, out, in и params в одном вызове
        int totalScore = 10;
        int passLimit = 50;
        ProcessScores(ref totalScore, out bool isPassed, in passLimit, 15, 20, 12);

        Console.WriteLine($"Итоговый балл: {totalScore}, зачёт: {isPassed}");
    }

    // Метод без возврата результата (void) с необязательным параметром
    static void PrintHeader(string title = "=== РЕЗУЛЬТАТЫ ===")
    {
        Console.WriteLine(title);
    }

    // Перегруженные методы с возвратом результата (return)
    static int Sum(int a, int b) => a + b;
    static double Sum(double a, double b) => a + b;

    // Комбинация модификаторов: params всегда располагается строго в конце
    static void ProcessScores(ref int current, out bool passed, in int limit, params int[] bonus)
    {
        foreach (int item in bonus)
        {
            current += item; // Изменяем внешнюю переменную через ref
        }

        passed = current >= limit; // Обязательно заполняем выходной параметр out
    }
}

```

## Краткий алгоритм проектирования метода

* **Метод только выводит текст или меняет состояние без расчётного ответа:** ставьте `void`.
* **Нужен один вычисленный ответ:** укажите его тип вместо `void` и верните через `return`.
* **Нужно вернуть два и более результата сразу:** используйте основной `return` и выходные параметры `out`.
* **Нужно изменить уже существующую переменную извне:** передавайте её с модификатором `ref`.
* **Одно и то же действие применяется к разным типам или разному числу аргументов:** используйте перегрузку методов или `params` в конце списка параметров.
* **Стоит выбор между циклом и рекурсией:** для линейных повторений выбирайте цикл (он быстрее и экономит память), а рекурсию оставляйте для древовидных и вложенных структур.

## Куда дальше

* [Методы (руководство C#)](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/methods) — объявление, параметры и перегрузка в руководстве Microsoft.
* [Параметры методов](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/method-parameters) — `ref`, `out`, `in` и `params` с примерами.
