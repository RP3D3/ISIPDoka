---
title: Parse и TryParse
keywords: Parse, TryParse, перевод строки в число, преобразование типов, ввод чисел с клавиатуры, защита от ошибок, out
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
  
      .tok-valid {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobValid 3.6s ease-in-out infinite;
      }
      .tok-invalid {
        transform-box: fill-box;
        transform-origin: center;
        animation: bobInvalid 3.6s ease-in-out infinite;
      }
      .feed-flow {
        stroke-dasharray: 5 5;
        animation: flowFeed 1.2s linear infinite;
      }
      .scan-beam {
        transform-box: fill-box;
        transform-origin: center;
        animation: sweepBeam 3.8s ease-in-out infinite;
      }
      .shield-bump {
        transform-box: fill-box;
        transform-origin: center;
        animation: bumpShield 3.8s ease-in-out infinite;
      }
      .eyes-inspect {
        transform-box: fill-box;
        transform-origin: center;
        animation: inspectRows 3.8s ease-in-out infinite;
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
  
      @keyframes bobValid {
        0%, 100% { transform: translateY(0px) rotate(-2deg); }
        50% { transform: translateY(-5px) rotate(2deg); }
      }
      @keyframes bobInvalid {
        0%, 100% { transform: translateY(0px) rotate(2deg); }
        50% { transform: translateY(5px) rotate(-2deg); }
      }
      @keyframes flowFeed {
        0% { stroke-dashoffset: 20; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes sweepBeam {
        0%, 100% { transform: translateX(-14px); opacity: 0.7; }
        50% { transform: translateX(14px); opacity: 1; }
      }
      @keyframes bumpShield {
        0%, 30%, 72%, 100% { transform: scale(1); }
        46%, 56% { transform: scale(1.08); }
      }
      @keyframes inspectRows {
        0%, 20%, 80%, 100% { transform: translate(0px, -1px); }
        45%, 60% { transform: translate(2px, 2px); }
      }
      @keyframes popBurst {
        0%, 32%, 70%, 100% { transform: scale(0.75); opacity: 0.2; }
        46%, 58% { transform: scale(1.12); opacity: 1; }
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
  
    <!-- LEFT SECTION: User Keyboard Input Strings ("42" & "abc") -->
    <!-- Feed Rails into Customs Scanner -->
    <path d="M 196 102 H 288" class="s-white feed-flow" stroke-width="2.2" stroke-linecap="round" />
    <circle cx="288" cy="102" r="4" class="c-white s-dark" stroke-width="1.75" />
  
    <path d="M 196 196 H 288" class="s-white feed-flow" stroke-width="2.2" stroke-linecap="round" />
    <circle cx="288" cy="196" r="4" class="c-white s-dark" stroke-width="1.75" />
  
    <!-- Top Input String: "42" (Valid Digits) -->
    <g transform="translate(138, 102)">
      <g class="tok-valid">
        <rect x="-56" y="-24" width="112" height="48" rx="16" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-48" y="-17" width="96" height="34" rx="11" class="c-dark" />
        <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="18" font-weight="700">"42"</text>
        <!-- Tiny Check Dot -->
        <circle cx="36" cy="-8" r="4" class="c-accent" />
      </g>
    </g>
  
    <!-- Bottom Input String: "abc" (Invalid Letters) -->
    <g transform="translate(138, 196)">
      <g class="tok-invalid">
        <rect x="-56" y="-24" width="112" height="48" rx="16" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-48" y="-17" width="96" height="34" rx="11" class="c-dark" />
        <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="18" font-weight="700">"abc"</text>
        <!-- Tiny Warning Dot -->
        <circle cx="36" cy="-8" r="4" class="c-accent" />
      </g>
    </g>
  
    <!-- CENTER SECTION: Customs X-Ray & Safe TryParse Sorter -->
    <g transform="translate(444, 152)">
      <!-- Grotesque Doka Eyes perched on top left -->
      <g transform="translate(-66, -82)">
        <ellipse cx="-13" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
        <ellipse cx="11" cy="0" rx="11" ry="14" class="c-white s-dark" stroke-width="2.2" />
        <g class="eyes-inspect">
          <circle cx="-11" cy="1" r="3.8" class="c-dark" />
          <circle cx="13" cy="1" r="3.8" class="c-dark" />
        </g>
      </g>
  
      <!-- Heavy Mechanical Feet -->
      <path d="M -124 72 L -132 86 H -100 L -106 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
      <path d="M 106 72 L 100 86 H 132 L 124 72 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
      <!-- Main White Customs Scanner Housing -->
      <rect x="-154" y="-72" width="308" height="144" rx="18" class="c-white s-dark" stroke-width="2.5" />
  
      <!-- Dark Window Header Bar -->
      <path d="M -136 -72 H 136 Q 154 -72 154 -54 V -38 H -154 V -54 Q -154 -72 -136 -72 Z" class="c-dark s-white" stroke-width="1.75" />
      <line x1="-153" y1="-38" x2="153" y2="-38" class="s-dark" stroke-width="2.5" />
  
      <!-- 3 Doka Header Dots -->
      <circle cx="-130" cy="-55" r="4" class="c-accent" />
      <circle cx="-116" cy="-55" r="4" class="c-white" />
      <circle cx="-102" cy="-55" r="4" class="c-white" />
  
      <!-- Header Mode Pill: TryParse -->
      <rect x="44" y="-65" width="92" height="20" rx="10" class="c-accent" />
      <text x="90" y="-51" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">TryParse</text>
  
      <!-- Recessed Two-Lane Inspection Chamber -->
      <rect x="-136" y="-24" width="272" height="84" rx="12" class="c-dark" />
      <!-- Center Horizontal Lane Divider -->
      <line x1="-126" y1="18" x2="126" y2="18" class="s-white" stroke-width="1.3" stroke-dasharray="4 4" />
  
      <!-- LANE 1 (TOP): "42" -> Parsed 42 + true -->
      <g transform="translate(0, -3)">
        <text x="-96" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">"42"</text>
        <!-- Scanning Beam Window -->
        <rect x="-64" y="-12" width="44" height="24" rx="6" class="s-white" stroke-width="1.4" />
        <g class="scan-beam">
          <line x1="-42" y1="-10" x2="-42" y2="10" class="s-accent" stroke-width="3" stroke-linecap="round" />
        </g>
        <path d="M -12 0 H 4 M 0 -4 L 5 0 L 0 4" class="s-white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  
        <!-- Output Number Tile: 42 -->
        <rect x="14" y="-13" width="46" height="26" rx="6" class="c-white" />
        <text x="37" y="5" text-anchor="middle" class="c-dark mono" font-size="15" font-weight="700">42</text>
  
        <!-- Status Pill: true -->
        <rect x="68" y="-13" width="56" height="26" rx="13" class="c-accent" />
        <text x="96" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">true</text>
      </g>
  
      <!-- LANE 2 (BOTTOM): "abc" -> Safe Deflection -> 0 + false (No Crash!) -->
      <g transform="translate(0, 39)">
        <text x="-96" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">"abc"</text>
        <!-- Crash-Shield Deflector Bumper -->
        <g transform="translate(-42, 0)">
          <g class="shield-bump">
            <path d="M -8 -12 L 6 0 L -8 12" class="s-accent" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M 2 -12 L 16 0 L 2 12" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </g>
        <path d="M -12 0 H 4 M 0 -4 L 5 0 L 0 4" class="s-white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  
        <!-- Safe Fallback Zero Tile: 0 -->
        <rect x="14" y="-13" width="46" height="26" rx="6" class="c-white" />
        <text x="37" y="5" text-anchor="middle" class="c-dark mono" font-size="15" font-weight="700">0</text>
  
        <!-- Status Pill: false -->
        <rect x="68" y="-13" width="56" height="26" rx="13" class="s-white" stroke-width="1.8" />
        <text x="96" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">false</text>
      </g>
    </g>
  
    <!-- Kinetic Burst Rays at Scanner Top-Right -->
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
  
    <!-- Top Badge: Starburst + int.TryParse Capsule -->
    <g transform="translate(748, 102)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-46 14,-28 42,-36 34,-12 62,0 34,12 42,36 14,28 0,46 -14,28 -42,36 -34,12 -62,0 -34,-12 -42,-36 -14,-28" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-78" y="-19" width="156" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">int.TryParse</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: Safe Output Capsule -->
    <g transform="translate(748, 198)">
      <g class="pill-float">
        <rect x="-82" y="-19" width="164" height="38" rx="19" class="c-dark s-white" stroke-width="2" />
        <circle cx="-64" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">out int · без сбоя</text>
      </g>
    </g>
  </svg>
---

# Перевод строк в числа: Parse и TryParse

Как превратить введённый с клавиатуры текст в число и не дать программе упасть, если пользователь ошибся и ввёл буквы?

Команда `Console.ReadLine()` всегда возвращает строку (`string`), с которой нельзя выполнять математические операции. Чтобы извлечь из текста число, у каждого числового типа есть два встроенных метода: быстрый `Parse` и безопасный `TryParse`.

## Как работают методы

* **`Тип.Parse(строка)`** — мгновенно превращает строку в число (`int.Parse("42")`). Если внутри окажутся буквы, лишние символы или пустота, программа аварийно завершится с ошибкой `FormatException`. Подходит только для заведомо правильных данных.
* **`Тип.TryParse(строка, out переменная)`** — безопасно пытается распознать число. Не роняет программу при ошибке, а возвращает логический результат: `true` (успех, готовое число записывается в переменную после слова `out`) или `false` (ошибка, в переменную записывается `0`).

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. Parse — используем, когда точно уверены в содержимом строки
        string rawPrice = "1500";
        int price = int.Parse(rawPrice);

        // 2. TryParse — главный стандарт для проверки ввода с клавиатуры
        Console.Write("Введите ваш возраст: ");
        string input = Console.ReadLine();

        if (int.TryParse(input, out int age))
        {
            Console.WriteLine($"Отлично! Через год вам исполнится {age + 1}.");
        }
        else
        {
            Console.WriteLine("Ошибка: нужно ввести целое число цифрами.");
        }
    }
}

```

## Важные нюансы

* **Ключевое слово `out`:** в `TryParse` конструкция `out int age` позволяет методу вернуть сразу два результата — статус проверки (`true` или `false`) и само распознанное число в новую переменную.
* **Точка или запятая в дробях:** `double.Parse` и `double.TryParse` зависят от региональных настроек системы — на русскоязычных компьютерах они ждут запятую (`"3,14"`), а точка (`"3.14"`) вызовет ошибку без указания `CultureInfo.InvariantCulture`.
* **Защита от `null` и переполнения:** `Parse` падает не только на буквах, но и на пустой ссылке `null` или слишком большом числе (`OverflowException`), тогда как `TryParse` во всех этих случаях спокойно вернёт `false`.
