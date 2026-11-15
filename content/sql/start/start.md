---
title: База данных без страха
keywords: sql с нуля, база данных, реляционная модель, таблицы, ключи, select, null, типы данных, postgresql, кофейня
svg: |
  <svg viewBox="0 0 900 280" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 900px; max-height: 280px; height: auto; display: block; margin: 0 auto 20px;">
    <style>
      .t { fill: var(--text-main, #f4f6fb); }
      .d { fill: var(--bg-main, #16181d); }
      .a { fill: var(--domain-accent, #235ce1); }
      .st { stroke: var(--text-main, #f4f6fb); }
      .sa { stroke: var(--domain-accent, #235ce1); }
      .mono { font-family: 'JetBrains Mono', monospace; }
      .flow { stroke-dasharray: 6 7; animation: dash 2.4s linear infinite; }
      @keyframes dash { to { stroke-dashoffset: -26; } }
      .steam { animation: rise 3s ease-in-out infinite; }
      @keyframes rise { 0%,100% { opacity: .35; transform: translateY(2px); } 50% { opacity: .9; transform: translateY(-4px); } }
    </style>
    <g opacity="0.18" class="st">
      <circle cx="70" cy="70" r="3" />
      <circle cx="835" cy="55" r="3" />
      <path d="M770 205h16M778 197v16M120 220h14M127 213v14" stroke-width="2" />
    </g>
    <g class="st" stroke-width="2">
      <ellipse cx="190" cy="92" rx="66" ry="18" class="d" />
      <path d="M124 92v86c0 10 30 18 66 18s66-8 66-18V92" class="d" />
      <ellipse cx="190" cy="178" rx="66" ry="18" class="d" />
      <path d="M124 132c0 10 30 18 66 18s66-8 66-18" opacity=".55" />
    </g>
    <ellipse cx="190" cy="92" rx="66" ry="18" class="a" opacity=".9" />
    <path d="M124 92v86c0 10 30 18 66 18s66-8 66-18V92" class="sa" stroke-width="2" />
    <g class="mono t" font-size="13" opacity=".8">
      <text x="150" y="128">customers</text>
      <text x="156" y="150">orders</text>
      <text x="154" y="172">drinks</text>
    </g>
    <g transform="translate(390 50)">
      <path d="M40 120h120v22c0 26-22 46-60 46s-60-20-60-46z" class="t" />
      <path d="M160 128h18c20 0 30 12 30 28s-12 28-30 28h-12" class="st" stroke-width="8" stroke-linecap="round" />
      <path d="M58 82c-10-14 10-20 0-34M92 82c-10-14 10-20 0-34M126 82c-10-14 10-20 0-34" class="sa steam" stroke-width="4" stroke-linecap="round" />
      <ellipse cx="100" cy="196" rx="78" ry="10" class="a" opacity=".22" />
    </g>
    <g transform="translate(660 78)">
      <path d="M60 0l54 20v40c0 34-24 58-54 68-30-10-54-34-54-68V20z" class="d" stroke="var(--text-main, #f4f6fb)" stroke-width="3" />
      <path d="M36 60l16 16 32-36" class="sa" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <path d="M300 150h72M548 150h84" class="sa flow" stroke-width="3" stroke-linecap="round" />
    <g class="mono" font-size="12" fill="var(--domain-accent, #235ce1)" opacity=".95">
      <text x="390" y="238">данные</text>
      <text x="470" y="238">правила</text>
      <text x="560" y="238">ответы</text>
    </g>
    <text x="40" y="250" class="mono t" font-size="12" opacity=".5">01 / SQL</text>
  </svg>

---

# База данных без страха

Почему данные в Excel ломаются, а база — нет, и как сделать первый запрос, не утонув в теории?

База данных — это не «файл с таблицами», а сервер, который хранит факты, проверяет правила и отвечает на вопросы. В этой группе — экскурсия по её устройству: от таблицы и строки до ключей, `NULL` и первого `SELECT`. Без реляционной алгебры и доказательств: только модель, которая нужна, чтобы уверенно писать запросы.

## Кофейня, которая теряла заказы

Представь кофейню «Зерно». Три бариста записывают заказы в один Excel на общем диске. В пятницу файл открывают одновременно: один добавляет заказ, второй меняет цену, третий сохраняет старую версию. В итоге один заказ исчез, у другого цена осталась прошлогодней, а на вопрос «сколько мы заработали за день» никто не может ответить быстро.

База решает три проблемы сразу: не даёт потерять изменения, проверяет данные по правилам и умеет отвечать на вопросы одним запросом. Вместо пересчёта вручную — `SELECT`, который считает выручку по дням.

```sql
SELECT COUNT(*) AS orders_count
FROM orders;
```

## Что разберём

Сначала — из чего состоит база: сервер, база, схема, таблица, строка, столбец. Потом — как таблицы связываются ключами и почему `NULL` — это не ноль. Затем запустим PostgreSQL, сделаем первый `SELECT` и разберём, в каком порядке база на самом деле выполняет запрос. В конце — схема кофейни, с которой мы будем работать весь раздел, и различия между диалектами SQL.

Главная мысль группы: база — это строгий блокнот. Чем точнее описаны правила и связи, тем меньше сюрпризов в приложении. Дальше будем учиться задавать этому блокноту всё более сложные вопросы.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что из перечисленного база данных берёт на себя, а не приложение?",
  "options": [
    { "text": "Проверку, что у заказа существует клиент", "correct": true, "explanation": "Это делает внешний ключ на уровне схемы." },
    { "text": "Показ кнопки «Оформить заказ»", "correct": false, "explanation": "Это интерфейс приложения." },
    { "text": "Выбор цвета для карточки напитка", "correct": false, "explanation": "Оформление — задача фронтенда." }
  ],
  "explanation": "База хранит факты и проверяет правила, а интерфейс и бизнес-сценарии остаются в приложении."
}
```
