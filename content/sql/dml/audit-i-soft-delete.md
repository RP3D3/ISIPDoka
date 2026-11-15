---
title: Аудит и мягкое удаление
keywords: мягкое удаление, soft delete, deleted_at, аудит, история изменений, price_history, триггеры, postgresql, dml, кофейня

---

# Аудит и мягкое удаление

Как «удалить» отзыв, не теряя историю, и узнать, кто и когда поменял цену?

Физическое удаление необратимо. Иногда данные нужно сохранить для отчётов, разбирательств или требований закона. Тогда используют **мягкое удаление**: строка остаётся в таблице, но получает отметку `deleted_at`. А для истории изменений заводят отдельную таблицу аудита.

## Мягкое удаление

Добавим столбец:

```sql
ALTER TABLE reviews ADD COLUMN deleted_at TIMESTAMPTZ;
```

«Удаление»:

```sql
UPDATE reviews
SET deleted_at = now()
WHERE id = 6;
```

Обычные запросы теперь должны фильтровать:

```sql
SELECT *
FROM reviews
WHERE deleted_at IS NULL;
```

Восстановление:

```sql
UPDATE reviews
SET deleted_at = NULL
WHERE id = 6;
```

## Аудит цен

```sql
CREATE TABLE price_history (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    drink_id BIGINT NOT NULL REFERENCES drinks(id),
    old_price NUMERIC(10, 2) NOT NULL,
    new_price NUMERIC(10, 2) NOT NULL,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    changed_by TEXT NOT NULL DEFAULT current_user
);
```

Перед обновлением сохраняем старое значение:

```sql
INSERT INTO price_history (drink_id, old_price, new_price)
SELECT id, price, ROUND(price * 1.1, 2)
FROM drinks
WHERE id = 1;

UPDATE drinks
SET price = ROUND(price * 1.1, 2)
WHERE id = 1;
```

В реальном проекте эти два шага лучше объединить в транзакцию или повесить на триггер, чтобы история не расходилась с данными.

## Грабли

* **Забыли `WHERE deleted_at IS NULL`.** «Удалённые» строки снова попадут в интерфейс и отчёты.
* **Уникальность и мягкое удаление.** `UNIQUE(email)` не даст создать нового клиента с тем же email, даже если старый помечен удалённым. Нужен частичный уникальный индекс `WHERE deleted_at IS NULL`.
* **Аудит растёт бесконечно.** История цен или логов может занять больше места, чем сами данные. Продумай архивацию.
* **Аудит без транзакции.** Если `UPDATE` прошёл, а запись в историю нет, данные и история разойдутся.
* **Чувствительные данные.** Не пиши в аудит пароли, токены и лишние персональные данные.
* **Настоящее удаление.** Для GDPR и требований приватности может понадобиться физическое удаление или анонимизация, а не мягкое.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое мягкое удаление?",
  "options": [
    { "text": "Строка остаётся, но получает отметку `deleted_at`", "correct": true, "explanation": "Данные можно восстановить и сохранить историю." },
    { "text": "Строка удаляется через `DELETE`", "correct": false, "explanation": "Это физическое удаление." },
    { "text": "Таблица очищается через `TRUNCATE`", "correct": false, "explanation": "Это удаление всех строк." }
  ],
  "explanation": "Мягкое удаление — это флаг, а не физическое исчезновение строки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно учитывать при мягком удалении и аудите?",
  "options": [
    { "text": "Все запросы должны фильтровать `deleted_at IS NULL`.", "correct": true, "explanation": "Иначе удалённые данные вернутся в интерфейс." },
    { "text": "Уникальные ограничения могут конфликтовать с удалёнными строками.", "correct": true, "explanation": "Нужен частичный уникальный индекс." },
    { "text": "Запись в аудит и изменение данных лучше делать атомарно.", "correct": true, "explanation": "Иначе история разойдётся с данными." },
    { "text": "Аудит можно хранить вечно без архивации.", "correct": false, "explanation": "Он может занять больше места, чем основные данные." }
  ],
  "explanation": "Мягкое удаление и аудит требуют дисциплины во всех запросах и ограничениях."
}
```