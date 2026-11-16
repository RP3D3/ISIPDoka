---
title: OpenAPI и документация
description: Схема API, теги, response_model, примеры и безопасность docs.
keywords: Python, FastAPI, OpenAPI, docs, Swagger, теги, response_model

---

# OpenAPI и документация

FastAPI строит OpenAPI-схему по типам и маршрутам. На её основе работают
Swagger UI и ReDoc.

## Документация

- `/docs` — Swagger UI;
- `/redoc` — ReDoc;
- `/openapi.json` — машинная схема.

## Теги и описание

```python
@app.get(
    "/tasks/{task_id}",
    tags=["tasks"],
    summary="Получить задачу",
    response_model=TaskRead,
)
def get_task(task_id: int) -> TaskRead:
    ...
```

## Ответы

```python
@app.post(
    "/tasks",
    status_code=201,
    responses={422: {"description": "Ошибка валидации"}},
)
def create_task(payload: TaskCreate) -> TaskRead:
    ...
```

## Примеры

```python
class TaskCreate(BaseModel):
    title: str

    model_config = {
        "json_schema_extra": {
            "examples": [{"title": "Учёба"}],
        }
    }
```

## Частые ошибки

- **Не указывать `response_model`.**
- **Дублировать описание вручную.**
- **Оставлять внутренние docs открытыми.**
- **Игнорировать коды ошибок.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое `/openapi.json`?",
  "options": [
    {
      "text": "Машинная схема API",
      "correct": true,
      "explanation": "Её используют клиенты и docs."
    },
    {
      "text": "База данных",
      "correct": false,
      "explanation": "Это не база."
    },
    {
      "text": "CSS-файл",
      "correct": false,
      "explanation": "Это не стили."
    }
  ],
  "explanation": "OpenAPI описывает контракт API."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что улучшает документацию?",
  "options": [
    {
      "text": "Теги",
      "correct": true
    },
    {
      "text": "`response_model`",
      "correct": true
    },
    {
      "text": "Примеры",
      "correct": true
    },
    {
      "text": "Случайные статусы",
      "correct": false,
      "explanation": "Они запутывают клиентов."
    }
  ],
  "explanation": "Документация должна совпадать с кодом."
}
```

## Куда дальше

- [FastAPI и контракт API](theme.html?path=content/python/fastapi-i-kontrakt-api/fastapi-i-kontrakt-api.md)
- [Практика: API на FastAPI](theme.html?path=content/python/fastapi-i-kontrakt-api/praktika-api-fastapi.md)
- [Auth, CORS и безопасность](theme.html?path=content/python/auth-cors-bezopasnost/paroli-i-heshirovanie.md)
