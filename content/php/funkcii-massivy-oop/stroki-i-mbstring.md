---
title: Строки и mbstring
description: Интерполяция, длина, подстроки и UTF-8 в PHP.
keywords: PHP, строки, mbstring, strlen, substr, sprintf, UTF-8

---

# Строки и mbstring

Строки в PHP — это последовательность байтов. Для UTF-8 нужны функции
`mbstring`, иначе кириллица считается неправильно.

## Создание

```php
<?php

$name = "Аня";
$greeting = "Привет, $name";
$message = 'Без интерполяции: $name';
```

Двойные кавычки подставляют переменные, одинарные — нет.

## Длина

```php
<?php

$text = "Привет";

echo strlen($text);      // байты
echo mb_strlen($text);   // символы
```

Для пользовательского текста используйте `mb_strlen`.

## Подстроки

```php
<?php

$text = "PHP для бэкенда";

echo mb_substr($text, 0, 3);
echo mb_strtoupper($text);
```

## Замена и формат

```php
<?php

$clean = str_replace("  ", " ", $text);
$line = sprintf("Пользователь: %s, возраст: %d", $name, $age);
```

## Разбор

```php
<?php

$tags = explode(",", "php,web,api");
$line = implode(", ", $tags);
$trimmed = trim("  текст  ");
```

## Частые ошибки

- **Использовать `strlen` для UTF-8.** Длина будет в байтах.
- **Забывать кодировку.** Указывайте `UTF-8` явно.
- **Путать одинарные и двойные кавычки.**
- **Применять regex там, где хватает `str_replace`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какая функция считает символы UTF-8?",
  "options": [
    {
      "text": "`mb_strlen`",
      "correct": true,
      "explanation": "Она учитывает многобайтовую кодировку."
    },
    {
      "text": "`strlen`",
      "correct": false,
      "explanation": "Она считает байты."
    },
    {
      "text": "`count`",
      "correct": false,
      "explanation": "Она для массивов."
    }
  ],
  "explanation": "Для UTF-8 нужны mb-функции."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про строки PHP?",
  "options": [
    {
      "text": "Двойные кавычки подставляют переменные",
      "correct": true
    },
    {
      "text": "`explode` разбивает строку",
      "correct": true
    },
    {
      "text": "`implode` собирает строку из массива",
      "correct": true
    },
    {
      "text": "`strlen` всегда считает символы",
      "correct": false,
      "explanation": "Она считает байты."
    }
  ],
  "explanation": "Строковые функции надо выбирать по задаче."
}
```

## Куда дальше

- [Функции и замыкания](theme.html?path=content/php/funkcii-massivy-oop/funkcii-i-zamykaniya.md)
- [Классы и объекты](theme.html?path=content/php/funkcii-massivy-oop/klassy-i-obekty.md)
- [Интерфейсы и трейты](theme.html?path=content/php/funkcii-massivy-oop/interfeysy-i-treyty.md)
