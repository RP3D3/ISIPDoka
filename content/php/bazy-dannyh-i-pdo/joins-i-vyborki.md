---
title: Joins и выборки
description: Как соединять таблицы и получать связанные данные без лишних запросов.
keywords: PHP, SQL, JOIN, INNER, LEFT, GROUP BY, выборки, N+1

---

# Joins и выборки

Связанные данные обычно лежат в разных таблицах. JOIN собирает их в один
результат.

## INNER JOIN

```sql
SELECT posts.id, posts.title, users.name AS author
FROM posts
INNER JOIN users ON users.id = posts.user_id
WHERE posts.published = 1;
```

Вернутся только посты с существующим автором.

## LEFT JOIN

```sql
SELECT users.name, COUNT(posts.id) AS posts_count
FROM users
LEFT JOIN posts ON posts.user_id = users.id
GROUP BY users.id, users.name;
```

LEFT JOIN сохраняет пользователей даже без постов.

## Фильтры и сортировка

```sql
SELECT id, title
FROM posts
WHERE published = 1
ORDER BY created_at DESC
LIMIT 10;
```

## N+1

Плохо:

```php
<?php

foreach ($posts as $post) {
    $author = $pdo->query(
        "SELECT * FROM users WHERE id = " . $post["user_id"]
    )->fetch();
}
```

Лучше один JOIN или отдельная выборка с `IN`.

## Частые ошибки

- **JOIN без условия.** Получится декартово произведение.
- **Дубли строк из-за связи один-ко-многим.**
- **`SELECT *` при JOIN.** Поля могут конфликтовать.
- **N+1 запросов в цикле.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем LEFT JOIN отличается от INNER JOIN?",
  "options": [
    {
      "text": "LEFT сохраняет строки левой таблицы без совпадений",
      "correct": true,
      "explanation": "Поэтому он полезен для подсчётов."
    },
    {
      "text": "LEFT работает только с одной таблицей",
      "correct": false,
      "explanation": "Он соединяет две таблицы."
    },
    {
      "text": "LEFT сортирует результат",
      "correct": false,
      "explanation": "Для сортировки есть ORDER BY."
    }
  ],
  "explanation": "LEFT JOIN сохраняет левую сторону."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает избежать N+1?",
  "options": [
    {
      "text": "JOIN",
      "correct": true
    },
    {
      "text": "Выборка через `IN`",
      "correct": true
    },
    {
      "text": "Предзагрузка связей",
      "correct": true
    },
    {
      "text": "Запрос в цикле для каждой строки",
      "correct": false,
      "explanation": "Это и есть N+1."
    }
  ],
  "explanation": "Связанные данные лучше получать пакетно."
}
```

## Куда дальше

- [Пагинация и фильтры](theme.html?path=content/php/bazy-dannyh-i-pdo/paginaciya-i-filtry.md)
- [Базы данных и PDO](theme.html?path=content/php/bazy-dannyh-i-pdo/bazy-dannyh-i-pdo.md)
- [Практика: CRUD на PDO](theme.html?path=content/php/bazy-dannyh-i-pdo/praktika-crud-pdo.md)
