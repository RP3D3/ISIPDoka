---
title: Logging
description: Уровни логов, handlers, formatters и структурированные записи.
keywords: Python, logging, логи, уровни, handlers, formatters

---

# Logging

`logging` лучше `print`: он умеет уровни, обработчики и форматирование.

## Настройка

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)
```

## Использование

```python
logger = logging.getLogger(__name__)

logger.info("Запрос обработан")
logger.warning("Медленный ответ")
logger.error("Ошибка базы")
```

## Уровни

- DEBUG;
- INFO;
- WARNING;
- ERROR;
- CRITICAL.

## Исключения

```python
try:
    ...
except Exception:
    logger.exception("Не удалось сохранить")
```

## Частые ошибки

- **Использовать `print` в продакшене.**
- **Писать пароли и токены в лог.**
- **Настраивать root logger в библиотеке.**
- **Логировать без контекста.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `logger.exception`?",
  "options": [
    {
      "text": "Логирует ошибку с traceback",
      "correct": true,
      "explanation": "Это удобно внутри except."
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
  "explanation": "`exception` добавляет стек."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для логов?",
  "options": [
    {
      "text": "Уровни",
      "correct": true
    },
    {
      "text": "Контекст",
      "correct": true
    },
    {
      "text": "Без секретов",
      "correct": true
    },
    {
      "text": "Печатать токены",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Логи должны помогать, а не вредить."
}
```

## Куда дальше

- [Конфигурация и секреты](theme.html?path=content/python/moduli-okruzhenie-tipy/config-i-secrets.md)
- [Модули, окружение и типы](theme.html?path=content/python/moduli-okruzhenie-tipy/moduli-okruzhenie-tipy.md)
- [Практика: структура проекта](theme.html?path=content/python/moduli-okruzhenie-tipy/praktika-struktura-proekta.md)
