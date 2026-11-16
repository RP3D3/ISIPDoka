---
title: Операторы и ветвления
description: Арифметика, сравнение, логика, if, switch и match в PHP.
keywords: PHP, операторы, if, else, switch, match, сравнение

---

# Операторы и ветвления

Операторы управляют значениями, а ветвления — ходом программы.

## Арифметика

```php
<?php

$sum = 2 + 3;
$diff = 10 - 4;
$product = 3 * 5;
$quotient = 10 / 4;
$remainder = 10 % 3;
```

## Сравнение

```php
<?php

var_dump(5 == "5");  // true: значение после приведения
var_dump(5 === "5"); // false: тип тоже важен
var_dump(5 != 3);    // true
var_dump(5 <=> 3);   // 1
```

Для проверок чаще используйте `===` и `!==`.

## Логика

```php
<?php

$isAdult = $age >= 18;
$hasAccess = $isAdult && $isAdmin;
$canTry = $isGuest || $hasAccess;
$isBlocked = !$active;
```

## `if`

```php
<?php

if ($age >= 18) {
    echo "Доступ разрешён";
} elseif ($age >= 14) {
    echo "Нужно согласие";
} else {
    echo "Доступ запрещён";
}
```

## `switch` и `match`

```php
<?php

switch ($role) {
    case "admin":
        echo "Полный доступ";
        break;
    default:
        echo "Обычный доступ";
}

$label = match ($role) {
    "admin" => "Администратор",
    "user" => "Пользователь",
    default => "Гость",
};
```

`match` сравнивает строго и возвращает значение.

## Частые ошибки

- **Путать `=` и `==`.** Присваивание вместо сравнения.
- **Использовать `==` там, где нужен `===`.**
- **Забывать `break` в `switch`.** Будет провал в следующий case.
- **Писать слишком сложные условия.** Их трудно читать и тестировать.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем `===` отличается от `==`?",
  "options": [
    {
      "text": "`===` сравнивает и значение, и тип",
      "correct": true,
      "explanation": "Это строгое сравнение."
    },
    {
      "text": "`===` только присваивает",
      "correct": false,
      "explanation": "Присваивание — это `=`."
    },
    {
      "text": "`===` работает только с числами",
      "correct": false,
      "explanation": "Работает с разными типами."
    }
  ],
  "explanation": "Строгое сравнение безопаснее."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про ветвления?",
  "options": [
    {
      "text": "`if` проверяет условие",
      "correct": true
    },
    {
      "text": "`switch` выбирает по значению",
      "correct": true
    },
    {
      "text": "`match` возвращает значение",
      "correct": true
    },
    {
      "text": "`else` обязателен всегда",
      "correct": false,
      "explanation": "`else` можно не писать."
    }
  ],
  "explanation": "Ветвления выбирают путь выполнения."
}
```

## Куда дальше

- [Циклы и массивы](theme.html?path=content/php/osnovy-php/cikly-i-massivy.md)
- [Формы и суперглобалы](theme.html?path=content/php/osnovy-php/formy-i-superglobals.md)
- [Ошибки и отладка](theme.html?path=content/php/osnovy-php/oshibki-i-otladka.md)
