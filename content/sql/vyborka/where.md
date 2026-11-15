---
title: WHERE
keywords: where sql, фильтрация строк, операторы сравнения, and or not, логические выражения, null в where, приоритет операторов, postgresql, выборка данных
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / WHERE</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <path d="M0 18h240l-82 92v78l-76 34v-112z" class="d" />
      <path d="M38 44h164M62 70h116" opacity=".5" />
      <circle cx="302" cy="52" r="10" class="a" opacity=".9" />
      <circle cx="342" cy="52" r="10" class="a" opacity=".65" />
      <circle cx="302" cy="94" r="10" class="a" opacity=".35" />
      <circle cx="342" cy="94" r="10" class="a" opacity=".2" />
      <path d="M246 52h34M246 94h34" class="sa" stroke-width="2" opacity=".5" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">фильтр</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">строки</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">условие</text></g>
    </g>
  </svg>

---

# WHERE

Как из всех напитков выбрать только те, что дешевле 300 рублей и ещё продаются?

`WHERE` — фильтр строк. База берёт каждую строку таблицы, подставляет её значения в условие и оставляет только те, где условие истинно. Всё остальное отбрасывается ещё до сортировки и ограничения: дальше по запросу идут уже отобранные строки.

## Как это работает

Представь охранника на входе. У него список правил: «пропускать только совершеннолетних» или «только по списку». `WHERE` — это тот же охранник: строка либо проходит, либо нет. Причём проверка идёт по каждой строке отдельно, а не по всей таблице сразу.

Условие — это выражение, которое возвращает `true`, `false` или `unknown`. Проходят только строки с `true`. Если сравнение дало `false` или `unknown`, строка не попадёт в результат. Именно поэтому `WHERE price = NULL` не находит ничего: сравнение с `NULL` даёт `unknown`.

## Синтаксис

```sql
SELECT столбцы
FROM таблица
WHERE условие;
```

В условии можно использовать:

| Оператор | Значение | Пример |
| --- | --- | --- |
| `=` | равно | `category = 'кофе'` |
| `<>` или `!=` | не равно | `status <> 'cancelled'` |
| `>` `<` `>=` `<=` | сравнение | `price >= 250` |
| `AND` | и то, и другое | `price < 300 AND is_active` |
| `OR` | хотя бы одно | `category = 'чай' OR category = 'кофе'` |
| `NOT` | отрицание | `NOT is_active` |
| `IS NULL` | проверка на пусто | `email IS NULL` |

## Пример

Нужны активные напитки дешевле 300 рублей:

```sql
SELECT name, category, price
FROM drinks
WHERE price < 300
  AND is_active = true
ORDER BY price;
```

| name | category | price |
| --- | --- | --- |
| Чай с бергамотом | чай | 190.00 |
| Американо | кофе | 220.00 |
| Лимонад | напиток | 240.00 |
| Какао | напиток | 260.00 |
| Капучино | кофе | 280.00 |

`Эспрессо` стоит 180 рублей, но снят с продажи — условие `is_active = true` его отбросило. `Латте` и `Матча-латте` дороже 300 — их отбросило первое условие.

## Скобки решают

`AND` выполняется раньше `OR`, как умножение раньше сложения. Поэтому условие

```sql
WHERE category = 'чай' OR category = 'кофе' AND price < 300
```

читается как «чай любой ценой **или** (кофе дешевле 300)». Если нужны «чай или кофе, но дешевле 300», ставь скобки:

```sql
WHERE (category = 'чай' OR category = 'кофе')
  AND price < 300
```

## Грабли

* **`= NULL` не работает.** Любое сравнение с `NULL` даёт `unknown`, и строка не проходит. Для пустых значений — `IS NULL` и `IS NOT NULL`.
* **Забытые скобки.** Смесь `AND` и `OR` без скобок почти всегда читается не так, как задумано. Если сомневаешься — ставь скобки, даже если они «лишние».
* **Псевдоним из `SELECT` не виден.** `WHERE` выполняется раньше `SELECT`, поэтому `WHERE double_price > 500` для псевдонима не сработает. Повтори выражение или оберни запрос в подзапрос.
* **Сравнение текста чувствительно к регистру.** `'Кофе'` и `'кофе'` — разные строки. Для регистронезависимого поиска есть `ILIKE` и `lower()`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему `WHERE price = NULL` не находит ни одной строки?",
  "options": [
    { "text": "Потому что в таблице нет пустых цен", "correct": false, "explanation": "Дело не в данных: сравнение с `NULL` всегда даёт `unknown`." },
    { "text": "Потому что сравнение с `NULL` даёт `unknown`, а не `true`", "correct": true, "explanation": "`WHERE` пропускает только строки, где условие истинно." },
    { "text": "Потому что `NULL` нужно писать в кавычках", "correct": false, "explanation": "`'NULL'` — это обычная строка, а не пустое значение." }
  ],
  "explanation": "Для проверки на отсутствие значения используют `IS NULL`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Какие условия оставят напиток «Латте» (категория `кофе`, цена `310`, активен)?",
  "options": [
    { "text": "`price > 300 AND is_active`", "correct": true, "explanation": "Оба условия истинны." },
    { "text": "`category = 'чай' OR price > 300`", "correct": true, "explanation": "Второе условие истинно, для `OR` этого достаточно." },
    { "text": "`category = 'чай' AND price > 300`", "correct": false, "explanation": "Категория не «чай», поэтому `AND` даёт `false`." },
    { "text": "`NOT (price < 300)`", "correct": true, "explanation": "310 не меньше 300, отрицание даёт `true`." }
  ],
  "explanation": "`AND` требует истинности обоих условий, `OR` — хотя бы одного."
}
```
