---
title: Требования и сценарии
description: Пользователи, роли, данные, ошибки и критерии готовности API.
keywords: практика, требования, сценарии, роли, API, критерии

---

# Требования и сценарии

Практика начинается с требований. Иначе API обрастает случайными
эндпоинтами.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/http-seti-i-rest-api/_assets/praktika-api-i-set/api-practice.svg"
    alt="Требования, контракт, реализация, проверка и итог"
    width="900"
  >
  <figcaption>
    Сначала требования и контракт, потом код.
  </figcaption>
</figure>

## Пользователи

- гость;
- пользователь;
- администратор.

## Сценарии

- вход;
- список задач;
- создание;
- изменение;
- удаление;
- ошибки.

## Данные

- task: id, title, done, owner;
- user: id, email, role.

## Критерии готовности

- [ ] Есть список эндпоинтов.
- [ ] Описаны роли.
- [ ] Описаны ошибки.
- [ ] Есть примеры запросов.
- [ ] Понятно, что считается успехом.

## Частые ошибки

- **Начинать с кода.**
- **Забыть про роли.**
- **Не описать ошибки.**
- **Смешать API и UI.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "С чего начинается практика?",
  "options": [
    {
      "text": "С требований и сценариев",
      "correct": true,
      "explanation": "Это задаёт контракт."
    },
    {
      "text": "С случайного кода",
      "correct": false,
      "explanation": "Так появляется хаос."
    },
    {
      "text": "С деплоя",
      "correct": false,
      "explanation": "Деплой — в конце."
    }
  ],
  "explanation": "Требования экономят время."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что должно быть в требованиях?",
  "options": [
    {
      "text": "Роли",
      "correct": true
    },
    {
      "text": "Сценарии",
      "correct": true
    },
    {
      "text": "Ошибки и критерии",
      "correct": true
    },
    {
      "text": "Только цвет кнопок",
      "correct": false,
      "explanation": "Это UI, а не API."
    }
  ],
  "explanation": "Требования описывают поведение."
}
```

## Куда дальше

- [Контракт и эндпоинты](theme.html?path=content/http-seti-i-rest-api/praktika-api-i-set/kontrakt-i-endpointy.md)
- [Реализация и проверка](theme.html?path=content/http-seti-i-rest-api/praktika-api-i-set/realizaciya-i-proverka.md)
- [Практика: API и сеть](theme.html?path=content/http-seti-i-rest-api/praktika-api-i-set/praktika-api-i-set.md)
