---
title: Официальная документация
description: Как находить и читать официальную документацию, а не случайные пересказы.
keywords: официальная документация, docs, API, версия, руководство, разработчик

---

# Официальная документация

Официальная документация — основной источник для языка, библиотеки или
сервиса. Она описывает то, что действительно поддерживается.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/poisk-informacii/_assets/poisk-dlya-razrabotchika/dev-search.svg"
    alt="Источники для разработчика: документация, ошибки, GitHub, Q&A, changelog"
    width="900"
  >
  <figcaption>
    Начинайте с официальных источников, а не с случайных блогов.
  </figcaption>
</figure>

## Как искать

```text
site:docs.python.org pathlib
site:developer.mozilla.org fetch
site:learn.microsoft.com async await
```

## Что смотреть

- версию;
- раздел API;
- примеры;
- ограничения;
- changelog;
- примечания о совместимости.

## Как читать

1. Найдите нужный раздел.
2. Проверьте версию.
3. Прочитайте пример.
4. Запустите его.
5. Проверьте ограничения.

## Частые ошибки

- **Искать в блогах вместо документации.**
- **Игнорировать версию.**
- **Копировать пример без адаптации.**
- **Не читать примечания и ограничения.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему официальная документация надёжнее блога?",
  "options": [
    {
      "text": "Она описывает поддерживаемое поведение и версии",
      "correct": true,
      "explanation": "Блог может быть устаревшим или субъективным."
    },
    {
      "text": "Она всегда короче",
      "correct": false,
      "explanation": "Длина не главное."
    },
    {
      "text": "В ней нет ошибок",
      "correct": false,
      "explanation": "Ошибки бывают, но это основной источник."
    }
  ],
  "explanation": "Документация — точка истины для API."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что проверить в документации?",
  "options": [
    {
      "text": "Версию",
      "correct": true
    },
    {
      "text": "Пример использования",
      "correct": true
    },
    {
      "text": "Ограничения",
      "correct": true
    },
    {
      "text": "Только заголовок страницы",
      "correct": false,
      "explanation": "Нужно читать раздел."
    }
  ],
  "explanation": "Версия и ограничения критичны."
}
```

## Куда дальше

- [Поиск по ошибкам и стек-трейсам](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/poisk-po-oshibkam-i-stek-treysam.md)
- [GitHub и code search](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/github-i-code-search.md)
- [API-справочники и примеры](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/api-spravochniki-i-primery.md)
