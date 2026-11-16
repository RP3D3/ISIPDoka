---
title: Detached HEAD
description: Что значит detached HEAD, как сохранить работу и вернуться на ветку.
keywords: detached HEAD, HEAD, git switch, git branch, потерянные коммиты

---

# Detached HEAD

Detached HEAD означает, что `HEAD` указывает напрямую на коммит, а не на
ветку. Это часто случается после `checkout <hash>` или `rebase`.

## Как понять

```bash
git status
```

Git предупредит: `HEAD detached at ...`.

## Что можно делать

Можно смотреть код, запускать тесты, делать эксперименты. Но новые
коммиты не привязаны к ветке.

## Сохранить работу

```bash
git switch -c experiment
```

Теперь коммиты будут в новой ветке.

## Вернуться на ветку

```bash
git switch main
```

Если в detached HEAD были коммиты, они останутся в reflog, но лучше
сразу создать ветку.

## Частые ошибки

- **Коммитить и переключаться без ветки.** Коммиты легко потерять.
- **Паниковать.** Reflog обычно помогает.
- **Удалять `.git`.**
- **Путать detached HEAD с ошибкой.** Это нормальное состояние.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое detached HEAD?",
  "options": [
    {
      "text": "HEAD указывает на коммит, а не на ветку",
      "correct": true,
      "explanation": "Новые коммиты не привязаны к ветке."
    },
    {
      "text": "Ветка удалена",
      "correct": false,
      "explanation": "Это другое состояние."
    },
    {
      "text": "Репозиторий повреждён",
      "correct": false,
      "explanation": "Это нормальное состояние."
    }
  ],
  "explanation": "Detached HEAD — это позиция, а не поломка."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что делать в detached HEAD?",
  "options": [
    {
      "text": "Создать ветку, если нужны коммиты",
      "correct": true
    },
    {
      "text": "Вернуться на main через switch",
      "correct": true
    },
    {
      "text": "Использовать reflog, если коммит потерян",
      "correct": true
    },
    {
      "text": "Удалить `.git`",
      "correct": false,
      "explanation": "Это уничтожит историю."
    }
  ],
  "explanation": "Detached HEAD управляем, если действовать спокойно."
}
```

## Куда дальше

- [Секреты в истории](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/sekrety-v-istorii.md)
- [Ошибки rebase](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/oshibki-rebase.md)
- [reflog](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/reflog.md)
