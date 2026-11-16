---
title: JWT
description: Структура токена, подпись, claims, срок жизни и хранение.
keywords: auth, JWT, токен, подпись, claims, exp, refresh

---

# JWT

JWT — токен из трёх частей: заголовок, данные и подпись. Данные не
шифруются, их можно прочитать.

## Структура

```text
header.payload.signature
```

## Claims

- `sub` — пользователь;
- `exp` — срок действия;
- `iat` — выпущен;
- `iss` — издатель;
- `aud` — получатель;
- `scope` — права.

## Проверка

Сервер обязан проверить:

- подпись;
- срок;
- издателя;
- получателя;
- права.

## Хранение

JWT можно хранить в памяти, в `HttpOnly` cookie или в защищённом хранилище.
`localStorage` удобен, но уязвим к XSS.

## Отзыв

JWT сложно отозвать. Помогают короткий срок жизни, refresh token и
чёрный список.

## Частые ошибки

- **Класть пароль в payload.**
- **Не проверять подпись.**
- **Делать токен без срока.**
- **Хранить секрет подписи в клиенте.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что можно прочитать из JWT payload?",
  "options": [
    {
      "text": "Данные токена",
      "correct": true,
      "explanation": "Payload не шифруется."
    },
    {
      "text": "Только пароль",
      "correct": false,
      "explanation": "Пароль там хранить нельзя."
    },
    {
      "text": "Приватный ключ",
      "correct": false,
      "explanation": "Это секрет."
    }
  ],
  "explanation": "JWT не шифрует payload."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что проверяет сервер у JWT?",
  "options": [
    {
      "text": "Подпись",
      "correct": true
    },
    {
      "text": "Срок действия",
      "correct": true
    },
    {
      "text": "Издателя и получателя",
      "correct": true
    },
    {
      "text": "Цвет интерфейса",
      "correct": false,
      "explanation": "Это не claim."
    }
  ],
  "explanation": "Токен должен быть валидным."
}
```

## Куда дальше

- [OAuth2 и OIDC](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/oauth2-i-oidc.md)
- [Scopes и роли](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/scopes-i-roli.md)
- [CORS](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/cors.md)
