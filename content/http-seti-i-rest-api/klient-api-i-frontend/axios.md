---
title: axios
description: Инстанс, baseURL, interceptors, таймауты и обработка ошибок.
keywords: axios, API, baseURL, interceptors, timeout, ошибки

---

# axios

axios — популярная библиотека для HTTP-запросов. Она удобна
перехватчиками и настройками по умолчанию.

## Инстанс

```js
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000,
  headers: { "Accept": "application/json" },
});
```

## Запрос

```js
const { data } = await api.get("/api/tasks");
```

## Interceptors

```js
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // разлогинить
    }
    return Promise.reject(error);
  }
);
```

## Ошибки

```js
try {
  await api.post("/api/tasks", { title: "Задача" });
} catch (error) {
  if (error.response) {
    console.log(error.response.status, error.response.data);
  }
}
```

## Частые ошибки

- **Использовать глобальный axios без настроек.**
- **Не ставить таймаут.**
- **Игнорировать `error.response`.**
- **Дублировать обработку в каждом компоненте.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен `baseURL`?",
  "options": [
    {
      "text": "Чтобы не писать полный адрес в каждом запросе",
      "correct": true,
      "explanation": "Это упрощает код."
    },
    {
      "text": "Чтобы шифровать запросы",
      "correct": false,
      "explanation": "Шифрование — TLS."
    },
    {
      "text": "Чтобы создать базу",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "baseURL задаёт общий префикс."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что полезно в axios?",
  "options": [
    {
      "text": "Инстанс с настройками",
      "correct": true
    },
    {
      "text": "Interceptors",
      "correct": true
    },
    {
      "text": "Таймаут",
      "correct": true
    },
    {
      "text": "Игнорирование ошибок",
      "correct": false,
      "explanation": "Ошибки нужно обрабатывать."
    }
  ],
  "explanation": "axios удобен настройками."
}
```

## Куда дальше

- [Обработка ошибок](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/obrabotka-oshibok.md)
- [Таймауты и retry](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/taymauty-i-retry.md)
- [Отмена запросов](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/otmena-zaprosov.md)
