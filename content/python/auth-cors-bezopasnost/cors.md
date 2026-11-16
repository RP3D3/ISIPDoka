---
title: CORS
description: Same-origin policy, preflight, allow_origins и credentials.
keywords: Python, FastAPI, CORS, preflight, allow_origins, credentials

---

# CORS

CORS разрешает браузеру обращаться к API с другого origin.

## Middleware

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://app.example.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
```

## Preflight

Браузер сначала отправляет `OPTIONS`, если запрос «непростой».

## Credentials

Если нужны cookie или `Authorization`, `allow_credentials=True`, но
`allow_origins` не может быть `*`.

## Частые ошибки

- **Открывать `*` вместе с credentials.**
- **Разрешать все методы без нужды.**
- **Забывать preflight.**
- **Показывать лишние заголовки.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает preflight?",
  "options": [
    {
      "text": "Спрашивает разрешение перед запросом",
      "correct": true,
      "explanation": "Это `OPTIONS`-запрос."
    },
    {
      "text": "Создаёт cookie",
      "correct": false,
      "explanation": "Это не cookie."
    },
    {
      "text": "Шифрует токен",
      "correct": false,
      "explanation": "Это не шифрование."
    }
  ],
  "explanation": "Preflight проверяет CORS-политику."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про CORS?",
  "options": [
    {
      "text": "Ограничивает origin",
      "correct": true
    },
    {
      "text": "Может требовать preflight",
      "correct": true
    },
    {
      "text": "Связан с credentials",
      "correct": true
    },
    {
      "text": "Заменяет аутентификацию",
      "correct": false,
      "explanation": "Это разные вещи."
    }
  ],
  "explanation": "CORS — политика браузера."
}
```

## Куда дальше

- [Rate limiting](theme.html?path=content/python/auth-cors-bezopasnost/rate-limiting.md)
- [Auth, CORS и безопасность](theme.html?path=content/python/auth-cors-bezopasnost/auth-cors-bezopasnost.md)
- [Практика: защитить API](theme.html?path=content/python/auth-cors-bezopasnost/praktika-zashchitit-api.md)
