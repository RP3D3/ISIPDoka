---
title: JOIN: собираем данные
keywords: join sql, соединение таблиц, inner join, left join, many to many, self join, cross join, внешний ключ, postgresql, кофейня
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
    <text x="40" y="54" class="mono t" font-size="13" opacity=".55">SQL / 04</text>
    <text x="40" y="86" class="t" font-size="22" font-weight="700">JOIN</text>
    <g transform="translate(280 30)"><g class="st" stroke-width="2.2">
      <rect x="10" y="30" width="100" height="120" rx="12" class="d" />
      <rect x="170" y="30" width="100" height="120" rx="12" class="d" />
      <path d="M110 78h60" class="sa" stroke-width="4" />
      <circle cx="110" cy="78" r="7" class="a" />
      <circle cx="170" cy="78" r="7" class="a" />
      <path d="M26 58h68M26 78h50M26 98h60M26 118h40" opacity=".5" />
      <path d="M186 58h68M186 78h50M186 98h60M186 118h40" opacity=".5" />
      <path d="M134 64l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" class="a" />
    </g></g>
    <path d="M250 158h44" class="sa flow" stroke-width="3" stroke-linecap="round" />
    <g transform="translate(620 196)">
      <g transform="translate(0 0)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">INNER</text></g><g transform="translate(0 26)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">LEFT</text></g><g transform="translate(0 52)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">M:N</text></g>
    </g>
  </svg>

---

# JOIN: собираем данные

Как из таблиц, которые специально разделены, собрать один осмысленный ответ: заказ вместе с клиентом и составом?

В реляционной базе данные не лежат одной большой таблицей. Клиенты — отдельно, заказы — отдельно, напитки — отдельно. Это сделано, чтобы не дублировать имя клиента в каждом заказе и не хранить список ингредиентов в одной ячейке. `JOIN` — это операция, которая по ключам склеивает строки из разных таблиц обратно в один результат.

## Заказ, который знает своего клиента

В таблице `orders` для клиента есть только `customer_id` — число. Чтобы показать имя клиента, нужно соединить заказы с клиентами по этому ключу:

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

`JOIN` нашёл в `customers` строку с `id = 128` для заказа 128 и подставил имя. Без соединения пришлось бы делать два запроса и склеивать результат в коде.

## Что разберём

Сначала — зачем вообще нужны соединения и как работает `INNER JOIN`. Потом — `LEFT`, `RIGHT` и `FULL JOIN`: как сохранить строки без пары и найти «сирот». Дальше — соединение по нескольким условиям, связь «многие ко многим» через промежуточную таблицу, `SELF JOIN` и `CROSS JOIN`. Отдельно — ошибки, из-за которых после `JOIN` появляются дубли и завышенные суммы. В конце — практика: собираем заказ с составом.

Главная мысль группы: `JOIN` — это не «приклеить таблицу», а сопоставить строки по условию. Чем точнее условие, тем меньше дублей и сюрпризов.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой `JOIN` сохранит клиентов, у которых ещё нет заказов?",
  "options": [
    { "text": "`INNER JOIN`", "correct": false, "explanation": "Он оставляет только найденные пары." },
    { "text": "`LEFT JOIN`", "correct": true, "explanation": "Сохраняет все строки левой таблицы." },
    { "text": "`CROSS JOIN`", "correct": false, "explanation": "Он даёт все комбинации, а не сохраняет клиентов по смыслу." }
  ],
  "explanation": "Для строк без пары нужно внешнее соединение."
}
```
