---
title: ToString()
keywords: ToString, перевод в строку, форматирование чисел, знаки после запятой, округление вывода, разделитель тысяч, ведущие нули
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
  
      .raw-bob-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobRaw1 3.6s ease-in-out infinite;
      }
      .raw-bob-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobRaw2 3.6s ease-in-out infinite;
      }
      .belt-flow {
        stroke-dasharray: 5 5;
        animation: flowBelt 1.2s linear infinite;
      }
      .clamp-left {
        transform-box: fill-box;
        transform-origin: center;
        animation: clampQuoteL 3.8s ease-in-out infinite;
      }
      .clamp-right {
        transform-box: fill-box;
        transform-origin: center;
        animation: clampQuoteR 3.8s ease-in-out infinite;
      }
      .hand-stamp {
        transform-box: fill-box;
        transform-origin: left center;
        animation: stampFormat 3.8s ease-in-out infinite;
      }
      .stamp-die {
        transform-box: fill-box;
        transform-origin: top center;
        animation: pressDie 3.8s ease-in-out infinite;
      }
      .eyes-watch {
        transform-box: fill-box;
        transform-origin: center;
        animation: watchWrap 3.8s ease-in-out infinite;
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
  
      @keyframes bobRaw1 {
        0%, 100% { transform: translateY(0px) rotate(-2deg); }
        50% { transform: translateY(-5px) rotate(2deg); }
      }
      @keyframes bobRaw2 {
        0%, 100% { transform: translateY(0px) rotate(2deg); }
        50% { transform: translateY(5px) rotate(-2deg); }
      }
      @keyframes flowBelt {
        0% { stroke-dashoffset: 20; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes clampQuoteL {
        0%, 18%, 78%, 100% { transform: translateX(0px); }
        38%, 58% { transform: translateX(6px); }
      }
      @keyframes clampQuoteR {
        0%, 18%, 78%, 100% { transform: translateX(0px); }
        38%, 58% { transform: translateX(-6px); }
      }
      @keyframes stampFormat {
        0%, 18%, 78%, 100% { transform: translateY(0px) rotate(0deg); }
        38%, 58% { transform: translateY(6px) rotate(2.5deg); }
      }
      @keyframes pressDie {
        0%, 18%, 78%, 100% { transform: translateY(0px); }
        38%, 58% { transform: translateY(8px); }
      }
      @keyframes watchWrap {
        0%, 20%, 80%, 100% { transform: translate(-1px, 0px); }
        42%, 60% { transform: translate(2px, 2px); }
      }
      @keyframes popBurst {
        0%, 30%, 72%, 100% { transform: scale(0.75); opacity: 0.2; }
        44%, 58% { transform: scale(1.12); opacity: 1; }
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
  
    <!-- LEFT SECTION: Raw Unquoted Values (3.14159 & 42) -->
    <!-- Feed Rails into Quote-Wrapper Press -->
    <path d="M 200 102 H 288" class="s-white belt-flow" stroke-width="2.2" stroke-linecap="round" />
    <circle cx="288" cy="102" r="4" class="c-white s-dark" stroke-width="1.75" />
  
    <path d="M 200 196 H 288" class="s-white belt-flow" stroke-width="2.2" stroke-linecap="round" />
    <circle cx="288" cy="196" r="4" class="c-white s-dark" stroke-width="1.75" />
  
    <!-- Top Input Value: Long Float 3.14159 -->
    <g transform="translate(138, 102)">
      <g class="raw-bob-1">
        <rect x="-60" y="-23" width="120" height="46" rx="15" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-52" y="-16" width="104" height="32" rx="10" class="c-dark" />
        <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="16" font-weight="700">3.14159</text>
      </g>
    </g>
  
    <!-- Bottom Input Value: Raw Integer 42 -->
    <g transform="translate(138, 196)">
      <g class="raw-bob-2">
        <rect x="-60" y="-23" width="120" height="46" rx="15" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-52" y="-16" width="104" height="32" rx="10" class="c-dark" />
        <text x="-12" y="6" text-anchor="middle" class="c-white mono" font-size="17" font-weight="700">42</text>
        <rect x="14" y="-9" width="30" height="18" rx="6" class="c-accent" />
        <text x="29" y="4" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">int</text>
      </g>
    </g>
  
    <!-- CENTER SECTION: Quote-Wrapper & Format Press (.ToString("F2")) -->
    <g transform="translate(444, 152)">
      <!-- Grotesque Doka Eyes perched on top left -->
      <g transform="translate(-66, -82)">
        <ellipse cx="-13" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
        <ellipse cx="11" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
        <g class="eyes-watch">
          <circle cx="-11" cy="1" r="3.8" class="c-dark" />
          <circle cx="13" cy="1" r="3.8" class="c-dark" />
        </g>
      </g>
  
      <!-- Heavy Industrial Feet -->
      <path d="M -124 72 L -132 86 H -100 L -106 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
      <path d="M 106 72 L 100 86 H 132 L 124 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
      <!-- Main White Packaging Machine Housing -->
      <rect x="-154" y="-72" width="308" height="144" rx="18" class="c-white s-dark" stroke-width="2.5" />
  
      <!-- Dark Window Header Bar -->
      <path d="M -136 -72 H 136 Q 154 -72 154 -54 V -38 H -154 V -54 Q -154 -72 -136 -72 Z" class="c-dark s-white" stroke-width="1.75" />
      <line x1="-153" y1="-38" x2="153" y2="-38" class="s-dark" stroke-width="2.5" />
  
      <!-- 3 Doka Header Dots -->
      <circle cx="-130" cy="-55" r="4" class="c-accent" />
      <circle cx="-116" cy="-55" r="4" class="c-white" />
      <circle cx="-102" cy="-55" r="4" class="c-white" />
  
      <!-- Header Method Pill: .ToString() -->
      <rect x="26" y="-65" width="110" height="20" rx="10" class="c-accent" />
      <text x="81" y="-51" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">.ToString()</text>
  
      <!-- Recessed Quote-Clamping Chamber -->
      <rect x="-136" y="-24" width="272" height="58" rx="12" class="c-dark" />
  
      <!-- Left Quote Piston (") -->
      <g transform="translate(-96, 5)">
        <g class="clamp-left">
          <rect x="-26" y="-18" width="36" height="36" rx="8" class="c-white" />
          <text x="-8" y="13" text-anchor="middle" class="c-accent mono" font-size="28" font-weight="700">"</text>
        </g>
      </g>
  
      <!-- Formatted 2-Decimal String Core: 3.14 -->
      <rect x="-52" y="-15" width="104" height="40" rx="8" class="c-white" />
      <text x="-15" y="13" text-anchor="middle" class="c-dark mono" font-size="22" font-weight="700">3.</text>
      <!-- Highlighted 2-Digit Precision Block: 14 -->
      <rect x="6" y="-9" width="38" height="28" rx="6" class="c-accent" />
      <text x="25" y="11" text-anchor="middle" class="c-white mono" font-size="19" font-weight="700">14</text>
  
      <!-- Right Quote Piston (") -->
      <g transform="translate(96, 5)">
        <g class="clamp-right">
          <rect x="-10" y="-18" width="36" height="36" rx="8" class="c-white" />
          <text x="8" y="13" text-anchor="middle" class="c-accent mono" font-size="28" font-weight="700">"</text>
        </g>
      </g>
  
      <!-- Format Specifier Strip at Bottom: ("F2") · ("0.00") -->
      <rect x="-136" y="42" width="272" height="20" rx="8" class="c-dark" />
      <circle cx="-122" cy="52" r="4" class="c-accent" />
      <text x="6" y="56" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">("F2") · ("0.00") → "3.14"</text>
    </g>
  
    <!-- Cartoon Round Hand Pressing Format Stamp on Top-Right -->
    <g transform="translate(556, 62)">
      <g class="hand-stamp">
        <!-- Stamp Die Plunger -->
        <g class="stamp-die">
          <rect x="-14" y="4" width="28" height="14" rx="5" class="c-accent s-dark" stroke-width="1.8" />
          <text x="0" y="14" text-anchor="middle" class="c-white mono" font-size="9" font-weight="700">F2</text>
        </g>
        <!-- Stamp Handle & Cartoon Round Hand -->
        <rect x="-8" y="-8" width="16" height="14" rx="4" class="c-dark s-white" stroke-width="1.75" />
        <circle cx="0" cy="-16" r="16" class="c-white s-dark" stroke-width="2.3" />
        <path d="M -8 -21 L -2 -19" class="s-dark" stroke-width="1.75" stroke-linecap="round" />
        <path d="M -9 -14 L -3 -13" class="s-dark" stroke-width="1.75" stroke-linecap="round" />
      </g>
    </g>
  
    <!-- Kinetic Burst Rays around Quote Clamping -->
    <g transform="translate(604, 82)">
      <g class="burst-pop">
        <line x1="4" y1="-4" x2="20" y2="-18" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="8" y1="8" x2="26" y2="4" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="22" cy="-7" r="2.8" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Starburst & Dark Capsule Badges -->
    <!-- Connector Lines -->
    <circle cx="598" cy="152" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 602 152 H 636 V 102 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 636 152 V 198 H 662" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Badge: Starburst + .ToString() Capsule -->
    <g transform="translate(748, 102)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-46 14,-28 42,-36 34,-12 62,0 34,12 42,36 14,28 0,46 -14,28 -42,36 -34,12 -62,0 -34,-12 -42,-36 -14,-28" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-78" y="-19" width="156" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">.ToString("F2")</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: String Interpolation & Formatting Capsule -->
    <g transform="translate(748, 198)">
      <g class="pill-float">
        <rect x="-82" y="-19" width="164" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
        <circle cx="-64" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">$"{x:0.00}" · string</text>
      </g>
    </g>
  </svg>
---

# Перевод в строку и форматирование: ToString()

Как превратить любое число или значение обратно в текст и красиво округлить дробь до двух знаков после запятой?

`ToString()` — это встроенный метод, который есть у любого типа данных. Он переводит число, символ или логическое значение в строку (`string`), а также позволяет задать шаблон оформления прямо при выводе.

## Популярные форматы вывода

| Спецификатор | Что делает | Пример числа | Результат |
| --- | --- | --- | --- |
| `"F2"` | Оставляет ровно 2 знака после запятой (число можно менять: `F0`, `F3`) | `3.14159` | `"3,14"` |
| `"N0"` / `"N2"` | Разделяет разряды тысяч пробелами (и добавляет дробь в `N2`) | `1450000` | `"1 450 000"` |
| `"C"` | Оформляет как денежную сумму со знаком валюты системы | `99.5` | `"99,50 ₽"` |
| `"P0"` | Умножает дробь на 100 и добавляет знак процента | `0.25` | `"25%"` |
| `"00"` / `"000"` | Дополняет целое число ведущими нулями до нужной длины | `7` | `"07"` |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        int score = 42;
        double pi = 3.1415926;
        int population = 1450000;
        int minutes = 5;

        // Базовый перевод числа в строку
        string textScore = score.ToString();

        // Округление дроби при выводе без изменения самой переменной
        string shortPi = pi.ToString("F2"); // "3,14"

        // Разделение тысяч пробелами и ведущие нули для таймера
        string formattedPop = population.ToString("N0"); // "1 450 000"
        string timerMinutes = minutes.ToString("00");    // "05"

        // Тот же формат работает прямо внутри интерполяции строк
        Console.WriteLine($"Счёт: {textScore}, число Пи: {shortPi}");
        Console.WriteLine($"Население: {formattedPop}, время: {timerMinutes}:00");
    }
}

```

## Важные нюансы

* **Сама переменная не меняется:** вызов `pi.ToString("F2")` возвращает новую отформатированную строку, но внутри переменной `pi` по-прежнему хранится полное число `3.1415926`.
* **Короткая запись в интерполяции:** внутри строк с долларом `$"..."` вызывать сам метод необязательно — спецификатор можно указать сразу после двоеточия: `$"{pi:F2}"`.
* **Опасность с `null`:** если переменная хранит пустую ссылку `null`, вызов `переменная.ToString()` остановит программу с ошибкой `NullReferenceException`. Для безопасного перевода пустых значений используют `Convert.ToString()`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `pi.ToString(\"F2\")`?",
  "options": [
    {
      "text": "Возвращает строку с двумя знаками после разделителя",
      "correct": true
    },
    {
      "text": "Меняет значение `pi`",
      "correct": false,
      "explanation": "Исходное число не меняется."
    },
    {
      "text": "Округляет `pi` навсегда",
      "correct": false,
      "explanation": "Меняется только строка."
    }
  ],
  "explanation": "`ToString` создаёт новую строку, а переменная остаётся прежней."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `ToString`?",
  "options": [
    {
      "text": "Не меняет исходное число",
      "correct": true
    },
    {
      "text": "Можно использовать в интерполяции `$\"{pi:F2}\"`",
      "correct": true
    },
    {
      "text": "Безопасен при `null`",
      "correct": false,
      "explanation": "Может возникнуть `NullReferenceException`."
    }
  ],
  "explanation": "Формат задаёт только вывод, а не хранимое значение."
}
```
