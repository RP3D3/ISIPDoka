---
title: Интерактивный rebase
description: Как переупорядочить, объединить и переписать локальные коммиты через rebase -i.
keywords: interactive rebase, rebase -i, squash, fixup, reword, drop, история

---

# Интерактивный rebase

`git rebase -i` открывает список коммитов и позволяет изменить локальную
историю: объединить, переименовать, переставить или удалить коммиты.

## Запуск

```bash
git rebase -i HEAD~3
```

Откроется редактор со списком последних трёх коммитов.

## Основные действия

- `pick` — оставить коммит;
- `reword` — изменить сообщение;
- `edit` — остановиться и изменить содержимое;
- `squash` — объединить с предыдущим и объединить сообщения;
- `fixup` — объединить с предыдущим, отбросив сообщение;
- `drop` — удалить коммит.

## Пример

```text
pick 1a2b3c Add login form
squash 4d5e6f Fix typo
reword 7g8h9i Add validation
```

После сохранения Git выполнит план.

## Когда использовать

- перед PR, чтобы история была чистой;
- чтобы объединить «WIP» и «fix typo»;
- чтобы переписать сообщения;
- чтобы убрать случайный коммит.

## Частые ошибки

- **Делать rebase на общей ветке.** История разойдётся у коллег.
- **Удалять нужные коммиты через `drop`.** Сначала проверьте diff.
- **Забыть про конфликты.** Их нужно решать пошагово.
- **Не иметь резервной ветки.** Ошибку сложнее откатить.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `squash` в интерактивном rebase?",
  "options": [
    {
      "text": "Объединяет коммит с предыдущим",
      "correct": true,
      "explanation": "Сообщения тоже можно объединить."
    },
    {
      "text": "Удаляет ветку",
      "correct": false,
      "explanation": "Ветка не удаляется."
    },
    {
      "text": "Отправляет коммит на сервер",
      "correct": false,
      "explanation": "Для этого нужен push."
    }
  ],
  "explanation": "Squash склеивает коммиты."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что можно сделать через `rebase -i`?",
  "options": [
    {
      "text": "Переименовать коммит",
      "correct": true
    },
    {
      "text": "Объединить коммиты",
      "correct": true
    },
    {
      "text": "Удалить коммит",
      "correct": true
    },
    {
      "text": "Создать удалённый репозиторий",
      "correct": false,
      "explanation": "Это не задача rebase."
    }
  ],
  "explanation": "Interactive rebase управляет локальной историей."
}
```

## Куда дальше

- [Cherry-pick](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/cherry-pick.md)
- [Ветки и слияния](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/vetki-i-sliyaniya.md)
- [Rebase vs merge](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/rebase-vs-merge.md)
