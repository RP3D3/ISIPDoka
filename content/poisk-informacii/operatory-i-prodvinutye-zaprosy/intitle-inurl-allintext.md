---
title: intitle, inurl, allintext
description: Как искать по заголовку, адресу страницы и тексту, когда обычный запрос слишком широк.
keywords: intitle, inurl, allintext, заголовок, URL, операторы

---

# intitle, inurl, allintext

Эти операторы уточняют, где именно искать слово: в заголовке, в адресе
или в тексте.

## `intitle:`

```text
intitle:"руководство пользователя" pdf
intitle:changelog python
```

Ищет слово или фразу в заголовке страницы.

## `inurl:`

```text
inurl:docs python asyncio
inurl:api github
```

Ищет слово в URL. Полезно для разделов `/docs/`, `/api/`, `/wiki/`.

## `allintext:`

```text
allintext:python json decode error
```

Просит, чтобы все слова встретились в тексте страницы.

## Ограничения

- операторы поддерживаются по-разному;
- слишком много условий даёт пустую выдачу;
- заголовок может не совпадать с содержанием;
- URL может быть неинформативным.

## Частые ошибки

- **Писать `intitle: слово` с пробелом.** Обычно нужно без пробела.
- **Использовать все операторы сразу.**
- **Думать, что заголовок гарантирует качество.**
- **Забывать проверить страницу.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `intitle:`?",
  "options": [
    {
      "text": "Ищет слово в заголовке страницы",
      "correct": true,
      "explanation": "Это сужает поиск."
    },
    {
      "text": "Ищет слово в URL",
      "correct": false,
      "explanation": "Для этого есть inurl."
    },
    {
      "text": "Ищет только PDF",
      "correct": false,
      "explanation": "Для этого есть filetype."
    }
  ],
  "explanation": "intitle работает с заголовком."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про эти операторы?",
  "options": [
    {
      "text": "`inurl:` ищет в адресе",
      "correct": true
    },
    {
      "text": "`allintext:` требует все слова в тексте",
      "correct": true
    },
    {
      "text": "Слишком много операторов может обнулить выдачу",
      "correct": true
    },
    {
      "text": "Они гарантируют качество источника",
      "correct": false,
      "explanation": "Они только сужают поиск."
    }
  ],
  "explanation": "Операторы управляют местом поиска, а не качеством."
}
```

## Куда дальше

- [Даты, язык и регион](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/daty-yazyk-region.md)
- [Поиск по документации и файлам](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/poisk-po-dokumentacii-i-faylam.md)
- [Комбинирование операторов](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/kombinirovanie-operatorov.md)
