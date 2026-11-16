---
title: bool
keywords: bool, System.Boolean, логический тип данных, true, false, истина, ложь, условие, сравнение, проверка, да, нет, переменная
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
  
      .lever-throw {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: throwLever 4.4s ease-in-out infinite;
      }
      .eyes-binary {
        transform-box: fill-box;
        transform-origin: center;
        animation: lookBinary 4.4s ease-in-out infinite;
      }
      .true-lamp {
        animation: lampTrue 4.4s ease-in-out infinite;
      }
      .false-lamp {
        animation: lampFalse 4.4s ease-in-out infinite;
      }
      .burst-true {
        transform-box: fill-box;
        transform-origin: bottom right;
        animation: popTrue 4.4s ease-in-out infinite;
      }
      .burst-false {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: popFalse 4.4s ease-in-out infinite;
      }
      .wire-flow {
        stroke-dasharray: 5 5;
        animation: flowWire 1.2s linear infinite;
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
  
      @keyframes throwLever {
        0%, 18%, 82%, 100% { transform: rotate(-28deg); }
        38%, 62% { transform: rotate(28deg); }
      }
      @keyframes lookBinary {
        0%, 18%, 82%, 100% { transform: translate(-3px, -1px); }
        38%, 62% { transform: translate(3px, -1px); }
      }
      @keyframes lampTrue {
        0%, 22%, 78%, 100% { opacity: 1; }
        34%, 66% { opacity: 0.22; }
      }
      @keyframes lampFalse {
        0%, 22%, 78%, 100% { opacity: 0.22; }
        34%, 66% { opacity: 1; }
      }
      @keyframes popTrue {
        0%, 16%, 84%, 100% { transform: scale(1.1); opacity: 1; }
        26%, 74% { transform: scale(0.75); opacity: 0; }
      }
      @keyframes popFalse {
        0%, 32%, 68%, 100% { transform: scale(0.75); opacity: 0; }
        42%, 58% { transform: scale(1.1); opacity: 1; }
      }
      @keyframes flowWire {
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
    <g transform="translate(226, 38)">
      <g class="cloud-drift-1">
        <path d="M -22 7 H 22 C 27 7 31 3 31 -1 C 31 -5 27 -8 23 -8 C 21 -14 15 -17 9 -15 C 5 -20 -3 -20 -7 -15 C -13 -16 -18 -12 -18 -6 C -23 -6 -26 -2 -26 2 C -26 5 -24 7 -22 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
    <g transform="translate(658, 36)">
      <g class="cloud-drift-2">
        <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- LEFT SECTION: Logic Condition Input (5 > 3) & Conduit -->
    <g transform="translate(136, 152)">
      <!-- Condition Expression Pill -->
      <rect x="-56" y="-26" width="112" height="52" rx="18" class="c-white s-dark" stroke-width="2.4" />
      <rect x="-48" y="-18" width="96" height="36" rx="12" class="c-dark" />
      <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="18" font-weight="700">5 > 3</text>
  
      <!-- Question Tag Above -->
      <rect x="-24" y="-42" width="48" height="20" rx="10" class="c-accent s-dark" stroke-width="1.8" />
      <text x="0" y="-28" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">?</text>
    </g>
  
    <!-- Signal Cable to Industrial Knife Switch -->
    <path d="M 196 152 H 284" class="s-white wire-flow" stroke-width="2.4" stroke-linecap="round" />
    <circle cx="284" cy="152" r="4" class="c-white s-dark" stroke-width="1.75" />
  
    <!-- CENTER SECTION: Industrial Knife-Switch Box (bool: true / false) -->
    <g transform="translate(444, 156)">
      <!-- Grotesque Doka Eyes perched on top left -->
      <g transform="translate(-66, -82)">
        <ellipse cx="-13" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
        <ellipse cx="11" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
        <g class="eyes-binary">
          <circle cx="-11" cy="1" r="3.8" class="c-dark" />
          <circle cx="13" cy="1" r="3.8" class="c-dark" />
        </g>
      </g>
  
      <!-- Heavy Industrial Feet -->
      <path d="M -124 72 L -132 86 H -100 L -106 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
      <path d="M 106 72 L 100 86 H 132 L 124 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
      <!-- Main White Switchboard Housing -->
      <rect x="-154" y="-72" width="308" height="144" rx="18" class="c-white s-dark" stroke-width="2.5" />
  
      <!-- Dark Window Header Bar -->
      <path d="M -136 -72 H 136 Q 154 -72 154 -54 V -38 H -154 V -54 Q -154 -72 -136 -72 Z" class="c-dark s-white" stroke-width="1.75" />
      <line x1="-153" y1="-38" x2="153" y2="-38" class="s-dark" stroke-width="2.5" />
  
      <!-- 3 Doka Header Dots -->
      <circle cx="-130" cy="-55" r="4" class="c-accent" />
      <circle cx="-116" cy="-55" r="4" class="c-white" />
      <circle cx="-102" cy="-55" r="4" class="c-white" />
  
      <!-- Header Type Pill: bool -->
      <rect x="64" y="-65" width="72" height="20" rx="10" class="c-accent" />
      <text x="100" y="-51" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">bool</text>
  
      <!-- Recessed Switch Chamber -->
      <rect x="-136" y="-24" width="272" height="84" rx="12" class="c-dark" />
  
      <!-- LEFT TERMINAL: true (1) -->
      <g transform="translate(-86, 12)">
        <!-- Terminal Contact Block -->
        <rect x="-36" y="-26" width="72" height="32" rx="8" class="c-white" />
        <!-- Active Accent Lamp Overlay -->
        <rect x="-32" y="-22" width="64" height="24" rx="6" class="c-accent true-lamp" />
        <text x="0" y="-6" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">true</text>
        <!-- Binary Bit Indicator: 1 -->
        <rect x="-16" y="12" width="32" height="18" rx="6" class="c-white" />
        <text x="0" y="25" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">1</text>
      </g>
  
      <!-- RIGHT TERMINAL: false (0) -->
      <g transform="translate(86, 12)">
        <!-- Terminal Contact Block -->
        <rect x="-36" y="-26" width="72" height="32" rx="8" class="c-white" />
        <!-- Active Accent Lamp Overlay -->
        <rect x="-32" y="-22" width="64" height="24" rx="6" class="c-accent false-lamp" />
        <text x="0" y="-6" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">false</text>
        <!-- Binary Bit Indicator: 0 -->
        <rect x="-16" y="12" width="32" height="18" rx="6" class="c-white" />
        <text x="0" y="25" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">0</text>
      </g>
  
      <!-- PIVOTING KNIFE-SWITCH LEVER + CARTOON ROUND HAND -->
      <g transform="translate(0, 44)">
        <g class="lever-throw">
          <!-- Steel Blade Shaft -->
          <rect x="-6" y="-82" width="12" height="82" rx="6" class="c-white s-dark" stroke-width="2.2" />
          <line x1="0" y1="-70" x2="0" y2="-16" class="s-accent" stroke-width="3" stroke-linecap="round" />
  
          <!-- Chunky Insulated T-Handle Grip -->
          <rect x="-24" y="-96" width="48" height="18" rx="9" class="c-accent s-dark" stroke-width="2" />
  
          <!-- Cartoon Round Hand Gripping the Handle -->
          <circle cx="0" cy="-94" r="18" class="c-white s-dark" stroke-width="2.4" />
          <path d="M -8 -99 L -2 -97" class="s-dark" stroke-width="1.8" stroke-linecap="round" />
          <path d="M -9 -92 L -3 -91" class="s-dark" stroke-width="1.8" stroke-linecap="round" />
        </g>
  
        <!-- Heavy Pivot Hinge Base -->
        <circle cx="0" cy="0" r="14" class="c-white s-dark" stroke-width="2.4" />
        <circle cx="0" cy="0" r="6" class="c-accent" />
      </g>
    </g>
  
    <!-- Kinetic Burst Sparks on true / false Contact -->
    <g transform="translate(314, 96)">
      <g class="burst-true">
        <line x1="-4" y1="-4" x2="-20" y2="-18" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="-8" y1="8" x2="-26" y2="4" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="-22" cy="-7" r="2.8" class="c-white" />
      </g>
    </g>
    <g transform="translate(574, 96)">
      <g class="burst-false">
        <line x1="4" y1="-4" x2="20" y2="-18" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="8" y1="8" x2="26" y2="4" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="22" cy="-7" r="2.8" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Starburst & Dark Capsule Badges -->
    <!-- Connector Lines -->
    <circle cx="598" cy="156" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 602 156 H 636 V 102 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 636 156 V 198 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Badge: Starburst + System.Boolean Capsule -->
    <g transform="translate(748, 102)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-46 14,-28 42,-36 34,-12 62,0 34,12 42,36 14,28 0,46 -14,28 -42,36 -34,12 -62,0 -34,-12 -42,-36 -14,-28" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-78" y="-19" width="156" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">System.Boolean</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: Binary States Capsule -->
    <g transform="translate(748, 198)">
      <g class="pill-float">
        <rect x="-82" y="-19" width="164" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
        <circle cx="-64" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">true · false (1 Б)</text>
      </g>
    </g>
  </svg>
---

# Логический тип bool

Как хранить ответы «да» или «нет» и управлять ветвлением программы с помощью всего двух значений?

`bool` (от англ. *boolean* — логический) — это базовый тип данных, который может принимать только одно из двух значений: `true` (истина) или `false` (ложь). Он лежит в основе всех проверок, условных конструкций `if` и циклов.

## Основные характеристики

* **Размер в памяти:** 1 байт (8 бит).
* **Допустимые значения:** строго `true` или `false`.
* **Полное имя типа:** `System.Boolean`.
* **Значение по умолчанию:** `false`.

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        bool isGameOver = false;
        bool hasKey = true;

        // Логический тип часто возникает как результат сравнения
        int age = 20;
        bool isAdult = age >= 18; // true

        // Инверсия значения с помощью оператора ! (НЕ)
        bool isLocked = !hasKey; // false

        Console.WriteLine($"Совершеннолетний: {isAdult}, дверь закрыта: {isLocked}");
    }
}

```

## Важные нюансы

* **Никаких `1` и `0` вместо `true` и `false`:** в отличие от некоторых других языков, здесь нельзя записать число `1` в переменную `bool` или подставить число внутрь условия `if (1)` — компилятор сразу выдаст ошибку.
* **Правила именования:** переменные типа `bool` принято называть как вопрос, начинающийся со слов `is`, `has` или `can` (например, `isReady`, `hasAccess`, `canJump`) — так код читается как обычный текст.
* **Регистр при выводе:** в коде ключевые слова всегда пишутся со строчной буквы (`true`, `false`), но при печати в консоль через `Console.WriteLine()` они выводятся с заглавной (`True`, `False`).

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какие значения принимает `bool`?",
  "options": [
    {
      "text": "`true` и `false`",
      "correct": true
    },
    {
      "text": "`1` и `0`",
      "correct": false,
      "explanation": "В C# нет неявного преобразования числа в `bool`."
    },
    {
      "text": "Любые числа",
      "correct": false,
      "explanation": "`bool` хранит только логические значения."
    }
  ],
  "explanation": "`bool` — строго логический тип."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Как принято называть `bool`-переменные?",
  "options": [
    {
      "text": "`isReady`",
      "correct": true
    },
    {
      "text": "`hasAccess`",
      "correct": true
    },
    {
      "text": "`count`",
      "correct": false,
      "explanation": "`count` — это число, а не флаг."
    }
  ],
  "explanation": "Имена-вопросы с `is`, `has`, `can` делают код понятнее."
}
```
