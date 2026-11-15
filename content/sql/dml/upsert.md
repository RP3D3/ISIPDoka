---
title: UPSERT: ON CONFLICT
keywords: upsert sql, on conflict, do nothing, do update, excluded, вставка или обновление, уникальный индекс, postgresql, dml, импорт
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / UPSERT</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <rect x="0" y="58" width="120" height="48" rx="9" class="d" />
      <text x="18" y="88" class="mono t" font-size="14">INSERT</text>
      <path d="M140 82h54" class="sa" stroke-width="3" />
      <path d="M194 82l-10-8v16z" class="a" />
      <path d="M218 40v84" class="sa" stroke-width="2.5" />
      <path d="M218 40h52M218 124h52" class="sa" stroke-width="2.5" />
      <text x="286" y="46" class="mono t" font-size="12">OK</text>
      <text x="286" y="130" class="mono t" font-size="12">CONFLICT</text>
      <path d="M282 82h44" class="sa" stroke-width="2.5" stroke-dasharray="5 5" />
      <text x="336" y="87" class="mono a" font-size="13">UPDATE</text>
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">INSERT</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">CONFLICT</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">UPDATE</text></g>
    </g>
  </svg>

---

# UPSERT: ON CONFLICT

Как одной командой добавить напиток, а если он уже есть — обновить цену?

`INSERT ... ON CONFLICT` — это «вставь или обнови». Если строка нарушает уникальное ограничение, PostgreSQL не падает, а выполняет альтернативное действие: пропускает вставку (`DO NOTHING`) или обновляет существующую строку (`DO UPDATE`). Такой приём называют **UPSERT**.

## Как это работает

Представь загрузку прайса. В файле есть и новые напитки, и уже существующие. Тебе не хочется писать «сначала проверь, потом вставь или обнови» — это две операции и гонка между ними. `ON CONFLICT` делает всё одной командой: база сама определяет конфликт по уникальному индексу.

## Синтаксис

```sql
INSERT INTO таблица (столбцы)
VALUES (значения)
ON CONFLICT (уникальный_столбец)
DO UPDATE SET
    столбец = EXCLUDED.столбец;
```

`EXCLUDED` — псевдотаблица с той строкой, которую ты пытался вставить. В `DO UPDATE` можно обращаться и к старой строке через имя таблицы, и к новой через `EXCLUDED`.

## Пример

Добавим или обновим клиента по email:

```sql
INSERT INTO customers (name, email)
VALUES ('Анна', 'anna@zerno.ru')
ON CONFLICT (email)
DO UPDATE SET name = EXCLUDED.name
RETURNING id, name, email;
```

Если email новый — строка вставится. Если уже есть — имя обновится, а `id` останется прежним.

Обновление позиции заказа:

```sql
INSERT INTO order_items (order_id, drink_id, quantity, unit_price)
VALUES (129, 2, 2, 280.00)
ON CONFLICT (order_id, drink_id)
DO UPDATE SET quantity = EXCLUDED.quantity
RETURNING order_id, drink_id, quantity;
```

Здесь конфликт определяется составным первичным ключом `(order_id, drink_id)`: если такая позиция уже есть, меняется только количество.

## DO NOTHING

Если при конфликте нужно просто пропустить строку:

```sql
INSERT INTO customers (name, email)
VALUES ('Анна', 'anna@zerno.ru')
ON CONFLICT (email) DO NOTHING;
```

Команда не упадёт, но и не обновит существующую запись. Это удобно для идемпотентной загрузки.

## Грабли

* **Нет уникального индекса — нет конфликта.** `ON CONFLICT (email)` требует `UNIQUE` или уникальный индекс по `email`. Иначе PostgreSQL не знает, что считать конфликтом.
* **Цель конфликта должна совпадать с индексом.** Если индекс составной `(email, phone)`, указывай оба столбца.
* **`DO UPDATE` может запускать триггеры.** Это нормально, но проверяй побочные эффекты.
* **Не обновляй ключ, по которому ищешь конфликт.** Иначе получится странная логика и возможные повторы.
* **Гонки.** При высокой конкуренции `ON CONFLICT` надёжнее, чем «проверить и вставить», но транзакции всё равно важны.
* **Диалекты.** В MySQL — `ON DUPLICATE KEY UPDATE`, в SQL Server — `MERGE`, в стандарте SQL — `MERGE`. Синтаксис не переносится один в один.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `ON CONFLICT (email) DO UPDATE`?",
  "options": [
    { "text": "Обновляет существующую строку при совпадении email", "correct": true, "explanation": "Это и есть UPSERT." },
    { "text": "Удаляет строку с таким email", "correct": false, "explanation": "Для удаления есть `DELETE`." },
    { "text": "Всегда вставляет новую строку", "correct": false, "explanation": "При конфликте выполняется `DO UPDATE`." }
  ],
  "explanation": "`ON CONFLICT` превращает ошибку уникальности в управляемое действие."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `ON CONFLICT`?",
  "options": [
    { "text": "`EXCLUDED` содержит строку, которую пытались вставить.", "correct": true, "explanation": "Через неё берут новые значения." },
    { "text": "`DO NOTHING` пропускает конфликтную строку.", "correct": true, "explanation": "Удобно для идемпотентной загрузки." },
    { "text": "Нужен уникальный индекс или ограничение.", "correct": true, "explanation": "Иначе конфликт не определить." },
    { "text": "Синтаксис одинаков во всех СУБД.", "correct": false, "explanation": "MySQL и SQL Server используют другие команды." }
  ],
  "explanation": "UPSERT опирается на уникальность и умеет обновлять или пропускать конфликт."
}
```