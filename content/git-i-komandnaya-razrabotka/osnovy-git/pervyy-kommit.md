---
title: Первый коммит
description: От пустой папки до первого коммита: init, status, add, commit, log.
keywords: первый коммит, git init, git add, git commit, git log, репозиторий

---

# Первый коммит

Первый коммит — это точка, с которой начинается история проекта. Он не
обязан быть идеальным, но должен быть понятным.

## Создать репозиторий

```bash
mkdir my-project
cd my-project
git init
```

Git создаст скрытую папку `.git`. Теперь папка стала репозиторием.

## Создать файл

```bash
echo "# My project" > README.md
git status
```

`git status` покажет, что файл ещё не отслеживается.

## Добавить в индекс

```bash
git add README.md
git status
```

Файл перешёл в состояние staged. Теперь его можно закоммитить.

## Сделать коммит

```bash
git commit -m "Add project README"
```

Сообщение должно объяснять, **что** и **зачем** изменено. «Update» или
«fix» без контекста плохо помогают через месяц.

## Проверить историю

```bash
git log --oneline
```

Вы увидите хеш коммита и сообщение.

## Частые ошибки

- **Коммитят пустой репозиторий.** Сначала добавьте хотя бы один файл.
- **Пишут сообщение «update».** Через месяц непонятно, что обновилось.
- **Добавляют в коммит всё.** Проверяйте `git status` перед `commit`.
- **Забывают про `.gitignore`.** В историю попадают временные файлы.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какая команда создаёт коммит?",
  "options": [
    {
      "text": "`git commit`",
      "correct": true,
      "explanation": "Она фиксирует индекс в истории."
    },
    {
      "text": "`git add`",
      "correct": false,
      "explanation": "Она только добавляет изменения в индекс."
    },
    {
      "text": "`git init`",
      "correct": false,
      "explanation": "Она создаёт репозиторий."
    }
  ],
  "explanation": "Коммит создаёт `git commit`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что стоит проверить перед первым коммитом?",
  "options": [
    {
      "text": "`git status`",
      "correct": true
    },
    {
      "text": "Что в индекс не попали лишние файлы",
      "correct": true
    },
    {
      "text": "Понятное сообщение коммита",
      "correct": true
    },
    {
      "text": "Что все секреты добавлены в репозиторий",
      "correct": false,
      "explanation": "Секреты как раз не должны попадать в Git."
    }
  ],
  "explanation": "Первый коммит должен быть чистым и понятным."
}
```

## Куда дальше

- [Состояния файлов и history](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/sostoyaniya-faylov-i-history.md)
- [.gitignore](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/gitignore.md)
- [Репозиторий, индекс и рабочая копия](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/repozitoriy-indeks-i-rabochaya-kopiya.md)
