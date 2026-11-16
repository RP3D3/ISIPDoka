---
title: CRUD в SQLAlchemy
description: Создание, чтение, обновление и удаление записей через Session.
keywords: Python, SQLAlchemy, CRUD, Session, select, commit, delete

---

# CRUD в SQLAlchemy

CRUD — четыре базовые операции: создать, прочитать, обновить, удалить.

## Создание

```python
task = Task(title="Учёба")

session.add(task)
session.commit()
session.refresh(task)
```

## Чтение

```python
from sqlalchemy import select

task = session.get(Task, task_id)

tasks = session.scalars(
    select(Task).where(Task.done.is_(False))
).all()
```

## Обновление

```python
task = session.get(Task, task_id)

if task is None:
    raise ValueError("Задача не найдена")

task.done = True
session.commit()
```

## Удаление

```python
task = session.get(Task, task_id)

if task is not None:
    session.delete(task)
    session.commit()
```

## Частые ошибки

- **Забыть `commit`.** Изменения не сохранятся.
- **Менять объект вне активной сессии.**
- **Удалять без проверки `None`.**
- **Держать сессию открытой слишком долго.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `session.commit`?",
  "options": [
    {
      "text": "Фиксирует изменения",
      "correct": true,
      "explanation": "Транзакция сохраняется."
    },
    {
      "text": "Отменяет изменения",
      "correct": false,
      "explanation": "Это `rollback`."
    },
    {
      "text": "Создаёт таблицу",
      "correct": false,
      "explanation": "Это миграция."
    }
  ],
  "explanation": "Без commit изменения могут потеряться."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про CRUD?",
  "options": [
    {
      "text": "`add` добавляет объект",
      "correct": true
    },
    {
      "text": "`get` ищет по первичному ключу",
      "correct": true
    },
    {
      "text": "`delete` удаляет объект",
      "correct": true
    },
    {
      "text": "`commit` нужен только для чтения",
      "correct": false,
      "explanation": "Чтению commit не нужен."
    }
  ],
  "explanation": "CRUD управляет данными через сессию."
}
```

## Куда дальше

- [Транзакции](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/tranzakcii.md)
- [Alembic: миграции](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/alembic-migracii.md)
- [N+1 и загрузка](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/n-plus-one-i-zagruzka.md)
