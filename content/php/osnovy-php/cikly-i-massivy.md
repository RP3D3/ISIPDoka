---
title: Циклы и массивы
description: for, foreach, while, индексированные и ассоциативные массивы в PHP.
keywords: PHP, циклы, массивы, foreach, for, while, array

---

# Циклы и массивы

Массивы хранят наборы значений. Циклы позволяют обработать каждый элемент.

## Индексированный массив

```php
<?php

$tags = ["php", "web", "api"];

echo $tags[0]; // php
```

## Ассоциативный массив

```php
<?php

$user = [
    "name" => "Аня",
    "age" => 20,
    "active" => true,
];

echo $user["name"];
```

## `foreach`

```php
<?php

foreach ($tags as $tag) {
    echo $tag . "<br>";
}

foreach ($user as $key => $value) {
    echo $key . ": " . $value . "<br>";
}
```

## `for`

```php
<?php

for ($i = 0; $i < count($tags); $i++) {
    echo $tags[$i];
}
```

## `while`

```php
<?php

$i = 0;
while ($i < 3) {
    echo $i;
    $i++;
}
```

## Полезные функции

```php
<?php

$numbers = [3, 1, 2];

sort($numbers);
$count = count($numbers);
$upper = array_map("strtoupper", ["a", "b"]);
$even = array_filter($numbers, fn ($n) => $n % 2 === 0);
```

## Частые ошибки

- **Выходить за границы массива.** Проверяйте ключ.
- **Менять массив внутри `foreach`.** Поведение легко запутать.
- **Путать индекс и ключ.** В ассоциативном массиве ключ — строка.
- **Считать `count` на каждой итерации без нужды.** Лучше вынести в переменную.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `foreach`?",
  "options": [
    {
      "text": "Перебирает элементы массива",
      "correct": true,
      "explanation": "Это основной цикл для массивов."
    },
    {
      "text": "Создаёт базу данных",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Удаляет массив",
      "correct": false,
      "explanation": "Он его читает."
    }
  ],
  "explanation": "`foreach` удобен для массивов."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про массивы PHP?",
  "options": [
    {
      "text": "Бывают индексированные",
      "correct": true
    },
    {
      "text": "Бывают ассоциативные",
      "correct": true
    },
    {
      "text": "Могут хранить разные типы",
      "correct": true
    },
    {
      "text": "Могут иметь только числовые ключи",
      "correct": false,
      "explanation": "Ключи могут быть строками."
    }
  ],
  "explanation": "Массивы PHP гибкие."
}
```

## Куда дальше

- [Формы и суперглобалы](theme.html?path=content/php/osnovy-php/formy-i-superglobals.md)
- [Ошибки и отладка](theme.html?path=content/php/osnovy-php/oshibki-i-otladka.md)
- [Функции, массивы и ООП](theme.html?path=content/php/funkcii-massivy-oop/massivy-i-ih-funkcii.md)
