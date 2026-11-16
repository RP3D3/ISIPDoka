---
title: Функции и замыкания
description: Параметры, типы, return, область видимости и замыкания в PHP.
keywords: PHP, функции, параметры, return, замыкания, use, arrow functions

---

# Функции и замыкания

Функция — именованный блок кода. Она принимает параметры и возвращает
результат.

## Объявление

```php
<?php

declare(strict_types=1);

function greet(string $name): string
{
    return "Привет, " . $name;
}

echo greet("Аня");
```

## Параметры по умолчанию

```php
<?php

function paginate(int $page = 1, int $limit = 20): array
{
    return ["page" => $page, "limit" => $limit];
}
```

## Область видимости

```php
<?php

$tax = 0.2;

function total(float $price): float
{
    global $tax;
    return $price * (1 + $tax);
}
```

`global` работает, но лучше передавать зависимости параметрами.

## Замыкания

```php
<?php

$prefix = "ID: ";

$format = function (int $id) use ($prefix): string {
    return $prefix . $id;
};

echo $format(42);
```

## Стрелочные функции

```php
<?php

$double = fn (int $n): int => $n * 2;
```

Стрелочные функции автоматически захватывают переменные из области
видимости.

## Частые ошибки

- **Использовать `global` без необходимости.**
- **Делать функцию с десятью параметрами.**
- **Забывать `return`.** Функция вернёт `null`.
- **Смешивать вывод и вычисление.** Лучше возвращать данные.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `return`?",
  "options": [
    {
      "text": "Возвращает значение и завершает функцию",
      "correct": true,
      "explanation": "Код после return не выполняется."
    },
    {
      "text": "Печатает значение",
      "correct": false,
      "explanation": "Для печати есть echo."
    },
    {
      "text": "Создаёт массив",
      "correct": false,
      "explanation": "Это не так."
    }
  ],
  "explanation": "`return` завершает функцию и отдаёт результат."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про функции?",
  "options": [
    {
      "text": "Можно указывать типы параметров",
      "correct": true
    },
    {
      "text": "Можно задать значение по умолчанию",
      "correct": true
    },
    {
      "text": "Замыкания могут захватывать переменные",
      "correct": true
    },
    {
      "text": "Функция обязана печатать текст",
      "correct": false,
      "explanation": "Она может только возвращать значение."
    }
  ],
  "explanation": "Функции делают код повторно используемым."
}
```

## Куда дальше

- [Классы и объекты](theme.html?path=content/php/funkcii-massivy-oop/klassy-i-obekty.md)
- [Интерфейсы и трейты](theme.html?path=content/php/funkcii-massivy-oop/interfeysy-i-treyty.md)
- [Namespaces и Composer](theme.html?path=content/php/funkcii-massivy-oop/namespaces-i-composer.md)
