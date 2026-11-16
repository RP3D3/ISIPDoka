---
title: Практика: командный спринт
description: Смоделируйте короткий спринт: задачи, ветки, PR, review, DoD и merge.
keywords: практика, командный спринт, GitHub Flow, issues, PR, DoD

---

# Практика: командный спринт

Разделитесь на роли или выполните шаги последовательно. Цель — пройти
полный цикл задачи.

## 1. Задача

Создайте issue:

```text
Добавить страницу «О проекте»
```

Укажите контекст и критерии приёмки.

## 2. Ветка

```bash
git switch -c feature/about-page
```

## 3. Работа

Сделайте 1–2 небольших коммита:

```bash
git add about.md
git commit -m "Add about page"
```

## 4. PR

Отправьте ветку и откройте PR. В описании свяжите его с issue:

```text
Closes #12
```

## 5. Review

Проверьте:

- [ ] Код соответствует задаче.
- [ ] Нет лишних файлов.
- [ ] Тесты и CI зелёные.
- [ ] Документация обновлена.
- [ ] Нет секретов.

## 6. Правки

Внесите замечания и снова push. PR обновится.

## 7. Merge

После approve и CI слейте PR. Удалите ветку.

## 8. Ретро

Ответьте:

- что прошло хорошо;
- что замедлило;
- что изменить в следующем спринте.

## Частые ошибки

- **Задача без критериев.**
- **PR без связи с issue.**
- **Review после merge.**
- **Забыть удалить ветку.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что должно быть до создания PR?",
  "options": [
    {
      "text": "Задача и коммиты в ветке",
      "correct": true,
      "explanation": "PR предлагает уже сделанные изменения."
    },
    {
      "text": "Merge в main",
      "correct": false,
      "explanation": "Merge происходит после review."
    },
    {
      "text": "Удаление репозитория",
      "correct": false,
      "explanation": "Это не часть процесса."
    }
  ],
  "explanation": "PR открывается после коммитов и push."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в командный спринт?",
  "options": [
    {
      "text": "Задача с критериями",
      "correct": true
    },
    {
      "text": "Ветка и коммиты",
      "correct": true
    },
    {
      "text": "PR, review и CI",
      "correct": true
    },
    {
      "text": "Прямой push в main без проверок",
      "correct": false,
      "explanation": "Это обходит процесс."
    }
  ],
  "explanation": "Спринт охватывает путь от задачи до merge."
}
```

## Куда дальше

- [Командные процессы](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/komandnye-processy.md)
- [Качество и безопасность репозитория](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/readme-contributing-license.md)
- [Релизы и CI/CD](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/ci-cd.md)
