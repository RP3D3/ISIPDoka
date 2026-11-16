---
title: async/await
description: Корутины, event loop, await и неблокирующий ввод-вывод.
keywords: Python, async, await, корутины, event loop, asyncio

---

# async/await

`async def` создаёт корутину. `await` ждёт её, не блокируя event loop.

## Пример

```python
import asyncio


async def fetch_user(user_id: int) -> dict[str, int]:
    await asyncio.sleep(0.1)
    return {"id": user_id}


async def main() -> None:
    user = await fetch_user(1)
    print(user)


asyncio.run(main())
```

## Когда помогает

- сетевые запросы;
- база данных с async-драйвером;
- файлы и очереди;
- много одновременных ожиданий.

## Когда не помогает

- тяжёлые вычисления;
- блокирующие библиотеки;
- код без `await`.

## Частые ошибки

- **Забыть `await`.**
- **Вызывать `time.sleep` в async.**
- **Ждать ускорения CPU-кода.**
- **Делать всё async без необходимости.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `await`?",
  "options": [
    {
      "text": "Ждёт корутину, отдавая управление loop",
      "correct": true,
      "explanation": "Другие задачи могут выполняться."
    },
    {
      "text": "Создаёт поток",
      "correct": false,
      "explanation": "Это не поток."
    },
    {
      "text": "Блокирует весь сервер",
      "correct": false,
      "explanation": "Наоборот."
    }
  ],
  "explanation": "`await` — точка переключения."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Где полезен async?",
  "options": [
    {
      "text": "Сетевые запросы",
      "correct": true
    },
    {
      "text": "Ожидание базы",
      "correct": true
    },
    {
      "text": "Много I/O одновременно",
      "correct": true
    },
    {
      "text": "Тяжёлые вычисления",
      "correct": false,
      "explanation": "Для CPU нужны процессы."
    }
  ],
  "explanation": "Async создан для ожидания I/O."
}
```

## Куда дальше

- [asyncio и задачи](theme.html?path=content/python/async-testy-deploy/asyncio-i-zadachi.md)
- [Фоновые задачи](theme.html?path=content/python/async-testy-deploy/background-tasks.md)
- [Очереди и воркеры](theme.html?path=content/python/async-testy-deploy/ocheredi-i-workers.md)
