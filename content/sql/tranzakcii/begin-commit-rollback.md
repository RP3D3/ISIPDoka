---
title: BEGIN, COMMIT, ROLLBACK, SAVEPOINT
keywords: begin sql, commit, rollback, savepoint, rollback to savepoint, транзакции, autocommit, postgresql, кофейня

---

# BEGIN, COMMIT, ROLLBACK, SAVEPOINT

Как оформить заказ так, чтобы сбой на середине не оставил пустой заказ, и как откатить только один шаг, не теряя остальных?

Четыре команды управляют границами транзакции. `BEGIN` открывает её, `COMMIT` фиксирует изменения, `ROLLBACK` отменяет всё, `SAVEPOINT` создаёт точку внутри транзакции, к которой можно вернуться частично.

## Синтаксис

```sql
BEGIN;

-- команды
SAVEPOINT before_items;

-- ещё команды
ROLLBACK TO SAVEPOINT before_items;

COMMIT;
```

| Команда | Что делает |
| --- | --- |
| `BEGIN` | начинает транзакцию |
| `COMMIT` | сохраняет все изменения |
| `ROLLBACK` | отменяет все изменения транзакции |
| `SAVEPOINT имя` | ставит точку внутри транзакции |
| `ROLLBACK TO SAVEPOINT имя` | откатывает до точки, транзакция продолжается |
| `RELEASE SAVEPOINT имя` | удаляет точку |

## Пример

```sql
BEGIN;

INSERT INTO orders (customer_id, status, total)
VALUES (1, 'new', 0)
RETURNING id;

SAVEPOINT after_order;

INSERT INTO order_items (order_id, drink_id, quantity, unit_price)
VALUES (129, 2, 2, 280.00);

-- напиток закончился, отменяем только позицию
ROLLBACK TO SAVEPOINT after_order;

INSERT INTO order_items (order_id, drink_id, quantity, unit_price)
VALUES (129, 6, 1, 260.00);

UPDATE orders SET total = 260.00 WHERE id = 129;

COMMIT;
```

Заказ остался, первая позиция отменена, вторая добавлена. Без `SAVEPOINT` пришлось бы откатывать всю транзакцию и начинать заново.

## Ошибка внутри транзакции

В PostgreSQL ошибка команды переводит транзакцию в состояние `aborted`. Дальше команды не выполняются, пока не сделаешь `ROLLBACK` или `ROLLBACK TO SAVEPOINT`:

```sql
BEGIN;
INSERT INTO drinks (name, price) VALUES ('Тест', -1);  -- ошибка CHECK
SELECT 1;  -- уже не выполнится
ROLLBACK;
```

Если ошибка ожидаема, ставь `SAVEPOINT` до рискованной команды.

## Грабли

* **Забыть `COMMIT`.** Транзакция висит, блокировки держатся, другие ждут. Приложение может закрыть соединение и откатить всё.
* **`COMMIT` после ошибки.** В PostgreSQL это фактически `ROLLBACK`: изменения не сохранятся.
* **`SAVEPOINT` вне транзакции.** В режиме `AUTOCOMMIT` точка не имеет смысла: каждая команда уже отдельная транзакция.
* **Слишком длинная транзакция.** Чем дольше открыта, тем больше блокировок и WAL. Не держи её во время запросов к внешним сервисам.
* **Вложенные `BEGIN`.** PostgreSQL не поддерживает настоящую вложенность; второй `BEGIN` выдаст предупреждение. Для вложенности — `SAVEPOINT`.
* **`ROLLBACK` не отменяет внешние эффекты.** Письмо, отправленное из кода до `COMMIT`, уже не вернуть.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем `ROLLBACK TO SAVEPOINT` отличается от `ROLLBACK`?",
  "options": [
    { "text": "Откатывает только часть транзакции после точки, транзакция продолжается", "correct": true, "explanation": "Это частичный откат." },
    { "text": "Откатывает всю транзакцию и закрывает её", "correct": false, "explanation": "Это обычный `ROLLBACK`." },
    { "text": "Сохраняет изменения до точки", "correct": false, "explanation": "Для фиксации есть `COMMIT`." }
  ],
  "explanation": "`SAVEPOINT` позволяет отменить один шаг, не теряя остальных."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про транзакции в PostgreSQL?",
  "options": [
    { "text": "Ошибка команды переводит транзакцию в состояние `aborted`.", "correct": true, "explanation": "Дальше нужен `ROLLBACK` или откат к `SAVEPOINT`." },
    { "text": "`COMMIT` фиксирует изменения и завершает транзакцию.", "correct": true, "explanation": "После него откат невозможен." },
    { "text": "`SAVEPOINT` работает и без `BEGIN`.", "correct": false, "explanation": "Нужна открытая транзакция." },
    { "text": "Долгая транзакция держит блокировки.", "correct": true, "explanation": "Это мешает другим операциям." }
  ],
  "explanation": "Границы транзакции нужно закрывать явно и не держать их слишком долго."
}
```
