---
title: Пагинация, фильтры и сортировка
description: limit/offset, cursor, meta, белые списки фильтров и сортировки.
keywords: REST, пагинация, limit, offset, cursor, фильтры, сортировка, meta

---

# Пагинация, фильтры и сортировка

Список может быть большим. API должен отдавать его частями и позволять
сужать выборку.

## Offset-пагинация

```text
GET /api/tasks?limit=20&offset=40
```

Простая, но может пропускать строки при частых вставках.

## Cursor-пагинация

```text
GET /api/tasks?limit=20&cursor=eyJpZCI6NDJ9
```

Стабильнее для лент и больших данных.

## Ответ

```json
{
  "data": [],
  "meta": {
    "limit": 20,
    "next_cursor": "eyJpZCI6NjJ9"
  }
}
```

## Фильтры

```text
GET /api/tasks?status=done&user_id=42
```

Фильтры должны быть в белом списке. Не подставляйте имена колонок из URL
без проверки.

## Сортировка

```text
GET /api/tasks?sort=-created_at
```

Тоже белый список. Иначе получится инъекция.

## Частые ошибки

- **Безлимитный `limit`.**
- **Сортировка из URL без проверки.**
- **Нет стабильного порядка.**
- **Разная структура `meta`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен `limit`?",
  "options": [
    {
      "text": "Ограничить размер страницы",
      "correct": true,
      "explanation": "Это защищает API и клиент."
    },
    {
      "text": "Отсортировать данные",
      "correct": false,
      "explanation": "Для сортировки есть sort."
    },
    {
      "text": "Удалить строки",
      "correct": false,
      "explanation": "Это DELETE."
    }
  ],
  "explanation": "Пагинация ограничивает объём."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для списков?",
  "options": [
    {
      "text": "Ограничивать `limit`",
      "correct": true
    },
    {
      "text": "Проверять сортировку по белому списку",
      "correct": true
    },
    {
      "text": "Иметь стабильный порядок",
      "correct": true
    },
    {
      "text": "Разрешать любой SQL в query",
      "correct": false,
      "explanation": "Это риск инъекции."
    }
  ],
  "explanation": "Списки должны быть безопасными."
}
```

## Куда дальше

- [Версионирование API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/versirovanie-api.md)
- [OpenAPI и контракт](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/openapi-i-kontrakt.md)
- [REST и контракт API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/rest-i-kontrakt-api.md)
