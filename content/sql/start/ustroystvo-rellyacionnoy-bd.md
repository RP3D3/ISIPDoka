---
title: Как устроена реляционная БД
keywords: реляционная база данных, таблица, строка, столбец, схема, база данных, сервер, postgresql, типы данных, атомарность
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / ТАБЛИЦА</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2">
      <rect x="0" y="18" width="300" height="150" rx="10" class="d" />
      <path d="M0 58h300M0 98h300M0 138h300M100 18v150M200 18v150" opacity=".5" />
      <rect x="0" y="18" width="300" height="40" rx="10" class="a" opacity=".85" />
      <path d="M16 44h60M116 44h52M216 44h48" class="d" stroke-width="3" stroke-linecap="round" />
      <path d="M16 82h56M16 122h42M116 82h52M116 122h64M216 82h40M216 122h58" opacity=".5" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">строки</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">столбцы</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">ключи</text></g>
    </g>
  </svg>

---

# Как устроена реляционная БД

Из чего состоит база данных, если смотреть на неё не как на набор файлов, а как на строгую таблицу?

Реляционная база хранит данные в таблицах. Таблица — это набор строк одного типа: например, все напитки кофейни. У каждой строки одинаковый набор столбцов, а у каждого столбца — один тип данных. Такая жёсткая структура кажется ограничением, но именно она не даёт превратить цену в текст и потерять половину заказа.

## Этажи базы

| Уровень | Что это | Пример |
| --- | --- | --- |
| Сервер | Процесс PostgreSQL, к которому подключаются клиенты | `localhost:5432` |
| База данных | Изолированный набор схем и таблиц | `coffee` |
| Схема | Папка для объектов внутри базы | `public` |
| Таблица | Набор строк одного типа | `drinks` |
| Строка | Одна запись | `Americano, 220.00` |
| Столбец | Одно свойство всех строк | `price` |

В PostgreSQL по умолчанию всё создаётся в схеме `public`. Пока проект один, про неё можно забыть; в больших базах схемы разделяют домены: `sales`, `auth`, `reporting`.

## Таблица — это не лист Excel

В таблице `drinks` каждая строка — отдельный напиток, а столбцы описывают его свойства. Порядок строк база не гарантирует: без `ORDER BY` строки могут вернуться в любом порядке. В одной ячейке хранится одно значение, а не список ингредиентов через запятую.

```sql
SELECT name, category, price
FROM drinks
LIMIT 3;
```

| name | category | price |
| --- | --- | --- |
| Американо | кофе | 220.00 |
| Капучино | кофе | 280.00 |
| Чай с бергамотом | чай | 190.00 |

## Грабли

* **Один столбец — один тип.** Нельзя хранить в `price` то число, то строку «дорого».
* **Порядок строк не гарантирован.** Если нужен порядок — только `ORDER BY`.
* **`SELECT *` — для знакомства.** В приложении перечисляй столбцы явно: схема может измениться.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое строка таблицы?",
  "options": [
    { "text": "Одно свойство всех записей", "correct": false, "explanation": "Это столбец." },
    { "text": "Одна запись с набором значений по столбцам", "correct": true, "explanation": "Например, один напиток с названием, категорией и ценой." },
    { "text": "Папка с таблицами внутри базы", "correct": false, "explanation": "Это схема." }
  ],
  "explanation": "Строка — одна запись, столбец — одно свойство всех записей."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Какие утверждения о таблице верны?",
  "options": [
    { "text": "У каждого столбца один тип данных.", "correct": true, "explanation": "Нельзя хранить в `price` то число, то текст." },
    { "text": "Порядок строк без `ORDER BY` не гарантирован.", "correct": true, "explanation": "Таблица — множество строк, а не список." },
    { "text": "В одной ячейке можно хранить список ингредиентов через запятую.", "correct": false, "explanation": "Для списков нужна отдельная таблица или `JSONB`, но не строка с запятыми." },
    { "text": "`SELECT *` удобен для знакомства, но в приложении лучше перечислять столбцы.", "correct": true, "explanation": "Явный список не сломается от нового столбца." }
  ],
  "explanation": "Жёсткая структура таблицы и есть источник её надёжности."
}
```
