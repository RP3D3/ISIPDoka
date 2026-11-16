---
title: Практика: операторы поиска
description: Упражнение: найти документ и ошибку с помощью site, filetype, кавычек и минус-слов.
keywords: практика, операторы, site, filetype, кавычки, минус-слова

---

# Практика: операторы поиска

Выполните несколько поисков и запишите, что изменилось.

## 1. Точная ошибка

```text
"ModuleNotFoundError: No module named 'requests'"
```

Найдите официальную документацию или обсуждение.

## 2. Только GitHub

```text
site:github.com "ModuleNotFoundError" requests
```

Сравните с обычным запросом.

## 3. Только PDF

```text
filetype:pdf python style guide
```

Проверьте автора и дату документа.

## 4. Исключение

```text
python asyncio -tutorial
```

Сравните количество туториалов.

## 5. Комбинация

```text
site:docs.python.org filetype:pdf asyncio
```

Если выдача пустая, уберите один оператор.

## Что записать

- [ ] Какой оператор сузил поиск сильнее всего.
- [ ] Где выдача стала пустой.
- [ ] Какой источник оказался официальным.
- [ ] Что пришлось уточнить.

## Частые ошибки

- **Пробел после `site:` или `filetype:`.**
- **Слишком много операторов.**
- **Игнорирование пустой выдачи.**
- **Вывод по одному результату.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать, если запрос с операторами дал пустую выдачу?",
  "options": [
    {
      "text": "Убрать один оператор и проверить снова",
      "correct": true,
      "explanation": "Так находится слишком строгое условие."
    },
    {
      "text": "Добавить ещё операторы",
      "correct": false,
      "explanation": "Это сделает запрос ещё строже."
    },
    {
      "text": "Считать, что информации нет",
      "correct": false,
      "explanation": "Возможно, запрос слишком узкий."
    }
  ],
  "explanation": "Ослабление запроса — нормальный шаг."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что тренирует практика?",
  "options": [
    {
      "text": "Точную фразу",
      "correct": true
    },
    {
      "text": "Ограничение по сайту",
      "correct": true
    },
    {
      "text": "Исключение и комбинирование",
      "correct": true
    },
    {
      "text": "Игнорирование источников",
      "correct": false,
      "explanation": "Источники всё равно проверяются."
    }
  ],
  "explanation": "Практика покрывает основные операторы."
}
```

## Куда дальше

- [Операторы и продвинутые запросы](theme.html?path=content/poisk-informacii/operatory-i-prodvinutye-zaprosy/operatory-i-prodvinutye-zaprosy.md)
- [Поиск для разработчика](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/oficialnaya-dokumentaciya.md)
- [Оценка источников](theme.html?path=content/poisk-informacii/ocenka-istochnikov/avtor-i-avtorstvo.md)
