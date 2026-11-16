---
title: Issues и задачи
description: Как описывать задачу, чтобы по ней можно было сделать ветку, коммиты и PR.
keywords: issues, задачи, GitHub Issues, критерии приёмки, labels, project management

---

# Issues и задачи

Issue — единица работы. Хорошая задача объясняет проблему, ожидаемый
результат и критерии готовности.

## Что должно быть в задаче

- контекст;
- что нужно сделать;
- критерии приёмки;
- ограничения;
- ссылки на дизайн или обсуждение.

## Пример

```text
Название: Валидация email в форме входа

Контекст:
Сейчас форма отправляет любой email.

Нужно:
Проверять формат email до отправки.

Критерии приёмки:
- неверный email показывает ошибку;
- ошибка не раскрывает внутренние данные;
- есть тест на валидацию.
```

## Связь с Git

Ветка и PR могут ссылаться на issue:

```text
feature/42-email-validation
Closes #42
```

При merge issue закроется автоматически.

## Метки

Labels помогают фильтровать:

- `bug`;
- `feature`;
- `docs`;
- `blocked`;
- `good first issue`.

## Частые ошибки

- **Задача «сделать красиво».** Нет критериев.
- **Огромная задача на месяц.** Лучше разбить.
- **Нет контекста.** Исполнитель задаёт много вопросов.
- **Задача без ответственного.** Она висит.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужны критерии приёмки?",
  "options": [
    {
      "text": "Чтобы понять, когда задача действительно готова",
      "correct": true,
      "explanation": "Они задают проверяемый результат."
    },
    {
      "text": "Чтобы увеличить количество коммитов",
      "correct": false,
      "explanation": "Количество не цель."
    },
    {
      "text": "Чтобы закрыть issue без работы",
      "correct": false,
      "explanation": "Критерии как раз требуют результата."
    }
  ],
  "explanation": "Критерии приёмки делают задачу проверяемой."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что полезно указать в issue?",
  "options": [
    {
      "text": "Контекст проблемы",
      "correct": true
    },
    {
      "text": "Ожидаемый результат",
      "correct": true
    },
    {
      "text": "Критерии приёмки",
      "correct": true
    },
    {
      "text": "Только название без деталей",
      "correct": false,
      "explanation": "Этого недостаточно."
    }
  ],
  "explanation": "Issue должен быть понятен без устных пояснений."
}
```

## Куда дальше

- [Definition of Done](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/definition-of-done.md)
- [Этикет code review](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/etiket-code-review.md)
- [Commit messages](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/commit-messages.md)
