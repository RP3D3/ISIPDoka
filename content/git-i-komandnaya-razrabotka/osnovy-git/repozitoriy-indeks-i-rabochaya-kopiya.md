---
title: Репозиторий, индекс и рабочая копия
description: Три области Git: файлы на диске, staging area и история коммитов.
keywords: репозиторий, индекс, staging area, рабочая копия, git init, .git

---

# Репозиторий, индекс и рабочая копия

В Git есть три важные области:

1. **Рабочая копия** — обычные файлы на диске.
2. **Индекс** (staging area) — то, что попадёт в следующий коммит.
3. **Репозиторий** — история коммитов внутри папки `.git`.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/git-i-komandnaya-razrabotka/_assets/osnovy-git/git-model.svg"
    alt="Схема пути изменений от рабочей копии через индекс к репозиторию"
    width="900"
  >
  <figcaption>
    Изменения попадают в коммит только через индекс.
  </figcaption>
</figure>

## Рабочая копия

Это файлы, которые вы редактируете. Git видит изменения, но не
фиксирует их автоматически. Пока файл не добавлен в индекс, он не
попадёт в коммит.

## Индекс

Индекс — промежуточный слой. Он позволяет собрать коммит из выбранных
изменений, а не из всего, что есть на диске.

```bash
git add app.py
git status
```

После `git add` файл находится в индексе. Можно продолжить редактировать
рабочую копию: в индексе останется версия на момент добавления.

## Репозиторий

История хранится в папке `.git`. Её не редактируют вручную. Внутри —
объекты коммитов, ссылки на ветки и настройки репозитория.

```bash
git log --oneline
```

## Частые ошибки

- **Редактируют `.git` вручную.** Это ломает репозиторий.
- **Думают, что `git add` уже сохранил историю.** Нет, нужен `commit`.
- **Коммитят всё подряд.** В индекс попадает мусор и секреты.
- **Путают рабочую копию и индекс.** `git diff` и `git diff --staged`
  показывают разные вещи.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое индекс в Git?",
  "options": [
    {
      "text": "Промежуточная область, из которой собирается коммит",
      "correct": true,
      "explanation": "Индекс ещё называют staging area."
    },
    {
      "text": "Папка с резервными копиями",
      "correct": false,
      "explanation": "Резервные копии Git не делает автоматически."
    },
    {
      "text": "Удалённый репозиторий",
      "correct": false,
      "explanation": "Это отдельная копия истории."
    }
  ],
  "explanation": "Индекс позволяет выбрать изменения для коммита."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про три области Git?",
  "options": [
    {
      "text": "Рабочая копия — файлы на диске",
      "correct": true
    },
    {
      "text": "Индекс — то, что попадёт в следующий коммит",
      "correct": true
    },
    {
      "text": "История хранится в `.git`",
      "correct": true
    },
    {
      "text": "`git add` создаёт коммит",
      "correct": false,
      "explanation": "Коммит создаёт `git commit`."
    }
  ],
  "explanation": "Три области разделяют редактирование, подготовку и историю."
}
```

## Куда дальше

- [Первый коммит](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/pervyy-kommit.md)
- [Состояния файлов и history](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/sostoyaniya-faylov-i-history.md)
- [Установка и настройка](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/ustanovka-i-nastroyka.md)
