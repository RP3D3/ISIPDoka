---
title: Требования и сценарии
description: Роли, пользовательские истории, данные, ошибки и критерии приёмки.
keywords: практика, требования, сценарии, user story, критерии приёмки

---

# Требования и сценарии

До кода нужно понять, кто пользуется API и что считается успехом.

## Роли

- гость;
- пользователь;
- администратор.

## История

```text
Как пользователь,
я хочу создавать задачи,
чтобы не забывать дела.
```

## Данные

```text
Task: id, title, done, owner_id, created_at
User: id, email, password_hash, role
```

## Сценарии

- создать задачу;
- получить список своих задач;
- отметить выполненной;
- удалить;
- запретить доступ к чужой задаче.

## Критерии приёмки

- `POST /tasks` возвращает `201`;
- пустой title — `422`;
- чужая задача — `403` или `404`;
- список поддерживает пагинацию.

## Частые ошибки

- **Не описать роли.**
- **Забыть ошибки.**
- **Не указать лимиты.**
- **Сделать критерии размытыми.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужны критерии приёмки?",
  "options": [
    {
      "text": "Понять, когда задача готова",
      "correct": true,
      "explanation": "Это проверяемый результат."
    },
    {
      "text": "Ускорить CSS",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Заменить тесты",
      "correct": false,
      "explanation": "Тесты проверяют реализацию."
    }
  ],
  "explanation": "Критерии делают результат измеримым."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в требования?",
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
      "text": "Ошибки и лимиты",
      "correct": true
    },
    {
      "text": "Только цвет кнопки",
      "correct": false,
      "explanation": "Это не бэкенд-требование."
    }
  ],
  "explanation": "Требования описывают поведение."
}
```

## Куда дальше

- [Контракт и эндпоинты](theme.html?path=content/python/praktika-python-backend/kontrakt-i-endpointy.md)
- [Реализация и проверка](theme.html?path=content/python/praktika-python-backend/realizaciya-i-proverka.md)
- [Практика: Python-бэкенд](theme.html?path=content/python/praktika-python-backend/praktika-python-backend.md)
