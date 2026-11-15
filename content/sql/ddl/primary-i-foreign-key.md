---
title: PRIMARY KEY и FOREIGN KEY
keywords: primary key, foreign key, первичный ключ, внешний ключ, составной ключ, on delete cascade, restrict, set null, postgresql, ddl, связи
svg: |
  <svg viewBox="0 0 900 280" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 900px; max-height: 280px; height: auto; display: block; margin: 0 auto 20px;">
    <style>
      .t { fill: var(--text-main, #f4f6fb); }
      .d { fill: var(--bg-main, #16181d); }
      .a { fill: var(--domain-accent, #235ce1); }
      .st { stroke: var(--text-main, #f4f6fb); }
      .sa { stroke: var(--domain-accent, #235ce1); }
      .mono { font-family: 'JetBrains Mono', monospace; }
      .flow { stroke-dasharray: 6 7; animation: dash 2.6s linear infinite; }
      @keyframes dash { to { stroke-dashoffset: -26; } }
    </style>
    <g opacity="0.14" class="st">
      <circle cx="54" cy="54" r="3" />
      <circle cx="846" cy="62" r="3" />
      <path d="M800 226h16M808 218v16M60 236h14M67 229v14" stroke-width="2" />
    </g>
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / КЛЮЧИ</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <circle cx="54" cy="58" r="28" class="d" />
      <circle cx="54" cy="58" r="9" class="a" />
      <path d="M82 58h74v-18h-18v18" class="sa" stroke-width="4" />
      <rect x="186" y="28" width="86" height="60" rx="9" class="d" />
      <path d="M204 52h50M204 70h32" opacity=".5" />
      <path d="M272 58h26" class="sa" stroke-width="2.5" stroke-dasharray="5 5" />
      <rect x="320" y="28" width="86" height="60" rx="9" class="d" />
      <path d="M338 52h50M338 70h32" opacity=".5" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">PK</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">FK</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">CASCADE</text></g>
    </g>
  </svg>

---

# PRIMARY KEY и FOREIGN KEY

Как база сама не даст создать заказ для несуществующего клиента и удалить заказ вместе с позициями?

`PRIMARY KEY` — паспорт строки: уникальный и обязательный. `FOREIGN KEY` — ссылка на паспорт другой таблицы. Вместе они превращают набор таблиц в связную схему, где нельзя случайно оставить «сироту» или сослаться на несуществующую запись.

## PRIMARY KEY

```sql
CREATE TABLE customers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE
);
```

У таблицы может быть только один первичный ключ. Он может состоять из нескольких столбцов:

```sql
CREATE TABLE order_items (
    order_id BIGINT REFERENCES orders(id),
    drink_id BIGINT REFERENCES drinks(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (order_id, drink_id)
);
```

Составной ключ `(order_id, drink_id)` не даёт дважды добавить один напиток в один заказ. При этом каждая пара уникальна, а по отдельности `order_id` и `drink_id` могут повторяться.

## FOREIGN KEY

```sql
CREATE TABLE orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id BIGINT REFERENCES customers(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    status TEXT NOT NULL DEFAULT 'new'
        CHECK (status IN ('new', 'paid', 'done', 'cancelled')),
    total NUMERIC(10, 2) NOT NULL DEFAULT 0
);
```

`REFERENCES customers(id)` говорит: значение `customer_id` должно существовать в `customers.id`. Внешний ключ может ссылаться на первичный ключ или на столбец с `UNIQUE`.

## Что делать при удалении

| Действие | Что происходит |
| --- | --- |
| `NO ACTION` | удаление запрещено, если есть ссылки (по умолчанию) |
| `RESTRICT` | запрещено сразу, без отложенной проверки |
| `CASCADE` | дочерние строки удаляются вместе с родителем |
| `SET NULL` | внешний ключ становится `NULL` |
| `SET DEFAULT` | внешний ключ получает значение по умолчанию |

```sql
CREATE TABLE order_items (
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
    drink_id BIGINT REFERENCES drinks(id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (order_id, drink_id)
);
```

Удалили заказ — его позиции исчезли каскадом. Удалить напиток, который уже заказывали, база не даст: история продаж важнее.

## Грабли

* **Внешний ключ не создаёт индекс автоматически.** PostgreSQL не индексирует `customer_id` сам. Без индекса удаление клиента и соединения могут быть медленными.
* **Типы должны совпадать.** `BIGINT` и `INTEGER` — разные типы; ссылка между ними либо не создастся, либо потребует приведения.
* **`NULL` во внешнем ключе разрешён.** Если связь необязательна, это нормально. Если обязательна — добавь `NOT NULL`.
* **`CASCADE` опасен.** Одна команда `DELETE` может унести половину базы. Используй его осознанно и проверяй связи.
* **Нельзя удалить родителя с `RESTRICT`.** Сначала удали или переназначь дочерние строки.
* **Составной ключ — не два отдельных ключа.** Уникальность проверяется по паре, а не по каждому столбцу.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что произойдёт при попытке вставить заказ с `customer_id = 999`, если такого клиента нет?",
  "options": [
    { "text": "Заказ создастся с пустым клиентом", "correct": false, "explanation": "Внешний ключ не пропустит ссылку на несуществующую строку." },
    { "text": "База выдаст ошибку нарушения внешнего ключа", "correct": true, "explanation": "Ссылка должна указывать на существующего клиента." },
    { "text": "Клиент создастся автоматически", "correct": false, "explanation": "База не придумывает родительские строки." }
  ],
  "explanation": "`FOREIGN KEY` защищает от «сирот»."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про ключи?",
  "options": [
    { "text": "`PRIMARY KEY` уникален и не может быть `NULL`.", "correct": true, "explanation": "Это паспорт строки." },
    { "text": "`FOREIGN KEY` может ссылаться на `UNIQUE`-столбец.", "correct": true, "explanation": "Не только на первичный ключ." },
    { "text": "`ON DELETE CASCADE` удаляет дочерние строки вместе с родителем.", "correct": true, "explanation": "Это удобно, но требует осторожности." },
    { "text": "Внешний ключ автоматически создаёт индекс в PostgreSQL.", "correct": false, "explanation": "Индекс нужно добавлять отдельно." }
  ],
  "explanation": "Ключи задают связи и целостность, но индексы для внешних ключей добавляют вручную."
}
```