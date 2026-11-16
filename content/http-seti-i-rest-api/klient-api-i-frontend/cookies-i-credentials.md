---
title: Cookies и credentials
description: Как браузер отправляет cookies на другой origin и что настроить.
keywords: cookies, credentials, CORS, SameSite, fetch, axios

---

# Cookies и credentials

По умолчанию `fetch` не отправляет cookies на другой origin. Это нужно
включать явно.

## fetch

```js
await fetch("https://api.example.com/me", {
  credentials: "include",
});
```

## axios

```js
axios.get("https://api.example.com/me", {
  withCredentials: true,
});
```

## Сервер

```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true
Set-Cookie: session=abc; HttpOnly; Secure; SameSite=Lax
```

## Важно

- `*` нельзя вместе с credentials;
- cookie должна быть `Secure` на HTTPS;
- `SameSite` ограничивает межсайтовые запросы;
- для cookie-аутентификации нужна CSRF-защита.

## Частые ошибки

- **Забыть `credentials: include`.**
- **Разрешить `*` с credentials.**
- **Хранить токен в `localStorage` без необходимости.**
- **Не защищать CSRF.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что включает отправку cookies на другой origin?",
  "options": [
    {
      "text": "`credentials: \"include\"`",
      "correct": true,
      "explanation": "Без этого fetch не отправит cookies."
    },
    {
      "text": "`method: \"GET\"`",
      "correct": false,
      "explanation": "Метод не влияет на cookies."
    },
    {
      "text": "`response.ok`",
      "correct": false,
      "explanation": "Это проверка статуса."
    }
  ],
  "explanation": "Credentials включаются явно."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для cookies?",
  "options": [
    {
      "text": "`credentials: include`",
      "correct": true
    },
    {
      "text": "Конкретный origin в CORS",
      "correct": true
    },
    {
      "text": "`HttpOnly` и `Secure`",
      "correct": true
    },
    {
      "text": "`*` с credentials",
      "correct": false,
      "explanation": "Браузер это запретит."
    }
  ],
  "explanation": "Cookies требуют согласованных настроек."
}
```

## Куда дальше

- [Загрузка файлов](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/zagruzka-faylov.md)
- [Клиент API и фронтенд](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/klient-api-i-frontend.md)
- [Практика: подключить фронтенд](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/praktika-podklyuchit-frontend.md)
