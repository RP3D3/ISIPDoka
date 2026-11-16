---
title: GitHub и code search
description: Как искать код, issues и pull request в GitHub и не копировать примеры вслепую.
keywords: GitHub, code search, поиск кода, issues, pull request, примеры

---

# GitHub и code search

GitHub — не только хостинг кода, но и огромная база примеров, обсуждений
и исправлений.

## Что искать

- код;
- issues;
- pull request;
- обсуждения;
- примеры конфигураций;
- тесты.

## Полезные уточнения

```text
repo:user/project "connection refused"
path:src language:python asyncio
```

## Issues

В issues часто описана реальная проблема и её решение. Смотрите:

- дату;
- версию;
- статус;
- комментарии мейнтейнера;
- есть ли PR с исправлением.

## Копировать код

Перед копированием проверьте:

- лицензию;
- версию;
- контекст;
- тесты;
- совместимость.

## Частые ошибки

- **Копировать код без лицензии.**
- **Игнорировать issues.**
- **Брать пример из старой версии.**
- **Не проверять, работает ли код.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что можно искать на GitHub?",
  "options": [
    {
      "text": "Код, issues и pull request",
      "correct": true,
      "explanation": "Всё это полезно для поиска."
    },
    {
      "text": "Только готовые релизы",
      "correct": false,
      "explanation": "Там есть и обсуждения."
    },
    {
      "text": "Только документацию",
      "correct": false,
      "explanation": "Кода там тоже много."
    }
  ],
  "explanation": "GitHub помогает найти примеры и контекст."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что проверить перед копированием кода?",
  "options": [
    {
      "text": "Лицензию",
      "correct": true
    },
    {
      "text": "Версию",
      "correct": true
    },
    {
      "text": "Контекст и тесты",
      "correct": true
    },
    {
      "text": "Только количество звёзд",
      "correct": false,
      "explanation": "Звёзды не гарантируют качество."
    }
  ],
  "explanation": "Код нужно адаптировать и проверять."
}
```

## Куда дальше

- [Stack Overflow и Q&A](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/stack-overflow-i-qa.md)
- [Changelog, RFC и стандарты](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/changelog-rfc-i-standarty.md)
- [Поиск по исходникам и regex](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/poisk-po-ishodnikam-i-regex.md)
