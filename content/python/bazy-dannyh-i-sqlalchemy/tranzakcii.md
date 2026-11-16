---
title: Транзакции
description: Атомарность, commit, rollback, контекстный менеджер и ошибки.
keywords: Python, SQLAlchemy, транзакции, commit, rollback, ACID

---

# Транзакции

Транзакция — единица работы. Она либо применяется целиком, либо
отменяется.

## Ручное управление

```python
try:
    session.add(task)
    session.commit()
except Exception:
    session.rollback()
    raise
```

## Контекстный менеджер

```python
with session.begin():
    session.add(task)
```

При выходе без ошибки будет `commit`, при исключении — `rollback`.

## ACID

- **Atomicity** — всё или ничего.
- **Consistency** — данные остаются корректными.
- **Isolation** — транзакции не мешают друг другу.
- **Durability** — результат сохраняется.

## Длинные транзакции

Долгая транзакция держит блокировки и мешает другим запросам. Открывайте
её как можно позже и закрывайте как можно раньше.

## Частые ошибки

- **Делать `commit` после каждой операции.**
- **Проглатывать исключение без `rollback`.**
- **Держать транзакцию во время сетевого запроса.**
- **Считать, что база сама решит конфликт.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `rollback`?",
  "options": [
    {
      "text": "Отменяет изменения транзакции",
      "correct": true,
      "explanation": "База возвращается к предыдущему состоянию."
    },
    {
      "text": "Сохраняет изменения",
      "correct": false,
      "explanation": "Это `commit`."
    },
    {
      "text": "Создаёт индекс",
      "correct": false,
      "explanation": "Это миграция."
    }
  ],
  "explanation": "`rollback` откатывает работу."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про транзакции?",
  "options": [
    {
      "text": "Работают по принципу «всё или ничего»",
      "correct": true
    },
    {
      "text": "Могут откатываться",
      "correct": true
    },
    {
      "text": "Должны быть короткими",
      "correct": true
    },
    {
      "text": "Нужны только для чтения",
      "correct": false,
      "explanation": "Они важны для изменений."
    }
  ],
  "explanation": "Транзакции защищают целостность данных."
}
```

## Куда дальше

- [Alembic: миграции](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/alembic-migracii.md)
- [N+1 и загрузка](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/n-plus-one-i-zagruzka.md)
- [Базы данных и SQLAlchemy](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/bazy-dannyh-i-sqlalchemy.md)
