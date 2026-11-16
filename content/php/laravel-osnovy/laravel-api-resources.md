---
title: API Resources
description: Как отдавать модели через ресурсы и не раскрывать лишние поля.
keywords: PHP, Ларавел, API Resources, JSON, pagination, сериализация

---

# API Resources

API Resource превращает модель в JSON-ответ. Это помогает держать формат
стабильным.

## Создание

```bash
php artisan make:resource PostResource
```

## Ресурс

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "published" => $this->published,
            "created_at" => $this->created_at->toIso8601String(),
        ];
    }
}
```

## Использование

```php
<?php

return PostResource::make($post);
```

Коллекция:

```php
<?php

return PostResource::collection(Post::paginate(20));
```

## Зачем

- скрывает лишние поля;
- фиксирует формат;
- упрощает пагинацию;
- отделяет модель от API.

## Частые ошибки

- **Возвращать модель напрямую.**
- **Отдавать пароль или токен.**
- **Менять формат без версии.**
- **Забывать пагинацию.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен API Resource?",
  "options": [
    {
      "text": "Чтобы управлять форматом JSON",
      "correct": true,
      "explanation": "Он отделяет модель от ответа."
    },
    {
      "text": "Чтобы создавать таблицы",
      "correct": false,
      "explanation": "Это миграции."
    },
    {
      "text": "Чтобы ускорить CSS",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "Ресурс фиксирует контракт API."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про API Resources?",
  "options": [
    {
      "text": "Скрывают лишние поля",
      "correct": true
    },
    {
      "text": "Поддерживают коллекции",
      "correct": true
    },
    {
      "text": "Упрощают пагинацию",
      "correct": true
    },
    {
      "text": "Автоматически защищают от SQL-инъекций",
      "correct": false,
      "explanation": "Защита — в запросах."
    }
  ],
  "explanation": "Ресурсы управляют представлением данных."
}
```

## Куда дальше

- [Ларавел: основы](theme.html?path=content/php/laravel-osnovy/laravel-osnovy.md)
- [Практика: API на Ларавел](theme.html?path=content/php/laravel-osnovy/praktika-laravel-api.md)
- [Практика: PHP-бэкенд](theme.html?path=content/php/praktika-php-backend/plan-i-trebovaniya.md)
