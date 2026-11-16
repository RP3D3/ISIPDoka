---
title: Практика: защитить API
description: Упражнение: настроить auth, CORS и лимиты для небольшого API.
keywords: практика, auth, CORS, rate limiting, API, безопасность

---

# Практика: защитить API

Возьмите небольшой API и пройдите чек-лист доступа.

## 1. Аутентификация

- [ ] Выберите сессию или токен.
- [ ] Пароли хранятся в виде хеша.
- [ ] Токен не передаётся в URL.
- [ ] Есть выход и отзыв.

## 2. Авторизация

- [ ] Роли или scopes.
- [ ] Проверка владельца.
- [ ] `401` и `403` различаются.
- [ ] Проверка на сервере.

## 3. CORS

```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true
```

- [ ] Конкретный origin.
- [ ] `OPTIONS` обработан.
- [ ] Нет `*` с credentials.

## 4. Лимиты

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
```

- [ ] Лимит по пользователю или ключу.
- [ ] Есть `Retry-After`.
- [ ] Лимит не вечный.

## Частые ошибки

- **Проверять права только в UI.**
- **Открывать CORS всем.**
- **Не различать `401` и `403`.**
- **Не иметь лимитов.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что проверить в CORS?",
  "options": [
    {
      "text": "Конкретный origin и credentials",
      "correct": true,
      "explanation": "Это безопасная настройка."
    },
    {
      "text": "Разрешить все домены",
      "correct": false,
      "explanation": "Это слишком широко."
    },
    {
      "text": "Отключить OPTIONS",
      "correct": false,
      "explanation": "Preflight сломается."
    }
  ],
  "explanation": "CORS должен быть точным."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "Аутентификация",
      "correct": true
    },
    {
      "text": "Авторизация",
      "correct": true
    },
    {
      "text": "CORS и лимиты",
      "correct": true
    },
    {
      "text": "Пароль в URL",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Практика проверяет доступ."
}
```

## Куда дальше

- [Auth, CORS и лимиты](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/auth-cors-limity.md)
- [Клиент API и фронтенд](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/fetch.md)
- [Тестирование и отладка API](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/curl.md)
