---
title: CI/CD
description: Что такое непрерывная интеграция, доставка и развёртывание.
keywords: CI/CD, continuous integration, continuous delivery, deployment, pipeline

---

# CI/CD

CI/CD — это автоматизация проверки и доставки изменений.

- **CI** (continuous integration) — автоматическая проверка каждого
  изменения.
- **CD** (continuous delivery/deployment) — автоматическая доставка
  проверенной версии.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/git-i-komandnaya-razrabotka/_assets/relizy-i-ci-cd/ci-pipeline.svg"
    alt="Пайплайн CI/CD от коммита до релиза"
    width="900"
  >
  <figcaption>
    CI проверяет, CD доставляет проверенную сборку.
  </figcaption>
</figure>

## Типичный pipeline

1. Установка зависимостей.
2. Линтер.
3. Тесты.
4. Сборка.
5. Артефакт.
6. Деплой.

## Зачем

- раньше находить ошибки;
- не тратить время на ручные проверки;
- делать релизы предсказуемыми;
- видеть, какой коммит сломал сборку.

## Частые ошибки

- **CI только на main.** Ошибки находятся поздно.
- **Медленный pipeline.** Люди перестают ждать.
- **Нет тестов.** CI проверяет только сборку.
- **Секреты в логах.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает CI?",
  "options": [
    {
      "text": "Автоматически проверяет изменения",
      "correct": true,
      "explanation": "Линт, тесты, сборка."
    },
    {
      "text": "Пишет код за разработчика",
      "correct": false,
      "explanation": "CI не пишет код."
    },
    {
      "text": "Удаляет ветки",
      "correct": false,
      "explanation": "Это не задача CI."
    }
  ],
  "explanation": "CI — автоматическая проверка интеграции."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что обычно входит в pipeline?",
  "options": [
    {
      "text": "Линтер",
      "correct": true
    },
    {
      "text": "Тесты",
      "correct": true
    },
    {
      "text": "Сборка",
      "correct": true
    },
    {
      "text": "Ручное переименование файлов",
      "correct": false,
      "explanation": "Это не автоматизированная проверка."
    }
  ],
  "explanation": "Pipeline автоматизирует повторяемые проверки."
}
```

## Куда дальше

- [GitHub Actions](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/github-actions.md)
- [Pipeline](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/pipeline.md)
- [Secrets в CI](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/secrets-v-ci.md)
