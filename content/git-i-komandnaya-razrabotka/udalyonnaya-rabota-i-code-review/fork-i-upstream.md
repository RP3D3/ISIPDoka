---
title: Fork и upstream
description: Как работать с чужим репозиторием через форк и два remote.
keywords: fork, upstream, origin, чужой репозиторий, pull request, GitHub

---

# Fork и upstream

Форк — это личная копия чужого репозитория на платформе. Вы работаете в
своём форке, а изменения предлагаете в исходный проект через pull
request.

## Схема

- `origin` — ваш форк;
- `upstream` — исходный репозиторий.

## Клонирование форка

```bash
git clone git@github.com:you/project.git
cd project
git remote add upstream git@github.com:original/project.git
git remote -v
```

## Зачем два remote

`origin` нужен для ваших push. `upstream` — чтобы забирать свежие
изменения из исходного проекта.

## Обновление из upstream

```bash
git fetch upstream
git switch main
git merge upstream/main
git push origin main
```

## Частые ошибки

- **Пушить в upstream без прав.** Обычно туда нельзя, и это нормально.
- **Забыть добавить upstream.** Форк быстро устаревает.
- **Работать в main форка.** Лучше отдельная ветка под задачу.
- **Путать origin и upstream.** Push идёт в origin.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое upstream при работе с форком?",
  "options": [
    {
      "text": "Исходный репозиторий, из которого сделан форк",
      "correct": true,
      "explanation": "Оттуда забирают обновления."
    },
    {
      "text": "Ваша личная ветка",
      "correct": false,
      "explanation": "Это локальная ветка."
    },
    {
      "text": "Тег версии",
      "correct": false,
      "explanation": "Тег — отдельная ссылка."
    }
  ],
  "explanation": "Upstream — источник изменений."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про fork?",
  "options": [
    {
      "text": "Форк — ваша копия чужого репозитория",
      "correct": true
    },
    {
      "text": "Origin обычно указывает на ваш форк",
      "correct": true
    },
    {
      "text": "Upstream указывает на исходный проект",
      "correct": true
    },
    {
      "text": "Форк автоматически синхронизируется с upstream",
      "correct": false,
      "explanation": "Синхронизацию нужно делать вручную."
    }
  ],
  "explanation": "Форк требует явной синхронизации."
}
```

## Куда дальше

- [Синхронизация форка](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/sinkhronizatsiya-forks.md)
- [Pull request](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/pull-request.md)
- [Tracking branches](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/tracking-branches.md)
