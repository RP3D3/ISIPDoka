---
title: API-справочники и примеры
description: Как читать сигнатуру, параметры, возвращаемое значение и ошибки API.
keywords: API, справочник, сигнатура, параметры, возвращаемое значение, примеры

---

# API-справочники и примеры

API-справочник отвечает на точные вопросы: какие аргументы принимает
функция, что возвращает и какие ошибки возможны.

## Что читать

- сигнатуру;
- типы параметров;
- значения по умолчанию;
- возвращаемый тип;
- исключения;
- примеры;
- примечания о версии.

## Пример

```text
function readFile(path, options)
```

Смотрите:

- `path` — строка или объект?
- `options` — какие поля?
- что будет при ошибке?
- асинхронная ли функция?

## Примеры

Пример из документации — хорошая отправная точка, но проверьте:

- версию;
- импорты;
- контекст;
- обработку ошибок.

## Частые ошибки

- **Смотреть только пример, не читая сигнатуру.**
- **Игнорировать типы.**
- **Не обрабатывать ошибки.**
- **Копировать пример без версии.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что показывает сигнатура функции?",
  "options": [
    {
      "text": "Аргументы и их типы",
      "correct": true,
      "explanation": "Это основа правильного вызова."
    },
    {
      "text": "Историю проекта",
      "correct": false,
      "explanation": "Это changelog."
    },
    {
      "text": "Лицензию",
      "correct": false,
      "explanation": "Лицензия отдельно."
    }
  ],
  "explanation": "Сигнатура задаёт контракт вызова."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно в API-справочнике?",
  "options": [
    {
      "text": "Типы параметров",
      "correct": true
    },
    {
      "text": "Возвращаемое значение",
      "correct": true
    },
    {
      "text": "Ошибки и исключения",
      "correct": true
    },
    {
      "text": "Только название функции",
      "correct": false,
      "explanation": "Этого недостаточно."
    }
  ],
  "explanation": "API нужно читать целиком, а не по названию."
}
```

## Куда дальше

- [Поиск по исходникам и regex](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/poisk-po-ishodnikam-i-regex.md)
- [Поиск в базе знаний и трекерах](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/poisk-v-baze-znaniy-i-trekerah.md)
- [Официальная документация](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/oficialnaya-dokumentaciya.md)
