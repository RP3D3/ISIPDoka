---
title: Области видимости scope
description: В C# область видимости (scope) определяет границы кода, внутри которых переменная, метод или тип данных доступны для обращения по имени.
svg: |
  <svg viewBox="0 0 900 280" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 900px; max-height: 280px; height: auto; display: block; margin: 0 auto 20px;">
    <style>
      .stroke-main {
        stroke: var(--text-main, #ffffff);
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .stroke-bg {
        stroke: var(--bg-main, #222429);
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .fill-main {
        fill: var(--text-main, #ffffff);
      }
      .fill-bg {
        fill: var(--bg-main, #222429);
      }
      .fill-accent {
        fill: var(--domain-accent, #614fa8);
      }
      .mono-text {
        font-family: 'JetBrains Mono', monospace;
        font-size: 13px;
        font-weight: 700;
      }
      .anim-float {
        animation: floatY 3.6s ease-in-out infinite;
        transform-box: fill-box;
        transform-origin: center;
      }
      .anim-float-slow {
        animation: floatY 4.4s ease-in-out 0.8s infinite;
        transform-box: fill-box;
        transform-origin: center;
      }
      .anim-shout {
        animation: shoutTilt 2.8s ease-in-out infinite;
        transform-box: fill-box;
        transform-origin: left center;
      }
      .anim-recoil {
        animation: recoilBounce 2.8s ease-in-out infinite;
        transform-box: fill-box;
        transform-origin: center;
      }
      .anim-pulse {
        animation: sparkPulse 2.4s ease-in-out infinite;
        transform-box: fill-box;
        transform-origin: center;
      }
      .anim-dash {
        animation: dashFlow 2s linear infinite;
      }
      @keyframes floatY {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      @keyframes shoutTilt {
        0%, 100% { transform: rotate(0deg) translateX(0px); }
        40% { transform: rotate(-3deg) translateX(3px); }
        70% { transform: rotate(1deg) translateX(0px); }
      }
      @keyframes recoilBounce {
        0%, 35%, 100% { transform: translateX(0px); }
        50% { transform: translateX(6px); }
        70% { transform: translateX(-2px); }
      }
      @keyframes sparkPulse {
        0%, 100% { opacity: 0.45; transform: scale(0.94); }
        50% { opacity: 1; transform: scale(1.07); }
      }
      @keyframes dashFlow {
        0% { stroke-dashoffset: 24; }
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
  
    <!-- Outer Editorial Brackets [ ] -->
    <path d="M 52 38 L 34 38 L 34 242 L 52 242" class="stroke-main" stroke-width="2.5" />
    <path d="M 848 38 L 866 38 L 866 242 L 848 242" class="stroke-main" stroke-width="2.5" />
  
    <!-- Decorative Outline Cloud (Top Right) -->
    <g transform="translate(768, 52)">
      <g class="anim-float-slow">
        <path d="M -24 7 C -31 7 -36 2 -34 -4 C -32 -10 -26 -12 -20 -10 C -17 -18 -7 -22 2 -18 C 9 -15 13 -9 13 -3 C 19 -4 25 0 25 6 C 25 12 20 14 14 14 L -20 14 C -23 14 -24 11 -24 7 Z" class="stroke-main" stroke-width="1.75" />
      </g>
    </g>
  
    <!-- LEFT ZONE (X: 60–255): Grotesque Developer Calling Out-of-Scope Variable -->
    <g transform="translate(132, 152)">
      <!-- Shoulders / Sweater -->
      <path d="M -54 88 C -54 52 -32 38 0 38 C 32 38 54 52 54 88 Z" class="fill-main stroke-bg" stroke-width="2" />
      <path d="M -18 38 L 0 56 L 18 38" class="stroke-bg" stroke-width="2" />
  
      <!-- Grotesque Head -->
      <g class="anim-float">
        <!-- Top Hair Bun -->
        <circle cx="-18" cy="-48" r="16" class="fill-bg stroke-main" stroke-width="1.75" />
        <!-- Face Silhouette (Accent fill with dark outline) -->
        <path d="M -28 -26 C -28 -44 26 -44 26 -22 L 26 8 C 26 24 12 34 -4 34 C -20 34 -28 22 -28 6 Z" class="fill-accent stroke-bg" stroke-width="2" />
        <!-- Geometric Bangs -->
        <path d="M -30 -24 C -30 -46 28 -46 28 -22 L 10 -22 L 4 -12 L -6 -22 L -30 -22 Z" class="fill-bg stroke-main" stroke-width="1.75" />
        <!-- Signature Round Ear with Diagonal Slash -->
        <circle cx="-30" cy="2" r="9" class="fill-accent stroke-bg" stroke-width="2" />
        <line x1="-33" y1="-2" x2="-27" y2="6" class="stroke-bg" stroke-width="1.75" />
        <!-- Rectangular Glasses -->
        <rect x="-6" y="-14" width="18" height="13" rx="3" class="fill-main stroke-bg" stroke-width="2" />
        <rect x="15" y="-14" width="16" height="13" rx="3" class="fill-main stroke-bg" stroke-width="2" />
        <line x1="12" y1="-8" x2="15" y2="-8" class="stroke-bg" stroke-width="2" />
        <!-- Pupils peering right -->
        <circle cx="6" cy="-7" r="2.5" class="fill-bg" />
        <circle cx="25" cy="-7" r="2.5" class="fill-bg" />
      </g>
  
      <!-- Megaphone & Hand -->
      <g transform="translate(34, 24)">
        <g class="anim-shout">
          <!-- Hand gripping megaphone handle with semicircle nail -->
          <rect x="-6" y="8" width="14" height="18" rx="6" class="fill-main stroke-bg" stroke-width="1.75" />
          <path d="M 3 12 C 7 12 8 14 8 17 C 8 20 7 22 3 22 Z" class="fill-accent stroke-bg" stroke-width="1.25" />
          <!-- Megaphone Cone -->
          <polygon points="4,-2 48,-20 48,18 4,6" class="fill-main stroke-bg" stroke-width="2" />
          <rect x="46" y="-22" width="7" height="42" rx="3.5" class="fill-bg stroke-main" stroke-width="1.75" />
        </g>
      </g>
    </g>
  
    <!-- Speech Bubble Query "x?" bouncing off the '{' gate -->
    <g transform="translate(234, 72)">
      <g class="anim-float-slow">
        <rect x="-32" y="-16" width="64" height="32" rx="16" class="fill-bg stroke-main" stroke-width="1.75" />
        <polygon points="-10,16 -2,25 4,16" class="fill-bg stroke-main" stroke-width="1.75" />
        <text x="0" y="5" text-anchor="middle" class="mono-text fill-main">x?</text>
      </g>
    </g>
  
    <!-- Impact Sparks where call hits the '{' Scope Wall -->
    <g transform="translate(274, 152)">
      <g class="anim-pulse">
        <line x1="0" y1="-22" x2="-12" y2="-32" class="stroke-main" stroke-width="2" />
        <line x1="-4" y1="0" x2="-18" y2="0" class="stroke-main" stroke-width="2" />
        <line x1="0" y1="22" x2="-12" y2="32" class="stroke-main" stroke-width="2" />
        <circle cx="-16" cy="-14" r="2.5" class="fill-main" />
      </g>
    </g>
  
    <!-- CENTER ZONE (X: 295–625): Panoramic Scope Window Fortress { ... } -->
    <g transform="translate(460, 140)">
      <!-- Main White Editorial Window -->
      <rect x="-156" y="-92" width="312" height="184" rx="20" class="fill-main stroke-bg" stroke-width="2.5" />
  
      <!-- Browser Window Header Bar -->
      <line x1="-156" y1="-60" x2="156" y2="-60" class="stroke-bg" stroke-width="2" />
      <circle cx="-134" cy="-76" r="4.5" class="fill-bg" />
      <circle cx="-119" cy="-76" r="4.5" class="fill-accent" />
      <circle cx="-104" cy="-76" r="4.5" class="fill-bg" />
      <text x="134" y="-71" text-anchor="end" class="mono-text fill-bg">scope { }</text>
  
      <!-- Internal Visibility Link between two local variables -->
      <path d="M -52 12 C -20 -18 20 -18 54 22" class="stroke-bg anim-dash" stroke-width="2" stroke-dasharray="5 5" />
  
      <!-- Starburst behind Variable 1 -->
      <g transform="translate(-68, 12)">
        <g class="anim-pulse">
          <line x1="-46" y1="-24" x2="-56" y2="-32" class="stroke-bg" stroke-width="1.75" />
          <line x1="0" y1="-30" x2="0" y2="-42" class="stroke-bg" stroke-width="1.75" />
          <line x1="46" y1="-24" x2="56" y2="-32" class="stroke-bg" stroke-width="1.75" />
        </g>
      </g>
  
      <!-- Local Variable Pill #1: int x -->
      <g transform="translate(-68, 14)">
        <g class="anim-float">
          <rect x="-46" y="-19" width="92" height="38" rx="19" class="fill-bg" />
          <circle cx="-29" cy="0" r="5" class="fill-accent" />
          <text x="6" y="5" text-anchor="middle" class="mono-text fill-main">int x</text>
        </g>
      </g>
  
      <!-- Local Variable Pill #2: var y -->
      <g transform="translate(68, 30)">
        <g class="anim-float-slow">
          <rect x="-46" y="-19" width="92" height="38" rx="19" class="fill-accent stroke-bg" stroke-width="2" />
          <text x="0" y="5" text-anchor="middle" class="mono-text fill-main">var y</text>
        </g>
      </g>
  
      <!-- Left Architectural Gate '{' -->
      <g transform="translate(-162, 12)">
        <path d="M 18 -64
                 C 2 -64 -4 -56 -4 -42
                 L -4 -18
                 C -4 -8 -10 -2 -20 0
                 C -10 2 -4 8 -4 18
                 L -4 42
                 C -4 56 2 64 18 64
                 L 18 50
                 C 10 50 8 46 8 38
                 L 8 16
                 C 8 6 3 2 -5 0
                 C 3 -2 8 -6 8 -16
                 L 8 -38
                 C 8 -46 10 -50 18 -50 Z" class="fill-bg stroke-main" stroke-width="2" />
      </g>
  
      <!-- Right Architectural Gate '}' -->
      <g transform="translate(162, 12)">
        <path d="M -18 -64
                 C -2 -64 4 -56 4 -42
                 L 4 -18
                 C 4 -8 10 -2 20 0
                 C 10 2 4 8 4 18
                 L 4 42
                 C 4 56 -2 64 -18 64
                 L -18 50
                 C -10 50 -8 46 -8 38
                 L -8 16
                 C -8 6 -3 2 5 0
                 C -3 -2 -8 -6 -8 -16
                 L -8 -38
                 C -8 -46 -10 -50 -18 -50 Z" class="fill-bg stroke-main" stroke-width="2" />
      </g>
    </g>
  
    <!-- RIGHT ZONE (X: 655–840): Rejected Out-of-Scope Tag on Starburst -->
    <g transform="translate(748, 152)">
      <g class="anim-recoil">
        <!-- Multi-ray Starburst behind Tag -->
        <g class="anim-pulse">
          <line x1="-54" y1="-28" x2="-66" y2="-38" class="stroke-main" stroke-width="2" />
          <line x1="0" y1="-34" x2="0" y2="-48" class="stroke-main" stroke-width="2" />
          <line x1="54" y1="-28" x2="66" y2="-38" class="stroke-main" stroke-width="2" />
          <line x1="-54" y1="28" x2="-66" y2="38" class="stroke-main" stroke-width="2" />
          <line x1="54" y1="28" x2="66" y2="38" class="stroke-main" stroke-width="2" />
          <circle cx="68" cy="0" r="3" class="fill-main" />
        </g>
  
        <!-- Dark Capsule Tag -->
        <rect x="-62" y="-20" width="124" height="40" rx="20" class="fill-bg stroke-main" stroke-width="2" />
        <text x="-12" y="5" text-anchor="middle" class="mono-text fill-main">CS0103</text>
  
        <!-- White Stop/Cross Badge -->
        <g transform="translate(38, 0)">
          <circle cx="0" cy="0" r="13" class="fill-main stroke-bg" stroke-width="1.75" />
          <line x1="-4.5" y1="-4.5" x2="4.5" y2="4.5" class="stroke-bg" stroke-width="2.5" />
          <line x1="4.5" y1="-4.5" x2="-4.5" y2="4.5" class="stroke-bg" stroke-width="2.5" />
        </g>
      </g>
    </g>
  </svg>
---

### 1. Уровни видимости переменных

* **Блочная область (Block Scope):**
Переменная объявляется внутри блока фигурных скобок `{ }` (тело цикла, ветвления `if`, локального блока) и доступна только внутри этого блока после точки объявления.
```csharp
if (true)
{
    int count = 10;
    // count доступна здесь
}
// count здесь не существует (ошибка компиляции)

```


* **Область видимости метода / локальная (Method Scope):**
Параметры метода и переменные, объявленные на верхнем уровне метода. Живут на протяжении выполнения метода и недоступны за его пределами.

* **Область видимости класса / структуры (Class / Struct Scope):**
Поля, свойства и методы типа. Доступны всем нестатическим членам внутри класса независимо от порядка объявления.

---

### 2. Модификаторы доступа типов и их членов

Определяют видимость между разными классами, сборками (`assemblies`) и проектами:

| Модификатор | Где доступен |
| --- | --- |
| **`private`** | Только внутри текущего класса/структуры *(по умолчанию для членов класса)* |
| **`protected`** | Внутри текущего класса и в любых классах-наследниках |
| **`internal`** | Внутри текущей сборки / проекта *(по умолчанию для типов верхнего уровня)* |
| **`protected internal`** | Внутри текущей сборки **ИЛИ** в классах-наследниках в других сборках |
| **`private protected`** | В классах-наследниках, но **ТОЛЬКО** внутри текущей сборки |
| **`public`** | Доступен отовсюду без ограничений |
| **`file`** *(начиная с C# 11)* | Только внутри исходного файла `.cs` (удобно для source generators) |

---

### 3. Ключевые правила и нюансы

1. **Затенение (Variable Shadowing):**
* Локальная переменная **не может** перекрывать другую локальную переменную с тем же именем во внешнем блоке того же метода:
```csharp
int x = 5;
if (true)
{
    // int x = 10; // Ошибка: имя x уже используется во внешней области
}

```


* Локальная переменная **может** совпадать по имени с полем класса. В таком случае поле скрывается, а доступ к нему выполняется явно через `this`:
```csharp
public class User
{
    private string name;
    public void SetName(string name)
    {
        this.name = name; // this.name — поле, name — аргумент метода
    }
}

```




2. **Замыкания (Closures):**
Когда лямбда-выражение или анонимная функция захватывают локальную переменную, компилятор продлевает её время жизни, оборачивая её в скрытый сгенерированный класс на куче:
```csharp
Func<int> MakeCounter()
{
    int count = 0;
    return () => ++count; // count сохраняется между вызовами делегата
}

```


3. **Область видимости директивы `using`:**
* Пространства имен, подключенные через `using` в начале файла, действуют на весь файл.

* `global using` (C# 10+) действует на весь проект сборки.

* Блок `using (var resource = ...)` задает время жизни ресурса: объект удаляется (`Dispose`) сразу по выходу за пределы блока.
