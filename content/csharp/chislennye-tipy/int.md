---
title: int
keywords: int, System.Int32, целые числа, тип данных, целочисленное деление, диапазон значений, отрицательные числа, счетчик, переполнение, переменная
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
  
      .hand-press {
        transform-box: fill-box;
        transform-origin: left center;
        animation: pressHand 4s ease-in-out infinite;
      }
      .btn-press {
        transform-box: fill-box;
        transform-origin: center bottom;
        animation: pressButton 4s ease-in-out infinite;
      }
      .signal-flow {
        stroke-dasharray: 6 6;
        animation: flowDash 1.2s linear infinite;
      }
      .counter-jolt {
        transform-box: fill-box;
        transform-origin: center bottom;
        animation: joltCounter 4s ease-in-out infinite;
      }
      .eye-look {
        transform-box: fill-box;
        transform-origin: center;
        animation: lookRight 4s ease-in-out infinite;
      }
      .burst-pulse {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: pulseBurst 4s ease-in-out infinite;
      }
      .star-float {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatStar 5s ease-in-out infinite;
      }
      .pill-float {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatPill 5s ease-in-out infinite;
      }
      .cloud-drift-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: driftCloud1 7s ease-in-out infinite;
      }
      .cloud-drift-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: driftCloud2 8s ease-in-out infinite;
      }
  
      @keyframes pressHand {
        0%, 18%, 62%, 100% { transform: translateY(0px) rotate(0deg); }
        35%, 45% { transform: translateY(2px) rotate(1.8deg); }
      }
      @keyframes pressButton {
        0%, 20%, 60%, 100% { transform: translateY(0px); }
        35%, 45% { transform: translateY(6px); }
      }
      @keyframes flowDash {
        0% { stroke-dashoffset: 24; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes joltCounter {
        0%, 34%, 56%, 100% { transform: translateY(0px) rotate(0deg); }
        40% { transform: translateY(-4px) rotate(1.2deg); }
        46% { transform: translateY(1px) rotate(-0.8deg); }
      }
      @keyframes lookRight {
        0%, 25%, 75%, 100% { transform: translate(0px, 0px); }
        38%, 60% { transform: translate(3px, -1px); }
      }
      @keyframes pulseBurst {
        0%, 32%, 68%, 100% { transform: scale(0.85); opacity: 0.45; }
        42%, 52% { transform: scale(1.12); opacity: 1; }
      }
      @keyframes floatStar {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-4px) rotate(2deg); }
      }
      @keyframes floatPill {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(4px); }
      }
      @keyframes driftCloud1 {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(8px); }
      }
      @keyframes driftCloud2 {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(-8px); }
      }
  
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transform: none !important;
          opacity: 1 !important;
        }
      }
    </style>
  
    <!-- Framing Square Brackets [ ] -->
    <path d="M 52 42 H 32 V 238 H 52" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 848 42 H 868 V 238 H 848" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Decorative Contour Clouds -->
    <g transform="translate(178, 42)">
      <g class="cloud-drift-1">
        <path d="M -26 9 H 26 C 32 9 36 4 36 -1 C 36 -6 32 -10 27 -10 C 25 -17 18 -21 11 -19 C 7 -25 -3 -25 -8 -19 C -15 -20 -21 -15 -21 -8 C -27 -8 -31 -3 -31 2 C -31 6 -29 9 -26 9 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
    <g transform="translate(658, 36)">
      <g class="cloud-drift-2">
        <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- LEFT SECTION: Conduit Pipe & +1 Button -->
    <g transform="translate(216, 188)">
      <!-- Pipe to central counter -->
      <rect x="24" y="-4" width="60" height="14" class="c-white s-dark" stroke-width="2" />
      <line x1="28" y1="3" x2="80" y2="3" class="s-accent signal-flow" stroke-width="2.5" stroke-linecap="round" />
  
      <!-- Animated Plunger Cap -->
      <g transform="translate(0, -18)">
        <g class="btn-press">
          <rect x="-24" y="-12" width="48" height="24" rx="11" class="c-dark s-white" stroke-width="2" />
          <rect x="-18" y="-8" width="36" height="4" rx="2" class="c-accent" />
          <text x="0" y="7" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">+1</text>
        </g>
      </g>
  
      <!-- Fixed Button Base -->
      <rect x="-32" y="-8" width="64" height="24" rx="7" class="c-dark s-white" stroke-width="2" />
      <line x1="-22" y1="4" x2="22" y2="4" class="s-white" stroke-width="1.5" stroke-linecap="round" />
    </g>
  
    <!-- LEFT SECTION: Cartoon Round Hand Pressing +1 -->
    <g transform="translate(132, 134)">
      <g class="hand-press">
        <!-- Dark Sleeve -->
        <path d="M -76 -24 L 46 -14 L 42 18 L -76 14 Z" class="c-dark s-white" stroke-width="2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M 42 -15 L 64 -12 L 60 18 L 38 16 Z" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <circle cx="49" cy="8" r="2.5" class="c-dark" />
  
        <!-- Cartoon Round Hand -->
        <circle cx="82" cy="2" r="21" class="c-white s-dark" stroke-width="2.4" />
        <path d="M 68 -3 L 74 -1" class="s-dark" stroke-width="1.8" stroke-linecap="round" />
        <path d="M 67 5 L 73 6" class="s-dark" stroke-width="1.8" stroke-linecap="round" />
      </g>
    </g>
  
    <!-- CENTER SECTION: 32-bit Mechanical Odometer (int) -->
    <g transform="translate(450, 146)">
      <g class="counter-jolt">
        <!-- Grotesque Doka Eyes perched on top -->
        <g transform="translate(-44, -84)">
          <ellipse cx="-14" cy="0" rx="12" ry="15" class="c-white s-dark" stroke-width="2.2" />
          <ellipse cx="12" cy="0" rx="12" ry="15" class="c-white s-dark" stroke-width="2.2" />
          <g class="eye-look">
            <circle cx="-11" cy="1" r="4" class="c-dark" />
            <circle cx="15" cy="1" r="4" class="c-dark" />
          </g>
        </g>
  
        <!-- Mechanical Feet -->
        <path d="M -118 76 L -126 90 H -96 L -102 76 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <path d="M 102 76 L 96 90 H 126 L 118 76 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
        <!-- Main White Counter Housing -->
        <rect x="-150" y="-74" width="300" height="152" rx="18" class="c-white s-dark" stroke-width="2.5" />
  
        <!-- Dark Top Window Header Bar -->
        <path d="M -132 -74 H 132 Q 150 -74 150 -56 V -40 H -150 V -56 Q -150 -74 -132 -74 Z" class="c-dark s-white" stroke-width="1.75" />
        <line x1="-149" y1="-40" x2="149" y2="-40" class="s-dark" stroke-width="2.5" />
  
        <!-- 3 Header Dots -->
        <circle cx="-126" cy="-57" r="4" class="c-accent" />
        <circle cx="-112" cy="-57" r="4" class="c-white" />
        <circle cx="-98" cy="-57" r="4" class="c-white" />
  
        <!-- Header Type Label: int -->
        <rect x="64" y="-67" width="66" height="20" rx="10" class="c-accent" />
        <text x="97" y="-53" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">int</text>
  
        <!-- Recessed Odometer Display Frame -->
        <rect x="-132" y="-24" width="264" height="58" rx="10" class="c-dark" />
  
        <!-- Sign Drum (+ / overflow flip indicator) -->
        <rect x="-124" y="-16" width="34" height="42" rx="6" class="c-accent" />
        <path d="M -107 -3 V 13 M -115 5 H -99" class="s-white" stroke-width="3" stroke-linecap="round" />
  
        <!-- Number Drum Window -->
        <rect x="-84" y="-16" width="208" height="42" rx="6" class="c-white" />
  
        <!-- Mechanical Drum Notches (Top & Bottom) -->
        <line x1="-46" y1="-16" x2="-46" y2="-11" class="s-dark" stroke-width="1.5" />
        <line x1="-46" y1="21" x2="-46" y2="26" class="s-dark" stroke-width="1.5" />
        <line x1="6" y1="-16" x2="6" y2="-11" class="s-dark" stroke-width="1.5" />
        <line x1="6" y1="21" x2="6" y2="26" class="s-dark" stroke-width="1.5" />
        <line x1="58" y1="-16" x2="58" y2="-11" class="s-dark" stroke-width="1.5" />
        <line x1="58" y1="21" x2="58" y2="26" class="s-dark" stroke-width="1.5" />
  
        <!-- Max Int32 Value Readout -->
        <text x="20" y="13" text-anchor="middle" class="c-dark mono" font-size="21" font-weight="700">2 147 483 647</text>
  
        <!-- Bottom 32-Bit Capacity Gauge -->
        <rect x="-132" y="45" width="264" height="16" rx="8" class="c-dark" />
        <rect x="-128" y="49" width="250" height="8" rx="4" class="c-accent" />
        <rect x="118" y="49" width="4" height="8" rx="1" class="c-white" />
      </g>
    </g>
  
    <!-- Kinetic Burst Rays at Counter Overflow Corner -->
    <g transform="translate(606, 68)">
      <g class="burst-pulse">
        <line x1="4" y1="-6" x2="22" y2="-22" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="10" y1="6" x2="32" y2="2" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="-6" y1="-12" x2="-2" y2="-32" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="26" cy="-10" r="3" class="c-white" />
        <circle cx="10" cy="-28" r="2.5" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Starburst & Dark Capsule Badges -->
    <!-- Connector Lines -->
    <circle cx="600" cy="148" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 604 148 H 636 V 104 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 636 148 V 196 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Badge: Starburst + System.Int32 Capsule -->
    <g transform="translate(748, 104)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-46 14,-28 42,-36 34,-12 62,0 34,12 42,36 14,28 0,46 -14,28 -42,36 -34,12 -62,0 -34,-12 -42,-36 -14,-28" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-74" y="-19" width="148" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">System.Int32</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: Signed 32-Bit Range Capsule -->
    <g transform="translate(748, 196)">
      <g class="pill-float">
        <rect x="-82" y="-19" width="164" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
        <circle cx="-64" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">-2³¹ … 2³¹-1</text>
      </g>
    </g>
  </svg>
---

# Целочисленный тип int

Какой тип данных выбрать по умолчанию для целых чисел и что случится, если значение превысит два миллиарда?

`int` (сокращение от *integer* — целое число) — главный базовый тип для хранения целых положительных и отрицательных чисел без дробной части. Его используют для счётчиков циклов, возраста, количества товаров и индексов массивов.

## Основные характеристики

* **Размер в памяти:** 4 байта (32 бита).
* **Диапазон значений:** от `-2 147 483 648` до `2 147 483 647` (примерно ±2,14 миллиарда).
* **Полное имя типа:** `System.Int32`.
* **Значение по умолчанию:** `0`.

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        int age = 20;
        int temperature = -15;

        // Нижнее подчёркивание делает большие числа читаемыми
        int cityPopulation = 1_450_000;

        // Особенность: при делении двух int дробная часть отбрасывается
        int a = 7;
        int b = 2;
        int result = a / b; // Получится 3, а не 3.5

        Console.WriteLine($"Население: {cityPopulation}, результат деления: {result}");
        Console.WriteLine($"Максимум для int: {int.MaxValue}");
    }
}

```

## Важные нюансы

* **Деление нацело:** при делении одного `int` на другой дробный остаток не округляется по правилам математики, а просто отбрасывается (`9 / 4` превратится в `2`).
* **Разделитель разрядов `_`:** длинные числа удобно разделять символом подчёркивания (`1_000_000`) — компилятор его игнорирует, а код читается гораздо легче.
* **Переполнение:** если к максимальному значению `2 147 483 647` прибавить единицу, число не выдаст ошибку, а «перекрутится» в глубокий минус (`-2 147 483 648`). Для чисел больше двух миллиардов используют тип `long`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чему равно `9 / 4` для типа `int`?",
  "options": [
    {
      "text": "`2`",
      "correct": true,
      "explanation": "Дробная часть отбрасывается."
    },
    {
      "text": "`2.25`",
      "correct": false,
      "explanation": "Это результат дробного деления."
    },
    {
      "text": "`3`",
      "correct": false,
      "explanation": "Округления вверх не происходит."
    }
  ],
  "explanation": "При делении целых чисел результат тоже целый."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `int`?",
  "options": [
    {
      "text": "Занимает 32 бита",
      "correct": true
    },
    {
      "text": "Диапазон примерно ±2,1 млрд",
      "correct": true
    },
    {
      "text": "Хранит дробные числа",
      "correct": false,
      "explanation": "Для дробей есть `double` и `decimal`."
    }
  ],
  "explanation": "`int` — целый 32-битный тип."
}
```
