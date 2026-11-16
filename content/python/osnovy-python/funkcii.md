---
title: Функции
description: def, аргументы, return, область видимости и аннотации типов.
keywords: Python, функции, def, аргументы, return, scope, type hints

---

# Функции

Функция — именованный блок кода. Она принимает аргументы и возвращает
результат.

## Объявление

```python
def greet(name: str) -> str:
    return f"Привет, {name}"


print(greet("Аня"))
```

## Аргументы

```python
def paginate(page: int = 1, limit: int = 20) -> dict:
    return {"page": page, "limit": limit}
```

## Произвольные аргументы

```python
def total(*numbers: int) -> int:
    return sum(numbers)


def show(**data: object) -> None:
    for key, value in data.items():
        print(key, value)
```

## Область видимости

```python
def outer() -> None:
    value = 10

    def inner() -> int:
        return value + 1

    print(inner())
```

## Частые ошибки

- **Изменяемый аргумент по умолчанию.** Используйте `None`.
- **Забыть `return`.** Функция вернёт `None`.
- **Менять глобальные переменные.**
- **Делать функцию с десятью аргументами.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `return`?",
  "options": [
    {
      "text": "Возвращает результат",
      "correct": true,
      "explanation": "Код после return не выполняется."
    },
    {
      "text": "Печатает текст",
      "correct": false,
      "explanation": "Для печати есть print."
    },
    {
      "text": "Создаёт список",
      "correct": false,
      "explanation": "Это не так."
    }
  ],
  "explanation": "`return` завершает функцию."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про функции?",
  "options": [
    {
      "text": "Можно указать типы",
      "correct": true
    },
    {
      "text": "Можно задать значение по умолчанию",
      "correct": true
    },
    {
      "text": "Функция может вернуть значение",
      "correct": true
    },
    {
      "text": "Функция обязана печатать текст",
      "correct": false,
      "explanation": "Она может только возвращать."
    }
  ],
  "explanation": "Функции делают код повторно используемым."
}
```

## Куда дальше

- [Ошибки и исключения](theme.html?path=content/python/osnovy-python/oshibki-i-isklyucheniya.md)
- [Основы Python](theme.html?path=content/python/osnovy-python/osnovy-python.md)
- [Практика: первый скрипт](theme.html?path=content/python/osnovy-python/praktika-pervyy-skript.md)
