---
title: TLS и сертификаты
description: Версии TLS, цепочка сертификатов, CA, SAN, срок действия и ключи.
keywords: TLS, сертификат, CA, SAN, Let's Encrypt, приватный ключ

---

# TLS и сертификаты

Сертификат подтверждает, что сервер действительно принадлежит домену.
Приватный ключ доказывает владение сертификатом.

## Цепочка

```text
корневой CA → промежуточный CA → сертификат сайта
```

Браузер доверяет корневым CA, которые уже установлены в системе.

## Что в сертификате

- домен в SAN;
- срок действия;
- издатель;
- публичный ключ;
- назначение.

## TLS 1.2 и 1.3

Используйте TLS 1.2 и 1.3. Старые версии отключайте.

## Let's Encrypt

Бесплатные сертификаты с автоматическим продлением. Подходит для
большинства сайтов.

## Частые ошибки

- **Просроченный сертификат.**
- **Сертификат на другой домен.**
- **Самоподписанный сертификат в продакшене.**
- **Утечка приватного ключа.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что подтверждает сертификат?",
  "options": [
    {
      "text": "Что сервер принадлежит домену",
      "correct": true,
      "explanation": "Это аутентификация сервера."
    },
    {
      "text": "Что пользователь админ",
      "correct": false,
      "explanation": "Это авторизация."
    },
    {
      "text": "Что база данных зашифрована",
      "correct": false,
      "explanation": "Это другой уровень."
    }
  ],
  "explanation": "Сертификат связывает домен и ключ."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для сертификата?",
  "options": [
    {
      "text": "Срок действия",
      "correct": true
    },
    {
      "text": "Домен в SAN",
      "correct": true
    },
    {
      "text": "Доверенная цепочка",
      "correct": true
    },
    {
      "text": "Публикация приватного ключа",
      "correct": false,
      "explanation": "Ключ должен быть секретным."
    }
  ],
  "explanation": "Сертификат должен быть валидным и доверенным."
}
```

## Куда дальше

- [TLS handshake](theme.html?path=content/http-seti-i-rest-api/https-i-tls/tls-handshake.md)
- [HSTS и secure cookies](theme.html?path=content/http-seti-i-rest-api/https-i-tls/hsts-i-secure-cookies.md)
- [Mixed content](theme.html?path=content/http-seti-i-rest-api/https-i-tls/mixed-content.md)
