---
title: Объекты БД и безопасность
keywords: функции sql, процедуры, plpgsql, триггеры, jsonb, полнотекстовый поиск, роли, права, sql-инъекции, postgresql, безопасность
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
    <text x="40" y="54" class="mono t" font-size="13" opacity=".55">SQL / 10</text>
    <text x="40" y="86" class="t" font-size="22" font-weight="700">ОБЪЕКТЫ</text>
    <g transform="translate(280 30)"><g class="st" stroke-width="2.2">
      <rect x="18" y="26" width="160" height="150" rx="16" class="d" />
      <circle cx="98" cy="101" r="48" class="d" stroke-width="3" />
      <circle cx="98" cy="101" r="24" class="a" opacity=".85" />
      <path d="M98 77v48M74 101h48" class="d" stroke-width="4" />
      <path d="M178 101h20" class="sa" stroke-width="5" />
      <path d="M228 66l16 16 26-26" class="sa" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M226 128h44M226 148h30" class="sa" stroke-width="3" stroke-linecap="round" opacity=".7" />
    </g></g>
    <path d="M250 158h44" class="sa flow" stroke-width="3" stroke-linecap="round" />
    <g transform="translate(620 196)">
      <g transform="translate(0 0)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">PL/PGSQL</text></g><g transform="translate(0 26)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">JSONB</text></g><g transform="translate(0 52)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">GRANT</text></g>
    </g>
  </svg>

---

# Объекты БД и безопасность

Как перенести часть логики в базу, хранить гибкий JSON и при этом не открыть дверь SQL-инъекциям?

База — не только таблицы. В ней живут функции, процедуры, триггеры, типы и права доступа. Они позволяют автоматизировать правила, хранить полуструктурированные данные и разграничивать доступ. Но чем больше возможностей, тем важнее безопасность: одна склеенная строка запроса может стоить всей базы.

## Аудит цены

Владелец хочет знать, кто и когда менял цену напитка. Можно писать `INSERT` в историю вручную из приложения, а можно повесить триггер:

```sql
CREATE TABLE price_history (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    drink_id BIGINT NOT NULL,
    old_price NUMERIC(10, 2),
    new_price NUMERIC(10, 2),
    changed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    changed_by TEXT NOT NULL DEFAULT current_user
);

CREATE FUNCTION log_price_change() RETURNS trigger AS $$
BEGIN
    INSERT INTO price_history (drink_id, old_price, new_price)
    VALUES (NEW.id, OLD.price, NEW.price);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER drinks_price_audit
AFTER UPDATE OF price ON drinks
FOR EACH ROW
WHEN (OLD.price IS DISTINCT FROM NEW.price)
EXECUTE FUNCTION log_price_change();
```

Теперь история не зависит от дисциплины приложения.

## Что разберём

Сначала — функции и процедуры, `PL/pgSQL` и триггеры. Потом — ошибки и `RAISE`, `JSONB` и полнотекстовый поиск. Дальше — роли, права и SQL-инъекции: как параметризовать запросы и почему конкатенация строк опасна. В конце — практика: аудит цен.

Главная мысль группы: логика в базе — это сила и ответственность. Чем больше кода в базе, тем важнее тесты, права и понятные ошибки.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен триггер?",
  "options": [
    { "text": "Чтобы автоматически выполнять логику при изменении данных", "correct": true, "explanation": "Например, писать историю цен." },
    { "text": "Чтобы ускорить `SELECT`", "correct": false, "explanation": "Для этого нужны индексы." },
    { "text": "Чтобы создать резервную копию базы", "correct": false, "explanation": "Это задача резервного копирования." }
  ],
  "explanation": "Триггер — это обработчик события `INSERT`, `UPDATE` или `DELETE`."
}
```
