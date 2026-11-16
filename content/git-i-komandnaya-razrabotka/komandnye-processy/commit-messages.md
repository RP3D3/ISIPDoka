---
title: Commit messages
description: Как писать сообщения коммитов, которые объясняют изменение через месяц.
keywords: commit message, сообщение коммита, conventional commits, атомарный коммит

---

# Commit messages

Сообщение коммита — часть истории. Оно помогает понять, что изменилось
и зачем, особенно когда код читают через месяцы.

## Формат

```text
Add login form validation

Check email format and password length before submit.
Closes #42.
```

- первая строка — короткое действие;
- пустая строка;
- тело — контекст и причина;
- ссылка на задачу, если есть.

## Хорошие сообщения

```text
Fix cart total rounding
Add retry for payment API
Remove deprecated auth header
```

## Плохие сообщения

```text
fix
update
changes
WIP
```

## Conventional Commits

Иногда используют префиксы:

```text
feat: add login form
fix: correct cart total
docs: update setup guide
refactor: extract user service
```

Это удобно для changelog и автоматизации, но главное — смысл.

## Частые ошибки

- **Сообщение не объясняет причину.**
- **Один коммит содержит несколько задач.**
- **Слишком длинная первая строка.**
- **Ссылка на задачу потеряна.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что должно быть в хорошем сообщении коммита?",
  "options": [
    {
      "text": "Что изменено и зачем",
      "correct": true,
      "explanation": "Контекст важнее красоты."
    },
    {
      "text": "Только слово fix",
      "correct": false,
      "explanation": "Это не объясняет изменение."
    },
    {
      "text": "Полный diff",
      "correct": false,
      "explanation": "Diff и так есть в коммите."
    }
  ],
  "explanation": "Сообщение объясняет смысл изменения."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что делает сообщение коммита полезным?",
  "options": [
    {
      "text": "Короткая первая строка",
      "correct": true
    },
    {
      "text": "Объяснение причины",
      "correct": true
    },
    {
      "text": "Ссылка на задачу",
      "correct": true
    },
    {
      "text": "Смешивание нескольких задач",
      "correct": false,
      "explanation": "Лучше атомарные коммиты."
    }
  ],
  "explanation": "Полезное сообщение отвечает на «что» и «зачем»."
}
```

## Куда дальше

- [Issues и задачи](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/issues-i-zadachi.md)
- [Definition of Done](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/definition-of-done.md)
- [Feature branches](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/feature-branches.md)
