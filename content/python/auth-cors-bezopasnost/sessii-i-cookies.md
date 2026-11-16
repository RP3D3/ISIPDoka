---
title: Сессии и cookies
description: Cookie-сессии, HttpOnly, Secure, SameSite и защита от CSRF.
keywords: Python, сессии, cookies, HttpOnly, Secure, SameSite, CSRF

---

# Сессии и cookies

Cookie-сессия хранит идентификатор на клиенте, а данные — на сервере.

## Установка cookie

```python
from fastapi import Response

response = Response()
response.set_cookie(
    key="session_id",
    value=session_id,
    httponly=True,
    secure=True,
    samesite="lax",
    max_age=3600,
)
```

## Флаги

- `HttpOnly` — недоступно JavaScript;
- `Secure` — только по HTTPS;
- `SameSite` — ограничивает межсайтовые запросы;
- `max_age` — срок жизни.

## CSRF

Для cookie-сессий нужна защита от CSRF: токен формы или заголовок.

## Выход

```python
response.delete_cookie("session_id")
```

## Частые ошибки

- **Хранить сессию в открытом cookie.**
- **Не ставить `HttpOnly`.**
- **Не ставить `Secure` в проде.**
- **Игнорировать CSRF.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем `HttpOnly`?",
  "options": [
    {
      "text": "Скрыть cookie от JavaScript",
      "correct": true,
      "explanation": "Это снижает риск XSS-кражи."
    },
    {
      "text": "Ускорить базу",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Создать токен",
      "correct": false,
      "explanation": "Это не токен."
    }
  ],
  "explanation": "`HttpOnly` защищает cookie."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для cookie?",
  "options": [
    {
      "text": "`HttpOnly`",
      "correct": true
    },
    {
      "text": "`Secure`",
      "correct": true
    },
    {
      "text": "`SameSite`",
      "correct": true
    },
    {
      "text": "Хранить пароль в cookie",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Флаги cookie снижают риски."
}
```

## Куда дальше

- [CORS](theme.html?path=content/python/auth-cors-bezopasnost/cors.md)
- [Rate limiting](theme.html?path=content/python/auth-cors-bezopasnost/rate-limiting.md)
- [Auth, CORS и безопасность](theme.html?path=content/python/auth-cors-bezopasnost/auth-cors-bezopasnost.md)
