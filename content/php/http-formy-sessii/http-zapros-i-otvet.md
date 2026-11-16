---
title: HTTP-запрос и ответ
description: Методы, заголовки, тело, статус-коды и то, как PHP получает запрос.
keywords: HTTP, запрос, ответ, методы, заголовки, статус-коды, PHP

---

# HTTP-запрос и ответ

HTTP — протокол запросов и ответов. PHP получает запрос от веб-сервера и
формирует ответ.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/php/_assets/http-formy-sessii/http-form-session.svg"
    alt="Путь формы: POST, валидация, сессия и ответ"
    width="900"
  >
  <figcaption>
    Форма — это HTTP-запрос, а ответ зависит от проверки данных.
  </figcaption>
</figure>

## Запрос

- метод: GET, POST, PUT, PATCH, DELETE;
- путь: `/users/42`;
- заголовки: `Content-Type`, `Authorization`;
- тело: данные формы или JSON.

## Ответ

- статус-код;
- заголовки;
- тело: HTML, JSON или файл.

## Статус-коды

- `200` — успех;
- `201` — создано;
- `400` — ошибка запроса;
- `401` — не авторизован;
- `403` — запрещено;
- `404` — не найдено;
- `500` — ошибка сервера.

## PHP и запрос

```php
<?php

$method = $_SERVER["REQUEST_METHOD"];
$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
```

## Частые ошибки

- **Путать GET и POST.** У них разное назначение.
- **Всегда отвечать `200`.** Клиент не поймёт ошибку.
- **Считать HTTP stateful.** Состояние хранят сессии и БД.
- **Доверять заголовкам.** Их можно подделать.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что означает статус `404`?",
  "options": [
    {
      "text": "Ресурс не найден",
      "correct": true,
      "explanation": "Это стандартный ответ для отсутствующего ресурса."
    },
    {
      "text": "Успешное создание",
      "correct": false,
      "explanation": "Для создания есть 201."
    },
    {
      "text": "Ошибка сервера",
      "correct": false,
      "explanation": "Для этого есть 500."
    }
  ],
  "explanation": "Статус-код сообщает результат запроса."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в HTTP-запрос?",
  "options": [
    {
      "text": "Метод",
      "correct": true
    },
    {
      "text": "Путь",
      "correct": true
    },
    {
      "text": "Заголовки",
      "correct": true
    },
    {
      "text": "Только пароль",
      "correct": false,
      "explanation": "Пароль — не обязательная часть запроса."
    }
  ],
  "explanation": "Запрос состоит из метода, пути, заголовков и тела."
}
```

## Куда дальше

- [GET, POST и валидация](theme.html?path=content/php/http-formy-sessii/get-post-i-validaciya.md)
- [Cookies и сессии](theme.html?path=content/php/http-formy-sessii/cookies-i-sessii.md)
- [HTTP, формы и сессии](theme.html?path=content/php/http-formy-sessii/http-formy-sessii.md)
