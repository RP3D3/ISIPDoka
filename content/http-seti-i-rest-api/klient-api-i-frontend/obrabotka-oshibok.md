---
title: Обработка ошибок
description: Сетевые ошибки, HTTP-ошибки, JSON и понятные сообщения пользователю.
keywords: ошибки, API, fetch, axios, статус, JSON, пользователь

---

# Обработка ошибок

Ошибка может быть сетевой, HTTP или ошибкой разбора. Пользователь должен
получить понятное сообщение, а разработчик — детали в логах.

## Виды ошибок

- сеть недоступна;
- таймаут;
- `4xx` — ошибка запроса;
- `5xx` — ошибка сервера;
- тело не JSON;
- ошибка валидации.

## Пример

```js
async function loadTasks() {
  try {
    const response = await fetch("/api/tasks");

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.error?.message ?? "Ошибка API");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "Не удалось загрузить задачи" };
  }
}
```

## Что показывать

- короткое сообщение;
- что делать дальше;
- не показывать стек;
- не раскрывать внутренние ID.

## Частые ошибки

- **Только `console.log`.**
- **Показывать стек пользователю.**
- **Ретраить `4xx`.**
- **Не иметь запасного варианта.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что показать пользователю при ошибке?",
  "options": [
    {
      "text": "Понятное сообщение и действие",
      "correct": true,
      "explanation": "Это помогает продолжить."
    },
    {
      "text": "Полный стек",
      "correct": false,
      "explanation": "Это внутренняя информация."
    },
    {
      "text": "SQL-запрос",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Сообщение должно быть понятным."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно в обработке ошибок?",
  "options": [
    {
      "text": "Различать сеть и HTTP",
      "correct": true
    },
    {
      "text": "Читать тело ошибки",
      "correct": true
    },
    {
      "text": "Логировать детали",
      "correct": true
    },
    {
      "text": "Показывать стек",
      "correct": false,
      "explanation": "Это не для пользователя."
    }
  ],
  "explanation": "Ошибки должны быть безопасными и полезными."
}
```

## Куда дальше

- [Таймауты и retry](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/taymauty-i-retry.md)
- [Отмена запросов](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/otmena-zaprosov.md)
- [Cookies и credentials](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/cookies-i-credentials.md)
