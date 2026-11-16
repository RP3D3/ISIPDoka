---
title: Таймауты и retry
description: Таймаут запроса, повторные попытки, backoff и идемпотентность.
keywords: таймаут, retry, backoff, jitter, AbortController, API

---

# Таймауты и retry

Без таймаута запрос может висеть бесконечно. Повторять запросы можно
только осознанно.

## Таймаут

```js
const controller = new AbortController();

setTimeout(() => controller.abort(), 5000);

await fetch("/api/tasks", { signal: controller.signal });
```

В axios:

```js
axios.get("/api/tasks", { timeout: 5000 });
```

## Retry

Повторяйте только:

- сетевые ошибки;
- `408`, `429`, `502`, `503`, `504`;
- идемпотентные запросы.

## Backoff

```text
1 с → 2 с → 4 с → 8 с
```

Добавьте jitter, чтобы клиенты не били одновременно.

## Частые ошибки

- **Нет таймаута.**
- **Повторять `POST` без ключа.**
- **Повторять сразу и бесконечно.**
- **Ретраить `400` и `422`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какие запросы безопасно повторять?",
  "options": [
    {
      "text": "Идемпотентные",
      "correct": true,
      "explanation": "Повтор не создаёт лишних эффектов."
    },
    {
      "text": "Любые POST",
      "correct": false,
      "explanation": "Можно создать дубль."
    },
    {
      "text": "Только DELETE",
      "correct": false,
      "explanation": "DELETE тоже идемпотентен, но не только он."
    }
  ],
  "explanation": "Retry зависит от идемпотентности."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для retry?",
  "options": [
    {
      "text": "Таймаут",
      "correct": true
    },
    {
      "text": "Backoff",
      "correct": true
    },
    {
      "text": "Ограничение попыток",
      "correct": true
    },
    {
      "text": "Бесконечный повтор",
      "correct": false,
      "explanation": "Это перегрузит API."
    }
  ],
  "explanation": "Повторы должны быть ограничены."
}
```

## Куда дальше

- [Отмена запросов](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/otmena-zaprosov.md)
- [Cookies и credentials](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/cookies-i-credentials.md)
- [Загрузка файлов](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/zagruzka-faylov.md)
