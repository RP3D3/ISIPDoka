---
title: Отчёты: выручка, топ, средний чек
keywords: отчеты sql, выручка, топ напитков, средний чек, group by, оконные функции, postgresql, практикум, кофейня

---

# Отчёты: выручка, топ, средний чек

Как ответить владельцу на три вопроса: сколько заработали, что продаётся лучше и сколько в среднем тратит клиент?

Отчёты — это агрегаты. Важно правильно определить, какие заказы учитывать, как считать выручку и что делать с отменёнными заказами. Обычно в выручку попадают только `paid` и `done`.

## Выручка по дням

```sql
SELECT
    created_at::date AS day,
    SUM(total) AS revenue,
    COUNT(*) AS orders_count
FROM orders
WHERE status IN ('paid', 'done')
GROUP BY created_at::date
ORDER BY day;
```

| day | revenue | orders_count |
| --- | --- | --- |
| 2026-05-10 | 640.00 | 1 |
| 2026-05-11 | 280.00 | 1 |
| 2026-05-12 | 500.00 | 1 |

## Топ напитков

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
| Капучино | 2 | 560.00 |
| Латте | 1 | 310.00 |
| Чай с бергамотом | 1 | 190.00 |

## Средний чек

```sql
SELECT
    ROUND(AVG(total), 2) AS avg_check
FROM orders
WHERE status IN ('paid', 'done');
```

Если считать средний чек по дням:

```sql
SELECT
    created_at::date AS day,
    ROUND(AVG(total), 2) AS avg_check
FROM orders
WHERE status IN ('paid', 'done')
GROUP BY created_at::date
ORDER BY day;
```

## Топ по категориям

```sql
WITH ranked AS (
    SELECT
        d.category,
        d.name,
        SUM(oi.quantity * oi.unit_price) AS revenue,
        ROW_NUMBER() OVER (
            PARTITION BY d.category
            ORDER BY SUM(oi.quantity * oi.unit_price) DESC
        ) AS rn
    FROM order_items AS oi
    JOIN drinks AS d ON d.id = oi.drink_id
    JOIN orders AS o ON o.id = oi.order_id
    WHERE o.status IN ('paid', 'done')
    GROUP BY d.category, d.name
)
SELECT category, name, revenue
FROM ranked
WHERE rn = 1
ORDER BY category;
```

## Грабли

* **Считать отменённые заказы.** Они искажают выручку.
* **`COUNT(*)` вместо `COUNT(DISTINCT ...)`.** Если соединение размножает строки, количество заказов завышается.
* **Средний чек по позициям.** Это средняя позиция, а не средний заказ.
* **`NULL` в сумме.** `COALESCE` помогает, если данных нет.
* **Деньги в `FLOAT`.** Используй `NUMERIC`.
* **Отчёт без периода.** Всегда ограничивай даты, иначе он будет расти.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какие заказы обычно включают в выручку?",
  "options": [
    { "text": "`paid` и `done`", "correct": true, "explanation": "Отменённые и новые не должны искажать выручку." },
    { "text": "Все заказы, включая `cancelled`", "correct": false, "explanation": "Отменённые не приносят денег." },
    { "text": "Только `new`", "correct": false, "explanation": "Это ещё не оплаченные заказы." }
  ],
  "explanation": "Фильтр по статусу — обязательная часть финансового отчёта."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про отчёты?",
  "options": [
    { "text": "Средний чек считается по заказам, а не по позициям.", "correct": true, "explanation": "Это разные метрики." },
    { "text": "`COUNT(DISTINCT o.id)` защищает от размножения строк.", "correct": true, "explanation": "При соединениях это важно." },
    { "text": "`ROW_NUMBER` помогает выбрать топ внутри категории.", "correct": true, "explanation": "С фильтром `rn = 1`." },
    { "text": "Отменённые заказы увеличивают выручку.", "correct": false, "explanation": "Их нужно исключать." }
  ],
  "explanation": "Отчёт должен отвечать на вопрос, а не просто суммировать всё подряд."
}
```
