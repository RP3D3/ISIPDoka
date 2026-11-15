---
title: INNER JOIN
keywords: inner join sql, соединение по ключу, on, using, псевдонимы таблиц, порядок соединения, postgresql, заказы и клиенты, выборка
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / INNER JOIN</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <circle cx="90" cy="90" r="68" class="d" />
      <circle cx="170" cy="90" r="68" class="d" />
      <path d="M130 90a68 68 0 0 1 40-60 68 68 0 0 1 0 120 68 68 0 0 1-40-60z" class="a" opacity=".8" />
      <path d="M90 22a68 68 0 0 0 0 136M170 22a68 68 0 0 1 0 136" opacity=".45" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">пересечение</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">ключ</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">строки</text></g>
    </g>
  </svg>

---

# INNER JOIN

Как показать только те заказы, у которых точно есть клиент, и не тащить в результат строки без пары?

`INNER JOIN` — самый частый тип соединения. Он оставляет только те строки, для которых нашлась пара в обеих таблицах. Если у заказа нет клиента или у клиента нет заказа, такая строка в результат не попадёт. `JOIN` без уточнения в PostgreSQL — это и есть `INNER JOIN`.

## Как это работает

Представь два списка, которые ты сличаешь построчно. Берёшь заказ, ищешь клиента с таким же `id`. Нашёл — добавляешь строку в результат. Не нашёл — заказ пропускается. Соединение идёт по условию, а не по порядку строк: база может читать таблицы в любом порядке и использовать индексы.

## Синтаксис

```sql
SELECT столбцы
FROM таблица_1 AS a
INNER JOIN таблица_2 AS b ON b.ключ = a.внешний_ключ;
```

`INNER` можно опустить: `JOIN` по умолчанию внутренний.

Если столбцы называются одинаково, вместо `ON` можно написать `USING`:

```sql
SELECT ...
FROM orders
JOIN order_items USING (order_id);
```

`USING (order_id)` — то же самое, что `ON order_items.order_id = orders.order_id`, но в результате столбец `order_id` будет один, а не два.

## Пример

Все заказы с именем клиента:

```sql
SELECT
    o.id AS order_id,
    c.name AS customer,
    o.status,
    o.total
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
ORDER BY o.id DESC;
```

| order_id | customer | status | total |
| --- | --- | --- | --- |
| 128 | Анна | paid | 640.00 |
| 127 | Игорь | done | 280.00 |
| 126 | Анна | done | 410.00 |
| 125 | Мария | cancelled | 320.00 |
| 124 | Павел | paid | 500.00 |
| 123 | Ольга | done | 190.00 |
| 122 | Игорь | paid | 760.00 |
| 121 | Анна | done | 260.00 |
| 120 | Мария | new | 240.00 |

Все девять заказов нашли своего клиента, поэтому строк столько же, сколько заказов.

Другой пример — позиции заказов с названиями напитков:

```sql
SELECT
    oi.order_id,
    d.name AS drink,
    oi.quantity,
    oi.unit_price
FROM order_items AS oi
JOIN drinks AS d ON d.id = oi.drink_id
WHERE oi.order_id = 128;
```

| order_id | drink | quantity | unit_price |
| --- | --- | --- | --- |
| 128 | Чай с бергамотом | 2 | 190.00 |
| 128 | Какао | 1 | 260.00 |

Здесь одна позиция заказа — одна строка результата. Если в заказе три напитка, строк будет три.

## Порядок таблиц

Для `INNER JOIN` порядок таблиц в `FROM` не влияет на результат. `A JOIN B` и `B JOIN A` дадут одинаковый набор строк, если условие одно и то же. Но читаемость зависит от порядка: обычно начинают с главной таблицы, а справочники присоединяют справа.

## Грабли

* **Забыть `ON`.** Получится `CROSS JOIN`, и строки размножатся.
* **Соединить не по тому столбцу.** `ON c.id = o.id` формально сработает, но смысла в таком соединении нет.
* **Дубли в результате.** Если справа несколько совпадений, левая строка повторится. Для `order_items` это ожидаемо, но для суммы заказов — ловушка.
* **`INNER JOIN` теряет строки без пары.** Если нужны все клиенты, включая тех, кто не заказывал, используй `LEFT JOIN`.
* **Одинаковые имена столбцов.** Без псевдонимов `id` и `name` станут неоднозначными. Указывай `o.id`, `c.name`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что вернёт `INNER JOIN` для заказа, у которого `customer_id` указывает на несуществующего клиента?",
  "options": [
    { "text": "Заказ с пустым именем клиента", "correct": false, "explanation": "Пустое имя бывает у `LEFT JOIN`, а `INNER JOIN` строку без пары выбрасывает." },
    { "text": "Ничего: строка не попадёт в результат", "correct": true, "explanation": "`INNER JOIN` оставляет только найденные пары." },
    { "text": "Ошибку выполнения", "correct": false, "explanation": "База просто не найдёт пару." }
  ],
  "explanation": "Если нужны строки без пары, выбирай внешнее соединение."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `INNER JOIN`?",
  "options": [
    { "text": "`JOIN` без слова `INNER` — это внутреннее соединение.", "correct": true, "explanation": "`INNER` — значение по умолчанию." },
    { "text": "`USING (order_id)` заменяет `ON` для одноимённых столбцов.", "correct": true, "explanation": "И оставляет один столбец в результате." },
    { "text": "Порядок таблиц в `FROM` меняет набор строк.", "correct": false, "explanation": "Для внутреннего соединения набор тот же." },
    { "text": "Строки без пары отбрасываются.", "correct": true, "explanation": "Это ключевое отличие от `LEFT JOIN`." }
  ],
  "explanation": "`INNER JOIN` — соединение только по найденным парам."
}
```