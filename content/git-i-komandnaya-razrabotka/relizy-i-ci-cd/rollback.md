---
title: Rollback
description: Как откатить релиз или деплой и не потерять данные.
keywords: rollback, откат релиза, деплой, инцидент, revert, восстановление

---

# Rollback

Rollback — возврат к предыдущей рабочей версии. Он нужен, когда релиз
сломал продакшен, а быстрое исправление невозможно.

## Виды отката

- откат деплоя на предыдущую сборку;
- revert коммита в Git;
- переключение трафика;
- восстановление базы из резервной копии.

## План

1. Остановить распространение проблемы.
2. Сообщить команде.
3. Откатить код или конфигурацию.
4. Проверить ключевые сценарии.
5. Зафиксировать причину.
6. Добавить проверку.

## Данные

Код откатить проще, чем данные. Миграции базы могут быть несовместимы с
предыдущей версией. Поэтому rollback планируют заранее.

## Частые ошибки

- **Откатывать без плана.** Паника увеличивает простой.
- **Забыть про миграции.** Старый код может не работать с новой схемой.
- **Не сообщить пользователям.**
- **Не проверить после отката.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое rollback?",
  "options": [
    {
      "text": "Возврат к предыдущей рабочей версии",
      "correct": true,
      "explanation": "Он снижает последствия инцидента."
    },
    {
      "text": "Новый релиз",
      "correct": false,
      "explanation": "Это движение вперёд."
    },
    {
      "text": "Удаление репозитория",
      "correct": false,
      "explanation": "Это не откат."
    }
  ],
  "explanation": "Rollback возвращает рабочее состояние."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно при rollback?",
  "options": [
    {
      "text": "План действий",
      "correct": true
    },
    {
      "text": "Проверка после отката",
      "correct": true
    },
    {
      "text": "Учёт миграций базы",
      "correct": true
    },
    {
      "text": "Скрыть инцидент от команды",
      "correct": false,
      "explanation": "Команда должна знать."
    }
  ],
  "explanation": "Откат — это управляемый процесс."
}
```

## Куда дальше

- [CI/CD](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/ci-cd.md)
- [GitHub Actions](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/github-actions.md)
- [Hotfix](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/hotfix.md)
