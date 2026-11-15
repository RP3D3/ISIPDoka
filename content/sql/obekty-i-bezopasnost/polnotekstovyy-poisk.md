---
title: Полнотекстовый поиск
keywords: полнотекстовый поиск, to_tsvector, to_tsquery, tsvector, tsquery, gin, русский язык, postgresql, поиск по тексту

---

# Полнотекстовый поиск

Как искать по словам, а не по подстроке, и почему `LIKE '%латте%'` не масштабируется?

Полнотекстовый поиск разбирает текст на лексемы, приводит их к основе и ищет по словам с учётом языка. В PostgreSQL для этого есть `tsvector` (документ), `tsquery` (запрос) и `GIN`-индекс. Это быстрее и умнее, чем `LIKE` с ведущим `%`.

## Основы

```sql
SELECT to_tsvector('russian', 'Латте с овсяным молоком');
```

```text
'латт':1 'молок':4 'овсян':3 'с':2
```

```sql
SELECT to_tsquery('russian', 'латте & молоко');
```

Поиск:

```sql
SELECT name
FROM drinks
WHERE to_tsvector('russian', name || ' ' || COALESCE(description, ''))
      @@ to_tsquery('russian', 'латте & молоко');
```

`@@` — оператор совпадения.

## Индекс

Функция от столбца в условии не использует обычный индекс, поэтому нужен expression-индекс:

```sql
CREATE INDEX idx_drinks_search
ON drinks
USING GIN (to_tsvector('russian', name || ' ' || COALESCE(description, '')));
```

Запрос должен использовать то же выражение:

```sql
SELECT name
FROM drinks
WHERE to_tsvector('russian', name || ' ' || COALESCE(description, ''))
      @@ to_tsquery('russian', 'латте');
```

## Готовый столбец

Если текст большой, удобнее хранить `tsvector` отдельно:

```sql
ALTER TABLE drinks ADD COLUMN search_vector tsvector;

UPDATE drinks
SET search_vector = to_tsvector('russian', name || ' ' || COALESCE(description, ''));

CREATE INDEX idx_drinks_search_vector ON drinks USING GIN (search_vector);
```

Обновлять его можно триггером при изменении `name` или `description`.

## Операторы запроса

| Оператор | Значение |
| --- | --- |
| `&` | И |
| `|` | ИЛИ |
| `!` | НЕ |
| `<->` | рядом |

```sql
SELECT to_tsquery('russian', 'латте & !сироп');
```

## Грабли

* **Язык.** Без `'russian'` стемминг будет английским, и русские слова не найдутся.
* **Функция в условии без индекса.** Нужен expression-индекс или отдельный `tsvector`.
* **`LIKE` вместо полнотекста.** `%текст%` не использует B-tree и плохо масштабируется.
* **Стоп-слова.** Короткие и служебные слова могут игнорироваться.
* **Обновление `tsvector`.** Если хранишь отдельно, не забудь про триггер или пересчёт.
* **Опечатки.** Полнотекстовый поиск не исправляет ошибки; для этого нужны trigram или внешний поиск.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем в `to_tsvector` указывать `'russian'`?",
  "options": [
    { "text": "Чтобы использовать русский стемминг и стоп-слова", "correct": true, "explanation": "Иначе слова обрабатываются как английские." },
    { "text": "Чтобы ускорить запрос в два раза", "correct": false, "explanation": "Язык влияет на качество, а не на скорость сам по себе." },
    { "text": "Чтобы создать индекс автоматически", "correct": false, "explanation": "Индекс создаётся отдельно." }
  ],
  "explanation": "Языковая конфигурация определяет разбор текста."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про полнотекстовый поиск?",
  "options": [
    { "text": "`@@` проверяет совпадение документа и запроса.", "correct": true, "explanation": "Это основной оператор." },
    { "text": "`GIN`-индекс ускоряет поиск по `tsvector`.", "correct": true, "explanation": "Он создан для таких данных." },
    { "text": "`LIKE '%текст%'` всегда быстрее полнотекстового поиска.", "correct": false, "explanation": "Обычно наоборот на больших данных." },
    { "text": "Expression-индекс должен повторять выражение из запроса.", "correct": true, "explanation": "Иначе база его не использует." }
  ],
  "explanation": "Полнотекстовый поиск — это язык, лексемы и правильный индекс."
}
```
