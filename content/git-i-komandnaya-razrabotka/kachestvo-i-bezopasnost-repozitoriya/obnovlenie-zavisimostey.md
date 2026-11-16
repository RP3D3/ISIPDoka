---
title: Обновление зависимостей
description: Как следить за версиями библиотек, уязвимостями и автоматическими PR.
keywords: зависимости, Dependabot, Renovate, lockfile, уязвимости, обновления

---

# Обновление зависимостей

Зависимости устаревают и получают уязвимости. Регулярное обновление
дешевле, чем аварийный апгрейд через год.

## Что делать

- хранить lockfile;
-регулярно запускать audit;
- обновлять небольшими партиями;
- читать changelog;
- запускать тесты после обновления.

## Автоматизация

Dependabot или Renovate могут создавать PR с обновлениями. Это удобно,
но не отменяет review.

## Стратегия

- патчи и безопасность — быстро;
- минорные версии — регулярно;
- мажорные — отдельно, с планом миграции.

## Частые ошибки

- **Игнорировать обновления.** Накопленные изменения сложнее применить.
- **Автоматически merge всё.** Мажорные версии могут ломать API.
- **Не запускать тесты.**
- **Не фиксировать версии.** Сборка становится невоспроизводимой.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен lockfile?",
  "options": [
    {
      "text": "Чтобы фиксировать точные версии зависимостей",
      "correct": true,
      "explanation": "Сборка становится воспроизводимой."
    },
    {
      "text": "Чтобы ускорить Git",
      "correct": false,
      "explanation": "Lockfile не про скорость Git."
    },
    {
      "text": "Чтобы заменить тесты",
      "correct": false,
      "explanation": "Тесты всё равно нужны."
    }
  ],
  "explanation": "Lockfile фиксирует зависимости."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает обновлять зависимости безопасно?",
  "options": [
    {
      "text": "Тесты после обновления",
      "correct": true
    },
    {
      "text": "Чтение changelog",
      "correct": true
    },
    {
      "text": "Обновление небольшими партиями",
      "correct": true
    },
    {
      "text": "Автоматический merge мажорных версий без проверки",
      "correct": false,
      "explanation": "Мажорные версии могут ломать API."
    }
  ],
  "explanation": "Обновления требуют проверки, а не слепого merge."
}
```

## Куда дальше

- [Качество и безопасность репозитория](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/kachestvo-i-bezopasnost-repozitoriya.md)
- [Практика: аудит репозитория](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/praktika-audit-repozitoriya.md)
- [CI/CD](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/ci-cd.md)
