---
title: Практика: аналитика кофейни
keywords: практика sql, аналитика, подзапросы, cte, оконные функции, top-n, выручка, средний чек, retention, postgresql, кофейня

---

# Практика: аналитика кофейни

Как ответить владельцу на семь вопросов о кофейне: кто лучший клиент, что растёт, где провал, сколько денег приносит категория?

Ниже — семь задач на подзапросы, `CTE` и оконные функции. Каждая опирается на схему кофейни: `customers`, `drinks`, `orders`, `order_items`, `reviews`. Сначала попробуй сам, потом сверься с решением.

## Задачи

1. Выручка по дням и накопительный итог.
2. Средний чек по дням и его изменение к предыдущему дню.
3. Топ-3 напитка по выручке.
4. Самый дорогой напиток в каждой категории.
5. Клиенты, которые заказывали, но не оставляли отзыв.
6. Доля категории в общей выручке.
7. Клиенты с падением суммы заказов от первого к последнему.

## Решения

### 1. Выручка и накопительный итог

```sql
WITH daily AS (
    SELECT created_at::date AS day, SUM(total) AS revenue
    FROM orders
    WHERE status IN ('paid', 'done')
    GROUP BY created_at::date
)
SELECT
    day,
    revenue,
    SUM(revenue) OVER (ORDER BY day) AS running_total
FROM daily
ORDER BY day;
```

`SUM(...) OVER (ORDER BY day)` по умолчанию считает от начала до текущей строки.

### 2. Средний чек и динамика

```sql
WITH daily AS (
    SELECT
        created_at::date AS day,
        AVG(total) AS avg_check
    FROM orders
    WHERE status IN ('paid', 'done')
    GROUP BY created_at::date
)
SELECT
    day,
    ROUND(avg_check, 2) AS avg_check,
    ROUND(avg_check - LAG(avg_check) OVER (ORDER BY day), 2) AS delta
FROM daily
ORDER BY day;
```

`LAG` берёт средний чек предыдущего дня. У первого дня `delta` будет `NULL`.

### 3. Топ-3 напитка по выручке

```sql
WITH drink_revenue AS (
    SELECT
        d.id,
        d.name,
        SUM(oi.quantity * oi.unit_price) AS revenue
    FROM order_items AS oi
    JOIN drinks AS d ON d.id = oi.drink_id
    JOIN orders AS o ON o.id = oi.order_id
    WHERE o.status IN ('paid', 'done')
    GROUP BY d.id, d.name
)
SELECT name, revenue
FROM drink_revenue
ORDER BY revenue DESC
LIMIT 3;
```

Для простого «топ-3» достаточно `ORDER BY` и `LIMIT`. Оконная функция нужна, если топ нужен внутри каждой категории.

### 4. Самый дорогой напиток в категории

```sql
WITH ranked AS (
    SELECT
        category,
        name,
        price,
        ROW_NUMBER() OVER (
            PARTITION BY category
            ORDER BY price DESC, name
        ) AS rn
    FROM drinks
    WHERE is_active
)
SELECT category, name, price
FROM ranked
WHERE rn = 1
ORDER BY category;
```

Второй ключ `name` делает выбор детерминированным при одинаковой цене.

### 5. Заказывали, но не оставляли отзыв

```sql
SELECT DISTINCT c.id, c.name
FROM customers AS c
JOIN orders AS o ON o.customer_id = c.id
WHERE NOT EXISTS (
    SELECT 1
    FROM reviews AS r
    WHERE r.customer_id = c.id
)
ORDER BY c.name;
```

`NOT EXISTS` безопаснее `NOT IN`, если в `reviews.customer_id` может быть `NULL`.

### 6. Доля категории в выручке

```sql
WITH category_revenue AS (
    SELECT
        d.category,
        SUM(oi.quantity * oi.unit_price) AS revenue
    FROM order_items AS oi
    JOIN drinks AS d ON d.id = oi.drink_id
    JOIN orders AS o ON o.id = oi.order_id
    WHERE o.status IN ('paid', 'done')
    GROUP BY d.category
)
SELECT
    category,
    revenue,
    ROUND(100.0 * revenue / SUM(revenue) OVER (), 1) AS share_pct
FROM category_revenue
ORDER BY revenue DESC;
```

`SUM(revenue) OVER ()` — сумма по всему результату, без `PARTITION BY`.

### 7. Падение суммы заказов клиента

```sql
WITH per_order AS (
    SELECT
        o.customer_id,
        o.id,
        SUM(oi.quantity * oi.unit_price) AS order_total,
        ROW_NUMBER() OVER (
            PARTITION BY o.customer_id ORDER BY o.created_at
        ) AS rn_first,
        ROW_NUMBER() OVER (
            PARTITION BY o.customer_id ORDER BY o.created_at DESC
        ) AS rn_last
    FROM orders AS o
    JOIN order_items AS oi ON oi.order_id = o.id
    WHERE o.status IN ('paid', 'done')
    GROUP BY o.customer_id, o.id, o.created_at
),
bounds AS (
    SELECT
        customer_id,
        MAX(order_total) FILTER (WHERE rn_first = 1) AS first_total,
        MAX(order_total) FILTER (WHERE rn_last = 1) AS last_total
    FROM per_order
    GROUP BY customer_id
)
SELECT c.name, b.first_total, b.last_total,
       b.last_total - b.first_total AS delta
FROM bounds AS b
JOIN customers AS c ON c.id = b.customer_id
WHERE b.last_total < b.first_total
ORDER BY delta;
```

`FILTER` оставляет значение только у нужной строки, а `MAX` собирает его в одну строку на клиента. Это дешёвый способ «повернуть» пару строк в столбцы.

## Что заметить

* Аналитика почти всегда начинается с `CTE`: сначала подготовь чистые данные, потом считай.
* Оконные функции не уменьшают число строк, поэтому фильтр по рангу идёт снаружи.
* `LAG` и `LEAD` дают динамику без self-join.
* `SUM(...) OVER ()` — доля в общем итоге, `PARTITION BY` — доля внутри группы.
* `NOT EXISTS` надёжнее `NOT IN` при возможных `NULL`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему в задаче 4 фильтр `WHERE rn = 1` стоит снаружи `CTE`?",
  "options": [
    { "text": "Оконная функция вычисляется после `WHERE`, поэтому её нельзя фильтровать в том же запросе", "correct": true, "explanation": "Нужен внешний запрос или `CTE`." },
    { "text": "Так запрос работает быстрее", "correct": false, "explanation": "Причина в порядке вычисления, а не в скорости." },
    { "text": "`ROW_NUMBER` нельзя использовать внутри `CTE`", "correct": false, "explanation": "Можно, и это обычная практика." }
  ],
  "explanation": "Сначала вычисляются окна, потом внешний фильтр."
}
```

```quiz
{
  "type": "match",
  "question": "Соедини вопрос с инструментом.",
  "pairs": [
    { "left": "накопительная выручка", "right": "`SUM(...) OVER (ORDER BY day)`" },
    { "left": "динамика к прошлому дню", "right": "`LAG`" },
    { "left": "топ-1 в категории", "right": "`ROW_NUMBER` + фильтр" },
    { "left": "доля в общей сумме", "right": "`SUM(...) OVER ()`" }
  ],
  "explanation": "Каждый вопрос требует своей формы окна или подзапроса."
}
```
