---
title: Секреты и конфигурация
description: Где хранить пароли, ключи и настройки и как не закоммитить их.
keywords: PHP, секреты, конфигурация, .env, getenv, безопасность

---

# Секреты и конфигурация

Секреты — пароли, токены, ключи. Они не должны попадать в репозиторий и
логи.

## `.env`

```text
DB_DSN=mysql:host=127.0.0.1;dbname=app;charset=utf8mb4
DB_USER=app
DB_PASSWORD=secret
```

Файл `.env` добавляют в `.gitignore`.

## Чтение

```php
<?php

$dsn = getenv("DB_DSN");
$user = getenv("DB_USER");
$password = getenv("DB_PASSWORD");
```

## Конфигурация

```php
<?php

return [
    "db" => [
        "dsn" => getenv("DB_DSN"),
        "user" => getenv("DB_USER"),
        "password" => getenv("DB_PASSWORD"),
    ],
];
```

## Правила

- не коммитить `.env`;
- не печатать секреты в лог;
- не передавать их во фронтенд;
- менять при утечке;
- у разных окружений разные секреты.

## Частые ошибки

- **Пароль в коде.**
- **`.env` в репозитории.**
- **Секреты в Docker-образе.**
- **Вывод переменных окружения в браузер.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где хранить секреты?",
  "options": [
    {
      "text": "В переменных окружения",
      "correct": true,
      "explanation": "Они не попадают в код."
    },
    {
      "text": "В репозитории",
      "correct": false,
      "explanation": "Это утечка."
    },
    {
      "text": "В HTML-комментариях",
      "correct": false,
      "explanation": "Это видно клиенту."
    }
  ],
  "explanation": "Секреты хранят вне кода."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для конфигурации?",
  "options": [
    {
      "text": "`.env` в `.gitignore`",
      "correct": true
    },
    {
      "text": "Разные секреты для окружений",
      "correct": true
    },
    {
      "text": "Не логировать секреты",
      "correct": true
    },
    {
      "text": "Коммитить пароль для удобства",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Конфигурация должна быть безопасной."
}
```

## Куда дальше

- [PHPUnit и тестирование](theme.html?path=content/php/bezopasnost-testy-deploy/phpunit-i-testirovanie.md)
- [Docker и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/docker-i-deploy.md)
- [Безопасность, тесты и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/bezopasnost-testy-deploy.md)
