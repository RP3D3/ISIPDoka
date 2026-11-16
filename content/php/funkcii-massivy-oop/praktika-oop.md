---
title: Практика: ООП
description: Упражнение: класс товара, массив товаров и простая корзина.
keywords: практика, ООП, PHP, класс, объект, корзина

---

# Практика: ООП

Сделайте класс товара и простую корзину.

## 1. Класс `Product`

```php
<?php

declare(strict_types=1);

class Product
{
    public function __construct(
        private string $name,
        private float $price,
    ) {
    }

    public function name(): string
    {
        return $this->name;
    }

    public function price(): float
    {
        return $this->price;
    }
}
```

## 2. Массив товаров

```php
<?php

$products = [
    new Product("Книга", 1200),
    new Product("Курс", 5000),
];
```

## 3. Корзина

```php
<?php

class Cart
{
    private array $items = [];

    public function add(Product $product): void
    {
        $this->items[] = $product;
    }

    public function total(): float
    {
        return array_reduce(
            $this->items,
            fn (float $sum, Product $p) => $sum + $p->price(),
            0.0
        );
    }
}
```

## 4. Проверка

- [ ] У `Product` есть конструктор.
- [ ] Свойства закрыты.
- [ ] `Cart` принимает только `Product`.
- [ ] Сумма считается через `array_reduce`.
- [ ] Нет вывода внутри классов.

## Частые ошибки

- **Делать свойства `public`.**
- **Печатать внутри класса вместо возврата.**
- **Хранить в корзине просто числа без товара.**
- **Забыть `declare(strict_types=1)`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что должна возвращать `total()`?",
  "options": [
    {
      "text": "Сумму стоимости товаров",
      "correct": true,
      "explanation": "Это результат корзины."
    },
    {
      "text": "HTML-строку",
      "correct": false,
      "explanation": "Класс не должен заниматься выводом."
    },
    {
      "text": "Пароль",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "Класс считает данные, а вывод — отдельно."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что тренирует практика?",
  "options": [
    {
      "text": "Классы и конструкторы",
      "correct": true
    },
    {
      "text": "Инкапсуляцию",
      "correct": true
    },
    {
      "text": "Работу с массивом объектов",
      "correct": true
    },
    {
      "text": "SQL-инъекции",
      "correct": false,
      "explanation": "Это тема безопасности."
    }
  ],
  "explanation": "Практика закрепляет основы ООП."
}
```

## Куда дальше

- [Функции, массивы и ООП](theme.html?path=content/php/funkcii-massivy-oop/funkcii-massivy-oop.md)
- [HTTP, формы и сессии](theme.html?path=content/php/http-formy-sessii/http-zapros-i-otvet.md)
- [Базы данных и PDO](theme.html?path=content/php/bazy-dannyh-i-pdo/pdo-podklyuchenie.md)
