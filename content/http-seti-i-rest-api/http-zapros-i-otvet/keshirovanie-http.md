---
title: Кэширование HTTP
description: Cache-Control, ETag, Last-Modified, 304 и безопасный кэш.
keywords: HTTP, кэш, Cache-Control, ETag, Last-Modified, 304, CDN

---

# Кэширование HTTP

Кэш экономит трафик и ускоряет ответы. Но приватные данные кэшировать
нельзя.

## Cache-Control

```http
Cache-Control: public, max-age=3600
Cache-Control: private, no-store
Cache-Control: no-cache
```

- `max-age` — сколько секунд хранить;
- `public` — можно кэшировать всем;
- `private` — только браузеру;
- `no-store` — не хранить;
- `no-cache` — проверить актуальность.

## ETag

```http
ETag: "v42"
```

Клиент присылает:

```http
If-None-Match: "v42"
```

Если ресурс не изменился, сервер отвечает `304 Not Modified` без тела.

## Last-Modified

```http
Last-Modified: Tue, 12 Nov 2026 10:00:00 GMT
If-Modified-Since: Tue, 12 Nov 2026 10:00:00 GMT
```

## Частые ошибки

- **Кэшировать приватные данные публично.**
- **Забывать `Vary` для `Accept` или языка.**
- **Ставить `no-store` везде.** Теряется скорость.
- **Не инвалидировать кэш после изменения.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что означает `304 Not Modified`?",
  "options": [
    {
      "text": "Кэш актуален, тело не нужно",
      "correct": true,
      "explanation": "Клиент использует сохранённую версию."
    },
    {
      "text": "Ресурс удалён",
      "correct": false,
      "explanation": "Это 404."
    },
    {
      "text": "Ошибка сервера",
      "correct": false,
      "explanation": "Это 500."
    }
  ],
  "explanation": "304 экономит передачу тела."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про кэш?",
  "options": [
    {
      "text": "`max-age` задаёт время",
      "correct": true
    },
    {
      "text": "`ETag` помогает проверить версию",
      "correct": true
    },
    {
      "text": "`no-store` запрещает хранение",
      "correct": true
    },
    {
      "text": "Приватные данные можно кэшировать публично",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Кэш должен быть безопасным."
}
```

## Куда дальше

- [HTTP/2, HTTP/3 и real-time](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/http2-http3-i-realtime.md)
- [HTTP: запрос и ответ](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/http-zapros-i-otvet.md)
- [Практика: разобрать запрос](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/praktika-razobrat-zapros.md)
