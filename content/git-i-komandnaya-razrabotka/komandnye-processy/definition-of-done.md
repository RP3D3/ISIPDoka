---
title: Definition of Done
description: Что считать готовой задачей: код, тесты, review, документация и проверки.
keywords: definition of done, DoD, критерии готовности, команда, качество

---

# Definition of Done

Definition of Done (DoD) — соглашение команды о том, что задача
действительно завершена. Без него «готово» у каждого своё.

## Пример DoD

- [ ] код написан;
- [ ] тесты добавлены и проходят;
- [ ] review пройден;
- [ ] CI зелёный;
- [ ] документация обновлена;
- [ ] нет секретов и отладочного мусора;
- [ ] задача связана с PR;
- [ ] изменение можно задеплоить.

## Зачем это нужно

- меньше «почти готово»;
- понятный критерий приёмки;
- меньше возвратов;
- предсказуемый релиз.

## Разный уровень

DoD может отличаться для:

- багфикса;
- новой функции;
- эксперимента;
- документации.

Но базовые пункты должны быть общими.

## Частые ошибки

- **DoD только на словах.** Нужен записанный чек-лист.
- **Пропускать тесты «потом».** Потом не наступает.
- **Считать merge готовностью.** Без проверки и документации это не
  всегда так.
- **Слишком тяжёлый DoD.** Люди начнут обходить процесс.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое Definition of Done?",
  "options": [
    {
      "text": "Согласованный чек-лист готовности задачи",
      "correct": true,
      "explanation": "Он делает «готово» проверяемым."
    },
    {
      "text": "Список всех задач проекта",
      "correct": false,
      "explanation": "Это backlog."
    },
    {
      "text": "Тип Git-ветки",
      "correct": false,
      "explanation": "Это не ветка."
    }
  ],
  "explanation": "DoD задаёт критерии завершённости."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что часто входит в DoD?",
  "options": [
    {
      "text": "Тесты проходят",
      "correct": true
    },
    {
      "text": "Review пройден",
      "correct": true
    },
    {
      "text": "CI зелёный",
      "correct": true
    },
    {
      "text": "Секреты добавлены в репозиторий",
      "correct": false,
      "explanation": "Секреты не должны попадать в Git."
    }
  ],
  "explanation": "DoD покрывает качество и проверки."
}
```

## Куда дальше

- [Этикет code review](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/etiket-code-review.md)
- [Командные процессы](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/komandnye-processy.md)
- [Практика: командный спринт](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/praktika-komandnyy-sprint.md)
