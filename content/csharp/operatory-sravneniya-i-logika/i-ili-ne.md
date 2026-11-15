---
title: И, ИЛИ, НЕ
keywords: логические операторы, логическое И, логическое ИЛИ, логическое НЕ, сложное условие, true, false, инверсия, проверка, ветвление
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
  
      .hand-top {
        transform-box: fill-box;
        transform-origin: left top;
        animation: insertTop 4s ease-in-out infinite;
      }
      .hand-bottom {
        transform-box: fill-box;
        transform-origin: left bottom;
        animation: insertBottom 4s ease-in-out infinite;
      }
      .key-top {
        transform-box: fill-box;
        transform-origin: right center;
        animation: slideKeyTop 4s ease-in-out infinite;
      }
      .key-bottom {
        transform-box: fill-box;
        transform-origin: right center;
        animation: slideKeyBottom 4s ease-in-out infinite;
      }
      .shackle-open {
        transform-box: fill-box;
        transform-origin: left bottom;
        animation: liftShackle 4s ease-in-out infinite;
      }
      .lock-pulse {
        transform-box: fill-box;
        transform-origin: center;
        animation: pulseLock 4s ease-in-out infinite;
      }
      .burst-right {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: flashRight 4s ease-in-out infinite;
      }
      .chip-or {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatOr 3.6s ease-in-out infinite;
      }
      .chip-not {
        transform-box: fill-box;
        transform-origin: center;
        animation: floatNot 3.8s ease-in-out infinite;
      }
      .signal-flow {
        stroke-dasharray: 5 5;
        animation: flowSignal 1.1s linear infinite;
      }
  
      @keyframes insertTop {
        0%, 14%, 84%, 100% { transform: translateX(0px) rotate(0deg); }
        38%, 62% { transform: translateX(18px) rotate(2deg); }
      }
      @keyframes insertBottom {
        0%, 14%, 84%, 100% { transform: translateX(0px) rotate(0deg); }
        38%, 62% { transform: translateX(18px) rotate(-2deg); }
      }
      @keyframes slideKeyTop {
        0%, 14%, 84%, 100% { transform: translateX(0px); }
        38%, 62% { transform: translateX(18px); }
      }
      @keyframes slideKeyBottom {
        0%, 14%, 84%, 100% { transform: translateX(0px); }
        38%, 62% { transform: translateX(18px); }
      }
      @keyframes liftShackle {
        0%, 26%, 76%, 100% { transform: translateY(0px); }
        42%, 62% { transform: translateY(-16px); }
      }
      @keyframes pulseLock {
        0%, 26%, 76%, 100% { transform: scale(1); }
        44%, 60% { transform: scale(1.06); }
      }
      @keyframes flashRight {
        0%, 28%, 74%, 100% { transform: scale(0.75); opacity: 0.2; }
        44%, 60% { transform: scale(1.15); opacity: 1; }
      }
      @keyframes floatOr {
        0%, 100% { transform: translateY(0px) rotate(-4deg); }
        50% { transform: translateY(-6px) rotate(0deg); }
      }
      @keyframes floatNot {
        0%, 100% { transform: translateY(0px) rotate(4deg); }
        50% { transform: translateY(6px) rotate(0deg); }
      }
      @keyframes flowSignal {
        0% { stroke-dashoffset: 20; }
        100% { stroke-dashoffset: 0; }
      }
  
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transform: none !important;
          opacity: 1 !important;
        }
      }
    </style>
  
    <!-- LEFT DUAL HANDS INSERTING TWO REQUIRED KEYS FOR "&&" (LOGICAL AND) -->
    <!-- Top Hand + Key 1: age >= 18 -->
    <g transform="translate(226, 94)">
      <!-- Key 1 Shaft & Teeth -->
      <g class="key-top">
        <rect x="18" y="-6" width="84" height="12" rx="6" class="c-white s-dark" stroke-width="2.2" />
        <rect x="74" y="4" width="8" height="10" rx="2" class="c-white s-dark" stroke-width="1.8" />
        <rect x="88" y="4" width="8" height="12" rx="2" class="c-white s-dark" stroke-width="1.8" />
        <!-- Key Tag Pill -->
        <rect x="22" y="-28" width="86" height="20" rx="10" class="c-dark s-white" stroke-width="1.6" />
        <text x="65" y="-14" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">age >= 18</text>
      </g>
  
      <!-- Editorial Hand 1 -->
      <g class="hand-top">
        <path d="M -212 -46 L -34 -16 L -40 18 L -218 -10 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
        <path d="M -44 -18 L -18 -14 L -24 20 L -50 16 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
        <circle cx="-33" cy="10" r="2.6" class="c-dark" />
        <!-- Cartoon Round Hand -->
        <circle cx="0" cy="0" r="24" class="c-white s-dark" stroke-width="2.5" />
        <path d="M -12 -8 L -4 -5" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <path d="M -14 2 L -6 4" class="s-dark" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
  
    <!-- Bottom Hand + Key 2: hasTicket -->
    <g transform="translate(226, 194)">
      <!-- Key 2 Shaft & Teeth -->
      <g class="key-bottom">
        <rect x="18" y="-6" width="84" height="12" rx="6" class="c-white s-dark" stroke-width="2.2" />
        <rect x="74" y="-14" width="8" height="10" rx="2" class="c-white s-dark" stroke-width="1.8" />
        <rect x="88" y="-16" width="8" height="12" rx="2" class="c-white s-dark" stroke-width="1.8" />
        <!-- Key Tag Pill -->
        <rect x="22" y="10" width="86" height="20" rx="10" class="c-dark s-white" stroke-width="1.6" />
        <text x="65" y="24" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">hasTicket</text>
      </g>
  
      <!-- Editorial Hand 2 -->
      <g class="hand-bottom">
        <path d="M -212 46 L -34 16 L -40 -18 L -218 10 Z" class="c-dark s-white" stroke-width="2.2" stroke-linejoin="round" />
        <path d="M -44 18 L -18 14 L -24 -20 L -50 -16 Z" class="c-white s-dark" stroke-width="2.2" stroke-linejoin="round" />
        <circle cx="-33" cy="-10" r="2.6" class="c-dark" />
        <!-- Cartoon Round Hand -->
        <circle cx="0" cy="0" r="24" class="c-white s-dark" stroke-width="2.5" />
        <path d="M -14 -2 L -6 -4" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <path d="M -12 8 L -4 5" class="s-dark" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
  
    <!-- CENTRAL DOUBLE-KEYHOLE VAULT LOCK (&&) -->
    <g transform="translate(454, 152)">
      <!-- Popping Heavy Steel Shackle -->
      <g transform="translate(0, -64)">
        <g class="shackle-open">
          <path d="M -52 16 V -16 C -52 -46, 52 -46, 52 -16 V 16" class="s-white" stroke-width="18" stroke-linecap="round" />
          <path d="M -52 16 V -16 C -52 -46, 52 -46, 52 -16 V 16" class="s-dark" stroke-width="12" stroke-linecap="round" />
        </g>
      </g>
  
      <!-- Main White Padlock Vault Body -->
      <g class="lock-pulse">
        <rect x="-112" y="-64" width="224" height="164" rx="26" class="c-white s-dark" stroke-width="2.8" />
        <rect x="-98" y="-50" width="196" height="136" rx="18" class="c-dark" />
  
        <!-- Two Keyhole Cylinders on Left Edge (Both Must Turn!) -->
        <circle cx="-68" cy="-22" r="14" class="c-white" />
        <rect x="-71" y="-26" width="6" height="12" rx="3" class="c-accent" />
  
        <circle cx="-68" cy="42" r="14" class="c-white" />
        <rect x="-71" y="34" width="6" height="12" rx="3" class="c-accent" />
  
        <!-- Internal Logic Gate Wiring -->
        <path d="M -52 -22 H -26 V 10 H -10" class="s-white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M -52 42 H -26 V 10" class="s-white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
  
        <!-- Central "&&" Core Emblem -->
        <rect x="-12" y="-24" width="96" height="68" rx="16" class="c-accent" />
        <text x="36" y="18" text-anchor="middle" class="c-white mono" font-size="32" font-weight="700">&&</text>
  
        <!-- Bottom Result Strip: true -->
        <rect x="-80" y="66" width="160" height="14" rx="7" class="c-white" />
        <text x="0" y="77" text-anchor="middle" class="c-dark mono" font-size="11" font-weight="700">1 && 1 → true</text>
      </g>
    </g>
  
    <!-- Kinetic Burst Rays Above Unlocking Shackle -->
    <g transform="translate(514, 48)">
      <g class="burst-right">
        <line x1="0" y1="0" x2="18" y2="-16" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="8" y1="10" x2="26" y2="6" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="-10" y1="-6" x2="-6" y2="-24" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="20" cy="-6" r="3" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Companion Logical Operators (|| OR & ! NOT) -->
    <!-- Connector Lines -->
    <circle cx="566" cy="152" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 570 152 H 604 V 88 H 628" class="s-white signal-flow" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 604 152 V 204 H 628" class="s-white signal-flow" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Companion Card: || (Logical OR - Either Path Works) -->
    <g transform="translate(744, 88)">
      <g class="chip-or">
        <rect x="-112" y="-34" width="224" height="68" rx="20" class="c-white s-dark" stroke-width="2.5" />
        <rect x="-104" y="-26" width="208" height="52" rx="14" class="c-dark" />
  
        <!-- Bold || Emblem -->
        <rect x="-96" y="-19" width="46" height="38" rx="10" class="c-accent" />
        <text x="-73" y="8" text-anchor="middle" class="c-white mono" font-size="22" font-weight="700">||</text>
  
        <!-- Expression & Meaning -->
        <text x="24" y="-4" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">admin || mod</text>
        <rect x="-38" y="6" width="128" height="14" rx="7" class="c-white" />
        <text x="26" y="16" text-anchor="middle" class="c-dark mono" font-size="10" font-weight="700">хотя бы одно</text>
      </g>
    </g>
  
    <!-- Bottom Companion Card: ! (Logical NOT - Inverter) -->
    <g transform="translate(744, 204)">
      <g class="chip-not">
        <rect x="-112" y="-34" width="224" height="68" rx="20" class="c-white s-dark" stroke-width="2.5" />
        <rect x="-104" y="-26" width="208" height="52" rx="14" class="c-dark" />
  
        <!-- Bold ! Emblem -->
        <rect x="-96" y="-19" width="46" height="38" rx="10" class="c-white" />
        <text x="-73" y="9" text-anchor="middle" class="c-accent mono" font-size="24" font-weight="700">!</text>
  
        <!-- Inverter Expression & Flip -->
        <text x="24" y="-4" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">!isBanned</text>
        <rect x="-38" y="6" width="128" height="14" rx="7" class="c-accent" />
        <text x="26" y="16" text-anchor="middle" class="c-white mono" font-size="10" font-weight="700">true ↔ false</text>
      </g>
    </g>
  </svg>
---

# Логические операторы: И, ИЛИ, НЕ

Как объединить несколько проверок в одно сложное условие или поменять логический результат на противоположный?

Логические операторы работают со значениями типа `bool` (`true` и `false`) и позволяют строить составные правила для ветвления программы и циклов.

## Таблица операторов

| Оператор | Название | Когда возвращает `true` | Пример |
| --- | --- | --- | --- |
| `&&` | Логическое И | Только если **оба** условия истинны | `age >= 18 && hasTicket` |
| `\|\|` | Логическое ИЛИ | Если истинно **хотя бы одно** из условий | `isAdmin \|\| isModerator` |
| `!` | Логическое НЕ | Меняет `true` на `false`, а `false` на `true` | `!isBanned` |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        int age = 20;
        bool hasTicket = true;
        bool isVip = false;
        bool isBanned = false;

        // 1. Логическое И (&&) — должны выполниться оба условия
        bool canEnter = age >= 18 && hasTicket; // true

        // 2. Логическое ИЛИ (||) — достаточно хотя бы одного совпадения
        bool hasFastTrack = isVip || age >= 65; // false

        // 3. Логическое НЕ (!) — инвертирует значение на противоположное
        bool isAllowed = canEnter && !isBanned; // true

        Console.WriteLine($"Вход разрешён: {isAllowed}, быстрый проход: {hasFastTrack}");
    }
}

```

## Важные нюансы

* **Ленивое вычисление (сокращённая проверка):** оператор `&&` не проверяет второе условие, если первое уже дало `false` (итоговый ответ всё равно будет `false`). Аналогично `||` останавливается сразу, если первое условие дало `true`. Это защищает от ошибок — например, можно безопасно написать `text != null && text.Length > 0`.
* **Приоритет выполнения:** сначала всегда срабатывает отрицание `!`, затем логическое И (`&&`), и только в самом конце — логическое ИЛИ (`||`). Если в одной строке смешаны `&&` и `||`, всегда выделяйте нужный порядок круглыми скобками `(...)`.
* **Двойные знаки против одинарных:** для логики в условиях всегда используют двойные знаки `&&` и `||`. Одинарные `&` и `|` выполняют побитовые операции и проверяют обе части без остановки.

