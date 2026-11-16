---
title: Установка и структура
description: Как создать проект Ларавел и понять, где что лежит.
keywords: PHP, Ларавел, установка, структура, Composer, Artisan, .env

---

# Установка и структура

Проект Ларавел создаётся через Composer и запускается через Artisan.

## Создание

```bash
composer create-project laravel/laravel app
cd app
php artisan serve
```

## `.env`

```text
APP_ENV=local
APP_DEBUG=true
DB_CONNECTION=mysql
DB_DATABASE=app
DB_USERNAME=app
DB_PASSWORD=secret
```

`.env` не коммитят. Для примера есть `.env.example`.

## Структура

- `app/` — код приложения;
- `routes/` — маршруты;
- `resources/views/` — Blade-шаблоны;
- `database/migrations/` — миграции;
- `config/` — конфигурация;
- `public/` — точка входа.

## Основные команды

```bash
php artisan route:list
php artisan migrate
php artisan make:controller PostController
```

## Частые ошибки

- **Коммитить `.env`.**
- **Забыть `APP_KEY`.**
- **Работать без `php artisan serve`.**
- **Менять `vendor/` вручную.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где лежат маршруты Ларавел?",
  "options": [
    {
      "text": "В `routes/`",
      "correct": true,
      "explanation": "Там web.php и api.php."
    },
    {
      "text": "В `public/`",
      "correct": false,
      "explanation": "Там точка входа."
    },
    {
      "text": "В `vendor/`",
      "correct": false,
      "explanation": "Там зависимости."
    }
  ],
  "explanation": "Маршруты описываются в `routes/`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про структуру?",
  "options": [
    {
      "text": "`app/` содержит код",
      "correct": true
    },
    {
      "text": "`database/migrations` содержит миграции",
      "correct": true
    },
    {
      "text": "`resources/views` содержит Blade",
      "correct": true
    },
    {
      "text": "`.env` нужно коммитить",
      "correct": false,
      "explanation": "Там секреты."
    }
  ],
  "explanation": "Структура Ларавел помогает ориентироваться."
}
```

## Куда дальше

- [Routes и контроллеры](theme.html?path=content/php/laravel-osnovy/routes-i-controllers.md)
- [Blade и views](theme.html?path=content/php/laravel-osnovy/blade-i-views.md)
- [Eloquent и модели](theme.html?path=content/php/laravel-osnovy/eloquent-i-modeli.md)
