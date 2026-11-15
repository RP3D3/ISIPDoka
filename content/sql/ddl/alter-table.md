---
title: ALTER TABLE
keywords: alter table, добавить столбец, удалить столбец, изменить тип, set not null, add constraint, rename column, postgresql, ddl, миграции

---

# ALTER TABLE

Как добавить новый столбец, поменять тип или повесить ограничение на таблицу, в которой уже есть данные?

`ALTER TABLE` меняет структуру существующей таблицы. Это основной инструмент миграций: приложение растёт, появляются новые поля, меняются правила. В PostgreSQL большинство изменений можно делать в транзакции, но не все они одинаково безопасны для большой таблицы.

## Синтаксис

```sql
ALTER TABLE drinks ADD COLUMN description TEXT;

ALTER TABLE drinks ALTER COLUMN price TYPE NUMERIC(12, 2);

ALTER TABLE drinks ADD CONSTRAINT drinks_price_positive CHECK (price > 0);

ALTER TABLE drinks RENAME COLUMN description TO note;

ALTER TABLE drinks DROP COLUMN note;
```

Можно перечислить несколько действий в одной команде:

```sql
ALTER TABLE drinks
    ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ADD CONSTRAINT drinks_name_not_empty CHECK (trim(name) <> '');
```

## Пример

Добавим описание и заполним его у существующих строк:

```sql
ALTER TABLE drinks ADD COLUMN description TEXT;

UPDATE drinks
SET description = 'Классический ' || lower(category)
WHERE description IS NULL;
```

Сначала структура, потом данные. Если сразу добавить `NOT NULL` без значения по умолчанию, база не сможет заполнить существующие строки и выдаст ошибку.

## Изменение типа

```sql
ALTER TABLE drinks
    ALTER COLUMN price TYPE NUMERIC(12, 2)
    USING price::numeric(12, 2);
```

`USING` объясняет, как преобразовать старые значения. Без него PostgreSQL попробует автоматическое приведение и может отказаться, если оно неоднозначно.

## Грабли

* **`ADD COLUMN NOT NULL` без `DEFAULT`.** На непустой таблице команда упадёт: существующие строки нечем заполнить. Добавь `DEFAULT` или сначала заполни столбец.
* **Смена типа переписывает таблицу.** На больших данных это долго и блокирует запись. Планируй окно обслуживания или используй безопасный путь через новый столбец.
* **`DROP COLUMN` необратим.** Данные исчезают. Сначала сделай резервную копию или переименуй столбец и проверь, что он не нужен.
* **`RENAME` ломает приложение.** Если код обращается к старому имени, запросы упадут. Обновляй код и схему вместе.
* **Блокировки.** `ALTER TABLE` берёт блокировку, которая может ждать завершения долгих транзакций. На продакшене проверяй `pg_locks`.
* **Ограничение на грязных данных.** `ADD CONSTRAINT` проверит все строки. Сначала почисти нарушения.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какая команда добавит столбец `description` в таблицу `drinks`?",
  "options": [
    { "text": "`ALTER TABLE drinks ADD COLUMN description TEXT;`", "correct": true, "explanation": "Это стандартный синтаксис PostgreSQL." },
    { "text": "`UPDATE drinks ADD description TEXT;`", "correct": false, "explanation": "`UPDATE` меняет данные, а не структуру." },
    { "text": "`INSERT INTO drinks (description) VALUES (TEXT);`", "correct": false, "explanation": "`INSERT` добавляет строку, а не столбец." }
  ],
  "explanation": "Структуру меняет `ALTER TABLE`, данные — `UPDATE` и `INSERT`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Какие меры безопасны при изменении большой таблицы?",
  "options": [
    { "text": "Сначала добавить nullable-столбец, потом заполнить и ужесточить ограничение.", "correct": true, "explanation": "Так меньше риск упасть на существующих строках." },
    { "text": "Проверить `ALTER TABLE` на копии базы.", "correct": true, "explanation": "Это выявит ошибки и оценит время." },
    { "text": "Сразу выполнить `DROP COLUMN` без резервной копии.", "correct": false, "explanation": "Данные исчезнут безвозвратно." },
    { "text": "Учитывать блокировки и длительность операции.", "correct": true, "explanation": "На продакшене это может остановить запись." }
  ],
  "explanation": "Изменение схемы — операция с данными и блокировками, а не только с текстом команды."
}
```