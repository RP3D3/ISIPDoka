---
title: Postman и Insomnia
description: Коллекции, окружения, переменные, тесты и безопасное хранение секретов.
keywords: Postman, Insomnia, коллекции, окружения, переменные, тесты

---

# Postman и Insomnia

Postman и Insomnia помогают хранить запросы, окружения и проверки. Это
удобнее, чем каждый раз писать `curl`.

## Коллекция

Коллекция — набор запросов по проекту:

```text
Tasks API
  GET /api/tasks
  POST /api/tasks
  PATCH /api/tasks/:id
```

## Окружение

```text
base_url = https://api.example.com
token = ...
```

Не храните боевые секреты в общей коллекции.

## Переменные

```text
{{base_url}}/api/tasks
```

## Тесты

```js
pm.test("status 200", () => {
  pm.response.to.have.status(200);
});
```

## Частые ошибки

- **Коммитить коллекцию с токенами.**
- **Не использовать окружения.**
- **Проверять только вручную.**
- **Не иметь assert-проверок.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужны окружения?",
  "options": [
    {
      "text": "Чтобы переключать адреса и токены",
      "correct": true,
      "explanation": "Это удобно для dev и prod."
    },
    {
      "text": "Чтобы шифровать ответ",
      "correct": false,
      "explanation": "Это TLS."
    },
    {
      "text": "Чтобы создать базу",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "Окружения разделяют настройки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для коллекций?",
  "options": [
    {
      "text": "Окружения",
      "correct": true
    },
    {
      "text": "Переменные",
      "correct": true
    },
    {
      "text": "Проверки ответа",
      "correct": true
    },
    {
      "text": "Токены в репозитории",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Коллекции должны быть безопасными."
}
```

## Куда дальше

- [DevTools Network](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/devtools-network.md)
- [Контрактные тесты](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/kontraktnye-testy.md)
- [Моки и стабы](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/moki-i-stuby.md)
