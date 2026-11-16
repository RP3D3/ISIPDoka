---
title: Routing и параметры
description: Path, query, body, APIRouter и порядок маршрутов.
keywords: Python, FastAPI, routing, path, query, body, APIRouter

---

# Routing и параметры

Маршрут связывает метод и путь с функцией.

## Path-параметр

```python
@app.get("/tasks/{task_id}")
def get_task(task_id: int) -> dict[str, int]:
    return {"id": task_id}
```

Тип `int` включает валидацию.

## Query-параметры

```python
@app.get("/tasks")
def list_tasks(skip: int = 0, limit: int = 20) -> dict[str, int]:
    return {"skip": skip, "limit": limit}
```

Запрос: `/tasks?skip=0&limit=20`.

## APIRouter

```python
from fastapi import APIRouter

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/{task_id}")
def get_task(task_id: int) -> dict[str, int]:
    return {"id": task_id}
```

Подключение:

```python
app.include_router(router)
```

## Частые ошибки

- **Путать path и query.**
- **Не указывать тип параметра.**
- **Дублировать маршруты.**
- **Ставить общий маршрут раньше конкретного.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где находится `task_id` в `/tasks/{task_id}`?",
  "options": [
    {
      "text": "В пути",
      "correct": true,
      "explanation": "Это path-параметр."
    },
    {
      "text": "В query",
      "correct": false,
      "explanation": "Query идёт после `?`."
    },
    {
      "text": "В заголовке",
      "correct": false,
      "explanation": "Это header."
    }
  ],
  "explanation": "Path-параметр — часть URL."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про параметры FastAPI?",
  "options": [
    {
      "text": "Тип включает валидацию",
      "correct": true
    },
    {
      "text": "Query идёт после `?`",
      "correct": true
    },
    {
      "text": "APIRouter группирует маршруты",
      "correct": true
    },
    {
      "text": "Path-параметр нельзя типизировать",
      "correct": false,
      "explanation": "Можно и нужно."
    }
  ],
  "explanation": "Типы делают контракт явным."
}
```

## Куда дальше

- [Pydantic-модели](theme.html?path=content/python/fastapi-i-kontrakt-api/pydantic-modeli.md)
- [Статусы и ошибки](theme.html?path=content/python/fastapi-i-kontrakt-api/status-kody-i-oshibki.md)
- [Depends и сервисы](theme.html?path=content/python/fastapi-i-kontrakt-api/depends-i-servisy.md)
