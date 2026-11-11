---
title: const
keywords: const константа константы неизменяемость compile-time магические числа readonly CS0131 CS0145 CS0133 CS0134 си шарп c# csharp
svg: |
  <svg viewBox="0 0 900 280" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 900px; max-height: 280px; height: auto; display: block; margin: 0 auto 20px;">
    <style>
      .c-white { fill: var(--text-main, #ffffff); }
      .c-dark { fill: var(--bg-main, #222429); }
      .c-accent { fill: var(--domain-accent, #614fa8); }
      .s-white { stroke: var(--text-main, #ffffff); }
      .s-dark { stroke: var(--bg-main, #222429); }
      .s-accent { stroke: var(--domain-accent, #614fa8); }
      .mono {
        font-family: 'JetBrains Mono', monospace;
        font-weight: 700;
        font-size: 13px;
        letter-spacing: -0.02em;
      }
  
      @keyframes drift-cloud {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(9px); }
      }
      @keyframes spin-slow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes jitter-var {
        0%, 100% { transform: translateY(0px) rotate(-1.5deg); }
        25% { transform: translateY(-4px) rotate(1.5deg); }
        50% { transform: translateY(1px) rotate(-1deg); }
        75% { transform: translateY(-3px) rotate(2deg); }
      }
      @keyframes rays-pulse {
        0%, 100% { transform: scale(1); opacity: 0.95; }
        50% { transform: scale(1.07); opacity: 0.5; }
      }
      @keyframes hammer-bonk {
        0%, 100% { transform: translateX(0px) rotate(0deg); }
        35% { transform: translateX(-18px) rotate(-14deg); }
        50% { transform: translateX(6px) rotate(8deg); }
        70% { transform: translateX(0px) rotate(0deg); }
      }
      @keyframes shield-flash {
        0%, 32%, 100% { opacity: 0.15; transform: scale(0.96); }
        40%, 55% { opacity: 1; transform: scale(1.04); }
      }
      @keyframes dash-flow {
        0% { stroke-dashoffset: 20; }
        100% { stroke-dashoffset: 0; }
      }
  
      .anim-cloud {
        transform-box: fill-box;
        transform-origin: center;
        animation: drift-cloud 6.5s ease-in-out infinite;
      }
      .anim-spin {
        transform-box: fill-box;
        transform-origin: center;
        animation: spin-slow 5s linear infinite;
      }
      .anim-jitter {
        transform-box: fill-box;
        transform-origin: center;
        animation: jitter-var 2.2s ease-in-out infinite;
      }
      .anim-rays {
        transform-box: fill-box;
        transform-origin: center;
        animation: rays-pulse 2.6s ease-in-out infinite;
      }
      .anim-bonk {
        transform-box: fill-box;
        transform-origin: right center;
        animation: hammer-bonk 2.8s ease-in-out infinite;
      }
      .anim-shield {
        transform-box: fill-box;
        transform-origin: center;
        animation: shield-flash 2.8s ease-in-out infinite;
      }
      .anim-dash {
        animation: dash-flow 1.4s linear infinite;
      }
  
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transform: none !important;
          opacity: 1 !important;
        }
      }
    </style>
  
    <!-- Декоративные квадратные скобки по краям композиции -->
    <path d="M 52 32 H 32 V 248 H 52" class="s-white" stroke-width="2.5" stroke-linecap="square" />
    <path d="M 848 32 H 868 V 248 H 848" class="s-white" stroke-width="2.5" stroke-linecap="square" />
  
    <!-- Лаконичные контурные облака -->
    <g transform="translate(238, 42)">
      <g class="anim-cloud">
        <path d="M -26 7 H 26 C 32 7 35 3 34 -2 C 33 -7 28 -10 22 -9 C 19 -16 11 -20 3 -17 C -4 -22 -15 -20 -18 -12 C -26 -12 -31 -7 -30 0 C -30 4 -28 7 -26 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
    <g transform="translate(652, 44)">
      <g class="anim-cloud">
        <path d="M -20 6 H 20 C 25 6 28 2 27 -2 C 26 -6 21 -8 17 -7 C 14 -13 7 -15 1 -13 C -4 -17 -12 -15 -15 -9 C -21 -9 -25 -5 -24 1 C -24 4 -22 6 -20 6 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- Мелкие белые кружки-искры -->
    <circle cx="292" cy="78" r="3" class="c-white" />
    <circle cx="604" cy="68" r="2.5" class="c-white" />
    <circle cx="624" cy="212" r="3" class="c-white" />
    <circle cx="86" cy="72" r="2.5" class="c-white" />
  
    <!-- Опорная базовая линия -->
    <line x1="74" y1="236" x2="826" y2="236" class="s-white" stroke-width="2.25" stroke-linecap="round" />
  
    <!-- ЛЕВАЯ ЧАСТЬ: Беспокойная изменяемая переменная (постоянно крутится и меняется) -->
    <g transform="translate(154, 156)">
      <g class="anim-jitter">
        <!-- Ножки-пружинки -->
        <path d="M -18 36 V 78 M 18 36 V 78" class="s-white" stroke-width="2.25" stroke-linecap="round" stroke-dasharray="4 3" />
  
        <!-- Пунктирный корпус изменяемой ячейки -->
        <rect x="-52" y="-36" width="104" height="72" rx="14" class="c-dark s-white" stroke-width="2" stroke-dasharray="6 4" />
  
        <!-- Вращающиеся стрелки перезаписи внутри -->
        <g transform="translate(0, -2)">
          <g class="anim-spin">
            <path d="M -18 0 A 18 18 0 0 1 14 -11" class="s-white" stroke-width="2" stroke-linecap="round" />
            <path d="M 10 -15 L 16 -11 L 11 -6" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M 18 0 A 18 18 0 0 1 -14 11" class="s-white" stroke-width="2" stroke-linecap="round" />
            <path d="M -10 15 L -16 11 L -11 6" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </g>
  
        <!-- Тёмная капсула-бейдж mutating сверху -->
        <rect x="-44" y="-52" width="88" height="24" rx="12" class="c-dark s-white" stroke-width="1.75" />
        <text x="0" y="-36" text-anchor="middle" class="c-white mono">hp: 99→12</text>
  
        <!-- Закружившиеся гротескные глазки снизу -->
        <circle cx="-14" cy="20" r="6.5" class="c-white s-dark" stroke-width="1.5" />
        <circle cx="14" cy="20" r="6.5" class="c-white s-dark" stroke-width="1.5" />
        <circle cx="-12" cy="18" r="2.2" class="c-dark" />
        <circle cx="12" cy="22" r="2.2" class="c-dark" />
      </g>
    </g>
  
    <!-- Разделительная пунктирная линия -->
    <line x1="252" y1="92" x2="252" y2="216" class="s-white anim-dash" stroke-width="1.75" stroke-dasharray="5 6" stroke-linecap="round" />
  
    <!-- ЦЕНТР: Монументальный заклёпанный блок-константа const PI = 3.14, прибитый анкерами к земле -->
    <g transform="translate(442, 152)">
      <!-- Пульсирующие кинетические лучи вокруг монолита -->
      <g class="anim-rays">
        <line x1="-124" y1="-62" x2="-142" y2="-74" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="0" y1="-84" x2="0" y2="-104" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="124" y1="-62" x2="142" y2="-74" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="-134" y1="6" x2="-154" y2="6" class="s-white" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4" />
      </g>
  
      <!-- Массивные анкерные болты, вбитые в базовую линию (Y=84 в локальных координатах = Y=236) -->
      <path d="M -98 58 H -76 L -81 84 H -93 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
      <rect x="-102" y="52" width="30" height="8" rx="2" class="c-white s-dark" stroke-width="1.75" />
  
      <path d="M 76 58 H 98 L 93 84 H 81 Z" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
      <rect x="72" y="52" width="30" height="8" rx="2" class="c-white s-dark" stroke-width="1.75" />
  
      <!-- Архитектурный постамент с окнами-сеткой -->
      <rect x="-86" y="46" width="172" height="38" rx="6" class="c-white s-dark" stroke-width="2.25" />
      <line x1="-44" y1="46" x2="-44" y2="84" class="s-dark" stroke-width="1.75" />
      <line x1="0" y1="46" x2="0" y2="84" class="s-dark" stroke-width="1.75" />
      <line x1="44" y1="46" x2="44" y2="84" class="s-dark" stroke-width="1.75" />
      <line x1="-86" y1="65" x2="86" y2="65" class="s-dark" stroke-width="1.75" />
  
      <!-- Тёмная смещённая тень главного монолита -->
      <rect x="-104" y="-52" width="216" height="102" rx="14" class="c-dark s-white" stroke-width="1.75" />
  
      <!-- Главный белый монолит-плита константы -->
      <rect x="-110" y="-58" width="216" height="102" rx="14" class="c-white s-dark" stroke-width="2.5" />
  
      <!-- Четыре стальные заклёпки по углам плиты -->
      <circle cx="-96" cy="-44" r="4" class="c-dark" />
      <circle cx="92" cy="-44" r="4" class="c-dark" />
      <circle cx="-96" cy="30" r="4" class="c-dark" />
      <circle cx="92" cy="30" r="4" class="c-dark" />
  
      <!-- Тёмная шапка с висячим замком наверху монолита -->
      <g transform="translate(-2, -58)">
        <rect x="-24" y="-16" width="48" height="22" rx="6" class="c-dark s-white" stroke-width="1.75" />
        <path d="M -6 -16 V -23 C -6 -28, 6 -28, 6 -23 V -16" class="s-white" stroke-width="2.25" stroke-linecap="round" />
        <circle cx="0" cy="-5" r="2.5" class="c-white" />
      </g>
  
      <!-- Акцентная плашка с неизменяемым значением const PI = 3.14 -->
      <rect x="-82" y="-26" width="160" height="38" rx="9" class="c-accent s-dark" stroke-width="2" />
      <text x="-2" y="-2.5" text-anchor="middle" class="c-white mono" style="font-size: 14px;">const PI = 3.14</text>
  
      <!-- Невозмутимые гротескные глаза-точки и строгий рот монолита -->
      <circle cx="-24" cy="24" r="3.5" class="c-dark" />
      <circle cx="20" cy="24" r="3.5" class="c-dark" />
      <line x1="-8" y1="26" x2="4" y2="26" class="s-dark" stroke-width="2.25" stroke-linecap="round" />
    </g>
  
    <!-- ПРАВАЯ ЧАСТЬ: Попытка перезаписать константу (= 4.0) отскакивает от силового щита с ошибкой CS0131 -->
    <g transform="translate(718, 152)">
      <!-- Силовой барьер-вспышка при ударе -->
      <g transform="translate(-122, -6)">
        <g class="anim-shield">
          <path d="M 0 -44 L 8 -20 L 24 -28 L 12 -6 L 28 0 L 12 6 L 24 28 L 8 20 L 0 44" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
  
      <!-- Отскакивающая капсула перезаписи = 4.0 -->
      <g transform="translate(-16, -6)">
        <g class="anim-bonk">
          <!-- Тёмная капсула попытки присваивания -->
          <rect x="-56" y="-22" width="112" height="44" rx="22" class="c-dark s-white" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="c-white mono">PI = 4.0</text>
  
          <!-- Стрелка-таран слева от капсулы -->
          <path d="M -64 0 H -82 M -75 -7 L -83 0 L -75 7" class="s-white" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
  
      <!-- Бейдж ошибки компилятора CS0131 -->
      <g transform="translate(22, 46)">
        <rect x="-46" y="-14" width="92" height="28" rx="14" class="c-white s-dark" stroke-width="2" />
        <circle cx="-30" cy="0" r="6" class="c-accent" />
        <path d="M -32.5 -2.5 L -27.5 2.5 M -27.5 -2.5 L -32.5 2.5" class="s-white" stroke-width="1.5" stroke-linecap="round" />
        <text x="8" y="4.5" text-anchor="middle" class="c-dark mono">CS0131</text>
      </g>
    </g>
  </svg>
---

# const

Обычная переменная — это ячейка, значение которой можно перезаписывать сотни раз за кадр. Но что делать с числом Пи, количеством дней в неделе или максимальным запасом здоровья босса? Такие вещи должны быть зафиксированы намертво. Для этого в C# есть ключевое слово `const`.

## Быстрый старт

Объявляем константу и прибиваем значение гвоздями:

```cs
const int MaxLevel = 80;
const double Pi = 3.14159;
const string ServerUrl = "https://api.game.local";

Console.WriteLine(MaxLevel);

// MaxLevel = 90; // Ошибка компиляции CS0131: нельзя менять константу!

```

Шаблон: `const ТипДанных ИмяКонстанты = значение;`

## Зачем это нужно: война с «магическими числами»

Представь, что ты открыл чужой код и видишь там такое:

```cs
if (playerTimer > 86400)
{
    GiveDailyReward();
}

```

Что такое `86400`? Почему именно столько? Если через месяц ты вернёшься к коду, ты будешь сидеть с калькулятором и вспоминать: *«Так, 60 умножить на 60 и на 24... а-а-а, это секунд в сутках»*.

Такие неопознанные цифры посреди логики называют **«магическими числами»** (magic numbers). За них бьют по рукам во всех командах.

Константы решают эту проблему навсегда:

```cs
const int SecondsInDay = 86400;

if (playerTimer > SecondsInDay)
{
    GiveDailyReward();
}

```

Код читается как обычный английский текст, а главное — никто случайно посреди проекта не напишет `SecondsInDay = 500;`. Компилятор просто не даст собрать такую программу.

## Железные правила const

Константы в C# — штука суровая. Компилятор контролирует их на этапе сборки гораздо жёстче обычных переменных.

### 1. Значение задаётся сразу и насовсем

Нельзя объявить константу в одной строчке, а значение положить в следующей:

```cs
const int DefaultSpeed; // Ошибка CS0145: константа обязана иметь значение сразу!
DefaultSpeed = 10;

```

### 2. Только то, что известно ДО запуска программы (Compile-Time)

Значение константы компилятор должен знать прямо в момент сборки кода. Сюда нельзя пихать результат работы методов, вычисления из базы данных или ввод пользователя:

```cs
const int DaysInWeek = 7;             // Отлично: число 7 известно всегда
const int TotalMinutes = 24 * 60;      // Отлично: компилятор сам посчитает 1440 при сборке

// const DateTime Today = DateTime.Now; // Ошибка CS0133: время станет известно только при запуске программы!

```

### 3. Только базовые примитивы

Сделать константой собственный объект или массив нельзя:

```cs
// const Player defaultHero = new Player(); // Ошибка CS0134: нельзя создать константу сложного класса

```

В `const` можно заворачивать только числа (`int`, `double`, `float` и т.д.), логический тип (`bool`), символы (`char`), строки (`string`) и значение `null`.

## Как называть константы в C#

Если ты раньше учил Java, Python или C++, то наверняка привык писать константы огромными буквами через подчёркивание: `MAX_HEALTH`, `API_KEY`.

В C# стандарты другие. По официальному кодстайлу Microsoft константы пишутся в **`PascalCase`**:

* ✔️ `const int MaxAttempts = 3;`
* ✔️ `const double Gravity = 9.8;`
* ❌ `const int MAX_ATTEMPTS = 3;` *(код скомпилируется, но в C# это считается дурным тоном)*

## Под капотом

Константа в C# — это не переменная в привычном понимании. Под неё даже **не выделяется отдельная ячейка памяти** в рантайме.

Компилятор работает как безжалостная автозамена (Find and Replace): везде, где в коде ты написал имя `MaxLevel`, он просто берет и вшивает голое число `80` прямо в процессорные инструкции байт-кода (IL).

> **Подводный камень на будущее:** если в одном проекте у тебя объявлена `public const int Version = 1;`, а другой проект на неё ссылается, то при изменении константы на `2` придётся пересобрать **оба** проекта. Иначе второй проект так и продолжит жить со вшитой единицей. Если значение меняется при каждом запуске, для этого используют другое ключевое слово — `readonly`.
