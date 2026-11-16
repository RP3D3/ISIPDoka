---
title: Практика: протестировать API
description: Упражнение: пройти успешный сценарий и ошибки через curl и DevTools.
keywords: практика, API, тесты, curl, DevTools, ошибки

---

# Практика: протестировать API

Возьмите API задач и проверьте его по шагам.

## 1. Успешный сценарий

```bash
curl -i https://api.example.com/api/tasks
curl -i https://api.example.com/api/tasks/1
```

## 2. Создание

```bash
curl -i -X POST https://api.example.com/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Тест"}'
```

Ожидайте `201`.

## 3. Ошибки

- пустой title → `422`;
- несуществующий ID → `404`;
- без токена → `401`;
- чужой ресурс → `403`.

## 4. DevTools

Откройте Network и повторите запрос из фронтенда. Проверьте preflight,
статус и тело.

## Чек-лист

- [ ] Успешный запрос.
- [ ] Создание.
- [ ] Валидация.
- [ ] Авторизация.
- [ ] Чужой ресурс.
- [ ] Формат ошибки.

## Частые ошибки

- **Проверять только 200.**
- **Не читать тело ошибки.**
- **Игнорировать `OPTIONS`.**
- **Не проверять права.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что ожидать при чужом ресурсе?",
  "options": [
    {
      "text": "403",
      "correct": true,
      "explanation": "Пользователь известен, но прав нет."
    },
    {
      "text": "200",
      "correct": false,
      "explanation": "Это успех."
    },
    {
      "text": "500",
      "correct": false,
      "explanation": "Это ошибка сервера."
    }
  ],
  "explanation": "Чужой ресурс — это запрет."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "Успешные запросы",
      "correct": true
    },
    {
      "text": "Ошибки валидации",
      "correct": true
    },
    {
      "text": "Авторизация и права",
      "correct": true
    },
    {
      "text": "Только красивый UI",
      "correct": false,
      "explanation": "Это не тест API."
    }
  ],
  "explanation": "Практика проверяет API целиком."
}
```

## Куда дальше

- [Тестирование и отладка API](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/testirovanie-i-otladka-api.md)
- [Практика: API и сеть](theme.html?path=content/http-seti-i-rest-api/praktika-api-i-set/trebovaniya-i-scenarii.md)
- [Клиент API и фронтенд](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/fetch.md)
