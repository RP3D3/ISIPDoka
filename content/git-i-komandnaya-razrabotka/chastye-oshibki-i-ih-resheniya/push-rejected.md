---
title: Push rejected
description: Почему Git отклоняет push и как синхронизироваться без потери работы.
keywords: push rejected, non-fast-forward, force-with-lease, fetch, rebase, protected branch

---

# Push rejected

`push` может быть отклонён по нескольким причинам. Важно понять причину,
а не сразу использовать `--force`.

## Причина 1: non-fast-forward

Удалённая ветка ушла вперёд. Git не хочет перезаписывать чужие коммиты.

```bash
git fetch origin
git rebase origin/main
git push
```

Или merge, если ветка общая.

## Причина 2: защищённая ветка

Прямой push в `main` может быть запрещён. Нужно создать ветку и PR.

## Причина 3: нет прав

Проверьте, что пушите в свой репозиторий и у вас есть доступ.

## Причина 4: hook или политика

Сервер может отклонять коммиты без подписи, с большими файлами или
неверным сообщением. Прочитайте текст ошибки.

## Force push

Если вы точно переписали свою личную ветку:

```bash
git push --force-with-lease
```

`--force-with-lease` безопаснее обычного `--force`: он не перезапишет
чужие изменения, если они появились.

## Частые ошибки

- **Сразу `push --force`.** Можно потерять чужую работу.
- **`pull` без понимания merge/rebase.**
- **Пушить в чужой upstream.**
- **Игнорировать текст ошибки.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать при non-fast-forward?",
  "options": [
    {
      "text": "Синхронизироваться через fetch и rebase/merge",
      "correct": true,
      "explanation": "Сначала получить чужие изменения."
    },
    {
      "text": "Сразу сделать `push --force`",
      "correct": false,
      "explanation": "Это может перезаписать чужую работу."
    },
    {
      "text": "Удалить `.git`",
      "correct": false,
      "explanation": "Это уничтожит репозиторий."
    }
  ],
  "explanation": "Push отклонён, потому что история разошлась."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что может быть причиной отказа push?",
  "options": [
    {
      "text": "Non-fast-forward",
      "correct": true
    },
    {
      "text": "Защищённая ветка",
      "correct": true
    },
    {
      "text": "Нет прав доступа",
      "correct": true
    },
    {
      "text": "Слишком короткое имя ветки",
      "correct": false,
      "explanation": "Это не причина отказа."
    }
  ],
  "explanation": "Причина всегда написана в ошибке."
}
```

## Куда дальше

- [Detached HEAD](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/detached-head.md)
- [Секреты в истории](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/sekrety-v-istorii.md)
- [fetch, pull и push](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/fetch-pull-push.md)
