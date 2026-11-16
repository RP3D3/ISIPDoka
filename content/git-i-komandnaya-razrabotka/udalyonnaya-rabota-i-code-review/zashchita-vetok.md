---
title: Защита веток
description: Как запретить прямой push в main, требовать review и зелёный CI.
keywords: protected branches, защита веток, branch protection, CI, review, main

---

# Защита веток

Защита веток не даёт случайно сломать основную ветку. В GitHub и GitLab
это настраивается в правилах репозитория.

## Что можно включить

- запрет прямого push в `main`;
- обязательный pull request;
- обязательный review;
- обязательный зелёный CI;
- запрет force push;
- запрет удаления ветки;
- требование актуальной базы.

## Зачем это нужно

- меньше случайных поломок;
- понятный процесс изменений;
- проверка перед merge;
- защита от перезаписи истории.

## Исключения

Иногда нужен аварийный доступ администратора. Он должен быть
задокументирован и использоваться редко. Если правило можно обойти
молча, оно не работает.

## Частые ошибки

- **Защита только main, но не release-веток.**
- **Обязательный review без ответственных.** PR висит днями.
- **Слишком много обязательных проверок.** Люди ищут обход.
- **Нет исключения для инцидентов.** В аварии процесс мешает.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем запрещать прямой push в main?",
  "options": [
    {
      "text": "Чтобы изменения проходили review и проверки",
      "correct": true,
      "explanation": "Это снижает риск поломки."
    },
    {
      "text": "Чтобы ускорить работу",
      "correct": false,
      "explanation": "Процесс может замедлить, но делает его безопаснее."
    },
    {
      "text": "Чтобы удалить историю",
      "correct": false,
      "explanation": "Защита не удаляет историю."
    }
  ],
  "explanation": "Защита веток добавляет контроль."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что можно включить в защиту ветки?",
  "options": [
    {
      "text": "Обязательный pull request",
      "correct": true
    },
    {
      "text": "Обязательный review",
      "correct": true
    },
    {
      "text": "Обязательный зелёный CI",
      "correct": true
    },
    {
      "text": "Разрешить force push всем",
      "correct": false,
      "explanation": "Это опасно для истории."
    }
  ],
  "explanation": "Защита настраивается под процесс команды."
}
```

## Куда дальше

- [Удалённая работа и code review](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/udalyonnaya-rabota-i-code-review.md)
- [Практика: PR в команде](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/praktika-pr-v-komande.md)
- [CI/CD](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/ci-cd.md)
