---
title: Rate limiting
description: Ограничение частоты запросов, 429, заголовки и стратегии.
keywords: rate limiting, 429, Retry-After, лимиты, квоты, API

---

# Rate limiting

Rate limiting защищает API от перегрузки, перебора и случайных циклов.

## Что ограничивать

- по IP;
- по пользователю;
- по API key;
- по эндпоинту;
- по действию.

## Алгоритмы

- fixed window — окно фиксированной длины;
- sliding window — скользящее окно;
- token bucket — токены пополняются со временем;
- leaky bucket — запросы выравниваются.

## Ответ

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
```

Полезные заголовки:

```http
RateLimit-Limit: 60
RateLimit-Remaining: 0
RateLimit-Reset: 60
```

## Частые ошибки

- **Ограничивать только по IP.** За NAT много пользователей.
- **Не отдавать `Retry-After`.**
- **Блокировать навсегда.**
- **Не учитывать распределённые серверы.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой статус при превышении лимита?",
  "options": [
    {
      "text": "429 Too Many Requests",
      "correct": true,
      "explanation": "Это стандартный код."
    },
    {
      "text": "404 Not Found",
      "correct": false,
      "explanation": "Это не найдено."
    },
    {
      "text": "500 Internal Server Error",
      "correct": false,
      "explanation": "Это ошибка сервера."
    }
  ],
  "explanation": "429 сообщает о лимите."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для лимитов?",
  "options": [
    {
      "text": "Считать по пользователю или ключу",
      "correct": true
    },
    {
      "text": "Отдавать `Retry-After`",
      "correct": true
    },
    {
      "text": "Учитывать распределённые серверы",
      "correct": true
    },
    {
      "text": "Блокировать навсегда",
      "correct": false,
      "explanation": "Лимит должен быть временным."
    }
  ],
  "explanation": "Лимиты должны быть понятными."
}
```

## Куда дальше

- [Auth, CORS и лимиты](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/auth-cors-limity.md)
- [Практика: защитить API](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/praktika-zashchitit-api.md)
- [Клиент API и фронтенд](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/fetch.md)
