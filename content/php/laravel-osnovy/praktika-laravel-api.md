---
title: Практика: API на Ларавел
description: Упражнение: CRUD API для постов на Ларавел с миграцией и ресурсом.
keywords: практика, Ларавел, API, CRUD, Eloquent, миграции, ресурсы

---

# Практика: API на Ларавел

Сделайте CRUD API для постов.

## 1. Модель и миграция

```bash
php artisan make:model Post -m
```

```php
<?php

Schema::create("posts", function (Blueprint $table) {
    $table->id();
    $table->string("title");
    $table->text("body");
    $table->boolean("published")->default(false);
    $table->timestamps();
});
```

## 2. Модель

```php
<?php

class Post extends Model
{
    protected $fillable = ["title", "body", "published"];

    protected $casts = ["published" => "boolean"];
}
```

## 3. Маршруты

```php
<?php

Route::apiResource("posts", PostController::class);
```

## 4. Контроллер

```php
<?php

public function store(Request $request)
{
    $data = $request->validate([
        "title" => ["required", "string", "max:255"],
        "body" => ["required", "string"],
        "published" => ["boolean"],
    ]);

    return PostResource::make(Post::create($data))
        ->response()
        ->setStatusCode(201);
}
```

## 5. Ресурс

```php
<?php

public function toArray(Request $request): array
{
    return [
        "id" => $this->id,
        "title" => $this->title,
        "published" => $this->published,
    ];
}
```

## 6. Проверка

```bash
curl -X POST http://127.0.0.1:8000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Тест","body":"Текст"}'
```

## Чек-лист

- [ ] Есть миграция и модель.
- [ ] Маршруты через `apiResource`.
- [ ] Валидация в контроллере.
- [ ] Ответ через Resource.
- [ ] Создание возвращает 201.

## Частые ошибки

- **Забыть `fillable`.**
- **Отдавать модель без Resource.**
- **Не валидировать данные.**
- **Не запускать миграции.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что вернуть при создании поста?",
  "options": [
    {
      "text": "201 и Resource",
      "correct": true,
      "explanation": "Это стандартный ответ."
    },
    {
      "text": "404",
      "correct": false,
      "explanation": "Это не найдено."
    },
    {
      "text": "HTML-страницу",
      "correct": false,
      "explanation": "Для API нужен JSON."
    }
  ],
  "explanation": "Создание подтверждается 201."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "Миграция и модель",
      "correct": true
    },
    {
      "text": "Маршруты и контроллер",
      "correct": true
    },
    {
      "text": "Валидация и Resource",
      "correct": true
    },
    {
      "text": "SQL в Blade-шаблоне",
      "correct": false,
      "explanation": "Это плохая практика."
    }
  ],
  "explanation": "Практика собирает типовой API."
}
```

## Куда дальше

- [Ларавел: основы](theme.html?path=content/php/laravel-osnovy/laravel-osnovy.md)
- [Практика: PHP-бэкенд](theme.html?path=content/php/praktika-php-backend/plan-i-trebovaniya.md)
- [Безопасность, тесты и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/bezopasnost-testy-deploy.md)
