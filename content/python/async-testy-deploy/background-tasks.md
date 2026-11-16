---
title: Фоновые задачи
description: BackgroundTasks, работа после ответа и ограничения.
keywords: Python, FastAPI, BackgroundTasks, фоновые задачи, очередь

---

# Фоновые задачи

`BackgroundTasks` выполняет функцию после отправки ответа.

## Пример

```python
from fastapi import BackgroundTasks


def send_email(email: str) -> None:
    print(f"Письмо для {email}")


@app.post("/register")
def register(email: str, tasks: BackgroundTasks) -> dict[str, str]:
    tasks.add_task(send_email, email)
    return {"status": "created"}
```

## Когда подходит

- короткое письмо;
- запись лога;
- сброс кеша;
- уведомление.

## Когда не подходит

- долгая обработка;
- гарантированная доставка;
- повторные попытки;
- тяжёлые вычисления.

Для этого нужна очередь и отдельный воркер.

## Частые ошибки

- **Запускать долгую задачу в фоне процесса.**
- **Ждать гарантий доставки.**
- **Не логировать ошибки.**
- **Делать задачу неидемпотентной.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Когда выполняется BackgroundTasks?",
  "options": [
    {
      "text": "После ответа клиенту",
      "correct": true,
      "explanation": "Ответ не ждёт задачу."
    },
    {
      "text": "До чтения запроса",
      "correct": false,
      "explanation": "Это не так."
    },
    {
      "text": "В браузере",
      "correct": false,
      "explanation": "Это сервер."
    }
  ],
  "explanation": "Фоновая задача не задерживает ответ."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что подходит для BackgroundTasks?",
  "options": [
    {
      "text": "Короткое письмо",
      "correct": true
    },
    {
      "text": "Запись лога",
      "correct": true
    },
    {
      "text": "Сброс кеша",
      "correct": true
    },
    {
      "text": "Многочасовая обработка",
      "correct": false,
      "explanation": "Для этого нужна очередь."
    }
  ],
  "explanation": "Фон подходит для коротких задач."
}
```

## Куда дальше

- [Очереди и воркеры](theme.html?path=content/python/async-testy-deploy/ocheredi-i-workers.md)
- [pytest](theme.html?path=content/python/async-testy-deploy/pytest.md)
- [Тестовая база и фикстуры](theme.html?path=content/python/async-testy-deploy/testovaya-baza-i-fixtures.md)
