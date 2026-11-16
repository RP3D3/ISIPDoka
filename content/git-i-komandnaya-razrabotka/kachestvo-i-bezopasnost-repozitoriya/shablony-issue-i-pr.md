---
title: Шаблоны issue и PR
description: Как задавать структуру обращений и pull request, чтобы получать нужную информацию сразу.
keywords: issue template, pull request template, шаблоны, GitHub, чек-лист PR

---

# Шаблоны issue и PR

Шаблоны помогают не забыть важное: шаги воспроизведения, ожидаемое
поведение, проверки перед merge.

## Issue template

Обычно лежит в `.github/ISSUE_TEMPLATE/`. Полезные поля:

- тип проблемы;
- шаги воспроизведения;
- ожидаемое поведение;
- фактическое поведение;
- версия и окружение;
- логи или скриншоты.

## PR template

Файл `PULL_REQUEST_TEMPLATE.md` может содержать:

```markdown
## Что изменено

## Зачем

## Как проверить

## Чек-лист
- [ ] тесты проходят
- [ ] документация обновлена
- [ ] нет секретов
```

## Принцип

Шаблон должен помогать, а не превращаться в бюрократию. Если поле
никогда не заполняют, возможно, оно лишнее.

## Частые ошибки

- **Слишком длинный шаблон.** Люди удаляют его целиком.
- **Нет обязательных полей.** Приходится задавать вопросы.
- **Шаблон устарел.** Поля не соответствуют процессу.
- **Чек-лист без проверки.** Галочки ставят автоматически.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен PR template?",
  "options": [
    {
      "text": "Чтобы автор сразу указал цель, изменения и проверки",
      "correct": true,
      "explanation": "Это ускоряет review."
    },
    {
      "text": "Чтобы автоматически merge PR",
      "correct": false,
      "explanation": "Merge требует проверок."
    },
    {
      "text": "Чтобы заменить CI",
      "correct": false,
      "explanation": "Шаблон не запускает тесты."
    }
  ],
  "explanation": "Шаблон задаёт структуру описания."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что полезно в issue template?",
  "options": [
    {
      "text": "Шаги воспроизведения",
      "correct": true
    },
    {
      "text": "Ожидаемое поведение",
      "correct": true
    },
    {
      "text": "Окружение и версия",
      "correct": true
    },
    {
      "text": "Только слово «не работает»",
      "correct": false,
      "explanation": "Этого недостаточно для диагностики."
    }
  ],
  "explanation": "Шаблон помогает собрать диагностику сразу."
}
```

## Куда дальше

- [Секреты и .env](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/sekrety-i-env.md)
- [Права доступа](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/prava-dostupa.md)
- [README, CONTRIBUTING и LICENSE](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/readme-contributing-license.md)
