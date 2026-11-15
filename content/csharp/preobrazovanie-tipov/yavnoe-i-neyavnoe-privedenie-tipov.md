---
title: Приведение типов
keywords: приведение типов, неявное преобразование, явное приведение, кастинг, int, double, потеря точности, деление целых чисел, округление
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
  
      .hand-lever {
        transform-box: fill-box;
        transform-origin: left center;
        animation: pullLever 4s ease-in-out infinite;
      }
      .blade-chop {
        transform-box: fill-box;
        transform-origin: top center;
        animation: chopBlade 4s ease-in-out infinite;
      }
      .tail-eject {
        transform-box: fill-box;
        transform-origin: center;
        animation: ejectTail 4s ease-in-out infinite;
      }
      .eyes-watch {
        transform-box: fill-box;
        transform-origin: center;
        animation: watchCut 4s ease-in-out infinite;
      }
      .burst-pop {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: popBurst 4s ease-in-out infinite;
      }
      .rail-flow {
        stroke-dasharray: 5 5;
        animation: flowRail 1.2s linear infinite;
      }
      .widen-bob {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobWiden 3.6s ease-in-out infinite;
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
  
      @keyframes pullLever {
        0%, 18%, 76%, 100% { transform: rotate(-14deg); }
        38%, 58% { transform: rotate(10deg); }
      }
      @keyframes chopBlade {
        0%, 18%, 76%, 100% { transform: translateY(0px); }
        38%, 58% { transform: translateY(18px); }
      }
      @keyframes ejectTail {
        0%, 26%, 78%, 100% { transform: translate(0px, 0px) rotate(0deg); }
        42%, 62% { transform: translate(18px, -18px) rotate(18deg); }
      }
      @keyframes watchCut {
        0%, 20%, 78%, 100% { transform: translate(0px, 1px); }
        42%, 62% { transform: translate(3px, -2px); }
      }
      @keyframes popBurst {
        0%, 30%, 74%, 100% { transform: scale(0.75); opacity: 0.2; }
        42%, 58% { transform: scale(1.12); opacity: 1; }
      }
      @keyframes flowRail {
        0% { stroke-dashoffset: 20; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes bobWiden {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
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
    <g transform="translate(658, 36)">
      <g class="cloud-drift-2">
        <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- LEFT SECTION: Implicit Widening Bridge (5 -> 5.0) & Input double Block (3.99) -->
    <!-- Top Implicit Widening Pill: int 5 -> double 5.0 -->
    <g transform="translate(144, 84)">
      <g class="widen-bob">
        <rect x="-66" y="-19" width="132" height="38" rx="19" class="c-dark s-white" stroke-width="1.8" />
        <rect x="-58" y="-12" width="34" height="24" rx="12" class="c-white" />
        <text x="-41" y="4" text-anchor="middle" class="c-dark mono" font-size="13" font-weight="700">5</text>
        <path d="M -18 0 H -4 M -8 -4 L -3 0 L -8 4" class="s-white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        <rect x="4" y="-12" width="54" height="24" rx="12" class="c-accent" />
        <text x="31" y="4" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">5.0</text>
      </g>
    </g>
  
    <!-- Source Block: double 3.99 -->
    <g transform="translate(144, 172)">
      <rect x="-62" y="-32" width="124" height="64" rx="16" class="c-white s-dark" stroke-width="2.4" />
      <rect x="-54" y="-24" width="108" height="48" rx="11" class="c-dark" />
      <text x="-22" y="7" text-anchor="middle" class="c-white mono" font-size="22" font-weight="700">3</text>
      <!-- Accent Fractional Part .99 -->
      <rect x="-2" y="-16" width="48" height="32" rx="7" class="c-accent" />
      <text x="22" y="6" text-anchor="middle" class="c-white mono" font-size="17" font-weight="700">.99</text>
    </g>
  
    <!-- Feed Rail from 3.99 into (int) Press -->
    <path d="M 210 172 H 288" class="s-white rail-flow" stroke-width="2.4" stroke-linecap="round" />
    <circle cx="288" cy="172" r="4" class="c-white s-dark" stroke-width="1.75" />
  
    <!-- CENTER SECTION: Explicit Type-Cast Guillotine Press (int) -->
    <g transform="translate(444, 156)">
      <!-- Grotesque Doka Eyes perched on top left -->
      <g transform="translate(-66, -82)">
        <ellipse cx="-13" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
        <ellipse cx="11" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
        <g class="eyes-watch">
          <circle cx="-11" cy="1" r="3.8" class="c-dark" />
          <circle cx="13" cy="1" r="3.8" class="c-dark" />
        </g>
      </g>
  
      <!-- Heavy Mechanical Feet -->
      <path d="M -124 72 L -132 86 H -100 L -106 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
      <path d="M 106 72 L 100 86 H 132 L 124 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
      <!-- Main White Press Housing -->
      <rect x="-154" y="-72" width="308" height="144" rx="18" class="c-white s-dark" stroke-width="2.5" />
  
      <!-- Dark Window Header Bar -->
      <path d="M -136 -72 H 136 Q 154 -72 154 -54 V -38 H -154 V -54 Q -154 -72 -136 -72 Z" class="c-dark s-white" stroke-width="1.75" />
      <line x1="-153" y1="-38" x2="153" y2="-38" class="s-dark" stroke-width="2.5" />
  
      <!-- 3 Doka Header Dots -->
      <circle cx="-130" cy="-55" r="4" class="c-accent" />
      <circle cx="-116" cy="-55" r="4" class="c-white" />
      <circle cx="-102" cy="-55" r="4" class="c-white" />
  
      <!-- Header Cast Badge: (int) -->
      <rect x="62" y="-65" width="74" height="20" rx="10" class="c-accent" />
      <text x="99" y="-51" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">(int)</text>
  
      <!-- Recessed Press Chamber -->
      <rect x="-136" y="-24" width="272" height="58" rx="11" class="c-dark" />
  
      <!-- Result Integer Block Inside Press: 3 -->
      <rect x="-92" y="-14" width="66" height="40" rx="8" class="c-white" />
      <text x="-59" y="14" text-anchor="middle" class="c-dark mono" font-size="25" font-weight="700">3</text>
  
      <!-- Chopping Guillotine Blade Between Integer and Fractional Tail -->
      <g transform="translate(-14, -22)">
        <g class="blade-chop">
          <rect x="-4" y="0" width="8" height="36" rx="3" class="c-white s-dark" stroke-width="1.8" />
          <polygon points="-10,28 10,28 0,40" class="c-accent s-dark" stroke-width="1.8" stroke-linejoin="round" />
        </g>
      </g>
  
      <!-- Sliced-Off Fractional Tail (.99) Popping Out -->
      <g transform="translate(30, 6)">
        <g class="tail-eject">
          <rect x="-24" y="-16" width="48" height="32" rx="7" class="c-accent s-white" stroke-width="1.8" />
          <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="16" font-weight="700">.99</text>
        </g>
      </g>
  
      <!-- Safe Division Tip Strip at Bottom: (double)a / b -->
      <rect x="-136" y="42" width="272" height="20" rx="8" class="c-dark" />
      <circle cx="-122" cy="52" r="4" class="c-accent" />
      <text x="6" y="56" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">(double)5 / 2 → 2.5</text>
    </g>
  
    <!-- Cartoon Round Hand Pulling Press Lever on Top-Right of Machine -->
    <g transform="translate(556, 72)">
      <g class="hand-lever">
        <!-- Lever Shaft -->
        <rect x="-6" y="-6" width="48" height="10" rx="5" class="c-dark s-white" stroke-width="1.8" />
        <!-- Cartoon Round Hand -->
        <circle cx="44" cy="-1" r="16" class="c-white s-dark" stroke-width="2.3" />
        <path d="M 35 -5 L 40 -3" class="s-dark" stroke-width="1.75" stroke-linecap="round" />
        <path d="M 34 2 L 39 3" class="s-dark" stroke-width="1.75" stroke-linecap="round" />
      </g>
      <!-- Lever Pivot -->
      <circle cx="0" cy="0" r="8" class="c-white s-dark" stroke-width="2" />
      <circle cx="0" cy="0" r="3.5" class="c-accent" />
    </g>
  
    <!-- Kinetic Burst Rays around Truncated .99 -->
    <g transform="translate(516, 122)">
      <g class="burst-pop">
        <line x1="4" y1="-4" x2="20" y2="-18" class="s-white" stroke-width="2.4" stroke-linecap="round" />
        <line x1="8" y1="8" x2="26" y2="4" class="s-white" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="22" cy="-7" r="2.8" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Starburst & Dark Capsule Badges -->
    <!-- Connector Lines -->
    <circle cx="598" cy="156" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 602 156 H 636 V 102 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 636 156 V 198 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Badge: Starburst + (тип) Cast Capsule -->
    <g transform="translate(748, 102)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-46 14,-28 42,-36 34,-12 62,0 34,12 42,36 14,28 0,46 -14,28 -42,36 -34,12 -62,0 -34,-12 -42,-36 -14,-28" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-78" y="-19" width="156" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">(int) · (double)</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: Implicit & Explicit Capsule -->
    <g transform="translate(748, 198)">
      <g class="pill-float">
        <rect x="-82" y="-19" width="164" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
        <circle cx="-64" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">неявное и явное</text>
      </g>
    </g>
  </svg>
---

# Неявное и явное приведение типов

Как перевести число из одного типа в другой и не потерять дробную часть при делении?

Приведение типов (casting) — это преобразование значения одного совместимого типа данных в другой (например, из целого числа в дробное и обратно). Оно бывает автоматическим (неявным) и ручным (явным).

## Два способа приведения

* **Неявное приведение (безопасное расширение):** выполняется компилятором автоматически, когда меньший тип помещается в больший без потери данных (например, из `int` в `long` или из `int` в `double`). Дополнительный код не требуется.
* **Явное приведение (сужение с риском потери):** выполняется вручную с помощью круглых скобок `(тип)` перед значением (например, `(int)3.99`). Используется там, где часть данных может отброситься.

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. Неявное приведение (из меньшего типа в больший — без потерь)
        int small = 42;
        double big = small; // Автоматически превратится в 42.0

        // 2. Явное приведение (дробная часть просто отбрасывается)
        double price = 19.99;
        int roundedPrice = (int)price; // Получится 19, а не 20

        // 3. Деление двух int: приводим одно число к double до деления
        int a = 5;
        int b = 2;
        double exactResult = (double)a / b; // Получится 2.5 (без (double) было бы 2)

        Console.WriteLine($"Неявно: {big}, явно: {roundedPrice}, деление: {exactResult}");
    }
}

```

## Важные нюансы

* **Отбрасывание вместо округления:** при явном приведении `(int)9.9` дробная часть срезается нацело — получается `9`. Для обычного математического округления используют `Math.Round()`.
* **Приоритет скобок при делении:** писать `(double)(a / b)` бесполезно — сначала выполнится целочисленное деление `5 / 2 = 2`, и только потом результат станет `2.0`. Приводить нужно одно из чисел до операции: `(double)a / b`.
* **Только совместимые типы:** скобки `(int)` работают между числами и символами `char`, но не умеют превращать текст `"123"` в число — для строк используют `Parse`, `TryParse` и `Convert`.

