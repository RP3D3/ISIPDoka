---
title: Практика: CRUD на SQLAlchemy
description: Упражнение: модель, сессия, CRUD, транзакции и проверка ошибок.
keywords: практика, SQLAlchemy, CRUD, Session, SQLite, транзакции

---

# Практика: CRUD на SQLAlchemy

Сделайте слой доступа к задачам.

## 1. Модель

```python
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    done: Mapped[bool] = mapped_column(default=False)
```

## 2. Сессия

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("sqlite:///tasks.db")
SessionLocal = sessionmaker(bind=engine)
```

## 3. CRUD

```python
def create_task(title: str) -> Task:
    with SessionLocal.begin() as session:
        task = Task(title=title)
        session.add(task)
        session.flush()
        return task
```

## 4. Проверка

- [ ] Задача создаётся.
- [ ] Пустой title отклоняется.
- [ ] Список читается.
- [ ] Обновление сохраняется.
- [ ] Удаление работает.
- [ ] Ошибка откатывает транзакцию.

## Частые ошибки

- **Не проверять пустой title.**
- **Забыть `flush` перед возвратом.**
- **Делать commit внутри каждой строки.**
- **Игнорировать `rollback`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен `flush`?",
  "options": [
    {
      "text": "Отправить изменения в базу без commit",
      "correct": true,
      "explanation": "Так появляется id внутри транзакции."
    },
    {
      "text": "Удалить таблицу",
      "correct": false,
      "explanation": "Это миграция."
    },
    {
      "text": "Закрыть сессию",
      "correct": false,
      "explanation": "Это `close`."
    }
  ],
  "explanation": "`flush` отправляет SQL, но не фиксирует транзакцию."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "Модель Task",
      "correct": true
    },
    {
      "text": "Сессия SQLAlchemy",
      "correct": true
    },
    {
      "text": "CRUD и проверка ошибок",
      "correct": true
    },
    {
      "text": "Только CSS",
      "correct": false,
      "explanation": "Это не про базы."
    }
  ],
  "explanation": "Практика собирает слой данных."
}
```

## Куда дальше

- [Базы данных и SQLAlchemy](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/bazy-dannyh-i-sqlalchemy.md)
- [FastAPI и контракт API](theme.html?path=content/python/fastapi-i-kontrakt-api/zachem-fastapi.md)
- [Auth, CORS и безопасность](theme.html?path=content/python/auth-cors-bezopasnost/paroli-i-heshirovanie.md)
