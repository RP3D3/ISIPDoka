---
title: Подготовленные запросы
description: Как использовать prepare и execute и не допускать SQL-инъекций.
keywords: PHP, PDO, подготовленные запросы, prepare, execute, SQL-инъекции

---

# Подготовленные запросы

Подготовленный запрос отделяет SQL от данных. Это главная защита от
SQL-инъекций.

## Именованные параметры

```php
<?php

$stmt = $pdo->prepare(
    "SELECT id, name FROM users WHERE email = :email"
);

$stmt->execute(["email" => $email]);
$user = $stmt->fetch();
```

## Позиционные параметры

```php
<?php

$stmt = $pdo->prepare(
    "INSERT INTO users (name, email) VALUES (?, ?)"
);

$stmt->execute([$name, $email]);
```

## Несколько строк

```php
<?php

$stmt = $pdo->prepare("SELECT * FROM posts WHERE published = :published");
$stmt->execute(["published" => 1]);
$posts = $stmt->fetchAll();
```

## Количество строк

```php
<?php

$stmt = $pdo->prepare("DELETE FROM sessions WHERE expires_at < :now");
$stmt->execute(["now" => date("Y-m-d H:i:s")]);

echo $stmt->rowCount();
```

## Частые ошибки

- **Склеивать SQL с `$_GET` или `$_POST`.**
- **Использовать `query` для пользовательских данных.**
- **Подставлять имя таблицы из ввода.** Это нельзя параметризовать.
- **Считать, что PDO автоматически защищает всё.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `prepare`?",
  "options": [
    {
      "text": "Готовит запрос с параметрами",
      "correct": true,
      "explanation": "Данные передаются отдельно."
    },
    {
      "text": "Удаляет таблицу",
      "correct": false,
      "explanation": "Это SQL-команда."
    },
    {
      "text": "Создаёт HTML",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "Подготовка отделяет SQL от данных."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что защищает от SQL-инъекций?",
  "options": [
    {
      "text": "Подготовленные запросы",
      "correct": true
    },
    {
      "text": "Параметры вместо склейки",
      "correct": true
    },
    {
      "text": "Проверка типов",
      "correct": true
    },
    {
      "text": "Конкатенация ввода в SQL",
      "correct": false,
      "explanation": "Это и есть риск."
    }
  ],
  "explanation": "Параметры — основной способ защиты."
}
```

## Куда дальше

- [CRUD на PDO](theme.html?path=content/php/bazy-dannyh-i-pdo/crud-na-pdo.md)
- [Транзакции](theme.html?path=content/php/bazy-dannyh-i-pdo/tranzakcii.md)
- [Joins и выборки](theme.html?path=content/php/bazy-dannyh-i-pdo/joins-i-vyborki.md)
