---
title: Методы HTTP
description: GET, POST, PUT, PATCH, DELETE, HEAD и OPTIONS, safe и idempotent.
keywords: HTTP, методы, GET, POST, PUT, PATCH, DELETE, idempotent

---

# Методы HTTP

Метод описывает действие. Он влияет на кэш, повторные запросы и ожидания
клиента.

## Основные методы

- `GET` — прочитать;
- `POST` — создать или выполнить действие;
- `PUT` — заменить ресурс целиком;
- `PATCH` — изменить часть;
- `DELETE` — удалить;
- `HEAD` — получить только заголовки;
- `OPTIONS` — узнать возможности.

## Safe и idempotent

- safe: не меняет состояние — `GET`, `HEAD`, `OPTIONS`;
- idempotent: повтор даёт тот же результат — `GET`, `PUT`, `DELETE`;
- `POST` обычно не idempotent.

## Примеры

```http
GET /api/tasks/42
POST /api/tasks
PATCH /api/tasks/42
DELETE /api/tasks/42
```

## Важно

- не меняйте данные через `GET`;
- `PUT` требует полного представления;
- `PATCH` — частичное обновление;
- `POST` для создания возвращает `201`.

## Частые ошибки

- **Менять данные через `GET`.** Кэш и краулеры могут повторить запрос.
- **Путать `PUT` и `PATCH`.**
- **Использовать `POST` для всего.**
- **Игнорировать идемпотентность.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой метод обычно используют для чтения?",
  "options": [
    {
      "text": "GET",
      "correct": true,
      "explanation": "GET безопасен и кэшируется."
    },
    {
      "text": "DELETE",
      "correct": false,
      "explanation": "Он удаляет."
    },
    {
      "text": "PATCH",
      "correct": false,
      "explanation": "Он меняет часть ресурса."
    }
  ],
  "explanation": "GET предназначен для чтения."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про методы?",
  "options": [
    {
      "text": "GET не должен менять данные",
      "correct": true
    },
    {
      "text": "PUT заменяет ресурс целиком",
      "correct": true
    },
    {
      "text": "DELETE идемпотентен",
      "correct": true
    },
    {
      "text": "POST всегда идемпотентен",
      "correct": false,
      "explanation": "Повтор может создать дубль."
    }
  ],
  "explanation": "Методы несут смысл."
}
```

## Куда дальше

- [Статус-коды](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/status-kody.md)
- [Заголовки](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/zagolovki.md)
- [URL и параметры](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/url-i-parametry.md)
