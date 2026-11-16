---
title: Hotfix
description: Как срочно исправить продакшен, не сломав основную ветку.
keywords: hotfix, срочное исправление, релиз, main, patch, инцидент

---

# Hotfix

Hotfix — срочное исправление критической проблемы в продакшене. Он
делается от релизной ветки или `main`, а не от долгой feature-ветки.

## Процесс

1. Зафиксировать проблему.
2. Создать hotfix-ветку от актуального релиза.
3. Внести минимальное исправление.
4. Добавить тест.
5. Пройти review и CI.
6. Выпустить патч.
7. Слить обратно в основную ветку.

```bash
git switch -c hotfix/payment-timeout main
```

## Минимальность

Hotfix не место для рефакторинга. Чем меньше изменений, тем ниже риск.

## Частые ошибки

- **Делать hotfix от старой ветки.**
- **Смешивать фикс с новыми функциями.**
- **Пропускать тесты «потому что срочно».**
- **Забыть слить hotfix обратно.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "От какой ветки обычно делают hotfix?",
  "options": [
    {
      "text": "От актуального релиза или main",
      "correct": true,
      "explanation": "Чтобы исправить именно то, что в продакшене."
    },
    {
      "text": "От любой feature-ветки",
      "correct": false,
      "explanation": "Там могут быть незавершённые изменения."
    },
    {
      "text": "От тега документации",
      "correct": false,
      "explanation": "Тег не является рабочей веткой."
    }
  ],
  "explanation": "Hotfix должен быть минимальным и от правильной базы."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для hotfix?",
  "options": [
    {
      "text": "Минимальное изменение",
      "correct": true
    },
    {
      "text": "Тест на исправление",
      "correct": true
    },
    {
      "text": "Merge обратно в основную ветку",
      "correct": true
    },
    {
      "text": "Рефакторинг всего модуля",
      "correct": false,
      "explanation": "Это увеличивает риск."
    }
  ],
  "explanation": "Hotfix должен быстро и безопасно закрыть проблему."
}
```

## Куда дальше

- [Rollback](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/rollback.md)
- [CI/CD](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/ci-cd.md)
- [Changelog](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/changelog.md)
