---
title: Рамки окна и скользящие итоги
keywords: рамки окна sql, rows between, range between, unbounded preceding, current row, накопительный итог, скользящее среднее, оконные функции, postgresql, аналитика

---

# Рамки окна и скользящие итоги

Почему `SUM(total) OVER (ORDER BY day)` даёт накопительную сумму, а без `ORDER BY` — общую, и как посчитать среднее за последние три дня?

Рамка окна — это граница строк, которые видит оконная функция. По умолчанию `ORDER BY` внутри `OVER` делает рамку «от начала до текущей строки», поэтому `SUM` превращается в накопительный итог. Если рамку задать явно через `ROWS BETWEEN`, можно считать скользящие средние, суммы за период и сравнения с соседями.

## Как это работает

Представь ленту чеков за день. «Сумма с начала дня до этого чека» — накопительный итог. «Сумма за последние три чека» — скользящее окно. Одна и та же функция `SUM`, но разные рамки дают разные ответы.

## Синтаксис

```sql
функция(...) OVER (
    PARTITION BY ...
    ORDER BY ...
    ROWS BETWEEN граница_начала AND граница_конца
)
```

| Граница | Значение |
| --- | --- |
| `UNBOUNDED PRECEDING` | от первой строки окна |
| `n PRECEDING` | на `n` строк назад |
| `CURRENT ROW` | текущая строка |
| `n FOLLOWING` | на `n` строк вперёд |
| `UNBOUNDED FOLLOWING` | до последней строки окна |

`ROWS` считает физические строки. `RANGE` считает по значениям `ORDER BY` и полезен для дат и чисел с пропусками.

## Пример: накопительная выручка

```sql
WITH daily AS (
    SELECT created_at::date AS day, SUM(total) AS revenue
    FROM orders
    WHERE status IN ('paid', 'done')
    GROUP BY created_at::date
)
SELECT
    day,
    revenue,
    SUM(revenue) OVER (
        ORDER BY day
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM daily
ORDER BY day;
```

| day | revenue | running_total |
| --- | --- | --- |
| 2026-05-10 | 260.00 | 260.00 |
| 2026-05-11 | 760.00 | 1020.00 |
| 2026-05-12 | 690.00 | 1710.00 |
| 2026-05-13 | 410.00 | 2120.00 |
| 2026-05-14 | 920.00 | 3040.00 |

Та же запись короче: `SUM(revenue) OVER (ORDER BY day)`. Явная рамка полезна, когда нужно подчеркнуть смысл или изменить границу.

## Пример: скользящее среднее за три дня

```sql
WITH daily AS (
    SELECT created_at::date AS day, SUM(total) AS revenue
    FROM orders
    WHERE status IN ('paid', 'done')
    GROUP BY created_at::date
)
SELECT
    day,
    revenue,
    ROUND(
        AVG(revenue) OVER (
            ORDER BY day
            ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        ),
        2
    ) AS avg_3_days
FROM daily
ORDER BY day;
```

| day | revenue | avg_3_days |
| --- | --- | --- |
| 2026-05-10 | 260.00 | 260.00 |
| 2026-05-11 | 760.00 | 510.00 |
| 2026-05-12 | 690.00 | 570.00 |
| 2026-05-13 | 410.00 | 620.00 |
| 2026-05-14 | 920.00 | 673.33 |

На первых строках окно короче трёх дней: база берёт столько, сколько есть.

## Сумма по всей группе

Если убрать `ORDER BY` из `OVER`, рамка станет всей партицией:

```sql
SUM(revenue) OVER () AS total_revenue,
SUM(revenue) OVER (PARTITION BY EXTRACT(month FROM day)) AS month_revenue
```

Так получают долю строки в общей сумме:

```sql
ROUND(100.0 * revenue / SUM(revenue) OVER (), 1) AS share_pct
```

## ROWS и RANGE

```sql
-- три физические строки
ROWS BETWEEN 2 PRECEDING AND CURRENT ROW

-- все строки за последние два дня по значению даты
RANGE BETWEEN INTERVAL '2 days' PRECEDING AND CURRENT ROW
```

`ROWS` не знает про пропуски в датах. Если одного дня нет, «две предыдущие строки» — это не «два предыдущих дня». Для календарных окон используй `RANGE` или сначала построй полный календарь.

## Грабли

* **`ORDER BY` без рамки.** По умолчанию рамка — `RANGE UNBOUNDED PRECEDING AND CURRENT ROW`, то есть накопительный итог, а не сумма по всей группе. Это частое удивление.
* **`ROWS` вместо `RANGE` на датах.** Пропуски в календаре ломают смысл «за последние N дней».
* **Рамка без `ORDER BY`.** `ROWS BETWEEN ...` без сортировки бессмысленна: порядок строк не определён.
* **`n PRECEDING` больше окна.** База не ошибётся, просто возьмёт доступные строки.
* **Несколько окон в одном запросе.** Каждое `OVER` со своей рамкой считается отдельно; на больших данных это дорого.
* **Фильтр по оконному значению.** `WHERE running_total > 1000` не сработает в том же `SELECT`; нужен подзапрос или `CTE`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что даст `SUM(revenue) OVER (ORDER BY day)` без явной рамки?",
  "options": [
    { "text": "Накопительную сумму от первой строки до текущей", "correct": true, "explanation": "Это рамка по умолчанию при `ORDER BY`." },
    { "text": "Общую сумму по всей таблице в каждой строке", "correct": false, "explanation": "Так будет без `ORDER BY`." },
    { "text": "Сумму только текущей строки", "correct": false, "explanation": "Для этого нужна рамка `CURRENT ROW`." }
  ],
  "explanation": "`ORDER BY` в окне включает накопительный режим по умолчанию."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про рамки окна?",
  "options": [
    { "text": "`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` — окно из трёх строк.", "correct": true, "explanation": "Две предыдущие плюс текущая." },
    { "text": "Без `ORDER BY` сумма по окну считается по всей партиции.", "correct": true, "explanation": "Порядок не задан, рамка — вся группа." },
    { "text": "`RANGE` учитывает значения, а `ROWS` — физические строки.", "correct": true, "explanation": "Поэтому на датах с пропусками они дают разное." },
    { "text": "`n PRECEDING` при нехватке строк вызывает ошибку.", "correct": false, "explanation": "База берёт столько строк, сколько есть." }
  ],
  "explanation": "Рамка определяет, какие строки видит оконная функция."
}
```
