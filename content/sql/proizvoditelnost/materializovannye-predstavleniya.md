---
title: Материализованные представления
keywords: материализованное представление, materialized view, refresh, concurrently, кэш запроса, агрегаты, postgresql, производительность, отчёт

---

# Материализованные представления

Как считать тяжёлый отчёт раз в час, а не при каждом открытии страницы?

Обычное `VIEW` — это сохранённый запрос, который выполняется при каждом обращении. Материализованное представление хранит результат на диске. Чтение становится быстрым, но данные устаревают до `REFRESH`. Это компромисс между скоростью и актуальностью.

## Синтаксис

```sql
CREATE MATERIALIZED VIEW sales_by_day AS
SELECT
    created_at::date AS day,
    SUM(total) AS revenue,
    COUNT(*) AS orders_count
FROM orders
WHERE status IN ('paid', 'done')
GROUP BY created_at::date;

SELECT * FROM sales_by_day ORDER BY day DESC;
```

Обновление:

```sql
REFRESH MATERIALIZED VIEW sales_by_day;
```

Без блокировки чтения:

```sql
REFRESH MATERIALIZED VIEW CONCURRENTLY sales_by_day;
```

Для `CONCURRENTLY` нужен уникальный индекс:

```sql
CREATE UNIQUE INDEX idx_sales_by_day_day ON sales_by_day (day);
```

## Когда использовать

- Тяжёлый `JOIN` и агрегаты, которые считаются долго.
- Данные меняются редко, а читаются часто.
- Дашборды и отчёты, где допустима задержка.
- Предрасчёт витрин для аналитики.

## Когда не использовать

- Нужны актуальные данные в реальном времени.
- Таблица меняется постоянно, а `REFRESH` дорогой.
- Результат маленький и считается быстро.
- Нужна транзакционная согласованность с основной таблицей.

## Пример

```sql
CREATE MATERIALIZED VIEW drink_revenue AS
SELECT
    d.id,
    d.name,
    d.category,
    SUM(oi.quantity * oi.unit_price) AS revenue
FROM order_items AS oi
JOIN drinks AS d ON d.id = oi.drink_id
JOIN orders AS o ON o.id = oi.order_id
WHERE o.status IN ('paid', 'done')
GROUP BY d.id, d.name, d.category;

CREATE UNIQUE INDEX idx_drink_revenue_id ON drink_revenue (id);
```

Дальше отчёт читает готовые суммы:

```sql
SELECT category, SUM(revenue)
FROM drink_revenue
GROUP BY category
ORDER BY SUM(revenue) DESC;
```

## Грабли

* **Данные устаревают.** Без `REFRESH` отчёт показывает прошлое. Нужен график обновления.
* **`REFRESH` блокирует чтение.** Обычный `REFRESH` берёт блокировку; `CONCURRENTLY` мягче, но требует уникальный индекс.
* **`CONCURRENTLY` медленнее.** Он не блокирует чтение, но сам работает дольше.
* **Нельзя обновить через `INSERT`.** Материализованное представление только читается; данные меняются `REFRESH`.
* **Место на диске.** Результат хранится целиком, а не как запрос.
* **Зависимости.** `DROP` базовой таблицы потребует разобраться с представлением.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем материализованное представление отличается от обычного `VIEW`?",
  "options": [
    { "text": "Хранит результат на диске и требует `REFRESH`", "correct": true, "explanation": "Поэтому чтение быстрее, но данные могут устареть." },
    { "text": "Всегда обновляется автоматически", "correct": false, "explanation": "Нужен явный `REFRESH`." },
    { "text": "Не может содержать агрегаты", "correct": false, "explanation": "Как раз для агрегатов его часто и используют." }
  ],
  "explanation": "Материализованное представление — это кэш результата запроса."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `REFRESH MATERIALIZED VIEW`?",
  "options": [
    { "text": "`CONCURRENTLY` не блокирует чтение.", "correct": true, "explanation": "Но требует уникальный индекс." },
    { "text": "Обычный `REFRESH` может блокировать чтение.", "correct": true, "explanation": "Это важно для продакшена." },
    { "text": "`CONCURRENTLY` обычно медленнее обычного.", "correct": true, "explanation": "Плата за отсутствие блокировки." },
    { "text": "`REFRESH` автоматически запускается при изменении таблицы.", "correct": false, "explanation": "Нужен планировщик или триггер." }
  ],
  "explanation": "Обновление материализованного представления — отдельная операция с своими компромиссами."
}
```
