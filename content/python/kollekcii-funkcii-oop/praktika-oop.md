---
title: Практика: ООП
description: Упражнение: dataclass, протокол и сервис для задач.
keywords: практика, ООП, Python, dataclass, Protocol, сервис

---

# Практика: ООП

Сделайте небольшую модель задач и сервис.

## 1. Модель

```python
from dataclasses import dataclass


@dataclass
class Task:
    title: str
    done: bool = False
```

## 2. Протокол

```python
from typing import Protocol


class TaskStorage(Protocol):
    def save(self, task: Task) -> None:
        ...
```

## 3. Сервис

```python
class TaskService:
    def __init__(self, storage: TaskStorage) -> None:
        self.storage = storage

    def create(self, title: str) -> Task:
        if not title.strip():
            raise ValueError("Title обязателен")

        task = Task(title=title)
        self.storage.save(task)
        return task
```

## 4. Проверка

- [ ] `Task` — dataclass.
- [ ] `TaskStorage` — протокол.
- [ ] `TaskService` не знает про базу.
- [ ] Пустой title даёт ошибку.
- [ ] Зависимость передаётся снаружи.

## Частые ошибки

- **Создавать базу внутри сервиса.**
- **Использовать `[]` как default.**
- **Наследовать сервис от хранилища.**
- **Забыть проверку title.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем сервису протокол хранилища?",
  "options": [
    {
      "text": "Чтобы заменить реализацию",
      "correct": true,
      "explanation": "Можно подставить память или БД."
    },
    {
      "text": "Чтобы ускорить CSS",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Чтобы создать таблицу",
      "correct": false,
      "explanation": "Это миграции."
    }
  ],
  "explanation": "Протокол уменьшает связанность."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "Dataclass",
      "correct": true
    },
    {
      "text": "Protocol",
      "correct": true
    },
    {
      "text": "Сервис с зависимостью",
      "correct": true
    },
    {
      "text": "SQL без параметров",
      "correct": false,
      "explanation": "Это не ООП-практика."
    }
  ],
  "explanation": "Практика собирает модель и сервис."
}
```

## Куда дальше

- [Коллекции, функции и ООП](theme.html?path=content/python/kollekcii-funkcii-oop/kollekcii-funkcii-oop.md)
- [Модули, окружение и типы](theme.html?path=content/python/moduli-okruzhenie-tipy/moduli-i-pakety.md)
- [Базы данных и SQLAlchemy](theme.html?path=content/python/bazy-dannyh-i-sqlalchemy/sql-dlya-python.md)
