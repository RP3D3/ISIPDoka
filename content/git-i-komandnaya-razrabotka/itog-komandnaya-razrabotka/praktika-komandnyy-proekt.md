---
title: Практика: командный проект с нуля
description: Финальный проект: репозиторий, задачи, ветки, PR, review, CI, релиз и разбор ошибок.
keywords: практика, командный проект, Git, PR, CI, релиз, командная разработка

---

# Практика: командный проект с нуля

Соберите небольшой проект и пройдите полный командный цикл.

## 1. Репозиторий

- создайте репозиторий;
- добавьте README, LICENSE, `.gitignore`;
- настройте защиту `main`;
- включите CI.

## 2. Задачи

Создайте 3 issue:

1. добавить главную страницу;
2. добавить тест;
3. обновить README.

У каждой задачи должны быть критерии приёмки.

## 3. Ветки

Для каждой задачи создайте отдельную ветку:

```bash
git switch -c feature/home-page
git switch -c test/add-check
git switch -c docs/update-readme
```

## 4. PR

Для каждой ветки:

1. сделайте коммиты;
2. отправьте ветку;
3. откройте PR;
4. свяжите с issue;
5. дождитесь review и CI.

## 5. Review

Проверьте:

- [ ] Изменение соответствует задаче.
- [ ] Нет лишних файлов.
- [ ] Тесты проходят.
- [ ] Нет секретов.
- [ ] Документация обновлена.

## 6. Релиз

- выберите версию по SemVer;
- обновите changelog;
- поставьте тег;
- отправьте тег;
- проверьте артефакт.

## 7. Инцидент

Смоделируйте ошибку:

- сделайте коммит не в ту ветку;
- восстановите через `reflog` или `cherry-pick`;
- опишите, что помогло.

## 8. Ретро

Ответьте:

- что замедлило работу;
- где были конфликты;
- какие проверки добавить;
- что изменить в процессе.

## Частые ошибки

- **Прямой push в main.**
- **PR без задачи.**
- **Review после merge.**
- **Секреты в репозитории.**
- **Нет плана отката.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что должно быть у каждой задачи?",
  "options": [
    {
      "text": "Критерии приёмки",
      "correct": true,
      "explanation": "Так понятно, когда задача готова."
    },
    {
      "text": "Только название",
      "correct": false,
      "explanation": "Этого недостаточно."
    },
    {
      "text": "Секретный токен",
      "correct": false,
      "explanation": "Секреты не хранят в задачах."
    }
  ],
  "explanation": "Критерии делают задачу проверяемой."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в финальный проект?",
  "options": [
    {
      "text": "Ветки и PR",
      "correct": true
    },
    {
      "text": "Review и CI",
      "correct": true
    },
    {
      "text": "Релиз и разбор инцидента",
      "correct": true
    },
    {
      "text": "Прямой push в main без проверок",
      "correct": false,
      "explanation": "Это обходит процесс."
    }
  ],
  "explanation": "Проект покрывает весь командный цикл."
}
```

## Куда дальше

- [Итог: командная разработка](theme.html?path=content/git-i-komandnaya-razrabotka/itog-komandnaya-razrabotka/itog-komandnaya-razrabotka.md)
- [Основы Git](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/osnovy-git.md)
- [Командные процессы](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/komandnye-processy.md)
