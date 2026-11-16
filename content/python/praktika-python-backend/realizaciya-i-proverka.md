---
title: Реализация и проверка
description: Слои, миграции, auth, тесты, curl и логи.
keywords: практика, реализация, FastAPI, SQLAlchemy, тесты, curl, проверка

---

# Реализация и проверка

Код собирается слоями: роутер, схема, сервис, модель, база.

## Структура

```text
app/
  main.py
  routers/
    tasks.py
  schemas/
    tasks.py
  services/
    tasks.py
  models/
    task.py
  db.py
```

## Миграции

```bash
alembic revision --autogenerate -m "create tasks"
alembic upgrade head
```

## Проверка

```bash
curl -X POST http://localhost:8000/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Учёба\"}"
```

## Тесты

- создание;
- валидация;
- `404`;
- доступ к чужой задаче;
- авторизация.

## Частые ошибки

- **Нет миграций.**
- **Секреты в коде.**
- **Бизнес-логика в роутере.**
- **Нет тестов ошибок.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где должна быть бизнес-логика?",
  "options": [
    {
      "text": "В сервисе",
      "correct": true,
      "explanation": "Роутер отвечает за HTTP."
    },
    {
      "text": "В HTML",
      "correct": false,
      "explanation": "Это не бэкенд."
    },
    {
      "text": "В CSS",
      "correct": false,
      "explanation": "Это стили."
    }
  ],
  "explanation": "Сервис отделяет логику от HTTP."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что проверяем перед сдачей?",
  "options": [
    {
      "text": "Миграции",
      "correct": true
    },
    {
      "text": "Тесты",
      "correct": true
    },
    {
      "text": "Ошибки и доступ",
      "correct": true
    },
    {
      "text": "Секреты в репозитории",
      "correct": false,
      "explanation": "Это не должно проходить проверку."
    }
  ],
  "explanation": "Проверка покрывает код и эксплуатацию."
}
```

## Куда дальше

- [Практика: Python-бэкенд](theme.html?path=content/python/praktika-python-backend/praktika-python-backend.md)
- [Практика по задаче](theme.html?path=content/python/praktika-python-backend/praktika-python-backend-po-zadache.md)
- [Требования и сценарии](theme.html?path=content/python/praktika-python-backend/trebovaniya-i-scenarii.md)
