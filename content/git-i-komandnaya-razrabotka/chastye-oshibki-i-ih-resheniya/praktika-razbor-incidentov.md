---
title: Практика: разбор инцидентов
description: Разберите несколько учебных инцидентов и выберите безопасное решение.
keywords: практика, инциденты, Git, reflog, revert, конфликт, секреты

---

# Практика: разбор инцидентов

Ниже — ситуации. Для каждой выберите первое действие и способ
восстановления.

## Инцидент 1. Коммит в main

Вы сделали коммит в `main`, но он ещё не отправлен.

**Действия:**

```bash
git branch feature/fix
git reset --hard HEAD~1
git switch feature/fix
```

## Инцидент 2. Потерян коммит

После `reset --hard` пропал коммит.

**Действия:**

```bash
git reflog
git branch rescue <hash>
```

## Инцидент 3. Конфликт

При merge появились маркеры.

**Действия:**

1. Открыть файл.
2. Убрать маркеры.
3. `git add`.
4. `git commit`.

## Инцидент 4. Push отклонён

Удалённая ветка ушла вперёд.

**Действия:**

```bash
git fetch
git rebase origin/main
git push
```

## Инцидент 5. Секрет в истории

В репозиторий попал токен.

**Действия:**

1. Отозвать токен.
2. Выпустить новый.
3. Очистить историю.
4. Добавить защиту.

## Чек-лист

- [ ] Сначала диагностика.
- [ ] Есть резервная ветка.
- [ ] Нет force push в общей ветке.
- [ ] После исправления добавлена профилактика.

## Частые ошибки

- **Сразу делать `reset --hard`.**
- **Игнорировать reflog.**
- **Оставлять секрет в истории.**
- **Не проверять результат.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать при потере коммита?",
  "options": [
    {
      "text": "Посмотреть reflog",
      "correct": true,
      "explanation": "Там есть предыдущие позиции HEAD."
    },
    {
      "text": "Удалить `.git`",
      "correct": false,
      "explanation": "Это уничтожит историю."
    },
    {
      "text": "Сделать `clean -fd`",
      "correct": false,
      "explanation": "Он удаляет файлы."
    }
  ],
  "explanation": "Reflog — первый шаг восстановления."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в разбор инцидента?",
  "options": [
    {
      "text": "Диагностика",
      "correct": true
    },
    {
      "text": "Безопасное исправление",
      "correct": true
    },
    {
      "text": "Профилактика",
      "correct": true
    },
    {
      "text": "Скрытие проблемы",
      "correct": false,
      "explanation": "Это увеличивает последствия."
    }
  ],
  "explanation": "Инцидент разбирают до профилактики."
}
```

## Куда дальше

- [Частые ошибки и их решения](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/chastye-oshibki-i-ih-resheniya.md)
- [Итог: командная разработка](theme.html?path=content/git-i-komandnaya-razrabotka/itog-komandnaya-razrabotka/itog-komandnaya-razrabotka.md)
- [Расследование и восстановление](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/rassledovanie-i-vosstanovlenie.md)
