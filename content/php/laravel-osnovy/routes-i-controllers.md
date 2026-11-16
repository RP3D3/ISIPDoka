---
title: Routes и контроллеры
description: Маршруты, ресурсные контроллеры и привязка моделей в Ларавел.
keywords: PHP, Ларавел, routes, controllers, resource, route model binding

---

# Routes и контроллеры

Маршрут связывает URL и метод с контроллером. Контроллер выполняет
действие.

## Маршрут

```php
<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get("/posts", [PostController::class, "index"]);
Route::post("/posts", [PostController::class, "store"]);
```

## Ресурсный контроллер

```php
<?php

Route::resource("posts", PostController::class);
```

Он создаёт маршруты для index, create, store, show, edit, update, destroy.

## Контроллер

```php
<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::all();
    }

    public function show(Post $post)
    {
        return $post;
    }
}
```

## Route model binding

Ларавел сам найдёт модель по ID и вернёт 404, если её нет.

## Частые ошибки

- **Писать всю логику в `routes/web.php`.**
- **Не использовать контроллеры.**
- **Забывать про 404.**
- **Путать `api.php` и `web.php`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `Route::resource`?",
  "options": [
    {
      "text": "Создаёт набор CRUD-маршрутов",
      "correct": true,
      "explanation": "Это удобно для типовых ресурсов."
    },
    {
      "text": "Создаёт базу данных",
      "correct": false,
      "explanation": "Это миграции."
    },
    {
      "text": "Удаляет контроллер",
      "correct": false,
      "explanation": "Это не так."
    }
  ],
  "explanation": "`Route::resource` генерирует маршруты."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про контроллеры?",
  "options": [
    {
      "text": "Содержат логику действия",
      "correct": true
    },
    {
      "text": "Могут принимать модель",
      "correct": true
    },
    {
      "text": "Возвращают ответ",
      "correct": true
    },
    {
      "text": "Должны содержать HTML-вёрстку",
      "correct": false,
      "explanation": "Вёрстка — в Blade."
    }
  ],
  "explanation": "Контроллер связывает запрос и данные."
}
```

## Куда дальше

- [Blade и views](theme.html?path=content/php/laravel-osnovy/blade-i-views.md)
- [Eloquent и модели](theme.html?path=content/php/laravel-osnovy/eloquent-i-modeli.md)
- [Миграции и seeders](theme.html?path=content/php/laravel-osnovy/migracii-i-seeders.md)
