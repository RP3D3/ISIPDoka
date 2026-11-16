---
title: Зачем Ларавел
description: Что даёт фреймворк Ларавел и когда он уместен.
keywords: PHP, Ларавел, Laravel, MVC, Eloquent, Artisan, фреймворк

---

# Зачем Ларавел

Ларавел — популярный PHP-фреймворк. Он даёт готовую структуру, ORM,
маршруты, шаблоны и инструменты для API.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/php/_assets/laravel-osnovy/laravel-flow.svg"
    alt="Route, Controller, Model и View или JSON в Ларавел"
    width="900"
  >
  <figcaption>
    Ларавел задаёт поток запроса и структуру проекта.
  </figcaption>
</figure>

## Что внутри

- маршруты и контроллеры;
- Eloquent ORM;
- миграции;
- Blade-шаблоны;
- валидация;
- middleware;
- Artisan CLI.

## Когда уместен

- API для фронтенда;
- админки;
- SaaS;
- проекты, где важна скорость разработки.

## Когда не нужен

- маленький скрипт;
- учебная задача на чистом PHP;
- жёсткие ограничения по зависимостям.

## Частые ошибки

- **Использовать фреймворк без понимания PHP.**
- **Писать логику в маршрутах.**
- **Игнорировать документацию.**
- **Добавлять пакеты без необходимости.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что даёт Ларавел?",
  "options": [
    {
      "text": "Готовую структуру и инструменты для бэкенда",
      "correct": true,
      "explanation": "Это его основная ценность."
    },
    {
      "text": "Заменяет знание PHP",
      "correct": false,
      "explanation": "Основы PHP всё равно нужны."
    },
    {
      "text": "Работает только с CSS",
      "correct": false,
      "explanation": "Это бэкенд-фреймворк."
    }
  ],
  "explanation": "Ларавел ускоряет типовые задачи."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что есть в Ларавел?",
  "options": [
    {
      "text": "Маршруты",
      "correct": true
    },
    {
      "text": "Eloquent ORM",
      "correct": true
    },
    {
      "text": "Миграции",
      "correct": true
    },
    {
      "text": "Только HTML-редактор",
      "correct": false,
      "explanation": "Это не главное."
    }
  ],
  "explanation": "Ларавел покрывает типовой бэкенд."
}
```

## Куда дальше

- [Установка и структура](theme.html?path=content/php/laravel-osnovy/ustanovka-i-struktura.md)
- [Routes и контроллеры](theme.html?path=content/php/laravel-osnovy/routes-i-controllers.md)
- [Blade и views](theme.html?path=content/php/laravel-osnovy/blade-i-views.md)
