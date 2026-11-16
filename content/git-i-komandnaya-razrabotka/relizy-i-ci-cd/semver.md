---
title: SemVer
description: Семантическое версионирование: major, minor, patch и совместимость.
keywords: SemVer, семантическое версионирование, версии, major, minor, patch

---

# SemVer

SemVer — формат версий `MAJOR.MINOR.PATCH`. Он помогает понять, совместимо
ли обновление.

## Правила

- **MAJOR** — несовместимые изменения;
- **MINOR** — новая функциональность без поломок;
- **PATCH** — исправления без новых возможностей.

Пример: `2.4.1`.

## Примеры

```text
1.0.0 -> 1.0.1  исправление
1.0.1 -> 1.1.0  новая функция
1.1.0 -> 2.0.0  несовместимое изменение
```

## Pre-release

```text
2.0.0-beta.1
2.0.0-rc.1
```

Префиксы показывают, что версия ещё не стабильна.

## Частые ошибки

- **Менять API в patch-версии.** Это ломает ожидания.
- **Ставить major без причины.** Версии теряют смысл.
- **Не обновлять версию перед релизом.**
- **Путать версию продукта и версию API.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что означает MAJOR в SemVer?",
  "options": [
    {
      "text": "Несовместимые изменения",
      "correct": true,
      "explanation": "Потребителям может понадобиться миграция."
    },
    {
      "text": "Исправление бага",
      "correct": false,
      "explanation": "Это patch."
    },
    {
      "text": "Новая функция",
      "correct": false,
      "explanation": "Это minor."
    }
  ],
  "explanation": "Major сигнализирует о breaking changes."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про SemVer?",
  "options": [
    {
      "text": "PATCH — совместимые исправления",
      "correct": true
    },
    {
      "text": "MINOR — новая функциональность",
      "correct": true
    },
    {
      "text": "MAJOR — несовместимые изменения",
      "correct": true
    },
    {
      "text": "Версия не связана с совместимостью",
      "correct": false,
      "explanation": "Совместимость — главный смысл SemVer."
    }
  ],
  "explanation": "SemVer помогает планировать обновления."
}
```

## Куда дальше

- [Changelog](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/changelog.md)
- [Hotfix](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/hotfix.md)
- [Теги и версии](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/tegi-i-versii.md)
