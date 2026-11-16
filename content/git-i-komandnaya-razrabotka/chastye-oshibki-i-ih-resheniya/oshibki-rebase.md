---
title: Ошибки rebase
description: Что делать, если rebase пошёл не туда, потерял коммиты или оставил конфликты.
keywords: ошибки rebase, rebase --abort, reflog, ORIG_HEAD, конфликты

---

# Ошибки rebase

Rebase переписывает коммиты. Если что-то пошло не так, не спешите
делать новые операции.

## Отменить rebase

```bash
git rebase --abort
```

Это вернёт состояние до начала rebase, если rebase ещё идёт.

## Если rebase уже завершён

```bash
git reflog
```

Найдите состояние до rebase и создайте ветку:

```bash
git branch before-rebase HEAD@{1}
```

Или вернитесь:

```bash
git reset --hard HEAD@{1}
```

## Конфликты

1. Разрешите конфликт.
2. `git add`.
3. `git rebase --continue`.

Если конфликт невозможно разрешить:

```bash
git rebase --skip
```

Но `skip` удалит коммит из результата.

## Частые ошибки

- **Rebase общей ветки.** История разойдётся у коллег.
- **`skip` без понимания.** Можно потерять изменение.
- **`reset --hard` вместо `abort`.**
- **Нет резервной ветки.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как отменить незавершённый rebase?",
  "options": [
    {
      "text": "`git rebase --abort`",
      "correct": true,
      "explanation": "Он возвращает состояние до rebase."
    },
    {
      "text": "`git clean -fd`",
      "correct": false,
      "explanation": "Он удаляет файлы."
    },
    {
      "text": "`git push --force`",
      "correct": false,
      "explanation": "Это не отменяет rebase."
    }
  ],
  "explanation": "Abort — безопасный выход."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает при ошибке rebase?",
  "options": [
    {
      "text": "`rebase --abort`",
      "correct": true
    },
    {
      "text": "`reflog`",
      "correct": true
    },
    {
      "text": "Резервная ветка",
      "correct": true
    },
    {
      "text": "Удаление `.git`",
      "correct": false,
      "explanation": "Это уничтожит историю."
    }
  ],
  "explanation": "Rebase можно отменить или восстановить."
}
```

## Куда дальше

- [Потерянные изменения](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/poteryannye-izmeneniya.md)
- [Командные ошибки](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/komandnye-oshibki.md)
- [Rebase vs merge](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/rebase-vs-merge.md)
