---
title: Безопасность, тесты и деплой
description: Итог группы: защита, пароли, секреты, тесты и выкатка PHP-бэкенда.
keywords: безопасность, тесты, деплой, итог, PHP, PHPUnit, Docker

---

# Безопасность, тесты и деплой

Главная идея группы: безопасность и проверка — не отдельный этап, а
часть обычной разработки.

## Что запомнить

- SQL-инъекции предотвращают параметрами;
- XSS — экранированием вывода;
- CSRF — токеном;
- пароли — `password_hash`;
- секреты — в окружении;
- тесты — до деплоя;
- деплой — с бэкапом и healthcheck.

## Чек-лист

- [ ] Нет склейки SQL с вводом.
- [ ] Вывод экранирован.
- [ ] Формы защищены CSRF-токеном.
- [ ] Пароли хранятся в виде хеша.
- [ ] `.env` не в репозитории.
- [ ] Есть тесты и healthcheck.

## Частые ошибки

- **Считать безопасность «потом».**
- **Деплоить без тестов.**
- **Хранить секреты в образе.**
- **Показывать ошибки пользователю.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в безопасности бэкенда?",
  "options": [
    {
      "text": "Проверять ввод, экранировать вывод и защищать секреты",
      "correct": true,
      "explanation": "Это базовые меры."
    },
    {
      "text": "Скрывать все ошибки",
      "correct": false,
      "explanation": "Их нужно логировать."
    },
    {
      "text": "Использовать только HTTPS",
      "correct": false,
      "explanation": "HTTPS важен, но не заменяет валидацию."
    }
  ],
  "explanation": "Безопасность складывается из привычек."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "SQL-инъекции и XSS",
      "correct": true
    },
    {
      "text": "CSRF и пароли",
      "correct": true
    },
    {
      "text": "Тесты и Docker",
      "correct": true
    },
    {
      "text": "Только дизайн",
      "correct": false,
      "explanation": "Это не тема безопасности."
    }
  ],
  "explanation": "Группа покрывает защиту и выкатку."
}
```

## Куда дальше

- [Практика: безопасный бэкенд](theme.html?path=content/php/bezopasnost-testy-deploy/praktika-bezopasnyy-backend.md)
- [Ларавел: основы](theme.html?path=content/php/laravel-osnovy/zachem-laravel.md)
- [Практика: PHP-бэкенд](theme.html?path=content/php/praktika-php-backend/plan-i-trebovaniya.md)
