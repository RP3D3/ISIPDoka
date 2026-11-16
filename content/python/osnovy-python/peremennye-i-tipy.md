---
title: Переменные и типы
description: int, float, str, bool, None, приведение типов и f-строки.
keywords: Python, переменные, типы, int, float, str, bool, None, f-string

---

# Переменные и типы

Переменная — имя для значения. Тип определяется значением.

## Основные типы

```python
name = "Аня"       # str
age = 20           # int
price = 99.90      # float
active = True      # bool
note = None        # None
```

## Проверка типа

```python
print(type(age))
print(isinstance(age, int))
```

## Приведение

```python
number = int("42")
text = str(42)
price = float("99.90")
```

## f-строки

```python
name = "Аня"
age = 20

print(f"{name}, {age} лет")
```

## Частые ошибки

- **Путать `=` и `==`.** Первое — присваивание.
- **Складывать строку и число.** Сначала приведите тип.
- **Сравнивать с `None` через `==`.** Лучше `is None`.
- **Считать тип неизменным.** В Python он динамический.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое `None`?",
  "options": [
    {
      "text": "Отсутствие значения",
      "correct": true,
      "explanation": "Это отдельный тип."
    },
    {
      "text": "Ноль",
      "correct": false,
      "explanation": "Ноль — это `0`."
    },
    {
      "text": "Пустая строка",
      "correct": false,
      "explanation": "Это `\"\"`."
    }
  ],
  "explanation": "`None` означает отсутствие значения."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про типы Python?",
  "options": [
    {
      "text": "`int` — целое число",
      "correct": true
    },
    {
      "text": "`float` — дробное число",
      "correct": true
    },
    {
      "text": "`bool` — True или False",
      "correct": true
    },
    {
      "text": "`str` — только числа",
      "correct": false,
      "explanation": "`str` — строка."
    }
  ],
  "explanation": "Типы определяют допустимые операции."
}
```

## Куда дальше

- [Условия и циклы](theme.html?path=content/python/osnovy-python/usloviya-i-cikly.md)
- [Списки и кортежи](theme.html?path=content/python/osnovy-python/spiski-i-kortezhi.md)
- [Словари и множества](theme.html?path=content/python/osnovy-python/slovari-i-mnozhestva.md)
