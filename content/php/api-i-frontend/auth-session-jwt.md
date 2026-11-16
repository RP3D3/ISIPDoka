---
title: Auth: сессии и JWT
description: Как отличать вход через сессию и токен и не хранить секреты в браузере.
keywords: PHP, auth, сессии, JWT, токен, cookie, безопасность

---

# Auth: сессии и JWT

Аутентификация отвечает на вопрос «кто ты». Авторизация — «что тебе
можно».

## Сессии

```php
<?php

session_start();

if (password_verify($password, $user["password_hash"])) {
    session_regenerate_id(true);
    $_SESSION["user_id"] = $user["id"];
}
```

Браузер хранит только ID сессии в cookie. Данные — на сервере.

## JWT

JWT состоит из трёх частей:

```text
header.payload.signature
```

- header — алгоритм;
- payload — данные;
- signature — подпись.

Payload не шифруется. Не кладите туда пароли и секреты.

## Проверка JWT

```php
<?php

$parts = explode(".", $token);

if (count($parts) !== 3) {
    http_response_code(401);
    exit("Неверный токен");
}
```

В реальном проекте используйте проверенную библиотеку.

## Сессия или JWT

- сессия проще для одного backend;
- JWT удобен для нескольких сервисов;
- JWT сложнее отзывать;
- сессию проще инвалидировать.

## Частые ошибки

- **Хранить пароль в JWT.**
- **Не проверять подпись.**
- **Делать токен без срока жизни.**
- **Не менять ID сессии после входа.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что хранит браузер при сессионной аутентификации?",
  "options": [
    {
      "text": "ID сессии в cookie",
      "correct": true,
      "explanation": "Данные сессии остаются на сервере."
    },
    {
      "text": "Пароль в открытом виде",
      "correct": false,
      "explanation": "Это небезопасно."
    },
    {
      "text": "Всю базу данных",
      "correct": false,
      "explanation": "Это невозможно."
    }
  ],
  "explanation": "Сессия хранит данные на сервере."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для auth?",
  "options": [
    {
      "text": "Хешировать пароли",
      "correct": true
    },
    {
      "text": "Проверять срок токена",
      "correct": true
    },
    {
      "text": "Менять ID сессии после входа",
      "correct": true
    },
    {
      "text": "Класть пароль в payload JWT",
      "correct": false,
      "explanation": "Payload читается без секрета."
    }
  ],
  "explanation": "Auth требует защиты секретов и сессий."
}
```

## Куда дальше

- [API и фронтенд](theme.html?path=content/php/api-i-frontend/api-i-frontend.md)
- [Практика: API для фронтенда](theme.html?path=content/php/api-i-frontend/praktika-api-dlya-frontenda.md)
- [Безопасность, тесты и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/paroli-i-heshirovanie.md)
