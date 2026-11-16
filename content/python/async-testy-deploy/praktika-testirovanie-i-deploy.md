---
title: Практика: тесты и деплой
description: Упражнение: pytest, тестовая БД, Docker, миграции и healthcheck.
keywords: практика, pytest, Docker, деплой, healthcheck, миграции

---

# Практика: тесты и деплой

Доведите API до состояния, которое можно запускать.

## 1. Тесты

```python
def test_create_task(client, db) -> None:
    response = client.post("/tasks", json={"title": "Учёба"})

    assert response.status_code == 201
    assert response.json()["title"] == "Учёба"


def test_task_not_found(client) -> None:
    response = client.get("/tasks/999")

    assert response.status_code == 404
```

## 2. Dockerfile

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN pip install uv && uv sync --frozen
COPY app ./app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 3. Healthcheck

```python
@app.get("/health/ready")
def ready(db: Session = Depends(get_db)) -> dict[str, str]:
    db.execute(text("SELECT 1"))
    return {"status": "ok"}
```

## 4. Проверка

- [ ] Тесты проходят локально.
- [ ] Тестовая БД отдельная.
- [ ] Миграции применяются до старта.
- [ ] Образ собирается.
- [ ] `/health/live` и `/health/ready` отвечают.
- [ ] Секреты приходят из env.
- [ ] Логи содержат request id.

## Частые ошибки

- **Тестировать на прод-базе.**
- **Забыть миграции.**
- **Запускать dev-сервер.**
- **Не проверять healthcheck.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать перед запуском новой версии?",
  "options": [
    {
      "text": "Применить миграции",
      "correct": true,
      "explanation": "Схема должна соответствовать коду."
    },
    {
      "text": "Удалить базу",
      "correct": false,
      "explanation": "Это потеря данных."
    },
    {
      "text": "Отключить healthcheck",
      "correct": false,
      "explanation": "Это скроет проблемы."
    }
  ],
  "explanation": "Миграции — часть деплоя."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "pytest и тестовая БД",
      "correct": true
    },
    {
      "text": "Docker и uvicorn",
      "correct": true
    },
    {
      "text": "Миграции и healthcheck",
      "correct": true
    },
    {
      "text": "Секреты в образе",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Практика готовит API к запуску."
}
```

## Куда дальше

- [Асинхронность, тесты и деплой](theme.html?path=content/python/async-testy-deploy/async-testy-deploy.md)
- [Практика: Python-бэкенд](theme.html?path=content/python/praktika-python-backend/trebovaniya-i-scenarii.md)
- [FastAPI и контракт API](theme.html?path=content/python/fastapi-i-kontrakt-api/fastapi-i-kontrakt-api.md)
