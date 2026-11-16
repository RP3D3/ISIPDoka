---
title: Что такое REST
description: Ресурсы, stateless, единый интерфейс и место REST среди API.
keywords: REST, API, ресурсы, stateless, HTTP, JSON

---

# Что такое REST

REST — стиль проектирования API. Он опирается на ресурсы, HTTP-методы и
отсутствие состояния на сервере между запросами.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/http-seti-i-rest-api/_assets/rest-i-kontrakt-api/rest-contract.svg"
    alt="Ресурсы, методы, статусы и ошибки REST API"
    width="900"
  >
  <figcaption>
    REST API — это контракт, а не просто JSON по HTTP.
  </figcaption>
</figure>

## Идеи REST

- клиент и сервер разделены;
- каждый запрос содержит всё нужное;
- ресурсы адресуются URL;
- действия выражаются методами;
- ответы можно кэшировать;
- слои можно добавлять незаметно.

## REST и JSON

REST не обязан быть JSON. JSON — удобный формат, но API может отдавать
XML, HTML или что-то ещё.

## REST и CRUD

CRUD — четыре операции. REST шире: там ещё кэш, статусы, связи и
представления.

## Частые ошибки

- **Считать REST синонимом JSON.**
- **Считать REST синонимом CRUD.**
- **Писать действия в URL.**
- **Хранить состояние между запросами на сервере.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое REST?",
  "options": [
    {
      "text": "Стиль проектирования API вокруг ресурсов",
      "correct": true,
      "explanation": "Он опирается на HTTP и ресурсы."
    },
    {
      "text": "Формат JSON",
      "correct": false,
      "explanation": "JSON — лишь формат."
    },
    {
      "text": "База данных",
      "correct": false,
      "explanation": "Это другой уровень."
    }
  ],
  "explanation": "REST — архитектурный стиль."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про REST?",
  "options": [
    {
      "text": "Ресурсы адресуются URL",
      "correct": true
    },
    {
      "text": "Действия выражаются методами",
      "correct": true
    },
    {
      "text": "Запрос содержит всё нужное",
      "correct": true
    },
    {
      "text": "REST обязан отдавать только JSON",
      "correct": false,
      "explanation": "Формат может быть разным."
    }
  ],
  "explanation": "REST опирается на ресурсы и HTTP."
}
```

## Куда дальше

- [Ресурсы и URL](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/resursy-i-url.md)
- [Методы и идемпотентность](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/metody-i-idempotentnost.md)
- [Статус-коды API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/status-kody-api.md)
