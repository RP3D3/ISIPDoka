---
title: API и фронтенд
description: Итог группы: JSON, REST, роутинг, валидация, CORS и auth.
keywords: API, фронтенд, JSON, REST, CORS, auth, итог

---

# API и фронтенд

Главная идея группы: API — это контракт. Фронтенд должен заранее знать
формат запросов, ответов и ошибок.

## Что запомнить

- JSON отдаётся с `Content-Type`;
- REST использует методы и статус-коды;
- роутинг выбирает контроллер;
- валидация выполняется на сервере;
- ошибки имеют единый формат;
- CORS разрешает конкретные домены;
- auth хранит секреты на сервере.

## Чек-лист

- [ ] У всех ответов единый формат.
- [ ] Ошибки имеют код и сообщение.
- [ ] Есть 404 и 422.
- [ ] CORS не открыт всем.
- [ ] Cookies с `httponly` и `samesite`.

## Частые ошибки

- **Всегда отвечать `200`.**
- **Отдавать HTML вместо JSON.**
- **Не проверять входные данные.**
- **Разрешать CORS всем с credentials.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в API для фронтенда?",
  "options": [
    {
      "text": "Стабильный контракт и понятные ошибки",
      "correct": true,
      "explanation": "Фронтенд зависит от формата."
    },
    {
      "text": "Менять формат каждый день",
      "correct": false,
      "explanation": "Это ломает клиент."
    },
    {
      "text": "Скрывать статус-коды",
      "correct": false,
      "explanation": "Клиенту нужны коды."
    }
  ],
  "explanation": "Контракт важнее реализации."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "JSON и REST",
      "correct": true
    },
    {
      "text": "Роутинг и контроллеры",
      "correct": true
    },
    {
      "text": "Валидация, CORS и auth",
      "correct": true
    },
    {
      "text": "Только вёрстка",
      "correct": false,
      "explanation": "Это фронтенд, а не API."
    }
  ],
  "explanation": "Группа покрывает контракт API."
}
```

## Куда дальше

- [Практика: API для фронтенда](theme.html?path=content/php/api-i-frontend/praktika-api-dlya-frontenda.md)
- [Безопасность, тесты и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/sql-inekcii-i-xss.md)
- [Ларавел: основы](theme.html?path=content/php/laravel-osnovy/zachem-laravel.md)
