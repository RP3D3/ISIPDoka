---
title: Ларавел: основы
description: Итог группы: структура, маршруты, контроллеры, Eloquent, миграции и API.
keywords: Ларавел, итог, routes, controllers, Eloquent, migrations, API

---

# Ларавел: основы

Главная идея группы: Ларавел задаёт структуру и ускоряет типовой бэкенд,
но не отменяет понимание PHP и баз данных.

## Что запомнить

- проект создаётся через Composer;
- маршруты лежат в `routes/`;
- контроллеры — в `app/Http/Controllers`;
- Blade отвечает за представление;
- Eloquent — за модели и связи;
- миграции — за схему БД;
- валидация — до записи;
- API Resources — за формат JSON.

## Чек-лист

- [ ] Я могу создать проект.
- [ ] Я понимаю, где лежат маршруты.
- [ ] Я не пишу SQL в шаблоне.
- [ ] Я использую `fillable`.
- [ ] Я делаю миграции с `down`.
- [ ] Я отдаю API через Resource.

## Частые ошибки

- **Логика в маршрутах.**
- **`{!! !!}` без необходимости.**
- **Модель без `fillable`.**
- **Миграции без бэкапа.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в Ларавел?",
  "options": [
    {
      "text": "Понять структуру и поток запроса",
      "correct": true,
      "explanation": "Тогда фреймворк помогает, а не мешает."
    },
    {
      "text": "Знать все команды Artisan",
      "correct": false,
      "explanation": "Команды можно смотреть."
    },
    {
      "text": "Писать всё в одном файле",
      "correct": false,
      "explanation": "Это противоречит структуре."
    }
  ],
  "explanation": "Понимание важнее заучивания."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "Маршруты и контроллеры",
      "correct": true
    },
    {
      "text": "Blade и Eloquent",
      "correct": true
    },
    {
      "text": "Миграции и API Resources",
      "correct": true
    },
    {
      "text": "Только CSS",
      "correct": false,
      "explanation": "Это не Ларавел-бэкенд."
    }
  ],
  "explanation": "Группа покрывает основы фреймворка."
}
```

## Куда дальше

- [Практика: API на Ларавел](theme.html?path=content/php/laravel-osnovy/praktika-laravel-api.md)
- [Практика: PHP-бэкенд](theme.html?path=content/php/praktika-php-backend/plan-i-trebovaniya.md)
- [Безопасность, тесты и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/bezopasnost-testy-deploy.md)
