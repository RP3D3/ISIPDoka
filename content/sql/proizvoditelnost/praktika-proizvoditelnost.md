---
title: Практика: ускоряем отчёт
keywords: практика sql, оптимизация, explain, индекс, составной индекс, частичный индекс, n+1, материализованное представление, postgresql, кофейня

---

# Практика: ускоряем отчёт

Как за пять шагов понять, почему отчёт тормозит, и ускорить его без изменения бизнес-логики?

Ниже — шесть задач на производительность. Каждая опирается на схему кофейни. Сначала попробуй сам, потом сверься с решением. Главное правило: измеряй до и после.

## Задачи

1. Прочитать план запроса выручки по дням.
2. Добавить индекс под фильтр по статусу и дате.
3. Ускорить поиск по `lower(name)`.
4. Заменить `N+1` одним `JOIN`.
5. Сделать частичный индекс для активных напитков.
6. Предрассчитать тяжёлый отчёт через материализованное представление.

## Решения

### 1. План запроса

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT created_at::date AS day, SUM(total) AS revenue
FROM orders
WHERE status IN ('paid', 'done')
GROUP BY created_at::date
ORDER BY day;
```

Смотри на `Seq Scan`, `actual time`, `rows` и `Rows Removed by Filter`. Если таблица большая, а условие селективное, нужен индекс.

### 2. Индекс под фильтр

```sql
CREATE INDEX idx_orders_status_created
ON orders (status, created_at);
```

Он помогает условию по `status` и диапазону по `created_at`. Для `GROUP BY created_at::date` функция всё равно может помешать; тогда стоит хранить дату отдельным столбцом или создать expression-индекс:

```sql
CREATE INDEX idx_orders_created_date
ON orders ((created_at::date))
WHERE status IN ('paid', 'done');
```

### 3. Поиск по `lower(name)`

```sql
CREATE INDEX idx_drinks_lower_name
ON drinks (lower(name));

SELECT *
FROM drinks
WHERE lower(name) = 'латте';
```

Индекс по `name` здесь не сработает.

### 4. Убрать `N+1`

Вместо запроса заказов и запроса клиента на каждый заказ:

```sql
SELECT
    o.id AS order_id,
    o.total,
    c.name AS customer
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
WHERE o.status IN ('paid', 'done')
ORDER BY o.created_at DESC
LIMIT 50;
```

Один запрос вместо пятидесяти одного.

### 5. Частичный индекс

```sql
CREATE INDEX idx_active_drinks_price
ON drinks (price)
WHERE is_active;

SELECT name, price
FROM drinks
WHERE is_active AND price < 300
ORDER BY price;
```

Индекс меньше и быстрее обновляется, потому что неактивные строки в него не попадают.

### 6. Материализованное представление

```sql
CREATE MATERIALIZED VIEW sales_by_day AS
SELECT
    created_at::date AS day,
    SUM(total) AS revenue
FROM orders
WHERE status IN ('paid', 'done')
GROUP BY created_at::date;

CREATE UNIQUE INDEX idx_sales_by_day_day ON sales_by_day (day);

REFRESH MATERIALIZED VIEW CONCURRENTLY sales_by_day;
```

Отчёт читает готовые строки. Обновляй по расписанию, например раз в час.

## Что заметить

* Сначала `EXPLAIN ANALYZE`, потом изменения.
* Индекс должен соответствовать условию: столбец, выражение, тип.
* Составной индекс работает слева направо.
* Частичный индекс дешевле, если нужна только часть строк.
* `N+1` лечится `JOIN` или пакетной загрузкой.
* Материализованное представление — компромисс: быстро, но не всегда актуально.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать первым при оптимизации запроса?",
  "options": [
    { "text": "Посмотреть `EXPLAIN ANALYZE`", "correct": true, "explanation": "План показывает реальные узкие места." },
    { "text": "Добавить индекс на все столбцы", "correct": false, "explanation": "Это замедлит запись и не гарантирует выигрыш." },
    { "text": "Переписать запрос на `CTE`", "correct": false, "explanation": "Сначала нужно понять причину." }
  ],
  "explanation": "Измерение до изменения — основа оптимизации."
}
```

```quiz
{
  "type": "match",
  "question": "Соедини проблему с решением.",
  "pairs": [
    { "left": "`lower(name)` в условии", "right": "expression-индекс" },
    { "left": "нужны только активные строки", "right": "частичный индекс" },
    { "left": "много запросов за связанными данными", "right": "`JOIN` или пакетная загрузка" },
    { "left": "тяжёлый отчёт читается часто", "right": "материализованное представление" }
  ],
  "explanation": "Каждая проблема имеет свой инструмент, а не универсальный индекс."
}
```
