---
title: Tracking branches
description: Как связать локальную ветку с удалённой и почему push иногда не знает, куда отправлять.
keywords: tracking branch, upstream, git branch -vv, git push -u, origin/main

---

# Tracking branches

Tracking branch — локальная ветка, связанная с удалённой. Благодаря
этому `git pull` и `git push` знают, куда обращаться.

## Посмотреть связи

```bash
git branch -vv
```

В выводе будет локальная ветка, её коммит и upstream, например
`origin/main`.

## Создать с tracking

```bash
git switch -c feature origin/feature
```

Локальная `feature` будет отслеживать `origin/feature`.

## Назначить upstream

```bash
git push -u origin feature
```

`-u` записывает связь. После этого достаточно `git push` и `git pull`.

## Если связи нет

```bash
git branch --set-upstream-to=origin/main main
```

## Частые ошибки

- **Пушить без upstream.** Git не понимает, куда отправлять.
- **Создавать локальную ветку с другим именем.** Связь придётся
  настраивать вручную.
- **Удалять удалённую ветку, забывая про локальную.**
- **Путать `origin/main` и локальную `main`.** Это разные ссылки.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое tracking branch?",
  "options": [
    {
      "text": "Локальная ветка, связанная с удалённой",
      "correct": true,
      "explanation": "Она знает свой upstream."
    },
    {
      "text": "Ветка только на сервере",
      "correct": false,
      "explanation": "Это remote branch."
    },
    {
      "text": "Тег версии",
      "correct": false,
      "explanation": "Тег — отдельная ссылка."
    }
  ],
  "explanation": "Tracking branch упрощает pull и push."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про upstream?",
  "options": [
    {
      "text": "Задаётся через `push -u`",
      "correct": true
    },
    {
      "text": "Виден в `git branch -vv`",
      "correct": true
    },
    {
      "text": "Может быть назначен через `--set-upstream-to`",
      "correct": true
    },
    {
      "text": "Нужен только для локальных веток без remote",
      "correct": false,
      "explanation": "Он как раз связывает с remote."
    }
  ],
  "explanation": "Upstream связывает локальную и удалённую ветки."
}
```

## Куда дальше

- [Fork и upstream](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/fork-i-upstream.md)
- [Синхронизация форка](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/sinkhronizatsiya-forks.md)
- [fetch, pull и push](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/fetch-pull-push.md)
