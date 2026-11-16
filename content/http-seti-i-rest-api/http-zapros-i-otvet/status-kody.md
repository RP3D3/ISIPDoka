---
title: Статус-коды
description: 1xx–5xx, успешные ответы, ошибки клиента и сервера.
keywords: HTTP, статус-коды, 200, 201, 204, 301, 304, 400, 401, 403, 404, 422, 429, 500

---

# Статус-коды

Статус-код — главный сигнал о результате запроса. Он важнее текста
ошибки.

## Группы

- `1xx` — информационные;
- `2xx` — успех;
- `3xx` — перенаправление;
- `4xx` — ошибка клиента;
- `5xx` — ошибка сервера.

## Частые коды

- `200 OK` — успех;
- `201 Created` — создано;
- `204 No Content` — успех без тела;
- `301 Moved Permanently` — постоянный редирект;
- `302 Found` — временный редирект;
- `304 Not Modified` — кэш актуален;
- `400 Bad Request` — запрос сломан;
- `401 Unauthorized` — нет аутентификации;
- `403 Forbidden` — доступ запрещён;
- `404 Not Found` — ресурс не найден;
- `409 Conflict` — конфликт;
- `422 Unprocessable Entity` — ошибка валидации;
- `429 Too Many Requests` — лимит;
- `500 Internal Server Error` — ошибка сервера;
- `503 Service Unavailable` — сервис недоступен.

## Пример

```http
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{"error":{"code":"validation_error","message":"Email обязателен"}}
```

## Частые ошибки

- **Всегда отвечать `200`.** Клиент не увидит ошибку.
- **Путать `401` и `403`.** Первый — «кто ты», второй — «нельзя».
- **Отдавать `500` на ошибку валидации.**
- **Путать `301` и `302`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что означает `403`?",
  "options": [
    {
      "text": "Доступ запрещён",
      "correct": true,
      "explanation": "Пользователь известен, но прав нет."
    },
    {
      "text": "Ресурс не найден",
      "correct": false,
      "explanation": "Это 404."
    },
    {
      "text": "Ошибка сервера",
      "correct": false,
      "explanation": "Это 500."
    }
  ],
  "explanation": "403 — про запрет доступа."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про статус-коды?",
  "options": [
    {
      "text": "201 — создано",
      "correct": true
    },
    {
      "text": "401 — нет аутентификации",
      "correct": true
    },
    {
      "text": "422 — ошибка валидации",
      "correct": true
    },
    {
      "text": "500 — успех",
      "correct": false,
      "explanation": "500 — ошибка сервера."
    }
  ],
  "explanation": "Код должен соответствовать результату."
}
```

## Куда дальше

- [Заголовки](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/zagolovki.md)
- [URL и параметры](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/url-i-parametry.md)
- [Content-Type и MIME](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/content-type-i-mime.md)
