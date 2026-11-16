---
title: Type hints
description: Аннотации типов, Optional, Union, Protocol, mypy и runtime.
keywords: Python, type hints, typing, Optional, Union, mypy, аннотации

---

# Type hints

Аннотации типов описывают ожидаемые значения. Они помогают читать код и
находить ошибки.

## Пример

```python
def greet(name: str, age: int) -> str:
    return f"{name}, {age}"
```

## Коллекции

```python
items: list[str] = ["a", "b"]
prices: dict[str, float] = {"книга": 1000.0}
```

## Optional

```python
from typing import Optional


def find_user(user_id: int) -> Optional[dict]:
    ...
```

Современный вариант:

```python
def find_user(user_id: int) -> dict | None:
    ...
```

## Protocol

```python
from typing import Protocol


class Sender(Protocol):
    def send(self, message: str) -> None:
        ...
```

## mypy

```bash
mypy app
```

## Частые ошибки

- **Думать, что типы проверяются в runtime.**
- **Забывать про `None`.**
- **Усложнять типы без нужды.**
- **Не запускать mypy.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делают type hints?",
  "options": [
    {
      "text": "Описывают ожидаемые типы",
      "correct": true,
      "explanation": "Они помогают статическому анализу."
    },
    {
      "text": "Автоматически проверяют в runtime",
      "correct": false,
      "explanation": "Обычно нет."
    },
    {
      "text": "Ускоряют базу",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "Аннотации — документация и проверка."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про типы?",
  "options": [
    {
      "text": "`list[str]` — список строк",
      "correct": true
    },
    {
      "text": "`dict[str, int]` — словарь",
      "correct": true
    },
    {
      "text": "`| None` означает отсутствие значения",
      "correct": true
    },
    {
      "text": "Type hints всегда проверяются Python в runtime",
      "correct": false,
      "explanation": "Нужен mypy или runtime-валидация."
    }
  ],
  "explanation": "Типы помогают до запуска."
}
```

## Куда дальше

- [Logging](theme.html?path=content/python/moduli-okruzhenie-tipy/logging.md)
- [Конфигурация и секреты](theme.html?path=content/python/moduli-okruzhenie-tipy/config-i-secrets.md)
- [Модули, окружение и типы](theme.html?path=content/python/moduli-okruzhenie-tipy/moduli-okruzhenie-tipy.md)
