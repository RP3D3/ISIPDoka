---
title: Оптимизация: EXPLAIN и индексы
keywords: оптимизация sql, explain, индексы, составной индекс, частичный индекс, план запроса, postgresql, практикум, кофейня

---

# Оптимизация: EXPLAIN и индексы

Как ускорить каталог и отчёты, не добавляя индексы на каждый столбец?

Оптимизация начинается с плана. Сначала `EXPLAIN ANALYZE`, потом решение: индекс, переписывание запроса, материализованное представление или ничего. Каждый индекс — компромисс: быстрее чтение, дороже запись.

## Каталог

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, name, price
FROM drinks
WHERE is_active AND category = 'кофе'
ORDER BY price
LIMIT 20;
```

Если план показывает `Seq Scan`, проверь:

- есть ли индекс по `(category, price)`;
- не мешает ли `ORDER BY` без подходящего индекса;
- не слишком ли широкая выборка.

```sql
CREATE INDEX idx_drinks_category_price
ON drinks (category, price)
WHERE is_active;
```

Частичный индекс меньше и подходит именно под каталог.

## Отчёт по дням

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT created_at::date AS day, SUM(total)
FROM orders
WHERE status IN ('paid', 'done')
GROUP BY created_at::date;
```

Функция `created_at::date` может мешать индексу. Варианты:

```sql
CREATE INDEX idx_orders_status_created
ON orders (status, created_at);
```

или хранить дату отдельным столбцом:

```sql
ALTER TABLE orders ADD COLUMN order_day DATE
GENERATED ALWAYS AS (created_at::date) STORED;

CREATE INDEX idx_orders_day ON orders (order_day);
```

## Топ напитков

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT d.name, SUM(oi.quantity * oi.unit_price) AS revenue
FROM order_items AS oi
JOIN drinks AS d ON d.id = oi.drink_id
JOIN orders AS o ON o.id = oi.order_id
WHERE o.status IN ('paid', 'done')
GROUP BY d.name
ORDER BY revenue DESC
LIMIT 5;
```

Индексы по внешним ключам (`order_items.drink_id`, `order_items.order_id`) помогают соединениям. PostgreSQL не создаёт их автоматически.

## Когда индексы не нужны

- Таблица маленькая.
- Запрос выполняется редко.
- Выборка возвращает почти все строки.
- Индекс не используется из-за функции или типа.

## Грабли

* **Индекс на каждый столбец.** Замедляет запись и занимает место.
* **Оптимизация без замера.** Может не помочь или навредить.
* **Забыть про `ANALYZE`.** Статистика важна для плана.
* **Индекс по внешнему ключу не создан.** Соединения и каскады медленнее.
* **Материализованное представление без `REFRESH`.** Данные устаревают.
* **Тест на маленькой таблице.** План не показателен.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "С чего начинать оптимизацию?",
  "options": [
    { "text": "С `EXPLAIN ANALYZE` конкретного запроса", "correct": true, "explanation": "План показывает реальные узкие места." },
    { "text": "С создания индексов на все столбцы", "correct": false, "explanation": "Это замедлит запись." },
    { "text": "С удаления всех `JOIN`", "correct": false, "explanation": "Соединения часто нужны и эффективны." }
  ],
  "explanation": "Измерение до изменения — основа оптимизации."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает оптимизировать каталог и отчёты?",
  "options": [
    { "text": "Составной индекс под фильтр и сортировку.", "correct": true, "explanation": "Порядок столбцов важен." },
    { "text": "Индексы по внешним ключам для соединений.", "correct": true, "explanation": "PostgreSQL не создаёт их сам." },
    { "text": "Частичный индекс для активных строк.", "correct": true, "explanation": "Меньше и быстрее." },
    { "text": "Индекс на каждый столбец без анализа.", "correct": false, "explanation": "Лишние индексы дороги." }
  ],
  "explanation": "Индексы должны соответствовать запросам, а не покрывать всё подряд."
}
```
