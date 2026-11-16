---
title: Моки и стабы
description: Подмена API в тестах, mock server и проверка ошибок.
keywords: моки, стабы, mock server, тесты, API, контракт

---

# Моки и стабы

Мок заменяет внешний сервис в тесте. Стаб возвращает заранее заданный
ответ.

## Когда нужны

- внешний API недоступен;
- нужен редкий ответ;
- нужно проверить ошибку;
- тест должен быть быстрым.

## Пример стаба

```js
const fakeApi = {
  async getTasks() {
    return [{ id: 1, title: "Тест" }];
  },
};
```

## Mock server

Можно поднять сервер, который отвечает по контракту:

```text
GET /api/tasks → 200 {"data":[]}
POST /api/tasks → 201 {"data":{"id":1}}
```

## Частые ошибки

- **Мокать всё, включая свой код.**
- **Забывать обновлять моки.**
- **Проверять только успех.**
- **Мокать внутренние детали вместо контракта.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен мок?",
  "options": [
    {
      "text": "Заменить внешний сервис в тесте",
      "correct": true,
      "explanation": "Тест становится быстрым и стабильным."
    },
    {
      "text": "Ускорить CSS",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Создать базу",
      "correct": false,
      "explanation": "Это миграции."
    }
  ],
  "explanation": "Мок изолирует тест."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для моков?",
  "options": [
    {
      "text": "Соответствие контракту",
      "correct": true
    },
    {
      "text": "Проверка ошибок",
      "correct": true
    },
    {
      "text": "Обновление при изменении API",
      "correct": true
    },
    {
      "text": "Мокать всё без исключения",
      "correct": false,
      "explanation": "Тогда тест ничего не проверяет."
    }
  ],
  "explanation": "Моки должны быть реалистичными."
}
```

## Куда дальше

- [Граничные случаи](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/granichnye-sluchai.md)
- [Тестирование и отладка API](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/testirovanie-i-otladka-api.md)
- [Практика: протестировать API](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/praktika-protestirovat-api.md)
