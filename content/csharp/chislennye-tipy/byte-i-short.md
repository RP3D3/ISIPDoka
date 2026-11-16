---
title: byte и short
keywords: byte, short, sbyte, ushort, компактные целые числа, экономия памяти, диапазон значений, переполнение, приведение типов, переменная
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
  
      .belt-dash {
        stroke-dasharray: 6 6;
        animation: moveBelt 1.2s linear infinite;
      }
      .cargo-hop {
        transform-box: fill-box;
        transform-origin: center;
        animation: hopCargo 3.6s ease-in-out infinite;
      }
      .lid-pop {
        transform-box: fill-box;
        transform-origin: left bottom;
        animation: popLid 3.6s ease-in-out infinite;
      }
      .byte-shake {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: shakeByte 3.6s ease-in-out infinite;
      }
      .short-bob {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: bobShort 4s ease-in-out infinite;
      }
      .eyes-peek {
        transform-box: fill-box;
        transform-origin: center;
        animation: peekEyes 3.6s ease-in-out infinite;
      }
      .burst-pop {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: popBurst 3.6s ease-in-out infinite;
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
  
      @keyframes moveBelt {
        0% { stroke-dashoffset: 24; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes hopCargo {
        0%, 100% { transform: translateY(0px) rotate(-2deg); }
        50% { transform: translateY(-7px) rotate(2deg); }
      }
      @keyframes popLid {
        0%, 24%, 74%, 100% { transform: rotate(0deg) translateY(0px); }
        40%, 58% { transform: rotate(-18deg) translateY(-4px); }
      }
      @keyframes shakeByte {
        0%, 26%, 72%, 100% { transform: rotate(0deg); }
        36% { transform: rotate(-2deg); }
        44% { transform: rotate(2deg); }
        52% { transform: rotate(-1deg); }
      }
      @keyframes bobShort {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3px); }
      }
      @keyframes peekEyes {
        0%, 20%, 80%, 100% { transform: translate(-2px, 0px); }
        42%, 62% { transform: translate(2px, -1px); }
      }
      @keyframes popBurst {
        0%, 28%, 70%, 100% { transform: scale(0.75); opacity: 0.2; }
        42%, 56% { transform: scale(1.12); opacity: 1; }
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
    <g transform="translate(216, 40)">
      <g class="cloud-drift-1">
        <path d="M -22 7 H 22 C 27 7 31 3 31 -1 C 31 -5 27 -8 23 -8 C 21 -14 15 -17 9 -15 C 5 -20 -3 -20 -7 -15 C -13 -16 -18 -12 -18 -6 C -23 -6 -26 -2 -26 2 C -26 5 -24 7 -22 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
    <g transform="translate(652, 36)">
      <g class="cloud-drift-2">
        <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- LEFT SECTION: Mini Conveyor Belt Feeding Compact Numbers -->
    <!-- Oversized Number Tag Trying to Squeeze In (256 -> Overflow!) -->
    <g transform="translate(142, 114)">
      <g class="cargo-hop">
        <rect x="-44" y="-22" width="88" height="44" rx="14" class="c-white s-dark" stroke-width="2.2" />
        <rect x="-36" y="-15" width="72" height="30" rx="9" class="c-dark" />
        <text x="-7" y="6" text-anchor="middle" class="c-white mono" font-size="16" font-weight="700">256</text>
        <!-- Overflow Warning Dot -->
        <circle cx="23" cy="0" r="8" class="c-accent" />
        <text x="23" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">!</text>
      </g>
    </g>
  
    <!-- Conveyor Belt Chassis -->
    <g transform="translate(142, 186)">
      <!-- Support Legs -->
      <path d="M -52 16 L -58 46 H -44 L -38 16 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
      <path d="M 38 16 L 44 46 H 58 L 52 16 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
      <!-- Belt Frame -->
      <rect x="-74" y="-14" width="148" height="30" rx="15" class="c-dark s-white" stroke-width="2" />
      <line x1="-54" y1="-6" x2="54" y2="-6" class="s-white belt-dash" stroke-width="2.2" stroke-linecap="round" />
  
      <!-- 3 Conveyor Rollers -->
      <circle cx="-54" cy="1" r="7" class="c-white s-dark" stroke-width="1.8" />
      <circle cx="-54" cy="1" r="2.5" class="c-accent" />
      <circle cx="0" cy="1" r="7" class="c-white s-dark" stroke-width="1.8" />
      <circle cx="0" cy="1" r="2.5" class="c-accent" />
      <circle cx="54" cy="1" r="7" class="c-white s-dark" stroke-width="1.8" />
      <circle cx="54" cy="1" r="2.5" class="c-accent" />
    </g>
  
    <!-- Transfer Chute to Center Boxes -->
    <path d="M 222 186 H 264" class="s-white belt-dash" stroke-width="2.2" stroke-linecap="round" />
    <path d="M 258 181 L 266 186 L 258 191" class="s-white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- CENTER SECTION: Miniature Matchbox Containers (byte vs short) -->
    <!-- BOX 1: Tiny 1-Byte Locker (byte: 0..255) -->
    <g transform="translate(334, 168)">
      <g class="byte-shake">
        <!-- Popping Hinged Lid -->
        <g transform="translate(-54, -56)">
          <g class="lid-pop">
            <path d="M 0 0 H 108 V -14 Q 108 -24 98 -24 H 10 Q 0 -24 0 -14 Z" class="c-dark s-white" stroke-width="2" stroke-linejoin="round" />
            <rect x="24" y="-19" width="60" height="14" rx="7" class="c-accent" />
            <text x="54" y="-9" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">byte</text>
          </g>
        </g>
  
        <!-- Tiny Stubby Feet -->
        <path d="M -38 56 L -42 66 H -24 L -28 56 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <path d="M 28 56 L 24 66 H 42 L 38 56 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
        <!-- Compact White 1-Byte Body -->
        <rect x="-54" y="-56" width="108" height="112" rx="16" class="c-white s-dark" stroke-width="2.5" />
  
        <!-- Recessed Max Value Display: 255 -->
        <rect x="-40" y="-38" width="80" height="44" rx="9" class="c-dark" />
        <rect x="-34" y="-32" width="68" height="32" rx="6" class="c-white" />
        <text x="0" y="-10" text-anchor="middle" class="c-dark mono" font-size="20" font-weight="700">255</text>
  
        <!-- 1-Byte Memory Slot Indicator (1 filled + 3 ghosted int slots) -->
        <rect x="-40" y="18" width="80" height="24" rx="7" class="c-dark" />
        <!-- Filled 1 byte -->
        <rect x="-34" y="23" width="15" height="14" rx="3" class="c-accent" />
        <!-- Saved 3 bytes (dashed) -->
        <rect x="-15" y="23" width="15" height="14" rx="3" class="s-white" stroke-width="1.2" stroke-dasharray="2 2" />
        <rect x="4" y="23" width="15" height="14" rx="3" class="s-white" stroke-width="1.2" stroke-dasharray="2 2" />
        <rect x="23" y="23" width="11" height="14" rx="3" class="s-white" stroke-width="1.2" stroke-dasharray="2 2" />
      </g>
    </g>
  
    <!-- Kinetic Burst Rays at Popping byte Lid -->
    <g transform="translate(392, 92)">
      <g class="burst-pop">
        <line x1="4" y1="-4" x2="20" y2="-18" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="8" y1="8" x2="26" y2="4" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="-6" y1="-10" x2="-2" y2="-26" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="22" cy="-7" r="2.8" class="c-white" />
      </g>
    </g>
  
    <!-- BOX 2: Medium 2-Byte Locker (short: -32 768..32 767) -->
    <g transform="translate(508, 160)">
      <g class="short-bob">
        <!-- Grotesque Doka Eyes perched on top -->
        <g transform="translate(-32, -74)">
          <ellipse cx="-11" cy="0" rx="10" ry="13" class="c-white s-dark" stroke-width="2.2" />
          <ellipse cx="11" cy="0" rx="10" ry="13" class="c-white s-dark" stroke-width="2.2" />
          <g class="eyes-peek">
            <circle cx="-11" cy="1" r="3.5" class="c-dark" />
            <circle cx="11" cy="1" r="3.5" class="c-dark" />
          </g>
        </g>
  
        <!-- Support Feet -->
        <path d="M -68 64 L -74 74 H -52 L -56 64 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <path d="M 56 64 L 52 74 H 74 L 68 64 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
        <!-- Main White 2-Byte Body -->
        <rect x="-92" y="-64" width="184" height="128" rx="18" class="c-white s-dark" stroke-width="2.5" />
  
        <!-- Dark Header Bar -->
        <path d="M -74 -64 H 74 Q 92 -64 92 -46 V -32 H -92 V -46 Q -92 -64 -74 -64 Z" class="c-dark s-white" stroke-width="1.75" />
        <line x1="-91" y1="-32" x2="91" y2="-32" class="s-dark" stroke-width="2.5" />
  
        <!-- 3 Window Dots -->
        <circle cx="-70" cy="-48" r="3.8" class="c-accent" />
        <circle cx="-58" cy="-48" r="3.8" class="c-white" />
        <circle cx="-46" cy="-48" r="3.8" class="c-white" />
  
        <!-- Header Type Pill: short -->
        <rect x="12" y="-58" width="66" height="20" rx="10" class="c-accent" />
        <text x="45" y="-44" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">short</text>
  
        <!-- Recessed Max Value Display: 32 767 -->
        <rect x="-76" y="-18" width="152" height="44" rx="9" class="c-dark" />
        <rect x="-70" y="-12" width="140" height="32" rx="6" class="c-white" />
        <text x="0" y="10" text-anchor="middle" class="c-dark mono" font-size="20" font-weight="700">32 767</text>
  
        <!-- 2-Byte Memory Slot Indicator (2 filled + 2 ghosted int slots) -->
        <rect x="-76" y="34" width="152" height="20" rx="7" class="c-dark" />
        <!-- 2 Filled Bytes -->
        <rect x="-70" y="38" width="32" height="12" rx="3" class="c-accent" />
        <rect x="-34" y="38" width="32" height="12" rx="3" class="c-accent" />
        <!-- 2 Saved Bytes (dashed) -->
        <rect x="4" y="38" width="32" height="12" rx="3" class="s-white" stroke-width="1.2" stroke-dasharray="3 2" />
        <rect x="40" y="38" width="30" height="12" rx="3" class="s-white" stroke-width="1.2" stroke-dasharray="3 2" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Starburst & Dark Capsule Badges -->
    <!-- Connector Lines -->
    <circle cx="600" cy="156" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 604 156 H 636 V 100 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 636 156 V 198 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Badge: Starburst + sbyte · ushort Capsule -->
    <g transform="translate(748, 100)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-46 14,-28 42,-36 34,-12 62,0 34,12 42,36 14,28 0,46 -14,28 -42,36 -34,12 -62,0 -34,-12 -42,-36 -14,-28" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-78" y="-19" width="156" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">sbyte · ushort</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: Compact Byte Size Capsule -->
    <g transform="translate(748, 198)">
      <g class="pill-float">
        <rect x="-82" y="-19" width="164" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
        <circle cx="-64" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">1 Б · 2 Б (vs 4 Б)</text>
      </g>
    </g>
  </svg>
---

# Компактные целые числа: byte и short

Зачем нужны урезанные целочисленные типы, если есть привычный `int`, и как не поймать ошибку переполнения?

`byte` и `short` — это компактные целочисленные типы данных, которые занимают в оперативной памяти меньше места, чем стандартный `int` (1 и 2 байта вместо 4). Их используют для экономии памяти в огромных массивах, при чтении файлов, работе с сетью или кодировании цветов (например, каналы RGB от `0` до `255`).

## Основные характеристики

* **`byte` (`System.Byte`):** занимает **1 байт** (8 бит). Хранит только неотрицательные числа от `0` до `255`. Значение по умолчанию — `0`. *(Для чисел со знаком от `-128` до `127` есть аналог `sbyte`)*.
* **`short` (`System.Int16`):** занимает **2 байта** (16 бит). Хранит положительные и отрицательные числа от `-32 768` до `32 767`. Значение по умолчанию — `0`. *(Беззнаковый аналог `ushort` хранит от `0` до `65 535`)*.

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // byte подходит для возраста, процентов или каналов цвета RGB (0..255)
        byte redChannel = 255;
        byte studentAge = 20;

        // short удобен для небольших чисел со знаком
        short currentYear = 2026;
        short temperatureRecord = -89;

        // Важно: при сложении двух byte результат автоматически становится типом int!
        byte a = 100;
        byte b = 50;
        byte sum = (byte)(a + b); // Без явного приведения (byte) будет ошибка компиляции

        Console.WriteLine($"Цвет R: {redChannel}, год: {currentYear}, сумма: {sum}");
    }
}

```

## Важные нюансы

* **Автоматическое расширение до `int`:** при любых математических операциях (`+`, `-`, `*`, `/`) над переменными `byte` или `short` компилятор сначала превращает их в `int`. Чтобы записать результат обратно в компактный тип, требуется явное приведение: `(byte)(a + b)`.
* **Быстрое переполнение:** из-за узких границ легко выйти за предел типа (например, прибавить `1` к `255` в `byte`). В обычном режиме число «перекрутится» в начало диапазона и станет `0`, а внутри блока `checked` программа остановится с ошибкой `OverflowException`.
* **Не используйте для одиночных счётчиков:** для обычных переменных лучше брать `int` — современные 64-битные процессоры обрабатывают его быстрее всего. `byte` и `short` нужны там, где данных тысячи или миллионы.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Каков диапазон типа `byte`?",
  "options": [
    {
      "text": "`0…255`",
      "correct": true
    },
    {
      "text": "`-128…127`",
      "correct": false,
      "explanation": "Это диапазон `sbyte`."
    },
    {
      "text": "`0…65535`",
      "correct": false,
      "explanation": "Это диапазон `ushort`."
    }
  ],
  "explanation": "`byte` — беззнаковый 8-битный тип."
}
```

```quiz
{
  "type": "radio",
  "question": "Что произойдёт при `byte b = 255; b++;`?",
  "options": [
    {
      "text": "`b` станет `0`",
      "correct": true,
      "explanation": "Произойдёт переполнение и заворот."
    },
    {
      "text": "`b` станет `256`",
      "correct": false,
      "explanation": "`256` не помещается в `byte`."
    },
    {
      "text": "Ошибка компиляции",
      "correct": false,
      "explanation": "Код компилируется, но значение переполнится."
    }
  ],
  "explanation": "В обычном режиме переполнение заворачивает число в начало диапазона."
}
```
