---
title: bisect
description: Двоичный поиск коммита, который сломал поведение.
keywords: git bisect, поиск бага, бинарный поиск, good, bad, регрессия

---

# bisect

`git bisect` находит коммит, который впервые сломал поведение. Он
использует двоичный поиск: вы отмечаете хороший и плохой коммит, Git
проверяет середину.

## Запуск

```bash
git bisect start
git bisect bad
git bisect good v1.0.0
```

Git переключится на средний коммит. Проверьте его и отметьте:

```bash
git bisect good
# или
git bisect bad
```

Когда Git найдёт первый плохой коммит, он покажет его хеш.

## Автоматизация

Можно передать команду:

```bash
git bisect run npm test
```

Git сам будет проверять коммиты, пока не найдёт проблемный.

## Завершение

```bash
git bisect reset
```

Вернёт вас на исходную ветку.

## Частые ошибки

- **Отмечать коммиты наугад.** Нужна реальная проверка.
- **Забыть `bisect reset`.** Можно остаться в detached HEAD.
- **Использовать нестабильный тест.** Результат будет ложным.
- **Не знать хороший коммит.** Без него поиск не начнётся.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `git bisect`?",
  "options": [
    {
      "text": "Ищет коммит, который сломал поведение",
      "correct": true,
      "explanation": "Через двоичный поиск."
    },
    {
      "text": "Удаляет плохие коммиты",
      "correct": false,
      "explanation": "Он только находит."
    },
    {
      "text": "Создаёт релиз",
      "correct": false,
      "explanation": "Это не задача bisect."
    }
  ],
  "explanation": "Bisect ускоряет поиск регрессии."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про bisect?",
  "options": [
    {
      "text": "Нужен хороший и плохой коммит",
      "correct": true
    },
    {
      "text": "Можно автоматизировать через `bisect run`",
      "correct": true
    },
    {
      "text": "Завершается через `bisect reset`",
      "correct": true
    },
    {
      "text": "Работает без проверки коммитов",
      "correct": false,
      "explanation": "Нужно отмечать результат."
    }
  ],
  "explanation": "Bisect — управляемый двоичный поиск."
}
```

## Куда дальше

- [worktree](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/worktree.md)
- [hooks](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/hooks.md)
- [Практика: найти баг](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/praktika-nayti-bag.md)
