---
title: Выборка: WHERE, ORDER BY, LIMIT
keywords: выборка данных, where, order by, limit, offset, фильтрация, сортировка, пагинация, операторы сравнения, like, in, between, практика sql
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
    <text x="40" y="54" class="mono t" font-size="13" opacity=".55">SQL / 02</text>
    <text x="40" y="86" class="t" font-size="22" font-weight="700">ВЫБОРКА</text>
    <g transform="translate(280 30)"><g class="st" stroke-width="2.4">
      <path d="M20 20h190l-70 82v62l-50 24v-86z" class="d" />
      <path d="M56 44h118" opacity=".5" />
      <rect x="238" y="28" width="52" height="34" rx="8" class="d" />
      <rect x="238" y="76" width="52" height="34" rx="8" class="d" />
      <rect x="238" y="124" width="52" height="34" rx="8" class="a" opacity=".85" />
      <path d="M252 45h24M252 93h24M252 141h24" class="sa" stroke-width="3" stroke-linecap="round" />
    </g></g>
    <path d="M250 158h44" class="sa flow" stroke-width="3" stroke-linecap="round" />
    <g transform="translate(620 196)">
      <g transform="translate(0 0)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">WHERE</text></g><g transform="translate(0 26)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">ORDER BY</text></g><g transform="translate(0 52)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">LIMIT</text></g>
    </g>
  </svg>

---

# Выборка: WHERE, ORDER BY, LIMIT

Как из тысячи заказов достать ровно те десять, которые нужны, и расположить их в понятном порядке?

`SELECT` умеет показать таблицу, но обычно нужна не вся таблица, а ответ на конкретный вопрос: «какие напитки дешевле 300 рублей», «последние пять заказов», «клиенты из Москвы». Для этого у запроса есть три рычага: `WHERE` отбирает строки, `ORDER BY` задаёт порядок, `LIMIT` обрезает результат. Освоив их, ты перестаёшь выгружать всё подряд и начинаешь задавать базе точные вопросы.

## Кофейня и лишние строки

В кофейне «Зерно» меню выросло до сотни напитков. Бариста просит показать «все активные напитки дешевле 300 рублей, начиная с самого дешёвого». Если открыть таблицу целиком, придётся листать глазами: часть напитков снята с продажи, часть дороже, а порядок строк вообще случаен.

Запрос делает эту работу за секунду:

```sql
SELECT name, price
FROM drinks
WHERE is_active = true AND price < 300
ORDER BY price
LIMIT 10;
```

| name | price |
| --- | --- |
| Чай с бергамотом | 190.00 |
| Американо | 220.00 |
| Лимонад | 240.00 |
| Какао | 260.00 |
| Капучино | 280.00 |

Каждый рычаг отвечает за своё: `WHERE` выбросил неактивные и дорогие строки, `ORDER BY` поставил дешёвые вперёд, `LIMIT` не дал результату разрастись. Вместе они превращают таблицу в ответ.

## Что разберём

Сначала — `WHERE` и логика условий: как комбинировать проверки, почему `NULL` ломает привычные сравнения и зачем нужны скобки. Потом — диапазоны, списки и шаблоны: `BETWEEN`, `IN`, `LIKE`. Дальше — `ORDER BY` с несколькими ключами и `NULL`, `LIMIT` с `OFFSET` и честная пагинация без дублей. Затем — `DISTINCT`, выражения с `CAST` и псевдонимами, `CASE`, даты и текстовые функции. В конце — десять реальных запросов к кофейне, где всё это собирается вместе.

Главная мысль группы: запрос — это не «покажи таблицу», а точный вопрос. Чем лучше сформулирован вопрос, тем меньше данных едет по сети и тем проще проверить ответ.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какая часть запроса отвечает за порядок строк в результате?",
  "options": [
    { "text": "`WHERE`", "correct": false, "explanation": "`WHERE` отбирает строки, но не сортирует их." },
    { "text": "`ORDER BY`", "correct": true, "explanation": "Только `ORDER BY` гарантирует порядок." },
    { "text": "`LIMIT`", "correct": false, "explanation": "`LIMIT` обрезает результат, а не упорядочивает." }
  ],
  "explanation": "Без `ORDER BY` база вправе вернуть строки в любом порядке."
}
```
