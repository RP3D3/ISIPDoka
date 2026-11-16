---
title: Циклы
keywords: циклы, повторение действий, итерация, while, for, foreach, счётчик, предусловие, постусловие, перебор элементов, условие выхода, выбор
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
    .cart {
      offset-path: path("M 440 88 A 170 62 0 1 1 440 212 A 170 62 0 1 1 440 88 Z");
      offset-rotate: 0deg;
      animation: drive 9s linear infinite;
    }
    .barrier-arm {
      transform-box: fill-box;
      transform-origin: right center;
      animation: liftBarrier 4.5s ease-in-out infinite;
    }
    .spark { transform-box: fill-box; transform-origin: center; animation: sparkPulse 4.5s ease-in-out infinite; }
    .cloud-1 { transform-box: fill-box; transform-origin: center; animation: drift1 8s ease-in-out infinite; }
    .cloud-2 { transform-box: fill-box; transform-origin: center; animation: drift2 9s ease-in-out infinite; }
    @keyframes drift1 { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(7px); } }
    @keyframes drift2 { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(-7px); } }
    @keyframes drive { from { offset-distance: 0%; } to { offset-distance: 100%; } }
    @keyframes liftBarrier {
      0%, 48%, 100% { transform: rotate(0deg); }
      64%, 82% { transform: rotate(-54deg); }
    }
    @keyframes sparkPulse { 0%, 40%, 100% { opacity: 0.2; } 60%, 72% { opacity: 1; } }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transform: none !important; opacity: 1 !important; }
    }
  </style>

  <path d="M 52 42 H 32 V 238 H 52" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 848 42 H 868 V 238 H 848" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <g transform="translate(168, 46)">
    <g class="cloud-1">
      <path d="M -26 9 H 26 C 32 9 36 4 36 -1 C 36 -6 32 -10 27 -10 C 25 -17 18 -21 11 -19 C 7 -25 -3 -25 -8 -19 C -15 -20 -21 -15 -21 -8 C -27 -8 -31 -3 -31 2 C -31 6 -29 9 -26 9 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
    </g>
  </g>
  <g transform="translate(742, 40)">
    <g class="cloud-2">
      <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
    </g>
  </g>

  <ellipse cx="440" cy="150" rx="170" ry="62" class="s-white" stroke-width="3" />
  <ellipse cx="440" cy="150" rx="150" ry="50" class="s-white" stroke-width="2" stroke-dasharray="6 12" opacity="0.45" />

  <g class="cart">
    <rect x="-23" y="-16" width="46" height="32" rx="9" class="c-white s-dark" stroke-width="2" />
    <rect x="-13" y="-6" width="26" height="12" rx="6" class="c-accent" />
    <circle cx="-9" cy="-9" r="3" class="c-dark" />
    <circle cx="9" cy="-9" r="3" class="c-dark" />
    <circle cx="-12" cy="19" r="5" class="c-dark s-white" stroke-width="1.5" />
    <circle cx="12" cy="19" r="5" class="c-dark s-white" stroke-width="1.5" />
  </g>

  <g transform="translate(96, 128)">
    <rect x="-40" y="-16" width="80" height="32" rx="8" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="14" font-weight="700">for</text>
    <line x1="0" y1="16" x2="0" y2="56" class="s-white" stroke-width="3" stroke-linecap="round" />
  </g>

  <g transform="translate(796, 150)">
    <rect x="-8" y="0" width="16" height="76" rx="5" class="c-dark s-white" stroke-width="2" />
    <g class="barrier-arm">
      <rect x="-92" y="-7" width="92" height="14" rx="7" class="c-white s-dark" stroke-width="2" />
      <rect x="-78" y="-7" width="10" height="14" class="c-accent" />
      <rect x="-52" y="-7" width="10" height="14" class="c-accent" />
      <rect x="-26" y="-7" width="10" height="14" class="c-accent" />
    </g>
  </g>
  <g transform="translate(806, 246)">
    <rect x="-34" y="-13" width="68" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">break</text>
  </g>

  <g transform="translate(612, 96)">
    <g class="spark">
      <line x1="0" y1="0" x2="16" y2="-14" class="s-white" stroke-width="2.5" stroke-linecap="round" />
      <line x1="8" y1="10" x2="26" y2="8" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
      <circle cx="20" cy="-2" r="3" class="c-white" />
    </g>
  </g>
  </svg>
---

# Шпаргалка по циклам

Какой цикл выбрать для повторения действий — `while`, `do-while`, `for` или `foreach`, и чем они отличаются на практике?

Все циклы избавляют от дублирования кода и автоматизируют повторяющиеся задачи, но различаются тем, в какой момент проверяют условие остановки и как работают со счётчиками или элементами коллекции.

## Таблица сравнения

| Цикл | Когда проверяет условие | Минимум проходов | Когда применять |
| --- | --- | --- | --- |
| `while` | Перед каждым шагом (предусловие) | 0 | Число повторений заранее неизвестно (ожидание события или нужного ввода) |
| `do-while` | После каждого шага (постусловие) | 1 | Код должен сработать минимум один раз (консольное меню, запрос пароля) |
| `for` | Перед каждым шагом (по счётчику) | 0 | Заранее известно точное число шагов, нужен индекс или обратный отсчёт |
| `foreach` | Автоматически (пока есть элементы) | 0 | Нужно безопасно прочитать все элементы массива, списка или строки |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. while — повторяем, пока не достигнем цели (число шагов заранее неизвестно)
        int battery = 40;
        while (battery < 100)
        {
            battery += 30;
        }
        Console.WriteLine($"Зарядка завершена: {battery}%");

        // 2. do-while — гарантированно выполняем блок минимум один раз
        int attempts = 0;
        do
        {
            attempts++;
            Console.WriteLine($"Попытка подключения №{attempts}");
        }
        while (attempts < 1);

        // 3. for — точное количество повторений со счётчиком и индексом
        string[] days = { "Пн", "Вт", "Ср" };
        for (int i = 0; i < days.Length; i++)
        {
            Console.WriteLine($"День {i + 1}: {days[i]}");
        }

        // 4. foreach — простой и безопасный перебор всех элементов подряд
        foreach (var day in days)
        {
            Console.Write($"{day} ");
        }
    }
}

```

## Краткий алгоритм выбора

* **Нужно обойти каждый элемент массива, списка или строки только для чтения:** выбирайте `foreach` — он самый короткий и защищает от выхода за границы.
* **Известно точное количество шагов, нужен номер элемента, нестандартный шаг или обратный отсчёт:** берите `for`.
* **Повторяете действие до наступления события, и оно может не выполниться ни разу:** используйте `while`.
* **Действие обязано выполниться хотя бы один раз до первой проверки (например, показ меню):** подойдёт `do-while`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой цикл выбрать, если число итераций известно?",
  "options": [
    {
      "text": "`for`",
      "correct": true
    },
    {
      "text": "`while`",
      "correct": false,
      "explanation": "`while` удобен при неизвестном числе шагов."
    },
    {
      "text": "`do while`",
      "correct": false,
      "explanation": "Он гарантирует хотя бы один проход."
    }
  ],
  "explanation": "`for` явно показывает начало, условие и шаг."
}
```

```quiz
{
  "type": "radio",
  "question": "Какой цикл гарантирует хотя бы один проход?",
  "options": [
    {
      "text": "`do while`",
      "correct": true
    },
    {
      "text": "`while`",
      "correct": false,
      "explanation": "Может не выполниться ни разу."
    },
    {
      "text": "`for`",
      "correct": false,
      "explanation": "Может не выполниться ни разу."
    }
  ],
  "explanation": "`do while` проверяет условие после тела."
}
```
