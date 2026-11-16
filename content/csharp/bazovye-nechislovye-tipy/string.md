---
title: string
keywords: string, System.String, строковый тип данных, текст, двойные кавычки, длина строки, склеивание строк, пустая строка, переменная
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
  
      .quote-left {
        transform-box: fill-box;
        transform-origin: center;
        animation: clampLeft 3.6s ease-in-out infinite;
      }
      .quote-right {
        transform-box: fill-box;
        transform-origin: center;
        animation: clampRight 3.6s ease-in-out infinite;
      }
      .seg-wave-1 {
        transform-box: fill-box;
        transform-origin: center;
        animation: waveSeg 2.4s ease-in-out infinite;
        animation-delay: 0s;
      }
      .seg-wave-2 {
        transform-box: fill-box;
        transform-origin: center;
        animation: waveSeg 2.4s ease-in-out infinite;
        animation-delay: -0.4s;
      }
      .seg-wave-3 {
        transform-box: fill-box;
        transform-origin: center;
        animation: waveSeg 2.4s ease-in-out infinite;
        animation-delay: -0.8s;
      }
      .seg-wave-4 {
        transform-box: fill-box;
        transform-origin: center;
        animation: waveSeg 2.4s ease-in-out infinite;
        animation-delay: -1.2s;
      }
      .seg-wave-5 {
        transform-box: fill-box;
        transform-origin: center;
        animation: waveSeg 2.4s ease-in-out infinite;
        animation-delay: -1.6s;
      }
      .seg-wave-6 {
        transform-box: fill-box;
        transform-origin: center;
        animation: waveSeg 2.4s ease-in-out infinite;
        animation-delay: -2.0s;
      }
      .eyes-look {
        transform-box: fill-box;
        transform-origin: center;
        animation: lookBadges 3.6s ease-in-out infinite;
      }
      .antenna-wiggle {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: wiggleAntenna 2.4s ease-in-out infinite;
      }
      .burst-pop {
        transform-box: fill-box;
        transform-origin: bottom left;
        animation: popBurst 3.6s ease-in-out infinite;
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
  
      @keyframes clampLeft {
        0%, 100% { transform: translateX(0px) rotate(0deg); }
        50% { transform: translateX(3px) rotate(2deg); }
      }
      @keyframes clampRight {
        0%, 100% { transform: translateX(0px) rotate(0deg); }
        50% { transform: translateX(-3px) rotate(-2deg); }
      }
      @keyframes waveSeg {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-7px); }
      }
      @keyframes lookBadges {
        0%, 25%, 75%, 100% { transform: translate(0px, 0px); }
        45%, 60% { transform: translate(3px, -1px); }
      }
      @keyframes wiggleAntenna {
        0%, 100% { transform: rotate(-4deg); }
        50% { transform: rotate(6deg); }
      }
      @keyframes popBurst {
        0%, 30%, 75%, 100% { transform: scale(0.75); opacity: 0.25; }
        50% { transform: scale(1.12); opacity: 1; }
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
    <g transform="translate(238, 38)">
      <g class="cloud-drift-1">
        <path d="M -22 7 H 22 C 27 7 31 3 31 -1 C 31 -5 27 -8 23 -8 C 21 -14 15 -17 9 -15 C 5 -20 -3 -20 -7 -15 C -13 -16 -18 -12 -18 -6 C -23 -6 -26 -2 -26 2 C -26 5 -24 7 -22 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
    <g transform="translate(656, 36)">
      <g class="cloud-drift-2">
        <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- LEFT BOOKEND: Giant Opening Double Quotes (") -->
    <g transform="translate(116, 136)">
      <g class="quote-left">
        <!-- Left Comma-Quote -->
        <path d="M -24 -18 C -24 -30, -14 -38, -4 -38 C 6 -38, 12 -30, 12 -18 C 12 2, 0 18, -18 26 L -24 16 C -12 10, -6 2, -6 -6 C -16 -6, -24 -10, -24 -18 Z" class="c-white s-dark" stroke-width="2.4" stroke-linejoin="round" />
        <circle cx="-7" cy="-22" r="5" class="c-accent" />
        <!-- Right Comma-Quote -->
        <path d="M 6 -18 C 6 -30, 16 -38, 26 -38 C 36 -38, 42 -30, 42 -18 C 42 2, 30 18, 12 26 L 6 16 C 18 10, 24 2, 24 -6 C 14 -6, 6 -10, 6 -18 Z" class="c-white s-dark" stroke-width="2.4" stroke-linejoin="round" />
        <circle cx="23" cy="-22" r="5" class="c-accent" />
      </g>
    </g>
  
    <!-- CENTER SECTION: Character-Chain Caterpillar ("Привет") -->
    <!-- Base Index & Length Ruler Underneath Caterpillar -->
    <g transform="translate(364, 218)">
      <rect x="-198" y="-12" width="396" height="24" rx="12" class="c-dark s-white" stroke-width="1.75" />
      <text x="-167" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">[0]</text>
      <text x="-100" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">[1]</text>
      <text x="-33" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">[2]</text>
      <text x="34" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">[3]</text>
      <text x="101" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">[4]</text>
      <rect x="148" y="-8" width="42" height="16" rx="8" class="c-accent" />
      <text x="169" y="4" text-anchor="middle" class="c-white mono" font-size="11" font-weight="700">[5]</text>
    </g>
  
    <!-- Segment 0: 'П' -->
    <g transform="translate(197, 150)">
      <g class="seg-wave-1">
        <!-- Stubby Caterpillar Legs -->
        <path d="M -16 32 L -20 44 H -8 L -6 32 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <path d="M 6 32 L 8 44 H 20 L 16 32 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <!-- Segment Body -->
        <rect x="-29" y="-32" width="58" height="64" rx="16" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-21" y="-24" width="42" height="48" rx="10" class="c-dark" />
        <text x="0" y="9" text-anchor="middle" class="c-white mono" font-size="24" font-weight="700">П</text>
      </g>
    </g>
  
    <!-- Segment 1: 'р' -->
    <g transform="translate(264, 150)">
      <g class="seg-wave-2">
        <path d="M -16 32 L -20 44 H -8 L -6 32 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <path d="M 6 32 L 8 44 H 20 L 16 32 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <rect x="-29" y="-32" width="58" height="64" rx="16" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-21" y="-24" width="42" height="48" rx="10" class="c-dark" />
        <text x="0" y="9" text-anchor="middle" class="c-white mono" font-size="24" font-weight="700">р</text>
      </g>
    </g>
  
    <!-- Segment 2: 'и' -->
    <g transform="translate(331, 150)">
      <g class="seg-wave-3">
        <path d="M -16 32 L -20 44 H -8 L -6 32 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <path d="M 6 32 L 8 44 H 20 L 16 32 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <rect x="-29" y="-32" width="58" height="64" rx="16" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-21" y="-24" width="42" height="48" rx="10" class="c-dark" />
        <text x="0" y="9" text-anchor="middle" class="c-white mono" font-size="24" font-weight="700">и</text>
      </g>
    </g>
  
    <!-- Segment 3: 'в' -->
    <g transform="translate(398, 150)">
      <g class="seg-wave-4">
        <path d="M -16 32 L -20 44 H -8 L -6 32 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <path d="M 6 32 L 8 44 H 20 L 16 32 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <rect x="-29" y="-32" width="58" height="64" rx="16" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-21" y="-24" width="42" height="48" rx="10" class="c-dark" />
        <text x="0" y="9" text-anchor="middle" class="c-white mono" font-size="24" font-weight="700">в</text>
      </g>
    </g>
  
    <!-- Segment 4: 'е' -->
    <g transform="translate(465, 150)">
      <g class="seg-wave-5">
        <path d="M -16 32 L -20 44 H -8 L -6 32 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <path d="M 6 32 L 8 44 H 20 L 16 32 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <rect x="-29" y="-32" width="58" height="64" rx="16" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-21" y="-24" width="42" height="48" rx="10" class="c-dark" />
        <text x="0" y="9" text-anchor="middle" class="c-white mono" font-size="24" font-weight="700">е</text>
      </g>
    </g>
  
    <!-- Segment 5 (Head): 'т' with Grotesque Doka Eyes & Antennae -->
    <g transform="translate(532, 150)">
      <g class="seg-wave-6">
        <!-- Cute Caterpillar Antennae -->
        <g transform="translate(14, -32)">
          <g class="antenna-wiggle">
            <path d="M -6 0 C -8 -14, -2 -24, 6 -26" class="s-white" stroke-width="2.2" stroke-linecap="round" />
            <circle cx="6" cy="-26" r="4.5" class="c-white s-dark" stroke-width="1.8" />
            <path d="M 4 0 C 6 -12, 14 -20, 22 -20" class="s-white" stroke-width="2.2" stroke-linecap="round" />
            <circle cx="22" cy="-20" r="4.5" class="c-white s-dark" stroke-width="1.8" />
          </g>
        </g>
  
        <!-- Grotesque Doka Eyes Perched on Head -->
        <g transform="translate(-8, -44)">
          <ellipse cx="-11" cy="0" rx="10" ry="13" class="c-white s-dark" stroke-width="2.2" />
          <ellipse cx="10" cy="0" rx="10" ry="13" class="c-white s-dark" stroke-width="2.2" />
          <g class="eyes-look">
            <circle cx="-9" cy="1" r="3.5" class="c-dark" />
            <circle cx="12" cy="1" r="3.5" class="c-dark" />
          </g>
        </g>
  
        <!-- Stubby Front Legs -->
        <path d="M -16 32 L -20 44 H -8 L -6 32 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <path d="M 6 32 L 8 44 H 20 L 16 32 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
  
        <!-- Head Segment Body -->
        <rect x="-29" y="-32" width="58" height="64" rx="16" class="c-white s-dark" stroke-width="2.4" />
        <rect x="-21" y="-24" width="42" height="48" rx="10" class="c-accent" />
        <text x="0" y="9" text-anchor="middle" class="c-white mono" font-size="24" font-weight="700">т</text>
      </g>
    </g>
  
    <!-- RIGHT BOOKEND: Giant Closing Double Quotes (") -->
    <g transform="translate(604, 136)">
      <g class="quote-right">
        <!-- Left Comma-Quote -->
        <path d="M -24 -18 C -24 -30, -14 -38, -4 -38 C 6 -38, 12 -30, 12 -18 C 12 2, 0 18, -18 26 L -24 16 C -12 10, -6 2, -6 -6 C -16 -6, -24 -10, -24 -18 Z" class="c-white s-dark" stroke-width="2.4" stroke-linejoin="round" />
        <circle cx="-7" cy="-22" r="5" class="c-accent" />
        <!-- Right Comma-Quote -->
        <path d="M 6 -18 C 6 -30, 16 -38, 26 -38 C 36 -38, 42 -30, 42 -18 C 42 2, 30 18, 12 26 L 6 16 C 18 10, 24 2, 24 -6 C 14 -6, 6 -10, 6 -18 Z" class="c-white s-dark" stroke-width="2.4" stroke-linejoin="round" />
        <circle cx="23" cy="-22" r="5" class="c-accent" />
      </g>
    </g>
  
    <!-- Kinetic Burst Rays around Closing Quote -->
    <g transform="translate(648, 86)">
      <g class="burst-pop">
        <line x1="4" y1="-4" x2="20" y2="-18" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <line x1="8" y1="8" x2="26" y2="4" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="-6" y1="-10" x2="-2" y2="-26" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="22" cy="-7" r="2.8" class="c-white" />
      </g>
    </g>
  
    <!-- RIGHT SECTION: Starburst & Dark Capsule Badges -->
    <!-- Connector Lines -->
    <circle cx="648" cy="146" r="4" class="c-white s-dark" stroke-width="1.75" />
    <path d="M 652 146 H 668 V 100 H 684" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 668 146 V 198 H 684" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- Top Badge: Starburst + System.String Capsule -->
    <g transform="translate(760, 100)">
      <g class="star-float">
        <!-- 12-point Doka Starburst -->
        <polygon points="0,-44 13,-26 39,-34 32,-11 58,0 32,11 39,34 13,26 0,44 -13,26 -39,34 -32,11 -58,0 -32,-11 -39,-34 -13,-26" class="c-white s-dark" stroke-width="2" stroke-linejoin="round" />
        <!-- Dark Pill Capsule -->
        <g transform="rotate(-5)">
          <rect x="-74" y="-18" width="148" height="36" rx="18" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono" font-size="14" font-weight="700">System.String</text>
        </g>
      </g>
    </g>
  
    <!-- Bottom Badge: String Properties Capsule -->
    <g transform="translate(760, 198)">
      <g class="pill-float">
        <rect x="-78" y="-18" width="156" height="36" rx="18" class="c-dark s-white" stroke-width="2" />
        <circle cx="-60" cy="0" r="5" class="c-accent" />
        <text x="8" y="5" text-anchor="middle" class="c-white mono" font-size="13" font-weight="700">char[] · .Length</text>
      </g>
    </g>
  </svg>
---

# Строковый тип string

Как хранить слова, целые предложения и текст, и почему строки нельзя изменить по одной букве?

`string` (от англ. *string* — строка) — базовый тип данных для хранения текста любой длины: от одного знака до целой книги. Значение строки всегда заключается в двойные кавычки `"..."`.

## Основные характеристики

* **Полное имя типа:** `System.String`.
* **Значение по умолчанию:** `null` (отсутствие ссылки на объект в памяти).
* **Пустая строка:** `""` или `string.Empty` (существующая в памяти строка длиной `0` символов).
* **Неизменяемость:** готовую строку нельзя отредактировать внутри — любая операция (склеивание, замена букв, смена регистра) создаёт в памяти новую строку.

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        string greeting = "Привет";
        string name = "Анна";

        // Склеивание строк (конкатенация) и узнавание длины через .Length
        string fullMessage = greeting + ", " + name + "!";
        Console.WriteLine($"{fullMessage} Длина текста: {fullMessage.Length} симв.");

        // Чтение отдельного символа по индексу (отсчёт всегда идёт с 0)
        char firstLetter = name[0]; // 'А'

        // Методы обработки не меняют исходную строку, а возвращают новую
        Console.WriteLine($"В верхнем регистре: {name.ToUpper()}");
        Console.WriteLine($"Первая буква имени: {firstLetter}");
    }
}

```

## Важные нюансы

* **Двойные кавычки обязательны:** даже если в строке находится всего один символ (`"A"`), он пишется в двойных кавычках. Одинарные кавычки (`'A'`) зарезервированы строго для символьного типа `char`.
* **Нельзя перезаписать букву по индексу:** прочитать символ через `name[0]` можно, но попытка изменить его (`name[0] = 'Я';`) вызовет ошибку компиляции.
* **Проверка на пустоту:** чтобы убедиться, что пользователь ввёл осмысленный текст, а не просто нажал Enter или пробел, используют метод `string.IsNullOrWhiteSpace(text)`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что вернёт `\"Марс\".Length`?",
  "options": [
    {
      "text": "`4`",
      "correct": true
    },
    {
      "text": "`3`",
      "correct": false,
      "explanation": "В слове четыре буквы."
    },
    {
      "text": "`5`",
      "correct": false,
      "explanation": "Пробелов и скрытых символов нет."
    }
  ],
  "explanation": "`Length` считает количество символов."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про строки?",
  "options": [
    {
      "text": "Строки неизменяемы",
      "correct": true
    },
    {
      "text": "Можно прочитать символ по индексу",
      "correct": true
    },
    {
      "text": "Можно изменить символ по индексу",
      "correct": false,
      "explanation": "Запись `name[0] = 'Я'` не компилируется."
    }
  ],
  "explanation": "Строка создаёт новую копию при любой операции изменения."
}
```
