---
title: Оконные функции: зачем
keywords: оконные функции sql, over, partition by, window functions, avg over, сравнение со средней, postgresql, аналитика, group by
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / WINDOW</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <rect x="0" y="18" width="300" height="34" rx="7" class="d" opacity=".55" />
      <rect x="0" y="58" width="300" height="34" rx="7" class="d" opacity=".75" />
      <rect x="0" y="98" width="300" height="34" rx="7" class="a" opacity=".85" />
      <rect x="0" y="138" width="300" height="34" rx="7" class="d" opacity=".55" />
      <path d="M314 58v114" class="sa" stroke-width="3" />
      <path d="M306 58h16M306 172h16" class="sa" stroke-width="3" />
      <path d="M326 96h32M326 112h24" class="sa" stroke-width="2" opacity=".6" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">OVER</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">PARTITION</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">рамка</text></g>
    </g>
  </svg>

---

# Оконные функции: зачем

Как показать каждый напиток и рядом с ним среднюю цену его категории, не схлопывая строки?

Оконная функция считает значение по группе строк, но оставляет каждую строку на месте. `GROUP BY` сворачивает группу в одну строку, а окно добавляет к каждой строке контекст: среднюю по категории, ранг внутри группы, накопительную сумму. Это ключевой инструмент аналитики.

## Как это работает

Представь класс с оценками. `GROUP BY` ответит: «средний балл класса — 4.2». Оконная функция ответит: «средний балл класса — 4.2, а у Пети — 4.5, у Маши — 3.8». Строки остаются, но рядом появляется общая цифра.

## Синтаксис

```sql
функция(...) OVER (
    PARTITION BY столбец
    ORDER BY столбец
)
```

| Часть | Что делает |
| --- | --- |
| `OVER` | включает оконный режим |
| `PARTITION BY` | делит строки на группы |
| `ORDER BY` | задаёт порядок внутри окна |
| рамка | ограничивает строки окна (например, скользящее среднее) |

`PARTITION BY` необязателен: без него окно — вся таблица.

## Пример

Сравним цену напитка со средней по категории:

```sql
SELECT
    name,
    category,
    price,
    ROUND(AVG(price) OVER (PARTITION BY category), 2) AS avg_category_price,
    price - AVG(price) OVER (PARTITION BY category) AS diff
FROM drinks
WHERE is_active
ORDER BY category, price;
```

| name | category | price | avg_category_price | diff |
| --- | --- | --- | --- | --- |
| Американо | кофе | 220.00 | 270.00 | -50.00 |
| Капучино | кофе | 280.00 | 270.00 | 10.00 |
| Латте | кофе | 310.00 | 270.00 | 40.00 |
| Лимонад | напиток | 240.00 | 250.00 | -10.00 |
| Какао | напиток | 260.00 | 250.00 | 10.00 |
| Чай с бергамотом | чай | 190.00 | 255.00 | -65.00 |
| Матча-латте | чай | 320.00 | 255.00 | 65.00 |

Каждая строка осталась, но получила среднюю по своей категории.

## GROUP BY или окно

| Вопрос | Инструмент |
| --- | --- |
| «Сколько в среднем по категории?» | `GROUP BY` |
| «Каждый напиток и средняя по категории» | окно |
| «Топ-1 в категории» | окно + фильтр по номеру |
| «Доля строки в общей сумме» | окно |

## Грабли

* **Оконную функцию нельзя в `WHERE`.** Она вычисляется после `WHERE` и `GROUP BY`. Нужен подзапрос или `CTE`, а фильтр — снаружи.
* **`ORDER BY` внутри `OVER` меняет рамку.** Для `SUM` это включает накопительный итог. Если нужна сумма по всей группе, не указывай `ORDER BY` или задай рамку явно.
* **`PARTITION BY` не сортирует результат.** Он только делит строки на окна. Для порядка нужен внешний `ORDER BY`.
* **Окно не заменяет `GROUP BY`.** Оно не уменьшает число строк.
* **Дубли имён.** Псевдоним оконного столбца не виден в том же `SELECT`; оборачивай в подзапрос.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем окно отличается от `GROUP BY`?",
  "options": [
    { "text": "Окно сохраняет все строки и добавляет вычисленное значение", "correct": true, "explanation": "`GROUP BY` сворачивает строки в группы." },
    { "text": "Окно всегда быстрее", "correct": false, "explanation": "Скорость зависит от запроса и данных." },
    { "text": "Окно работает только с `COUNT`", "correct": false, "explanation": "Можно использовать `SUM`, `AVG`, `RANK` и другие." }
  ],
  "explanation": "Окно — это контекст для каждой строки, а не группировка."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про оконные функции?",
  "options": [
    { "text": "`PARTITION BY` делит строки на независимые окна.", "correct": true, "explanation": "Например, по категориям." },
    { "text": "`ORDER BY` внутри `OVER` задаёт порядок вычисления.", "correct": true, "explanation": "Он также влияет на рамку." },
    { "text": "Оконную функцию можно использовать в `WHERE` без подзапроса.", "correct": false, "explanation": "Она вычисляется позже `WHERE`." },
    { "text": "Окно может считать среднее, сумму и ранг.", "correct": true, "explanation": "Это основные сценарии." }
  ],
  "explanation": "Оконные функции добавляют контекст, не меняя количество строк."
}
```