---
title: Расследование и восстановление
description: Итог группы: reflog, bisect, worktree, hooks, submodules и Git LFS.
keywords: расследование, восстановление, reflog, bisect, worktree, hooks, LFS

---

# Расследование и восстановление

Когда что-то сломалось, важно не паниковать, а последовательно собрать
факты.

## Инструменты

- `reflog` — где был HEAD;
- `bisect` — какой коммит сломал поведение;
- `worktree` — отдельная рабочая копия;
- `hooks` — автоматические проверки;
- `submodules` — вложенные репозитории;
- `Git LFS` — большие файлы.

## Порядок действий

1. Зафиксировать текущее состояние.
2. Посмотреть `reflog`.
3. Найти воспроизводимый тест.
4. Использовать `bisect`.
5. Исправить и добавить проверку.

## Частые ошибки

- **Паника и `reset --hard`.**
- **Удаление `.git`.**
- **Поиск бага без воспроизведения.**
- **Забыть про `bisect reset`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой инструмент ищет коммит, сломавший поведение?",
  "options": [
    {
      "text": "`git bisect`",
      "correct": true,
      "explanation": "Он использует двоичный поиск."
    },
    {
      "text": "`git clean`",
      "correct": false,
      "explanation": "Он удаляет файлы."
    },
    {
      "text": "`git tag`",
      "correct": false,
      "explanation": "Он ставит метку."
    }
  ],
  "explanation": "Bisect сужает поиск регрессии."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает при расследовании?",
  "options": [
    {
      "text": "`reflog`",
      "correct": true
    },
    {
      "text": "`bisect`",
      "correct": true
    },
    {
      "text": "Воспроизводимый тест",
      "correct": true
    },
    {
      "text": "Удаление `.git`",
      "correct": false,
      "explanation": "Это уничтожает историю."
    }
  ],
  "explanation": "Расследование опирается на факты и проверки."
}
```

## Куда дальше

- [Практика: найти баг](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/praktika-nayti-bag.md)
- [Частые ошибки и их решения](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/chastye-oshibki-i-ih-resheniya.md)
- [Итог: командная разработка](theme.html?path=content/git-i-komandnaya-razrabotka/itog-komandnaya-razrabotka/itog-komandnaya-razrabotka.md)
