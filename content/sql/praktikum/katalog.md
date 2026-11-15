---
title: Каталог: фильтры, сортировка, пагинация
keywords: каталог sql, фильтры, сортировка, пагинация, limit offset, keyset, postgresql, практикум, кофейня
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / КАТАЛОГ</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <rect x="0" y="20" width="120" height="150" rx="10" class="d" />
      <rect x="140" y="20" width="120" height="150" rx="10" class="d" />
      <rect x="280" y="20" width="120" height="150" rx="10" class="a" opacity=".85" />
      <path d="M18 52h84M18 74h58M158 52h84M158 74h58M298 52h84M298 74h58" opacity=".5" />
      <path d="M18 126h50M158 126h50M298 126h50" class="sa" stroke-width="3" stroke-linecap="round" />
      <path d="M0 192h400" class="sa" stroke-width="2" opacity=".3" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">фильтры</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">сортировка</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">пагинация</text></g>
    </g>
  </svg>

---

# Каталог: фильтры, сортировка, пагинация

Как отдать клиенту меню с фильтрами, понятной сортировкой и быстрой пагинацией?

Каталог — самый частый запрос к базе. Пользователь хочет отфильтровать напитки по категории и цене, отсортировать по названию и листать страницами. Запрос должен быть быстрым и предсказуемым.

## Фильтры

```sql
SELECT id, name, category, price
FROM drinks
WHERE is_active
  AND category = 'кофе'
  AND price BETWEEN 200 AND 300
ORDER BY price, name;
```

Индексы:

```sql
CREATE INDEX idx_drinks_category_price
ON drinks (category, price);

CREATE INDEX idx_drinks_active
ON drinks (price)
WHERE is_active;
```

## Сортировка

```sql
ORDER BY category, price DESC, name
```

Правила:

- Всегда добавляй уникальный вторичный ключ, чтобы порядок был предсказуемым.
- При равных ценах сортируй по `name`, иначе пагинация может дублировать строки.

## Пагинация

```sql
SELECT id, name, price
FROM drinks
WHERE is_active
ORDER BY price, id
LIMIT 20 OFFSET 40;
```

`LIMIT` и `OFFSET` просты, но на больших `OFFSET` база всё равно читает предыдущие строки. Для ленты лучше keyset:

```sql
SELECT id, name, price
FROM drinks
WHERE is_active
  AND (price, id) > (300.00, 42)
ORDER BY price, id
LIMIT 20;
```

## Грабли

* **`OFFSET` на миллионах.** Чем дальше, тем медленнее.
* **Сортировка без уникального ключа.** Строки с равными значениями могут меняться местами.
* **Фильтр по функции.** `lower(name)` требует индекса по выражению.
* **`SELECT *`.** Тянет лишние столбцы.
* **Пагинация без `ORDER BY`.** Порядок строк не гарантирован.
* **Индекс не под тот фильтр.** Проверяй `EXPLAIN`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему для пагинации нужен уникальный ключ в `ORDER BY`?",
  "options": [
    { "text": "Чтобы порядок строк был предсказуемым при равных значениях", "correct": true, "explanation": "Иначе строки могут меняться местами." },
    { "text": "Чтобы ускорить `LIMIT`", "correct": false, "explanation": "Дело в стабильности, а не в скорости." },
    { "text": "Чтобы база создала индекс", "correct": false, "explanation": "Индекс создаётся отдельно." }
  ],
  "explanation": "Уникальный ключ делает сортировку детерминированной."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про каталог?",
  "options": [
    { "text": "Частичный индекс может ускорить поиск по активным напиткам.", "correct": true, "explanation": "Он меньше обычного." },
    { "text": "`OFFSET` на больших значениях может быть медленным.", "correct": true, "explanation": "База читает предыдущие строки." },
    { "text": "`ORDER BY` без уникального ключа может дать нестабильную пагинацию.", "correct": true, "explanation": "При равных значениях порядок не определён." },
    { "text": "`SELECT *` всегда лучше.", "correct": false, "explanation": "Он тянет лишние данные." }
  ],
  "explanation": "Каталог требует индексов под фильтры и стабильной сортировки."
}
```
