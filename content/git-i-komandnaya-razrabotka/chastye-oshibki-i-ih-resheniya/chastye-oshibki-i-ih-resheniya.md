---
title: Частые ошибки и их решения
description: Итог группы: алгоритм разбора ошибок, восстановление и профилактика.
keywords: частые ошибки, решения, reflog, revert, конфликты, секреты, командные ошибки

---

# Частые ошибки и их решения

Ошибка в Git редко означает конец работы. Важно действовать по порядку.

## Алгоритм

1. Остановиться.
2. Понять симптом.
3. Посмотреть `status`, `log`, `reflog`.
4. Сделать резервную ветку.
5. Исправить минимальным действием.
6. Проверить.
7. Добавить профилактику.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/git-i-komandnaya-razrabotka/_assets/chastye-oshibki-i-ih-resheniya/incident-flow.svg"
    alt="Разбор инцидента: симптом, диагностика, исправление, профилактика"
    width="900"
  >
  <figcaption>
    Сначала диагностика, потом действие.
  </figcaption>
</figure>

## Что выбрать

| Ситуация | Инструмент |
|---|---|
| Коммит не в ту ветку | `cherry-pick`, `revert` |
| Потерян коммит | `reflog` |
| Конфликт | ручное разрешение |
| Push отклонён | `fetch` + rebase/merge |
| Detached HEAD | создать ветку |
| Секрет в истории | ротация + очистка |
| Ошибка rebase | `rebase --abort`, `reflog` |
| Потеряны изменения | stash/IDE history |

## Частые ошибки

- **Действовать до диагностики.**
- **`reset --hard` без резервной ветки.**
- **`push --force` в общей ветке.**
- **Удалять `.git`.**
- **Не сообщать команде.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "С чего начинать разбор ошибки?",
  "options": [
    {
      "text": "С диагностики состояния",
      "correct": true,
      "explanation": "Status, log, reflog."
    },
    {
      "text": "С `reset --hard`",
      "correct": false,
      "explanation": "Это может ухудшить ситуацию."
    },
    {
      "text": "С удаления `.git`",
      "correct": false,
      "explanation": "Это уничтожит историю."
    }
  ],
  "explanation": "Диагностика предшествует исправлению."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает при ошибке?",
  "options": [
    {
      "text": "Резервная ветка",
      "correct": true
    },
    {
      "text": "`reflog`",
      "correct": true
    },
    {
      "text": "Понимание, опубликован ли коммит",
      "correct": true
    },
    {
      "text": "Паника и force push",
      "correct": false,
      "explanation": "Это увеличивает риск."
    }
  ],
  "explanation": "Спокойный разбор и резервные копии помогают."
}
```

## Куда дальше

- [Практика: разбор инцидентов](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/praktika-razbor-incidentov.md)
- [Итог: командная разработка](theme.html?path=content/git-i-komandnaya-razrabotka/itog-komandnaya-razrabotka/itog-komandnaya-razrabotka.md)
- [Расследование и восстановление](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/rassledovanie-i-vosstanovlenie.md)
