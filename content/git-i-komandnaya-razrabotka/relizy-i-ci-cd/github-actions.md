---
title: GitHub Actions
description: Как устроен workflow: события, jobs, steps, actions и runners.
keywords: GitHub Actions, workflow, jobs, steps, runner, CI

---

# GitHub Actions

GitHub Actions — платформа CI/CD, встроенная в GitHub. Workflow
описывается YAML-файлом в `.github/workflows/`.

## Минимальный workflow

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
```

## Основные понятия

- **on** — событие запуска;
- **job** — набор шагов на runner;
- **step** — отдельная команда или action;
- **runner** — машина, где выполняется job;
- **action** — переиспользуемый шаг.

## Частые ошибки

- **Секреты в YAML.** Их нужно хранить в secrets.
- **Слишком широкие permissions.** Давайте минимальные права.
- **Нет кэша зависимостей.** Pipeline медленный.
- **Workflow не проверяет pull request.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где лежат workflow GitHub Actions?",
  "options": [
    {
      "text": "В `.github/workflows/`",
      "correct": true,
      "explanation": "GitHub читает YAML оттуда."
    },
    {
      "text": "В корне репозитория",
      "correct": false,
      "explanation": "Нужна папка `.github/workflows`."
    },
    {
      "text": "В `.git/config`",
      "correct": false,
      "explanation": "Это настройки Git."
    }
  ],
  "explanation": "Workflow — YAML в специальной папке."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про GitHub Actions?",
  "options": [
    {
      "text": "Запускается по событиям",
      "correct": true
    },
    {
      "text": "Использует jobs и steps",
      "correct": true
    },
    {
      "text": "Может запускать тесты",
      "correct": true
    },
    {
      "text": "Требует хранить секреты в YAML",
      "correct": false,
      "explanation": "Секреты хранятся в настройках."
    }
  ],
  "explanation": "Actions автоматизирует проверки и деплой."
}
```

## Куда дальше

- [Pipeline](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/pipeline.md)
- [Secrets в CI](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/secrets-v-ci.md)
- [CI/CD](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/ci-cd.md)
