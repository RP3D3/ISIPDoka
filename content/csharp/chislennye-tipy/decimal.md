---
title: decimal
keywords: decimal, System.Decimal, деньги, финансы, точные вычисления, суффикс m, дробные числа, без погрешности, округление, бухгалтерия, цена
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
  
      .coin-bob-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobCoin1 3.6s ease-in-out infinite;
      }
      .coin-bob-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobCoin2 3.6s ease-in-out infinite;
      }
      .coin-flow {
        stroke-dasharray: 5 5;
        animation: flowCoins 1.2s linear infinite;
      }
      .stamp-press {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: pressStamp 4s ease-in-out infinite;
      }
      .needle-tick {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: tickNeedle 4s ease-in-out infinite;
      }
      .eyes-focus {
        transform-box: fill-box;
        transform-origin: center;
        animation: focusEyes 4s ease-in-out infinite;
      }
      .burst-pop {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: popBurst 4s ease-in-out infinite;
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
  
      @keyframes bobCoin1 {
        0%, 100% { transform: translateY(0px) rotate(-3deg); }
        50% { transform: translateY(-6px) rotate(3deg); }
      }
      @keyframes bobCoin2 {
        0%, 100% { transform: translateY(0px) rotate(3deg); }
        50% { transform: translateY(6px) rotate(-3deg); }
      }
      @keyframes flowCoins {
        0% { stroke-dashoffset: 20; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes pressStamp {
        0%, 20%, 72%, 100% { transform: translateY(0px); }
        38%, 54% { transform: translateY(12px); }
      }
      @keyframes tickNeedle {
        0%, 26%, 68%, 100% { transform: rotate(0deg); }
        34% { transform: rotate(-7deg); }
        42% { transform: rotate(5deg); }
        50% { transform: rotate(0deg); }
      }
      @keyframes focusEyes {
        0%, 20%, 75%, 100% { transform: translate(0px, 0px); }
        38%, 58% { transform: translate(2px, 2px); }
      }
      @keyframes popBurst {
        0%, 34%, 68%, 100% { transform: scale(0.75); opacity: 0.2; }
        44%, 56% { transform: scale(1.12); opacity: 1; }
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
  
    <!-- LEFT SECTION: Exact Monetary Coins (0.1m + 0.2m) -->
    <!-- Feed Lines to Central Cash Vault -->
    <path d="M 164 96 H 236 V 136 H 294" class="s-white coin-flow" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 164 196 H 236 V 156 H 294" class="s-white coin-flow" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="236" cy="146" r="11" class="c-dark s-white" stroke-width="1.75" />
    <path d="M 236 141 V 151 M 231 146 H 241" class="s-white" stroke-width="2" stroke-linecap="round" />
  
    <!-- Top Coin: 0.1m -->
    <g transform="translate(120, 96)">
      <g class="coin-bob-1">
        <circle cx="0" cy="0" r="36" class="c-white s-dark" stroke-width="2.4" />
        <circle cx="0" cy="0" r="29" class="c-dark" />
        <text x="-4" y="5" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">0.1</text>
        <!-- Accent 'm' Seal on Coin -->
        <rect x="11" y="-9" width="14" height="18" rx="4" class="c-accent" />
        <text x="18" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">m</text>
      </g>
    </g>
  
    <!-- Bottom Coin: 0.2m -->
    <g transform="translate(120, 196)">
      <g class="coin-bob-2">
        <circle cx="0" cy="0" r="36" class="c-white s-dark" stroke-width="2.4" />
        <circle cx="0" cy="0" r="29" class="c-dark" />
        <text x="-4" y="5" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">0.2</text>
        <!-- Accent 'm' Seal on Coin -->
        <rect x="11" y="-9" width="14" height="18" rx="4" class="c-accent" />
        <text x="18" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">m</text>
      </g>
    </g>
  
    <!-- CENTER SECTION: Precision Bank Cash-Register & 'm' Seal Stamp (decimal) -->
    <g transform="translate(450, 152)">
      <!-- Grotesque Doka Eyes perched on top left -->
      <g transform="translate(-68, -82)">
        <ellipse cx="-13" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
        <ellipse cx="11" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
        <g class="eyes-focus">
          <circle cx="-11" cy="1" r="3.8" class="c-dark" />
          <circle cx="13" cy="1" r="3.8" class="c-dark" />
        </g>
      </g>
  
      <!-- Heavy Mechanical Feet -->
      <path d="M -124 72 L -132 86 H -100 L -106 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
      <path d="M 106 72 L 100 86 H 132 L 124 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
      <!-- Main White Cash-Vault Housing -->
      <rect x="-154" y="-72" width="308" height="144" rx="18" class="c-white s-dark" stroke-width="2.5" />
  
      <!-- Dark Window Header Bar -->
      <path d="M -136 -72 H 136 Q 154 -72 154 -54 V -38 H -154 V -54 Q -154 -72 -136 -72 Z" class="c-dark s-white" stroke-width="1.75" />
      <line x1="-153" y1="-38" x2="153" y2="-38" class="s-dark" stroke-width="2.5" />
  
      <!-- 3 Doka Header Dots -->
      <circle cx="-130" cy="-55" r="4" class="c-accent" />
      <circle cx="-116" cy="-55" r="4" class="c-white" />
      <circle cx="-102" cy="-55" r="4" class="c-white" />
  
      <!-- Header Type Pill: decimal -->
      <rect x="46" y="-65" width="90" height="20" rx="10" class="c-accent" />
      <text x="91" y="-51" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">decimal</text>
  
      <!-- Left Sub-Display: Zero-Drift Precision Gauge -->
      <rect x="-136" y="-22" width="84" height="58" rx="10" class="c-dark" />
      <!-- Semicircular Scale Arc -->
      <path d="M -120 18 A 26 26 0 0 1 -68 18" class="s-white" stroke-width="2.2" stroke-linecap="round" />
      <!-- Center Exact-Zero Target Notch -->
      <line x1="-94" y1="-12" x2="-94" y2="-5" class="s-accent" stroke-width="3" stroke-linecap="round" />
      <!-- Animated Precision Needle -->
      <g transform="translate(-94, 22)">
        <g class="needle-tick">
          <line x1="0" y1="0" x2="0" y2="-26" class="s-white" stroke-width="2.4" stroke-linecap="round" />
        </g>
      </g>
      <circle cx="-94" cy="22" r="4.5" class="c-accent" />
  
      <!-- Right Sub-Display: Exact Financial Total (0.30m) -->
      <rect x="-42" y="-22" width="178" height="58" rx="10" class="c-dark" />
      <rect x="-35" y="-15" width="164" height="44" rx="7" class="c-white" />
      <text x="32" y="15" text-anchor="middle" class="c-dark mono" font-size="25" font-weight="700">0.30</text>
      <!-- Highlighted Suffix 'm' Badge Inside Display -->
      <rect x="86" y="-8" width="34" height="30" rx="7" class="c-accent" />
      <text x="103" y="14" text-anchor="middle" class="c-white mono" font-size="20" font-weight="700">m</text>
  
      <!-- Bottom 128-Bit (4 × 32-Bit) Quad-Chamber Capacity Bar -->
      <rect x="-136" y="45" width="272" height="15" rx="7.5" class="c-dark" />
      <rect x="-131" y="49" width="61" height="7" rx="3" class="c-accent" />
      <rect x="-65" y="49" width="61" height="7" rx="3" class="c-accent" />
      <rect x="4" y="49" width="61" height="7" rx="3" class="c-accent" />
      <rect x="70" y="49" width="61" height="7" rx="3" class="c-accent" />
    </g>
  
    <!-- Notary 'm' Stamp Stamping the Top-Right Corner of the Vault -->
    <g transform="translate(552, 46)">
      <g class="stamp-press">
        <!-- Dark Grip Handle -->
        <rect x="-11" y="-26" width="22" height="22" rx="10" class="c-dark s-white" stroke-width="1.75" />
        <!-- White Stamp Collar -->
        <rect x="-24" y="-6" width="48" height="14" rx="6" class="c-white s-dark" stroke-width="2" />
        <!-- Accent Stamp Pad -->
        <rect x="-18" y="8" width="36" height="6" rx="2" class="c-accent s-dark" stroke-width="1.5" />
      </g>
    </g>
  
    <!-- Kinetic Burst Rays around the 'm' Stamp -->
    <g transform="translate(608, 72)">
      <g class="burst-pop">
        <line x1="4" y1="-4" x2="22" y2="-20" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="10" y1="8" x2="30" y2="4" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="-6" y1="-10" x2="-2" y2="-28" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="26" cy="-8" r="3" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Starburst & Dark Capsule Badges -->
    <!-- Connector Lines -->
    <circle cx="604" cy="152" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 608 152 H 636 V 102 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 636 152 V 198 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Badge: Starburst + System.Decimal Capsule -->
    <g transform="translate(748, 102)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-46 14,-28 42,-36 34,-12 62,0 34,12 42,36 14,28 0,46 -14,28 -42,36 -34,12 -62,0 -34,-12 -42,-36 -14,-28" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-78" y="-19" width="156" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">System.Decimal</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: 128-Bit & 28 Digits Capsule -->
    <g transform="translate(748, 198)">
      <g class="pill-float">
        <rect x="-82" y="-19" width="164" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
        <circle cx="-64" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">128-bit · 28 цифр</text>
      </g>
    </g>
  </svg>
---

# Точный дробный тип decimal

Почему цены, зарплаты и проценты нельзя считать в `double`, и зачем ставить букву `m` в конце числа?

`decimal` — это дробный тип данных сверхвысокой точности. В отличие от `float` и `double`, он хранит числа в десятичном виде без погрешностей двоичного округления, поэтому является стандартом для банковских программ, расчёта денег, налогов и бухгалтерии.

## Основные характеристики

* **Размер в памяти:** 16 байт (128 бит) — самый объёмный из базовых числовых типов.
* **Точность:** 28–29 значащих цифр.
* **Диапазон значений:** от `±1.0e-28` до `±7.9e28`.
* **Полное имя типа:** `System.Decimal`.
* **Значение по умолчанию:** `0.0m`.

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // Суффикс m (от слова money) обязателен для дробных чисел
        decimal price = 199.90m;
        decimal tax = 0.20M;

        // Сложение 0.1m + 0.2m даёт ровно 0.3 без погрешности double
        decimal exactSum = 0.1m + 0.2m;
        decimal total = price + (price * tax);

        Console.WriteLine($"Точная сумма: {exactSum}");
        Console.WriteLine($"Итого с налогом: {total} руб.");
    }
}

```

## Важные нюансы

* **Обязательный суффикс `m` или `M`:** происходит от английского слова *money* (деньги). Без этой буквы компилятор посчитает число типом `double` и запретит записывать его в `decimal`.
* **Никаких копеечных потерь:** выражение `0.1m + 0.2m` вернёт ровно `0.3`, тогда как в `double` накопится микроскопическая ошибка.
* **Плата за точность:** `decimal` занимает 16 байт и обрабатывается процессором медленнее, чем `double` или `float`, поэтому в играх и 3D-графике его не используют.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой суффикс нужен для литерала `decimal`?",
  "options": [
    {
      "text": "`m`",
      "correct": true
    },
    {
      "text": "`f`",
      "correct": false,
      "explanation": "`f` — для `float`."
    },
    {
      "text": "`d`",
      "correct": false,
      "explanation": "`d` — для `double`."
    }
  ],
  "explanation": "`m` происходит от слова money — деньги."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Почему `decimal` выбирают для денег?",
  "options": [
    {
      "text": "Точная десятичная арифметика",
      "correct": true
    },
    {
      "text": "`0.1m + 0.2m == 0.3m`",
      "correct": true
    },
    {
      "text": "Он быстрее `double`",
      "correct": false,
      "explanation": "`decimal` медленнее, но точнее."
    }
  ],
  "explanation": "Для сумм и цен важнее точность, чем скорость."
}
```
