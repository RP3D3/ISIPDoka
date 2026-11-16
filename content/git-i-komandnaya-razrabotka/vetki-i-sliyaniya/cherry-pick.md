---
title: Cherry-pick
description: Как перенести отдельный коммит в другую ветку и когда это не стоит делать.
keywords: git cherry-pick, перенос коммита, cherry pick, ветки, конфликты

---

# Cherry-pick

`git cherry-pick` берёт изменения одного коммита и применяет их в
текущей ветке. Это полезно, когда нужен конкретный фикс, а не вся ветка.

## Пример

```bash
git switch main
git cherry-pick a1b2c3d
```

Git создаст новый коммит с теми же изменениями, но с другим хешем.

## Когда использовать

- перенести срочный фикс из feature в main;
- забрать один коммит из чужой ветки;
- перенести изменение в релизную ветку.

## Конфликты

Если изменения не применяются автоматически, Git остановится. Решите
конфликт, добавьте файлы в индекс и продолжите:

```bash
git cherry-pick --continue
```

Отменить:

```bash
git cherry-pick --abort
```

## Частые ошибки

- **Переносить всю ветку через cherry-pick.** Лучше merge или rebase.
- **Забывать, что хеш меняется.** Это новый коммит.
- **Переносить коммит, который уже есть в ветке.** Получится дубль.
- **Игнорировать конфликты.** Они не исчезнут сами.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает cherry-pick?",
  "options": [
    {
      "text": "Применяет изменения одного коммита в текущей ветке",
      "correct": true,
      "explanation": "Создаётся новый коммит с другим хешем."
    },
    {
      "text": "Удаляет коммит из истории",
      "correct": false,
      "explanation": "Это делает reset/revert."
    },
    {
      "text": "Создаёт ветку",
      "correct": false,
      "explanation": "Для ветки есть branch/switch."
    }
  ],
  "explanation": "Cherry-pick переносит отдельный коммит."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Когда cherry-pick уместен?",
  "options": [
    {
      "text": "Нужен только один фикс из ветки",
      "correct": true
    },
    {
      "text": "Нужно перенести коммит в релизную ветку",
      "correct": true
    },
    {
      "text": "Нужно срочно забрать изменение в main",
      "correct": true
    },
    {
      "text": "Нужно перенести всю ветку целиком",
      "correct": false,
      "explanation": "Для этого лучше merge/rebase."
    }
  ],
  "explanation": "Cherry-pick — точечный инструмент."
}
```

## Куда дальше

- [Ветки и слияния](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/vetki-i-sliyaniya.md)
- [Практика: ветки и конфликт](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/praktika-vetki-i-konflikt.md)
- [Интерактивный rebase](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/interaktivnyy-rebase.md)
