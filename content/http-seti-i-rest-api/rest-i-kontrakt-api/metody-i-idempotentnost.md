---
title: Методы и идемпотентность
description: Безопасные и идемпотентные методы, повторы и idempotency key.
keywords: REST, методы, идемпотентность, GET, PUT, DELETE, idempotency key

---

# Методы и идемпотентность

Идемпотентность означает, что повторный запрос не меняет результат
сильнее первого.

## Безопасные методы

`GET`, `HEAD`, `OPTIONS` не меняют состояние.

## Идемпотентные

`GET`, `PUT`, `DELETE` можно повторять без дополнительных эффектов.

`POST` обычно не идемпотентен: повтор создаст дубль.

## Пример

```text
DELETE /api/tasks/42
```

Повтор вернёт `404`, но состояние останется тем же.

## Idempotency key

Для `POST` можно передать ключ:

```http
Idempotency-Key: 7f3c...
```

Сервер запоминает результат и не создаёт дубль.

## Частые ошибки

- **Повторять `POST` без ключа.**
- **Считать `DELETE` неидемпотентным.**
- **Менять данные через `GET`.**
- **Использовать `PUT` для частичного обновления.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой метод обычно неидемпотентен?",
  "options": [
    {
      "text": "POST",
      "correct": true,
      "explanation": "Повтор может создать дубль."
    },
    {
      "text": "GET",
      "correct": false,
      "explanation": "GET безопасен."
    },
    {
      "text": "DELETE",
      "correct": false,
      "explanation": "DELETE идемпотентен."
    }
  ],
  "explanation": "POST требует осторожности при повторе."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про идемпотентность?",
  "options": [
    {
      "text": "PUT идемпотентен",
      "correct": true
    },
    {
      "text": "DELETE идемпотентен",
      "correct": true
    },
    {
      "text": "Idempotency-Key помогает с POST",
      "correct": true
    },
    {
      "text": "GET меняет данные",
      "correct": false,
      "explanation": "GET безопасен."
    }
  ],
  "explanation": "Повтор запроса не должен ломать данные."
}
```

## Куда дальше

- [Статус-коды API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/status-kody-api.md)
- [Формат ошибок](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/format-oshibok.md)
- [Пагинация, фильтры и сортировка](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/paginaciya-filtry-sortirovka.md)
