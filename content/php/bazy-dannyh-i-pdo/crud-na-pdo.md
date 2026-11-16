---
title: CRUD на PDO
description: Создание, чтение, обновление и удаление записей через PDO.
keywords: PHP, PDO, CRUD, INSERT, SELECT, UPDATE, DELETE, lastInsertId

---

# CRUD на PDO

CRUD — четыре базовые операции: создать, прочитать, обновить, удалить.

## Create

```php
<?php

$stmt = $pdo->prepare(
    "INSERT INTO users (name, email) VALUES (:name, :email)"
);

$stmt->execute([
    "name" => $name,
    "email" => $email,
]);

$id = $pdo->lastInsertId();
```

## Read

```php
<?php

$stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
$stmt->execute(["id" => $id]);
$user = $stmt->fetch();

if ($user === false) {
    http_response_code(404);
    exit("Пользователь не найден");
}
```

## Update

```php
<?php

$stmt = $pdo->prepare(
    "UPDATE users SET name = :name WHERE id = :id"
);

$stmt->execute([
    "name" => $name,
    "id" => $id,
]);

if ($stmt->rowCount() === 0) {
    echo "Ничего не изменилось";
}
```

## Delete

```php
<?php

$stmt = $pdo->prepare("DELETE FROM users WHERE id = :id");
$stmt->execute(["id" => $id]);
```

## Частые ошибки

- **Забывать `WHERE` в `UPDATE` и `DELETE`.**
- **Не проверять, что запись найдена.**
- **Показывать ошибку базы пользователю.**
- **Не валидировать данные перед записью.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `lastInsertId()`?",
  "options": [
    {
      "text": "Возвращает ID последней вставленной записи",
      "correct": true,
      "explanation": "Это удобно после INSERT."
    },
    {
      "text": "Удаляет последнюю запись",
      "correct": false,
      "explanation": "Это DELETE."
    },
    {
      "text": "Создаёт таблицу",
      "correct": false,
      "explanation": "Это не так."
    }
  ],
  "explanation": "`lastInsertId` помогает получить новый ID."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно в CRUD?",
  "options": [
    {
      "text": "Проверять входные данные",
      "correct": true
    },
    {
      "text": "Использовать параметры",
      "correct": true
    },
    {
      "text": "Проверять результат операции",
      "correct": true
    },
    {
      "text": "Делать UPDATE без WHERE",
      "correct": false,
      "explanation": "Это изменит все строки."
    }
  ],
  "explanation": "CRUD должен быть предсказуемым и безопасным."
}
```

## Куда дальше

- [Транзакции](theme.html?path=content/php/bazy-dannyh-i-pdo/tranzakcii.md)
- [Joins и выборки](theme.html?path=content/php/bazy-dannyh-i-pdo/joins-i-vyborki.md)
- [Пагинация и фильтры](theme.html?path=content/php/bazy-dannyh-i-pdo/paginaciya-i-filtry.md)
