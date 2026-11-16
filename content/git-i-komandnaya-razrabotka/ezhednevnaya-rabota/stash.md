---
title: stash
description: Как временно убрать незакоммиченные изменения и вернуть их позже.
keywords: git stash, stash pop, stash apply, временные изменения, переключение веток

---

# stash

`git stash` убирает незакоммиченные изменения в отдельное хранилище и
возвращает рабочую копию к чистому состоянию. Это удобно, когда нужно
срочно переключиться на другую задачу.

## Базовый сценарий

```bash
git stash
git switch main
# срочная работа
git switch feature
git stash pop
```

`pop` возвращает изменения и удаляет запись из stash. `apply` возвращает,
но оставляет запись.

## С сообщением

```bash
git stash push -m "WIP: login form"
```

Сообщение помогает понять, что внутри, если записей несколько.

## Список и удаление

```bash
git stash list
git stash drop stash@{0}
```

Stash — не долговременное хранилище. Его легко забыть.

## Неотслеживаемые файлы

По умолчанию stash не трогает неотслеживаемые файлы. Чтобы включить их:

```bash
git stash push -u
```

## Частые ошибки

- **Использовать stash как архив.** Записи теряются и забываются.
- **Делать `pop` при конфликте и паниковать.** Конфликт решается как при
  merge.
- **Забыть `-u`.** Новые файлы останутся в рабочей копии.
- **Не проверять `stash list`.** Можно применить не тот stash.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем `stash pop` отличается от `stash apply`?",
  "options": [
    {
      "text": "`pop` возвращает изменения и удаляет запись, `apply` оставляет запись",
      "correct": true,
      "explanation": "Pop — применить и удалить."
    },
    {
      "text": "`pop` удаляет коммиты",
      "correct": false,
      "explanation": "Stash не меняет историю."
    },
    {
      "text": "`apply` работает только с неотслеживаемыми файлами",
      "correct": false,
      "explanation": "Для них нужен `-u`."
    }
  ],
  "explanation": "Pop удаляет запись после применения."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про stash?",
  "options": [
    {
      "text": "Может временно убрать изменения",
      "correct": true
    },
    {
      "text": "Может хранить несколько записей",
      "correct": true
    },
    {
      "text": "Может включать неотслеживаемые файлы с `-u`",
      "correct": true
    },
    {
      "text": "Заменяет коммиты и ветки",
      "correct": false,
      "explanation": "Stash — временное хранилище."
    }
  ],
  "explanation": "Stash помогает быстро переключить контекст."
}
```

## Куда дальше

- [Ежедневная работа](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/ezhednevnaya-rabota.md)
- [Практика: отмена изменений](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/praktika-otmena-izmeneniy.md)
- [clean](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/clean.md)
