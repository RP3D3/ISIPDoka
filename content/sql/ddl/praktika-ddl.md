---
title: Практика: кофейня с нуля
keywords: практика ddl, create database, create table, ограничения, primary key, foreign key, alter table, view, index, truncate, postgresql, кофейня

---

# Практика: кофейня с нуля

Как собрать схему кофейни с нуля: от пустой базы до таблиц, ключей, индекса и представления?

Ниже — семь задач на DDL. Выполняй их по порядку: каждая опирается на предыдущую. Сначала попробуй сам, потом сверься с решением. Все команды — для PostgreSQL 16+.

## Задачи

1. Создать базу `coffee` и схему `shop`.
2. Создать таблицы `customers` и `drinks` с ограничениями.
3. Создать таблицу `orders` с внешним ключом на клиента и статусом.
4. Создать таблицу `order_items` с составным ключом и каскадом.
5. Добавить индекс по `orders.customer_id` и представление `active_drinks`.
6. Добавить столбец `description`, переименовать его и удалить.
7. Очистить `order_items` через `TRUNCATE`, не удаляя структуру.

## Решения

### 1. База и схема

```sql
CREATE DATABASE coffee;

-- подключись к базе coffee и выполни:
CREATE SCHEMA shop;
SET search_path TO shop, public;
```

`CREATE DATABASE` выполняется отдельно, вне транзакции. Дальше работаем в схеме `shop`.

### 2. Клиенты и напитки

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
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL
        CHECK (category IN ('кофе', 'чай', 'напиток')),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true
);
```

`UNIQUE` на `drinks.name` не даст создать два одинаковых напитка. `CHECK` проверяет категорию и цену.

### 3. Заказы

```sql
CREATE TABLE orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    status TEXT NOT NULL DEFAULT 'new'
        CHECK (status IN ('new', 'paid', 'done', 'cancelled')),
    total NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (total >= 0)
);
```

`ON DELETE RESTRICT` не даст удалить клиента, у которого есть заказы. `NOT NULL` на `customer_id` делает связь обязательной.

### 4. Позиции заказа

```sql
CREATE TABLE order_items (
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
    drink_id BIGINT REFERENCES drinks(id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    PRIMARY KEY (order_id, drink_id)
);
```

Удалили заказ — позиции исчезли. Удалить напиток, который уже заказывали, база не даст.

### 5. Индекс и представление

```sql
CREATE INDEX idx_orders_customer_id ON orders (customer_id);

CREATE VIEW active_drinks AS
SELECT id, name, category, price
FROM drinks
WHERE is_active;
```

Индекс ускорит заказы по клиенту. Представление скроет условие `is_active` за простым именем.

### 6. Изменение структуры

```sql
ALTER TABLE drinks ADD COLUMN description TEXT;
ALTER TABLE drinks RENAME COLUMN description TO note;
ALTER TABLE drinks DROP COLUMN note;
```

В реальном проекте после `ADD COLUMN` данные бы заполнили, а `DROP COLUMN` делали бы только после проверки, что столбец нигде не используется.

### 7. Очистка позиций

```sql
TRUNCATE TABLE order_items RESTART IDENTITY;
```

Структура, ключи и ограничения остались. `RESTART IDENTITY` сбрасывает счётчики, если они есть. В PostgreSQL команду можно откатить внутри транзакции.

## Что заметить

* Сначала создаются родительские таблицы, потом дочерние: внешний ключ требует существующей цели.
* `ON DELETE` выбирают по смыслу: историю заказов храним, позиции заказа можно удалить каскадом.
* Индекс по внешнему ключу добавляют вручную.
* `ALTER TABLE` и `DROP` — операции с данными и блокировками, а не только с текстом.
* `TRUNCATE` очищает таблицу, но не удаляет её структуру.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "В каком порядке создавать таблицы `customers`, `orders` и `order_items`?",
  "options": [
    { "text": "`order_items` → `orders` → `customers`", "correct": false, "explanation": "Дочерние таблицы ссылаются на родителей, а не наоборот." },
    { "text": "`customers` → `orders` → `order_items`", "correct": true, "explanation": "Сначала родители, потом дочерние таблицы." },
    { "text": "В любом порядке, PostgreSQL сам разберётся", "correct": false, "explanation": "Внешний ключ требует существующей таблицы." }
  ],
  "explanation": "Сначала создаются таблицы, на которые ссылаются внешние ключи."
}
```

```quiz
{
  "type": "match",
  "question": "Соедини команду с её задачей.",
  "pairs": [
    { "left": "`CREATE TABLE`", "right": "создать структуру таблицы" },
    { "left": "`ALTER TABLE`", "right": "изменить структуру" },
    { "left": "`TRUNCATE`", "right": "очистить все строки" },
    { "left": "`DROP TABLE`", "right": "удалить таблицу целиком" }
  ],
  "explanation": "DDL-команды меняют структуру и уровень хранения, а не отдельные значения."
}
```