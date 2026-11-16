---
title: SQL для PHP
description: Минимум SQL, который нужен бэкенду: выборка, вставка, обновление и удаление.
keywords: PHP, SQL, SELECT, INSERT, UPDATE, DELETE, WHERE, JOIN

---

# SQL для PHP

PHP отправляет SQL в базу данных и получает строки. Даже при работе с
ORM полезно понимать базовые запросы.

## Выборка

```sql
SELECT id, name, email
FROM users
WHERE active = 1
ORDER BY name
LIMIT 20;
```

## Вставка

```sql
INSERT INTO users (name, email)
VALUES (:name, :email);
```

## Обновление

```sql
UPDATE users
SET name = :name
WHERE id = :id;
```

## Удаление

```sql
DELETE FROM users
WHERE id = :id;
```

## Связи

```sql
SELECT posts.title, users.name
FROM posts
JOIN users ON users.id = posts.user_id
WHERE posts.published = 1;
```

## Частые ошибки

- **Делать `SELECT *` без необходимости.** Лучше перечислять поля.
- **Забывать `WHERE` в `UPDATE` или `DELETE`.**
- **Склеивать SQL с вводом.** Используйте параметры.
- **Игнорировать индексы.** Они влияют на скорость.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `WHERE`?",
  "options": [
    {
      "text": "Ограничивает строки по условию",
      "correct": true,
      "explanation": "Без WHERE изменение затронет все строки."
    },
    {
      "text": "Сортирует результат",
      "correct": false,
      "explanation": "Для сортировки есть ORDER BY."
    },
    {
      "text": "Создаёт таблицу",
      "correct": false,
      "explanation": "Для этого есть CREATE TABLE."
    }
  ],
  "explanation": "`WHERE` фильтрует строки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про SQL?",
  "options": [
    {
      "text": "`SELECT` читает данные",
      "correct": true
    },
    {
      "text": "`INSERT` добавляет строки",
      "correct": true
    },
    {
      "text": "`UPDATE` меняет строки",
      "correct": true
    },
    {
      "text": "`WHERE` обязателен в `SELECT`",
      "correct": false,
      "explanation": "Можно выбрать все строки."
    }
  ],
  "explanation": "Основные операции SQL стоит знать."
}
```

## Куда дальше

- [Подключение PDO](theme.html?path=content/php/bazy-dannyh-i-pdo/pdo-podklyuchenie.md)
- [Подготовленные запросы](theme.html?path=content/php/bazy-dannyh-i-pdo/podgotovlennye-zaprosy.md)
- [CRUD на PDO](theme.html?path=content/php/bazy-dannyh-i-pdo/crud-na-pdo.md)
