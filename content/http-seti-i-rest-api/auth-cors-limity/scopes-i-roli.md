---
title: Scopes и роли
description: RBAC, scopes, принцип наименьших прав и проверка владельца.
keywords: auth, scopes, роли, RBAC, права, 403, владелец

---

# Scopes и роли

Аутентификация говорит, кто пользователь. Авторизация — что ему можно.

## Роли

```text
user
admin
moderator
```

Роль — грубый уровень доступа. Для API часто нужны более точные права.

## Scopes

```text
tasks:read
tasks:write
users:read
```

Scope описывает разрешение на конкретное действие.

## Принцип наименьших прав

Выдавайте только то, что нужно. Не давайте `admin` ради удобства.

## Проверка владельца

Даже с правом `tasks:write` пользователь не должен менять чужую задачу.

```text
task.user_id === current_user.id
```

## Ответы

- `401` — не аутентифицирован;
- `403` — аутентифицирован, но нельзя.

## Частые ошибки

- **Проверять права только на клиенте.**
- **Давать wildcard scope.**
- **Не проверять владельца.**
- **Хранить роли в токене без обновления.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что проверяет авторизация?",
  "options": [
    {
      "text": "Что пользователю разрешено",
      "correct": true,
      "explanation": "Это права и доступ."
    },
    {
      "text": "Кто пользователь",
      "correct": false,
      "explanation": "Это аутентификация."
    },
    {
      "text": "Скорость сети",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "Авторизация — про права."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для доступа?",
  "options": [
    {
      "text": "Проверка на сервере",
      "correct": true
    },
    {
      "text": "Принцип наименьших прав",
      "correct": true
    },
    {
      "text": "Проверка владельца",
      "correct": true
    },
    {
      "text": "Wildcard scope всем",
      "correct": false,
      "explanation": "Это слишком широко."
    }
  ],
  "explanation": "Доступ должен быть точным."
}
```

## Куда дальше

- [CORS](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/cors.md)
- [Rate limiting](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/rate-limiting.md)
- [Auth, CORS и лимиты](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/auth-cors-limity.md)
