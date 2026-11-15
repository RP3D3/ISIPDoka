---
title: Ошибки и RAISE
keywords: raise sql, exception, ошибки plpgsql, sqlstate, notice, warning, обработка ошибок, postgresql, триггеры

---

# Ошибки и RAISE

Как сообщить приложению понятную ошибку вместо загадочного `ERROR: ...`, и как поймать чужую ошибку внутри функции?

В `PL/pgSQL` можно выбрасывать свои ошибки через `RAISE`, ловить их в `EXCEPTION` и различать по коду `SQLSTATE`. Хорошее сообщение экономит часы отладки: оно говорит, что именно не так и где искать.

## RAISE

```sql
RAISE EXCEPTION 'Цена не может быть отрицательной: %', p_price;
```

```text
ERROR: Цена не может быть отрицательной: -10
```

| Уровень | Когда использовать |
| --- | --- |
| `RAISE NOTICE` | отладочное сообщение |
| `RAISE WARNING` | предупреждение, операция продолжается |
| `RAISE EXCEPTION` | ошибка, транзакция прерывается |

С кодом:

```sql
RAISE EXCEPTION 'Напиток % не найден', p_id
    USING ERRCODE = 'no_data_found';
```

## EXCEPTION

```sql
BEGIN
    INSERT INTO drinks (name, price) VALUES ('Тест', -1);
EXCEPTION
    WHEN check_violation THEN
        RAISE NOTICE 'Нарушено ограничение цены';
END;
```

`EXCEPTION` работает как `SAVEPOINT`: откатывает изменения внутри блока, но не всю транзакцию.

## Свой код и приложение

Приложение может ловить конкретный `SQLSTATE` и показывать своё сообщение. Это надёжнее, чем разбирать текст ошибки:

```sql
RAISE EXCEPTION 'Заказ уже оплачен'
    USING ERRCODE = 'P0001';
```

Не злоупотребляй уникальными кодами: для большинства случаев хватает стандартных (`check_violation`, `unique_violation`, `foreign_key_violation`).

## Пример: проверка остатка

```sql
CREATE FUNCTION reserve_stock(p_id BIGINT, p_qty INT)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    v_stock INT;
BEGIN
    SELECT stock INTO v_stock
    FROM ingredients
    WHERE id = p_id
    FOR UPDATE;

    IF v_stock IS NULL THEN
        RAISE EXCEPTION 'Ингредиент % не найден', p_id;
    END IF;

    IF v_stock < p_qty THEN
        RAISE EXCEPTION 'Недостаточно остатка: есть %, нужно %', v_stock, p_qty;
    END IF;

    UPDATE ingredients SET stock = stock - p_qty WHERE id = p_id;
END;
$$;
```

## Грабли

* **`RAISE EXCEPTION` без текста.** Сообщение должно объяснять причину, а не просто «ошибка».
* **Ловить всё подряд.** `WHEN OTHERS THEN NULL` скрывает баги.
* **Текст вместо кода.** Приложение не должно зависеть от формулировки сообщения.
* **Ошибка внутри транзакции.** После `EXCEPTION` транзакция может быть в состоянии, требующем понимания.
* **Слишком много `NOTICE`.** Логи засоряются; используй по делу.
* **Секреты в сообщениях.** Не выводи пароли, токены и персональные данные.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем `RAISE EXCEPTION` отличается от `RAISE NOTICE`?",
  "options": [
    { "text": "`EXCEPTION` прерывает операцию, `NOTICE` просто сообщает", "correct": true, "explanation": "`NOTICE` не останавливает выполнение." },
    { "text": "`NOTICE` всегда прерывает транзакцию", "correct": false, "explanation": "Это делает `EXCEPTION`." },
    { "text": "`EXCEPTION` работает только в триггерах", "correct": false, "explanation": "В любой функции `PL/pgSQL`." }
  ],
  "explanation": "Уровень `RAISE` определяет серьёзность сообщения."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про ошибки в `PL/pgSQL`?",
  "options": [
    { "text": "`EXCEPTION` может откатить только блок, а не всю транзакцию.", "correct": true, "explanation": "Он работает как `SAVEPOINT`." },
    { "text": "`USING ERRCODE` задаёт код ошибки.", "correct": true, "explanation": "Приложение может ловить его отдельно." },
    { "text": "`WHEN OTHERS THEN NULL` — хорошая практика.", "correct": false, "explanation": "Это скрывает реальные проблемы." },
    { "text": "Сообщение должно объяснять причину ошибки.", "correct": true, "explanation": "Это экономит время отладки." }
  ],
  "explanation": "Ошибки должны быть понятными и различимыми по коду."
}
```
