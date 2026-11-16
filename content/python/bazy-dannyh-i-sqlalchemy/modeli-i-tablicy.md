---
title: Модели и таблицы
description: Declarative-модели, поля, связи, ключи и ограничения в SQLAlchemy.
keywords: Python, SQLAlchemy, модели, таблицы, связи, ForeignKey, индекс

---

# Модели и таблицы

Модель SQLAlchemy описывает таблицу. Поля становятся колонками.

## Модель

```python
from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True, index=True)
```

## Связь

```python
class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
```

## Ограничения

- `primary_key` — уникальный идентификатор;
- `unique` — запрет дубликатов;
- `index` — ускоряет поиск;
- `nullable=False` — обязательное поле.

## Частые ошибки

- **Забыть первичный ключ.**
- **Не указать связь.**
- **Хранить деньги во `float`.**
- **Делать все поля `nullable`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `primary_key`?",
  "options": [
    {
      "text": "Задаёт уникальный идентификатор",
      "correct": true,
      "explanation": "По нему находят строку."
    },
    {
      "text": "Создаёт индекс по всем полям",
      "correct": false,
      "explanation": "Это не так."
    },
    {
      "text": "Удаляет таблицу",
      "correct": false,
      "explanation": "Это не так."
    }
  ],
  "explanation": "Первичный ключ уникален."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про модели?",
  "options": [
    {
      "text": "Модель связывает класс и таблицу",
      "correct": true
    },
    {
      "text": "Можно указать индекс",
      "correct": true
    },
    {
      "text": "Можно задать связь",
      "correct": true
    },
    {
      "text": "Все поля обязательны по умолчанию",
      "correct": false,
      "explanation": "Это зависит от настройки."
    }
  ],
  "explanation": "Модели описывают структуру данных."
}
```

## Куда дальше

- [CRUD в SQLAlchemy](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/crud-v-sqlalchemy.md)
- [Транзакции](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/tranzakcii.md)
- [Alembic: миграции](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/alembic-migracii.md)
