---
title: Базы данных и SQLAlchemy
description: Итог группы: SQL, драйверы, модели, CRUD, транзакции, миграции и N+1.
keywords: базы данных, SQLAlchemy, итог, CRUD, транзакции, Alembic, N+1

---

# Базы данных и SQLAlchemy

Главная идея группы: база данных — это не «чёрный ящик», а часть
приложения с транзакциями, схемой и производительностью.

## Что запомнить

- SQL полезно понимать даже с ORM;
- параметры защищают от инъекций;
- сессия — единица работы;
- `commit` сохраняет, `rollback` откатывает;
- модели описывают таблицы;
- миграции версионируют схему;
- N+1 лечится eager loading;
- число запросов нужно контролировать.

## Чек-лист

- [ ] Я не склеиваю SQL со строками.
- [ ] Я закрываю сессию.
- [ ] Я проверяю `commit` и `rollback`.
- [ ] Я не меняю схему руками.
- [ ] Я смотрю логи SQL при проблемах.
- [ ] Я понимаю, где может быть N+1.

## Частые ошибки

- **Забыть `commit`.**
- **Использовать `SELECT *` без нужды.**
- **Игнорировать миграции.**
- **Грузить связи в цикле.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное при работе с базой?",
  "options": [
    {
      "text": "Целостность данных и предсказуемые запросы",
      "correct": true,
      "explanation": "Это важнее скорости в начале."
    },
    {
      "text": "Как можно больше ORM",
      "correct": false,
      "explanation": "ORM не цель."
    },
    {
      "text": "Хранить пароль в коде",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "База требует дисциплины."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "SQL и драйверы",
      "correct": true
    },
    {
      "text": "SQLAlchemy и CRUD",
      "correct": true
    },
    {
      "text": "Транзакции, миграции и N+1",
      "correct": true
    },
    {
      "text": "Только CSS",
      "correct": false,
      "explanation": "Это не про базы."
    }
  ],
  "explanation": "Группа покрывает работу с данными."
}
```

## Куда дальше

- [Практика: CRUD на SQLAlchemy](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/praktika-crud-sqlalchemy.md)
- [FastAPI и контракт API](theme.html?path=content/python/fastapi-i-kontrakt-api/zachem-fastapi.md)
- [Auth, CORS и безопасность](theme.html?path=content/python/auth-cors-bezopasnost/paroli-i-heshirovanie.md)
