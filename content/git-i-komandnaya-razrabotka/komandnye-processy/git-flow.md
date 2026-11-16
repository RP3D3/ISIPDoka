---
title: Git Flow
description: Модель с main, develop, feature, release и hotfix-ветками: когда она оправдана.
keywords: Git Flow, main, develop, release, hotfix, feature, ветвление

---

# Git Flow

Git Flow — модель с несколькими долгоживущими ветками. Она хорошо
подходит для версионируемых продуктов, где релизы выходят редко и
требуют стабилизации.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/git-i-komandnaya-razrabotka/_assets/komandnye-processy/branching-strategies.svg"
    alt="Сравнение Git Flow и trunk-based development"
    width="900"
  >
  <figcaption>
    Git Flow использует develop и release, trunk-based — короткие ветки.
  </figcaption>
</figure>

## Ветки

- `main` — только релизы;
- `develop` — интеграция разработки;
- `feature/*` — задачи;
- `release/*` — стабилизация версии;
- `hotfix/*` — срочные исправления.

## Цикл

1. Feature от develop.
2. Merge обратно в develop.
3. Release от develop.
4. Тесты и фиксы в release.
5. Merge release в main и develop.
6. Hotfix от main.

## Когда подходит

- десктопные приложения;
- библиотеки;
- продукты с версиями;
- команды с отдельным QA.

## Частые ошибки

- **Использовать Git Flow для веб-сервиса с ежедневными релизами.**
  Слишком много веток.
- **Забыть merge release обратно в develop.**
- **Долгие release-ветки.** Они конфликтуют.
- **Путать hotfix и feature.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какая ветка в Git Flow предназначена для интеграции разработки?",
  "options": [
    {
      "text": "`develop`",
      "correct": true,
      "explanation": "Туда сливаются feature-ветки."
    },
    {
      "text": "`main`",
      "correct": false,
      "explanation": "Там релизы."
    },
    {
      "text": "`hotfix`",
      "correct": false,
      "explanation": "Это срочные исправления."
    }
  ],
  "explanation": "Develop — основная ветка разработки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что характерно для Git Flow?",
  "options": [
    {
      "text": "Ветка develop",
      "correct": true
    },
    {
      "text": "Release-ветки",
      "correct": true
    },
    {
      "text": "Hotfix-ветки",
      "correct": true
    },
    {
      "text": "Только одна ветка main",
      "correct": false,
      "explanation": "Это ближе к GitHub Flow."
    }
  ],
  "explanation": "Git Flow использует несколько типов веток."
}
```

## Куда дальше

- [Feature branches](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/feature-branches.md)
- [Commit messages](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/commit-messages.md)
- [Релизы и CI/CD](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/tegi-i-versii.md)
