---
title: Пагинация и фильтры
description: Как отдавать данные частями, фильтровать и сортировать безопасно.
keywords: PHP, PDO, пагинация, LIMIT, OFFSET, фильтры, сортировка

---

# Пагинация и фильтры

Пагинация делит результат на страницы. Фильтры сужают выборку. Оба
механизма должны быть безопасными.

## Пагинация

```php
<?php

$page = max(1, (int) ($_GET["page"] ?? 1));
$limit = 20;
$offset = ($page - 1) * $limit;

$stmt = $pdo->prepare(
    "SELECT id, title FROM posts ORDER BY created_at DESC LIMIT :limit OFFSET :offset"
);

$stmt->bindValue(":limit", $limit, PDO::PARAM_INT);
$stmt->bindValue(":offset", $offset, PDO::PARAM_INT);
$stmt->execute();

$posts = $stmt->fetchAll();
```

## Общее количество

```php
<?php

$total = (int) $pdo->query("SELECT COUNT(*) FROM posts")->fetchColumn();
$pages = (int) ceil($total / $limit);
```

## Фильтры

```php
<?php

$published = isset($_GET["published"]) ? 1 : 0;

$stmt = $pdo->prepare(
    "SELECT id, title FROM posts WHERE published = :published LIMIT :limit"
);
```

## Сортировка

Белый список:

```php
<?php

$allowed = ["created_at", "title"];
$sort = $_GET["sort"] ?? "created_at";

if (!in_array($sort, $allowed, true)) {
    $sort = "created_at";
}

$sql = "SELECT id, title FROM posts ORDER BY $sort DESC";
```

Имя колонки нельзя параметризовать, поэтому нужен белый список.

## Частые ошибки

- **Отрицательная страница или огромный `limit`.**
- **Подставлять `ORDER BY` из ввода без проверки.**
- **Считать все строки на каждом запросе.**
- **Забывать про индексы для фильтров.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен `LIMIT`?",
  "options": [
    {
      "text": "Ограничивает количество строк",
      "correct": true,
      "explanation": "Это основа пагинации."
    },
    {
      "text": "Сортирует строки",
      "correct": false,
      "explanation": "Для сортировки есть ORDER BY."
    },
    {
      "text": "Удаляет строки",
      "correct": false,
      "explanation": "Это DELETE."
    }
  ],
  "explanation": "`LIMIT` задаёт размер страницы."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для пагинации?",
  "options": [
    {
      "text": "Проверять номер страницы",
      "correct": true
    },
    {
      "text": "Ограничивать `limit`",
      "correct": true
    },
    {
      "text": "Использовать белый список сортировки",
      "correct": true
    },
    {
      "text": "Подставлять `ORDER BY` из URL",
      "correct": false,
      "explanation": "Это риск инъекции."
    }
  ],
  "explanation": "Пагинация требует ограничений."
}
```

## Куда дальше

- [Базы данных и PDO](theme.html?path=content/php/bazy-dannyh-i-pdo/bazy-dannyh-i-pdo.md)
- [Практика: CRUD на PDO](theme.html?path=content/php/bazy-dannyh-i-pdo/praktika-crud-pdo.md)
- [API и фронтенд](theme.html?path=content/php/api-i-frontend/json-i-format-otveta.md)
