---
title: hooks
description: Автоматические проверки до коммита и push: pre-commit, commit-msg, pre-push.
keywords: git hooks, pre-commit, commit-msg, pre-push, husky, автоматизация

---

# hooks

Git hooks — скрипты, которые запускаются на определённых событиях:
перед коммитом, после коммита, перед push.

## Виды

- `pre-commit` — проверка перед созданием коммита;
- `commit-msg` — проверка сообщения;
- `pre-push` — проверка перед отправкой;
- `post-merge` — действие после merge.

## Пример pre-commit

```bash
#!/bin/sh
npm test
```

Если скрипт завершится с ошибкой, коммит не создастся.

## Общие hooks

Папка `.git/hooks` не коммитится. Чтобы делиться hooks, используют
инструменты вроде Husky или настройку `core.hooksPath`.

## Частые ошибки

- **Слишком долгие hooks.** Люди начинают использовать `--no-verify`.
- **Секреты в hook-скриптах.**
- **Hooks не установлены у коллег.**
- **Проверки дублируют CI, но не заменяют его.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Когда запускается `pre-commit`?",
  "options": [
    {
      "text": "Перед созданием коммита",
      "correct": true,
      "explanation": "Если hook упал, коммит не создаётся."
    },
    {
      "text": "После push",
      "correct": false,
      "explanation": "Для этого есть другие hooks."
    },
    {
      "text": "При клонировании",
      "correct": false,
      "explanation": "Clone не запускает pre-commit."
    }
  ],
  "explanation": "pre-commit проверяет изменения до фиксации."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про hooks?",
  "options": [
    {
      "text": "Могут проверять сообщение коммита",
      "correct": true
    },
    {
      "text": "Могут запускать тесты",
      "correct": true
    },
    {
      "text": "Могут блокировать коммит при ошибке",
      "correct": true
    },
    {
      "text": "Автоматически синхронизируются со всеми",
      "correct": false,
      "explanation": "Их нужно устанавливать отдельно."
    }
  ],
  "explanation": "Hooks автоматизируют локальные проверки."
}
```

## Куда дальше

- [submodules](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/submodules.md)
- [Git LFS](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/git-lfs.md)
- [worktree](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/worktree.md)
