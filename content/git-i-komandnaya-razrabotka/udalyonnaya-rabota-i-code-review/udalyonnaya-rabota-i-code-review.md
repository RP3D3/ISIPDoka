---
title: Удалённая работа и code review
description: Итог группы: remote, fetch/pull/push, tracking, форки, PR и защита веток.
keywords: удалённая работа, code review, remote, pull request, fork, защита веток

---

# Удалённая работа и code review

Удалённая работа — это обмен историей и обсуждение изменений до того,
как они попадут в основную ветку.

## Основные команды

```bash
git remote -v
git fetch origin
git pull
git push -u origin feature/login
```

## Схема работы

1. Взять задачу.
2. Создать ветку.
3. Сделать коммиты.
4. Отправить ветку в remote.
5. Открыть PR.
6. Пройти review и CI.
7. Слить в main.

## Что важно

- `fetch` безопаснее `pull`;
- tracking branch упрощает push/pull;
- форк требует upstream;
- PR должен быть небольшим и понятным;
- защита веток не даёт обойти review и CI.

## Частые ошибки

- **Пушить в чужой upstream.**
- **Делать force push в общей ветке.**
- **Открывать PR без описания.**
- **Сливать без review и проверок.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что безопаснее для просмотра изменений с сервера?",
  "options": [
    {
      "text": "`git fetch`",
      "correct": true,
      "explanation": "Он не меняет текущую ветку."
    },
    {
      "text": "`git pull`",
      "correct": false,
      "explanation": "Он сразу сливает изменения."
    },
    {
      "text": "`git push --force`",
      "correct": false,
      "explanation": "Это опасно для общей истории."
    }
  ],
  "explanation": "Fetch даёт контроль перед слиянием."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в удалённый workflow?",
  "options": [
    {
      "text": "Push ветки",
      "correct": true
    },
    {
      "text": "Pull request",
      "correct": true
    },
    {
      "text": "Code review",
      "correct": true
    },
    {
      "text": "Прямой push в main без проверок",
      "correct": false,
      "explanation": "Обычно это запрещено защитой веток."
    }
  ],
  "explanation": "Workflow включает обмен, review и проверки."
}
```

## Куда дальше

- [Практика: PR в команде](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/praktika-pr-v-komande.md)
- [Командные процессы](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/github-flow.md)
- [Частые ошибки: push rejected](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/push-rejected.md)
