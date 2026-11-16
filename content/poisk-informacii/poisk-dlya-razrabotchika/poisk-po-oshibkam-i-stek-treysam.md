---
title: Поиск по ошибкам и стек-трейсам
description: Как искать ошибку по точному тексту, версии и верхним строкам стека.
keywords: ошибки, стек-трейс, traceback, исключение, поиск ошибки, версия

---

# Поиск по ошибкам и стек-трейсам

Ошибка — один из самых точных поисковых запросов. Чем точнее текст, тем
лучше результат.

## Что взять из ошибки

- тип исключения;
- текст сообщения;
- имя функции или модуля;
- версию языка и библиотеки;
- операционную систему, если важно.

## Пример

```text
ModuleNotFoundError: No module named 'requests'
```

Лучше искать точную строку в кавычках, а не весь traceback.

## Стек-трейс

Смотрите:

1. верхнюю строку с типом ошибки;
2. последний вызов в вашем коде;
3. версию зависимости;
4. путь к файлу, если он относится к делу.

## Частые ошибки

- **Копировать весь traceback.** Лучше — точное сообщение.
- **Игнорировать верхнюю строку.** Там тип ошибки.
- **Не указывать версию.**
- **Брать решение для другой ОС или версии.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что лучше искать в ошибке?",
  "options": [
    {
      "text": "Точный тип и текст ошибки",
      "correct": true,
      "explanation": "Это самое уникальное."
    },
    {
      "text": "Весь файл с кодом",
      "correct": false,
      "explanation": "Это слишком много."
    },
    {
      "text": "Только слово error",
      "correct": false,
      "explanation": "Слишком широко."
    }
  ],
  "explanation": "Точный текст ошибки сужает поиск."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что полезно добавить к запросу?",
  "options": [
    {
      "text": "Версию языка",
      "correct": true
    },
    {
      "text": "Версию библиотеки",
      "correct": true
    },
    {
      "text": "ОС, если ошибка системная",
      "correct": true
    },
    {
      "text": "Все строки traceback без фильтра",
      "correct": false,
      "explanation": "Лучше выделить главное."
    }
  ],
  "explanation": "Контекст версии и ОС повышает точность."
}
```

## Куда дальше

- [GitHub и code search](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/github-i-code-search.md)
- [Stack Overflow и Q&A](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/stack-overflow-i-qa.md)
- [Практика: найти решение ошибки](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/praktika-nayti-reshenie-oshibki.md)
