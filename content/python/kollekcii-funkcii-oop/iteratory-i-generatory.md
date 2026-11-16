---
title: Итераторы и генераторы
description: iter, next, yield, ленивые последовательности и истощение.
keywords: Python, итераторы, генераторы, yield, iter, next, lazy

---

# Итераторы и генераторы

Итератор отдаёт элементы по одному. Генератор — удобный способ создать
итератор через `yield`.

## Итератор

```python
items = [1, 2, 3]
iterator = iter(items)

print(next(iterator))  # 1
print(next(iterator))  # 2
```

Когда элементы кончаются, `next` выбрасывает `StopIteration`.

## Генератор

```python
def countdown(start: int):
    while start > 0:
        yield start
        start -= 1


for number in countdown(3):
    print(number)
```

## Ленивость

```python
def read_lines(path: str):
    with open(path, encoding="utf-8") as file:
        for line in file:
            yield line.strip()
```

Файл читается по мере необходимости.

## Частые ошибки

- **Использовать генератор повторно.** Он истощается.
- **Путать `yield` и `return`.**
- **Хранить все данные в памяти без нужды.**
- **Забывать закрывать файлы.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `yield`?",
  "options": [
    {
      "text": "Отдаёт значение и приостанавливает функцию",
      "correct": true,
      "explanation": "При следующем вызове функция продолжится."
    },
    {
      "text": "Завершает программу",
      "correct": false,
      "explanation": "Это не exit."
    },
    {
      "text": "Создаёт файл",
      "correct": false,
      "explanation": "Это не так."
    }
  ],
  "explanation": "`yield` превращает функцию в генератор."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про генераторы?",
  "options": [
    {
      "text": "Ленивые",
      "correct": true
    },
    {
      "text": "Могут экономить память",
      "correct": true
    },
    {
      "text": "Истощаются после прохода",
      "correct": true
    },
    {
      "text": "Всегда быстрее списка",
      "correct": false,
      "explanation": "Зависит от задачи."
    }
  ],
  "explanation": "Генераторы хороши для потоковой обработки."
}
```

## Куда дальше

- [Функции высшего порядка](theme.html?path=content/python/kollekcii-funkcii-oop/funkcii-vysshego-poryadka.md)
- [Классы и объекты](theme.html?path=content/python/kollekcii-funkcii-oop/klassy-i-obekty.md)
- [Наследование и композиция](theme.html?path=content/python/kollekcii-funkcii-oop/nasledovanie-i-kompoziciya.md)
