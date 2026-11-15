# SQL: план раздела

Рабочий план раздела SQL. Файл не попадает в `structure.json`: sync сканирует только папки групп, а файлы на `_` пропускает.

## Решения

- Основной диалект — **PostgreSQL 16+**. 95% примеров — обычный SQL; различия с MySQL и SQL Server — в отдельной карточке.
- Сквозной кейс — **кофейня «Зерно»**. Одна схема на все карточки.
- Сначала только текст, SQL-примеры и таблицы результата. SVG — позже: 12 обложек групп и 20–25 ключевых тем.
- Формат карточки: задача → модель на пальцах → синтаксис → пример с результатом → грабли → «проверь себя».
- Без реляционной алгебры и формальных определений. Нормализация — через реальные аномалии.
- Папки групп создаются по мере написания, чтобы не плодить пустые страницы. Полный список тем и слагов — ниже.

## Схема кейса

```sql
customers(id, name, phone, email, created_at)
drinks(id, name, category, price, is_active)
ingredients(id, name, unit, cost_per_unit)
drink_ingredients(drink_id, ingredient_id, amount)
orders(id, customer_id, created_at, status, total)
order_items(order_id, drink_id, quantity, unit_price)
reviews(id, customer_id, drink_id, rating, comment, created_at)
```

Связи: `customers 1:N orders`, `orders 1:N order_items`, `drinks 1:N order_items`, `drinks M:N ingredients` через `drink_ingredients`, `customers 1:N reviews`, `drinks 1:N reviews`.

## Формат карточки

1. Лид-вопрос и 1–2 абзаца: что это и зачем.
2. «Как это работает» — модель или аналогия.
3. «Синтаксис» — шаблон с местечками.
4. «Пример» — запрос к кофейне и таблица результата.
5. «Грабли» — 2–3 ошибки новичка.
6. «Проверь себя» — 1–2 мини-теста с проверкой и объяснением.

## Группы и темы

### 10. База данных без страха (`start`) — готово
- [x] 10.1 Зачем нужна база данных (`zachem-nuzhna-baza-dannyh`)
- [x] 10.2 Как устроена реляционная БД (`ustroystvo-rellyacionnoy-bd`)
- [x] 10.3 Ключи и связи на салфетке (`klyuchi-i-svyazi`)
- [x] 10.4 PostgreSQL за 5 минут (`postgresql-za-5-minut`)
- [x] 10.5 Первый SELECT и стиль SQL (`pervyy-select`)
- [x] 10.6 Порядок выполнения запроса (`poryadok-vypolneniya-zaprosa`)
- [x] 10.7 NULL — это не ноль (`null-eto-ne-nol`)
- [x] 10.8 Типы данных (`tipy-dannyh`)
- [x] 10.9 Схема кофейни «Зерно» (`shema-kofeyni`)
- [x] 10.10 Диалекты SQL (`dialekty-sql`)

### 20. Выборка: WHERE, ORDER BY, LIMIT (`vyborka`) — готово
- [x] 20.1 WHERE (`where`)
- [x] 20.2 BETWEEN, IN, LIKE (`between-in-like`)
- [x] 20.3 ORDER BY (`order-by`)
- [x] 20.4 LIMIT, OFFSET и пагинация (`limit-offset`)
- [x] 20.5 DISTINCT (`distinct`)
- [x] 20.6 Выражения, CAST и псевдонимы (`vyrazheniya-i-cast`)
- [x] 20.7 CASE (`case`)
- [x] 20.8 Даты и время (`daty-i-vremya`)
- [x] 20.9 Текстовые функции (`tekstovye-funkcii`)
- [x] 20.10 Практика: 10 запросов к кофейне (`praktika-vyborka`)

### 30. Агрегация и GROUP BY (`agregaciya`) — готово
- [x] 30.1 Агрегаты: COUNT, SUM, AVG, MIN, MAX (`agregatnye-funkcii`)
- [x] 30.2 GROUP BY (`group-by`)
- [x] 30.3 WHERE против HAVING (`where-vs-having`)
- [x] 30.4 GROUP BY по нескольким столбцам и ROLLUP (`group-by-neskolkim-stolbcov`)
- [x] 30.5 Деньги и NUMERIC (`dengi-i-numeric`)
- [x] 30.6 NULL в агрегатах (`null-v-agregatah`)
- [x] 30.7 Отчёты кофейни (`otchety-kofeyni`)
- [x] 30.8 Практика: собираем отчёты (`praktika-agregaciya`)

### 40. JOIN: собираем данные (`join`) — готово
- [x] 40.1 Зачем JOIN (`zachem-join`)
- [x] 40.2 INNER JOIN (`inner-join`)
- [x] 40.3 LEFT, RIGHT и FULL JOIN (`left-right-full-join`)
- [x] 40.4 JOIN по нескольким условиям (`join-po-neskolkim-usloviyam`)
- [x] 40.5 Многие ко многим (`mnogie-ko-mnogim`)
- [x] 40.6 SELF JOIN (`self-join`)
- [x] 40.7 CROSS JOIN (`cross-join`)
- [x] 40.8 Ошибки JOIN и дубли (`oshibki-join`)
- [x] 40.9 Практика: заказы с составом (`praktika-join`)

### 50. DDL: создаём схему (`ddl`) — готово
- [x] 50.1 CREATE DATABASE, SCHEMA, TABLE (`create-database-schema-table`)
- [x] 50.2 Ограничения (`ogranicheniya`)
- [x] 50.3 PRIMARY KEY и FOREIGN KEY (`primary-i-foreign-key`)
- [x] 50.4 ALTER TABLE (`alter-table`)
- [x] 50.5 DROP и TRUNCATE (`drop-i-truncate`)
- [x] 50.6 VIEW (`view`)
- [x] 50.7 Индексы: первое знакомство (`indeksy-pervoe-znakomstvo`)
- [x] 50.8 Миграции (`migracii`)
- [x] 50.9 Практика: кофейня с нуля (`praktika-ddl`)

### 60. DML: меняем данные (`dml`) — готово
- [x] 60.1 INSERT (`insert`)
- [x] 60.2 RETURNING (`returning`)
- [x] 60.3 UPDATE (`update`)
- [x] 60.4 DELETE (`delete`)
- [x] 60.5 UPSERT: ON CONFLICT (`upsert`)
- [x] 60.6 Массовые операции и COPY (`massovye-operacii-i-copy`)
- [x] 60.7 Аудит и мягкое удаление (`audit-i-soft-delete`)
- [x] 60.8 Практика: наполняем кофейню (`praktika-dml`)

### 70. Подзапросы, CTE и оконные функции (`advanced-queries`) — готово
- [x] 70.1 Подзапросы: IN, EXISTS, скалярные (`podzaprosy-in-exists`)
- [x] 70.2 Коррелированные подзапросы и LATERAL (`korrelirovannye-podzaprosy-i-lateral`)
- [x] 70.3 Подзапрос в FROM (`podzapros-v-from`)
- [x] 70.4 CTE: WITH (`cte`)
- [x] 70.5 Рекурсивный CTE (`recursive-cte`)
- [x] 70.6 Оконные функции: зачем (`okonnye-funkcii`)
- [x] 70.7 ROW_NUMBER, RANK, DENSE_RANK (`row-number-rank-dense-rank`)
- [x] 70.8 LAG и LEAD (`lag-i-lead`)
- [x] 70.9 Рамки окна и скользящие итоги (`ramki-okna`)
- [x] 70.10 UNION, INTERSECT, EXCEPT (`union-intersect-except`)
- [x] 70.11 Практика: аналитика кофейни (`praktika-analitika`)

### 80. Транзакции и блокировки (`tranzakcii`) — готово
- [x] 80.1 ACID на примере заказа (`acid`)
- [x] 80.2 BEGIN, COMMIT, ROLLBACK, SAVEPOINT (`begin-commit-rollback`)
- [x] 80.3 Уровни изоляции (`urovni-izolyacii`)
- [x] 80.4 Аномалии (`anomalii`)
- [x] 80.5 Блокировки и deadlock (`blokirovki-i-deadlock`)
- [x] 80.6 Оптимистичная и пессимистичная блокировка (`optimisticheskaya-i-pessimisticheskaya-blokirovka`)
- [x] 80.7 Целостность и каскады (`celostnost-i-kaskady`)
- [x] 80.8 Практика: заказ атомарно (`praktika-tranzakcii`)

### 90. Индексы и производительность (`proizvoditelnost`) — готово
- [x] 90.1 Как база ищет строки (`kak-baza-ishchet-stroki`)
- [x] 90.2 B-tree (`b-tree`)
- [x] 90.3 Составные индексы (`sostavnye-indeksy`)
- [x] 90.4 Частичные, уникальные, expression-индексы (`chastichnye-unikalnye-expression-indeksy`)
- [x] 90.5 EXPLAIN и EXPLAIN ANALYZE (`explain`)
- [x] 90.6 Почему индекс не используется (`pochemu-indeks-ne-ispolzuetsya`)
- [x] 90.7 N+1 запросов (`n-plus-one`)
- [x] 90.8 Материализованные представления (`materializovannye-predstavleniya`)
- [x] 90.9 Практика: ускоряем отчёт (`praktika-proizvoditelnost`)

### 100. Объекты БД и безопасность (`obekty-i-bezopasnost`) — готово
- [x] 100.1 Функции и процедуры (`funkcii-i-procedury`)
- [x] 100.2 PL/pgSQL минимум (`plpgsql-minimum`)
- [x] 100.3 Триггеры (`triggery`)
- [x] 100.4 Ошибки и RAISE (`oshibki-i-raise`)
- [x] 100.5 JSONB (`jsonb`)
- [x] 100.6 Полнотекстовый поиск (`polnotekstovyy-poisk`)
- [x] 100.7 Роли и права (`roli-i-prava`)
- [x] 100.8 SQL-инъекции (`sql-inekcii`)
- [x] 100.9 Практика: аудит цен (`praktika-audit`)

### 110. Проектирование схемы (`proektirovanie`) — готово
- [x] 110.1 От требований к сущностям (`ot-trebovaniy-k-suschnostyam`)
- [x] 110.2 ER-диаграмма (`er-diagramma`)
- [x] 110.3 1НФ (`1nf`)
- [x] 110.4 2НФ (`2nf`)
- [x] 110.5 3НФ (`3nf`)
- [x] 110.6 Когда денормализовать (`kogda-denormalizovat`)
- [x] 110.7 Именование, типы, audit-поля (`imenovanie-i-audit-poly`)
- [x] 110.8 Практика: схема доставки (`praktika-proektirovanie`)

### 120. Практикум: SQL в реальной задаче (`praktikum`) — готово
- [x] 120.1 Сценарий и требования (`scenariy-i-trebovaniya`)
- [x] 120.2 Схема и данные (`shema-i-dannye`)
- [x] 120.3 Каталог: фильтры, сортировка, пагинация (`katalog`)
- [x] 120.4 Заказы: корзина и оформление (`zakazy`)
- [x] 120.5 Отчёты: выручка, топ, средний чек (`otchety`)
- [x] 120.6 Аналитика: повторные покупки (`analitika`)
- [x] 120.7 Оптимизация: EXPLAIN и индексы (`optimizaciya`)
- [x] 120.8 Чек-лист продакшена (`chek-list-prodakshena`)

## Партии

1. Схема + группы 10–20 (22 карточки) — пилот, проверка стиля. Готово.
2. Группы 30–40 (17). Готово.
3. Группы 50–60 (17). Готово.
4. Группа 70 (11). Готово.
5. Группа 80 (8). Готово.
6. Группа 90 (9). Готово.
7. Группа 100 (9). Готово.
8. Группа 110 (8). Готово.
9. Группа 120 (8). Готово.
10. Обложки 12 групп + 20 ключевых тем, эмбеддинги. Готово.
