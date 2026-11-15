---
title: Наследование и полиморфизм
keywords: иерархия классов, динамический полиморфизм, абстрактный класс, интерфейс, переопределение override, приведение типов, сопоставление с образцом, выбор abstract или interface
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
    .doll-mid { transform-box: fill-box; transform-origin: center; animation: outMid 6s ease-in-out infinite; }
    .doll-small { transform-box: fill-box; transform-origin: center; animation: outSmall 6s ease-in-out infinite; }
    @keyframes outMid {
      0%, 32% { transform: translateX(0px); }
      50%, 84% { transform: translateX(68px); }
      94%, 100% { transform: translateX(0px); }
    }
    @keyframes outSmall {
      0%, 46% { transform: translateX(0px); }
      64%, 88% { transform: translateX(120px); }
      96%, 100% { transform: translateX(0px); }
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

  <g transform="translate(532, 186)">
    <g class="doll-small">
      <g transform="scale(0.4)">
        <path d="M -46 46 C -56 0 -44 -30 -22 -40 C -26 -58 -14 -70 0 -70 C 14 -70 26 -58 22 -40 C 44 -30 56 0 46 46 Z" class="c-white s-dark" stroke-width="4" />
        <circle cx="-9" cy="-38" r="4" class="c-dark" />
        <circle cx="9" cy="-38" r="4" class="c-dark" />
        <path d="M -22 6 C -22 -10 22 -10 22 6 L 30 46 H -30 Z" class="c-accent s-dark" stroke-width="2" />
      </g>
    </g>
  </g>

  <g transform="translate(456, 180)">
    <g class="doll-mid">
      <g transform="scale(0.55)">
        <path d="M -46 46 C -56 0 -44 -30 -22 -40 C -26 -58 -14 -70 0 -70 C 14 -70 26 -58 22 -40 C 44 -30 56 0 46 46 Z" class="c-white s-dark" stroke-width="3.4" />
        <circle cx="-9" cy="-38" r="4" class="c-dark" />
        <circle cx="9" cy="-38" r="4" class="c-dark" />
        <path d="M -22 6 C -22 -10 22 -10 22 6 L 30 46 H -30 Z" class="c-accent s-dark" stroke-width="1.8" />
      </g>
    </g>
  </g>

  <g transform="translate(380, 160)">
    <path d="M -46 46 C -56 0 -44 -30 -22 -40 C -26 -58 -14 -70 0 -70 C 14 -70 26 -58 22 -40 C 44 -30 56 0 46 46 Z" class="c-white s-dark" stroke-width="2.6" />
    <circle cx="-9" cy="-38" r="3.5" class="c-dark" />
    <circle cx="9" cy="-38" r="3.5" class="c-dark" />
    <circle cx="0" cy="-28" r="3" class="c-accent" />
    <path d="M -22 6 C -22 -10 22 -10 22 6 L 30 46 H -30 Z" class="c-accent s-dark" stroke-width="2" />
    <line x1="-14" y1="20" x2="14" y2="20" class="s-dark" stroke-width="2" stroke-linecap="round" opacity="0.5" />
  </g>
  <g transform="translate(270, 96)">
    <rect x="-33" y="-13" width="66" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">virtual</text>
  </g>
  <g transform="translate(650, 132)">
    <rect x="-37" y="-13" width="74" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">override</text>
  </g>

  <g transform="translate(760, 70)">
    <line x1="0" y1="0" x2="14" y2="-12" class="s-white" stroke-width="2.5" stroke-linecap="round" />
    <line x1="8" y1="9" x2="24" y2="8" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
    <circle cx="18" cy="-2" r="3" class="c-white" />
  </g>
  </svg>
---

# Наследование и полиморфизм: единая архитектура типов

Как выстроить гибкую иерархию классов, объединить разнородные объекты общими контрактами поведения и безопасно работать с ними через базовые типы?

Наследование и полиморфизм позволяют избавиться от дублирования кода и писать алгоритмы, которые управляют целыми семействами объектов через единый интерфейс. **Наследование** (`:`) передаёт общие поля, конструкторы (`base`) и готовую логику от родителя к потомкам, **абстрактные классы** (`abstract`) задают обязательный каркас с общим состоянием, а **интерфейсы** (`interface`) наделяют несвязанные типы дополнительными ролями. Благодаря **полиморфизму** (`virtual` и `override`) программа во время выполнения сама вызывает нужную версию метода реального объекта, а операторы `is`, `as` и сопоставление с образцом позволяют безопасно добраться до уникальных свойств конкретного наследника.

## Сводная карта инструментов группы

| Инструмент | Суть механизма | Когда выбирать |
| --- | --- | --- |
| **Наследование (`: base`)** | Передача полей, `protected`-членов и базовой логики одному прямому потомку | Когда у классов общая природа («является») и есть общие данные или состояние |
| **`virtual` и `override`** | Динамическая подмена реализации метода реального объекта во время выполнения | Когда базовый класс задаёт логику по умолчанию, а наследники её заменяют или дополняют |
| **`abstract class`** | Незавершённый базовый класс-шаблон, запрещающий создание через `new` | Когда нужно объединить общие поля/конструкторы с обязательными для наследников методами |
| **`interface`** | Чистый контракт действий без полей; поддерживается множественно и в `struct` | Когда нужно описать способность («умеет») для разнородных и несвязанных типов |
| **`is`, `as` и `switch`** | Безопасное нисходящее приведение и проверка свойств реального типа в куче | Когда при работе через базовый тип нужно точечно обработать уникальный подтип |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // Храним разных наследников в едином массиве базового абстрактного типа (upcasting)
        SmartDevice[] devices =
        {
            new SmartLamp("Люстра в гостиной", 85),
            new Thermostat("Климат-контроль", 22.5)
        };

        foreach (SmartDevice device in devices)
        {
            // 1. Вызывается переопределённый ToString() базового класса object
            Console.WriteLine(device);

            // 2. Полиморфизм: срабатывает своя реализация TurnOn() для каждого устройства
            device.TurnOn();

            // 3. Проверка контракта интерфейса через оператор is
            if (device is ISchedulable schedulable)
            {
                schedulable.ScheduleAt("07:30");
            }

            // 4. Сопоставление с образцом (pattern matching) с проверкой уникального свойства
            if (device is SmartLamp { Brightness: > 50 } brightLamp)
            {
                Console.WriteLine($"Внимание: включён яркий режим ({brightLamp.Brightness}%).");
            }

            Console.WriteLine();
        }
    }
}

// Интерфейс: контракт дополнительной способности (могут реализовать любые классы и структуры)
interface ISchedulable
{
    void ScheduleAt(string time);
}

// Абстрактный базовый класс: задаёт общее состояние, конструктор и обязательный метод
abstract class SmartDevice
{
    public string Name { get; }

    protected SmartDevice(string name) => Name = name;

    public abstract void TurnOn();

    public override string ToString() => $"Устройство: {Name}";
}

// Наследник 1: наследует SmartDevice и дополнительно реализует интерфейс ISchedulable
class SmartLamp : SmartDevice, ISchedulable
{
    public int Brightness { get; }

    public SmartLamp(string name, int brightness) : base(name)
    {
        Brightness = brightness;
    }

    public override void TurnOn() =>
        Console.WriteLine($"Лампа «{Name}» включена на {Brightness}% яркости.");

    public void ScheduleAt(string time) =>
        Console.WriteLine($"Таймер для «{Name}» установлен на {time}.");
}

// Наследник 2: запечатанный класс (sealed), закрытый для дальнейшего наследования
sealed class Thermostat : SmartDevice
{
    public double TargetTemperature { get; }

    public Thermostat(string name, double targetTemp) : base(name)
    {
        TargetTemperature = targetTemp;
    }

    public override void TurnOn() =>
        Console.WriteLine($"Термостат «{Name}» поддерживает {TargetTemperature}°C.");
}

```

## Важные нюансы

* **Выбор между `abstract class` и `interface`:** если у типов есть общее состояние (поля, конструкторы) и прямая родственная связь — выбирайте `abstract class`; если нужно описать независимую способность сразу для нескольких разных иерархий или структур — используйте `interface`.
* **Полиморфизм вместо длинных цепочек `is` и `switch`:** старайтесь выносить различающееся поведение в `virtual` или `abstract` методы базового типа, а сопоставление с образцом (`is`) применяйте только там, где действительно нужно прочитать уникальные свойства конкретного подтипа.
* **Защита от хрупких иерархий (`sealed` и принцип LSP):** не выстраивайте наследование глубже 2–3 уровней и закрывайте конечные классы модификатором `sealed` — наследник должен полностью сохранять контракт родителя и не ломать логику при подстановке в базовый тип.
* **Что дальше:** освоив построение иерархий и общих контрактов, мы готовы перейти к универсальным шаблонам типов и контейнерам данных, которые избавляют от дублирования кода под разные типы (см. следующую группу: *Обобщения (Generics) и коллекции*).

## Куда дальше

* [Наследование](https://learn.microsoft.com/dotnet/csharp/fundamentals/object-oriented/inheritance) — базовые и производные классы в C#.
* [Полиморфизм](https://learn.microsoft.com/dotnet/csharp/fundamentals/object-oriented/polymorphism) — `virtual`, `override` и вызов через базовый тип.
