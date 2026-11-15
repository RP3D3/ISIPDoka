---
title: Массовые операции и COPY
keywords: copy sql, массовая вставка, insert select, csv, psql copy, batch, производительность, postgresql, dml, импорт данных

---

# Массовые операции и COPY

Как загрузить десять тысяч напитков из CSV быстрее, чем тысячей `INSERT`?

Массовая загрузка — отдельный жанр. Построчные `INSERT` в цикле работают, но медленно: каждый запрос — сетевой round-trip и отдельная транзакция. PostgreSQL умеет загружать данные пачками через `INSERT ... SELECT` и `COPY`, который специально оптимизирован для больших файлов.

## Способы

| Способ | Когда использовать |
| --- | --- |
| `INSERT ... VALUES (...), (...)` | несколько десятков строк |
| `INSERT ... SELECT` | данные уже в базе |
| `COPY` | большой CSV или текстовый файл |
| `\copy` в `psql` | файл на клиенте, а не на сервере |

## COPY

Серверный `COPY` читает файл на машине, где работает PostgreSQL:

```sql
COPY drinks (name, category, price)
FROM '/var/lib/postgresql/drinks.csv'
WITH (FORMAT csv, HEADER true);
```

Выгрузка:

```sql
COPY drinks TO '/var/lib/postgresql/drinks.csv'
WITH (FORMAT csv, HEADER true);
```

Если файл лежит у тебя на компьютере, а база — в контейнере или на сервере, используй клиентский `\copy`:

```text
\copy drinks (name, category, price) FROM 'drinks.csv' CSV HEADER
```

`\copy` — метакоманда `psql`, а не SQL.

## INSERT ... SELECT

Данные уже есть в другой таблице:

```sql
INSERT INTO drinks_archive (name, category, price)
SELECT name, category, price
FROM drinks
WHERE is_active = false;
```

Можно комбинировать с `ON CONFLICT`, чтобы загрузка была идемпотентной.

## Пример

Загрузим прайс в staging-таблицу, проверим и перенесём:

```sql
CREATE TEMP TABLE import_drinks (
    name TEXT,
    category TEXT,
    price NUMERIC(10, 2)
);

COPY import_drinks (name, category, price)
FROM '/tmp/drinks.csv'
WITH (FORMAT csv, HEADER true);

INSERT INTO drinks (name, category, price)
SELECT name, category, price
FROM import_drinks
ON CONFLICT (name) DO UPDATE
SET price = EXCLUDED.price;
```

Здесь предполагается, что `drinks.name` объявлен уникальным: иначе PostgreSQL не знает, что считать конфликтом.

Staging-таблица даёт возможность проверить данные до попадания в основную таблицу.

## Грабли

* **Путь к файлу.** Серверный `COPY` видит файлы на сервере, а не на твоём ноутбуке. Для локального файла — `\copy`.
* **Права.** Для `COPY ... FROM` нужны права на таблицу и чтение файла. В облачных базах серверный путь часто недоступен.
* **Кодировка и кавычки.** CSV с `;`, BOM или неверной кодировкой может загрузиться криво. Указывай `FORMAT csv`, `HEADER`, `DELIMITER`, `ENCODING`.
* **`COPY` не обновляет строки.** Он только вставляет. Для UPSERT используй staging + `INSERT ... ON CONFLICT`.
* **Огромные файлы.** Один `COPY` на миллионы строк создаёт много WAL и может долго блокировать. Разбивай на части.
* **Идентификаторы.** При загрузке в таблицу с `IDENTITY` не передавай `id`, если не уверен в уникальности.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем `\\copy` отличается от `COPY`?",
  "options": [
    { "text": "`\\copy` работает с файлом на клиенте, а `COPY` — на сервере", "correct": true, "explanation": "`\\copy` — метакоманда `psql`." },
    { "text": "`\\copy` умеет обновлять строки, а `COPY` нет", "correct": false, "explanation": "Оба только вставляют." },
    { "text": "`\\copy` работает только с JSON", "correct": false, "explanation": "Поддерживаются CSV, текст и другие форматы." }
  ],
  "explanation": "Выбор зависит от того, где лежит файл."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про массовую загрузку?",
  "options": [
    { "text": "`COPY` быстрее множества отдельных `INSERT`.", "correct": true, "explanation": "Он оптимизирован для пакетной загрузки." },
    { "text": "`INSERT ... SELECT` может брать данные из другой таблицы.", "correct": true, "explanation": "Это удобно для архивации и переноса." },
    { "text": "Staging-таблица позволяет проверить данные до вставки.", "correct": true, "explanation": "Сначала загружаем во временную, потом переносим." },
    { "text": "`COPY` автоматически обновляет существующие строки по ключу.", "correct": false, "explanation": "Для этого нужен `ON CONFLICT` или `MERGE`." }
  ],
  "explanation": "Массовая загрузка требует контроля формата, прав и целостности."
}
```