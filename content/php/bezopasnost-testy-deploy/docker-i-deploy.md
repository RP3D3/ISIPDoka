---
title: Docker и деплой
description: Как упаковать PHP-приложение, настроить окружение и выкатить его.
keywords: PHP, Docker, деплой, PHP-FPM, Nginx, healthcheck, логи

---

# Docker и деплой

Деплой — это доставка кода на сервер и запуск его в нужном окружении.

## Dockerfile

```dockerfile
FROM php:8.3-fpm

WORKDIR /var/www

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

COPY . .

CMD ["php-fpm"]
```

## Окружение

Секреты передаются через переменные окружения, а не в образе.

```bash
docker run --env-file .env app
```

## Nginx

Nginx принимает HTTP и передаёт PHP-FPM. Статика отдаётся напрямую.

## Healthcheck

```dockerfile
HEALTHCHECK CMD php -r "exit(@fsockopen('127.0.0.1', 9000) ? 0 : 1);"
```

## Деплой

1. Собрать образ.
2. Прогнать тесты.
3. Сделать резервную копию.
4. Применить миграции.
5. Запустить новую версию.
6. Проверить healthcheck и логи.

## Частые ошибки

- **Тег `latest` без фиксации версии.**
- **Секреты в образе.**
- **Деплой без бэкапа.**
- **Нет healthcheck и логов.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать перед деплоем?",
  "options": [
    {
      "text": "Прогнать тесты и сделать бэкап",
      "correct": true,
      "explanation": "Это снижает риск."
    },
    {
      "text": "Удалить базу",
      "correct": false,
      "explanation": "Это катастрофа."
    },
    {
      "text": "Отключить логи",
      "correct": false,
      "explanation": "Логи нужны."
    }
  ],
  "explanation": "Деплой должен быть обратимым."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для Docker-деплоя?",
  "options": [
    {
      "text": "Фиксированные версии",
      "correct": true
    },
    {
      "text": "Секреты в окружении",
      "correct": true
    },
    {
      "text": "Healthcheck",
      "correct": true
    },
    {
      "text": "Секреты внутри образа",
      "correct": false,
      "explanation": "Образ может утечь."
    }
  ],
  "explanation": "Деплой требует предсказуемости."
}
```

## Куда дальше

- [Безопасность, тесты и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/bezopasnost-testy-deploy.md)
- [Практика: безопасный бэкенд](theme.html?path=content/php/bezopasnost-testy-deploy/praktika-bezopasnyy-backend.md)
- [Ларавел: основы](theme.html?path=content/php/laravel-osnovy/zachem-laravel.md)
