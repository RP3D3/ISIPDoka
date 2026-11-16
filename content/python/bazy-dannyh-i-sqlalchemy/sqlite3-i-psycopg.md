---
title: sqlite3 и psycopg
description: DB-API, подключение, cursor, execute, fetch и commit.
keywords: Python, sqlite3, psycopg, DB-API, cursor, commit, параметры

---

# sqlite3 и psycopg

`sqlite3` входит в стандартную библиотеку. `psycopg` подключает
PostgreSQL.

## sqlite3

```python
import sqlite3

connection = sqlite3.connect("tasks.db")
cursor = connection.cursor()

cursor.execute(
    "INSERT INTO tasks (title) VALUES (?)",
    ("Задача",),
)
connection.commit()
```

## Чтение

```python
cursor.execute("SELECT id, title FROM tasks")
rows = cursor.fetchall()
```

## psycopg

```python
import psycopg

with psycopg.connect("postgresql://app:secret@localhost/app") as connection:
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT id, title FROM tasks WHERE id = %s",
            (task_id,),
        )
        row = cursor.fetchone()
```

## Частые ошибки

- **Забыть `commit`.**
- **Склеивать SQL со строками.**
- **Не закрывать соединение.**
- **Путать плейсхолдеры разных драйверов.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `commit`?",
  "options": [
    {
      "text": "Сохраняет транзакцию",
      "correct": true,
      "explanation": "Изменения фиксируются."
    },
    {
      "text": "Отменяет изменения",
      "correct": false,
      "explanation": "Это `rollback`."
    },
    {
      "text": "Создаёт таблицу",
      "correct": false,
      "explanation": "Это SQL."
    }
  ],
  "explanation": "Без commit изменения могут потеряться."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно при работе с БД?",
  "options": [
    {
      "text": "Параметры вместо склейки",
      "correct": true
    },
    {
      "text": "Закрывать соединение",
      "correct": true
    },
    {
      "text": "Делать commit",
      "correct": true
    },
    {
      "text": "Хранить пароль в коде",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Работа с БД требует дисциплины."
}
```

## Куда дальше

- [SQLAlchemy: основы](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/sqlalchemy-osnovy.md)
- [Модели и таблицы](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/modeli-i-tablicy.md)
- [CRUD в SQLAlchemy](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/crud-v-sqlalchemy.md)
