---
title: LAG и LEAD
keywords: lag sql, lead sql, оконные функции, сравнение с предыдущей строкой, динамика продаж, рост выручки, offset, default, postgresql, аналитика

---

# LAG и LEAD

Как сравнить выручку дня с предыдущим днём и посчитать рост в процентах, не соединяя таблицу сама с собой?

`LAG` и `LEAD` — оконные функции, которые достают значение из соседней строки: предыдущей или следующей. Они позволяют смотреть на динамику прямо в отчёте: «вчера было столько, сегодня столько, разница такая». Без них пришлось бы делать self-join по датам и следить за пропусками.

## Синтаксис

```sql
LAG(столбец, смещение, значение_по_умолчанию)
    OVER (PARTITION BY ... ORDER BY ...)
```

- `смещение` по умолчанию `1` — соседняя строка.
- `значение_по_умолчанию` подставляется, если соседа нет. Без него будет `NULL`.
- `ORDER BY` обязателен по смыслу: без порядка «предыдущая» строка не определена.

`LEAD` устроен так же, но смотрит вперёд.

## Пример: выручка по дням

```sql
WITH daily AS (
    SELECT
        created_at::date AS day,
        SUM(total) AS revenue
    FROM orders
    WHERE status IN ('paid', 'done')
    GROUP BY created_at::date
)
SELECT
    day,
    revenue,
    LAG(revenue) OVER (ORDER BY day) AS prev_revenue,
    revenue - LAG(revenue) OVER (ORDER BY day) AS delta,
    ROUND(
        100.0 * (revenue - LAG(revenue) OVER (ORDER BY day))
        / NULLIF(LAG(revenue) OVER (ORDER BY day), 0),
        1
    ) AS growth_pct
FROM daily
ORDER BY day;
```

| day | revenue | prev_revenue | delta | growth_pct |
| --- | --- | --- | --- | --- |
| 2026-05-10 | 260.00 | NULL | NULL | NULL |
| 2026-05-11 | 760.00 | 260.00 | 500.00 | 192.3 |
| 2026-05-12 | 690.00 | 760.00 | -70.00 | -9.2 |
| 2026-05-13 | 410.00 | 690.00 | -280.00 | -40.6 |
| 2026-05-14 | 920.00 | 410.00 | 510.00 | 124.4 |

Первая строка не имеет предыдущей, поэтому там `NULL`. `NULLIF(..., 0)` защищает от деления на ноль.

## Пример: соседние заказы клиента

```sql
SELECT
    customer_id,
    id AS order_id,
    created_at::date AS day,
    LAG(id) OVER (
        PARTITION BY customer_id
        ORDER BY created_at
    ) AS prev_order_id,
    LEAD(id) OVER (
        PARTITION BY customer_id
        ORDER BY created_at
    ) AS next_order_id
FROM orders
ORDER BY customer_id, created_at;
```

`PARTITION BY customer_id` не даёт сравнивать заказы разных клиентов. У первого заказа клиента `prev_order_id` будет `NULL`, у последнего — `next_order_id`.

## Значение по умолчанию

```sql
LAG(revenue, 1, 0) OVER (ORDER BY day) AS prev_revenue
```

С `0` первая строка получит `0`, а не `NULL`. Это удобно, когда дальше идёт арифметика и `NULL` её испортит. Но осторожно: `0` может выглядеть как реальная выручка.

## Грабли

* **`LAG` без `ORDER BY`.** Порядок не определён, результат непредсказуем. Всегда задавай сортировку внутри `OVER`.
* **`NULL` в первой строке.** Это нормально, но ломает арифметику. Используй `COALESCE` или значение по умолчанию.
* **Пропуски в календаре.** Если считать по строкам заказов, «предыдущая» строка — не обязательно вчера. Для честной динамики по дням сначала построй календарь через рекурсивный `CTE` или `generate_series`.
* **`LAG` не фильтрует.** Он не убирает строки, а только добавляет столбец. Фильтровать по нему можно снаружи, в подзапросе или `CTE`.
* **`PARTITION BY` и порядок.** Если раздел не задан, окно — вся выборка, и соседями станут строки разных клиентов.
* **Деление на ноль.** `NULLIF(prev, 0)` обязателен, если считаешь проценты.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что вернёт `LAG(revenue) OVER (ORDER BY day)` для первой строки?",
  "options": [
    { "text": "`NULL`, потому что предыдущей строки нет", "correct": true, "explanation": "Без значения по умолчанию `LAG` возвращает `NULL`." },
    { "text": "Значение первой строки", "correct": false, "explanation": "`LAG` смотрит назад, а не на текущую строку." },
    { "text": "Ошибку", "correct": false, "explanation": "Запрос выполнится, просто вернёт `NULL`." }
  ],
  "explanation": "У первой строки окна нет соседа слева."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `LAG` и `LEAD`?",
  "options": [
    { "text": "`LAG` смотрит на предыдущую строку, `LEAD` — на следующую.", "correct": true, "explanation": "Это их основное различие." },
    { "text": "`PARTITION BY` не даёт смешивать строки разных групп.", "correct": true, "explanation": "Например, заказы разных клиентов." },
    { "text": "Без `ORDER BY` внутри `OVER` результат непредсказуем.", "correct": true, "explanation": "Непонятно, какая строка соседняя." },
    { "text": "`LAG` удаляет первую строку из результата.", "correct": false, "explanation": "Он только добавляет столбец." }
  ],
  "explanation": "`LAG` и `LEAD` добавляют контекст соседних строк, не меняя количество строк."
}
```
