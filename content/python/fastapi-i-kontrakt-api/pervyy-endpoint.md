---
title: Первый эндпоинт
description: FastAPI, uvicorn, декоратор маршрута и автоматическая документация.
keywords: Python, FastAPI, uvicorn, endpoint, docs, OpenAPI

---

# Первый эндпоинт

Эндпоинт — функция, которая отвечает на HTTP-запрос.

## Установка

```bash
pip install fastapi uvicorn
```

## Приложение

```python
from fastapi import FastAPI

app = FastAPI(title="Tasks API")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
```

## Запуск

```bash
uvicorn app.main:app --reload
```

`app.main` — модуль, `app` — объект FastAPI.

## Документация

- `/docs` — Swagger UI;
- `/redoc` — ReDoc;
- `/openapi.json` — схема.

## Частые ошибки

- **Указать неверный модуль в uvicorn.**
- **Забыть `--reload` при разработке.**
- **Делать блокирующий вызов в async-функции.**
- **Не описывать типы ответа.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что запускает uvicorn?",
  "options": [
    {
      "text": "ASGI-приложение",
      "correct": true,
      "explanation": "FastAPI работает через ASGI."
    },
    {
      "text": "Базу данных",
      "correct": false,
      "explanation": "Это отдельный сервер."
    },
    {
      "text": "Браузер",
      "correct": false,
      "explanation": "Это клиент."
    }
  ],
  "explanation": "uvicorn — ASGI-сервер."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что доступно у FastAPI?",
  "options": [
    {
      "text": "`/docs`",
      "correct": true
    },
    {
      "text": "`/redoc`",
      "correct": true
    },
    {
      "text": "`/openapi.json`",
      "correct": true
    },
    {
      "text": "`/phpinfo`",
      "correct": false,
      "explanation": "Это не Python."
    }
  ],
  "explanation": "Документация строится автоматически."
}
```

## Куда дальше

- [Routing и параметры](theme.html?path=content/python/fastapi-i-kontrakt-api/routing-i-parametry.md)
- [Pydantic-модели](theme.html?path=content/python/fastapi-i-kontrakt-api/pydantic-modeli.md)
- [Статусы и ошибки](theme.html?path=content/python/fastapi-i-kontrakt-api/status-kody-i-oshibki.md)
