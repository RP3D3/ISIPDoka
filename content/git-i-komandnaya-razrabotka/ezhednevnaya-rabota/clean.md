---
title: clean
description: Как удалять неотслеживаемые файлы безопасно и почему dry-run обязателен.
keywords: git clean, неотслеживаемые файлы, git clean -n, очистка репозитория

---

# clean

`git clean` удаляет неотслеживаемые файлы и папки. Это полезно после
сборки, но опасно: Git не сможет восстановить то, что никогда не
коммитил.

## Сначала посмотреть

```bash
git clean -n
```

`-n` или `--dry-run` показывает, что будет удалено, но ничего не
удаляет. Это обязательный первый шаг.

## Удалить файлы

```bash
git clean -f
```

`-f` нужен, потому что Git защищает от случайного удаления.

## Удалить файлы и папки

```bash
git clean -fd
```

`-d` добавляет неотслеживаемые папки.

## Удалить игнорируемые файлы

```bash
git clean -fX
```

`-X` удаляет только файлы, которые попадают под `.gitignore`. Это
удобно для очистки сборки, но всё равно требует проверки.

## Частые ошибки

- **Запускать `git clean -fd` без `-n`.** Можно удалить нужные файлы.
- **Думать, что Git восстановит удалённое.** Неотслеживаемые файлы не в
  истории.
- **Путать `-x` и `-X`.** `-x` удаляет и игнорируемые, и обычные
  неотслеживаемые файлы.
- **Очищать папку с локальными настройками.** Проверьте `.gitignore`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен `git clean -n`?",
  "options": [
    {
      "text": "Показать, что будет удалено, без удаления",
      "correct": true,
      "explanation": "Это dry-run."
    },
    {
      "text": "Удалить все коммиты",
      "correct": false,
      "explanation": "Clean не работает с историей."
    },
    {
      "text": "Создать ветку",
      "correct": false,
      "explanation": "Для ветки есть `git branch`."
    }
  ],
  "explanation": "Dry-run обязателен перед очисткой."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `git clean`?",
  "options": [
    {
      "text": "Удаляет неотслеживаемые файлы",
      "correct": true
    },
    {
      "text": "Может удалить папки с `-d`",
      "correct": true
    },
    {
      "text": "Может удалить игнорируемые файлы с `-X`",
      "correct": true
    },
    {
      "text": "Восстанавливает удалённое из истории",
      "correct": false,
      "explanation": "Неотслеживаемые файлы не в истории."
    }
  ],
  "explanation": "Clean удаляет только то, что Git не отслеживает."
}
```

## Куда дальше

- [stash](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/stash.md)
- [Ежедневная работа](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/ezhednevnaya-rabota.md)
- [revert](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/revert.md)
