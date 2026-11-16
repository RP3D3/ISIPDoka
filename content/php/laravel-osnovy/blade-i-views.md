---
title: Blade и views
description: Шаблоны Ларавел, экранирование и layouts без логики в представлении.
keywords: PHP, Ларавел, Blade, views, layouts, экранирование

---

# Blade и views

Blade — шаблонизатор Ларавел. Он подставляет данные и помогает не
смешивать PHP и HTML.

## Шаблон

```blade
<h1>{{ $post->title }}</h1>

@if ($post->published)
  <p>Опубликовано</p>
@endif

@foreach ($posts as $post)
  <article>{{ $post->title }}</article>
@endforeach
```

`{{ }}` экранирует вывод.

## Layout

```blade
<html>
<body>
  @yield("content")
</body>
</html>
```

Дочерний шаблон:

```blade
@extends("layouts.app")

@section("content")
  <h1>{{ $title }}</h1>
@endsection
```

## Компоненты

```blade
<x-alert type="success">
  Сохранено
</x-alert>
```

## Частые ошибки

- **Использовать `{!! !!}` без необходимости.** Это риск XSS.
- **Писать бизнес-логику в шаблоне.**
- **Дублировать layout.**
- **Забывать экранирование.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `{{ $title }}`?",
  "options": [
    {
      "text": "Выводит значение с экранированием",
      "correct": true,
      "explanation": "Это безопасный вывод Blade."
    },
    {
      "text": "Выполняет SQL",
      "correct": false,
      "explanation": "Это не так."
    },
    {
      "text": "Удаляет переменную",
      "correct": false,
      "explanation": "Она только выводит."
    }
  ],
  "explanation": "`{{ }}` экранирует HTML."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Blade?",
  "options": [
    {
      "text": "Поддерживает layouts",
      "correct": true
    },
    {
      "text": "Поддерживает компоненты",
      "correct": true
    },
    {
      "text": "Экранирует вывод через `{{ }}`",
      "correct": true
    },
    {
      "text": "Требует писать SQL в шаблоне",
      "correct": false,
      "explanation": "SQL — в моделях и контроллерах."
    }
  ],
  "explanation": "Blade отвечает за представление."
}
```

## Куда дальше

- [Eloquent и модели](theme.html?path=content/php/laravel-osnovy/eloquent-i-modeli.md)
- [Миграции и seeders](theme.html?path=content/php/laravel-osnovy/migracii-i-seeders.md)
- [Валидация и middleware](theme.html?path=content/php/laravel-osnovy/validaciya-i-middleware.md)
