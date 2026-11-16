---
title: Кавычки и точная фраза
description: Как искать точную фразу, имя ошибки или цитату и когда кавычки мешают.
keywords: кавычки, точная фраза, поиск фразы, операторы, запрос

---

# Кавычки и точная фраза

Кавычки просят поисковик искать точное совпадение фразы. Это полезно для
ошибок, цитат, названий и строк кода.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/poisk-informacii/_assets/operatory-i-prodvinutye-zaprosy/query-anatomy.svg"
    alt="Анатомия запроса с site, filetype, кавычками и минус-словом"
    width="900"
  >
  <figcaption>
    Операторы сужают поиск, но требуют точности.
  </figcaption>
</figure>

## Примеры

```text
"ModuleNotFoundError: No module named 'requests'"
"connection refused"
"как настроить SSH-ключ"
```

## Когда помогает

- точный текст ошибки;
- имя функции или класса;
- цитата;
- юридическая формулировка;
- строка из документации.

## Когда мешает

- фраза слишком длинная;
- в ней другие кавычки или лишние пробелы;
- вы не уверены в точном тексте;
- нужно найти синонимы.

## Частые ошибки

- **Брать в кавычки весь вопрос.** Лучше — только ключевую фразу.
- **Забывать про регистр и пунктуацию.** Некоторые системы учитывают их.
- **Искать ошибку с лишними словами.** Начните с точного текста.
- **Не пробовать без кавычек.** Иногда нужен более широкий поиск.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делают кавычки в запросе?",
  "options": [
    {
      "text": "Просят искать точную фразу",
      "correct": true,
      "explanation": "Это сужает поиск."
    },
    {
      "text": "Удаляют слова из запроса",
      "correct": false,
      "explanation": "Для исключения есть минус-слова."
    },
    {
      "text": "Меняют язык выдачи",
      "correct": false,
      "explanation": "Язык задаётся иначе."
    }
  ],
  "explanation": "Кавычки — оператор точной фразы."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Когда кавычки полезны?",
  "options": [
    {
      "text": "Для точного текста ошибки",
      "correct": true
    },
    {
      "text": "Для имени функции",
      "correct": true
    },
    {
      "text": "Для цитаты",
      "correct": true
    },
    {
      "text": "Для поиска всех синонимов сразу",
      "correct": false,
      "explanation": "Кавычки наоборот сужают."
    }
  ],
  "explanation": "Кавычки помогают, когда важна точность."
}
```

## Куда дальше

- [site: и filetype:](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/site-i-filetype.md)
- [Минус-слова и OR](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/minus-slova-i-or.md)
- [Комбинирование операторов](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/kombinirovanie-operatorov.md)
