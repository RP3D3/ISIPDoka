---
title: Практика: отмена изменений
description: Упражнения с restore, reset, revert, clean и stash на учебном репозитории.
keywords: практика Git, отмена изменений, restore, reset, revert, clean, stash

---

# Практика: отмена изменений

Сделайте учебный репозиторий и отработайте безопасные отмены.

## Подготовка

```bash
mkdir undo-practice
cd undo-practice
git init
echo "v1" > app.txt
git add app.txt
git commit -m "Add app v1"
```

## 1. Убрать из индекса

```bash
echo "v2" >> app.txt
git add app.txt
git restore --staged app.txt
git status
```

Изменение осталось на диске, но больше не подготовлено.

## 2. Вернуть файл

```bash
git restore app.txt
cat app.txt
```

Файл вернулся к версии из коммита.

## 3. Отменить локальный коммит

```bash
echo "v3" >> app.txt
git add app.txt
git commit -m "Add v3"
git reset --soft HEAD~1
git status
```

Коммит исчез, изменение осталось в индексе.

## 4. Безопасно отменить коммит

```bash
git commit -m "Add v3"
git revert HEAD
git log --oneline
```

Появился обратный коммит.

## 5. Stash

```bash
echo "temp" >> app.txt
git stash push -m "WIP"
git status
git stash pop
```

## Что проверить

- [ ] Понимаете разницу `restore` и `restore --staged`.
- [ ] Умеете отменять локальный коммит через `reset`.
- [ ] Умеете отменять публичный коммит через `revert`.
- [ ] Умеете временно убрать изменения через `stash`.

## Частые ошибки

- **Путать `reset` и `revert`.**
- **Забыть `--staged`.**
- **Использовать `clean` без `-n`.**
- **Не проверять `git status` после каждого шага.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как безопасно отменить уже опубликованный коммит?",
  "options": [
    {
      "text": "`git revert`",
      "correct": true,
      "explanation": "Он создаёт обратный коммит."
    },
    {
      "text": "`git reset --hard`",
      "correct": false,
      "explanation": "Он переписывает историю."
    },
    {
      "text": "`git clean -fd`",
      "correct": false,
      "explanation": "Он удаляет неотслеживаемые файлы."
    }
  ],
  "explanation": "Revert безопасен для общей истории."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что отрабатывает практика?",
  "options": [
    {
      "text": "Убрать файл из индекса",
      "correct": true
    },
    {
      "text": "Вернуть файл из коммита",
      "correct": true
    },
    {
      "text": "Временно убрать изменения",
      "correct": true
    },
    {
      "text": "Удалить удалённый репозиторий",
      "correct": false,
      "explanation": "Это не входит в упражнение."
    }
  ],
  "explanation": "Практика покрывает основные безопасные отмены."
}
```

## Куда дальше

- [Ежедневная работа](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/ezhednevnaya-rabota.md)
- [Ветки и слияния](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/vetka-kak-ukazatel.md)
- [Частые ошибки и их решения](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/poteryannye-kommitty.md)
