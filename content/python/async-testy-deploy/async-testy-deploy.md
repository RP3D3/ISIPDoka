---
title: Асинхронность, тесты и деплой
description: Итог группы: async, задачи, очереди, pytest, Docker и healthcheck.
keywords: async, тесты, деплой, итог, pytest, Docker, healthcheck

---

# Асинхронность, тесты и деплой

Главная идея группы: код должен не только работать, но и выдерживать
нагрузку, проверяться и запускаться одинаково.

## Что запомнить

- async помогает при I/O, но не ускоряет CPU;
- фоновые задачи не должны теряться;
- очередь нужна для тяжёлой работы;
- pytest проверяет поведение;
- тестовая база изолирована;
- Docker фиксирует окружение;
- healthcheck сообщает о готовности.

## Чек-лист

- [ ] Блокирующий код не ломает event loop.
- [ ] Для долгих задач есть очередь.
- [ ] Ключевые сценарии покрыты тестами.
- [ ] Тесты не используют прод-базу.
- [ ] Образ собирается и запускается.
- [ ] Есть `/health/live` и `/health/ready`.
- [ ] Логи без секретов.

## Частые ошибки

- **Считать async универсальным ускорением.**
- **Терять фоновые задачи.**
- **Тестировать только успешный путь.**
- **Запускать `--reload` в проде.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в деплое?",
  "options": [
    {
      "text": "Воспроизводимость и наблюдаемость",
      "correct": true,
      "explanation": "Одинаковый запуск и понятные логи."
    },
    {
      "text": "Как можно больше воркеров",
      "correct": false,
      "explanation": "Это зависит от нагрузки."
    },
    {
      "text": "Секреты в образе",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Деплой должен быть предсказуемым."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "async и очереди",
      "correct": true
    },
    {
      "text": "pytest и тестовая база",
      "correct": true
    },
    {
      "text": "Docker, логи и healthcheck",
      "correct": true
    },
    {
      "text": "Только CSS",
      "correct": false,
      "explanation": "Это не бэкенд."
    }
  ],
  "explanation": "Группа покрывает эксплуатацию."
}
```

## Куда дальше

- [Практика: тесты и деплой](theme.html?path=content/python/async-testy-deploy/praktika-testirovanie-i-deploy.md)
- [Практика: Python-бэкенд](theme.html?path=content/python/praktika-python-backend/trebovaniya-i-scenarii.md)
- [Основы Python](theme.html?path=content/python/osnovy-python/zachem-python.md)
