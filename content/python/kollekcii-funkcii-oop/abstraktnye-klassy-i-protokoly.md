---
title: Абстрактные классы и протоколы
description: ABC, abstractmethod, Protocol и утиная типизация.
keywords: Python, ABC, abstractmethod, Protocol, duck typing, интерфейс

---

# Абстрактные классы и протоколы

Абстрактный класс задаёт обязательные методы. Протокол описывает
интерфейс без наследования.

## ABC

```python
from abc import ABC, abstractmethod


class Notifier(ABC):
    @abstractmethod
    def send(self, message: str) -> None:
        ...
```

Нельзя создать `Notifier` напрямую.

## Реализация

```python
class EmailNotifier(Notifier):
    def send(self, message: str) -> None:
        print(f"Email: {message}")
```

## Protocol

```python
from typing import Protocol


class Sender(Protocol):
    def send(self, message: str) -> None:
        ...
```

Классу не нужно наследоваться: достаточно иметь метод `send`.

## Когда что

- ABC — общая база и обязательные методы;
- Protocol — структурный контракт;
- утиная типизация — «если ведёт себя как утка, это утка».

## Частые ошибки

- **Создавать абстрактный класс напрямую.**
- **Забыть реализовать метод.**
- **Использовать Protocol без методов.**
- **Наследовать ради наследования.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что задаёт Protocol?",
  "options": [
    {
      "text": "Структурный интерфейс",
      "correct": true,
      "explanation": "Достаточно наличия методов."
    },
    {
      "text": "Таблицу базы",
      "correct": false,
      "explanation": "Это ORM."
    },
    {
      "text": "HTML-шаблон",
      "correct": false,
      "explanation": "Это не протокол."
    }
  ],
  "explanation": "Protocol описывает поведение."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про ABC и Protocol?",
  "options": [
    {
      "text": "ABC может иметь `abstractmethod`",
      "correct": true
    },
    {
      "text": "Protocol не требует наследования",
      "correct": true
    },
    {
      "text": "Оба задают контракт",
      "correct": true
    },
    {
      "text": "ABC можно создать напрямую",
      "correct": false,
      "explanation": "Нельзя, если есть абстрактные методы."
    }
  ],
  "explanation": "Контракты помогают заменять реализации."
}
```

## Куда дальше

- [Коллекции, функции и ООП](theme.html?path=content/python/kollekcii-funkcii-oop/kollekcii-funkcii-oop.md)
- [Практика: ООП](theme.html?path=content/python/kollekcii-funkcii-oop/praktika-oop.md)
- [Модули, окружение и типы](theme.html?path=content/python/moduli-okruzhenie-tipy/moduli-i-pakety.md)
