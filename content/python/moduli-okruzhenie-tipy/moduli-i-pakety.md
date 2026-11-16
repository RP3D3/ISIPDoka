---
title: Модули и пакеты
description: import, пакеты, __init__.py, относительные импорты и циклические зависимости.
keywords: Python, модули, пакеты, import, __init__, циклический импорт

---

# Модули и пакеты

Модуль — файл `.py`. Пакет — папка с модулями. Импорты связывают код.

## Импорт

```python
import math
from pathlib import Path
from collections import defaultdict
```

## Свой модуль

```python
# app/services/tasks.py
def create_task(title: str) -> dict:
    return {"title": title}
```

```python
# app/main.py
from app.services.tasks import create_task
```

## Пакет

```text
app/
  __init__.py
  main.py
  services/
    __init__.py
    tasks.py
```

`__init__.py` делает папку пакетом.

## Относительные импорты

```python
from .tasks import create_task
```

Они работают внутри пакета.

## Частые ошибки

- **Использовать `import *`.** Неясно, что попало в namespace.
- **Создавать циклические импорты.**
- **Хаковать `sys.path`.**
- **Называть модуль как стандартную библиотеку.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое модуль?",
  "options": [
    {
      "text": "Файл `.py`",
      "correct": true,
      "explanation": "Пакет — папка с модулями."
    },
    {
      "text": "Таблица базы",
      "correct": false,
      "explanation": "Это не модуль."
    },
    {
      "text": "HTML-страница",
      "correct": false,
      "explanation": "Это не Python."
    }
  ],
  "explanation": "Модуль — единица кода."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про импорты?",
  "options": [
    {
      "text": "`from x import y` импортирует имя",
      "correct": true
    },
    {
      "text": "Пакет может содержать модули",
      "correct": true
    },
    {
      "text": "Циклические импорты лучше избегать",
      "correct": true
    },
    {
      "text": "`import *` всегда хорош",
      "correct": false,
      "explanation": "Он засоряет namespace."
    }
  ],
  "explanation": "Импорты должны быть явными."
}
```

## Куда дальше

- [venv и pip](theme.html?path=content/python/moduli-okruzhenie-tipy/venv-i-pip.md)
- [pyproject и Poetry](theme.html?path=content/python/moduli-okruzhenie-tipy/pyproject-i-poetry.md)
- [Type hints](theme.html?path=content/python/moduli-okruzhenie-tipy/type-hints.md)
