---
title: Практика: аудит репозитория
description: Проверьте учебный репозиторий по чек-листу качества и безопасности.
keywords: аудит репозитория, практика, безопасность, README, секреты, зависимости

---

# Практика: аудит репозитория

Возьмите свой учебный репозиторий и пройдите чек-лист.

## 1. Документация

- [ ] README объясняет, что это и как запустить.
- [ ] Есть LICENSE.
- [ ] Есть CONTRIBUTING или раздел о вкладе.

## 2. Секреты

- [ ] `.env` в `.gitignore`.
- [ ] В истории нет токенов и паролей.
- [ ] Есть `.env.example`.

Проверить историю:

```bash
git log -p -- .env
```

## 3. Доступы

- [ ] Нет лишних admin.
- [ ] Токены имеют минимальные права.
- [ ] Удалённые участники потеряли доступ.

## 4. Зависимости

- [ ] Есть lockfile.
- [ ] Нет критических уязвимостей.
- [ ] Обновления не отключены.

## 5. Процесс

- [ ] Защищена main.
- [ ] Есть шаблон PR.
- [ ] CI запускается на PR.

## Итог

Запишите 3 проблемы и 3 действия. Исправьте хотя бы одну.

## Частые ошибки

- **Проверять только последний коммит.** Секрет может быть в истории.
- **Считать приватность заменой безопасности.**
- **Игнорировать зависимости.**
- **Оставлять аудит без задач.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как проверить, был ли `.env` в истории?",
  "options": [
    {
      "text": "`git log -p -- .env`",
      "correct": true,
      "explanation": "Команда покажет изменения файла в истории."
    },
    {
      "text": "`git clean -fd`",
      "correct": false,
      "explanation": "Она удаляет неотслеживаемые файлы."
    },
    {
      "text": "`git branch -a`",
      "correct": false,
      "explanation": "Она показывает ветки."
    }
  ],
  "explanation": "Историю секретов нужно проверять отдельно."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в аудит?",
  "options": [
    {
      "text": "Проверка документации",
      "correct": true
    },
    {
      "text": "Проверка секретов",
      "correct": true
    },
    {
      "text": "Проверка доступов и зависимостей",
      "correct": true
    },
    {
      "text": "Удаление всех веток",
      "correct": false,
      "explanation": "Это не аудит."
    }
  ],
  "explanation": "Аудит покрывает документацию, безопасность и процесс."
}
```

## Куда дальше

- [Качество и безопасность репозитория](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/kachestvo-i-bezopasnost-repozitoriya.md)
- [Релизы и CI/CD](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/ci-cd.md)
- [Частые ошибки: секреты в истории](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/sekrety-v-istorii.md)
