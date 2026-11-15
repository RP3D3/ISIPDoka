---
title: else if
keywords: цепочка условий, else if, вложенные условия, ветвление, выбор варианта, порядок проверок, диапазон, вложенность, условие, логика
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
  
      .spine-flow {
        stroke-dasharray: 8 6;
        animation: flowDown 1.1s linear infinite;
      }
      .branch-flow {
        stroke-dasharray: 8 6;
        animation: flowRight 1.1s linear infinite;
      }
      .gate-top {
        transform-box: fill-box;
        transform-origin: left center;
        animation: nudgeClosed 4.2s ease-in-out infinite;
      }
      .gate-mid {
        transform-box: fill-box;
        transform-origin: left center;
        animation: swingOpen 4.2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
      }
      .winner-pulse {
        transform-box: fill-box;
        transform-origin: center;
        animation: pulseWinner 4.2s ease-in-out infinite;
      }
      .lamp-blink {
        animation: blinkLamp 2.1s ease-in-out infinite;
      }
      .ladder-float {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatLadder 4.6s ease-in-out infinite;
      }
      .wheel-spin {
        transform-box: fill-box;
        transform-origin: center;
        animation: spinWheel 8.4s linear infinite;
      }
  
      @keyframes flowDown {
        0% { stroke-dashoffset: 28; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes flowRight {
        0% { stroke-dashoffset: 28; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes nudgeClosed {
        0%, 100% { transform: rotate(0deg); }
        20% { transform: rotate(-5deg); }
        35% { transform: rotate(0deg); }
      }
      @keyframes swingOpen {
        0%, 25%, 100% { transform: rotate(0deg); }
        45%, 80% { transform: rotate(-36deg); }
      }
      @keyframes pulseWinner {
        0%, 35%, 100% { transform: translateX(0px); }
        55%, 75% { transform: translateX(7px); }
      }
      @keyframes blinkLamp {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      @keyframes floatLadder {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }
      @keyframes spinWheel {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
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
  
    <!-- LEFT ZONE: Input Value & Nested-to-Flat Swiss Diagram -->
    <g transform="translate(142, 140)">
      <!-- Outer Bauhaus Frame -->
      <rect x="-82" y="-98" width="164" height="196" class="c-dark s-white" stroke-width="2" />
      <!-- Diagonal Corner Stripes -->
      <line x1="-82" y1="-72" x2="-56" y2="-98" class="s-white" stroke-width="2" />
      <line x1="56" y1="98" x2="82" y2="72" class="s-white" stroke-width="2" />
  
      <!-- Top Input Value Monolith -->
      <rect x="-66" y="-82" width="132" height="68" class="c-white s-dark" stroke-width="2.5" />
      <rect x="-66" y="-82" width="132" height="22" class="c-dark" />
      <text x="0" y="-67" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700" letter-spacing="1.2">ВХОД</text>
      <rect x="-52" y="-50" width="104" height="28" rx="14" class="c-accent" />
      <text x="0" y="-31" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">x = 78</text>
  
      <!-- Bottom Mini Schema: Nested Ladder vs Flat Cascade -->
      <g transform="translate(0, 42)">
        <g class="ladder-float">
          <rect x="-66" y="-36" width="132" height="72" class="c-white s-dark" stroke-width="2" />
          <!-- Mini Staircase Steps -->
          <rect x="-52" y="-22" width="32" height="10" class="c-dark" />
          <rect x="-34" y="-6" width="32" height="10" class="c-accent" />
          <rect x="-16" y="10" width="32" height="10" class="c-dark" />
          <!-- Flat Cascade Vertical Bar -->
          <line x1="36" y1="-22" x2="36" y2="20" class="s-dark" stroke-width="3" />
          <circle cx="36" cy="-16" r="4" class="c-dark" />
          <circle cx="36" cy="0" r="5" class="c-accent" />
          <circle cx="36" cy="16" r="4" class="c-dark" />
        </g>
      </g>
    </g>
  
    <!-- Feed Rail from Left Input into Top of Cascade Spine -->
    <path d="M 224 92 H 286 V 60" class="s-white" stroke-width="8" stroke-linejoin="round" />
    <path d="M 224 92 H 286 V 60" class="s-dark spine-flow" stroke-width="3" stroke-linejoin="round" />
  
    <!-- CENTER ZONE: 3-Tier Bauhaus Cascade Sluice (if -> else if -> else) -->
    <!-- Main Vertical Distribution Spine -->
    <line x1="286" y1="54" x2="286" y2="220" class="s-white" stroke-width="10" stroke-linecap="square" />
    <line x1="286" y1="54" x2="286" y2="220" class="s-dark spine-flow" stroke-width="4" />
  
    <!-- Decorative Bauhaus Gear at Bottom of Spine -->
    <g transform="translate(286, 244)">
      <g class="wheel-spin">
        <circle cx="0" cy="0" r="15" class="c-white s-dark" stroke-width="2" />
        <line x1="-10" y1="0" x2="10" y2="0" class="s-dark" stroke-width="2.5" />
        <line x1="0" y1="-10" x2="0" y2="10" class="s-dark" stroke-width="2.5" />
      </g>
    </g>
  
    <!-- TIER 1: if (x >= 90) — CLOSED GATE (false) -->
    <g transform="translate(442, 60)">
      <!-- Horizontal Track (Dimmed / Blocked) -->
      <line x1="-156" y1="0" x2="184" y2="0" class="s-white" stroke-width="8" stroke-opacity="0.35" />
  
      <!-- Pivoting Barrier Blocking Path -->
      <g transform="translate(-142, 0)">
        <g class="gate-top">
          <rect x="-4" y="-22" width="8" height="44" class="c-white s-dark" stroke-width="2" />
        </g>
      </g>
  
      <!-- Condition Check Box -->
      <rect x="-112" y="-22" width="224" height="44" class="c-dark s-white" stroke-width="2.2" />
      <rect x="-112" y="-22" width="54" height="44" class="c-white" />
      <text x="-85" y="5" text-anchor="middle" class="c-dark mono" font-size="14" font-weight="700">if</text>
      <text x="12" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">x >= 90</text>
      <!-- False Status Circle -->
      <circle cx="92" cy="0" r="10" class="c-white" />
      <path d="M 88 -4 L 96 4 M 96 -4 L 88 4" class="s-dark" stroke-width="2.2" stroke-linecap="round" />
    </g>
  
    <!-- TIER 2: else if (x >= 75) — ACTIVE OPEN GATE (true!) -->
    <g transform="translate(442, 140)">
      <!-- Active High-Contrast Rail to Result -->
      <line x1="-156" y1="0" x2="184" y2="0" class="s-white" stroke-width="10" />
      <line x1="-156" y1="0" x2="184" y2="0" class="s-dark branch-flow" stroke-width="4" />
  
      <!-- Swinging Open Gate Arm -->
      <g transform="translate(-142, -16)">
        <g class="gate-mid">
          <rect x="0" y="-4" width="38" height="8" class="c-white s-dark" stroke-width="2" />
          <circle cx="0" cy="0" r="6" class="c-accent s-dark" stroke-width="1.8" />
        </g>
      </g>
  
      <!-- Active Condition Check Box -->
      <rect x="-112" y="-24" width="224" height="48" class="c-white s-dark" stroke-width="2.5" />
      <rect x="-112" y="-24" width="76" height="48" class="c-accent" />
      <text x="-74" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">else if</text>
      <text x="20" y="5" text-anchor="middle" class="c-dark mono" font-size="14" font-weight="700">x >= 75</text>
      <!-- True Status Badge -->
      <circle cx="92" cy="0" r="11" class="c-accent lamp-blink" />
      <path d="M 87 0 L 91 4 L 98 -4" class="s-white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  
    <!-- TIER 3: else — FALLBACK RESERVE GATE (skipped) -->
    <g transform="translate(442, 220)">
      <!-- Horizontal Track (Dimmed / Unreached) -->
      <line x1="-156" y1="0" x2="184" y2="0" class="s-white" stroke-width="8" stroke-opacity="0.35" />
  
      <!-- Condition Check Box -->
      <rect x="-112" y="-22" width="224" height="44" class="c-dark s-white" stroke-width="2.2" />
      <rect x="-112" y="-22" width="68" height="44" class="c-white" />
      <text x="-78" y="5" text-anchor="middle" class="c-dark mono" font-size="14" font-weight="700">else</text>
      <text x="22" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">иначе</text>
      <circle cx="92" cy="0" r="8" class="s-white" stroke-width="2" />
    </g>
  
    <!-- RIGHT ZONE: Three Outcome Monoliths -->
    <!-- Top Outcome: A (Inactive) -->
    <g transform="translate(744, 60)">
      <rect x="-108" y="-24" width="216" height="48" class="c-dark s-white" stroke-width="2" />
      <rect x="-108" y="-24" width="44" height="48" class="c-white" />
      <text x="-86" y="6" text-anchor="middle" class="c-dark mono" font-size="18" font-weight="700">5</text>
      <rect x="-48" y="-5" width="110" height="10" rx="5" class="c-white" fill-opacity="0.45" />
    </g>
  
    <!-- Middle Outcome: B (ACTIVE SELECTED BRANCH!) -->
    <g transform="translate(744, 140)">
      <g class="winner-pulse">
        <rect x="-108" y="-28" width="216" height="56" class="c-white s-dark" stroke-width="2.6" />
        <rect x="-108" y="-28" width="52" height="56" class="c-accent" />
        <text x="-82" y="7" text-anchor="middle" class="c-white mono" font-size="20" font-weight="700">4</text>
        <text x="16" y="5" text-anchor="middle" class="c-dark mono" font-size="14" font-weight="700">«Хорошо»</text>
        <circle cx="88" cy="0" r="7" class="c-accent lamp-blink" />
      </g>
    </g>
  
    <!-- Bottom Outcome: C (Inactive) -->
    <g transform="translate(744, 220)">
      <rect x="-108" y="-24" width="216" height="48" class="c-dark s-white" stroke-width="2" />
      <rect x="-108" y="-24" width="44" height="48" class="c-white" />
      <text x="-86" y="6" text-anchor="middle" class="c-dark mono" font-size="18" font-weight="700">3</text>
      <rect x="-48" y="-5" width="90" height="10" rx="5" class="c-white" fill-opacity="0.45" />
    </g>
  </svg>
---

# Цепочки проверок else if и вложенные условия

Как выбрать один вариант из множества сценариев и не запутаться в «лесенке» условий друг внутри друга?

Когда двух веток «да» и «нет» недостаточно, используют цепочку `else if` (иначе если) для последовательного перебора вариантов или вложенные условия `if` внутри другого `if` для уточнения деталей.

## Два подхода к сложным проверкам

* **Цепочка `if — else if — else`:** проверяет условия строго сверху вниз. Как только сработает первое истинное условие, программа выполнит его блок и пропустит все остальные проверки в цепочке.
* **Вложенные условия (`if` внутри `if`):** позволяют сделать дополнительную проверку только после того, как пройдена главная (например, сначала проверить, заперта ли дверь, и только потом искать ключ).

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        int score = 82;

        // 1. Цепочка else if — выбор одной оценки из нескольких диапазонов
        if (score >= 90)
        {
            Console.WriteLine("Оценка: Отлично (5)");
        }
        else if (score >= 75)
        {
            Console.WriteLine("Оценка: Хорошо (4)");
        }
        else if (score >= 50)
        {
            Console.WriteLine("Оценка: Удовлетворительно (3)");
        }
        else
        {
            Console.WriteLine("Оценка: Не сдано (2)");
        }

        // 2. Вложенное условие — уточняющая проверка внутри основной
        bool isDoorLocked = true;
        bool hasKey = true;

        if (isDoorLocked)
        {
            if (hasKey)
            {
                Console.WriteLine("Дверь открыта ключом.");
            }
            else
            {
                Console.WriteLine("Нужен ключ, чтобы открыть дверь.");
            }
        }
    }
}

```

## Важные нюансы

* **Порядок в цепочке решает всё:** условия проверяются сверху вниз до первого совпадения. Если при `score = 95` поставить проверку `score >= 50` выше `score >= 90`, программа остановится на тройке и до пятёрки не дойдёт.
* **Защита от глубокой «лесенки»:** старайтесь не делать больше 2–3 уровней вложенности `if` друг в друга — такой код тяжело читать. Простые вложенные проверки лучше объединять через логическое И (`if (isDoorLocked && hasKey)`).
* **Независимые `if` вместо `else if`:** если написать несколько отдельных `if` подряд без слова `else`, программа проверит *каждое* из них, и при совпадении сработают сразу несколько блоков.
