---
title: 3НФ
keywords: третья нормальная форма, 3нф, транзитивная зависимость, нормализация, справочники, категории, postgresql, проектирование
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / 3НФ</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <rect x="0" y="52" width="100" height="52" rx="8" class="d" />
      <text x="14" y="83" class="mono t" font-size="11">drinks</text>
      <rect x="150" y="18" width="110" height="48" rx="8" class="a" opacity=".85" />
      <text x="164" y="47" class="mono d" font-size="11">category_id</text>
      <rect x="150" y="94" width="110" height="48" rx="8" class="d" />
      <text x="164" y="123" class="mono t" font-size="11">price</text>
      <path d="M100 78h50M260 42h40M260 118h40" class="sa" stroke-width="2.5" />
      <rect x="310" y="18" width="90" height="48" rx="8" class="d" />
      <text x="324" y="47" class="mono t" font-size="11">categories</text>
      <path d="M330 118h50" class="sa" stroke-width="2" stroke-dasharray="5 5" opacity=".4" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">справочник</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">дубли</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">JOIN</text></g>
    </g>
  </svg>

---

# 3НФ

Почему название категории не должно храниться в каждой строке напитка, даже если так удобнее читать?

Третья нормальная форма запрещает транзитивные зависимости: неключевой столбец не должен зависеть от другого неключевого столбца. Если `category_name` зависит от `category_id`, а `category_id` — от `id` напитка, то `category_name` зависит от `id` через `category_id`. Это цепочка, которую нужно разорвать.

## Плохая схема

```sql
CREATE TABLE drinks_bad (
    id BIGINT PRIMARY KEY,
    name TEXT,
    category_id BIGINT,
    category_name TEXT,     -- зависит от category_id
    category_color TEXT     -- тоже
);
```

| id | name | category_id | category_name | category_color |
| --- | --- | --- | --- | --- |
| 1 | Латте | 1 | кофе | коричневый |
| 2 | Капучино | 1 | кофе | коричневый |
| 3 | Матча | 2 | чай | зелёный |

Название и цвет категории повторяются. Если переименовать категорию, придётся обновить все строки, а часть может остаться старой.

## Хорошая схема

```sql
CREATE TABLE categories (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    color TEXT
);

CREATE TABLE drinks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    category_id BIGINT NOT NULL REFERENCES categories(id),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true
);
```

Теперь категория хранится один раз. Название и цвет меняются в одном месте.

## Проверка

Спроси: «Зависит ли этот столбец от другого неключевого столбца?»

- `category_name` зависит от `category_id` → выноси.
- `category_color` зависит от `category_id` → выноси.
- `price` зависит от напитка → оставляй.
- `is_active` зависит от напитка → оставляй.

## Пример запроса

```sql
SELECT d.name, c.name AS category, d.price
FROM drinks AS d
JOIN categories AS c ON c.id = d.category_id
WHERE d.is_active
ORDER BY c.name, d.price;
```

Соединение добавляет один `JOIN`, но убирает дубли и противоречия.

## Грабли

* **Справочники в основной таблице.** Названия категорий, статусов и городов повторяются.
* **Обновление в одном месте.** После переименования часть строк остаётся со старым значением.
* **Путать 3НФ с запретом любых дублей.** Дубли фактов допустимы, дубли зависимых атрибутов — нет.
* **Слишком много таблиц.** Не каждое поле нужно выносить; только зависимые атрибуты.
* **Денормализация без причины.** Иногда дублируют осознанно для отчётов, но это решение, а не случайность.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что нарушает 3НФ?",
  "options": [
    { "text": "`category_name` в таблице `drinks`, зависящий от `category_id`", "correct": true, "explanation": "Это транзитивная зависимость." },
    { "text": "`price` в таблице `drinks`", "correct": false, "explanation": "Цена зависит от напитка." },
    { "text": "`quantity` в `order_items`", "correct": false, "explanation": "Количество зависит от позиции." }
  ],
  "explanation": "3НФ убирает зависимость неключевых столбцов друг от друга."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про 3НФ?",
  "options": [
    { "text": "Справочники выносятся в отдельные таблицы.", "correct": true, "explanation": "Категории, статусы, города." },
    { "text": "Название категории хранится один раз.", "correct": true, "explanation": "Это убирает дубли." },
    { "text": "Любой дубль значения нарушает 3НФ.", "correct": false, "explanation": "Важна зависимость, а не само повторение." },
    { "text": "3НФ может добавить `JOIN` в запросы.", "correct": true, "explanation": "Это цена нормализации." }
  ],
  "explanation": "3НФ разрывает цепочки зависимостей между неключевыми столбцами."
}
```
