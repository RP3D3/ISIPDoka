---
title: Ключи и связи на салфетке
keywords: primary key, foreign key, первичный ключ, внешний ключ, связи таблиц, один ко многим, многие ко многим, промежуточная таблица, идентификатор, postgresql
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / СВЯЗИ</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <rect x="0" y="28" width="120" height="66" rx="9" class="d" />
      <rect x="180" y="88" width="120" height="66" rx="9" class="d" />
      <path d="M20 52h50M20 72h34M200 112h50M200 132h34" opacity=".5" />
      <circle cx="120" cy="61" r="9" class="a" />
      <path d="M129 61h51" class="sa" stroke-width="3" />
      <path d="M180 121h-51" class="sa" stroke-width="3" stroke-dasharray="5 5" />
      <circle cx="180" cy="121" r="9" class="a" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">1:N</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">M:N</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">FK</text></g>
    </g>
  </svg>

---

# Ключи и связи на салфетке

Как связать заказы, клиентов и напитки, чтобы база сама не дала создать заказ для несуществующего человека?

Связи держатся на двух ключах. **Первичный ключ** (`PRIMARY KEY`) — это паспорт строки: уникальный и никогда не пустой. **Внешний ключ** (`FOREIGN KEY`) — ссылка на паспорт другой таблицы. Если в `orders.customer_id` написано `42`, база проверит, что клиент с `id = 42` существует, и не даст сохранить заказ-призрак.

## Три вида связей

| Связь | Пример в кофейне | Как хранится |
| --- | --- | --- |
| Один к одному | клиент и его профиль | `UNIQUE` внешний ключ |
| Один ко многим | клиент → заказы | `customer_id` в таблице заказов |
| Многие ко многим | напитки ↔ ингредиенты | промежуточная таблица `drink_ingredients` |

В кофейне «Зерно» один клиент делает много заказов, но каждый заказ принадлежит одному клиенту. А один напиток состоит из многих ингредиентов, и один ингредиент входит во многие напитки. Для связи «многие ко многим» нужна третья таблица: в ней хранятся пары `drink_id` и `ingredient_id`.

## Пример

```sql
SELECT o.id, c.name AS customer, o.total
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
ORDER BY o.id DESC
LIMIT 3;
```

| id | customer | total |
| --- | --- | --- |
| 128 | Анна | 640.00 |
| 127 | Игорь | 280.00 |
| 126 | Анна | 410.00 |

Здесь `JOIN` склеивает заказ с клиентом по ссылке `customer_id`. Подробно соединения разберём в группе *JOIN*, а пока важно понять саму идею: связь — это не «догадка по имени», а явная ссылка на ключ.

## Грабли

* **Внешний ключ не создаёт индекс автоматически.** В PostgreSQL индекс по `customer_id` нужно добавлять отдельно, иначе удаление клиента будет сканировать все заказы.
* **Первичный ключ не меняется.** Email или телефон в роли `PRIMARY KEY` — плохая идея: пользователь сменит почту, и придётся обновлять все ссылки.
* **Связь без `FOREIGN KEY` — только договорённость.** База не помешает вставить `customer_id = 999`, если ограничение не объявлено.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где хранится внешний ключ в связи «клиент — заказы»?",
  "options": [
    { "text": "В таблице `customers`, в столбце `id`", "correct": false, "explanation": "`customers.id` — первичный ключ, на него ссылаются." },
    { "text": "В таблице `orders`, в столбце `customer_id`", "correct": true, "explanation": "Ссылка живёт на стороне «многие»." },
    { "text": "В отдельной таблице `customer_orders`", "correct": false, "explanation": "Для «один ко многим» промежуточная таблица не нужна." }
  ],
  "explanation": "Внешний ключ ставится в таблицу, которая ссылается на другую."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про ключи и связи?",
  "options": [
    { "text": "`PRIMARY KEY` уникален и не может быть `NULL`.", "correct": true, "explanation": "Это паспорт строки." },
    { "text": "`FOREIGN KEY` проверяет, что связанная строка существует.", "correct": true, "explanation": "Иначе появился бы заказ для несуществующего клиента." },
    { "text": "Для связи «многие ко многим» нужна третья таблица.", "correct": true, "explanation": "Она хранит пары идентификаторов." },
    { "text": "Внешний ключ автоматически создаёт индекс в PostgreSQL.", "correct": false, "explanation": "Индекс по внешнему ключу нужно добавлять отдельно." }
  ],
  "explanation": "Связи держатся на первичных и внешних ключах, а индексы для них добавляют вручную."
}
```
