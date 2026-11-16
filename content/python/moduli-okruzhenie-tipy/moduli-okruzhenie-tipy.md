---
title: Модули, окружение и типы
description: Итог группы: импорты, venv, pyproject, type hints, логи и конфиг.
keywords: модули, окружение, типы, итог, venv, pyproject, logging

---

# Модули, окружение и типы

Главная идея группы: проект должен запускаться одинаково у всех и не
хранить секреты в коде.

## Что запомнить

- модуль — файл `.py`, пакет — папка;
- импорты должны быть явными;
- зависимости живут в venv;
- версии фиксируются lock-файлом;
- type hints помогают до запуска;
- логи имеют уровни и контекст;
- секреты приходят из окружения.

## Чек-лист

- [ ] Есть `.venv`.
- [ ] Есть `pyproject.toml`.
- [ ] Lock-файл в репозитории.
- [ ] `.env` в `.gitignore`.
- [ ] Настроен logging.
- [ ] Есть type hints на границах.

## Частые ошибки

- **Глобальные пакеты.**
- **Секреты в коде.**
- **`import *`.**
- **`print` вместо логов.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в структуре проекта?",
  "options": [
    {
      "text": "Воспроизводимость и безопасность",
      "correct": true,
      "explanation": "Проект должен запускаться одинаково."
    },
    {
      "text": "Как можно больше файлов",
      "correct": false,
      "explanation": "Структура важнее количества."
    },
    {
      "text": "Секреты в репозитории",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Проект должен быть предсказуемым."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "Модули и venv",
      "correct": true
    },
    {
      "text": "pyproject и типы",
      "correct": true
    },
    {
      "text": "Логи и конфиг",
      "correct": true
    },
    {
      "text": "Только SQL",
      "correct": false,
      "explanation": "SQL — отдельная группа."
    }
  ],
  "explanation": "Группа покрывает инфраструктуру проекта."
}
```

## Куда дальше

- [Практика: структура проекта](theme.html?path=content/python/moduli-okruzhenie-tipy/praktika-struktura-proekta.md)
- [Базы данных и SQLAlchemy](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/sql-dlya-python.md)
- [FastAPI и контракт API](theme.html?path=content/python/fastapi-i-kontrakt-api/zachem-fastapi.md)
