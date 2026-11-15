---
title: Блокировки и deadlock
keywords: блокировки sql, for update, for share, deadlock, взаимная блокировка, pg_locks, lock timeout, postgresql, конкурентность
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / DEADLOCK</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <rect x="0" y="28" width="94" height="54" rx="8" class="d" />
      <rect x="160" y="28" width="94" height="54" rx="8" class="d" />
      <rect x="0" y="112" width="94" height="54" rx="8" class="d" />
      <rect x="160" y="112" width="94" height="54" rx="8" class="d" />
      <path d="M94 55h48" class="sa" stroke-width="3" />
      <path d="M160 139h-48" class="sa" stroke-width="3" />
      <path d="M47 82v30M207 82v30" class="sa" stroke-width="3" />
      <path d="M40 82l7-10 7 10M200 82l7-10 7 10" class="a" />
      <circle cx="127" cy="97" r="22" class="d" stroke-width="2" stroke-dasharray="4 4" />
      <path d="M118 97h18M127 88v18" class="sa" stroke-width="2" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">FOR UPDATE</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">цикл</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">retry</text></g>
    </g>
  </svg>

---

# Блокировки и deadlock

Почему две транзакции могут навсегда замереть, хотя каждая ждёт всего одну строку, и как база выбирает жертву?

Блокировка защищает данные от одновременного изменения. Обычно PostgreSQL блокирует строки автоматически на время `UPDATE` или `DELETE`. Но иногда нужно заблокировать строку заранее, до изменения, — для этого есть `SELECT ... FOR UPDATE`. Если две транзакции ждут блокировки друг друга, возникает **deadlock**, и база принудительно завершает одну из них.

## Явные блокировки

```sql
BEGIN;

SELECT stock
FROM ingredients
WHERE id = 1
FOR UPDATE;

UPDATE ingredients SET stock = stock - 1 WHERE id = 1;

COMMIT;
```

| Вариант | Что блокирует |
| --- | --- |
| `FOR UPDATE` | строку от `UPDATE`, `DELETE` и других `FOR UPDATE` |
| `FOR NO KEY UPDATE` | слабее: не блокирует внешние ключи |
| `FOR SHARE` | разрешает чтение, запрещает изменение |
| `FOR KEY SHARE` | самый слабый, защищает ключ |

`FOR UPDATE` стоит брать, когда решение зависит от прочитанного значения: «хватает ли остатка».

## Deadlock

```sql
-- транзакция 1
BEGIN;
UPDATE ingredients SET stock = stock - 1 WHERE id = 1;  -- блокирует строку 1
UPDATE ingredients SET stock = stock - 1 WHERE id = 2;  -- ждёт строку 2

-- транзакция 2
BEGIN;
UPDATE ingredients SET stock = stock - 1 WHERE id = 2;  -- блокирует строку 2
UPDATE ingredients SET stock = stock - 1 WHERE id = 1;  -- ждёт строку 1
```

Каждая держит одну строку и ждёт другую. PostgreSQL обнаруживает цикл и завершает одну транзакцию:

```text
ERROR: deadlock detected
DETAIL: Process 1234 waits for ShareLock on transaction 5678;
Process 5678 waits for ShareLock on transaction 1234.
```

Приложение должно поймать ошибку и повторить транзакцию.

## Как избежать

- **Единый порядок блокировок.** Всегда блокируй строки в одном порядке, например по возрастанию `id`.
- **Короткие транзакции.** Чем меньше времени держишь блокировку, тем меньше шансов на цикл.
- **Одна команда вместо двух.** Атомарный `UPDATE ... WHERE stock > 0` часто проще, чем `SELECT FOR UPDATE` + `UPDATE`.
- **`lock_timeout`.** Ограничь ожидание, чтобы не висеть бесконечно:

```sql
SET lock_timeout = '3s';
```

## Мониторинг

```sql
SELECT pid, state, wait_event_type, wait_event, query
FROM pg_stat_activity
WHERE state <> 'idle';
```

```sql
SELECT locktype, relation::regclass, mode, granted, pid
FROM pg_locks
WHERE NOT granted;
```

Эти запросы показывают, кто кого ждёт.

## Грабли

* **`FOR UPDATE` на весь диапазон.** Блокирует много строк и мешает другим. Старайся блокировать конкретные `id`.
* **Долгая транзакция с блокировкой.** Пока она открыта, другие ждут. Не ходи в ней во внешние сервисы.
* **Разный порядок обновлений.** Главная причина deadlock. Договорись о порядке в коде.
* **`FOR UPDATE` в отчёте.** Отчёт не должен блокировать продажи. Используй обычный `SELECT` или `REPEATABLE READ`.
* **Игнорирование ошибки deadlock.** Приложение должно повторить транзакцию, а не показывать пользователю «ошибка базы».
* **Блокировки не равны изоляции.** Даже с блокировками можно получить неверную логику, если неправильно выбрать, что именно блокировать.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое deadlock?",
  "options": [
    { "text": "Две транзакции ждут блокировки друг друга", "correct": true, "explanation": "Образуется цикл ожидания." },
    { "text": "Транзакция выполняется слишком долго", "correct": false, "explanation": "Долгая транзакция — не то же самое." },
    { "text": "База не может найти строку", "correct": false, "explanation": "Это ошибка запроса, а не блокировка." }
  ],
  "explanation": "PostgreSQL обнаруживает цикл и завершает одну из транзакций."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Как снизить риск deadlock?",
  "options": [
    { "text": "Блокировать строки в одном порядке.", "correct": true, "explanation": "Это убирает циклы ожидания." },
    { "text": "Держать транзакции короткими.", "correct": true, "explanation": "Меньше времени на конфликт." },
    { "text": "Использовать `lock_timeout`.", "correct": true, "explanation": "Ожидание не будет бесконечным." },
    { "text": "Блокировать как можно больше строк заранее.", "correct": false, "explanation": "Это увеличивает конфликты." }
  ],
  "explanation": "Порядок, короткие транзакции и таймауты — базовая защита от взаимных блокировок."
}
```
