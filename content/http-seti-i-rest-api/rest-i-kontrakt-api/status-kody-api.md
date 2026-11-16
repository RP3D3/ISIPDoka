---
title: Статус-коды API
description: Какие коды возвращать в REST API и как не путать ошибки.
keywords: REST, API, статус-коды, 200, 201, 204, 400, 401, 403, 404, 422, 500

---

# Статус-коды API

Код ответа — часть контракта. Клиент должен понимать результат без
чтения текста.

## Успех

- `200 OK` — данные в теле;
- `201 Created` — ресурс создан;
- `204 No Content` — успех без тела.

## Ошибки клиента

- `400 Bad Request` — сломанный запрос;
- `401 Unauthorized` — нет аутентификации;
- `403 Forbidden` — нет прав;
- `404 Not Found` — ресурс не найден;
- `409 Conflict` — конфликт состояния;
- `422 Unprocessable Entity` — ошибка валидации;
- `429 Too Many Requests` — лимит.

## Ошибки сервера

- `500 Internal Server Error` — непредвиденная ошибка;
- `503 Service Unavailable` — сервис временно недоступен.

## Пример

```http
HTTP/1.1 201 Created
Location: /api/tasks/42
Content-Type: application/json

{"data":{"id":42,"title":"Задача"}}
```

## Частые ошибки

- **Всегда отвечать `200`.**
- **Отдавать `500` на ошибку валидации.**
- **Путать `401` и `403`.**
- **Не указывать `Location` при `201`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой код вернуть при создании ресурса?",
  "options": [
    {
      "text": "201",
      "correct": true,
      "explanation": "Он означает успешное создание."
    },
    {
      "text": "204",
      "correct": false,
      "explanation": "Это успех без тела."
    },
    {
      "text": "422",
      "correct": false,
      "explanation": "Это ошибка валидации."
    }
  ],
  "explanation": "Создание подтверждается 201."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про коды API?",
  "options": [
    {
      "text": "401 — нет аутентификации",
      "correct": true
    },
    {
      "text": "403 — нет прав",
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
  "explanation": "Код должен отражать результат."
}
```

## Куда дальше

- [Формат ошибок](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/format-oshibok.md)
- [Пагинация, фильтры и сортировка](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/paginaciya-filtry-sortirovka.md)
- [Версионирование API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/versirovanie-api.md)
