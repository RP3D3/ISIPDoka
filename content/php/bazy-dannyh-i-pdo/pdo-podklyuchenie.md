---
title: Подключение PDO
description: DSN, настройки PDO, кодировка и безопасное подключение к базе.
keywords: PHP, PDO, подключение, DSN, MySQL, PostgreSQL, SQLite

---

# Подключение PDO

PDO — единый интерфейс к разным базам данных. Подключение настраивается
через DSN и параметры.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/php/_assets/bazy-dannyh-i-pdo/pdo-flow.svg"
    alt="PHP, PDO, подготовленный запрос и база данных"
    width="900"
  >
  <figcaption>
    PDO отделяет код от конкретной базы данных.
  </figcaption>
</figure>

## Подключение

```php
<?php

declare(strict_types=1);

$dsn = "mysql:host=127.0.0.1;dbname=app;charset=utf8mb4";

$pdo = new PDO($dsn, "app", "secret", [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
]);
```

## DSN

- MySQL: `mysql:host=...;dbname=...;charset=utf8mb4`
- PostgreSQL: `pgsql:host=...;dbname=...`
- SQLite: `sqlite:/path/to/db.sqlite`

## Настройки

- `ERRMODE_EXCEPTION` — ошибки через исключения;
- `FETCH_ASSOC` — строки как массивы;
- `EMULATE_PREPARES = false` — настоящие подготовленные запросы.

## Конфигурация

Параметры подключения храните в переменных окружения, а не в коде.

```php
<?php

$dsn = getenv("DB_DSN");
$user = getenv("DB_USER");
$password = getenv("DB_PASSWORD");
```

## Частые ошибки

- **Хардкодить пароль в репозитории.**
- **Использовать root в приложении.**
- **Не указывать кодировку.**
- **Показывать текст ошибки БД пользователю.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое DSN?",
  "options": [
    {
      "text": "Строка подключения к базе",
      "correct": true,
      "explanation": "Она описывает драйвер и параметры."
    },
    {
      "text": "Тип HTML-формы",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Функция сортировки",
      "correct": false,
      "explanation": "Это SQL."
    }
  ],
  "explanation": "DSN задаёт подключение."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно при подключении PDO?",
  "options": [
    {
      "text": "`ERRMODE_EXCEPTION`",
      "correct": true
    },
    {
      "text": "Кодировка UTF-8",
      "correct": true
    },
    {
      "text": "Секреты в окружении",
      "correct": true
    },
    {
      "text": "Пароль в репозитории",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Подключение должно быть безопасным."
}
```

## Куда дальше

- [Подготовленные запросы](theme.html?path=content/php/bazy-dannyh-i-pdo/podgotovlennye-zaprosy.md)
- [CRUD на PDO](theme.html?path=content/php/bazy-dannyh-i-pdo/crud-na-pdo.md)
- [Транзакции](theme.html?path=content/php/bazy-dannyh-i-pdo/tranzakcii.md)
