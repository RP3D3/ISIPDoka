---
title: Преобразование типов
keywords: преобразование типов, приведение типов, Parse, TryParse, Convert, ToString, кастинг, перевод строки в число, округление, ошибка ввода
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
    .pour { stroke-dasharray: 6 10; animation: pourDash 1.4s linear infinite; }
    .drop { transform-box: fill-box; transform-origin: center; animation: dropFall 3.6s ease-in infinite; }
    @keyframes pourDash { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -16; } }
    @keyframes dropFall {
      0% { transform: translateY(0px); opacity: 0; }
      16% { opacity: 1; }
      70% { transform: translateY(58px); opacity: 1; }
      84%, 100% { transform: translateY(64px); opacity: 0; }
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

  <line x1="250" y1="216" x2="660" y2="216" class="s-white" stroke-width="4" stroke-linecap="round" />
  <line x1="262" y1="216" x2="262" y2="242" class="s-white" stroke-width="3" stroke-linecap="round" />
  <line x1="648" y1="216" x2="648" y2="242" class="s-white" stroke-width="3" stroke-linecap="round" />

  <g transform="translate(320, 150)">
    <rect x="-18" y="-62" width="36" height="112" rx="18" class="c-white s-dark" stroke-width="2.5" />
    <rect x="-12" y="8" width="24" height="36" rx="12" class="c-accent" />
  </g>
  <g transform="translate(320, 68)">
    <rect x="-26" y="-13" width="52" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">int</text>
  </g>

  <g transform="translate(574, 160)">
    <path d="M -46 -52 H 46 V 42 C 46 60 -46 60 -46 42 Z" class="c-white s-dark" stroke-width="2.5" stroke-linejoin="round" />
    <rect x="-39" y="4" width="78" height="44" rx="10" class="c-accent" />
  </g>
  <g transform="translate(574, 80)">
    <rect x="-39" y="-13" width="78" height="26" rx="13" class="c-white s-dark" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" class="c-dark mono" font-size="12" font-weight="700">double</text>
  </g>

  <path d="M 320 92 C 380 76 490 80 546 112" class="s-white pour" stroke-width="3" fill="none" stroke-linecap="round" />
  <circle cx="430" cy="92" r="5" class="c-white drop" />

  <g transform="translate(760, 120)">
    <line x1="0" y1="0" x2="14" y2="-12" class="s-white" stroke-width="2.5" stroke-linecap="round" />
    <line x1="8" y1="9" x2="24" y2="8" class="s-white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />
    <circle cx="18" cy="-2" r="3" class="c-white" />
  </g>
  </svg>
---

# Шпаргалка по преобразованию типов

Какой инструмент выбрать для перевода данных между числами, строками и логическим типом, чтобы не потерять точность и избежать ошибок?

Выбор способа преобразования зависит от двух вещей: какие типы данных участвуют в переводе и насколько можно доверять исходному значению.

## Таблица сравнения

| Инструмент | Направление | Поведение и особенности | Когда применять |
| --- | --- | --- | --- |
| `(тип)` (кастинг) | Число -> Число | Отбрасывает дробную часть без округления; со строками не работает | Перевод совместимых чисел или деление `(double)a / b` |
| `Тип.Parse()` | Строка -> Число / `bool` | Роняет программу (`FormatException`), если в строке буквы или `null` | Когда на 100% уверены в правильном формате строки |
| `Тип.TryParse()` | Строка -> Число / `bool` | Не роняет программу; возвращает `true`/`false` и записывает ответ в `out` | Всегда при чтении чисел, введённых пользователем с клавиатуры |
| `Convert.To...()` | Любой -> Любой базовый | Округляет дроби по правилам математики; `null` превращает в `0`, но падает на буквах | Универсальный перевод между разными типами (например, `int` -> `bool`) |
| `.ToString()` | Любой -> Строка | Переводит значение в текст и задаёт формат (`"F2"`, `"N0"`); падает на `null` | Подготовка чисел и значений для вывода на экран или склейки с текстом |

## Пример кода

```csharp
using System;

class Program
{
    static void Main()
    {
        // 1. TryParse — безопасное чтение ввода пользователя
        Console.Write("Введите цену товара: ");
        string input = Console.ReadLine();

        if (double.TryParse(input, out double rawPrice))
        {
            // 2. Явное приведение (int) — просто отбрасываем копейки
            int wholeRubles = (int)rawPrice;

            // 3. Convert — математическое округление и перевод в bool
            int roundedRubles = Convert.ToInt32(rawPrice);
            bool hasPrice = Convert.ToBoolean(roundedRubles);

            // 4. Parse — перевод заведомо корректной строки
            int discount = int.Parse("10");

            // 5. ToString — перевод обратно в текст с форматированием
            string receipt = (rawPrice - discount).ToString("F2");

            Console.WriteLine($"Целых: {wholeRubles}, округлено: {roundedRubles}, есть цена: {hasPrice}");
            Console.WriteLine($"К оплате со скидкой: {receipt} руб.");
        }
        else
        {
            Console.WriteLine("Ошибка: введите корректное число.");
        }
    }
}

```

## Краткий алгоритм выбора

* **Читаете ввод с клавиатуры:** всегда берите `TryParse()`, чтобы случайная буква не закрыла программу с ошибкой.
* **Переводите одно число в другое:** для расширения (`int` -> `double`) писать ничего не нужно; для сужения (`double` -> `int`) ставьте `(int)` для отбрасывания дроби или `Convert.ToInt32()` для округления.
* **Готовите число к выводу на экран:** используйте `.ToString()` со спецификатором формата или интерполяцию строк `$"..."`.
