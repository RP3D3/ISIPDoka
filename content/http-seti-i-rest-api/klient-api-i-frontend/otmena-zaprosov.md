---
title: Отмена запросов
description: AbortController, отмена при размонтировании и гонки запросов.
keywords: отмена, AbortController, signal, fetch, гонка, React

---

# Отмена запросов

Если пользователь ушёл со страницы, запрос лучше отменить. Это экономит
ресурсы и предотвращает гонки.

## AbortController

```js
const controller = new AbortController();

fetch("/api/tasks", { signal: controller.signal })
  .then((response) => response.json())
  .catch((error) => {
    if (error.name === "AbortError") {
      return;
    }
    throw error;
  });

controller.abort();
```

## Отмена при размонтировании

```js
useEffect(() => {
  const controller = new AbortController();

  load(controller.signal);

  return () => controller.abort();
}, []);
```

## Гонки

Если два запроса идут одновременно, ответ старого может прийти позже.
Отмена или проверка версии помогают.

## Частые ошибки

- **Не отменять запросы.**
- **Считать `AbortError` ошибкой.**
- **Отменять общий запрос для всех компонентов.**
- **Не проверять актуальность данных.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что отменяет запрос?",
  "options": [
    {
      "text": "`controller.abort()`",
      "correct": true,
      "explanation": "Он посылает сигнал отмены."
    },
    {
      "text": "`response.json()`",
      "correct": false,
      "explanation": "Это разбор тела."
    },
    {
      "text": "`console.log`",
      "correct": false,
      "explanation": "Это вывод."
    }
  ],
  "explanation": "AbortController управляет отменой."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно при отмене?",
  "options": [
    {
      "text": "Передавать `signal`",
      "correct": true
    },
    {
      "text": "Игнорировать `AbortError`",
      "correct": true
    },
    {
      "text": "Отменять при уходе со страницы",
      "correct": true
    },
    {
      "text": "Считать отмену ошибкой API",
      "correct": false,
      "explanation": "Это нормальная ситуация."
    }
  ],
  "explanation": "Отмена должна быть аккуратной."
}
```

## Куда дальше

- [Cookies и credentials](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/cookies-i-credentials.md)
- [Загрузка файлов](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/zagruzka-faylov.md)
- [Клиент API и фронтенд](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/klient-api-i-frontend.md)
