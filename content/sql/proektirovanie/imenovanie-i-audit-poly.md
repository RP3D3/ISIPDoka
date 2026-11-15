---
title: Именование, типы, audit-поля
keywords: именование таблиц, типы данных, audit-поля, created_at, updated_at, created_by, bigint, timestamptz, numeric, postgresql, проектирование

---

# Именование, типы, audit-поля

Почему `data`, `value` и `varchar(255)` через полгода превращаются в проблему, и какие поля стоит добавить сразу?

Схема живёт дольше кода. Имена, типы и служебные поля определяют, насколько легко с ней работать. Хорошие соглашения не требуют запоминать исключения: таблицы во множественном числе, столбцы в `snake_case`, деньги в `NUMERIC`, время в `TIMESTAMPTZ`.

## Именование

| Объект | Соглашение | Пример |
| --- | --- | --- |
| таблица | множественное число, `snake_case` | `order_items` |
| столбец | `snake_case` | `created_at` |
| первичный ключ | `id` | `id` |
| внешний ключ | `<сущность>_id` | `customer_id` |
| индекс | `idx_<таблица>_<столбцы>` | `idx_orders_customer_id` |
| ограничение | `<таблица>_<правило>` | `orders_total_non_negative` |

Единый стиль важнее конкретного выбора. Если в проекте уже принято иначе — следуй проекту.

## Типы

| Данные | Тип | Почему |
| --- | --- | --- |
| идентификатор | `BIGINT` | хватит надолго |
| деньги | `NUMERIC(10, 2)` | без ошибок округления |
| время | `TIMESTAMPTZ` | хранит часовой пояс |
| дата | `DATE` | без времени |
| флаг | `BOOLEAN` | явно и читаемо |
| короткий текст | `TEXT` | PostgreSQL не требует `VARCHAR(n)` |
| гибкие атрибуты | `JSONB` | когда схема неоднородна |

`VARCHAR(255)` в PostgreSQL не даёт выигрыша перед `TEXT`, но добавляет искусственное ограничение. Если нужна проверка длины — используй `CHECK`.

## Audit-поля

```sql
CREATE TABLE orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customers(id),
    status TEXT NOT NULL DEFAULT 'new',
    total NUMERIC(10, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by TEXT NOT NULL DEFAULT current_user
);
```

- `created_at` — когда создана строка.
- `updated_at` — когда последний раз менялась.
- `created_by` — кто создал.
- `deleted_at` — если нужно мягкое удаление.

`updated_at` удобно обновлять триггером, а не надеяться на приложение.

## Пример

```sql
CREATE TABLE drinks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    category_id BIGINT NOT NULL REFERENCES categories(id),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Грабли

* **`data`, `value`, `info`.** Непонятно, что внутри и как с этим работать.
* **`VARCHAR(255)` по привычке.** В PostgreSQL это не нужно.
* **`FLOAT` для денег.** Ошибки округления неизбежны.
* **`TIMESTAMP` без пояса.** `TIMESTAMPTZ` надёжнее.
* **Нет `created_at`.** Потом невозможно понять, когда появилась строка.
* **`updated_at` без триггера.** Приложение забудет обновить.
* **Разные стили в одной схеме.** `userId`, `user_id`, `UserID` — хаос.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой тип лучше для денег?",
  "options": [
    { "text": "`NUMERIC(10, 2)`", "correct": true, "explanation": "Точное десятичное значение без ошибок округления." },
    { "text": "`FLOAT`", "correct": false, "explanation": "Двоичная плавающая точка даёт ошибки." },
    { "text": "`TEXT`", "correct": false, "explanation": "Сложение и сравнение будут неудобными." }
  ],
  "explanation": "Деньги требуют точного типа."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что относится к хорошим соглашениям схемы?",
  "options": [
    { "text": "`snake_case` для таблиц и столбцов.", "correct": true, "explanation": "Единый стиль." },
    { "text": "`TIMESTAMPTZ` для времени.", "correct": true, "explanation": "Хранит часовой пояс." },
    { "text": "`created_at` и `updated_at` у изменяемых сущностей.", "correct": true, "explanation": "Помогают в аудите и отладке." },
    { "text": "`VARCHAR(255)` для любого текста.", "correct": false, "explanation": "В PostgreSQL обычно достаточно `TEXT`." }
  ],
  "explanation": "Соглашения и точные типы делают схему понятной и надёжной."
}
```
