---
title: worktree
description: Несколько рабочих копий одного репозитория без повторного clone.
keywords: git worktree, несколько рабочих копий, параллельная работа, ветки

---

# worktree

`git worktree` позволяет иметь несколько рабочих папок, привязанных к
одному репозиторию. Это удобно, когда нужно срочно переключиться на
другую ветку, не трогая текущие изменения.

## Добавить worktree

```bash
git worktree add ../project-hotfix hotfix/payment
```

Появится новая папка `project-hotfix` с веткой `hotfix/payment`.

## Посмотреть

```bash
git worktree list
```

## Удалить

```bash
git worktree remove ../project-hotfix
```

## Когда использовать

- срочный hotfix, пока идёт работа;
- сравнение двух версий;
- запуск тестов на другой ветке;
- обзор PR без переключения основной папки.

## Частые ошибки

- **Путать worktree с clone.** История общая.
- **Удалять папку вручную без `worktree remove`.**
- **Создавать worktree на той же ветке.** Git не даст.
- **Забывать про незакоммиченные изменения.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что даёт `git worktree`?",
  "options": [
    {
      "text": "Несколько рабочих папок для одного репозитория",
      "correct": true,
      "explanation": "История при этом общая."
    },
    {
      "text": "Копию удалённого репозитория",
      "correct": false,
      "explanation": "Это clone."
    },
    {
      "text": "Новый коммит",
      "correct": false,
      "explanation": "Коммит создаёт commit."
    }
  ],
  "explanation": "Worktree удобен для параллельной работы."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про worktree?",
  "options": [
    {
      "text": "История общая с основным репозиторием",
      "correct": true
    },
    {
      "text": "Можно посмотреть через `worktree list`",
      "correct": true
    },
    {
      "text": "Можно удалить через `worktree remove`",
      "correct": true
    },
    {
      "text": "Это полная копия remote",
      "correct": false,
      "explanation": "Это не clone."
    }
  ],
  "explanation": "Worktree — дополнительная рабочая папка."
}
```

## Куда дальше

- [hooks](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/hooks.md)
- [submodules](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/submodules.md)
- [reflog](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/reflog.md)
