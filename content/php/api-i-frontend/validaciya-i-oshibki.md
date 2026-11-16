---
title: Валидация и ошибки
description: Как проверять данные API и отдавать понятные ошибки без утечек.
keywords: PHP, API, валидация, ошибки, 422, JSON, filter_var

---

# Валидация и ошибки

API должен проверять данные на сервере и объяснять ошибки так, чтобы
фронтенд мог их показать.

## Проверка

```php
<?php

$errors = [];

$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);

if ($email === null || $email === false) {
    $errors["email"] = "Некорректный email";
}

if (trim($_POST["name"] ?? "") === "") {
    $errors["name"] = "Имя обязательно";
}
```

## Ответ с ошибкой

```php
<?php

if ($errors !== []) {
    http_response_code(422);

    header("Content-Type: application/json; charset=utf-8");
    echo json_encode([
        "error" => [
            "code" => "validation_error",
            "message" => "Проверьте поля",
            "fields" => $errors,
        ],
    ]);
    exit;
}
```

## Ошибки сервера

```php
<?php

try {
    // операция
} catch (Throwable $e) {
    error_log($e->getMessage());
    http_response_code(500);

    echo json_encode([
        "error" => [
            "code" => "server_error",
            "message" => "Внутренняя ошибка",
        ],
    ]);
}
```

## Частые ошибки

- **Проверять только на клиенте.**
- **Отдавать общий текст без полей.**
- **Показывать стек и SQL.**
- **Возвращать `200` при ошибке.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой статус использовать при ошибке валидации?",
  "options": [
    {
      "text": "422",
      "correct": true,
      "explanation": "Он означает ошибку данных."
    },
    {
      "text": "200",
      "correct": false,
      "explanation": "Это успех."
    },
    {
      "text": "301",
      "correct": false,
      "explanation": "Это редирект."
    }
  ],
  "explanation": "Для ошибок полей подходит 422."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что должно быть в ошибке API?",
  "options": [
    {
      "text": "Код ошибки",
      "correct": true
    },
    {
      "text": "Понятное сообщение",
      "correct": true
    },
    {
      "text": "Поля с ошибками",
      "correct": true
    },
    {
      "text": "Полный стек вызовов",
      "correct": false,
      "explanation": "Это раскрывает внутренности."
    }
  ],
  "explanation": "Ошибка должна помогать клиенту."
}
```

## Куда дальше

- [CORS и cookies](theme.html?path=content/php/api-i-frontend/cors-i-cookies.md)
- [Auth: сессии и JWT](theme.html?path=content/php/api-i-frontend/auth-session-jwt.md)
- [API и фронтенд](theme.html?path=content/php/api-i-frontend/api-i-frontend.md)
