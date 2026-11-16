---
title: reset
description: Как перемещать HEAD и менять индекс или рабочую копию: soft, mixed и hard.
keywords: git reset, reset --soft, reset --mixed, reset --hard, HEAD, откат коммита

---

# reset

`git reset` перемещает текущую ветку и `HEAD` на другой коммит. В
зависимости от режима он также меняет индекс и рабочую копию.

## Три режима

```bash
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1
```

- `--soft` — коммит убирается из истории, изменения остаются в индексе.
- `--mixed` — коммит убирается, изменения остаются в рабочей копии, но
  не в индексе. Это режим по умолчанию.
- `--hard` — удаляются и коммит, и изменения в рабочей копии.

## Когда использовать

`reset` хорош для **локальной** истории:

- объединить несколько коммитов;
- убрать последний коммит и пересобрать его;
- вернуться к более раннему состоянию перед новой попыткой.

## Опасность `--hard`

`--hard` удаляет незакоммиченные изменения. Перед ним полезно сделать
резервную ветку:

```bash
git branch backup-before-reset
git reset --hard HEAD~1
```

Если коммит уже был отправлен в общую ветку, `reset` создаст
расхождение. Для публичной истории чаще используют `revert`.

## Частые ошибки

- **Делать `--hard` без резервной копии.** Локальные правки исчезают.
- **Использовать `reset` на общей ветке.** Коллеги получают другую
  историю.
- **Путать `--soft` и `--mixed`.** От этого зависит, что попадёт в
  индекс.
- **Не проверять `git status` после reset.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `git reset --hard HEAD~1`?",
  "options": [
    {
      "text": "Удаляет последний коммит и изменения в рабочей копии",
      "correct": true,
      "explanation": "Это самый опасный режим reset."
    },
    {
      "text": "Оставляет изменения только в индексе",
      "correct": false,
      "explanation": "Это `--soft`."
    },
    {
      "text": "Создаёт новый коммит с отменой",
      "correct": false,
      "explanation": "Это `git revert`."
    }
  ],
  "explanation": "`--hard` удаляет и коммит, и локальные изменения."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про reset?",
  "options": [
    {
      "text": "`--soft` оставляет изменения в индексе",
      "correct": true
    },
    {
      "text": "`--mixed` оставляет изменения в рабочей копии",
      "correct": true
    },
    {
      "text": "`--hard` может удалить незакоммиченные правки",
      "correct": true
    },
    {
      "text": "Reset безопасен для общей ветки без последствий",
      "correct": false,
      "explanation": "Он переписывает историю."
    }
  ],
  "explanation": "Режим reset определяет, что произойдёт с изменениями."
}
```

## Куда дальше

- [revert](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/revert.md)
- [clean](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/clean.md)
- [restore](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/restore.md)
