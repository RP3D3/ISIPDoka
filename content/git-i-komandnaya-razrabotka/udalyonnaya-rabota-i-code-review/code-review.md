---
title: Code review
description: Как проверять чужой код, оставлять полезные замечания и не превращать review в придирки.
keywords: code review, ревью кода, pull request, замечания, approve, request changes

---

# Code review

Code review — это проверка изменений перед слиянием. Цель — найти
проблемы, передать знания и снизить риск, а не доказать, кто умнее.

## Что смотреть

- корректность логики;
- обработку ошибок;
- тесты;
- читаемость;
- безопасность;
- влияние на существующее поведение;
- соответствие задаче.

## Как оставлять замечания

Хорошее замечание:

- объясняет проблему;
- предлагает направление решения;
- отделяет блокирующее от необязательного;
- уважительно.

Плохое:

- «мне не нравится»;
- придирка к вкусу без аргумента;
- комментарий без контекста.

## Статусы

- **Comment** — обсуждение без блокировки.
- **Approve** — можно сливать.
- **Request changes** — есть блокирующие проблемы.

## Частые ошибки

- **Резиновый approve.** Review без чтения бесполезен.
- **Только стиль.** Логика и тесты важнее пробелов.
- **Грубый тон.** Люди перестают слышать замечания.
- **Review после merge.** Тогда уже поздно.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое code review?",
  "options": [
    {
      "text": "Проверка изменений перед слиянием",
      "correct": true,
      "explanation": "Цель — качество и обмен знаниями."
    },
    {
      "text": "Автоматическая сборка",
      "correct": false,
      "explanation": "Это CI."
    },
    {
      "text": "Удаление ветки",
      "correct": false,
      "explanation": "Это branch -d."
    }
  ],
  "explanation": "Review — человеческая проверка изменений."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что полезно в review?",
  "options": [
    {
      "text": "Проверить логику и тесты",
      "correct": true
    },
    {
      "text": "Объяснить блокирующие замечания",
      "correct": true
    },
    {
      "text": "Отделить обязательное от необязательного",
      "correct": true
    },
    {
      "text": "Оставлять только «мне не нравится»",
      "correct": false,
      "explanation": "Нужны аргументы и контекст."
    }
  ],
  "explanation": "Review должен быть конкретным и уважительным."
}
```

## Куда дальше

- [Защита веток](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/zashchita-vetok.md)
- [Этикет code review](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/etiket-code-review.md)
- [Pull request](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/pull-request.md)
