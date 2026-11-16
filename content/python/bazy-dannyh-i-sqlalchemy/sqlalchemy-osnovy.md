---
title: SQLAlchemy: основы
description: Engine, Session, declarative base и первые запросы.
keywords: Python, SQLAlchemy, engine, session, ORM, select

---

# SQLAlchemy: основы

SQLAlchemy — популярная ORM для Python. Она связывает классы и таблицы.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/python/_assets/bazy-dannyh-i-sqlalchemy/sqlalchemy-flow.svg"
    alt="Python, SQLAlchemy, драйвер и база данных"
    width="900"
  >
  <figcaption>
    ORM не отменяет понимание SQL и транзакций.
  </figcaption>
</figure>

## Engine

```python
from sqlalchemy import create_engine

engine = create_engine(
    "sqlite:///tasks.db",
    echo=True,
)
```

## Session

```python
from sqlalchemy.orm import sessionmaker

SessionLocal = sessionmaker(bind=engine)
session = SessionLocal()
```

## Модель

```python
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
```

## Запрос

```python
from sqlalchemy import select

tasks = session.scalars(select(Task)).all()
```

## Частые ошибки

- **Создавать engine на каждый запрос.**
- **Забывать закрывать сессию.**
- **Использовать ORM без понимания SQL.**
- **Держать одну глобальную сессию.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое Session?",
  "options": [
    {
      "text": "Единица работы с базой",
      "correct": true,
      "explanation": "Она управляет объектами и транзакцией."
    },
    {
      "text": "HTML-шаблон",
      "correct": false,
      "explanation": "Это не шаблон."
    },
    {
      "text": "Тип данных Python",
      "correct": false,
      "explanation": "Это не тип."
    }
  ],
  "explanation": "Session связывает ORM и транзакцию."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про SQLAlchemy?",
  "options": [
    {
      "text": "Engine задаёт подключение",
      "correct": true
    },
    {
      "text": "Session управляет работой",
      "correct": true
    },
    {
      "text": "Модели описывают таблицы",
      "correct": true
    },
    {
      "text": "SQL знать не нужно",
      "correct": false,
      "explanation": "SQL полезен для отладки."
    }
  ],
  "explanation": "SQLAlchemy упрощает, но не скрывает БД."
}
```

## Куда дальше

- [Модели и таблицы](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/modeli-i-tablicy.md)
- [CRUD в SQLAlchemy](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/crud-v-sqlalchemy.md)
- [Транзакции](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/tranzakcii.md)
