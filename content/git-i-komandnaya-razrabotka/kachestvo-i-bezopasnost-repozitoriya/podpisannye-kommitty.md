---
title: Подписанные коммиты
description: Как подтвердить авторство коммита через GPG или SSH-подпись.
keywords: signed commits, подпись коммита, GPG, SSH signing, verified, безопасность

---

# Подписанные коммиты

Подпись коммита подтверждает, что его создал владелец ключа. Платформы
показывают такие коммиты как verified.

## Зачем

- защита от подмены автора;
- доверие к релизам;
- проверка вклада в open source;
- соответствие требованиям безопасности.

## Настройка GPG

```bash
gpg --gen-key
gpg --list-secret-keys --keyid-format=long
git config --global user.signingkey <key-id>
git config --global commit.gpgsign true
```

Публичный ключ добавляется в аккаунт платформы.

## SSH-подпись

Современные платформы поддерживают подпись SSH-ключом:

```bash
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
```

## Частые ошибки

- **Передавать приватный ключ.** Он должен оставаться у владельца.
- **Подписывать, но не добавлять ключ в аккаунт.** Коммит не будет
  verified.
- **Терять ключ.** Старые подписи сложно проверить.
- **Не включать обязательную подпись в защите ветки.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что подтверждает подписанный коммит?",
  "options": [
    {
      "text": "Что коммит создан владельцем ключа",
      "correct": true,
      "explanation": "Платформа показывает verified."
    },
    {
      "text": "Что код без ошибок",
      "correct": false,
      "explanation": "Подпись не проверяет качество кода."
    },
    {
      "text": "Что коммит нельзя изменить",
      "correct": false,
      "explanation": "Историю всё ещё можно переписать."
    }
  ],
  "explanation": "Подпись подтверждает авторство."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про подпись коммитов?",
  "options": [
    {
      "text": "Можно использовать GPG",
      "correct": true
    },
    {
      "text": "Можно использовать SSH-ключ",
      "correct": true
    },
    {
      "text": "Публичный ключ добавляют в аккаунт",
      "correct": true
    },
    {
      "text": "Приватный ключ нужно коммитить",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Подпись настраивается ключом и проверяется платформой."
}
```

## Куда дальше

- [Обновление зависимостей](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/obnovlenie-zavisimostey.md)
- [Качество и безопасность репозитория](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/kachestvo-i-bezopasnost-repozitoriya.md)
- [Права доступа](theme.html?path=content/git-i-komandnaya-razrabotka/kachestvo-i-bezopasnost-repozitoriya/prava-dostupa.md)
