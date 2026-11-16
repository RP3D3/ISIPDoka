---
title: Качество и безопасность репозитория
description: Итог группы: документация, шаблоны, секреты, права, подписи и зависимости.
keywords: качество репозитория, безопасность, README, LICENSE, секреты, права, зависимости

---

# Качество и безопасность репозитория

Репозиторий — это не только код. Это документация, правила, доступы и
зависимости.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/git-i-komandnaya-razrabotka/_assets/kachestvo-i-bezopasnost-repozitoriya/security-checklist.svg"
    alt="Чек-лист качества и безопасности репозитория"
    width="900"
  >
  <figcaption>
    Безопасность складывается из простых проверок.
  </figcaption>
</figure>

## Минимальный набор

- README;
- LICENSE;
- CONTRIBUTING;
- шаблоны issue и PR;
- `.gitignore` с секретами;
- права доступа;
- обновления зависимостей.

## Проверки

- нет `.env` и ключей в истории;
- права выданы по ролям;
- подписи коммитов, если нужны;
- зависимости обновляются;
- CI проверяет сборку и тесты.

## Частые ошибки

- **Секреты в репозитории.**
- **Нет лицензии.**
- **Admin у всех.**
- **Заброшенные зависимости.**
- **Шаблоны, которые никто не читает.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что из этого относится к безопасности репозитория?",
  "options": [
    {
      "text": "Отсутствие секретов в истории",
      "correct": true,
      "explanation": "Секреты не должны попадать в Git."
    },
    {
      "text": "Красивый логотип",
      "correct": false,
      "explanation": "Это не безопасность."
    },
    {
      "text": "Количество звёзд",
      "correct": false,
      "explanation": "Это популярность."
    }
  ],
  "explanation": "Безопасность — это доступы, секреты и зависимости."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в качественный репозиторий?",
  "options": [
    {
      "text": "README",
      "correct": true
    },
    {
      "text": "LICENSE",
      "correct": true
    },
    {
      "text": "Шаблоны issue и PR",
      "correct": true
    },
    {
      "text": "Пароли в открытом виде",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Качество — это документация и правила."
}
```

## Куда дальше

- [Практика: аудит репозитория](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/praktika-audit-repozitoriya.md)
- [Релизы и CI/CD](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/ci-cd.md)
- [Частые ошибки: секреты в истории](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/sekrety-v-istorii.md)
