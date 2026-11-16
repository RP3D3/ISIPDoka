---
title: Формат ошибок
description: Единый конверт ошибки, код, сообщение, поля и request_id.
keywords: REST, API, ошибки, формат, code, message, fields, request_id

---

# Формат ошибок

Ошибка API должна быть машиночитаемой и понятной человеку. Формат должен
быть одинаковым во всех эндпоинтах.

## Пример

```json
{
  "error": {
    "code": "validation_error",
    "message": "Проверьте поля",
    "fields": {
      "email": "Некорректный email"
    },
    "request_id": "req_123"
  }
}
```

## Поля

- `code` — стабильный код для программы;
- `message` — текст для человека;
- `fields` — ошибки конкретных полей;
- `request_id` — для поиска в логах.

## Что не отдавать

- стек вызовов;
- SQL-запрос;
- пути файлов;
- секреты;
- внутренние ID инфраструктуры.

## Частые ошибки

- **Разный формат в разных эндпоинтах.**
- **Только текст без кода.**
- **Утечка внутренних деталей.**
- **HTML-страница вместо JSON.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен `code` в ошибке?",
  "options": [
    {
      "text": "Чтобы клиент мог обработать ошибку программно",
      "correct": true,
      "explanation": "Текст может меняться, код — нет."
    },
    {
      "text": "Чтобы показать стек",
      "correct": false,
      "explanation": "Стек не отдают."
    },
    {
      "text": "Чтобы заменить статус-код",
      "correct": false,
      "explanation": "Статус тоже нужен."
    }
  ],
  "explanation": "Код ошибки — часть контракта."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что должно быть в ошибке?",
  "options": [
    {
      "text": "Код",
      "correct": true
    },
    {
      "text": "Сообщение",
      "correct": true
    },
    {
      "text": "Поля с ошибками",
      "correct": true
    },
    {
      "text": "Полный стек",
      "correct": false,
      "explanation": "Это внутренняя информация."
    }
  ],
  "explanation": "Ошибка должна помогать клиенту."
}
```

## Куда дальше

- [Пагинация, фильтры и сортировка](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/paginaciya-filtry-sortirovka.md)
- [Версионирование API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/versirovanie-api.md)
- [OpenAPI и контракт](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/openapi-i-kontrakt.md)
