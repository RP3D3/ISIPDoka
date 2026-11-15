---
title: Выбор типа
keywords: выбор числового типа, int, long, double, float, decimal, byte, суффиксы чисел, точность, переполнение, типы данных
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
  
      .head-tilt {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: tiltHead 4.4s ease-in-out infinite;
      }
      .eyes-scan {
        transform-box: fill-box;
        transform-origin: center;
        animation: scanSlots 4.4s ease-in-out infinite;
      }
      .shape-offer {
        transform-box: fill-box;
        transform-origin: left center;
        animation: offerShape 4.4s ease-in-out infinite;
      }
      .chin-hand {
        transform-box: fill-box;
        transform-origin: center;
        animation: tapChin 4.4s ease-in-out infinite;
      }
      .aim-flow {
        stroke-dasharray: 5 5;
        animation: flowAim 1.2s linear infinite;
      }
      .slot-glow {
        transform-box: fill-box;
        transform-origin: center;
        animation: glowSlot 4.4s ease-in-out infinite;
      }
      .burst-pop {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: popBurst 4.4s ease-in-out infinite;
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
  
      @keyframes tiltHead {
        0%, 100% { transform: rotate(-2deg); }
        50% { transform: rotate(2.5deg); }
      }
      @keyframes scanSlots {
        0%, 15%, 100% { transform: translate(-1px, 0px); }
        45%, 65% { transform: translate(3px, 1px); }
      }
      @keyframes offerShape {
        0%, 100% { transform: translateY(0px) rotate(-3deg); }
        50% { transform: translateY(-7px) rotate(3deg); }
      }
      @keyframes tapChin {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3px); }
      }
      @keyframes flowAim {
        0% { stroke-dashoffset: 20; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes glowSlot {
        0%, 25%, 80%, 100% { transform: scale(1); }
        50% { transform: scale(1.07); }
      }
      @keyframes popBurst {
        0%, 30%, 75%, 100% { transform: scale(0.75); opacity: 0.25; }
        50% { transform: scale(1.12); opacity: 1; }
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
    <g transform="translate(242, 38)">
      <g class="cloud-drift-1">
        <path d="M -22 7 H 22 C 27 7 31 3 31 -1 C 31 -5 27 -8 23 -8 C 21 -14 15 -17 9 -15 C 5 -20 -3 -20 -7 -15 C -13 -16 -18 -12 -18 -6 C -23 -6 -26 -2 -26 2 C -26 5 -24 7 -22 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
    <g transform="translate(656, 36)">
      <g class="cloud-drift-2">
        <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- LEFT SECTION: Grotesque Doka Developer Thinking & Holding Triangle Block -->
    <g transform="translate(126, 152)">
      <!-- Dark Sweater Torso -->
      <path d="M -46 86 C -46 54, -26 42, 0 42 C 26 42, 46 54, 46 86 Z" class="c-dark s-white" stroke-width="2" stroke-linejoin="round" />
      <!-- White Collar Accent -->
      <path d="M -14 42 L 0 56 L 14 42 Z" class="c-white s-dark" stroke-width="1.75" stroke-linejoin="round" />
  
      <!-- Grotesque Head Group -->
      <g transform="translate(0, 8)">
        <g class="head-tilt">
          <!-- Neck -->
          <rect x="-10" y="18" width="20" height="20" rx="6" class="c-white s-dark" stroke-width="2" />
  
          <!-- Round Doka Ear with Diagonal Slash (Left) -->
          <circle cx="-30" cy="0" r="11" class="c-white s-dark" stroke-width="2.2" />
          <line x1="-34" y1="-4" x2="-26" y2="4" class="s-dark" stroke-width="2" stroke-linecap="round" />
  
          <!-- Dark Hair Back & Top Bun -->
          <circle cx="-18" cy="-42" r="15" class="c-dark s-white" stroke-width="1.75" />
          <path d="M -32 -12 C -34 -34, -14 -44, 14 -38 C 28 -34, 34 -22, 30 -10 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
          <!-- White Grotesque Face -->
          <rect x="-28" y="-26" width="56" height="52" rx="24" class="c-white s-dark" stroke-width="2.3" />
  
          <!-- Geometric Angular Bangs -->
          <polygon points="-28,-14 -6,-30 10,-14 26,-26 28,-10 -28,-10" class="c-dark" />
  
          <!-- Rectangular Glasses & Eyes Looking at Sorter -->
          <rect x="-16" y="-8" width="18" height="13" rx="3" class="c-white s-dark" stroke-width="2" />
          <rect x="6" y="-8" width="18" height="13" rx="3" class="c-white s-dark" stroke-width="2" />
          <line x1="2" y1="-2" x2="6" y2="-2" class="s-dark" stroke-width="2" />
          <g class="eyes-scan">
            <circle cx="-6" cy="-1.5" r="2.6" class="c-dark" />
            <circle cx="16" cy="-1.5" r="2.6" class="c-dark" />
          </g>
  
          <!-- Thoughtful Mouth -->
          <path d="M -2 14 Q 6 12, 12 15" class="s-dark" stroke-width="2" stroke-linecap="round" />
        </g>
      </g>
  
      <!-- Thinking Cartoon Round Hand at Chin -->
      <g transform="translate(-8, 42)">
        <g class="chin-hand">
          <circle cx="0" cy="0" r="12" class="c-white s-dark" stroke-width="2.1" />
          <path d="M -5 -3 L -1 -2" class="s-dark" stroke-width="1.5" stroke-linecap="round" />
        </g>
      </g>
  
      <!-- Right Arm Holding Up the Triangle Block (19.99m) -->
      <g transform="translate(36, 48)">
        <g class="shape-offer">
          <!-- Sleeve & Cuff -->
          <path d="M 0 0 L 42 -18 L 48 -2 L 6 16 Z" class="c-dark s-white" stroke-width="1.8" stroke-linejoin="round" />
          <path d="M 38 -17 L 48 -21 L 54 -5 L 44 -1 Z" class="c-white s-dark" stroke-width="1.8" stroke-linejoin="round" />
          <!-- Cartoon Round Hand -->
          <circle cx="56" cy="-15" r="13" class="c-white s-dark" stroke-width="2.1" />
  
          <!-- Crisp White Triangle Piece with Accent Inner Triangle -->
          <g transform="translate(74, -46)">
            <polygon points="0,-32 34,24 -34,24" class="c-white s-dark" stroke-width="2.4" stroke-linejoin="round" />
            <polygon points="0,-16 20,17 -20,17" class="c-accent" />
            <text x="0" y="13" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">19.9m</text>
          </g>
        </g>
      </g>
    </g>
  
    <!-- Thought / Trajectory Dashed Line from Triangle to Triangle Slot -->
    <path d="M 272 156 C 328 134, 434 128, 534 156" class="s-white aim-flow" stroke-width="2" stroke-linecap="round" />
  
    <!-- CENTER SECTION: Shape-Sorter Box of C# Numeric Types -->
    <g transform="translate(454, 152)">
      <!-- Support Feet -->
      <path d="M -126 72 L -134 86 H -102 L -108 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
      <path d="M 108 72 L 102 86 H 134 L 126 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
      <!-- Main White Sorter Board -->
      <rect x="-156" y="-72" width="312" height="144" rx="18" class="c-white s-dark" stroke-width="2.5" />
  
      <!-- Dark Top Header Bar -->
      <path d="M -138 -72 H 138 Q 156 -72 156 -54 V -38 H -156 V -54 Q -156 -72 -138 -72 Z" class="c-dark s-white" stroke-width="1.75" />
      <line x1="-155" y1="-38" x2="155" y2="-38" class="s-dark" stroke-width="2.5" />
  
      <!-- 3 Doka Header Dots -->
      <circle cx="-132" cy="-55" r="4" class="c-accent" />
      <circle cx="-118" cy="-55" r="4" class="c-white" />
      <circle cx="-104" cy="-55" r="4" class="c-white" />
  
      <!-- Header Type Pill: C# var? -->
      <rect x="48" y="-65" width="90" height="20" rx="10" class="c-accent" />
      <text x="93" y="-51" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">тип числа</text>
  
      <!-- 4 GEOMETRIC SORTER SLOTS -->
      <!-- Slot 1: Circle -> int -->
      <g transform="translate(-108, 12)">
        <circle cx="0" cy="-10" r="24" class="c-dark" />
        <circle cx="0" cy="-10" r="14" class="s-white" stroke-width="1.6" stroke-dasharray="3 3" />
        <rect x="-26" y="24" width="52" height="20" rx="10" class="c-dark" />
        <text x="0" y="38" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">int</text>
      </g>
  
      <!-- Slot 2: Square -> double -->
      <g transform="translate(-36, 12)">
        <rect x="-23" y="-33" width="46" height="46" rx="8" class="c-dark" />
        <rect x="-14" y="-24" width="28" height="28" rx="4" class="s-white" stroke-width="1.6" stroke-dasharray="3 3" />
        <rect x="-30" y="24" width="60" height="20" rx="10" class="c-dark" />
        <text x="0" y="38" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">double</text>
      </g>
  
      <!-- Slot 3: Star -> float -->
      <g transform="translate(36, 12)">
        <polygon points="0,-36 8,-19 26,-17 13,-4 16,14 0,5 -16,14 -13,-4 -26,-17 -8,-19" class="c-dark" />
        <polygon points="0,-24 5,-13 17,-12 8,-3 10,9 0,3 -10,9 -8,-3 -17,-12 -5,-13" class="s-white" stroke-width="1.4" stroke-dasharray="3 2" />
        <rect x="-28" y="24" width="56" height="20" rx="10" class="c-dark" />
        <text x="0" y="38" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">float</text>
      </g>
  
      <!-- Slot 4: Triangle (Exact Match Highlighted!) -> decimal -->
      <g transform="translate(108, 12)">
        <g class="slot-glow">
          <polygon points="0,-35 28,13 -28,13" class="c-dark" />
          <polygon points="0,-22 17,7 -17,7" class="c-accent" />
        </g>
        <rect x="-32" y="24" width="64" height="20" rx="10" class="c-accent" />
        <text x="0" y="38" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">decimal</text>
      </g>
    </g>
  
    <!-- Kinetic Burst Rays at Matching Triangle Slot -->
    <g transform="translate(612, 92)">
      <g class="burst-pop">
        <line x1="4" y1="-4" x2="22" y2="-20" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="10" y1="8" x2="30" y2="4" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="-6" y1="-10" x2="-2" y2="-28" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="26" cy="-8" r="3" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Starburst & Dark Capsule Badges -->
    <!-- Connector Lines -->
    <circle cx="610" cy="152" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 614 152 H 640 V 102 H 664" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 640 152 V 198 H 664" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Badge: Starburst + Точный тип Capsule -->
    <g transform="translate(750, 102)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-46 14,-28 42,-36 34,-12 62,0 34,12 42,36 14,28 0,46 -14,28 -42,36 -34,12 -62,0 -34,-12 -42,-36 -14,-28" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-76" y="-19" width="152" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">Память и точность</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: Numeric Types Summary Capsule -->
    <g transform="translate(750, 198)">
      <g class="pill-float">
        <rect x="-82" y="-19" width="164" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
        <circle cx="-64" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">int · double · decimal</text>
      </g>
    </g>
  </svg>
---

# Как выбрать числовой тип данных

Какой тип числа поставить в переменную, чтобы не тратить лишнюю память и не потерять точность в расчётах?

Выбор числового типа зависит от трёх вопросов: есть ли у числа дробная часть, насколько критична абсолютная точность и какой максимальный размер значения ожидается.

## Алгоритм выбора за 4 шага

1. **Нужна ли дробная часть?** Если число всегда целое (возраст, количество товаров, счётчик) — переходите к шагу 2. Если есть знаки после запятой — к шагу 3.
2. **Выбор для целых чисел:** в 95% случаев берите `int` (хватает до ±2,14 млрд). Если числа могут превысить два миллиарда (население, ID в крупной базе) — берите `long` с суффиксом `L`. Типы `byte` и `short` нужны только для огромных массивов мелких чисел, чтобы экономить память.
3. **Это деньги, цены или налоги?** Если да — всегда выбирайте `decimal` с суффиксом `m`. Он исключает погрешности округления.
4. **Обычная дробь (измерения, физика, проценты):** по умолчанию используйте `double`. Если пишете игру, работаете с 3D-графикой или координатами — берите облегчённый `float` с суффиксом `f`.

## Шпаргалка по задачам

| Задача | Подходящий тип | Суффикс | Почему именно он |
| --- | --- | --- | --- |
| Счётчики, возраст, индексы | `int` | — | Оптимальная скорость и запас до 2,14 млрд |
| Огромные целые числа, ID | `long` | `L` | Вмещает значения более 9 квинтиллионов |
| Цены, зарплаты, бухгалтерия | `decimal` | `m` | Десятичная точность без потери копеек |
| Температура, физика, формулы | `double` | — | Стандарт для дробных чисел высокой точности |
| Координаты и скорость в играх | `float` | `f` | Занимает в 2 раза меньше памяти, чем `double` |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. Обычный счёт и количество -> int
        int itemsCount = 15;

        // 2. Огромные числа (просмотры, ID) -> long (суффикс L)
        long totalViews = 5_400_000_000L;

        // 3. Деньги, цены и налоги -> decimal (суффикс m)
        decimal ticketPrice = 1499.90m;

        // 4. Физика и измерения -> double
        double averageSpeed = 64.75;

        // 5. Координаты и параметры в играх -> float (суффикс f)
        float jumpHeight = 2.5f;

        Console.WriteLine($"Билетов: {itemsCount}, цена: {ticketPrice} руб., скорость: {averageSpeed} км/ч");
    }
}

```

## Частые ошибки новичков

* **Считать деньги в `double`:** из-за двоичного округления `0.1 + 0.2` превращается в `0.30000000000000004`, что ломает финансовые отчёты.
* **Забывать суффиксы `f` и `m`:** любое дробное число без буквы в конце компилятор считает типом `double` и не разрешит записать во `float` или `decimal`.
* **Брать `byte` для одиночных переменных:** экономия 3 байт не даёт прироста скорости, но легко приводит к переполнению уже на числе `256`.

