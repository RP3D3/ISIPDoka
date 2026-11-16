---
title: Компрехеншены
description: Списковые, словарные и множественные включения без лишних циклов.
keywords: Python, компрехеншены, list comprehension, dict, set, генераторы

---

# Компрехеншены

Компрехеншен — короткая запись для создания коллекции из другой
последовательности.

## Список

```python
numbers = [1, 2, 3, 4]

doubled = [n * 2 for n in numbers]
even = [n for n in numbers if n % 2 == 0]
```

## Словарь

```python
users = ["Аня", "Борис"]

by_length = {name: len(name) for name in users}
```

## Множество

```python
tags = ["python", "api", "python"]

unique = {tag for tag in tags}
```

## Генератор

```python
squares = (n * n for n in numbers)
```

Генератор не хранит все элементы сразу.

## Частые ошибки

- **Писать слишком сложное выражение.**
- **Делать побочные эффекты внутри.**
- **Путать список и генератор.**
- **Строить огромный список без нужды.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что создаёт `[n * 2 for n in numbers]`?",
  "options": [
    {
      "text": "Новый список",
      "correct": true,
      "explanation": "Это список с преобразованием."
    },
    {
      "text": "Словарь",
      "correct": false,
      "explanation": "Для словаря нужны пары."
    },
    {
      "text": "Файл",
      "correct": false,
      "explanation": "Это не файл."
    }
  ],
  "explanation": "Квадратные скобки дают список."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про компрехеншены?",
  "options": [
    {
      "text": "Могут фильтровать через `if`",
      "correct": true
    },
    {
      "text": "Бывают для dict и set",
      "correct": true
    },
    {
      "text": "Генератор ленивый",
      "correct": true
    },
    {
      "text": "Подходят для любых сложных алгоритмов",
      "correct": false,
      "explanation": "Сложное лучше вынести в функцию."
    }
  ],
  "explanation": "Компрехеншены хороши для простых преобразований."
}
```

## Куда дальше

- [Итераторы и генераторы](theme.html?path=content/python/kollekcii-funkcii-oop/iteratory-i-generatory.md)
- [Функции высшего порядка](theme.html?path=content/python/kollekcii-funkcii-oop/funkcii-vysshego-poryadka.md)
- [Классы и объекты](theme.html?path=content/python/kollekcii-funkcii-oop/klassy-i-obekty.md)
