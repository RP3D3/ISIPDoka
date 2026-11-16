---
title: Реализация и проверка
description: Auth, CORS, база, тесты, curl и DevTools для готового API.
keywords: практика, реализация, проверка, API, auth, CORS, тесты

---

# Реализация и проверка

Реализация соединяет контракт, базу и безопасность. Проверка
подтверждает, что всё работает.

## Реализация

- маршруты;
- валидация;
- auth;
- база;
- ошибки;
- CORS.

## Проверка

```bash
curl -i https://api.example.com/api/tasks
```

В браузере:

- DevTools Network;
- статус;
- заголовки;
- тело.

## Тесты

- успешный сценарий;
- пустой title;
- чужой ресурс;
- нет токена;
- несуществующий ID.

## Логи

Пишите `request_id`, статус и время. Не пишите токены и пароли.

## Частые ошибки

- **Нет проверки прав.**
- **Нет CORS для фронтенда.**
- **Разный формат ошибок.**
- **Нет тестов.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что проверить в браузере?",
  "options": [
    {
      "text": "Статус, заголовки и тело",
      "correct": true,
      "explanation": "Это показывает реальный обмен."
    },
    {
      "text": "Только цвет кнопки",
      "correct": false,
      "explanation": "Это UI."
    },
    {
      "text": "Только размер шрифта",
      "correct": false,
      "explanation": "Это не API."
    }
  ],
  "explanation": "DevTools показывает запрос."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в проверку?",
  "options": [
    {
      "text": "Успешный сценарий",
      "correct": true
    },
    {
      "text": "Ошибки и права",
      "correct": true
    },
    {
      "text": "CORS и формат ошибок",
      "correct": true
    },
    {
      "text": "Только деплой",
      "correct": false,
      "explanation": "Проверка идёт раньше."
    }
  ],
  "explanation": "Проверка покрывает контракт."
}
```

## Куда дальше

- [Практика: API и сеть](theme.html?path=content/http-seti-i-rest-api/praktika-api-i-set/praktika-api-i-set.md)
- [Практика: API и сеть по задаче](theme.html?path=content/http-seti-i-rest-api/praktika-api-i-set/praktika-api-i-set-po-zadache.md)
- [Тестирование и отладка API](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/curl.md)
