---
title: Версионирование API
description: Когда менять версию, как не ломать клиентов и как объявлять deprecation.
keywords: REST, версионирование, API, breaking change, deprecation, sunset

---

# Версионирование API

Версия нужна, когда меняется контракт. Не каждое изменение требует новой
версии.

## Ломающие изменения

- удалено поле;
- изменён тип поля;
- изменён смысл статуса;
- удалён эндпоинт;
- обязательный параметр стал другим.

## Неломающие

- добавлено необязательное поле;
- добавлен новый эндпоинт;
- добавлен новый необязательный параметр.

## Способы

```text
/api/v1/tasks
```

Или заголовок:

```http
Accept: application/vnd.example.v2+json
```

Путь проще для людей, заголовок — чище для контракта.

## Deprecation

Сообщайте заранее:

```http
Deprecation: true
Sunset: Wed, 31 Dec 2026 23:59:59 GMT
```

## Частые ошибки

- **Версионировать каждое изменение.**
- **Ломать контракт без версии.**
- **Удалять старую версию без предупреждения.**
- **Держать разные форматы ошибок в версиях.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Когда нужна новая версия API?",
  "options": [
    {
      "text": "При ломающем изменении контракта",
      "correct": true,
      "explanation": "Клиенты могут сломаться."
    },
    {
      "text": "При любом новом поле",
      "correct": false,
      "explanation": "Необязательное поле обычно безопасно."
    },
    {
      "text": "При каждом релизе",
      "correct": false,
      "explanation": "Версия — не номер сборки."
    }
  ],
  "explanation": "Версия защищает клиентов."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что относится к ломающим изменениям?",
  "options": [
    {
      "text": "Удаление поля",
      "correct": true
    },
    {
      "text": "Изменение типа поля",
      "correct": true
    },
    {
      "text": "Удаление эндпоинта",
      "correct": true
    },
    {
      "text": "Добавление необязательного поля",
      "correct": false,
      "explanation": "Обычно это безопасно."
    }
  ],
  "explanation": "Ломающие изменения требуют версии."
}
```

## Куда дальше

- [OpenAPI и контракт](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/openapi-i-kontrakt.md)
- [REST и контракт API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/rest-i-kontrakt-api.md)
- [Практика: спроектировать API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/praktika-sproektirovat-api.md)
