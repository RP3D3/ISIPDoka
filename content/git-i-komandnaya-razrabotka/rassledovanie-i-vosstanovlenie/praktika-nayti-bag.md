---
title: Практика: найти баг через bisect
description: Создайте историю с регрессией и найдите плохой коммит через git bisect.
keywords: практика bisect, поиск бага, регрессия, git bisect, тест

---

# Практика: найти баг через bisect

Цель — найти коммит, который сломал простую функцию.

## 1. Подготовка

```bash
mkdir bisect-practice
cd bisect-practice
git init
echo "def add(a, b): return a + b" > calc.py
git add calc.py
git commit -m "Add add function"
git tag good-start
```

## 2. Сломайте функцию

```bash
echo "def add(a, b): return a - b" > calc.py
git add calc.py
git commit -m "Break add function"
```

## 3. Добавьте ещё коммиты

```bash
echo "# docs" >> README.md
git add README.md
git commit -m "Add docs"
```

## 4. Запустите bisect

```bash
git bisect start
git bisect bad
git bisect good good-start
```

Git переключится на средний коммит. Проверьте `calc.py` и отметьте:

```bash
git bisect good
# или
git bisect bad
```

## 5. Завершите

```bash
git bisect reset
```

## Что проверить

- [ ] Bisect нашёл коммит с поломкой.
- [ ] Вы понимаете, зачем нужны `good` и `bad`.
- [ ] Умеете завершать `bisect reset`.

## Частые ошибки

- **Отмечать без проверки.**
- **Забыть `bisect reset`.**
- **Использовать нестабильный тест.**
- **Не знать хороший коммит.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать после завершения bisect?",
  "options": [
    {
      "text": "`git bisect reset`",
      "correct": true,
      "explanation": "Команда вернёт исходное состояние."
    },
    {
      "text": "`git clean -fd`",
      "correct": false,
      "explanation": "Она удаляет файлы."
    },
    {
      "text": "`git push --force`",
      "correct": false,
      "explanation": "Это не связано с bisect."
    }
  ],
  "explanation": "Bisect нужно корректно завершить."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно для bisect?",
  "options": [
    {
      "text": "Хороший коммит",
      "correct": true
    },
    {
      "text": "Плохой коммит",
      "correct": true
    },
    {
      "text": "Способ проверить поведение",
      "correct": true
    },
    {
      "text": "Удалённый репозиторий",
      "correct": false,
      "explanation": "Bisect работает локально."
    }
  ],
  "explanation": "Bisect требует границ и проверки."
}
```

## Куда дальше

- [Расследование и восстановление](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/rassledovanie-i-vosstanovlenie.md)
- [Частые ошибки и их решения](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/chastye-oshibki-i-ih-resheniya.md)
- [Итог: командная разработка](theme.html?path=content/git-i-komandnaya-razrabotka/itog-komandnaya-razrabotka/itog-komandnaya-razrabotka.md)
