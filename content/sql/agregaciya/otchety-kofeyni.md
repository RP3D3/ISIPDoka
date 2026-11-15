---
title: Отчёты кофейни
keywords: отчёты sql, выручка по дням, топ напитков, средний чек, group by, join, date_trunc, агрегаты, postgresql, кофейня, аналитика

---

# Отчёты кофейни

Как собрать из одной базы четыре отчёта, которые владелец кофейни попросит в первый же день?

Отчёт — это агрегация с правильным разрезом. «Сколько заработали по дням», «какие напитки продаются лучше», «кто из клиентов ходит чаще» — всё это `GROUP BY` плюс `JOIN` и немного арифметики. Ниже — четыре готовых запроса, которые можно запускать на схеме «Зерно».

## 1. Выручка по дням

```sql
SELECT
    date_trunc('day', created_at)::date AS day,
    COUNT(*) AS orders_count,
    SUM(total) AS revenue
FROM orders
WHERE status IN ('paid', 'done')
GROUP BY day
ORDER BY day;
```

| day | orders_count | revenue |
| --- | --- | --- |
| 2026-05-10 | 1 | 260.00 |
| 2026-05-11 | 1 | 760.00 |
| 2026-05-12 | 2 | 690.00 |
| 2026-05-13 | 1 | 410.00 |
| 2026-05-14 | 2 | 920.00 |

Отменённые и новые заказы не попадают в выручку: `WHERE` отсекает их до группировки. `date_trunc` превращает момент времени в день, `::date` убирает лишнюю полночь.

## 2. Топ напитков по выручке

```sql
SELECT
    d.name,
    SUM(oi.quantity) AS cups,
    SUM(oi.quantity * oi.unit_price) AS revenue
FROM order_items AS oi
JOIN drinks AS d ON d.id = oi.drink_id
JOIN orders AS o ON o.id = oi.order_id
WHERE o.status IN ('paid', 'done')
GROUP BY d.name
ORDER BY revenue DESC
LIMIT 5;
```

| name | cups | revenue |
| --- | --- | --- |
| Чай с бергамотом | 5 | 950.00 |
| Американо | 3 | 660.00 |
| Какао | 2 | 520.00 |
| Матча-латте | 1 | 320.00 |
| Латте | 1 | 310.00 |

`SUM(quantity)` считает чашки, `SUM(quantity * unit_price)` — деньги. Группировка по названию, а не по `id`, чтобы отчёт читался без дополнительного соединения.

## 3. Средний чек по клиентам

```sql
SELECT
    c.name,
    COUNT(o.id) AS orders_count,
    ROUND(AVG(o.total), 2) AS avg_check
FROM customers AS c
JOIN orders AS o ON o.customer_id = c.id
WHERE o.status IN ('paid', 'done')
GROUP BY c.name
HAVING COUNT(o.id) >= 2
ORDER BY avg_check DESC;
```

| name | orders_count | avg_check |
| --- | --- | --- |
| Игорь | 2 | 520.00 |
| Анна | 3 | 436.67 |

`WHERE` убирает отменённые и новые заказы, `HAVING` оставляет только клиентов с двумя и более заказами. Без `HAVING` в отчёт попали бы клиенты с одним заказом, и «средний чек» потерял бы смысл.

## 4. Выручка по категориям

```sql
SELECT
    d.category,
    SUM(oi.quantity * oi.unit_price) AS revenue
FROM order_items AS oi
JOIN drinks AS d ON d.id = oi.drink_id
JOIN orders AS o ON o.id = oi.order_id
WHERE o.status IN ('paid', 'done')
GROUP BY d.category
ORDER BY revenue DESC;
```

| category | revenue |
| --- | --- |
| чай | 1270.00 |
| кофе | 1250.00 |
| напиток | 520.00 |

Категория живёт в `drinks`, а деньги — в `order_items`, поэтому нужен `JOIN`. Это типичный отчёт: сначала соединяем, потом группируем.

## Грабли

* **Считать выручку по `orders.total` и по позициям одновременно.** Это два разных источника. Если `total` хранится как денормализация, он должен совпадать с суммой позиций; иначе отчёты разойдутся.
* **Забыть `WHERE` по статусу.** В выручку попадут отменённые заказы. Всегда уточняй, какие статусы считаются деньгами.
* **Группировать по `id`, а показывать `name`.** В PostgreSQL это сработает, если `id` — первичный ключ, но в других СУБД может потребовать `name` в `GROUP BY`.
* **`LIMIT` без `ORDER BY`.** «Топ-5» без сортировки — это пять произвольных напитков.
* **Средний чек по всем заказам.** Отменённые и новые заказы искажают среднее. Сначала реши, что считаешь деньгами.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему в отчёте по выручке стоит фильтр `WHERE status IN ('paid', 'done')`?",
  "options": [
    { "text": "Чтобы ускорить `GROUP BY`", "correct": false, "explanation": "Фильтр помогает, но главная причина — смысл отчёта." },
    { "text": "Чтобы отменённые и новые заказы не попали в деньги", "correct": true, "explanation": "Выручка — это оплаченные и завершённые заказы." },
    { "text": "Чтобы `SUM` не вернул `NULL`", "correct": false, "explanation": "`SUM` и так работает, вопрос в том, что считать." }
  ],
  "explanation": "Сначала определяется бизнес-смысл, потом пишется фильтр."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Какие приёмы нужны для отчёта «топ напитков по выручке»?",
  "options": [
    { "text": "`JOIN` между `order_items` и `drinks`", "correct": true, "explanation": "Название и категория живут в `drinks`." },
    { "text": "`GROUP BY` по напитку", "correct": true, "explanation": "Иначе не собрать итог по каждому напитку." },
    { "text": "`SUM(quantity * unit_price)`", "correct": true, "explanation": "Это выручка по позициям." },
    { "text": "`LIMIT` без `ORDER BY`", "correct": false, "explanation": "Для топа нужна сортировка по выручке." }
  ],
  "explanation": "Отчёт собирается из соединения, группировки, суммы и сортировки."
}
```