---
title: Секреты и большие файлы в истории
description: Что делать, если в Git попали пароль, токен или огромный файл.
keywords: секреты в истории, удаление секретов, filter-repo, BFG, большие файлы, LFS

---

# Секреты и большие файлы в истории

Удалить файл новым коммитом недостаточно: он останется в истории. Для
секретов это означает, что ключ нужно считать скомпрометированным.

## Секреты

Порядок:

1. Отозвать ключ.
2. Выпустить новый.
3. Удалить секрет из истории.
4. Добавить защиту.
5. Проверить логи и доступы.

## Удаление из истории

Инструменты:

- `git filter-repo`;
- BFG Repo-Cleaner;
- интерактивный rebase для простых случаев.

После переписывания истории нужен force push и согласование с командой.

## Большие файлы

Если большой файл уже в истории, можно:

- удалить его из истории;
- перейти на Git LFS;
- добавить файл в `.gitignore`.

## Частые ошибки

- **Удалить файл только в новом коммите.**
- **Не отозвать секрет.**
- **Переписать историю без предупреждения команды.**
- **Закоммитить большой файл до настройки LFS.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать в первую очередь при утечке секрета?",
  "options": [
    {
      "text": "Отозвать и заменить секрет",
      "correct": true,
      "explanation": "Он мог быть скопирован."
    },
    {
      "text": "Удалить файл новым коммитом",
      "correct": false,
      "explanation": "Секрет останется в истории."
    },
    {
      "text": "Сделать репозиторий приватным",
      "correct": false,
      "explanation": "Это не отменяет утечку."
    }
  ],
  "explanation": "Сначала ротация, потом очистка истории."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что поможет удалить секрет из истории?",
  "options": [
    {
      "text": "`git filter-repo`",
      "correct": true
    },
    {
      "text": "BFG Repo-Cleaner",
      "correct": true
    },
    {
      "text": "Согласование force push с командой",
      "correct": true
    },
    {
      "text": "Обычный `git clean`",
      "correct": false,
      "explanation": "Он не меняет историю."
    }
  ],
  "explanation": "Очистка истории требует специальных инструментов."
}
```

## Куда дальше

- [Ошибки rebase](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/oshibki-rebase.md)
- [Потерянные изменения](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/poteryannye-izmeneniya.md)
- [Секреты и .env](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/sekrety-i-env.md)
