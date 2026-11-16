---
title: API keys
description: Ключи для сервисов, заголовки, ротация, scopes и ограничения.
keywords: auth, API key, ключ, заголовок, ротация, scopes

---

# API keys

API key — секрет, который сервис предъявляет вместо логина. Обычно его
передают в заголовке.

## Передача

```http
Authorization: Bearer sk_live_...
```

Или отдельным заголовком:

```http
X-API-Key: sk_live_...
```

Не передавайте ключ в query: он попадёт в логи и историю.

## Хранение

- на сервере — в переменных окружения;
- в базе — в виде хеша, если возможно;
- в репозитории — никогда.

## Ротация

Ключ нужно уметь заменить без простоя:

1. выпустить новый;
2. переключить клиента;
3. отозвать старый.

## Ограничения

- scopes;
- лимиты запросов;
- привязка к IP или домену;
- срок жизни.

## Частые ошибки

- **Коммитить ключ в Git.**
- **Передавать ключ в URL.**
- **Использовать один ключ везде.**
- **Не иметь плана ротации.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где безопаснее передавать API key?",
  "options": [
    {
      "text": "В заголовке `Authorization`",
      "correct": true,
      "explanation": "Он не попадёт в URL и логи так легко."
    },
    {
      "text": "В query-параметре",
      "correct": false,
      "explanation": "URL логируется."
    },
    {
      "text": "В HTML-комментарии",
      "correct": false,
      "explanation": "Это видно клиенту."
    }
  ],
  "explanation": "Ключ не должен светиться в URL."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для API keys?",
  "options": [
    {
      "text": "Ротация",
      "correct": true
    },
    {
      "text": "Scopes",
      "correct": true
    },
    {
      "text": "Хранение в окружении",
      "correct": true
    },
    {
      "text": "Публикация в репозитории",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Ключи требуют управления."
}
```

## Куда дальше

- [JWT](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/jwt.md)
- [OAuth2 и OIDC](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/oauth2-i-oidc.md)
- [Scopes и роли](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/scopes-i-roli.md)
