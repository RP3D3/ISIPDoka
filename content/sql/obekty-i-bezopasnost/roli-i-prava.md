---
title: Роли и права
keywords: роли postgresql, create role, grant, revoke, привилегии, schema, least privilege, безопасность, postgresql, доступ

---

# Роли и права

Как дать приложению только те права, которые ему нужны, и не пустить его в чужие таблицы?

В PostgreSQL права выдаются ролям. Роль может быть пользователем (с логином) или группой (без логина). Принцип минимальных привилегий: приложение получает ровно то, что ему нужно, и ничего лишнего. Это защищает от ошибок, взломов и случайных `DROP TABLE`.

## Роли

```sql
CREATE ROLE app_user LOGIN PASSWORD 'strong-password';
CREATE ROLE readonly NOLOGIN;
CREATE ROLE analyst LOGIN PASSWORD 'another-password';
```

`LOGIN` разрешает подключение. `NOLOGIN` — удобно для групповых ролей.

## Права

```sql
GRANT CONNECT ON DATABASE coffee TO app_user;

GRANT USAGE ON SCHEMA shop TO app_user;

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA shop
TO app_user;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA shop
TO app_user;
```

`USAGE` на схему нужен, чтобы видеть объекты внутри. Без него `GRANT` на таблицу не поможет.

## Только чтение

```sql
GRANT USAGE ON SCHEMA shop TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA shop TO readonly;

ALTER DEFAULT PRIVILEGES IN SCHEMA shop
GRANT SELECT ON TABLES TO readonly;
```

`ALTER DEFAULT PRIVILEGES` применяет права к будущим таблицам.

## Отзыв прав

```sql
REVOKE DELETE ON orders FROM app_user;
```

Права можно отзывать точечно. Проверяй, что приложение не потеряло нужное.

## Просмотр прав

```sql
SELECT grantee, table_schema, table_name, privilege_type
FROM information_schema.role_table_grants
WHERE grantee = 'app_user'
ORDER BY table_schema, table_name;
```

## Грабли

* **`GRANT ALL`.** Даёт лишние права, включая `DELETE` и `TRUNCATE`.
* **Владелец таблицы.** Владелец может всё; приложение не должно работать под владельцем.
* **`PUBLIC`.** Права по умолчанию могут быть шире, чем кажется. Проверяй `\dp`.
* **Забыть `USAGE` на схему.** Таблицы есть, а приложение их «не видит».
* **Последовательности.** Для `INSERT` в `IDENTITY` нужны права на последовательность.
* **Секреты в коде.** Пароль роли не должен лежать в репозитории.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что нужно приложению кроме `SELECT` на таблицу, чтобы увидеть её в схеме `shop`?",
  "options": [
    { "text": "`USAGE` на схему `shop`", "correct": true, "explanation": "Без доступа к схеме таблица недоступна." },
    { "text": "`CREATE` на базу", "correct": false, "explanation": "Это лишнее право." },
    { "text": "Роль владельца таблицы", "correct": false, "explanation": "Достаточно точечных прав." }
  ],
  "explanation": "Схема — это контейнер, к ней нужен `USAGE`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что соответствует принципу минимальных привилегий?",
  "options": [
    { "text": "Дать приложению только нужные `SELECT`, `INSERT`, `UPDATE`.", "correct": true, "explanation": "Без лишнего `DELETE` и `DROP`." },
    { "text": "Использовать отдельную роль для аналитики только на чтение.", "correct": true, "explanation": "Это снижает риск." },
    { "text": "Работать под владельцем базы, чтобы не думать о правах.", "correct": false, "explanation": "Это максимальный риск." },
    { "text": "Проверять выданные права через `information_schema`.", "correct": true, "explanation": "Помогает найти лишнее." }
  ],
  "explanation": "Чем меньше прав, тем меньше ущерб от ошибки или взлома."
}
```
