---
title: Практика: безопасный бэкенд
description: Упражнение: пройти чек-лист безопасности, написать тест и план деплоя.
keywords: практика, безопасность, PHPUnit, деплой, чек-лист

---

# Практика: безопасный бэкенд

Возьмите небольшой PHP-эндпоинт и проверьте его по чек-листу.

## 1. Ввод

- [ ] Все SQL-запросы с параметрами.
- [ ] Валидация на сервере.
- [ ] Ограничение длины.
- [ ] Нет `$_REQUEST`.

## 2. Вывод

- [ ] `htmlspecialchars` для HTML.
- [ ] `json_encode` для JSON.
- [ ] Нет вывода ошибок и стека.

## 3. Сессии

- [ ] CSRF-токен.
- [ ] `httponly`.
- [ ] `secure`.
- [ ] `samesite`.
- [ ] Новый ID после входа.

## 4. Секреты

- [ ] `.env` в `.gitignore`.
- [ ] Нет паролей в коде.
- [ ] Нет секретов в логах.

## 5. Тесты

```php
<?php

public function testRejectsEmptyTitle(): void
{
    $response = $this->post("/api/tasks", ["title" => ""]);

    $this->assertSame(422, $response->status());
}
```

## 6. Деплой

- [ ] Тесты проходят.
- [ ] Есть бэкап.
- [ ] Есть healthcheck.
- [ ] Логи включены.

## Частые ошибки

- **Проверять только happy path.**
- **Деплоить без бэкапа.**
- **Оставлять отладочный вывод.**
- **Хранить секреты в репозитории.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что проверить перед деплоем?",
  "options": [
    {
      "text": "Тесты, бэкап и healthcheck",
      "correct": true,
      "explanation": "Это снижает риск."
    },
    {
      "text": "Только цвет кнопки",
      "correct": false,
      "explanation": "Это не влияет."
    },
    {
      "text": "Отключить логи",
      "correct": false,
      "explanation": "Логи нужны."
    }
  ],
  "explanation": "Деплой требует проверки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "Проверка SQL и вывода",
      "correct": true
    },
    {
      "text": "CSRF и cookie",
      "correct": true
    },
    {
      "text": "Тесты и план деплоя",
      "correct": true
    },
    {
      "text": "Пароль в коде",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Практика проверяет безопасность по шагам."
}
```

## Куда дальше

- [Безопасность, тесты и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/bezopasnost-testy-deploy.md)
- [Ларавел: основы](theme.html?path=content/php/laravel-osnovy/zachem-laravel.md)
- [Практика: PHP-бэкенд](theme.html?path=content/php/praktika-php-backend/plan-i-trebovaniya.md)
