---
title: CSRF и XSS в формах
description: Как защитить формы от поддельных запросов и вывода опасного HTML.
keywords: PHP, CSRF, XSS, формы, токен, htmlspecialchars, безопасность

---

# CSRF и XSS в формах

CSRF заставляет пользователя выполнить действие без его согласия. XSS
вставляет опасный код в страницу.

## CSRF-токен

```php
<?php

session_start();

if (empty($_SESSION["csrf"])) {
    $_SESSION["csrf"] = bin2hex(random_bytes(32));
}

$token = $_SESSION["csrf"];
```

В форме:

```html
<input type="hidden" name="csrf" value="<?= htmlspecialchars($token) ?>">
```

Проверка:

```php
<?php

$sent = $_POST["csrf"] ?? "";

if (!hash_equals($_SESSION["csrf"], $sent)) {
    http_response_code(403);
    exit("Неверный токен");
}
```

## XSS

```php
<?php

$name = $_POST["name"] ?? "";
$safe = htmlspecialchars($name, ENT_QUOTES, "UTF-8");

echo "Привет, " . $safe;
```

## Где ещё нужна защита

- вывод комментариев;
- имена файлов;
- URL-параметры;
- сообщения об ошибках.

## Частые ошибки

- **Не проверять CSRF-токен.**
- **Передавать токен в URL.**
- **Выводить пользовательский HTML без очистки.**
- **Доверять проверке только на клиенте.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "От чего защищает CSRF-токен?",
  "options": [
    {
      "text": "От поддельных запросов от имени пользователя",
      "correct": true,
      "explanation": "Токен подтверждает намерение."
    },
    {
      "text": "От медленного интернета",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "От SQL-инъекций",
      "correct": false,
      "explanation": "Для этого нужны подготовленные запросы."
    }
  ],
  "explanation": "CSRF-токен подтверждает форму."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает против XSS?",
  "options": [
    {
      "text": "`htmlspecialchars`",
      "correct": true
    },
    {
      "text": "Экранирование вывода",
      "correct": true
    },
    {
      "text": "Проверка входных данных",
      "correct": true
    },
    {
      "text": "Вывод HTML без обработки",
      "correct": false,
      "explanation": "Это и есть риск XSS."
    }
  ],
  "explanation": "XSS предотвращают экранированием и проверкой."
}
```

## Куда дальше

- [HTTP, формы и сессии](theme.html?path=content/php/http-formy-sessii/http-formy-sessii.md)
- [Практика: обработка формы](theme.html?path=content/php/http-formy-sessii/praktika-forma-obrabotka.md)
- [Безопасность, тесты и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/sql-inekcii-i-xss.md)
