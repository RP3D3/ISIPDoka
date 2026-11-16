---
title: REST и контракт API
description: Итог группы: ресурсы, методы, статусы, ошибки, пагинация, версии и OpenAPI.
keywords: REST, итог, ресурсы, методы, статусы, ошибки, OpenAPI

---

# REST и контракт API

Главная идея группы: API — это договор. Клиент должен заранее знать
пути, методы, форматы и ошибки.

## Что запомнить

- URL обозначает ресурс;
- метод обозначает действие;
- статус-код — часть контракта;
- ошибки имеют единый формат;
- списки требуют пагинации;
- сортировка — по белому списку;
- ломающие изменения требуют версии;
- OpenAPI фиксирует контракт.

## Чек-лист

- [ ] В URL нет глаголов.
- [ ] `POST` создания возвращает `201`.
- [ ] Ошибки имеют `code` и `message`.
- [ ] Есть `limit` и стабильный порядок.
- [ ] Сортировка проверяется.
- [ ] Спецификация не устарела.

## Частые ошибки

- **Всегда отвечать `200`.**
- **Разный формат ошибок.**
- **Безлимитные списки.**
- **Ломать контракт без версии.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в REST API?",
  "options": [
    {
      "text": "Предсказуемый контракт",
      "correct": true,
      "explanation": "Клиент зависит от него."
    },
    {
      "text": "Красивые URL любой ценой",
      "correct": false,
      "explanation": "Важнее стабильность."
    },
    {
      "text": "Только JSON",
      "correct": false,
      "explanation": "Формат — часть контракта, но не всё."
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
      "text": "Ресурсы и методы",
      "correct": true
    },
    {
      "text": "Статусы и ошибки",
      "correct": true
    },
    {
      "text": "Пагинация, версии и OpenAPI",
      "correct": true
    },
    {
      "text": "Только CSS",
      "correct": false,
      "explanation": "Это не API."
    }
  ],
  "explanation": "Группа покрывает контракт API."
}
```

## Куда дальше

- [Практика: спроектировать API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/praktika-sproektirovat-api.md)
- [Auth, CORS и лимиты](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/sessii-i-cookies.md)
- [Клиент API и фронтенд](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/fetch.md)
