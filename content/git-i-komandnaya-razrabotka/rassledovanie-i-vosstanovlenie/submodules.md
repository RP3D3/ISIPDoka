---
title: submodules
description: Как подключать один репозиторий внутрь другого и какие подводные камни есть у submodules.
keywords: git submodules, подмодули, .gitmodules, clone --recurse-submodules, зависимости

---

# submodules

Submodule — ссылка на другой Git-репозиторий внутри текущего. Основной
репозиторий хранит не файлы, а конкретный коммит подмодуля.

## Добавить

```bash
git submodule add https://github.com/user/lib.git libs/lib
git commit -m "Add lib submodule"
```

Появится `.gitmodules` и запись с коммитом.

## Клонировать с подмодулями

```bash
git clone --recurse-submodules <url>
```

Если уже клонировали:

```bash
git submodule update --init --recursive
```

## Обновить

```bash
git submodule update --remote
```

Но это меняет зафиксированный коммит. Проверьте diff.

## Частые ошибки

- **Забыть инициализировать submodules.**
- **Ожидать автоматического обновления.**
- **Коммитить detached HEAD внутри submodule.**
- **Использовать submodules там, где проще пакетный менеджер.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что хранит основной репозиторий для submodule?",
  "options": [
    {
      "text": "Ссылку на конкретный коммит другого репозитория",
      "correct": true,
      "explanation": "Файлы подмодуля лежат отдельно."
    },
    {
      "text": "Копию всех файлов",
      "correct": false,
      "explanation": "Это не submodule."
    },
    {
      "text": "Только URL без коммита",
      "correct": false,
      "explanation": "Коммит фиксируется."
    }
  ],
  "explanation": "Submodule фиксирует версию зависимости."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про submodules?",
  "options": [
    {
      "text": "Нужен `--recurse-submodules` при clone",
      "correct": true
    },
    {
      "text": "Можно инициализировать через `submodule update --init`",
      "correct": true
    },
    {
      "text": "Версия подмодуля фиксируется коммитом",
      "correct": true
    },
    {
      "text": "Обновляются автоматически без команд",
      "correct": false,
      "explanation": "Нужно явное обновление."
    }
  ],
  "explanation": "Submodules требуют явного управления."
}
```

## Куда дальше

- [Git LFS](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/git-lfs.md)
- [Расследование и восстановление](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/rassledovanie-i-vosstanovlenie.md)
- [hooks](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/hooks.md)
