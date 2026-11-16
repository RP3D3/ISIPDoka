---
title: Merge fast-forward
description: Когда Git просто сдвигает указатель ветки и почему это не создаёт merge-коммит.
keywords: git merge, fast-forward, слияние, merge commit, ветки

---

# Merge fast-forward

Fast-forward — самый простой вид слияния. Он возможен, когда целевая
ветка не ушла вперёд с момента ответвления.

## Пример

```bash
git switch main
git merge feature
```

Если `main` не менялся, Git просто сдвинет указатель `main` на коммит
`feature`. Новый merge-коммит не создаётся.

## Как понять, что будет fast-forward

```bash
git merge --ff-only feature
```

`--ff-only` запрещает создавать merge-коммит. Если fast-forward
невозможен, команда завершится ошибкой. Это хороший способ проверить
состояние.

## Когда fast-forward невозможен

Если в `main` появились новые коммиты после ответвления, простого
сдвига недостаточно. Нужен three-way merge или rebase.

## Частые ошибки

- **Думать, что merge всегда создаёт коммит.** Fast-forward не создаёт.
- **Сливать не ту ветку.** Проверьте `git branch --show-current`.
- **Сливать с грязной рабочей копией.** Сначала закоммитьте или
  уберите изменения.
- **Ожидать fast-forward после изменений в main.** Он уже невозможен.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Когда возможен fast-forward?",
  "options": [
    {
      "text": "Когда целевая ветка не ушла вперёд",
      "correct": true,
      "explanation": "Тогда достаточно сдвинуть указатель."
    },
    {
      "text": "Всегда",
      "correct": false,
      "explanation": "При расходящейся истории нужен merge-коммит."
    },
    {
      "text": "Только после rebase",
      "correct": false,
      "explanation": "Rebase не обязателен."
    }
  ],
  "explanation": "Fast-forward — это сдвиг указателя без нового коммита."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про fast-forward?",
  "options": [
    {
      "text": "Не создаёт merge-коммит",
      "correct": true
    },
    {
      "text": "Может быть запрещён через `--ff-only`",
      "correct": true
    },
    {
      "text": "Требует, чтобы целевая ветка не ушла вперёд",
      "correct": true
    },
    {
      "text": "Работает при любых конфликтах",
      "correct": false,
      "explanation": "При конфликтах нужен другой сценарий."
    }
  ],
  "explanation": "Fast-forward — частный случай слияния."
}
```

## Куда дальше

- [Merge three-way](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/merge-three-way.md)
- [Конфликты слияния](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/konflikty.md)
- [branch и switch](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/branch-i-switch.md)
