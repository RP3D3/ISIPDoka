---
title: Pipeline
description: Как собрать быстрый и надёжный pipeline: этапы, кэш, артефакты и падения.
keywords: pipeline, CI, stages, cache, artifacts, fail fast, тесты

---

# Pipeline

Pipeline — последовательность автоматических проверок. Хороший pipeline
быстрый, стабильный и понятный.

## Этапы

1. Подготовка зависимостей.
2. Линтер.
3. Тесты.
4. Сборка.
5. Публикация артефакта.
6. Деплой.

## Fail fast

Сначала запускайте быстрые проверки. Если линтер упал, нет смысла
запускать долгую сборку.

## Кэш

Кэшируйте зависимости, чтобы не скачивать их каждый раз. Но не
кэшируйте секреты.

## Артефакты

Сборка должна сохраняться как артефакт, чтобы её можно было
задеплоить или проверить.

## Частые ошибки

- **Слишком медленный pipeline.** Люди перестают ждать.
- **Flaky-тесты.** Доверие к CI падает.
- **Нет логов.** Непонятно, что упало.
- **Деплой без проверки артефакта.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое fail fast в pipeline?",
  "options": [
    {
      "text": "Сначала запускать быстрые проверки и останавливаться при ошибке",
      "correct": true,
      "explanation": "Это экономит время."
    },
    {
      "text": "Игнорировать ошибки",
      "correct": false,
      "explanation": "Это противоположное поведение."
    },
    {
      "text": "Всегда деплоить",
      "correct": false,
      "explanation": "Деплой идёт после проверок."
    }
  ],
  "explanation": "Fail fast ускоряет обратную связь."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что делает pipeline лучше?",
  "options": [
    {
      "text": "Кэш зависимостей",
      "correct": true
    },
    {
      "text": "Понятные логи",
      "correct": true
    },
    {
      "text": "Стабильные тесты",
      "correct": true
    },
    {
      "text": "Секреты в логах",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Скорость и стабильность важны для доверия к CI."
}
```

## Куда дальше

- [Secrets в CI](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/secrets-v-ci.md)
- [Релизы и CI/CD](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/relizy-i-ci-cd.md)
- [GitHub Actions](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/github-actions.md)
