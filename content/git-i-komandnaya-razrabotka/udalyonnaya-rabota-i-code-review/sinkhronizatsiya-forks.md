---
title: Синхронизация форка
description: Как подтянуть изменения из upstream в свой форк и не сломать свою ветку.
keywords: синхронизация форка, upstream, fetch, merge, rebase, fork

---

# Синхронизация форка

Форк не обновляется сам. Чтобы не работать на устаревшей базе, его
нужно периодически синхронизировать с upstream.

## Безопасный вариант

```bash
git fetch upstream
git switch main
git merge upstream/main
git push origin main
```

Так `main` вашего форка получает изменения исходного проекта.

## Если работаете в feature-ветке

```bash
git switch feature/login
git rebase main
```

Или merge, если ветка уже опубликована и её используют другие.

## Важно

- не делайте `push --force` в общий upstream;
- не синхронизируйте main, если в нём есть незакоммиченные изменения;
- проверяйте, куда указывает `origin` и `upstream`;
- после синхронизации запускайте тесты.

## Частые ошибки

- **Забыть про upstream.** Форк устаревает.
- **Синхронизировать не ту ветку.**
- **Делать rebase опубликованной ветки без предупреждения.**
- **Пушить force в main форка без необходимости.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какая команда забирает изменения из upstream?",
  "options": [
    {
      "text": "`git fetch upstream`",
      "correct": true,
      "explanation": "Она обновляет удалённые ссылки upstream."
    },
    {
      "text": "`git push upstream`",
      "correct": false,
      "explanation": "Это отправка, а не получение."
    },
    {
      "text": "`git clean`",
      "correct": false,
      "explanation": "Она удаляет неотслеживаемые файлы."
    }
  ],
  "explanation": "Fetch скачивает изменения без слияния."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что стоит сделать после синхронизации?",
  "options": [
    {
      "text": "Проверить `git log`",
      "correct": true
    },
    {
      "text": "Запустить тесты",
      "correct": true
    },
    {
      "text": "Убедиться, что ветка правильная",
      "correct": true
    },
    {
      "text": "Сразу сделать force push в upstream",
      "correct": false,
      "explanation": "Это опасно и обычно запрещено."
    }
  ],
  "explanation": "Синхронизация — это не только команда, но и проверка."
}
```

## Куда дальше

- [Pull request](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/pull-request.md)
- [Code review](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/code-review.md)
- [Fork и upstream](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/fork-i-upstream.md)
