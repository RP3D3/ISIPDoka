---
title: if / else
keywords: условный оператор, if, else, ветвление, условие, логическое выражение, фигурные скобки, область видимости, проверка, выбор, действие
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
  
      .switch-blade {
        transform-box: fill-box;
        transform-origin: left center;
        animation: toggleSwitch 4.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
      }
      .sema-arm {
        transform-box: fill-box;
        transform-origin: left center;
        animation: swingSemaphore 4.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
      }
      .lamp-true {
        animation: glowTrue 4.8s ease-in-out infinite;
      }
      .lamp-false {
        animation: glowFalse 4.8s ease-in-out infinite;
      }
      .block-if {
        transform-box: fill-box;
        transform-origin: center;
        animation: pulseIf 4.8s ease-in-out infinite;
      }
      .block-else {
        transform-box: fill-box;
        transform-origin: center;
        animation: pulseElse 4.8s ease-in-out infinite;
      }
      .track-pulse-in {
        stroke-dasharray: 10 8;
        animation: flowIn 1.2s linear infinite;
      }
      .track-pulse-up {
        stroke-dasharray: 10 8;
        animation: flowUp 4.8s linear infinite;
      }
      .track-pulse-dn {
        stroke-dasharray: 10 8;
        animation: flowDn 4.8s linear infinite;
      }
      .dial-rot {
        transform-box: fill-box;
        transform-origin: center;
        animation: rotateCross 9.6s linear infinite;
      }
  
      @keyframes toggleSwitch {
        0%, 40%, 100% { transform: rotate(-22deg); }
        50%, 90% { transform: rotate(22deg); }
      }
      @keyframes swingSemaphore {
        0%, 40%, 100% { transform: rotate(-32deg); }
        50%, 90% { transform: rotate(32deg); }
      }
      @keyframes glowTrue {
        0%, 40%, 100% { opacity: 1; }
        48%, 92% { opacity: 0.2; }
      }
      @keyframes glowFalse {
        0%, 40%, 100% { opacity: 0.2; }
        48%, 92% { opacity: 1; }
      }
      @keyframes pulseIf {
        0%, 40%, 100% { transform: translateX(0px); }
        20% { transform: translateX(6px); }
      }
      @keyframes pulseElse {
        0%, 48%, 100% { transform: translateX(0px); }
        70% { transform: translateX(6px); }
      }
      @keyframes flowIn {
        0% { stroke-dashoffset: 36; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes flowUp {
        0%, 42% { stroke-dashoffset: 36; opacity: 1; }
        48%, 94% { stroke-dashoffset: 0; opacity: 0.25; }
        100% { stroke-dashoffset: 36; opacity: 1; }
      }
      @keyframes flowDn {
        0%, 42% { stroke-dashoffset: 0; opacity: 0.25; }
        48%, 94% { stroke-dashoffset: 36; opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0.25; }
      }
      @keyframes rotateCross {
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
  
    <!-- LEFT ZONE: Condition Entry Gate (if (x > 0)) -->
    <g transform="translate(148, 140)">
      <!-- Bauhaus Geometric Backdrop Pillars -->
      <rect x="-86" y="-82" width="172" height="164" class="c-dark s-white" stroke-width="2" />
      <!-- Diagonal Hazard / Swiss Stripes Inside Dark Frame -->
      <line x1="-86" y1="-54" x2="-54" y2="-82" class="s-white" stroke-width="2" />
      <line x1="-86" y1="-26" x2="-26" y2="-82" class="s-white" stroke-width="2" />
      <line x1="54" y1="82" x2="86" y2="54" class="s-white" stroke-width="2" />
      <line x1="26" y1="82" x2="86" y2="26" class="s-white" stroke-width="2" />
  
      <!-- Bold White Condition Monolith -->
      <rect x="-70" y="-44" width="140" height="88" class="c-white s-dark" stroke-width="2.5" />
      <rect x="-70" y="-44" width="140" height="24" class="c-dark" />
      <text x="0" y="-28" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700" letter-spacing="1.5">УСЛОВИЕ</text>
  
      <!-- Condition Code Pill -->
      <rect x="-56" y="-8" width="112" height="36" rx="18" class="c-accent" />
      <text x="0" y="15" text-anchor="middle" class="c-white mono" font-size="16" font-weight="700">x > 0</text>
    </g>
  
    <!-- Incoming Main Rail Track -->
    <line x1="234" y1="140" x2="348" y2="140" class="s-white" stroke-width="10" />
    <line x1="234" y1="140" x2="348" y2="140" class="s-dark track-pulse-in" stroke-width="4" />
  
    <!-- CENTER ZONE: Bauhaus Railway Switch & Semaphore Tower -->
    <!-- Upper Diagonal Track to IF (true) -->
    <path d="M 366 140 L 494 74 H 636" class="s-white" stroke-width="10" stroke-linejoin="round" />
    <path d="M 366 140 L 494 74 H 636" class="s-dark track-pulse-up" stroke-width="4" stroke-linejoin="round" />
  
    <!-- Lower Diagonal Track to ELSE (false) -->
    <path d="M 366 140 L 494 206 H 636" class="s-white" stroke-width="10" stroke-linejoin="round" />
    <path d="M 366 140 L 494 206 H 636" class="s-dark track-pulse-dn" stroke-width="4" stroke-linejoin="round" />
  
    <!-- Bauhaus Switch-Box Housing & Semaphore Mast -->
    <g transform="translate(366, 140)">
      <!-- Vertical Semaphore Mast -->
      <rect x="-5" y="-114" width="10" height="228" class="c-dark s-white" stroke-width="2" />
  
      <!-- Top Semaphore Signal Arm -->
      <g transform="translate(0, -96)">
        <g class="sema-arm">
          <rect x="0" y="-9" width="78" height="18" class="c-white s-dark" stroke-width="2" />
          <rect x="48" y="-9" width="30" height="18" class="c-accent" />
          <circle cx="0" cy="0" r="7" class="c-white s-dark" stroke-width="2" />
        </g>
      </g>
  
      <!-- Bottom Geometric Counterweight Circle -->
      <g transform="translate(0, 96)">
        <g class="dial-rot">
          <circle cx="0" cy="0" r="18" class="c-white s-dark" stroke-width="2" />
          <line x1="-12" y1="0" x2="12" y2="0" class="s-dark" stroke-width="2.5" />
          <line x1="0" y1="-12" x2="0" y2="12" class="s-dark" stroke-width="2.5" />
        </g>
      </g>
  
      <!-- Central Switch Pivot Hub -->
      <circle cx="0" cy="0" r="24" class="c-white s-dark" stroke-width="3" />
      <circle cx="0" cy="0" r="11" class="c-dark" />
  
      <!-- Pivoting Switch Rail Blade -->
      <g class="switch-blade">
        <polygon points="0,-7 116,-4 116,4 0,7" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <circle cx="0" cy="0" r="5" class="c-accent" />
      </g>
    </g>
  
    <!-- Center-Right Signal Status Indicators (true / false) -->
    <!-- TRUE Indicator Pill -->
    <g transform="translate(556, 42)">
      <rect x="-46" y="-15" width="92" height="30" rx="15" class="c-dark s-white" stroke-width="2" />
      <circle cx="-28" cy="0" r="6" class="c-accent lamp-true" />
      <text x="10" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">true</text>
    </g>
  
    <!-- FALSE Indicator Pill -->
    <g transform="translate(556, 238)">
      <rect x="-46" y="-15" width="92" height="30" rx="15" class="c-dark s-white" stroke-width="2" />
      <circle cx="-28" cy="0" r="6" class="c-accent lamp-false" />
      <text x="10" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">false</text>
    </g>
  
    <!-- RIGHT ZONE: Destination Execution Monoliths (if vs else) -->
    <!-- Upper Block: IF Branch -->
    <g transform="translate(744, 74)">
      <g class="block-if">
        <rect x="-108" y="-36" width="216" height="72" class="c-white s-dark" stroke-width="2.5" />
        <!-- Left Accent Tab -->
        <rect x="-108" y="-36" width="64" height="72" class="c-accent" />
        <text x="-76" y="7" text-anchor="middle" class="c-white mono" font-size="20" font-weight="700">if</text>
        <!-- Code Block Representation -->
        <rect x="-28" y="-18" width="118" height="12" rx="6" class="c-dark" />
        <rect x="-28" y="4" width="84" height="12" rx="6" class="c-dark" />
        <circle cx="76" cy="10" r="6" class="c-accent lamp-true" />
      </g>
    </g>
  
    <!-- Lower Block: ELSE Branch -->
    <g transform="translate(744, 206)">
      <g class="block-else">
        <rect x="-108" y="-36" width="216" height="72" class="c-dark s-white" stroke-width="2.5" />
        <!-- Left White Tab -->
        <rect x="-108" y="-36" width="76" height="72" class="c-white" />
        <text x="-70" y="6" text-anchor="middle" class="c-dark mono" font-size="18" font-weight="700">else</text>
        <!-- Code Block Representation -->
        <rect x="-16" y="-18" width="106" height="12" rx="6" class="c-white" />
        <rect x="-16" y="4" width="72" height="12" rx="6" class="c-white" />
        <circle cx="76" cy="10" r="6" class="c-accent lamp-false" />
      </g>
    </g>
  </svg>
---

# Условная конструкция if и else

Как заставить программу выполнять разные действия в зависимости от того, выполнилось условие или нет?

Конструкция `if` (если) проверяет логическое выражение в круглых скобках: если оно истинно (`true`), запускается первый блок кода. Необязательная ветка `else` (иначе) срабатывает в том случае, когда условие ложно (`false`).

## Как устроено ветвление

* **`if (условие) { ... }`** — запускает блок команд только при условии `true`. Если условие ложно, код внутри скобок просто пропускается.
* **`else { ... }`** — перехватывает все случаи, когда условие в `if` вернуло `false`. Своего условия в скобках у `else` нет.
* **Взаимоисключение:** в связке `if / else` всегда выполняется строго **одна** из двух веток — либо первая, либо вторая.

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        int balance = 350;
        int ticketPrice = 500;

        // Проверка условия в круглых скобках
        if (balance >= ticketPrice)
        {
            balance -= ticketPrice;
            Console.WriteLine($"Билет куплен! Остаток: {balance} руб.");
        }
        else
        {
            int missing = ticketPrice - balance;
            Console.WriteLine($"Недостаточно средств. Не хватает {missing} руб.");
        }

        // Сокращённая проверка для bool-переменной (без == true)
        bool isNightMode = true;
        if (isNightMode)
        {
            Console.WriteLine("Включена тёмная тема.");
        }
    }
}

```

## Важные нюансы

* **Никакой точки с запятой после `if (...)`:** запись `if (x > 0);` завершает проверку пустым действием, из-за чего код в фигурных скобках ниже выполнится в любом случае.
* **Всегда ставьте фигурные скобки `{}`:** если внутри ветки всего одна команда, язык разрешает опустить скобки, но лучше писать их всегда — это защищает от логических ошибок при добавлении второй строки кода.
* **Область видимости переменных:** переменная, объявленная внутри блока `{ ... }` (как `missing` в примере), существует только внутри этих скобок и недоступна за их пределами.
* **Не пишите `== true`:** если переменная уже имеет тип `bool`, вместо `if (isReady == true)` принято писать просто `if (isReady)`, а для проверки на ложь — `if (!isReady)`.

