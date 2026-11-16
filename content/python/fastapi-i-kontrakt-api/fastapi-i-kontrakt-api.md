---
title: FastAPI и контракт API
description: Итог группы: эндпоинты, Pydantic, статусы, Depends, async и OpenAPI.
keywords: FastAPI, итог, Pydantic, Depends, async, OpenAPI, API

---

# FastAPI и контракт API

Главная идея группы: API — это контракт. Типы, статусы и ошибки должны
быть явными.

## Что запомнить

- FastAPI строит схему по типам;
- Pydantic проверяет вход и выход;
- path и query — разные параметры;
- статус — часть контракта;
- `Depends` собирает зависимости;
- async подходит для I/O;
- OpenAPI документирует API.

## Чек-лист

- [ ] У каждого эндпоинта есть тип ответа.
- [ ] Вход описан Pydantic-схемой.
- [ ] Ошибки имеют понятный статус.
- [ ] Сессия закрывается через зависимость.
- [ ] Блокирующий код не ломает event loop.
- [ ] `/docs` отражает реальный контракт.

## Частые ошибки

- **Возвращать `200` на ошибку.**
- **Отдавать лишние поля.**
- **Использовать глобальную сессию.**
- **Делать `time.sleep` в async.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в контракте API?",
  "options": [
    {
      "text": "Явные типы, статусы и ошибки",
      "correct": true,
      "explanation": "Клиент должен понимать ответ."
    },
    {
      "text": "Как можно больше эндпоинтов",
      "correct": false,
      "explanation": "Количество не цель."
    },
    {
      "text": "Скрывать ошибки",
      "correct": false,
      "explanation": "Это усложняет отладку."
    }
  ],
  "explanation": "Контракт важнее реализации."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "Routing и Pydantic",
      "correct": true
    },
    {
      "text": "Статусы и Depends",
      "correct": true
    },
    {
      "text": "Async и OpenAPI",
      "correct": true
    },
    {
      "text": "Только SQL",
      "correct": false,
      "explanation": "SQL — отдельная группа."
    }
  ],
  "explanation": "Группа покрывает слой HTTP API."
}
```

## Куда дальше

- [Практика: API на FastAPI](theme.html?path=content/python/fastapi-i-kontrakt-api/praktika-api-fastapi.md)
- [Auth, CORS и безопасность](theme.html?path=content/python/auth-cors-bezopasnost/paroli-i-heshirovanie.md)
- [Асинхронность, тесты и деплой](theme.html?path=content/python/async-testy-deploy/async-await.md)
