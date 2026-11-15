---
title: float
keywords: float, System.Single, дробные числа, суффикс f, плавающая точка, одинарная точность, вещественный тип, координаты, игры, переменная
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
  
      .key-stamp {
        transform-box: fill-box;
        transform-origin: center bottom;
        animation: stampKey 3.6s ease-in-out infinite;
      }
      .hand-tap {
        transform-box: fill-box;
        transform-origin: left center;
        animation: tapHand 3.6s ease-in-out infinite;
      }
      .crystal-float {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatCrystal 3.2s ease-in-out infinite;
      }
      .eyes-track {
        transform-box: fill-box;
        transform-origin: center;
        animation: trackCrystal 3.2s ease-in-out infinite;
      }
      .pulse-dash {
        stroke-dasharray: 5 5;
        animation: dashPulse 1.1s linear infinite;
      }
      .burst-flash {
        transform-box: fill-box;
        transform-origin: center;
        animation: flashBurst 3.6s ease-in-out infinite;
      }
      .star-bob {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobStar 4.8s ease-in-out infinite;
      }
      .pill-bob {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobPill 4.8s ease-in-out infinite;
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
  
      @keyframes stampKey {
        0%, 22%, 68%, 100% { transform: translateY(0px); }
        38%, 50% { transform: translateY(8px); }
      }
      @keyframes tapHand {
        0%, 20%, 70%, 100% { transform: translateY(0px) rotate(0deg); }
        38%, 50% { transform: translateY(7px) rotate(2deg); }
      }
      @keyframes floatCrystal {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-7px); }
      }
      @keyframes trackCrystal {
        0%, 100% { transform: translate(0px, 1px); }
        50% { transform: translate(0px, -2px); }
      }
      @keyframes dashPulse {
        0% { stroke-dashoffset: 20; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes flashBurst {
        0%, 34%, 66%, 100% { transform: scale(0.75); opacity: 0.2; }
        44%, 54% { transform: scale(1.12); opacity: 1; }
      }
      @keyframes bobStar {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-4px) rotate(2deg); }
      }
      @keyframes bobPill {
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
    <g transform="translate(222, 38)">
      <g class="cloud-drift-1">
        <path d="M -22 7 H 22 C 27 7 31 3 31 -1 C 31 -5 27 -8 23 -8 C 21 -14 15 -17 9 -15 C 5 -20 -3 -20 -7 -15 C -13 -16 -18 -12 -18 -6 C -23 -6 -26 -2 -26 2 C -26 5 -24 7 -22 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
    <g transform="translate(668, 36)">
      <g class="cloud-drift-2">
        <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- LEFT SECTION: Giant 'f' Suffix Keycap & Cartoon Round Hand -->
    <!-- Keycap Base Socket -->
    <g transform="translate(154, 186)">
      <rect x="-46" y="-12" width="92" height="44" rx="14" class="c-dark s-white" stroke-width="2" />
      <line x1="-30" y1="20" x2="30" y2="20" class="s-white" stroke-width="1.5" stroke-linecap="round" />
  
      <!-- Animated Keycap Top ('f') -->
      <g transform="translate(0, -14)">
        <g class="key-stamp">
          <rect x="-38" y="-34" width="76" height="58" rx="14" class="c-white s-dark" stroke-width="2.4" />
          <rect x="-28" y="-26" width="56" height="42" rx="9" class="c-accent" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="28" font-weight="700">f</text>
        </g>
      </g>
    </g>
  
    <!-- Cartoon Round Hand Tapping the 'f' Key -->
    <g transform="translate(106, 98)">
      <g class="hand-tap">
        <path d="M -54 -14 L 18 -8 L 15 16 L -54 12 Z" class="c-dark s-white" stroke-width="2" stroke-linejoin="round" />
        <path d="M 14 -9 L 30 -7 L 27 17 L 11 15 Z" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <circle cx="44" cy="6" r="17" class="c-white s-dark" stroke-width="2.3" />
        <path d="M 33 2 L 38 4" class="s-dark" stroke-width="1.75" stroke-linecap="round" />
        <path d="M 32 9 L 37 10" class="s-dark" stroke-width="1.75" stroke-linecap="round" />
      </g>
    </g>
  
    <!-- Signal Cable from 'f' Key to Central Viewport -->
    <path d="M 200 192 H 264" class="s-white pulse-dash" stroke-width="2.4" stroke-linecap="round" />
    <circle cx="264" cy="192" r="4" class="c-white s-dark" stroke-width="1.75" />
  
    <!-- CENTER DOMINANT OBJECT: 3D Game-Engine Viewport Console (float) -->
    <g transform="translate(450, 144)">
      <!-- Grotesque Doka Eyes Peeking Over Console -->
      <g transform="translate(0, -98)">
        <ellipse cx="-14" cy="0" rx="12" ry="15" class="c-white s-dark" stroke-width="2.2" />
        <ellipse cx="14" cy="0" rx="12" ry="15" class="c-white s-dark" stroke-width="2.2" />
        <g class="eyes-track">
          <circle cx="-14" cy="2" r="4" class="c-dark" />
          <circle cx="14" cy="2" r="4" class="c-dark" />
        </g>
      </g>
  
      <!-- Heavy Console Stand Feet -->
      <path d="M -144 88 L -154 104 H -114 L -122 88 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
      <path d="M 122 88 L 114 104 H 154 L 144 88 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
      <!-- Main White Console Housing -->
      <rect x="-184" y="-88" width="368" height="176" rx="20" class="c-white s-dark" stroke-width="2.5" />
  
      <!-- Dark Browser/Engine Header Bar -->
      <path d="M -164 -88 H 164 Q 184 -88 184 -68 V -52 H -184 V -68 Q -184 -88 -164 -88 Z" class="c-dark s-white" stroke-width="1.75" />
      <line x1="-183" y1="-52" x2="183" y2="-52" class="s-dark" stroke-width="2.5" />
  
      <!-- 3 Header Window Dots -->
      <circle cx="-158" cy="-70" r="4.5" class="c-accent" />
      <circle cx="-142" cy="-70" r="4.5" class="c-white" />
      <circle cx="-126" cy="-70" r="4.5" class="c-white" />
  
      <!-- Header Type Pill: float -->
      <rect x="86" y="-80" width="78" height="22" rx="11" class="c-accent" />
      <text x="125" y="-65" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">float</text>
  
      <!-- Left Sub-Panel: 3D Coordinate Viewport -->
      <rect x="-166" y="-36" width="184" height="108" rx="12" class="c-dark" />
  
      <!-- Perspective 3D Floor Grid inside Viewport -->
      <path d="M -150 56 L -126 32 H -22 L 2 56 Z" class="s-white" stroke-width="1.3" stroke-linejoin="round" />
      <line x1="-74" y1="32" x2="-74" y2="56" class="s-white" stroke-width="1.2" />
      <line x1="-138" y1="44" x2="-10" y2="44" class="s-white" stroke-width="1.2" />
  
      <!-- Levitating Isometric 3D Gem / Cube -->
      <g transform="translate(-74, 2)">
        <g class="crystal-float">
          <!-- Top Rhombus -->
          <polygon points="0,-24 24,-10 0,4 -24,-10" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
          <!-- Left Face -->
          <polygon points="-24,-10 0,4 0,28 -24,14" class="c-accent s-dark" stroke-width="2" stroke-linejoin="round" />
          <!-- Right Face -->
          <polygon points="0,4 24,-10 24,14 0,28" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        </g>
      </g>
  
      <!-- Right Sub-Panel: Compact Float Literals & 32-Bit Memory Bar -->
      <!-- Literal 1: x = 0.5f -->
      <rect x="30" y="-36" width="136" height="28" rx="8" class="c-dark" />
      <text x="86" y="-17" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">x = 0.5</text>
      <rect x="132" y="-31" width="26" height="18" rx="5" class="c-accent" />
      <text x="145" y="-18" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">f</text>
  
      <!-- Literal 2: y = 3.14f -->
      <rect x="30" y="0" width="136" height="28" rx="8" class="c-dark" />
      <text x="86" y="19" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">y = 3.14</text>
      <rect x="132" y="5" width="26" height="18" rx="5" class="c-accent" />
      <text x="145" y="18" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">f</text>
  
      <!-- Memory Economy Gauge: 1/2 Slot Used (4 bytes vs 8 bytes) -->
      <rect x="30" y="38" width="136" height="34" rx="9" class="c-dark" />
      <!-- Used 32-bit half -->
      <rect x="36" y="44" width="60" height="22" rx="6" class="c-accent" />
      <text x="66" y="59" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">4 Б</text>
      <!-- Saved 32-bit half (dashed outline) -->
      <rect x="102" y="45" width="58" height="20" rx="5" class="s-white" stroke-width="1.5" stroke-dasharray="3 3" />
      <text x="131" y="59" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">-50%</text>
    </g>
  
    <!-- Kinetic Burst Rays at Top-Right of Console -->
    <g transform="translate(638, 64)">
      <g class="burst-flash">
        <line x1="4" y1="-4" x2="22" y2="-20" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="10" y1="8" x2="30" y2="4" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="-6" y1="-10" x2="-2" y2="-28" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="26" cy="-8" r="3" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Starburst & Dark Capsule Badges -->
    <!-- Connector Lines -->
    <circle cx="634" cy="144" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 638 144 H 662 V 98 H 682" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 662 144 V 196 H 682" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Badge: Starburst + System.Single Capsule -->
    <g transform="translate(760, 98)">
      <g class="star-bob">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-44 13,-26 39,-34 32,-11 58,0 32,11 39,34 13,26 0,44 -13,26 -39,34 -32,11 -58,0 -32,-11 -39,-34 -13,-26" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-74" y="-18" width="148" height="36" rx="18" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">System.Single</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: Precision & Size Capsule -->
    <g transform="translate(760, 196)">
      <g class="pill-bob">
        <rect x="-78" y="-18" width="156" height="36" rx="18" class="c-dark s-white" stroke-width="2" />
        <circle cx="-60" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">32-bit · ~7 цифр</text>
      </g>
    </g>
  </svg>
---

# Дробный тип float

Зачем в конце дробного числа ставить букву `f` и где экономия памяти важнее максимальной точности?

`float` (от англ. *floating point* — плавающая точка) — облегчённый дробный тип одинарной точности. Он занимает в два раза меньше памяти, чем `double`, поэтому широко применяется в разработке игр (например, в движке Unity), 3D-графике и физике.

## Основные характеристики

* **Размер в памяти:** 4 байта (32 бита).
* **Точность:** 6–9 значащих цифр.
* **Диапазон значений:** от `±1.5e-45` до `±3.4e38`.
* **Полное имя типа:** `System.Single`.
* **Значение по умолчанию:** `0.0f`.

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // Суффикс f обязателен, иначе компилятор посчитает число типом double
        float speed = 12.5f;
        float gravity = 9.81F;

        // Ограничение точности: лишние знаки после 7-й цифры округлятся
        float preciseTest = 1.123456789f; // В памяти сохранится ~1.1234568

        // float автоматически помещается в double без потери данных
        double expanded = speed;

        Console.WriteLine($"Скорость: {speed}, тест точности: {preciseTest}");
    }
}

```

## Важные нюансы

* **Обязательный суффикс `f` или `F`:** любое дробное число в коде без суффикса компилятор считает типом `double` (8 байт) и запрещает записывать в `float` (4 байта) из-за риска потери точности.
* **Меньше знаков после запятой:** после 6–7 значащих цифр `float` начинает округлять значение, поэтому для сложных расчётов лучше брать `double`, а для денег — `decimal`.
* **Скорость и экономия памяти:** в играх и графике координаты тысяч объектов хранят во `float`, чтобы экономить оперативную память и быстрее передавать данные на видеокарту.

