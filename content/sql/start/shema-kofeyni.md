---
title: Схема кофейни «Зерно»
keywords: схема базы данных, кофейня, таблицы, связи, primary key, foreign key, order items, многие ко многим, postgresql, учебный проект

---

# Схема кофейни «Зерно»

Как выглядит база, в которой есть клиенты, напитки, заказы и отзывы, и почему именно такая схема удобна для практики?

Все примеры раздела работают с одной базой — кофейней «Зерно». В ней семь таблиц: клиенты, напитки, ингредиенты, заказы, позиции заказов, отзывы и связь напитков с ингредиентами. Схема не идеальна, но достаточно реалистична: в ней есть связи «один ко многим», «многие ко многим» и деньги.

## Таблицы

```sql
CREATE TABLE customers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE drinks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE ingredients (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    unit TEXT NOT NULL,
    cost_per_unit NUMERIC(10, 2) NOT NULL
);

CREATE TABLE drink_ingredients (
    drink_id BIGINT REFERENCES drinks(id),
    ingredient_id BIGINT REFERENCES ingredients(id),
    amount NUMERIC(8, 2) NOT NULL,
    PRIMARY KEY (drink_id, ingredient_id)
);

CREATE TABLE orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id BIGINT REFERENCES customers(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    status TEXT NOT NULL DEFAULT 'new'
        CHECK (status IN ('new', 'paid', 'done', 'cancelled')),
    total NUMERIC(10, 2) NOT NULL DEFAULT 0
);

CREATE TABLE order_items (
    order_id BIGINT REFERENCES orders(id),
    drink_id BIGINT REFERENCES drinks(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (order_id, drink_id)
);

CREATE TABLE reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id BIGINT REFERENCES customers(id),
    drink_id BIGINT REFERENCES drinks(id),
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Связи

- `customers 1:N orders` — у клиента много заказов.
- `orders 1:N order_items` — в заказе много позиций.
- `drinks 1:N order_items` — один напиток может быть в разных заказах.
- `drinks M:N ingredients` — через `drink_ingredients`.
- `customers 1:N reviews`, `drinks 1:N reviews` — клиент оставляет отзыв о напитке.

## Пример

```sql
SELECT o.id, c.name AS customer, o.total
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
ORDER BY o.created_at DESC
LIMIT 3;
```

| id | customer | total |
| --- | --- | --- |
| 128 | Анна | 640.00 |
| 127 | Игорь | 280.00 |
| 126 | Анна | 410.00 |

## Грабли

* **`order_items` — не просто список.** Составной первичный ключ `(order_id, drink_id)` не даёт дважды добавить один напиток в один заказ.
* **`total` можно посчитать.** Он хранится для быстроты отчётов, но его нужно пересчитывать при изменении позиций. Это осознанная денормализация.
* **`drink_ingredients` — обязательная прослойка.** Без неё связь «напитки — ингредиенты» пришлось бы хранить списком в одной ячейке.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Сколько таблиц в схеме кофейни «Зерно»?",
  "options": [
    { "text": "Пять", "correct": false, "explanation": "В схеме есть ещё `drink_ingredients` и `reviews`." },
    { "text": "Семь", "correct": true, "explanation": "Клиенты, напитки, ингредиенты, связь, заказы, позиции и отзывы." },
    { "text": "Девять", "correct": false, "explanation": "Лишние таблицы в схеме не нужны." }
  ],
  "explanation": "Семь таблиц покрывают клиентов, меню, состав, заказы и отзывы."
}
```

```quiz
{
  "type": "match",
  "question": "Соедини таблицу с её ролью в кофейне.",
  "pairs": [
    { "left": "`customers`", "right": "клиенты" },
    { "left": "`orders`", "right": "заказы" },
    { "left": "`order_items`", "right": "позиции заказов" },
    { "left": "`drink_ingredients`", "right": "связь напитков и ингредиентов" }
  ],
  "explanation": "Каждая таблица хранит один тип фактов, а связи между ними держатся на ключах."
}
```
