---
title: Практика: API и сеть по задаче
description: Финальная практика: спроектировать, собрать и проверить API задач.
keywords: практика, API, сеть, задача, контракт, тесты

---

# Практика: API и сеть по задаче

Соберите API для задач и проверьте его от браузера до базы.

## Задача

> Нужен API задач: пользователь видит свои задачи, создаёт новые,
> отмечает выполненные и удаляет.

## 1. Требования

- роли;
- владелец задачи;
- статусы;
- пагинация;
- ошибки.

## 2. Контракт

```text
GET    /api/tasks
POST   /api/tasks
PATCH  /api/tasks/{id}
DELETE /api/tasks/{id}
```

## 3. Реализация

- auth;
- валидация;
- база;
- CORS;
- единый формат ошибок.

## 4. Проверка

```bash
curl -i https://api.example.com/api/tasks
```

Проверьте:

- `200` для списка;
- `201` для создания;
- `422` для пустого title;
- `403` для чужой задачи;
- `404` для несуществующей.

## 5. Тесты

- создание;
- пустой title;
- чужой ресурс;
- удаление;
- повторный запрос.

## Чек-лист

- [ ] Контракт описан.
- [ ] Права проверяются.
- [ ] CORS настроен.
- [ ] Ошибки единые.
- [ ] Проверено из браузера.
- [ ] Есть README.

## Частые ошибки

- **Нет проверки владельца.**
- **CORS открыт всем.**
- **Нет `422`.**
- **Нет тестов.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что проверить при чужой задаче?",
  "options": [
    {
      "text": "403",
      "correct": true,
      "explanation": "Пользователь известен, но прав нет."
    },
    {
      "text": "201",
      "correct": false,
      "explanation": "Это создание."
    },
    {
      "text": "204",
      "correct": false,
      "explanation": "Это успех без тела."
    }
  ],
  "explanation": "Чужой ресурс — это запрет."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в финальную практику?",
  "options": [
    {
      "text": "Требования и контракт",
      "correct": true
    },
    {
      "text": "Auth, CORS и база",
      "correct": true
    },
    {
      "text": "Проверка и тесты",
      "correct": true
    },
    {
      "text": "Только вёрстка",
      "correct": false,
      "explanation": "Это не API."
    }
  ],
  "explanation": "Практика покрывает весь путь."
}
```

## Куда дальше

- [Практика: API и сеть](theme.html?path=content/http-seti-i-rest-api/praktika-api-i-set/praktika-api-i-set.md)
- [Основы сетей](theme.html?path=content/http-seti-i-rest-api/osnovy-setey/osnovy-setey.md)
- [REST и контракт API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/rest-i-kontrakt-api.md)
