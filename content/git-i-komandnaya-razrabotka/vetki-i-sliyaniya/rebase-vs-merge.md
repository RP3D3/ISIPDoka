---
title: Rebase vs merge
description: Чем rebase отличается от merge, когда он уместен и почему опасен для общей истории.
keywords: rebase, merge, rebase vs merge, переписывание истории, линейная история

---

# Rebase vs merge

Merge сохраняет историю ветвления. Rebase переносит коммиты на новую
базу и делает историю линейной, но переписывает хеши коммитов.

## Merge

```bash
git switch main
git merge feature
```

Плюсы:

- сохраняет реальную историю;
- безопасен для общих веток;
- понятно, когда была слита ветка.

Минусы:

- история может быть запутанной;
- много merge-коммитов.

## Rebase

```bash
git switch feature
git rebase main
```

Плюсы:

- линейная история;
- удобно читать;
- коммиты выглядят так, будто делались поверх свежего main.

Минусы:

- переписывает хеши;
- опасен для веток, которые уже используют другие;
- конфликты приходится решать по одному коммиту.

## Главное правило

**Не делайте rebase публичной ветки без согласования.** Если ветка
локальная — можно. Если её уже забрали коллеги — лучше merge.

## Частые ошибки

- **Rebase после push в общую ветку.** Коллеги получают разную историю.
- **Rebase без резервной ветки.** Ошибку сложнее откатить.
- **Путать rebase и merge.** Это разные модели истории.
- **Использовать `push --force` без `--force-with-lease`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает rebase?",
  "options": [
    {
      "text": "Переносит коммиты на новую базу и переписывает их хеши",
      "correct": true,
      "explanation": "История становится линейной."
    },
    {
      "text": "Создаёт merge-коммит",
      "correct": false,
      "explanation": "Это делает merge."
    },
    {
      "text": "Удаляет ветку",
      "correct": false,
      "explanation": "Ветка остаётся."
    }
  ],
  "explanation": "Rebase меняет базу коммитов."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Когда rebase уместен?",
  "options": [
    {
      "text": "Локальная ветка перед PR",
      "correct": true
    },
    {
      "text": "Нужно сделать историю линейной",
      "correct": true
    },
    {
      "text": "Ветку ещё никто не забрал",
      "correct": true
    },
    {
      "text": "Общая ветка, которую уже используют коллеги",
      "correct": false,
      "explanation": "Это опасно без согласования."
    }
  ],
  "explanation": "Rebase безопасен для локальной истории."
}
```

## Куда дальше

- [Интерактивный rebase](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/interaktivnyy-rebase.md)
- [Cherry-pick](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/cherry-pick.md)
- [Конфликты слияния](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/konflikty.md)
