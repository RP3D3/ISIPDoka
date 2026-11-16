---
title: Статусы и ошибки
description: HTTPException, коды ответов и единый формат ошибок.
keywords: Python, FastAPI, HTTPException, статусы, ошибки, 404, 422

---

# Статусы и ошибки

HTTP-статус сообщает результат запроса. Ошибки должны быть понятными и
безопасными.

## HTTPException

```python
from fastapi import HTTPException, status

raise HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Задача не найдена",
)
```

## Основные коды

- `200` — успех;
- `201` — создано;
- `204` — успех без тела;
- `400` — некорректный запрос;
- `401` — не аутентифицирован;
- `403` — нет прав;
- `404` — не найдено;
- `422` — ошибка валидации;
- `500` — ошибка сервера.

## Создание

```python
@app.post("/tasks", status_code=201)
def create_task(payload: TaskCreate) -> TaskRead:
    ...
```

## Частые ошибки

- **Возвращать `200` при ошибке.**
- **Отдавать `500` на ошибку валидации.**
- **Показывать стек клиенту.**
- **Менять формат ошибок от эндпоинта к эндпоинту.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что означает `404`?",
  "options": [
    {
      "text": "Ресурс не найден",
      "correct": true,
      "explanation": "Клиент запросил несуществующий объект."
    },
    {
      "text": "Нет прав",
      "correct": false,
      "explanation": "Это `403`."
    },
    {
      "text": "Ошибка сервера",
      "correct": false,
      "explanation": "Это `500`."
    }
  ],
  "explanation": "`404` — not found."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для ошибок API?",
  "options": [
    {
      "text": "Понятный статус",
      "correct": true
    },
    {
      "text": "Безопасное сообщение",
      "correct": true
    },
    {
      "text": "Единый формат",
      "correct": true
    },
    {
      "text": "Стек-трейс клиенту",
      "correct": false,
      "explanation": "Это утечка внутренностей."
    }
  ],
  "explanation": "Ошибки — часть контракта."
}
```

## Куда дальше

- [Depends и сервисы](theme.html?path=content/python/fastapi-i-kontrakt-api/depends-i-servisy.md)
- [Async в FastAPI](theme.html?path=content/python/fastapi-i-kontrakt-api/async-v-fastapi.md)
- [OpenAPI и документация](theme.html?path=content/python/fastapi-i-kontrakt-api/openapi-i-dokumentaciya.md)
