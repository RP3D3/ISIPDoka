---
title: Практика: аудит цен
keywords: практика sql, аудит, триггер, plpgsql, jsonb, полнотекстовый поиск, роли, права, безопасность, postgresql, кофейня

---

# Практика: аудит цен

Как собрать аудит изменений цены, гибкие атрибуты напитка и безопасный поиск по меню?

Ниже — шесть задач на объекты базы и безопасность. Каждая опирается на схему кофейни. Сначала попробуй сам, потом сверься с решением.

## Задачи

1. Создать таблицу истории цен.
2. Написать триггер, который пишет историю при изменении цены.
3. Хранить гибкие атрибуты напитка в `JSONB`.
4. Найти напитки по атрибуту `milk`.
5. Настроить полнотекстовый поиск по названию и описанию.
6. Выдать приложению минимальные права.

## Решения

### 1. История цен

```sql
CREATE TABLE price_history (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    drink_id BIGINT NOT NULL REFERENCES drinks(id),
    old_price NUMERIC(10, 2),
    new_price NUMERIC(10, 2),
    changed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    changed_by TEXT NOT NULL DEFAULT current_user
);
```

### 2. Триггер

```sql
CREATE FUNCTION log_price_change() RETURNS trigger AS $$
BEGIN
    INSERT INTO price_history (drink_id, old_price, new_price)
    VALUES (NEW.id, OLD.price, NEW.price);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER drinks_price_audit
AFTER UPDATE OF price ON drinks
FOR EACH ROW
WHEN (OLD.price IS DISTINCT FROM NEW.price)
EXECUTE FUNCTION log_price_change();
```

Теперь каждое изменение цены оставляет след.

### 3. Атрибуты в `JSONB`

```sql
CREATE TABLE drink_meta (
    drink_id BIGINT PRIMARY KEY REFERENCES drinks(id),
    attributes JSONB NOT NULL DEFAULT '{}'::jsonb
);

INSERT INTO drink_meta (drink_id, attributes)
VALUES (1, '{"size": "L", "milk": "oat", "sugar": 0}');
```

### 4. Поиск по атрибуту

```sql
CREATE INDEX idx_drink_meta_milk
ON drink_meta ((attributes ->> 'milk'));

SELECT d.name, m.attributes ->> 'milk' AS milk
FROM drink_meta AS m
JOIN drinks AS d ON d.id = m.drink_id
WHERE m.attributes ->> 'milk' = 'oat';
```

Expression-индекс повторяет выражение из условия.

### 5. Полнотекстовый поиск

```sql
ALTER TABLE drinks ADD COLUMN description TEXT;

CREATE INDEX idx_drinks_search
ON drinks
USING GIN (to_tsvector('russian', name || ' ' || COALESCE(description, '')));

SELECT name
FROM drinks
WHERE to_tsvector('russian', name || ' ' || COALESCE(description, ''))
      @@ to_tsquery('russian', 'латте & молоко');
```

### 6. Права приложения

```sql
CREATE ROLE app_user LOGIN PASSWORD 'strong-password';

GRANT CONNECT ON DATABASE coffee TO app_user;
GRANT USAGE ON SCHEMA shop TO app_user;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA shop TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA shop TO app_user;

REVOKE DELETE ON orders FROM app_user;
```

Приложение не должно иметь `DROP`, `TRUNCATE` и лишний `DELETE`.

## Что заметить

* Триггер с `WHEN` не пишет историю, если цена не изменилась.
* `JSONB` удобен для неоднородных атрибутов, но требует expression-индекса для конкретного поля.
* Полнотекстовый поиск использует `tsvector`, `tsquery` и `GIN`.
* Права выдаются роли, а не пользователю напрямую.
* `USAGE` на схему обязателен.
* Безопасность — это не только параметры запросов, но и минимальные права.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем в триггере `WHEN (OLD.price IS DISTINCT FROM NEW.price)`?",
  "options": [
    { "text": "Чтобы не писать историю, если цена не изменилась", "correct": true, "explanation": "Это уменьшает лишние записи." },
    { "text": "Чтобы ускорить `UPDATE` в два раза", "correct": false, "explanation": "Цель — не писать лишнее." },
    { "text": "Чтобы запретить изменение цены", "correct": false, "explanation": "Триггер только логирует." }
  ],
  "explanation": "`WHEN` ограничивает срабатывание триггера нужным условием."
}
```

```quiz
{
  "type": "match",
  "question": "Соедини задачу с инструментом.",
  "pairs": [
    { "left": "история изменений цены", "right": "триггер + таблица аудита" },
    { "left": "гибкие атрибуты", "right": "`JSONB`" },
    { "left": "поиск по словам", "right": "`tsvector` + `GIN`" },
    { "left": "минимальные права", "right": "`GRANT` / `REVOKE`" }
  ],
  "explanation": "Каждая задача требует своего объекта базы."
}
```
