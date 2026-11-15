---
title: +, -, *. /, %
keywords: арифметические операторы, сложение, вычитание, умножение, деление, остаток от деления, целочисленное деление, приоритет операций, математика, вычисления
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
  
      .hand-left {
        transform-box: fill-box;
        transform-origin: left bottom;
        animation: swayLeft 4s ease-in-out infinite;
      }
      .hand-right {
        transform-box: fill-box;
        transform-origin: right bottom;
        animation: chopRight 4s ease-in-out infinite;
      }
      .pie-spin {
        transform-box: fill-box;
        transform-origin: center;
        animation: tiltPie 4s ease-in-out infinite;
      }
      .slice-pop {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: popSlice 4s ease-in-out infinite;
      }
      .op-float-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatOp1 3.4s ease-in-out infinite;
      }
      .op-float-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatOp2 3.8s ease-in-out infinite;
      }
      .op-float-3 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatOp3 3.2s ease-in-out infinite;
      }
      .op-float-4 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatOp4 3.6s ease-in-out infinite;
      }
      .burst-rays {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: flashRays 4s ease-in-out infinite;
      }
  
      @keyframes swayLeft {
        0%, 100% { transform: rotate(0deg) translateY(0px); }
        50% { transform: rotate(-2.5deg) translateY(-4px); }
      }
      @keyframes chopRight {
        0%, 20%, 78%, 100% { transform: rotate(0deg) translate(0px, 0px); }
        40%, 58% { transform: rotate(-7deg) translate(-10px, 8px); }
      }
      @keyframes tiltPie {
        0%, 100% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
      }
      @keyframes popSlice {
        0%, 24%, 76%, 100% { transform: translate(0px, 0px) rotate(0deg); }
        42%, 60% { transform: translate(22px, -22px) rotate(10deg); }
      }
      @keyframes floatOp1 {
        0%, 100% { transform: translateY(0px) rotate(-6deg); }
        50% { transform: translateY(-7px) rotate(-2deg); }
      }
      @keyframes floatOp2 {
        0%, 100% { transform: translateY(0px) rotate(5deg); }
        50% { transform: translateY(6px) rotate(9deg); }
      }
      @keyframes floatOp3 {
        0%, 100% { transform: translateY(0px) rotate(4deg); }
        50% { transform: translateY(-6px) rotate(0deg); }
      }
      @keyframes floatOp4 {
        0%, 100% { transform: translateY(0px) rotate(-4deg); }
        50% { transform: translateY(7px) rotate(-8deg); }
      }
      @keyframes flashRays {
        0%, 28%, 74%, 100% { transform: scale(0.75); opacity: 0.2; }
        44%, 58% { transform: scale(1.12); opacity: 1; }
      }
  
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transform: none !important;
          opacity: 1 !important;
        }
      }
    </style>
  
    <!-- Orbiting Arithmetic Operator Chips (+, -, *, /) -->
    <g transform="translate(108, 66)">
      <g class="op-float-1">
        <rect x="-24" y="-24" width="48" height="48" rx="14" class="c-dark s-white" stroke-width="2" />
        <text x="0" y="9" text-anchor="middle" class="c-white mono" font-size="24" font-weight="700">+</text>
      </g>
    </g>
  
    <g transform="translate(238, 48)">
      <g class="op-float-2">
        <circle cx="0" cy="0" r="22" class="c-white s-dark" stroke-width="2.2" />
        <text x="0" y="8" text-anchor="middle" class="c-dark mono" font-size="24" font-weight="700">-</text>
      </g>
    </g>
  
    <g transform="translate(656, 48)">
      <g class="op-float-3">
        <circle cx="0" cy="0" r="22" class="c-white s-dark" stroke-width="2.2" />
        <text x="0" y="10" text-anchor="middle" class="c-dark mono" font-size="24" font-weight="700">*</text>
      </g>
    </g>
  
    <g transform="translate(796, 72)">
      <g class="op-float-4">
        <rect x="-24" y="-24" width="48" height="48" rx="14" class="c-dark s-white" stroke-width="2" />
        <text x="0" y="8" text-anchor="middle" class="c-white mono" font-size="22" font-weight="700">/</text>
      </g>
    </g>
  
    <!-- CENTRAL SCENE: Giant Pie of 10 Divided by 3, Popping Out Remainder 1 -->
    <g transform="translate(432, 152)">
      <g class="pie-spin">
        <!-- Main 9/10 Pie Body (3 Equal Sectors of 3) -->
        <circle cx="0" cy="0" r="94" class="c-white s-dark" stroke-width="2.6" />
        <circle cx="0" cy="0" r="78" class="c-dark" />
  
        <!-- Sector Divider Lines (3 equal parts of 3) -->
        <line x1="0" y1="0" x2="0" y2="-78" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="0" y1="0" x2="74" y2="24" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="0" y1="0" x2="-68" y2="38" class="s-white" stroke-width="2.5" stroke-linecap="round" />
  
        <!-- Three Equal Shares of "3" -->
        <text x="-34" y="-22" text-anchor="middle" class="c-white mono" font-size="26" font-weight="700">3</text>
        <text x="4" y="48" text-anchor="middle" class="c-white mono" font-size="26" font-weight="700">3</text>
        <text x="38" y="-18" text-anchor="middle" class="c-white mono" font-size="26" font-weight="700">3</text>
  
        <!-- Center Hub Pin -->
        <circle cx="0" cy="0" r="10" class="c-white s-dark" stroke-width="2.2" />
        <circle cx="0" cy="0" r="4" class="c-accent" />
      </g>
  
      <!-- Popping Out Remainder Slice ("1" / "%") -->
      <g transform="translate(46, -46)">
        <g class="slice-pop">
          <!-- Wedge Slice -->
          <path d="M -26 26 L 10 -46 A 84 84 0 0 1 56 -8 Z" class="c-white s-dark" stroke-width="2.5" stroke-linejoin="round" />
          <path d="M -14 14 L 12 -36 A 66 66 0 0 1 46 -8 Z" class="c-accent" />
          <text x="20" y="-8" text-anchor="middle" class="c-white mono" font-size="20" font-weight="700">1</text>
  
          <!-- Attached Floating Tag: 10 % 3 = 1 -->
          <g transform="translate(88, -22)">
            <rect x="-56" y="-17" width="112" height="34" rx="17" class="c-dark s-white" stroke-width="2" />
            <circle cx="-40" cy="0" r="4.5" class="c-accent" />
            <text x="7" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">10 % 3 = 1</text>
          </g>
        </g>
      </g>
    </g>
  
    <!-- Kinetic Burst Rays around Popping Remainder -->
    <g transform="translate(534, 62)">
      <g class="burst-rays">
        <line x1="0" y1="0" x2="16" y2="-16" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="8" y1="10" x2="26" y2="6" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="-10" y1="-6" x2="-8" y2="-24" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="20" cy="-6" r="3" class="c-white" />
      </g>
    </g>
  
    <!-- LEFT FOREGROUND: Big Editorial Hand Holding the Base & Badge "10 / 3 = 3" -->
    <g transform="translate(184, 212)">
      <g class="hand-left">
        <!-- Diagonal Sleeve from Bottom-Left -->
        <path d="M -154 78 L -28 -6 L -8 28 L -116 96 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M -38 0 L -14 -15 L 6 19 L -18 34 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
        <circle cx="-14" cy="16" r="2.8" class="c-dark" />
  
        <!-- Cartoon Round Hand Supporting the Pie -->
        <circle cx="14" cy="-12" r="26" class="c-white s-dark" stroke-width="2.5" />
        <path d="M 0 -20 L 8 -17" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <path d="M -2 -10 L 6 -8" class="s-dark" stroke-width="2" stroke-linecap="round" />
  
        <!-- Bold Result Pill Held by Left Hand: 10 / 3 = 3 -->
        <g transform="translate(76, 18)">
          <rect x="-64" y="-20" width="128" height="40" rx="20" class="c-white s-dark" stroke-width="2.4" />
          <rect x="-57" y="-14" width="114" height="28" rx="14" class="c-dark" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">10 / 3 = 3</text>
        </g>
      </g>
    </g>
  
    <!-- RIGHT FOREGROUND: Big Editorial Hand Wielding Giant "%" Divider Cleaver -->
    <g transform="translate(718, 206)">
      <g class="hand-right">
        <!-- Giant "%" Divider Tool -->
        <g transform="translate(-54, -44) rotate(-28)">
          <!-- Slash Blade -->
          <rect x="-6" y="-58" width="12" height="116" rx="6" class="c-white s-dark" stroke-width="2.4" />
          <line x1="0" y1="-44" x2="0" y2="44" class="s-accent" stroke-width="3" stroke-linecap="round" />
          <!-- Upper Ring of % -->
          <circle cx="-24" cy="-24" r="15" class="c-white s-dark" stroke-width="2.4" />
          <circle cx="-24" cy="-24" r="6" class="c-accent" />
          <!-- Lower Ring of % -->
          <circle cx="24" cy="24" r="15" class="c-white s-dark" stroke-width="2.4" />
          <circle cx="24" cy="24" r="6" class="c-accent" />
        </g>
  
        <!-- Diagonal Sleeve from Bottom-Right -->
        <path d="M 154 84 L 22 -4 L 2 30 L 116 102 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M 32 2 L 8 -13 L -12 21 L 12 36 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
        <circle cx="8" cy="18" r="2.8" class="c-dark" />
  
        <!-- Cartoon Round Hand Gripping the "%" Tool -->
        <circle cx="-18" cy="-12" r="26" class="c-white s-dark" stroke-width="2.5" />
        <path d="M -12 -17 L -4 -20" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <path d="M -10 -8 L -2 -10" class="s-dark" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
  </svg>
---

# Базовые арифметические операторы

Как выполнять математические расчёты в коде, получить остаток от деления и не потерять дробную часть?

Арифметические операторы позволяют складывать, вычитать, умножать и делить числа, а также находить остаток от деления. Они работают со всеми числовыми типами данных (`int`, `long`, `double`, `float`, `decimal`).

## Таблица операторов

| Оператор | Название | Пример | Результат |
| --- | --- | --- | --- |
| `+` | Сложение | `10 + 3` | `13` |
| `-` | Вычитание | `10 - 3` | `7` |
| `*` | Умножение | `10 * 3` | `30` |
| `/` | Деление | `10 / 3` | `3` (для целых) или `3.333...` (для дробных) |
| `%` | Остаток от деления | `10 % 3` | `1` |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        int a = 10;
        int b = 3;

        Console.WriteLine($"Сложение: {a + b}");       // 13
        Console.WriteLine($"Вычитание: {a - b}");      // 7
        Console.WriteLine($"Умножение: {a * b}");      // 30

        // Деление двух целых чисел отбрасывает дробную часть
        Console.WriteLine($"Целочисленное деление: {a / b}"); // 3

        // Чтобы получить дробь, хотя бы одно число должно быть дробным
        Console.WriteLine($"Точное деление: {(double)a / b}"); // 3.3333333333333335

        // Остаток от деления (%)
        int remainder = a % b;        // 1 (так как 10 = 3 * 3 + 1)
        bool isEven = (a % 2 == 0);   // Проверка на чётность: true

        Console.WriteLine($"Остаток: {remainder}, число чётное: {isEven}");
    }
}

```

## Важные нюансы

* **Ловушка целочисленного деления:** если оба числа имеют тип `int`, оператор `/` не округляет результат, а просто отрезает дробную часть (`7 / 2` вернёт `3`). Чтобы получить `3.5`, запишите одно из чисел как дробное (`7.0 / 2`) или приведите тип явно: `(double)a / b`.
* **Зачем нужен остаток `%`:** с его помощью проверяют кратность и чётность чисел (`x % 2 == 0`), отделяют последнюю цифру числа (`x % 10`) или зацикливают счётчики по кругу.
* **Приоритет и деление на ноль:** операции `*`, `/` и `%` всегда выполняются раньше `+` и `-` — изменить порядок можно круглыми скобками `(...)`. Деление целого числа на `0` аварийно завершит программу с ошибкой `DivideByZeroException`.

