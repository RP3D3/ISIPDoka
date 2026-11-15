---
title: Ветвления
keywords: условные конструкции, ветвление, if, else, тернарный оператор, switch, выбор значения, условие, проверка, сравнение, диапазон, логика
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
  
      .head-think {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: tiltThink 4.6s ease-in-out infinite;
      }
      .eyes-choose {
        transform-box: fill-box;
        transform-origin: center;
        animation: scanChoices 4.6s ease-in-out infinite;
      }
      .hand-chin {
        transform-box: fill-box;
        transform-origin: bottom right;
        animation: rubChin 4.6s ease-in-out infinite;
      }
      .bubble-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: popBubble1 3.4s ease-in-out infinite;
      }
      .bubble-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: popBubble2 3.4s ease-in-out infinite;
      }
      .route-flow {
        stroke-dasharray: 6 6;
        animation: flowRoute 1.2s linear infinite;
      }
      .card-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatCard1 4.2s ease-in-out infinite;
      }
      .card-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatCard2 4.2s ease-in-out infinite;
      }
      .card-3 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatCard3 4.2s ease-in-out infinite;
      }
      .burst-idea {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: flashIdea 4.6s ease-in-out infinite;
      }
  
      @keyframes tiltThink {
        0%, 100% { transform: rotate(-2deg); }
        50% { transform: rotate(3deg); }
      }
      @keyframes scanChoices {
        0%, 100% { transform: translate(2px, -3px); }
        33% { transform: translate(4px, 0px); }
        66% { transform: translate(2px, 3px); }
      }
      @keyframes rubChin {
        0%, 100% { transform: rotate(0deg) translateY(0px); }
        50% { transform: rotate(-3deg) translateY(-3px); }
      }
      @keyframes popBubble1 {
        0%, 100% { transform: scale(0.9); opacity: 0.75; }
        50% { transform: scale(1.12); opacity: 1; }
      }
      @keyframes popBubble2 {
        0%, 100% { transform: scale(1.1); opacity: 1; }
        50% { transform: scale(0.88); opacity: 0.75; }
      }
      @keyframes flowRoute {
        0% { stroke-dashoffset: 24; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes floatCard1 {
        0%, 100% { transform: translateY(0px); }
        33% { transform: translateY(-4px); }
      }
      @keyframes floatCard2 {
        0%, 33%, 100% { transform: translateY(0px); }
        66% { transform: translateY(-4px); }
      }
      @keyframes floatCard3 {
        0%, 66%, 100% { transform: translateY(0px); }
        85% { transform: translateY(-4px); }
      }
      @keyframes flashIdea {
        0%, 35%, 80%, 100% { transform: scale(0.75); opacity: 0.2; }
        50%, 68% { transform: scale(1.12); opacity: 1; }
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
    <path d="M 52 38 H 32 V 242 H 52" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 848 38 H 868 V 242 H 848" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- LEFT ZONE: Grotesque Developer Character Pondering Which Branch to Pick -->
    <g transform="translate(184, 280)">
      <!-- Broad Geometric Turtleneck Torso -->
      <path d="M -98 0 C -98 -54, -62 -76, 0 -76 C 62 -76, 98 -54, 98 0 Z" class="c-dark s-white" stroke-width="2.4" />
      <!-- Turtleneck Collar -->
      <rect x="-24" y="-92" width="48" height="24" rx="8" class="c-dark s-white" stroke-width="2.2" />
      <line x1="-22" y1="-80" x2="22" y2="-80" class="s-white" stroke-width="1.6" />
  
      <!-- Thinking Head Group -->
      <g transform="translate(0, -90)">
        <g class="head-think">
          <!-- Back Hair Volume -->
          <path d="M -52 -46 C -58 -92, -26 -124, 16 -120 C 52 -116, 66 -86, 56 -48 Z" class="c-dark s-white" stroke-width="2.4" />
  
          <!-- Grotesque Stylized Face -->
          <path d="M -42 -68 C -42 -96, 44 -96, 44 -64 L 44 -32 C 44 -4, 24 8, 2 8 C -22 8, -42 -6, -42 -34 Z" class="c-white s-dark" stroke-width="2.5" />
  
          <!-- Characteristic Round Ear with Diagonal Tick -->
          <circle cx="-44" cy="-46" r="13" class="c-white s-dark" stroke-width="2.3" />
          <line x1="-48" y1="-50" x2="-40" y2="-42" class="s-dark" stroke-width="2" stroke-linecap="round" />
  
          <!-- Geometric Editorial Fringe / Bangs -->
          <path d="M -46 -68 C -44 -102, 24 -108, 48 -76 L 34 -64 L 18 -76 L 2 -62 L -14 -76 L -32 -62 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
  
          <!-- Rectangular Developer Glasses + Looking Pupils -->
          <rect x="-14" y="-58" width="26" height="20" rx="5" class="c-white s-dark" stroke-width="2.3" />
          <rect x="18" y="-58" width="26" height="20" rx="5" class="c-white s-dark" stroke-width="2.3" />
          <line x1="12" y1="-49" x2="18" y2="-49" class="s-dark" stroke-width="2.4" />
          <line x1="-31" y1="-48" x2="-14" y2="-50" class="s-dark" stroke-width="2.2" />
  
          <g class="eyes-choose">
            <circle cx="-1" cy="-48" r="3.5" class="c-dark" />
            <circle cx="31" cy="-48" r="3.5" class="c-dark" />
          </g>
  
          <!-- Minimalist Nose & Thoughtful Mouth -->
          <path d="M 15 -42 L 21 -28 L 13 -26" class="s-dark" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 4 -14 Q 14 -17 22 -13" class="s-dark" stroke-width="2.2" stroke-linecap="round" />
        </g>
      </g>
  
      <!-- Raised Hand Touching Chin (with Characteristic Half-Moon Fingernails!) -->
      <g transform="translate(36, -68)">
        <g class="hand-chin">
          <!-- Forearm Sleeve -->
          <path d="M -18 68 L 4 8 L 28 16 L 12 68 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
          <!-- White Cuff -->
          <path d="M 2 14 L 7 0 L 31 8 L 26 22 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
          <!-- Palm & Curled Fingers -->
          <rect x="2" y="-24" width="26" height="28" rx="12" class="c-white s-dark" stroke-width="2.3" />
          <!-- Pointing / Thinking Finger Resting on Chin -->
          <rect x="-6" y="-38" width="12" height="24" rx="6" transform="rotate(-14 -6 -38)" class="c-white s-dark" stroke-width="2.2" />
          <!-- Half-Moon Fingernail -->
          <path d="M -5 -33 C -5 -36, 1 -36, 1 -33" class="s-dark" stroke-width="1.5" stroke-linecap="round" />
          <!-- Knuckle Lines -->
          <line x1="12" y1="-15" x2="24" y2="-15" class="s-dark" stroke-width="1.8" stroke-linecap="round" />
          <line x1="12" y1="-8" x2="24" y2="-8" class="s-dark" stroke-width="1.8" stroke-linecap="round" />
        </g>
      </g>
    </g>
  
    <!-- Thought Bubbles Rising from Developer's Head to Decision Tree -->
    <g transform="translate(274, 152)">
      <g class="bubble-1">
        <circle cx="0" cy="0" r="8" class="c-white s-dark" stroke-width="2.2" />
      </g>
    </g>
    <g transform="translate(302, 140)">
      <g class="bubble-2">
        <circle cx="0" cy="0" r="12" class="c-white s-dark" stroke-width="2.2" />
        <circle cx="0" cy="0" r="4" class="c-accent" />
      </g>
    </g>
  
    <!-- CENTER DECISION HUB & BRANCHING ROUTER -->
    <g transform="translate(358, 140)">
      <!-- Central Question Node -->
      <circle cx="0" cy="0" r="24" class="c-white s-dark" stroke-width="2.5" />
      <circle cx="0" cy="0" r="16" class="c-accent" />
      <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="18" font-weight="700">?</text>
    </g>
  
    <!-- Three Animated Routing Paths to Cheat-Sheet Cards -->
    <path d="M 382 132 H 424 V 54 H 462" class="s-white route-flow" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 382 140 H 462" class="s-white route-flow" stroke-width="2.4" stroke-linecap="round" />
    <path d="M 382 148 H 424 V 226 H 462" class="s-white route-flow" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Kinetic Burst Rays at Top of Decision Tree -->
    <g transform="translate(814, 34)">
      <g class="burst-idea">
        <line x1="0" y1="0" x2="14" y2="-14" class="s-white" stroke-width="2.4" stroke-linecap="round" />
        <line x1="8" y1="8" x2="24" y2="4" class="s-white" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="18" cy="-5" r="2.6" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT ZONE: 3-Row Conditional Cheat Sheet Cards -->
    <!-- CARD 1: if / else — Complex Conditions & Ranges -->
    <g transform="translate(646, 54)">
      <g class="card-1">
        <rect x="-182" y="-28" width="364" height="56" rx="16" class="c-white s-dark" stroke-width="2.5" />
        <rect x="-175" y="-21" width="350" height="42" rx="11" class="c-dark" />
  
        <!-- Syntax Pill -->
        <rect x="-166" y="-14" width="114" height="28" rx="8" class="c-accent" />
        <text x="-109" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">if / else</text>
  
        <!-- Use-Case Description -->
        <text x="54" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">сложные условия (&& ||)</text>
      </g>
    </g>
  
    <!-- CARD 2: Ternary Operator (? :) — Compact 1-Line Choice -->
    <g transform="translate(646, 140)">
      <g class="card-2">
        <rect x="-182" y="-28" width="364" height="56" rx="16" class="c-white s-dark" stroke-width="2.5" />
        <rect x="-175" y="-21" width="350" height="42" rx="11" class="c-dark" />
  
        <!-- Syntax Pill -->
        <rect x="-166" y="-14" width="114" height="28" rx="8" class="c-white" />
        <text x="-109" y="5" text-anchor="middle" class="c-dark mono" font-size="13" font-weight="700">ok ? a : b</text>
  
        <!-- Use-Case Description -->
        <text x="54" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">2 значения в 1 строку</text>
      </g>
    </g>
  
    <!-- CARD 3: switch / switch expression (=>) — Multiple Cases -->
    <g transform="translate(646, 226)">
      <g class="card-3">
        <rect x="-182" y="-28" width="364" height="56" rx="16" class="c-white s-dark" stroke-width="2.5" />
        <rect x="-175" y="-21" width="350" height="42" rx="11" class="c-dark" />
  
        <!-- Syntax Pill -->
        <rect x="-166" y="-14" width="114" height="28" rx="8" class="c-accent" />
        <text x="-109" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">switch =></text>
  
        <!-- Use-Case Description -->
        <text x="54" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">много вариантов и кодов</text>
      </g>
    </g>
  </svg>
---

# Шпаргалка по условным конструкциям

Какую конструкцию ветвления выбрать для проверки условий — классический `if`, тернарный оператор или один из вариантов `switch`?

Все конструкции ветвления позволяют программе принимать решения, но различаются по назначению: одни выполняют блоки команд, а другие компактно возвращают готовое значение.

## Таблица сравнения

| Конструкция | Что делает | Особенности | Когда применять |
| --- | --- | --- | --- |
| `if / else if / else` | Выполняет блоки кода при истинности условий | Поддерживает любые сложные проверки (`&&`, `\|\|`), порядок веток важен | Для сложных логических условий, диапазонов и выполнения нескольких действий |
| Тернарный оператор `? :` | Возвращает одно из двух значений в одну строку | Работает только с двумя исходами; обе ветки должны иметь общий тип | Когда нужно быстро записать выбор между «да» и «нет» в переменную |
| Классический `switch` | Запускает блок кода по совпадению со значением | Требует `break` в конце ветки; умеет группировать несколько `case` | Когда проверяется одна переменная на множество точных вариантов с действиями |
| `switch`-выражение (`=>`) | Возвращает готовое значение по шаблону | Без слов `case` и `break`; поддерживает диапазоны и ветку `_` | Для чистого и компактного выбора значения по нескольким вариантам или интервалам |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        int level = 12;
        bool hasVip = true;

        // 1. if / else — сложная проверка с выполнением действий
        if (level >= 10 && hasVip)
        {
            Console.WriteLine("Доступ в закрытую зону открыт.");
        }
        else
        {
            Console.WriteLine("Нужен 10 уровень и VIP-статус.");
        }

        // 2. Тернарный оператор (? :) — выбор одного из двух значений
        int bonus = hasVip ? 500 : 100;

        // 3. Классический switch — выбор действия по точному значению
        string role = "mage";
        switch (role)
        {
            case "warrior":
                Console.WriteLine("Выбран ближний бой.");
                break;
            case "mage":
            case "archer":
                Console.WriteLine("Выбран дальний бой.");
                break;
            default:
                Console.WriteLine("Неизвестный класс.");
                break;
        }

        // 4. Современное switch-выражение — компактный возврат значения по диапазону
        string rank = level switch
        {
            < 5             => "Новичок",
            >= 5 and <= 15  => "Искатель",
            _               => "Ветеран"
        };

        Console.WriteLine($"Ранг: {rank}, стартовый бонус: {bonus}");
    }
}

```

## Краткий алгоритм выбора

* **Нужно выполнить несколько команд или проверить сложное условие с `&&` и `||`:** используйте `if / else if / else`.
* **Нужно выбрать одно из двух значений для переменной или вывода:** берите тернарный оператор `условие ? да : нет`.
* **Сравниваете одну переменную с набором точных вариантов и запускаете действия:** подойдёт классический `switch`.
* **Превращаете число, диапазон или код в итоговое значение для переменной:** выбирайте современное `switch`-выражение (`=>`).

