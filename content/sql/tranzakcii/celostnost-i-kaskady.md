---
title: Целостность и каскады
keywords: целостность данных, foreign key, on delete cascade, restrict, set null, транзакции, ограничения, postgresql, кофейня

---

# Целостность и каскады

Что произойдёт с позициями заказа, если удалить заказ, и почему иногда база запрещает удаление клиента?

Целостность — это согласованность связей между таблицами. Внешние ключи не дают ссылаться на несуществующие строки, а правила `ON DELETE` и `ON UPDATE` определяют, что делать с дочерними записями при изменении родителя. Каскады удобны, но требуют понимания: одна команда может затронуть больше данных, чем кажется.

## Правила

| Правило | При удалении родителя |
| --- | --- |
| `NO ACTION` | ошибка, если есть ссылки (по умолчанию) |
| `RESTRICT` | ошибка сразу |
| `CASCADE` | дочерние строки удаляются |
| `SET NULL` | внешний ключ становится `NULL` |
| `SET DEFAULT` | внешний ключ получает значение по умолчанию |

## Пример

```sql
CREATE TABLE orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'new',
    total NUMERIC(10, 2) NOT NULL DEFAULT 0
);

CREATE TABLE order_items (
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
    drink_id BIGINT REFERENCES drinks(id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    PRIMARY KEY (order_id, drink_id)
);
```

- Удалить клиента с заказами нельзя: `RESTRICT` защищает историю.
- Удалить заказ можно: позиции уйдут каскадом.
- Удалить напиток, который заказывали, нельзя: `RESTRICT` защищает продажи.

## Проверка в транзакции

Каскад выполняется в той же транзакции. Если удаление позиций нарушит другое ограничение, откатится вся команда:

```sql
BEGIN;

DELETE FROM orders WHERE id = 129;

-- если что-то пошло не так
ROLLBACK;

COMMIT;
```

## Отложенные ограничения

Иногда нужно временно нарушить ссылку внутри транзакции. Для этого есть `DEFERRABLE`:

```sql
ALTER TABLE order_items
ADD CONSTRAINT order_items_order_fk
FOREIGN KEY (order_id) REFERENCES orders(id)
DEFERRABLE INITIALLY DEFERRED;
```

Проверка произойдёт при `COMMIT`, а не после каждой команды. Это полезно при сложных перестановках данных, но не должно становиться нормой.

## Грабли

* **`CASCADE` удаляет больше, чем ожидаешь.** Одна команда может унести несколько таблиц. Проверяй связи перед удалением.
* **`RESTRICT` блокирует удаление.** Это хорошо для истории, но приложение должно обрабатывать ошибку.
* **`SET NULL` требует nullable-столбца.** Иначе команда упадёт.
* **Каскад не отменяет транзакцию.** Если удаление родителя и детей — одна транзакция, `ROLLBACK` вернёт всё.
* **Отложенные ограничения скрывают ошибки.** `DEFERRABLE` может пропустить временно некорректное состояние до `COMMIT`.
* **Индексы по внешним ключам.** Каскадное удаление и проверки будут медленными без индексов на дочерних столбцах.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что сделает `ON DELETE CASCADE` при удалении заказа?",
  "options": [
    { "text": "Удалит связанные позиции заказа", "correct": true, "explanation": "Дочерние строки уходят вместе с родителем." },
    { "text": "Запретит удаление заказа", "correct": false, "explanation": "Это `RESTRICT`." },
    { "text": "Обнулит `order_id` в позициях", "correct": false, "explanation": "Это `SET NULL`." }
  ],
  "explanation": "`CASCADE` распространяет удаление на дочерние строки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про целостность и каскады?",
  "options": [
    { "text": "`RESTRICT` не даёт удалить родителя со ссылками.", "correct": true, "explanation": "Это защита истории." },
    { "text": "`CASCADE` может затронуть несколько таблиц.", "correct": true, "explanation": "Поэтому требует осторожности." },
    { "text": "`SET NULL` требует, чтобы столбец допускал `NULL`.", "correct": true, "explanation": "Иначе команда упадёт." },
    { "text": "Каскад выполняется вне транзакции и не откатывается.", "correct": false, "explanation": "Он часть той же транзакции." }
  ],
  "explanation": "Каскады — удобный, но мощный инструмент; связи нужно проектировать осознанно."
}
```
