---
title: Merge three-way
description: Как Git сливает разошедшиеся ветки через общего предка и merge-коммит.
keywords: three-way merge, git merge, merge commit, общий предок, слияние веток

---

# Merge three-way

Three-way merge нужен, когда обе ветки ушли вперёд от общего предка.
Git сравнивает три состояния: вашу ветку, целевую ветку и их общего
предка.

## Пример

```bash
git switch main
git merge feature
```

Если в `main` и `feature` есть разные коммиты, Git создаст merge-коммит
с двумя родителями.

## Почему «three-way»

- база — общий предок;
- наша сторона — текущая ветка;
- их сторона — сливаемая ветка.

Git понимает, какие изменения были только с одной стороны, и применяет
их автоматически. Если обе стороны меняли одно и то же место, возникает
конфликт.

## `--no-ff`

```bash
git merge --no-ff feature
```

Заставляет создать merge-коммит даже при возможности fast-forward. Это
сохраняет в истории факт слияния ветки.

## Частые ошибки

- **Сливать без проверки текущей ветки.** Легко перепутать направление.
- **Коммитить конфликтные маркеры.** Код с `<<<<<<<` не должен попасть в
  историю.
- **Делать merge с грязной рабочей копией.**
- **Путать `--no-ff` и `--ff-only`.** Это противоположные требования.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Когда нужен three-way merge?",
  "options": [
    {
      "text": "Когда обе ветки ушли вперёд от общего предка",
      "correct": true,
      "explanation": "Fast-forward уже невозможен."
    },
    {
      "text": "Когда ветка не менялась",
      "correct": false,
      "explanation": "Тогда возможен fast-forward."
    },
    {
      "text": "Только при конфликтах",
      "correct": false,
      "explanation": "Конфликт — частный случай."
    }
  ],
  "explanation": "Three-way merge использует общего предка."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про merge-коммит?",
  "options": [
    {
      "text": "Имеет двух родителей",
      "correct": true
    },
    {
      "text": "Сохраняет факт слияния в истории",
      "correct": true
    },
    {
      "text": "Может быть создан через `--no-ff`",
      "correct": true
    },
    {
      "text": "Удаляет историю сливаемой ветки",
      "correct": false,
      "explanation": "История обеих веток сохраняется."
    }
  ],
  "explanation": "Merge-коммит объединяет две линии истории."
}
```

## Куда дальше

- [Конфликты слияния](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/konflikty.md)
- [Rebase vs merge](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/rebase-vs-merge.md)
- [Merge fast-forward](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/merge-fast-forward.md)
