---
title: Коммит не в ту ветку
description: Что делать, если коммит оказался в main или в чужой ветке.
keywords: коммит не в ту ветку, cherry-pick, reset, revert, ошибки Git

---

# Коммит не в ту ветку

Ситуация: вы сделали коммит в `main`, хотя должны были в feature-ветку.
Главное — понять, был ли коммит уже отправлен.

## Если коммит не отправлен

1. Создайте правильную ветку с текущего коммита.
2. Верните main на предыдущий коммит.

```bash
git branch feature/my-task
git reset --hard HEAD~1
git switch feature/my-task
```

Коммит останется в новой ветке.

## Если коммит уже отправлен

Не делайте `reset` общей ветки. Используйте `revert`:

```bash
git revert <commit>
```

А нужное изменение перенесите через cherry-pick:

```bash
git switch feature/my-task
git cherry-pick <commit>
```

## Если коммитов несколько

Можно перенести диапазон:

```bash
git cherry-pick main~3..main
```

Но проверьте, что не захватили лишнее.

## Частые ошибки

- **Делать `reset --hard` в main, который уже используют.**
- **Забыть создать ветку перед reset.**
- **Переносить коммит cherry-pick, не проверив конфликты.**
- **Путать локальную и удалённую ветку.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что сделать, если коммит уже в общей ветке?",
  "options": [
    {
      "text": "Отменить через revert и перенести изменение в нужную ветку",
      "correct": true,
      "explanation": "Это не переписывает общую историю."
    },
    {
      "text": "Сделать `reset --hard`",
      "correct": false,
      "explanation": "Это сломает историю у коллег."
    },
    {
      "text": "Удалить `.git`",
      "correct": false,
      "explanation": "Это уничтожит репозиторий."
    }
  ],
  "explanation": "Для общей ветки используйте revert."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что может помочь перенести коммит?",
  "options": [
    {
      "text": "Создать ветку на текущем коммите",
      "correct": true
    },
    {
      "text": "`cherry-pick`",
      "correct": true
    },
    {
      "text": "`revert` для общей ветки",
      "correct": true
    },
    {
      "text": "`clean -fd`",
      "correct": false,
      "explanation": "Он удаляет неотслеживаемые файлы."
    }
  ],
  "explanation": "Выбор зависит от того, опубликован ли коммит."
}
```

## Куда дальше

- [Потерянные коммиты](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/poteryannye-kommitty.md)
- [Конфликт слияния](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/konflikt-sliyaniya.md)
- [Push rejected](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/push-rejected.md)
