---
title: Аналитика: повторные покупки
keywords: повторные покупки, retention, когорты, ltv, аналитика sql, group by, having, postgresql, практикум, кофейня

---

# Аналитика: повторные покупки

Как найти клиентов, которые возвращаются, и понять, сколько денег они приносят?

Повторные покупки — ключевая метрика удержания. Самый простой вопрос: «сколько клиентов сделали больше одного заказа?» Дальше можно считать долю возвратов, средний чек постоянных клиентов и когорты по месяцу первого заказа.

## Клиенты с повторными заказами

```sql
SELECT
    c.id,
    c.name,
    COUNT(o.id) AS orders_count,
    SUM(o.total) AS revenue
FROM customers AS c
JOIN orders AS o ON o.customer_id = c.id
WHERE o.status IN ('paid', 'done')
GROUP BY c.id, c.name
HAVING COUNT(o.id) > 1
ORDER BY revenue DESC;
```

| id | name | orders_count | revenue |
| --- | --- | --- | --- |
| 1 | Анна | 2 | 1140.00 |

`HAVING` фильтрует уже сгруппированные строки.

## Доля возвратов

```sql
WITH per_customer AS (
    SELECT
        customer_id,
        COUNT(*) AS orders_count
    FROM orders
    WHERE status IN ('paid', 'done')
    GROUP BY customer_id
)
SELECT
    COUNT(*) FILTER (WHERE orders_count > 1) AS returning_customers,
    COUNT(*) AS total_customers,
    ROUND(
        100.0 * COUNT(*) FILTER (WHERE orders_count > 1) / COUNT(*),
        1
    ) AS returning_pct
FROM per_customer;
```

`FILTER` считает только подходящие строки, не меняя общий знаменатель.

## Средний чек постоянных и новых

```sql
WITH per_customer AS (
    SELECT
        customer_id,
        COUNT(*) AS orders_count,
        AVG(total) AS avg_check
    FROM orders
    WHERE status IN ('paid', 'done')
    GROUP BY customer_id
)
SELECT
    CASE WHEN orders_count > 1 THEN 'постоянный' ELSE 'новый' END AS segment,
    COUNT(*) AS customers,
    ROUND(AVG(avg_check), 2) AS avg_check
FROM per_customer
GROUP BY segment
ORDER BY segment;
```

## Когорты по месяцу

```sql
WITH first_order AS (
    SELECT
        customer_id,
        DATE_TRUNC('month', MIN(created_at))::date AS cohort
    FROM orders
    WHERE status IN ('paid', 'done')
    GROUP BY customer_id
)
SELECT
    cohort,
    COUNT(*) AS customers
FROM first_order
GROUP BY cohort
ORDER BY cohort;
```

Когорта — группа клиентов с общим первым заказом. Дальше можно смотреть, сколько из них вернулись в следующие месяцы.

## Грабли

* **Считать по всем статусам.** `new` и `cancelled` искажают удержание.
* **Путать клиентов и заказы.** `COUNT(*)` по заказам не равно числу клиентов.
* **`HAVING` вместо `WHERE`.** `WHERE` фильтрует строки до группировки, `HAVING` — после.
* **Делить на ноль.** Используй `NULLIF`.
* **Мало данных.** На трёх клиентах метрика бессмысленна.
* **Не учитывать период.** «Повторные» за всё время и за месяц — разные вопросы.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем `HAVING` отличается от `WHERE`?",
  "options": [
    { "text": "`HAVING` фильтрует после группировки", "correct": true, "explanation": "`WHERE` — до неё." },
    { "text": "`HAVING` работает только с `JOIN`", "correct": false, "explanation": "Он связан с `GROUP BY`." },
    { "text": "`WHERE` может фильтровать агрегаты", "correct": false, "explanation": "Для агрегатов нужен `HAVING`." }
  ],
  "explanation": "Порядок вычисления определяет, где можно фильтровать."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про аналитику повторных покупок?",
  "options": [
    { "text": "`HAVING COUNT(*) > 1` оставляет клиентов с несколькими заказами.", "correct": true, "explanation": "Это базовый фильтр." },
    { "text": "`FILTER` помогает считать долю без изменения знаменателя.", "correct": true, "explanation": "Удобно для метрик." },
    { "text": "Когорта — группа по месяцу первого заказа.", "correct": true, "explanation": "Помогает смотреть удержание." },
    { "text": "Отменённые заказы нужно включать в удержание.", "correct": false, "explanation": "Они не считаются покупкой." }
  ],
  "explanation": "Удержание требует аккуратного знаменателя и фильтра по статусам."
}
```
