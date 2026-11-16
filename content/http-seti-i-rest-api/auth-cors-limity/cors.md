---
title: CORS
description: Same-origin, preflight, credentials и типичные ошибки браузера.
keywords: CORS, same-origin, preflight, OPTIONS, credentials, Access-Control

---

# CORS

CORS — механизм браузера, который разрешает или запрещает запросы с
другого origin.

## Origin

Origin — это схема, домен и порт:

```text
https://app.example.com:443
```

`https://app.example.com` и `http://app.example.com` — разные origin.

## Preflight

Для сложных запросов браузер сначала отправляет `OPTIONS`:

```http
OPTIONS /api/tasks
Origin: https://app.example.com
Access-Control-Request-Method: POST
```

Сервер отвечает разрешениями.

## Заголовки

```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PATCH, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

## Credentials

С `credentials: include` нельзя использовать `*` в
`Access-Control-Allow-Origin`. Нужен конкретный origin.

## Частые ошибки

- **`*` вместе с credentials.**
- **Не обрабатывать `OPTIONS`.**
- **Разрешать все домены.**
- **Забывать `Vary: Origin`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое preflight?",
  "options": [
    {
      "text": "Предварительный OPTIONS-запрос",
      "correct": true,
      "explanation": "Браузер проверяет разрешения."
    },
    {
      "text": "Первый GET",
      "correct": false,
      "explanation": "Это не preflight."
    },
    {
      "text": "Создание cookie",
      "correct": false,
      "explanation": "Это отдельно."
    }
  ],
  "explanation": "Preflight проверяет CORS."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для CORS?",
  "options": [
    {
      "text": "Разрешать конкретный origin",
      "correct": true
    },
    {
      "text": "Обрабатывать OPTIONS",
      "correct": true
    },
    {
      "text": "Учитывать credentials",
      "correct": true
    },
    {
      "text": "Разрешать `*` с credentials",
      "correct": false,
      "explanation": "Браузер это запретит."
    }
  ],
  "explanation": "CORS должен быть точным."
}
```

## Куда дальше

- [Rate limiting](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/rate-limiting.md)
- [Auth, CORS и лимиты](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/auth-cors-limity.md)
- [Практика: защитить API](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/praktika-zashchitit-api.md)
