---
title: Потерянные изменения
description: Куда исчезают незакоммиченные правки после checkout, restore и stash.
keywords: потерянные изменения, stash, checkout, restore, незакоммиченные файлы

---

# Потерянные изменения

Незакоммиченные изменения не хранятся в истории. Если их перезаписать,
Git не всегда сможет помочь.

## Где искать

- в редакторе (local history, undo);
- в `git stash list`;
- в `git reflog`, если были коммиты;
- в резервных копиях IDE.

## Что могло произойти

- `git restore file` перезаписал файл;
- `git checkout branch` убрал изменения;
- `git reset --hard` удалил правки;
- `git clean -fd` удалил новые файлы.

## Как не терять

- коммитить чаще;
- использовать `stash` перед переключением;
- делать резервную ветку;
- проверять `git status` перед опасной командой.

## Частые ошибки

- **Долго работать без коммитов.**
- **Использовать `reset --hard` без бэкапа.**
- **Забыть про stash.**
- **Игнорировать предупреждения Git.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где могут быть временно убранные изменения?",
  "options": [
    {
      "text": "В `git stash list`",
      "correct": true,
      "explanation": "Stash хранит такие изменения."
    },
    {
      "text": "В `.gitignore`",
      "correct": false,
      "explanation": "Это список игнорируемых файлов."
    },
    {
      "text": "В `git tag`",
      "correct": false,
      "explanation": "Теги — метки релизов."
    }
  ],
  "explanation": "Stash — одно из мест, где могут быть изменения."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Как снизить риск потери?",
  "options": [
    {
      "text": "Коммитить чаще",
      "correct": true
    },
    {
      "text": "Использовать stash",
      "correct": true
    },
    {
      "text": "Делать резервную ветку",
      "correct": true
    },
    {
      "text": "Работать без коммитов неделями",
      "correct": false,
      "explanation": "Это увеличивает риск."
    }
  ],
  "explanation": "Регулярные коммиты и stash защищают работу."
}
```

## Куда дальше

- [Командные ошибки](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/komandnye-oshibki.md)
- [Частые ошибки и их решения](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/chastye-oshibki-i-ih-resheniya.md)
- [stash](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/stash.md)
