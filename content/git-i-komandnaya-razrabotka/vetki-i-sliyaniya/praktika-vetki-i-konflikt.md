---
title: Практика: ветки и конфликт
description: Создайте ветку, измените один файл в двух ветках и разрешите конфликт.
keywords: практика Git, ветки, конфликт, merge, fast-forward, three-way

---

# Практика: ветки и конфликт

Цель — своими руками пройти fast-forward и конфликт.

## Подготовка

```bash
mkdir branch-practice
cd branch-practice
git init
echo "line 1" > app.txt
git add app.txt
git commit -m "Add app"
```

## 1. Fast-forward

```bash
git switch -c feature
echo "line 2" >> app.txt
git add app.txt
git commit -m "Add line 2"
git switch main
git merge feature
git log --oneline --graph
```

`main` просто сдвинулся на коммит feature.

## 2. Конфликт

```bash
git switch -c conflict
echo "feature version" > app.txt
git add app.txt
git commit -m "Feature version"

git switch main
echo "main version" > app.txt
git add app.txt
git commit -m "Main version"

git merge conflict
```

Git сообщит о конфликте.

## 3. Разрешение

Откройте `app.txt`. Вы увидите маркеры:

```text
<<<<<<< HEAD
main version
=======
feature version
>>>>>>> conflict
```

Оставьте нужный вариант, уберите маркеры, затем:

```bash
git add app.txt
git commit
```

## 4. Проверка

```bash
git log --oneline --graph
```

В истории должен появиться merge-коммит.

## Что проверить

- [ ] Понимаете, чем fast-forward отличается от three-way merge.
- [ ] Умеете читать маркеры конфликта.
- [ ] Умеете завершать merge.
- [ ] В коде не осталось `<<<<<<<`.

## Частые ошибки

- **Оставить маркеры.**
- **Не добавить файл в индекс.**
- **Сливать не ту ветку.**
- **Удалить `.git` вместо `git merge --abort`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать после разрешения конфликта?",
  "options": [
    {
      "text": "Добавить файл в индекс и завершить merge",
      "correct": true,
      "explanation": "Git должен узнать, что конфликт решён."
    },
    {
      "text": "Удалить репозиторий",
      "correct": false,
      "explanation": "Это не решение."
    },
    {
      "text": "Оставить маркеры",
      "correct": false,
      "explanation": "Код сломается."
    }
  ],
  "explanation": "После правки нужен `git add` и завершение merge."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что отрабатывает практика?",
  "options": [
    {
      "text": "Создание ветки",
      "correct": true
    },
    {
      "text": "Fast-forward merge",
      "correct": true
    },
    {
      "text": "Разрешение конфликта",
      "correct": true
    },
    {
      "text": "Настройку CI/CD",
      "correct": false,
      "explanation": "Это отдельная группа."
    }
  ],
  "explanation": "Практика покрывает базовые слияния."
}
```

## Куда дальше

- [Ветки и слияния](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/vetki-i-sliyaniya.md)
- [Удалённая работа и code review](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/remote-i-clone.md)
- [Частые ошибки: конфликт слияния](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/konflikt-sliyaniya.md)
