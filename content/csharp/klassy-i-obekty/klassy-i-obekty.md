---
title: Классы и объекты
keywords: структура класса, экземпляр объекта, инкапсуляция данных, конструктор, свойства, поля, модификаторы доступа, статические члены, порядок элементов
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
    .cloud-1 { transform-box: fill-box; transform-origin: center; animation: drift1 8s ease-in-out infinite; }
    .cloud-2 { transform-box: fill-box; transform-origin: center; animation: drift2 9s ease-in-out infinite; }
    @keyframes drift1 { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(7px); } }
    @keyframes drift2 { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(-7px); } }
    .press { transform-box: fill-box; transform-origin: center bottom; animation: press 4s ease-in-out infinite; }
    .cookie-1 { transform-box: fill-box; transform-origin: center; animation: appear 4s ease-in-out infinite; }
    .cookie-2 { transform-box: fill-box; transform-origin: center; animation: appear 4s ease-in-out infinite 0.25s; }
    @keyframes press {
      0%, 18%, 62%, 100% { transform: translateY(0px); }
      34%, 46% { transform: translateY(12px); }
    }
    @keyframes appear {
      0%, 30% { opacity: 0; transform: translateY(-6px); }
      46%, 100% { opacity: 1; transform: translateY(0px); }
    }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transform: none !important; opacity: 1 !important; }
    }
  </style>

  <path d="M 52 42 H 32 V 238 H 52" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 848 42 H 868 V 238 H 848" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <g transform="translate(170, 46)">
    <g class="cloud-1">
      <path d="M -26 9 H 26 C 32 9 36 4 36 -1 C 36 -6 32 -10 27 -10 C 25 -17 18 -21 11 -19 C 7 -25 -3 -25 -8 -19 C -15 -20 -21 -15 -21 -8 C -27 -8 -31 -3 -31 2 C -31 6 -29 9 -26 9 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
    </g>
  </g>
  <g transform="translate(706, 40)">
    <g class="cloud-2">
      <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
    </g>
  </g>

  <line x1="190" y1="216" x2="700" y2="216" class="s-white" stroke-width="4" stroke-linecap="round" />
  <line x1="202" y1="216" x2="202" y2="242" class="s-white" stroke-width="3" stroke-linecap="round" />
  <line x1="688" y1="216" x2="688" y2="242" class="s-white" stroke-width="3" stroke-linecap="round" />

  <ellipse cx="430" cy="208" rx="34" ry="7" class="c-white s-dark" stroke-width="2" />

  <g transform="translate(430, 150)">
    <g class="press">
      <rect x="-9" y="-102" width="18" height="30" rx="7" class="c-white s-dark" stroke-width="2" />
    <rect x="-9" y="-94" width="18" height="8" class="c-accent" />
      <circle cx="0" cy="0" r="48" class="c-white s-dark" stroke-width="3" />
      <circle cx="0" cy="0" r="38" class="s-dark" stroke-width="2" stroke-dasharray="5 7" />
    </g>
  </g>
  <g transform="translate(430, 56)">
    <rect x="-30" y="-13" width="60" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">class</text>
  </g>

  <g transform="translate(600, 192)">
    <g class="cookie-1">
      <circle cx="0" cy="0" r="23" class="c-white s-dark" stroke-width="2.4" />
      <circle cx="-8" cy="-5" r="3" class="c-dark" />
      <circle cx="7" cy="-8" r="3" class="c-dark" />
      <circle cx="4" cy="7" r="3" class="c-dark" />
    </g>
  </g>
  <g transform="translate(664, 200)">
    <g class="cookie-2">
      <circle cx="0" cy="0" r="23" class="c-white s-dark" stroke-width="2.4" />
      <circle cx="-7" cy="-4" r="3" class="c-dark" />
      <circle cx="8" cy="-6" r="3" class="c-dark" />
      <circle cx="-2" cy="8" r="3" class="c-dark" />
    </g>
  </g>
  <g transform="translate(632, 132)">
    <rect x="-26" y="-13" width="52" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">new</text>
  </g>

  <g transform="translate(770, 120)">
    <line x1="0" y1="0" x2="14" y2="-12" class="s-white" stroke-width="2.5" stroke-linecap="round" />
    <line x1="8" y1="9" x2="24" y2="8" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
    <circle cx="18" cy="-2" r="3" class="c-white" />
  </g>
  </svg>

---

# Классы и объекты: из чего строится свой тип

Как объединить данные, проверки, начальную настройку и общую логику в единый надёжный класс и правильно организовать его внутреннюю структуру?

**Класс** (`class`) в C# — это главный строительный блок объектно-ориентированного программирования, позволяющий описать собственный ссылочный тип данных. Внутри класса собираются воедино **состояние** (поля, константы и свойства) и **поведение** (методы), а границы видимости (`public`, `private`, `internal`) защищают внутреннее устройство от поломки снаружи. По одному чертежу класса оператор `new` вместе с конструктором создаёт в управляемой куче (*Heap*) сколько угодно независимых **объектов** (экземпляров).

## Анатомия элементов класса

| Элемент класса | Зачем нужен | Пример объявления |
| --- | --- | --- |
| **Поля и константы** | Хранят внутреннее состояние объекта или неизменяемые настройки | `private int _score;`<br>

<br>`public const int MaxLevel = 100;` |
| **Конструкторы (`this`)** | Гарантируют корректную сборку объекта в момент вызова `new` | `public Player(string name) { ... }` |
| **Модификаторы доступа** | Разделяют скрытую реализацию и безопасный внешний интерфейс | `private`, `public`, `internal`, `protected` |
| **Свойства (`get` / `set`)** | Дают удобный доступ к данным с проверкой при записи | `public int Age { get; private set; }` |
| **Статические члены (`static`)** | Принадлежат всему классу целиком, а не отдельному объекту | `public static int TotalCount { get; set; }` |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // Создаём два независимых объекта в куче через перегруженные конструкторы
        UserAccount admin = new UserAccount("admin_roman", 1000);
        UserAccount guest = new UserAccount("guest_user");

        guest.AddBonus(250);
        admin.PrintCard();
        guest.PrintCard();

        // Общее статическое свойство вызывается через имя класса, а не через объект
        Console.WriteLine($"Всего аккаунтов в системе: {UserAccount.TotalUsers}");
    }
}

class UserAccount
{
    // 1. Константы и общие статические члены класса
    public const int MaxBonusLimit = 10000;
    public static int TotalUsers { get; private set; }

    // 2. Закрытые поля и неизменяемые поля экземпляра
    public readonly Guid Id = Guid.NewGuid();
    private int _bonusPoints;

    // 3. Публичные свойства с проверкой при записи (инкапсуляция)
    public string Login { get; private set; }
    public int BonusPoints
    {
        get => _bonusPoints;
        private set => _bonusPoints = (value >= 0 && value <= MaxBonusLimit) ? value : _bonusPoints;
    }

    // 4. Конструкторы и цепочка вызова : this(...) без дублирования кода
    public UserAccount(string login, int initialBonus)
    {
        Login = login;
        BonusPoints = initialBonus;
        TotalUsers++;
    }

    public UserAccount(string login) : this(login, 0) { }

    // 5. Публичные методы (поведение объекта)
    public void AddBonus(int amount)
    {
        if (amount > 0)
            BonusPoints += amount;
    }

    public void PrintCard() =>
        Console.WriteLine($"[{Id.ToString()[..8]}] {Login}: {BonusPoints} бонусов");
}

```

## Важные нюансы

* **Рекомендуемый порядок внутри класса:** чтобы любой класс читался легко и предсказуемо, члены принято располагать сверху вниз в едином порядке: сначала `const` и `static`, затем `private`-поля, публичные свойства, конструкторы и в конце — публичные и вспомогательные приватные методы.
* **Золотое правило инкапсуляции:** никогда не оставляйте изменяемые поля открытыми (`public`) — делайте поля приватными (`_field`), а наружу открывайте только свойства с нужными ограничениями и методы, выражающие осмысленные действия объекта.
* **Ссылочная природа классов:** любая переменная типа `class` хранит лишь адрес объекта в куче (*Heap*) или значение `null`, если экземпляр ещё не создан через `new`.
* **Что дальше:** классы отлично подходят для сложных сущностей со своим поведением, но для лёгких значений, наборов фиксированных вариантов и защиты от пустых ссылок в C# существуют отдельные конструкции — перечисления, структуры и Nullable-типы (см. следующую группу: *Пользовательские типы и память*).

## Куда дальше

* [Классы (руководство C#)](https://learn.microsoft.com/dotnet/csharp/fundamentals/types/classes) — поля, конструкторы и создание объектов.
* [Свойства](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/properties) — автосвойства, `init` и проверки в аксессорах.
