---
title: Зачем FastAPI
description: Современный Python-фреймворк для API: типы, Pydantic, async и OpenAPI.
keywords: Python, FastAPI, API, Pydantic, async, OpenAPI, uvicorn

---

# Зачем FastAPI

FastAPI — фреймворк для HTTP API на Python. Он опирается на типы,
Pydantic и ASGI.

## Что даёт

- валидацию входа и выхода;
- автоматическую документацию OpenAPI;
- поддержку async;
- dependency injection;
- быстрый старт.

## Пример

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
```

## Где место

FastAPI хорош для:

- REST API;
- микросервисов;
- BFF для фронтенда;
- сервисов с async-вводом-выводом.

Django чаще выбирают для больших приложений с админкой и ORM «из
коробки».

## Частые ошибки

- **Игнорировать Pydantic.**
- **Делать блокирующие вызовы в async-эндпоинте.**
- **Не смотреть в `/docs`.**
- **Строить лишнюю архитектуру на старте.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "На чём основана валидация FastAPI?",
  "options": [
    {
      "text": "На Pydantic",
      "correct": true,
      "explanation": "Схемы описывают данные."
    },
    {
      "text": "На CSS",
      "correct": false,
      "explanation": "Это стили."
    },
    {
      "text": "На SQLite",
      "correct": false,
      "explanation": "Это база."
    }
  ],
  "explanation": "Pydantic проверяет данные по типам."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что даёт FastAPI?",
  "options": [
    {
      "text": "Валидацию данных",
      "correct": true
    },
    {
      "text": "OpenAPI-документацию",
      "correct": true
    },
    {
      "text": "Dependency injection",
      "correct": true
    },
    {
      "text": "Автоматический дизайн интерфейса",
      "correct": false,
      "explanation": "Дизайн — отдельная задача."
    }
  ],
  "explanation": "FastAPI ускоряет разработку API."
}
```

## Куда дальше

- [Первый эндпоинт](theme.html?path=content/python/fastapi-i-kontrakt-api/pervyy-endpoint.md)
- [Routing и параметры](theme.html?path=content/python/fastapi-i-kontrakt-api/routing-i-parametry.md)
- [Pydantic-модели](theme.html?path=content/python/fastapi-i-kontrakt-api/pydantic-modeli.md)
