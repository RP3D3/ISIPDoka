---
title: Первый скрипт и синтаксис
description: Запуск Python, print, комментарии, отступы и точка входа.
keywords: Python, первый скрипт, print, отступы, main, синтаксис

---

# Первый скрипт и синтаксис

Python-файл обычно имеет расширение `.py`. Код выполняется сверху вниз.

## Первый скрипт

```python
print("Привет, мир!")
```

Запуск:

```bash
python script.py
```

Или:

```bash
python3 script.py
```

## Комментарии

```python
# Однострочный комментарий

"""
Многострочная строка.
Её часто используют как описание.
"""
```

## Отступы

```python
if True:
    print("Внутри условия")
```

Отступы обязательны. Обычно используют четыре пробела.

## Точка входа

```python
def main() -> None:
    print("Старт")


if __name__ == "__main__":
    main()
```

Так код запускается только при прямом вызове файла.

## Частые ошибки

- **Смешивать табы и пробелы.**
- **Забывать двоеточие после `if`.**
- **Писать `print` без скобок.** Это Python 2.
- **Сохранять файл без `.py`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `print`?",
  "options": [
    {
      "text": "Выводит значение",
      "correct": true,
      "explanation": "Это стандартный вывод."
    },
    {
      "text": "Создаёт файл",
      "correct": false,
      "explanation": "Для файлов есть `open`."
    },
    {
      "text": "Запускает сервер",
      "correct": false,
      "explanation": "Это делает uvicorn."
    }
  ],
  "explanation": "`print` выводит данные."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для синтаксиса Python?",
  "options": [
    {
      "text": "Отступы",
      "correct": true
    },
    {
      "text": "Двоеточие после условия",
      "correct": true
    },
    {
      "text": "Расширение `.py`",
      "correct": true
    },
    {
      "text": "Точка с запятой в конце каждой строки",
      "correct": false,
      "explanation": "В Python она не обязательна."
    }
  ],
  "explanation": "Python строг к структуре."
}
```

## Куда дальше

- [Переменные и типы](theme.html?path=content/python/osnovy-python/peremennye-i-tipy.md)
- [Условия и циклы](theme.html?path=content/python/osnovy-python/usloviya-i-cikly.md)
- [Списки и кортежи](theme.html?path=content/python/osnovy-python/spiski-i-kortezhi.md)
