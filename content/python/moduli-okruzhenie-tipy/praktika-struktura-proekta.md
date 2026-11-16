---
title: Практика: структура проекта
description: Упражнение: собрать каркас Python-проекта с venv, типами и логами.
keywords: практика, структура проекта, Python, venv, pyproject, logging

---

# Практика: структура проекта

Соберите каркас бэкенд-проекта.

## 1. Структура

```text
tasks-api/
  app/
    __init__.py
    main.py
    config.py
    services/
      __init__.py
      tasks.py
  tests/
  pyproject.toml
  .env.example
  .gitignore
```

## 2. Окружение

```bash
python -m venv .venv
.venv\Scripts\activate
pip install fastapi uvicorn
```

## 3. Конфиг

```python
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "tasks-api"
    debug: bool = False


settings = Settings()
```

## 4. Логи

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

## 5. Проверка

- [ ] Есть `.venv`.
- [ ] Есть `pyproject.toml`.
- [ ] `.env` не в Git.
- [ ] Есть `__init__.py`.
- [ ] Логи настроены.

## Частые ошибки

- **Коммитить `.venv`.**
- **Хранить секреты в `config.py`.**
- **Импортировать всё подряд.**
- **Использовать `print`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где хранить настройки?",
  "options": [
    {
      "text": "В окружении",
      "correct": true,
      "explanation": "Так их можно менять без кода."
    },
    {
      "text": "В HTML",
      "correct": false,
      "explanation": "Это видно клиенту."
    },
    {
      "text": "В имени файла",
      "correct": false,
      "explanation": "Это не настройки."
    }
  ],
  "explanation": "Конфиг приходит из окружения."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "venv",
      "correct": true
    },
    {
      "text": "pyproject",
      "correct": true
    },
    {
      "text": "Конфиг и логи",
      "correct": true
    },
    {
      "text": "Секреты в Git",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Практика собирает каркас проекта."
}
```

## Куда дальше

- [Модули, окружение и типы](theme.html?path=content/python/moduli-okruzhenie-tipy/moduli-okruzhenie-tipy.md)
- [Базы данных и SQLAlchemy](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/sql-dlya-python.md)
- [FastAPI и контракт API](theme.html?path=content/python/fastapi-i-kontrakt-api/zachem-fastapi.md)
