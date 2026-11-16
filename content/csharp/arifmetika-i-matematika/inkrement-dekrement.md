---
title: Инкремент и декремент
keywords: инкремент, декремент, префиксный, постфиксный, увеличение на единицу, уменьшение переменной, счётчик цикла, порядок вычисления, шаг, оператор
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
  
      .hand-press-l {
        transform-box: fill-box;
        transform-origin: left bottom;
        animation: pressLeft 4s ease-in-out infinite;
      }
      .hand-press-r {
        transform-box: fill-box;
        transform-origin: right bottom;
        animation: pressRight 4s ease-in-out infinite;
      }
      .plunger-l {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: plungeL 4s ease-in-out infinite;
      }
      .plunger-r {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: plungeR 4s ease-in-out infinite;
      }
      .ticket-l {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: popTicketL 4s ease-in-out infinite;
      }
      .ticket-r {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: popTicketR 4s ease-in-out infinite;
      }
      .burst-l {
        transform-box: fill-box;
        transform-origin: bottom right;
        animation: flashL 4s ease-in-out infinite;
      }
      .burst-r {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: flashR 4s ease-in-out infinite;
      }
      .chip-dec-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatChip1 3.6s ease-in-out infinite;
      }
      .chip-dec-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatChip2 3.8s ease-in-out infinite;
      }
  
      @keyframes pressLeft {
        0%, 10%, 60%, 100% { transform: translateY(0px) rotate(0deg); }
        26%, 44% { transform: translateY(10px) rotate(3deg); }
      }
      @keyframes plungeL {
        0%, 10%, 60%, 100% { transform: translateY(0px); }
        26%, 44% { transform: translateY(10px); }
      }
      @keyframes ticketL {
        0%, 14%, 58%, 100% { transform: translateY(0px); }
        30%, 46% { transform: translateY(-10px); }
      }
      @keyframes popTicketL {
        0%, 14%, 58%, 100% { transform: translateY(0px); }
        30%, 46% { transform: translateY(-10px); }
      }
      @keyframes flashL {
        0%, 18%, 54%, 100% { transform: scale(0.75); opacity: 0.15; }
        30%, 44% { transform: scale(1.12); opacity: 1; }
      }
  
      @keyframes pressRight {
        0%, 48%, 96%, 100% { transform: translateY(0px) rotate(0deg); }
        64%, 82% { transform: translateY(10px) rotate(-3deg); }
      }
      @keyframes plungeR {
        0%, 48%, 96%, 100% { transform: translateY(0px); }
        64%, 82% { transform: translateY(10px); }
      }
      @keyframes popTicketR {
        0%, 52%, 94%, 100% { transform: translateY(0px); }
        68%, 84% { transform: translateY(-10px); }
      }
      @keyframes flashR {
        0%, 56%, 90%, 100% { transform: scale(0.75); opacity: 0.15; }
        68%, 82% { transform: scale(1.12); opacity: 1; }
      }
  
      @keyframes floatChip1 {
        0%, 100% { transform: translateY(0px) rotate(-6deg); }
        50% { transform: translateY(-6px) rotate(-2deg); }
      }
      @keyframes floatChip2 {
        0%, 100% { transform: translateY(0px) rotate(6deg); }
        50% { transform: translateY(6px) rotate(2deg); }
      }
  
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transform: none !important;
          opacity: 1 !important;
        }
      }
    </style>
  
    <!-- Floating Decrement Counterparts (--i & i--) -->
    <g transform="translate(106, 62)">
      <g class="chip-dec-1">
        <rect x="-34" y="-19" width="68" height="38" rx="14" class="c-dark s-white" stroke-width="2" />
        <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="16" font-weight="700">--i</text>
      </g>
    </g>
  
    <g transform="translate(794, 62)">
      <g class="chip-dec-2">
        <rect x="-34" y="-19" width="68" height="38" rx="14" class="c-dark s-white" stroke-width="2" />
        <text x="0" y="6" text-anchor="middle" class="c-white mono" font-size="16" font-weight="700">i--</text>
      </g>
    </g>
  
    <!-- Top Center Initial State Badge: int i = 5 -->
    <g transform="translate(450, 40)">
      <rect x="-64" y="-17" width="128" height="34" rx="17" class="c-dark s-white" stroke-width="1.8" />
      <circle cx="-46" cy="0" r="4.5" class="c-accent" />
      <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">int i = 5</text>
    </g>
  
    <!-- CENTRAL TWIN MECHANICAL CLICKER: ++i (Prefix) vs i++ (Postfix) -->
    <!-- Left Plunger Button (++i) -->
    <g transform="translate(352, 86)">
      <g class="plunger-l">
        <rect x="-12" y="10" width="24" height="18" class="c-dark s-white" stroke-width="1.8" />
        <rect x="-36" y="-12" width="72" height="24" rx="12" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-30" y="-7" width="60" height="14" rx="7" class="c-accent" />
        <text x="0" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">++i</text>
      </g>
    </g>
  
    <!-- Right Plunger Button (i++) -->
    <g transform="translate(548, 86)">
      <g class="plunger-r">
        <rect x="-12" y="10" width="24" height="18" class="c-dark s-white" stroke-width="1.8" />
        <rect x="-36" y="-12" width="72" height="24" rx="12" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-30" y="-7" width="60" height="14" rx="7" class="c-dark" />
        <text x="0" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">i++</text>
      </g>
    </g>
  
    <!-- Main Twin Clicker Chassis -->
    <g transform="translate(450, 176)">
      <!-- Heavy Mechanical Base Feet -->
      <path d="M -166 68 L -176 84 H -136 L -144 68 Z" class="c-dark s-white" stroke-width="1.8" stroke-linejoin="round" />
      <path d="M 144 68 L 136 84 H 176 L 166 68 Z" class="c-dark s-white" stroke-width="1.8" stroke-linejoin="round" />
  
      <!-- White Rounded Twin Housing -->
      <rect x="-194" y="-68" width="388" height="136" rx="22" class="c-white s-dark" stroke-width="2.6" />
  
      <!-- Center Divider Wall -->
      <line x1="0" y1="-67" x2="0" y2="67" class="s-dark" stroke-width="2.6" />
  
      <!-- LEFT CHAMBER: PREFIX (++i) -> +1 FIRST, RETURNS NEW 6 -->
      <g transform="translate(-97, 0)">
        <rect x="-80" y="-52" width="160" height="104" rx="14" class="c-dark" />
  
        <!-- Step 1 Badge: +1 first -->
        <rect x="-68" y="-42" width="136" height="22" rx="7" class="c-accent" />
        <text x="0" y="-27" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">1) +1  →  2) отдать</text>
  
        <!-- Returned Value Ticket (6) -->
        <g transform="translate(0, 16)">
          <g class="ticket-l">
            <rect x="-68" y="-22" width="136" height="44" rx="10" class="c-white" />
            <text x="-28" y="8" text-anchor="middle" class="c-dark mono" font-size="24" font-weight="700">6</text>
            <rect x="6" y="-12" width="52" height="24" rx="6" class="c-accent" />
            <text x="32" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">новое</text>
          </g>
        </g>
      </g>
  
      <!-- RIGHT CHAMBER: POSTFIX (i++) -> RETURNS OLD 5 FIRST, THEN +1 -->
      <g transform="translate(97, 0)">
        <rect x="-80" y="-52" width="160" height="104" rx="14" class="c-dark" />
  
        <!-- Step 1 Badge: return old first -->
        <rect x="-68" y="-42" width="136" height="22" rx="7" class="c-white" />
        <text x="0" y="-27" text-anchor="middle" class="c-dark mono" font-size="11" font-weight="700">1) отдать  →  2) +1</text>
  
        <!-- Returned Value Ticket (5) + Trailing +1 -->
        <g transform="translate(0, 16)">
          <g class="ticket-r">
            <rect x="-68" y="-22" width="136" height="44" rx="10" class="c-white" />
            <text x="-28" y="8" text-anchor="middle" class="c-dark mono" font-size="24" font-weight="700">5</text>
            <rect x="6" y="-12" width="52" height="24" rx="6" class="c-dark" />
            <text x="32" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">старое</text>
          </g>
        </g>
      </g>
    </g>
  
    <!-- Kinetic Burst Rays on Prefix & Postfix Clicks -->
    <g transform="translate(292, 68)">
      <g class="burst-l">
        <line x1="0" y1="0" x2="-16" y2="-16" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="-8" y1="10" x2="-24" y2="6" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="-18" cy="-6" r="2.8" class="c-white" />
      </g>
    </g>
    <g transform="translate(608, 68)">
      <g class="burst-r">
        <line x1="0" y1="0" x2="16" y2="-16" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="8" y1="10" x2="24" y2="6" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="18" cy="-6" r="2.8" class="c-white" />
      </g>
    </g>
  
    <!-- LEFT FOREGROUND: Big Editorial Hand Pressing ++i Plunger -->
    <g transform="translate(310, 74)">
      <g class="hand-press-l">
        <!-- Diagonal Sleeve from Left -->
        <path d="M -276 116 L -46 -4 L -28 30 L -246 146 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M -56 2 L -30 -12 L -12 22 L -38 36 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
        <circle cx="-32" cy="19" r="2.8" class="c-dark" />
  
        <!-- Cartoon Round Hand -->
        <circle cx="0" cy="-6" r="24" class="c-white s-dark" stroke-width="2.5" />
        <path d="M -13 -13 L -5 -10" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <path d="M -15 -4 L -7 -2" class="s-dark" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
  
    <!-- RIGHT FOREGROUND: Big Editorial Hand Pressing i++ Plunger -->
    <g transform="translate(590, 74)">
      <g class="hand-press-r">
        <!-- Diagonal Sleeve from Right -->
        <path d="M 276 116 L 46 -4 L 28 30 L 246 146 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
        <!-- White Cuff -->
        <path d="M 56 2 L 30 -12 L 12 22 L 38 36 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
        <circle cx="32" cy="19" r="2.8" class="c-dark" />
  
        <!-- Cartoon Round Hand -->
        <circle cx="0" cy="-6" r="24" class="c-white s-dark" stroke-width="2.5" />
        <path d="M 5 -10 L 13 -13" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <path d="M 7 -2 L 15 -4" class="s-dark" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
  </svg>
---

# Инкремент и декремент

Как увеличить или уменьшить число ровно на единицу и в чём разница между префиксной и постфиксной записью?

Инкремент (`++`) увеличивает значение числовой переменной на `1`, а декремент (`--`) — уменьшает на `1`. Эти операторы постоянно применяются в счётчиках циклов, таймерах и подсчёте шагов.

## Четыре формы записи

| Запись | Название | Порядок действий |
| --- | --- | --- |
| `++i` | Префиксный инкремент | Сначала увеличивает `i` на `1`, затем отдаёт новое значение |
| `i++` | Постфиксный инкремент | Сначала отдаёт старое значение `i`, затем увеличивает на `1` |
| `--i` | Префиксный декремент | Сначала уменьшает `i` на `1`, затем отдаёт новое значение |
| `i--` | Постфиксный декремент | Сначала отдаёт старое значение `i`, затем уменьшает на `1` |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. Инкремент: префиксный (++i) и постфиксный (i++)
        int a = 5;
        int b = ++a; // Сначала a станет 6, затем 6 запишется в b (a = 6, b = 6)

        int c = 5;
        int d = c++; // Сначала 5 запишется в d, затем c станет 6 (c = 6, d = 5)
        Console.WriteLine($"++a: a={a}, b={b} | c++: c={c}, d={d}");

        // 2. Декремент: префиксный (--i) и постфиксный (i--)
        int x = 10;
        int y = --x; // Сначала x станет 9, затем 9 запишется в y (x = 9, y = 9)

        int m = 10;
        int n = m--; // Сначала 10 запишется в n, затем m станет 9 (m = 9, n = 10)
        Console.WriteLine($"--x: x={x}, y={y} | m--: m={m}, n={n}");

        // 3. Отдельной строкой оба варианта работают одинаково
        int step = 0;
        step++; // Станет 1
        ++step; // Станет 2
        Console.WriteLine($"Итоговый шаг: {step}");
    }
}

```

## Важные нюансы

* **Отдельной командой разницы нет:** если `i++;` или `++i;` (и аналогично `--i;` или `i--;`) записаны самостоятельной строкой без присваивания или передачи в метод, результат идентичен — переменная просто изменится на `1`.
* **Только для переменных:** операторы `++` и `--` нельзя применить напрямую к готовому числу (`5++` вызовет ошибку компиляции) или константе `const`, так как им некуда сохранить новое значение.
* **Избегайте сложных выражений:** не смешивайте несколько инкрементов и декрементов над одной переменной в одной строке (например, `i++ + --i`) — это ухудшает читаемость и приводит к неочевидным ошибкам.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что выведет `int x = 5; Console.WriteLine(x++);`?",
  "options": [
    {
      "text": "`5`",
      "correct": true,
      "explanation": "Постфиксный инкремент возвращает старое значение."
    },
    {
      "text": "`6`",
      "correct": false,
      "explanation": "Это значение после увеличения."
    },
    {
      "text": "`7`",
      "correct": false,
      "explanation": "Увеличение только на единицу."
    }
  ],
  "explanation": "`x++` сначала отдаёт значение, потом увеличивает."
}
```

```quiz
{
  "type": "radio",
  "question": "Что выведет `int x = 5; Console.WriteLine(++x);`?",
  "options": [
    {
      "text": "`6`",
      "correct": true
    },
    {
      "text": "`5`",
      "correct": false,
      "explanation": "Префиксный инкремент увеличивает до вывода."
    },
    {
      "text": "`7`",
      "correct": false,
      "explanation": "Увеличение только на единицу."
    }
  ],
  "explanation": "`++x` сначала увеличивает, затем отдаёт новое значение."
}
```
