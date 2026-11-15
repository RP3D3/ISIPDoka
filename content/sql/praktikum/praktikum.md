---
title: Практикум: SQL в реальной задаче
keywords: практикум sql, реальная задача, каталог, заказы, отчёты, аналитика, оптимизация, чек-лист, postgresql, кофейня
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
    <text x="40" y="54" class="mono t" font-size="13" opacity=".55">SQL / 12</text>
    <text x="40" y="86" class="t" font-size="22" font-weight="700">ПРАКТИКУМ</text>
    <g transform="translate(280 30)"><g class="st" stroke-width="2.2">
      <path d="M20 108h200v86H20z" class="d" />
      <path d="M10 108l24-58h172l24 58" class="d" />
      <path d="M34 108v86M206 108v86" opacity=".55" />
      <rect x="76" y="132" width="60" height="62" rx="6" class="a" opacity=".85" />
      <path d="M106 132v62M76 158h60" class="d" stroke-width="3" />
      <path d="M168 130h22M168 146h22M168 162h16" class="sa" stroke-width="3" stroke-linecap="round" />
      <circle cx="258" cy="86" r="28" class="d" stroke-width="3" />
      <path d="M244 86h28M258 72v28" class="sa" stroke-width="3" />
    </g></g>
    <path d="M250 158h44" class="sa flow" stroke-width="3" stroke-linecap="round" />
    <g transform="translate(620 196)">
      <g transform="translate(0 0)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">КАТАЛОГ</text></g><g transform="translate(0 26)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">ОТЧЁТЫ</text></g><g transform="translate(0 52)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">ЧЕК-ЛИСТ</text></g>
    </g>
  </svg>

---

# Практикум: SQL в реальной задаче

Как собрать всё изученное в один сквозной сценарий: от требований и схемы до каталога, заказов, отчётов и оптимизации?

Это финальная группа. Здесь нет новых конструкций языка — только применение. Мы пройдём путь реальной задачи: заказчик описывает кофейню, мы проектируем схему, наполняем данными, пишем запросы для каталога и заказов, строим отчёты, считаем повторные покупки и проверяем производительность.

## Сценарий

Кофейня «Зерно» хочет сайт с меню, корзиной и личным кабинетом. Владелец хочет видеть выручку, топ напитков и клиентов, которые возвращаются. Данные — в PostgreSQL.

```text
Клиент → каталог → корзина → заказ → оплата → доставка
Владелец → отчёты → решения о меню и ценах
```

## Что разберём

Сначала — требования и схема, затем данные. Потом — каталог с фильтрами, сортировкой и пагинацией. Разберём оформление заказа и корзину. Дальше — отчёты и аналитика повторных покупок. В конце — `EXPLAIN`, индексы и чек-лист продакшена.

Главная мысль группы: SQL — это не набор команд, а способ отвечать на вопросы бизнеса. Схема, запросы и индексы должны служить этим вопросам.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "С чего начинается реальная задача с базой?",
  "options": [
    { "text": "С требований и вопросов, на которые нужны ответы", "correct": true, "explanation": "Схема и запросы следуют из задач." },
    { "text": "С создания всех возможных индексов", "correct": false, "explanation": "Индексы добавляют под конкретные запросы." },
    { "text": "С выбора ORM", "correct": false, "explanation": "Инструмент вторичен по отношению к модели." }
  ],
  "explanation": "Сначала вопрос, потом схема и запрос."
}
```
