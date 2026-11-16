---
title: Практика: CRUD на PDO
description: Упражнение: CRUD для задач с подготовленными запросами и проверкой.
keywords: практика, PDO, CRUD, задачи, prepare, execute

---

# Практика: CRUD на PDO

Сделайте CRUD для задач: создать, показать, обновить, удалить.

## 1. Таблица

```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
);
```

## 2. Подключение

```php
<?php

$pdo = new PDO("sqlite:" . __DIR__ . "/tasks.sqlite", null, null, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);
```

## 3. Создание

```php
<?php

$stmt = $pdo->prepare(
    "INSERT INTO tasks (title, created_at) VALUES (:title, :created_at)"
);

$stmt->execute([
    "title" => $title,
    "created_at" => date("Y-m-d H:i:s"),
]);
```

## 4. Чтение

```php
<?php

$tasks = $pdo->query(
    "SELECT id, title, done FROM tasks ORDER BY id DESC"
)->fetchAll();
```

## 5. Обновление

```php
<?php

$stmt = $pdo->prepare("UPDATE tasks SET done = 1 WHERE id = :id");
$stmt->execute(["id" => $id]);
```

## 6. Удаление

```php
<?php

$stmt = $pdo->prepare("DELETE FROM tasks WHERE id = :id");
$stmt->execute(["id" => $id]);
```

## Чек-лист

- [ ] Все запросы с параметрами.
- [ ] Нет склейки SQL с вводом.
- [ ] Проверяется существование задачи.
- [ ] Ошибки не показываются пользователю.
- [ ] Есть проверка title.

## Частые ошибки

- **`DELETE` без `WHERE`.**
- **Вставка `$title` прямо в SQL.**
- **Игнорирование `rowCount`.**
- **Показ исключения в браузере.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как передавать title в SQL?",
  "options": [
    {
      "text": "Через параметр `:title`",
      "correct": true,
      "explanation": "Это защищает от инъекций."
    },
    {
      "text": "Склеить строкой",
      "correct": false,
      "explanation": "Это опасно."
    },
    {
      "text": "Через `eval`",
      "correct": false,
      "explanation": "Это не нужно."
    }
  ],
  "explanation": "Параметры — правильный способ."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "CREATE TABLE",
      "correct": true
    },
    {
      "text": "INSERT и SELECT",
      "correct": true
    },
    {
      "text": "UPDATE и DELETE",
      "correct": true
    },
    {
      "text": "SQL без параметров",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Практика покрывает все операции CRUD."
}
```

## Куда дальше

- [Базы данных и PDO](theme.html?path=content/php/bazy-dannyh-i-pdo/bazy-dannyh-i-pdo.md)
- [API и фронтенд](theme.html?path=content/php/api-i-frontend/json-i-format-otveta.md)
- [Безопасность, тесты и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/sql-inekcii-i-xss.md)
