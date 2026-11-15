---
title: VIEW
keywords: view sql, представление, create view, create or replace view, материализованное представление, active_drinks, postgresql, ddl, упрощение запросов

---

# VIEW

Как сохранить сложный запрос под именем и обращаться к нему как к обычной таблице?

`VIEW` — это сохранённый запрос с именем. Снаружи он выглядит как таблица: можно писать `SELECT ... FROM active_drinks`, но данные не хранятся отдельно. База подставляет определение представления в запрос и выполняет его каждый раз.

## Как это работает

Представь шаблон отчёта. Ты не переписываешь его каждый раз, а открываешь готовую форму и подставляешь параметры. `VIEW` — та же форма: один раз описал «активные напитки», а дальше обращаешься к ним по имени. Если условие изменится, поправишь представление в одном месте.

## Синтаксис

```sql
CREATE VIEW active_drinks AS
SELECT id, name, category, price
FROM drinks
WHERE is_active;
```

Обращение:

```sql
SELECT name, price
FROM active_drinks
ORDER BY price;
```

Обновить определение:

```sql
CREATE OR REPLACE VIEW active_drinks AS
SELECT id, name, category, price
FROM drinks
WHERE is_active = true;
```

`CREATE OR REPLACE` сохраняет права и зависимости, но нельзя менять набор столбцов местами или их типы.

## Пример

Представление с суммой заказа:

```sql
CREATE VIEW order_totals AS
SELECT
    o.id AS order_id,
    c.name AS customer,
    o.status,
    SUM(oi.quantity * oi.unit_price) AS items_total
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
JOIN order_items AS oi ON oi.order_id = o.id
GROUP BY o.id, c.name, o.status;
```

```sql
SELECT *
FROM order_totals
WHERE status = 'paid'
ORDER BY items_total DESC;
```

| order_id | customer | status | items_total |
| --- | --- | --- | --- |
| 122 | Игорь | paid | 760.00 |
| 128 | Анна | paid | 640.00 |
| 124 | Павел | paid | 500.00 |

Сложный `JOIN` спрятан за именем. Приложение не повторяет его в каждом запросе.

## Материализованное представление

Обычное `VIEW` не хранит данные и каждый раз выполняет запрос. Если запрос тяжёлый, а данные меняются редко, используют материализованное представление:

```sql
CREATE MATERIALIZED VIEW sales_by_day AS
SELECT date_trunc('day', created_at)::date AS day, SUM(total) AS revenue
FROM orders
WHERE status IN ('paid', 'done')
GROUP BY day;

REFRESH MATERIALIZED VIEW sales_by_day;
```

Оно хранит результат на диске, но данные устаревают до `REFRESH`.

## Грабли

* **`VIEW` не ускоряет запрос.** Обычное представление — это подстановка SQL, а не кэш. Если внутри тяжёлый `JOIN`, он выполнится при каждом обращении.
* **Не все представления обновляемы.** Простое `VIEW` по одной таблице часто можно `INSERT`/`UPDATE`. Представление с `JOIN`, `GROUP BY` или агрегатами — обычно нет.
* **Права и безопасность.** Представление может скрыть столбцы от пользователя, но не заменяет нормальные права на таблицы. Для защиты используют `security_barrier`.
* **Зависимости.** `DROP TABLE` базовой таблицы не удастся, пока от неё зависит представление, либо потребует `CASCADE`.
* **Материализованное представление устаревает.** Без `REFRESH` в отчёте будут старые данные.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Хранит ли обычное `VIEW` данные на диске?",
  "options": [
    { "text": "Да, как обычная таблица", "correct": false, "explanation": "Данные хранит материализованное представление." },
    { "text": "Нет, оно выполняет сохранённый запрос при обращении", "correct": true, "explanation": "`VIEW` — это именованный запрос." },
    { "text": "Только если в нём есть `JOIN`", "correct": false, "explanation": "Наличие `JOIN` не меняет природу представления." }
  ],
  "explanation": "Обычное `VIEW` — виртуальная таблица, а не копия данных."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про представления?",
  "options": [
    { "text": "`CREATE OR REPLACE VIEW` обновляет определение.", "correct": true, "explanation": "Не удаляя зависимые объекты." },
    { "text": "Представление может скрыть сложный `JOIN` за простым именем.", "correct": true, "explanation": "Это главный плюс для читаемости." },
    { "text": "Материализованное представление хранит результат и требует `REFRESH`.", "correct": true, "explanation": "Данные могут устаревать." },
    { "text": "Любое представление можно свободно обновлять через `UPDATE`.", "correct": false, "explanation": "Представления с агрегатами и `JOIN` обычно не обновляемы." }
  ],
  "explanation": "`VIEW` упрощает доступ, но не заменяет таблицу и не кэширует данные."
}
```