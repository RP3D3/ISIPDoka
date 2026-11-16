---
title: Depends и сервисы
description: Dependency injection, get_db, yield-зависимости и слой сервисов.
keywords: Python, FastAPI, Depends, dependency injection, get_db, сервис

---

# Depends и сервисы

`Depends` собирает зависимости эндпоинта: сессию, пользователя, сервис.

## Зависимость

```python
from collections.abc import Generator
from sqlalchemy.orm import Session


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

## Использование

```python
from fastapi import Depends


@app.get("/tasks")
def list_tasks(db: Session = Depends(get_db)) -> list[dict]:
    return []
```

## Пользователь

```python
def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    ...
```

## Сервис

```python
class TaskService:
    def __init__(self, db: Session) -> None:
        self.db = db


def get_task_service(db: Session = Depends(get_db)) -> TaskService:
    return TaskService(db)
```

## Частые ошибки

- **Создавать глобальную сессию.**
- **Забывать закрывать ресурс.**
- **Делать побочные эффекты в зависимости.**
- **Прятать бизнес-логику в роутере.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен `yield` в `get_db`?",
  "options": [
    {
      "text": "Чтобы закрыть сессию после запроса",
      "correct": true,
      "explanation": "Код после yield выполняется при завершении."
    },
    {
      "text": "Чтобы создать таблицу",
      "correct": false,
      "explanation": "Это миграция."
    },
    {
      "text": "Чтобы включить CORS",
      "correct": false,
      "explanation": "Это middleware."
    }
  ],
  "explanation": "`yield` управляет жизненным циклом ресурса."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Depends?",
  "options": [
    {
      "text": "Может подставлять сессию",
      "correct": true
    },
    {
      "text": "Может проверять пользователя",
      "correct": true
    },
    {
      "text": "Помогает тестировать",
      "correct": true
    },
    {
      "text": "Заменяет Pydantic",
      "correct": false,
      "explanation": "Это разные задачи."
    }
  ],
  "explanation": "Depends уменьшает связанность."
}
```

## Куда дальше

- [Async в FastAPI](theme.html?path=content/python/fastapi-i-kontrakt-api/async-v-fastapi.md)
- [OpenAPI и документация](theme.html?path=content/python/fastapi-i-kontrakt-api/openapi-i-dokumentaciya.md)
- [FastAPI и контракт API](theme.html?path=content/python/fastapi-i-kontrakt-api/fastapi-i-kontrakt-api.md)
