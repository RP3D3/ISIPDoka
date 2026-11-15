---
title: GROUP BY
keywords: group by sql, группировка, агрегаты по группам, count, sum, avg, статусы заказов, категории, postgresql, отчёты
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
    <g opacity="0.14" class="st">
      <circle cx="54" cy="54" r="3" />
      <circle cx="846" cy="62" r="3" />
      <path d="M800 226h16M808 218v16M60 236h14M67 229v14" stroke-width="2" />
    </g>
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / GROUP BY</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <circle cx="24" cy="38" r="11" class="a" opacity=".8" />
      <circle cx="60" cy="38" r="11" class="a" opacity=".8" />
      <circle cx="96" cy="38" r="11" class="a" opacity=".8" />
      <circle cx="24" cy="74" r="11" class="a" opacity=".8" />
      <circle cx="60" cy="74" r="11" class="a" opacity=".8" />
      <circle cx="96" cy="74" r="11" class="a" opacity=".8" />
      <path d="M130 56h44" class="sa flow" stroke-width="3" />
      <rect x="190" y="14" width="62" height="34" rx="8" class="d" />
      <rect x="190" y="58" width="62" height="34" rx="8" class="d" />
      <rect x="190" y="102" width="62" height="34" rx="8" class="d" />
      <path d="M206 33h30M206 77h30M206 121h30" class="sa" stroke-width="2.5" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">группы</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">агрегаты</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">HAVING</text></g>
    </g>
  </svg>

---

# GROUP BY

Как посчитать не одну общую сумму, а отдельно по каждому статусу заказа или категории напитка?

`GROUP BY` собирает строки в группы по одинаковым значениям и применяет агрегат к каждой группе. Вместо одной цифры по всей таблице ты получаешь таблицу итогов: сколько заказов в каждом статусе, какая средняя цена в каждой категории, сколько потратил каждый клиент.

## Как это работает

Представь, что ты раскладываешь чеки по коробкам с надписями «новые», «оплаченные», «завершённые», «отменённые». В каждой коробке — своя стопка. `GROUP BY` делает то же самое: строки с одинаковым значением столбца попадают в одну группу, а агрегат считает итог по каждой коробке отдельно.

## Синтаксис

```sql
SELECT столбец_группы, агрегат(столбец)
FROM таблица
WHERE условие
GROUP BY столбец_группы
ORDER BY столбец_группы;
```

Правило простое: в `SELECT` могут быть только столбцы из `GROUP BY` и агрегаты. Всё остальное база не сможет однозначно сопоставить с группой.

## Пример

Заказы и выручка по статусам:

```sql
SELECT
    status,
    COUNT(*) AS orders_count,
    SUM(total) AS revenue
FROM orders
GROUP BY status
ORDER BY status;
```

| status | orders_count | revenue |
| --- | --- | --- |
| cancelled | 1 | 320.00 |
| done | 4 | 1140.00 |
| new | 1 | 240.00 |
| paid | 3 | 1900.00 |

В каждой строке — итог по своей группе. `cancelled` — один отменённый заказ на 320, `paid` — три заказа на 1900.

Средняя цена активных напитков по категориям:

```sql
SELECT
    category,
    COUNT(*) AS drinks_count,
    ROUND(AVG(price), 2) AS avg_price
FROM drinks
WHERE is_active
GROUP BY category
ORDER BY category;
```

| category | drinks_count | avg_price |
| --- | --- | --- |
| кофе | 3 | 270.00 |
| напиток | 2 | 250.00 |
| чай | 2 | 255.00 |

## GROUP BY и NULL

`NULL` считается отдельным значением группы. Если у части заказов `customer_id` пустой, они соберутся в группу `NULL`, а не смешаются с остальными.

```sql
SELECT customer_id, COUNT(*)
FROM orders
GROUP BY customer_id;
```

В результате будет строка с `customer_id = NULL`, если такие заказы есть. Это не ошибка, но в отчёте её стоит либо отфильтровать, либо подписать.

## Грабли

* **Обычный столбец без `GROUP BY`.** `SELECT name, COUNT(*) FROM drinks GROUP BY category` не выполнится: `name` не входит в группировку.
* **`WHERE` не видит группы.** Фильтр по агрегату (`HAVING`) — отдельная конструкция, ей посвящена следующая карточка.
* **`GROUP BY` по выражению.** Можно группировать по `date_trunc('day', created_at)`, но в `SELECT` нужно повторить то же выражение или использовать псевдоним (в PostgreSQL).
* **Пустые группы не появляются.** Если в категории нет строк, её не будет в результате. Для «всех категорий, даже с нулём» нужен `LEFT JOIN` со справочником.
* **Сортировка не входит в группировку.** `GROUP BY` не гарантирует порядок; для порядка нужен `ORDER BY`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему запрос `SELECT name, COUNT(*) FROM drinks GROUP BY category` вызовет ошибку?",
  "options": [
    { "text": "Потому что `COUNT(*)` нельзя использовать с `GROUP BY`", "correct": false, "explanation": "Можно, это типичный случай." },
    { "text": "Потому что `name` не входит в `GROUP BY` и не является агрегатом", "correct": true, "explanation": "База не знает, какое из имён категории показать." },
    { "text": "Потому что в таблице нет столбца `category`", "correct": false, "explanation": "Столбец есть, проблема в `name`." }
  ],
  "explanation": "В `SELECT` при группировке допустимы только групповые столбцы и агрегаты."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `GROUP BY`?",
  "options": [
    { "text": "Собирает строки с одинаковым значением в одну группу.", "correct": true, "explanation": "Это основная идея." },
    { "text": "`NULL` образует отдельную группу.", "correct": true, "explanation": "Пустые значения считаются равными друг другу для группировки." },
    { "text": "Гарантирует порядок строк в результате.", "correct": false, "explanation": "Для порядка нужен `ORDER BY`." },
    { "text": "Позволяет считать агрегаты отдельно по каждой группе.", "correct": true, "explanation": "В этом и смысл группировки." }
  ],
  "explanation": "`GROUP BY` делит строки на группы, а `ORDER BY` уже сортирует итог."
}
```