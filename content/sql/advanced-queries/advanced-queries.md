---
title: Подзапросы, CTE и оконные функции
keywords: подзапросы sql, cte, with, оконные функции, row_number, rank, lag, lead, union, intersect, except, postgresql, аналитика
svg: |
  <svg viewBox="0 0 900 280" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 900px; max-height: 280px; height: auto; display: block; margin: 0 auto 20px;">
    <style>
      .t { fill: var(--text-main, #f4f6fb); }
      .d { fill: var(--bg-main, #16181d); }
      .a { fill: var(--domain-accent, #235ce1); }
      .st { stroke: var(--text-main, #f4f6fb); }
      .sa { stroke: var(--domain-accent, #235ce1); }
      .mono { font-family: 'JetBrains Mono', monospace; }
      .flow { stroke-dasharray: 6 7; animation: dash 2.6s linear infinite; }
      @keyframes dash { to { stroke-dashoffset: -26; } }
    </style>
    <g opacity="0.16" class="st">
      <circle cx="66" cy="66" r="3" />
      <circle cx="838" cy="58" r="3" />
      <path d="M760 230h16M768 222v16M110 232h14M117 225v14" stroke-width="2" />
      <path d="M40 130h-18M850 120h18" stroke-width="2" />
    </g>
    <text x="40" y="54" class="mono t" font-size="13" opacity=".55">SQL / 07</text>
    <text x="40" y="86" class="t" font-size="22" font-weight="700">ЗАПРОСЫ</text>
    <g transform="translate(280 30)"><g class="st" stroke-width="2.2">
      <rect x="10" y="26" width="150" height="92" rx="12" class="d" />
      <rect x="34" y="50" width="150" height="92" rx="12" class="d" opacity=".9" />
      <rect x="58" y="74" width="150" height="92" rx="12" class="a" opacity=".8" />
      <path d="M28 52h94M52 76h94M76 100h94" opacity=".55" />
      <circle cx="236" cy="126" r="34" class="d" stroke-width="4" />
      <path d="M260 150l28 28" class="sa" stroke-width="8" stroke-linecap="round" />
      <path d="M222 126h28M236 112v28" class="sa" stroke-width="3" />
    </g></g>
    <path d="M250 158h44" class="sa flow" stroke-width="3" stroke-linecap="round" />
    <g transform="translate(620 196)">
      <g transform="translate(0 0)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">CTE</text></g><g transform="translate(0 26)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">WINDOW</text></g><g transform="translate(0 52)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">UNION</text></g>
    </g>
  </svg>

---

# Подзапросы, CTE и оконные функции

Как ответить на вопрос «какой напиток самый популярный в каждой категории», если обычный `GROUP BY` схлопывает нужные строки?

Простые запросы читают одну таблицу и агрегируют её. Но реальные вопросы часто требуют промежуточных результатов: «сравни цену со средней», «найди последний заказ каждого клиента», «посчитай накопительную выручку». Для этого есть подзапросы, общие табличные выражения (`CTE`) и оконные функции. Они не заменяют базовый SQL, а собирают из него многоступенчатые конструкции.

## Вопрос, который не решается одним GROUP BY

«Покажи самый дорогой активный напиток в каждой категории». `GROUP BY category` вернёт по одной строке на категорию, но не название напитка. Нужно сначала пронумеровать напитки внутри категории, а потом оставить первые:

```sql
SELECT category, name, price
FROM (
    SELECT
        category, name, price,
        ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rn
    FROM drinks
    WHERE is_active
) AS ranked
WHERE rn = 1;
```

| category | name | price |
| --- | --- | --- |
| кофе | Латте | 310.00 |
| напиток | Какао | 260.00 |
| чай | Матча-латте | 320.00 |

Здесь работают сразу три инструмента: подзапрос в `FROM`, оконная функция и фильтр по номеру строки.

## Что разберём

Сначала — подзапросы: `IN`, `EXISTS`, скалярные и коррелированные, а также `LATERAL`. Потом — `CTE` и рекурсивные запросы, которые удобно читать сверху вниз. Дальше — оконные функции: `ROW_NUMBER`, `RANK`, `LAG`, `LEAD`, рамки окна и накопительные итоги. В конце — `UNION`, `INTERSECT`, `EXCEPT` и практика: аналитика кофейни.

Главная мысль группы: сложный запрос — это не одна гигантская конструкция, а несколько понятных шагов. Подзапросы и `CTE` дают имена промежуточным результатам, а оконные функции позволяют видеть строку в контексте соседей.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает оконная функция `ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC)`?",
  "options": [
    { "text": "Схлопывает строки в одну на категорию", "correct": false, "explanation": "Это делает `GROUP BY`." },
    { "text": "Нумерует строки внутри каждой категории по убыванию цены", "correct": true, "explanation": "Окно сохраняет строки и добавляет номер." },
    { "text": "Удаляет дубли", "correct": false, "explanation": "Для этого есть `DISTINCT` или `ROW_NUMBER` с фильтром." }
  ],
  "explanation": "Оконная функция считает по группе, но не сворачивает строки."
}
```