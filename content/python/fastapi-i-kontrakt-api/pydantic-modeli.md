---
title: Pydantic-модели
description: BaseModel, валидация, response_model и разделение схем.
keywords: Python, FastAPI, Pydantic, BaseModel, валидация, response_model

---

# Pydantic-модели

Pydantic-схемы описывают вход и выход API. Они проверяют типы и
обязательность полей.

## Вход

```python
from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    done: bool = False
```

## Выход

```python
class TaskRead(BaseModel):
    id: int
    title: str
    done: bool

    model_config = {"from_attributes": True}
```

## Эндпоинт

```python
@app.post("/tasks", response_model=TaskRead)
def create_task(payload: TaskCreate) -> TaskRead:
    return TaskRead(id=1, title=payload.title, done=payload.done)
```

## Валидаторы

```python
from pydantic import field_validator


class TaskCreate(BaseModel):
    title: str

    @field_validator("title")
    @classmethod
    def title_not_empty(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("Title обязателен")
        return value
```

## Частые ошибки

- **Отдавать ORM-модель с паролем.**
- **Использовать одну схему для входа и выхода.**
- **Не задавать ограничения полей.**
- **Забыть `from_attributes`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен `response_model`?",
  "options": [
    {
      "text": "Описывает и фильтрует ответ",
      "correct": true,
      "explanation": "Лишние поля не уйдут клиенту."
    },
    {
      "text": "Создаёт таблицу",
      "correct": false,
      "explanation": "Это миграция."
    },
    {
      "text": "Запускает сервер",
      "correct": false,
      "explanation": "Это uvicorn."
    }
  ],
  "explanation": "`response_model` задаёт контракт ответа."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Pydantic?",
  "options": [
    {
      "text": "Проверяет типы",
      "correct": true
    },
    {
      "text": "Может задавать ограничения",
      "correct": true
    },
    {
      "text": "Разделяет вход и выход",
      "correct": true
    },
    {
      "text": "Заменяет базу данных",
      "correct": false,
      "explanation": "Это разные задачи."
    }
  ],
  "explanation": "Схемы делают API предсказуемым."
}
```

## Куда дальше

- [Статусы и ошибки](theme.html?path=content/python/fastapi-i-kontrakt-api/status-kody-i-oshibki.md)
- [Depends и сервисы](theme.html?path=content/python/fastapi-i-kontrakt-api/depends-i-servisy.md)
- [Async в FastAPI](theme.html?path=content/python/fastapi-i-kontrakt-api/async-v-fastapi.md)
