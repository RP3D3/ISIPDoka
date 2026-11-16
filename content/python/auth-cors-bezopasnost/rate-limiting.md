---
title: Rate limiting
description: Ограничение запросов, алгоритмы, 429 и Retry-After.
keywords: Python, rate limiting, 429, Retry-After, Redis, лимиты

---

# Rate limiting

Лимиты защищают API от перебора, спама и случайных всплесков.

## Где включать

- вход и регистрация;
- отправка писем;
- тяжёлые отчёты;
- публичные эндпоинты.

## Ответ

```python
raise HTTPException(
    status_code=429,
    detail="Слишком много запросов",
    headers={"Retry-After": "60"},
)
```

## Алгоритмы

- fixed window — просто, но на границе окна возможен всплеск;
- sliding window — точнее;
- token bucket — удобно для burst.

## Хранение

В одном процессе можно считать в памяти. Для нескольких экземпляров
нужен общий store, например Redis.

## Частые ошибки

- **Считать лимиты в памяти при нескольких инстансах.**
- **Не возвращать `429`.**
- **Доверять `X-Forwarded-For` без proxy.**
- **Ставить слишком жёсткий лимит.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой статус у превышения лимита?",
  "options": [
    {
      "text": "429",
      "correct": true,
      "explanation": "Too Many Requests."
    },
    {
      "text": "404",
      "correct": false,
      "explanation": "Это not found."
    },
    {
      "text": "201",
      "correct": false,
      "explanation": "Это created."
    }
  ],
  "explanation": "`429` сообщает о лимите."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для rate limiting?",
  "options": [
    {
      "text": "Общий store для инстансов",
      "correct": true
    },
    {
      "text": "Заголовок `Retry-After`",
      "correct": true
    },
    {
      "text": "Лимит на вход",
      "correct": true
    },
    {
      "text": "Доверять любому IP из заголовка",
      "correct": false,
      "explanation": "Его можно подделать."
    }
  ],
  "explanation": "Лимиты должны работать в кластере."
}
```

## Куда дальше

- [Auth, CORS и безопасность](theme.html?path=content/python/auth-cors-bezopasnost/auth-cors-bezopasnost.md)
- [Практика: защитить API](theme.html?path=content/python/auth-cors-bezopasnost/praktika-zashchitit-api.md)
- [Асинхронность, тесты и деплой](theme.html?path=content/python/async-testy-deploy/async-await.md)
