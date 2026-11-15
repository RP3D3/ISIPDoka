---
title: Первая программа
keywords: первая программа на C#, структура программы, точка входа Main, using System, пространства имён, class Program, static void Main, Console.WriteLine, dotnet run, top-level statements, Hello World
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

      .btn-press {
        transform-box: fill-box;
        transform-origin: center bottom;
        animation: pressBtn 3.6s ease-in-out infinite;
      }
      .tape-eject {
        transform-box: fill-box;
        transform-origin: center top;
        animation: ejectTape 3.6s ease-in-out infinite;
      }
      .eye-look {
        transform-box: fill-box;
        transform-origin: center;
        animation: lookRight 5.4s ease-in-out infinite;
      }
      .signal-flow {
        stroke-dasharray: 7 7;
        animation: flowDash 1.4s linear infinite;
      }
      .cloud-drift-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: driftCloud1 8s ease-in-out infinite;
      }
      .cloud-drift-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: driftCloud2 9s ease-in-out infinite;
      }
      .star-float {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatStar 5s ease-in-out infinite;
      }
      .spark-pulse {
        transform-box: fill-box;
        transform-origin: center;
        animation: pulseSpark 3.6s ease-in-out infinite;
      }

      @keyframes pressBtn {
        0%, 22%, 58%, 100% { transform: translateY(0px); }
        34%, 44% { transform: translateY(3px); }
      }
      @keyframes ejectTape {
        0%, 30%, 100% { transform: translateY(0px); }
        55% { transform: translateY(4px); }
        70% { transform: translateY(2px); }
      }
      @keyframes lookRight {
        0%, 40%, 100% { transform: translateX(0px); }
        55%, 75% { transform: translateX(3px); }
      }
      @keyframes flowDash {
        from { stroke-dashoffset: 0; }
        to { stroke-dashoffset: -14; }
      }
      @keyframes driftCloud1 {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(7px); }
      }
      @keyframes driftCloud2 {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(-7px); }
      }
      @keyframes floatStar {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      @keyframes pulseSpark {
        0%, 20%, 60%, 100% { opacity: 0.25; }
        34%, 46% { opacity: 1; }
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
    <g transform="translate(168, 46)">
      <g class="cloud-drift-1">
        <path d="M -26 9 H 26 C 32 9 36 4 36 -1 C 36 -6 32 -10 27 -10 C 25 -17 18 -21 11 -19 C 7 -25 -3 -25 -8 -19 C -15 -20 -21 -15 -21 -8 C -27 -8 -31 -3 -31 2 C -31 6 -29 9 -26 9 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
    <g transform="translate(706, 40)">
      <g class="cloud-drift-2">
        <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>

    <!-- LEFT SECTION: Wall Socket (using System) -->
    <g transform="translate(120, 140)">
      <!-- Wall Plate -->
      <rect x="-40" y="-30" width="80" height="60" rx="12" class="c-white s-dark" stroke-width="2.5" />
      <!-- Two Socket Slots -->
      <rect x="-20" y="-12" width="10" height="24" rx="5" class="c-dark" />
      <rect x="8" y="-12" width="10" height="24" rx="5" class="c-dark" />
      <!-- Plug Body Inserted From The Right -->
      <rect x="36" y="-11" width="30" height="22" rx="6" class="c-white s-dark" stroke-width="2" />
      <rect x="39" y="-8" width="6" height="16" rx="2" class="c-accent" />
      <!-- Strain Relief Ring -->
      <line x1="60" y1="-8" x2="60" y2="8" class="s-dark" stroke-width="2" stroke-linecap="round" />
      <!-- Connection Spark -->
      <g class="spark-pulse" transform="translate(50, -26)">
        <line x1="0" y1="-8" x2="0" y2="-16" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="-7" y1="-4" x2="-12" y2="-9" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="7" y1="-4" x2="12" y2="-9" class="s-white" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>

    <!-- Animated Power Cable To The Machine -->
    <path d="M 186 140 C 232 140 252 176 324 176" class="s-dark" stroke-width="5" fill="none" stroke-linecap="round" />
    <path d="M 186 140 C 232 140 252 176 324 176" class="s-white signal-flow" stroke-width="2.5" fill="none" stroke-linecap="round" />

    <!-- CENTER SECTION: Program Machine -->
    <g transform="translate(462, 150)">
      <!-- Grotesque Doka Eyes On Top -->
      <g transform="translate(-42, -88)">
        <ellipse cx="-14" cy="0" rx="12" ry="15" class="c-white s-dark" stroke-width="2.2" />
        <ellipse cx="12" cy="0" rx="12" ry="15" class="c-white s-dark" stroke-width="2.2" />
        <g class="eye-look">
          <circle cx="-11" cy="1" r="4" class="c-dark" />
          <circle cx="15" cy="1" r="4" class="c-dark" />
        </g>
      </g>

      <!-- Mechanical Feet -->
      <path d="M -112 70 L -120 86 H -90 L -96 70 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
      <path d="M 96 70 L 90 86 H 120 L 112 70 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />

      <!-- Main White Housing -->
      <rect x="-138" y="-72" width="276" height="144" rx="16" class="c-white s-dark" stroke-width="2.5" />

      <!-- Dark Header Bar -->
      <path d="M -122 -72 H 122 Q 138 -72 138 -56 V -40 H -138 V -56 Q -138 -72 -122 -72 Z" class="c-dark s-white" stroke-width="1.75" />
      <line x1="-137" y1="-40" x2="137" y2="-40" class="s-dark" stroke-width="2.5" />

      <!-- Header Dots -->
      <circle cx="-116" cy="-55" r="4" class="c-accent" />
      <circle cx="-102" cy="-55" r="4" class="c-white" />
      <circle cx="-88" cy="-55" r="4" class="c-white" />

      <!-- Header Type Label: Program -->
      <rect x="58" y="-64" width="64" height="20" rx="10" class="c-accent" />
      <text x="90" y="-50" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">Program</text>

      <!-- Start Button (Main) -->
      <g class="btn-press">
        <circle cx="-72" cy="10" r="26" class="c-accent s-dark" stroke-width="2.4" />
        <circle cx="-72" cy="10" r="17" class="s-white" stroke-width="1.5" stroke-dasharray="3 4" />
        <text x="-72" y="14" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">Main()</text>
      </g>
      <circle cx="-72" cy="10" r="34" class="s-white" stroke-width="2" opacity="0.35" />

      <!-- Vent Slots -->
      <line x1="-118" y1="56" x2="-60" y2="56" class="s-dark" stroke-width="2" stroke-linecap="round" />
      <line x1="-118" y1="62" x2="-80" y2="62" class="s-dark" stroke-width="2" stroke-linecap="round" />

      <!-- Paper Tape Slot -->
      <rect x="8" y="38" width="118" height="10" rx="3" class="c-dark" />

      <!-- Printed Tape With Greeting -->
      <g class="tape-eject">
        <rect x="12" y="44" width="112" height="44" rx="4" class="c-white s-dark" stroke-width="2" />
        <text x="68" y="72" text-anchor="middle" class="c-dark mono" font-size="13" font-weight="700">Привет, мир!</text>
      </g>
    </g>

    <!-- RIGHT SECTION: Kinetic Burst Rays -->
    <g transform="translate(652, 104)">
      <g class="star-float">
        <line x1="4" y1="-4" x2="22" y2="-20" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="10" y1="8" x2="32" y2="6" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <circle cx="26" cy="-8" r="3" class="c-white" />
        <circle cx="12" cy="-26" r="2.5" class="c-white" />
      </g>
    </g>
  </svg>
---

# Первая программа на C#: using, Program и точка входа Main

Из каких частей состоит простейшая программа и с какого места начинается её выполнение?

Программа на C# — это текст, который компилятор превращает в сборку (*assembly*), а среда выполнения **.NET** запускает с определённого метода — **точки входа** (*entry point*). Пока программа маленькая, весь её код помещается в один файл: подключение инструментов через `using`, класс-контейнер `Program` и метод `Main`, внутри которого записаны команды.

## Из чего состоит файл

| Часть | Пример | Зачем нужна |
| --- | --- | --- |
| **Директива `using`** | `using System;` | Подключает пространство имён, чтобы писать `Console`, а не `System.Console` |
| **Класс** | `class Program { ... }` | Контейнер для кода: в C# методы не живут вне типов |
| **Точка входа** | `static void Main()` | Метод, который среда выполнения вызывает первым |
| **Инструкции** | `Console.WriteLine("Привет!");` | Команды, выполняемые сверху вниз; каждая заканчивается `;` |

## Пример кода

```csharp
using System;          // подключаем пространство имён с классом Console

class Program
{
    static void Main() // точка входа программы
    {
        Console.WriteLine("Привет, мир!");
    }
}
```

Результат работы в консоли:

```text
Привет, мир!
```

## Как выполняется программа

Среда выполнения находит `Main`, создаёт для него кадр стека и выполняет инструкции по одной сверху вниз. Фигурные скобки задают границы блоков, а `;` отделяет одну команду от другой — поэтому пропущенная точка с запятой ломает весь файл, а не одну строку.

В C# 9 и новее можно писать короче — **top-level statements**: код без класса и `Main` компилятор сам заворачивает в точку входа.

```csharp
Console.WriteLine("Привет, мир!");
```

Для экспериментов это удобно, но в справочнике используется полная форма: она явно показывает, где именно начинается выполнение.

## Частые ошибки новичка

* **Забыта `;`** — компилятор жалуется на следующую строку, хотя проблема в предыдущей.
* **Нет `using System;`** — ошибка «имя `Console` не существует в текущем контексте».
* **Код вне метода** — инструкция внутри класса, но вне `Main`, не выполнится: ей негде находиться.
* **Неверный регистр в имени** — `main` вместо `Main`: C# различает заглавные и строчные буквы.

Дальше разберём, как хранить данные в переменных, а вывод в консоль подробно — в группе 20 *Консоль*.
