---
title: Контракт и эндпоинты
description: REST-пути, методы, статусы, схемы, пагинация и ошибки.
keywords: практика, контракт, REST, эндпоинты, статусы, пагинация

---

# Контракт и эндпоинты

Контракт фиксирует пути, методы, данные и ответы.

## Ресурсы

```text
GET    /tasks
POST   /tasks
GET    /tasks/{task_id}
PATCH  /tasks/{task_id}
DELETE /tasks/{task_id}
```

## Статусы

- `200` — чтение и обновление;
- `201` — создание;
- `204` — удаление без тела;
- `400` — ошибка запроса;
- `401` — нет аутентификации;
- `403` — нет прав;
- `404` — не найдено;
- `422` — валидация.

## Схемы

```json
{
  "title": "Учёба",
  "done": false
}
```

## Пагинация

```text
GET /tasks?limit=20&offset=0
```

## Частые ошибки

- **Глаголы в пути.**
- **`200` на ошибку.**
- **Разный формат ошибок.**
- **Нет пагинации.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой метод создаёт ресурс?",
  "options": [
    {
      "text": "POST",
      "correct": true,
      "explanation": "Он создаёт новую сущность."
    },
    {
      "text": "GET",
      "correct": false,
      "explanation": "Он читает."
    },
    {
      "text": "DELETE",
      "correct": false,
      "explanation": "Он удаляет."
    }
  ],
  "explanation": "POST — создание."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что должно быть в контракте?",
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
      "text": "Схемы и ошибки",
      "correct": true
    },
    {
      "text": "Пароль в URL",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Контракт должен быть полным."
}
```

## Куда дальше

- [Реализация и проверка](theme.html?path=content/python/praktika-python-backend/realizaciya-i-proverka.md)
- [Практика: Python-бэкенд](theme.html?path=content/python/praktika-python-backend/praktika-python-backend.md)
- [Практика по задаче](theme.html?path=content/python/praktika-python-backend/praktika-python-backend-po-zadache.md)
