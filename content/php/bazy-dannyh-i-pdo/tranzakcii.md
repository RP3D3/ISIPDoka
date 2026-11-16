---
title: Транзакции
description: Как выполнять несколько операций атомарно и откатывать ошибки.
keywords: PHP, PDO, транзакции, beginTransaction, commit, rollBack

---

# Транзакции

Транзакция объединяет несколько операций в одну. Либо всё выполнено,
либо ничего.

## Пример

```php
<?php

try {
    $pdo->beginTransaction();

    $pdo->prepare("UPDATE accounts SET balance = balance - :sum WHERE id = :id")
        ->execute(["sum" => 100, "id" => 1]);

    $pdo->prepare("UPDATE accounts SET balance = balance + :sum WHERE id = :id")
        ->execute(["sum" => 100, "id" => 2]);

    $pdo->commit();
} catch (Throwable $e) {
    $pdo->rollBack();
    error_log($e->getMessage());
    http_response_code(500);
    echo "Не удалось выполнить перевод";
}
```

## Когда нужны

- перевод денег;
- создание заказа и позиций;
- несколько связанных `INSERT`;
- обновление остатков.

## Правила

- транзакция должна быть короткой;
- не делайте внешних запросов внутри;
- обрабатывайте исключения;
- не показывайте детали ошибки.

## Частые ошибки

- **Забыть `rollBack` при ошибке.**
- **Держать транзакцию открытой долго.**
- **Игнорировать исключения.**
- **Делать вложенные транзакции без поддержки.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `rollBack`?",
  "options": [
    {
      "text": "Отменяет изменения транзакции",
      "correct": true,
      "explanation": "База возвращается к началу."
    },
    {
      "text": "Сохраняет изменения",
      "correct": false,
      "explanation": "Для этого есть commit."
    },
    {
      "text": "Удаляет базу",
      "correct": false,
      "explanation": "Это не так."
    }
  ],
  "explanation": "`rollBack` отменяет транзакцию."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про транзакции?",
  "options": [
    {
      "text": "Нужны для связанных операций",
      "correct": true
    },
    {
      "text": "Должны быть короткими",
      "correct": true
    },
    {
      "text": "Требуют обработки ошибок",
      "correct": true
    },
    {
      "text": "Можно не откатывать при ошибке",
      "correct": false,
      "explanation": "Иначе данные станут несогласованными."
    }
  ],
  "explanation": "Транзакции обеспечивают целостность."
}
```

## Куда дальше

- [Joins и выборки](theme.html?path=content/php/bazy-dannyh-i-pdo/joins-i-vyborki.md)
- [Пагинация и фильтры](theme.html?path=content/php/bazy-dannyh-i-pdo/paginaciya-i-filtry.md)
- [Базы данных и PDO](theme.html?path=content/php/bazy-dannyh-i-pdo/bazy-dannyh-i-pdo.md)
