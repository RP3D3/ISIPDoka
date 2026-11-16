---
title: fetch, pull и push
description: Чем fetch отличается от pull, как отправлять изменения и почему push иногда отклоняют.
keywords: git fetch, git pull, git push, origin, upstream, push rejected

---

# fetch, pull и push

Три команды отвечают за обмен с удалённым репозиторием:

- `fetch` — скачать изменения, не меняя рабочую копию;
- `pull` — скачать и сразу влить в текущую ветку;
- `push` — отправить локальные коммиты.

## `git fetch`

```bash
git fetch origin
```

Обновляет удалённые ссылки. Рабочая копия и текущая ветка не меняются.
Это безопасный способ посмотреть, что нового.

## `git pull`

```bash
git pull
```

Обычно это `fetch` + `merge`. В некоторых настройках — `fetch` + `rebase`.

Перед `pull` лучше закоммитить или убрать локальные изменения, иначе
merge может конфликтовать.

## `git push`

```bash
git push
git push -u origin feature/login
```

`-u` связывает локальную ветку с удалённой, чтобы потом хватало просто
`git push`.

## Почему push отклонён

Если удалённая ветка ушла вперёд, Git не даст перезаписать её без
явного указания. Сначала:

```bash
git pull --rebase
git push
```

`--force` используйте только осознанно и лучше с
`--force-with-lease`.

## Частые ошибки

- **Делать `pull` с грязной рабочей копией.**
- **Использовать `push --force` в общей ветке.**
- **Пушить не ту ветку.**
- **Забывать `-u` при первом push.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем `fetch` отличается от `pull`?",
  "options": [
    {
      "text": "Fetch не меняет текущую ветку, pull сразу вливает изменения",
      "correct": true,
      "explanation": "Fetch безопаснее для просмотра."
    },
    {
      "text": "Fetch отправляет коммиты",
      "correct": false,
      "explanation": "Отправляет push."
    },
    {
      "text": "Pull удаляет remote",
      "correct": false,
      "explanation": "Он обновляет данные."
    }
  ],
  "explanation": "Fetch только скачивает, pull ещё и сливает."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что делать, если push отклонён?",
  "options": [
    {
      "text": "Сделать `fetch`",
      "correct": true
    },
    {
      "text": "Влить изменения через `pull --rebase` или merge",
      "correct": true
    },
    {
      "text": "Проверить, что пушите свою ветку",
      "correct": true
    },
    {
      "text": "Сразу сделать `push --force`",
      "correct": false,
      "explanation": "Это может перезаписать чужую работу."
    }
  ],
  "explanation": "Сначала синхронизация, потом push."
}
```

## Куда дальше

- [Tracking branches](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/tracking-branches.md)
- [Fork и upstream](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/fork-i-upstream.md)
- [Push rejected](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/push-rejected.md)
