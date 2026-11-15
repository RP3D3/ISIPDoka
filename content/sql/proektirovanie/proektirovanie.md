---
title: Проектирование схемы
keywords: проектирование бд, сущности, er-диаграмма, нормализация, 1нф, 2нф, 3нф, денормализация, именование, audit-поля, postgresql
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
    <text x="40" y="54" class="mono t" font-size="13" opacity=".55">SQL / 11</text>
    <text x="40" y="86" class="t" font-size="22" font-weight="700">СХЕМА</text>
    <g transform="translate(280 30)"><g class="st" stroke-width="2.2">
      <rect x="10" y="24" width="88" height="52" rx="8" class="d" />
      <rect x="180" y="24" width="88" height="52" rx="8" class="d" />
      <rect x="95" y="126" width="88" height="52" rx="8" class="a" opacity=".85" />
      <path d="M98 50h82M139 76v50M228 76v50M139 100h44" class="sa" stroke-width="2.5" />
      <circle cx="98" cy="50" r="5" class="a" />
      <circle cx="180" cy="50" r="5" class="a" />
      <circle cx="139" cy="152" r="5" class="d" />
      <path d="M26 44h52M196 44h52M112 146h52" opacity=".5" />
    </g></g>
    <path d="M250 158h44" class="sa flow" stroke-width="3" stroke-linecap="round" />
    <g transform="translate(620 196)">
      <g transform="translate(0 0)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">1НФ / 2НФ</text></g><g transform="translate(0 26)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">3НФ</text></g><g transform="translate(0 52)"><rect x="0" y="-16" width="190" height="20" rx="10" class="a" opacity=".14" /><text x="12" y="-2" class="mono t" font-size="11" opacity=".78">ER</text></g>
    </g>
  </svg>

---

# Проектирование схемы

Как из фразы «хочу доставлять кофе» получить таблицы, которые не придётся переделывать через месяц?

Проектирование схемы — это перевод требований в сущности, связи и правила. Хорошая схема не просто хранит данные: она не даёт создать противоречивое состояние. Плохая схема работает на демо, а потом обрастает дублями, `NULL` и запросами, которые никто не понимает.

## От требований к таблицам

Владелец говорит: «Клиент заказывает напитки, мы доставляем по адресам, хотим видеть историю». Разбираем на сущности:

| Сущность | Что хранит |
| --- | --- |
| `customers` | клиенты |
| `addresses` | адреса доставки |
| `drinks` | меню |
| `orders` | заказы |
| `order_items` | позиции заказа |

Связи: клиент → заказы, заказ → позиции, напиток → позиции, клиент → адреса. Каждая связь получает внешний ключ.

## Что разберём

Сначала — как вытащить сущности из требований и нарисовать ER-диаграмму. Потом — нормализацию: 1НФ, 2НФ, 3НФ на реальных аномалиях, а не на формальных определениях. Разберём, когда денормализовать оправдано. В конце — именование, типы, audit-поля и практика: схема доставки.

Главная мысль группы: схема — это модель реальности. Чем точнее связи и ограничения, тем меньше логики приходится повторять в приложении.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что даёт нормализация?",
  "options": [
    { "text": "Убирает дубли и противоречия в данных", "correct": true, "explanation": "Каждый факт хранится в одном месте." },
    { "text": "Всегда ускоряет все запросы", "correct": false, "explanation": "Иногда добавляет соединения." },
    { "text": "Заменяет индексы", "correct": false, "explanation": "Это разные инструменты." }
  ],
  "explanation": "Нормализация — это борьба с аномалиями, а не универсальное ускорение."
}
```
