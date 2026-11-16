---
title: CSRF и сессии
description: Защита форм, cookie и сессий от подделки и перехвата.
keywords: PHP, CSRF, сессии, cookie, SameSite, безопасность

---

# CSRF и сессии

CSRF заставляет браузер пользователя отправить запрос, который тот не
планировал. Сессии и cookie нужно защищать.

## CSRF-токен

```php
<?php

session_start();

$_SESSION["csrf"] ??= bin2hex(random_bytes(32));
$token = $_SESSION["csrf"];
```

В форме:

```html
<input type="hidden" name="csrf" value="<?= htmlspecialchars($token) ?>">
```

Проверка:

```php
<?php

if (!hash_equals($_SESSION["csrf"], $_POST["csrf"] ?? "")) {
    http_response_code(403);
    exit("Неверный токен");
}
```

## Cookie

```php
<?php

session_set_cookie_params([
    "httponly" => true,
    "secure" => true,
    "samesite" => "Lax",
]);
```

## Сессия

```php
<?php

session_start();
session_regenerate_id(true);
```

Меняйте ID после входа и выхода.

## Частые ошибки

- **Не проверять CSRF-токен.**
- **Передавать токен в URL.**
- **Не ставить `httponly`.**
- **Не менять ID сессии после входа.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что защищает CSRF-токен?",
  "options": [
    {
      "text": "От поддельных запросов от имени пользователя",
      "correct": true,
      "explanation": "Токен подтверждает форму."
    },
    {
      "text": "От SQL-инъекций",
      "correct": false,
      "explanation": "Для этого нужны параметры."
    },
    {
      "text": "От медленной сети",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "CSRF-токен проверяет намерение."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для сессий?",
  "options": [
    {
      "text": "`httponly`",
      "correct": true
    },
    {
      "text": "`secure`",
      "correct": true
    },
    {
      "text": "`samesite`",
      "correct": true
    },
    {
      "text": "Хранить пароль в cookie",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Cookie и сессии требуют настроек безопасности."
}
```

## Куда дальше

- [Пароли и хеширование](theme.html?path=content/php/bezopasnost-testy-deploy/paroli-i-heshirovanie.md)
- [Секреты и конфигурация](theme.html?path=content/php/bezopasnost-testy-deploy/sekrety-i-konfiguraciya.md)
- [Безопасность, тесты и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/bezopasnost-testy-deploy.md)
