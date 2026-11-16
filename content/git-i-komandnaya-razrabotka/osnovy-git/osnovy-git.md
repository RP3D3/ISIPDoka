---
title: Основы Git
description: Итог группы: три области Git, первый коммит, состояния файлов и .gitignore.
keywords: основы Git, итог, репозиторий, индекс, коммит, gitignore

---

# Основы Git

Главное, что нужно понять после этой группы: Git — это не «папка с
файлами», а система снимков и ссылок.

## Три области

- **Рабочая копия** — файлы на диске.
- **Индекс** — изменения, подготовленные к коммиту.
- **Репозиторий** — история коммитов.

## Минимальный цикл

```bash
git status
git add file.txt
git commit -m "Add file"
git log --oneline
```

## Что важно запомнить

1. Коммит — снимок индекса, а не всех файлов.
2. `git add` не создаёт коммит.
3. `.gitignore` защищает от мусора и секретов.
4. История нужна не только для отката, но и для понимания решений.
5. Git работает локально; GitHub и GitLab — это платформы для обмена.

## Чек-лист

- [ ] Настроены имя и почта.
- [ ] Есть `.gitignore`.
- [ ] Первый коммит содержит только нужные файлы.
- [ ] Понятно, чем отличаются рабочая копия, индекс и история.
- [ ] Вы можете объяснить, что такое `HEAD`.

## Частые ошибки

- **Коммитить всё подряд.** Проверяйте `git status`.
- **Игнорировать `.gitignore`.** Секреты и мусор попадут в историю.
- **Путать Git и GitHub.** Это разные уровни.
- **Не читать историю.** Тогда непонятно, откуда взялись изменения.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что попадает в коммит?",
  "options": [
    {
      "text": "Снимок индекса",
      "correct": true,
      "explanation": "Коммит фиксирует подготовленные изменения."
    },
    {
      "text": "Все файлы на диске",
      "correct": false,
      "explanation": "Только те, что попали в индекс."
    },
    {
      "text": "Только последний изменённый файл",
      "correct": false,
      "explanation": "Коммит может содержать несколько файлов."
    }
  ],
  "explanation": "Коммит собирается из индекса."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в базовый цикл работы с Git?",
  "options": [
    {
      "text": "Проверить статус",
      "correct": true
    },
    {
      "text": "Добавить изменения в индекс",
      "correct": true
    },
    {
      "text": "Сделать коммит",
      "correct": true
    },
    {
      "text": "Удалить папку `.git` после каждого коммита",
      "correct": false,
      "explanation": "Это уничтожит историю."
    }
  ],
  "explanation": "Базовый цикл: status → add → commit."
}
```

## Куда дальше

- [Практика: первый репозиторий](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/praktika-pervyy-repozitoriy.md)
- [Ежедневная работа](theme.html?path=content/git-i-komandnaya-razrabotka/ezhednevnaya-rabota/status-diff-log.md)
- [Ветки и слияния](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/vetka-kak-ukazatel.md)
