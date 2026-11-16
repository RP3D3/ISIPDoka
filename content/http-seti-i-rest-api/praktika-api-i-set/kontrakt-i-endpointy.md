---
title: Контракт и эндпоинты
description: Пути, методы, статусы, ошибки, пагинация и OpenAPI для практики.
keywords: практика, контракт, эндпоинты, API, OpenAPI, статусы

---

# Контракт и эндпоинты

Контракт фиксирует, что клиент может вызвать и что получит в ответ.

## Эндпоинты

```text
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/{id}
PATCH  /api/tasks/{id}
DELETE /api/tasks/{id}
```

## Статусы

- `200` — чтение;
- `201` — создание;
- `204` — удаление;
- `400` — сломанный запрос;
- `401` — нет входа;
- `403` — чужая задача;
- `404` — нет задачи;
- `422` — ошибка полей.

## Ошибка

```json
{
  "error": {
    "code": "validation_error",
    "message": "Проверьте поля",
    "fields": {
      "title": "Обязательно"
    }
  }
}
```

## Список

```text
GET /api/tasks?limit=20&offset=0&sort=-created_at
```

## OpenAPI

Опишите пути и схемы. Это станет документацией и основой тестов.

## Частые ошибки

- **Глаголы в URL.**
- **Разные форматы ошибок.**
- **Нет пагинации.**
- **Нет примеров.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как описать создание задачи?",
  "options": [
    {
      "text": "`POST /api/tasks`",
      "correct": true,
      "explanation": "Создание — это POST."
    },
    {
      "text": "`GET /api/createTask`",
      "correct": false,
      "explanation": "GET не меняет данные."
    },
    {
      "text": "`DELETE /api/tasks`",
      "correct": false,
      "explanation": "Это удаление."
    }
  ],
  "explanation": "Метод должен соответствовать действию."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в контракт?",
  "options": [
    {
      "text": "Пути и методы",
      "correct": true
    },
    {
      "text": "Статусы",
      "correct": true
    },
    {
      "text": "Ошибки и пагинация",
      "correct": true
    },
    {
      "text": "Только название проекта",
      "correct": false,
      "explanation": "Этого мало."
    }
  ],
  "explanation": "Контракт описывает обмен."
}
```

## Куда дальше

- [Реализация и проверка](theme.html?path=content/http-seti-i-rest-api/praktika-api-i-set/realizaciya-i-proverka.md)
- [Практика: API и сеть](theme.html?path=content/http-seti-i-rest-api/praktika-api-i-set/praktika-api-i-set.md)
- [Практика: API и сеть по задаче](theme.html?path=content/http-seti-i-rest-api/praktika-api-i-set/praktika-api-i-set-po-zadache.md)
