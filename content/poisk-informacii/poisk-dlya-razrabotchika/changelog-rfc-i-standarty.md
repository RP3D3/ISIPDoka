---
title: Changelog, RFC и стандарты
description: Где узнать, что изменилось между версиями и почему API работает именно так.
keywords: changelog, release notes, RFC, стандарты, breaking changes, версии

---

# Changelog, RFC и стандарты

Документация описывает «как», changelog — «что изменилось», RFC —
«почему так решили».

## Changelog

Смотрите:

- breaking changes;
- новые возможности;
- исправления;
- deprecations;
- миграции.

## Release notes

Часто короче changelog и ориентированы на пользователя. Но технические
детали лучше искать в changelog.

## RFC

RFC описывает предложение и обсуждение стандарта. Полезно, когда нужно
понять:

- почему выбрано такое поведение;
- какие ограничения;
- какие альтернативы рассматривались.

## Стандарты

Для HTTP, JSON, Unicode, SQL и других тем стандарты — первоисточник.
Ищите официальный документ, а не пересказ.

## Частые ошибки

- **Игнорировать changelog.**
- **Использовать deprecated API.**
- **Читать RFC как учебник.**
- **Брать пересказ стандарта вместо оригинала.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен changelog?",
  "options": [
    {
      "text": "Понять, что изменилось между версиями",
      "correct": true,
      "explanation": "Там есть breaking changes и миграции."
    },
    {
      "text": "Заменить документацию",
      "correct": false,
      "explanation": "Он дополняет её."
    },
    {
      "text": "Хранить пароли",
      "correct": false,
      "explanation": "Это не его задача."
    }
  ],
  "explanation": "Changelog помогает не использовать устаревшее."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что можно найти в changelog?",
  "options": [
    {
      "text": "Breaking changes",
      "correct": true
    },
    {
      "text": "Новые возможности",
      "correct": true
    },
    {
      "text": "Deprecations",
      "correct": true
    },
    {
      "text": "Только рекламу",
      "correct": false,
      "explanation": "Changelog не рекламный текст."
    }
  ],
  "explanation": "Changelog фиксирует изменения версии."
}
```

## Куда дальше

- [API-справочники и примеры](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/api-spravochniki-i-primery.md)
- [Поиск по исходникам и regex](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/poisk-po-ishodnikam-i-regex.md)
- [Поиск для разработчика](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/poisk-dlya-razrabotchika.md)
