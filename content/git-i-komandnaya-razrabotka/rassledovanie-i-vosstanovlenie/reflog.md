---
title: reflog
description: Журнал перемещений HEAD и восстановление «потерянных» коммитов.
keywords: git reflog, восстановление коммитов, HEAD, потерянные коммиты, ORIG_HEAD

---

# reflog

`reflog` — локальный журнал перемещений `HEAD` и веток. Он помогает
восстановить коммиты, которые кажутся потерянными после `reset`,
`rebase` или переключения веток.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/git-i-komandnaya-razrabotka/_assets/rassledovanie-i-vosstanovlenie/reflog-bisect.svg"
    alt="reflog и bisect для расследования"
    width="900"
  >
  <figcaption>
    reflog показывает, где был HEAD, даже если ветка уже сдвинулась.
  </figcaption>
</figure>

## Посмотреть

```bash
git reflog
```

Вы увидите последовательность перемещений:

```text
a1b2c3d HEAD@{0}: reset: moving to HEAD~1
d4e5f6g HEAD@{1}: commit: Add feature
```

## Восстановить

```bash
git reset --hard HEAD@{1}
```

Или создать ветку на старом коммите:

```bash
git branch rescue HEAD@{1}
```

## Важно

Reflog хранится локально и не бесконечен. Его записи могут истекать.
Если коммит не попал в reflog, восстановить его сложнее.

## Частые ошибки

- **Паниковать после `reset --hard`.** Сначала смотрите reflog.
- **Удалять `.git`.** Вместе с ним исчезнет reflog.
- **Делать новые коммиты поверх.** Это не мешает, но лучше сначала
  восстановить.
- **Путать reflog и log.** Log — история проекта, reflog — движения HEAD.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что показывает `git reflog`?",
  "options": [
    {
      "text": "Перемещения HEAD и ссылок",
      "correct": true,
      "explanation": "Это журнал локальных действий."
    },
    {
      "text": "Только удалённые ветки",
      "correct": false,
      "explanation": "Для них есть branch -r."
    },
    {
      "text": "Содержимое файлов",
      "correct": false,
      "explanation": "Это рабочая копия."
    }
  ],
  "explanation": "Reflog помогает восстановить состояние."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про reflog?",
  "options": [
    {
      "text": "Хранится локально",
      "correct": true
    },
    {
      "text": "Помогает восстановить коммит",
      "correct": true
    },
    {
      "text": "Может истекать",
      "correct": true
    },
    {
      "text": "Синхронизируется со всеми remote",
      "correct": false,
      "explanation": "Это локальный журнал."
    }
  ],
  "explanation": "Reflog — локальный инструмент восстановления."
}
```

## Куда дальше

- [bisect](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/bisect.md)
- [worktree](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/worktree.md)
- [Частые ошибки: потерянные коммиты](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/poteryannye-kommitty.md)
