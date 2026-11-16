---
title: OpenAPI и контракт
description: Спецификация API, схемы, примеры, кодогенерация и контрактные тесты.
keywords: OpenAPI, Swagger, контракт, схема, примеры, кодогенерация

---

# OpenAPI и контракт

OpenAPI — формат описания REST API. Спецификация фиксирует пути, схемы,
статусы и ошибки.

## Минимальный фрагмент

```yaml
openapi: 3.1.0
info:
  title: Tasks API
  version: 1.0.0
paths:
  /api/tasks:
    get:
      responses:
        "200":
          description: Список задач
```

## Что описывают

- пути и методы;
- параметры;
- тело запроса;
- схемы ответов;
- коды ошибок;
- примеры.

## Зачем

- документация всегда рядом;
- клиенты генерируются по схеме;
- контрактные тесты проверяют соответствие;
- проще обсуждать изменения.

## Частые ошибки

- **Спецификация устарела.**
- **Нет примеров.**
- **Не описаны ошибки.**
- **Схема не проверяется тестами.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что описывает OpenAPI?",
  "options": [
    {
      "text": "Контракт REST API",
      "correct": true,
      "explanation": "Пути, схемы и ответы."
    },
    {
      "text": "Стили CSS",
      "correct": false,
      "explanation": "Это не UI."
    },
    {
      "text": "Схему базы данных",
      "correct": false,
      "explanation": "Это миграции."
    }
  ],
  "explanation": "OpenAPI фиксирует контракт."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что должно быть в спецификации?",
  "options": [
    {
      "text": "Пути и методы",
      "correct": true
    },
    {
      "text": "Схемы ответов",
      "correct": true
    },
    {
      "text": "Ошибки",
      "correct": true
    },
    {
      "text": "Только название проекта",
      "correct": false,
      "explanation": "Этого мало."
    }
  ],
  "explanation": "Спецификация описывает контракт целиком."
}
```

## Куда дальше

- [REST и контракт API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/rest-i-kontrakt-api.md)
- [Практика: спроектировать API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/praktika-sproektirovat-api.md)
- [Auth, CORS и лимиты](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/sessii-i-cookies.md)
