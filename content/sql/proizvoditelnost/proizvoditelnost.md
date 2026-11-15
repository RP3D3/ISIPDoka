---
title: Индексы и производительность
keywords: индексы sql, производительность, b-tree, explain, план запроса, n+1, материализованные представления, postgresql, оптимизация
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
    <text x="40" y="54" class="mono t" font-size="13" opacity=".55">SQL / 09</text>
    <text x="40" y="86" class="t" font-size="22" font-weight="700">ИНДЕКСЫ</text>
    <g transform="translate(280 30)"><g class="st" stroke-width="2.2">
      <path d="M26 150a96 96 0 0 1 192 0" class="d" />
      <path d="M50 150a72 72 0 0 1 144 0" opacity=".5" />
      <path d="M122 150l44-54" class="sa" stroke-width="6" stroke-linecap="round" />
      <circle cx="122" cy="150" r="10" class="a" />
      <path d="M70 120l-10-10M174 120l10-10M122 96V82" class="sa" stroke-width="3" />
      <path d="M244 52v88M244 52h44M244 96h32M244 140h44" class="sa" stroke-width="2.5" />
      <circle cx="244" cy="52" r="5" class="a" />
      <circle cx="288" cy="52" r="5" class="a" />
      <circle cx="276" cy="96" r="5" class="a" />
      <circle cx="288" cy="140" r="5" class="a" />
    </g></g>
    <path d="M250 158h44" class="sa flow" stroke-width="3" stroke-linecap="round" />
    <g transform="translate(620 196)">
      <g transform="translate(0 0)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">B-TREE</text></g><g transform="translate(0 26)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">EXPLAIN</text></g><g transform="translate(0 52)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">N+1</text></g>
    </g>
  </svg>

---

# Индексы и производительность

Почему один и тот же запрос сегодня летает, а завтра читает миллион строк, и как понять, что именно тормозит?

Производительность SQL — это не «добавить индекс везде». Это понимание того, как база ищет строки, какие структуры ей помогают, а какие мешают. Индекс ускоряет чтение, но замедляет запись и занимает место. План запроса показывает, что база реально делает, а не что ты предполагал.

## Отчёт, который стал медленным

Владелец просит выручку по дням за месяц. Сначала данных мало, и запрос мгновенный. Через год `orders` выросла до миллиона строк, и отчёт стал занимать секунды:

```sql
SELECT created_at::date AS day, SUM(total) AS revenue
FROM orders
WHERE status IN ('paid', 'done')
GROUP BY created_at::date
ORDER BY day;
```

Причины могут быть разными: нет индекса по `status`, функция `created_at::date` мешает индексу, или приложение делает сто отдельных запросов вместо одного. Гадать бесполезно — нужен `EXPLAIN`.

## Что разберём

Сначала — как база ищет строки: последовательное чтение, индекс, стоимость. Потом — `B-tree`, составные индексы и их порядок. Разберём частичные, уникальные и expression-индексы. Дальше — `EXPLAIN` и `EXPLAIN ANALYZE`, почему индекс не используется и что такое `N+1`. В конце — материализованные представления и практика: ускоряем отчёт кофейни.

Главная мысль группы: сначала измерь, потом оптимизируй. Индекс — инструмент под конкретный запрос, а не универсальная кнопка «сделать быстро».

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что показывает `EXPLAIN ANALYZE`?",
  "options": [
    { "text": "План запроса и фактическое время выполнения", "correct": true, "explanation": "Он выполняет запрос и собирает статистику." },
    { "text": "Только структуру таблицы", "correct": false, "explanation": "Для этого есть `\\d` в `psql`." },
    { "text": "Список всех индексов", "correct": false, "explanation": "Это `\\di` или `pg_indexes`." }
  ],
  "explanation": "`EXPLAIN ANALYZE` — основной инструмент поиска медленных мест."
}
```
