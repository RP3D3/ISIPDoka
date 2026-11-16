---
title: Ветка как указатель
description: Почему ветка в Git — это подвижная ссылка на коммит, а не копия папки.
keywords: ветка Git, branch, HEAD, указатель, коммит, граф

---

# Ветка как указатель

Ветка в Git — это не копия проекта и не отдельная папка. Это **указатель
на коммит**, который перемещается при новом коммите.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/git-i-komandnaya-razrabotka/_assets/vetki-i-sliyaniya/git-graph.svg"
    alt="Граф коммитов и веток Git"
    width="900"
  >
  <figcaption>
    Ветка — подпись на коммите. Коммиты образуют граф.
  </figcaption>
</figure>

## `HEAD`

`HEAD` — указатель на текущую ветку или коммит. Когда вы делаете новый
коммит, ветка сдвигается вперёд, а `HEAD` остаётся на ней.

```bash
git status
git branch --show-current
```

## Что происходит при создании ветки

```bash
git branch feature
```

Git создаёт новый указатель на тот же коммит. Файлы не копируются.
Поэтому создание ветки почти мгновенное.

## Удаление ветки

Удаление ветки удаляет указатель, но не коммиты, если на них есть другие
ссылки. Коммиты, на которые никто не ссылается, со временем может
удалить сборщик мусора.

## Detached HEAD

Если `HEAD` указывает напрямую на коммит, а не на ветку, вы в detached
HEAD. Новые коммиты не привязаны к ветке. Это нормально для просмотра,
но опасно для работы без создания ветки.

## Частые ошибки

- **Думать, что ветка копирует файлы.** Это только указатель.
- **Удалять ветку с единственной ссылкой на коммиты.** Они могут стать
  недоступны.
- **Работать в detached HEAD и терять коммиты.**
- **Путать ветку и удалённую ветку.** Это разные ссылки.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое ветка в Git?",
  "options": [
    {
      "text": "Подвижный указатель на коммит",
      "correct": true,
      "explanation": "Она перемещается при новых коммитах."
    },
    {
      "text": "Копия всех файлов проекта",
      "correct": false,
      "explanation": "Файлы не копируются."
    },
    {
      "text": "Удалённый сервер",
      "correct": false,
      "explanation": "Это remote."
    }
  ],
  "explanation": "Ветка — ссылка, а не папка."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про HEAD?",
  "options": [
    {
      "text": "Указывает на текущую ветку или коммит",
      "correct": true
    },
    {
      "text": "Может быть в detached state",
      "correct": true
    },
    {
      "text": "Перемещается при переключении ветки",
      "correct": true
    },
    {
      "text": "Хранит все файлы проекта",
      "correct": false,
      "explanation": "Файлы хранятся в рабочей копии."
    }
  ],
  "explanation": "HEAD — это текущая позиция в истории."
}
```

## Куда дальше

- [branch и switch](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/branch-i-switch.md)
- [Merge fast-forward](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/merge-fast-forward.md)
- [Конфликты слияния](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/konflikty.md)
