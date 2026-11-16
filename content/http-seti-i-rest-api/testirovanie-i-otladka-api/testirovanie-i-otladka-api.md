---
title: Тестирование и отладка API
description: Итог группы: curl, Postman, DevTools, контрактные тесты, моки и границы.
keywords: тестирование, отладка, API, итог, curl, Postman, DevTools

---

# Тестирование и отладка API

Главная идея группы: API проверяют не «на глаз», а по контракту и
граничным случаям.

## Что запомнить

- `curl` показывает сырой обмен;
- Postman хранит коллекции и окружения;
- DevTools показывает запросы браузера;
- контрактные тесты ловят расхождения;
- моки изолируют внешние сервисы;
- границы ломаются чаще успешных сценариев.

## Чек-лист

- [ ] Проверен успешный запрос.
- [ ] Проверены `400`, `401`, `403`, `404`, `422`.
- [ ] Проверены пустые и максимальные значения.
- [ ] Проверен формат ошибки.
- [ ] Есть контрактный тест.

## Частые ошибки

- **Только happy path.**
- **Только ручная проверка.**
- **Устаревшие моки.**
- **Игнорирование preflight.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в тестировании API?",
  "options": [
    {
      "text": "Проверять контракт и границы",
      "correct": true,
      "explanation": "Это ловит реальные ошибки."
    },
    {
      "text": "Проверять только 200",
      "correct": false,
      "explanation": "Этого мало."
    },
    {
      "text": "Смотреть только UI",
      "correct": false,
      "explanation": "API может ломаться отдельно."
    }
  ],
  "explanation": "Тесты должны покрывать ошибки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "curl и Postman",
      "correct": true
    },
    {
      "text": "DevTools и контрактные тесты",
      "correct": true
    },
    {
      "text": "Моки и граничные случаи",
      "correct": true
    },
    {
      "text": "Только CSS",
      "correct": false,
      "explanation": "Это не API."
    }
  ],
  "explanation": "Группа покрывает проверку API."
}
```

## Куда дальше

- [Практика: протестировать API](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/praktika-protestirovat-api.md)
- [Практика: API и сеть](theme.html?path=content/http-seti-i-rest-api/praktika-api-i-set/trebovaniya-i-scenarii.md)
- [Клиент API и фронтенд](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/fetch.md)
