---
title: N+1 и загрузка
description: Проблема N+1, selectinload, joinedload и контроль числа запросов.
keywords: Python, SQLAlchemy, N+1, selectinload, joinedload, eager loading

---

# N+1 и загрузка

N+1 — ситуация, когда вместо одного запроса приложение делает один плюс
N дополнительных.

## Проблема

```python
tasks = session.scalars(select(Task)).all()

for task in tasks:
    print(task.user.email)
```

Сначала загружаются задачи. Потом для каждой задачи отдельно грузится
пользователь. Это N+1.

## Решение

```python
from sqlalchemy.orm import selectinload

tasks = session.scalars(
    select(Task).options(selectinload(Task.user))
).all()
```

Теперь пользователи загружаются заранее.

## Что выбрать

- `selectinload` — для коллекций и связей;
- `joinedload` — для одной связи;
- `lazy="raise"` — чтобы случайно не получить N+1.

## Контроль

```python
engine = create_engine(url, echo=True)
```

Логи SQL показывают реальное число запросов.

## Частые ошибки

- **Обращаться к связи в цикле.**
- **Ставить `joinedload` везде.**
- **Не смотреть на число запросов.**
- **Загружать огромный граф связей без нужды.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое N+1?",
  "options": [
    {
      "text": "Один запрос плюс N дополнительных",
      "correct": true,
      "explanation": "Это лишние запросы к базе."
    },
    {
      "text": "Один индекс на таблицу",
      "correct": false,
      "explanation": "Это про индексы."
    },
    {
      "text": "N копий базы",
      "correct": false,
      "explanation": "Это не так."
    }
  ],
  "explanation": "N+1 возникает при ленивой загрузке в цикле."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает против N+1?",
  "options": [
    {
      "text": "`selectinload`",
      "correct": true
    },
    {
      "text": "`joinedload`",
      "correct": true
    },
    {
      "text": "Проверка логов SQL",
      "correct": true
    },
    {
      "text": "Отключение всех связей",
      "correct": false,
      "explanation": "Это ломает модель."
    }
  ],
  "explanation": "Связи нужно загружать заранее."
}
```

## Куда дальше

- [Базы данных и SQLAlchemy](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/bazy-dannyh-i-sqlalchemy.md)
- [Практика: CRUD на SQLAlchemy](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/praktika-crud-sqlalchemy.md)
- [FastAPI и контракт API](theme.html?path=content/python/fastapi-i-kontrakt-api/zachem-fastapi.md)
