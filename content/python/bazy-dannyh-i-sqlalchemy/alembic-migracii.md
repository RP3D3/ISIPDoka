---
title: Alembic: миграции
description: Версионирование схемы базы, autogenerate, upgrade и downgrade.
keywords: Python, Alembic, миграции, upgrade, downgrade, схема

---

# Alembic: миграции

Миграция — версионированное изменение схемы базы. Alembic применяет их
по порядку.

## Инициализация

```bash
alembic init migrations
```

В `alembic/env.py` указывают модель и URL базы.

## Создание миграции

```bash
alembic revision --autogenerate -m "create tasks"
```

Autogenerate сравнивает модели и базу. Результат нужно проверить руками.

## Применение

```bash
alembic upgrade head
```

## Откат

```bash
alembic downgrade -1
```

## Частые ошибки

- **Менять схему вручную.**
- **Не проверять autogenerate.**
- **Не писать downgrade.**
- **Применять миграции после запуска приложения.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `alembic upgrade head`?",
  "options": [
    {
      "text": "Применяет все миграции",
      "correct": true,
      "explanation": "База доходит до последней версии."
    },
    {
      "text": "Удаляет базу",
      "correct": false,
      "explanation": "Это не так."
    },
    {
      "text": "Создаёт модель",
      "correct": false,
      "explanation": "Модели пишут в коде."
    }
  ],
  "explanation": "`head` — последняя миграция."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про миграции?",
  "options": [
    {
      "text": "Хранят историю схемы",
      "correct": true
    },
    {
      "text": "Могут откатываться",
      "correct": true
    },
    {
      "text": "Autogenerate нужно проверять",
      "correct": true
    },
    {
      "text": "Можно менять таблицы руками",
      "correct": false,
      "explanation": "Это ломает воспроизводимость."
    }
  ],
  "explanation": "Миграции делают схему воспроизводимой."
}
```

## Куда дальше

- [N+1 и загрузка](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/n-plus-one-i-zagruzka.md)
- [Базы данных и SQLAlchemy](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/bazy-dannyh-i-sqlalchemy.md)
- [Практика: CRUD на SQLAlchemy](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/praktika-crud-sqlalchemy.md)
