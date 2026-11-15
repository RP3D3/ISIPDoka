---
title: Практика: наполняем кофейню
keywords: практика dml, insert, returning, update, delete, upsert, copy, мягкое удаление, postgresql, кофейня, наполнение базы

---

# Практика: наполняем кофейню

Как наполнить базу данными, провести заказ и обновить историю, не потеряв строки и не создав дубли?

Ниже — семь задач на DML. Выполняй их по порядку: заказ опирается на клиентов и напитки. Сначала попробуй сам, потом сверься с решением.

## Задачи

1. Добавить двух клиентов и вернуть их `id`.
2. Добавить напиток «Раф» или обновить цену, если он уже есть.
3. Создать новый заказ для Анны и получить его `id`.
4. Добавить в заказ две чашки капучино и одно какао.
5. Пересчитать `orders.total` по позициям заказа.
6. Пометить отзыв с оценкой 1 как удалённый.
7. Выгрузить напитки в CSV и удалить отменённые заказы.

## Решения

### 1. Новые клиенты

```sql
INSERT INTO customers (name, email)
VALUES
    ('Дмитрий', 'dmitry@zerno.ru'),
    ('Елена', 'elena@zerno.ru')
RETURNING id, name;
```

| id | name |
| --- | --- |
| 6 | Дмитрий |
| 7 | Елена |

### 2. Напиток через UPSERT

```sql
INSERT INTO drinks (name, category, price)
VALUES ('Раф', 'кофе', 330.00)
ON CONFLICT (name)
DO UPDATE SET
    category = EXCLUDED.category,
    price = EXCLUDED.price
RETURNING id, name, price;
```

Если «Раф» уже есть, цена обновится. Если нет — появится новая строка. Здесь предполагается, что `drinks.name` уникален, как в схеме из практики DDL.

### 3. Новый заказ

```sql
INSERT INTO orders (customer_id, status, total)
VALUES (1, 'new', 0)
RETURNING id, created_at;
```

| id | created_at |
| --- | --- |
| 129 | 2026-05-15 12:00+03 |

`total` пока 0: позиции ещё не добавлены.

### 4. Позиции заказа

```sql
INSERT INTO order_items (order_id, drink_id, quantity, unit_price)
VALUES
    (129, 2, 2, 280.00),
    (129, 6, 1, 260.00)
RETURNING order_id, drink_id, quantity, unit_price;
```

| order_id | drink_id | quantity | unit_price |
| --- | --- | --- | --- |
| 129 | 2 | 2 | 280.00 |
| 129 | 6 | 1 | 260.00 |

### 5. Пересчёт суммы

```sql
UPDATE orders AS o
SET total = (
    SELECT SUM(quantity * unit_price)
    FROM order_items
    WHERE order_id = o.id
)
WHERE o.id = 129
RETURNING id, total;
```

| id | total |
| --- | --- |
| 129 | 820.00 |

Подзапрос считает сумму позиций именно этого заказа.

### 6. Мягкое удаление отзыва

```sql
ALTER TABLE reviews ADD COLUMN deleted_at TIMESTAMPTZ;

UPDATE reviews
SET deleted_at = now()
WHERE rating = 1
RETURNING id, rating, deleted_at;
```

| id | rating | deleted_at |
| --- | --- | --- |
| 2 | 1 | 2026-05-15 12:05+03 |

Строка осталась в таблице, но обычные запросы должны фильтровать `deleted_at IS NULL`.

### 7. Выгрузка и удаление

```sql
COPY drinks TO '/tmp/drinks.csv' WITH (FORMAT csv, HEADER true);
```

Если файл нужен на клиенте:

```text
\copy drinks TO 'drinks.csv' CSV HEADER
```

Удаление отменённых заказов:

```sql
DELETE FROM orders
WHERE status = 'cancelled'
RETURNING id;
```

Если `order_items.order_id` объявлен с `ON DELETE CASCADE`, позиции удалятся вместе с заказом. Если нет — сначала удали позиции.

## Что заметить

* `RETURNING` избавляет от второго запроса за `id`.
* `ON CONFLICT` делает загрузку идемпотентной.
* Сумму заказа лучше считать по позициям, а не вводить вручную.
* Мягкое удаление — это флаг, а не `DELETE`.
* `COPY` выгружает данные быстро, но не обновляет существующие строки.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем в задаче 2 использовать `ON CONFLICT (name) DO UPDATE`?",
  "options": [
    { "text": "Чтобы не упасть на существующем напитке и обновить цену", "correct": true, "explanation": "Это идемпотентный UPSERT." },
    { "text": "Чтобы удалить старый напиток", "correct": false, "explanation": "Для удаления есть `DELETE`." },
    { "text": "Чтобы создать новый уникальный индекс", "correct": false, "explanation": "Индекс должен существовать заранее." }
  ],
  "explanation": "UPSERT опирается на уникальность `name`."
}
```

```quiz
{
  "type": "match",
  "question": "Соедини задачу с командой.",
  "pairs": [
    { "left": "добавить строку", "right": "`INSERT`" },
    { "left": "изменить строки", "right": "`UPDATE`" },
    { "left": "удалить строки", "right": "`DELETE`" },
    { "left": "вставить или обновить", "right": "`ON CONFLICT`" }
  ],
  "explanation": "DML-команды меняют данные, а `ON CONFLICT` управляет конфликтом уникальности."
}
```