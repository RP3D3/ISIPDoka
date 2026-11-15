---
title: CREATE DATABASE, SCHEMA, TABLE
keywords: create database, create schema, create table, иерархия базы, search_path, identity, postgresql, ddl, структура базы, кофейня

---

# CREATE DATABASE, SCHEMA, TABLE

Как создать базу, папку для объектов и первую таблицу, не запутавшись, где что лежит?

В PostgreSQL три уровня: сервер → база данных → схема → таблица. База данных — изолированный набор схем. Схема — папка внутри базы. Таблица — набор строк одного типа. Понимание этой иерархии экономит часы, когда запрос вдруг не находит таблицу.

## Как это работает

Представь офис. Сервер — здание. База данных — отдельный кабинет. Схема — шкаф в кабинете. Таблица — полка в шкафу. Если ты стоишь в другом кабинете, полка из первого кабинета тебе не видна. В PostgreSQL по умолчанию всё создаётся в схеме `public`, но для проекта лучше завести свою.

## Синтаксис

```sql
CREATE DATABASE coffee;

-- дальше подключаемся к базе coffee
CREATE SCHEMA shop;

CREATE TABLE shop.drinks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

`GENERATED ALWAYS AS IDENTITY` — современный способ автонумерации в PostgreSQL. `PRIMARY KEY` делает столбец уникальным и обязательным, `NOT NULL` запрещает пустое значение, `CHECK` проверяет условие, `DEFAULT` подставляет значение по умолчанию.

## Схема и search_path

Чтобы не писать `shop.` перед каждой таблицей, добавь схему в путь поиска:

```sql
SET search_path TO shop, public;
```

Теперь `SELECT * FROM drinks` найдёт `shop.drinks`. `public` оставляют вторым, чтобы были доступны общие функции и расширения.

## Пример

```sql
CREATE TABLE shop.customers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO shop.customers (name, email)
VALUES ('Анна', 'anna@zerno.ru')
RETURNING id, name;
```

| id | name |
| --- | --- |
| 1 | Анна |

`id` база выдала сама, а `RETURNING` вернул его без второго запроса.

## Грабли

* **`CREATE DATABASE` нельзя выполнять внутри транзакции.** Он должен идти отдельной командой. В `psql` после него нужно подключиться к новой базе.
* **Таблица создалась не там.** Без `shop.` и без `search_path` она уйдёт в `public`. Проверяй `\dt shop.*`.
* **`IF NOT EXISTS` скрывает ошибки.** Команда не упадёт, если таблица уже есть, но и не скажет, что структура другая. Для миграций лучше контролировать версии.
* **`CREATE TABLE AS SELECT` — не то же самое.** Он создаёт таблицу из результата запроса и не переносит ограничения исходной таблицы.
* **Имя базы и схемы — не косметика.** В продакшене они часть строки подключения и прав доступа. Переименование может сломать приложение.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где по умолчанию создаётся таблица, если не указать схему?",
  "options": [
    { "text": "В схеме `public`", "correct": true, "explanation": "Она входит в `search_path` по умолчанию." },
    { "text": "В схеме `shop`", "correct": false, "explanation": "`shop` нужно создать и указать явно." },
    { "text": "В отдельной базе для каждой таблицы", "correct": false, "explanation": "Таблицы живут в схеме внутри базы." }
  ],
  "explanation": "Схема — это папка внутри базы, а `public` — папка по умолчанию."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про создание объектов в PostgreSQL?",
  "options": [
    { "text": "`CREATE DATABASE` выполняется вне транзакции.", "correct": true, "explanation": "Это ограничение PostgreSQL." },
    { "text": "`search_path` позволяет обращаться к таблицам без имени схемы.", "correct": true, "explanation": "База ищет объекты по списку схем." },
    { "text": "`GENERATED ALWAYS AS IDENTITY` автоматически нумерует строки.", "correct": true, "explanation": "Это современная замена `SERIAL`." },
    { "text": "`CREATE TABLE` сразу добавляет данные из другой таблицы.", "correct": false, "explanation": "Для этого есть `CREATE TABLE AS SELECT` или `INSERT ... SELECT`." }
  ],
  "explanation": "Иерархия базы и `search_path` определяют, куда попадёт объект и как его найти."
}
```