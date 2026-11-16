---
title: Теги и версии
description: Как помечать релизы тегами и не терять их при push.
keywords: git tag, теги, версии, релиз, annotated tag, push tags

---

# Теги и версии

Тег — постоянная ссылка на коммит. Обычно тегами помечают релизы:
`v1.0.0`, `v1.2.3`.

## Создать тег

```bash
git tag v1.0.0
```

Легковесный тег — просто ссылка. Аннотированный хранит автора, дату и
сообщение:

```bash
git tag -a v1.0.0 -m "Release 1.0.0"
```

Для релизов лучше аннотированные.

## Отправить тег

```bash
git push origin v1.0.0
git push origin --tags
```

Теги не отправляются обычным `git push`, если не настроено иначе.

## Посмотреть

```bash
git tag
git show v1.0.0
```

## Частые ошибки

- **Поставить тег не на тот коммит.** Проверьте `git log`.
- **Забыть push тега.** На сервере релиза не будет.
- **Двигать существующий тег.** Это ломает ожидания.
- **Использовать тег вместо ветки.** Тег не двигается.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем аннотированный тег отличается от легковесного?",
  "options": [
    {
      "text": "Хранит автора, дату и сообщение",
      "correct": true,
      "explanation": "Это полноценный объект Git."
    },
    {
      "text": "Может двигаться",
      "correct": false,
      "explanation": "Теги не двигаются."
    },
    {
      "text": "Работает только локально",
      "correct": false,
      "explanation": "Его можно отправить."
    }
  ],
  "explanation": "Аннотированный тег содержит метаданные."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про теги?",
  "options": [
    {
      "text": "Тег указывает на коммит",
      "correct": true
    },
    {
      "text": "Теги можно отправить в remote",
      "correct": true
    },
    {
      "text": "Тег удобно использовать для релиза",
      "correct": true
    },
    {
      "text": "Тег автоматически двигается при коммите",
      "correct": false,
      "explanation": "Это делает ветка."
    }
  ],
  "explanation": "Тег — постоянная метка релиза."
}
```

## Куда дальше

- [SemVer](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/semver.md)
- [Changelog](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/changelog.md)
- [Hotfix](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/hotfix.md)
