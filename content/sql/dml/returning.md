---
title: RETURNING
keywords: returning sql, insert returning, update returning, delete returning, postgresql, dml, получить id, приложение, экономия запросов

---

# RETURNING

Как получить `id` только что вставленной строки, не делая второй запрос?

`RETURNING` — это расширение PostgreSQL, которое возвращает изменённые строки прямо из `INSERT`, `UPDATE` или `DELETE`. Приложению не нужно отдельно запрашивать «а какой id получился?» или «что именно удалилось?». Одна команда — один ответ.

## Как это работает

Представь, что кассир выдаёт чек и сразу показывает его тебе. `INSERT` без `RETURNING` — это «чек пробит, номер где-то в базе, иди ищи». С `RETURNING` база сразу отдаёт вставленную строку: номер, имя, время создания.

## Синтаксис

```sql
INSERT INTO таблица (столбцы)
VALUES (значения)
RETURNING столбцы;

UPDATE таблица
SET столбец = значение
WHERE условие
RETURNING столбцы;

DELETE FROM таблица
WHERE условие
RETURNING столбцы;
```

Можно вернуть `*`, конкретные столбцы или выражения:

```sql
RETURNING id, name, price * 1.2 AS price_with_vat;
```

## Пример

Вставка клиента:

```sql
INSERT INTO customers (name, email)
VALUES ('Дмитрий', 'dmitry@zerno.ru')
RETURNING id, name, created_at;
```

| id | name | created_at |
| --- | --- | --- |
| 6 | Дмитрий | 2026-05-15 12:00+03 |

Обновление цены:

```sql
UPDATE drinks
SET price = ROUND(price * 1.1, 2)
WHERE category = 'кофе'
RETURNING name, price;
```

| name | price |
| --- | --- |
| Американо | 242.00 |
| Капучино | 308.00 |
| Латте | 341.00 |

Удаление отзыва:

```sql
DELETE FROM reviews
WHERE rating = 1
RETURNING id, drink_id, comment;
```

| id | drink_id | comment |
| --- | --- | --- |
| 2 | 1 | Крепкий, но горчит |

## Зачем это нужно

- **Получить сгенерированный `id`** после `INSERT`.
- **Показать пользователю, что изменилось** после `UPDATE`.
- **Сохранить удалённые данные** в архив или лог.
- **Сделать операцию атомарной** в одном запросе, без гонки между вставкой и чтением.

## Грабли

* **`RETURNING` — не универсален.** В MySQL его нет; там используют `LAST_INSERT_ID()`. В SQL Server — `OUTPUT INSERTED.*`.
* **`UPDATE` возвращает новые значения.** Старые значения в `RETURNING` напрямую не получить; для истории изменений нужен триггер или отдельный аудит.
* **`RETURNING` относится к целевой таблице.** Если нужны связанные данные, обычно добавляют подзапрос или делают отдельный `SELECT`.
* **Большой результат.** `UPDATE ... RETURNING *` на миллионе строк вернёт миллион строк и может переполнить память приложения.
* **Права.** Для `RETURNING` нужны права на чтение возвращаемых столбцов.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что вернёт `INSERT ... RETURNING id`?",
  "options": [
    { "text": "Только что вставленную строку с её `id`", "correct": true, "explanation": "Это основное применение `RETURNING`." },
    { "text": "Все строки таблицы", "correct": false, "explanation": "Только затронутые командой строки." },
    { "text": "Количество вставленных строк", "correct": false, "explanation": "Для этого есть `ROW_COUNT` или тег команды." }
  ],
  "explanation": "`RETURNING` отдаёт изменённые строки в результате команды."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `RETURNING`?",
  "options": [
    { "text": "Работает с `INSERT`, `UPDATE` и `DELETE`.", "correct": true, "explanation": "Во всех трёх командах." },
    { "text": "Позволяет получить сгенерированный `id` без второго запроса.", "correct": true, "explanation": "Это удобно в приложении." },
    { "text": "Для `UPDATE` возвращает новые значения.", "correct": true, "explanation": "Старые нужно хранить отдельно." },
    { "text": "Это стандартная команда MySQL.", "correct": false, "explanation": "В MySQL `RETURNING` нет." }
  ],
  "explanation": "`RETURNING` — сильная сторона PostgreSQL, но не универсальный SQL."
}
```