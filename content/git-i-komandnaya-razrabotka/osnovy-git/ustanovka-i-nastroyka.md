---
title: Установка и настройка
description: Как уставить Git, настроить имя, почту и ветку по умолчанию, выбрать SSH или HTTPS.
keywords: установка Git, git config, user.name, user.email, SSH, HTTPS, настройка Git

---

# Установка и настройка

Git нужен для локальной работы с историей. После установки важно
настроить имя и почту: они попадают в каждый коммит.

## Проверка

```bash
git --version
```

Если команда не найдена, установите Git с официалььного сайта или через
пакетный менеджер.

## Имя и почта

```bash
git config --global user.name "Имя Фамилия"
git config --global user.email "you@example.com"
```

Это нужно, чтобы авторство коммитов было понятным. Не используйте чужой
адрес и не оставляйте значения по умолчанию.

## Ветка по умолчанию

```bash
git config --global init.defaultBranch main
```

Иначе старые версии Git могут создавать `master`, а команда будет
ожидать `main`.

## SSH или HTTPS

- **HTTPS** проще: нужен токен или пароль.
- **SSH** удобнее для постоянной работы: ключ настраивается один раз.

Для SSH ключ добавляется в аккаунт платформы. Приватный ключ не
коммитится и не передаётся другим.

## Проверка настройки

```bash
git config --list --show-origin
```

Это покажет, откуда взято значение: из системной, глобальной или
локальной настройки.

## Частые ошибки

- **Не настроено имя или почта.** Коммиты выходят с чужим или
  безымянным автором.
- **Настройка в одном репозитории вместо глобальной.** В новом проекте
  она снова отсутствует.
- **Приватный SSH-ключ в репозитории.** Это утечка секрета.
- **`master` вместо `main`.** Команды и CI могут ожидать другую ветку.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужны `user.name` и `user.email`?",
  "options": [
    {
      "text": "Чтобы коммиты имели понятного автора",
      "correct": true,
      "explanation": "Эти данные попадают в метаданные коммита."
    },
    {
      "text": "Чтобы ускорить Git",
      "correct": false,
      "explanation": "Они не влияют на скорость."
    },
    {
      "text": "Чтобы создать удалённый репозиторий",
      "correct": false,
      "explanation": "Для этого нужен сервис хостинга."
    }
  ],
  "explanation": "Авторство коммита важно для истории."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про настройку Git?",
  "options": [
    {
      "text": "`git config --global` задаёт значение для всех репозиториев пользователя",
      "correct": true
    },
    {
      "text": "SSH-ключ не нужно коммитить",
      "correct": true
    },
    {
      "text": "Ветку по умолчанию можно задать через `init.defaultBranch`",
      "correct": true
    },
    {
      "text": "HTTPS всегда безопаснее SSH",
      "correct": false,
      "explanation": "Безопасность зависит от настройки и хранения секретов."
    }
  ],
  "explanation": "Настройка должна быть явной и безопасной."
}
```

## Куда дальше

- [Репозиторий, индекс и рабочая копия](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/repozitoriy-indeks-i-rabochaya-kopiya.md)
- [Первый коммит](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/pervyy-kommit.md)
- [Git, GitHub и GitLab](theme.html?path=content/git-i-komandnaya-razrabotka/osnovy-git/git-i-github.md)
