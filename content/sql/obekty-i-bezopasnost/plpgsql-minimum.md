---
title: PL/pgSQL минимум
keywords: plpgsql, declare, begin, if, loop, return, переменные, исключения, postgresql, функции

---

# PL/pgSQL минимум

Как написать функцию с переменной, условием и циклом, не изучая весь процедурный язык?

`PL/pgSQL` — процедурный язык PostgreSQL. Он добавляет к SQL переменные, `IF`, циклы, обработку ошибок и `RETURN`. Для большинства задач хватает небольшого набора конструкций: объявить переменные, выполнить запрос в `INTO`, проверить условие и вернуть результат.

## Каркас

```sql
CREATE FUNCTION example(p_id BIGINT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    v_name TEXT;
BEGIN
    SELECT name INTO v_name
    FROM drinks
    WHERE id = p_id;

    IF v_name IS NULL THEN
        RETURN 'не найдено';
    END IF;

    RETURN v_name;
END;
$$;
```

| Блок | Назначение |
| --- | --- |
| `DECLARE` | переменные |
| `BEGIN ... END` | тело |
| `INTO` | сохранить результат запроса в переменную |
| `IF ... THEN ... END IF` | условие |
| `RETURN` | вернуть значение |

## Условия

```sql
IF v_price > 300 THEN
    v_label := 'дорого';
ELSIF v_price > 200 THEN
    v_label := 'средне';
ELSE
    v_label := 'доступно';
END IF;
```

Присваивание — `:=`, сравнение — `=`.

## Циклы

```sql
FOR i IN 1..5 LOOP
    RAISE NOTICE 'шаг %', i;
END LOOP;
```

Цикл по строкам:

```sql
FOR r IN
    SELECT id, name FROM drinks WHERE is_active
LOOP
    RAISE NOTICE '%: %', r.id, r.name;
END LOOP;
```

На больших данных цикл почти всегда медленнее одного SQL-запроса. Используй его только когда без него не обойтись.

## Обработка ошибок

```sql
BEGIN
    INSERT INTO drinks (name, price) VALUES ('Тест', -1);
EXCEPTION
    WHEN check_violation THEN
        RAISE NOTICE 'цена не может быть отрицательной';
END;
```

Блок `EXCEPTION` ловит ошибки и позволяет продолжить. Но не прячь все ошибки подряд: иначе баг станет незаметным.

## Возврат таблицы

```sql
CREATE FUNCTION active_drinks()
RETURNS TABLE(id BIGINT, name TEXT, price NUMERIC)
LANGUAGE sql
STABLE
AS $$
    SELECT id, name, price
    FROM drinks
    WHERE is_active;
$$;
```

Для простого `SELECT` не нужен `PL/pgSQL`: `LANGUAGE sql` короче и понятнее.

## Грабли

* **`SELECT` без `INTO`.** Результат не сохранится, а в некоторых случаях это ошибка.
* **`NULL` в переменной.** Арифметика с `NULL` даст `NULL`. Проверяй `IS NULL`.
* **Цикл вместо `JOIN`.** Построчная обработка медленная.
* **`EXCEPTION` вокруг всего.** Скрывает реальные проблемы.
* **Имена переменных.** Не называй переменную так же, как столбец: будет неоднозначность.
* **Отладка.** `RAISE NOTICE` помогает, но не заменяет тесты.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как сохранить результат `SELECT` в переменную в `PL/pgSQL`?",
  "options": [
    { "text": "Через `SELECT ... INTO переменная`", "correct": true, "explanation": "Это стандартный способ." },
    { "text": "Через `SET переменная = SELECT ...`", "correct": false, "explanation": "Так не работает." },
    { "text": "Через `RETURN SELECT ...`", "correct": false, "explanation": "`RETURN` возвращает значение, а не сохраняет его." }
  ],
  "explanation": "`INTO` связывает результат запроса с переменной."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `PL/pgSQL`?",
  "options": [
    { "text": "Присваивание делается через `:=`.", "correct": true, "explanation": "Сравнение — через `=`." },
    { "text": "`IF ... THEN ... END IF` поддерживается.", "correct": true, "explanation": "Есть также `ELSIF` и `ELSE`." },
    { "text": "Цикл по строкам всегда быстрее `JOIN`.", "correct": false, "explanation": "Обычно медленнее." },
    { "text": "`EXCEPTION` может скрыть ошибку, если ловить всё подряд.", "correct": true, "explanation": "Лови конкретные типы ошибок." }
  ],
  "explanation": "Минимум `PL/pgSQL` — переменные, условия, циклы и обработка ошибок."
}
```
