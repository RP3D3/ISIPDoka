---
title: Переменные и типы
description: Переменные, основные типы, приведение типов и strict_types в PHP.
keywords: PHP, переменные, типы, string, int, bool, strict_types

---

# Переменные и типы

Переменная в PHP начинается с `$`. Тип определяется значением, но его
можно проверять и указывать явно.

## Основные типы

```php
<?php

$name = "Аня";        // string
$age = 20;            // int
$price = 99.90;       // float
$active = true;       // bool
$note = null;         // null
$tags = ["php", "web"]; // array
```

## Проверка типа

```php
var_dump($age);
echo gettype($price);
```

## Приведение типов

```php
$number = "42";
$sum = $number + 8; // 50
```

PHP может привести строку к числу. Это удобно, но иногда опасно.

## `strict_types`

```php
<?php

declare(strict_types=1);

function add(int $a, int $b): int
{
    return $a + $b;
}
```

С `strict_types=1` PHP не будет молча приводить неподходящие типы.

## Константы

```php
const APP_NAME = "Дока";
define("MAX_ITEMS", 100);
```

## Частые ошибки

- **Использовать переменную до присваивания.** Будет предупреждение.
- **Сравнивать через `==` без понимания приведения.** Лучше `===`.
- **Думать, что тип нельзя изменить.** В PHP он динамический.
- **Забывать `strict_types`.** Код может вести себя неожиданно.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `declare(strict_types=1)`?",
  "options": [
    {
      "text": "Запрещает неявное приведение типов в вызовах",
      "correct": true,
      "explanation": "PHP будет строже проверять типы."
    },
    {
      "text": "Удаляет все переменные",
      "correct": false,
      "explanation": "Это не так."
    },
    {
      "text": "Включает базу данных",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "strict_types делает проверку типов строже."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Какие типы есть в PHP?",
  "options": [
    {
      "text": "string",
      "correct": true
    },
    {
      "text": "int",
      "correct": true
    },
    {
      "text": "bool",
      "correct": true
    },
    {
      "text": "table",
      "correct": false,
      "explanation": "Для таблиц есть массивы и объекты."
    }
  ],
  "explanation": "PHP поддерживает скалярные и составные типы."
}
```

## Куда дальше

- [Операторы и ветвления](theme.html?path=content/php/osnovy-php/operatory-i-vetvleniya.md)
- [Циклы и массивы](theme.html?path=content/php/osnovy-php/cikly-i-massivy.md)
- [Формы и суперглобалы](theme.html?path=content/php/osnovy-php/formy-i-superglobals.md)
