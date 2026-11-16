---
title: Eloquent и модели
description: Модели, таблицы, fillable, casts и связи в Eloquent.
keywords: PHP, Ларавел, Eloquent, модели, fillable, casts, связи

---

# Eloquent и модели

Eloquent — ORM Ларавел. Модель представляет таблицу и позволяет работать
с ней через объекты.

## Модель

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ["title", "body", "published"];

    protected $casts = [
        "published" => "boolean",
        "created_at" => "datetime",
    ];
}
```

## Запросы

```php
<?php

$posts = Post::where("published", true)
    ->orderByDesc("created_at")
    ->limit(10)
    ->get();
```

## Создание

```php
<?php

$post = Post::create([
    "title" => "Новый пост",
    "body" => "Текст",
    "published" => false,
]);
```

## Связи

```php
<?php

public function user()
{
    return $this->belongsTo(User::class);
}
```

## Частые ошибки

- **Забыть `fillable`.** Массовое заполнение не сработает.
- **Доверять всем полям из запроса.**
- **Не использовать `casts`.**
- **Делать N+1 без `with`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен `$fillable`?",
  "options": [
    {
      "text": "Ограничивает поля для массового заполнения",
      "correct": true,
      "explanation": "Это защита от лишних полей."
    },
    {
      "text": "Создаёт таблицу",
      "correct": false,
      "explanation": "Это миграции."
    },
    {
      "text": "Удаляет модель",
      "correct": false,
      "explanation": "Это не так."
    }
  ],
  "explanation": "`fillable` защищает от mass assignment."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Eloquent?",
  "options": [
    {
      "text": "Модель связана с таблицей",
      "correct": true
    },
    {
      "text": "Есть связи между моделями",
      "correct": true
    },
    {
      "text": "Можно задавать casts",
      "correct": true
    },
    {
      "text": "SQL писать нельзя",
      "correct": false,
      "explanation": "Можно, но обычно не нужно."
    }
  ],
  "explanation": "Eloquent упрощает работу с БД."
}
```

## Куда дальше

- [Миграции и seeders](theme.html?path=content/php/laravel-osnovy/migracii-i-seeders.md)
- [Валидация и middleware](theme.html?path=content/php/laravel-osnovy/validaciya-i-middleware.md)
- [API Resources](theme.html?path=content/php/laravel-osnovy/laravel-api-resources.md)
