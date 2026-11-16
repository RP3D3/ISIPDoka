---
title: Git, GitHub и GitLab
description: Чем Git отличается от платформы хостинга и почему это не одно и то же.
keywords: Git, GitHub, GitLab, удалённый репозиторий, pull request, хостинг

---

# Git, GitHub и GitLab

Часто новички говорят «залил в Git», хотя имеют в виду GitHub. Это разные
вещи: Git — инструмент, GitHub и GitLab — платформы для хранения
удалённых репозиториев и совместной работы.

## Git

Git — локальная программа. Она отвечает за:

- коммиты;
- ветки;
- слияния;
- историю;
- обмен изменениями через `push` и `pull`.

Git работает без GitHub. Можно создать репозиторий на диске и вести
работать офлайн.

## GitHub и GitLab

Это сервисы, которые хранят удалённые копии репозиториев и добавляют
инструменты команды:

- pull request / merge request;
- code review;
- issues;
- CI/CD;
- права доступа;
- релизы и теги.

GitHub — популярная платформа для открытых проектов. GitLab — частая
альтернатива для корпоративных и self-hosted решений.

## Удалённый репозиторий

Удалённый репозиторий (`origin`) — это ещё одна копия истории. Он нужен,
чтобы:

- синхронизировать работу;
- делиться ветками;
- запускать CI;
- проводить review.

Он не «главный диск», а точка обмена.

## Что выбрать

Для учёбы и портфолио обычно достаточно GitHub. Для корпоративной
инфраструктуры часто выбирают GitLab или другой хостинг. Команды Git при
этом почти не меняются.

## Частые ошибки

- **«Git и GitHub — одно и то же».** Git — инструмент, GitHub — сервис.
- **«Без GitHub Git не работает».** Работает, но без удалённой команды.
- **«Можно коммитить в веб-интерфейсе и не делать pull».** Локальная и
  удалённая история могут разойтись.
- **«Приватный репозиторий значит безопасный».** Права доступа и секреты
  всё равно нужно настраивать.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое GitHub?",
  "options": [
    {
      "text": "Платформа для хранения удалённых Git-репозиториев и команды",
      "correct": true,
      "explanation": "GitHub добавляет к Git сервисные функции."
    },
    {
      "text": "Сам Git",
      "correct": false,
      "explanation": "Git — отдельная программа."
    },
    {
      "text": "Язык программирования",
      "correct": false,
      "explanation": "Это не язык."
    }
  ],
  "explanation": "GitHub — сервис, а не сам Git."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что обычно даёт платформа типа GitHub?",
  "options": [
    {
      "text": "Удалённые репозитории",
      "correct": true
    },
    {
      "text": "Pull request и code review",
      "correct": true
    },
    {
      "text": "CI/CD",
      "correct": true
    },
    {
      "text": "Замену Git на другой инструмент",
      "correct": false,
      "explanation": "Git остаётся инструментом."
    }
  ],
  "explanation": "Платформа расширяет Git командными функциями."
}
```

## Куда дальше

- [Установка и настройка](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/ustanovka-i-nastroyka.md)
- [Удалённая работа и code review](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/remote-i-clone.md)
- [Что такое версионный контроль](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/chto-takoe-versionnyy-kontrol.md)
