---
title: Функции и процедуры
keywords: create function, create procedure, функции sql, процедуры, language sql, plpgsql, параметры, возврат, postgresql, безопасность

---

# Функции и процедуры

Когда вынести расчёт в функцию базы, а когда оставить его в приложении?

Функция принимает параметры и возвращает значение. Процедура выполняет действия и может управлять транзакцией через `COMMIT` и `ROLLBACK`. Обе живут в базе и вызываются из SQL или приложения. Это удобно для повторяемых расчётов и правил, но требует аккуратности: код в базе сложнее тестировать и версионировать.

## Функция на SQL

```sql
CREATE FUNCTION order_total(p_order_id BIGINT)
RETURNS NUMERIC
LANGUAGE sql
STABLE
AS $$
    SELECT COALESCE(SUM(quantity * unit_price), 0)
    FROM order_items
    WHERE order_id = p_order_id;
$$;
```

Вызов:

```sql
SELECT order_total(129);
```

| Часть | Значение |
| --- | --- |
| `RETURNS NUMERIC` | тип результата |
| `LANGUAGE sql` | простой SQL без процедурных конструкций |
| `STABLE` | не меняет данные, результат стабилен в рамках запроса |
| `$$ ... $$` | тело функции |

## Функция на PL/pgSQL

```sql
CREATE FUNCTION drink_margin(p_drink_id BIGINT)
RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
DECLARE
    v_price NUMERIC;
    v_cost NUMERIC;
BEGIN
    SELECT price INTO v_price FROM drinks WHERE id = p_drink_id;
    SELECT COALESCE(SUM(di.amount * i.cost_per_unit), 0)
    INTO v_cost
    FROM drink_ingredients AS di
    JOIN ingredients AS i ON i.id = di.ingredient_id
    WHERE di.drink_id = p_drink_id;

    RETURN v_price - v_cost;
END;
$$;
```

`PL/pgSQL` нужен, когда есть переменные, условия, циклы или несколько запросов.

## Процедура

```sql
CREATE PROCEDURE close_order(p_order_id BIGINT)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE orders SET status = 'done' WHERE id = p_order_id;
    COMMIT;
END;
$$;

CALL close_order(129);
```

Процедура вызывается через `CALL` и может управлять транзакцией. Функция внутри `SELECT` — нет.

## Когда использовать

- Повторяемый расчёт, который нужен в нескольких запросах.
- Проверка сложного правила, которое нельзя выразить ограничением.
- Триггерная логика.
- Массовая операция, которую удобно вызвать одной командой.

## Грабли

* **Слишком много логики в базе.** Тесты, отладка и деплой сложнее. Держи функции маленькими.
* **`VOLATILE` по умолчанию.** Если функция не меняет данные, укажи `STABLE` или `IMMUTABLE`: это влияет на план.
* **Права.** Функция может выполняться с правами владельца (`SECURITY DEFINER`). Это опасно, если внутри динамический SQL.
* **Поиск функций.** `search_path` влияет на то, какая функция вызовется. Для безопасности указывай схему явно.
* **Версионирование.** Изменение функции — миграция. Не редактируй её на продакшене вручную.
* **Процедуры и транзакции.** `COMMIT` внутри процедуры нельзя вызывать из другой транзакции без понимания последствий.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем процедура отличается от функции?",
  "options": [
    { "text": "Процедура вызывается через `CALL` и может управлять транзакцией", "correct": true, "explanation": "Функция возвращает значение и работает внутри запроса." },
    { "text": "Процедура не может менять данные", "correct": false, "explanation": "Может." },
    { "text": "Функция всегда быстрее процедуры", "correct": false, "explanation": "Скорость зависит от логики." }
  ],
  "explanation": "Ключевое различие — способ вызова и управление транзакцией."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про функции в PostgreSQL?",
  "options": [
    { "text": "`LANGUAGE sql` подходит для простого запроса.", "correct": true, "explanation": "Без процедурных конструкций." },
    { "text": "`STABLE` помогает планировщику.", "correct": true, "explanation": "Функция не меняет данные." },
    { "text": "`SECURITY DEFINER` требует осторожности.", "correct": true, "explanation": "Код выполняется с правами владельца." },
    { "text": "Функцию нельзя вызвать из `SELECT`.", "correct": false, "explanation": "Можно, если она возвращает значение." }
  ],
  "explanation": "Функции удобны, но требуют дисциплины и понимания прав."
}
```
