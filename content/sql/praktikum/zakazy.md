---
title: Заказы: корзина и оформление
keywords: корзина sql, оформление заказа, транзакция, order_items, total, returning, postgresql, практикум, кофейня

---

# Заказы: корзина и оформление

Как превратить корзину в заказ одной транзакцией, чтобы сумма и позиции всегда совпадали?

Корзина — это временное состояние. В базе она может быть черновиком заказа со статусом `new` или храниться в приложении. Оформление — момент, когда черновик становится заказом: позиции фиксируются, сумма пересчитывается, статус меняется.

## Черновик заказа

```sql
INSERT INTO orders (customer_id, status, total)
VALUES (1, 'new', 0)
RETURNING id;
```

```text
 id
----
 129
```

## Добавление позиции

```sql
INSERT INTO order_items (order_id, drink_id, quantity, unit_price)
VALUES (129, 2, 2, 280.00)
ON CONFLICT (order_id, drink_id)
DO UPDATE SET quantity = order_items.quantity + EXCLUDED.quantity
RETURNING order_id, drink_id, quantity;
```

Если позиция уже есть, количество увеличивается. `unit_price` берётся из текущего меню в момент добавления.

## Оформление

```sql
BEGIN;

UPDATE orders AS o
SET total = (
    SELECT COALESCE(SUM(quantity * unit_price), 0)
    FROM order_items
    WHERE order_id = o.id
)
WHERE o.id = 129;

UPDATE orders
SET status = 'paid'
WHERE id = 129
  AND total > 0;

COMMIT;
```

Если `total` остался `0`, заказ не перейдёт в `paid`: условие не выполнится.

## Проверка

```sql
SELECT
    o.id,
    o.status,
    o.total,
    SUM(oi.quantity * oi.unit_price) AS items_total
FROM orders AS o
JOIN order_items AS oi ON oi.order_id = o.id
WHERE o.id = 129
GROUP BY o.id, o.status, o.total;
```

`total` и `items_total` должны совпадать.

## Грабли

* **Сумма вручную.** Легко ошибиться; считай по позициям.
* **`unit_price` из текущего меню при оформлении.** Если цена изменилась между корзиной и оплатой, история должна сохранить цену на момент добавления.
* **Нет транзакции.** Заказ может остаться без позиций или с нулевой суммой.
* **Отрицательное количество.** `CHECK (quantity > 0)` обязателен.
* **Пустой заказ.** Проверяй `total > 0` перед оплатой.
* **Гонка.** Два запроса могут одновременно менять корзину; для критичных операций нужна блокировка.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему оформление заказа лучше делать в транзакции?",
  "options": [
    { "text": "Чтобы позиции, сумма и статус изменились вместе или не изменились вовсе", "correct": true, "explanation": "Это атомарность." },
    { "text": "Чтобы запрос выполнялся быстрее", "correct": false, "explanation": "Транзакция не ускоряет сама по себе." },
    { "text": "Чтобы создать индекс", "correct": false, "explanation": "Индекс создаётся отдельно." }
  ],
  "explanation": "Заказ — это единое целое."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про корзину и заказ?",
  "options": [
    { "text": "`ON CONFLICT` может увеличить количество существующей позиции.", "correct": true, "explanation": "Это удобно для корзины." },
    { "text": "Сумму лучше считать по `order_items`.", "correct": true, "explanation": "Так она не разойдётся с позициями." },
    { "text": "`CHECK (quantity > 0)` защищает от отрицательных значений.", "correct": true, "explanation": "Ограничение на уровне базы." },
    { "text": "Пустой заказ можно оплатить.", "correct": false, "explanation": "Обычно это ошибка; проверяй сумму." }
  ],
  "explanation": "Корзина и оформление требуют целостности и проверок."
}
```
