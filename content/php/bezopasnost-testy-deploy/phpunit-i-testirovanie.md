---
title: PHPUnit и тестирование
description: Как писать unit- и интеграционные тесты для PHP-кода.
keywords: PHP, PHPUnit, тесты, unit, интеграционные, assertions

---

# PHPUnit и тестирование

Тесты фиксируют ожидаемое поведение и помогают не сломать код при
изменениях.

## Установка

```bash
composer require --dev phpunit/phpunit
```

## Тест

```php
<?php

use PHPUnit\Framework\TestCase;

final class PriceTest extends TestCase
{
    public function testTotal(): void
    {
        $cart = new Cart();
        $cart->add(new Product("Книга", 1000));

        $this->assertSame(1000.0, $cart->total());
    }
}
```

## Запуск

```bash
vendor/bin/phpunit
```

## Виды тестов

- unit — отдельный класс;
- интеграционные — с базой или API;
- end-to-end — весь сценарий.

## Тестовая база

Для интеграционных тестов используйте отдельную базу и транзакции с
откатом.

## Частые ошибки

- **Писать тесты только на успешный сценарий.**
- **Использовать боевую базу.**
- **Зависеть от порядка тестов.**
- **Не запускать тесты перед деплоем.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что проверяет unit-тест?",
  "options": [
    {
      "text": "Отдельный класс или функцию",
      "correct": true,
      "explanation": "Он изолирован от внешних систем."
    },
    {
      "text": "Весь интернет",
      "correct": false,
      "explanation": "Это невозможно."
    },
    {
      "text": "Только CSS",
      "correct": false,
      "explanation": "Это не PHP-тест."
    }
  ],
  "explanation": "Unit-тест проверяет маленькую единицу кода."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для тестов?",
  "options": [
    {
      "text": "Изоляция",
      "correct": true
    },
    {
      "text": "Проверка ошибок",
      "correct": true
    },
    {
      "text": "Запуск перед деплоем",
      "correct": true
    },
    {
      "text": "Боевая база без копии",
      "correct": false,
      "explanation": "Это риск для данных."
    }
  ],
  "explanation": "Тесты должны быть безопасными и повторяемыми."
}
```

## Куда дальше

- [Docker и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/docker-i-deploy.md)
- [Безопасность, тесты и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/bezopasnost-testy-deploy.md)
- [Практика: безопасный бэкенд](theme.html?path=content/php/bezopasnost-testy-deploy/praktika-bezopasnyy-backend.md)
