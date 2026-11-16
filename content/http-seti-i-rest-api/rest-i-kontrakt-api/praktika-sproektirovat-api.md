---
title: Практика: спроектировать API
description: Упражнение: описать ресурсы, методы, статусы и ошибки для задач.
keywords: практика, REST, API, контракт, ресурсы, статусы, ошибки

---

# Практика: спроектировать API

Спроектируйте API для задач, не написав код.

## 1. Ресурсы

- tasks;
- users;
- tags.

## 2. Пути

```text
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/{id}
PATCH  /api/tasks/{id}
DELETE /api/tasks/{id}
```

## 3. Статусы

- `200` — список или задача;
- `201` — создание;
- `204` — удаление;
- `400` — сломанный запрос;
- `401` — нет входа;
- `403` — чужая задача;
- `404` — нет задачи;
- `422` — ошибка полей.

## 4. Ошибка

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

## 5. Список

```text
GET /api/tasks?limit=20&offset=0&sort=-created_at
```

## Чек-лист

- [ ] Нет глаголов в URL.
- [ ] Методы соответствуют действиям.
- [ ] Есть 404 и 422.
- [ ] Ошибки единые.
- [ ] Есть пагинация.

## Частые ошибки

- **`GET` для удаления.**
- **`200` на ошибку.**
- **Сортировка без белого списка.**
- **Нет описания ошибок.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как удалить задачу?",
  "options": [
    {
      "text": "`DELETE /api/tasks/{id}`",
      "correct": true,
      "explanation": "Метод соответствует действию."
    },
    {
      "text": "`GET /api/deleteTask`",
      "correct": false,
      "explanation": "GET не должен менять данные."
    },
    {
      "text": "`POST /api/tasks/{id}/delete`",
      "correct": false,
      "explanation": "Это лишний глагол."
    }
  ],
  "explanation": "Удаление — это DELETE."
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
      "text": "Формат ошибок",
      "correct": true
    },
    {
      "text": "Цвет кнопки",
      "correct": false,
      "explanation": "Это UI."
    }
  ],
  "explanation": "Контракт описывает обмен."
}
```

## Куда дальше

- [REST и контракт API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/rest-i-kontrakt-api.md)
- [Auth, CORS и лимиты](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/sessii-i-cookies.md)
- [Клиент API и фронтенд](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/fetch.md)
