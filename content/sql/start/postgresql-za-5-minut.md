---
title: PostgreSQL за 5 минут
keywords: postgresql установка, docker, psql, dbeaver, подключение к базе, create database, порт 5432, клиент базы данных, локальная база, sql практика

---

# PostgreSQL за 5 минут

Как поднять базу локально, чтобы сразу выполнять примеры из раздела, а не читать их глазами?

Для практики хватит одного контейнера Docker. PostgreSQL — бесплатная реляционная СУБД, а Docker избавляет от ручной установки и настройки служб. Если Docker не подходит, поставь PostgreSQL обычным установщиком: команды внутри базы будут те же.

## Запуск

```bash
docker run --name sql-coffee \
  -e POSTGRES_PASSWORD=coffee \
  -e POSTGRES_DB=coffee \
  -p 5432:5432 \
  -d postgres:16
```

Проверь, что контейнер жив:

```bash
docker ps --filter name=sql-coffee
```

Подключиться можно двумя способами: через `psql` внутри контейнера или через графический клиент вроде DBeaver.

```bash
docker exec -it sql-coffee psql -U postgres -d coffee
```

```sql
SELECT version();
```

| version |
| --- |
| PostgreSQL 16.x on x86_64-pc-linux-gnu |

## Если контейнер уже запущен

```bash
docker exec -it sql-coffee psql -U postgres -d coffee
```

```sql
\dt
\d drinks
```

`\dt` показывает таблицы, `\d drinks` — столбцы и индексы конкретной таблицы. Это метакоманды `psql`, а не SQL: в коде приложения они не работают.

## Грабли

* **Порт 5432 занят.** Значит, локальный PostgreSQL уже запущен. Останови службу или поменяй порт в `-p 5433:5432`.
* **Пароль в команде — только для учебной базы.** В проекте пароль живёт в переменных окружения или секретах.
* **Не работай под `postgres` из приложения.** Создай отдельного пользователя с нужными правами — об этом в группе *Объекты БД и безопасность*.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какая команда подключает к базе `coffee` внутри уже запущенного контейнера?",
  "options": [
    { "text": "`docker exec -it sql-coffee psql -U postgres -d coffee`", "correct": true, "explanation": "`exec` заходит в работающий контейнер и запускает `psql`." },
    { "text": "`docker run --name sql-coffee postgres:16`", "correct": false, "explanation": "`run` создаёт новый контейнер, а не подключается к существующему." },
    { "text": "`SELECT version();`", "correct": false, "explanation": "Это SQL-запрос, а не команда подключения." }
  ],
  "explanation": "Сначала контейнер должен быть запущен, потом в него заходят через `docker exec`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `psql`?",
  "options": [
    { "text": "`\\dt` показывает список таблиц.", "correct": true, "explanation": "Это метакоманда `psql`." },
    { "text": "`\\d drinks` показывает столбцы и индексы таблицы `drinks`.", "correct": true, "explanation": "Удобно для знакомства со схемой." },
    { "text": "Метакоманды `psql` работают в коде приложения.", "correct": false, "explanation": "Это команды клиента, а не SQL." },
    { "text": "`SELECT version();` показывает версию PostgreSQL.", "correct": true, "explanation": "Полезно проверить, что подключение работает." }
  ],
  "explanation": "`psql` — клиент с собственными метакомандами; в приложении выполняются обычные SQL-запросы."
}
```
