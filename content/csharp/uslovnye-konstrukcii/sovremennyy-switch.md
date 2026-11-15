---
title: Современный switch
keywords: современный switch, сопоставление с образцом, выбор значения, диапазон чисел, ветвление, условие, шаблон, стрелка, компактный код
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
  
      .rail-flow {
        stroke-dasharray: 8 6;
        animation: flowRail 1.1s linear infinite;
      }
      .chevron-push {
        transform-box: fill-box;
        transform-origin: center;
        animation: pushChevron 2.4s ease-in-out infinite;
      }
      .building-shine {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: liftBuilding 4.2s ease-in-out infinite;
      }
      .glint-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: twinkle1 2.8s ease-in-out infinite;
      }
      .glint-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: twinkle2 3.2s ease-in-out infinite;
      }
      .glint-3 {
        transform-box: fill-box;
        transform-origin: center;
        animation: twinkle3 2.6s ease-in-out infinite;
      }
      .row-highlight {
        transform-box: fill-box;
        transform-origin: center;
        animation: pulseRow 3.4s ease-in-out infinite;
      }
      .spider-bob {
        transform-box: fill-box;
        transform-origin: top center;
        animation: bobSpider 3.8s ease-in-out infinite;
      }
  
      @keyframes flowRail {
        0% { stroke-dashoffset: 28; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes pushChevron {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(6px); }
      }
      @keyframes liftBuilding {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3px); }
      }
      @keyframes twinkle1 {
        0%, 100% { transform: scale(0.55) rotate(0deg); opacity: 0.3; }
        50% { transform: scale(1.2) rotate(45deg); opacity: 1; }
      }
      @keyframes twinkle2 {
        0%, 100% { transform: scale(1.15) rotate(45deg); opacity: 1; }
        50% { transform: scale(0.5) rotate(0deg); opacity: 0.25; }
      }
      @keyframes twinkle3 {
        0%, 25%, 100% { transform: scale(0.6) rotate(0deg); opacity: 0.25; }
        65% { transform: scale(1.25) rotate(45deg); opacity: 1; }
      }
      @keyframes pulseRow {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      @keyframes bobSpider {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(6px); }
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
  
    <!-- LEFT ZONE: Legacy Classic Switch Building Covered in Cobwebs -->
    <g transform="translate(202, 248)">
      <!-- Old Stepped Roof -->
      <rect x="-126" y="-202" width="252" height="16" class="c-dark s-white" stroke-width="2" />
      <rect x="-74" y="-218" width="148" height="16" class="c-dark s-white" stroke-width="2" />
      <text x="0" y="-206" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700" opacity="0.75">СТАРЫЙ SWITCH</text>
  
      <!-- Old Dark Main Building Body -->
      <rect x="-118" y="-186" width="236" height="186" class="c-dark s-white" stroke-width="2.2" />
  
      <!-- Legacy Verbose Rows (case + break) -->
      <g opacity="0.68">
        <!-- Row 1 -->
        <rect x="-102" y="-170" width="204" height="32" rx="4" class="s-white" stroke-width="1.5" />
        <text x="-48" y="-150" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">case 200:</text>
        <text x="48" y="-150" text-anchor="middle" class="c-white mono" font-size="11">break;</text>
  
        <!-- Row 2 -->
        <rect x="-102" y="-130" width="204" height="32" rx="4" class="s-white" stroke-width="1.5" />
        <text x="-48" y="-110" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">case 403:</text>
        <text x="48" y="-110" text-anchor="middle" class="c-white mono" font-size="11">break;</text>
  
        <!-- Row 3 -->
        <rect x="-102" y="-90" width="204" height="32" rx="4" class="s-white" stroke-width="1.5" />
        <text x="-48" y="-70" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">case 404:</text>
        <text x="48" y="-70" text-anchor="middle" class="c-white mono" font-size="11">break;</text>
  
        <!-- Default Base -->
        <rect x="-102" y="-46" width="204" height="32" rx="4" class="s-white" stroke-width="1.5" />
        <text x="0" y="-26" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">default: break;</text>
      </g>
  
      <!-- COBWEBS OVER THE LEGACY BUILDING -->
      <!-- Top-Left Corner Radial Cobweb -->
      <g stroke-linecap="round">
        <line x1="-118" y1="-186" x2="-38" y2="-186" class="s-white" stroke-width="1.5" />
        <line x1="-118" y1="-186" x2="-46" y2="-134" class="s-white" stroke-width="1.5" />
        <line x1="-118" y1="-186" x2="-74" y2="-106" class="s-white" stroke-width="1.5" />
        <line x1="-118" y1="-186" x2="-118" y2="-98" class="s-white" stroke-width="1.5" />
        <!-- Concentric Web Arcs -->
        <path d="M -94 -186 Q -94 -172 -102 -166 Q -110 -160 -118 -160" class="s-white" stroke-width="1.3" />
        <path d="M -70 -186 Q -72 -162 -86 -148 Q -100 -136 -118 -134" class="s-white" stroke-width="1.3" />
        <path d="M -46 -186 Q -52 -152 -74 -128 Q -94 -110 -118 -108" class="s-white" stroke-width="1.3" />
      </g>
  
      <!-- Bottom-Right Corner Radial Cobweb -->
      <g stroke-linecap="round">
        <line x1="118" y1="0" x2="48" y2="0" class="s-white" stroke-width="1.5" />
        <line x1="118" y1="0" x2="58" y2="-48" class="s-white" stroke-width="1.5" />
        <line x1="118" y1="0" x2="84" y2="-74" class="s-white" stroke-width="1.5" />
        <line x1="118" y1="0" x2="118" y2="-82" class="s-white" stroke-width="1.5" />
        <!-- Concentric Web Arcs -->
        <path d="M 94 0 Q 94 -14 102 -20 Q 110 -26 118 -26" class="s-white" stroke-width="1.3" />
        <path d="M 70 0 Q 72 -24 86 -38 Q 100 -50 118 -52" class="s-white" stroke-width="1.3" />
        <path d="M 52 0 Q 56 -32 76 -54 Q 94 -70 118 -72" class="s-white" stroke-width="1.3" />
      </g>
  
      <!-- Hanging Thread + Tiny Geometric Bauhaus Spider -->
      <g transform="translate(86, -186)">
        <g class="spider-bob">
          <line x1="0" y1="0" x2="0" y2="34" class="s-white" stroke-width="1.4" />
          <circle cx="0" cy="38" r="5" class="c-white s-dark" stroke-width="1.5" />
          <path d="M -7 35 L -3 37 M 7 35 L 3 37 M -7 41 L -3 39 M 7 41 L 3 39" class="s-white" stroke-width="1.4" stroke-linecap="round" />
        </g>
      </g>
    </g>
  
    <!-- CENTER ZONE: Modern Upgrade Bridge (=> Switch Expression) -->
    <g transform="translate(402, 146)">
      <!-- Horizontal Rails -->
      <line x1="-62" y1="0" x2="62" y2="0" class="s-white" stroke-width="10" />
      <line x1="-62" y1="0" x2="62" y2="0" class="s-dark rail-flow" stroke-width="4" />
  
      <!-- Animated Directional Chevrons -->
      <g class="chevron-push">
        <polygon points="-14,-20 8,0 -14,20 -24,20 -2,0 -24,-20" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <polygon points="8,-20 30,0 8,20 -2,20 20,0 -2,-20" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
      </g>
  
      <!-- Top Pill Badge: => -->
      <g transform="translate(0, -44)">
        <rect x="-46" y="-16" width="92" height="32" rx="16" class="c-dark s-white" stroke-width="2" />
        <circle cx="-28" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">=> C# 8+</text>
      </g>
    </g>
  
    <!-- RIGHT ZONE: Gleaming, Sparkling Modern Switch Expression Building -->
    <g transform="translate(658, 248)">
      <g class="building-shine">
        <!-- Sleek Architectural Spire & Crown -->
        <line x1="0" y1="-234" x2="0" y2="-218" class="s-white" stroke-width="3" stroke-linecap="round" />
        <circle cx="0" cy="-236" r="4" class="c-white" />
  
        <rect x="-104" y="-218" width="208" height="20" rx="10" class="c-dark s-white" stroke-width="2.2" />
        <circle cx="-84" cy="-208" r="4.5" class="c-accent" />
        <text x="6" y="-204" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">code switch { ... }</text>
  
        <!-- Main Brilliant White Facade with Diagonal Glass Reflection Strips -->
        <rect x="-156" y="-194" width="312" height="194" rx="12" class="c-white s-dark" stroke-width="2.8" />
  
        <!-- Subtle Bauhaus Glass Sheen Diagonals on White Frame -->
        <line x1="-148" y1="-156" x2="-112" y2="-192" class="s-accent" stroke-width="2.5" stroke-linecap="round" />
        <line x1="112" y1="-2" x2="148" y2="-38" class="s-accent" stroke-width="2.5" stroke-linecap="round" />
  
        <!-- ROW 1 (HIGHLIGHTED ACTIVE ARM): 200 => "Успешно" -->
        <g transform="translate(0, -166)">
          <g class="row-highlight">
            <rect x="-140" y="-18" width="280" height="36" rx="8" class="c-accent" />
            <rect x="-132" y="-11" width="52" height="22" rx="6" class="c-white" />
            <text x="-106" y="4" text-anchor="middle" class="c-accent mono" font-size="12" font-weight="700">200</text>
            <text x="-62" y="4" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">=></text>
            <text x="42" y="4" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">"Успешно",</text>
          </g>
        </g>
  
        <!-- ROW 2: 403 => "Доступ запрещён" -->
        <g transform="translate(0, -120)">
          <rect x="-140" y="-18" width="280" height="36" rx="8" class="c-dark" />
          <rect x="-132" y="-11" width="52" height="22" rx="6" class="c-white" />
          <text x="-106" y="4" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">403</text>
          <text x="-62" y="4" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">=></text>
          <text x="42" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">"Доступ запрещён",</text>
        </g>
  
        <!-- ROW 3: 404 => "Страница не найдена" -->
        <g transform="translate(0, -74)">
          <rect x="-140" y="-18" width="280" height="36" rx="8" class="c-dark" />
          <rect x="-132" y="-11" width="52" height="22" rx="6" class="c-white" />
          <text x="-106" y="4" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">404</text>
          <text x="-62" y="4" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">=></text>
          <text x="42" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">"Не найдена",</text>
        </g>
  
        <!-- ROW 4 (DISCARD PATTERN FOUNDATION): _ => "Неизвестная ошибка" -->
        <g transform="translate(0, -28)">
          <rect x="-140" y="-18" width="280" height="36" rx="8" class="c-dark" />
          <rect x="-132" y="-11" width="52" height="22" rx="6" class="c-accent" />
          <text x="-106" y="3" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">_</text>
          <text x="-62" y="4" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">=></text>
          <text x="42" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">"Неизв. ошибка"</text>
        </g>
      </g>
    </g>
  
    <!-- SPARKLING SHINE STARS & RAYS AROUND THE MODERN BUILDING ("Блестит и сияет") -->
    <!-- Top-Left 4-Point Sparkle -->
    <g transform="translate(492, 46)">
      <g class="glint-1">
        <polygon points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4" class="c-white s-dark" stroke-width="1.5" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- Top-Right Large 4-Point Sparkle -->
    <g transform="translate(824, 42)">
      <g class="glint-2">
        <polygon points="0,-20 5,-5 20,0 5,5 0,20 -5,5 -20,0 -5,-5" class="c-white s-dark" stroke-width="1.6" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- Mid-Right Sparkle Star -->
    <g transform="translate(836, 148)">
      <g class="glint-3">
        <polygon points="0,-14 3.5,-3.5 14,0 3.5,3.5 0,14 -3.5,3.5 -14,0 -3.5,-3.5" class="c-white s-dark" stroke-width="1.5" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- Kinetic Shine Rays at Top-Right Corner -->
    <g transform="translate(814, 68)">
      <line x1="6" y1="-6" x2="22" y2="-18" class="s-white" stroke-width="2.4" stroke-linecap="round" />
      <line x1="12" y1="6" x2="30" y2="2" class="s-white" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="4 4" />
      <circle cx="24" cy="-6" r="2.8" class="c-white" />
    </g>
  </svg>
---

# Современное switch-выражение

Как превратить громоздкий переключатель с повторением `case` и `break` в компактную таблицу выбора значения и проверять целые диапазоны чисел?

`switch`-выражение — это современный и лаконичный способ выбора значения, который пришёл на смену длинным цепочкам `if / else if` и громоздкому классическому `switch`. Вместо блока команд оно использует стрелку `=>` и сразу возвращает готовый результат для записи в переменную.

## Основные шаблоны (сопоставление с образцом)

| Шаблон | Что проверяет | Пример ветки |
| --- | --- | --- |
| Константа | Точное совпадение со значением | `"admin" => "Полный доступ"` |
| Отношение (`<`, `>`, `<=`, `>=`) | Попадание числа в заданный интервал | `>= 90 => "Отлично"` |
| Логические связки (`and`, `or`, `not`) | Комбинацию нескольких условий для одного значения | `>= 18 and <= 65 => "Рабочий возраст"` |
| Кортеж `(a, b)` | Одновременную проверку двух и более переменных | `(true, false) => "Нужен пароль"` |
| Отбрасывание (`_`) | Любое другое значение (аналог ветки `default`) | `_ => "Неизвестно"` |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. Выбор по точному значению (вместо switch с case и break)
        int httpCode = 404;
        string message = httpCode switch
        {
            200 => "Успешно",
            403 => "Доступ запрещён",
            404 => "Страница не найдена",
            _   => "Неизвестная ошибка"
        };

        // 2. Проверка диапазонов чисел и связки and / or
        int temperature = 24;
        string weather = temperature switch
        {
            < 0             => "Мороз",
            >= 0 and <= 15  => "Прохладно",
            > 15 and <= 28  => "Тепло",
            _               => "Жара"
        };

        // 3. Проверка сразу двух условий через кортеж
        bool hasKey = true;
        bool isAlarmOff = false;
        string doorStatus = (hasKey, isAlarmOff) switch
        {
            (true, true)  => "Дверь открыта",
            (true, false) => "Сначала отключите сигнализацию",
            _             => "Нет ключа"
        };

        Console.WriteLine($"Статус: {message} | Погода: {weather} | Дверь: {doorStatus}");
    }
}

```

## Важные нюансы

* **Переменная ставится перед `switch`:** в отличие от классической записи `switch (x)`, здесь проверяемое значение пишется слева (`x switch { ... }`), ветки разделяются запятыми, а после закрывающей фигурной скобки обязательно ставится точка с запятой `;`.
* **Обязательная обработка всех случаев (`_`):** `switch`-выражение должно вернуть результат при любом входном значении. Если не предусмотреть все варианты, компилятор выдаст предупреждение, поэтому в конце почти всегда ставят ветку по умолчанию `_ => ...`.
* **Слова `and`, `or`, `not` внутри шаблонов:** при проверке диапазонов внутри `switch`-выражения вместо символов `&&`, `||` и `!` используются текстовые операторы `and` (И), `or` (ИЛИ) и `not` (НЕ).
* **Только возврат значения:** справа от стрелки `=>` нельзя написать несколько строк кода в фигурных скобках — каждая ветка должна возвращать одно конкретное значение общего для всех веток типа.

