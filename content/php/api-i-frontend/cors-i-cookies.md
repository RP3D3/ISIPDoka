---
title: CORS и cookies
description: Как фронтенд на другом домене обращается к API и как передавать cookies.
keywords: PHP, CORS, cookies, SameSite, credentials, preflight, API

---

# CORS и cookies

CORS — механизм браузера, который разрешает или запрещает запросы с
другого домена.

## Заголовки

```php
<?php

$allowed = "https://app.example.com";

header("Access-Control-Allow-Origin: " . $allowed);
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS");
```

## Preflight

Браузер сначала отправляет `OPTIONS`. Сервер должен ответить без тела и с
разрешёнными заголовками.

```php
<?php

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}
```

## Cookies

```php
<?php

setcookie("session", $id, [
    "httponly" => true,
    "secure" => true,
    "samesite" => "Lax",
    "path" => "/",
]);
```

На фронтенде:

```js
fetch("https://api.example.com/me", {
  credentials: "include",
});
```

## Частые ошибки

- **`Access-Control-Allow-Origin: *` вместе с credentials.** Браузер
  запретит.
- **Не обрабатывать `OPTIONS`.**
- **Открывать CORS для всех доменов.**
- **Хранить токен в cookie без `httponly`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое preflight?",
  "options": [
    {
      "text": "Предварительный OPTIONS-запрос",
      "correct": true,
      "explanation": "Браузер проверяет разрешения."
    },
    {
      "text": "Первый GET-запрос",
      "correct": false,
      "explanation": "Это не preflight."
    },
    {
      "text": "Создание cookie",
      "correct": false,
      "explanation": "Это отдельная операция."
    }
  ],
  "explanation": "Preflight проверяет CORS-правила."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для CORS и cookies?",
  "options": [
    {
      "text": "Разрешать конкретный домен",
      "correct": true
    },
    {
      "text": "Обрабатывать `OPTIONS`",
      "correct": true
    },
    {
      "text": "Использовать `httponly`",
      "correct": true
    },
    {
      "text": "Разрешать все домены с credentials",
      "correct": false,
      "explanation": "Это небезопасно и часто запрещено."
    }
  ],
  "explanation": "CORS должен быть узким и явным."
}
```

## Куда дальше

- [Auth: сессии и JWT](theme.html?path=content/php/api-i-frontend/auth-session-jwt.md)
- [API и фронтенд](theme.html?path=content/php/api-i-frontend/api-i-frontend.md)
- [Практика: API для фронтенда](theme.html?path=content/php/api-i-frontend/praktika-api-dlya-frontenda.md)
