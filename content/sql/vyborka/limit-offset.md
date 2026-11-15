---
title: LIMIT, OFFSET и пагинация
keywords: limit sql, offset sql, пагинация, постраничный вывод, keyset pagination, курсорная пагинация, fetch first, order by limit, дубли на страницах, postgresql
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / LIMIT</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <rect x="0" y="30" width="92" height="120" rx="10" class="d" opacity=".45" />
      <rect x="40" y="30" width="92" height="120" rx="10" class="d" opacity=".7" />
      <rect x="80" y="30" width="92" height="120" rx="10" class="d" />
      <path d="M96 56h60M96 78h48M96 100h56M96 122h38" opacity=".55" />
      <path d="M212 30v120M212 30h120M212 150h120" class="sa" stroke-width="3" />
      <path d="M232 62h80M232 88h64M232 114h74" class="sa" stroke-width="2" opacity=".6" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">LIMIT</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">OFFSET</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">keyset</text></g>
    </g>
  </svg>

---

# LIMIT, OFFSET и пагинация

Как показать десять последних заказов и не сломать вторую страницу, когда между запросами появился новый заказ?

`LIMIT` ограничивает число строк в результате, `OFFSET` пропускает первые N строк. Вместе они дают постраничный вывод: страница 1 — первые десять, страница 2 — следующие десять. Но у `OFFSET` есть цена: база всё равно читает пропущенные строки, а при изменении данных страницы могут дублироваться или терять записи.

## Как это работает

Представь книгу. `LIMIT 10` — прочитать десять страниц. `OFFSET 10` — сначала пролистать десять страниц, потом читать. Пролистывание занимает время, даже если ты не читаешь эти страницы. А если кто-то вставил новую страницу в начало, нумерация сдвинется, и ты прочитаешь одну страницу дважды.

## Синтаксис

```sql
SELECT столбцы
FROM таблица
ORDER BY ключ
LIMIT количество
OFFSET пропустить;
```

`LIMIT` без `ORDER BY` ограничивает, но не упорядочивает: база вправе взять любые строки. Для пагинации сортировка обязательна.

Стандартный SQL вместо `LIMIT` использует:

```sql
SELECT ...
FROM ...
ORDER BY ...
OFFSET 10 ROWS
FETCH FIRST 10 ROWS ONLY;
```

В MySQL работает `LIMIT 10 OFFSET 10`, в SQL Server — `OFFSET ... ROWS FETCH NEXT ... ROWS ONLY`.

## Пример

Вторая страница заказов по три штуки, от новых к старым:

```sql
SELECT id, created_at, total
FROM orders
ORDER BY created_at DESC, id DESC
LIMIT 3 OFFSET 3;
```

| id | created_at | total |
| --- | --- | --- |
| 125 | 2026-05-13 12:30+03 | 320.00 |
| 124 | 2026-05-12 16:20+03 | 500.00 |
| 123 | 2026-05-12 08:10+03 | 190.00 |

Номер страницы связан со смещением: `OFFSET = (страница - 1) * размер`. Для третьей страницы по три: `LIMIT 3 OFFSET 6`.

## Пагинация без сдвига

Если данные меняются часто, `OFFSET` ненадёжен. Надёжнее «курсор»: запомнить последний показанный заказ и просить следующие после него.

```sql
SELECT id, created_at, total
FROM orders
WHERE (created_at, id) < ('2026-05-13 12:30+03', 125)
ORDER BY created_at DESC, id DESC
LIMIT 3;
```

Это называется keyset pagination. Запрос не листает пропущенные строки, а сразу ищет место по индексу. Второй ключ `id` нужен, чтобы порядок был однозначным, если у двух заказов совпадает время.

## Грабли

* **`OFFSET` без `ORDER BY` бессмысленен.** Строки не упорядочены, поэтому «вторая страница» — произвольный набор.
* **Новые строки сдвигают страницы.** Если между запросами добавился заказ, на второй странице появится запись с первой. Keyset-пагинация это лечит.
* **Большой `OFFSET` медленный.** База читает и выбрасывает все пропущенные строки. На миллионе записей `OFFSET 900000` заметно тормозит.
* **Нестабильный порядок даёт дубли.** Если сортировать только по `created_at`, а время совпадает, порядок внутри группы не определён. Добавляй уникальный ключ вторым.
* **`LIMIT` не гарантирует «первые».** Без `ORDER BY` это просто «какие-то N строк».

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему при пагинации через `OFFSET` на второй странице может появиться запись с первой?",
  "options": [
    { "text": "Потому что `LIMIT` считает строки неправильно", "correct": false, "explanation": "`LIMIT` работает корректно, проблема в сдвиге данных." },
    { "text": "Потому что новая строка сдвинула нумерацию, и `OFFSET` пропустил уже другую строку", "correct": true, "explanation": "Смещение считается от начала, а начало изменилось." },
    { "text": "Потому что `ORDER BY` не работает с `OFFSET`", "correct": false, "explanation": "Работает, но не спасает от сдвига при изменении данных." }
  ],
  "explanation": "Keyset-пагинация просит строки после последней показанной, поэтому сдвиг ей не страшен."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `LIMIT` и `OFFSET`?",
  "options": [
    { "text": "`LIMIT 10 OFFSET 20` вернёт строки с 21-й по 30-ю при стабильном порядке.", "correct": true, "explanation": "`OFFSET 20` пропускает двадцать строк." },
    { "text": "`LIMIT` без `ORDER BY` возвращает случайные строки.", "correct": true, "explanation": "Порядок не определён, поэтому «случайные» — честное описание." },
    { "text": "Большой `OFFSET` ускоряет запрос, потому что база пропускает строки.", "correct": false, "explanation": "База всё равно читает пропущенные строки, это замедляет запрос." },
    { "text": "Для стабильной пагинации нужен уникальный ключ в `ORDER BY`.", "correct": true, "explanation": "Иначе при равных значениях порядок не определён." }
  ],
  "explanation": "Смещение удобно для небольших страниц, курсор — для больших и часто меняющихся данных."
}
```
