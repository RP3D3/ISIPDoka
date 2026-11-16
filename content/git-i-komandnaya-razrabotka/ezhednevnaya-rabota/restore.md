---
title: restore
description: Как вернуть файл из индекса или из последнего коммита и не потерять нужные изменения.
keywords: git restore, отмена изменений, restore --staged, рабочая копия, индекс

---

# restore

`git restore` возвращает файл к другому состоянию. Это безопаснее, чем
сразу использовать `reset`, но важно понимать, что именно вы отменяете.

## Убрать из индекса

```bash
git restore --staged file.txt
```

Изменение остаётся на диске, но перестаёт быть подготовленным к
коммиту.

## Вернуть файл из последнего коммита

```bash
git restore file.txt
```

Рабочая копия файла заменяется версией из `HEAD`. Несохранённые
изменения в этом файле будут потеряны.

## Вернуть из конкретного коммита

```bash
git restore --source HEAD~1 file.txt
```

Полезно, если нужно посмотреть или вернуть старую версию.

## Частые ошибки

- **Путать `restore` и `restore --staged`.** Первый меняет рабочую
  копию, второй — индекс.
- **Запускать `git restore .` без проверки.** Можно потерять локальные
  правки.
- **Думать, что restore удаляет коммит.** Он работает с файлами, а не с
  историей.
- **Не делать резервную копию перед массовым восстановлением.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `git restore --staged file.txt`?",
  "options": [
    {
      "text": "Убирает файл из индекса, оставляя изменения на диске",
      "correct": true,
      "explanation": "Файл снова становится unstaged."
    },
    {
      "text": "Удаляет файл с диска",
      "correct": false,
      "explanation": "Для этого есть другие команды."
    },
    {
      "text": "Создаёт коммит",
      "correct": false,
      "explanation": "Коммит создаёт `git commit`."
    }
  ],
  "explanation": "`--staged` работает с индексом."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `git restore`?",
  "options": [
    {
      "text": "Может вернуть файл из последнего коммита",
      "correct": true
    },
    {
      "text": "Может убрать файл из индекса",
      "correct": true
    },
    {
      "text": "Может перезаписать локальные изменения",
      "correct": true
    },
    {
      "text": "Удаляет коммиты из истории",
      "correct": false,
      "explanation": "Историю меняет reset/rebase."
    }
  ],
  "explanation": "Restore работает с файлами и индексом."
}
```

## Куда дальше

- [reset](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/reset.md)
- [revert](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/revert.md)
- [add, commit и amend](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/add-commit-amend.md)
