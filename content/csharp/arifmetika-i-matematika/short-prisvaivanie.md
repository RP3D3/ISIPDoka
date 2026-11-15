---
title: Сокращённое присваивание
keywords: сокращённое присваивание, составные операторы, обновление переменной, сложение с присваиванием, вычитание, умножение, деление, остаток, компактный код
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
  
      .press-left {
        transform-box: fill-box;
        transform-origin: left bottom;
        animation: pushLeft 3.8s ease-in-out infinite;
      }
      .press-right {
        transform-box: fill-box;
        transform-origin: right bottom;
        animation: pushRight 3.8s ease-in-out infinite;
      }
      .block-left {
        transform-box: fill-box;
        transform-origin: right center;
        animation: slideBlockL 3.8s ease-in-out infinite;
      }
      .block-right {
        transform-box: fill-box;
        transform-origin: left center;
        animation: slideBlockR 3.8s ease-in-out infinite;
      }
      .core-pulse {
        transform-box: fill-box;
        transform-origin: center;
        animation: pulseCore 3.8s ease-in-out infinite;
      }
      .ghost-pop {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: popGhost 3.8s ease-in-out infinite;
      }
      .chip-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatChip1 3.4s ease-in-out infinite;
      }
      .chip-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatChip2 3.8s ease-in-out infinite;
      }
      .chip-3 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatChip3 3.2s ease-in-out infinite;
      }
      .chip-4 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatChip4 3.6s ease-in-out infinite;
      }
      .burst-top {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: flashBurst 3.8s ease-in-out infinite;
      }
  
      @keyframes pushLeft {
        0%, 16%, 84%, 100% { transform: translateX(0px) rotate(0deg); }
        40%, 60% { transform: translateX(22px) rotate(3deg); }
      }
      @keyframes pushRight {
        0%, 16%, 84%, 100% { transform: translateX(0px) rotate(0deg); }
        40%, 60% { transform: translateX(-22px) rotate(-3deg); }
      }
      @keyframes slideBlockL {
        0%, 16%, 84%, 100% { transform: translateX(0px); }
        40%, 60% { transform: translateX(22px); }
      }
      @keyframes slideBlockR {
        0%, 16%, 84%, 100% { transform: translateX(0px); }
        40%, 60% { transform: translateX(-22px); }
      }
      @keyframes pulseCore {
        0%, 28%, 72%, 100% { transform: scale(1); }
        44%, 56% { transform: scale(1.08); }
      }
      @keyframes popGhost {
        0%, 16%, 84%, 100% { transform: translateY(0px) scale(1); opacity: 0.95; }
        40%, 60% { transform: translateY(-10px) scale(0.92); opacity: 0.55; }
      }
      @keyframes floatChip1 {
        0%, 100% { transform: translateY(0px) rotate(-6deg); }
        50% { transform: translateY(-7px) rotate(-2deg); }
      }
      @keyframes floatChip2 {
        0%, 100% { transform: translateY(0px) rotate(5deg); }
        50% { transform: translateY(6px) rotate(9deg); }
      }
      @keyframes floatChip3 {
        0%, 100% { transform: translateY(0px) rotate(-4deg); }
        50% { transform: translateY(-6px) rotate(0deg); }
      }
      @keyframes floatChip4 {
        0%, 100% { transform: translateY(0px) rotate(6deg); }
        50% { transform: translateY(7px) rotate(2deg); }
      }
      @keyframes flashBurst {
        0%, 30%, 72%, 100% { transform: scale(0.75); opacity: 0.2; }
        44%, 56% { transform: scale(1.15); opacity: 1; }
      }
  
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transform: none !important;
          opacity: 1 !important;
        }
      }
    </style>
  
    <!-- Orbiting Compound Operator Chips (-=, *=, /=, %=) -->
    <g transform="translate(104, 68)">
      <g class="chip-1">
        <rect x="-32" y="-20" width="64" height="40" rx="14" class="c-dark s-white" stroke-width="2" />
        <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="18" font-weight="700">-=</text>
      </g>
    </g>
  
    <g transform="translate(232, 48)">
      <g class="chip-2">
        <circle cx="0" cy="0" r="24" class="c-white s-dark" stroke-width="2.2" />
        <text x="0" y="7" text-anchor="middle" class="c-dark mono" font-size="17" font-weight="700">*=</text>
      </g>
    </g>
  
    <g transform="translate(668, 48)">
      <g class="chip-3">
        <circle cx="0" cy="0" r="24" class="c-white s-dark" stroke-width="2.2" />
        <text x="0" y="7" text-anchor="middle" class="c-dark mono" font-size="17" font-weight="700">/=</text>
      </g>
    </g>
  
    <g transform="translate(796, 68)">
      <g class="chip-4">
        <rect x="-32" y="-20" width="64" height="40" rx="14" class="c-dark s-white" stroke-width="2" />
        <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="18" font-weight="700">%=</text>
      </g>
    </g>
  
    <!-- TOP FLOATING REFERENCE: Verbose Long Form Being Compressed (x = x + 5) -->
    <g transform="translate(450, 56)">
      <g class="ghost-pop">
        <rect x="-112" y="-18" width="224" height="36" rx="18" class="c-dark s-white" stroke-width="1.8" stroke-dasharray="5 4" />
        <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">x = x + 5</text>
        <!-- Strikethrough Accent Line over Redundant "= x" -->
        <line x1="-26" y1="0" x2="12" y2="0" class="s-accent" stroke-width="3.5" stroke-linecap="round" />
      </g>
    </g>
  
    <!-- Compression Arrows Pointing Inward -->
    <path d="M 278 156 H 302 M 295 149 L 303 156 L 295 163" class="s-white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 622 156 H 598 M 605 149 L 597 156 L 605 163" class="s-white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- CENTER HERO MECHANISM: Spring-Loaded Code Compressor ("x += 5") -->
    <!-- Accordion Spring Track Behind Blocks -->
    <path d="M 332 156 L 348 138 L 364 174 L 380 138 L 396 174 L 412 156" class="s-white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 488 156 L 504 138 L 520 174 L 536 138 L 552 174 L 568 156" class="s-white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Left Sliding Variable Block: x -->
    <g transform="translate(332, 156)">
      <g class="block-left">
        <rect x="-38" y="-36" width="76" height="72" rx="18" class="c-white s-dark" stroke-width="2.5" />
        <rect x="-30" y="-28" width="60" height="56" rx="12" class="c-dark" />
        <text x="0" y="9" text-anchor="middle" class="c-white mono" font-size="26" font-weight="700">x</text>
      </g>
    </g>
  
    <!-- Right Sliding Value Block: 5 -->
    <g transform="translate(568, 156)">
      <g class="block-right">
        <rect x="-38" y="-36" width="76" height="72" rx="18" class="c-white s-dark" stroke-width="2.5" />
        <rect x="-30" y="-28" width="60" height="56" rx="12" class="c-dark" />
        <text x="0" y="9" text-anchor="middle" class="c-white mono" font-size="26" font-weight="700">5</text>
      </g>
    </g>
  
    <!-- Central Compound Assignment Core: += -->
    <g transform="translate(450, 156)">
      <g class="core-pulse">
        <rect x="-46" y="-42" width="92" height="84" rx="20" class="c-white s-dark" stroke-width="2.6" />
        <rect x="-38" y="-34" width="76" height="68" rx="14" class="c-accent" />
        <text x="0" y="10" text-anchor="middle" class="c-white mono" font-size="28" font-weight="700">+=</text>
      </g>
    </g>
  
    <!-- Kinetic Burst Rays Above Central Core -->
    <g transform="translate(450, 102)">
      <g class="burst-top">
        <line x1="0" y1="0" x2="0" y2="-18" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="-16" y1="4" x2="-28" y2="-10" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="16" y1="4" x2="28" y2="-10" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="-14" cy="-16" r="2.8" class="c-white" />
        <circle cx="14" cy="-16" r="2.8" class="c-white" />
      </g>
    </g>
  
    <!-- LEFT FOREGROUND: Big Editorial Hand Pushing Left Block Inward -->
    <g transform="translate(262, 168)">
      <g class="press-left">
        <!-- Diagonal Sleeve from Bottom-Left -->
        <path d="M -212 122 L -46 4 L -26 38 L -174 140 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M -56 10 L -32 -6 L -12 28 L -36 44 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
        <circle cx="-32" cy="25" r="2.8" class="c-dark" />
  
        <!-- Cartoon Round Hand Pushing Against Block -->
        <circle cx="0" cy="-6" r="26" class="c-white s-dark" stroke-width="2.5" />
        <path d="M -14 -14 L -6 -11" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <path d="M -16 -4 L -8 -2" class="s-dark" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
  
    <!-- RIGHT FOREGROUND: Big Editorial Hand Pushing Right Block Inward -->
    <g transform="translate(638, 168)">
      <g class="press-right">
        <!-- Diagonal Sleeve from Bottom-Right -->
        <path d="M 212 122 L 46 4 L 26 38 L 174 140 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M 56 10 L 32 -6 L 12 28 L 36 44 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
        <circle cx="32" cy="25" r="2.8" class="c-dark" />
  
        <!-- Cartoon Round Hand Pushing Against Block -->
        <circle cx="0" cy="-6" r="26" class="c-white s-dark" stroke-width="2.5" />
        <path d="M 6 -11 L 14 -14" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <path d="M 8 -2 L 16 -4" class="s-dark" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
  </svg>
---

# Сокращённое присваивание

Как обновить значение переменной за одну короткую запись, не повторяя её имя дважды?

Составные операторы присваивания объединяют математическое действие и запись результата обратно в ту же переменную. Вместо громоздкой конструкции `score = score + 10` используют компактную форму `score += 10`.

## Таблица операторов

| Оператор | Пример | Полный аналог | Что делает |
| --- | --- | --- | --- |
| `+=` | `x += 5` | `x = x + 5` | Прибавляет значение и сохраняет результат |
| `-=` | `x -= 3` | `x = x - 3` | Вычитает значение и сохраняет результат |
| `*=` | `x *= 2` | `x = x * 2` | Умножает на значение и сохраняет результат |
| `/=` | `x /= 4` | `x = x / 4` | Делит на значение и сохраняет результат |
| `%=` | `x %= 2` | `x = x % 2` | Записывает в переменную остаток от деления |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        int health = 100;
        health -= 25; // Урон: станет 75
        health += 15; // Лечение: станет 90

        int coins = 50;
        coins *= 2;   // Бонус x2: станет 100
        coins /= 4;   // Разделили на четверых: станет 25
        coins %= 10;  // Остаток от деления на 10: станет 5

        // Оператор += работает и со строками (дописывает текст в конец)
        string status = "Игрок";
        status += " готов";

        Console.WriteLine($"{status} | Здоровье: {health}, монеты: {coins}");
    }
}

```

## Важные нюансы

* **Порядок знаков имеет значение:** знак операции всегда ставится *перед* знаком равенства (`+=`). Если перепутать и написать `x =+ 5`, ошибки не будет, но переменная просто перезапишется положительным числом `+5` вместо сложения.
* **Склейка строк через `+=`:** для строкового типа `string` оператор `+=` удобно дописывает новую фразу в конец существующего текста, а вот `-=`, `*=` и `/=` со строками не работают.
* **Скрытое приведение типов:** для компактных типов вроде `byte` запись `b += 5` сработает без дополнительных скобок, тогда как полная запись `b = b + 5` потребует явного приведения `(byte)(b + 5)`.

