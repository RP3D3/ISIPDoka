---
title: CTE: WITH
keywords: cte sql, with, общие табличные выражения, читаемость запроса, материализация, postgresql, аналитика, промежуточные результаты
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / CTE</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <rect x="0" y="52" width="88" height="70" rx="10" class="d" />
      <rect x="120" y="52" width="88" height="70" rx="10" class="d" />
      <rect x="240" y="52" width="88" height="70" rx="10" class="a" opacity=".85" />
      <path d="M88 87h24M208 87h24" class="sa" stroke-width="3" />
      <path d="M112 79l8 8-8 8M232 79l8 8-8 8" class="sa" stroke-width="2.5" />
      <text x="16" y="92" class="mono t" font-size="12">WITH</text>
      <text x="136" y="92" class="mono t" font-size="12">SELECT</text>
      <text x="260" y="92" class="mono d" font-size="12">RESULT</text>
      <path d="M20 140h288" class="sa" stroke-width="1.5" opacity=".25" stroke-dasharray="4 6" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">WITH</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">шаги</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">читаемость</text></g>
    </g>
  </svg>

---

# CTE: WITH

Как разбить длинный запрос на понятные шаги и не потеряться во вложенных подзапросах?

`CTE` (Common Table Expression, общее табличное выражение) — это именованный промежуточный результат, который живёт в рамках одного запроса. Он начинается с `WITH`, может ссылаться на предыдущие `CTE` и делает сложную логику линейной: сверху — исходные данные, ниже — агрегаты, в конце — итоговый `SELECT`.

## Синтаксис

```sql
WITH имя AS (
    SELECT ...
),
другое_имя AS (
    SELECT ...
    FROM имя
)
SELECT ...
FROM другое_имя;
```

`CTE` виден только в том запросе, где объявлен. В отличие от `VIEW`, он не сохраняется в базе.

## Пример

Сначала оплаченные заказы, потом итоги по клиентам:

```sql
WITH paid_orders AS (
    SELECT id, customer_id, total
    FROM orders
    WHERE status = 'paid'
),
customer_totals AS (
    SELECT
        customer_id,
        COUNT(*) AS orders_count,
        SUM(total) AS revenue
    FROM paid_orders
    GROUP BY customer_id
)
SELECT c.name, ct.orders_count, ct.revenue
FROM customer_totals AS ct
JOIN customers AS c ON c.id = ct.customer_id
ORDER BY ct.revenue DESC;
```

| name | orders_count | revenue |
| --- | --- | --- |
| Игорь | 1 | 760.00 |
| Анна | 1 | 640.00 |
| Павел | 1 | 500.00 |

Каждый шаг можно прочитать отдельно: `paid_orders` — какие заказы считать, `customer_totals` — сколько и на какую сумму, финальный `SELECT` — как показать.

## Несколько CTE

```sql
WITH active_drinks AS (
    SELECT id, name, category, price
    FROM drinks
    WHERE is_active
),
category_stats AS (
    SELECT category, AVG(price) AS avg_price
    FROM active_drinks
    GROUP BY category
)
SELECT d.name, d.price, s.avg_price
FROM active_drinks AS d
JOIN category_stats AS s ON s.category = d.category
ORDER BY d.category, d.price;
```

`category_stats` использует `active_drinks`, объявленный выше. Порядок важен: `CTE` видит только предыдущие.

## CTE и производительность

В PostgreSQL 12+ простые `CTE` могут встраиваться в основной запрос, как подзапросы. Если нужно принудительно материализовать результат, есть `MATERIALIZED`:

```sql
WITH heavy AS MATERIALIZED (
    SELECT ...
)
SELECT * FROM heavy;
```

Материализация помогает, когда `CTE` используется несколько раз и считается дорого, но может мешать, если фильтр снаружи мог бы сократить работу.

## Грабли

* **`CTE` не сохраняется.** Это не таблица и не `VIEW`; после запроса он исчезает.
* **Ссылка вперёд.** `CTE` не видит те, что объявлены ниже. Порядок объявления имеет значение.
* **Имя пересекается с таблицей.** Лучше давать осмысленные имена, чтобы не путать.
* **Рекурсия.** Для рекурсивного `CTE` нужно `WITH RECURSIVE`, иначе запрос не выполнится.
* **Лишняя материализация.** На больших данных `MATERIALIZED` может замедлить запрос, если внешний фильтр мог бы отсечь строки раньше.
* **Слишком много `CTE`.** Десять шагов читаются не лучше десяти подзапросов. Держи баланс.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где существует `CTE`?",
  "options": [
    { "text": "Только внутри одного запроса", "correct": true, "explanation": "После запроса он исчезает." },
    { "text": "В базе как постоянная таблица", "correct": false, "explanation": "Это `VIEW` или таблица." },
    { "text": "В отдельной схеме `cte`", "correct": false, "explanation": "`CTE` не создаёт объект схемы." }
  ],
  "explanation": "`CTE` — временный именованный результат в рамках запроса."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `CTE`?",
  "options": [
    { "text": "Может ссылаться на предыдущий `CTE`.", "correct": true, "explanation": "Объявления читаются сверху вниз." },
    { "text": "Делает сложный запрос линейным и читаемым.", "correct": true, "explanation": "Это главный практический плюс." },
    { "text": "Для рекурсии нужен `WITH RECURSIVE`.", "correct": true, "explanation": "Иначе рекурсивная ссылка не сработает." },
    { "text": "Всегда материализуется на диск.", "correct": false, "explanation": "PostgreSQL может встраивать простые `CTE`." }
  ],
  "explanation": "`CTE` — инструмент читаемости и структуры, а не автоматический ускоритель."
}
```