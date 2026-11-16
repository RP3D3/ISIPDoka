---
title: Моки и async-тесты
description: unittest.mock, AsyncMock, monkeypatch, httpx.AsyncClient и pytest-asyncio.
keywords: Python, pytest, mock, AsyncMock, monkeypatch, httpx, async tests

---

# Моки и async-тесты

Моки заменяют внешние зависимости: сеть, оплату, почту.

## Mock

```python
from unittest.mock import patch


def test_send_email() -> None:
    with patch("app.services.email.send") as send:
        send.return_value = True
        assert send("a@example.com") is True
```

## AsyncMock

```python
from unittest.mock import AsyncMock


async def test_fetch_user() -> None:
    fetch = AsyncMock(return_value={"id": 1})
    assert await fetch(1) == {"id": 1}
```

## monkeypatch

```python
def test_config(monkeypatch) -> None:
    monkeypatch.setenv("DEBUG", "true")
```

## HTTPX

```python
from httpx import ASGITransport, AsyncClient


async def test_health() -> None:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/health")
    assert response.status_code == 200
```

## Частые ошибки

- **Мокать всё подряд.**
- **Проверять реализацию вместо поведения.**
- **Забыть `AsyncMock` для async.**
- **Не очищать зависимости после теста.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен мок?",
  "options": [
    {
      "text": "Заменить внешнюю зависимость",
      "correct": true,
      "explanation": "Тест не ходит в реальную сеть."
    },
    {
      "text": "Ускорить CSS",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Создать таблицу",
      "correct": false,
      "explanation": "Это миграция."
    }
  ],
  "explanation": "Моки изолируют тест."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про async-тесты?",
  "options": [
    {
      "text": "Используют `AsyncMock`",
      "correct": true
    },
    {
      "text": "Могут работать через `httpx.AsyncClient`",
      "correct": true
    },
    {
      "text": "Нуждаются в async-раннере",
      "correct": true
    },
    {
      "text": "Мокируют только базу",
      "correct": false,
      "explanation": "Можно мокать сеть и сервисы."
    }
  ],
  "explanation": "Async-тесты проверяют корутины."
}
```

## Куда дальше

- [Docker и uvicorn](theme.html?path=content/python/async-testy-deploy/docker-i-uvicorn.md)
- [Логи и healthcheck](theme.html?path=content/python/async-testy-deploy/logi-i-healthcheck.md)
- [Асинхронность, тесты и деплой](theme.html?path=content/python/async-testy-deploy/async-testy-deploy.md)
