---
title: Поиск по документации и файлам
description: Как искать в официальной документации, PDF, API-справочниках и больших файлах.
keywords: поиск по документации, PDF, API, filetype, site, официальные документы

---

# Поиск по документации и файлам

Документация — один из самых надёжных источников. Но её нужно уметь
искать.

## Официальный сайт

```text
site:docs.python.org pathlib
site:developer.mozilla.org fetch
site:learn.microsoft.com async await
```

## PDF и документы

```text
filetype:pdf python style guide
filetype:pdf техническое задание образец
filetype:docx политика конфиденциальности шаблон
```

## API-справочники

Ищите разделы:

- `/api/`;
- `/reference/`;
- `/docs/`;
- `/guide/`.

```text
site:docs.example.com inurl:api authentication
```

## Версия

Добавьте версию:

```text
python 3.12 pathlib
react 19 useEffect
```

## Частые ошибки

- **Искать в блогах вместо официальной документации.**
- **Не указывать версию.**
- **Скачивать случайный PDF без автора.**
- **Игнорировать поиск внутри сайта.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что помогает найти официальную документацию?",
  "options": [
    {
      "text": "`site:` с домом документации",
      "correct": true,
      "explanation": "Это ограничивает поиск нужным сайтом."
    },
    {
      "text": "Только `OR`",
      "correct": false,
      "explanation": "OR расширяет поиск."
    },
    {
      "text": "Минус-слова",
      "correct": false,
      "explanation": "Они исключают, а не направляют."
    }
  ],
  "explanation": "`site:` — базовый приём для документации."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что полезно при поиске документации?",
  "options": [
    {
      "text": "Указать версию",
      "correct": true
    },
    {
      "text": "Использовать `site:`",
      "correct": true
    },
    {
      "text": "Проверить раздел API или guide",
      "correct": true
    },
    {
      "text": "Брать первый PDF без проверки",
      "correct": false,
      "explanation": "PDF может быть старым или чужим."
    }
  ],
  "explanation": "Версия и домен сильно повышают точность."
}
```

## Куда дальше

- [Комбинирование операторов](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/kombinirovanie-operatorov.md)
- [Операторы и продвинутые запросы](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/operatory-i-prodvinutye-zaprosy.md)
- [Официальная документация](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/oficialnaya-dokumentaciya.md)
