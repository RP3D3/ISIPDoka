---
title: DELETE
keywords: delete sql, удаление строк, where, delete using, returning, каскад, мягкое удаление, vacuum, postgresql, dml, кофейня

---

# DELETE

Как удалить отзывы с низкой оценкой и не стереть всю таблицу?

`DELETE` удаляет строки по условию. Без `WHERE` он удаляет всё. В отличие от `TRUNCATE`, `DELETE` умеет работать с частью строк, возвращать удалённые данные через `RETURNING` и запускать правила внешних ключей.

## Синтаксис

```sql
DELETE FROM таблица
WHERE условие
RETURNING столбцы;
```

## Пример

Удалим отзывы с оценкой ниже трёх:

```sql
DELETE FROM reviews
WHERE rating < 3
RETURNING id, drink_id, rating, comment;
```

| id | drink_id | rating | comment |
| --- | --- | --- | --- |
| 6 | 3 | 2 | Остыл |

Строка удалена, но `RETURNING` показал, что именно исчезло. Это удобно для логов и подтверждения.

## DELETE USING

Если условие зависит от другой таблицы:

```sql
DELETE FROM order_items AS oi
USING orders AS o
WHERE oi.order_id = o.id
  AND o.status = 'cancelled';
```

`USING` — аналог `JOIN` для удаления. Сначала база находит пары, потом удаляет строки из целевой таблицы.

## Грабли

* **`DELETE` без `WHERE`.** Удаляет все строки. Сначала проверь `SELECT`.
* **Каскад.** Если внешний ключ объявлен с `ON DELETE CASCADE`, удаление родителя унесёт дочерние строки.
* **`RESTRICT`.** Если есть ссылки, база не даст удалить родителя. Сначала разберись с зависимостями.
* **Большой `DELETE`.** Миллион строк в одной транзакции создаёт много WAL и блокировок. Удаляй партиями.
* **`DELETE` не освобождает место сразу.** PostgreSQL помечает строки как мёртвые, место возвращает `VACUUM`.
* **Мягкое удаление.** Если данные нужны для истории, лучше добавить `deleted_at`, а не удалять физически.
* **Триггеры.** `DELETE` может запускать триггеры и менять другие таблицы.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем `DELETE` отличается от `TRUNCATE`?",
  "options": [
    { "text": "`DELETE` умеет удалять строки по условию", "correct": true, "explanation": "`TRUNCATE` очищает всю таблицу." },
    { "text": "`DELETE` удаляет структуру таблицы", "correct": false, "explanation": "Структуру удаляет `DROP`." },
    { "text": "`DELETE` не поддерживает `RETURNING`", "correct": false, "explanation": "Поддерживает в PostgreSQL." }
  ],
  "explanation": "`DELETE` — построчное удаление, `TRUNCATE` — очистка всей таблицы."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `DELETE`?",
  "options": [
    { "text": "Без `WHERE` удаляет все строки.", "correct": true, "explanation": "Это опасно, но так работает." },
    { "text": "Может вернуть удалённые строки через `RETURNING`.", "correct": true, "explanation": "Удобно для аудита." },
    { "text": "Может запустить каскадное удаление дочерних строк.", "correct": true, "explanation": "Если внешний ключ объявлен с `CASCADE`." },
    { "text": "Сразу освобождает место на диске.", "correct": false, "explanation": "Место возвращает `VACUUM`." }
  ],
  "explanation": "`DELETE` удаляет строки, но последствия зависят от связей и настроек базы."
}
```