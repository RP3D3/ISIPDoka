---
title: Классы и объекты
description: class, __init__, self, атрибуты, методы и инкапсуляция.
keywords: Python, классы, объекты, __init__, self, методы, property

---

# Классы и объекты

Класс описывает данные и поведение. Объект — экземпляр класса.

## Класс

```python
class User:
    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age

    def greet(self) -> str:
        return f"Привет, {self.name}"


user = User("Аня", 20)
print(user.greet())
```

## Атрибуты и методы

```python
class Counter:
    def __init__(self) -> None:
        self.value = 0

    def increment(self) -> None:
        self.value += 1
```

## property

```python
class Temperature:
    def __init__(self, celsius: float) -> None:
        self._celsius = celsius

    @property
    def celsius(self) -> float:
        return self._celsius
```

## Частые ошибки

- **Забыть `self`.**
- **Использовать изменяемый атрибут класса.**
- **Делать все атрибуты публичными.**
- **Пихать в `__init__` слишком много логики.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое объект?",
  "options": [
    {
      "text": "Экземпляр класса",
      "correct": true,
      "explanation": "Класс — описание, объект — конкретная сущность."
    },
    {
      "text": "Файл с кодом",
      "correct": false,
      "explanation": "Это не объект."
    },
    {
      "text": "Таблица в базе",
      "correct": false,
      "explanation": "Это другой уровень."
    }
  ],
  "explanation": "Объект создаётся по классу."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про классы Python?",
  "options": [
    {
      "text": "Есть `__init__`",
      "correct": true
    },
    {
      "text": "Методы получают `self`",
      "correct": true
    },
    {
      "text": "Можно использовать `property`",
      "correct": true
    },
    {
      "text": "Все атрибуты обязаны быть публичными",
      "correct": false,
      "explanation": "Это плохая практика."
    }
  ],
  "explanation": "Классы помогают структурировать код."
}
```

## Куда дальше

- [Наследование и композиция](theme.html?path=content/python/kollekcii-funkcii-oop/nasledovanie-i-kompoziciya.md)
- [Dataclasses](theme.html?path=content/python/kollekcii-funkcii-oop/dataclasses.md)
- [Абстрактные классы и протоколы](theme.html?path=content/python/kollekcii-funkcii-oop/abstraktnye-klassy-i-protokoly.md)
