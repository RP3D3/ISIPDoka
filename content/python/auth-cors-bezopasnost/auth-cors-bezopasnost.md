---
title: Auth, CORS и безопасность
description: Итог группы: пароли, токены, scopes, cookies, CORS и лимиты.
keywords: auth, CORS, безопасность, итог, JWT, cookies, rate limiting

---

# Auth, CORS и безопасность

Главная идея группы: безопасность — это не один middleware, а набор
проверок на каждом слое.

## Что запомнить

- пароли хранят только в виде хеша;
- JWT подписан, но не зашифрован;
- access-токен короткоживущий;
- scopes ограничивают доступ;
- cookie должны быть `HttpOnly`, `Secure`, `SameSite`;
- CORS настраивают точечно;
- лимиты защищают вход и тяжёлые операции.

## Чек-лист

- [ ] Пароли хешируются Argon2 или bcrypt.
- [ ] У токена есть `exp`.
- [ ] Секреты не в коде.
- [ ] `401` и `403` различаются.
- [ ] CORS не открыт всем.
- [ ] На входе есть rate limiting.
- [ ] Секреты не попадают в логи.

## Частые ошибки

- **Хранить пароль открыто.**
- **Доверять роли с клиента.**
- **Ставить `allow_origins=["*"]` с credentials.**
- **Игнорировать CSRF для cookie.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в безопасности API?",
  "options": [
    {
      "text": "Проверять права на сервере",
      "correct": true,
      "explanation": "Клиенту нельзя доверять."
    },
    {
      "text": "Скрывать все ошибки",
      "correct": false,
      "explanation": "Это мешает отладке."
    },
    {
      "text": "Хранить пароли в токене",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Сервер — единственный источник правды."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "Пароли и JWT",
      "correct": true
    },
    {
      "text": "OAuth2 и cookies",
      "correct": true
    },
    {
      "text": "CORS и лимиты",
      "correct": true
    },
    {
      "text": "Только SQL",
      "correct": false,
      "explanation": "SQL — отдельная группа."
    }
  ],
  "explanation": "Группа покрывает защиту API."
}
```

## Куда дальше

- [Практика: защитить API](theme.html?path=content/python/auth-cors-bezopasnost/praktika-zashchitit-api.md)
- [Асинхронность, тесты и деплой](theme.html?path=content/python/async-testy-deploy/async-await.md)
- [Практика: Python-бэкенд](theme.html?path=content/python/praktika-python-backend/trebovaniya-i-scenarii.md)
