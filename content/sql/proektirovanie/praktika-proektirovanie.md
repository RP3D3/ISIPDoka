---
title: Практика: схема доставки
keywords: практика проектирования, схема доставки, сущности, er-диаграмма, нормализация, адреса, курьеры, postgresql, кофейня

---

# Практика: схема доставки

Как спроектировать доставку кофе: клиенты, адреса, курьеры, заказы и статусы — без дублей и потерянных связей?

Ниже — семь задач на проектирование. Каждая опирается на предыдущую. Сначала попробуй сам, потом сверься с решением.

## Задачи

1. Выделить сущности для доставки.
2. Определить кардинальность связей.
3. Создать таблицы `addresses` и `couriers`.
4. Связать заказ с адресом и курьером.
5. Проверить схему на 1НФ.
6. Проверить на 2НФ и 3НФ.
7. Добавить audit-поля и ограничения.

## Решения

### 1. Сущности

- `customers` — клиенты.
- `addresses` — адреса доставки.
- `couriers` — курьеры.
- `orders` — заказы.
- `order_items` — позиции.
- `drinks` — меню.

### 2. Кардинальность

| Связь | Тип |
| --- | --- |
| клиент — адреса | 1:N |
| клиент — заказы | 1:N |
| заказ — позиции | 1:N |
| курьер — заказы | 1:N |
| заказ — адрес | N:1 |

Один заказ — один адрес доставки. У клиента может быть несколько адресов.

### 3. Адреса и курьеры

```sql
CREATE TABLE addresses (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    city TEXT NOT NULL,
    street TEXT NOT NULL,
    building TEXT NOT NULL,
    apartment TEXT,
    is_default BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE couriers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT true
);
```

### 4. Заказ с доставкой

```sql
ALTER TABLE orders
    ADD COLUMN address_id BIGINT REFERENCES addresses(id),
    ADD COLUMN courier_id BIGINT REFERENCES couriers(id),
    ADD COLUMN delivered_at TIMESTAMPTZ;
```

`address_id` и `courier_id` могут быть `NULL`, пока заказ не готов к доставке. Если доставка обязательна — добавь `NOT NULL` после заполнения.

### 5. 1НФ

Проверь, что в ячейках нет списков:

- адрес разложен на `city`, `street`, `building`, `apartment`;
- позиции заказа — отдельные строки, а не список в `orders`;
- телефон курьера — одно значение, а не строка через запятую.

### 6. 2НФ и 3НФ

- В `order_items` нет названия напитка: оно в `drinks`.
- В `orders` нет названия города: оно в `addresses`.
- В `orders` нет имени курьера: оно в `couriers`.
- `unit_price` в позиции — историческая цена, это допустимый факт.

### 7. Audit-поля и ограничения

```sql
ALTER TABLE orders
    ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

ALTER TABLE orders
    ADD CONSTRAINT orders_total_non_negative CHECK (total >= 0);

ALTER TABLE addresses
    ADD CONSTRAINT addresses_city_not_empty CHECK (trim(city) <> '');
```

Для `updated_at` можно повесить триггер, чтобы приложение не забывало его менять.

## Что заметить

* Сущности выделяются из требований, а не из удобства кода.
* Кардинальность определяет, где будет внешний ключ.
* 1НФ убирает списки, 2НФ — зависимость от части ключа, 3НФ — от других неключевых столбцов.
* `unit_price` — исторический факт, а не дубль.
* Audit-поля и ограничения лучше добавлять сразу.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где должен храниться город доставки?",
  "options": [
    { "text": "В таблице `addresses`", "correct": true, "explanation": "Город — часть адреса." },
    { "text": "В каждой строке `orders`", "correct": false, "explanation": "Это дубль и нарушение 3НФ." },
    { "text": "В таблице `drinks`", "correct": false, "explanation": "Город не относится к напитку." }
  ],
  "explanation": "Атрибут должен жить в своей сущности."
}
```

```quiz
{
  "type": "match",
  "question": "Соедини нарушение с нормальной формой.",
  "pairs": [
    { "left": "список напитков в одной ячейке", "right": "1НФ" },
    { "left": "название напитка в позиции заказа", "right": "2НФ" },
    { "left": "название категории в каждой строке", "right": "3НФ" },
    { "left": "историческая цена в позиции", "right": "допустимая денормализация" }
  ],
  "explanation": "Каждая форма борется со своим типом избыточности."
}
```
