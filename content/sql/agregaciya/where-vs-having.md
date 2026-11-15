---
title: WHERE против HAVING
keywords: where и having, фильтрация групп, агрегаты, group by, having sql, псевдонимы, postgresql, отчёты, ошибки новичка
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / WHERE / HAVING</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <rect x="0" y="26" width="250" height="48" rx="9" class="d" />
      <rect x="0" y="94" width="250" height="48" rx="9" class="d" />
      <path d="M18 50h50M18 118h50" class="sa" stroke-width="3" />
      <path d="M266 50h44M266 118h44" class="sa" stroke-width="2.5" stroke-dasharray="5 6" />
      <circle cx="334" cy="50" r="14" class="a" opacity=".8" />
      <circle cx="334" cy="118" r="14" class="a" opacity=".4" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">до</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">после</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">агрегат</text></g>
    </g>
  </svg>

---

# WHERE против HAVING

Почему фильтр по цене пишется в `WHERE`, а фильтр по количеству заказов — в `HAVING`, и что будет, если перепутать?

`WHERE` отбирает строки **до** группировки. `HAVING` отбирает группы **после** того, как агрегаты уже посчитаны. Это не два взаимозаменяемых фильтра, а два разных этапа: сначала база решает, какие строки вообще участвуют, потом считает итоги, потом решает, какие группы оставить.

## Как это работает

Представь отбор в два этапа. Сначала охранник на входе проверяет каждого гостя: «ты вообще проходишь?» — это `WHERE`. Потом менеджер смотрит на уже собранные группы: «в этой группе слишком мало людей, не показываем» — это `HAVING`.

Если поставить условие не на тот этап, база либо не выполнит запрос, либо посчитает не то. Например, `WHERE COUNT(*) > 2` невозможно: на момент фильтрации агрегата ещё нет.

## Синтаксис

```sql
SELECT столбец_группы, агрегат(столбец)
FROM таблица
WHERE условие_для_строк
GROUP BY столбец_группы
HAVING условие_для_групп
ORDER BY столбец_группы;
```

| Место | Что фильтрует | Когда выполняется |
| --- | --- | --- |
| `WHERE` | отдельные строки | до `GROUP BY` |
| `HAVING` | готовые группы | после `GROUP BY` |

## Пример

Средняя цена активных напитков по категориям, но только там, где средняя выше 250:

```sql
SELECT
    category,
    COUNT(*) AS drinks_count,
    ROUND(AVG(price), 2) AS avg_price
FROM drinks
WHERE is_active
GROUP BY category
HAVING AVG(price) > 250
ORDER BY category;
```

| category | drinks_count | avg_price |
| --- | --- | --- |
| кофе | 3 | 270.00 |
| чай | 2 | 255.00 |

`WHERE is_active` выбросил снятый с продажи эспрессо до группировки. `HAVING AVG(price) > 250` убрал категорию «напиток» со средней 250: условие строгое, 250 не больше 250.

## Где какой фильтр уместен

* **Обычный столбец** — в `WHERE`: `WHERE category = 'кофе'`. Это дешевле, потому что строк становится меньше до группировки.
* **Агрегат** — в `HAVING`: `HAVING COUNT(*) >= 2`.
* **Псевдоним агрегата** — в PostgreSQL можно в `HAVING`, но не в `WHERE`.
* **Фильтр по групповому столбцу** — формально можно и там, и там, но `WHERE` эффективнее.

## Грабли

* **`WHERE COUNT(*)` — ошибка.** Агрегаты в `WHERE` запрещены: группы ещё не собраны.
* **`HAVING` вместо `WHERE` для обычного столбца.** Запрос сработает, но база сначала сгруппирует лишние строки, а потом отбросит группы. Медленнее и менее понятно.
* **Псевдоним в `WHERE`.** `WHERE avg_price > 250` не сработает: псевдоним появляется после `SELECT`. В `HAVING` в PostgreSQL — можно.
* **`HAVING` без `GROUP BY`.** Технически допустим: тогда вся таблица — одна группа. Но читать такой запрос тяжело; лучше явно добавить `GROUP BY`.
* **Логика `NULL`.** `HAVING AVG(price) > 250` не пропустит группу, где средняя `NULL`: сравнение даст `unknown`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где должен стоять фильтр `COUNT(*) >= 2`?",
  "options": [
    { "text": "В `WHERE`", "correct": false, "explanation": "На момент `WHERE` агрегат ещё не посчитан." },
    { "text": "В `HAVING`", "correct": true, "explanation": "`HAVING` фильтрует уже собранные группы." },
    { "text": "В `ORDER BY`", "correct": false, "explanation": "`ORDER BY` сортирует, а не фильтрует." }
  ],
  "explanation": "Фильтр по агрегату — всегда `HAVING`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `WHERE` и `HAVING`?",
  "options": [
    { "text": "`WHERE` выполняется до группировки.", "correct": true, "explanation": "Он сокращает число строк до работы агрегатов." },
    { "text": "`HAVING` может фильтровать по агрегату.", "correct": true, "explanation": "Например, `HAVING SUM(total) > 1000`." },
    { "text": "Обычный фильтр по категории лучше ставить в `HAVING`.", "correct": false, "explanation": "Эффективнее `WHERE`: меньше строк попадёт в группировку." },
    { "text": "`WHERE` не видит псевдонимы из `SELECT`.", "correct": true, "explanation": "`WHERE` выполняется раньше `SELECT`." }
  ],
  "explanation": "Сначала фильтруем строки, потом группируем, потом фильтруем группы."
}
```