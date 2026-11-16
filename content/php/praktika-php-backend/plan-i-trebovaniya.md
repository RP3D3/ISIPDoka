---
title: План и требования
description: Как описать сущности, роли, сценарии и контракт API до кода.
keywords: практика, PHP, план, требования, API, сущности, сценарии

---

# План и требования

Практика начинается с плана. Иначе API обрастает случайными полями и
непонятными ошибками.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/php/_assets/praktika-php-backend/backend-plan.svg"
    alt="План, API, база, фронтенд и проверка PHP-бэкенда"
    width="900"
  >
  <figcaption>
    План связывает требования, API, базу и фронтенд.
  </figcaption>
</figure>

## Сущности

Например, для задач:

- user;
- task;
- tag.

## Роли

- гость;
- пользователь;
- администратор.

## Сценарии

- регистрация;
- вход;
- создание задачи;
- список задач;
- изменение статуса;
- удаление.

## Контракт API

```text
GET    /api/tasks
POST   /api/tasks
PATCH  /api/tasks/{id}
DELETE /api/tasks/{id}
```

## Критерии готовности

- [ ] Есть схема базы.
- [ ] Есть список эндпоинтов.
- [ ] Описан формат ошибок.
- [ ] Понятны роли и доступ.
- [ ] Есть примеры запросов.

## Частые ошибки

- **Начинать с кода без плана.**
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
      "text": "С требований и плана",
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
  "explanation": "План экономит время."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что должно быть в плане?",
  "options": [
    {
      "text": "Сущности",
      "correct": true
    },
    {
      "text": "Роли",
      "correct": true
    },
    {
      "text": "Эндпоинты и ошибки",
      "correct": true
    },
    {
      "text": "Только цвет кнопок",
      "correct": false,
      "explanation": "Это не backend-план."
    }
  ],
  "explanation": "План описывает данные и сценарии."
}
```

## Куда дальше

- [Реализация API и БД](theme.html?path=content/php/praktika-php-backend/realizaciya-api-i-bd.md)
- [Связка с фронтендом](theme.html?path=content/php/praktika-php-backend/svyazka-s-frontendom.md)
- [Практика: PHP-бэкенд](theme.html?path=content/php/praktika-php-backend/praktika-php-backend.md)
