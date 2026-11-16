---
title: Практика: первый репозиторий
description: Пошаговая практика: создать репозиторий, настроить .gitignore и сделать первый коммит.
keywords: практика Git, первый репозиторий, git init, git add, git commit, gitignore

---

# Практика: первый репозиторий

Соберите небольшой репозиторий с историей из двух коммитов.

## Шаг 1. Создайте папку

```bash
mkdir git-practice
cd git-practice
git init
```

## Шаг 2. Добавьте `.gitignore`

```gitignore
.env
node_modules/
*.log
```

## Шаг 3. Создайте файлы

```bash
echo "# Git practice" > README.md
echo "print('hello')" > app.py
```

## Шаг 4. Проверьте статус

```bash
git status
```

Убедитесь, что `.env` и `node_modules` не попадают в список.

## Шаг 5. Первый коммит

```bash
git add README.md .gitignore
git commit -m "Add README and gitignore"
```

## Шаг 6. Второй коммит

```bash
git add app.py
git commit -m "Add hello script"
```

## Шаг 7. Проверьте историю

```bash
git log --oneline
```

Должно быть два коммита.

## Что проверить

- [ ] Репозиторий создан.
- [ ] `.gitignore` работает.
- [ ] В истории два разных коммита.
- [ ] Сообщения коммитов понятны.
- [ ] В коммиты не попали секреты.

## Частые ошибки

- **Сделать один коммит на всё.** Лучше разделить README и код.
- **Забыть `.gitignore`.** Секреты и логи попадут в историю.
- **Использовать `git add .` без проверки.** Можно добавить лишнее.
- **Писать `update`.** Сообщение должно объяснять изменение.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Сколько коммитов должно получиться в практике?",
  "options": [
    {
      "text": "Два",
      "correct": true,
      "explanation": "README с .gitignore и отдельно app.py."
    },
    {
      "text": "Один",
      "correct": false,
      "explanation": "Практика просит разделить изменения."
    },
    {
      "text": "Ни одного",
      "correct": false,
      "explanation": "Цель практики — создать историю."
    }
  ],
  "explanation": "Два коммита показывают, как работает история."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно проверить перед коммитом?",
  "options": [
    {
      "text": "`git status`",
      "correct": true
    },
    {
      "text": "Что `.env` не попал в индекс",
      "correct": true
    },
    {
      "text": "Понятность сообщения коммита",
      "correct": true
    },
    {
      "text": "Что в репозиторий добавлены все логи",
      "correct": false,
      "explanation": "Логи обычно игнорируются."
    }
  ],
  "explanation": "Перед коммитом проверяют состав и сообщение."
}
```

## Куда дальше

- [Основы Git](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/osnovy-git.md)
- [Ежедневная работа](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/status-diff-log.md)
- [Ветки и слияния](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/vetka-kak-ukazatel.md)
