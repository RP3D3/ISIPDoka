---
title: REST и статус-коды
description: Ресурсы, методы, идемпотентность и правильные ответы API.
keywords: PHP, REST, API, статус-коды, GET, POST, PUT, DELETE

---

# REST и статус-коды

REST — это стиль API, где ресурсы адресуются путями, а действия задаются
HTTP-методами.

## Ресурсы

```text
GET    /api/posts
GET    /api/posts/42
POST   /api/posts
PATCH  /api/posts/42
DELETE /api/posts/42
```

## Методы

- GET — чтение, без изменения;
- POST — создание;
- PATCH — частичное обновление;
- PUT — полная замена;
- DELETE — удаление.

## Статус-коды

- `200` — успех;
- `201` — создано;
- `204` — успех без тела;
- `400` — ошибка запроса;
- `401` — не авторизован;
- `403` — запрещено;
- `404` — не найдено;
- `422` — ошибка валидации;
- `500` — ошибка сервера.

## Ошибки

```json
{
  "error": {
    "code": "not_found",
    "message": "Пост не найден"
  }
}
```

## Частые ошибки

- **Менять данные через GET.**
- **Всегда отвечать `200`.**
- **Писать глаголы в URL: `/getPosts`.**
- **Возвращать HTML вместо JSON.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой статус вернуть при создании ресурса?",
  "options": [
    {
      "text": "201",
      "correct": true,
      "explanation": "Он означает успешное создание."
    },
    {
      "text": "404",
      "correct": false,
      "explanation": "Это ресурс не найден."
    },
    {
      "text": "500",
      "correct": false,
      "explanation": "Это ошибка сервера."
    }
  ],
  "explanation": "Для создания используют 201."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про REST?",
  "options": [
    {
      "text": "GET не меняет данные",
      "correct": true
    },
    {
      "text": "POST создаёт ресурс",
      "correct": true
    },
    {
      "text": "DELETE удаляет ресурс",
      "correct": true
    },
    {
      "text": "GET можно использовать для удаления",
      "correct": false,
      "explanation": "Это нарушает семантику HTTP."
    }
  ],
  "explanation": "Методы должны соответствовать действиям."
}
```

## Куда дальше

- [Routing и контроллеры](theme.html?path=content/php/api-i-frontend/routing-i-kontrollery.md)
- [Валидация и ошибки](theme.html?path=content/php/api-i-frontend/validaciya-i-oshibki.md)
- [CORS и cookies](theme.html?path=content/php/api-i-frontend/cors-i-cookies.md)
