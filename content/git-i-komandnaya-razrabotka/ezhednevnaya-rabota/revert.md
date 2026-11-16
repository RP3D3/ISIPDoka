---
title: revert
description: Безопасная отмена коммита в общей истории через создание обратного коммита.
keywords: git revert, отмена коммита, revert merge, публичная история, безопасный откат

---

# revert

`git revert` создаёт новый коммит, который отменяет изменения
указанного коммита. История не переписывается.

## Базовый пример

```bash
git revert HEAD
```

Git создаст коммит с обратными изменениями. Если конфликтов нет, всё
произойдёт автоматически.

## Почему это безопасно

`reset` удаляет коммит из истории. Если коммит уже в общей ветке,
коллеги останутся со старой историей.

`revert` добавляет новый коммит. Все видят, что отмена была, и история
остаётся общей.

## Отмена merge

```bash
git revert -m 1 <merge-commit>
```

`-m 1` указывает, какую сторону слияния считать основной. Это стоит
делать осознанно: повторный merge может потребовать дополнительных
действий.

## Частые ошибки

- **Использовать reset вместо revert в общей ветке.** История
  расходится.
- **Отменять merge без понимания `-m`.** Можно получить неожиданный
  результат.
- **Забывать про конфликты.** Revert может потребовать ручного
  разрешения.
- **Не проверять, что именно отменяется.** Смотрите `git show`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем revert отличается от reset?",
  "options": [
    {
      "text": "Revert создаёт новый коммит с отменой, не переписывая историю",
      "correct": true,
      "explanation": "Это безопасно для общей ветки."
    },
    {
      "text": "Revert удаляет коммит из истории",
      "correct": false,
      "explanation": "Это делает reset."
    },
    {
      "text": "Revert работает только с файлами",
      "correct": false,
      "explanation": "Revert работает с коммитами."
    }
  ],
  "explanation": "Revert дополняет историю обратным коммитом."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Когда стоит выбрать revert?",
  "options": [
    {
      "text": "Коммит уже в общей ветке",
      "correct": true
    },
    {
      "text": "Нужно сохранить историю отмены",
      "correct": true
    },
    {
      "text": "Нужно отменить merge-коммит",
      "correct": true
    },
    {
      "text": "Нужно удалить незакоммиченные файлы",
      "correct": false,
      "explanation": "Для этого есть clean/restore."
    }
  ],
  "explanation": "Revert — безопасный способ отмены в команде."
}
```

## Куда дальше

- [clean](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/clean.md)
- [stash](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/stash.md)
- [reset](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/reset.md)
