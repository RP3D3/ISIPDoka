---
title: Практика: подключить фронтенд
description: Упражнение: загрузить список, создать запись и показать ошибки.
keywords: практика, фронтенд, fetch, API, ошибки, JSON

---

# Практика: подключить фронтенд

Подключите небольшой API к странице.

## 1. Загрузка

```js
async function loadTasks() {
  const response = await fetch("/api/tasks");

  if (!response.ok) {
    throw new Error("Не удалось загрузить задачи");
  }

  return response.json();
}
```

## 2. Создание

```js
async function createTask(title) {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (response.status === 422) {
    const error = await response.json();
    throw new Error(error.error.message);
  }

  return response.json();
}
```

## 3. Ошибки

- покажите сообщение;
- не показывайте стек;
- дайте кнопку «Повторить»;
- не ретрайте `422`.

## 4. Проверка

- [ ] Список загружается.
- [ ] Создание работает.
- [ ] Ошибка видна.
- [ ] Есть таймаут.
- [ ] Запрос отменяется при уходе.

## Частые ошибки

- **Не проверять статус.**
- **Показывать пустой экран.**
- **Игнорировать `422`.**
- **Не отменять запросы.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать при `422`?",
  "options": [
    {
      "text": "Показать ошибки полей",
      "correct": true,
      "explanation": "Это ошибка валидации."
    },
    {
      "text": "Повторять запрос",
      "correct": false,
      "explanation": "Повтор не исправит данные."
    },
    {
      "text": "Игнорировать",
      "correct": false,
      "explanation": "Пользователь не поймёт."
    }
  ],
  "explanation": "Ошибки валидации показывают пользователю."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "Загрузка списка",
      "correct": true
    },
    {
      "text": "Создание записи",
      "correct": true
    },
    {
      "text": "Показ ошибок",
      "correct": true
    },
    {
      "text": "Игнорирование статуса",
      "correct": false,
      "explanation": "Статус нужно проверять."
    }
  ],
  "explanation": "Практика соединяет фронтенд и API."
}
```

## Куда дальше

- [Клиент API и фронтенд](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/klient-api-i-frontend.md)
- [Тестирование и отладка API](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/curl.md)
- [Практика: API и сеть](theme.html?path=content/http-seti-i-rest-api/praktika-api-i-set/trebovaniya-i-scenarii.md)
