---
title: Практика: API на FastAPI
description: Упражнение: CRUD API с Pydantic, SQLAlchemy и статусами.
keywords: практика, FastAPI, API, Pydantic, SQLAlchemy, CRUD, статусы

---

# Практика: API на FastAPI

Сделайте CRUD API для задач.

## 1. Контракт

```text
GET    /tasks
POST   /tasks
GET    /tasks/{task_id}
PATCH  /tasks/{task_id}
DELETE /tasks/{task_id}
```

## 2. Схемы

```python
from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)


class TaskRead(BaseModel):
    id: int
    title: str
    done: bool

    model_config = {"from_attributes": True}
```

## 3. Эндпоинты

```python
@app.get("/tasks", response_model=list[TaskRead])
def list_tasks(db: Session = Depends(get_db)) -> list[Task]:
    return list(db.scalars(select(Task)).all())


@app.post("/tasks", response_model=TaskRead, status_code=201)
def create_task(
    payload: TaskCreate,
    db: Session = Depends(get_db),
) -> Task:
    task = Task(title=payload.title)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task
```

## 4. Проверка

- [ ] `POST` возвращает `201`.
- [ ] Пустой title даёт `422`.
- [ ] Несуществующий id даёт `404`.
- [ ] `DELETE` возвращает `204`.
- [ ] `/docs` показывает схемы.
- [ ] Ошибки не раскрывают стек.

## Частые ошибки

- **Возвращать `200` на создание.**
- **Не проверять `None` перед `404`.**
- **Отдавать ORM-объект без `response_model`.**
- **Забывать `commit`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой статус у успешного создания?",
  "options": [
    {
      "text": "201",
      "correct": true,
      "explanation": "Created."
    },
    {
      "text": "404",
      "correct": false,
      "explanation": "Это not found."
    },
    {
      "text": "500",
      "correct": false,
      "explanation": "Это ошибка сервера."
    }
  ],
  "explanation": "Создание возвращает `201`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "CRUD-эндпоинты",
      "correct": true
    },
    {
      "text": "Pydantic-схемы",
      "correct": true
    },
    {
      "text": "Статусы и ошибки",
      "correct": true
    },
    {
      "text": "Только CSS",
      "correct": false,
      "explanation": "Это не API."
    }
  ],
  "explanation": "Практика собирает полный CRUD."
}
```

## Куда дальше

- [FastAPI и контракт API](theme.html?path=content/python/fastapi-i-kontrakt-api/fastapi-i-kontrakt-api.md)
- [Auth, CORS и безопасность](theme.html?path=content/python/auth-cors-bezopasnost/paroli-i-heshirovanie.md)
- [Асинхронность, тесты и деплой](theme.html?path=content/python/async-testy-deploy/async-await.md)
