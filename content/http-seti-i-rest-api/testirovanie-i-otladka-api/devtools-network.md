---
title: DevTools Network
description: Как читать запросы в браузере: статус, заголовки, тело, время и preflight.
keywords: DevTools, Network, статус, заголовки, payload, preflight

---

# DevTools Network

Вкладка Network показывает все запросы страницы. Это первый инструмент
отладки фронтенда.

## Что смотреть

- метод и URL;
- статус;
- заголовки запроса и ответа;
- payload;
- response;
- время;
- инициатор.

## Полезные настройки

- Preserve log — не очищать при переходе;
- Disable cache — проверять без кэша;
- фильтр по `Fetch/XHR`;
- копировать как `curl`.

## Preflight

Если видите `OPTIONS`, это CORS preflight. Проверьте его статус и
заголовки.

## Частые ошибки

- **Смотреть только Console.**
- **Игнорировать статус.**
- **Забывать про кэш.**
- **Не замечать preflight.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где смотреть HTTP-запросы?",
  "options": [
    {
      "text": "В Network",
      "correct": true,
      "explanation": "Там статус, заголовки и тело."
    },
    {
      "text": "В Elements",
      "correct": false,
      "explanation": "Там DOM."
    },
    {
      "text": "В Sources",
      "correct": false,
      "explanation": "Там код."
    }
  ],
  "explanation": "Network показывает обмен."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что видно в Network?",
  "options": [
    {
      "text": "Статус",
      "correct": true
    },
    {
      "text": "Заголовки",
      "correct": true
    },
    {
      "text": "Тело и время",
      "correct": true
    },
    {
      "text": "Только CSS-цвета",
      "correct": false,
      "explanation": "Это не сеть."
    }
  ],
  "explanation": "Network даёт полную картину запроса."
}
```

## Куда дальше

- [Контрактные тесты](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/kontraktnye-testy.md)
- [Моки и стабы](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/moki-i-stuby.md)
- [Граничные случаи](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/granichnye-sluchai.md)
