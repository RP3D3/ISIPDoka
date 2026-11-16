---
title: status, diff и log
description: Ежедневное чтение состояния репозитория: что изменено, что подготовлено и что уже в истории.
keywords: git status, git diff, git log, ежедневная работа, staged, unstaged

---

# status, diff и log

Эти три команды — базовый «пульт» Git. Они не меняют историю, а
показывают, что происходит.

## `git status`

```bash
git status
git status --short
```

Смотрите на:

- текущую ветку;
- изменённые файлы;
- подготовленные файлы;
- неотслеживаемые файлы.

Перед коммитом `status` нужно смотреть всегда.

## `git diff`

```bash
git diff
```

Показывает разницу между рабочей копией и индексом. Это то, что ещё не
подготовлено к коммиту.

```bash
git diff --staged
```

Показывает разницу между индексом и последним коммитом. Это то, что
попадёт в следующий коммит.

## `git log`

```bash
git log --oneline --graph --decorate
```

Флаги помогают читать историю:

- `--oneline` — коротко;
- `--graph` — ветки и слияния;
- `--decorate` — подписи веток и тегов;
- `-p` — изменения в каждом коммите.

## Рабочий ритм

```bash
git status
git diff
git add -p
git diff --staged
git commit -m "Explain change"
```

Так вы видите, что именно уходит в историю.

## Частые ошибки

- **Смотреть только `status`.** Он не показывает содержимое изменений.
- **Путать `diff` и `diff --staged`.** Это разные области.
- **Коммитить без просмотра `diff --staged`.** В коммит попадает лишнее.
- **Читать огромный `log` без флагов.** Легко потеряться.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что показывает `git diff --staged`?",
  "options": [
    {
      "text": "Изменения, которые попадут в следующий коммит",
      "correct": true,
      "explanation": "Это разница между индексом и последним коммитом."
    },
    {
      "text": "Все удалённые ветки",
      "correct": false,
      "explanation": "Для веток есть `git branch`."
    },
    {
      "text": "Только неотслеживаемые файлы",
      "correct": false,
      "explanation": "Их показывает `git status`."
    }
  ],
  "explanation": "`--staged` смотрит на подготовленные изменения."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что полезно перед коммитом?",
  "options": [
    {
      "text": "Посмотреть `git status`",
      "correct": true
    },
    {
      "text": "Проверить `git diff --staged`",
      "correct": true
    },
    {
      "text": "Убедиться, что в индексе нет секретов",
      "correct": true
    },
    {
      "text": "Удалить `.git` для чистоты",
      "correct": false,
      "explanation": "Это уничтожит историю."
    }
  ],
  "explanation": "Проверка перед коммитом экономит время."
}
```

## Куда дальше

- [add, commit и amend](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/add-commit-amend.md)
- [restore](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/restore.md)
- [Состояния файлов и history](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/sostoyaniya-faylov-i-history.md)
