---
title: pyproject и Poetry
description: pyproject.toml, зависимости, lock-файл, скрипты и uv/Poetry.
keywords: Python, pyproject, Poetry, uv, lock, зависимости, проект

---

# pyproject и Poetry

`pyproject.toml` — современный файл конфигурации проекта. Poetry и uv
управляют зависимостями и lock-файлом.

## pyproject

```toml
[project]
name = "tasks-api"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
  "fastapi>=0.115",
  "uvicorn[standard]>=0.30",
]
```

## Poetry

```bash
poetry init
poetry add fastapi
poetry install
```

## uv

```bash
uv init
uv add fastapi
uv sync
```

## Lock-файл

Lock фиксирует точные версии. Его коммитят, чтобы окружения совпадали.

## Частые ошибки

- **Держать зависимости в двух местах.**
- **Не коммитить lock-файл.**
- **Ставить dev-зависимости в прод.**
- **Игнорировать версию Python.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен lock-файл?",
  "options": [
    {
      "text": "Фиксировать точные версии",
      "correct": true,
      "explanation": "Окружения воспроизводятся."
    },
    {
      "text": "Шифровать код",
      "correct": false,
      "explanation": "Это не шифрование."
    },
    {
      "text": "Заменять базу",
      "correct": false,
      "explanation": "Это не база."
    }
  ],
  "explanation": "Lock делает установку предсказуемой."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про pyproject?",
  "options": [
    {
      "text": "Описывает зависимости",
      "correct": true
    },
    {
      "text": "Может задавать версию Python",
      "correct": true
    },
    {
      "text": "Может содержать настройки инструментов",
      "correct": true
    },
    {
      "text": "Заменяет виртуальное окружение",
      "correct": false,
      "explanation": "Окружение всё равно нужно."
    }
  ],
  "explanation": "pyproject — центр конфигурации проекта."
}
```

## Куда дальше

- [Type hints](theme.html?path=content/python/moduli-okruzhenie-tipy/type-hints.md)
- [Logging](theme.html?path=content/python/moduli-okruzhenie-tipy/logging.md)
- [Конфигурация и секреты](theme.html?path=content/python/moduli-okruzhenie-tipy/config-i-secrets.md)
