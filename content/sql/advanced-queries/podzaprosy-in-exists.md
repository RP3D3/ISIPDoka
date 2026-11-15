---
title: Подзапросы: IN, EXISTS, скалярные
keywords: подзапросы sql, in, not in, exists, not exists, скалярный подзапрос, коррелированный подзапрос, null, postgresql, аналитика

---

# Подзапросы: IN, EXISTS, скалярные

Как найти клиентов с оплаченными заказами или напитки дороже среднего, не делая два отдельных запроса?

Подзапрос — это `SELECT` внутри другого запроса. Он может возвращать список значений для `IN`, проверять существование строк для `EXISTS` или одно значение для сравнения. Подзапрос выполняется в контексте внешнего запроса и позволяет строить условия, которые нельзя выразить одним `WHERE`.

## Три роли подзапроса

| Роль | Пример | Что возвращает |
| --- | --- | --- |
| список для `IN` | `WHERE id IN (SELECT ...)` | набор значений |
| проверка `EXISTS` | `WHERE EXISTS (SELECT 1 ...)` | истину или ложь |
| скалярный | `WHERE price > (SELECT AVG(...))` | одно значение |

## Пример: IN

Клиенты, у которых есть оплаченный заказ:

```sql
SELECT name
FROM customers
WHERE id IN (
    SELECT customer_id
    FROM orders
    WHERE status = 'paid'
);
```

| name |
| --- |
| Анна |
| Игорь |
| Павел |

## Пример: EXISTS

То же самое через `EXISTS`:

```sql
SELECT c.name
FROM customers AS c
WHERE EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.id
      AND o.status = 'paid'
);
```

`EXISTS` не важно, что именно возвращает подзапрос: `SELECT 1` — привычка, а не требование. База проверяет, есть ли хотя бы одна строка.

## Пример: скалярный подзапрос

Напитки дороже средней цены активных напитков:

```sql
SELECT name, price
FROM drinks
WHERE price > (
    SELECT AVG(price)
    FROM drinks
    WHERE is_active
)
ORDER BY price;
```

| name | price |
| --- | --- |
| Капучино | 280.00 |
| Латте | 310.00 |
| Матча-латте | 320.00 |

Средняя цена — 260.00, поэтому в результат попали только напитки дороже неё.

## NOT IN и NULL

`NOT IN` опасен, если подзапрос возвращает `NULL`:

```sql
SELECT name
FROM customers
WHERE id NOT IN (SELECT customer_id FROM orders);
```

Если хотя бы один `customer_id` пустой, результат будет пустым: сравнение с `NULL` даёт `unknown`, и условие не проходит. Надёжнее `NOT EXISTS`:

```sql
SELECT c.name
FROM customers AS c
WHERE NOT EXISTS (
    SELECT 1 FROM orders AS o WHERE o.customer_id = c.id
);
```

## Грабли

* **Скалярный подзапрос вернул больше одной строки.** Ошибка `more than one row returned`. Для списка используй `IN`, для проверки — `EXISTS`.
* **`NOT IN` и `NULL`.** Может не вернуть ничего. `NOT EXISTS` безопаснее.
* **Коррелированный подзапрос на каждой строке.** Может быть медленным без индекса по внешнему ключу.
* **`IN` с большим списком.** Тысячи значений хуже соединения или `EXISTS`.
* **Подзапрос в `SELECT` возвращает много строк.** Для каждой строки нужен ровно один результат.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему `NOT IN (SELECT customer_id FROM orders)` может вернуть пустой результат?",
  "options": [
    { "text": "Потому что `NOT IN` не работает с числами", "correct": false, "explanation": "Работает, проблема в `NULL`." },
    { "text": "Потому что в подзапросе есть `NULL`, и сравнение даёт `unknown`", "correct": true, "explanation": "`NOT IN` с `NULL` не пропускает строки." },
    { "text": "Потому что таблица `orders` пустая", "correct": false, "explanation": "Даже с данными `NULL` ломает логику." }
  ],
  "explanation": "Для отрицания существования используй `NOT EXISTS`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про подзапросы?",
  "options": [
    { "text": "`IN` сравнивает значение со списком из подзапроса.", "correct": true, "explanation": "Это типичное применение." },
    { "text": "`EXISTS` проверяет, есть ли хотя бы одна строка.", "correct": true, "explanation": "Содержимое `SELECT` не важно." },
    { "text": "Скалярный подзапрос должен вернуть одно значение.", "correct": true, "explanation": "Иначе сравнение неоднозначно." },
    { "text": "`NOT IN` безопасен при любых данных.", "correct": false, "explanation": "`NULL` в подзапросе ломает результат." }
  ],
  "explanation": "Выбор между `IN`, `EXISTS` и скалярным подзапросом зависит от формы результата."
}
```