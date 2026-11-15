---
title: MinValue и MaxValue
keywords: MinValue, MaxValue, диапазон значений, границы числовых типов, максимальное число, минимальное число, переполнение, константы, размер типа
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
  
      .hand-inspect {
        transform-box: fill-box;
        transform-origin: left center;
        animation: inspectHand 4.4s ease-in-out infinite;
      }
      .cursor-slide {
        transform-box: fill-box;
        transform-origin: center;
        animation: slideCursor 4.4s ease-in-out infinite;
      }
      .bumper-left {
        transform-box: fill-box;
        transform-origin: left center;
        animation: recoilLeft 4.4s ease-in-out infinite;
      }
      .bumper-right {
        transform-box: fill-box;
        transform-origin: right center;
        animation: recoilRight 4.4s ease-in-out infinite;
      }
      .eyes-follow {
        transform-box: fill-box;
        transform-origin: center;
        animation: followCursor 4.4s ease-in-out infinite;
      }
      .burst-left {
        transform-box: fill-box;
        transform-origin: right center;
        animation: popLeft 4.4s ease-in-out infinite;
      }
      .burst-right {
        transform-box: fill-box;
        transform-origin: left center;
        animation: popRight 4.4s ease-in-out infinite;
      }
      .signal-flow {
        stroke-dasharray: 5 5;
        animation: flowSignal 1.2s linear infinite;
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
  
      @keyframes inspectHand {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-6px) rotate(-2.5deg); }
      }
      @keyframes slideCursor {
        0%, 100% { transform: translateX(-52px); }
        45%, 55% { transform: translateX(52px); }
      }
      @keyframes recoilLeft {
        0%, 12%, 90%, 100% { transform: translateX(0px); }
        5% { transform: translateX(-4px); }
      }
      @keyframes recoilRight {
        0%, 42%, 62%, 100% { transform: translateX(0px); }
        50% { transform: translateX(4px); }
      }
      @keyframes followCursor {
        0%, 100% { transform: translate(-3px, 1px); }
        45%, 55% { transform: translate(3px, 1px); }
      }
      @keyframes popLeft {
        0%, 16%, 88%, 100% { transform: scale(1.1); opacity: 1; }
        25%, 80% { transform: scale(0.75); opacity: 0; }
      }
      @keyframes popRight {
        0%, 38%, 64%, 100% { transform: scale(0.75); opacity: 0; }
        48%, 54% { transform: scale(1.1); opacity: 1; }
      }
      @keyframes flowSignal {
        0% { stroke-dashoffset: 20; }
        100% { stroke-dashoffset: 0; }
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
    <g transform="translate(222, 38)">
      <g class="cloud-drift-1">
        <path d="M -22 7 H 22 C 27 7 31 3 31 -1 C 31 -5 27 -8 23 -8 C 21 -14 15 -17 9 -15 C 5 -20 -3 -20 -7 -15 C -13 -16 -18 -12 -18 -6 C -23 -6 -26 -2 -26 2 C -26 5 -24 7 -22 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
    <g transform="translate(658, 36)">
      <g class="cloud-drift-2">
        <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- LEFT SECTION: Cartoon Round Hand Holding Magnifying Glass Inspecting Limits -->
    <g transform="translate(138, 154)">
      <g class="hand-inspect">
        <!-- Magnifying Glass Handle -->
        <rect x="12" y="-6" width="38" height="10" rx="5" transform="rotate(-24 12 -6)" class="c-dark s-white" stroke-width="1.75" />
        <!-- Magnifying Glass Lens Frame -->
        <circle cx="58" cy="-24" r="30" class="c-white s-dark" stroke-width="2.4" />
        <circle cx="58" cy="-24" r="22" class="c-dark" />
        <!-- Lens Glare & Const Tag Inside -->
        <path d="M 45 -35 A 15 15 0 0 1 63 -39" class="s-white" stroke-width="2" stroke-linecap="round" />
        <rect x="41" y="-31" width="34" height="15" rx="7.5" class="c-accent" />
        <text x="58" y="-20" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">const</text>
  
        <!-- Dark Sleeve -->
        <path d="M -82 14 L -16 -6 L -10 22 L -82 46 Z" class="c-dark s-white" stroke-width="2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M -22 -5 L -4 -10 L 2 18 L -16 23 Z" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <circle cx="-8" cy="12" r="2.2" class="c-dark" />
  
        <!-- Cartoon Round Hand Holding the Handle -->
        <circle cx="14" cy="1" r="18" class="c-white s-dark" stroke-width="2.3" />
        <path d="M 4 -5 L 10 -3" class="s-dark" stroke-width="1.75" stroke-linecap="round" />
        <path d="M 3 3 L 9 4" class="s-dark" stroke-width="1.75" stroke-linecap="round" />
      </g>
    </g>
  
    <!-- Signal Cable from Inspector to Central Limit Caliper -->
    <path d="M 228 148 H 294" class="s-white signal-flow" stroke-width="2.2" stroke-linecap="round" />
    <circle cx="294" cy="148" r="4" class="c-white s-dark" stroke-width="1.75" />
  
    <!-- CENTER SECTION: Precision Boundary & Caliper Console (MinValue .. MaxValue) -->
    <g transform="translate(450, 152)">
      <!-- Grotesque Doka Eyes perched on top -->
      <g transform="translate(-56, -82)">
        <ellipse cx="-13" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
        <ellipse cx="11" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
        <g class="eyes-follow">
          <circle cx="-11" cy="1" r="3.8" class="c-dark" />
          <circle cx="13" cy="1" r="3.8" class="c-dark" />
        </g>
      </g>
  
      <!-- Heavy Mechanical Feet -->
      <path d="M -124 72 L -132 86 H -100 L -106 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
      <path d="M 106 72 L 100 86 H 132 L 124 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
      <!-- Main White Console Housing -->
      <rect x="-154" y="-72" width="308" height="144" rx="18" class="c-white s-dark" stroke-width="2.5" />
  
      <!-- Dark Window Header Bar -->
      <path d="M -136 -72 H 136 Q 154 -72 154 -54 V -38 H -154 V -54 Q -154 -72 -136 -72 Z" class="c-dark s-white" stroke-width="1.75" />
      <line x1="-153" y1="-38" x2="153" y2="-38" class="s-dark" stroke-width="2.5" />
  
      <!-- 3 Doka Header Dots -->
      <circle cx="-130" cy="-55" r="4" class="c-accent" />
      <circle cx="-116" cy="-55" r="4" class="c-white" />
      <circle cx="-102" cy="-55" r="4" class="c-white" />
  
      <!-- Header Type Pill: T.MaxValue -->
      <rect x="34" y="-65" width="102" height="20" rx="10" class="c-accent" />
      <text x="85" y="-51" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">T.MaxValue</text>
  
      <!-- Recessed Caliper Track Chamber -->
      <rect x="-138" y="-24" width="276" height="62" rx="12" class="c-dark" />
  
      <!-- Calibrated Ruler Tick Marks Across Track -->
      <line x1="-80" y1="7" x2="80" y2="7" class="s-white" stroke-width="1.8" stroke-linecap="round" />
      <line x1="-60" y1="0" x2="-60" y2="14" class="s-white" stroke-width="1.5" stroke-linecap="round" />
      <line x1="-40" y1="3" x2="-40" y2="11" class="s-white" stroke-width="1.5" stroke-linecap="round" />
      <line x1="-20" y1="0" x2="-20" y2="14" class="s-white" stroke-width="1.5" stroke-linecap="round" />
      <line x1="0" y1="-2" x2="0" y2="16" class="s-white" stroke-width="2" stroke-linecap="round" />
      <line x1="20" y1="0" x2="20" y2="14" class="s-white" stroke-width="1.5" stroke-linecap="round" />
      <line x1="40" y1="3" x2="40" y2="11" class="s-white" stroke-width="1.5" stroke-linecap="round" />
      <line x1="60" y1="0" x2="60" y2="14" class="s-white" stroke-width="1.5" stroke-linecap="round" />
  
      <!-- Left End-Stop Bumper: MIN -->
      <g transform="translate(-108, 7)">
        <g class="bumper-left">
          <rect x="-22" y="-23" width="44" height="46" rx="8" class="c-white" />
          <rect x="-17" y="-18" width="34" height="14" rx="4" class="c-accent" />
          <text x="0" y="-8" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">MIN</text>
          <!-- Floor Limit Symbol ⌊ -->
          <path d="M -5 2 V 14 H 7" class="s-dark" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
  
      <!-- Right End-Stop Bumper: MAX -->
      <g transform="translate(108, 7)">
        <g class="bumper-right">
          <rect x="-22" y="-23" width="44" height="46" rx="8" class="c-white" />
          <rect x="-17" y="-18" width="34" height="14" rx="4" class="c-accent" />
          <text x="0" y="-8" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">MAX</text>
          <!-- Ceiling Limit Symbol ⌉ -->
          <path d="M -7 2 H 5 V 14" class="s-dark" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
  
      <!-- Sliding Vernier Cursor Needle Bouncing Between MIN and MAX -->
      <g transform="translate(0, 7)">
        <g class="cursor-slide">
          <rect x="-12" y="-20" width="24" height="40" rx="6" class="c-white s-dark" stroke-width="2" />
          <rect x="-7" y="-15" width="14" height="30" rx="3" class="c-accent" />
          <line x1="0" y1="-10" x2="0" y2="10" class="s-white" stroke-width="2.2" stroke-linecap="round" />
        </g>
      </g>
  
      <!-- Bottom Legend Strip: MinValue .. MaxValue -->
      <rect x="-138" y="45" width="128" height="16" rx="8" class="c-dark" />
      <circle cx="-126" cy="53" r="3.5" class="c-accent" />
      <text x="-70" y="57" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">.MinValue</text>
  
      <rect x="10" y="45" width="128" height="16" rx="8" class="c-dark" />
      <circle cx="22" cy="53" r="3.5" class="c-accent" />
      <text x="78" y="57" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">.MaxValue</text>
    </g>
  
    <!-- Kinetic Burst Rays on Left & Right Bumper Impacts -->
    <g transform="translate(290, 96)">
      <g class="burst-left">
        <line x1="-4" y1="-4" x2="-20" y2="-18" class="s-white" stroke-width="2.4" stroke-linecap="round" />
        <line x1="-8" y1="8" x2="-26" y2="4" class="s-white" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="-22" cy="-7" r="2.8" class="c-white" />
      </g>
    </g>
    <g transform="translate(610, 96)">
      <g class="burst-right">
        <line x1="4" y1="-4" x2="20" y2="-18" class="s-white" stroke-width="2.4" stroke-linecap="round" />
        <line x1="8" y1="8" x2="26" y2="4" class="s-white" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="22" cy="-7" r="2.8" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Starburst & Dark Capsule Badges -->
    <!-- Connector Lines -->
    <circle cx="604" cy="152" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 608 152 H 636 V 102 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 636 152 V 198 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Badge: Starburst + MinValue · MaxValue Capsule -->
    <g transform="translate(748, 102)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-46 14,-28 42,-36 34,-12 62,0 34,12 42,36 14,28 0,46 -14,28 -42,36 -34,12 -62,0 -34,-12 -42,-36 -14,-28" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-80" y="-19" width="160" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">MinValue · MaxValue</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: Universal Numeric Types Capsule -->
    <g transform="translate(748, 198)">
      <g class="pill-float">
        <rect x="-82" y="-19" width="164" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
        <circle cx="-64" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">int · double · byte</text>
      </g>
    </g>
  </svg>
---

# Границы числовых типов: MinValue и MaxValue

Как узнать точный предел любого числового типа без зубрёжки и задать стартовые значения для поиска минимума и максимума?

`MinValue` и `MaxValue` — это встроенные константы, которые есть у каждого числового типа данных. Они хранят наименьшее и наибольшее возможное значение, которое способна вместить переменная выбранного типа.

## Таблица-шпаргалка по диапазонам

| Тип | Байты | `MinValue` | `MaxValue` |
| --- | --- | --- | --- |
| `byte` | 1 | `0` | `255` |
| `sbyte` | 1 | `-128` | `127` |
| `short` | 2 | `-32 768` | `32 767` |
| `ushort` | 2 | `0` | `65 535` |
| `int` | 4 | `-2 147 483 648` | `2 147 483 647` |
| `uint` | 4 | `0` | `4 294 967 295` |
| `long` | 8 | `-9 223 372 036 854 775 808` | `9 223 372 036 854 775 807` |
| `ulong` | 8 | `0` | `18 446 744 073 709 551 615` |
| `float` | 4 | `-3.4e38` | `3.4e38` |
| `double` | 8 | `-1.7e308` | `1.7e308` |
| `decimal` | 16 | `-7.9e28` | `7.9e28` |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // Выводим точные границы типов прямо в консоль
        Console.WriteLine($"int: от {int.MinValue} до {int.MaxValue}");
        Console.WriteLine($"byte: от {byte.MinValue} до {byte.MaxValue}");
        Console.WriteLine($"decimal: от {decimal.MinValue} до {decimal.MaxValue}");

        // Практический приём: поиск наименьшего числа в наборе
        int[] scores = { 42, 19, 87, 5, 63 };
        int minScore = int.MaxValue; // Берём заведомо самое большое число

        foreach (int score in scores)
        {
            if (score < minScore)
            {
                minScore = score;
            }
        }

        Console.WriteLine($"Минимальный балл: {minScore}");
    }
}

```

## Важные нюансы

* **Обращение через имя типа:** свойства вызываются напрямую у самого типа (`int.MaxValue`), а не у созданной переменной.
* **Алгоритмы поиска минимума и максимума:** при поиске наименьшего числа в списке переменной-результату удобно присвоить `int.MaxValue` (чтобы первый же элемент гарантированно оказался меньше), а при поиске наибольшего — `int.MinValue`.
* **Защита от переполнения:** зная `MaxValue`, можно заранее проверить, не выйдет ли результат сложения или умножения за пределы выбранного типа.

