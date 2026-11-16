---
title: Конфликты слияния
description: Как читать маркеры конфликта, выбирать изменения и завершать merge.
keywords: конфликт Git, merge conflict, конфликт слияния, маркеры, git add, git merge --abort

---

# Конфликты слияния

Конфликт возникает, когда обе ветки изменили одно и то же место файла.
Git не угадывает, какой вариант правильный, и оставляет выбор человеку.

## Как выглядит конфликт

```text
<<<<<<< HEAD
наша версия
=======
их версия
>>>>>>> feature/login
```

- `<<<<<<< HEAD` — текущая ветка;
- `=======` — разделитель;
- `>>>>>>> feature/login` — сливаемая ветка.

## Что делать

1. Открыть файл.
2. Понять, какой вариант нужен.
3. Оставить корректный код, убрать маркеры.
4. Проверить, что файл работает.
5. Добавить файл в индекс.
6. Завершить merge.

```bash
git add file.txt
git commit
```

Если конфликт при rebase, вместо `commit` используйте `git rebase
--continue`.

## Отменить merge

```bash
git merge --abort
```

Это вернёт состояние до начала слияния.

## Частые ошибки

- **Оставить маркеры конфликта в коде.**
- **Выбрать одну сторону без понимания последствий.**
- **Забыть добавить файл в индекс.**
- **Паниковать и удалять `.git`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что означает `<<<<<<< HEAD`?",
  "options": [
    {
      "text": "Начало версии из текущей ветки",
      "correct": true,
      "explanation": "Ниже идёт наш вариант."
    },
    {
      "text": "Конец файла",
      "correct": false,
      "explanation": "Это маркер конфликта."
    },
    {
      "text": "Команда Git",
      "correct": false,
      "explanation": "Это текст в файле."
    }
  ],
  "explanation": "Маркеры показывают стороны конфликта."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что делать после разрешения конфликта?",
  "options": [
    {
      "text": "Убрать маркеры",
      "correct": true
    },
    {
      "text": "Проверить код",
      "correct": true
    },
    {
      "text": "Добавить файл в индекс",
      "correct": true
    },
    {
      "text": "Оставить `<<<<<<<` в файле",
      "correct": false,
      "explanation": "Это сломает код."
    }
  ],
  "explanation": "Конфликт считается решённым после проверки и `git add`."
}
```

## Куда дальше

- [Rebase vs merge](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/rebase-vs-merge.md)
- [Интерактивный rebase](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/interaktivnyy-rebase.md)
- [Merge three-way](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/merge-three-way.md)
