---
title: Диалекты SQL
keywords: диалекты sql, postgresql, mysql, sql server, limit, top, fetch first, ilike, returning, on conflict, совместимость, стандарт sql

---

# Диалекты SQL

Почему один и тот же запрос из интернета работает в PostgreSQL, но падает в MySQL или SQL Server?

SQL — это стандарт, но каждая СУБД добавляет свои команды и по-своему решает спорные места. Ядро — `SELECT`, `WHERE`, `JOIN`, `GROUP BY` — совпадает почти везде. А вот ограничение строк, работа со строками, возврат вставленных данных и `UPSERT` отличаются. Если учить только один диалект, легко решить, что «SQL сломался», хотя это просто другая СУБД.

## Что чаще всего отличается

| Задача | PostgreSQL | MySQL | SQL Server |
| --- | --- | --- | --- |
| Первые N строк | `LIMIT 10` | `LIMIT 10` | `TOP 10` или `FETCH FIRST` |
| Регистронезависимый поиск | `ILIKE '%кофе%'` | `LIKE` с collation | `LIKE` с collation |
| Вернуть вставленную строку | `RETURNING *` | `LAST_INSERT_ID()` | `OUTPUT INSERTED.*` |
| Вставка или обновление | `ON CONFLICT` | `ON DUPLICATE KEY` | `MERGE` |
| Конкатенация строк | `'a' \|\| 'b'` | `CONCAT('a', 'b')` | `'a' + 'b'` |
| Логический тип | `BOOLEAN` | `TINYINT(1)` | `BIT` |

## Как не запутаться

- Учи **стандартное ядро**: `SELECT`, фильтры, группировки, соединения, подзапросы. Оно переносится между базами.
- Перед копированием примера смотри, для какой СУБД он написан. В статье может быть MySQL, а у тебя PostgreSQL.
- Для специфики открывай официальную документацию своей версии, а не Stack Overflow пятилетней давности.
- В проекте фиксируй диалект в README и миграциях, чтобы новый разработчик не гадал.

## Грабли

* **`LIMIT` — не универсален.** В SQL Server его нет; там `TOP` или `OFFSET ... FETCH`.
* **Кавычки для имён.** PostgreSQL и SQL Server используют двойные кавычки, MySQL — обратные. Это не взаимозаменяемо.
* **`RETURNING` — фишка PostgreSQL.** В MySQL и SQL Server аналоги выглядят иначе, хотя идея та же.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой вариант ограничения первых десяти строк точно есть в SQL Server?",
  "options": [
    { "text": "`LIMIT 10`", "correct": false, "explanation": "`LIMIT` — синтаксис PostgreSQL и MySQL, в SQL Server его нет." },
    { "text": "`TOP 10`", "correct": true, "explanation": "`SELECT TOP 10 ...` — привычный вариант SQL Server." },
    { "text": "`ILIKE`", "correct": false, "explanation": "`ILIKE` — особенность PostgreSQL, к ограничению строк не относится." }
  ],
  "explanation": "Стандартный `FETCH FIRST 10 ROWS ONLY` тоже работает в современных версиях SQL Server."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Какие утверждения о диалектах верны?",
  "options": [
    { "text": "`LIMIT` есть не во всех СУБД.", "correct": true, "explanation": "В SQL Server чаще используют `TOP` или `FETCH FIRST`." },
    { "text": "`RETURNING` — сильная сторона PostgreSQL.", "correct": true, "explanation": "В MySQL и SQL Server аналоги выглядят иначе." },
    { "text": "Ядро `SELECT`, `WHERE`, `JOIN` совпадает почти везде.", "correct": true, "explanation": "Поэтому стандартный SQL переносится между базами." },
    { "text": "Кавычки для имён одинаковы во всех СУБД.", "correct": false, "explanation": "PostgreSQL и SQL Server используют двойные, MySQL — обратные." }
  ],
  "explanation": "Учи стандартное ядро, а диалектные команды проверяй по документации своей СУБД."
}
```
