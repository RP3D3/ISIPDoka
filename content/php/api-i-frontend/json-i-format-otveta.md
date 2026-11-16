---
title: JSON и формат ответа
description: Как отдавать JSON, кодировать данные и не ломать контракт с фронтендом.
keywords: PHP, JSON, json_encode, json_decode, API, Content-Type

---

# JSON и формат ответа

JSON — основной формат обмена с фронтендом. Важно отдавать его
предсказуемо и с правильным заголовком.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/php/_assets/api-i-frontend/api-contract.svg"
    alt="Фронтенд, HTTP, PHP API и JSON-ответ"
    width="900"
  >
  <figcaption>
    Контракт API важнее конкретного фреймворка.
  </figcaption>
</figure>

## Отправка

```php
<?php

header("Content-Type: application/json; charset=utf-8");

echo json_encode([
    "data" => [
        "id" => 1,
        "name" => "Аня",
    ],
]);
```

## Чтение

```php
<?php

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(["error" => "Некорректный JSON"]);
    exit;
}
```

## Единый формат

```json
{
  "data": {},
  "error": null
}
```

Или ошибка:

```json
{
  "data": null,
  "error": {
    "code": "validation_error",
    "message": "Email обязателен"
  }
}
```

Главное — не менять формат от запроса к запросу.

## Частые ошибки

- **Отдавать массив без `json_encode`.**
- **Забывать `Content-Type`.**
- **Игнорировать `json_last_error`.**
- **Менять структуру ответа в разных эндпоинтах.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `json_encode`?",
  "options": [
    {
      "text": "Преобразует данные PHP в JSON",
      "correct": true,
      "explanation": "Это нужно для ответа API."
    },
    {
      "text": "Читает JSON из базы",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Создаёт HTML",
      "correct": false,
      "explanation": "Это не JSON."
    }
  ],
  "explanation": "`json_encode` сериализует данные."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для JSON-ответа?",
  "options": [
    {
      "text": "Заголовок `Content-Type`",
      "correct": true
    },
    {
      "text": "Единый формат",
      "correct": true
    },
    {
      "text": "Проверка ошибок кодирования",
      "correct": true
    },
    {
      "text": "Случайная структура",
      "correct": false,
      "explanation": "Фронтенду нужен стабильный контракт."
    }
  ],
  "explanation": "JSON должен быть предсказуемым."
}
```

## Куда дальше

- [REST и статус-коды](theme.html?path=content/php/api-i-frontend/rest-i-status-kody.md)
- [Routing и контроллеры](theme.html?path=content/php/api-i-frontend/routing-i-kontrollery.md)
- [Валидация и ошибки](theme.html?path=content/php/api-i-frontend/validaciya-i-oshibki.md)
