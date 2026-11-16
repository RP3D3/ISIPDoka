---
title: Миграции и seeders
description: Как описывать схему базы и наполнять её тестовыми данными.
keywords: PHP, Ларавел, миграции, seeders, factories, схема БД

---

# Миграции и seeders

Миграции описывают изменения схемы. Seeders наполняют базу данными.

## Миграция

```bash
php artisan make:migration create_posts_table
```

```php
<?php

public function up(): void
{
    Schema::create("posts", function (Blueprint $table) {
        $table->id();
        $table->string("title");
        $table->text("body");
        $table->boolean("published")->default(false);
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists("posts");
}
```

## Запуск

```bash
php artisan migrate
php artisan migrate:rollback
```

## Seeder

```bash
php artisan make:seeder PostSeeder
```

```php
<?php

Post::factory()->count(20)->create();
```

## Правила

- миграции не редактируют после продакшена;
- у миграции есть `down`;
- seeders не запускают на проде без необходимости;
- перед миграцией делают бэкап.

## Частые ошибки

- **Менять старую миграцию в проде.**
- **Забыть `down`.**
- **Наполнять прод тестовыми данными.**
- **Запускать миграции без бэкапа.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает миграция?",
  "options": [
    {
      "text": "Меняет схему базы данных",
      "correct": true,
      "explanation": "Она описывает таблицы и поля."
    },
    {
      "text": "Создаёт HTML",
      "correct": false,
      "explanation": "Это Blade."
    },
    {
      "text": "Удаляет проект",
      "correct": false,
      "explanation": "Это не так."
    }
  ],
  "explanation": "Миграции управляют схемой."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про миграции?",
  "options": [
    {
      "text": "Имеют `up` и `down`",
      "correct": true
    },
    {
      "text": "Могут откатываться",
      "correct": true
    },
    {
      "text": "Перед ними полезен бэкап",
      "correct": true
    },
    {
      "text": "Их можно бесконечно менять в проде",
      "correct": false,
      "explanation": "Это ломает историю."
    }
  ],
  "explanation": "Миграции должны быть предсказуемыми."
}
```

## Куда дальше

- [Валидация и middleware](theme.html?path=content/php/laravel-osnovy/validaciya-i-middleware.md)
- [API Resources](theme.html?path=content/php/laravel-osnovy/laravel-api-resources.md)
- [Ларавел: основы](theme.html?path=content/php/laravel-osnovy/laravel-osnovy.md)
