---
title: Командные ошибки
description: Плохие коммиты, огромные PR, review без контекста и другие ошибки процесса.
keywords: командные ошибки, commit messages, PR, review, процесс, коммуникация

---

# Командные ошибки

Многие проблемы Git — не технические, а процессные. Их можно исправить
договорённостями.

## Частые ошибки

- **Коммит «fix» без контекста.**
- **Огромный PR на несколько задач.**
- **Review после merge.**
- **Прямой push в main.**
- **Force push в общей ветке.**
- **Задача без критериев приёмки.**
- **Секреты в репозитории.**
- **Игнорирование CI.**

## Решения

- шаблон PR;
- Definition of Done;
- защита веток;
- обязательный review;
- маленькие задачи;
- понятные commit messages;
- автоматические проверки.

## Коммуникация

Если вы сломали общую ветку, сообщите команде. Скрытая проблема дороже
неловкости.

## Частые ошибки в решениях

- **Ввести процесс и не объяснить.**
- **Слишком много правил.**
- **Правила есть, но их обходят.**
- **Нет ответственного за review.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать при поломке общей ветки?",
  "options": [
    {
      "text": "Сообщить команде и вместе восстановить",
      "correct": true,
      "explanation": "Скрытая проблема дороже."
    },
    {
      "text": "Скрыть и надеяться",
      "correct": false,
      "explanation": "Это увеличит последствия."
    },
    {
      "text": "Удалить репозиторий",
      "correct": false,
      "explanation": "Это уничтожит работу."
    }
  ],
  "explanation": "Прозрачность ускоряет восстановление."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что снижает командные ошибки?",
  "options": [
    {
      "text": "Шаблон PR",
      "correct": true
    },
    {
      "text": "Definition of Done",
      "correct": true
    },
    {
      "text": "Защита веток",
      "correct": true
    },
    {
      "text": "Игнорирование CI",
      "correct": false,
      "explanation": "Это увеличивает риск."
    }
  ],
  "explanation": "Договорённости и автоматизация снижают риск."
}
```

## Куда дальше

- [Частые ошибки и их решения](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/chastye-oshibki-i-ih-resheniya.md)
- [Практика: разбор инцидентов](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/praktika-razbor-incidentov.md)
- [Командные процессы](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/komandnye-processy.md)
