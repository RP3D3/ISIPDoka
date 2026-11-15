---
title: Транзакции и блокировки
keywords: транзакции sql, acid, commit, rollback, уровни изоляции, блокировки, deadlock, конкурентность, postgresql, кофейня
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
    <g opacity="0.16" class="st">
      <circle cx="66" cy="66" r="3" />
      <circle cx="838" cy="58" r="3" />
      <path d="M760 230h16M768 222v16M110 232h14M117 225v14" stroke-width="2" />
      <path d="M40 130h-18M850 120h18" stroke-width="2" />
    </g>
    <text x="40" y="54" class="mono t" font-size="13" opacity=".55">SQL / 08</text>
    <text x="40" y="86" class="t" font-size="22" font-weight="700">ТРАНЗАКЦИИ</text>
    <g transform="translate(280 30)"><g class="st" stroke-width="2.2">
      <path d="M110 12l82 30v58c0 50-34 84-82 98-48-14-82-48-82-98V42z" class="d" />
      <rect x="80" y="104" width="60" height="50" rx="8" class="a" opacity=".9" />
      <path d="M94 104V86c0-18 32-18 32 0v18" class="sa" stroke-width="5" />
      <circle cx="110" cy="128" r="7" class="d" />
      <path d="M208 56h74M208 88h52M208 120h64" class="sa" stroke-width="3" stroke-linecap="round" opacity=".8" />
      <text x="208" y="156" class="mono t" font-size="12" opacity=".55">BEGIN / COMMIT</text>
    </g></g>
    <path d="M250 158h44" class="sa flow" stroke-width="3" stroke-linecap="round" />
    <g transform="translate(620 196)">
      <g transform="translate(0 0)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">ACID</text></g><g transform="translate(0 26)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">COMMIT</text></g><g transform="translate(0 52)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">LOCK</text></g>
    </g>
  </svg>

---

# Транзакции и блокировки

Что будет, если два кассира одновременно продадут последний круассан, а приложение спишет остаток по очереди и получит минус на складе?

До сих пор мы меняли данные по одной команде. В реальной работе команды идут вместе: создать заказ, добавить позиции, пересчитать сумму, списать ингредиенты. Если между шагами что-то упадёт, база останется в полусобранном состоянии. Транзакции решают эту проблему: набор команд выполняется целиком или не выполняется вовсе.

## Заказ как единое целое

```sql
BEGIN;

INSERT INTO orders (customer_id, status, total)
VALUES (1, 'new', 0)
RETURNING id;

INSERT INTO order_items (order_id, drink_id, quantity, unit_price)
VALUES (129, 2, 2, 280.00);

UPDATE orders
SET total = 560.00
WHERE id = 129;

COMMIT;
```

Если `INSERT` позиции упадёт, `ROLLBACK` вернёт базу к состоянию до `BEGIN`. Клиент не увидит заказ без позиций, а склад не спишет лишнее.

## Что разберём

Сначала — `ACID` на примере заказа: почему атомарность, согласованность, изолированность и долговечность важны. Потом — `BEGIN`, `COMMIT`, `ROLLBACK` и `SAVEPOINT`. Разберём уровни изоляции и аномалии: грязное чтение, неповторяющееся чтение, фантомы. Дальше — блокировки, `deadlock`, оптимистичный и пессимистичный подход. В конце — целостность, каскады и практика: оформляем заказ атомарно.

Главная мысль группы: транзакция — это граница смысла. Внутри неё данные могут быть временно несогласованными, но снаружи — только целостное состояние.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `ROLLBACK`?",
  "options": [
    { "text": "Отменяет изменения текущей транзакции", "correct": true, "explanation": "База возвращается к состоянию до `BEGIN`." },
    { "text": "Сохраняет изменения навсегда", "correct": false, "explanation": "Это `COMMIT`." },
    { "text": "Удаляет таблицу", "correct": false, "explanation": "Это `DROP TABLE`." }
  ],
  "explanation": "`ROLLBACK` — это отмена незавершённой транзакции."
}
```
