---
title: Приоритет операторов
keywords: приоритет операторов, порядок выполнения, круглые скобки, арифметика, сравнение, логика, присваивание, инкремент, выражение, вычисления, условие, новичок
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
  
      .hand-vip {
        transform-box: fill-box;
        transform-origin: left top;
        animation: clampVip 4s ease-in-out infinite;
      }
      .paren-left {
        transform-box: fill-box;
        transform-origin: center;
        animation: squeezeL 4s ease-in-out infinite;
      }
      .paren-right {
        transform-box: fill-box;
        transform-origin: center;
        animation: squeezeR 4s ease-in-out infinite;
      }
      .vip-crown {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: bobCrown 4s ease-in-out infinite;
      }
      .burst-vip {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: flashVip 4s ease-in-out infinite;
      }
      .step-1 {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: pulseStep1 4s ease-in-out infinite;
      }
      .step-2 {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: pulseStep2 4s ease-in-out infinite;
      }
      .step-3 {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: pulseStep3 4s ease-in-out infinite;
      }
      .step-4 {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: pulseStep4 4s ease-in-out infinite;
      }
      .hand-assign {
        transform-box: fill-box;
        transform-origin: right bottom;
        animation: pullAssign 4s ease-in-out infinite;
      }
      .flow-line {
        stroke-dasharray: 5 5;
        animation: dashFlow 1.2s linear infinite;
      }
      .chip-unary {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatUnary 3.6s ease-in-out infinite;
      }
  
      @keyframes clampVip {
        0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
        45%, 60% { transform: translate(6px, 4px) rotate(2deg); }
      }
      @keyframes squeezeL {
        0%, 100% { transform: translateX(0px); }
        45%, 60% { transform: translateX(5px); }
      }
      @keyframes squeezeR {
        0%, 100% { transform: translateX(0px); }
        45%, 60% { transform: translateX(-5px); }
      }
      @keyframes bobCrown {
        0%, 100% { transform: translateY(0px) rotate(-3deg); }
        50% { transform: translateY(-5px) rotate(3deg); }
      }
      @keyframes flashVip {
        0%, 24%, 76%, 100% { transform: scale(0.75); opacity: 0.2; }
        42%, 58% { transform: scale(1.15); opacity: 1; }
      }
      @keyframes pulseStep1 {
        0%, 100% { transform: translateY(0px); }
        20% { transform: translateY(-6px); }
      }
      @keyframes pulseStep2 {
        0%, 20%, 100% { transform: translateY(0px); }
        40% { transform: translateY(-6px); }
      }
      @keyframes pulseStep3 {
        0%, 40%, 100% { transform: translateY(0px); }
        60% { transform: translateY(-6px); }
      }
      @keyframes pulseStep4 {
        0%, 60%, 100% { transform: translateY(0px); }
        80% { transform: translateY(-6px); }
      }
      @keyframes pullAssign {
        0%, 62%, 100% { transform: rotate(0deg) translateY(0px); }
        78%, 90% { transform: rotate(-4deg) translateY(5px); }
      }
      @keyframes dashFlow {
        0% { stroke-dashoffset: 20; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes floatUnary {
        0%, 100% { transform: translateY(0px) rotate(-5deg); }
        50% { transform: translateY(-6px) rotate(-1deg); }
      }
  
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transform: none !important;
          opacity: 1 !important;
        }
      }
    </style>
  
    <!-- TOP EXPRESSION BANNER: res = (2 + 3) * 4 > 15 && ok -->
    <g transform="translate(468, 42)">
      <rect x="-238" y="-20" width="476" height="40" rx="20" class="c-white s-dark" stroke-width="2.4" />
      <rect x="-231" y="-14" width="462" height="28" rx="14" class="c-dark" />
  
      <!-- Highlighted #1 VIP Parentheses Group: (2 + 3) -->
      <rect x="-158" y="-11" width="96" height="22" rx="8" class="c-accent" />
  
      <text x="-194" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">res =</text>
      <text x="-110" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">(2 + 3)</text>
      <text x="-32" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">* 4</text>
      <text x="36" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">> 15</text>
      <text x="114" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">&& ok</text>
      <!-- Order Badge #1 -->
      <circle cx="198" cy="0" r="10" class="c-accent" />
      <text x="198" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">#1</text>
    </g>
  
    <!-- Floating Unary Chip (Level 2: ++, --, !) -->
    <g transform="translate(806, 52)">
      <g class="chip-unary">
        <rect x="-48" y="-18" width="96" height="36" rx="14" class="c-dark s-white" stroke-width="2" />
        <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">++  --  !</text>
      </g>
    </g>
  
    <!-- LEFT EDITORIAL HAND CLAMPING VIP PARENTHESES "( ... )" -->
    <g transform="translate(152, 128)">
      <g class="hand-vip">
        <!-- Diagonal Sleeve from Top-Left -->
        <path d="M -144 -68 L -24 -12 L -38 22 L -158 -32 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M -34 -16 L -10 -5 L -24 29 L -48 18 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
        <circle cx="-28" cy="15" r="2.6" class="c-dark" />
  
        <!-- Cartoon Round Hand -->
        <circle cx="8" cy="12" r="24" class="c-white s-dark" stroke-width="2.5" />
        <path d="M -5 4 L 3 7" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <path d="M -7 14 L 1 16" class="s-dark" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
  
    <!-- STEPPED PRIORITY PODIUM CASCADE (Levels 1 -> 9) -->
    <!-- Connecting Execution Flow Line -->
    <path d="M 254 118 H 374 V 142 H 494 V 164 H 614 V 186 H 724" class="s-white flow-line" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- TIER 1 (HIGHEST VIP): ( ) Parentheses -->
    <g transform="translate(244, 178)">
      <g class="step-1">
        <!-- VIP Crown Floating Above Tier 1 -->
        <g transform="translate(0, -104)">
          <g class="vip-crown">
            <polygon points="-18,8 -22,-8 -8,0 0,-12 8,0 22,-8 18,8" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
            <circle cx="0" cy="-12" r="3" class="c-accent" />
          </g>
        </g>
  
        <!-- Podium Column #1 -->
        <rect x="-54" y="-82" width="108" height="156" rx="18" class="c-white s-dark" stroke-width="2.6" />
        <rect x="-46" y="-74" width="92" height="140" rx="12" class="c-dark" />
  
        <!-- Rank Badge #1 -->
        <rect x="-34" y="-66" width="68" height="22" rx="11" class="c-accent" />
        <text x="0" y="-51" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">1 · ( )</text>
  
        <!-- Animated Clamping Parentheses Around 2+3 -->
        <g transform="translate(-28, -14)">
          <g class="paren-left">
            <text x="0" y="8" text-anchor="middle" class="c-white mono" font-size="28" font-weight="700">(</text>
          </g>
        </g>
        <text x="0" y="-8" text-anchor="middle" class="c-white mono" font-size="16" font-weight="700">2+3</text>
        <g transform="translate(28, -14)">
          <g class="paren-right">
            <text x="0" y="8" text-anchor="middle" class="c-white mono" font-size="28" font-weight="700">)</text>
          </g>
        </g>
  
        <!-- Evaluated Result Pill: = 5 -->
        <rect x="-36" y="18" width="72" height="34" rx="9" class="c-white" />
        <text x="0" y="40" text-anchor="middle" class="c-dark mono" font-size="16" font-weight="700">→ 5</text>
      </g>
    </g>
  
    <!-- Kinetic Burst Rays at VIP Tier #1 -->
    <g transform="translate(302, 86)">
      <g class="burst-vip">
        <line x1="0" y1="0" x2="16" y2="-16" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="8" y1="10" x2="24" y2="6" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="18" cy="-6" r="2.8" class="c-white" />
      </g>
    </g>
  
    <!-- TIER 2: Arithmetic (* / % then + -) -->
    <g transform="translate(374, 192)">
      <g class="step-2">
        <rect x="-50" y="-68" width="100" height="128" rx="18" class="c-white s-dark" stroke-width="2.5" />
        <rect x="-42" y="-60" width="84" height="112" rx="12" class="c-dark" />
  
        <rect x="-34" y="-52" width="68" height="20" rx="10" class="c-white" />
        <text x="0" y="-38" text-anchor="middle" class="c-dark mono" font-size="11" font-weight="700">2 · * /</text>
  
        <text x="0" y="-6" text-anchor="middle" class="c-white mono" font-size="16" font-weight="700">5 * 4</text>
  
        <rect x="-34" y="12" width="68" height="30" rx="8" class="c-accent" />
        <text x="0" y="32" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">→ 20</text>
      </g>
    </g>
  
    <!-- TIER 3: Comparison (< > <= >= then == !=) -->
    <g transform="translate(498, 206)">
      <g class="step-3">
        <rect x="-50" y="-54" width="100" height="100" rx="18" class="c-white s-dark" stroke-width="2.5" />
        <rect x="-42" y="-46" width="84" height="84" rx="12" class="c-dark" />
  
        <rect x="-34" y="-38" width="68" height="20" rx="10" class="c-white" />
        <text x="0" y="-24" text-anchor="middle" class="c-dark mono" font-size="11" font-weight="700">3 · > ==</text>
  
        <text x="0" y="2" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">20 > 15</text>
  
        <rect x="-34" y="12" width="68" height="20" rx="7" class="c-accent" />
        <text x="0" y="26" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">true</text>
      </g>
    </g>
  
    <!-- TIER 4: Logic (&& then ||) -->
    <g transform="translate(622, 220)">
      <g class="step-4">
        <rect x="-50" y="-40" width="100" height="72" rx="18" class="c-white s-dark" stroke-width="2.5" />
        <rect x="-42" y="-32" width="84" height="56" rx="12" class="c-dark" />
  
        <rect x="-34" y="-26" width="68" height="18" rx="9" class="c-white" />
        <text x="0" y="-13" text-anchor="middle" class="c-dark mono" font-size="11" font-weight="700">4 · && ||</text>
  
        <rect x="-34" y="-2" width="68" height="20" rx="7" class="c-accent" />
        <text x="0" y="12" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">1 && ok</text>
      </g>
    </g>
  
    <!-- RIGHT FOREGROUND: Editorial Hand Operating Final Assignment Gate (=) -->
    <g transform="translate(766, 212)">
      <g class="hand-assign">
        <!-- Final Assignment Box (=) Executed Last -->
        <rect x="-66" y="-34" width="76" height="68" rx="18" class="c-white s-dark" stroke-width="2.5" />
        <rect x="-58" y="-26" width="60" height="52" rx="12" class="c-dark" />
        <rect x="-50" y="-20" width="44" height="16" rx="8" class="c-accent" />
        <text x="-28" y="-8" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">5 · =</text>
        <text x="-28" y="16" text-anchor="middle" class="c-white mono" font-size="22" font-weight="700">=</text>
  
        <!-- Diagonal Sleeve from Bottom-Right -->
        <path d="M 154 78 L 28 -6 L 8 28 L 116 96 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M 38 0 L 14 -15 L -6 19 L 18 34 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
        <circle cx="14" cy="16" r="2.8" class="c-dark" />
  
        <!-- Cartoon Round Hand -->
        <circle cx="-10" cy="-8" r="24" class="c-white s-dark" stroke-width="2.5" />
        <path d="M -4 -13 L 4 -16" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <path d="M -2 -4 L 6 -6" class="s-dark" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
  </svg>
---

# Приоритет операторов

В каком порядке выполняются действия, если в одной строке смешаны арифметика, сравнение и логика, и как управлять этим порядком?

Как и в обычной математике, у каждого оператора в коде есть свой ранг: умножение срабатывает раньше сложения, арифметика — раньше сравнения, а присваивание — в самом конце. Круглые скобки `(...)` обладают наивысшим приоритетом и позволяют задать любой нужный порядок.

## Таблица приоритетов (от высшего к низшему)

| Уровень | Операторы | Группа операций | Пример |
| --- | --- | --- | --- |
| 1 | `(...)` | Круглые скобки (вычисляются изнутри наружу) | `(2 + 3) * 4` |
| 2 | `++`, `--`, `!`, `-x` | Унарные операции (инкремент, декремент, НЕ, минус) | `!isBlocked` |
| 3 | `*`, `/`, `%` | Умножение, деление, остаток от деления | `10 % 3` |
| 4 | `+`, `-` | Сложение и вычитание | `100 - 25` |
| 5 | `<`, `>`, `<=`, `>=` | Сравнение (меньше, больше) | `age >= 18` |
| 6 | `==`, `!=` | Проверка на равенство и неравенство | `code == 200` |
| 7 | `&&` | Логическое И | `a > 0 && b > 0` |
| 8 | `\|\|` | Логическое ИЛИ | `isAdmin \|\| isOwner` |
| 9 | `=`, `+=`, `-=`, `*=`, `/=` | Присваивание (выполняется в самую последнюю очередь) | `total = a + b` |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        int price = 100;
        int count = 3;
        int discount = 50;
        bool isVip = true;

        // Порядок: 1) 100 * 3 = 300 -> 2) 300 - 50 = 250 -> 3) 250 > 200 (true) -> 4) запись в bool
        bool hasFreeDelivery = price * count - discount > 200;

        // Скобки меняют порядок: сначала сложение, потом умножение
        int withoutBrackets = 10 + 5 * 2;   // 20 (сначала 5 * 2)
        int withBrackets = (10 + 5) * 2;    // 30 (сначала 10 + 5)

        // В логике && сработает раньше ||:
        // Сначала count > 10 && discount == 0 (false), затем isVip || false -> итого true
        bool hasAccess = isVip || count > 10 && discount == 0;

        Console.WriteLine($"Доставка: {hasFreeDelivery}, итог: {withBrackets}, доступ: {hasAccess}");
    }
}

```

## Важные нюансы

* **Скобки важнее памяти:** не нужно заучивать всю таблицу наизусть. Если в одном выражении встречаются разные группы операторов (особенно при смешивании `&&` и `||`), ставьте круглые скобки `(...)` — они защитят от ошибок и сделают код понятным с первого взгляда.
* **Присваивание всегда последнее:** оператор `=` и его сокращённые версии (`+=`, `-=`) стоят в самом низу таблицы, поэтому выражение справа от знака равенства всегда вычисляется целиком до записи результата в переменную.
* **Выполнение слева направо:** если рядом стоят операторы одного уровня (например, `20 / 5 * 2`), они выполняются строго по очереди слева направо (`4 * 2 = 8`). Исключение — присваивание, которое работает справа налево (`a = b = 0`).

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что выполнится раньше в `true || false && false`?",
  "options": [
    {
      "text": "`&&`",
      "correct": true
    },
    {
      "text": "`||`",
      "correct": false,
      "explanation": "У `&&` приоритет выше."
    },
    {
      "text": "Слева направо",
      "correct": false,
      "explanation": "Приоритет важнее порядка."
    }
  ],
  "explanation": "Сначала `false && false`, затем `true || false`."
}
```

```quiz
{
  "type": "radio",
  "question": "Что даст `20 / 5 * 2`?",
  "options": [
    {
      "text": "`8`",
      "correct": true
    },
    {
      "text": "`2`",
      "correct": false,
      "explanation": "Деление и умножение идут слева направо."
    },
    {
      "text": "`20`",
      "correct": false,
      "explanation": "Порядок другой."
    }
  ],
  "explanation": "Операторы одного уровня выполняются слева направо."
}
```
