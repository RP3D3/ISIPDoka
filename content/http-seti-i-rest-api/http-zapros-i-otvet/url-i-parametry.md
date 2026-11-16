---
title: URL и параметры
description: Схема, хост, путь, query, fragment, кодирование и типичные ошибки.
keywords: URL, URI, query, path, параметры, encode, fragment

---

# URL и параметры

URL указывает, куда идёт запрос. Путь выбирает ресурс, query — уточняет
выборку.

## Части URL

```text
https://api.example.com:443/api/tasks?limit=20&page=2#top
```

- `https` — схема;
- `api.example.com` — хост;
- `443` — порт;
- `/api/tasks` — путь;
- `limit=20&page=2` — query;
- `top` — fragment.

## Path и query

- path: `/api/tasks/42` — идентифицирует ресурс;
- query: `?limit=20` — фильтры, сортировка, пагинация.

## Кодирование

```text
пробел → %20
кириллица → %D0%BF...
```

Параметры нужно кодировать через `encodeURIComponent` или аналог.

## Массивы

```text
?tag=php&tag=web
?tag[]=php&tag[]=web
```

Формат зависит от сервера. Зафиксируйте его в контракте.

## Частые ошибки

- **Передавать пароль в URL.** Он попадёт в логи и историю.
- **Забывать кодирование.**
- **Использовать query для идентичности ресурса.**
- **Путать fragment и query.** Fragment не уходит на сервер.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое query-параметры?",
  "options": [
    {
      "text": "Часть URL после `?`",
      "correct": true,
      "explanation": "Они уточняют запрос."
    },
    {
      "text": "Тело запроса",
      "correct": false,
      "explanation": "Это отдельная часть."
    },
    {
      "text": "Заголовок ответа",
      "correct": false,
      "explanation": "Это не URL."
    }
  ],
  "explanation": "Query идёт после вопросительного знака."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про URL?",
  "options": [
    {
      "text": "Path идентифицирует ресурс",
      "correct": true
    },
    {
      "text": "Query уточняет выборку",
      "correct": true
    },
    {
      "text": "Параметры нужно кодировать",
      "correct": true
    },
    {
      "text": "Пароль безопасно передавать в query",
      "correct": false,
      "explanation": "URL попадает в логи."
    }
  ],
  "explanation": "URL должен быть безопасным и однозначным."
}
```

## Куда дальше

- [Content-Type и MIME](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/content-type-i-mime.md)
- [Кэширование HTTP](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/keshirovanie-http.md)
- [HTTP/2, HTTP/3 и real-time](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/http2-http3-i-realtime.md)
