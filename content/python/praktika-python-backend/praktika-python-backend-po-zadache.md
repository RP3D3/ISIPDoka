---
title: Практика: Python-бэкенд по задаче
description: Итоговое задание: API задач с пользователями, правами, тестами и Docker.
keywords: практика, Python, FastAPI, SQLAlchemy, auth, Docker, задание

---

# Практика: Python-бэкенд по задаче

Соберите API для личных задач.

## Требования

- регистрация и вход по email и паролю;
- пользователь видит только свои задачи;
- создание, чтение, обновление и удаление;
- пагинация списка;
- ошибки в едином формате;
- тесты ключевых сценариев;
- Docker и healthcheck.

## Контракт

```text
POST   /auth/register
POST   /auth/token
GET    /tasks?limit=20&offset=0
POST   /tasks
GET    /tasks/{task_id}
PATCH  /tasks/{task_id}
DELETE /tasks/{task_id}
```

## Данные

```text
User: id, email, password_hash
Task: id, title, done, owner_id, created_at
```

## Этапы

1. Схемы и модели.
2. Миграции.
3. Auth.
4. CRUD.
5. Права.
6. Тесты.
7. Docker и healthcheck.
8. README.

## Критерии приёмки

- [ ] Пароль хранится только в виде хеша.
- [ ] Без токена защищённые маршруты дают `401`.
- [ ] Чужая задача недоступна.
- [ ] Пустой title даёт `422`.
- [ ] Список пагинируется.
- [ ] Тесты проходят.
- [ ] Контейнер запускается.

## Частые ошибки

- **Отдавать `password_hash`.**
- **Проверять права только на клиенте.**
- **Забыть миграции.**
- **Не тестировать ошибки.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что должно быть в README?",
  "options": [
    {
      "text": "Запуск, env и миграции",
      "correct": true,
      "explanation": "Чтобы проект можно было поднять."
    },
    {
      "text": "Только скриншот",
      "correct": false,
      "explanation": "Этого мало."
    },
    {
      "text": "Пароли",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "README — часть результата."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в итоговое задание?",
  "options": [
    {
      "text": "Auth и права",
      "correct": true
    },
    {
      "text": "CRUD и пагинация",
      "correct": true
    },
    {
      "text": "Тесты и Docker",
      "correct": true
    },
    {
      "text": "Пароль в открытом виде",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Задание покрывает полный цикл."
}
```

## Куда дальше

- [Практика: Python-бэкенд](theme.html?path=content/python/praktika-python-backend/praktika-python-backend.md)
- [Требования и сценарии](theme.html?path=content/python/praktika-python-backend/trebovaniya-i-scenarii.md)
- [FastAPI и контракт API](theme.html?path=content/python/fastapi-i-kontrakt-api/fastapi-i-kontrakt-api.md)
