---
title: Очереди и воркеры
description: Celery, RQ, ARQ, брокеры, повторы и идемпотентность.
keywords: Python, очередь, Celery, RQ, ARQ, Redis, воркеры, retry

---

# Очереди и воркеры

Очередь отделяет приём запроса от тяжёлой работы. Воркер забирает задачи
и выполняет их отдельно.

## Схема

```text
API → брокер → воркер → результат
```

## Инструменты

- Celery — зрелый, много возможностей;
- RQ — простой, на Redis;
- ARQ — async, на Redis;
- Dramatiq — лёгкий и понятный.

## Задача

```python
@worker.task
def send_report(user_id: int) -> None:
    ...
```

## Надёжность

- повтор при временной ошибке;
- идемпотентность;
- dead-letter queue;
- мониторинг;
- таймауты.

## Частые ошибки

- **Нет повторов.**
- **Задача неидемпотентна.**
- **Передавать в очередь огромный объект.**
- **Не следить за очередью.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужна очередь?",
  "options": [
    {
      "text": "Отделить тяжёлую работу от запроса",
      "correct": true,
      "explanation": "Клиент не ждёт обработку."
    },
    {
      "text": "Ускорить CSS",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Заменить базу",
      "correct": false,
      "explanation": "Это не база."
    }
  ],
  "explanation": "Очередь разгружает API."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для очередей?",
  "options": [
    {
      "text": "Повторы",
      "correct": true
    },
    {
      "text": "Идемпотентность",
      "correct": true
    },
    {
      "text": "Мониторинг",
      "correct": true
    },
    {
      "text": "Хранить пароли в задаче",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Задачи должны быть надёжными."
}
```

## Куда дальше

- [pytest](theme.html?path=content/python/async-testy-deploy/pytest.md)
- [Тестовая база и фикстуры](theme.html?path=content/python/async-testy-deploy/testovaya-baza-i-fixtures.md)
- [Моки и async-тесты](theme.html?path=content/python/async-testy-deploy/moki-i-async-testy.md)
