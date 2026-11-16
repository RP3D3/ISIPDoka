---
title: SQL для Python
description: Базовый SQL, параметры и место ORM в Python-бэкенде.
keywords: Python, SQL, SELECT, INSERT, UPDATE, DELETE, параметры, ORM

---

# SQL для Python

Python-бэкенд почти всегда работает с базой. Даже с ORM полезно понимать
SQL.

## Выборка

```sql
SELECT id, title
FROM tasks
WHERE done = false
ORDER BY created_at DESC
LIMIT 20;
```

## Вставка

```sql
INSERT INTO tasks (title, done)
VALUES (:title, false);
```

## Обновление

```sql
UPDATE tasks
SET done = true
WHERE id = :id;
```

## Удаление

```sql
DELETE FROM tasks
WHERE id = :id;
```

## Параметры

Не склеивайте SQL со строками:

```python
cursor.execute(
    "SELECT id, title FROM tasks WHERE id = %s",
    (task_id,),
)
```

## Частые ошибки

- **Склеивать SQL с вводом.**
- **Забывать `WHERE`.**
- **Делать `SELECT *` без необходимости.**
- **Игнорировать индексы.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `WHERE`?",
  "options": [
    {
      "text": "Фильтрует строки",
      "correct": true,
      "explanation": "Без него можно затронуть все строки."
    },
    {
      "text": "Сортирует",
      "correct": false,
      "explanation": "Это `ORDER BY`."
    },
    {
      "text": "Создаёт таблицу",
      "correct": false,
      "explanation": "Это `CREATE TABLE`."
    }
  ],
  "explanation": "`WHERE` ограничивает выборку."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про SQL?",
  "options": [
    {
      "text": "`SELECT` читает",
      "correct": true
    },
    {
      "text": "`INSERT` добавляет",
      "correct": true
    },
    {
      "text": "`UPDATE` меняет",
      "correct": true
    },
    {
      "text": "`WHERE` обязателен в `SELECT`",
      "correct": false,
      "explanation": "Можно выбрать все строки."
    }
  ],
  "explanation": "Основы SQL нужны и с ORM."
}
```

## Куда дальше

- [sqlite3 и psycopg](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/sqlite3-i-psycopg.md)
- [SQLAlchemy: основы](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/sqlalchemy-osnovy.md)
- [Модели и таблицы](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/modeli-i-tablicy.md)
