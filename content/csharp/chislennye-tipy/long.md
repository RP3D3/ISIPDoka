---
title: long
keywords: long, System.Int64, большие целые числа, тип данных, суффикс L, диапазон значений, 64 бита, переменная, квинтиллион
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
  
      .crane-hoist {
        transform-box: fill-box;
        transform-origin: top center;
        animation: hoistDrop 4.5s ease-in-out infinite;
      }
      .cable-stretch {
        transform-box: fill-box;
        transform-origin: top center;
        animation: stretchCable 4.5s ease-in-out infinite;
      }
      .burst-pulse {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: pulseBurst 4.5s ease-in-out infinite;
      }
      .int-wobble {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: wobbleInt 4.5s ease-in-out infinite;
      }
      .eye-watch {
        transform-box: fill-box;
        transform-origin: center;
        animation: watchBlock 4.5s ease-in-out infinite;
      }
      .upgrade-flow {
        stroke-dasharray: 5 5;
        animation: flowUpgrade 1.2s linear infinite;
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
  
      @keyframes hoistDrop {
        0%, 16%, 72%, 100% { transform: translateY(0px); }
        38%, 56% { transform: translateY(20px); }
      }
      @keyframes stretchCable {
        0%, 16%, 72%, 100% { transform: scaleY(1); }
        38%, 56% { transform: scaleY(1.75); }
      }
      @keyframes pulseBurst {
        0%, 34%, 66%, 100% { transform: scale(0.8); opacity: 0; }
        42%, 54% { transform: scale(1.1); opacity: 1; }
      }
      @keyframes wobbleInt {
        0%, 24%, 76%, 100% { transform: rotate(0deg); }
        32% { transform: rotate(-1.5deg); }
        40% { transform: rotate(1.5deg); }
        48% { transform: rotate(-0.8deg); }
        56% { transform: rotate(0deg); }
      }
      @keyframes watchBlock {
        0%, 16%, 72%, 100% { transform: translate(2px, -2px); }
        38%, 56% { transform: translate(3px, 2px); }
      }
      @keyframes flowUpgrade {
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
    <g transform="translate(154, 48)">
      <g class="cloud-drift-1">
        <path d="M -24 8 H 24 C 30 8 34 4 34 -1 C 34 -6 30 -9 25 -9 C 23 -16 17 -19 10 -17 C 6 -23 -3 -23 -7 -17 C -14 -18 -19 -14 -19 -7 C -25 -7 -28 -3 -28 2 C -28 5 -26 8 -24 8 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
    <g transform="translate(652, 38)">
      <g class="cloud-drift-2">
        <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- LEFT SECTION: Cramped 32-bit int Box -->
    <g transform="translate(142, 186)">
      <g class="int-wobble">
        <!-- Grotesque Doka Eyes perched on top -->
        <g transform="translate(0, -56)">
          <ellipse cx="-11" cy="0" rx="10" ry="13" class="c-white s-dark" stroke-width="2" />
          <ellipse cx="11" cy="0" rx="10" ry="13" class="c-white s-dark" stroke-width="2" />
          <g class="eye-watch">
            <circle cx="-11" cy="0" r="3.5" class="c-dark" />
            <circle cx="11" cy="0" r="3.5" class="c-dark" />
          </g>
        </g>
  
        <!-- Small Feet -->
        <path d="M -38 44 L -43 54 H -23 L -27 44 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <path d="M 27 44 L 23 54 H 43 L 38 44 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
        <!-- Compact White Box -->
        <rect x="-56" y="-44" width="112" height="88" rx="14" class="c-white s-dark" stroke-width="2.2" />
  
        <!-- Dark Header Strip -->
        <path d="M -42 -44 H 42 Q 56 -44 56 -30 V -18 H -56 V -30 Q -56 -44 -42 -44 Z" class="c-dark s-white" stroke-width="1.75" />
        <line x1="-55" y1="-18" x2="55" y2="-18" class="s-dark" stroke-width="2" />
        <text x="0" y="-26" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">int · 32b</text>
  
        <!-- Cramped Readout -->
        <rect x="-44" y="-8" width="88" height="26" rx="6" class="c-dark" />
        <text x="0" y="9" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">2B MAX!</text>
  
        <!-- Maxed-out Capacity Bar -->
        <rect x="-44" y="24" width="88" height="10" rx="5" class="c-dark" />
        <rect x="-41" y="27" width="82" height="4" rx="2" class="c-accent" />
      </g>
    </g>
  
    <!-- Upgrade Flow Arrow from int to long -->
    <g transform="translate(204, 186)">
      <line x1="0" y1="0" x2="64" y2="0" class="s-white upgrade-flow" stroke-width="2.2" stroke-linecap="round" />
      <path d="M 58 -5 L 66 0 L 58 5" class="s-white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="14" y="-22" width="34" height="16" rx="8" class="c-dark s-white" stroke-width="1.5" />
      <text x="31" y="-11" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">×2</text>
    </g>
  
    <!-- CENTER SECTION: Industrial Tower Crane & Extended 64-bit long Container -->
    <!-- Crane Mast & Horizontal Boom -->
    <g transform="translate(284, 48)">
      <!-- Vertical Lattice Tower -->
      <rect x="-10" y="12" width="20" height="180" class="c-dark s-white" stroke-width="1.75" />
      <path d="M -9 28 L 9 48 L -9 68 L 9 88 L -9 108 L 9 128 L -9 148 L 9 168 L -9 188" class="s-white" stroke-width="1.5" stroke-linejoin="round" />
      <!-- Mast Base Foot -->
      <path d="M -18 192 H 18 L 12 182 H -12 Z" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
  
      <!-- Horizontal Crane Boom -->
      <rect x="-36" y="0" width="340" height="14" rx="4" class="c-dark s-white" stroke-width="1.75" />
      <!-- Boom Top Apex & Stay Cables -->
      <polygon points="-10,0 0,-18 10,0" class="c-white s-dark" stroke-width="1.75" stroke-linejoin="round" />
      <line x1="0" y1="-18" x2="-30" y2="0" class="s-white" stroke-width="1.5" />
      <line x1="0" y1="-18" x2="260" y2="0" class="s-white" stroke-width="1.5" />
  
      <!-- Counterweight on Left -->
      <rect x="-34" y="14" width="20" height="24" rx="4" class="c-white s-dark" stroke-width="2" />
      <rect x="-30" y="20" width="12" height="5" rx="2" class="c-accent" />
  
      <!-- Crane Operator Cab with Doka Eyes -->
      <g transform="translate(10, 22)">
        <rect x="0" y="0" width="38" height="32" rx="8" class="c-white s-dark" stroke-width="2" />
        <rect x="16" y="5" width="18" height="16" rx="4" class="c-dark" />
        <circle cx="21" cy="13" r="3" class="c-white" />
        <circle cx="29" cy="13" r="3" class="c-white" />
        <g class="eye-watch">
          <circle cx="21" cy="13" r="1.4" class="c-dark" />
          <circle cx="29" cy="13" r="1.4" class="c-dark" />
        </g>
        <rect x="4" y="24" width="30" height="4" rx="2" class="c-accent" />
      </g>
  
      <!-- Trolley & Hoist Mechanism at X = 264 (Absolute X = 548) -->
      <g transform="translate(264, 14)">
        <!-- Trolley Carriage -->
        <rect x="-14" y="-4" width="28" height="10" rx="4" class="c-white s-dark" stroke-width="2" />
        <!-- Stretching Cable -->
        <g class="cable-stretch">
          <line x1="0" y1="6" x2="0" y2="28" class="s-white" stroke-width="2.2" stroke-linecap="round" />
        </g>
        <!-- Lowering Hook + Suffix L Block -->
        <g transform="translate(0, 28)">
          <g class="crane-hoist">
            <!-- Pulley & Hook -->
            <circle cx="0" cy="0" r="5" class="c-dark s-white" stroke-width="1.75" />
            <path d="M 0 5 C 6 5, 6 13, 0 13 C -4 13, -5 10, -3 8" class="s-white" stroke-width="2" stroke-linecap="round" />
            <!-- Chunky Suffix 'L' Block -->
            <rect x="-26" y="13" width="52" height="42" rx="9" class="c-white s-dark" stroke-width="2.4" />
            <rect x="-20" y="18" width="40" height="32" rx="5" class="c-accent" />
            <text x="0" y="42" text-anchor="middle" class="c-white mono" font-size="24" font-weight="700">L</text>
          </g>
        </g>
      </g>
    </g>
  
    <!-- Main Extended 64-Bit Container (long) -->
    <g transform="translate(454, 174)">
      <!-- Heavy Support Feet -->
      <path d="M -116 66 L -124 78 H -92 L -98 66 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
      <path d="M 98 66 L 92 78 H 124 L 116 66 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
      <!-- Stepped White Housing (Tall left body + open right docking bay for 'L') -->
      <path d="M -130 -64
               H 42
               Q 60 -64 60 -46
               V -26
               H 130
               Q 148 -26 148 -8
               V 48
               Q 148 66 130 66
               H -130
               Q -148 66 -148 48
               V -46
               Q -148 -64 -130 -64 Z" class="c-white s-dark" stroke-width="2.5" stroke-linejoin="round" />
  
      <!-- Dark Header Bar on Left Tall Section -->
      <path d="M -130 -64 H 42 Q 60 -64 60 -46 V -32 H -148 V -46 Q -148 -64 -130 -64 Z" class="c-dark s-white" stroke-width="1.75" />
      <line x1="-147" y1="-32" x2="59" y2="-32" class="s-dark" stroke-width="2.5" />
  
      <!-- 3 Doka Window Dots -->
      <circle cx="-126" cy="-48" r="4" class="c-accent" />
      <circle cx="-112" cy="-48" r="4" class="c-white" />
      <circle cx="-98" cy="-48" r="4" class="c-white" />
  
      <!-- Header Type Pill: long -->
      <rect x="-18" y="-58" width="66" height="20" rx="10" class="c-accent" />
      <text x="15" y="-44" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">long</text>
  
      <!-- Recessed Number Display Screen -->
      <rect x="-132" y="-16" width="192" height="44" rx="9" class="c-dark" />
      <rect x="-126" y="-10" width="180" height="32" rx="6" class="c-white" />
      <text x="-36" y="13" text-anchor="middle" class="c-dark mono" font-size="17" font-weight="700">10 000 000 000</text>
  
      <!-- Docking Socket Indicator on Right Deck -->
      <rect x="66" y="-16" width="56" height="44" rx="9" class="c-dark" />
      <rect x="71" y="-11" width="46" height="34" rx="6" class="s-white" stroke-width="1.5" stroke-dasharray="4 3" />
  
      <!-- Double 32-Bit + 32-Bit = 64-Bit Capacity Bar -->
      <rect x="-132" y="38" width="264" height="16" rx="8" class="c-dark" />
      <rect x="-128" y="42" width="125" height="8" rx="4" class="c-accent" />
      <rect x="3" y="42" width="125" height="8" rx="4" class="c-accent" />
      <!-- Center Divider Tick -->
      <rect x="-2" y="38" width="4" height="16" class="c-white" />
    </g>
  
    <!-- Kinetic Burst Rays at Suffix L Docking Point -->
    <g transform="translate(592, 134)">
      <g class="burst-pulse">
        <line x1="4" y1="-4" x2="22" y2="-20" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="10" y1="8" x2="32" y2="4" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="-6" y1="-10" x2="-2" y2="-30" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="26" cy="-8" r="3" class="c-white" />
        <circle cx="10" cy="-26" r="2.5" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Starburst & Dark Capsule Badges -->
    <!-- Connector Lines -->
    <circle cx="602" cy="182" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 606 182 H 636 V 104 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 636 182 V 198 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Badge: Starburst + System.Int64 Capsule -->
    <g transform="translate(748, 104)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-46 14,-28 42,-36 34,-12 62,0 34,12 42,36 14,28 0,46 -14,28 -42,36 -34,12 -62,0 -34,-12 -42,-36 -14,-28" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-74" y="-19" width="148" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">System.Int64</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: Signed 64-Bit Range Capsule -->
    <g transform="translate(748, 198)">
      <g class="pill-float">
        <rect x="-82" y="-19" width="164" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
        <circle cx="-64" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">-2⁶³ … 2⁶³-1</text>
      </g>
    </g>
  </svg>
---

# Целочисленный тип long

Что делать, если число превышает предел обычного `int` в два миллиарда, и зачем в конце ставить букву `L`?

`long` (от англ. *long integer* — длинное целое) — целочисленный тип данных повышенной вместимости. Он нужен для работы с огромными числами: населением планеты, расстояниями в космосе, идентификаторами в крупных базах данных или временем в миллисекундах.

## Основные характеристики

* **Размер в памяти:** 8 байт (64 бита) — в два раза больше, чем у `int`.
* **Диапазон значений:** от `-9 223 372 036 854 775 808` до `9 223 372 036 854 775 807` (более ±9 квинтиллионов).
* **Полное имя типа:** `System.Int64`.
* **Значение по умолчанию:** `0L`.

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // Большое число с разделителями разрядов для удобства чтения
        long worldPopulation = 8_100_000_000;

        // Суффикс L явно указывает компилятору, что это тип long
        long distanceToSun = 149_600_000_000L;

        // Любой int автоматически помещается в long без ошибок
        int smallNumber = 500;
        long bigNumber = smallNumber;

        Console.WriteLine($"Население Земли: {worldPopulation}");
        Console.WriteLine($"Максимум для long: {long.MaxValue}");
    }
}

```

## Важные нюансы

* **Заглавная буква `L`:** при записи числа в коде можно добавить суффикс `L` (`100L`), чтобы компилятор сразу воспринимал его как `long`. Используйте именно заглавную `L`, так как строчная `l` визуально сливается с единицей `1`.
* **Неявное расширение:** любое число типа `int` можно спокойно записать в переменную `long` без дополнительных преобразований — места хватит с запасом. Обратная запись (`long` в `int`) напрямую запрещена, так как число может не поместиться.
* **Расход памяти:** `long` занимает 8 байт вместо 4, поэтому не стоит использовать его для простых счётчиков или возраста, если число заведомо меньше двух миллиардов.

