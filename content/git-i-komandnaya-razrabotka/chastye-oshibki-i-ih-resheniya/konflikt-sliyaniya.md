---
title: Конфликт слияния
description: Пошаговый разбор конфликта: маркеры, выбор версии, завершение и отмена.
keywords: конфликт слияния, merge conflict, маркеры, git add, merge --abort

---

# Конфликт слияния

Конфликт — это не поломка, а место, где Git нужен человек. Главное —
понять, какие изменения нужно сохранить.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/git-i-komandnaya-razrabotka/_assets/chastye-oshibki-i-ih-resheniya/incident-flow.svg"
    alt="Разбор инцидента: симптом, диагностика, исправление, профилактика"
    width="900"
  >
  <figcaption>
    Конфликт решается по шагам, а не паникой.
  </figcaption>
</figure>

## 1. Понять, где конфликт

```bash
git status
```

Git покажет файлы в состоянии `both modified`.

## 2. Открыть файл

```text
<<<<<<< HEAD
наша версия
=======
их версия
>>>>>>> feature/login
```

## 3. Выбрать результат

Можно оставить одну сторону, объединить обе или написать новую версию.
Маркеры нужно убрать полностью.

## 4. Завершить

```bash
git add file.txt
git commit
```

При rebase:

```bash
git add file.txt
git rebase --continue
```

## 5. Отменить

```bash
git merge --abort
```

## Частые ошибки

- **Оставить маркеры в коде.**
- **Выбрать сторону, не поняв последствий.**
- **Забыть `git add`.**
- **Удалить `.git` вместо abort.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать после ручного разрешения конфликта?",
  "options": [
    {
      "text": "Добавить файл в индекс и завершить merge",
      "correct": true,
      "explanation": "Git должен узнать, что конфликт решён."
    },
    {
      "text": "Оставить маркеры",
      "correct": false,
      "explanation": "Код сломается."
    },
    {
      "text": "Удалить репозиторий",
      "correct": false,
      "explanation": "Это не решение."
    }
  ],
  "explanation": "После правки нужен `git add`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про конфликт?",
  "options": [
    {
      "text": "Его можно отменить через `merge --abort`",
      "correct": true
    },
    {
      "text": "Маркеры нужно убрать",
      "correct": true
    },
    {
      "text": "Файл нужно добавить в индекс",
      "correct": true
    },
    {
      "text": "Конфликт решается автоматически без выбора",
      "correct": false,
      "explanation": "Git не знает, какой вариант правильный."
    }
  ],
  "explanation": "Конфликт требует осознанного выбора."
}
```

## Куда дальше

- [Push rejected](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/push-rejected.md)
- [Detached HEAD](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/detached-head.md)
- [Конфликты слияния](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/konflikty.md)
