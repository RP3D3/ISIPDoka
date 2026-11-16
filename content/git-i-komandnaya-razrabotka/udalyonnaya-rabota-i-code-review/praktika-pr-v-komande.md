---
title: Практика: PR в команде
description: Смоделируйте командный цикл: ветка, коммиты, push, pull request, review и merge.
keywords: практика PR, pull request, code review, команда, GitHub, merge

---

# Практика: PR в команде

Сделайте учебный PR так, как это происходит в команде.

## Подготовка

Создайте репозиторий на GitHub или GitLab. Добавьте README и защитите
ветку `main`: запретите прямой push.

## 1. Ветка

```bash
git switch -c feature/readme-update
```

## 2. Изменения

```bash
echo "## Установка" >> README.md
git add README.md
git commit -m "Add installation section"
```

## 3. Push

```bash
git push -u origin feature/readme-update
```

## 4. PR

Откройте pull request в `main`. В описании укажите:

- что изменено;
- зачем;
- как проверить.

## 5. Review

Попросите другого человека или проверьте сами по чек-листу:

- [ ] Изменение соответствует задаче.
- [ ] Нет лишних файлов.
- [ ] Текст понятен.
- [ ] CI зелёный.

## 6. Правки

Если есть замечания, сделайте коммит в ту же ветку и снова push. PR
обновится автоматически.

## 7. Merge

После approve и зелёного CI слейте PR. Удалите ветку, если она больше
не нужна.

## Частые ошибки

- **PR в неправильную базовую ветку.**
- **Огромный PR.**
- **Merge без review.**
- **Забыть обновить ветку перед merge.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Куда отправлять ветку для PR?",
  "options": [
    {
      "text": "В свой remote через `git push -u origin`",
      "correct": true,
      "explanation": "После этого можно открыть PR."
    },
    {
      "text": "В upstream напрямую",
      "correct": false,
      "explanation": "Обычно прав нет."
    },
    {
      "text": "В `git stash`",
      "correct": false,
      "explanation": "Stash — локальное хранилище."
    }
  ],
  "explanation": "PR создаётся из ветки в remote."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что должно быть в хорошем PR?",
  "options": [
    {
      "text": "Понятное описание",
      "correct": true
    },
    {
      "text": "Небольшой набор изменений",
      "correct": true
    },
    {
      "text": "Связь с задачей",
      "correct": true
    },
    {
      "text": "Секреты и пароли",
      "correct": false,
      "explanation": "Их не должно быть в PR."
    }
  ],
  "explanation": "PR должен быть понятным и безопасным."
}
```

## Куда дальше

- [Удалённая работа и code review](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/udalyonnaya-rabota-i-code-review.md)
- [Командные процессы](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/github-flow.md)
- [Качество и безопасность репозитория](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/readme-contributing-license.md)
