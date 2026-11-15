---
title: NULL — это не ноль
keywords: null, is null, is not null, coalesce, трёхзначная логика, неизвестно, пустая строка, not in, агрегаты, postgresql, ошибки новичка
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / NULL</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <rect x="0" y="38" width="110" height="110" rx="14" class="d" stroke-dasharray="7 7" />
      <text x="34" y="110" class="mono t" font-size="28" opacity=".55">NULL</text>
      <path d="M150 93h56" class="sa" stroke-width="3" stroke-dasharray="5 6" />
      <rect x="236" y="38" width="110" height="110" rx="14" class="d" />
      <text x="274" y="112" class="mono a" font-size="36">0</text>
      <path d="M20 166h70M256 166h70" opacity=".35" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">NULL</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">0</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">IS NULL</text></g>
    </g>
  </svg>

---

# NULL — это не ноль

Почему отчёт «клиенты без телефона» оказывается пустым, хотя телефона нет у половины базы?

`NULL` — это не `0` и не пустая строка. Это отметка «значение неизвестно». Она нужна, когда данных действительно нет: клиент не оставил телефон, заказ ещё не оплачен, температура не измерена. Проблема в том, что `NULL` участвует в сравнениях по особым правилам и легко ломает привычную логику.

## Трёхзначная логика

Обычное условие даёт `true` или `false`. С `NULL` появляется третье состояние — `unknown`. Поэтому:

- `NULL = NULL` — не `true`, а `unknown`;
- `NULL <> 5` — тоже `unknown`;
- `WHERE` пропускает только те строки, где условие истинно, поэтому такие строки не попадают в результат.

Для проверки на отсутствие значения есть `IS NULL` и `IS NOT NULL`. Для подстановки запасного значения — `COALESCE`.

## Пример

```sql
SELECT id, name, COALESCE(phone, 'не указан') AS phone
FROM customers
WHERE phone IS NULL;
```

| id | name | phone |
| --- | --- | --- |
| 4 | Мария | не указан |
| 9 | Олег | не указан |

Если написать `WHERE phone = NULL`, результат будет пустым: сравнение даёт `unknown`, а не `true`.

## Где ещё ждать подвох

- **Арифметика.** `price + NULL` даёт `NULL`, а не `price`.
- **Конкатенация.** `'Клиент: ' || NULL` даёт `NULL`. Используй `COALESCE`.
- **Агрегаты.** `COUNT(phone)` считает только непустые значения, а `COUNT(*)` — все строки.
- **`NOT IN`.** Если в списке есть `NULL`, `NOT IN` может вернуть пусто. Для отрицаний безопаснее `NOT EXISTS`.

## Грабли

* **`NULL` не равен пустой строке.** `''` — это известное значение длины 0, `NULL` — неизвестность.
* **`IS NULL` нельзя заменить на `= NULL`.** Синтаксис выглядит логично, но не работает.
* **`COALESCE` возвращает первый непустой аргумент.** Убедись, что типы совместимы: `COALESCE(phone, 0)` для текстового телефона — ошибка.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что вернёт выражение `NULL = NULL`?",
  "options": [
    { "text": "`true`", "correct": false, "explanation": "`NULL` не равен даже самому себе." },
    { "text": "`false`", "correct": false, "explanation": "`unknown` — не то же самое, что `false`." },
    { "text": "`unknown`", "correct": true, "explanation": "Любое сравнение с `NULL` даёт `unknown`, поэтому `WHERE` не пропускает строку." }
  ],
  "explanation": "Поэтому для проверки на отсутствие значения используют `IS NULL`, а не `= NULL`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Какие утверждения о `NULL` верны?",
  "options": [
    { "text": "`COUNT(*)` считает строки с `NULL`.", "correct": true, "explanation": "`COUNT(*)` считает все строки, независимо от значений." },
    { "text": "`COUNT(phone)` пропускает `NULL`.", "correct": true, "explanation": "`COUNT(столбец)` считает только непустые значения." },
    { "text": "`NULL` равен пустой строке `''`.", "correct": false, "explanation": "`''` — известное значение длины 0, а `NULL` — неизвестность." },
    { "text": "`NULL = 0` возвращает `true`.", "correct": false, "explanation": "Сравнение с `NULL` даёт `unknown`." }
  ],
  "explanation": "`NULL` — это не значение, а отметка «неизвестно»."
}
```
