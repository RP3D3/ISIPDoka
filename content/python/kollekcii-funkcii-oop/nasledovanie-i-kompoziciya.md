---
title: Наследование и композиция
description: super, MRO, когда наследовать и когда собирать объект из частей.
keywords: Python, наследование, композиция, super, MRO, ООП

---

# Наследование и композиция

Наследование выражает отношение «является». Композиция — «содержит».

## Наследование

```python
class Animal:
    def speak(self) -> str:
        return "..."


class Dog(Animal):
    def speak(self) -> str:
        return "Гав"
```

## super

```python
class Admin(User):
    def __init__(self, name: str, level: int) -> None:
        super().__init__(name)
        self.level = level
```

## Композиция

```python
class Logger:
    def log(self, message: str) -> None:
        print(message)


class Service:
    def __init__(self, logger: Logger) -> None:
        self.logger = logger
```

## Когда что

- наследование — общий контракт и поведение;
- композиция — независимые части;
- глубокое наследование усложняет код.

## Частые ошибки

- **Наследовать ради переиспользования.**
- **Забывать `super().__init__`.**
- **Делать глубокую иерархию.**
- **Игнорировать композицию.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что выражает композиция?",
  "options": [
    {
      "text": "Отношение «содержит»",
      "correct": true,
      "explanation": "Объект собирается из частей."
    },
    {
      "text": "Отношение «является»",
      "correct": false,
      "explanation": "Это наследование."
    },
    {
      "text": "Только SQL-связь",
      "correct": false,
      "explanation": "Это не про ООП."
    }
  ],
  "explanation": "Композиция собирает объект из зависимостей."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про ООП?",
  "options": [
    {
      "text": "Наследование использует `super`",
      "correct": true
    },
    {
      "text": "Композиция часто проще",
      "correct": true
    },
    {
      "text": "Глубокая иерархия усложняет код",
      "correct": true
    },
    {
      "text": "Наследование всегда лучше",
      "correct": false,
      "explanation": "Зависит от задачи."
    }
  ],
  "explanation": "Выбор зависит от отношения между объектами."
}
```

## Куда дальше

- [Dataclasses](theme.html?path=content/python/kollekcii-funkcii-oop/dataclasses.md)
- [Абстрактные классы и протоколы](theme.html?path=content/python/kollekcii-funkcii-oop/abstraktnye-klassy-i-protokoly.md)
- [Коллекции, функции и ООП](theme.html?path=content/python/kollekcii-funkcii-oop/kollekcii-funkcii-oop.md)
