---
title: Структура HTTP-запроса
description: Стартовая строка, заголовки, тело и структура ответа.
keywords: HTTP, запрос, ответ, стартовая строка, заголовки, тело

---

# Структура HTTP-запроса

HTTP-сообщение состоит из стартовой строки, заголовков и тела. Тело может
отсутствовать.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/http-seti-i-rest-api/_assets/http-zapros-i-otvet/http-message.svg"
    alt="Структура HTTP-запроса и ответа"
    width="900"
  >
  <figcaption>
    Сначала читают статус и заголовки, потом тело.
  </figcaption>
</figure>

## Запрос

```http
GET /api/tasks?limit=20 HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer <token>

```

- стартовая строка: метод, путь, версия;
- заголовки: метаданные;
- пустая строка;
- тело: у `GET` обычно пустое.

## Ответ

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store

{"data":[]}
```

- статусная строка: версия, код, текст;
- заголовки;
- тело.

## Важно

- статус говорит, что произошло;
- заголовки объясняют формат и кэш;
- тело содержит данные или ошибку.

## Частые ошибки

- **Читать тело, не проверив статус.**
- **Считать, что тело есть всегда.** У `204` его нет.
- **Забывать пустую строку между заголовками и телом.**
- **Игнорировать `Content-Type`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что идёт после заголовков запроса?",
  "options": [
    {
      "text": "Пустая строка и тело",
      "correct": true,
      "explanation": "Пустая строка отделяет заголовки от тела."
    },
    {
      "text": "Сразу второй запрос",
      "correct": false,
      "explanation": "Такого нет."
    },
    {
      "text": "Только статус",
      "correct": false,
      "explanation": "Статус — в ответе."
    }
  ],
  "explanation": "Заголовки и тело разделены пустой строкой."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в HTTP-ответ?",
  "options": [
    {
      "text": "Статусная строка",
      "correct": true
    },
    {
      "text": "Заголовки",
      "correct": true
    },
    {
      "text": "Тело",
      "correct": true
    },
    {
      "text": "Обязательный пароль",
      "correct": false,
      "explanation": "Пароль не является частью ответа."
    }
  ],
  "explanation": "Ответ состоит из статуса, заголовков и тела."
}
```

## Куда дальше

- [Методы HTTP](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/metody-http.md)
- [Статус-коды](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/status-kody.md)
- [Заголовки](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/zagolovki.md)
