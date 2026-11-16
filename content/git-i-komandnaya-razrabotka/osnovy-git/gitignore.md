---
title: .gitignore
description: Какие файлы не должны попадать в Git и как настроить игнорирование.
keywords: gitignore, игнорирование файлов, секреты, временные файлы, .env, node_modules

---

# .gitignore

`.gitignore` — файл со списком путей, которые Git должен игнорировать.
Он защищает репозиторий от мусора, секретов и огромных файлов.

## Зачем нужен

В репозиторий не должны попадать:

- временные файлы;
- логи;
- зависимости вроде `node_modules`;
- сборки и артефакты;
- локальные настройки IDE;
- `.env` с секретами.

## Пример

```gitignore
# зависимости
node_modules/
vendor/

# сборка
bin/
obj/
dist/

# секреты
.env
.env.*

# IDE
.vscode/
.idea/

# ОС
.DS_Store
Thumbs.db
```

## Важное ограничение

`.gitignore` не удаляет файлы, которые уже были закоммичены. Если файл
уже в истории, его нужно убрать из индекса:

```bash
git rm --cached .env
```

После этого добавьте `.env` в `.gitignore` и сделайте коммит.

## Шаблоны

- `*.log` — все файлы с расширением `.log`;
- `build/` — папка `build`;
- `!important.log` — исключение из правила;
- `**/temp` — `temp` на любой глубине.

## Частые ошибки

- **Добавляют `.gitignore` после первого коммита.** Часть мусора уже в
  истории.
- **Думают, что `.gitignore` удалит файл.** Он только перестаёт его
  отслеживать.
- **Коммитят `.env`.** Секреты остаются в истории даже после удаления.
- **Игнорируют всю папку с кодом.** Проверяйте правила перед коммитом.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `.gitignore`?",
  "options": [
    {
      "text": "Указывает, какие файлы Git не должен отслеживать",
      "correct": true,
      "explanation": "Это список исключений для новых файлов."
    },
    {
      "text": "Удаляет файлы с диска",
      "correct": false,
      "explanation": "Он не удаляет файлы."
    },
    {
      "text": "Шифрует секреты",
      "correct": false,
      "explanation": "Для секретов нужны другие меры."
    }
  ],
  "explanation": "`.gitignore` управляет отслеживанием, а не файлами на диске."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что обычно стоит добавить в `.gitignore`?",
  "options": [
    {
      "text": "`.env`",
      "correct": true
    },
    {
      "text": "`node_modules/`",
      "correct": true
    },
    {
      "text": "Локальные файлы IDE",
      "correct": true
    },
    {
      "text": "Весь исходный код проекта",
      "correct": false,
      "explanation": "Исходный код как раз должен быть в Git."
    }
  ],
  "explanation": "Игнорируются мусор, зависимости и секреты."
}
```

## Куда дальше

- [Основы Git](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/osnovy-git.md)
- [Практика: первый репозиторий](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/praktika-pervyy-repozitoriy.md)
- [Секреты и .env](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/sekrety-i-env.md)
