---
title: Массивы и их функции
description: array_map, array_filter, sort, in_array и другие рабочие инструменты PHP.
keywords: PHP, массивы, array_map, array_filter, sort, in_array, array_column

---

# Массивы и их функции

Массивы — основная структура данных в PHP. Встроенные функции закрывают
большинство задач без ручных циклов.

## Преобразование

```php
<?php

$numbers = [1, 2, 3, 4];

$doubled = array_map(fn ($n) => $n * 2, $numbers);
$even = array_filter($numbers, fn ($n) => $n % 2 === 0);
$sum = array_reduce($numbers, fn ($carry, $n) => $carry + $n, 0);
```

## Сортировка

```php
<?php

$names = ["Борис", "Аня", "Вика"];

sort($names);          // по возрастанию
rsort($names);         // по убыванию
usort($users, fn ($a, $b) => $a["age"] <=> $b["age"]);
```

## Поиск и ключи

```php
<?php

$tags = ["php", "web"];

var_dump(in_array("php", $tags, true));
var_dump(array_key_exists("name", $user));
var_dump(array_search("web", $tags, true));
```

## Объединение и выборка

```php
<?php

$all = array_merge($first, $second);
$names = array_column($users, "name");
$unique = array_unique($tags);
```

## Частые ошибки

- **Использовать `in_array` без строгого режима.** `0 == "php"` может удивить.
- **Менять массив внутри `array_map`.** Функция должна возвращать значение.
- **Забывать про ключи.** `array_filter` сохраняет их.
- **Писать ручной цикл там, где есть готовая функция.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `array_filter`?",
  "options": [
    {
      "text": "Оставляет элементы, для которых callback вернул true",
      "correct": true,
      "explanation": "Это фильтрация массива."
    },
    {
      "text": "Сортирует массив",
      "correct": false,
      "explanation": "Для сортировки есть sort и usort."
    },
    {
      "text": "Удаляет все ключи",
      "correct": false,
      "explanation": "Ключи сохраняются."
    }
  ],
  "explanation": "`array_filter` отбирает элементы по условию."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про функции массивов?",
  "options": [
    {
      "text": "`array_map` преобразует элементы",
      "correct": true
    },
    {
      "text": "`array_column` выбирает колонку",
      "correct": true
    },
    {
      "text": "`usort` принимает callback",
      "correct": true
    },
    {
      "text": "`in_array` всегда сравнивает строго",
      "correct": false,
      "explanation": "Строгость включается третьим аргументом."
    }
  ],
  "explanation": "Функции массивов экономят код."
}
```

## Куда дальше

- [Строки и mbstring](theme.html?path=content/php/funkcii-massivy-oop/stroki-i-mbstring.md)
- [Функции и замыкания](theme.html?path=content/php/funkcii-massivy-oop/funkcii-i-zamykaniya.md)
- [Классы и объекты](theme.html?path=content/php/funkcii-massivy-oop/klassy-i-obekty.md)
