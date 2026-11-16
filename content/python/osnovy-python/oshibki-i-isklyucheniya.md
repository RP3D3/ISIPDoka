---
title: Ошибки и исключения
description: try, except, else, finally, raise и логирование ошибок.
keywords: Python, ошибки, исключения, try, except, raise, logging

---

# Ошибки и исключения

Исключение — способ сообщить об ошибке. Его можно поймать и обработать.

## try/except

```python
try:
    number = int("не число")
except ValueError:
    print("Это не число")
```

## else и finally

```python
try:
    file = open("data.txt", encoding="utf-8")
except FileNotFoundError:
    print("Файла нет")
else:
    print("Файл открыт")
    file.close()
finally:
    print("Проверка завершена")
```

## raise

```python
def divide(a: int, b: int) -> float:
    if b == 0:
        raise ValueError("Деление на ноль")
    return a / b
```

## Своё исключение

```python
class ValidationError(Exception):
    pass
```

## Логирование

```python
import logging

logging.basicConfig(level=logging.INFO)
logging.exception("Ошибка обработки")
```

## Частые ошибки

- **Ловить всё через `except Exception`.** Скрывает баги.
- **Молча проглатывать ошибку.**
- **Использовать исключения для обычного ветвления.**
- **Не писать ошибку в лог.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `raise`?",
  "options": [
    {
      "text": "Вызывает исключение",
      "correct": true,
      "explanation": "Оно прерывает обычный поток."
    },
    {
      "text": "Печатает текст",
      "correct": false,
      "explanation": "Для печати есть print."
    },
    {
      "text": "Создаёт файл",
      "correct": false,
      "explanation": "Это не так."
    }
  ],
  "explanation": "`raise` сообщает об ошибке."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно при обработке ошибок?",
  "options": [
    {
      "text": "Ловить конкретное исключение",
      "correct": true
    },
    {
      "text": "Писать ошибку в лог",
      "correct": true
    },
    {
      "text": "Не скрывать проблему",
      "correct": true
    },
    {
      "text": "Ловить всё без разбора",
      "correct": false,
      "explanation": "Это скрывает баги."
    }
  ],
  "explanation": "Ошибки должны быть понятными."
}
```

## Куда дальше

- [Основы Python](theme.html?path=content/python/osnovy-python/osnovy-python.md)
- [Практика: первый скрипт](theme.html?path=content/python/osnovy-python/praktika-pervyy-skript.md)
- [Коллекции, функции и ООП](theme.html?path=content/python/kollekcii-funkcii-oop/komprehensii.md)
