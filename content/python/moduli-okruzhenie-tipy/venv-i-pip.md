---
title: venv и pip
description: Виртуальное окружение, установка зависимостей и requirements.
keywords: Python, venv, pip, зависимости, requirements, окружение

---

# venv и pip

Виртуальное окружение изолирует зависимости проекта от системного Python.

## Создание

```bash
python -m venv .venv
```

Активация:

```bash
# Windows
.venv\Scripts\activate

# Linux и macOS
source .venv/bin/activate
```

## Установка

```bash
pip install fastapi uvicorn
```

## Фиксация

```bash
pip freeze > requirements.txt
pip install -r requirements.txt
```

## Частые ошибки

- **Ставить пакеты глобально.**
- **Коммитить `.venv`.**
- **Не фиксировать версии.**
- **Смешивать окружения разных проектов.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужно venv?",
  "options": [
    {
      "text": "Изолировать зависимости проекта",
      "correct": true,
      "explanation": "Проекты не конфликтуют версиями."
    },
    {
      "text": "Ускорить интернет",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Создать базу",
      "correct": false,
      "explanation": "Это не база."
    }
  ],
  "explanation": "venv изолирует пакеты."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про pip и venv?",
  "options": [
    {
      "text": "`python -m venv .venv` создаёт окружение",
      "correct": true
    },
    {
      "text": "`pip install -r` ставит из файла",
      "correct": true
    },
    {
      "text": "`.venv` не коммитят",
      "correct": true
    },
    {
      "text": "Глобальная установка всегда лучше",
      "correct": false,
      "explanation": "Она создаёт конфликты."
    }
  ],
  "explanation": "Зависимости должны быть изолированы."
}
```

## Куда дальше

- [pyproject и Poetry](theme.html?path=content/python/moduli-okruzhenie-tipy/pyproject-i-poetry.md)
- [Type hints](theme.html?path=content/python/moduli-okruzhenie-tipy/type-hints.md)
- [Logging](theme.html?path=content/python/moduli-okruzhenie-tipy/logging.md)
