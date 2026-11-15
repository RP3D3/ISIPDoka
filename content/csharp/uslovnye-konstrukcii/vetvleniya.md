---
title: Ветвления
keywords: условные конструкции, ветвление, if, else, тернарный оператор, switch, выбор значения, условие, проверка, сравнение, диапазон, логика
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
    .cart-run {
      offset-path: path("M 140 196 H 380 Q 440 196 480 176 L 700 148");
      offset-rotate: 0deg;
      animation: run 7s linear infinite;
    }
    .lever { transform-box: fill-box; transform-origin: center bottom; animation: switchLever 7s ease-in-out infinite; }
    @keyframes run { from { offset-distance: 0%; } to { offset-distance: 100%; } }
    @keyframes switchLever {
      0%, 34%, 100% { transform: rotate(0deg); }
      54%, 80% { transform: rotate(28deg); }
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

  <path d="M 120 196 H 380 Q 440 196 480 176 L 720 148" class="s-dark" stroke-width="12" fill="none" stroke-linecap="round" />
  <path d="M 120 196 H 380 Q 440 196 480 176 L 720 148" class="s-white" stroke-width="6" fill="none" stroke-linecap="round" />
  <path d="M 120 196 H 380 Q 440 196 480 176 L 720 148" class="s-dark" stroke-width="2" fill="none" stroke-dasharray="8 14" stroke-linecap="round" />

  <path d="M 380 196 Q 440 196 480 216 L 720 236" class="s-dark" stroke-width="12" fill="none" stroke-linecap="round" />
  <path d="M 380 196 Q 440 196 480 216 L 720 236" class="s-white" stroke-width="6" fill="none" stroke-linecap="round" />
  <path d="M 380 196 Q 440 196 480 216 L 720 236" class="s-dark" stroke-width="2" fill="none" stroke-dasharray="8 14" stroke-linecap="round" />

  <g class="cart-run">
    <rect x="-17" y="-12" width="34" height="24" rx="7" class="c-white s-dark" stroke-width="2" />
    <rect x="-9" y="-4" width="18" height="8" rx="4" class="c-accent" />
    <circle cx="-9" cy="14" r="4" class="c-dark s-white" stroke-width="1.5" />
    <circle cx="9" cy="14" r="4" class="c-dark s-white" stroke-width="1.5" />
  </g>

  <g transform="translate(424, 196)">
    <circle cx="0" cy="0" r="9" class="c-dark s-white" stroke-width="2" />
    <g class="lever">
      <rect x="-4" y="-40" width="8" height="40" rx="4" class="c-white s-dark" stroke-width="2" />
      <circle cx="0" cy="-46" r="8" class="c-white s-dark" stroke-width="2" />
      <circle cx="0" cy="-46" r="3.5" class="c-accent" />
    </g>
  </g>

  <g transform="translate(300, 108)">
    <rect x="-23" y="-13" width="46" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">if</text>
  </g>
  <g transform="translate(654, 256)">
    <rect x="-28" y="-13" width="56" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">else</text>
  </g>

  <g transform="translate(180, 120)">
    <line x1="0" y1="0" x2="14" y2="-12" class="s-white" stroke-width="2.5" stroke-linecap="round" />
    <line x1="8" y1="9" x2="24" y2="8" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
    <circle cx="18" cy="-2" r="3" class="c-white" />
  </g>
  </svg>
---

# Шпаргалка по условным конструкциям

Какую конструкцию ветвления выбрать для проверки условий — классический `if`, тернарный оператор или один из вариантов `switch`?

Все конструкции ветвления позволяют программе принимать решения, но различаются по назначению: одни выполняют блоки команд, а другие компактно возвращают готовое значение.

## Таблица сравнения

| Конструкция | Что делает | Особенности | Когда применять |
| --- | --- | --- | --- |
| `if / else if / else` | Выполняет блоки кода при истинности условий | Поддерживает любые сложные проверки (`&&`, `\|\|`), порядок веток важен | Для сложных логических условий, диапазонов и выполнения нескольких действий |
| Тернарный оператор `? :` | Возвращает одно из двух значений в одну строку | Работает только с двумя исходами; обе ветки должны иметь общий тип | Когда нужно быстро записать выбор между «да» и «нет» в переменную |
| Классический `switch` | Запускает блок кода по совпадению со значением | Требует `break` в конце ветки; умеет группировать несколько `case` | Когда проверяется одна переменная на множество точных вариантов с действиями |
| `switch`-выражение (`=>`) | Возвращает готовое значение по шаблону | Без слов `case` и `break`; поддерживает диапазоны и ветку `_` | Для чистого и компактного выбора значения по нескольким вариантам или интервалам |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        int level = 12;
        bool hasVip = true;

        // 1. if / else — сложная проверка с выполнением действий
        if (level >= 10 && hasVip)
        {
            Console.WriteLine("Доступ в закрытую зону открыт.");
        }
        else
        {
            Console.WriteLine("Нужен 10 уровень и VIP-статус.");
        }

        // 2. Тернарный оператор (? :) — выбор одного из двух значений
        int bonus = hasVip ? 500 : 100;

        // 3. Классический switch — выбор действия по точному значению
        string role = "mage";
        switch (role)
        {
            case "warrior":
                Console.WriteLine("Выбран ближний бой.");
                break;
            case "mage":
            case "archer":
                Console.WriteLine("Выбран дальний бой.");
                break;
            default:
                Console.WriteLine("Неизвестный класс.");
                break;
        }

        // 4. Современное switch-выражение — компактный возврат значения по диапазону
        string rank = level switch
        {
            < 5             => "Новичок",
            >= 5 and <= 15  => "Искатель",
            _               => "Ветеран"
        };

        Console.WriteLine($"Ранг: {rank}, стартовый бонус: {bonus}");
    }
}

```

## Краткий алгоритм выбора

* **Нужно выполнить несколько команд или проверить сложное условие с `&&` и `||`:** используйте `if / else if / else`.
* **Нужно выбрать одно из двух значений для переменной или вывода:** берите тернарный оператор `условие ? да : нет`.
* **Сравниваете одну переменную с набором точных вариантов и запускаете действия:** подойдёт классический `switch`.
* **Превращаете число, диапазон или код в итоговое значение для переменной:** выбирайте современное `switch`-выражение (`=>`).

