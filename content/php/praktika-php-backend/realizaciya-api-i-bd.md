---
title: Реализация API и БД
description: Как собрать структуру PHP-бэкенда, схему базы и эндпоинты.
keywords: практика, PHP, API, база данных, PDO, структура, реализация

---

# Реализация API и БД

Реализация идёт от схемы данных к эндпоинтам. Сначала таблицы, потом
запросы, потом ответы.

## Структура

```text
public/index.php
src/Database.php
src/TaskRepository.php
src/Http/TaskController.php
src/Validation/TaskValidator.php
```

## Схема

```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
);
```

## Репозиторий

```php
<?php

final class TaskRepository
{
    public function __construct(private PDO $pdo)
    {
    }

    public function allForUser(int $userId): array
    {
        $stmt = $this->pdo->prepare(
            "SELECT id, title, done FROM tasks WHERE user_id = :user_id"
        );
        $stmt->execute(["user_id" => $userId]);

        return $stmt->fetchAll();
    }
}
```

## Контроллер

```php
<?php

public function index(int $userId): void
{
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode(["data" => $this->repo->allForUser($userId)]);
}
```

## Правила

- SQL только с параметрами;
- валидация до записи;
- ошибки в едином формате;
- логи без секретов;
- тесты на ключевые сценарии.

## Частые ошибки

- **Смешивать SQL, HTML и валидацию в одном файле.**
- **Забывать `user_id` в фильтре.**
- **Не обрабатывать 404.**
- **Показывать ошибки БД.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "С чего начинать реализацию?",
  "options": [
    {
      "text": "Со схемы данных и контракта",
      "correct": true,
      "explanation": "Это основа API."
    },
    {
      "text": "С случайных кнопок",
      "correct": false,
      "explanation": "Это не backend."
    },
    {
      "text": "С удаления базы",
      "correct": false,
      "explanation": "Это не решение."
    }
  ],
  "explanation": "Схема и контракт задают код."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно в реализации?",
  "options": [
    {
      "text": "Параметры PDO",
      "correct": true
    },
    {
      "text": "Валидация",
      "correct": true
    },
    {
      "text": "Единый формат ошибок",
      "correct": true
    },
    {
      "text": "SQL-склейка",
      "correct": false,
      "explanation": "Это риск инъекции."
    }
  ],
  "explanation": "Реализация должна быть безопасной."
}
```

## Куда дальше

- [Связка с фронтендом](theme.html?path=content/php/praktika-php-backend/svyazka-s-frontendom.md)
- [Практика: PHP-бэкенд](theme.html?path=content/php/praktika-php-backend/praktika-php-backend.md)
- [Практика: PHP-бэкенд по задаче](theme.html?path=content/php/praktika-php-backend/praktika-php-backend-po-zadache.md)
