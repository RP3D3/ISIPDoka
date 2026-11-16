---
title: Dataclasses
description: @dataclass, поля, default_factory, frozen и asdict.
keywords: Python, dataclasses, dataclass, fields, frozen, default_factory

---

# Dataclasses

`@dataclass` генерирует `__init__`, `__repr__` и сравнение для класса с
данными.

## Пример

```python
from dataclasses import dataclass


@dataclass
class User:
    name: str
    age: int
```

## Значения по умолчанию

```python
from dataclasses import dataclass, field


@dataclass
class Cart:
    items: list[str] = field(default_factory=list)
```

`default_factory` нужен для изменяемых значений.

## Frozen

```python
@dataclass(frozen=True)
class Point:
    x: int
    y: int
```

Такой объект нельзя изменить после создания.

## Преобразование

```python
from dataclasses import asdict

user = User("Аня", 20)
data = asdict(user)
```

## Частые ошибки

- **Использовать `[]` как значение по умолчанию.**
- **Пихать в dataclass тяжёлую логику.**
- **Менять frozen-объект.**
- **Путать dataclass и ORM-модель.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен `default_factory`?",
  "options": [
    {
      "text": "Для изменяемых значений по умолчанию",
      "correct": true,
      "explanation": "Каждый объект получит свой список."
    },
    {
      "text": "Для сортировки",
      "correct": false,
      "explanation": "Это `order`."
    },
    {
      "text": "Для базы данных",
      "correct": false,
      "explanation": "Это ORM."
    }
  ],
  "explanation": "Изменяемые значения нельзя делать общими."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про dataclasses?",
  "options": [
    {
      "text": "Генерируют `__init__`",
      "correct": true
    },
    {
      "text": "Поддерживают `frozen`",
      "correct": true
    },
    {
      "text": "Могут иметь `default_factory`",
      "correct": true
    },
    {
      "text": "Заменяют любую ORM",
      "correct": false,
      "explanation": "Это разные задачи."
    }
  ],
  "explanation": "Dataclass удобен для моделей данных."
}
```

## Куда дальше

- [Абстрактные классы и протоколы](theme.html?path=content/python/kollekcii-funkcii-oop/abstraktnye-klassy-i-protokoly.md)
- [Коллекции, функции и ООП](theme.html?path=content/python/kollekcii-funkcii-oop/kollekcii-funkcii-oop.md)
- [Практика: ООП](theme.html?path=content/python/kollekcii-funkcii-oop/praktika-oop.md)
