---
title: Контрактные тесты
description: Проверка API по OpenAPI, схемам, примерам и CI.
keywords: контрактные тесты, OpenAPI, схема, CI, API

---

# Контрактные тесты

Контрактный тест проверяет, что API соответствует спецификации. Он ловит
расхождения до клиента.

## Что проверять

- статус-коды;
- обязательные поля;
- типы полей;
- формат ошибок;
- примеры.

## Пример

```js
expect(response.status).toBe(200);
expect(response.body.data).toBeInstanceOf(Array);
expect(response.body.data[0]).toHaveProperty("id");
```

## OpenAPI

Схема из OpenAPI может валидировать ответ автоматически. Если API
отклонился от схемы, тест падает.

## CI

Запускайте контрактные тесты:

- на pull request;
- перед деплоем;
- после миграций.

## Частые ошибки

- **Спецификация устарела.**
- **Нет схемы ошибок.**
- **Проверять только успешный сценарий.**
- **Не запускать в CI.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что проверяет контрактный тест?",
  "options": [
    {
      "text": "Соответствие API спецификации",
      "correct": true,
      "explanation": "Это защищает клиентов."
    },
    {
      "text": "Цвет интерфейса",
      "correct": false,
      "explanation": "Это не API."
    },
    {
      "text": "Скорость интернета",
      "correct": false,
      "explanation": "Это не контракт."
    }
  ],
  "explanation": "Контрактный тест ловит расхождения."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для контрактных тестов?",
  "options": [
    {
      "text": "Актуальная спецификация",
      "correct": true
    },
    {
      "text": "Проверка ошибок",
      "correct": true
    },
    {
      "text": "Запуск в CI",
      "correct": true
    },
    {
      "text": "Только ручная проверка",
      "correct": false,
      "explanation": "Это не автоматизация."
    }
  ],
  "explanation": "Контракт должен проверяться автоматически."
}
```

## Куда дальше

- [Моки и стабы](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/moki-i-stuby.md)
- [Граничные случаи](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/granichnye-sluchai.md)
- [Тестирование и отладка API](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/testirovanie-i-otladka-api.md)
