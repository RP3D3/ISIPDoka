---
title: Практика: заказ атомарно
keywords: практика транзакции, атомарный заказ, begin, commit, rollback, savepoint, for update, остатки, postgresql, кофейня

---

# Практика: заказ атомарно

Как провести заказ от создания до списания остатков так, чтобы при любой ошибке база осталась согласованной?

Ниже — шесть задач на транзакции. Каждая опирается на схему кофейни и предыдущую. Сначала попробуй сам, потом сверься с решением. Все команды — PostgreSQL 16+.

## Задачи

1. Создать заказ и две позиции в одной транзакции.
2. Пересчитать сумму заказа и зафиксировать изменения.
3. Откатить заказ, если напиток закончился.
4. Использовать `SAVEPOINT` для замены позиции.
5. Заблокировать остаток ингредиента перед списанием.
6. Обработать конфликт версии и повторить операцию.

## Решения

### 1. Заказ и позиции

```sql
BEGIN;

INSERT INTO orders (customer_id, status, total)
VALUES (1, 'new', 0)
RETURNING id;

INSERT INTO order_items (order_id, drink_id, quantity, unit_price)
VALUES
    (129, 2, 2, 280.00),
    (129, 6, 1, 260.00);

COMMIT;
```

Если вторая вставка нарушит ограничение, `COMMIT` не выполнится, а транзакция откатится.

### 2. Сумма и фиксация

```sql
BEGIN;

UPDATE orders AS o
SET total = (
    SELECT SUM(quantity * unit_price)
    FROM order_items
    WHERE order_id = o.id
)
WHERE o.id = 129;

COMMIT;
```

Сумма считается по позициям, а не вводится вручную.

### 3. Откат при нехватке

```sql
BEGIN;

SELECT stock
FROM ingredients
WHERE id = 3
FOR UPDATE;

-- предположим, stock = 0
ROLLBACK;
```

Приложение проверяет остаток и отменяет всю транзакцию, если товара нет. Заказ не останется пустым.

### 4. SAVEPOINT для замены позиции

```sql
BEGIN;

INSERT INTO orders (customer_id, status, total)
VALUES (1, 'new', 0)
RETURNING id;

SAVEPOINT before_items;

INSERT INTO order_items (order_id, drink_id, quantity, unit_price)
VALUES (129, 2, 2, 280.00);

ROLLBACK TO SAVEPOINT before_items;

INSERT INTO order_items (order_id, drink_id, quantity, unit_price)
VALUES (129, 6, 1, 260.00);

COMMIT;
```

Заказ остался, неудачная позиция отменена, новая добавлена.

### 5. Блокировка остатка

```sql
BEGIN;

SELECT stock
FROM ingredients
WHERE id = 3
FOR UPDATE;

UPDATE ingredients
SET stock = stock - 2
WHERE id = 3 AND stock >= 2;

COMMIT;
```

`FOR UPDATE` не даёт двум транзакциям одновременно прочитать и списать один и тот же остаток.

### 6. Конфликт версии

```sql
UPDATE ingredients
SET stock = stock - 1,
    version = version + 1
WHERE id = 3
  AND version = 7;
```

Если затронуто `0` строк, данные изменились. Приложение читает строку заново, пересчитывает и повторяет `UPDATE` с новой версией. Ограничь число попыток, например тремя.

## Что заметить

* `BEGIN` и `COMMIT` задают границу смысла: заказ либо есть целиком, либо его нет.
* `ROLLBACK` — штатная реакция на ошибку, а не аварийная.
* `SAVEPOINT` позволяет отменить один шаг, не теряя всю транзакцию.
* `FOR UPDATE` защищает от потерянного обновления, но держит блокировку до `COMMIT`.
* Оптимистичная блокировка требует проверки числа затронутых строк и повтора.
* Транзакция не должна включать долгие внешние вызовы.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему в задаче 5 нужен `FOR UPDATE`?",
  "options": [
    { "text": "Чтобы другая транзакция не прочитала и не списала тот же остаток", "correct": true, "explanation": "Строка блокируется до `COMMIT`." },
    { "text": "Чтобы ускорить `UPDATE`", "correct": false, "explanation": "Блокировка не ускоряет запись." },
    { "text": "Чтобы создать резервную копию строки", "correct": false, "explanation": "Для этого есть другие механизмы." }
  ],
  "explanation": "Блокировка защищает решение, основанное на прочитанном значении."
}
```

```quiz
{
  "type": "match",
  "question": "Соедини команду с её ролью в транзакции.",
  "pairs": [
    { "left": "`BEGIN`", "right": "начать транзакцию" },
    { "left": "`COMMIT`", "right": "зафиксировать изменения" },
    { "left": "`ROLLBACK`", "right": "отменить всё" },
    { "left": "`SAVEPOINT`", "right": "точка частичного отката" }
  ],
  "explanation": "Каждая команда управляет своей частью жизненного цикла транзакции."
}
```
