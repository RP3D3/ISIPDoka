---
title: LEFT, RIGHT и FULL JOIN
keywords: left join, right join, full join, внешнее соединение, строки без пары, null, is null, postgresql, поиск сирот, кофейня
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / LEFT / RIGHT</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <circle cx="48" cy="86" r="42" class="d" />
      <circle cx="100" cy="86" r="42" class="d" />
      <path d="M76 86a42 42 0 0 1 24-37 42 42 0 0 1 0 74 42 42 0 0 1-24-37z" class="a" opacity=".8" />
      <circle cx="196" cy="86" r="42" class="d" />
      <circle cx="248" cy="86" r="42" class="d" />
      <path d="M196 44a42 42 0 0 0 0 84 42 42 0 0 0 0-84z" class="a" opacity=".35" />
      <circle cx="344" cy="86" r="42" class="d" />
      <circle cx="396" cy="86" r="42" class="d" />
      <path d="M344 44a42 42 0 0 0 0 84 42 42 0 0 0 0-84z" class="a" opacity=".35" />
      <path d="M396 44a42 42 0 0 1 0 84 42 42 0 0 1 0-84z" class="a" opacity=".35" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">LEFT</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">RIGHT</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">FULL</text></g>
    </g>
  </svg>

---

# LEFT, RIGHT и FULL JOIN

Как найти напитки, которые ни разу не заказывали, и не потерять клиентов без заказов?

`INNER JOIN` выбрасывает строки без пары. Но иногда нужны именно они: «покажи всех клиентов, даже если заказов нет» или «найди напиток, который ни разу не продался». Для этого есть внешние соединения: `LEFT JOIN`, `RIGHT JOIN` и `FULL JOIN`. Они сохраняют строки с одной или обеих сторон, а на месте отсутствующей пары ставят `NULL`.

## Как это работает

Представь два списка и соединительные линии. `LEFT JOIN` берёт **все** строки левого списка и пытается найти пару справа. Не нашёл — строка остаётся, а правые столбцы заполняются `NULL`. `RIGHT JOIN` делает то же самое, но сохраняет правый список. `FULL JOIN` сохраняет оба, даже если пары нет ни с одной стороны.

## Синтаксис

```sql
SELECT ...
FROM левая AS a
LEFT JOIN правая AS b ON b.ключ = a.ключ;

SELECT ...
FROM левая AS a
RIGHT JOIN правая AS b ON b.ключ = a.ключ;

SELECT ...
FROM левая AS a
FULL JOIN правая AS b ON b.ключ = a.ключ;
```

## Пример

Сколько раз заказывали каждый напиток, включая те, что не заказывали ни разу:

```sql
SELECT
    d.name,
    COUNT(oi.order_id) AS times_ordered
FROM drinks AS d
LEFT JOIN order_items AS oi ON oi.drink_id = d.id
GROUP BY d.name
ORDER BY times_ordered, d.name;
```

| name | times_ordered |
| --- | --- |
| Эспрессо | 0 |
| Капучино | 1 |
| Латте | 1 |
| Лимонад | 1 |
| Американо | 2 |
| Какао | 2 |
| Матча-латте | 2 |
| Чай с бергамотом | 4 |

`LEFT JOIN` сохранил Эспрессо, хотя у него нет ни одной позиции в заказах. `COUNT(oi.order_id)` считает именно найденные позиции, а не строки вообще: `COUNT(*)` вернул бы `1` даже для Эспрессо, потому что строка с `NULL` всё равно существует.

Найти только «сирот» можно так:

```sql
SELECT d.name
FROM drinks AS d
LEFT JOIN order_items AS oi ON oi.drink_id = d.id
WHERE oi.order_id IS NULL;
```

| name |
| --- |
| Эспрессо |

## Где какой JOIN

| Задача | JOIN |
| --- | --- |
| Только пары с обеих сторон | `INNER JOIN` |
| Все строки левой таблицы | `LEFT JOIN` |
| Все строки правой таблицы | `RIGHT JOIN` |
| Все строки с обеих сторон | `FULL JOIN` |
| Найти строки без пары | внешний `JOIN` + `IS NULL` |

`RIGHT JOIN` встречается реже: его почти всегда можно переписать как `LEFT JOIN`, поменяв таблицы местами. Это обычно читается лучше.

## Грабли

* **Фильтр по правой таблице в `WHERE` превращает `LEFT JOIN` в `INNER JOIN`.** Условие `WHERE oi.quantity > 1` отбросит строки с `NULL` и потеряет напитки без заказов. Фильтр по правой таблице, который должен сохранять левые строки, ставь в `ON`.
* **`COUNT(*)` вместо `COUNT(правая.колонка)`.** Для строк без пары `COUNT(*)` даст `1`, а не `0`.
* **`NULL` в результате — это не данные.** В отчёте его нужно либо отфильтровать, либо подписать через `COALESCE`.
* **`FULL JOIN` даёт много `NULL`.** Проверяй, с какой стороны действительно нет пары, иначе легко перепутать причину.
* **Дубли с обеих сторон.** Внешнее соединение не отменяет размножения строк, если справа несколько совпадений.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что вернёт `COUNT(*)` для напитка без заказов после `LEFT JOIN`?",
  "options": [
    { "text": "`0`", "correct": false, "explanation": "Это `COUNT(oi.order_id)`." },
    { "text": "`1`, потому что строка с `NULL` всё равно существует", "correct": true, "explanation": "`COUNT(*)` считает строки, а не найденные пары." },
    { "text": "`NULL`", "correct": false, "explanation": "`COUNT(*)` возвращает число." }
  ],
  "explanation": "Для подсчёта найденных пар используй `COUNT(колонка_из_правой_таблицы)`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про внешние соединения?",
  "options": [
    { "text": "`LEFT JOIN` сохраняет все строки левой таблицы.", "correct": true, "explanation": "Без пары правая часть заполняется `NULL`." },
    { "text": "`FULL JOIN` сохраняет строки с обеих сторон.", "correct": true, "explanation": "Даже если пары нет ни слева, ни справа." },
    { "text": "Фильтр по правой таблице в `WHERE` может превратить `LEFT JOIN` в `INNER JOIN`.", "correct": true, "explanation": "`NULL` не проходит условие, и строка без пары исчезает." },
    { "text": "`RIGHT JOIN` нельзя переписать через `LEFT JOIN`.", "correct": false, "explanation": "Можно, поменяв таблицы местами." }
  ],
  "explanation": "Внешние соединения нужны, когда важно сохранить строки без пары."
}
```