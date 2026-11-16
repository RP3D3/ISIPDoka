---
title: curl
description: Запросы из терминала, заголовки, JSON, cookies и файлы.
keywords: curl, API, GET, POST, заголовки, JSON, cookies

---

# curl

`curl` — быстрый способ проверить API из терминала. Он показывает то, что
скрывает браузер.

## GET

```bash
curl -i https://api.example.com/api/tasks
```

`-i` показывает заголовки ответа.

## POST JSON

```bash
curl -X POST https://api.example.com/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Задача"}'
```

## Авторизация

```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.example.com/api/me
```

## Cookies

```bash
curl -b "session=abc" https://api.example.com/api/me
```

## Частые ошибки

- **Забыть кавычки вокруг JSON.**
- **Не указать `Content-Type`.**
- **Игнорировать статус.**
- **Печатать токен в истории команд.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `curl -i`?",
  "options": [
    {
      "text": "Показывает заголовки ответа",
      "correct": true,
      "explanation": "Это полезно для отладки."
    },
    {
      "text": "Шифрует запрос",
      "correct": false,
      "explanation": "Шифрование — TLS."
    },
    {
      "text": "Создаёт базу",
      "correct": false,
      "explanation": "Это не так."
    }
  ],
  "explanation": "`-i` добавляет заголовки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для curl?",
  "options": [
    {
      "text": "Указывать `Content-Type` для JSON",
      "correct": true
    },
    {
      "text": "Проверять статус",
      "correct": true
    },
    {
      "text": "Не светить токен",
      "correct": true
    },
    {
      "text": "Игнорировать ответ",
      "correct": false,
      "explanation": "Тогда смысл теряется."
    }
  ],
  "explanation": "curl требует аккуратности."
}
```

## Куда дальше

- [Postman и Insomnia](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/postman-i-insomnia.md)
- [DevTools Network](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/devtools-network.md)
- [Контрактные тесты](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/kontraktnye-testy.md)
