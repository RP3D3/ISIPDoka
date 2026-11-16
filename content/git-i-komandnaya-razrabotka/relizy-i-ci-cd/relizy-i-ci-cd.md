---
title: Релизы и CI/CD
description: Итог группы: теги, SemVer, changelog, hotfix, rollback и автоматизация.
keywords: релизы, CI/CD, SemVer, changelog, hotfix, rollback, pipeline

---

# Релизы и CI/CD

Релиз — это не только тег. Это проверенная сборка, понятные изменения и
план отката.

## Цикл релиза

1. Проверки в CI.
2. Сборка артефакта.
3. Тег версии.
4. Changelog.
5. Деплой.
6. Мониторинг.
7. Hotfix или rollback при проблеме.

## Что важно

- версия по SemVer;
- тег на конкретном коммите;
- changelog для пользователей;
- secrets вне кода;
- pipeline не должен быть медленным;
- rollback должен быть возможен.

## Частые ошибки

- **Тег не на том коммите.**
- **Нет changelog.**
- **Секреты в CI-логах.**
- **Нет плана отката.**
- **Hotfix смешан с рефакторингом.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что должно быть у релиза?",
  "options": [
    {
      "text": "Проверенная сборка и понятная версия",
      "correct": true,
      "explanation": "Это делает релиз воспроизводимым."
    },
    {
      "text": "Только новый коммит в main",
      "correct": false,
      "explanation": "Этого недостаточно."
    },
    {
      "text": "Секреты в логах",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Релиз — это процесс, а не один коммит."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в релизный процесс?",
  "options": [
    {
      "text": "CI-проверки",
      "correct": true
    },
    {
      "text": "Тег версии",
      "correct": true
    },
    {
      "text": "Changelog",
      "correct": true
    },
    {
      "text": "Прямой push в main без проверок",
      "correct": false,
      "explanation": "Это обходит процесс."
    }
  ],
  "explanation": "Релиз включает проверки, версию и описание."
}
```

## Куда дальше

- [Практика: CI и релиз](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/praktika-ci-i-reliz.md)
- [Расследование и восстановление](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/reflog.md)
- [Частые ошибки и их решения](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/push-rejected.md)
