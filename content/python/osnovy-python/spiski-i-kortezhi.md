---
title: Списки и кортежи
description: list, tuple, индексы, срезы, методы и распаковка.
keywords: Python, списки, кортежи, list, tuple, срезы, индексы

---

# Списки и кортежи

Список изменяем. Кортеж — нет. Оба хранят последовательность значений.

## Список

```python
tasks = ["учёба", "спорт", "код"]

tasks.append("отдых")
tasks.remove("спорт")
tasks[0] = "Python"
```

## Кортеж

```python
point = (10, 20)
x, y = point
```

Кортеж нельзя изменить после создания.

## Индексы и срезы

```python
items = [10, 20, 30, 40]

print(items[0])    # 10
print(items[-1])   # 40
print(items[1:3])  # [20, 30]
print(items[::-1]) # [40, 30, 20, 10]
```

## Полезные методы

```python
numbers = [3, 1, 2]

numbers.sort()
numbers.reverse()
length = len(numbers)
```

## Частые ошибки

- **Выйти за границы списка.**
- **Ждать изменяемости кортежа.**
- **Путать срез и индекс.**
- **Делать поверхностную копию и менять вложенные объекты.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем кортеж отличается от списка?",
  "options": [
    {
      "text": "Кортеж нельзя изменить",
      "correct": true,
      "explanation": "Он неизменяемый."
    },
    {
      "text": "Кортеж хранит только числа",
      "correct": false,
      "explanation": "Может хранить разные типы."
    },
    {
      "text": "Кортеж не имеет индексов",
      "correct": false,
      "explanation": "Индексы есть."
    }
  ],
  "explanation": "Кортеж — неизменяемая последовательность."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про списки?",
  "options": [
    {
      "text": "Поддерживают индексы",
      "correct": true
    },
    {
      "text": "Поддерживают срезы",
      "correct": true
    },
    {
      "text": "Могут менять элементы",
      "correct": true
    },
    {
      "text": "Не могут хранить строки",
      "correct": false,
      "explanation": "Могут хранить разные типы."
    }
  ],
  "explanation": "Списки гибкие и изменяемые."
}
```

## Куда дальше

- [Словари и множества](theme.html?path=content/python/osnovy-python/slovari-i-mnozhestva.md)
- [Функции](theme.html?path=content/python/osnovy-python/funkcii.md)
- [Ошибки и исключения](theme.html?path=content/python/osnovy-python/oshibki-i-isklyucheniya.md)
