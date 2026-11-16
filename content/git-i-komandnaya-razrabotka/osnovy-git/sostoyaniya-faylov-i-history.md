---
title: Состояния файлов и history
description: Как читать status, diff и log и понимать, что именно изменилось.
keywords: git status, git diff, git log, история, состояния файлов, staged, unstaged

---

# Состояния файлов и history

Git различает несколько состояний файла. Если научиться их читать,
большинство ошибок становится понятнее.

## `git status`

Показывает:

- какие файлы изменены;
- что уже в индексе;
- что ещё не отслеживается;
- на какой ветке вы находитесь.

```bash
git status
git status --short
```

Короткий формат удобен, когда файлов много.

## `git diff`

Показывает разницу между рабочей копией и индексом.

```bash
git diff
```

Если нужно увидеть, что уже подготовлено к коммиту:

```bash
git diff --staged
```

## `git log`

Показывает историю коммитов.

```bash
git log --oneline --graph --decorate
```

Полезные флаги:

- `--oneline` — коротко;
- `--graph` — ветки и слияния;
- `--decorate` — подписи веток и тегов;
- `-p` — изменения в каждом коммите.

## `git show`

Показывает один коммит целиком.

```bash
git show HEAD
```

`HEAD` — это текущий коммит, на который указывает ветка.

## Частые ошибки

- **Смотрят только `git status`.** Он не показывает сами изменения.
- **Путают `git diff` и `git diff --staged`.** Это разные области.
- **Читают `log` без `--oneline`.** В больших историях легко потеряться.
- **Не понимают, что такое `HEAD`.** Из-за этого страшно делать rebase и
  reset.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что показывает `git diff --staged`?",
  "options": [
    {
      "text": "Разницу между индексом и последним коммитом",
      "correct": true,
      "explanation": "Это изменения, которые попадут в коммит."
    },
    {
      "text": "Только имена изменённых файлов",
      "correct": false,
      "explanation": "Имена показывает `status`."
    },
    {
      "text": "Удалённые ветки",
      "correct": false,
      "explanation": "Это делает `git branch -r`."
    }
  ],
  "explanation": "`--staged` смотрит на подготовленные изменения."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что делает `git log`?",
  "options": [
    {
      "text": "Показывает историю коммитов",
      "correct": true
    },
    {
      "text": "Может показать граф веток",
      "correct": true
    },
    {
      "text": "Может показать изменения в коммите",
      "correct": true
    },
    {
      "text": "Удаляет старые коммиты",
      "correct": false,
      "explanation": "`log` только читает историю."
    }
  ],
  "explanation": "`log` — инструмент чтения истории."
}
```

## Куда дальше

- [.gitignore](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/gitignore.md)
- [Ежедневная работа](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/status-diff-log.md)
- [Первый коммит](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/pervyy-kommit.md)
