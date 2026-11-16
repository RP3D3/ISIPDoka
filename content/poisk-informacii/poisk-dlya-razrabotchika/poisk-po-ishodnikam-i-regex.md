---
title: Поиск по исходникам и regex
description: Как искать код, символы и шаблоны в репозитории и на GitHub.
keywords: поиск по исходникам, regex, grep, ripgrep, code search, символы

---

# Поиск по исходникам и regex

Когда нужен пример или место использования, поиск по коду эффективнее
обычного поиска.

## Где искать

- GitHub code search;
- локальный `grep` или `ripgrep`;
- IDE;
- поиск по символам;
- поиск по тестам.

## Примеры

```bash
rg "connection refused" src/
rg -i "timeout" .
rg "def test_.*timeout" tests/
```

## Регулярные выражения

Regex полезен, но требует точности:

- `.*` — любые символы;
- `\d+` — цифры;
- `^` — начало строки;
- `$` — конец строки.

## Контекст

Смотрите не только совпадение, но и:

- импорты;
- вызовы;
- тесты;
- обработку ошибок.

## Частые ошибки

- **Слишком широкий regex.** Много ложных совпадений.
- **Забыть экранирование.**
- **Искать только по коду, игнорируя тесты.**
- **Не проверять контекст.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем искать по тестам?",
  "options": [
    {
      "text": "Там часто есть примеры использования",
      "correct": true,
      "explanation": "Тесты показывают ожидаемое поведение."
    },
    {
      "text": "Тесты заменяют документацию",
      "correct": false,
      "explanation": "Они дополняют её."
    },
    {
      "text": "В тестах нет кода",
      "correct": false,
      "explanation": "Там как раз код."
    }
  ],
  "explanation": "Тесты — источник примеров."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает искать по коду?",
  "options": [
    {
      "text": "Точная строка",
      "correct": true
    },
    {
      "text": "Regex с проверкой",
      "correct": true
    },
    {
      "text": "Поиск по тестам",
      "correct": true
    },
    {
      "text": "Игнорирование контекста",
      "correct": false,
      "explanation": "Контекст важен."
    }
  ],
  "explanation": "Код нужно искать с контекстом и проверкой."
}
```

## Куда дальше

- [Поиск в базе знаний и трекерах](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/poisk-v-baze-znaniy-i-trekerah.md)
- [Поиск для разработчика](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/poisk-dlya-razrabotchika.md)
- [Практика: найти решение ошибки](theme.html?path=content/poisk-informacii/poisk-dlya-razrabotchika/praktika-nayti-reshenie-oshibki.md)
