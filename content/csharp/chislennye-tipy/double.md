---
title: double
keywords: double, System.Double, дробные числа, вещественный тип, плавающая точка, десятичная дробь, погрешность вычислений, точность, деление, остаток
svg: |
  ```svg
  <svg viewBox="0 0 900 280" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 900px; max-height: 280px; height: auto; display: block; margin: 0 auto 20px;">
    <style>
      .c-white { fill: var(--text-main, #ffffff); }
      .c-dark { fill: var(--bg-main, #222429); }
      .c-accent { fill: var(--domain-accent, #953dac); }
      .s-white { stroke: var(--text-main, #ffffff); }
      .s-dark { stroke: var(--bg-main, #222429); }
      .s-accent { stroke: var(--domain-accent, #953dac); }
      .mono { font-family: 'JetBrains Mono', monospace; }
  
      .float-a {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobA 3.6s ease-in-out infinite;
      }
      .float-b {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobB 3.6s ease-in-out infinite;
      }
      .feed-flow {
        stroke-dasharray: 5 5;
        animation: dashFeed 1.2s linear infinite;
      }
      .machine-hop {
        transform-box: fill-box;
        transform-origin: center bottom;
        animation: hopMachine 4.2s ease-in-out infinite;
      }
      .tape-eject {
        transform-box: fill-box;
        transform-origin: top center;
        animation: ejectTape 4.2s ease-in-out infinite;
      }
      .eyes-shock {
        transform-box: fill-box;
        transform-origin: center;
        animation: shockEyes 4.2s ease-in-out infinite;
      }
      .burst-pop {
        transform-box: fill-box;
        transform-origin: left center;
        animation: popBurst 4.2s ease-in-out infinite;
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
  
      @keyframes bobA {
        0%, 100% { transform: translateY(0px) rotate(-2deg); }
        50% { transform: translateY(-7px) rotate(2deg); }
      }
      @keyframes bobB {
        0%, 100% { transform: translateY(0px) rotate(2deg); }
        50% { transform: translateY(6px) rotate(-2deg); }
      }
      @keyframes dashFeed {
        0% { stroke-dashoffset: 20; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes hopMachine {
        0%, 24%, 76%, 100% { transform: translateY(0px) rotate(0deg); }
        32% { transform: translateY(-5px) rotate(-1deg); }
        40% { transform: translateY(1px) rotate(1deg); }
        48% { transform: translateY(-2px) rotate(0deg); }
      }
      @keyframes ejectTape {
        0%, 22%, 78%, 100% { transform: translateY(0px); }
        36%, 64% { transform: translateY(7px); }
      }
      @keyframes shockEyes {
        0%, 22%, 78%, 100% { transform: translate(0px, 0px); }
        35%, 65% { transform: translate(2px, 3px); }
      }
      @keyframes popBurst {
        0%, 30%, 70%, 100% { transform: scale(0.75); opacity: 0.25; }
        42%, 58% { transform: scale(1.12); opacity: 1; }
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
    <g transform="translate(232, 38)">
      <g class="cloud-drift-1">
        <path d="M -22 7 H 22 C 27 7 31 3 31 -1 C 31 -5 27 -8 23 -8 C 21 -14 15 -17 9 -15 C 5 -20 -3 -20 -7 -15 C -13 -16 -18 -12 -18 -6 C -23 -6 -26 -2 -26 2 C -26 5 -24 7 -22 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
    <g transform="translate(646, 36)">
      <g class="cloud-drift-2">
        <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- LEFT SECTION: Floating-Point Operands 0.1 + 0.2 -->
    <!-- Connector Lines to Adder -->
    <path d="M 164 94 H 242 V 134 H 294" class="s-white feed-flow" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 164 196 H 242 V 156 H 294" class="s-white feed-flow" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="242" cy="145" r="11" class="c-dark s-white" stroke-width="1.75" />
    <path d="M 242 140 V 150 M 237 145 H 247" class="s-white" stroke-width="2" stroke-linecap="round" />
  
    <!-- Top Floating Bubble: 0.1 -->
    <g transform="translate(122, 94)">
      <g class="float-a">
        <!-- Balloon String & Floating Point Dot -->
        <path d="M 0 24 C -4 32, 4 38, 0 46" class="s-white" stroke-width="1.75" stroke-linecap="round" />
        <circle cx="0" cy="48" r="3" class="c-white" />
        <!-- White Pill Balloon -->
        <rect x="-44" y="-24" width="88" height="48" rx="24" class="c-white s-dark" stroke-width="2.2" />
        <rect x="-36" y="-17" width="72" height="34" rx="17" class="c-dark" />
        <circle cx="-4" cy="6" r="2.8" class="c-accent" />
        <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="18" font-weight="700">0.1</text>
      </g>
    </g>
  
    <!-- Bottom Floating Bubble: 0.2 -->
    <g transform="translate(122, 196)">
      <g class="float-b">
        <!-- Balloon String & Floating Point Dot -->
        <path d="M 0 24 C 4 32, -4 38, 0 46" class="s-white" stroke-width="1.75" stroke-linecap="round" />
        <circle cx="0" cy="48" r="3" class="c-white" />
        <!-- White Pill Balloon -->
        <rect x="-44" y="-24" width="88" height="48" rx="24" class="c-white s-dark" stroke-width="2.2" />
        <rect x="-36" y="-17" width="72" height="34" rx="17" class="c-dark" />
        <circle cx="-4" cy="6" r="2.8" class="c-accent" />
        <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="18" font-weight="700">0.2</text>
      </g>
    </g>
  
    <!-- CENTER SECTION: Whimsical Floating-Point Adder / Receipt Printer (double) -->
    <g transform="translate(450, 128)">
      <g class="machine-hop">
        <!-- Grotesque Surprised Doka Eyes perched on top -->
        <g transform="translate(-48, -76)">
          <ellipse cx="-14" cy="0" rx="12" ry="15" class="c-white s-dark" stroke-width="2.2" />
          <ellipse cx="12" cy="0" rx="12" ry="15" class="c-white s-dark" stroke-width="2.2" />
          <g class="eyes-shock">
            <circle cx="-13" cy="2" r="4" class="c-dark" />
            <circle cx="13" cy="2" r="4" class="c-dark" />
          </g>
        </g>
  
        <!-- Stubby Mechanical Legs -->
        <path d="M -112 64 L -118 78 H -90 L -95 64 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <path d="M 95 64 L 90 78 H 118 L 112 64 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
        <!-- Main White Machine Body -->
        <rect x="-152" y="-66" width="304" height="130" rx="18" class="c-white s-dark" stroke-width="2.5" />
  
        <!-- Dark Window Header Bar -->
        <path d="M -134 -66 H 134 Q 152 -66 152 -48 V -34 H -152 V -48 Q -152 -66 -134 -66 Z" class="c-dark s-white" stroke-width="1.75" />
        <line x1="-151" y1="-34" x2="151" y2="-34" class="s-dark" stroke-width="2.5" />
  
        <!-- 3 Header Dots -->
        <circle cx="-128" cy="-50" r="4" class="c-accent" />
        <circle cx="-114" cy="-50" r="4" class="c-white" />
        <circle cx="-100" cy="-50" r="4" class="c-white" />
  
        <!-- Header Type Pill: double -->
        <rect x="52" y="-60" width="82" height="20" rx="10" class="c-accent" />
        <text x="93" y="-46" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">double</text>
  
        <!-- Formula Display Screen -->
        <rect x="-134" y="-20" width="268" height="36" rx="8" class="c-dark" />
        <text x="-48" y="4" text-anchor="middle" class="c-white mono" font-size="16" font-weight="700">0.1 + 0.2</text>
        <!-- Equals Badge -->
        <rect x="20" y="-13" width="28" height="22" rx="6" class="c-accent" />
        <text x="34" y="4" text-anchor="middle" class="c-white mono" font-size="16" font-weight="700">=</text>
        <!-- Mantissa Bit Strip -->
        <rect x="58" y="-12" width="64" height="20" rx="5" class="c-white" />
        <rect x="63" y="-7" width="10" height="10" rx="2" class="c-accent" />
        <rect x="77" y="-7" width="10" height="10" rx="2" class="c-dark" />
        <rect x="91" y="-7" width="10" height="10" rx="2" class="c-accent" />
        <rect x="105" y="-7" width="12" height="10" rx="2" class="c-accent" />
  
        <!-- Printer Slot Mouth -->
        <rect x="-134" y="28" width="268" height="14" rx="7" class="c-dark" />
  
        <!-- Ejecting Receipt Paper Tape with Precision Tail -->
        <g transform="translate(0, 35)">
          <g class="tape-eject">
            <path d="M -122 0
                     H 122
                     V 56
                     L 110 49
                     L 98 56
                     L 86 49
                     L 74 56
                     L 62 49
                     L 50 56
                     L 38 49
                     L 26 56
                     L 14 49
                     L 2 56
                     L -10 49
                     L -22 56
                     L -34 49
                     L -46 56
                     L -58 49
                     L -70 56
                     L -82 49
                     L -94 56
                     L -106 49
                     L -122 56 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
  
            <!-- Highlight box around the sneaky trailing '4' -->
            <rect x="95" y="10" width="20" height="26" rx="5" class="c-accent" />
            <text x="-8" y="29" text-anchor="middle" class="c-dark mono" font-size="16" font-weight="700">0.3000000000000000</text>
            <text x="105" y="29" text-anchor="middle" class="c-white mono" font-size="16" font-weight="700">4</text>
          </g>
        </g>
      </g>
    </g>
  
    <!-- Kinetic Burst Rays around the sneaky trailing '4' -->
    <g transform="translate(584, 186)">
      <g class="burst-pop">
        <line x1="6" y1="-6" x2="24" y2="-18" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="10" y1="6" x2="32" y2="8" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="4" y1="18" x2="20" y2="30" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="28" cy="-5" r="3" class="c-white" />
        <circle cx="24" cy="20" r="2.5" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Starburst & Dark Capsule Badges -->
    <!-- Connector Lines -->
    <circle cx="602" cy="128" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 606 128 H 636 V 96 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 636 128 V 196 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Badge: Starburst + System.Double Capsule -->
    <g transform="translate(748, 96)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-46 14,-28 42,-36 34,-12 62,0 34,12 42,36 14,28 0,46 -14,28 -42,36 -34,12 -62,0 -34,-12 -42,-36 -14,-28" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-78" y="-19" width="156" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">System.Double</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: IEEE 754 64-Bit Capsule -->
    <g transform="translate(748, 196)">
      <g class="pill-float">
        <rect x="-82" y="-19" width="164" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
        <circle cx="-64" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">64-bit · ±1.7e308</text>
      </g>
    </g>
  </svg>
  ```
---

# Дробный тип double

Какой тип выбрать по умолчанию для чисел с точкой и почему результат сложения `0.1 + 0.2` может удивить?

`double` (от англ. *double precision* — двойная точность) — главный базовый тип для хранения дробных чисел (с плавающей точкой). Любое число с точкой в коде компилятор по умолчанию воспринимает именно как `double`.

## Основные характеристики

* **Размер в памяти:** 8 байт (64 бита).
* **Точность:** 15–17 значащих цифр.
* **Диапазон значений:** от `±5.0e-324` до `±1.7e308`.
* **Полное имя типа:** `System.Double`.
* **Значение по умолчанию:** `0.0`.

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        double temperature = 36.6;
        double pi = 3.1415926535;

        // Чтобы при делении целых чисел получить дробь, хотя бы одно должно быть double
        double half = 5.0 / 2; // Получится 2.5

        // Особенность двоичной арифметики с плавающей точкой
        double sum = 0.1 + 0.2; // В памяти будет 0.30000000000000004

        Console.WriteLine($"Температура: {temperature}, половина: {half}");
        Console.WriteLine($"0.1 + 0.2 = {sum}");
    }
}

```

## Важные нюансы

* **Разделитель в коде — только точка:** в самом коде дробная часть всегда отделяется точкой (`3.14`), запятая вызовет ошибку компиляции. При выводе в консоль формат зависит от настроек системы (в русской локали выведется запятая `3,14`).
* **Погрешность вычислений:** из-за перевода десятичных дробей в двоичную систему компьютера числа вроде `0.1` или `0.2` хранятся с крошечной погрешностью. Для точных финансовых расчётов и денег вместо `double` используют тип `decimal`.
* **Деление на ноль без сбоя:** в отличие от целых чисел, деление `double` на `0.0` не останавливает программу с ошибкой, а возвращает специальные значения бесконечности (`Infinity`, `-Infinity`) или «не число» (`NaN`).

