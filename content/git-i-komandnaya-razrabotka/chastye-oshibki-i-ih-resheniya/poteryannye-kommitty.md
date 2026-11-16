---
title: Потерянные коммиты
description: Как восстановить коммит после reset --hard, rebase или удаления ветки.
keywords: потерянные коммиты, reset --hard, reflog, ORIG_HEAD, восстановление

---

# Потерянные коммиты

Коммит почти никогда не исчезает сразу. Git хранит ссылки в reflog, и
обычно его можно вернуть.

## Первое действие

```bash
git reflog
```

Найдите строку перед опасной операцией:

```text
a1b2c3d HEAD@{0}: reset: moving to HEAD~1
d4e5f6g HEAD@{1}: commit: Add feature
```

## Восстановить

```bash
git branch rescue d4e5f6g
```

Или переместить текущую ветку:

```bash
git reset --hard d4e5f6g
```

Но `reset --hard` снова опасен. Лучше сначала создать ветку.

## `ORIG_HEAD`

После merge и rebase Git может сохранить предыдущее состояние в
`ORIG_HEAD`:

```bash
git reset --hard ORIG_HEAD
```

## Если коммит был в удалённой ветке

Можно поискать по reflog удалённых ссылок или в интерфейсе платформы.
Иногда помогает `git fsck --lost-found`.

## Частые ошибки

- **Сразу делать новые коммиты поверх.** Сначала восстановите.
- **Удалять `.git`.**
- **Паниковать и делать `reset --hard` снова.**
- **Забыть, что reflog локальный.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где искать потерянный коммит?",
  "options": [
    {
      "text": "В `git reflog`",
      "correct": true,
      "explanation": "Там журнал перемещений HEAD."
    },
    {
      "text": "В `git status`",
      "correct": false,
      "explanation": "Он показывает текущее состояние."
    },
    {
      "text": "В `.gitignore`",
      "correct": false,
      "explanation": "Это список игнорируемых файлов."
    }
  ],
  "explanation": "Reflog — первый инструмент восстановления."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает восстановить коммит?",
  "options": [
    {
      "text": "`git reflog`",
      "correct": true
    },
    {
      "text": "Создать ветку на старом хеше",
      "correct": true
    },
    {
      "text": "`ORIG_HEAD` после rebase/merge",
      "correct": true
    },
    {
      "text": "Удалить `.git`",
      "correct": false,
      "explanation": "Это уничтожит историю."
    }
  ],
  "explanation": "Восстановление требует спокойствия и reflog."
}
```

## Куда дальше

- [Конфликт слияния](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/konflikt-sliyaniya.md)
- [Push rejected](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/push-rejected.md)
- [reflog](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/reflog.md)
