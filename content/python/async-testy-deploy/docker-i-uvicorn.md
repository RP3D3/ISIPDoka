---
title: Docker и uvicorn
description: Dockerfile, запуск uvicorn, воркеры, healthcheck и секреты.
keywords: Python, Docker, uvicorn, Dockerfile, healthcheck, деплой

---

# Docker и uvicorn

Docker упаковывает приложение и зависимости в образ. uvicorn запускает
ASGI-приложение.

## Dockerfile

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN pip install uv && uv sync --frozen

COPY app ./app

RUN useradd -m appuser
USER appuser

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Воркеры

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

`--reload` — только для разработки.

## Compose

```yaml
services:
  api:
    build: .
    ports:
      - "8000:8000"
    env_file:
      - .env
```

## Частые ошибки

- **Запускать `--reload` в проде.**
- **Класть секреты в образ.**
- **Работать от root.**
- **Не задавать healthcheck.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что запускает приложение в контейнере?",
  "options": [
    {
      "text": "uvicorn",
      "correct": true,
      "explanation": "Это ASGI-сервер."
    },
    {
      "text": "pytest",
      "correct": false,
      "explanation": "Это тесты."
    },
    {
      "text": "Alembic",
      "correct": false,
      "explanation": "Это миграции."
    }
  ],
  "explanation": "uvicorn обслуживает HTTP."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для Docker?",
  "options": [
    {
      "text": "Не запускать `--reload` в проде",
      "correct": true
    },
    {
      "text": "Не класть секреты в образ",
      "correct": true
    },
    {
      "text": "Работать не от root",
      "correct": true
    },
    {
      "text": "Использовать тег `latest` всегда",
      "correct": false,
      "explanation": "Лучше фиксировать версию."
    }
  ],
  "explanation": "Образ должен быть воспроизводимым."
}
```

## Куда дальше

- [Логи и healthcheck](theme.html?path=content/python/async-testy-deploy/logi-i-healthcheck.md)
- [Асинхронность, тесты и деплой](theme.html?path=content/python/async-testy-deploy/async-testy-deploy.md)
- [Практика: тесты и деплой](theme.html?path=content/python/async-testy-deploy/praktika-testirovanie-i-deploy.md)
