---
title: UNION, INTERSECT, EXCEPT
keywords: union sql, union all, intersect, except, minus, объединение запросов, разница, пересечение, postgresql, аналитика

---

# UNION, INTERSECT, EXCEPT

Как собрать клиентов из двух таблиц, убрать дубли и найти тех, кто есть в одном списке, но нет в другом?

`UNION`, `INTERSECT` и `EXCEPT` объединяют результаты двух запросов по вертикали. В отличие от `JOIN`, который добавляет столбцы, они добавляют строки. Это удобно, когда данные лежат в разных таблицах или когда нужно сравнить два набора.

## Синтаксис

```sql
SELECT ... FROM таблица_1
UNION
SELECT ... FROM таблица_2;
```

Правила:

- Количество и типы столбцов должны совпадать.
- Имена берутся из первого запроса.
- `ORDER BY` пишется один раз в конце.
- `UNION` убирает дубли, `UNION ALL` оставляет всё.

## Пример: UNION

Клиенты, которые либо заказывали, либо оставляли отзыв:

```sql
SELECT customer_id FROM orders
UNION
SELECT customer_id FROM reviews;
```

`UNION` убирает дубли: если клиент есть в обеих таблицах, он появится один раз. `UNION ALL` вернёт его дважды и работает быстрее, потому что не тратит время на сравнение.

## Пример: INTERSECT

Клиенты, которые и заказывали, и оставляли отзыв:

```sql
SELECT customer_id FROM orders
INTERSECT
SELECT customer_id FROM reviews;
```

`INTERSECT` тоже убирает дубли. Он полезен для проверки «пересечения аудиторий».

## Пример: EXCEPT

Клиенты, которые заказывали, но не оставляли отзыв:

```sql
SELECT customer_id FROM orders
EXCEPT
SELECT customer_id FROM reviews;
```

`EXCEPT` возвращает строки из первого набора, которых нет во втором. В Oracle эта команда называется `MINUS`, в MySQL её нет до 8.0.31.

## Приоритет и порядок

`INTERSECT` имеет более высокий приоритет, чем `UNION` и `EXCEPT`. Лучше использовать скобки, чтобы не зависеть от тонкостей:

```sql
(SELECT ... UNION SELECT ...)
EXCEPT
SELECT ...;
```

`ORDER BY` относится ко всему результату:

```sql
SELECT name, price FROM drinks WHERE category = 'кофе'
UNION
SELECT name, price FROM drinks WHERE category = 'чай'
ORDER BY price DESC;
```

## Грабли

* **Разное число столбцов.** `each UNION query must have the same number of columns`.
* **Разные типы.** База попробует привести их, но может ошибиться или потерять точность.
* **`UNION` вместо `UNION ALL`.** Удаление дублей стоит дорого. Если дубли не важны, бери `ALL`.
* **`UNION` и `NULL`.** Два `NULL` считаются одинаковыми для удаления дублей, хотя `NULL = NULL` даёт `unknown`.
* **`ORDER BY` внутри части.** Он не разрешён внутри каждого запроса без скобок.
* **`EXCEPT` не симметричен.** `A EXCEPT B` и `B EXCEPT A` — разные результаты.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем `UNION` отличается от `UNION ALL`?",
  "options": [
    { "text": "`UNION` убирает дубли, `UNION ALL` оставляет их", "correct": true, "explanation": "`ALL` быстрее, потому что не сравнивает строки." },
    { "text": "`UNION ALL` работает только с числами", "correct": false, "explanation": "Работает с любыми совместимыми типами." },
    { "text": "`UNION` объединяет столбцы, а `ALL` — строки", "correct": false, "explanation": "Оба объединяют строки." }
  ],
  "explanation": "`ALL` сохраняет все строки, включая дубли."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про объединение запросов?",
  "options": [
    { "text": "`INTERSECT` возвращает только общие строки.", "correct": true, "explanation": "Это пересечение." },
    { "text": "`EXCEPT` возвращает строки первого набора, которых нет во втором.", "correct": true, "explanation": "Это разница." },
    { "text": "Количество и типы столбцов должны совпадать.", "correct": true, "explanation": "Иначе база не сможет объединить результат." },
    { "text": "`ORDER BY` нужно писать в каждом запросе.", "correct": false, "explanation": "Он пишется один раз в конце." }
  ],
  "explanation": "Операции над множествами требуют совместимой структуры результата."
}
```
