---
title: Триггеры
keywords: триггеры sql, create trigger, before, after, for each row, when, аудит, updated_at, postgresql, автоматизация

---

# Триггеры

Как автоматически обновлять `updated_at` и писать историю изменений, не полагаясь на дисциплину приложения?

Триггер — это функция, которая выполняется при `INSERT`, `UPDATE` или `DELETE`. Он может срабатывать до или после изменения, для каждой строки или для всей команды. Триггеры удобны для аудита, поддержания `updated_at` и сложных правил, но их легко спрятать от глаз: логика живёт в базе, а не в коде приложения.

## Синтаксис

```sql
CREATE TRIGGER имя
BEFORE UPDATE ON таблица
FOR EACH ROW
WHEN (условие)
EXECUTE FUNCTION функция();
```

| Часть | Значение |
| --- | --- |
| `BEFORE` / `AFTER` | до или после изменения |
| `FOR EACH ROW` | на каждую строку |
| `FOR EACH STATEMENT` | на команду целиком |
| `WHEN` | дополнительное условие |
| `EXECUTE FUNCTION` | что вызвать |

## Пример: `updated_at`

```sql
ALTER TABLE drinks ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

CREATE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
    NEW.updated_at := now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER drinks_updated_at
BEFORE UPDATE ON drinks
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
```

В `BEFORE` триггере можно менять `NEW` и вернуть его. `RETURN NEW` обязателен, иначе строка не сохранится.

## Пример: аудит цены

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

`AFTER` удобен для аудита: основная строка уже изменена. `WHEN` не даёт писать историю, если цена не изменилась.

## `OLD` и `NEW`

| Событие | `OLD` | `NEW` |
| --- | --- | --- |
| `INSERT` | нет | новая строка |
| `UPDATE` | старая строка | новая строка |
| `DELETE` | удаляемая строка | нет |

## Грабли

* **Забыть `RETURN NEW`.** В `BEFORE` триггере строка не сохранится.
* **Триггеры незаметны.** Разработчик может не знать, почему `UPDATE` меняет другую таблицу. Документируй.
* **Рекурсия.** Триггер на таблицу может изменить её же и вызвать себя снова.
* **Массовые операции.** `FOR EACH ROW` на миллионе строк — это миллион вызовов.
* **Порядок триггеров.** Несколько триггеров выполняются по имени; не полагайся на случайный порядок.
* **Права.** Триггерная функция может выполняться с правами владельца. Проверяй безопасность.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что нужно вернуть из `BEFORE UPDATE` триггера, чтобы изменение сохранилось?",
  "options": [
    { "text": "`NEW`", "correct": true, "explanation": "Иначе строка не будет записана." },
    { "text": "`OLD`", "correct": false, "explanation": "Это старое значение." },
    { "text": "`NULL`", "correct": false, "explanation": "`NULL` отменяет операцию для строки." }
  ],
  "explanation": "`RETURN NEW` передаёт изменённую строку дальше."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про триггеры?",
  "options": [
    { "text": "`BEFORE` может изменить `NEW` до записи.", "correct": true, "explanation": "Например, обновить `updated_at`." },
    { "text": "`AFTER` подходит для аудита.", "correct": true, "explanation": "Основная строка уже изменена." },
    { "text": "`WHEN` ограничивает срабатывание условием.", "correct": true, "explanation": "Например, только при смене цены." },
    { "text": "Триггеры видны в коде приложения без дополнительной документации.", "correct": false, "explanation": "Их легко не заметить." }
  ],
  "explanation": "Триггеры автоматизируют правила, но требуют документирования и осторожности."
}
```
