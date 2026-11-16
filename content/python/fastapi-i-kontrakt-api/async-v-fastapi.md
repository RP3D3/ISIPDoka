---
title: Async в FastAPI
description: async def, await, блокирующий ввод-вывод и threadpool.
keywords: Python, FastAPI, async, await, event loop, blocking, threadpool

---

# Async в FastAPI

`async def` позволяет обрабатывать другие запросы, пока текущий ждёт
ввода-вывода.

## Пример

```python
@app.get("/users/{user_id}")
async def get_user(user_id: int) -> dict[str, int]:
    user = await fetch_user(user_id)
    return {"id": user.id}
```

## Блокирующий код

```python
@app.get("/bad")
async def bad() -> dict[str, str]:
    time.sleep(5)  # блокирует event loop
    return {"status": "ok"}
```

Для блокирующих библиотек лучше обычный `def` — FastAPI выполнит его в
threadpool.

## Правила

- `async` — для неблокирующего I/O;
- `def` — для блокирующих операций;
- CPU-задачи — в отдельный процесс или очередь;
- не смешивайте без понимания.

## Частые ошибки

- **Вызывать `time.sleep` в async.**
- **Делать тяжёлые вычисления в event loop.**
- **Забыть `await`.**
- **Оборачивать всё в async без нужды.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `await`?",
  "options": [
    {
      "text": "Ждёт завершения корутины",
      "correct": true,
      "explanation": "При этом event loop может работать дальше."
    },
    {
      "text": "Запускает новый поток",
      "correct": false,
      "explanation": "Это не поток."
    },
    {
      "text": "Создаёт базу",
      "correct": false,
      "explanation": "Это не база."
    }
  ],
  "explanation": "`await` отдаёт управление event loop."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про async в FastAPI?",
  "options": [
    {
      "text": "Подходит для сетевого I/O",
      "correct": true
    },
    {
      "text": "Блокирующий вызов мешает другим запросам",
      "correct": true
    },
    {
      "text": "Обычный `def` тоже поддерживается",
      "correct": true
    },
    {
      "text": "async ускоряет любые вычисления",
      "correct": false,
      "explanation": "CPU-код так не ускорить."
    }
  ],
  "explanation": "Async помогает при ожидании I/O."
}
```

## Куда дальше

- [OpenAPI и документация](theme.html?path=content/python/fastapi-i-kontrakt-api/openapi-i-dokumentaciya.md)
- [FastAPI и контракт API](theme.html?path=content/python/fastapi-i-kontrakt-api/fastapi-i-kontrakt-api.md)
- [Практика: API на FastAPI](theme.html?path=content/python/fastapi-i-kontrakt-api/praktika-api-fastapi.md)
