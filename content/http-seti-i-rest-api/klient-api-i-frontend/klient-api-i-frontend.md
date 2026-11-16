---
title: Клиент API и фронтенд
description: Итог группы: fetch, axios, ошибки, таймауты, отмена, cookies и файлы.
keywords: клиент API, фронтенд, итог, fetch, axios, ошибки

---

# Клиент API и фронтенд

Главная идея группы: клиент должен проверять статус, обрабатывать ошибки
и не оставлять пользователя в неведении.

## Что запомнить

- `fetch` не падает на `4xx`;
- проверяйте `response.ok`;
- `Content-Type` нужен для JSON;
- таймаут обязателен;
- retry — только для идемпотентных запросов;
- отмена предотвращает гонки;
- cookies на другой origin включаются явно;
- файлы отправляют через `FormData`.

## Чек-лист

- [ ] Все запросы проверяют статус.
- [ ] Ошибки показываются понятно.
- [ ] Есть таймаут.
- [ ] Нет бесконечных retry.
- [ ] Запросы отменяются при уходе.
- [ ] Cookies настроены.

## Частые ошибки

- **Игнорировать `4xx`.**
- **Показывать стек.**
- **Ретраить всё подряд.**
- **Забыть `credentials`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в клиенте API?",
  "options": [
    {
      "text": "Проверять статус и обрабатывать ошибки",
      "correct": true,
      "explanation": "Иначе ошибки пройдут молча."
    },
    {
      "text": "Использовать только axios",
      "correct": false,
      "explanation": "Инструмент не главное."
    },
    {
      "text": "Игнорировать таймауты",
      "correct": false,
      "explanation": "Запросы могут зависнуть."
    }
  ],
  "explanation": "Клиент отвечает за надёжность."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "fetch и axios",
      "correct": true
    },
    {
      "text": "Ошибки, таймауты и отмена",
      "correct": true
    },
    {
      "text": "Cookies и файлы",
      "correct": true
    },
    {
      "text": "Только CSS",
      "correct": false,
      "explanation": "Это не клиент API."
    }
  ],
  "explanation": "Группа покрывает клиентскую часть."
}
```

## Куда дальше

- [Практика: подключить фронтенд](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/praktika-podklyuchit-frontend.md)
- [Тестирование и отладка API](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/curl.md)
- [Практика: API и сеть](theme.html?path=content/http-seti-i-rest-api/praktika-api-i-set/trebovaniya-i-scenarii.md)
