---
title: DML: меняем данные
keywords: dml sql, insert, update, delete, returning, upsert, on conflict, copy, аудит, мягкое удаление, postgresql, кофейня
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
    <g opacity="0.16" class="st">
      <circle cx="66" cy="66" r="3" />
      <circle cx="838" cy="58" r="3" />
      <path d="M760 230h16M768 222v16M110 232h14M117 225v14" stroke-width="2" />
      <path d="M40 130h-18M850 120h18" stroke-width="2" />
    </g>
    <text x="40" y="54" class="mono t" font-size="13" opacity=".55">SQL / 06</text>
    <text x="40" y="86" class="t" font-size="22" font-weight="700">DML</text>
    <g transform="translate(280 30)"><g class="st" stroke-width="2.2">
      <path d="M10 118h220" stroke-width="4" />
      <circle cx="42" cy="138" r="14" class="d" />
      <circle cx="182" cy="138" r="14" class="d" />
      <rect x="28" y="58" width="54" height="40" rx="7" class="d" />
      <rect x="96" y="58" width="54" height="40" rx="7" class="a" opacity=".85" />
      <rect x="164" y="58" width="54" height="40" rx="7" class="d" />
      <path d="M44 78h22M112 78h22M180 78h22" class="sa" stroke-width="3" stroke-linecap="round" />
      <path d="M222 40l30 30-52 52-26 6 6-26z" class="d" stroke-width="2" />
      <path d="M214 62l24 24" class="sa" stroke-width="3" />
    </g></g>
    <path d="M250 158h44" class="sa flow" stroke-width="3" stroke-linecap="round" />
    <g transform="translate(620 196)">
      <g transform="translate(0 0)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">INSERT</text></g><g transform="translate(0 26)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">UPDATE</text></g><g transform="translate(0 52)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">DELETE</text></g>
    </g>
  </svg>

---

# DML: меняем данные

Как добавить заказ, изменить цену и удалить отзыв, не задев лишние строки и не потеряв данные?

`SELECT` читает, а **DML** меняет содержимое таблиц: `INSERT` добавляет строки, `UPDATE` изменяет, `DELETE` удаляет. Эти команды кажутся простыми, но именно с ними связаны самые дорогие ошибки: `UPDATE` без `WHERE`, случайный `DELETE`, дубли при вставке и потерянные изменения при одновременной работе.

## Новый заказ

Клиент оформил заказ. В базу нужно добавить строку и сразу получить её номер, чтобы показать чек:

```sql
INSERT INTO orders (customer_id, status, total)
VALUES (1, 'new', 640.00)
RETURNING id, created_at;
```

| id | created_at |
| --- | --- |
| 129 | 2026-05-15 12:00+03 |

`RETURNING` — особенность PostgreSQL: база возвращает вставленную строку, и приложению не нужен второй запрос.

## Что разберём

Сначала — `INSERT` во всех видах: одна строка, несколько, из другого запроса. Потом — `RETURNING`, который экономит round-trip к базе. Разберём `UPDATE` и `DELETE` с их главной опасностью — забытым `WHERE`. Дальше — `UPSERT` через `ON CONFLICT`, массовые операции и `COPY`, аудит и мягкое удаление. В конце — практика: наполняем кофейню.

Главная мысль группы: DML меняет состояние базы. Перед каждой командой полезно ответить на два вопроса: «какие именно строки я затрагиваю?» и «можно ли это откатить?».

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `UPDATE` без `WHERE`?",
  "options": [
    { "text": "Меняет одну первую строку", "correct": false, "explanation": "Без `WHERE` база не выбирает «первую»." },
    { "text": "Меняет все строки таблицы", "correct": true, "explanation": "Это главная опасность `UPDATE`." },
    { "text": "Ничего не делает", "correct": false, "explanation": "Команда выполнится и затронет все строки." }
  ],
  "explanation": "Перед `UPDATE` и `DELETE` всегда проверяй условие через `SELECT`."
}
```