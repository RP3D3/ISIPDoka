---
title: GET, POST и валидация
description: Как принимать данные, проверять их и не доверять пользователю.
keywords: PHP, GET, POST, валидация, filter_input, htmlspecialchars, форма

---

# GET, POST и валидация

GET используют для чтения, POST — для изменения. Любые данные из запроса
нужно проверять.

## GET

```php
<?php

$page = filter_input(INPUT_GET, "page", FILTER_VALIDATE_INT) ?: 1;
```

GET-параметры видны в URL. Не передавайте в них пароли и токены.

## POST

```php
<?php

$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
```

## Валидация

```php
<?php

$errors = [];

if ($email === null || $email === false) {
    $errors[] = "Некорректный email";
}

if ($errors) {
    http_response_code(422);
    echo "Проверьте форму";
    exit;
}
```

## Экранирование вывода

```php
<?php

$safe = htmlspecialchars($email, ENT_QUOTES, "UTF-8");
```

Валидация проверяет формат, экранирование защищает вывод.

## После POST

```php
<?php

header("Location: /success.php");
exit;
```

Редирект после POST не даёт отправить форму повторно при обновлении.

## Частые ошибки

- **Использовать `$_REQUEST`.** Смешивает GET, POST и cookies.
- **Проверять только на клиенте.** Сервер тоже обязан проверять.
- **Выводить данные без экранирования.**
- **Не делать редирект после POST.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `filter_input`?",
  "options": [
    {
      "text": "Берёт и проверяет значение из запроса",
      "correct": true,
      "explanation": "Это безопаснее прямого доступа."
    },
    {
      "text": "Создаёт базу данных",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Удаляет форму",
      "correct": false,
      "explanation": "Он читает данные."
    }
  ],
  "explanation": "`filter_input` помогает валидировать ввод."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно делать с данными формы?",
  "options": [
    {
      "text": "Проверять на сервере",
      "correct": true
    },
    {
      "text": "Экранировать вывод",
      "correct": true
    },
    {
      "text": "Ограничивать длину",
      "correct": true
    },
    {
      "text": "Вставлять в SQL без параметров",
      "correct": false,
      "explanation": "Это риск инъекции."
    }
  ],
  "explanation": "Ввод проверяется, вывод экранируется."
}
```

## Куда дальше

- [Cookies и сессии](theme.html?path=content/php/http-formy-sessii/cookies-i-sessii.md)
- [Файлы и загрузка](theme.html?path=content/php/http-formy-sessii/fayly-i-zagruzka.md)
- [CSRF и XSS в формах](theme.html?path=content/php/http-formy-sessii/csrf-i-xss-v-formah.md)
