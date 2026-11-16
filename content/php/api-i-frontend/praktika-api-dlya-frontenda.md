---
title: Практика: API для фронтенда
description: Упражнение: JSON-эндпоинт с валидацией, статус-кодами и CORS.
keywords: практика, API, PHP, JSON, CORS, валидация

---

# Практика: API для фронтенда

Сделайте эндпоинт для списка задач и создания задачи.

## 1. Маршрут

```php
<?php

$method = $_SERVER["REQUEST_METHOD"];
$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

if ($path !== "/api/tasks") {
    http_response_code(404);
    exit;
}
```

## 2. CORS

```php
<?php

header("Access-Control-Allow-Origin: https://app.example.com");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($method === "OPTIONS") {
    http_response_code(204);
    exit;
}
```

## 3. GET

```php
<?php

if ($method === "GET") {
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode(["data" => $tasks]);
    exit;
}
```

## 4. POST

```php
<?php

if ($method === "POST") {
    $raw = file_get_contents("php://input");
    $data = json_decode($raw, true);

    $title = trim($data["title"] ?? "");

    if ($title === "") {
        http_response_code(422);
        echo json_encode([
            "error" => [
                "code" => "validation_error",
                "message" => "Title обязателен",
            ],
        ]);
        exit;
    }

    http_response_code(201);
    echo json_encode(["data" => ["title" => $title]]);
    exit;
}
```

## 5. Проверка с фронтенда

```js
const response = await fetch("https://api.example.com/api/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Новая задача" }),
});

console.log(response.status, await response.json());
```

## Чек-лист

- [ ] Есть `Content-Type: application/json`.
- [ ] GET не меняет данные.
- [ ] POST возвращает 201.
- [ ] Ошибка валидации возвращает 422.
- [ ] CORS разрешает только нужный домен.

## Частые ошибки

- **Отдавать массив без `json_encode`.**
- **Возвращать 200 на ошибку.**
- **Открывать CORS для всех.**
- **Не читать `php://input` для JSON.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что вернуть при успешном создании задачи?",
  "options": [
    {
      "text": "201 и JSON с задачей",
      "correct": true,
      "explanation": "Это стандартный ответ на создание."
    },
    {
      "text": "404",
      "correct": false,
      "explanation": "Это не найдено."
    },
    {
      "text": "500",
      "correct": false,
      "explanation": "Это ошибка сервера."
    }
  ],
  "explanation": "Создание подтверждается статусом 201."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "GET и POST",
      "correct": true
    },
    {
      "text": "JSON и статус-коды",
      "correct": true
    },
    {
      "text": "Валидация и CORS",
      "correct": true
    },
    {
      "text": "Вывод HTML вместо JSON",
      "correct": false,
      "explanation": "Для API нужен JSON."
    }
  ],
  "explanation": "Практика собирает минимальный API."
}
```

## Куда дальше

- [API и фронтенд](theme.html?path=content/php/api-i-frontend/api-i-frontend.md)
- [Безопасность, тесты и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/sql-inekcii-i-xss.md)
- [Ларавел: основы](theme.html?path=content/php/laravel-osnovy/zachem-laravel.md)
