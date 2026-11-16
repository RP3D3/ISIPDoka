---
title: pytest
description: Тесты, assert, фикстуры, parametrize и покрытие.
keywords: Python, pytest, тесты, fixtures, parametrize, coverage

---

# pytest

pytest — стандартный инструмент тестирования Python.

## Первый тест

```python
def test_sum() -> None:
    assert 2 + 2 == 4
```

## Запуск

```bash
pytest
```

Файлы обычно называют `test_*.py`.

## Фикстура

```python
import pytest


@pytest.fixture
def user() -> dict[str, str]:
    return {"name": "Аня"}


def test_user(user: dict[str, str]) -> None:
    assert user["name"] == "Аня"
```

## Параметры

```python
@pytest.mark.parametrize("value, expected", [(1, 2), (2, 3)])
def test_increment(value: int, expected: int) -> None:
    assert value + 1 == expected
```

## Частые ошибки

- **Тесты зависят от порядка.**
- **Нет изоляции данных.**
- **Проверять только успешный сценарий.**
- **Писать слишком много assert в одном тесте.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что использует pytest для проверки?",
  "options": [
    {
      "text": "`assert`",
      "correct": true,
      "explanation": "Обычный assert Python."
    },
    {
      "text": "`print`",
      "correct": false,
      "explanation": "Это вывод."
    },
    {
      "text": "`SELECT`",
      "correct": false,
      "explanation": "Это SQL."
    }
  ],
  "explanation": "pytest понимает assert."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про pytest?",
  "options": [
    {
      "text": "Поддерживает фикстуры",
      "correct": true
    },
    {
      "text": "Поддерживает parametrize",
      "correct": true
    },
    {
      "text": "Может считать coverage",
      "correct": true
    },
    {
      "text": "Требует запускать тесты вручную",
      "correct": false,
      "explanation": "Он запускает их сам."
    }
  ],
  "explanation": "pytest автоматизирует и упрощает тесты."
}
```

## Куда дальше

- [Тестовая база и фикстуры](theme.html?path=content/python/async-testy-deploy/testovaya-baza-i-fixtures.md)
- [Моки и async-тесты](theme.html?path=content/python/async-testy-deploy/moki-i-async-testy.md)
- [Docker и uvicorn](theme.html?path=content/python/async-testy-deploy/docker-i-uvicorn.md)
