---
title: JSONB
keywords: jsonb, json, хранение json, операторы jsonb, ->, ->>, #>, @>, jsonb_path_query, gin, postgresql, гибкие данные
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / JSONB</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <path d="M0 58c18 0 18-22 36-22s18 22 36 22-18 22-36 22S18 58 0 58z" class="d" />
      <text x="18" y="64" class="mono a" font-size="16">{ }</text>
      <path d="M84 58h40" class="sa" stroke-width="2.5" />
      <rect x="140" y="30" width="76" height="30" rx="7" class="d" />
      <rect x="140" y="74" width="76" height="30" rx="7" class="d" />
      <text x="154" y="50" class="mono t" font-size="11">milk</text>
      <text x="154" y="94" class="mono t" font-size="11">size</text>
      <path d="M216 45h44M216 89h44" class="sa" stroke-width="2" />
      <text x="270" y="50" class="mono a" font-size="11">"oat"</text>
      <text x="270" y="94" class="mono a" font-size="11">"L"</text>
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">ключи</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">GIN</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">путь</text></g>
    </g>
  </svg>

---

# JSONB

Когда хранить данные в `JSONB`, а когда — в обычных столбцах, и как искать по вложенным полям?

`JSONB` хранит JSON в разобранном бинарном виде. Он поддерживает индексы, операторы доступа и поиск по вложенным структурам. Это удобно для неоднородных атрибутов, логов и внешних payload'ов, но не заменяет нормализованную схему.

## JSON и JSONB

| Тип | Особенность |
| --- | --- |
| `JSON` | хранит текст как есть, сохраняет порядок ключей и пробелы |
| `JSONB` | разбирает и оптимизирует, не сохраняет порядок и дубли ключей |

Для запросов почти всегда нужен `JSONB`.

## Синтаксис

```sql
CREATE TABLE drink_meta (
    drink_id BIGINT PRIMARY KEY REFERENCES drinks(id),
    attributes JSONB NOT NULL DEFAULT '{}'::jsonb
);

INSERT INTO drink_meta (drink_id, attributes)
VALUES
    (1, '{"size": "L", "milk": "oat", "sugar": 0}'),
    (2, '{"size": "M", "milk": "cow", "sugar": 2}');
```

## Операторы

| Оператор | Что делает | Пример |
| --- | --- | --- |
| `->` | достаёт JSON-значение | `attributes -> 'milk'` |
| `->>` | достаёт текст | `attributes ->> 'milk'` |
| `#>` | путь к JSON | `attributes #> '{a,b}'` |
| `#>>` | путь к тексту | `attributes #>> '{a,b}'` |
| `@>` | содержит | `attributes @> '{"size":"L"}'` |
| `?` | есть ключ | `attributes ? 'milk'` |

```sql
SELECT drink_id, attributes ->> 'milk' AS milk
FROM drink_meta
WHERE attributes @> '{"size": "L"}';
```

| drink_id | milk |
| --- | --- |
| 1 | oat |

## Индекс

```sql
CREATE INDEX idx_drink_meta_attributes
ON drink_meta USING GIN (attributes);
```

`GIN` ускоряет `@>`, `?` и поиск по ключам. Для конкретного поля можно построить expression-индекс:

```sql
CREATE INDEX idx_drink_meta_milk
ON drink_meta ((attributes ->> 'milk'));
```

## Когда использовать

- Неоднородные атрибуты: у одного напитка есть `milk`, у другого — `syrup`.
- Внешние payload'ы, которые не хочется раскладывать по столбцам.
- Быстрое прототипирование.
- Логи и события.

## Когда не использовать

- Данные участвуют в связях и ограничениях.
- Нужны частые агрегаты по полю.
- Схема стабильна и известна.
- Нужна строгая типизация.

## Грабли

* **`JSONB` не заменяет таблицы.** Связи, внешние ключи и `CHECK` работают хуже.
* **`->` возвращает JSON, `->>` текст.** Сравнение с числом требует приведения.
* **Индекс не помогает без подходящего оператора.** `GIN` по `attributes` не ускорит `attributes ->> 'milk' = 'oat'`; нужен expression-индекс.
* **Размер.** Большие JSON раздувают таблицу и замедляют чтение.
* **Отсутствие схемы.** Опечатка в ключе не будет ошибкой — просто не найдётся.
* **Обновление.** `jsonb_set` меняет документ целиком; частые правки дороги.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем `->>` отличается от `->`?",
  "options": [
    { "text": "`->>` возвращает текст, `->` — JSON-значение", "correct": true, "explanation": "Для сравнения со строкой обычно нужен `->>`." },
    { "text": "`->` работает только с массивами", "correct": false, "explanation": "Работает и с объектами." },
    { "text": "`->>` удаляет ключ", "correct": false, "explanation": "Он только читает." }
  ],
  "explanation": "Разница в типе результата важна для условий и индексов."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `JSONB`?",
  "options": [
    { "text": "Поддерживает `GIN`-индекс для поиска по документу.", "correct": true, "explanation": "Ускоряет `@>` и `?`." },
    { "text": "Не сохраняет порядок ключей и дубли.", "correct": true, "explanation": "Это отличие от `JSON`." },
    { "text": "Заменяет нормализованные таблицы в любой задаче.", "correct": false, "explanation": "Связи и ограничения лучше работают в таблицах." },
    { "text": "Expression-индекс может ускорить конкретное поле.", "correct": true, "explanation": "Например, `attributes ->> 'milk'`." }
  ],
  "explanation": "`JSONB` удобен для гибких данных, но не отменяет схему."
}
```
