---
title: Ограничения
keywords: ограничения sql, not null, unique, check, default, primary key, foreign key, именованные ограничения, postgresql, ddl, целостность

---

# Ограничения

Как запретить отрицательную цену, пустое имя и два одинаковых email прямо на уровне базы?

Ограничения — это правила, которые база проверяет при каждой вставке и обновлении. Они не заменяют валидацию в приложении, а страхуют от ошибок и прямых правок в базе. Если правило можно выразить в схеме, лучше выразить его там: приложение может обновиться, а ограничение останется.

## Основные ограничения

| Ограничение | Что запрещает | Пример |
| --- | --- | --- |
| `NOT NULL` | пустое значение | `name TEXT NOT NULL` |
| `UNIQUE` | повторы | `email TEXT UNIQUE` |
| `CHECK` | нарушение условия | `CHECK (price >= 0)` |
| `DEFAULT` | не задаёт значение, а подставляет | `DEFAULT now()` |
| `PRIMARY KEY` | повтор и `NULL` в ключе | `id BIGINT PRIMARY KEY` |
| `FOREIGN KEY` | ссылку на несуществующую строку | `REFERENCES customers(id)` |

## Синтаксис

Ограничение можно поставить сразу у столбца или отдельной строкой с именем:

```sql
CREATE TABLE drinks (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT drinks_pkey PRIMARY KEY (id),
    CONSTRAINT drinks_name_unique UNIQUE (name),
    CONSTRAINT drinks_price_non_negative CHECK (price >= 0),
    CONSTRAINT drinks_category_check
        CHECK (category IN ('кофе', 'чай', 'напиток'))
);
```

Имя ограничения пригодится в миграциях и сообщениях об ошибках: `drinks_price_non_negative` понятнее, чем `drinks_price_check1`.

## Пример

Попробуем вставить некорректную цену:

```sql
INSERT INTO drinks (name, category, price)
VALUES ('Ошибка', 'кофе', -10);
```

```text
ERROR: new row for relation "drinks" violates check constraint
"drinks_price_non_negative"
```

База не пропустила строку. Приложение может показать пользователю понятную ошибку, но данные уже защищены.

## CHECK не видит другие строки

`CHECK` проверяет только текущую строку. Нельзя написать «цена должна быть больше средней по категории» или «у клиента не больше трёх заказов» — для этого нужны триггеры или логика приложения.

```sql
CHECK (price >= 0)          -- можно
CHECK (price > MIN(price))  -- нельзя
```

## Грабли

* **`UNIQUE` и `NULL`.** В PostgreSQL несколько `NULL` в уникальном столбце разрешены: пустые значения считаются не равными друг другу. Если нужен ровно один `NULL`, используй частичный уникальный индекс.
* **`NOT NULL` не запрещает пустую строку.** `''` — это известное значение длины 0. Для «не пусто» нужен `CHECK (trim(name) <> '')`.
* **`CHECK` не проверяет другие таблицы.** Для межтабличных правил — внешний ключ, триггер или приложение.
* **`DEFAULT` не срабатывает при `NULL`.** Если явно передать `NULL`, значение по умолчанию не подставится.
* **Ограничение на существующих данных.** `ALTER TABLE ... ADD CONSTRAINT` проверит все строки и упадёт, если найдутся нарушения. Сначала почисти данные.
* **Слишком много правил в одном `CHECK`.** Ошибка будет менее понятной. Лучше несколько именованных ограничений.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какое ограничение запретит вставить цену `-10`?",
  "options": [
    { "text": "`NOT NULL`", "correct": false, "explanation": "Он запрещает только `NULL`, а `-10` — число." },
    { "text": "`CHECK (price >= 0)`", "correct": true, "explanation": "Условие ложно, строка не пройдёт." },
    { "text": "`DEFAULT 0`", "correct": false, "explanation": "`DEFAULT` подставляет значение, но не запрещает явную `-10`." }
  ],
  "explanation": "`CHECK` — это правило на значение в строке."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про ограничения?",
  "options": [
    { "text": "`UNIQUE` в PostgreSQL разрешает несколько `NULL`.", "correct": true, "explanation": "Пустые значения не считаются равными." },
    { "text": "`CHECK` проверяет только текущую строку.", "correct": true, "explanation": "Он не видит другие строки и таблицы." },
    { "text": "`DEFAULT` подставляется, если столбец не указан или передан `NULL`.", "correct": false, "explanation": "При явном `NULL` значение по умолчанию не срабатывает." },
    { "text": "Именованные ограничения удобнее в миграциях.", "correct": true, "explanation": "По имени понятно, что именно нарушено." }
  ],
  "explanation": "Ограничения — это декларативные правила, которые база проверяет сама."
}
```