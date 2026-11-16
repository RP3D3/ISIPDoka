---
title: Заголовки
description: Request и response headers, кэш, cookies, CORS и безопасность.
keywords: HTTP, заголовки, Host, Accept, Authorization, Cache-Control, ETag, Set-Cookie

---

# Заголовки

Заголовки — метаданные запроса и ответа. Они не видны в теле, но управляют
форматом, кэшем, авторизацией и безопасностью.

## Частые заголовки запроса

- `Host` — домен;
- `Accept` — какой формат хочет клиент;
- `Authorization` — токен или схема авторизации;
- `Content-Type` — формат тела;
- `Cookie` — cookies;
- `If-None-Match` — проверка кэша.

## Частые заголовки ответа

- `Content-Type` — формат тела;
- `Content-Length` — размер;
- `Cache-Control` — правила кэша;
- `ETag` — версия ресурса;
- `Set-Cookie` — установить cookie;
- `Location` — адрес редиректа.

## Безопасность

- `Strict-Transport-Security`;
- `Content-Security-Policy`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`.

## Частые ошибки

- **Считать заголовки регистрозависимыми.** Имена регистронезависимы.
- **Доверять `X-Forwarded-For` без прокси.**
- **Забывать `Vary` при кэше.**
- **Класть секреты в заголовки без HTTPS.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что задаёт `Content-Type`?",
  "options": [
    {
      "text": "Формат тела",
      "correct": true,
      "explanation": "Например, JSON или HTML."
    },
    {
      "text": "IP-адрес",
      "correct": false,
      "explanation": "Это не адрес."
    },
    {
      "text": "Порт",
      "correct": false,
      "explanation": "Порт — в URL."
    }
  ],
  "explanation": "Content-Type описывает тело."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про заголовки?",
  "options": [
    {
      "text": "`Authorization` передаёт данные входа",
      "correct": true
    },
    {
      "text": "`Cache-Control` управляет кэшем",
      "correct": true
    },
    {
      "text": "`Set-Cookie` устанавливает cookie",
      "correct": true
    },
    {
      "text": "Заголовки видны в теле ответа",
      "correct": false,
      "explanation": "Это отдельная часть сообщения."
    }
  ],
  "explanation": "Заголовки управляют обменом."
}
```

## Куда дальше

- [URL и параметры](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/url-i-parametry.md)
- [Content-Type и MIME](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/content-type-i-mime.md)
- [Кэширование HTTP](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/keshirovanie-http.md)
