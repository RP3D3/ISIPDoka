---
title: Тернарный оператор
keywords: тернарный оператор, условный оператор, сокращённый if, else, выбор значения, условие, ветвление, компактный код, присваивание, проверка
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
  
      .tower-sway {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: swayTower 4.8s ease-in-out infinite;
      }
      .beam-flow {
        stroke-dasharray: 8 6;
        animation: flowBeam 1.1s linear infinite;
      }
      .house-pop {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: popHouse 4.8s ease-in-out infinite;
      }
      .smoke-puff-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: puffSmoke1 3.6s ease-in-out infinite;
      }
      .smoke-puff-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: puffSmoke2 3.6s ease-in-out infinite;
      }
      .lamp-true {
        animation: pulseTrue 4.8s ease-in-out infinite;
      }
      .lamp-false {
        animation: pulseFalse 4.8s ease-in-out infinite;
      }
      .chevron-shift {
        transform-box: fill-box;
        transform-origin: center;
        animation: shiftChevron 2.4s ease-in-out infinite;
      }
  
      @keyframes swayTower {
        0%, 100% { transform: rotate(-1.2deg); }
        50% { transform: rotate(1.2deg); }
      }
      @keyframes flowBeam {
        0% { stroke-dashoffset: 28; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes popHouse {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }
      @keyframes puffSmoke1 {
        0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.9; }
        50% { transform: translate(4px, -7px) scale(1.15); opacity: 0.35; }
      }
      @keyframes puffSmoke2 {
        0%, 100% { transform: translate(2px, -4px) scale(0.85); opacity: 0.35; }
        50% { transform: translate(8px, -12px) scale(1.1); opacity: 0.95; }
      }
      @keyframes pulseTrue {
        0%, 42%, 100% { opacity: 1; }
        50%, 92% { opacity: 0.25; }
      }
      @keyframes pulseFalse {
        0%, 42%, 100% { opacity: 0.25; }
        50%, 92% { opacity: 1; }
      }
      @keyframes shiftChevron {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(6px); }
      }
  
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transform: none !important;
          opacity: 1 !important;
        }
      }
    </style>
  
    <!-- Swiss Grid Registration Marks -->
    <path d="M 36 28 H 52 M 44 20 V 36" class="s-white" stroke-width="2" />
    <path d="M 848 28 H 864 M 856 20 V 36" class="s-white" stroke-width="2" />
    <path d="M 36 252 H 52 M 44 244 V 260" class="s-white" stroke-width="2" />
    <path d="M 848 252 H 864 M 856 244 V 260" class="s-white" stroke-width="2" />
  
    <!-- Ground Baseline -->
    <line x1="72" y1="248" x2="828" y2="248" class="s-white" stroke-width="3" stroke-linecap="square" />
  
    <!-- LEFT ZONE: Abstract Multi-Story High-Rise Tower of Verbose if / else -->
    <g transform="translate(210, 248)">
      <g class="tower-sway">
        <!-- Architectural Crane / Antenna Mast on Roof -->
        <line x1="-58" y1="-214" x2="-58" y2="-234" class="s-white" stroke-width="2.5" />
        <circle cx="-58" cy="-234" r="4" class="c-white" />
        <rect x="-24" y="-224" width="76" height="10" class="c-dark s-white" stroke-width="1.8" />
  
        <!-- Floor 4 (Top): if (ok) { -->
        <rect x="-92" y="-214" width="184" height="44" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-92" y="-214" width="54" height="44" class="c-accent" />
        <text x="-65" y="-187" text-anchor="middle" class="c-white mono" font-size="15" font-weight="700">if</text>
        <text x="16" y="-187" text-anchor="middle" class="c-dark mono" font-size="14" font-weight="700">(ok) {</text>
  
        <!-- Floor 3: res = "Да"; -->
        <rect x="-102" y="-170" width="204" height="44" class="c-dark s-white" stroke-width="2.2" />
        <rect x="-86" y="-158" width="22" height="20" class="c-white" />
        <rect x="-56" y="-158" width="22" height="20" class="c-accent" />
        <text x="26" y="-143" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">x = a;</text>
  
        <!-- Floor 2: } else { -->
        <rect x="-96" y="-126" width="192" height="44" class="c-white s-dark" stroke-width="2.4" />
        <rect x="24" y="-126" width="72" height="44" class="c-dark" />
        <text x="60" y="-99" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">else</text>
        <text x="-36" y="-99" text-anchor="middle" class="c-dark mono" font-size="14" font-weight="700">} {</text>
  
        <!-- Floor 1 (Ground Lobby): res = "Нет"; } -->
        <rect x="-110" y="-82" width="220" height="44" class="c-dark s-white" stroke-width="2.2" />
        <rect x="-92" y="-70" width="22" height="20" class="c-white" />
        <rect x="-62" y="-70" width="22" height="20" class="c-white" />
        <text x="26" y="-55" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">x = b; }</text>
  
        <!-- Heavy Concrete Foundation Plinth -->
        <rect x="-122" y="-38" width="244" height="38" class="c-white s-dark" stroke-width="2.5" />
        <!-- Diagonal Bauhaus Hatching on Plinth -->
        <line x1="-102" y1="0" x2="-74" y2="-38" class="s-dark" stroke-width="2.2" />
        <line x1="-74" y1="0" x2="-46" y2="-38" class="s-dark" stroke-width="2.2" />
        <line x1="46" y1="0" x2="74" y2="-38" class="s-dark" stroke-width="2.2" />
        <line x1="74" y1="0" x2="102" y2="-38" class="s-dark" stroke-width="2.2" />
        <rect x="-34" y="-28" width="68" height="18" rx="9" class="c-dark" />
        <text x="0" y="-15" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">5 строк</text>
      </g>
    </g>
  
    <!-- CENTER ZONE: Bauhaus Compression Bridge (5 Lines -> 1 Line) -->
    <g transform="translate(422, 140)">
      <!-- Horizontal Rails -->
      <line x1="-78" y1="0" x2="78" y2="0" class="s-white" stroke-width="10" />
      <line x1="-78" y1="0" x2="78" y2="0" class="s-dark beam-flow" stroke-width="4" />
  
      <!-- Animated Geometric Chevrons -->
      <g class="chevron-shift">
        <polygon points="-14,-22 10,0 -14,22 -24,22 0,0 -24,-22" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <polygon points="10,-22 34,0 10,22 0,22 24,0 0,-22" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
      </g>
  
      <!-- Top Compact Tag: 1 строка -->
      <g transform="translate(0, -46)">
        <rect x="-48" y="-15" width="96" height="30" rx="15" class="c-dark s-white" stroke-width="2" />
        <circle cx="-30" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">1 строка</text>
      </g>
    </g>
  
    <!-- RIGHT ZONE: Cozy Compact Bauhaus House Built of Ternary Operator (? :) -->
    <g transform="translate(674, 248)">
      <g class="house-pop">
        <!-- Chimney Stack & Floating Code Smoke Puffs -->
        <rect x="64" y="-198" width="26" height="44" class="c-dark s-white" stroke-width="2.2" />
        <g transform="translate(77, -214)">
          <g class="smoke-puff-1">
            <circle cx="0" cy="0" r="8" class="c-white s-dark" stroke-width="2" />
          </g>
        </g>
        <g transform="translate(92, -228)">
          <g class="smoke-puff-2">
            <circle cx="0" cy="0" r="6" class="c-white s-dark" stroke-width="1.8" />
          </g>
        </g>
  
        <!-- Pitched Bauhaus Gable Roof -->
        <polygon points="-158,-126 0,-212 158,-126" class="c-white s-dark" stroke-width="2.8" stroke-linejoin="round" />
        <!-- Inner Accent Roof Pediment with Condition Badge -->
        <polygon points="-112,-132 0,-192 112,-132" class="c-dark" />
        <rect x="-44" y="-164" width="88" height="24" rx="12" class="c-accent" />
        <text x="0" y="-148" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">ok ? a : b</text>
  
        <!-- Cozy House Main Facade -->
        <rect x="-136" y="-126" width="272" height="126" class="c-white s-dark" stroke-width="2.6" />
  
        <!-- Left Room (TRUE branch: ? a) -->
        <rect x="-120" y="-108" width="76" height="68" class="c-dark" />
        <rect x="-112" y="-100" width="60" height="22" rx="6" class="c-accent lamp-true" />
        <text x="-82" y="-85" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">true</text>
        <text x="-82" y="-54" text-anchor="middle" class="c-white mono" font-size="22" font-weight="700">a</text>
  
        <!-- Center Divider Pillar & Doorway (: Colon Symbol as Architecture!) -->
        <rect x="-28" y="-112" width="56" height="112" class="c-dark" />
        <!-- Giant "?" Above Door & ":" Twin Colon Dots Inside Door -->
        <text x="0" y="-82" text-anchor="middle" class="c-white mono" font-size="26" font-weight="700">?</text>
        <circle cx="0" cy="-54" r="6" class="c-accent" />
        <circle cx="0" cy="-32" r="6" class="c-white" />
        <!-- Doorstep Threshold -->
        <rect x="-36" y="-10" width="72" height="10" class="c-white s-dark" stroke-width="2" />
  
        <!-- Right Room (FALSE branch: : b) -->
        <rect x="44" y="-108" width="76" height="68" class="c-dark" />
        <rect x="52" y="-100" width="60" height="22" rx="6" class="c-white lamp-false" />
        <text x="82" y="-85" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">false</text>
        <text x="82" y="-54" text-anchor="middle" class="c-white mono" font-size="22" font-weight="700">b</text>
  
        <!-- Cozy Window Sills -->
        <rect x="-124" y="-36" width="84" height="8" class="c-accent" />
        <rect x="40" y="-36" width="84" height="8" class="c-accent" />
      </g>
    </g>
  </svg>
---

# Тернарный оператор

Как заменить простой блок `if / else` одной компактной строкой и быстро выбрать одно из двух значений?

Тернарный оператор `? :` (от англ. *ternary* — тройной) — это сокращённая форма условной конструкции `if / else`, которая принимает три части: логическое условие, результат при истине и результат при лжи.

## Как устроен оператор

Синтаксис записи выглядит так: `условие ? значение_если_true : значение_если_false`

* **`условие`** — любое логическое выражение, возвращающее `true` или `false`.
* **`?`** — разделитель после условия («если да, то взять первое значение»).
* **`:`** — разделитель между вариантами («иначе взять второе значение»).

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        int age = 20;

        // 1. Выбор значения для записи в переменную
        string status = age >= 18 ? "Совершеннолетний" : "Несовершеннолетний";

        // 2. Расчёт стоимости доставки в зависимости от суммы заказа
        int orderSum = 3500;
        int deliveryCost = orderSum >= 3000 ? 0 : 300;

        // 3. Использование прямо внутри вывода текста
        bool isOnline = true;
        Console.WriteLine($"Статус: {status}, доставка: {deliveryCost} руб.");
        Console.WriteLine($"Игрок сейчас {(isOnline ? "в сети" : "не в сети")}.");
    }
}

```

## Важные нюансы

* **Возвращает значение, а не выполняет команды:** тернарный оператор нельзя записать отдельной строкой для вызова действий — его результат обязательно нужно куда-то передать (сохранить в переменную или подставить в метод).
* **Одинаковый тип обеих веток:** значения после знака `?` и после знака `:` должны быть одного или совместимого типа (например, обе ветки — строки `string` или обе — числа `int`), иначе компилятор выдаст ошибку.
* **Скобки внутри интерполяции строк:** если вы вставляете тернарный оператор внутрь строки с долларом `$"..."`, обязательно берите его в круглые скобки `{(условие ? "да" : "нет")}`, чтобы двоеточие не спуталось с форматированием вывода.
* **Избегайте вложенности:** технически можно поместить один тернарный оператор внутрь другого, но такой код крайне трудно читать — для трёх и более вариантов используйте цепочку `if / else if` или `switch`.

