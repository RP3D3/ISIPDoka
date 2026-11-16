---
title: HSTS и secure cookies
description: HSTS, secure, httponly и SameSite для защиты HTTPS-сессии.
keywords: HSTS, secure, httponly, SameSite, cookie, HTTPS

---

# HSTS и secure cookies

HSTS заставляет браузер использовать только HTTPS. Secure cookies не
уходят по HTTP.

## HSTS

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

После первого HTTPS-ответа браузер запомнит правило. Повторный HTTP-
запрос будет переписан на HTTPS.

## Secure cookie

```http
Set-Cookie: session=abc; Secure; HttpOnly; SameSite=Lax
```

- `Secure` — только по HTTPS;
- `HttpOnly` — недоступна из JavaScript;
- `SameSite` — ограничивает межсайтовые запросы.

## Область действия

```http
Set-Cookie: session=abc; Path=/; Domain=example.com
```

Чем шире `Domain` и `Path`, тем больше запросов получат cookie.

## Частые ошибки

- **Включать HSTS без HTTPS.** Браузер закрутит цикл.
- **Ставить слишком большой `max-age` на тесте.**
- **Отправлять `Secure` cookie по HTTP.**
- **Забывать про `SameSite`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает HSTS?",
  "options": [
    {
      "text": "Заставляет браузер использовать HTTPS",
      "correct": true,
      "explanation": "После первого ответа браузер запомнит правило."
    },
    {
      "text": "Создаёт сертификат",
      "correct": false,
      "explanation": "Сертификат выдаёт CA."
    },
    {
      "text": "Шифрует базу данных",
      "correct": false,
      "explanation": "Это другой уровень."
    }
  ],
  "explanation": "HSTS защищает от случайного HTTP."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для cookie?",
  "options": [
    {
      "text": "`Secure`",
      "correct": true
    },
    {
      "text": "`Httponly`",
      "correct": true
    },
    {
      "text": "`SameSite`",
      "correct": true
    },
    {
      "text": "Хранить пароль в cookie",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Настройки cookie снижают риски."
}
```

## Куда дальше

- [Mixed content](theme.html?path=content/http-seti-i-rest-api/https-i-tls/mixed-content.md)
- [Ошибки TLS](theme.html?path=content/http-seti-i-rest-api/https-i-tls/oshibki-tls.md)
- [HTTPS и TLS](theme.html?path=content/http-seti-i-rest-api/https-i-tls/https-i-tls.md)
