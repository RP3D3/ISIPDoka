---
title: Валидация и middleware
description: Проверка запросов, FormRequest, auth и throttle в Ларавел.
keywords: PHP, Ларавел, валидация, FormRequest, middleware, throttle, auth

---

# Валидация и middleware

Валидация проверяет данные. Middleware выполняет код до или после
контроллера.

## Валидация

```php
<?php

$data = $request->validate([
    "title" => ["required", "string", "max:255"],
    "body" => ["required", "string"],
    "published" => ["boolean"],
]);
```

При ошибке Ларавел вернёт 422 и список полей.

## FormRequest

```bash
php artisan make:request StorePostRequest
```

```php
<?php

public function rules(): array
{
    return [
        "title" => ["required", "string", "max:255"],
    ];
}
```

## Middleware

```php
<?php

Route::middleware("auth:sanctum")->group(function () {
    Route::get("/me", fn () => auth()->user());
});
```

## Throttle

```php
<?php

Route::middleware("throttle:60,1")->group(function () {
    // не больше 60 запросов в минуту
});
```

## Частые ошибки

- **Проверять данные только в контроллере.**
- **Забывать авторизацию.**
- **Не ограничивать частоту запросов.**
- **Показывать внутренние ошибки.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `$request->validate`?",
  "options": [
    {
      "text": "Проверяет данные и возвращает 422 при ошибке",
      "correct": true,
      "explanation": "Это стандартная валидация Ларавел."
    },
    {
      "text": "Создаёт миграцию",
      "correct": false,
      "explanation": "Это Artisan."
    },
    {
      "text": "Удаляет модель",
      "correct": false,
      "explanation": "Это не так."
    }
  ],
  "explanation": "Валидация защищает данные."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для API?",
  "options": [
    {
      "text": "Валидация",
      "correct": true
    },
    {
      "text": "Авторизация",
      "correct": true
    },
    {
      "text": "Ограничение частоты",
      "correct": true
    },
    {
      "text": "Показ стека ошибок",
      "correct": false,
      "explanation": "Это раскрывает внутренности."
    }
  ],
  "explanation": "API требует проверки и ограничений."
}
```

## Куда дальше

- [API Resources](theme.html?path=content/php/laravel-osnovy/laravel-api-resources.md)
- [Ларавел: основы](theme.html?path=content/php/laravel-osnovy/laravel-osnovy.md)
- [Практика: API на Ларавел](theme.html?path=content/php/laravel-osnovy/praktika-laravel-api.md)
