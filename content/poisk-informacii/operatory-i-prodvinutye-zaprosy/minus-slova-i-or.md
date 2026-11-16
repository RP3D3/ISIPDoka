---
title: Минус-слова и OR
description: Как исключать лишнее и искать альтернативы через OR.
keywords: минус-слова, OR, исключение, альтернативы, операторы поиска

---

# Минус-слова и OR

Минус-слово исключает страницы с ненужным термином. `OR` ищет хотя бы
один из вариантов.

## Минус

```text
python asyncio -tutorial
java stream -youtube
купить ноутбук -бу
```

Важно: минус ставится прямо перед словом, без пробела.

## `OR`

```text
javascript OR typescript tutorial
ошибка OR exception python
```

В большинстве поисковиков `OR` пишется заглавными буквами. Некоторые
системы используют `|`.

## Когда помогает

- в выдаче много туториалов, а нужна документация;
- слово имеет несколько значений;
- нужно проверить синонимы;
- нужно исключить магазины или видео.

## Частые ошибки

- **Писать `- слово` с пробелом.** Это может не сработать.
- **Писать `or` строчными.** Некоторые поисковики не распознают.
- **Исключать слишком много.** Можно потерять полезное.
- **Забывать, что `OR` расширяет выдачу.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает минус перед словом?",
  "options": [
    {
      "text": "Исключает страницы с этим словом",
      "correct": true,
      "explanation": "Это сужает выдачу."
    },
    {
      "text": "Добавляет синонимы",
      "correct": false,
      "explanation": "Для этого есть OR."
    },
    {
      "text": "Меняет регион",
      "correct": false,
      "explanation": "Регион задаётся иначе."
    }
  ],
  "explanation": "Минус-слово убирает лишнее."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про операторы?",
  "options": [
    {
      "text": "`-слово` исключает слово",
      "correct": true
    },
    {
      "text": "`OR` ищет альтернативы",
      "correct": true
    },
    {
      "text": "`OR` обычно пишут заглавными",
      "correct": true
    },
    {
      "text": "Минус-слово расширяет выдачу",
      "correct": false,
      "explanation": "Оно сужает выдачу."
    }
  ],
  "explanation": "Минус сужает, OR расширяет."
}
```

## Куда дальше

- [intitle, inurl, allintext](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/intitle-inurl-allintext.md)
- [Даты, язык и регион](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/daty-yazyk-region.md)
- [Комбинирование операторов](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/kombinirovanie-operatorov.md)
