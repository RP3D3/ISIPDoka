---
title: Комбинирование операторов
description: Как собирать запросы из нескольких операторов и не получить пустую выдачу.
keywords: комбинирование операторов, site, filetype, кавычки, минус-слова, запрос

---

# Комбинирование операторов

Операторы можно сочетать. Но чем больше условий, тем выше риск пустой
выдачи.

## Базовый пример

```text
site:docs.python.org filetype:pdf "asyncio" -tutorial
```

Разбор:

- `site:` — только сайт документации;
- `filetype:pdf` — только PDF;
- `"asyncio"` — точный термин;
- `-tutorial` — без туториалов.

## Правило одного шага

Добавляйте по одному оператору и смотрите, что меняется. Так вы поймёте,
какой из них ломает выдачу.

## Пример для ошибки

```text
"ModuleNotFoundError" site:github.com python
```

## Пример для документа

```text
filetype:pdf "политика конфиденциальности" site:example.ru
```

## Частые ошибки

- **Сразу писать пять операторов.** Сложно понять, что не работает.
- **Ставить пробел после двоеточия.**
- **Смешивать несовместимые условия.**
- **Забывать убрать лишний оператор.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как лучше добавлять операторы?",
  "options": [
    {
      "text": "По одному и проверять выдачу",
      "correct": true,
      "explanation": "Так видно эффект каждого условия."
    },
    {
      "text": "Все сразу",
      "correct": false,
      "explanation": "Сложно понять, что сломало запрос."
    },
    {
      "text": "Только в конце недели",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "Пошаговое уточнение надёжнее."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про комбинирование?",
  "options": [
    {
      "text": "Операторы можно сочетать",
      "correct": true
    },
    {
      "text": "Слишком много условий может дать пустую выдачу",
      "correct": true
    },
    {
      "text": "Лучше проверять эффект каждого оператора",
      "correct": true
    },
    {
      "text": "Чем больше операторов, тем всегда лучше",
      "correct": false,
      "explanation": "Иногда они мешают."
    }
  ],
  "explanation": "Комбинирование требует проверки."
}
```

## Куда дальше

- [Операторы и продвинутые запросы](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/operatory-i-prodvinutye-zaprosy.md)
- [Практика: операторы поиска](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/praktika-operatory-poiska.md)
- [Поиск по документации и файлам](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/poisk-po-dokumentacii-i-faylam.md)
