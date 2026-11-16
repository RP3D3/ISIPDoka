---
title: switch
keywords: конструкция switch, оператор выбора, case, break, default, ветвление, сравнение значений, группировка условий, переключатель, выбор варианта
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
  
      .jenga-sway {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: swayJenga 3.2s ease-in-out infinite;
      }
      .jenga-top-teeter {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: teeterTop 3.2s ease-in-out infinite;
      }
      .jenga-loose-block {
        transform-box: fill-box;
        transform-origin: center;
        animation: slideLoose 3.2s ease-in-out infinite;
      }
      .rail-flow {
        stroke-dasharray: 8 6;
        animation: flowRail 1.1s linear infinite;
      }
      .chevron-nudge {
        transform-box: fill-box;
        transform-origin: center;
        animation: nudgeChevron 2.2s ease-in-out infinite;
      }
      .active-bay-pulse {
        transform-box: fill-box;
        transform-origin: center;
        animation: pulseBay 3.2s ease-in-out infinite;
      }
      .lamp-blink {
        animation: blinkLamp 1.6s ease-in-out infinite;
      }
  
      @keyframes swayJenga {
        0%, 100% { transform: rotate(-2.5deg); }
        50% { transform: rotate(3.2deg); }
      }
      @keyframes teeterTop {
        0%, 100% { transform: rotate(3.5deg) translateX(2px); }
        50% { transform: rotate(-4.5deg) translateX(-3px); }
      }
      @keyframes slideLoose {
        0%, 100% { transform: translateX(0px) rotate(1.5deg); }
        50% { transform: translateX(18px) rotate(4deg); }
      }
      @keyframes flowRail {
        0% { stroke-dashoffset: 28; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes nudgeChevron {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(6px); }
      }
      @keyframes pulseBay {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.82; }
      }
      @keyframes blinkLamp {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.25; }
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
    <line x1="64" y1="248" x2="836" y2="248" class="s-white" stroke-width="3" stroke-linecap="square" />
  
    <!-- LEFT ZONE: Precarious Wobbly Jenga Tower of if / else if / else -->
    <g transform="translate(206, 248)">
      <!-- Base Block (else) -->
      <rect x="-82" y="-32" width="164" height="32" rx="4" class="c-dark s-white" stroke-width="2.2" />
      <text x="0" y="-11" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">else { ... }</text>
  
      <!-- Lower-Mid Wobbling Stack -->
      <g transform="translate(0, -32)">
        <g class="jenga-sway">
          <!-- Row 2: Three End-On Jenga Pegs -->
          <rect x="-76" y="-28" width="46" height="28" rx="4" class="c-white s-dark" stroke-width="2.2" />
          <rect x="-23" y="-28" width="46" height="28" rx="4" class="c-dark s-white" stroke-width="2" />
          <rect x="30" y="-28" width="46" height="28" rx="4" class="c-white s-dark" stroke-width="2.2" />
  
          <!-- Row 3: Sliding Loose Jenga Block (else if) -->
          <g transform="translate(8, -28)">
            <g class="jenga-loose-block">
              <rect x="-82" y="-32" width="164" height="32" rx="4" class="c-white s-dark" stroke-width="2.4" />
              <rect x="-74" y="-25" width="76" height="18" rx="4" class="c-accent" />
              <text x="-36" y="-12" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">else if</text>
              <text x="40" y="-12" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">(x == 2)</text>
            </g>
          </g>
  
          <!-- Row 4: Two Off-Center End-On Pegs (Gaps!) -->
          <rect x="-64" y="-88" width="48" height="28" rx="4" class="c-dark s-white" stroke-width="2" />
          <rect x="14" y="-88" width="48" height="28" rx="4" class="c-white s-dark" stroke-width="2.2" />
  
          <!-- Upper Teetering Peak (else if + if) -->
          <g transform="translate(0, -88)">
            <g class="jenga-top-teeter">
              <!-- Row 5: Tilted else if plank -->
              <g transform="rotate(-3)">
                <rect x="-84" y="-32" width="168" height="32" rx="4" class="c-dark s-white" stroke-width="2.2" />
                <text x="0" y="-11" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">else if (x == 1)</text>
              </g>
  
              <!-- Row 6: Precarious Top Cap (if) -->
              <g transform="translate(-6, -32) rotate(4)">
                <rect x="-68" y="-32" width="136" height="32" rx="4" class="c-white s-dark" stroke-width="2.4" />
                <rect x="-60" y="-25" width="38" height="18" rx="4" class="c-accent" />
                <text x="-41" y="-12" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">if</text>
                <text x="20" y="-12" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">(x == 0)</text>
              </g>
            </g>
          </g>
        </g>
      </g>
  
      <!-- Motion Warning Ticks Around Top of Jenga -->
      <path d="M -98 -182 L -110 -190 M -102 -168 L -114 -170" class="s-white" stroke-width="2.2" stroke-linecap="round" />
      <path d="M 98 -174 L 110 -182 M 102 -160 L 114 -162" class="s-white" stroke-width="2.2" stroke-linecap="round" />
    </g>
  
    <!-- CENTER ZONE: Bauhaus Transformation Bridge (-> switch) -->
    <g transform="translate(426, 146)">
      <!-- Horizontal Rails -->
      <line x1="-68" y1="0" x2="68" y2="0" class="s-white" stroke-width="10" />
      <line x1="-68" y1="0" x2="68" y2="0" class="s-dark rail-flow" stroke-width="4" />
  
      <!-- Animated Directional Chevrons -->
      <g class="chevron-nudge">
        <polygon points="-14,-20 8,0 -14,20 -24,20 -2,0 -24,-20" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <polygon points="8,-20 30,0 8,20 -2,20 20,0 -2,-20" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
      </g>
  
      <!-- Top Pill Badge: switch (x) -->
      <g transform="translate(0, -44)">
        <rect x="-56" y="-16" width="112" height="32" rx="16" class="c-dark s-white" stroke-width="2" />
        <circle cx="-38" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">switch (x)</text>
      </g>
    </g>
  
    <!-- RIGHT ZONE: Rock-Solid Modular Bauhaus Building (switch) -->
    <g transform="translate(674, 248)">
      <!-- Heavy Bauhaus Structural Frame & Roof Pediment -->
      <rect x="-136" y="-196" width="272" height="196" class="c-white s-dark" stroke-width="2.8" />
  
      <!-- Stepped Architectural Roof Crown -->
      <rect x="-146" y="-212" width="292" height="16" class="c-dark s-white" stroke-width="2.2" />
      <rect x="-86" y="-228" width="172" height="16" class="c-white s-dark" stroke-width="2.2" />
      <text x="0" y="-216" text-anchor="middle" class="c-dark mono" font-size="11" font-weight="700" letter-spacing="1.5">SWITCH СТРУКТУРА</text>
  
      <!-- Left & Right Load-Bearing Structural Columns -->
      <rect x="-126" y="-186" width="14" height="142" class="c-dark" />
      <rect x="112" y="-186" width="14" height="142" class="c-dark" />
  
      <!-- FLOOR 3 (TOP): case 1: -->
      <g transform="translate(0, -166)">
        <rect x="-104" y="-18" width="208" height="36" rx="4" class="c-dark" />
        <rect x="-96" y="-11" width="74" height="22" rx="4" class="c-white" />
        <text x="-59" y="4" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">case 1:</text>
        <text x="38" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">break;</text>
      </g>
  
      <!-- FLOOR 2 (MIDDLE - ACTIVE SELECTED CASE): case 2: -->
      <g transform="translate(0, -120)">
        <g class="active-bay-pulse">
          <rect x="-104" y="-18" width="208" height="36" rx="4" class="c-accent" />
          <rect x="-96" y="-11" width="74" height="22" rx="4" class="c-white" />
          <text x="-59" y="4" text-anchor="middle" class="c-accent mono" font-size="12" font-weight="700">case 2:</text>
          <text x="30" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">break;</text>
          <circle cx="88" cy="0" r="5" class="c-white lamp-blink" />
        </g>
      </g>
  
      <!-- FLOOR 1 (LOWER): case 3: -->
      <g transform="translate(0, -74)">
        <rect x="-104" y="-18" width="208" height="36" rx="4" class="c-dark" />
        <rect x="-96" y="-11" width="74" height="22" rx="4" class="c-white" />
        <text x="-59" y="4" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">case 3:</text>
        <text x="38" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">break;</text>
      </g>
  
      <!-- SOLID GROUND FOUNDATION: default: -->
      <g transform="translate(0, -22)">
        <rect x="-126" y="-18" width="252" height="36" class="c-dark" />
        <!-- Bauhaus Diagonal Foundation Stripes on Left & Right -->
        <line x1="-122" y1="16" x2="-104" y2="-16" class="s-white" stroke-width="2" />
        <line x1="-108" y1="16" x2="-90" y2="-16" class="s-white" stroke-width="2" />
        <line x1="90" y1="16" x2="108" y2="-16" class="s-white" stroke-width="2" />
        <line x1="104" y1="16" x2="122" y2="-16" class="s-white" stroke-width="2" />
  
        <!-- Center Default Foundation Pill -->
        <rect x="-78" y="-12" width="156" height="24" rx="12" class="c-white" />
        <circle cx="-60" cy="0" r="4.5" class="c-accent" />
        <text x="8" y="4" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">default: break;</text>
      </g>
    </g>
  </svg>
---

# Конструкция выбора switch

Как заменить длинную цепочку проверок равенства на аккуратный переключатель и какие существуют способы записи `switch`?

Конструкция `switch` (переключатель) сравнивает одно выражение с набором вариантов (`case`) и запускает совпадающую ветку. Она делает код намного чище, когда одну переменную нужно проверить на множество конкретных значений.

## Четыре способа представления `switch`

* **1. Классический выбор (`case` + `break`):** каждому значению соответствует свой блок команд. Оператор `break` выходит из переключателя, а необязательная ветка `default` срабатывает, если ни один вариант не подошёл.
* **2. Группировка нескольких `case`:** если разные значения должны выполнять одно и то же действие, их метки `case` ставят друг под другом без `break` между ними.
* **3. Выбор с дополнительным условием (`case ... when`):** к проверке значения можно добавить фильтр `when`, чтобы задавать диапазоны и уточняющие правила прямо внутри `switch`.
* **4. Компактное `switch`-выражение (`=>`):** современная табличная форма без слов `case` и `break`, которая сразу возвращает готовое значение для записи в переменную.

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. Классический switch и группировка нескольких case
        int dayNumber = 6;
        switch (dayNumber)
        {
            case 1:
                Console.WriteLine("Понедельник — начало недели.");
                break;
            case 6:
            case 7:
                Console.WriteLine("Выходной день!");
                break;
            default:
                Console.WriteLine("Обычный рабочий день.");
                break;
        }

        // 2. Классический switch с фильтром when (проверка диапазонов)
        int temperature = -12;
        switch (temperature)
        {
            case int t when t < 0:
                Console.WriteLine("На улице мороз.");
                break;
            case int t when t <= 20:
                Console.WriteLine("Прохладная погода.");
                break;
            default:
                Console.WriteLine("На улице тепло.");
                break;
        }

        // 3. Современное switch-выражение (возвращает значение в переменную)
        string command = "start";
        string statusMessage = command switch
        {
            "start" => "Система запущена",
            "stop"  => "Система остановлена",
            _       => "Неизвестная команда" // аналог default
        };

        Console.WriteLine(statusMessage);
    }
}

```

## Важные нюансы

* **Обязательный `break` после непустой ветки:** в отличие от некоторых других языков, здесь нельзя случайно «провалиться» из одного `case` с кодом в следующий — компилятор потребует явно завершить ветку через `break` или `return`.
* **Уникальность меток `case`:** внутри одного переключателя нельзя написать два одинаковых значения (например, два раза `case 1:`), а в классическом варианте метки должны быть константами.
* **Ветка `default` или символ `_`:** блок по умолчанию не обязателен, но его почти всегда добавляют в конец для защиты от неожиданного ввода пользователя.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен `break` в классическом `switch`?",
  "options": [
    {
      "text": "Завершает выбранную ветку",
      "correct": true
    },
    {
      "text": "Начинает ветку",
      "correct": false,
      "explanation": "Ветку начинает `case`."
    },
    {
      "text": "Обязателен только в `default`",
      "correct": false,
      "explanation": "Нужен после непустых веток."
    }
  ],
  "explanation": "Без `break` выполнение может провалиться в следующий `case`."
}
```

```quiz
{
  "type": "radio",
  "question": "Можно ли иметь два одинаковых `case` в одном `switch`?",
  "options": [
    {
      "text": "Нет",
      "correct": true
    },
    {
      "text": "Да, выполнится первый",
      "correct": false,
      "explanation": "Компилятор запрещает дубли."
    },
    {
      "text": "Да, выполнится последний",
      "correct": false,
      "explanation": "Дубли недопустимы."
    }
  ],
  "explanation": "Метки `case` должны быть уникальными."
}
```
