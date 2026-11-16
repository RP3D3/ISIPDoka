---
title: Конфигурация и секреты
description: Переменные окружения, pydantic-settings, .env и разные среды.
keywords: Python, конфигурация, секреты, env, pydantic-settings, .env

---

# Конфигурация и секреты

Настройки должны приходить из окружения. Секреты не должны попадать в
репозиторий.

## Переменные окружения

```python
import os

database_url = os.environ["DATABASE_URL"]
debug = os.getenv("DEBUG", "false") == "true"
```

## pydantic-settings

```python
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    secret_key: str
    debug: bool = False


settings = Settings()
```

## .env

```text
DATABASE_URL=postgresql+psycopg://app:secret@localhost/app
SECRET_KEY=change-me
DEBUG=false
```

`.env` добавляют в `.gitignore`.

## Среды

- local;
- test;
- staging;
- production.

У каждой среды свои значения.

## Частые ошибки

- **Коммитить `.env`.**
- **Хардкодить пароли.**
- **Использовать прод-секреты локально.**
- **Логировать конфигурацию целиком.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где хранить секреты?",
  "options": [
    {
      "text": "В переменных окружения",
      "correct": true,
      "explanation": "Они не попадают в код."
    },
    {
      "text": "В репозитории",
      "correct": false,
      "explanation": "Это утечка."
    },
    {
      "text": "В HTML",
      "correct": false,
      "explanation": "Это видно клиенту."
    }
  ],
  "explanation": "Секреты живут вне кода."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для конфигурации?",
  "options": [
    {
      "text": "`.env` в `.gitignore`",
      "correct": true
    },
    {
      "text": "Разные среды",
      "correct": true
    },
    {
      "text": "Валидация настроек",
      "correct": true
    },
    {
      "text": "Секреты в логах",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Конфигурация должна быть явной и безопасной."
}
```

## Куда дальше

- [Модули, окружение и типы](theme.html?path=content/python/moduli-okruzhenie-tipy/moduli-okruzhenie-tipy.md)
- [Практика: структура проекта](theme.html?path=content/python/moduli-okruzhenie-tipy/praktika-struktura-proekta.md)
- [Базы данных и SQLAlchemy](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/sql-dlya-python.md)
