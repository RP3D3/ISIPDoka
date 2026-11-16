---
title: README, CONTRIBUTING и LICENSE
description: Три файла, которые объясняют проект, правила участия и права на код.
keywords: README, CONTRIBUTING, LICENSE, документация репозитория, open source

---

# README, CONTRIBUTING и LICENSE

Репозиторий начинается не с кода, а с ответов на вопросы: что это, как
запустить и что можно делать с кодом.

## README

README должен объяснять:

- что делает проект;
- как его установить;
- как запустить;
- как запустить тесты;
- где документация;
- как сообщить о проблеме.

Минимальный README лучше пустого.

## CONTRIBUTING

CONTRIBUTING описывает правила участия:

- как предложить изменение;
- как создать ветку;
- как писать коммиты;
- как запускать проверки;
- как проходит review.

Это экономит время и автору, и контрибьютору.

## LICENSE

LICENSE определяет, что можно делать с кодом:

- использовать;
- изменять;
- распространять;
- использовать в коммерческих проектах.

Без лицензии по умолчанию действуют строгие ограничения авторского
права.

## Частые ошибки

- **Пустой README.**
- **Нет LICENSE.** Люди не знают, можно ли использовать код.
- **CONTRIBUTING противоречит процессу.**
- **README устарел.** Инструкции не работают.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен LICENSE?",
  "options": [
    {
      "text": "Чтобы определить права на использование и распространение кода",
      "correct": true,
      "explanation": "Без лицензии права неочевидны."
    },
    {
      "text": "Чтобы ускорить Git",
      "correct": false,
      "explanation": "Лицензия не влияет на скорость."
    },
    {
      "text": "Чтобы заменить README",
      "correct": false,
      "explanation": "Это разные документы."
    }
  ],
  "explanation": "Лицензия задаёт юридические рамки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что должно быть в README?",
  "options": [
    {
      "text": "Описание проекта",
      "correct": true
    },
    {
      "text": "Как запустить",
      "correct": true
    },
    {
      "text": "Как запустить тесты",
      "correct": true
    },
    {
      "text": "Секретные ключи",
      "correct": false,
      "explanation": "Секреты не публикуются."
    }
  ],
  "explanation": "README — точка входа в проект."
}
```

## Куда дальше

- [Шаблоны issue и PR](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/shablony-issue-i-pr.md)
- [Секреты и .env](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/sekrety-i-env.md)
- [Права доступа](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/prava-dostupa.md)
