---
title: Convert
keywords: Convert, ToInt32, ToDouble, ToBoolean, преобразование типов, конвертация данных, перевод строки в число, округление, логический тип
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
  
      .plug-bob-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobPlug1 3.6s ease-in-out infinite;
      }
      .plug-bob-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobPlug2 3.6s ease-in-out infinite;
      }
      .plug-bob-3 {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobPlug3 3.6s ease-in-out infinite;
      }
      .wire-flow {
        stroke-dasharray: 5 5;
        animation: flowWire 1.2s linear infinite;
      }
      .dial-spin {
        transform-box: fill-box;
        transform-origin: center;
        animation: spinDial 6s ease-in-out infinite;
      }
      .hand-plug {
        transform-box: fill-box;
        transform-origin: right center;
        animation: pushPlug 3.8s ease-in-out infinite;
      }
      .eyes-scan {
        transform-box: fill-box;
        transform-origin: center;
        animation: scanInputs 3.8s ease-in-out infinite;
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
  
      @keyframes bobPlug1 {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(4px); }
      }
      @keyframes bobPlug2 {
        0%, 100% { transform: translateX(4px); }
        50% { transform: translateX(0px); }
      }
      @keyframes bobPlug3 {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(4px); }
      }
      @keyframes flowWire {
        0% { stroke-dashoffset: 20; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes spinDial {
        0%, 20% { transform: rotate(0deg); }
        35%, 55% { transform: rotate(120deg); }
        70%, 90% { transform: rotate(240deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pushPlug {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(-5px); }
      }
      @keyframes scanInputs {
        0%, 100% { transform: translate(-2px, -2px); }
        50% { transform: translate(2px, 2px); }
      }
      @keyframes popBurst {
        0%, 30%, 72%, 100% { transform: scale(0.75); opacity: 0.2; }
        45%, 58% { transform: scale(1.12); opacity: 1; }
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
  
    <!-- LEFT SECTION: Three Heterogeneous Plugs ("15", null, 3.6) -->
    <!-- Wire 1: "15" -->
    <path d="M 188 86 H 288" class="s-white wire-flow" stroke-width="2" stroke-linecap="round" />
    <circle cx="288" cy="86" r="4" class="c-white s-dark" stroke-width="1.75" />
  
    <!-- Wire 2: null -->
    <path d="M 188 152 H 288" class="s-white wire-flow" stroke-width="2" stroke-linecap="round" />
    <circle cx="288" cy="152" r="4" class="c-white s-dark" stroke-width="1.75" />
  
    <!-- Wire 3: 3.6 -->
    <path d="M 188 218 H 288" class="s-white wire-flow" stroke-width="2" stroke-linecap="round" />
    <circle cx="288" cy="218" r="4" class="c-white s-dark" stroke-width="1.75" />
  
    <!-- Input Plug 1: String "15" -->
    <g transform="translate(132, 86)">
      <g class="plug-bob-1">
        <rect x="46" y="-8" width="12" height="5" rx="2" class="c-white s-dark" stroke-width="1.5" />
        <rect x="46" y="3" width="12" height="5" rx="2" class="c-white s-dark" stroke-width="1.5" />
        <rect x="-48" y="-19" width="96" height="38" rx="14" class="c-white s-dark" stroke-width="2.2" />
        <rect x="-41" y="-13" width="82" height="26" rx="9" class="c-dark" />
        <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">"15"</text>
      </g>
    </g>
  
    <!-- Input Plug 2: null (Safe Zero Conversion!) -->
    <g transform="translate(132, 152)">
      <g class="plug-bob-2">
        <rect x="46" y="-8" width="12" height="5" rx="2" class="c-white s-dark" stroke-width="1.5" />
        <rect x="46" y="3" width="12" height="5" rx="2" class="c-white s-dark" stroke-width="1.5" />
        <rect x="-48" y="-19" width="96" height="38" rx="14" class="c-white s-dark" stroke-width="2.2" />
        <rect x="-41" y="-13" width="82" height="26" rx="9" class="c-accent" />
        <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">null</text>
      </g>
    </g>
  
    <!-- Input Plug 3: Double 3.6 (Rounds to 4!) -->
    <g transform="translate(132, 218)">
      <g class="plug-bob-3">
        <rect x="46" y="-8" width="12" height="5" rx="2" class="c-white s-dark" stroke-width="1.5" />
        <rect x="46" y="3" width="12" height="5" rx="2" class="c-white s-dark" stroke-width="1.5" />
        <rect x="-48" y="-19" width="96" height="38" rx="14" class="c-white s-dark" stroke-width="2.2" />
        <rect x="-41" y="-13" width="82" height="26" rx="9" class="c-dark" />
        <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">3.6</text>
      </g>
    </g>
  
    <!-- CENTER SECTION: Universal Multi-Adapter & Rotary Converter Hub (Convert) -->
    <g transform="translate(444, 152)">
      <!-- Grotesque Doka Eyes perched on top left -->
      <g transform="translate(-66, -82)">
        <ellipse cx="-13" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
        <ellipse cx="11" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
        <g class="eyes-scan">
          <circle cx="-11" cy="1" r="3.8" class="c-dark" />
          <circle cx="13" cy="1" r="3.8" class="c-dark" />
        </g>
      </g>
  
      <!-- Heavy Industrial Feet -->
      <path d="M -124 72 L -132 86 H -100 L -106 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
      <path d="M 106 72 L 100 86 H 132 L 124 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
      <!-- Main White Adapter Housing -->
      <rect x="-154" y="-72" width="308" height="144" rx="18" class="c-white s-dark" stroke-width="2.5" />
  
      <!-- Dark Window Header Bar -->
      <path d="M -136 -72 H 136 Q 154 -72 154 -54 V -38 H -154 V -54 Q -154 -72 -136 -72 Z" class="c-dark s-white" stroke-width="1.75" />
      <line x1="-153" y1="-38" x2="153" y2="-38" class="s-dark" stroke-width="2.5" />
  
      <!-- 3 Doka Header Dots -->
      <circle cx="-130" cy="-55" r="4" class="c-accent" />
      <circle cx="-116" cy="-55" r="4" class="c-white" />
      <circle cx="-102" cy="-55" r="4" class="c-white" />
  
      <!-- Header Class Pill: Convert -->
      <rect x="44" y="-65" width="92" height="20" rx="10" class="c-accent" />
      <text x="90" y="-51" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">Convert</text>
  
      <!-- Recessed Multi-Socket Chamber -->
      <rect x="-136" y="-24" width="272" height="84" rx="12" class="c-dark" />
  
      <!-- Left Input Port Indicators (3 Channels) -->
      <rect x="-124" y="-14" width="34" height="16" rx="5" class="c-white" />
      <text x="-107" y="-2" text-anchor="middle" class="c-dark mono" font-size="10" font-weight="700">str</text>
  
      <rect x="-124" y="10" width="34" height="16" rx="5" class="c-accent" />
      <text x="-107" y="22" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">null</text>
  
      <rect x="-124" y="34" width="34" height="16" rx="5" class="c-white" />
      <text x="-107" y="46" text-anchor="middle" class="c-dark mono" font-size="10" font-weight="700">dbl</text>
  
      <!-- Funneling Lines into Rotary Converter Core -->
      <path d="M -86 -6 H -66 L -50 18" class="s-white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M -86 18 H -50" class="s-white" stroke-width="1.8" stroke-linecap="round" />
      <path d="M -86 42 H -66 L -50 18" class="s-white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  
      <!-- Central Rotary Converter Gear / Selector Dial -->
      <g transform="translate(-18, 18)">
        <g class="dial-spin">
          <circle cx="0" cy="0" r="28" class="c-white" />
          <!-- 6 Gear Teeth Notches -->
          <rect x="-3" y="-33" width="6" height="8" rx="2" class="c-white" />
          <rect x="-3" y="25" width="6" height="8" rx="2" class="c-white" />
          <rect x="-33" y="-3" width="8" height="6" rx="2" class="c-white" />
          <rect x="25" y="-3" width="8" height="6" rx="2" class="c-white" />
          <!-- Inner Accent Hub & Arrows -->
          <circle cx="0" cy="0" r="18" class="c-accent" />
          <path d="M -7 -4 A 8 8 0 0 1 7 -4" class="s-white" stroke-width="2.2" stroke-linecap="round" />
          <path d="M 7 4 A 8 8 0 0 1 -7 4" class="s-white" stroke-width="2.2" stroke-linecap="round" />
          <circle cx="0" cy="0" r="3" class="c-white" />
        </g>
      </g>
  
      <!-- Output Arrow to Standardized Result -->
      <path d="M 18 18 H 36 M 32 13 L 38 18 L 32 23" class="s-white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
  
      <!-- Right Standardized Output Tiles (15, 0, 4) -->
      <rect x="46" y="-14" width="76" height="16" rx="5" class="c-white" />
      <text x="84" y="-2" text-anchor="middle" class="c-dark mono" font-size="11" font-weight="700">→ 15</text>
  
      <rect x="46" y="10" width="76" height="16" rx="5" class="c-accent" />
      <text x="84" y="22" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">→ 0 (safe)</text>
  
      <rect x="46" y="34" width="76" height="16" rx="5" class="c-white" />
      <text x="84" y="46" text-anchor="middle" class="c-dark mono" font-size="11" font-weight="700">→ 4 (≈)</text>
    </g>
  
    <!-- Cartoon Round Hand Plugging Universal Output Connector on Right Edge -->
    <g transform="translate(612, 198)">
      <g class="hand-plug">
        <!-- Plug Prongs Entering Socket -->
        <rect x="-22" y="-7" width="12" height="5" rx="2" class="c-white s-dark" stroke-width="1.5" />
        <rect x="-22" y="3" width="12" height="5" rx="2" class="c-white s-dark" stroke-width="1.5" />
        <!-- Plug Body -->
        <rect x="-12" y="-12" width="20" height="24" rx="6" class="c-accent s-dark" stroke-width="2" />
        <!-- Cartoon Round Hand -->
        <circle cx="16" cy="0" r="16" class="c-white s-dark" stroke-width="2.3" />
        <path d="M 8 -5 L 13 -3" class="s-dark" stroke-width="1.75" stroke-linecap="round" />
        <path d="M 7 3 L 12 4" class="s-dark" stroke-width="1.75" stroke-linecap="round" />
      </g>
    </g>
  
    <!-- Kinetic Burst Rays at Adapter Top-Right -->
    <g transform="translate(604, 82)">
      <g class="burst-pop">
        <line x1="4" y1="-4" x2="20" y2="-18" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="8" y1="8" x2="26" y2="4" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="22" cy="-7" r="2.8" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Starburst & Dark Capsule Badges -->
    <!-- Connector Lines -->
    <circle cx="598" cy="142" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 602 142 H 636 V 102 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 636 142 V 198 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Badge: Starburst + System.Convert Capsule -->
    <g transform="translate(748, 102)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-46 14,-28 42,-36 34,-12 62,0 34,12 42,36 14,28 0,46 -14,28 -42,36 -34,12 -62,0 -34,-12 -42,-36 -14,-28" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-78" y="-19" width="156" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">System.Convert</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: Methods Summary Capsule -->
    <g transform="translate(748, 198)">
      <g class="pill-float">
        <rect x="-82" y="-19" width="164" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
        <circle cx="-64" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">ToInt32 · ToBool</text>
      </g>
    </g>
  </svg>
---

# Универсальный класс Convert

Чем класс `Convert` отличается от `Parse` и явного приведения, и как безопасно превратить `null` или число в другой тип?

`Convert` — это встроенный статический класс из пространства имён `System`, который умеет переводить данные почти из любого базового типа в любой другой (строки, числа, логические значения и даты).

## Популярные методы

* **`Convert.ToInt32(значение)`** — преобразует строку, дробь или `bool` в стандартное целое число `int` (32 бита).
* **`Convert.ToDouble(значение)`** — переводит строку или целое число в дробное `double`.
* **`Convert.ToBoolean(значение)`** — превращает числа (`0` в `false`, любое другое число в `true`) или строки (`"true"`, `"false"`) в логический тип `bool`.
* **`Convert.ToString(значение)`** — переводит любое значение в строку и не падает на `null`, возвращая пустую строку `""`.

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. Чтение числа из консоли через Convert
        Console.Write("Введите количество товара: ");
        int count = Convert.ToInt32(Console.ReadLine());

        // 2. Перевод чисел и текста в логический тип bool
        bool isActive = Convert.ToBoolean(1);         // true
        bool isEmpty = Convert.ToBoolean(0);          // false
        bool isConfirmed = Convert.ToBoolean("true"); // true

        // 3. Математическое округление при переводе дробного числа в int
        double exactValue = 4.6;
        int rounded = Convert.ToInt32(exactValue);    // Получится 5 (а (int)4.6 дало бы 4)

        // 4. Безопасная работа с null (вернёт 0 вместо ошибки)
        string emptyInput = null;
        int safeNumber = Convert.ToInt32(emptyInput); // 0

        Console.WriteLine($"Товар: {count}, округлено: {rounded}, из null: {safeNumber}, статус: {isActive}");
    }
}

```

## Важные нюансы

* **Округление вместо отбрасывания:** при переводе `double` в `int` метод `Convert.ToInt32()` округляет число по математическим правилам (`4.6` станет `5`), а не отрезает дробную часть, как `(int)`. Половинки округляются до ближайшего чётного числа (`2.5` станет `2`, а `3.5` станет `4`).
* **Спокойная реакция на `null`:** если передать в `Convert.ToInt32(null)` пустую ссылку, метод спокойно вернёт `0`, тогда как `int.Parse(null)` аварийно завершит программу.
* **Падение на буквах:** если передать в `Convert.ToInt32("привет")` строку с буквами, программа всё равно остановится с ошибкой `FormatException` — для защиты от неверного ввода пользователя лучше использовать `TryParse()`.

