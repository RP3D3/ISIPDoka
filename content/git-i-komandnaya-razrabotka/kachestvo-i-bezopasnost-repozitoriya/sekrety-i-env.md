---
title: Секреты и .env
description: Как не коммитить пароли, токены и ключи и что делать, если секрет уже в истории.
keywords: секреты, .env, gitignore, токены, утечка, ротация ключей

---

# Секреты и .env

Секреты — это пароли, токены, ключи API и строки подключения. Они не
должны попадать в Git.

## Локальные секреты

Обычно хранятся в `.env`:

```text
DATABASE_URL=...
API_TOKEN=...
```

`.env` добавляется в `.gitignore`:

```gitignore
.env
.env.*
```

Рядом можно положить `.env.example` с пустыми значениями.

## CI и продакшен

Секреты хранятся в настройках CI или в secret manager. Они не должны
быть в коде и логах.

## Если секрет уже закоммичен

1. Считать секрет скомпрометированным.
2. Отозвать и заменить ключ.
3. Убрать секрет из истории.
4. Добавить защиту, чтобы не повторилось.

Удаление файла в новом коммите не убирает его из истории.

## Частые ошибки

- **Коммитить `.env`.**
- **Писать ключ в коде.**
- **Логировать токены.**
- **Думать, что приватный репозиторий защищает от утечки.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать, если секрет попал в Git?",
  "options": [
    {
      "text": "Отозвать и заменить секрет, затем очистить историю",
      "correct": true,
      "explanation": "Секрет уже мог быть скопирован."
    },
    {
      "text": "Удалить файл новым коммитом и ничего не менять",
      "correct": false,
      "explanation": "Секрет останется в истории."
    },
    {
      "text": "Сделать репозиторий приватным",
      "correct": false,
      "explanation": "Это не отменяет утечку."
    }
  ],
  "explanation": "Сначала ротация, потом очистка."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Как защищать секреты?",
  "options": [
    {
      "text": "Добавить `.env` в `.gitignore`",
      "correct": true
    },
    {
      "text": "Хранить секреты в CI secrets",
      "correct": true
    },
    {
      "text": "Использовать `.env.example` без значений",
      "correct": true
    },
    {
      "text": "Коммитить токены для удобства",
      "correct": false,
      "explanation": "Это прямая утечка."
    }
  ],
  "explanation": "Секреты должны быть вне репозитория."
}
```

## Куда дальше

- [Права доступа](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/prava-dostupa.md)
- [Подписанные коммиты](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/podpisannye-kommitty.md)
- [Секреты в CI](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/secrets-v-ci.md)
