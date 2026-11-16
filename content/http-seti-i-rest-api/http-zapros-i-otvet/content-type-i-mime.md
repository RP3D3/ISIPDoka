---
title: Content-Type и MIME
description: JSON, формы, multipart, charset и content negotiation.
keywords: Content-Type, MIME, JSON, form, multipart, charset, Accept

---

# Content-Type и MIME

`Content-Type` сообщает, что находится в теле. Без него сервер и клиент
могут неправильно разобрать данные.

## Частые типы

- `application/json`;
- `application/x-www-form-urlencoded`;
- `multipart/form-data`;
- `text/html; charset=utf-8`;
- `text/plain`;
- `image/png`.

## JSON

```http
Content-Type: application/json; charset=utf-8

{"title":"Задача"}
```

## Форма

```http
Content-Type: application/x-www-form-urlencoded

title=%D0%97%D0%B0%D0%B4%D0%B0%D1%87%D0%B0
```

## Файлы

```http
Content-Type: multipart/form-data; boundary=----abc
```

## Content negotiation

Клиент говорит, что хочет:

```http
Accept: application/json
```

Сервер отвечает своим `Content-Type`.

## Частые ошибки

- **Не указывать `Content-Type`.**
- **Путать JSON и форму.**
- **Забывать `charset=utf-8`.**
- **Доверять расширению файла вместо MIME.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой тип у JSON-тела?",
  "options": [
    {
      "text": "`application/json`",
      "correct": true,
      "explanation": "Это стандартный MIME-тип JSON."
    },
    {
      "text": "`text/html`",
      "correct": false,
      "explanation": "Это HTML."
    },
    {
      "text": "`image/png`",
      "correct": false,
      "explanation": "Это изображение."
    }
  ],
  "explanation": "Content-Type должен соответствовать телу."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Content-Type?",
  "options": [
    {
      "text": "Описывает формат тела",
      "correct": true
    },
    {
      "text": "Может содержать charset",
      "correct": true
    },
    {
      "text": "Для файлов часто нужен multipart",
      "correct": true
    },
    {
      "text": "Его можно не указывать для JSON",
      "correct": false,
      "explanation": "Лучше указывать всегда."
    }
  ],
  "explanation": "Content-Type — часть контракта."
}
```

## Куда дальше

- [Кэширование HTTP](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/keshirovanie-http.md)
- [HTTP/2, HTTP/3 и real-time](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/http2-http3-i-realtime.md)
- [HTTP: запрос и ответ](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/http-zapros-i-otvet.md)
