---
title: Массивы
keywords: массивы, одномерный массив, двумерный массив, матрица, зубчатый массив, индексы, длина, строки, столбцы, таблица данных, выбор
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
    .drop {
      transform-box: fill-box;
      transform-origin: center;
      animation: dropItem 4.6s ease-in-out infinite;
    }
    .ring-pulse { animation: ringPulse 4.6s ease-in-out infinite; }
    .spark { transform-box: fill-box; transform-origin: center; animation: sparkPulse 4.6s ease-in-out infinite; }
    .cloud-1 { transform-box: fill-box; transform-origin: center; animation: drift1 8s ease-in-out infinite; }
    .cloud-2 { transform-box: fill-box; transform-origin: center; animation: drift2 9s ease-in-out infinite; }
    @keyframes drift1 { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(7px); } }
    @keyframes drift2 { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(-7px); } }
    @keyframes dropItem {
      0%, 14% { transform: translateY(0px); }
      32%, 82% { transform: translateY(87px); }
      92%, 100% { transform: translateY(0px); }
    }
    @keyframes ringPulse {
      0%, 20%, 100% { opacity: 0.25; }
      34%, 78% { opacity: 0.9; }
    }
    @keyframes sparkPulse { 0%, 30%, 100% { opacity: 0.25; } 45%, 70% { opacity: 1; } }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transform: none !important; opacity: 1 !important; }
    }
  </style>

  <path d="M 52 42 H 32 V 238 H 52" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 848 42 H 868 V 238 H 848" class="s-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <g transform="translate(150, 46)">
    <g class="cloud-1">
      <path d="M -26 9 H 26 C 32 9 36 4 36 -1 C 36 -6 32 -10 27 -10 C 25 -17 18 -21 11 -19 C 7 -25 -3 -25 -8 -19 C -15 -20 -21 -15 -21 -8 C -27 -8 -31 -3 -31 2 C -31 6 -29 9 -26 9 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
    </g>
  </g>
  <g transform="translate(726, 40)">
    <g class="cloud-2">
      <path d="M -20 7 H 20 C 25 7 28 3 28 -1 C 28 -5 25 -8 21 -8 C 19 -14 14 -17 8 -15 C 5 -20 -2 -20 -6 -15 C -12 -16 -16 -12 -16 -6 C -21 -6 -24 -2 -24 2 C -24 5 -22 7 -20 7 Z" class="s-white" stroke-width="1.75" stroke-linejoin="round" />
    </g>
  </g>

  <g transform="translate(450, 158) scale(1.15)">
    <rect x="-180" y="-58" width="360" height="120" rx="16" class="c-white s-dark" stroke-width="2.5" />

    <rect x="-164" y="-44" width="56" height="68" rx="9" class="c-dark s-white" stroke-width="2" />
    <rect x="-96" y="-44" width="56" height="68" rx="9" class="c-dark s-white" stroke-width="2" />
    <rect x="-28" y="-44" width="56" height="68" rx="9" class="c-dark s-white" stroke-width="3" />
    <rect x="40" y="-44" width="56" height="68" rx="9" class="c-dark s-white" stroke-width="2" />
    <rect x="108" y="-44" width="56" height="68" rx="9" class="c-dark s-white" stroke-width="2" />

    <rect x="-33" y="-49" width="66" height="78" rx="12" class="s-white ring-pulse" stroke-width="2" />

    <text x="-136" y="46" text-anchor="middle" class="c-dark mono" font-size="12">0</text>
    <text x="-68" y="46" text-anchor="middle" class="c-dark mono" font-size="12">1</text>
    <text x="0" y="46" text-anchor="middle" class="c-white mono" font-size="12" font-weight="700">2</text>
    <text x="68" y="46" text-anchor="middle" class="c-dark mono" font-size="12">3</text>
    <text x="136" y="46" text-anchor="middle" class="c-dark mono" font-size="12">4</text>

    <rect x="-180" y="-96" width="70" height="22" rx="11" class="c-white s-dark" stroke-width="2" />
    <text x="-145" y="-81" text-anchor="middle" class="c-dark mono" font-size="11" font-weight="700">int[]</text>

    <line x1="0" y1="-82" x2="0" y2="-50" class="s-white" stroke-width="2.5" stroke-dasharray="4 6" opacity="0.5" />

    <g transform="translate(0, -96)">
      <g class="drop">
        <rect x="-18" y="-18" width="36" height="36" rx="8" class="c-white s-dark" stroke-width="2.2" />
        <rect x="-9" y="-9" width="18" height="18" rx="4" class="c-accent" />
      </g>
    </g>
  </g>

  <g transform="translate(712, 104)">
    <g class="spark">
      <line x1="0" y1="0" x2="16" y2="-14" class="s-white" stroke-width="2.5" stroke-linecap="round" />
      <line x1="8" y1="10" x2="26" y2="8" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
      <circle cx="20" cy="-2" r="3" class="c-white" />
    </g>
  </g>
  </svg>
---

# Шпаргалка по видам массивов

Какой массив выбрать для хранения данных — обычный линейный список, прямоугольную таблицу или «лесенку» со строками разной длины?

Все виды массивов хранят данные одного типа, имеют фиксированный размер после создания и используют нумерацию индексов с нуля. Разница между ними заключается в количестве измерений и форме таблицы.

## Таблица сравнения

| Вид массива | Объявление | Доступ к элементу | Как узнать размер | Когда применять |
| --- | --- | --- | --- | --- |
| Одномерный | `int[] arr = new int[5];` | `arr[i]` | `arr.Length` | Линейный список однотипных значений (оценки, имена, цены) |
| Двумерный (матрица) | `int[,] mat = new int[3, 4];` | `mat[row, col]` | `mat.GetLength(0)` (строки), `mat.GetLength(1)` (столбцы) | Строго прямоугольная таблица, игровое поле, сетка координат |
| Зубчатый (массив массивов) | `int[][] jag = new int[3][];` | `jag[row][col]` | `jag.Length` (строки), `jag[i].Length` (длина строки) | Таблица со строками разной длины без лишних пустых ячеек |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. Одномерный массив — линейный набор элементов
        int[] line = { 10, 20, 30 };
        Console.WriteLine($"Одномерный [1]: {line[1]}, длина: {line.Length}");

        // 2. Двумерный массив (матрица) — прямоугольная таблица 2x3
        int[,] matrix =
        {
            { 1, 2, 3 },
            { 4, 5, 6 }
        };
        Console.WriteLine($"Матрица [1, 2]: {matrix[1, 2]}, строк: {matrix.GetLength(0)}, столбцов: {matrix.GetLength(1)}");

        // 3. Зубчатый массив — строки разной длины
        int[][] jagged = new int[2][];
        jagged[0] = new int[] { 7, 8 };
        jagged[1] = new int[] { 9, 10, 11, 12 };
        Console.WriteLine($"Зубчатый [1][3]: {jagged[1][3]}, длина второй строки: {jagged[1].Length}");
    }
}

```

## Краткий алгоритм выбора

* **Нужен простой список элементов по порядку:** выбирайте одномерный массив `[]`.
* **Данные образуют строгую прямоугольную сетку с одинаковой длиной всех строк:** берите двумерный массив `[,]`.
* **В каждой строке хранится разное количество элементов (например, состав разных команд):** подойдёт зубчатый массив `[][]`.
* **Количество элементов должно свободно расти и уменьшаться во время работы программы:** вместо массивов лучше использовать динамический список `List`.

