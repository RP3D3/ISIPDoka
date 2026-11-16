---
title: Интерфейсы и трейты
description: Контракты, абстрактные классы и переиспользование поведения в PHP.
keywords: PHP, интерфейсы, трейты, abstract, implements, контракты

---

# Интерфейсы и трейты

Интерфейс задаёт контракт. Трейт даёт готовое поведение для нескольких
классов.

## Интерфейс

```php
<?php

interface Notifier
{
    public function send(string $message): bool;
}

class EmailNotifier implements Notifier
{
    public function send(string $message): bool
    {
        // отправка письма
        return true;
    }
}
```

Класс обязуется реализовать все методы интерфейса.

## Абстрактный класс

```php
<?php

abstract class Report
{
    abstract public function build(): string;

    public function print(): void
    {
        echo $this->build();
    }
}
```

Абстрактный класс может содержать и реализацию, и обязательные методы.

## Трейт

```php
<?php

trait HasTimestamps
{
    public function createdAt(): string
    {
        return date("Y-m-d H:i:s");
    }
}

class Post
{
    use HasTimestamps;
}
```

Трейт — это набор методов, который можно вставить в класс.

## Когда что использовать

- интерфейс — когда нужен контракт;
- абстрактный класс — когда есть общая база;
- трейт — когда нужно переиспользовать поведение без наследования.

## Частые ошибки

- **Пытаться реализовать логику в интерфейсе.** Там только сигнатуры.
- **Использовать трейт как замену наследованию.**
- **Делать слишком много трейтов.** Код становится непредсказуемым.
- **Забыть реализовать метод интерфейса.** PHP выдаст ошибку.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что задаёт интерфейс?",
  "options": [
    {
      "text": "Контракт методов",
      "correct": true,
      "explanation": "Класс обязуется их реализовать."
    },
    {
      "text": "Готовую базу данных",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "HTML-шаблон",
      "correct": false,
      "explanation": "Это не интерфейс."
    }
  ],
  "explanation": "Интерфейс описывает, что класс умеет."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про трейты?",
  "options": [
    {
      "text": "Дают готовые методы",
      "correct": true
    },
    {
      "text": "Подключаются через `use`",
      "correct": true
    },
    {
      "text": "Могут использоваться в разных классах",
      "correct": true
    },
    {
      "text": "Заменяют интерфейсы полностью",
      "correct": false,
      "explanation": "У них разные задачи."
    }
  ],
  "explanation": "Трейты переиспользуют поведение."
}
```

## Куда дальше

- [Namespaces и Composer](theme.html?path=content/php/funkcii-massivy-oop/namespaces-i-composer.md)
- [Функции, массивы и ООП](theme.html?path=content/php/funkcii-massivy-oop/funkcii-massivy-oop.md)
- [Практика: ООП](theme.html?path=content/php/funkcii-massivy-oop/praktika-oop.md)
