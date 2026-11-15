---
title: ORDER BY
keywords: order by sql, сортировка, asc, desc, nulls first, nulls last, несколько столбцов, сортировка по выражению, collation, postgresql, стабильный порядок
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / ORDER BY</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <rect x="0" y="112" width="56" height="58" rx="7" class="d" />
      <rect x="78" y="76" width="56" height="94" rx="7" class="d" />
      <rect x="156" y="40" width="56" height="130" rx="7" class="a" opacity=".85" />
      <path d="M22 138h12M100 102h12M178 66h12" class="d" stroke-width="3" />
      <path d="M250 40v130" class="sa" stroke-width="2.5" />
      <path d="M242 52l8-12 8 12M242 158l8 12 8-12" class="sa" stroke-width="2.5" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">ASC</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">DESC</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">NULLS</text></g>
    </g>
  </svg>

---

# ORDER BY

Почему без `ORDER BY` база вправе вернуть строки в любом порядке, и как задать порядок, который не изменится завтра?

Таблица в базе — это не список, а множество строк. У него нет «первой» и «последней» строки: физический порядок зависит от вставок, удалений и плана запроса. `ORDER BY` — единственный способ гарантировать порядок результата. Если сортировка не указана, база может вернуть строки как угодно, и это не ошибка.

## Как это работает

Представь стопку карточек. Ты можешь разложить их по цене, по названию или сначала по категории, а внутри категории — по цене. `ORDER BY` перечисляет ключи сортировки слева направо: первый ключ решает основную задачу, второй — только при равенстве первого, третий — при равенстве первых двух.

## Синтаксис

```sql
SELECT столбцы
FROM таблица
ORDER BY ключ1 [ASC | DESC] [NULLS FIRST | NULLS LAST],
         ключ2 [ASC | DESC],
         ...;
```

| Часть | Значение |
| --- | --- |
| `ASC` | по возрастанию, значение по умолчанию |
| `DESC` | по убыванию |
| `NULLS LAST` | пустые значения в конце |
| `NULLS FIRST` | пустые значения в начале |

В PostgreSQL по умолчанию `NULL` считается «больше» любого значения: при `ASC` они в конце, при `DESC` — в начале. В MySQL и SQL Server правила другие, поэтому явное `NULLS FIRST` / `NULLS LAST` избавляет от сюрпризов.

## Пример

Сначала активные напитки, внутри — от дорогого к дешёвому:

```sql
SELECT name, price, is_active
FROM drinks
ORDER BY is_active DESC, price DESC;
```

| name | price | is_active |
| --- | --- | --- |
| Матча-латте | 320.00 | true |
| Латте | 310.00 | true |
| Капучино | 280.00 | true |
| Какао | 260.00 | true |
| Лимонад | 240.00 | true |
| Американо | 220.00 | true |
| Чай с бергамотом | 190.00 | true |
| Эспрессо | 180.00 | false |

`is_active DESC` ставит `true` раньше `false`, а `price DESC` сортирует внутри каждой группы.

Сортировать можно не только по столбцу, но и по выражению или псевдониму:

```sql
SELECT name, price * 1.15 AS price_with_vat
FROM drinks
ORDER BY price_with_vat DESC
LIMIT 3;
```

Псевдоним здесь работает, потому что `ORDER BY` выполняется после `SELECT`. В `WHERE` он был бы недоступен.

## Грабли

* **Без `ORDER BY` порядка нет.** Даже если сегодня строки приходят «как надо», после `VACUUM`, добавления индекса или смены плана порядок может измениться.
* **`LIMIT` без `ORDER BY` — лотерея.** Какие именно пять строк вернутся, база не обещает.
* **`NULL` сортируется по-своему.** Если пустые значения должны быть в конце, пиши `NULLS LAST` явно.
* **Сортировка по номеру столбца хрупкая.** `ORDER BY 2` работает, но после добавления столбца в `SELECT` сортировка незаметно поменяется. Лучше имя или выражение.
* **Текст сортируется по правилам языка.** В PostgreSQL порядок зависит от `COLLATE`. Для русского текста с `ё` и регистром это иногда даёт неожиданный результат.
* **Сортировка больших таблиц стоит денег.** Индекс может помочь, но `ORDER BY` по выражению или с `DESC` требует подходящего индекса.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "В каком порядке PostgreSQL вернёт `NULL` при `ORDER BY phone ASC` по умолчанию?",
  "options": [
    { "text": "В начале, потому что `NULL` — самое маленькое значение", "correct": false, "explanation": "В PostgreSQL `NULL` считается больше обычных значений." },
    { "text": "В конце, потому что `NULL` считается больше любого значения", "correct": true, "explanation": "При `ASC` пустые значения уходят в конец." },
    { "text": "Порядок `NULL` не определён", "correct": false, "explanation": "PostgreSQL определяет его: `NULLS LAST` для `ASC`." }
  ],
  "explanation": "Чтобы не зависеть от диалекта, указывай `NULLS FIRST` или `NULLS LAST` явно."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Какие утверждения об `ORDER BY` верны?",
  "options": [
    { "text": "`ORDER BY price DESC` ставит дорогие напитки первыми.", "correct": true, "explanation": "`DESC` — по убыванию." },
    { "text": "Второй ключ сортировки работает только при равенстве первого.", "correct": true, "explanation": "Ключи применяются по очереди, слева направо." },
    { "text": "Без `ORDER BY` база гарантирует порядок вставки.", "correct": false, "explanation": "Таблица — множество строк, порядок не гарантирован." },
    { "text": "Псевдоним из `SELECT` можно использовать в `ORDER BY`.", "correct": true, "explanation": "`ORDER BY` выполняется после `SELECT`, поэтому псевдоним уже известен." }
  ],
  "explanation": "Ключи сортировки применяются слева направо, а порядок без `ORDER BY` не гарантирован."
}
```
