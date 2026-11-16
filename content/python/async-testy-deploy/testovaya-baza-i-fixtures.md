---
title: Тестовая база и фикстуры
description: Отдельная БД, транзакции, dependency override и очистка.
keywords: Python, pytest, тестовая база, fixtures, rollback, dependency override

---

# Тестовая база и фикстуры

Тесты не должны трогать рабочую базу.

## Отдельная база

```python
engine = create_engine("sqlite:///:memory:")
TestingSession = sessionmaker(bind=engine)
```

Для PostgreSQL можно создать отдельную тестовую базу.

## Фикстура сессии

```python
import pytest


@pytest.fixture
def db():
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSession(bind=connection)

    try:
        yield session
    finally:
        session.close()
        transaction.rollback()
        connection.close()
```

## Dependency override

```python
app.dependency_overrides[get_db] = lambda: db
```

После теста override убирают.

## Частые ошибки

- **Использовать прод-базу.**
- **Оставлять данные между тестами.**
- **Не очищать override.**
- **Делать тесты медленными без нужды.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем отдельная тестовая база?",
  "options": [
    {
      "text": "Чтобы не испортить рабочие данные",
      "correct": true,
      "explanation": "Тесты должны быть безопасными."
    },
    {
      "text": "Чтобы ускорить CSS",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Чтобы заменить pytest",
      "correct": false,
      "explanation": "Это не замена."
    }
  ],
  "explanation": "Тестовая база изолирует проверки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для тестовой БД?",
  "options": [
    {
      "text": "Изоляция",
      "correct": true
    },
    {
      "text": "Очистка после теста",
      "correct": true
    },
    {
      "text": "Dependency override",
      "correct": true
    },
    {
      "text": "Прод-данные",
      "correct": false,
      "explanation": "Это опасно."
    }
  ],
  "explanation": "Тесты должны быть повторяемыми."
}
```

## Куда дальше

- [Моки и async-тесты](theme.html?path=content/python/async-testy-deploy/moki-i-async-testy.md)
- [Docker и uvicorn](theme.html?path=content/python/async-testy-deploy/docker-i-uvicorn.md)
- [Логи и healthcheck](theme.html?path=content/python/async-testy-deploy/logi-i-healthcheck.md)
