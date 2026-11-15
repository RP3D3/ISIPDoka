---
title: Схема и данные
keywords: схема кофейни, create table, данные, seed, customers, drinks, orders, order_items, postgresql, практикум

---

# Схема и данные

Как собрать схему кофейни и наполнить её данными, на которых можно проверить все запросы практикума?

Схема практикума — та же, что в остальных группах: клиенты, напитки, ингредиенты, заказы, позиции и отзывы. Ниже — минимальный набор таблиц и данные, которых хватит для каталога, заказов и отчётов.

## Таблицы

```sql
CREATE TABLE customers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE drinks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL
        CHECK (category IN ('кофе', 'чай', 'напиток')),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customers(id),
    status TEXT NOT NULL DEFAULT 'new'
        CHECK (status IN ('new', 'paid', 'done', 'cancelled')),
    total NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (total >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE order_items (
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
    drink_id BIGINT REFERENCES drinks(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    PRIMARY KEY (order_id, drink_id)
);
```

## Данные

```sql
INSERT INTO customers (name, email)
VALUES
    ('Анна', 'anna@zerno.ru'),
    ('Игорь', 'igor@zerno.ru'),
    ('Мария', 'maria@zerno.ru');

INSERT INTO drinks (name, category, price)
VALUES
    ('Американо', 'кофе', 220.00),
    ('Капучино', 'кофе', 280.00),
    ('Латте', 'кофе', 310.00),
    ('Чай с бергамотом', 'чай', 190.00),
    ('Матча-латте', 'чай', 320.00),
    ('Какао', 'напиток', 260.00);

INSERT INTO orders (customer_id, status, total, created_at)
VALUES
    (1, 'paid', 640.00, '2026-05-10 09:15+03'),
    (2, 'paid', 280.00, '2026-05-11 12:40+03'),
    (1, 'done', 500.00, '2026-05-12 18:05+03');

INSERT INTO order_items (order_id, drink_id, quantity, unit_price)
VALUES
    (1, 2, 2, 280.00),
    (2, 1, 1, 220.00),
    (3, 3, 1, 310.00),
    (3, 4, 1, 190.00);
```

## Проверка

```sql
SELECT
    o.id,
    c.name AS customer,
    o.status,
    o.total,
    SUM(oi.quantity * oi.unit_price) AS items_total
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
JOIN order_items AS oi ON oi.order_id = o.id
GROUP BY o.id, c.name, o.status, o.total
ORDER BY o.id;
```

Если `total` и `items_total` совпадают, данные согласованы.

## Грабли

* **Порядок вставки.** Сначала родительские таблицы, потом дочерние.
* **`total` вручную.** Легко ошибиться; лучше считать по позициям.
* **Даты без пояса.** Используй `TIMESTAMPTZ`.
* **`unit_price` из текущего прайса.** Для истории нужна цена на момент заказа.
* **Забыть `COMMIT`.** В `psql` с `AUTOCOMMIT` команды фиксируются сразу, но в транзакции — нет.
* **Дубли.** `UNIQUE` на `drinks.name` и `customers.email` помогает.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему `unit_price` хранится в `order_items`, а не берётся из `drinks`?",
  "options": [
    { "text": "Чтобы сохранить цену на момент заказа", "correct": true, "explanation": "Текущая цена может измениться." },
    { "text": "Чтобы ускорить `JOIN`", "correct": false, "explanation": "Дело в истории, а не в скорости." },
    { "text": "Потому что `drinks.price` не существует", "correct": false, "explanation": "Существует." }
  ],
  "explanation": "История заказа должна сохранять фактические цены."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про схему практикума?",
  "options": [
    { "text": "`order_items` ссылается на `orders` и `drinks`.", "correct": true, "explanation": "Это связь M:N через позиции." },
    { "text": "`orders.customer_id` обязателен.", "correct": true, "explanation": "Заказ без клиента не имеет смысла." },
    { "text": "`total` можно не хранить, а всегда считать.", "correct": true, "explanation": "Но тогда его нужно пересчитывать в отчётах." },
    { "text": "Даты лучше хранить как `TEXT`.", "correct": false, "explanation": "`TIMESTAMPTZ` даёт корректные сравнения." }
  ],
  "explanation": "Схема должна сохранять связи и исторические факты."
}
```
