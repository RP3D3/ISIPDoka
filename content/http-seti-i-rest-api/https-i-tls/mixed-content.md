---
title: Mixed content
description: Почему HTTPS-страница не должна грузить HTTP-ресурсы и как это исправить.
keywords: mixed content, HTTPS, HTTP, CSP, upgrade-insecure-requests

---

# Mixed content

Mixed content — это когда HTTPS-страница загружает ресурсы по HTTP. Браузер
считает такую страницу небезопасной.

## Активное и пассивное

- активное: скрипты, iframe, fetch — блокируется;
- пассивное: картинки, видео — может загружаться с предупреждением.

## Почему это опасно

HTTP-ресурс можно подменить. Через скрипт злоумышленник получит доступ к
странице и cookies.

## Как исправить

- использовать относительные URL;
- обновить CDN и внешние виджеты;
- включить `upgrade-insecure-requests`;
- проверить консоль браузера.

```http
Content-Security-Policy: upgrade-insecure-requests
```

## Частые ошибки

- **Хардкодить `http://` в шаблонах.**
- **Игнорировать предупреждения консоли.**
- **Думать, что HSTS исправит все ссылки.**
- **Подключать HTTP-скрипт на HTTPS-странице.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое mixed content?",
  "options": [
    {
      "text": "HTTPS-страница загружает HTTP-ресурс",
      "correct": true,
      "explanation": "Это снижает безопасность страницы."
    },
    {
      "text": "Два разных API",
      "correct": false,
      "explanation": "Это не про смешивание схем."
    },
    {
      "text": "Кэш браузера",
      "correct": false,
      "explanation": "Это другой механизм."
    }
  ],
  "explanation": "Схемы HTTPS и HTTP смешивать нельзя."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Как исправить mixed content?",
  "options": [
    {
      "text": "Использовать HTTPS для ресурсов",
      "correct": true
    },
    {
      "text": "Перейти на относительные URL",
      "correct": true
    },
    {
      "text": "Включить `upgrade-insecure-requests`",
      "correct": true
    },
    {
      "text": "Оставить HTTP-скрипт",
      "correct": false,
      "explanation": "Это и есть проблема."
    }
  ],
  "explanation": "Все ресурсы должны идти по HTTPS."
}
```

## Куда дальше

- [Ошибки TLS](theme.html?path=content/http-seti-i-rest-api/https-i-tls/oshibki-tls.md)
- [HTTPS и TLS](theme.html?path=content/http-seti-i-rest-api/https-i-tls/https-i-tls.md)
- [Практика: проверить HTTPS](theme.html?path=content/http-seti-i-rest-api/https-i-tls/praktika-proverit-https.md)
