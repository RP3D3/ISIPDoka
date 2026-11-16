---
title: Namespaces и Composer
description: Как организовать классы, подключить автозагрузку и зависимости.
keywords: PHP, namespaces, Composer, PSR-4, autoload, зависимости

---

# Namespaces и Composer

Namespace отделяет классы друг от друга. Composer подключает библиотеки
и настраивает автозагрузку.

## Namespace

```php
<?php

namespace App\Models;

class User
{
}
```

Использование:

```php
<?php

use App\Models\User;

$user = new User();
```

## PSR-4

```json
{
  "autoload": {
    "psr-4": {
      "App\\": "src/"
    }
  }
}
```

После изменения выполните:

```bash
composer dump-autoload
```

## Установка зависимостей

```bash
composer require guzzlehttp/guzzle
composer install
```

`composer.json` описывает зависимости, `composer.lock` фиксирует версии.

## Автозагрузка

```php
<?php

require __DIR__ . "/vendor/autoload.php";
```

## Частые ошибки

- **Не использовать namespace в проекте.**
- **Путать путь и namespace.**
- **Коммитить `vendor/`.** Зависимости ставятся через Composer.
- **Редактировать файлы в `vendor/`.** Изменения потеряются.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен Composer?",
  "options": [
    {
      "text": "Для зависимостей и автозагрузки",
      "correct": true,
      "explanation": "Он управляет пакетами."
    },
    {
      "text": "Для стилей CSS",
      "correct": false,
      "explanation": "Это не его задача."
    },
    {
      "text": "Для базы данных",
      "correct": false,
      "explanation": "База настраивается отдельно."
    }
  ],
  "explanation": "Composer — менеджер зависимостей PHP."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про namespace и Composer?",
  "options": [
    {
      "text": "Namespace разделяет классы",
      "correct": true
    },
    {
      "text": "PSR-4 связывает namespace и папки",
      "correct": true
    },
    {
      "text": "`composer.lock` фиксирует версии",
      "correct": true
    },
    {
      "text": "`vendor/` нужно коммитить",
      "correct": false,
      "explanation": "Обычно его не коммитят."
    }
  ],
  "explanation": "Composer и namespace делают проект управляемым."
}
```

## Куда дальше

- [Функции, массивы и ООП](theme.html?path=content/php/funkcii-massivy-oop/funkcii-massivy-oop.md)
- [Практика: ООП](theme.html?path=content/php/funkcii-massivy-oop/praktika-oop.md)
- [HTTP, формы и сессии](theme.html?path=content/php/http-formy-sessii/http-zapros-i-otvet.md)
