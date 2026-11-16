---
title: Классы и объекты
description: Свойства, конструкторы, методы, видимость и наследование в PHP.
keywords: PHP, классы, объекты, конструктор, свойства, методы, наследование

---

# Классы и объекты

Класс описывает данные и поведение. Объект — конкретный экземпляр класса.

## Класс

```php
<?php

declare(strict_types=1);

class User
{
    public function __construct(
        private string $name,
        private int $age,
    ) {
    }

    public function greet(): string
    {
        return "Привет, " . $this->name;
    }
}

$user = new User("Аня", 20);
echo $user->greet();
```

## Видимость

- `public` — доступно всем;
- `protected` — классу и наследникам;
- `private` — только внутри класса.

По умолчанию лучше `private`, а наружу отдавать методы.

## Наследование

```php
<?php

class Admin extends User
{
    public function ban(User $user): void
    {
        // логика
    }
}
```

Наследование используйте, когда есть отношение «является».

## Статические методы

```php
<?php

class Math
{
    public static function sum(int $a, int $b): int
    {
        return $a + $b;
    }
}

echo Math::sum(2, 3);
```

## Частые ошибки

- **Делать все свойства `public`.** Это ломает инкапсуляцию.
- **Забывать конструктор.** Объект может остаться без данных.
- **Использовать статику для изменяемого состояния.**
- **Наследовать ради повторного использования.** Иногда лучше композиция.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое объект?",
  "options": [
    {
      "text": "Экземпляр класса",
      "correct": true,
      "explanation": "Класс — описание, объект — конкретная сущность."
    },
    {
      "text": "Файл с кодом",
      "correct": false,
      "explanation": "Это не объект."
    },
    {
      "text": "Таблица в базе",
      "correct": false,
      "explanation": "Это другое."
    }
  ],
  "explanation": "Объект создаётся по классу."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про классы PHP?",
  "options": [
    {
      "text": "Есть конструктор",
      "correct": true
    },
    {
      "text": "Есть видимость свойств",
      "correct": true
    },
    {
      "text": "Можно наследовать",
      "correct": true
    },
    {
      "text": "Все свойства обязаны быть public",
      "correct": false,
      "explanation": "Это плохая практика."
    }
  ],
  "explanation": "Классы помогают структурировать код."
}
```

## Куда дальше

- [Интерфейсы и трейты](theme.html?path=content/php/funkcii-massivy-oop/interfeysy-i-treyty.md)
- [Namespaces и Composer](theme.html?path=content/php/funkcii-massivy-oop/namespaces-i-composer.md)
- [Функции, массивы и ООП](theme.html?path=content/php/funkcii-massivy-oop/funkcii-massivy-oop.md)
