---
title: Агрегация и GROUP BY
keywords: агрегация sql, group by, count, sum, avg, min, max, having, rollup, отчёты, postgresql, кофейня
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
    <text x="40" y="54" class="mono t" font-size="13" opacity=".55">SQL / 03</text>
    <text x="40" y="86" class="t" font-size="22" font-weight="700">АГРЕГАЦИЯ</text>
    <g transform="translate(280 30)"><g class="st" stroke-width="2.2">
      <circle cx="30" cy="30" r="12" class="a" opacity=".8" />
      <circle cx="70" cy="30" r="12" class="a" opacity=".8" />
      <circle cx="110" cy="30" r="12" class="a" opacity=".8" />
      <circle cx="30" cy="70" r="12" class="a" opacity=".8" />
      <circle cx="70" cy="70" r="12" class="a" opacity=".8" />
      <circle cx="110" cy="70" r="12" class="a" opacity=".8" />
      <path d="M146 52h48" class="sa flow" stroke-width="3" />
      <rect x="210" y="18" width="70" height="42" rx="10" class="d" />
      <rect x="210" y="76" width="70" height="42" rx="10" class="d" />
      <rect x="210" y="134" width="70" height="42" rx="10" class="d" />
      <path d="M228 40h34M228 98h34M228 156h34" class="sa" stroke-width="3" stroke-linecap="round" />
    </g></g>
    <path d="M250 158h44" class="sa flow" stroke-width="3" stroke-linecap="round" />
    <g transform="translate(620 196)">
      <g transform="translate(0 0)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">GROUP BY</text></g><g transform="translate(0 26)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">SUM / AVG</text></g><g transform="translate(0 52)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">HAVING</text></g>
    </g>
  </svg>

---

# Агрегация и GROUP BY

Как из сотни строк получить один ответ: сколько заказов, какая выручка и какой средний чек?

Пока что мы умели только показывать строки. Но владельцу кофейни не нужны все 128 заказов по отдельности — ему нужен ответ: «сколько заработали за день», «какой напиток продаётся лучше», «какой средний чек». Для этого есть агрегатные функции: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`. Они сворачивают много строк в одно число, а `GROUP BY` позволяет сделать это не для всей таблицы, а для каждой группы отдельно.

## Кофейня считает день

В конце дня владелец спрашивает: «Сколько заказов и какая выручка?» Без агрегатов пришлось бы выгружать все строки и считать вручную. С агрегатами — один запрос:

```sql
SELECT COUNT(*) AS orders_count, SUM(total) AS revenue
FROM orders
WHERE status IN ('paid', 'done');
```

| orders_count | revenue |
| --- | --- |
| 7 | 3040.00 |

Один запрос — и уже не важно, 7 заказов или 7000: база сама пройдёт по строкам и вернёт итог.

## Что разберём

Сначала — каждая агрегатная функция по отдельности и то, как они обращаются с `NULL`. Потом — `GROUP BY`: как собрать строки в группы по статусу, категории или клиенту. Разберём разницу между `WHERE` и `HAVING`, многоуровневую группировку и `ROLLUP`. Отдельно — деньги и `NUMERIC`, потому что `SUM` по цене — самое частое место, где новичок теряет копейки. В конце — готовые отчёты кофейни и практика.

Главная мысль группы: агрегация — это переход от строк к смыслу. Ты перестаёшь смотреть на отдельные заказы и начинаешь видеть тенденции: какая категория приносит больше денег, в какое время дня больше заказов, кто из клиентов ходит чаще.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `GROUP BY`?",
  "options": [
    { "text": "Сортирует строки по возрастанию", "correct": false, "explanation": "Для сортировки нужен `ORDER BY`." },
    { "text": "Собирает строки в группы для агрегатов", "correct": true, "explanation": "Агрегат считается отдельно по каждой группе." },
    { "text": "Ограничивает число строк", "correct": false, "explanation": "Это делает `LIMIT`." }
  ],
  "explanation": "`GROUP BY` делит строки на группы, а `ORDER BY` сортирует результат."
}
```
