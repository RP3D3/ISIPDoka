---
title: Функции высшего порядка
description: map, filter, lambda, sorted и декораторы.
keywords: Python, функции высшего порядка, map, filter, lambda, decorator

---

# Функции высшего порядка

Функция высшего порядка принимает другую функцию или возвращает её.

## map и filter

```python
numbers = [1, 2, 3, 4]

doubled = list(map(lambda n: n * 2, numbers))
even = list(filter(lambda n: n % 2 == 0, numbers))
```

Часто понятнее компрехеншен:

```python
doubled = [n * 2 for n in numbers]
```

## sorted с ключом

```python
users = [{"name": "Аня", "age": 20}, {"name": "Борис", "age": 18}]

by_age = sorted(users, key=lambda user: user["age"])
```

## Декоратор

```python
from functools import wraps


def log_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Вызов {func.__name__}")
        return func(*args, **kwargs)

    return wrapper
```

## Частые ошибки

- **Писать сложную lambda.**
- **Использовать `map` там, где лучше компрехеншен.**
- **Забывать `@wraps`.**
- **Делать побочные эффекты в ключе сортировки.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `sorted(users, key=...)`?",
  "options": [
    {
      "text": "Сортирует по ключу",
      "correct": true,
      "explanation": "Ключ задаёт правило сортировки."
    },
    {
      "text": "Удаляет пользователей",
      "correct": false,
      "explanation": "Это не удаление."
    },
    {
      "text": "Создаёт базу",
      "correct": false,
      "explanation": "Это не так."
    }
  ],
  "explanation": "`key` управляет сортировкой."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про функции высшего порядка?",
  "options": [
    {
      "text": "Принимают функцию",
      "correct": true
    },
    {
      "text": "Могут возвращать функцию",
      "correct": true
    },
    {
      "text": "Декоратор — пример",
      "correct": true
    },
    {
      "text": "Работают только с числами",
      "correct": false,
      "explanation": "С любыми типами."
    }
  ],
  "explanation": "Функции можно передавать как значения."
}
```

## Куда дальше

- [Классы и объекты](theme.html?path=content/python/kollekcii-funkcii-oop/klassy-i-obekty.md)
- [Наследование и композиция](theme.html?path=content/python/kollekcii-funkcii-oop/nasledovanie-i-kompoziciya.md)
- [Dataclasses](theme.html?path=content/python/kollekcii-funkcii-oop/dataclasses.md)
