---
title: Преобразование типов
keywords: преобразование типов, приведение типов, Parse, TryParse, Convert, ToString, кастинг, перевод строки в число, округление, ошибка ввода
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
  
      .tok-bob-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobTok1 3.6s ease-in-out infinite;
      }
      .tok-bob-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobTok2 3.6s ease-in-out infinite;
      }
      .tok-bob-3 {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobTok3 3.6s ease-in-out infinite;
      }
      .lane-flow {
        stroke-dasharray: 5 5;
        animation: flowLane 1.2s linear infinite;
      }
      .hand-switch {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: switchLever 4s ease-in-out infinite;
      }
      .eyes-scan {
        transform-box: fill-box;
        transform-origin: center;
        animation: scanLanes 4s ease-in-out infinite;
      }
      .gate-pulse {
        transform-box: fill-box;
        transform-origin: center;
        animation: pulseGate 4s ease-in-out infinite;
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
  
      @keyframes bobTok1 {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(4px); }
      }
      @keyframes bobTok2 {
        0%, 100% { transform: translateX(4px); }
        50% { transform: translateX(0px); }
      }
      @keyframes bobTok3 {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(4px); }
      }
      @keyframes flowLane {
        0% { stroke-dashoffset: 20; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes switchLever {
        0%, 18%, 82%, 100% { transform: rotate(-16deg); }
        40%, 60% { transform: rotate(16deg); }
      }
      @keyframes scanLanes {
        0%, 20%, 80%, 100% { transform: translate(-2px, -2px); }
        45%, 60% { transform: translate(2px, 2px); }
      }
      @keyframes pulseGate {
        0%, 30%, 70%, 100% { transform: scale(1); }
        50% { transform: scale(1.06); }
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
  
    <!-- LEFT SECTION: Three Distinct Data Types Entering Hub (int, string, bool) -->
    <!-- Feed Rails -->
    <path d="M 186 86 H 288" class="s-white lane-flow" stroke-width="2.1" stroke-linecap="round" />
    <circle cx="288" cy="86" r="4" class="c-white s-dark" stroke-width="1.75" />
  
    <path d="M 186 152 H 288" class="s-white lane-flow" stroke-width="2.1" stroke-linecap="round" />
    <circle cx="288" cy="152" r="4" class="c-white s-dark" stroke-width="1.75" />
  
    <path d="M 186 218 H 288" class="s-white lane-flow" stroke-width="2.1" stroke-linecap="round" />
    <circle cx="288" cy="218" r="4" class="c-white s-dark" stroke-width="1.75" />
  
    <!-- Token 1: int 42 -->
    <g transform="translate(132, 86)">
      <g class="tok-bob-1">
        <rect x="-50" y="-19" width="100" height="38" rx="15" class="c-white s-dark" stroke-width="2.3" />
        <rect x="-43" y="-13" width="86" height="26" rx="10" class="c-dark" />
        <text x="-14" y="5" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">42</text>
        <rect x="8" y="-8" width="29" height="16" rx="5" class="c-accent" />
        <text x="22.5" y="4" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">int</text>
      </g>
    </g>
  
    <!-- Token 2: string "7" -->
    <g transform="translate(132, 152)">
      <g class="tok-bob-2">
        <rect x="-50" y="-19" width="100" height="38" rx="15" class="c-white s-dark" stroke-width="2.3" />
        <rect x="-43" y="-13" width="86" height="26" rx="10" class="c-dark" />
        <text x="-14" y="5" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">"7"</text>
        <rect x="8" y="-8" width="29" height="16" rx="5" class="c-accent" />
        <text x="22.5" y="4" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">str</text>
      </g>
    </g>
  
    <!-- Token 3: bool true -->
    <g transform="translate(132, 218)">
      <g class="tok-bob-3">
        <rect x="-50" y="-19" width="100" height="38" rx="15" class="c-white s-dark" stroke-width="2.3" />
        <rect x="-43" y="-13" width="86" height="26" rx="10" class="c-dark" />
        <text x="-14" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">true</text>
        <rect x="8" y="-8" width="29" height="16" rx="5" class="c-accent" />
        <text x="22.5" y="4" text-anchor="middle" class="c-white mono" font-size="9" font-weight="700">bool</text>
      </g>
    </g>
  
    <!-- CENTER SECTION: Three-Lane Type Conversion Hub -->
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
  
      <!-- Main White Hub Housing -->
      <rect x="-154" y="-72" width="308" height="144" rx="18" class="c-white s-dark" stroke-width="2.5" />
  
      <!-- Dark Window Header Bar -->
      <path d="M -136 -72 H 136 Q 154 -72 154 -54 V -38 H -154 V -54 Q -154 -72 -136 -72 Z" class="c-dark s-white" stroke-width="1.75" />
      <line x1="-153" y1="-38" x2="153" y2="-38" class="s-dark" stroke-width="2.5" />
  
      <!-- 3 Doka Header Dots -->
      <circle cx="-130" cy="-55" r="4" class="c-accent" />
      <circle cx="-116" cy="-55" r="4" class="c-white" />
      <circle cx="-102" cy="-55" r="4" class="c-white" />
  
      <!-- Header Mode Pill: C# типы -->
      <rect x="48" y="-65" width="88" height="20" rx="10" class="c-accent" />
      <text x="92" y="-51" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">C# типы</text>
  
      <!-- Recessed 3-Lane Transformation Chamber -->
      <rect x="-136" y="-24" width="272" height="84" rx="12" class="c-dark" />
  
      <!-- LANE 1: Numeric Cast (42 -> (double) -> 42.0) -->
      <g transform="translate(0, -10)">
        <text x="-106" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">42</text>
        <path d="M -86 0 H -70" class="s-white" stroke-width="1.6" stroke-linecap="round" />
        <g class="gate-pulse">
          <rect x="-64" y="-9" width="88" height="18" rx="6" class="c-accent" />
          <text x="-20" y="3" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">(double)</text>
        </g>
        <path d="M 30 0 H 46" class="s-white" stroke-width="1.6" stroke-linecap="round" />
        <rect x="52" y="-9" width="72" height="18" rx="5" class="c-white" />
        <text x="88" y="4" text-anchor="middle" class="c-dark mono" font-size="11" font-weight="700">42.0</text>
      </g>
  
      <!-- LANE 2: String to Number ("7" -> TryParse -> 7) -->
      <g transform="translate(0, 18)">
        <text x="-106" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">"7"</text>
        <path d="M -86 0 H -70" class="s-white" stroke-width="1.6" stroke-linecap="round" />
        <rect x="-64" y="-9" width="88" height="18" rx="6" class="c-white" />
        <text x="-20" y="3" text-anchor="middle" class="c-dark mono" font-size="10" font-weight="700">TryParse</text>
        <path d="M 30 0 H 46" class="s-white" stroke-width="1.6" stroke-linecap="round" />
        <rect x="52" y="-9" width="72" height="18" rx="5" class="c-accent" />
        <text x="88" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">7 (int)</text>
      </g>
  
      <!-- LANE 3: Value to String (true -> ToString -> "True") -->
      <g transform="translate(0, 46)">
        <text x="-106" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">true</text>
        <path d="M -86 0 H -70" class="s-white" stroke-width="1.6" stroke-linecap="round" />
        <rect x="-64" y="-9" width="88" height="18" rx="6" class="c-accent" />
        <text x="-20" y="3" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">ToString</text>
        <path d="M 30 0 H 46" class="s-white" stroke-width="1.6" stroke-linecap="round" />
        <rect x="52" y="-9" width="72" height="18" rx="5" class="c-white" />
        <text x="88" y="4" text-anchor="middle" class="c-dark mono" font-size="11" font-weight="700">"True"</text>
      </g>
    </g>
  
    <!-- Cartoon Round Hand Operating Selector Switch on Top-Right of Hub -->
    <g transform="translate(556, 76)">
      <g class="hand-switch">
        <!-- Switch Shaft -->
        <rect x="-4" y="-28" width="8" height="28" rx="4" class="c-dark s-white" stroke-width="1.8" />
        <!-- Cartoon Round Hand -->
        <circle cx="0" cy="-30" r="15" class="c-white s-dark" stroke-width="2.3" />
        <path d="M -7 -34 L -2 -32" class="s-dark" stroke-width="1.75" stroke-linecap="round" />
        <path d="M -8 -27 L -3 -26" class="s-dark" stroke-width="1.75" stroke-linecap="round" />
      </g>
      <!-- Pivot Base -->
      <circle cx="0" cy="0" r="7" class="c-white s-dark" stroke-width="2" />
      <circle cx="0" cy="0" r="3" class="c-accent" />
    </g>
  
    <!-- Kinetic Burst Rays at Top-Right -->
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
  
    <!-- Top Badge: Starburst + Convert · Parse Capsule -->
    <g transform="translate(748, 102)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-46 14,-28 42,-36 34,-12 62,0 34,12 42,36 14,28 0,46 -14,28 -42,36 -34,12 -62,0 -34,-12 -42,-36 -14,-28" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-78" y="-19" width="156" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">Convert · Parse</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: Cross-Type Summary Capsule -->
    <g transform="translate(748, 198)">
      <g class="pill-float">
        <rect x="-82" y="-19" width="164" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
        <circle cx="-64" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">int ↔ string ↔ bool</text>
      </g>
    </g>
  </svg>
---

# Шпаргалка по преобразованию типов

Какой инструмент выбрать для перевода данных между числами, строками и логическим типом, чтобы не потерять точность и избежать ошибок?

Выбор способа преобразования зависит от двух вещей: какие типы данных участвуют в переводе и насколько можно доверять исходному значению.

## Таблица сравнения

| Инструмент | Направление | Поведение и особенности | Когда применять |
| --- | --- | --- | --- |
| `(тип)` (кастинг) | Число -> Число | Отбрасывает дробную часть без округления; со строками не работает | Перевод совместимых чисел или деление `(double)a / b` |
| `Тип.Parse()` | Строка -> Число / `bool` | Роняет программу (`FormatException`), если в строке буквы или `null` | Когда на 100% уверены в правильном формате строки |
| `Тип.TryParse()` | Строка -> Число / `bool` | Не роняет программу; возвращает `true`/`false` и записывает ответ в `out` | Всегда при чтении чисел, введённых пользователем с клавиатуры |
| `Convert.To...()` | Любой -> Любой базовый | Округляет дроби по правилам математики; `null` превращает в `0`, но падает на буквах | Универсальный перевод между разными типами (например, `int` -> `bool`) |
| `.ToString()` | Любой -> Строка | Переводит значение в текст и задаёт формат (`"F2"`, `"N0"`); падает на `null` | Подготовка чисел и значений для вывода на экран или склейки с текстом |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. TryParse — безопасное чтение ввода пользователя
        Console.Write("Введите цену товара: ");
        string input = Console.ReadLine();

        if (double.TryParse(input, out double rawPrice))
        {
            // 2. Явное приведение (int) — просто отбрасываем копейки
            int wholeRubles = (int)rawPrice;

            // 3. Convert — математическое округление и перевод в bool
            int roundedRubles = Convert.ToInt32(rawPrice);
            bool hasPrice = Convert.ToBoolean(roundedRubles);

            // 4. Parse — перевод заведомо корректной строки
            int discount = int.Parse("10");

            // 5. ToString — перевод обратно в текст с форматированием
            string receipt = (rawPrice - discount).ToString("F2");

            Console.WriteLine($"Целых: {wholeRubles}, округлено: {roundedRubles}, есть цена: {hasPrice}");
            Console.WriteLine($"К оплате со скидкой: {receipt} руб.");
        }
        else
        {
            Console.WriteLine("Ошибка: введите корректное число.");
        }
    }
}

```

## Краткий алгоритм выбора

* **Читаете ввод с клавиатуры:** всегда берите `TryParse()`, чтобы случайная буква не закрыла программу с ошибкой.
* **Переводите одно число в другое:** для расширения (`int` -> `double`) писать ничего не нужно; для сужения (`double` -> `int`) ставьте `(int)` для отбрасывания дроби или `Convert.ToInt32()` для округления.
* **Готовите число к выводу на экран:** используйте `.ToString()` со спецификатором формата или интерполяцию строк `$"..."`.
