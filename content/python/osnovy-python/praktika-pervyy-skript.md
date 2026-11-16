---
title: Практика: первый скрипт
description: Упражнение: список задач на функциях, словарях и обработке ошибок.
keywords: практика, Python, первый скрипт, функции, словари, ошибки

---

# Практика: первый скрипт

Сделайте консольный список задач.

## 1. Данные

```python
tasks = [
    {"title": "Учёба", "done": False},
    {"title": "Спорт", "done": True},
]
```

## 2. Функции

```python
def add_task(tasks: list[dict], title: str) -> None:
    if not title.strip():
        raise ValueError("Название обязательно")

    tasks.append({"title": title, "done": False})


def show_tasks(tasks: list[dict]) -> None:
    for index, task in enumerate(tasks, start=1):
        mark = "x" if task["done"] else " "
        print(f"{index}. [{mark}] {task['title']}")
```

## 3. Запуск

```python
def main() -> None:
    add_task(tasks, "Код")
    show_tasks(tasks)


if __name__ == "__main__":
    main()
```

## 4. Проверка

- [ ] Пустой title даёт ошибку.
- [ ] Задача добавляется.
- [ ] Список выводится.
- [ ] Нет `print` внутри `add_task`.
- [ ] Есть точка входа.

## Частые ошибки

- **Печатать внутри функции добавления.**
- **Не проверять пустую строку.**
- **Хранить задачи в глобальной переменной без нужды.**
- **Забыть `if __name__ == "__main__"`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что должна делать `add_task`?",
  "options": [
    {
      "text": "Добавлять задачу и проверять title",
      "correct": true,
      "explanation": "Это её ответственность."
    },
    {
      "text": "Печатать весь список",
      "correct": false,
      "explanation": "Это делает `show_tasks`."
    },
    {
      "text": "Запускать сервер",
      "correct": false,
      "explanation": "Это не CLI-задача."
    }
  ],
  "explanation": "Функции должны иметь одну задачу."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "Список словарей",
      "correct": true
    },
    {
      "text": "Функции",
      "correct": true
    },
    {
      "text": "Проверка ошибок",
      "correct": true
    },
    {
      "text": "Только CSS",
      "correct": false,
      "explanation": "Это не Python."
    }
  ],
  "explanation": "Практика закрепляет основы."
}
```

## Куда дальше

- [Основы Python](theme.html?path=content/python/osnovy-python/osnovy-python.md)
- [Коллекции, функции и ООП](theme.html?path=content/python/kollekcii-funkcii-oop/komprehensii.md)
- [Модули, окружение и типы](theme.html?path=content/python/moduli-okruzhenie-tipy/moduli-i-pakety.md)
