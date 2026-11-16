---
title: Игровые паттерны и алгоритмы
description: Сводка по паттернам: состояния, инвентарь, лут, случайность, управление, AI, генерация и сохранения.
keywords: игровые паттерны, алгоритмы, итог, FSM, инвентарь, лут, случайность, AI, сохранения

---

# Игровые паттерны и алгоритмы

Эта группа собрала приёмы, которые чаще всего нужны в прототипе: от состояний
врага до сохранений. Ниже — короткая карта, чтобы выбрать, что читать дальше.

## Состояния и поведение

- [Состояния и конечные автоматы](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/sostoyaniya-i-konechnye-avtomaty.md)
  — явные состояния вместо хаоса флагов.
- [AI: патруль и поведение](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/ai-patrul-i-povedenie.md)
  — патруль, погоня, поиск и возврат.

## Предметы и награды

- [Инвентарь](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/inventar.md)
  — слоты, стеки и ограничения.
- [Предметы и экипировка](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/predmety-i-ekipirovka.md)
  — данные предметов и бонусы.
- [Loot и таблицы дропа](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/loot-i-tablicy-dropa.md)
  — как выдавать награды.

## Случайность

- [Случайность и seed](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/random-i-seed.md)
  — воспроизводимость.
- [Взвешенный случайный выбор](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/vzveshennyy-random.md)
  — редкие и частые варианты.
- [Pity-система и псевдослучайность](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/pity-i-psevdosluchaynost.md)
  — защита от плохих серий.

## Управление и ощущение

- [Coyote time и jump buffer](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/coyote-time-i-jump-buffer.md)
  — прощение позднего и раннего прыжка.
- [Game feel](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/game-feel.md)
  — отклик, hit stop, камера и звук.
- [Управление и камера](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/upravlenie-i-kamera.md)
  — ввод, мёртвые зоны, следование.

## Мир и данные

- [Процедурная генерация](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/procedurnaya-generaciya.md)
  — seed, правила и валидация.
- [Сохранения и миграции](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/sohraneniya-i-versii.md)
  — версии и надёжная запись.
- [Пул объектов и производительность](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/pooling-i-proizvoditelnost.md)
  — переиспользование объектов.

## Как выбирать паттерн

1. Сначала опишите проблему словами.
2. Проверьте, нужен ли вообще паттерн.
3. Сделайте минимальную версию.
4. Проверьте в игре.
5. Усложняйте только при необходимости.

Паттерн — не цель. Цель — понятное поведение и хороший опыт игрока.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что объединяет паттерны этой группы?",
  "options": [
    {
      "text": "Они решают типовые задачи игрового прототипа",
      "correct": true,
      "explanation": "Это практические приёмы, а не теория ради теории."
    },
    {
      "text": "Они нужны только для AAA-игр",
      "correct": false,
      "explanation": "Многие приёмы полезны и в маленьких играх."
    },
    {
      "text": "Они заменяют геймдизайн",
      "correct": false,
      "explanation": "Паттерны поддерживают дизайн, но не заменяют его."
    }
  ],
  "explanation": "Паттерны помогают реализовывать идеи."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про выбор паттерна?",
  "options": [
    {
      "text": "Сначала понять проблему",
      "correct": true
    },
    {
      "text": "Сделать минимальную версию",
      "correct": true
    },
    {
      "text": "Проверить в игре",
      "correct": true
    },
    {
      "text": "Внедрять самый сложный паттерн сразу",
      "correct": false,
      "explanation": "Сложность должна быть оправдана."
    }
  ],
  "explanation": "Паттерн выбирают под задачу, а не наоборот."
}
```

## Куда дальше

- [Практика: прототип на одном экране](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/praktika-prototip.md)
- [Принципы геймдизайна](theme.html?path=content/igrostroenie/principy-geymdizayna/chto-takoe-geymdizayn.md)
