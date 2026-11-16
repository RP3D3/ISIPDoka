---
title: Граничные случаи
description: Пустые данные, лимиты, Unicode, чужие ресурсы и конкурентность.
keywords: граничные случаи, тесты, API, лимиты, Unicode, 404, 403

---

# Граничные случаи

Успешный сценарий — только начало. Ошибки чаще живут на границах.

## Что проверить

- пустое тело;
- `null`;
- максимальная длина;
- Unicode и эмодзи;
- неверный тип;
- огромный payload;
- дубликат;
- чужой ресурс;
- повторный запрос;
- таймаут.

## Пример

```text
POST /api/tasks {"title":""} → 422
GET /api/tasks/999999 → 404
PATCH /api/tasks/1 (чужой) → 403
```

## Конкурентность

Два запроса могут изменить одну запись. Проверьте:

- транзакции;
- версионирование;
- блокировки.

## Частые ошибки

- **Проверять только happy path.**
- **Игнорировать пустые значения.**
- **Не проверять лимиты.**
- **Не проверять права.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что вернуть на пустой обязательный title?",
  "options": [
    {
      "text": "422",
      "correct": true,
      "explanation": "Это ошибка валидации."
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
  "explanation": "Ошибка поля — это 422."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что относится к граничным случаям?",
  "options": [
    {
      "text": "Пустые значения",
      "correct": true
    },
    {
      "text": "Максимальная длина",
      "correct": true
    },
    {
      "text": "Чужой ресурс",
      "correct": true
    },
    {
      "text": "Только успешный запрос",
      "correct": false,
      "explanation": "Это не граница."
    }
  ],
  "explanation": "Границы ломают API чаще всего."
}
```

## Куда дальше

- [Тестирование и отладка API](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/testirovanie-i-otladka-api.md)
- [Практика: протестировать API](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/praktika-protestirovat-api.md)
- [Практика: API и сеть](theme.html?path=content/http-seti-i-rest-api/praktika-api-i-set/trebovaniya-i-scenarii.md)
