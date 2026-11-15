---
title: ROW_NUMBER, RANK, DENSE_RANK
keywords: row_number, rank, dense_rank, оконные функции, нумерация строк, топ-n, ties, postgresql, аналитика, категории

---

# ROW_NUMBER, RANK, DENSE_RANK

Чем `ROW_NUMBER` отличается от `RANK`, и почему при одинаковых значениях они дают разные номера?

Три функции нумеруют строки внутри окна, но по-разному обращаются с одинаковыми значениями. `ROW_NUMBER` всегда выдаёт уникальный номер. `RANK` даёт одинаковый ранг при равенстве и пропускает следующие номера. `DENSE_RANK` тоже даёт одинаковый ранг, но без пропусков.

## Наглядный пример

```sql
WITH scores(name, score) AS (
    VALUES
        ('Аня', 10),
        ('Боря', 10),
        ('Вера', 8)
)
SELECT
    name,
    score,
    ROW_NUMBER() OVER (ORDER BY score DESC) AS rn,
    RANK()       OVER (ORDER BY score DESC) AS rnk,
    DENSE_RANK() OVER (ORDER BY score DESC) AS drnk
FROM scores;
```

| name | score | rn | rnk | drnk |
| --- | --- | --- | --- | --- |
| Аня | 10 | 1 | 1 | 1 |
| Боря | 10 | 2 | 1 | 1 |
| Вера | 8 | 3 | 3 | 2 |

`ROW_NUMBER` всё равно дал 1 и 2. `RANK` поставил двум лидерам 1, а следующей строке — 3. `DENSE_RANK` поставил 1, 1, 2.

## Топ-1 в каждой категории

```sql
WITH ranked AS (
    SELECT
        category,
        name,
        price,
        ROW_NUMBER() OVER (
            PARTITION BY category
            ORDER BY price DESC
        ) AS rn
    FROM drinks
    WHERE is_active
)
SELECT category, name, price
FROM ranked
WHERE rn = 1
ORDER BY category;
```

| category | name | price |
| --- | --- | --- |
| кофе | Латте | 310.00 |
| напиток | Какао | 260.00 |
| чай | Матча-латте | 320.00 |

Оконная функция нумерует строки внутри категории, а внешний `WHERE` оставляет только первые. В одном `WHERE` так нельзя: оконная функция вычисляется позже.

## Когда что выбирать

| Задача | Функция |
| --- | --- |
| Уникальный номер строки | `ROW_NUMBER` |
| Рейтинг с пропусками после ничьей | `RANK` |
| Рейтинг без пропусков | `DENSE_RANK` |
| Топ-N с уникальными строками | `ROW_NUMBER` + `rn <= N` |

## Грабли

* **Ничья без дополнительного ключа.** `ROW_NUMBER` при равных значениях выдаёт номера произвольно. Добавь второй ключ сортировки, например `id`.
* **`RANK` пропускает номера.** После двух первых мест следующее будет третьим. Если нужен «плотный» рейтинг, бери `DENSE_RANK`.
* **Фильтр в том же `SELECT`.** `WHERE rn = 1` не сработает без подзапроса или `CTE`.
* **`ORDER BY` внутри `OVER`.** Без него нумерация бессмысленна: порядок не определён.
* **`PARTITION BY` и глобальный порядок.** Внешний `ORDER BY` не обязан совпадать с порядком внутри окна.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какая функция даст номера 1, 1, 2 при двух равных лидерах?",
  "options": [
    { "text": "`ROW_NUMBER`", "correct": false, "explanation": "Он даст 1, 2, 3." },
    { "text": "`RANK`", "correct": false, "explanation": "Он даст 1, 1, 3." },
    { "text": "`DENSE_RANK`", "correct": true, "explanation": "Он не пропускает номера после ничьей." }
  ],
  "explanation": "`DENSE_RANK` — «плотный» рейтинг без пропусков."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про оконные ранги?",
  "options": [
    { "text": "`ROW_NUMBER` всегда уникален внутри окна.", "correct": true, "explanation": "Даже при равных значениях." },
    { "text": "`RANK` при ничьей даёт одинаковый номер и пропускает следующий.", "correct": true, "explanation": "1, 1, 3." },
    { "text": "`DENSE_RANK` не пропускает номера.", "correct": true, "explanation": "1, 1, 2." },
    { "text": "Оконную функцию можно фильтровать в `WHERE` того же запроса.", "correct": false, "explanation": "Нужен подзапрос или `CTE`." }
  ],
  "explanation": "Выбор функции зависит от того, как обрабатывать ничьи."
}
```