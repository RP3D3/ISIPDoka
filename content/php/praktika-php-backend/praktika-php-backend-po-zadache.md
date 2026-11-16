---
title: Практика: PHP-бэкенд по задаче
description: Финальная практика: спроектировать и собрать небольшой PHP-бэкенд.
keywords: практика, PHP-бэкенд, задача, API, PDO, фронтенд, тесты

---

# Практика: PHP-бэкенд по задаче

Выберите задачу и пройдите полный цикл: от требований до проверки из
браузера.

## Задача

> Нужен бэкенд для списка задач: пользователь видит свои задачи, создаёт
> новые, отмечает выполненные и удаляет.

## 1. Требования

- регистрация или тестовый пользователь;
- задачи принадлежат пользователю;
- статус выполненной;
- список с пагинацией;
- понятные ошибки.

## 2. Схема

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
);
```

## 3. API

```text
GET    /api/tasks
POST   /api/tasks
PATCH  /api/tasks/{id}
DELETE /api/tasks/{id}
```

## 4. Реализация

- PDO и подготовленные запросы;
- валидация title;
- проверка владельца задачи;
- JSON-ответы;
- 201, 404, 422.

## 5. Фронтенд

Проверьте:

- CORS;
- cookies или токен;
- формат ошибок;
- пагинацию.

## 6. Тесты

- создание задачи;
- пустой title;
- доступ к чужой задаче;
- удаление.

## Чек-лист

- [ ] Есть схема и миграция.
- [ ] Все запросы с параметрами.
- [ ] Проверяется владелец.
- [ ] Есть 404 и 422.
- [ ] Проверено из браузера.
- [ ] Есть README.

## Частые ошибки

- **Не проверять владельца задачи.**
- **Отдавать задачи всех пользователей.**
- **Игнорировать CORS.**
- **Не писать тесты.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что проверять при доступе к задаче?",
  "options": [
    {
      "text": "Принадлежит ли задача пользователю",
      "correct": true,
      "explanation": "Это авторизация."
    },
    {
      "text": "Только цвет интерфейса",
      "correct": false,
      "explanation": "Это не доступ."
    },
    {
      "text": "Только размер файла",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "Доступ проверяется на сервере."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в финальную практику?",
  "options": [
    {
      "text": "Схема и API",
      "correct": true
    },
    {
      "text": "PDO и валидация",
      "correct": true
    },
    {
      "text": "Фронтенд и тесты",
      "correct": true
    },
    {
      "text": "SQL без параметров",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Практика покрывает весь путь бэкенда."
}
```

## Куда дальше

- [Практика: PHP-бэкенд](theme.html?path=content/php/praktika-php-backend/praktika-php-backend.md)
- [Основы PHP](theme.html?path=content/php/osnovy-php/osnovy-php.md)
- [API и фронтенд](theme.html?path=content/php/api-i-frontend/api-i-frontend.md)
