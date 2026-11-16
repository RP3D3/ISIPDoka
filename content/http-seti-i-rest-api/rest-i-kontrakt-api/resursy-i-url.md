---
title: Ресурсы и URL
description: Существительные, иерархия, идентификаторы и предсказуемые пути API.
keywords: REST, ресурсы, URL, пути, иерархия, идентификаторы

---

# Ресурсы и URL

В REST URL обозначает ресурс, а метод — действие. Пути должны быть
предсказуемыми.

## Хорошо

```text
GET    /api/tasks
GET    /api/tasks/42
POST   /api/tasks
PATCH  /api/tasks/42
DELETE /api/tasks/42
```

## Плохо

```text
GET  /api/getTasks
POST /api/createTask
POST /api/deleteTask
```

## Иерархия

```text
/api/users/42/tasks
```

Вложенность помогает показать связь, но не стоит уходить глубже двух-трёх
уровней.

## Идентификаторы

- используйте стабильные ID;
- не смешивайте ID и slug без причины;
- не отдавайте внутренние секреты.

## Частые ошибки

- **Глаголы в URL.**
- **Слишком глубокая вложенность.**
- **Разный стиль в разных эндпоинтах.**
- **ID в query вместо path.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как правильно назвать ресурс задач?",
  "options": [
    {
      "text": "`/api/tasks`",
      "correct": true,
      "explanation": "Это существительное во множественном числе."
    },
    {
      "text": "`/api/getTasks`",
      "correct": false,
      "explanation": "Глагол в URL — плохой стиль."
    },
    {
      "text": "`/api/deleteTask`",
      "correct": false,
      "explanation": "Действие должно быть методом."
    }
  ],
  "explanation": "URL обозначает ресурс."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про URL API?",
  "options": [
    {
      "text": "Лучше использовать существительные",
      "correct": true
    },
    {
      "text": "Вложенность должна быть умеренной",
      "correct": true
    },
    {
      "text": "Стиль должен быть единым",
      "correct": true
    },
    {
      "text": "Глаголы в пути обязательны",
      "correct": false,
      "explanation": "Действие задаёт метод."
    }
  ],
  "explanation": "Пути должны быть предсказуемыми."
}
```

## Куда дальше

- [Методы и идемпотентность](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/metody-i-idempotentnost.md)
- [Статус-коды API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/status-kody-api.md)
- [Формат ошибок](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/format-oshibok.md)
