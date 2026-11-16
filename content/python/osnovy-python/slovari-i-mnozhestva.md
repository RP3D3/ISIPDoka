---
title: Словари и множества
description: dict, set, ключи, значения, методы и операции над множествами.
keywords: Python, словари, множества, dict, set, keys, values

---

# Словари и множества

Словарь хранит пары «ключ — значение». Множество хранит уникальные
элементы.

## Словарь

```python
user = {
    "name": "Аня",
    "age": 20,
}

print(user["name"])
print(user.get("email", "нет"))
```

## Изменение

```python
user["age"] = 21
user["city"] = "Москва"

for key, value in user.items():
    print(key, value)
```

## Множество

```python
tags = {"python", "api", "web"}

tags.add("backend")
tags.discard("web")
```

## Операции

```python
a = {1, 2, 3}
b = {3, 4}

print(a | b)  # объединение
print(a & b)  # пересечение
print(a - b)  # разность
```

## Частые ошибки

- **Обращаться к отсутствующему ключу.** Лучше `get`.
- **Использовать изменяемый ключ.** Ключ должен быть хешируемым.
- **Ждать порядка от множества.** Он не гарантирован.
- **Путать `set` и `dict`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что хранит словарь?",
  "options": [
    {
      "text": "Пары ключ — значение",
      "correct": true,
      "explanation": "Это его основная структура."
    },
    {
      "text": "Только числа",
      "correct": false,
      "explanation": "Значения могут быть разными."
    },
    {
      "text": "Только уникальные элементы",
      "correct": false,
      "explanation": "Это множество."
    }
  ],
  "explanation": "Словарь — ассоциативная структура."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про dict и set?",
  "options": [
    {
      "text": "`dict` хранит ключи и значения",
      "correct": true
    },
    {
      "text": "`set` хранит уникальные элементы",
      "correct": true
    },
    {
      "text": "`get` безопасно читает ключ",
      "correct": true
    },
    {
      "text": "`set` гарантирует порядок",
      "correct": false,
      "explanation": "Порядок не гарантирован."
    }
  ],
  "explanation": "Dict и set решают разные задачи."
}
```

## Куда дальше

- [Функции](theme.html?path=content/python/osnovy-python/funkcii.md)
- [Ошибки и исключения](theme.html?path=content/python/osnovy-python/oshibki-i-isklyucheniya.md)
- [Основы Python](theme.html?path=content/python/osnovy-python/osnovy-python.md)
