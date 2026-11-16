---
title: Cookies и сессии
description: Как PHP хранит состояние между запросами и какие настройки безопасности важны.
keywords: PHP, cookies, сессии, session_start, httponly, samesite, безопасность

---

# Cookies и сессии

HTTP не хранит состояние. Cookies и сессии позволяют узнать пользователя
на следующем запросе.

## Cookies

```php
<?php

setcookie("theme", "dark", [
    "expires" => time() + 60 * 60 * 24 * 30,
    "path" => "/",
    "httponly" => true,
    "samesite" => "Lax",
]);
```

Чтение:

```php
<?php

$theme = $_COOKIE["theme"] ?? "light";
```

## Сессии

```php
<?php

session_start();

$_SESSION["user_id"] = 42;
```

На следующем запросе:

```php
<?php

session_start();

if (isset($_SESSION["user_id"])) {
    echo "Пользователь " . $_SESSION["user_id"];
}
```

## Безопасность

- `httponly` запрещает доступ из JavaScript;
- `secure` отправляет cookie только по HTTPS;
- `samesite` ограничивает запросы с других сайтов;
- после входа меняйте ID сессии.

## Частые ошибки

- **Хранить пароль в cookie.** Это небезопасно.
- **Не ставить `httponly`.**
- **Не менять ID сессии после входа.**
- **Хранить в сессии слишком много данных.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужна сессия?",
  "options": [
    {
      "text": "Чтобы хранить состояние между запросами",
      "correct": true,
      "explanation": "HTTP сам состояние не хранит."
    },
    {
      "text": "Чтобы ускорить CSS",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Чтобы заменить базу данных",
      "correct": false,
      "explanation": "Сессия не заменяет БД."
    }
  ],
  "explanation": "Сессия связывает запросы пользователя."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для безопасности cookies?",
  "options": [
    {
      "text": "`httponly`",
      "correct": true
    },
    {
      "text": "`secure` на HTTPS",
      "correct": true
    },
    {
      "text": "`samesite`",
      "correct": true
    },
    {
      "text": "Хранить пароль в открытом виде",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Настройки cookie снижают риски."
}
```

## Куда дальше

- [Файлы и загрузка](theme.html?path=content/php/http-formy-sessii/fayly-i-zagruzka.md)
- [Headers и редиректы](theme.html?path=content/php/http-formy-sessii/headers-i-redirekty.md)
- [CSRF и XSS в формах](theme.html?path=content/php/http-formy-sessii/csrf-i-xss-v-formah.md)
