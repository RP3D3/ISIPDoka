---
title: Auth, CORS и лимиты
description: Итог группы: сессии, ключи, JWT, OAuth2, scopes, CORS и rate limiting.
keywords: auth, CORS, лимиты, итог, JWT, OAuth2, scopes

---

# Auth, CORS и лимиты

Главная идея группы: API должен понимать, кто пришёл, что ему можно и
как часто он может обращаться.

## Что запомнить

- сессия хранит данные на сервере;
- cookie должны быть `HttpOnly`, `Secure`, `SameSite`;
- API key не передают в URL;
- JWT payload не шифруется;
- OIDC добавляет аутентификацию;
- scopes и роли проверяют на сервере;
- CORS разрешает конкретные origin;
- rate limiting отвечает `429`.

## Чек-лист

- [ ] Пароли хранятся в виде хеша.
- [ ] Токены не попадают в логи.
- [ ] Права проверяются на сервере.
- [ ] CORS не открыт всем.
- [ ] Есть лимиты и `Retry-After`.

## Частые ошибки

- **Доверять клиентской проверке прав.**
- **`*` в CORS с credentials.**
- **JWT без срока жизни.**
- **Лимит только по IP.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в auth?",
  "options": [
    {
      "text": "Проверять личность и права на сервере",
      "correct": true,
      "explanation": "Клиенту нельзя доверять."
    },
    {
      "text": "Скрывать кнопки в UI",
      "correct": false,
      "explanation": "Это не защита."
    },
    {
      "text": "Использовать один пароль для всех",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Auth — серверная ответственность."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "Сессии и API keys",
      "correct": true
    },
    {
      "text": "JWT и OAuth2",
      "correct": true
    },
    {
      "text": "CORS и rate limiting",
      "correct": true
    },
    {
      "text": "Только CSS",
      "correct": false,
      "explanation": "Это не auth."
    }
  ],
  "explanation": "Группа покрывает доступ к API."
}
```

## Куда дальше

- [Практика: защитить API](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/praktika-zashchitit-api.md)
- [Клиент API и фронтенд](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/fetch.md)
- [Тестирование и отладка API](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/curl.md)
