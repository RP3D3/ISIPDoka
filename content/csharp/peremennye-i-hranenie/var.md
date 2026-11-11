---
title: var
keywords: var неявная типизация вывод типа объявление переменной компилятор строгая типизация CS0818 CS0815 си шарп c# csharp синтаксический сахар
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
        50% { transform: translateX(8px); }
      }
      @keyframes var-hop {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-5px) rotate(-1.5deg); }
      }
      @keyframes eye-peek {
        0%, 35%, 100% { transform: translateX(0px); }
        50%, 85% { transform: translateX(3.5px); }
      }
      @keyframes machine-hum {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-2.5px); }
      }
      @keyframes gear-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes scan-beam {
        0%, 100% { transform: translateY(-14px); opacity: 0.95; }
        50% { transform: translateY(14px); opacity: 0.45; }
      }
      @keyframes rays-pulse {
        0%, 100% { transform: scale(1); opacity: 0.95; }
        50% { transform: scale(1.07); opacity: 0.5; }
      }
      @keyframes dash-flow {
        0% { stroke-dashoffset: 24; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes card-float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }
  
      .anim-cloud {
        transform-box: fill-box;
        transform-origin: center;
        animation: drift-cloud 6.5s ease-in-out infinite;
      }
      .anim-var {
        transform-box: fill-box;
        transform-origin: center;
        animation: var-hop 3s ease-in-out infinite;
      }
      .anim-eye {
        transform-box: fill-box;
        transform-origin: center;
        animation: eye-peek 3.8s ease-in-out infinite;
      }
      .anim-machine {
        transform-box: fill-box;
        transform-origin: center;
        animation: machine-hum 2.8s ease-in-out infinite;
      }
      .anim-gear {
        transform-box: fill-box;
        transform-origin: center;
        animation: gear-spin 9s linear infinite;
      }
      .anim-beam {
        transform-box: fill-box;
        transform-origin: center;
        animation: scan-beam 2.4s ease-in-out infinite;
      }
      .anim-rays {
        transform-box: fill-box;
        transform-origin: center;
        animation: rays-pulse 2.5s ease-in-out infinite;
      }
      .anim-dash {
        animation: dash-flow 1.3s linear infinite;
      }
      .anim-card {
        transform-box: fill-box;
        transform-origin: center;
        animation: card-float 3.6s ease-in-out infinite;
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
    <g transform="translate(230, 44)">
      <g class="anim-cloud">
        <path d="M -26 7 H 26 C 32 7 35 3 34 -2 C 33 -7 28 -10 22 -9 C 19 -16 11 -20 3 -17 C -4 -22 -15 -20 -18 -12 C -26 -12 -31 -7 -30 0 C -30 4 -28 7 -26 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
    <g transform="translate(632, 42)">
      <g class="anim-cloud">
        <path d="M -20 6 H 20 C 25 6 28 2 27 -2 C 26 -6 21 -8 17 -7 C 14 -13 7 -15 1 -13 C -4 -17 -12 -15 -15 -9 C -21 -9 -25 -5 -24 1 C -24 4 -22 6 -20 6 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- Мелкие белые кружки-искры -->
    <circle cx="294" cy="76" r="3" class="c-white" />
    <circle cx="586" cy="70" r="2.5" class="c-white" />
    <circle cx="606" cy="218" r="3" class="c-white" />
    <circle cx="92" cy="74" r="2.5" class="c-white" />
  
    <!-- Опорная базовая линия -->
    <line x1="76" y1="234" x2="824" y2="234" class="s-white" stroke-width="2.25" stroke-linecap="round" />
  
    <!-- ЛЕВАЯ ЧАСТЬ: Одушевлённый компактный тег var, косящийся направо -->
    <g transform="translate(154, 154)">
      <g class="anim-var">
        <!-- Ножки-пружинки -->
        <path d="M -18 32 V 78 M 18 32 V 78" class="s-white" stroke-width="2.5" stroke-linecap="round" />
        <rect x="-25" y="73" width="14" height="7" rx="3.5" class="c-dark s-white" stroke-width="1.5" />
        <rect x="11" y="73" width="14" height="7" rx="3.5" class="c-dark s-white" stroke-width="1.5" />
  
        <!-- Тёмная смещённая подложка капсулы со светлой обводкой -->
        <rect x="-46" y="-26" width="98" height="62" rx="18" class="c-dark s-white" stroke-width="1.75" />
        <!-- Основной белый корпус-капсула var -->
        <rect x="-52" y="-32" width="98" height="62" rx="18" class="c-white s-dark" stroke-width="2.25" />
  
        <!-- Гротескные глазки сверху, подглядывающие в правую часть -->
        <circle cx="-16" cy="-34" r="9" class="c-white s-dark" stroke-width="2" />
        <circle cx="10" cy="-34" r="9" class="c-white s-dark" stroke-width="2" />
        <g class="anim-eye">
          <circle cx="-14" cy="-34" r="3.2" class="c-dark" />
          <circle cx="12" cy="-34" r="3.2" class="c-dark" />
        </g>
  
        <!-- Акцентная плашка с ключевым словом var -->
        <rect x="-36" y="-14" width="66" height="28" rx="8" class="c-accent s-dark" stroke-width="1.75" />
        <text x="-3" y="4.5" text-anchor="middle" class="c-white mono">var</text>
  
        <!-- Знак присваивания = справа от корпуса -->
        <g transform="translate(64, 0)">
          <circle cx="0" cy="0" r="14" class="c-dark s-white" stroke-width="1.75" />
          <line x1="-5" y1="-3" x2="5" y2="-3" class="s-white" stroke-width="2.25" stroke-linecap="round" />
          <line x1="-5" y1="3" x2="5" y2="3" class="s-white" stroke-width="2.25" stroke-linecap="round" />
        </g>
      </g>
    </g>
  
    <!-- Связующий импульс от var к компилятору-анализатору -->
    <path d="M 238 154 H 316" class="s-white anim-dash" stroke-width="2" stroke-dasharray="5 5" stroke-linecap="round" />
    <path d="M 309 148 L 317 154 L 309 160" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- ЦЕНТР: Архитектурный механизм компилятора (анализатор типа с окнами-сеткой и шестерёнкой) -->
    <g transform="translate(442, 146)">
      <!-- Кинетические лучи вокруг механизма -->
      <g class="anim-rays">
        <line x1="-104" y1="-64" x2="-122" y2="-76" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="0" y1="-78" x2="0" y2="-96" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="104" y1="-64" x2="122" y2="-76" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="114" y1="22" x2="132" y2="28" class="s-white" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4" />
      </g>
  
      <g class="anim-machine">
        <!-- Опоры-стойки машины на базовой линии -->
        <rect x="-64" y="54" width="16" height="34" rx="4" class="c-dark s-white" stroke-width="1.75" />
        <rect x="48" y="54" width="16" height="34" rx="4" class="c-dark s-white" stroke-width="1.75" />
  
        <!-- Труба-антенна компилятора сверху -->
        <path d="M -42 -56 V -74 H -24 V -56" class="c-dark s-white" stroke-width="1.75" stroke-linejoin="round" />
        <circle cx="-33" cy="-84" r="4" class="c-white" />
  
        <!-- Главный корпус механизма (белый фасад с тёмным контуром) -->
        <rect x="-86" y="-56" width="172" height="114" rx="14" class="c-white s-dark" stroke-width="2.25" />
  
        <!-- Тёмная крыша-козырёк механизма -->
        <path d="M -86 -36 H 86 V -44 C 86 -51 80 -56 72 -56 H -72 C -80 -56 -86 -51 -86 -44 Z" class="c-dark s-dark" stroke-width="1.5" />
        <circle cx="-70" cy="-46" r="2.8" class="c-white" />
        <circle cx="-60" cy="-46" r="2.8" class="c-accent" />
        <circle cx="-50" cy="-46" r="2.8" class="c-white" />
  
        <!-- Архитектурные окна-сетка слева (фирменный приём стиля «Доки») -->
        <rect x="-68" y="-22" width="54" height="44" rx="6" class="c-accent s-dark" stroke-width="1.75" />
        <line x1="-50" y1="-22" x2="-50" y2="22" class="s-dark" stroke-width="1.5" />
        <line x1="-32" y1="-22" x2="-32" y2="22" class="s-dark" stroke-width="1.5" />
        <line x1="-68" y1="-7" x2="-14" y2="-7" class="s-dark" stroke-width="1.5" />
        <line x1="-68" y1="7" x2="-14" y2="7" class="s-dark" stroke-width="1.5" />
  
        <!-- Оптический объектив-сканер справа, направленный на конструктор -->
        <g transform="translate(36, 0)">
          <circle cx="0" cy="0" r="28" class="c-dark s-dark" stroke-width="2" />
          <g class="anim-gear">
            <circle cx="0" cy="0" r="20" class="s-white" stroke-width="2" stroke-dasharray="5 4" />
          </g>
          <circle cx="0" cy="0" r="12" class="c-accent s-white" stroke-width="1.75" />
          <circle cx="-3" cy="-3" r="3" class="c-white" />
        </g>
  
        <!-- Прорезь принтера снизу с выезжающей бирочкой-результатом -->
        <line x1="-56" y1="38" x2="56" y2="38" class="s-dark" stroke-width="3" stroke-linecap="round" />
        <rect x="-42" y="38" width="84" height="26" rx="6" class="c-dark s-white" stroke-width="1.75" />
        <line x1="-26" y1="48" x2="26" y2="48" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="-16" y1="55" x2="16" y2="55" class="s-white" stroke-width="2" stroke-linecap="round" />
      </g>
  
      <!-- Правый тубус сканера и бегущий луч-анализатор к конструктору -->
      <rect x="86" y="-14" width="16" height="28" rx="4" class="c-dark s-white" stroke-width="1.75" />
      <line x1="104" y1="0" x2="178" y2="0" class="s-white anim-dash" stroke-width="2.25" stroke-dasharray="6 5" stroke-linecap="round" />
      <path d="M 171 -6 L 179 0 L 171 6" class="s-white" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  
    <!-- ПРАВАЯ ЧАСТЬ: Карточка конструктора new List<int>() с вертикальным сканирующим лучом -->
    <g transform="translate(724, 154)">
      <g class="anim-card">
        <!-- Тёмная смещённая подложка -->
        <rect x="-76" y="-42" width="160" height="98" rx="14" class="c-dark s-white" stroke-width="1.75" />
        <!-- Основное светлое окно конструктора -->
        <rect x="-82" y="-48" width="160" height="98" rx="14" class="c-white s-dark" stroke-width="2.25" />
  
        <!-- Шапка окна с тремя точками -->
        <line x1="-82" y1="-26" x2="78" y2="-26" class="s-dark" stroke-width="1.75" />
        <circle cx="-68" cy="-37" r="2.8" class="c-dark" />
        <circle cx="-58" cy="-37" r="2.8" class="c-accent" />
        <circle cx="-48" cy="-37" r="2.8" class="c-dark" />
  
        <!-- Акцентная плашка с правым выражением (источником типа) -->
        <rect x="-66" y="-12" width="128" height="32" rx="8" class="c-accent s-dark" stroke-width="1.75" />
        <text x="-2" y="8.5" text-anchor="middle" class="c-white mono">new List<int>()</text>
  
        <!-- Схематичные ячейки списка снизу -->
        <rect x="-62" y="28" width="24" height="12" rx="3" class="c-dark" />
        <rect x="-32" y="28" width="24" height="12" rx="3" class="c-accent" />
        <rect x="-2" y="28" width="24" height="12" rx="3" class="c-dark" />
        <rect x="28" y="28" width="24" height="12" rx="3" class="c-accent" />
  
        <!-- Сканирующая полоса компилятора поверх плашки -->
        <g class="anim-beam">
          <line x1="-74" y1="4" x2="70" y2="4" class="s-dark" stroke-width="2" stroke-dasharray="4 3" stroke-linecap="round" />
        </g>
  
        <!-- Значок успешно выведенного типа (галочка) -->
        <g transform="translate(72, -44)">
          <circle cx="0" cy="0" r="15" class="c-dark s-white" stroke-width="2" />
          <path d="M -6 0 L -2 5 L 7 -5" class="s-white" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
    </g>
  </svg>
---

# var

Зачем вручную писать гигантский тип данных в начале строки, если в конце ты всё равно вызываешь его конструктор? Для этого придумали `var` — способ сказать компилятору: *«Посмотри, что я кладу справа, и сам определи тип»*.

## Быстрый старт

Вместо явного указания типа пишем ключевое слово `var`:

```cs
var health = 100;           // Компилятор видит 100 -> ставит int
var playerName = "Alex";    // Видит кавычки -> ставит string
var isAlive = true;         // Видит true -> ставит bool

```

Смысл простой: компилятор сам подставит тип данных в момент сборки программы.

## Главный миф: var — это НЕ JavaScript

Новички часто думают, что с `var` переменная превращается в бездонную бочку, куда можно пихать всё подряд по очереди (как в JS или Python). **Это не так.**

C# остаётся строго типизированным языком. Тип для `var` вычисляется **один раз на этапе компиляции** и намертво прибивается к переменной:

```cs
var score = 10; // C# навсегда зафиксировал: score — это int
score = 25;     // Всё отлично, это число

// score = "Пятьдесят"; // Ошибка CS0029: Нельзя положить string в int!

```

Никакой магии в реальном времени не происходит: после компиляции строки `var x = 5;` и `int x = 5;` в байт-коде выглядят абсолютно одинаково.

## Где использовать в кайф, а где лучше явно

`var` — это инструмент для глаз, а не способ лениться думать о типах.

### ✔️ Когда var идеален: тип очевиден из правой части

Когда справа и так чёрным по белому написано, что создаётся, дублировать название типа слева — пустая трата места:

```cs
// Без var (масло масляное):
Dictionary<string, List<int>> userScores = new Dictionary<string, List<int>>();

// С var (чисто и читаемо):
var userScores = new Dictionary<string, List<int>>();

```

То же самое с примитивами и явным созданием объектов:

```cs
var player = new Player();
var message = "Загрузка...";

```

### ❌ Когда var только мешает: тип спрятан

Если глядя на строку ты не можешь сразу сказать, что вернётся — пиши тип явно:

```cs
// Плохо: что возвращает LoadData()? Число? Строку? Объект с сервера?
var result = LoadData(); 

// Хорошо: сразу понятно, с чем работаем
UserData result = LoadData();

```

## Где var сломается (правила компилятора)

Компилятор должен **на 100% понимать**, какой тип подставить. Если у него есть хоть капля сомнений — сборка упадёт.

### 1. Нельзя объявить без значения

```cs
var coins; // Ошибка CS0818: Неявно типизированная переменная должна быть инициализирована!
coins = 10;

```

Компилятор не умеет читать мысли и смотреть «в будущее» кода. Он обязан знать тип прямо в момент объявления строки.

### 2. Нельзя присвоить null без подсказки

```cs
var user = null; // Ошибка CS0815: Нельзя присвоить <null> неявно типизированной переменной

```

`null` может быть ссылкой на что угодно: строку, класс, массив. Компилятор не знает, что именно выбрать.

### 3. Только внутри методов (локальные переменные)

`var` работает **только для локальных переменных** внутри методов, условий и циклов. Его нельзя использовать для полей внутри класса:

```cs
class Enemy
{
    // var speed = 10; // Ошибка: поля класса должны иметь явный тип!
    int speed = 10;    // Так правильно
}

```

## Под капотом

`var` — это чистый «синтаксический сахар». Он существует только в исходном коде для удобства программиста.

Когда компилятор `Roslyn` превращает C# код в промежуточный IL-байт-код, он вместо слова `var` физически прописывает настоящий тип (`System.Int32`, `System.String` и т.д.). В рантайме программа с `var` работает ровно с той же наносекундной скоростью, как если бы типы были прописаны руками. Нулевая просадка по памяти и процессору.
