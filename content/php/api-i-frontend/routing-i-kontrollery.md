---
title: Routing и контроллеры
description: Как разобрать URL, выбрать обработчик и не смешивать всё в одном файле.
keywords: PHP, routing, контроллеры, front controller, API, 404

---

# Routing и контроллеры

Роутинг сопоставляет метод и путь с обработчиком. Контроллер содержит
логику конкретного действия.

## Front controller

```php
<?php

$method = $_SERVER["REQUEST_METHOD"];
$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

$routes = [
    "GET /api/posts" => "listPosts",
    "POST /api/posts" => "createPost",
];

$key = $method . " " . $path;
$handler = $routes[$key] ?? null;

if ($handler === null) {
    http_response_code(404);
    echo json_encode(["error" => "Не найдено"]);
    exit;
}

$handler();
```

## Контроллер

```php
<?php

function listPosts(): void
{
    global $pdo;

    $posts = $pdo->query("SELECT id, title FROM posts")->fetchAll();

    header("Content-Type: application/json; charset=utf-8");
    echo json_encode(["data" => $posts]);
}
```

В реальном проекте зависимости передают явно, а не через `global`.

## Параметры пути

```php
<?php

if (preg_match("#^/api/posts/(\\d+)$#", $path, $matches)) {
    $id = (int) $matches[1];
    showPost($id);
}
```

## Частые ошибки

- **Один файл на всё приложение.**
- **Нет обработки 404.**
- **Смешивать HTML и JSON в одном эндпоинте.**
- **Доверять `REQUEST_URI` без разбора.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает роутинг?",
  "options": [
    {
      "text": "Сопоставляет запрос с обработчиком",
      "correct": true,
      "explanation": "Это навигация по API."
    },
    {
      "text": "Создаёт таблицы",
      "correct": false,
      "explanation": "Это миграции."
    },
    {
      "text": "Кодирует JSON",
      "correct": false,
      "explanation": "Это json_encode."
    }
  ],
  "explanation": "Роутинг выбирает код для запроса."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для API-роутинга?",
  "options": [
    {
      "text": "Учитывать HTTP-метод",
      "correct": true
    },
    {
      "text": "Обрабатывать 404",
      "correct": true
    },
    {
      "text": "Разделять контроллеры",
      "correct": true
    },
    {
      "text": "Игнорировать путь",
      "correct": false,
      "explanation": "Тогда все запросы смешаются."
    }
  ],
  "explanation": "Роутинг должен быть явным."
}
```

## Куда дальше

- [Валидация и ошибки](theme.html?path=content/php/api-i-frontend/validaciya-i-oshibki.md)
- [CORS и cookies](theme.html?path=content/php/api-i-frontend/cors-i-cookies.md)
- [Auth: сессии и JWT](theme.html?path=content/php/api-i-frontend/auth-session-jwt.md)
