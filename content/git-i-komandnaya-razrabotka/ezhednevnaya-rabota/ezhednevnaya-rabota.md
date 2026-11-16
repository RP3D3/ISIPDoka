---
title: Ежедневная работа
description: Итог группы: как читать состояние, собирать коммиты и безопасно отменять изменения.
keywords: ежедневная работа, Git, status, commit, restore, reset, revert, stash

---

# Ежедневная работа

Эта группа — про то, что делается каждый день: посмотреть состояние,
подготовить коммит, отменить ошибку и переключить контекст.

## Базовый ритм

```bash
git status
git diff
git add -p
git diff --staged
git commit -m "Explain change"
```

## Что выбрать для отмены

| Задача | Команда |
|---|---|
| Убрать файл из индекса | `git restore --staged` |
| Вернуть файл из коммита | `git restore` |
| Убрать локальный коммит | `git reset` |
| Отменить коммит в общей ветке | `git revert` |
| Удалить неотслеживаемые файлы | `git clean` |
| Временно убрать изменения | `git stash` |

## Главное правило

Перед любой отменой посмотрите, что именно изменится:

```bash
git status
git diff
git log --oneline
```

Если сомневаетесь — создайте резервную ветку.

## Частые ошибки

- **`reset --hard` без резервной копии.**
- **`clean -fd` без `-n`.**
- **`revert` и `reset` в общей ветке без понимания разницы.**
- **Stash как долговременный архив.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем безопасно отменить коммит в общей ветке?",
  "options": [
    {
      "text": "`git revert`",
      "correct": true,
      "explanation": "Он создаёт обратный коммит."
    },
    {
      "text": "`git reset --hard`",
      "correct": false,
      "explanation": "Он переписывает историю."
    },
    {
      "text": "`git clean -fd`",
      "correct": false,
      "explanation": "Он удаляет неотслеживаемые файлы."
    }
  ],
  "explanation": "Revert сохраняет общую историю."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что стоит сделать перед опасной отменой?",
  "options": [
    {
      "text": "Посмотреть `git status`",
      "correct": true
    },
    {
      "text": "Проверить `git diff`",
      "correct": true
    },
    {
      "text": "Создать резервную ветку",
      "correct": true
    },
    {
      "text": "Сразу выполнить `reset --hard`",
      "correct": false,
      "explanation": "Сначала диагностика."
    }
  ],
  "explanation": "Безопасность начинается с проверки состояния."
}
```

## Куда дальше

- [Практика: отмена изменений](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/praktika-otmena-izmeneniy.md)
- [Ветки и слияния](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/vetka-kak-ukazatel.md)
- [Частые ошибки и их решения](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/poteryannye-kommitty.md)
