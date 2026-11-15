---
title: char
keywords: char, System.Char, символьный тип данных, одиночный символ, одинарные кавычки, таблица Unicode, код символа, буква, переменная
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
  
      .caliper-left {
        transform-box: fill-box;
        transform-origin: left center;
        animation: squeezeLeft 3.8s ease-in-out infinite;
      }
      .caliper-right {
        transform-box: fill-box;
        transform-origin: right center;
        animation: squeezeRight 3.8s ease-in-out infinite;
      }
      .token-bob {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobToken 3.8s ease-in-out infinite;
      }
      .eyes-scan {
        transform-box: fill-box;
        transform-origin: center;
        animation: scanDial 3.8s ease-in-out infinite;
      }
      .dial-pulse {
        transform-box: fill-box;
        transform-origin: center;
        animation: pulseDial 3.8s ease-in-out infinite;
      }
      .burst-pop {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: popBurst 3.8s ease-in-out infinite;
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
  
      @keyframes squeezeLeft {
        0%, 100% { transform: translateX(0px) rotate(0deg); }
        50% { transform: translateX(7px) rotate(1.5deg); }
      }
      @keyframes squeezeRight {
        0%, 100% { transform: translateX(0px) rotate(0deg); }
        50% { transform: translateX(-7px) rotate(-1.5deg); }
      }
      @keyframes bobToken {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-4px) rotate(-1.5deg); }
        50% { transform: translateY(0px) rotate(0deg); }
        75% { transform: translateY(-4px) rotate(1.5deg); }
      }
      @keyframes scanDial {
        0%, 20%, 80%, 100% { transform: translate(0px, 0px); }
        45%, 55% { transform: translate(0px, 3px); }
      }
      @keyframes pulseDial {
        0%, 30%, 70%, 100% { transform: scale(1); }
        50% { transform: scale(1.06); }
      }
      @keyframes popBurst {
        0%, 28%, 72%, 100% { transform: scale(0.75); opacity: 0.2; }
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
    <g transform="translate(182, 42)">
      <g class="cloud-drift-1">
        <path d="M -22 7 H 22 C 27 7 31 3 31 -1 C 31 -5 27 -8 23 -8 C 21 -14 15 -17 9 -15 C 5 -20 -3 -20 -7 -15 C -13 -16 -18 -12 -18 -6 C -23 -6 -26 -2 -26 2 C -26 5 -24 7 -22 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
    <g transform="translate(652, 36)">
      <g class="cloud-drift-2">
        <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- DOMINANT CENTRAL COMPOSITION: Two Cartoon Hands Holding Single Quotes Around One Character Coin -->
    <!-- LEFT CARTOON HAND + OPENING SINGLE QUOTE (') -->
    <g transform="translate(184, 148)">
      <g class="caliper-left">
        <!-- Dark Sleeve -->
        <path d="M -126 -14 L -32 -12 L -32 18 L -126 20 Z" class="c-dark s-white" stroke-width="2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M -38 -13 L -18 -12 L -18 18 L -38 19 Z" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <circle cx="-28" cy="10" r="2.2" class="c-dark" />
  
        <!-- Giant Opening Single Quote Caliper (') -->
        <path d="M 14 -42 C 14 -56, 26 -66, 38 -66 C 50 -66, 58 -56, 58 -42 C 58 -16, 42 4, 20 14 L 12 2 C 28 -6, 36 -16, 36 -26 C 24 -26, 14 -32, 14 -42 Z" class="c-white s-dark" stroke-width="2.5" stroke-linejoin="round" />
        <circle cx="35" cy="-46" r="6" class="c-accent" />
  
        <!-- Cartoon Round Hand Gripping the Quote -->
        <circle cx="0" cy="3" r="20" class="c-white s-dark" stroke-width="2.4" />
        <path d="M -11 -2 L -5 0" class="s-dark" stroke-width="1.8" stroke-linecap="round" />
        <path d="M -12 6 L -6 7" class="s-dark" stroke-width="1.8" stroke-linecap="round" />
      </g>
    </g>
  
    <!-- CENTRAL DOMINANT OBJECT: Single-Character Medallion & Unicode Code Decoder -->
    <g transform="translate(364, 148)">
      <g class="token-bob">
        <!-- Grotesque Doka Eyes perched on top of the Single Character Coin -->
        <g transform="translate(0, -86)">
          <ellipse cx="-13" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
          <ellipse cx="13" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
          <g class="eyes-scan">
            <circle cx="-13" cy="1" r="3.8" class="c-dark" />
            <circle cx="13" cy="1" r="3.8" class="c-dark" />
          </g>
        </g>
  
        <!-- Outer White Single-Character Medallion Ring -->
        <circle cx="0" cy="-12" r="64" class="c-white s-dark" stroke-width="2.5" />
        <!-- Inner Dark Recessed Well -->
        <circle cx="0" cy="-12" r="50" class="c-dark" />
        <!-- Precision Crosshair Ticks -->
        <line x1="0" y1="-58" x2="0" y2="-51" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="-46" y1="-12" x2="-39" y2="-12" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="39" y1="-12" x2="46" y2="-12" class="s-white" stroke-width="2" stroke-linecap="round" />
  
        <!-- Single Accent Badge Top-Left of Coin: char -->
        <rect x="-32" y="-76" width="64" height="20" rx="10" class="c-accent s-dark" stroke-width="1.8" />
        <text x="0" y="-62" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">char</text>
  
        <!-- The Single Character Inside ('Ж') -->
        <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="52" font-weight="700">Ж</text>
  
        <!-- Mechanical Link Neck to Unicode Code Plate -->
        <rect x="-14" y="48" width="28" height="16" class="c-dark s-white" stroke-width="1.75" />
  
        <!-- Bottom Unicode Code Plate: U+0416 · 1046 -->
        <g transform="translate(0, 74)">
          <g class="dial-pulse">
            <rect x="-74" y="-18" width="148" height="36" rx="18" class="c-white s-dark" stroke-width="2.4" />
            <rect x="-66" y="-12" width="54" height="24" rx="12" class="c-accent" />
            <text x="-39" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">1046</text>
            <text x="26" y="4" text-anchor="middle" class="c-dark mono" font-size="13" font-weight="700">U+0416</text>
          </g>
        </g>
      </g>
    </g>
  
    <!-- RIGHT CARTOON HAND + CLOSING SINGLE QUOTE (') -->
    <g transform="translate(544, 148)">
      <g class="caliper-right">
        <!-- Dark Sleeve -->
        <path d="M 32 -12 L 106 -14 L 106 20 L 32 18 Z" class="c-dark s-white" stroke-width="2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M 18 -12 L 38 -13 L 38 19 L 18 18 Z" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <circle cx="28" cy="10" r="2.2" class="c-dark" />
  
        <!-- Giant Closing Single Quote Caliper (') -->
        <path d="M -58 -42 C -58 -56, -46 -66, -34 -66 C -22 -66, -14 -56, -14 -42 C -14 -16, -30 4, -52 14 L -60 2 C -44 -6, -36 -16, -36 -26 C -48 -26, -58 -32, -58 -42 Z" class="c-white s-dark" stroke-width="2.5" stroke-linejoin="round" />
        <circle cx="-37" cy="-46" r="6" class="c-accent" />
  
        <!-- Cartoon Round Hand Gripping the Quote -->
        <circle cx="0" cy="3" r="20" class="c-white s-dark" stroke-width="2.4" />
        <path d="M 5 0 L 11 -2" class="s-dark" stroke-width="1.8" stroke-linecap="round" />
        <path d="M 6 7 L 12 6" class="s-dark" stroke-width="1.8" stroke-linecap="round" />
      </g>
    </g>
  
    <!-- Kinetic Burst Rays above Closing Quote -->
    <g transform="translate(524, 72)">
      <g class="burst-pop">
        <line x1="4" y1="-4" x2="20" y2="-18" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="8" y1="8" x2="26" y2="4" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="-6" y1="-10" x2="-2" y2="-26" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="22" cy="-7" r="2.8" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Starburst & Dark Capsule Badges -->
    <!-- Connector Lines -->
    <circle cx="650" cy="148" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 654 148 H 668 V 100 H 684" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 668 148 V 198 H 684" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Badge: Starburst + System.Char Capsule -->
    <g transform="translate(760, 100)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-44 13,-26 39,-34 32,-11 58,0 32,11 39,34 13,26 0,44 -13,26 -39,34 -32,11 -58,0 -32,-11 -39,-34 -13,-26" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-74" y="-18" width="148" height="36" rx="18" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">System.Char</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: 16-Bit & 2 Bytes Capsule -->
    <g transform="translate(760, 198)">
      <g class="pill-float">
        <rect x="-78" y="-18" width="156" height="36" rx="18" class="c-dark s-white" stroke-width="2" />
        <circle cx="-60" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">16-bit · UTF-16</text>
      </g>
    </g>
  </svg>
---

# Символьный тип char

Как сохранить всего одну букву, цифру или знак и узнать их числовой код в таблице Unicode?

`char` (от англ. *character* — символ) — это базовый тип данных для хранения строго одного одиночного символа: буквы, цифры, знака препинания или спецсимвола. Значение этого типа всегда заключается в одинарные кавычки `'...'`.

## Основные характеристики

* **Размер в памяти:** 2 байта (16 бит) — хранит символы в кодировке UTF-16 (Unicode).
* **Диапазон кодов:** от `0` до `65 535` (каждому знаку соответствует свой уникальный порядковый номер).
* **Полное имя типа:** `System.Char`.
* **Значение по умолчанию:** `'\0'` (нулевой управляющий символ с кодом `0`).

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // Значение char всегда пишется в одинарных кавычках
        char grade = 'A';
        char currency = '₽';
        char digit = '7';

        // Можно узнать числовой код символа в таблице Unicode
        int code = (int)grade; // Получится 65

        // Встроенные методы проверки типа символа
        bool isLetter = char.IsLetter(grade); // true
        bool isNumber = char.IsDigit(digit);  // true

        Console.WriteLine($"Символ: {grade}, его код: {code}, валюта: {currency}");
        Console.WriteLine($"Это буква: {isLetter}, это цифра: {isNumber}");
    }
}

```

## Важные нюансы

* **Только одинарные кавычки и ровно один знак:** попытка записать два символа (`'AB'`) или пустоту (`''`) вызовет ошибку компиляции. Для нескольких букв или пустого текста используется тип `string` в двойных кавычках `"..."`.
* **Символ `'5'` — не число `5`:** внутри `char` цифра `'5'` хранится как знак с кодом `53`, поэтому с ней нельзя напрямую выполнять обычную математику.
* **Готовые проверки `char.Is...`:** у типа есть удобные встроенные методы для анализа ввода — `char.IsDigit()` (проверка на цифру), `char.IsLetter()` (на букву), `char.IsWhiteSpace()` (на пробел) и `char.ToUpper()` (перевод в заглавную).

