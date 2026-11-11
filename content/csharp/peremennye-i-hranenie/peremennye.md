---
title: Переменные
keywords: переменная переменные объявление инициализация присваивание область видимости scope скоуп именование camelCase синтаксис память CS0165 CS0128 CS0029 си шарп c# csharp
svg: |
  <svg viewBox="0 0 900 280" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 900px; max-height: 280px; height: auto; display: block; margin: 0 auto 20px;">
  <style>
  .light-fill { fill: var(--text-main, #ffffff); }
  .dark-fill { fill: var(--bg-main, #222429); }
  .accent-fill { fill: var(--domain-accent, #614fa8); }
  
  .light-stroke { stroke: var(--text-main, #ffffff); stroke-width: 1.75px; stroke-linecap: round; stroke-linejoin: round; }
  .dark-stroke { stroke: var(--bg-main, #222429); stroke-width: 2px; stroke-linecap: round; stroke-linejoin: round; }
  .accent-stroke { stroke: var(--domain-accent, #614fa8); stroke-width: 2px; stroke-linecap: round; stroke-linejoin: round; }
  
  .char-hair { fill: var(--bg-main, #222429); stroke: var(--text-main, #ffffff); stroke-width: 1.75px; stroke-linejoin: round; }
  .char-skin { fill: var(--domain-accent, #614fa8); stroke: var(--bg-main, #222429); stroke-width: 2px; stroke-linejoin: round; }
  .char-shirt { fill: var(--text-main, #ffffff); stroke: var(--bg-main, #222429); stroke-width: 2px; stroke-linejoin: round; }
  
  .mono-badge { font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700; fill: var(--domain-accent, #614fa8); }
  .mono-drawer { font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700; fill: var(--bg-main, #222429); }
  
  @keyframes eyeGlance {
    0%, 100% { transform: translateX(0px); }
    45% { transform: translateX(3px); }
    75% { transform: translateX(3px); }
  }
  
  @keyframes handSwing {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(-9deg); }
  }
  
  @keyframes cloudDrift {
    0%, 100% { transform: translateX(0px); }
    50% { transform: translateX(8px); }
  }
  
  @keyframes sparkPulse {
    0%, 100% { transform: scale(1); opacity: 0.9; }
    50% { transform: scale(1.16); opacity: 1; }
  }
  
  @keyframes drawerFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }
  
  .anim-eyes {
    animation: eyeGlance 4s ease-in-out infinite;
  }
  
  .anim-hand {
    transform-box: fill-box;
    transform-origin: 15% 85%;
    animation: handSwing 2.8s ease-in-out infinite;
  }
  
  .anim-cloud {
    animation: cloudDrift 5.5s ease-in-out infinite;
  }
  
  .anim-spark {
    transform-box: fill-box;
    transform-origin: center;
    animation: sparkPulse 2.2s ease-in-out infinite;
  }
  
  .anim-float {
    animation: drawerFloat 3s ease-in-out infinite;
  }
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transform: none !important;
      opacity: 1 !important;
    }
  }
  </style>
  
  <!-- Decorative Outline Cloud & Left Scope Bracket -->
  <g transform="translate(88, 34)">
  <g class="anim-cloud">
  <path d="M0,22 C-8,22 -14,16 -14,9 C-14,3 -9,-2 -3,-3 C0,-10 8,-14 16,-12 C23,-10 28,-4 28,3 C34,4 38,9 38,15 C38,20 33,22 27,22 Z" class="light-stroke" />
  </g>
  </g>
  
  <g transform="translate(52, 86)">
  <path d="M18,0 L6,0 L6,118 L18,118" class="light-stroke" />
  </g>
  
  <!-- LEFT SECTION (X: 60-240): Editorial Character Assigning a Value -->
  <g transform="translate(155, 148)">
  <!-- Light Editorial Backdrop Card so character skin/details have crisp high-contrast framing -->
  <rect x="-74" y="-82" width="148" height="174" rx="18" class="light-fill" />
  
  <!-- Character Torso -->
  <path d="M-46,92 C-46,56 -26,42 0,42 C26,42 46,56 46,92 Z" class="char-shirt" />
  <!-- Collar / Tie Detail -->
  <polygon points="-10,42 10,42 0,58" class="accent-fill" />
  <polygon points="-10,42 10,42 0,58" class="dark-stroke" />
  
  <!-- Neck -->
  <rect x="-9" y="24" width="18" height="22" rx="6" class="char-skin" />
  
  <!-- Back Hair Silhouette -->
  <path d="M-38,-18 C-44,-46 -22,-68 6,-66 C32,-64 46,-44 40,-14 C44,2 38,18 26,22 L-26,22 C-38,18 -42,2 -38,-18 Z" class="char-hair" />
  
  <!-- Round Ear with Diagonal Slash -->
  <circle cx="-33" cy="-8" r="9" class="char-skin" />
  <line x1="-36" y1="-11" x2="-30" y2="-5" class="dark-stroke" />
  
  <!-- Face -->
  <path d="M-26,-34 L26,-34 L26,4 C26,19 14,28 0,28 C-14,28 -26,19 -26,4 Z" class="char-skin" />
  
  <!-- Geometric Bangs -->
  <polygon points="-28,-38 28,-38 28,-18 8,-28 -6,-16 -28,-26" class="char-hair" />
  
  <!-- Rectangular Glasses -->
  <rect x="-21" y="-14" width="18" height="13" rx="2" class="light-fill" />
  <rect x="-21" y="-14" width="18" height="13" rx="2" class="dark-stroke" />
  <rect x="4" y="-14" width="18" height="13" rx="2" class="light-fill" />
  <rect x="4" y="-14" width="18" height="13" rx="2" class="dark-stroke" />
  <line x1="-3" y1="-8" x2="4" y2="-8" class="dark-stroke" />
  
  <!-- Animated Pupils -->
  <g class="anim-eyes">
  <circle cx="-11" cy="-7" r="2.5" class="dark-fill" />
  <circle cx="14" cy="-7" r="2.5" class="dark-fill" />
  </g>
  
  <!-- Nose & Witty Smirk -->
  <polyline points="1,-6 4,4 -1,5" class="dark-stroke" />
  <path d="M-6,13 Q2,17 10,12" class="dark-stroke" />
  
  <!-- Animated Right Arm Holding Value Token -->
  <g class="anim-hand">
  <path d="M36,56 L74,26 L84,38 L44,72 Z" class="char-shirt" />
  <!-- Grotesque Hand with Semicircular Nails -->
  <circle cx="84" cy="26" r="11" class="char-skin" />
  <path d="M88,18 A3,3 0 0 1 92,22" class="light-stroke" />
  <path d="M90,25 A3,3 0 0 1 93,29" class="light-stroke" />
  <!-- Value Token Held in Hand -->
  <rect x="74" y="-6" width="54" height="24" rx="12" class="dark-fill" />
  <rect x="74" y="-6" width="54" height="24" rx="12" class="light-stroke" />
  <text x="101" y="10" text-anchor="middle" style="font-family: &#39;JetBrains Mono&#39;, monospace; font-size: 12px; font-weight: 700; fill: var(--text-main, #ffffff);">= 100</text>
  </g>
  </g>
  
  <!-- CENTER SECTION (X: 280-620): Anthropomorphic Memory Locker Cabinet -->
  <g transform="translate(450, 142)">
  <!-- Cabinet Feet -->
  <rect x="-118" y="96" width="22" height="14" rx="4" class="dark-fill" />
  <rect x="-118" y="96" width="22" height="14" rx="4" class="light-stroke" />
  <rect x="96" y="96" width="22" height="14" rx="4" class="dark-fill" />
  <rect x="96" y="96" width="22" height="14" rx="4" class="light-stroke" />
  
  <!-- Main Light Cabinet Body -->
  <rect x="-134" y="-102" width="268" height="200" rx="16" class="light-fill" />
  <rect x="-134" y="-102" width="268" height="200" rx="16" class="dark-stroke" />
  
  <!-- Top Header Bar inside Cabinet -->
  <line x1="-134" y1="-72" x2="134" y2="-72" class="dark-stroke" />
  <circle cx="-114" cy="-87" r="4.5" class="accent-fill" />
  <circle cx="-99" cy="-87" r="4.5" class="dark-fill" />
  <text x="116" y="-83" text-anchor="end" class="mono-drawer">RAM // 0x04F</text>
  
  <!-- COMPARTMENT 1: Open Drawer with XP Star (int xp = 100;) -->
  <rect x="-114" y="-58" width="228" height="44" rx="8" class="accent-fill" />
  <rect x="-114" y="-58" width="228" height="44" rx="8" class="dark-stroke" />
  
  <!-- Drawer Pull-Out Tray -->
  <g class="anim-float">
  <rect x="-102" y="-50" width="122" height="28" rx="6" class="light-fill" />
  <rect x="-102" y="-50" width="122" height="28" rx="6" class="dark-stroke" />
  <text x="-41" y="-32" text-anchor="middle" class="mono-drawer">int xp</text>
  
  <!-- Stored XP Gem / Coin inside Drawer -->
  <polygon points="68,-47 73,-38 83,-37 75,-30 77,-20 68,-25 59,-20 61,-30 53,-37 63,-38" class="light-fill" />
  <polygon points="68,-47 73,-38 83,-37 75,-30 77,-20 68,-25 59,-20 61,-30 53,-37 63,-38" class="dark-stroke" />
  </g>
  
  <!-- COMPARTMENT 2: String Variable Drawer (string nick = "Fox";) -->
  <rect x="-114" y="-4" width="228" height="42" rx="8" class="light-fill" />
  <rect x="-114" y="-4" width="228" height="42" rx="8" class="dark-stroke" />
  <rect x="-100" y="5" width="96" height="24" rx="5" class="accent-fill" />
  <text x="-52" y="21" text-anchor="middle" style="font-family: &#39;JetBrains Mono&#39;, monospace; font-size: 11px; font-weight: 700; fill: var(--text-main, #ffffff);">string nick</text>
  <rect x="8" y="5" width="92" height="24" rx="5" class="dark-fill" />
  <text x="54" y="21" text-anchor="middle" style="font-family: &#39;JetBrains Mono&#39;, monospace; font-size: 11px; font-weight: 700; fill: var(--text-main, #ffffff);">"Player_1"</text>
  
  <!-- COMPARTMENT 3: Timer / Bomb Fuse Variable (float timer = 3.5f;) -->
  <rect x="-114" y="48" width="228" height="40" rx="8" class="light-fill" />
  <rect x="-114" y="48" width="228" height="40" rx="8" class="dark-stroke" />
  <text x="-52" y="72" text-anchor="middle" class="mono-drawer">float timer</text>
  <!-- Cute Editorial Mini Bomb Icon -->
  <circle cx="54" cy="69" r="11" class="dark-fill" />
  <path d="M62,60 Q70,52 76,56" class="dark-stroke" />
  <circle cx="78" cy="56" r="3.5" class="accent-fill" />
  </g>
  
  <!-- Kinetic Action Rays Between Character & Locker -->
  <g transform="translate(284, 118)">
  <g class="anim-spark">
  <line x1="-10" y1="-14" x2="4" y2="-6" class="light-stroke" />
  <line x1="-14" y1="2" x2="4" y2="2" class="light-stroke" />
  <line x1="-10" y1="18" x2="4" y2="10" class="light-stroke" />
  </g>
  </g>
  
  <!-- RIGHT SECTION (X: 660-840): Declaration Badge, Scope & Unassigned Slot -->
  <g transform="translate(742, 140)">
  <!-- Top Primary Code Badge -->
  <rect x="-82" y="-76" width="164" height="34" rx="10" class="light-fill" />
  <text x="0" y="-54" text-anchor="middle" class="mono-badge">int xp = 100;</text>
  
  <!-- Connector Line -->
  <line x1="0" y1="-42" x2="0" y2="-16" class="light-stroke" />
  
  <!-- Uninitialized Empty Variable Slot (CS0165 Warning Metaphor) -->
  <g class="anim-float">
  <rect x="-74" y="-16" width="148" height="54" rx="12" class="dark-fill" />
  <rect x="-74" y="-16" width="148" height="54" rx="12" class="light-stroke" stroke-dasharray="6 4" />
  <text x="0" y="8" text-anchor="middle" style="font-family: &#39;JetBrains Mono&#39;, monospace; font-size: 12px; font-weight: 700; fill: var(--text-main, #ffffff);">int empty; // ?</text>
  <text x="0" y="26" text-anchor="middle" style="font-family: &#39;JetBrains Mono&#39;, monospace; font-size: 10px; font-weight: 700; fill: var(--text-main, #ffffff); opacity: 0.75;">CS0165: unassigned</text>
  </g>
  
  <!-- Bottom camelCase Pill Badge -->
  <rect x="-64" y="54" width="128" height="28" rx="14" class="light-fill" />
  <text x="0" y="72" text-anchor="middle" class="mono-badge">camelCase</text>
  </g>
  
  <!-- Right Closing Scope Bracket -->
  <g transform="translate(848, 86)">
  <path d="M0,0 L12,0 L12,118 L0,118" class="light-stroke" />
  </g>
  </svg>
---

# Переменные

Куда девать очки опыта, никнейм игрока или таймер до взрыва, пока программа работает?

## Быстрый старт

Быстро вспоминаем синтаксис:

```cs
int playerHealth = 100;
string playerName = "Alex";

Console.WriteLine(playerName);
Console.WriteLine(playerHealth);

```

Базовый шаблон всегда один и тот же:
`ТипДанных имяПеременной = значение;`

## Что это такое

Представь пустой склад или кухню с одинаковыми пластиковыми банками. Переменная — это как раз такая банка, на которую ты наклеил скотч с надписью и положил внутрь конкретную вещь.

Работа с переменной делится на два отдельных действия:

1. **Объявление (взяли банку и подписали):**
```cs
int coins;

```


Ты сказал компилятору: *«Забей мне место под целое число и отзывайся на имя `coins`»*. Место зарезервировано, но внутри пока ничего нет.

2. **Инициализация (первый раз что-то туда положили):**
```cs
coins = 50;

```

Теперь банка заполнена. Знак `=` здесь — это не знак равенства из математики, это **оператор присваивания** (стрелка справа налево: возьми значение `50` и положи в банку `coins`).

Дальше по ходу программы старое значение можно затирать новым сколько угодно:

```cs
coins = 80; // Старые 50 стёрлись, теперь там 80

```

> **Главный закон C#:** компилятор категорически запрещает доставать что-то из пустой банки. Если написать `int damage; Console.WriteLine(damage);`, среда подчеркнёт строку красным и выдаст ошибку `CS0165 (Use of unassigned local variable)`. Сначала положи — потом пользуйся.

## Стены и комнаты: область видимости

Переменная живёт ровно внутри тех фигурных скобок `{ }`, где была создана. Фигурные скобки работают как стены комнаты. Из комнаты видно то, что лежит снаружи в коридоре, но из коридора заглянуть в комнату нельзя.

```cs
int totalScore = 500;

if (totalScore > 100)
{
    // Внутри скобок видно и то, что снаружи, и то, что создано здесь
    int bonus = 50;
    Console.WriteLine(totalScore + bonus);
}

// За пределами скобок переменная bonus бесследно уничтожена:
// Console.WriteLine(bonus); // Ошибка CS0103: имя bonus здесь не существует!

```

Как только программа доходит до закрывающей скобки `}`, компилятор безжалостно выбрасывает из памяти всё, что было объявлено внутри этого блока.

## Базовые проблемы

### 1. Попытка наклеить одну бирку дважды

В пределах одного блока нельзя объявить две переменные с одинаковым именем:

```cs
int mana = 100;
int mana = 50; // Ошибка CS0128: переменная mana уже объявлена в этой области

```

Чтобы просто обновить значение, тип повторно писать не нужно:

```cs
int mana = 100;
mana = 50; // Всё в порядке

```

### 2. Запихнуть невпихуемое

C# — строго типизированный язык. Если ячейка создана под целое число (`int`), положить туда текст нельзя, даже если цифра записана в кавычках:

```cs
int age = "19"; // Ошибка CS0029: Нельзя неявно преобразовать string в int

```

Чтобы достать число из текста, его придётся явно распарсить (об этом подробно в статье про `int`).

## Под капотом

Для процессора и скомпилированного байт-кода (IL) никаких красивых имён вроде `playerHealth` не существует. Имена придуманы исключительно для разработчика. При компиляции C# превращает каждую локальную переменную в порядковый номер слота в стеке вызовов (`V_0`, `V_1` и т.д.).

Если объявить локальную переменную, записать в неё значение, но ни разу в коде её не прочитать — компилятор выдаст предупреждение `CS0219`, а при оптимизированной Release-сборке может и вовсе вырезать её из финальной программы, чтобы не тратить память впустую.
