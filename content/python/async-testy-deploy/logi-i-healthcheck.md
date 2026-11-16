---
title: Логи и healthcheck
description: Структурные логи, request id, liveness, readiness и метрики.
keywords: Python, логи, healthcheck, liveness, readiness, metrics, request id

---

# Логи и healthcheck

Логи помогают разбирать инциденты. Healthcheck сообщает, жив ли сервис.

## Логи

```python
import logging

logger = logging.getLogger(__name__)
logger.info(
    "request_done",
    extra={"request_id": request_id, "status": 200},
)
```

Для JSON-логов используют форматтер или библиотеку.

## Liveness

```python
@app.get("/health/live")
def live() -> dict[str, str]:
    return {"status": "ok"}
```

Проверяет, что процесс жив.

## Readiness

```python
@app.get("/health/ready")
def ready(db: Session = Depends(get_db)) -> dict[str, str]:
    db.execute(text("SELECT 1"))
    return {"status": "ok"}
```

Проверяет зависимости. При ошибке — `503`.

## Частые ошибки

- **Возвращать `200`, когда база недоступна.**
- **Делать healthcheck слишком тяжёлым.**
- **Писать токены в лог.**
- **Логировать без request id.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что проверяет readiness?",
  "options": [
    {
      "text": "Готовность зависимостей",
      "correct": true,
      "explanation": "Например, базы данных."
    },
    {
      "text": "Только процесс",
      "correct": false,
      "explanation": "Это liveness."
    },
    {
      "text": "CSS",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "Readiness влияет на трафик."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для логов?",
  "options": [
    {
      "text": "Request id",
      "correct": true
    },
    {
      "text": "Уровни",
      "correct": true
    },
    {
      "text": "Без секретов",
      "correct": true
    },
    {
      "text": "Писать пароли",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Логи должны быть безопасными и полезными."
}
```

## Куда дальше

- [Асинхронность, тесты и деплой](theme.html?path=content/python/async-testy-deploy/async-testy-deploy.md)
- [Практика: тесты и деплой](theme.html?path=content/python/async-testy-deploy/praktika-testirovanie-i-deploy.md)
- [Практика: Python-бэкенд](theme.html?path=content/python/praktika-python-backend/trebovaniya-i-scenarii.md)
