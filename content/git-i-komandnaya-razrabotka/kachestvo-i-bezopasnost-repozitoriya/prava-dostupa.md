---
title: Права доступа
description: Кто может читать, пушить, merge и менять настройки репозитория.
keywords: права доступа, роли, least privilege, GitHub, GitLab, безопасность

---

# Права доступа

Права должны соответствовать роли человека. Чем меньше лишних
разрешений, тем ниже риск.

## Типичные роли

- **Read** — читать и клонировать.
- **Write** — пушить в ветки.
- **Maintain** — настройки и управление.
- **Admin** — полный доступ.

В командах удобно использовать группы, а не выдавать права каждому
вручную.

## Принцип наименьших привилегий

Давайте только те права, которые нужны для работы. Если человеку нужен
только review, ему не нужен admin.

## Токены и боты

Токены должны иметь минимальные scopes и срок жизни. Отдельный токен для
CI, отдельный для локальной автоматизации.

## Частые ошибки

- **Admin всем.** Одна ошибка может изменить настройки.
- **Общий аккаунт.** Непонятно, кто сделал действие.
- **Токен с полными правами.** Утечка опаснее.
- **Забыть убрать доступ уволенного.** Регулярно проверяйте список.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что означает принцип наименьших привилегий?",
  "options": [
    {
      "text": "Давать только необходимые права",
      "correct": true,
      "explanation": "Это снижает риск."
    },
    {
      "text": "Давать всем admin",
      "correct": false,
      "explanation": "Это противоположный подход."
    },
    {
      "text": "Запрещать любые права",
      "correct": false,
      "explanation": "Тогда нельзя работать."
    }
  ],
  "explanation": "Права должны быть минимальными."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает безопасности доступа?",
  "options": [
    {
      "text": "Роли и группы",
      "correct": true
    },
    {
      "text": "Токены с минимальными правами",
      "correct": true
    },
    {
      "text": "Регулярная проверка доступа",
      "correct": true
    },
    {
      "text": "Один общий пароль на команду",
      "correct": false,
      "explanation": "Нельзя понять, кто действовал."
    }
  ],
  "explanation": "Доступ должен быть управляемым и проверяемым."
}
```

## Куда дальше

- [Подписанные коммиты](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/podpisannye-kommitty.md)
- [Обновление зависимостей](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/obnovlenie-zavisimostey.md)
- [Секреты и .env](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/sekrety-i-env.md)
