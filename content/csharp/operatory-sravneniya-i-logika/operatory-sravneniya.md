---
title: Операторы сравнения
keywords: операторы сравнения, равно, не равно, больше, меньше, логический тип, true, false, условие, проверка, равенство, присваивание
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
  
      .beam-balance {
        transform-box: fill-box;
        transform-origin: center;
        animation: balanceBeam 4.4s ease-in-out infinite;
      }
      .pan-left {
        transform-box: fill-box;
        transform-origin: top center;
        animation: counterPanL 4.4s ease-in-out infinite;
      }
      .pan-right {
        transform-box: fill-box;
        transform-origin: top center;
        animation: counterPanR 4.4s ease-in-out infinite;
      }
      .fulcrum-pulse {
        transform-box: fill-box;
        transform-origin: center;
        animation: pulseFulcrum 4.4s ease-in-out infinite;
      }
      .result-pop {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: popResult 4.4s ease-in-out infinite;
      }
      .burst-top {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: flashTop 4.4s ease-in-out infinite;
      }
      .hand-left {
        transform-box: fill-box;
        transform-origin: left bottom;
        animation: swayLeft 4.4s ease-in-out infinite;
      }
      .hand-right {
        transform-box: fill-box;
        transform-origin: right bottom;
        animation: swayRight 4.4s ease-in-out infinite;
      }
      .chip-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatChip1 3.6s ease-in-out infinite;
      }
      .chip-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatChip2 3.8s ease-in-out infinite;
      }
      .chip-3 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatChip3 3.4s ease-in-out infinite;
      }
      .chip-4 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatChip4 3.7s ease-in-out infinite;
      }
  
      @keyframes balanceBeam {
        0%, 100% { transform: rotate(0deg); }
        22% { transform: rotate(-5deg); }
        50% { transform: rotate(4deg); }
        72% { transform: rotate(0deg); }
      }
      @keyframes counterPanL {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        22% { transform: translateY(10px) rotate(5deg); }
        50% { transform: translateY(-8px) rotate(-4deg); }
        72% { transform: translateY(0px) rotate(0deg); }
      }
      @keyframes counterPanR {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        22% { transform: translateY(-10px) rotate(5deg); }
        50% { transform: translateY(8px) rotate(-4deg); }
        72% { transform: translateY(0px) rotate(0deg); }
      }
      @keyframes pulseFulcrum {
        0%, 66%, 100% { transform: scale(1); }
        78%, 90% { transform: scale(1.08); }
      }
      @keyframes popResult {
        0%, 66%, 100% { transform: translateY(0px) scale(1); }
        78%, 90% { transform: translateY(-5px) scale(1.05); }
      }
      @keyframes flashTop {
        0%, 66%, 100% { transform: scale(0.75); opacity: 0.2; }
        78%, 90% { transform: scale(1.15); opacity: 1; }
      }
      @keyframes swayLeft {
        0%, 100% { transform: rotate(0deg) translateY(0px); }
        50% { transform: rotate(-2deg) translateY(-4px); }
      }
      @keyframes swayRight {
        0%, 100% { transform: rotate(0deg) translateY(0px); }
        50% { transform: rotate(2deg) translateY(-4px); }
      }
      @keyframes floatChip1 {
        0%, 100% { transform: translateY(0px) rotate(-6deg); }
        50% { transform: translateY(-6px) rotate(-2deg); }
      }
      @keyframes floatChip2 {
        0%, 100% { transform: translateY(0px) rotate(5deg); }
        50% { transform: translateY(6px) rotate(9deg); }
      }
      @keyframes floatChip3 {
        0%, 100% { transform: translateY(0px) rotate(-5deg); }
        50% { transform: translateY(-6px) rotate(-9deg); }
      }
      @keyframes floatChip4 {
        0%, 100% { transform: translateY(0px) rotate(6deg); }
        50% { transform: translateY(6px) rotate(2deg); }
      }
  
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transform: none !important;
          opacity: 1 !important;
        }
      }
    </style>
  
    <!-- Orbiting Comparison Operator Chips (!=, >, <, >=, <=) -->
    <g transform="translate(104, 62)">
      <g class="chip-1">
        <rect x="-32" y="-20" width="64" height="40" rx="14" class="c-dark s-white" stroke-width="2" />
        <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="18" font-weight="700">!=</text>
      </g>
    </g>
  
    <g transform="translate(232, 46)">
      <g class="chip-2">
        <circle cx="0" cy="0" r="22" class="c-white s-dark" stroke-width="2.2" />
        <text x="0" y="7" text-anchor="middle" class="c-dark mono" font-size="20" font-weight="700">></text>
      </g>
    </g>
  
    <g transform="translate(668, 46)">
      <g class="chip-3">
        <circle cx="0" cy="0" r="22" class="c-white s-dark" stroke-width="2.2" />
        <text x="0" y="7" text-anchor="middle" class="c-dark mono" font-size="20" font-weight="700"><</text>
      </g>
    </g>
  
    <g transform="translate(796, 62)">
      <g class="chip-4">
        <rect x="-42" y="-20" width="84" height="40" rx="14" class="c-dark s-white" stroke-width="2" />
        <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">>= · <=</text>
      </g>
    </g>
  
    <!-- TOP RESULT BADGE: 5 == 5 -> true -->
    <g transform="translate(450, 56)">
      <g class="result-pop">
        <rect x="-92" y="-19" width="184" height="38" rx="19" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-85" y="-13" width="96" height="26" rx="13" class="c-dark" />
        <text x="-37" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">5 == 5</text>
        <rect x="17" y="-13" width="68" height="26" rx="13" class="c-accent" />
        <text x="51" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">true</text>
      </g>
    </g>
  
    <!-- Kinetic Burst Rays Above Result Badge -->
    <g transform="translate(450, 26)">
      <g class="burst-top">
        <line x1="0" y1="0" x2="0" y2="-14" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="-18" y1="4" x2="-28" y2="-8" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="18" y1="4" x2="28" y2="-8" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="-15" cy="-14" r="2.6" class="c-white" />
        <circle cx="15" cy="-14" r="2.6" class="c-white" />
      </g>
    </g>
  
    <!-- CENTRAL EQUALITY BALANCE SCALE (==) -->
    <g transform="translate(450, 146)">
      <!-- Vertical Stand Pillar -->
      <rect x="-10" y="0" width="20" height="86" rx="8" class="c-dark s-white" stroke-width="2" />
      <line x1="0" y1="24" x2="0" y2="76" class="s-accent" stroke-width="3" stroke-linecap="round" />
  
      <!-- Heavy Pedestal Base -->
      <path d="M -56 82 H 56 L 68 102 H -68 Z" class="c-white s-dark" stroke-width="2.5" stroke-linejoin="round" />
      <rect x="-42" y="88" width="84" height="8" rx="4" class="c-dark" />
  
      <!-- Rocking Balance Beam -->
      <g class="beam-balance">
        <rect x="-156" y="-8" width="312" height="16" rx="8" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-144" y="-3" width="288" height="6" rx="3" class="c-dark" />
        <!-- End Pivot Pins -->
        <circle cx="-136" cy="0" r="6" class="c-accent s-dark" stroke-width="1.8" />
        <circle cx="136" cy="0" r="6" class="c-accent s-dark" stroke-width="1.8" />
      </g>
  
      <!-- LEFT SCALE PAN & VALUE BLOCK (5) -->
      <g transform="translate(-136, 0)">
        <g class="pan-left">
          <!-- Suspension Hanger Rods -->
          <line x1="0" y1="4" x2="-28" y2="44" class="s-white" stroke-width="2" stroke-linecap="round" />
          <line x1="0" y1="4" x2="28" y2="44" class="s-white" stroke-width="2" stroke-linecap="round" />
          <!-- Tray Dish -->
          <path d="M -42 44 H 42 L 34 56 H -34 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
          <!-- Left Value Cube: 5 -->
          <rect x="-24" y="6" width="48" height="38" rx="10" class="c-white s-dark" stroke-width="2.3" />
          <rect x="-18" y="12" width="36" height="26" rx="6" class="c-dark" />
          <text x="0" y="31" text-anchor="middle" class="c-white mono" font-size="19" font-weight="700">5</text>
        </g>
      </g>
  
      <!-- RIGHT SCALE PAN & VALUE BLOCK (5) -->
      <g transform="translate(136, 0)">
        <g class="pan-right">
          <!-- Suspension Hanger Rods -->
          <line x1="0" y1="4" x2="-28" y2="44" class="s-white" stroke-width="2" stroke-linecap="round" />
          <line x1="0" y1="4" x2="28" y2="44" class="s-white" stroke-width="2" stroke-linecap="round" />
          <!-- Tray Dish -->
          <path d="M -42 44 H 42 L 34 56 H -34 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
          <!-- Right Value Cube: 5 -->
          <rect x="-24" y="6" width="48" height="38" rx="10" class="c-white s-dark" stroke-width="2.3" />
          <rect x="-18" y="12" width="36" height="26" rx="6" class="c-dark" />
          <text x="0" y="31" text-anchor="middle" class="c-white mono" font-size="19" font-weight="700">5</text>
        </g>
      </g>
  
      <!-- CENTRAL TWIN-BAR FULCRUM DIAL: == (Double Equals!) -->
      <g class="fulcrum-pulse">
        <circle cx="0" cy="0" r="38" class="c-white s-dark" stroke-width="2.6" />
        <circle cx="0" cy="0" r="28" class="c-accent" />
        <!-- Twin Equals Bars Emphasizing Why '=' Is Written Twice -->
        <rect x="-15" y="-11" width="30" height="7" rx="3.5" class="c-white s-dark" stroke-width="1.6" />
        <rect x="-15" y="4" width="30" height="7" rx="3.5" class="c-white s-dark" stroke-width="1.6" />
      </g>
    </g>
  
    <!-- LEFT FOREGROUND: Big Editorial Hand Holding Comparison Card (10 < 20) -->
    <g transform="translate(184, 212)">
      <g class="hand-left">
        <!-- Diagonal Sleeve from Bottom-Left -->
        <path d="M -154 78 L -28 -6 L -8 28 L -116 96 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M -38 0 L -14 -15 L 6 19 L -18 34 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
        <circle cx="-14" cy="16" r="2.8" class="c-dark" />
  
        <!-- Cartoon Round Hand -->
        <circle cx="14" cy="-12" r="25" class="c-white s-dark" stroke-width="2.5" />
        <path d="M 0 -20 L 8 -17" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <path d="M -2 -10 L 6 -8" class="s-dark" stroke-width="2" stroke-linecap="round" />
  
        <!-- Comparison Chip Held by Left Hand -->
        <g transform="translate(76, 18)">
          <rect x="-64" y="-19" width="128" height="38" rx="19" class="c-white s-dark" stroke-width="2.4" />
          <rect x="-57" y="-13" width="114" height="26" rx="13" class="c-dark" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">10 < 20 → 1</text>
        </g>
      </g>
    </g>
  
    <!-- RIGHT FOREGROUND: Big Editorial Hand Holding Comparison Card (7 <= 5) -->
    <g transform="translate(716, 212)">
      <g class="hand-right">
        <!-- Diagonal Sleeve from Bottom-Right -->
        <path d="M 154 78 L 28 -6 L 8 28 L 116 96 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M 38 0 L 14 -15 L -6 19 L 18 34 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
        <circle cx="14" cy="16" r="2.8" class="c-dark" />
  
        <!-- Cartoon Round Hand -->
        <circle cx="-14" cy="-12" r="25" class="c-white s-dark" stroke-width="2.5" />
        <path d="M -8 -17 L 0 -20" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <path d="M -6 -8 L 2 -10" class="s-dark" stroke-width="2" stroke-linecap="round" />
  
        <!-- Comparison Chip Held by Right Hand -->
        <g transform="translate(-76, 18)">
          <rect x="-64" y="-19" width="128" height="38" rx="19" class="c-white s-dark" stroke-width="2.4" />
          <rect x="-57" y="-13" width="114" height="26" rx="13" class="c-dark" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">7 <= 5 → 0</text>
        </g>
      </g>
    </g>
  </svg>
---

# Операторы сравнения

Как проверить, равны ли два значения или какое из чисел больше, и почему знак равенства в коде пишется дважды?

Операторы сравнения сопоставляют два значения и всегда возвращают логический результат типа `bool`: `true` (истина) или `false` (ложь). Эти проверки лежат в основе всех условий и циклов.

## Таблица операторов

| Оператор | Название | Пример | Результат |
| --- | --- | --- | --- |
| `==` | Равно | `5 == 5` | `true` |
| `!=` | Не равно | `5 != 3` | `true` |
| `>` | Больше | `10 > 20` | `false` |
| `<` | Меньше | `10 < 20` | `true` |
| `>=` | Больше или равно | `18 >= 18` | `true` |
| `<=` | Меньше или равно | `7 <= 5` | `false` |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        int playerLevel = 15;
        int requiredLevel = 10;

        // Сравнение чисел (результат всегда имеет тип bool)
        bool canEnterDungeon = playerLevel >= requiredLevel; // true
        bool isMaxLevel = playerLevel == 100;                // false

        // Сравнение строк (учитывает регистр букв)
        string password = "Admin";
        bool isCorrect = password == "admin"; // false (разные заглавная и строчная буквы)
        bool isNotEmpty = password != "";     // true

        // Сравнение символов (сравниваются их числовые коды в таблице Unicode)
        bool isAlphabetOrder = 'A' < 'B';     // true (код 65 меньше 66)

        Console.WriteLine($"Доступ открыт: {canEnterDungeon}, пароль верен: {isCorrect}");
    }
}

```

## Важные нюансы

* **Главная ошибка — `=` вместо `==`:** одинарный знак `=` записывает значение в переменную (присваивание), а двойной `==` сравнивает два значения. Внутри условий компилятор защитит от случайной подмены, но лучше сразу выработать привычку.
* **Порядок знаков в `>=` и `<=`:** знак равенства всегда пишется *вторым*. Записи `=>` и `=<` не являются операторами сравнения и вызовут ошибку синтаксиса.
* **Чувствительность строк к регистру:** при сравнении текста через `==` строки `"Привет"` и `"привет"` считаются разными. Чтобы сравнить без учёта регистра, используют `string.Equals(a, b, StringComparison.OrdinalIgnoreCase)`.
* **Осторожность с дробными числами:** из-за особенностей хранения дробей `double` результат вычислений вроде `0.1 + 0.2 == 0.3` может дать `false` — такие числа сравнивают через допустимую погрешность (`Math.Abs(a - b) < 0.0001`).

