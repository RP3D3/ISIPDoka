---
title: add, commit и amend
description: Как собирать коммит из нужных изменений и безопасно исправлять последний коммит.
keywords: git add, git commit, git amend, commit --amend, staging, атомарный коммит

---

# add, commit и amend

Коммит должен быть атомарным: одна логическая причина изменения. Для
этого индекс собирают выборочно, а не «всем, что нашлось».

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/git-i-komandnaya-razrabotka/_assets/ezhednevnaya-rabota/file-states.svg"
    alt="Состояния файлов: untracked, modified, staged, committed"
    width="900"
  >
  <figcaption>
    `git add` переводит изменение в индекс, `git commit` фиксирует его.
  </figcaption>
</figure>

## `git add`

```bash
git add file.txt
git add src/
git add -p
```

`git add -p` позволяет выбрать отдельные куски изменений. Это полезно,
когда в файле смешаны две разные задачи.

## `git commit`

```bash
git commit -m "Add login form validation"
```

Хорошее сообщение отвечает на вопросы:

- что изменено;
- зачем;
- что это затрагивает.

## `git commit --amend`

Исправляет последний коммит: сообщение или состав файлов.

```bash
git add forgotten.txt
git commit --amend
```

Меняет только локальную историю. Если коммит уже отправлен в общую
ветку, amend создаст расхождение.

## Частые ошибки

- **Коммитить всё через `git add .`.** В коммит попадает мусор.
- **Использовать amend после push.** Коллеги получат другую историю.
- **Писать сообщение «fix».**
- **Смешивать несколько задач в одном коммите.** Сложно ревьюить и
  откатывать.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `git commit --amend`?",
  "options": [
    {
      "text": "Изменяет последний локальный коммит",
      "correct": true,
      "explanation": "Можно добавить файлы или исправить сообщение."
    },
    {
      "text": "Создаёт новую ветку",
      "correct": false,
      "explanation": "Для ветки есть `git branch`."
    },
    {
      "text": "Отправляет коммит на сервер",
      "correct": false,
      "explanation": "Для этого нужен `git push`."
    }
  ],
  "explanation": "Amend переписывает последний коммит."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что делает коммит лучше?",
  "options": [
    {
      "text": "Одна логическая причина изменения",
      "correct": true
    },
    {
      "text": "Понятное сообщение",
      "correct": true
    },
    {
      "text": "Проверка `git diff --staged`",
      "correct": true
    },
    {
      "text": "Добавление всех временных файлов",
      "correct": false,
      "explanation": "Мусор в истории не нужен."
    }
  ],
  "explanation": "Атомарность и ясность важнее количества."
}
```

## Куда дальше

- [restore](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/restore.md)
- [reset](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/reset.md)
- [status, diff и log](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/status-diff-log.md)
