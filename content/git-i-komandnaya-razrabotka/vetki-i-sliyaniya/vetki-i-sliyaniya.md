---
title: Ветки и слияния
description: Итог группы: ветки как указатели, merge, конфликты, rebase и cherry-pick.
keywords: ветки, слияния, merge, rebase, конфликты, cherry-pick, итог

---

# Ветки и слияния

Ветка — это указатель на коммит. Слияние объединяет линии истории,
rebase переносит коммиты на новую базу, cherry-pick берёт отдельный
коммит.

## Что выбрать

| Задача | Инструмент |
|---|---|
| Добавить изменения ветки в main | `merge` |
| Сделать историю линейной | `rebase` |
| Взять один коммит | `cherry-pick` |
| Посмотреть старую версию | `switch`/`checkout` |
| Временно убрать изменения | `stash` |

## Главные правила

1. Перед merge проверьте текущую ветку.
2. Конфликт решается вручную, маркеры нужно убрать.
3. Rebase безопасен для локальной ветки, но опасен для общей.
4. Cherry-pick создаёт новый коммит с другим хешем.
5. Перед опасной операцией сделайте резервную ветку.

## Частые ошибки

- **Сливать не ту ветку.**
- **Оставлять маркеры конфликта в коде.**
- **Делать rebase общей ветки.**
- **Использовать cherry-pick вместо merge для всей ветки.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что лучше для переноса всей feature-ветки в main?",
  "options": [
    {
      "text": "Merge",
      "correct": true,
      "explanation": "Он сохраняет историю ветки."
    },
    {
      "text": "Cherry-pick каждого коммита",
      "correct": false,
      "explanation": "Это создаст дубли и лишнюю работу."
    },
    {
      "text": "`git clean`",
      "correct": false,
      "explanation": "Он удаляет неотслеживаемые файлы."
    }
  ],
  "explanation": "Merge — стандартный способ слияния ветки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про конфликты?",
  "options": [
    {
      "text": "Их нужно решать вручную",
      "correct": true
    },
    {
      "text": "Маркеры конфликта нужно убрать",
      "correct": true
    },
    {
      "text": "После решения файл добавляют в индекс",
      "correct": true
    },
    {
      "text": "Конфликт можно оставить в коде",
      "correct": false,
      "explanation": "Это сломает сборку."
    }
  ],
  "explanation": "Конфликт — это выбор человека, а не автоматика."
}
```

## Куда дальше

- [Практика: ветки и конфликт](theme.html?path=content/git-i-komandnaya-razrabotka/vetki-i-sliyaniya/praktika-vetki-i-konflikt.md)
- [Удалённая работа и code review](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/remote-i-clone.md)
- [Командные процессы](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/github-flow.md)
