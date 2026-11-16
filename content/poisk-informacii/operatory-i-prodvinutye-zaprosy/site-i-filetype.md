---
title: site: и filetype:
description: Как искать только на нужном сайте или только в определённом формате файлов.
keywords: site, filetype, поиск по сайту, pdf, документация, операторы

---

# site: и filetype:

Оператор `site:` ограничивает поиск одним сайтом. `filetype:` — одним
форматом файла.

## `site:`

```text
site:docs.python.org asyncio timeout
site:github.com "connection refused" python
site:government.ru закон о персональных данных
```

Полезно, когда вы доверяете конкретному источнику.

## `filetype:`

```text
filetype:pdf python style guide
filetype:docx договор оказания услуг
filetype:csv example dataset
```

Полезно для документов, отчётов, таблиц и презентаций.

## Комбинация

```text
site:docs.python.org filetype:pdf asyncio
```

Ищите PDF-документы только на официальном сайте документации.

## Ограничения

- не все сайты разрешают полную индексацию;
- формат может быть указан неверно;
- `site:` не гарантирует, что страница официальная;
- операторы могут отличаться в разных поисковиках.

## Частые ошибки

- **Писать `site: docs.python.org` с пробелом.** Обычно пробел ломает
  оператор.
- **Использовать `filetype: pdf`.** Формат пишется без пробела.
- **Доверять любому сайту с нужным доменом.** Проверяйте раздел и автора.
- **Забывать альтернативы.** Не все документы лежат в PDF.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `site:docs.python.org`?",
  "options": [
    {
      "text": "Ограничивает поиск этим сайтом",
      "correct": true,
      "explanation": "Другие домены исключаются."
    },
    {
      "text": "Ищет только PDF",
      "correct": false,
      "explanation": "Для этого есть filetype."
    },
    {
      "text": "Переводит запрос на английский",
      "correct": false,
      "explanation": "Оператор не переводит."
    }
  ],
  "explanation": "`site:` сужает поиск до домена."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про `filetype:`?",
  "options": [
    {
      "text": "Ограничивает формат файла",
      "correct": true
    },
    {
      "text": "Пишется без пробела после двоеточия",
      "correct": true
    },
    {
      "text": "Может комбинироваться с `site:`",
      "correct": true
    },
    {
      "text": "Гарантирует качество документа",
      "correct": false,
      "explanation": "Формат не гарантирует содержание."
    }
  ],
  "explanation": "Операторы сужают поиск, но не проверяют качество."
}
```

## Куда дальше

- [Минус-слова и OR](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/minus-slova-i-or.md)
- [intitle, inurl, allintext](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/intitle-inurl-allintext.md)
- [Поиск по документации и файлам](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/poisk-po-dokumentacii-i-faylam.md)
