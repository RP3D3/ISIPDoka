---
title: Этикет code review
description: Как обсуждать код так, чтобы находить проблемы и не портить отношения.
keywords: этикет review, code review, комментарии, тон, блокирующие замечания

---

# Этикет code review

Review — это совместная работа. Замечания должны помогать, а не
унижать. Хороший review делает код лучше и команду сильнее.

## Правила

- комментируйте код, а не человека;
- объясняйте причину;
- отделяйте блокирующее от необязательного;
- предлагайте решение;
- хвалите удачные места;
- отвечайте на комментарии.

## Пометки

Полезно явно писать:

```text
blocking: это сломает обработку ошибок
nit: можно переименовать переменную
question: почему выбран этот подход?
```

Так автор понимает, что обязательно, а что нет.

## Автору

- отвечайте на замечания;
- не принимайте всё на свой счёт;
- если не согласны — объясните;
- после правок попросите повторный review.

## Частые ошибки

- **«Это плохо» без объяснения.**
- **Придирки к вкусу.**
- **Расширение scope PR.**
- **Игнорирование комментариев.**
- **Review без чтения кода.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что означает `nit` в review?",
  "options": [
    {
      "text": "Необязательное замечание",
      "correct": true,
      "explanation": "Оно не блокирует merge."
    },
    {
      "text": "Критическая ошибка",
      "correct": false,
      "explanation": "Для этого лучше `blocking`."
    },
    {
      "text": "Команда Git",
      "correct": false,
      "explanation": "Это пометка в комментарии."
    }
  ],
  "explanation": "Пометки помогают понять важность замечания."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что делает review лучше?",
  "options": [
    {
      "text": "Объяснять причину замечания",
      "correct": true
    },
    {
      "text": "Отделять блокирующее от необязательного",
      "correct": true
    },
    {
      "text": "Обсуждать код, а не человека",
      "correct": true
    },
    {
      "text": "Писать «мне не нравится» без аргументов",
      "correct": false,
      "explanation": "Это не помогает автору."
    }
  ],
  "explanation": "Уважительный и конкретный review полезнее."
}
```

## Куда дальше

- [Командные процессы](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/komandnye-processy.md)
- [Практика: командный спринт](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/praktika-komandnyy-sprint.md)
- [Code review](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/code-review.md)
