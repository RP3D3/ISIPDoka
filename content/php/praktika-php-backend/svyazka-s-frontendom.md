---
title: Связка с фронтендом
description: Как проверить API из браузера: CORS, cookies, ошибки и пагинация.
keywords: практика, PHP, фронтенд, fetch, CORS, cookies, ошибки

---

# Связка с фронтендом

API считается готовым, когда фронтенд может им пользоваться без
догадок и обходных путей.

## Запрос

```js
const response = await fetch("https://api.example.com/api/tasks", {
  headers: { "Accept": "application/json" },
  credentials: "include",
});

if (!response.ok) {
  const error = await response.json();
  console.error(error.error.message);
}

const data = await response.json();
```

## CORS

- разрешите конкретный домен;
- обработайте `OPTIONS`;
- не используйте `*` с credentials.

## Cookies

- `httponly`;
- `secure`;
- `samesite`;
- `credentials: include` на фронтенде.

## Ошибки

Фронтенд должен получать:

- код ошибки;
- сообщение;
- поля с ошибками.

## Пагинация

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 42
  }
}
```

## Частые ошибки

- **CORS открыт всем.**
- **Ошибки в разном формате.**
- **Нет пагинации.**
- **Cookie без `httponly`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что нужно для cookie с другого домена?",
  "options": [
    {
      "text": "CORS с credentials и правильные настройки cookie",
      "correct": true,
      "explanation": "Иначе браузер не отправит cookie."
    },
    {
      "text": "Только HTML-форма",
      "correct": false,
      "explanation": "Для fetch этого мало."
    },
    {
      "text": "Отключить HTTPS",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Cookies и CORS должны быть согласованы."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для связки с фронтендом?",
  "options": [
    {
      "text": "Единый формат ошибок",
      "correct": true
    },
    {
      "text": "CORS для нужного домена",
      "correct": true
    },
    {
      "text": "Пагинация",
      "correct": true
    },
    {
      "text": "Случайные статус-коды",
      "correct": false,
      "explanation": "Клиент не сможет обработать."
    }
  ],
  "explanation": "Контракт должен быть предсказуемым."
}
```

## Куда дальше

- [Практика: PHP-бэкенд](theme.html?path=content/php/praktika-php-backend/praktika-php-backend.md)
- [Практика: PHP-бэкенд по задаче](theme.html?path=content/php/praktika-php-backend/praktika-php-backend-po-zadache.md)
- [API и фронтенд](theme.html?path=content/php/api-i-frontend/api-i-frontend.md)
