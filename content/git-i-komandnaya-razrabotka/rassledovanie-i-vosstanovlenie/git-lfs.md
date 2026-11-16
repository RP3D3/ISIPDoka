---
title: Git LFS
description: Как хранить большие файлы вне основной истории Git.
keywords: Git LFS, большие файлы, lfs track, миграция, ассеты

---

# Git LFS

Git LFS (Large File Storage) хранит большие файлы отдельно, а в
репозитории оставляет указатели. Это полезно для ассетов, видео и
бинарников.

## Установка

```bash
git lfs install
```

## Отслеживание

```bash
git lfs track "*.psd"
git add .gitattributes
```

Теперь файлы `.psd` будут храниться через LFS.

## Проверка

```bash
git lfs ls-files
```

## Миграция старых файлов

Если большой файл уже в истории, нужна миграция. Это переписывает
историю, поэтому делайте резервную копию и согласуйте с командой.

## Частые ошибки

- **Добавить большой файл до настройки LFS.**
- **Не установить LFS у коллег.** Они получат указатели вместо файлов.
- **Забыть `.gitattributes`.**
- **Мигрировать историю без бэкапа.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что хранит Git LFS в репозитории?",
  "options": [
    {
      "text": "Указатели на большие файлы",
      "correct": true,
      "explanation": "Сами файлы лежат в LFS-хранилище."
    },
    {
      "text": "Полные копии файлов",
      "correct": false,
      "explanation": "Это обычный Git."
    },
    {
      "text": "Только имена файлов",
      "correct": false,
      "explanation": "Нужны указатели."
    }
  ],
  "explanation": "LFS уменьшает размер основной истории."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно для Git LFS?",
  "options": [
    {
      "text": "Установить LFS",
      "correct": true
    },
    {
      "text": "Настроить отслеживание через `.gitattributes`",
      "correct": true
    },
    {
      "text": "Проверить `git lfs ls-files`",
      "correct": true
    },
    {
      "text": "Хранить большие файлы в обычном Git",
      "correct": false,
      "explanation": "Для этого и нужен LFS."
    }
  ],
  "explanation": "LFS требует настройки и установки."
}
```

## Куда дальше

- [Расследование и восстановление](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/rassledovanie-i-vosstanovlenie.md)
- [Практика: найти баг](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/praktika-nayti-bag.md)
- [submodules](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/submodules.md)
