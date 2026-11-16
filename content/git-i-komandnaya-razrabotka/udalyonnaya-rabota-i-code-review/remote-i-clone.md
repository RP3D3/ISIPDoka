---
title: remote и clone
description: Как подключить удалённый репозиторий, клонировать проект и смотреть список remote.
keywords: git remote, git clone, origin, удалённый репозиторий, SSH, HTTPS

---

# remote и clone

Удалённый репозиторий — это копия истории на сервере. Обычно она
называется `origin`. `git clone` создаёт локальную копию вместе с
настройкой remote.

## Клонирование

```bash
git clone https://github.com/user/project.git
```

Или по SSH:

```bash
git clone git@github.com:user/project.git
```

Git создаст папку проекта, скачает историю и настроит `origin`.

## Посмотреть remote

```bash
git remote -v
```

Вы увидите имя и URL для fetch и push.

## Добавить remote вручную

```bash
git remote add origin <url>
```

Это нужно, если репозиторий создан локально, а потом появился сервер.

## Изменить URL

```bash
git remote set-url origin <new-url>
```

Полезно при переходе с HTTPS на SSH.

## Частые ошибки

- **Клонировать не ту папку.** Проверьте URL и имя проекта.
- **Путать `origin` и `upstream`.** `origin` — ваш форк, `upstream` —
  исходный проект.
- **Хранить пароль в URL.** Используйте SSH или токен-хранилище.
- **Менять URL, не проверив доступ.** Сначала `git fetch`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `git clone`?",
  "options": [
    {
      "text": "Создаёт локальную копию удалённого репозитория",
      "correct": true,
      "explanation": "Вместе с историей и remote."
    },
    {
      "text": "Создаёт новый коммит",
      "correct": false,
      "explanation": "Коммит создаёт `git commit`."
    },
    {
      "text": "Удаляет удалённый репозиторий",
      "correct": false,
      "explanation": "Clone только читает."
    }
  ],
  "explanation": "Clone — это копирование репозитория."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про remote?",
  "options": [
    {
      "text": "`origin` — обычное имя основного remote",
      "correct": true
    },
    {
      "text": "`git remote -v` показывает URL",
      "correct": true
    },
    {
      "text": "URL можно изменить через `set-url`",
      "correct": true
    },
    {
      "text": "Remote хранит только ваши локальные коммиты",
      "correct": false,
      "explanation": "Это копия на сервере."
    }
  ],
  "explanation": "Remote — это ссылка на удалённую копию."
}
```

## Куда дальше

- [fetch, pull и push](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/fetch-pull-push.md)
- [Tracking branches](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/tracking-branches.md)
- [Pull request](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/pull-request.md)
