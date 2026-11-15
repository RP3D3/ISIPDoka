---
title: Практика: заказы с составом
keywords: практика join, заказы с составом, inner join, left join, many to many, self join, cross join, себестоимость, postgresql, кофейня

---

# Практика: заказы с составом

Как собрать заказ вместе с клиентом, напитками, рецептом и себестоимостью, не потеряв строки и не удвоив суммы?

Ниже — восемь задач на все типы соединений. Сначала попробуй сам, потом сверься с решением. Главный вопрос каждой задачи: «Что означает одна строка результата?» Если ответ меняется после `JOIN`, проверь агрегаты.

## Задачи

1. Показать состав заказа 128: напиток, количество, цену и сумму позиции.
2. Выручка и количество чашек по напиткам за оплаченные и завершённые заказы.
3. Проверить, что сумма позиций заказа 128 совпадает с `orders.total`.
4. Показать всех клиентов и число их заказов, включая клиентов без заказов.
5. Найти напитки, которые ни разу не заказывали.
6. Показать рецепт и себестоимость латте.
7. Найти пары активных напитков одной категории, где один дороже другого.
8. Посчитать все комбинации клиентов и категорий напитков.

## Решения

### 1. Состав заказа 128

```sql
SELECT
    o.id AS order_id,
    d.name AS drink,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price AS line_total
FROM orders AS o
JOIN order_items AS oi ON oi.order_id = o.id
JOIN drinks AS d ON d.id = oi.drink_id
WHERE o.id = 128
ORDER BY d.name;
```

| order_id | drink | quantity | unit_price | line_total |
| --- | --- | --- | --- | --- |
| 128 | Какао | 1 | 260.00 | 260.00 |
| 128 | Чай с бергамотом | 2 | 190.00 | 380.00 |

Сумма позиций — 640.00, как и `orders.total`.

### 2. Выручка и чашки по напиткам

```sql
SELECT
    d.name,
    d.category,
    SUM(oi.quantity) AS cups,
    SUM(oi.quantity * oi.unit_price) AS revenue
FROM order_items AS oi
JOIN drinks AS d ON d.id = oi.drink_id
JOIN orders AS o ON o.id = oi.order_id
WHERE o.status IN ('paid', 'done')
GROUP BY d.name, d.category
ORDER BY revenue DESC;
```

| name | category | cups | revenue |
| --- | --- | --- | --- |
| Чай с бергамотом | чай | 5 | 950.00 |
| Американо | кофе | 3 | 660.00 |
| Какао | напиток | 2 | 520.00 |
| Матча-латте | чай | 1 | 320.00 |
| Латте | кофе | 1 | 310.00 |
| Капучино | кофе | 1 | 280.00 |

### 3. Сверка суммы заказа

```sql
SELECT
    o.id,
    o.total,
    SUM(oi.quantity * oi.unit_price) AS items_total
FROM orders AS o
JOIN order_items AS oi ON oi.order_id = o.id
WHERE o.id = 128
GROUP BY o.id, o.total;
```

| id | total | items_total |
| --- | --- | --- |
| 128 | 640.00 | 640.00 |

Если числа разойдутся, значит, `total` устарел или позиции изменились без пересчёта.

### 4. Все клиенты и число заказов

```sql
SELECT
    c.name,
    COUNT(o.id) AS orders_count
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
GROUP BY c.name
ORDER BY orders_count DESC, c.name;
```

| name | orders_count |
| --- | --- |
| Анна | 3 |
| Игорь | 2 |
| Мария | 2 |
| Ольга | 1 |
| Павел | 1 |

Сейчас заказы есть у всех, но `LEFT JOIN` сохранит клиента, даже если заказов не будет. `COUNT(o.id)` тогда вернёт `0`, а `COUNT(*)` — `1`.

### 5. Напитки без заказов

```sql
SELECT d.name
FROM drinks AS d
LEFT JOIN order_items AS oi ON oi.drink_id = d.id
WHERE oi.order_id IS NULL;
```

| name |
| --- |
| Эспрессо |

Эспрессо снят с продажи и ни разу не заказывался. Условие `IS NULL` ищет именно отсутствие пары.

### 6. Рецепт и себестоимость латте

```sql
SELECT
    i.name AS ingredient,
    di.amount,
    i.unit,
    i.cost_per_unit,
    ROUND(di.amount * i.cost_per_unit, 2) AS line_cost
FROM drinks AS d
JOIN drink_ingredients AS di ON di.drink_id = d.id
JOIN ingredients AS i ON i.id = di.ingredient_id
WHERE d.name = 'Латте'
ORDER BY i.name;
```

| ingredient | amount | unit | cost_per_unit | line_cost |
| --- | --- | --- | --- | --- |
| Кофе (зерно) | 18.00 | г | 1.20 | 21.60 |
| Молоко | 250.00 | мл | 0.08 | 20.00 |

Себестоимость латте — 41.60. Чтобы получить её одним числом, оберни сумму в `SUM`.

### 7. Пары напитков одной категории

```sql
SELECT
    a.category,
    a.name AS cheaper,
    b.name AS pricier,
    b.price - a.price AS diff
FROM drinks AS a
JOIN drinks AS b
  ON a.category = b.category
 AND a.price < b.price
WHERE a.is_active AND b.is_active
ORDER BY a.category, diff;
```

| category | cheaper | pricier | diff |
| --- | --- | --- | --- |
| кофе | Капучино | Латте | 30.00 |
| кофе | Американо | Капучино | 60.00 |
| кофе | Американо | Латте | 90.00 |
| напиток | Лимонад | Какао | 20.00 |
| чай | Чай с бергамотом | Матча-латте | 130.00 |

### 8. Комбинации клиентов и категорий

```sql
SELECT COUNT(*) AS combinations
FROM customers
CROSS JOIN (SELECT DISTINCT category FROM drinks) AS c;
```

| combinations |
| --- |
| 15 |

Пять клиентов умножить на три категории — пятнадцать пар. `CROSS JOIN` здесь намеренный: нужны все сочетания.

## Что заметить

* `INNER JOIN` оставляет только найденные пары, `LEFT JOIN` — все строки левой таблицы.
* Суммировать левую таблицу после соединения с позициями опасно: получится fan-out.
* Для «многие ко многим» нужны три таблицы и два соединения.
* `SELF JOIN` требует псевдонимов и условия, которое не соединяет строку с собой.
* `CROSS JOIN` полезен, но его размер — произведение строк.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему в задаче 4 используют `COUNT(o.id)`, а не `COUNT(*)`?",
  "options": [
    { "text": "Потому что `COUNT(*)` медленнее", "correct": false, "explanation": "Разница в смысле, а не только в скорости." },
    { "text": "Потому что `COUNT(*)` посчитает клиента без заказов как `1`", "correct": true, "explanation": "Строка с `NULL` всё равно существует." },
    { "text": "Потому что `COUNT(o.id)` считает уникальных клиентов", "correct": false, "explanation": "Для уникальных есть `COUNT(DISTINCT ...)`." }
  ],
  "explanation": "Для подсчёта найденных пар считай столбец правой таблицы."
}
```

```quiz
{
  "type": "match",
  "question": "Соедини задачу с типом соединения.",
  "pairs": [
    { "left": "только заказы с клиентами", "right": "`INNER JOIN`" },
    { "left": "все клиенты, даже без заказов", "right": "`LEFT JOIN`" },
    { "left": "все комбинации клиентов и категорий", "right": "`CROSS JOIN`" },
    { "left": "пары напитков одной категории", "right": "`SELF JOIN`" }
  ],
  "explanation": "Тип соединения выбирается по тому, какие строки нужно сохранить."
}
```