---
title: EXPLAIN и EXPLAIN ANALYZE
keywords: explain sql, explain analyze, план запроса, seq scan, index scan, buffers, actual time, rows, postgresql, производительность
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / EXPLAIN</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <rect x="96" y="8" width="108" height="38" rx="8" class="a" opacity=".85" />
      <rect x="30" y="82" width="108" height="38" rx="8" class="d" />
      <rect x="162" y="82" width="108" height="38" rx="8" class="d" />
      <rect x="0" y="156" width="96" height="34" rx="8" class="d" />
      <rect x="112" y="156" width="96" height="34" rx="8" class="d" />
      <rect x="224" y="156" width="96" height="34" rx="8" class="d" />
      <path d="M150 46v18M150 64H84v18M150 64h84v18M84 120v18M84 138h48v18M252 120v18M252 138h-48v18" class="sa" stroke-width="2" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">план</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">cost</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">actual</text></g>
    </g>
  </svg>

---

# EXPLAIN и EXPLAIN ANALYZE

Как понять, что база на самом деле делает с запросом, а не что ты думаешь?

`EXPLAIN` показывает план выполнения: какие таблицы читаются, какие индексы используются, сколько строк ожидается. `EXPLAIN ANALYZE` выполняет запрос и добавляет фактические время и количество строк. Это главный инструмент оптимизации: без плана любая правка — угадывание.

## Синтаксис

```sql
EXPLAIN
SELECT ...;

EXPLAIN ANALYZE
SELECT ...;

EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT ...;
```

`ANALYZE` действительно выполняет запрос. Для `UPDATE` или `DELETE` это изменит данные, поэтому оборачивай в транзакцию с `ROLLBACK`:

```sql
BEGIN;
EXPLAIN ANALYZE DELETE FROM orders WHERE status = 'cancelled';
ROLLBACK;
```

## Как читать план

```text
Limit  (cost=0.29..8.31 rows=10 width=20) (actual time=0.020..0.035 rows=10 loops=1)
  ->  Index Scan using idx_drinks_price on drinks
        (cost=0.29..800.00 rows=1000 width=20)
        (actual time=0.018..0.030 rows=10 loops=1)
        Filter: (is_active = true)
        Rows Removed by Filter: 2
Planning Time: 0.100 ms
Execution Time: 0.060 ms
```

| Поле | Значение |
| --- | --- |
| `cost` | оценка стоимости, не время |
| `rows` | ожидаемое число строк |
| `actual time` | фактическое время до первой и последней строки |
| `loops` | сколько раз выполнялся узел |
| `Rows Removed by Filter` | сколько строк отброшено после чтения |
| `Buffers` | чтение из кэша и с диска |

Читай план снизу вверх: внутренние узлы выполняются первыми. Ищи узлы с большим `actual time` и большим расхождением `rows` с `actual rows`.

## Красные флаги

- `Seq Scan` на большой таблице при селективном условии.
- `actual rows` сильно меньше или больше `rows` — устаревшая статистика.
- `Rows Removed by Filter` огромно — индекс не покрывает условие.
- `Nested Loop` с большим `loops` — возможен `N+1`-подобный эффект.
- `Sort` с `external merge Disk` — сортировка не влезает в память.

## Грабли

* **`EXPLAIN` без `ANALYZE` показывает оценку, а не факт.** Оценка может врать.
* **`EXPLAIN ANALYZE` меняет данные.** Для `DML` — только в транзакции с откатом.
* **Смотреть только на `Execution Time`.** Важны узлы и их вклад.
* **Запуск на маленькой таблице.** План на тестовых данных не равен продакшену.
* **Кэш.** Первый запуск читает с диска, последующие — из памяти. `BUFFERS` помогает понять.
* **Формат.** `FORMAT JSON` удобен для инструментов, текстовый — для чтения глазами.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем `EXPLAIN ANALYZE` отличается от `EXPLAIN`?",
  "options": [
    { "text": "Он выполняет запрос и показывает фактические данные", "correct": true, "explanation": "Появляются `actual time` и `actual rows`." },
    { "text": "Он только оценивает стоимость", "correct": false, "explanation": "Это обычный `EXPLAIN`." },
    { "text": "Он создаёт индекс", "correct": false, "explanation": "Для этого есть `CREATE INDEX`." }
  ],
  "explanation": "`ANALYZE` добавляет фактические измерения."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно смотреть в плане?",
  "options": [
    { "text": "Расхождение ожидаемых и фактических строк.", "correct": true, "explanation": "Это признак плохой статистики." },
    { "text": "Узлы с большим `actual time`.", "correct": true, "explanation": "Они тормозят запрос." },
    { "text": "`Rows Removed by Filter`.", "correct": true, "explanation": "Большое значение говорит о неэффективном условии." },
    { "text": "Только `cost` первого узла.", "correct": false, "explanation": "Стоимость — оценка, а не факт." }
  ],
  "explanation": "План читают по узлам и фактическим метрикам, а не по одной цифре."
}
```
