---
title: asyncio и задачи
description: create_task, gather, таймауты, отмена и TaskGroup.
keywords: Python, asyncio, create_task, gather, timeout, TaskGroup, отмена

---

# asyncio и задачи

Задача — корутина, запланированная в event loop.

## Запуск

```python
import asyncio


async def worker(name: str) -> None:
    await asyncio.sleep(0.1)
    print(name)


async def main() -> None:
    task = asyncio.create_task(worker("a"))
    await task


asyncio.run(main())
```

## Параллельно

```python
results = await asyncio.gather(
    worker("a"),
    worker("b"),
)
```

## Таймаут

```python
try:
    await asyncio.wait_for(worker("slow"), timeout=2)
except TimeoutError:
    print("Не успели")
```

## TaskGroup

```python
async with asyncio.TaskGroup() as group:
    group.create_task(worker("a"))
    group.create_task(worker("b"))
```

## Частые ошибки

- **Создать задачу и не дождаться её.**
- **Не обрабатывать исключения задач.**
- **Блокировать loop.**
- **Не ставить таймаут на внешний вызов.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `gather`?",
  "options": [
    {
      "text": "Ждёт несколько корутин",
      "correct": true,
      "explanation": "Они выполняются конкурентно."
    },
    {
      "text": "Создаёт поток",
      "correct": false,
      "explanation": "Это не поток."
    },
    {
      "text": "Удаляет задачи",
      "correct": false,
      "explanation": "Это не удаление."
    }
  ],
  "explanation": "`gather` собирает результаты."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для задач?",
  "options": [
    {
      "text": "Дожидаться выполнения",
      "correct": true
    },
    {
      "text": "Обрабатывать исключения",
      "correct": true
    },
    {
      "text": "Ставить таймауты",
      "correct": true
    },
    {
      "text": "Игнорировать отмену",
      "correct": false,
      "explanation": "Отмена — часть работы."
    }
  ],
  "explanation": "Задачами нужно управлять."
}
```

## Куда дальше

- [Фоновые задачи](theme.html?path=content/python/async-testy-deploy/background-tasks.md)
- [Очереди и воркеры](theme.html?path=content/python/async-testy-deploy/ocheredi-i-workers.md)
- [pytest](theme.html?path=content/python/async-testy-deploy/pytest.md)
