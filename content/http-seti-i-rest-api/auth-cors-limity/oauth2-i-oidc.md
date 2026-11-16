---
title: OAuth2 и OIDC
description: Потоки OAuth2, PKCE, client credentials, ID token и типичные ошибки.
keywords: OAuth2, OIDC, PKCE, authorization code, client credentials, токен

---

# OAuth2 и OIDC

OAuth2 выдаёт доступ к ресурсам. OIDC добавляет аутентификацию и ID token.

## Роли

- resource owner — пользователь;
- client — приложение;
- authorization server — выдаёт токены;
- resource server — API.

## Authorization Code + PKCE

Основной поток для пользовательских приложений:

1. приложение отправляет пользователя на вход;
2. пользователь подтверждает доступ;
3. приложение получает код;
4. меняет код на токен с PKCE;
5. вызывает API.

PKCE обязателен для публичных клиентов.

## Client Credentials

Для сервис-сервис без пользователя. Клиент получает токен по своим
учётным данным.

## OIDC

Добавляет `id_token` с данными пользователя. Его проверяют по подписи,
издателю, получателю и сроку.

## Частые ошибки

- **Хранить client secret в SPA.**
- **Использовать password grant.**
- **Не применять PKCE.**
- **Путать OAuth2 и аутентификацию.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что добавляет OIDC к OAuth2?",
  "options": [
    {
      "text": "Аутентификацию и ID token",
      "correct": true,
      "explanation": "OIDC опирается на OAuth2."
    },
    {
      "text": "Базу данных",
      "correct": false,
      "explanation": "Это не его задача."
    },
    {
      "text": "CSS-фреймворк",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "OIDC добавляет слой идентичности."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про OAuth2?",
  "options": [
    {
      "text": "Выдаёт токены доступа",
      "correct": true
    },
    {
      "text": "Поддерживает PKCE",
      "correct": true
    },
    {
      "text": "Client credentials — для сервисов",
      "correct": true
    },
    {
      "text": "Client secret можно публиковать",
      "correct": false,
      "explanation": "Это секрет."
    }
  ],
  "explanation": "OAuth2 требует аккуратной настройки."
}
```

## Куда дальше

- [Scopes и роли](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/scopes-i-roli.md)
- [CORS](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/cors.md)
- [Rate limiting](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/rate-limiting.md)
