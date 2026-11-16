---
title: Changelog
description: Как вести понятный список изменений и release notes для пользователей.
keywords: changelog, release notes, история изменений, релиз, Keep a Changelog

---

# Changelog

Changelog — список значимых изменений по версиям. Он помогает
пользователям и команде понять, что изменилось.

## Формат

```markdown
## [1.2.0] - 2026-11-16

### Added
- Валидация email в форме входа.

### Fixed
- Исправлен расчёт итоговой суммы.

### Changed
- Обновлён API авторизации.
```

## Категории

- Added — новое;
- Changed — изменено;
- Deprecated — устарело;
- Removed — удалено;
- Fixed — исправлено;
- Security — безопасность.

## Release notes

Release notes — версия для пользователей. Можно короче и без внутренних
деталей.

## Частые ошибки

- **Автоматически вставлять все коммиты.** Получается шум.
- **Писать только «разные улучшения».**
- **Забывать breaking changes.**
- **Не указывать версию и дату.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен changelog?",
  "options": [
    {
      "text": "Чтобы показать значимые изменения по версиям",
      "correct": true,
      "explanation": "Он помогает планировать обновления."
    },
    {
      "text": "Чтобы заменить Git",
      "correct": false,
      "explanation": "Это дополнение к истории."
    },
    {
      "text": "Чтобы скрыть breaking changes",
      "correct": false,
      "explanation": "Их как раз нужно указывать."
    }
  ],
  "explanation": "Changelog ориентирован на пользователя."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что полезно в changelog?",
  "options": [
    {
      "text": "Категории изменений",
      "correct": true
    },
    {
      "text": "Версия и дата",
      "correct": true
    },
    {
      "text": "Breaking changes",
      "correct": true
    },
    {
      "text": "Все внутренние коммиты без фильтра",
      "correct": false,
      "explanation": "Это создаёт шум."
    }
  ],
  "explanation": "Changelog должен быть понятным, а не полным."
}
```

## Куда дальше

- [Hotfix](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/hotfix.md)
- [Rollback](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/rollback.md)
- [SemVer](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/semver.md)
