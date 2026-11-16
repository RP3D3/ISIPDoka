---
title: branch и switch
description: Создание, переключение и удаление веток без путаницы с checkout.
keywords: git branch, git switch, git checkout, создание ветки, удаление ветки

---

# branch и switch

`git branch` управляет ветками, `git switch` переключает текущую ветку.
Раньше для обоих использовали `git checkout`, но `switch` понятнее.

## Посмотреть ветки

```bash
git branch
git branch -a
```

`-a` показывает и локальные, и удалённые ветки.

## Создать ветку

```bash
git branch feature/login
```

Ветка создана, но вы остались на текущей. Чтобы сразу переключиться:

```bash
git switch -c feature/login
```

## Переключиться

```bash
git switch main
```

Перед переключением Git может попросить закоммитить или убрать
изменения, если они конфликтуют с другой веткой.

## Удалить ветку

```bash
git branch -d feature/login
```

`-d` удаляет только слитую ветку. Для неслитой нужно `-D`, но это
потенциально опасно.

## Частые ошибки

- **Путать `git branch` и `git switch`.** Первая создаёт/показывает,
  вторая переключает.
- **Удалять неслитую ветку без проверки.** Коммиты можно потерять.
- **Работать в ветке с грязной рабочей копией.** Переключение может
  конфликтовать.
- **Давать веткам имена вроде `test`.** Непонятно, что внутри.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `git switch -c feature/login`?",
  "options": [
    {
      "text": "Создаёт ветку и переключается на неё",
      "correct": true,
      "explanation": "`-c` означает create."
    },
    {
      "text": "Удаляет ветку",
      "correct": false,
      "explanation": "Для удаления есть `-d`."
    },
    {
      "text": "Сливает ветку с main",
      "correct": false,
      "explanation": "Для этого нужен `git merge`."
    }
  ],
  "explanation": "`switch -c` создаёт и переключает."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про ветки?",
  "options": [
    {
      "text": "`git branch` показывает локальные ветки",
      "correct": true
    },
    {
      "text": "`git branch -a` показывает и удалённые",
      "correct": true
    },
    {
      "text": "`git branch -d` удаляет слитую ветку",
      "correct": true
    },
    {
      "text": "`git switch` создаёт коммит",
      "correct": false,
      "explanation": "Коммит создаёт `git commit`."
    }
  ],
  "explanation": "Branch и switch управляют ссылками, а не историей."
}
```

## Куда дальше

- [Merge fast-forward](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/merge-fast-forward.md)
- [Merge three-way](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/merge-three-way.md)
- [Ветка как указатель](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/vetka-kak-ukazatel.md)
