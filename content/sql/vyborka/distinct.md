---
title: DISTINCT
keywords: distinct sql, уникальные значения, distinct on, group by, дубли, выборка категорий, postgresql, устранение повторов, пагинация

---

# DISTINCT

Как узнать, какие категории напитков вообще есть в меню, не считая каждую строку вручную?

`DISTINCT` убирает повторяющиеся строки из результата. Чаще всего его используют, чтобы получить список уникальных значений: категории, города, статусы. Но у него есть важная особенность: он смотрит на **всю строку целиком**, а не на один столбец.

## Как это работает

Представь, что ты выписываешь категории напитков на доску. Встретил «кофе» — записал. Встретил ещё раз — не записываешь, он уже есть. `DISTINCT` делает то же самое: оставляет по одному экземпляру каждой уникальной комбинации выбранных столбцов.

## Синтаксис

```sql
SELECT DISTINCT столбец1, столбец2
FROM таблица;
```

Если выбрать два столбца, уникальными считаются пары значений, а не каждый столбец по отдельности.

В PostgreSQL есть расширение `DISTINCT ON` — одна строка на группу:

```sql
SELECT DISTINCT ON (категория) категория, name, price
FROM drinks
ORDER BY категория, price DESC;
```

`DISTINCT ON` требует, чтобы `ORDER BY` начинался с тех же столбцов, что и `ON`. Тогда база берёт первую строку каждой группы в этом порядке.

## Пример

Уникальные категории:

```sql
SELECT DISTINCT category
FROM drinks
ORDER BY category;
```

| category |
| --- |
| кофе |
| напиток |
| чай |

Самый дорогой активный напиток в каждой категории:

```sql
SELECT DISTINCT ON (category) category, name, price
FROM drinks
WHERE is_active
ORDER BY category, price DESC;
```

| category | name | price |
| --- | --- | --- |
| напиток | Какао | 260.00 |
| кофе | Латте | 310.00 |
| чай | Матча-латте | 320.00 |

## DISTINCT или GROUP BY

Для простого списка уникальных значений `DISTINCT` короче. Если нужны агрегаты — `COUNT`, `SUM`, `AVG` — используй `GROUP BY`:

```sql
SELECT category, COUNT(*) AS drinks_count
FROM drinks
GROUP BY category;
```

`SELECT DISTINCT category, COUNT(*)` без `GROUP BY` — ошибка: `COUNT(*)` схлопнет все строки в одну, и `DISTINCT` ничего не сделает.

## Грабли

* **`DISTINCT` действует на всю строку.** `SELECT DISTINCT category, name` вернёт почти все строки, потому что названия разные. Для уникальных категорий выбирай только `category`.
* **`DISTINCT` маскирует проблему JOIN.** Если после соединения появились дубли, `DISTINCT` их скроет, но причина останется: скорее всего, неверное условие соединения.
* **`DISTINCT` стоит денег.** База сортирует или хеширует результат. На больших таблицах это заметно.
* **`DISTINCT ON` — только PostgreSQL.** В MySQL и SQL Server аналог собирают через `ROW_NUMBER()` или `GROUP BY`.
* **Порядок с `DISTINCT ON` не косметика.** Если `ORDER BY` не начинается с столбцов `ON`, запрос просто не выполнится.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Сколько строк вернёт `SELECT DISTINCT category, name FROM drinks`, если в таблице восемь напитков с уникальными названиями?",
  "options": [
    { "text": "Три — по числу категорий", "correct": false, "explanation": "`DISTINCT` смотрит на всю пару `category, name`, а не только на категорию." },
    { "text": "Восемь — почти все пары уникальны", "correct": true, "explanation": "Названия разные, поэтому уникальных пар столько же, сколько строк." },
    { "text": "Одну", "correct": false, "explanation": "`DISTINCT` не сворачивает всё в одну строку." }
  ],
  "explanation": "Чтобы получить три категории, выбирай только `category`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `DISTINCT`?",
  "options": [
    { "text": "`SELECT DISTINCT category FROM drinks` вернёт список категорий без повторов.", "correct": true, "explanation": "Это типичное применение." },
    { "text": "`DISTINCT` по двум столбцам сравнивает пары значений.", "correct": true, "explanation": "Уникальность считается по всей выбранной строке." },
    { "text": "`DISTINCT` заменяет `GROUP BY` при подсчёте `COUNT(*)`.", "correct": false, "explanation": "Для агрегатов нужен `GROUP BY`." },
    { "text": "`DISTINCT ON` в PostgreSQL требует согласованного `ORDER BY`.", "correct": true, "explanation": "`ORDER BY` должен начинаться с столбцов из `ON`." }
  ],
  "explanation": "`DISTINCT` убирает повторы строк, но не считает агрегаты и не лечит ошибки JOIN."
}
```
