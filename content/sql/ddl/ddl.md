---
title: DDL: создаём схему
keywords: ddl sql, create table, create database, schema, ограничения, primary key, foreign key, alter table, drop, view, индексы, миграции, postgresql
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
    <text x="40" y="54" class="mono t" font-size="13" opacity=".55">SQL / 05</text>
    <text x="40" y="86" class="t" font-size="22" font-weight="700">DDL</text>
    <g transform="translate(280 30)"><g class="st" stroke-width="2.2">
      <rect x="14" y="112" width="120" height="58" rx="8" class="d" />
      <rect x="48" y="66" width="120" height="58" rx="8" class="d" />
      <rect x="82" y="20" width="120" height="58" rx="8" class="a" opacity=".8" />
      <path d="M32 140h84M66 94h84M100 48h84" stroke-width="3" opacity=".6" />
      <path d="M228 96h42M249 75v42" class="sa" stroke-width="4" stroke-linecap="round" />
      <circle cx="249" cy="96" r="34" class="sa" stroke-width="2" stroke-dasharray="4 6" opacity=".55" />
    </g></g>
    <path d="M250 158h44" class="sa flow" stroke-width="3" stroke-linecap="round" />
    <g transform="translate(620 196)">
      <g transform="translate(0 0)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">CREATE</text></g><g transform="translate(0 26)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">ALTER</text></g><g transform="translate(0 52)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">DROP</text></g>
    </g>
  </svg>

---

# DDL: создаём схему

Как из пустой базы сделать схему кофейни, которую не стыдно показать, и не потерять данные при изменениях?

До сих пор мы читали и меняли строки. Но откуда взялись сами таблицы? Их создаёт **DDL** — язык определения данных. Команды `CREATE`, `ALTER` и `DROP` описывают структуру: базы, схемы, таблицы, столбцы, ключи, ограничения и индексы. Это фундамент, на котором живут все `SELECT`, `INSERT` и `UPDATE`.

## Кофейня открывается

Владелец кофейни говорит: «Нужно хранить клиентов, напитки, заказы и отзывы». В Excel ты бы просто создал листы. В базе — описываешь таблицы, типы и правила: цена не может быть отрицательной, заказ не может ссылаться на несуществующего клиента, email уникален.

```sql
CREATE TABLE drinks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true
);
```

Одна команда — и структура готова. Данных пока нет, но появились правила, которые база будет проверять при каждой вставке.

## Что разберём

Сначала — `CREATE DATABASE`, `CREATE SCHEMA` и `CREATE TABLE`: как устроена иерархия базы. Потом — ограничения: `NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`. Разберём первичные и внешние ключи, `ALTER TABLE` для изменения структуры и опасные `DROP` с `TRUNCATE`. Дальше — представления и индексы, которые упрощают работу с данными. В конце — миграции: как менять схему на реальном проекте, не ломая продакшен, и практика «кофейня с нуля».

Главная мысль группы: схема — это контракт. Чем точнее описаны типы и ограничения, тем меньше ошибок доберётся до данных.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `CREATE TABLE`?",
  "options": [
    { "text": "Создаёт структуру таблицы, но не добавляет строки", "correct": true, "explanation": "Данные добавляет `INSERT`, а `CREATE TABLE` описывает столбцы и правила." },
    { "text": "Добавляет одну строку в таблицу", "correct": false, "explanation": "Это `INSERT`." },
    { "text": "Удаляет таблицу вместе с данными", "correct": false, "explanation": "Это `DROP TABLE`." }
  ],
  "explanation": "DDL меняет структуру, а не содержимое таблицы."
}
```
