---
title: Feature branches
description: Как называть ветки под задачи, выбирать базу и не превращать их в долгий проект.
keywords: feature branch, ветка под задачу, naming, база ветки, короткоживущая ветка

---

# Feature branches

Feature branch — ветка под одну задачу: функцию, фикс, рефакторинг или
документацию. Она должна быть короткой и понятной.

## Правила

- одна ветка — одна задача;
- ветка ответвляется от актуальной базы;
- имя отражает задачу;
- после merge ветку удаляют.

## Имена

Хорошие примеры:

```text
feature/login-validation
fix/cart-total
docs/api-auth
refactor/user-service
```

Плохие:

```text
test
new
my-branch
fix
```

## База

Обычно ветка создаётся от `main`. В Git Flow — от `develop`. Важно
понимать, куда потом будет merge.

## Долгая ветка

Чем дольше ветка живёт, тем больше конфликтов. Если задача большая,
разбейте её на несколько PR.

## Частые ошибки

- **Смешивать несколько задач.**
- **Создавать ветку от устаревшей main.**
- **Давать непонятные имена.**
- **Забывать удалять ветку после merge.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Сколько задач должно быть в одной feature-ветке?",
  "options": [
    {
      "text": "Одна логическая задача",
      "correct": true,
      "explanation": "Так проще review и откат."
    },
    {
      "text": "Как можно больше",
      "correct": false,
      "explanation": "Это затрудняет review."
    },
    {
      "text": "Ровно три",
      "correct": false,
      "explanation": "Количество не главное."
    }
  ],
  "explanation": "Ветка должна быть сфокусированной."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что делает feature-ветку лучше?",
  "options": [
    {
      "text": "Понятное имя",
      "correct": true
    },
    {
      "text": "Актуальная база",
      "correct": true
    },
    {
      "text": "Короткий срок жизни",
      "correct": true
    },
    {
      "text": "Смешивание нескольких задач",
      "correct": false,
      "explanation": "Это усложняет review."
    }
  ],
  "explanation": "Фокус и актуальность уменьшают конфликты."
}
```

## Куда дальше

- [Commit messages](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/commit-messages.md)
- [Issues и задачи](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/issues-i-zadachi.md)
- [Definition of Done](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/definition-of-done.md)
