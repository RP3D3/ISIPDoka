---
title: Практика: обработка формы
description: Упражнение: форма с валидацией, CSRF-токеном, сессией и редиректом.
keywords: практика, форма, валидация, CSRF, сессия, PHP

---

# Практика: обработка формы

Сделайте форму обратной связи с проверкой и защитой.

## 1. Форма

```html
<form method="post" action="contact.php">
  <input type="hidden" name="csrf" value="<?= htmlspecialchars($token) ?>">
  <input type="text" name="name">
  <input type="email" name="email">
  <textarea name="message"></textarea>
  <button type="submit">Отправить</button>
</form>
```

## 2. Старт сессии и токен

```php
<?php

session_start();

if (empty($_SESSION["csrf"])) {
    $_SESSION["csrf"] = bin2hex(random_bytes(32));
}

$token = $_SESSION["csrf"];
```

## 3. Проверка

```php
<?php

$errors = [];
$name = trim($_POST["name"] ?? "");
$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
$message = trim($_POST["message"] ?? "");

if ($name === "") {
    $errors[] = "Имя обязательно";
}

if ($email === null || $email === false) {
    $errors[] = "Некорректный email";
}

if (mb_strlen($message) < 10) {
    $errors[] = "Сообщение слишком короткое";
}
```

## 4. CSRF

```php
<?php

$sent = $_POST["csrf"] ?? "";

if (!hash_equals($_SESSION["csrf"], $sent)) {
    http_response_code(403);
    exit("Неверный токен");
}
```

## 5. Успех

```php
<?php

$_SESSION["flash"] = "Сообщение отправлено";
header("Location: /contact.php", true, 303);
exit;
```

## Чек-лист

- [ ] Токен создаётся один раз.
- [ ] Токен проверяется через `hash_equals`.
- [ ] Все поля проверяются на сервере.
- [ ] Вывод экранируется.
- [ ] После POST есть редирект.

## Частые ошибки

- **Проверять CSRF после сохранения.**
- **Не проверять email.**
- **Выводить сообщение без экранирования.**
- **Забывать `exit` после редиректа.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем проверять CSRF-токен?",
  "options": [
    {
      "text": "`hash_equals`",
      "correct": true,
      "explanation": "Он сравнивает строки безопасно."
    },
    {
      "text": "`==`",
      "correct": false,
      "explanation": "Лучше использовать hash_equals."
    },
    {
      "text": "`echo`",
      "correct": false,
      "explanation": "Это вывод, а не сравнение."
    }
  ],
  "explanation": "Для токенов нужна безопасная проверка."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "Валидация полей",
      "correct": true
    },
    {
      "text": "CSRF-токен",
      "correct": true
    },
    {
      "text": "Редирект после POST",
      "correct": true
    },
    {
      "text": "Показ пароля в URL",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Практика собирает безопасную форму."
}
```

## Куда дальше

- [HTTP, формы и сессии](theme.html?path=content/php/http-formy-sessii/http-formy-sessii.md)
- [Базы данных и PDO](theme.html?path=content/php/bazy-dannyh-i-pdo/sql-dlya-php.md)
- [API и фронтенд](theme.html?path=content/php/api-i-frontend/json-i-format-otveta.md)
