---
title: Ключевые слова для науки
description: Как строить научный запрос: термины, синонимы, PICO и булевы операторы.
keywords: научный запрос, ключевые слова, PICO, синонимы, булевы операторы, MeSH

---

# Ключевые слова для науки

Научный поиск требует точных терминов. Разговорный вопрос здесь работает
хуже.

## Разложите вопрос

Например:

> Влияет ли физическая активность на качество сна у студентов?

Компоненты:

- физическая активность;
- качество сна;
- студенты;
- эффект.

## PICO

Для медицинских вопросов:

- **P** — population;
- **I** — intervention;
- **C** — comparison;
- **O** — outcome.

## Синонимы

- physical activity, exercise, training;
- sleep quality, sleep duration, insomnia;
- students, university students.

## Операторы

```text
("physical activity" OR exercise) AND ("sleep quality") AND students
```

## Частые ошибки

- **Искать целым вопросом.**
- **Использовать один синоним.**
- **Не учитывать контролируемые словари.**
- **Забывать про английский.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем разбивать вопрос на компоненты?",
  "options": [
    {
      "text": "Чтобы подобрать термины и синонимы",
      "correct": true,
      "explanation": "Так строится точный запрос."
    },
    {
      "text": "Чтобы удалить вопрос",
      "correct": false,
      "explanation": "Вопрос остаётся."
    },
    {
      "text": "Чтобы увеличить текст",
      "correct": false,
      "explanation": "Длина не цель."
    }
  ],
  "explanation": "Компоненты помогают найти ключевые слова."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает научному запросу?",
  "options": [
    {
      "text": "Синонимы",
      "correct": true
    },
    {
      "text": "Английские термины",
      "correct": true
    },
    {
      "text": "Булевы операторы",
      "correct": true
    },
    {
      "text": "Только один общий термин",
      "correct": false,
      "explanation": "Это слишком широко."
    }
  ],
  "explanation": "Точные термины и синонимы расширяют охват."
}
```

## Куда дальше

- [Цитирование и snowballing](theme.html?path=content/poisk-informacii/nauchnyy-i-professionalnyy-poisk/citirovanie-i-snowballing.md)
- [Систематический поиск](theme.html?path=content/poisk-informacii/nauchnyy-i-professionalnyy-poisk/sistematicheskiy-poisk.md)
- [Чтение научной статьи](theme.html?path=content/poisk-informacii/nauchnyy-i-professionalnyy-poisk/chtenie-nauchnoy-staty.md)
