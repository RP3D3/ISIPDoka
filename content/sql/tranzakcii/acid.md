---
title: ACID на примере заказа
keywords: acid, атомарность, согласованность, изолированность, долговечность, транзакции, commit, rollback, postgresql, кофейня
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
    <text x="40" y="50" class="mono t" font-size="12" opacity=".5">SQL / ACID</text>
    <g transform="translate(70 34)"><g class="st" stroke-width="2.2">
      <rect x="0" y="46" width="54" height="110" rx="9" class="d" />
      <rect x="70" y="46" width="54" height="110" rx="9" class="d" />
      <rect x="140" y="46" width="54" height="110" rx="9" class="d" />
      <rect x="210" y="46" width="54" height="110" rx="9" class="a" opacity=".85" />
      <text x="14" y="112" class="mono t" font-size="24">A</text>
      <text x="84" y="112" class="mono t" font-size="24">C</text>
      <text x="154" y="112" class="mono t" font-size="24">I</text>
      <text x="224" y="112" class="mono d" font-size="24">D</text>
      <path d="M0 184h264" class="sa" stroke-width="2" opacity=".3" />
    </g></g>
    <g transform="translate(640 196)">
      <g transform="translate(0 0)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">атомарность</text></g><g transform="translate(0 25)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">изоляция</text></g><g transform="translate(0 50)"><rect x="0" y="-15" width="180" height="19" rx="9" class="a" opacity=".14" /><text x="11" y="-2" class="mono t" font-size="10.5" opacity=".76">надёжность</text></g>
    </g>
  </svg>

---

# ACID на примере заказа

Почему после сбоя питания заказ либо существует целиком, либо не существует вовсе, а деньги не списываются дважды?

`ACID` — четыре свойства транзакций: атомарность, согласованность, изолированность и долговечность. Название звучит академично, но за ним стоят очень практичные вещи: либо все шаги заказа применились, либо ни один; данные не нарушают правил; параллельные операции не видят чужих незавершённых изменений; после `COMMIT` данные переживут перезагрузку.

## Разбор на заказе

Клиент покупает два капучино. Приложение должно:

1. Создать заказ.
2. Добавить позицию.
3. Уменьшить остаток ингредиентов.
4. Записать сумму.

```sql
BEGIN;

INSERT INTO orders (customer_id, status, total)
VALUES (1, 'new', 0)
RETURNING id;

INSERT INTO order_items (order_id, drink_id, quantity, unit_price)
VALUES (129, 2, 2, 280.00);

UPDATE orders SET total = 560.00 WHERE id = 129;

COMMIT;
```

| Свойство | Что означает здесь |
| --- | --- |
| **A**томарность | либо все четыре команды, либо ни одной |
| **C**огласованность | сумма и позиции не нарушают ограничений |
| **I**золированность | другой кассир не увидит заказ до `COMMIT` |
| **D**олговечность | после `COMMIT` заказ не пропадёт при сбое |

## Что ломается без ACID

- **Без атомарности** заказ создан, а позиция нет. Итог — пустой заказ и неверная сумма.
- **Без согласованности** можно записать отрицательную цену или ссылку на несуществующий напиток.
- **Без изолированности** два кассира одновременно читают остаток `1` и оба продают последний круассан.
- **Без долговечности** после `COMMIT` и падения сервера заказ исчезает.

## Как это устроено в PostgreSQL

PostgreSQL пишет изменения в журнал предзаписи (`WAL`) до того, как они попадут в основные файлы. После `COMMIT` запись считается зафиксированной: при сбое база восстановит данные из журнала. Незавершённые транзакции откатываются.

## Грабли

* **`AUTOCOMMIT`.** По умолчанию каждая команда — отдельная транзакция. Без явного `BEGIN` четыре команды заказа не станут одним целым.
* **`COMMIT` слишком рано.** Если зафиксировать заказ до позиций, сбой оставит пустой заказ.
* **`COMMIT` слишком поздно.** Долгая транзакция держит блокировки и мешает другим.
* **ACID не отменяет ошибок логики.** База гарантирует целостность, но не то, что сумма посчитана правильно.
* **`D` не заменяет резервные копии.** Долговечность защищает от сбоя сервера, но не от `DROP TABLE` или ошибки администратора.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что означает атомарность транзакции?",
  "options": [
    { "text": "Все команды выполняются целиком или не выполняются вовсе", "correct": true, "explanation": "Это свойство `A` в `ACID`." },
    { "text": "Транзакция выполняется быстрее обычных команд", "correct": false, "explanation": "Скорость не входит в `ACID`." },
    { "text": "Данные хранятся в атомах", "correct": false, "explanation": "Название не про физику." }
  ],
  "explanation": "Атомарность — это «всё или ничего»."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `ACID`?",
  "options": [
    { "text": "`D` означает, что после `COMMIT` данные переживут сбой.", "correct": true, "explanation": "Это долговечность." },
    { "text": "`I` означает, что параллельные транзакции не видят чужих незавершённых изменений.", "correct": true, "explanation": "Это изолированность." },
    { "text": "`C` гарантирует, что бизнес-логика приложения верна.", "correct": false, "explanation": "База проверяет ограничения, но не смысл расчётов." },
    { "text": "Без явного `BEGIN` каждая команда по умолчанию отдельная транзакция.", "correct": true, "explanation": "Это режим `AUTOCOMMIT`." }
  ],
  "explanation": "`ACID` защищает целостность данных, но не заменяет корректную логику."
}
```
