---
title: Правильный нейминг
keywords: именование нейминг правила именования стиль кода code style camelCase PascalCase snake_case верблюжий регистр регистр транслит переменные CS1001 соглашения си шарп c# csharp
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
  
      @keyframes float-slow {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      @keyframes drift-x {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(8px); }
      }
      @keyframes camel-stride {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-4px) rotate(-0.8deg); }
      }
      @keyframes tail-wag {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(14deg); }
      }
      @keyframes pulse-rays {
        0%, 100% { transform: scale(1); opacity: 0.95; }
        50% { transform: scale(1.07); opacity: 0.55; }
      }
      @keyframes tangle-wobble {
        0%, 100% { transform: rotate(-2deg); }
        50% { transform: rotate(2.5deg); }
      }
      @keyframes dash-flow {
        0% { stroke-dashoffset: 24; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes snake-peek {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3px); }
      }
  
      .anim-cloud {
        transform-box: fill-box;
        transform-origin: center;
        animation: drift-x 6s ease-in-out infinite;
      }
      .anim-tangle {
        transform-box: fill-box;
        transform-origin: center;
        animation: tangle-wobble 3.6s ease-in-out infinite;
      }
      .anim-camel {
        transform-box: fill-box;
        transform-origin: center;
        animation: camel-stride 3.2s ease-in-out infinite;
      }
      .anim-tail {
        transform-box: fill-box;
        transform-origin: right top;
        animation: tail-wag 1.8s ease-in-out infinite;
      }
      .anim-rays {
        transform-box: fill-box;
        transform-origin: center;
        animation: pulse-rays 2.6s ease-in-out infinite;
      }
      .anim-card {
        transform-box: fill-box;
        transform-origin: center;
        animation: float-slow 3.8s ease-in-out infinite;
      }
      .anim-dash {
        animation: dash-flow 1.4s linear infinite;
      }
      .anim-snake {
        transform-box: fill-box;
        transform-origin: center;
        animation: snake-peek 2.8s ease-in-out infinite;
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
    <path d="M 54 34 H 34 V 246 H 54" class="s-white" stroke-width="2.5" stroke-linecap="square" />
    <path d="M 846 34 H 866 V 246 H 846" class="s-white" stroke-width="2.5" stroke-linecap="square" />
  
    <!-- Лаконичные контурные облака -->
    <g transform="translate(225, 44)">
      <g class="anim-cloud">
        <path d="M -28 8 H 28 C 34 8 38 3 37 -2 C 36 -8 30 -11 24 -10 C 21 -18 12 -22 3 -19 C -4 -25 -16 -23 -20 -14 C -28 -14 -34 -8 -33 0 C -33 5 -31 8 -28 8 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
    <g transform="translate(615, 38)">
      <g class="anim-cloud">
        <path d="M -20 6 H 20 C 25 6 28 2 27 -2 C 26 -6 21 -8 17 -7 C 14 -13 7 -15 1 -13 C -4 -17 -12 -15 -15 -9 C -21 -9 -25 -5 -24 1 C -24 4 -22 6 -20 6 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
      </g>
    </g>
  
    <!-- Мелкие белые кружки-искры -->
    <circle cx="282" cy="82" r="3" class="c-white" />
    <circle cx="584" cy="76" r="2.5" class="c-white" />
    <circle cx="628" cy="228" r="3" class="c-white" />
    <circle cx="96" cy="74" r="2.5" class="c-white" />
  
    <!-- ЛЕВАЯ ЧАСТЬ: Запутанный клубок транслита skolkomonet -->
    <g transform="translate(155, 148)">
      <g class="anim-tangle">
        <!-- Основа клубка (тёмная заливка с обязательной светлой обводкой на фоне hero) -->
        <circle cx="0" cy="-6" r="44" class="c-dark s-white" stroke-width="1.75" />
        <!-- Хаотичные нити внутри клубка -->
        <path d="M -32 -22 C -10 -44, 34 -30, 26 -2 C 18 24, -34 18, -28 -10 C -22 -36, 20 -38, 34 -12 C 42 4, 14 34, -14 26 C -38 18, -36 -18, -8 -28 C 14 -34, 30 -8, 12 14" class="s-white" stroke-width="1.6" stroke-linecap="round" />
        <path d="M -18 24 C -4 38, 28 26, 36 4 M -40 -4 C -46 -18, -32 -38, -14 -42" class="s-white" stroke-width="1.6" stroke-linecap="round" />
        <!-- Растерянные гротескные глазки клубка -->
        <circle cx="-11" cy="-8" r="6" class="c-white s-dark" stroke-width="1.5" />
        <circle cx="9" cy="-8" r="6" class="c-white s-dark" stroke-width="1.5" />
        <circle cx="-13" cy="-9" r="2.2" class="c-dark" />
        <circle cx="11" cy="-7" r="2.2" class="c-dark" />
  
        <!-- Тёмная капсула с транслитом и перечёркиванием -->
        <g transform="translate(0, 44) rotate(-4)">
          <rect x="-58" y="-14" width="116" height="28" rx="14" class="c-dark s-white" stroke-width="1.75" />
          <text x="0" y="4.5" text-anchor="middle" class="c-white mono">skolkomonet</text>
          <line x1="-46" y1="7" x2="46" y2="-7" class="s-white" stroke-width="2" stroke-linecap="round" />
        </g>
      </g>
    </g>
  
    <!-- Связующая пунктирная дуга от хаоса к порядку -->
    <path d="M 224 142 C 254 128, 276 128, 302 142" class="s-white anim-dash" stroke-width="2" stroke-dasharray="5 5" stroke-linecap="round" />
    <path d="M 296 135 L 304 143 L 293 145" class="s-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
    <!-- ЦЕНТР: Главная метафора — двугорбый верблюд camelCase с короной PascalCase -->
    <g transform="translate(442, 148)">
      <!-- Опорная линия земли -->
      <line x1="-115" y1="88" x2="115" y2="88" class="s-white" stroke-width="2" stroke-linecap="round" />
  
      <g class="anim-camel">
        <!-- Хвост верблюда -->
        <g transform="translate(-62, -4)">
          <g class="anim-tail">
            <path d="M 0 0 C -16 6, -20 22, -14 34" class="s-white" stroke-width="2.5" stroke-linecap="round" />
            <path d="M -14 34 L -19 42 M -14 34 L -13 43 M -14 34 L -8 41" class="s-white" stroke-width="1.75" stroke-linecap="round" />
          </g>
        </g>
  
        <!-- Задние и передние ноги -->
        <path d="M -44 26 L -48 86 M -26 28 L -22 86 M 32 28 L 28 86 M 48 24 L 54 86" class="s-white" stroke-width="5.5" stroke-linecap="round" />
        <path d="M -44 26 L -48 86 M -26 28 L -22 86 M 32 28 L 28 86 M 48 24 L 54 86" class="s-dark" stroke-width="2" stroke-linecap="round" />
        <!-- Копытца -->
        <rect x="-53" y="81" width="10" height="7" rx="2" class="c-dark s-white" stroke-width="1.5" />
        <rect x="-27" y="81" width="10" height="7" rx="2" class="c-dark s-white" stroke-width="1.5" />
        <rect x="23" y="81" width="10" height="7" rx="2" class="c-dark s-white" stroke-width="1.5" />
        <rect x="49" y="81" width="10" height="7" rx="2" class="c-dark s-white" stroke-width="1.5" />
  
        <!-- Силуэт верблюда с двумя выразительными горбами (camelCase) -->
        <path d="M -62 -2 C -64 -26, -46 -46, -30 -46 C -16 -46, -10 -24, 0 -24 C 10 -24, 16 -52, 32 -52 C 48 -52, 54 -22, 62 -18 C 72 -14, 78 -36, 78 -56 C 78 -68, 86 -74, 98 -74 C 108 -74, 114 -68, 114 -60 C 114 -52, 106 -48, 96 -48 C 92 -48, 92 -22, 82 -4 C 72 16, 62 32, 34 32 H -34 C -54 32, -60 16, -62 -2 Z" class="c-white s-dark" stroke-width="2.25" stroke-linejoin="round" />
  
        <!-- Акцентная попона-седло, подчёркивающая два горба (c + C) -->
        <path d="M -46 -12 C -44 -30, -36 -38, -30 -38 C -22 -38, -14 -16, 0 -16 C 14 -16, 22 -44, 32 -44 C 40 -44, 46 -32, 48 -12 C 32 -6, -30 -6, -46 -12 Z" class="c-accent s-dark" stroke-width="1.75" stroke-linejoin="round" />
  
        <!-- Буквы регистров на горбах: строчная c и заглавная C -->
        <text x="-30" y="-21" text-anchor="middle" class="c-white mono">c</text>
        <text x="32" y="-23" text-anchor="middle" class="c-white mono" style="font-size: 16px;">C</text>
  
        <!-- Корона PascalCase на голове верблюда -->
        <path d="M 84 -74 L 81 -90 L 90 -83 L 96 -93 L 102 -83 L 111 -90 L 108 -74 Z" class="c-dark s-white" stroke-width="1.5" stroke-linejoin="round" />
  
        <!-- Гротескные глаза и ухмылка верблюда -->
        <circle cx="94" cy="-63" r="4.5" class="c-white s-dark" stroke-width="1.5" />
        <circle cx="95.5" cy="-63" r="2" class="c-dark" />
        <path d="M 102 -54 C 106 -52, 110 -54, 112 -57" class="s-dark" stroke-width="1.75" stroke-linecap="round" />
        <!-- Ушко -->
        <path d="M 80 -68 C 73 -72, 72 -64, 78 -62" class="c-white s-dark" stroke-width="1.75" stroke-linecap="round" />
      </g>
  
      <!-- Маленькая змейка snake_case снизу (прячется в C#) -->
      <g transform="translate(-88, 76)">
        <g class="anim-snake">
          <path d="M -18 12 C -18 2, -6 2, -6 10 C -6 16, 6 16, 6 6 C 6 -4, 18 -6, 22 2" class="s-dark" stroke-width="7" stroke-linecap="round" />
          <path d="M -18 12 C -18 2, -6 2, -6 10 C -6 16, 6 16, 6 6 C 6 -4, 18 -6, 22 2" class="s-white" stroke-width="2" stroke-linecap="round" />
          <circle cx="20" cy="0" r="5" class="c-dark s-white" stroke-width="1.5" />
          <circle cx="21" cy="-1" r="1.4" class="c-white" />
          <path d="M 25 2 L 31 0 M 28 1 L 31 4" class="s-white" stroke-width="1.3" stroke-linecap="round" />
        </g>
      </g>
    </g>
  
    <!-- ПРАВАЯ ЧАСТЬ: Окно код-ревью с чистым именем и кинетическими лучами -->
    <g transform="translate(722, 142)">
      <!-- Пульсирующие белые кинетические лучи-вспышка вокруг карточки -->
      <g class="anim-rays">
        <line x1="-96" y1="-56" x2="-112" y2="-68" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="0" y1="-64" x2="0" y2="-84" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="96" y1="-56" x2="112" y2="-68" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="106" y1="0" x2="124" y2="0" class="s-white" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4" />
        <line x1="96" y1="56" x2="112" y2="68" class="s-white" stroke-width="2" stroke-linecap="round" />
        <line x1="-96" y1="56" x2="-112" y2="68" class="s-white" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4" />
      </g>
  
      <!-- Карточка-окно в стиле «Доки» -->
      <g class="anim-card">
        <!-- Тёмная смещённая подложка с белой обводкой -->
        <rect x="-80" y="-42" width="168" height="92" rx="10" class="c-dark s-white" stroke-width="1.75" />
        <!-- Основное белое окно -->
        <rect x="-86" y="-48" width="168" height="92" rx="10" class="c-white s-dark" stroke-width="2" />
        <!-- Шапка окна с тремя точками -->
        <line x1="-86" y1="-26" x2="82" y2="-26" class="s-dark" stroke-width="1.75" />
        <circle cx="-72" cy="-37" r="3" class="c-dark" />
        <circle cx="-62" cy="-37" r="3" class="c-accent" />
        <circle cx="-52" cy="-37" r="3" class="c-dark" />
  
        <!-- Акцентная плашка с эталонным именем coinsCount -->
        <rect x="-68" y="-12" width="132" height="32" rx="8" class="c-accent s-dark" stroke-width="1.75" />
        <text x="-2" y="8.5" text-anchor="middle" class="c-white mono">coinsCount</text>
  
        <!-- Значок одобренного код-ревью (галочка) -->
        <g transform="translate(74, -44)">
          <circle cx="0" cy="0" r="15" class="c-dark s-white" stroke-width="2" />
          <path d="M -6 0 L -2 5 L 7 -5" class="s-white" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
    </g>
  </svg>
---

# Правила именования

Почему компилятор спокойно съест skolko_monet, а на код-ревью за это оторвут руки? Разбираем, где в C# живут «верблюды», куда прятать подчёркивания и как называть вещи, чтобы код читали без слёз.
## Шпаргалка: где какой регистр

В C# всё держится на двух базовых регистрах. Запомнить, где что использовать:

| Что называем | Стиль | Пример |
| --- | --- | --- |
| Локальные переменные | `camelCase` | `playerHealth`, `totalScore` |
| Параметры методов | `camelCase` | `(int damage, string userName)` |
| Методы, классы, свойства | `PascalCase` | `TakeDamage()`, `EnemyController` |
| Константы | `PascalCase` | `MaxEnemies`, `DefaultTimeout` |
| Приватные поля классов | `_camelCase` | `_currentSpeed`, `_isDead` |

---

## Два главных стиля: camelCase и PascalCase

### 1. camelCase (верблюжий регистр)

Первое слово пишется с **маленькой** буквы, каждое следующее — с **заглавной**. Визуально похоже на горбы верблюда:

```cs
int itemsCount = 5;
bool isGameOver = false;

```

*Используется:* для переменных внутри методов и для входящих параметров в методах.

### 2. PascalCase (стиль Паскаля)

Каждое слово пишется с **заглавной** буквы, включая самое первое:

```cs
public class PlayerManager { }

public void AttackTarget() { }

public const int MaxLevel = 100;

```

*Используется:* для названий классов, структур, методов, свойств (`get`/`set`) и констант.

---

## Железные правила C#

Эти три вещи проверяет сам компилятор:

1. **Только латиница, цифры и `_`:** Никаких пробелов, дефисов и спецсимволов. И хотя C# технически переварит `int монеты = 10;`, за русский язык в именах выгонят из любого проекта.
2. **Цифра не может быть первой:** `int player1;` — отлично, `int 1player;` — ошибка компиляции `CS1001`.
3. **Ключевые слова запрещены:** нельзя назвать переменную `int`, `string` или `class`. Если жизненно необходимо использовать занятое слово, ставят собачку `@` перед именем (`string @class;`), но на практике лучше просто подобрать синоним (`itemClass`).


---

## За что бьют лопатой по хребтине?

### 1. Транслит

* ❌ `int kolvoVragov;`
* ❌ `string imyaPolzovatelya;`
* ✔️ `int enemiesCount;`
* ✔️ `string userName;`

Если не знаешь слово на английском — открой переводчик на две секунды. Транслит делает код нечитаемым для любого стороннего разработчика.

### 2. Однобуквенные переменные

Имена `a`, `b`, `c`, `x`, `temp` разрешены ровно в двух случаях:

* Как счётчики в коротких циклах: `for (int i = 0; i < 10; i++)`
* В чистой школьной геометрии: `int x`, `int y` для координат.

В остальных случаях имя переменной обязано отвечать на вопрос **«что внутри»**: не `int d;`, а `int damage;`.

### 3. snake_case (змеиный регистр)

* ❌ `int max_player_health;`
* ✔️ `int maxPlayerHealth;`

Нижнее подчёркивание между словами принято в Python, PHP и базах данных SQL. В C# нижнее подчёркивание в именах переменных считается грубым нарушением кодстайла (исключение — знак `_` в начале имени приватных полей: `_health`).

### 4. «Венгерская нотация» (привет из 90-х)

* ❌ `int iCount;`, `string strName;`, `bool bIsAlive;`
* ✔️ `int count;`, `string name;`, `bool isAlive;`

В современных средах разработки (Visual Studio, Rider, VS Code) тип переменной виден сразу при наведении мыши. Дописывать тип в начало названия не нужно.

---

## Булевы флаги (bool)

Для логических переменных (`true`/`false`) принято использовать приставки-вопросы: `is`, `has`, `can`:

```cs
bool isAlive = true;       // жив ли?
bool hasKey = false;       // есть ли ключ?
bool canJump = true;       // может ли прыгать?

```

Такие имена превращают условия `if` в обычный читаемый английский язык: `if (canJump && isAlive)`.
