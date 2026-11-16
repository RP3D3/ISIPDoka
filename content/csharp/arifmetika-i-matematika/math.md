---
title: Math
keywords: Math, степень, квадратный корень, модуль числа, округление дроби, минимум, максимум, число Пи, математические функции, вычисления
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
  
      .hand-hold-l {
        transform-box: fill-box;
        transform-origin: left bottom;
        animation: holdLeft 4.2s ease-in-out infinite;
      }
      .hand-spin-r {
        transform-box: fill-box;
        transform-origin: right bottom;
        animation: spinRight 4.2s ease-in-out infinite;
      }
      .blade-fan-1 {
        transform-box: fill-box;
        transform-origin: bottom right;
        animation: fanBlade1 4.2s ease-in-out infinite;
      }
      .blade-fan-2 {
        transform-box: fill-box;
        transform-origin: top right;
        animation: fanBlade2 4.2s ease-in-out infinite;
      }
      .blade-fan-3 {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: fanBlade3 4.2s ease-in-out infinite;
      }
      .blade-fan-4 {
        transform-box: fill-box;
        transform-origin: top left;
        animation: fanBlade4 4.2s ease-in-out infinite;
      }
      .dial-rotate {
        transform-box: fill-box;
        transform-origin: center;
        animation: rotateDial 6s ease-in-out infinite;
      }
      .chip-pi {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatPi 3.6s ease-in-out infinite;
      }
      .chip-minmax {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatMinMax 3.8s ease-in-out infinite;
      }
      .burst-top {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: flashTop 4.2s ease-in-out infinite;
      }
  
      @keyframes holdLeft {
        0%, 100% { transform: rotate(0deg) translateY(0px); }
        50% { transform: rotate(-2deg) translateY(-4px); }
      }
      @keyframes spinRight {
        0%, 100% { transform: rotate(0deg) translate(0px, 0px); }
        50% { transform: rotate(-5deg) translate(-6px, -6px); }
      }
      @keyframes fanBlade1 {
        0%, 100% { transform: rotate(-24deg); }
        50% { transform: rotate(-32deg); }
      }
      @keyframes fanBlade2 {
        0%, 100% { transform: rotate(22deg); }
        50% { transform: rotate(30deg); }
      }
      @keyframes fanBlade3 {
        0%, 100% { transform: rotate(24deg); }
        50% { transform: rotate(32deg); }
      }
      @keyframes fanBlade4 {
        0%, 100% { transform: rotate(-22deg); }
        50% { transform: rotate(-30deg); }
      }
      @keyframes rotateDial {
        0%, 100% { transform: rotate(-4deg); }
        50% { transform: rotate(4deg); }
      }
      @keyframes floatPi {
        0%, 100% { transform: translateY(0px) rotate(-6deg); }
        50% { transform: translateY(-7px) rotate(-2deg); }
      }
      @keyframes floatMinMax {
        0%, 100% { transform: translateY(0px) rotate(5deg); }
        50% { transform: translateY(6px) rotate(9deg); }
      }
      @keyframes flashTop {
        0%, 28%, 74%, 100% { transform: scale(0.75); opacity: 0.2; }
        45%, 58% { transform: scale(1.15); opacity: 1; }
      }
  
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transform: none !important;
          opacity: 1 !important;
        }
      }
    </style>
  
    <!-- Orbiting Math Constant & Boundary Chips -->
    <g transform="translate(106, 62)">
      <g class="chip-pi">
        <rect x="-42" y="-20" width="84" height="40" rx="15" class="c-dark s-white" stroke-width="2" />
        <circle cx="-26" cy="0" r="4.5" class="c-accent" />
        <text x="8" y="6" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">Math.PI</text>
      </g>
    </g>
  
    <g transform="translate(794, 62)">
      <g class="chip-minmax">
        <rect x="-46" y="-20" width="92" height="40" rx="15" class="c-dark s-white" stroke-width="2" />
        <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">Min · Max</text>
      </g>
    </g>
  
    <!-- CENTRAL SWISS-ARMY MATH MULTI-TOOL -->
    <g transform="translate(450, 144)">
      <!-- Fold-Out Blade 1 (Top-Left): Pow(2,3) -> 8 -->
      <g transform="translate(-110, -24)">
        <g class="blade-fan-1">
          <rect x="-126" y="-17" width="134" height="34" rx="17" class="c-white s-dark" stroke-width="2.3" />
          <rect x="-119" y="-11" width="120" height="22" rx="11" class="c-dark" />
          <text x="-59" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">Pow(2,3)→8</text>
          <circle cx="-4" cy="0" r="4" class="c-accent" />
        </g>
      </g>
  
      <!-- Fold-Out Blade 2 (Bottom-Left): Floor / Ceiling -->
      <g transform="translate(-110, 24)">
        <g class="blade-fan-2">
          <rect x="-126" y="-17" width="134" height="34" rx="17" class="c-white s-dark" stroke-width="2.3" />
          <rect x="-119" y="-11" width="120" height="22" rx="11" class="c-accent" />
          <text x="-59" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">Floor·Ceil</text>
          <circle cx="-4" cy="0" r="4" class="c-white" />
        </g>
      </g>
  
      <!-- Fold-Out Blade 3 (Top-Right): Round(3.6) -> 4 -->
      <g transform="translate(110, -24)">
        <g class="blade-fan-3">
          <rect x="-8" y="-17" width="134" height="34" rx="17" class="c-white s-dark" stroke-width="2.3" />
          <rect x="-1" y="-11" width="120" height="22" rx="11" class="c-accent" />
          <text x="59" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">Round → 4</text>
          <circle cx="4" cy="0" r="4" class="c-white" />
        </g>
      </g>
  
      <!-- Fold-Out Blade 4 (Bottom-Right): Abs(-15) -> 15 -->
      <g transform="translate(110, 24)">
        <g class="blade-fan-4">
          <rect x="-8" y="-17" width="134" height="34" rx="17" class="c-white s-dark" stroke-width="2.3" />
          <rect x="-1" y="-11" width="120" height="22" rx="11" class="c-dark" />
          <text x="59" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">Abs(-15)→15</text>
          <circle cx="4" cy="0" r="4" class="c-accent" />
        </g>
      </g>
  
      <!-- Main Heavy Multi-Tool Chassis -->
      <rect x="-148" y="-56" width="296" height="112" rx="56" class="c-white s-dark" stroke-width="2.8" />
      <rect x="-136" y="-44" width="272" height="88" rx="44" class="c-dark" />
  
      <!-- Left Rivet & Class Badge: Math -->
      <circle cx="-102" cy="0" r="14" class="c-white s-dark" stroke-width="2" />
      <circle cx="-102" cy="0" r="5" class="c-accent" />
  
      <!-- Central Precision Dial: Sqrt(25) = 5 -->
      <g class="dial-rotate">
        <circle cx="0" cy="0" r="52" class="c-white s-dark" stroke-width="2.6" />
        <circle cx="0" cy="0" r="40" class="c-accent" />
        <!-- Calibrated Compass Ticks -->
        <line x1="0" y1="-48" x2="0" y2="-42" class="s-dark" stroke-width="2.2" stroke-linecap="round" />
        <line x1="0" y1="42" x2="0" y2="48" class="s-dark" stroke-width="2.2" stroke-linecap="round" />
        <line x1="-48" y1="0" x2="-42" y2="0" class="s-dark" stroke-width="2.2" stroke-linecap="round" />
        <line x1="42" y1="0" x2="48" y2="0" class="s-dark" stroke-width="2.2" stroke-linecap="round" />
  
        <text x="0" y="-6" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">Sqrt(25)</text>
        <rect x="-22" y="3" width="44" height="22" rx="7" class="c-white" />
        <text x="0" y="19" text-anchor="middle" class="c-dark mono" font-size="16" font-weight="700">= 5</text>
      </g>
  
      <!-- Right Rivet -->
      <circle cx="102" cy="0" r="14" class="c-white s-dark" stroke-width="2" />
      <circle cx="102" cy="0" r="5" class="c-accent" />
  
      <!-- Top-Center Class Tag Pill: System.Math -->
      <g transform="translate(0, -68)">
        <rect x="-66" y="-16" width="132" height="32" rx="16" class="c-dark s-white" stroke-width="2" />
        <circle cx="-48" cy="0" r="4.5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">System.Math</text>
      </g>
    </g>
  
    <!-- Kinetic Burst Rays Above Multi-Tool -->
    <g transform="translate(450, 56)">
      <g class="burst-top">
        <line x1="0" y1="0" x2="0" y2="-16" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="-18" y1="4" x2="-30" y2="-10" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="18" y1="4" x2="30" y2="-10" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="-16" cy="-16" r="2.8" class="c-white" />
        <circle cx="16" cy="-16" r="2.8" class="c-white" />
      </g>
    </g>
  
    <!-- LEFT FOREGROUND: Editorial Hand Holding the Multi-Tool Body -->
    <g transform="translate(332, 206)">
      <g class="hand-hold-l">
        <!-- Diagonal Sleeve from Bottom-Left -->
        <path d="M -282 96 L -34 -6 L -14 28 L -244 128 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M -44 0 L -18 -12 L 2 22 L -24 34 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
        <circle cx="-20" cy="18" r="2.8" class="c-dark" />
  
        <!-- Cartoon Round Hand Supporting Tool -->
        <circle cx="12" cy="-8" r="25" class="c-white s-dark" stroke-width="2.5" />
        <path d="M -2 -16 L 6 -13" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <path d="M -4 -6 L 4 -4" class="s-dark" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
  
    <!-- RIGHT FOREGROUND: Editorial Hand Turning the Precision Dial -->
    <g transform="translate(568, 206)">
      <g class="hand-spin-r">
        <!-- Diagonal Sleeve from Bottom-Right -->
        <path d="M 282 96 L 34 -6 L 14 28 L 244 128 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M 44 0 L 18 -12 L -2 22 L 24 34 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
        <circle cx="20" cy="18" r="2.8" class="c-dark" />
  
        <!-- Cartoon Round Hand Turning Tool -->
        <circle cx="-12" cy="-8" r="25" class="c-white s-dark" stroke-width="2.5" />
        <path d="M -6 -13 L 2 -16" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <path d="M -4 -4 L 4 -6" class="s-dark" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
  </svg>
---

# Математический класс Math

Как возвести число в степень, извлечь квадратный корень, округлить дробь или найти большее из двух значений?

`Math` — это встроенный статический класс из пространства имён `System`, который содержит готовые математические функции и константы (`Math.PI`, `Math.E`). Все методы вызываются напрямую через имя класса без создания объектов.

## Основные методы

| Метод | Что делает | Пример | Результат |
| --- | --- | --- | --- |
| `Math.Pow(x, y)` | Возводит число `x` в степень `y` | `Math.Pow(2, 3)` | `8` (`double`) |
| `Math.Sqrt(x)` | Извлекает квадратный корень из числа `x` | `Math.Sqrt(25)` | `5` (`double`) |
| `Math.Abs(x)` | Возвращает модуль числа (убирает знак минус) | `Math.Abs(-15)` | `15` |
| `Math.Round(x)` | Округляет дробь до ближайшего целого (или до N знаков) | `Math.Round(3.6)` | `4` |
| `Math.Floor(x)` | Округляет строго вниз (к меньшему целому) | `Math.Floor(3.9)` | `3` |
| `Math.Ceiling(x)` | Округляет строго вверх (к большему целому) | `Math.Ceiling(3.1)` | `4` |
| `Math.Min(a, b)` | Возвращает меньшее из двух чисел | `Math.Min(10, 20)` | `10` |
| `Math.Max(a, b)` | Возвращает большее из двух чисел | `Math.Max(10, 20)` | `20` |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // Степень, корень и модуль числа
        double power = Math.Pow(3, 2);       // 9
        double root = Math.Sqrt(16);         // 4
        int distance = Math.Abs(-42);        // 42

        // Три способа округления дробных чисел
        double value = 4.658;
        double normalRound = Math.Round(value, 1); // 4.7 (округление до 1 знака)
        double downRound = Math.Floor(value);      // 4 (всегда вниз)
        double upRound = Math.Ceiling(value);      // 5 (всегда вверх)

        // Выбор минимального и максимального значения
        int bestScore = Math.Max(120, 185);  // 185
        int minScore = Math.Min(120, 185);   // 120

        // Расчёт длины окружности с константой Math.PI
        double circleLength = 2 * Math.PI * 5;

        Console.WriteLine($"Степень: {power}, корень: {root}, модуль: {distance}");
        Console.WriteLine($"Округление: {normalRound} | вниз: {downRound} | вверх: {upRound}");
        Console.WriteLine($"Максимум: {bestScore}, минимум: {minScore}, окружность: {circleLength:F2}");
    }
}

```

## Важные нюансы

* **Возвращаемый тип `double`:** методы `Math.Pow()` и `Math.Sqrt()` всегда возвращают тип `double`, даже если передать в них целые числа. Если результат нужно сохранить в `int`, потребуется явное приведение `(int)`.
* **Банковское округление в `Math.Round()`:** при округлении половинок (`2.5` или `3.5`) метод по умолчанию тянется к ближайшему чётному числу (`2` и `4`). Для привычного округления вверх передают третий параметр: `Math.Round(2.5, MidpointRounding.AwayFromZero)`.
* **Отрицательные числа в `Floor` и `Ceiling`:** `Math.Floor(-3.1)` вернёт `-4` (так как `-4` меньше, чем `-3.1`), а `Math.Ceiling(-3.9)` вернёт `-3`.
* **Полезный бонус `Math.Clamp(значение, min, max)`:** помогает быстро удержать число в заданных границах (например, не дать здоровью персонажа опуститься ниже `0` или подняться выше `100`).

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой тип возвращает `Math.Sqrt(81)`?",
  "options": [
    {
      "text": "`double`",
      "correct": true
    },
    {
      "text": "`int`",
      "correct": false,
      "explanation": "Результат математических методов — `double`."
    },
    {
      "text": "`decimal`",
      "correct": false,
      "explanation": "`decimal` возвращают другие методы."
    }
  ],
  "explanation": "`Math.Sqrt` и `Math.Pow` всегда возвращают `double`."
}
```

```quiz
{
  "type": "radio",
  "question": "Что вернёт `Math.Floor(-3.1)`?",
  "options": [
    {
      "text": "`-4`",
      "correct": true
    },
    {
      "text": "`-3`",
      "correct": false,
      "explanation": "Это было бы `Ceiling`."
    },
    {
      "text": "`3`",
      "correct": false,
      "explanation": "Знак не меняется."
    }
  ],
  "explanation": "`Floor` всегда округляет вниз, а `-4` меньше `-3.1`."
}
```
