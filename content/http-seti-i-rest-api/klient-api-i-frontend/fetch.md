---
title: fetch
description: Запросы из браузера, response.ok, JSON и заголовки.
keywords: fetch, API, JSON, response.ok, headers, async await

---

# fetch

`fetch` — встроенный способ сделать HTTP-запрос из браузера. Он возвращает
промис с ответом.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/http-seti-i-rest-api/_assets/klient-api-i-frontend/fetch-flow.svg"
    alt="fetch, ответ, проверка и обработка ошибки"
    width="900"
  >
  <figcaption>
    Проверяйте статус до разбора тела.
  </figcaption>
</figure>

## Запрос

```js
const response = await fetch("https://api.example.com/api/tasks", {
  method: "GET",
  headers: {
    "Accept": "application/json",
  },
});
```

## Проверка

```js
if (!response.ok) {
  const error = await response.json();
  throw new Error(error.error.message);
}

const data = await response.json();
```

## POST

```js
await fetch("https://api.example.com/api/tasks", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ title: "Задача" }),
});
```

## Частые ошибки

- **Не проверять `response.ok`.**
- **Забывать `Content-Type` для JSON.**
- **Думать, что fetch падает на `4xx`.** Он не падает.
- **Читать тело дважды.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что проверяет `response.ok`?",
  "options": [
    {
      "text": "Успешный статус ответа",
      "correct": true,
      "explanation": "Обычно это 200–299."
    },
    {
      "text": "Наличие интернета",
      "correct": false,
      "explanation": "Это не проверка сети."
    },
    {
      "text": "Размер тела",
      "correct": false,
      "explanation": "Это другое."
    }
  ],
  "explanation": "Статус проверяют до JSON."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для fetch?",
  "options": [
    {
      "text": "Проверять `response.ok`",
      "correct": true
    },
    {
      "text": "Указывать `Content-Type` для JSON",
      "correct": true
    },
    {
      "text": "Читать тело ошибки",
      "correct": true
    },
    {
      "text": "Игнорировать статус",
      "correct": false,
      "explanation": "Тогда ошибка пройдёт молча."
    }
  ],
  "explanation": "fetch требует явной проверки."
}
```

## Куда дальше

- [axios](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/axios.md)
- [Обработка ошибок](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/obrabotka-oshibok.md)
- [Таймауты и retry](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/taymauty-i-retry.md)
