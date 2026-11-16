---
title: Условия и циклы
description: if, elif, else, for, while, range, break и continue.
keywords: Python, условия, циклы, if, for, while, range, break

---

# Условия и циклы

Условия выбирают ветку. Циклы повторяют действия.

## Условия

```python
age = 20

if age >= 18:
    print("Доступ разрешён")
elif age >= 14:
    print("Нужно согласие")
else:
    print("Доступ запрещён")
```

## Истинность

Ложными считаются:

- `False`;
- `None`;
- `0`;
- `""`;
- `[]`, `{}`, `set()`.

## for

```python
for item in [1, 2, 3]:
    print(item)
```

С индексом:

```python
for index, item in enumerate(["a", "b"]):
    print(index, item)
```

## while

```python
count = 0

while count < 3:
    print(count)
    count += 1
```

## break и continue

```python
for number in range(10):
    if number == 3:
        continue
    if number == 7:
        break
    print(number)
```

## Частые ошибки

- **Путать `=` и `==`.**
- **Забыть изменить условие в `while`.** Получится бесконечный цикл.
- **Менять список во время итерации.**
- **Ошибиться в отступах.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `break`?",
  "options": [
    {
      "text": "Прерывает цикл",
      "correct": true,
      "explanation": "Управление идёт после цикла."
    },
    {
      "text": "Пропускает итерацию",
      "correct": false,
      "explanation": "Это `continue`."
    },
    {
      "text": "Создаёт список",
      "correct": false,
      "explanation": "Это не цикл."
    }
  ],
  "explanation": "`break` выходит из цикла."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про циклы?",
  "options": [
    {
      "text": "`for` перебирает элементы",
      "correct": true
    },
    {
      "text": "`while` работает по условию",
      "correct": true
    },
    {
      "text": "`range` задаёт последовательность",
      "correct": true
    },
    {
      "text": "`break` пропускает итерацию",
      "correct": false,
      "explanation": "Это `continue`."
    }
  ],
  "explanation": "Циклы управляют повторами."
}
```

## Куда дальше

- [Списки и кортежи](theme.html?path=content/python/osnovy-python/spiski-i-kortezhi.md)
- [Словари и множества](theme.html?path=content/python/osnovy-python/slovari-i-mnozhestva.md)
- [Функции](theme.html?path=content/python/osnovy-python/funkcii.md)
