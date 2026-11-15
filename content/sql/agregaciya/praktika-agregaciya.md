---
title: Практика: собираем отчёты
keywords: практика sql, агрегация, group by, having, rollup, отчёты, выручка, топ напитков, средний чек, кофейня, задачи sql

---

# Практика: собираем отчёты

Как из восьми вопросов владельца кофейни собрать восемь запросов, не подсматривая в шпаргалку?

Ниже — задачи на агрегаты, `GROUP BY`, `HAVING` и `JOIN`. Сначала попробуй написать запрос сам, потом сверься с решением. Считай, что в базе лежат данные из схемы «Зерно»: девять заказов, семь активных напитков и позиции заказов.

## Задачи

1. Сколько всего напитков и сколько из них активны?
2. Средняя цена активных напитков по категориям, от дорогой категории к дешёвой.
3. Количество заказов и выручка по каждому статусу.
4. Клиенты с двумя и более оплаченными или завершёнными заказами: имя, число заказов и средний чек.
5. Топ-3 напитка по количеству проданных чашек.
6. Выручка по дням за оплаченные и завершённые заказы.
7. Категории, где средняя цена активных напитков выше 250.
8. Выручка по категориям с общим итогом.

## Решения

### 1. Всего и активных напитков

```sql
SELECT
    COUNT(*) AS all_drinks,
    COUNT(*) FILTER (WHERE is_active) AS active_drinks
FROM drinks;
```

`COUNT(*)` считает все строки, `FILTER` — только те, где условие истинно. Результат: 8 и 7.

### 2. Средняя цена по категориям

```sql
SELECT
    category,
    ROUND(AVG(price), 2) AS avg_price
FROM drinks
WHERE is_active
GROUP BY category
ORDER BY avg_price DESC;
```

Сначала `WHERE` убирает неактивные напитки, потом `GROUP BY` собирает категории. Результат: кофе 270.00, чай 255.00, напиток 250.00.

### 3. Заказы и выручка по статусам

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

### 4. Средний чек постоянных клиентов

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

`WHERE` оставляет только денежные заказы, `HAVING` — только клиентов с двумя и более заказами. Результат: Игорь — 2 заказа, 520.00; Анна — 3 заказа, 436.67.

### 5. Топ-3 напитка по чашкам

```sql
SELECT
    d.name,
    SUM(oi.quantity) AS cups
FROM order_items AS oi
JOIN drinks AS d ON d.id = oi.drink_id
JOIN orders AS o ON o.id = oi.order_id
WHERE o.status IN ('paid', 'done')
GROUP BY d.name
ORDER BY cups DESC, d.name
LIMIT 3;
```

| name | cups |
| --- | --- |
| Чай с бергамотом | 5 |
| Американо | 3 |
| Какао | 2 |

Второй ключ `d.name` делает порядок однозначным, если у напитков совпадёт число чашек.

### 6. Выручка по дням

```sql
SELECT
    date_trunc('day', created_at)::date AS day,
    SUM(total) AS revenue
FROM orders
WHERE status IN ('paid', 'done')
GROUP BY day
ORDER BY day;
```

| day | revenue |
| --- | --- |
| 2026-05-10 | 260.00 |
| 2026-05-11 | 760.00 |
| 2026-05-12 | 690.00 |
| 2026-05-13 | 410.00 |
| 2026-05-14 | 920.00 |

### 7. Категории со средней ценой выше 250

```sql
SELECT
    category,
    ROUND(AVG(price), 2) AS avg_price
FROM drinks
WHERE is_active
GROUP BY category
HAVING AVG(price) > 250
ORDER BY avg_price DESC;
```

| category | avg_price |
| --- | --- |
| кофе | 270.00 |
| чай | 255.00 |

«Напиток» со средней 250 не попал: условие строгое.

### 8. Выручка по категориям с итогом

```sql
SELECT
    d.category,
    SUM(oi.quantity * oi.unit_price) AS revenue
FROM order_items AS oi
JOIN drinks AS d ON d.id = oi.drink_id
JOIN orders AS o ON o.id = oi.order_id
WHERE o.status IN ('paid', 'done')
GROUP BY ROLLUP (d.category)
ORDER BY d.category NULLS LAST;
```

| category | revenue |
| --- | --- |
| кофе | 1250.00 |
| напиток | 520.00 |
| чай | 1270.00 |
| NULL | 3040.00 |

Строка с `NULL` — общий итог по всем категориям. В приложении её подписывают через `GROUPING` или `COALESCE(category, 'Всего')`.

## Что заметить

* `WHERE` работает до группировки, `HAVING` — после. Это определяет, куда ставить условие.
* `COUNT(*)` и `COUNT(столбец)` считают разное, если есть `NULL`.
* Для топа всегда нужен `ORDER BY`; `LIMIT` без него бессмыслен.
* `JOIN` нужен, когда агрегат и разрез живут в разных таблицах.
* `ROLLUP` добавляет итоги, но требует аккуратной сортировки с `NULLS LAST`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "В каком порядке база обрабатывает `WHERE`, `GROUP BY` и `HAVING`?",
  "options": [
    { "text": "`GROUP BY` → `WHERE` → `HAVING`", "correct": false, "explanation": "Сначала строки, потом группы, потом фильтр групп." },
    { "text": "`WHERE` → `GROUP BY` → `HAVING`", "correct": true, "explanation": "Это логический порядок агрегации." },
    { "text": "`HAVING` → `WHERE` → `GROUP BY`", "correct": false, "explanation": "`HAVING` не может выполняться до группировки." }
  ],
  "explanation": "Сначала отбираем строки, затем собираем группы, затем отбираем группы."
}
```

```quiz
{
  "type": "match",
  "question": "Соедини задачу с конструкцией.",
  "pairs": [
    { "left": "посчитать строки", "right": "`COUNT(*)`" },
    { "left": "отфильтровать строки", "right": "`WHERE`" },
    { "left": "отфильтровать группы", "right": "`HAVING`" },
    { "left": "добавить общий итог", "right": "`ROLLUP`" }
  ],
  "explanation": "Каждая конструкция отвечает за свой этап отчёта."
}
```