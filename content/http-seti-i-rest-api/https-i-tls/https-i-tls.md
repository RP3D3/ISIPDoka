---
title: HTTPS и TLS
description: Итог группы: шифрование, сертификаты, handshake, HSTS и ошибки TLS.
keywords: HTTPS, TLS, итог, сертификат, HSTS, mixed content

---

# HTTPS и TLS

Главная идея группы: HTTPS защищает канал, но не заменяет безопасность
приложения.

## Что запомнить

- HTTPS = HTTP + TLS;
- сертификат подтверждает домен;
- цепочка должна быть доверенной;
- handshake создаёт ключи;
- HSTS заставляет использовать HTTPS;
- secure cookies не уходят по HTTP;
- mixed content ломает защиту;
- ошибки TLS обычно про сертификат.

## Чек-лист

- [ ] Я понимаю, что HTTPS не заменяет авторизацию.
- [ ] Я проверяю срок сертификата.
- [ ] Я не отключаю проверку TLS.
- [ ] Я использую `Secure` и `HttpOnly`.
- [ ] Я не смешиваю HTTP и HTTPS.

## Частые ошибки

- **Самоподписанный сертификат в продакшене.**
- **HSTS без HTTPS.**
- **HTTP-ресурсы на HTTPS-странице.**
- **Отключение проверки сертификата.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в HTTPS?",
  "options": [
    {
      "text": "Защищённый канал и доверенный сертификат",
      "correct": true,
      "explanation": "Это основа транспорта."
    },
    {
      "text": "Красивый замок в браузере",
      "correct": false,
      "explanation": "Это только индикатор."
    },
    {
      "text": "Автоматическая авторизация",
      "correct": false,
      "explanation": "Это задача приложения."
    }
  ],
  "explanation": "HTTPS защищает транспорт."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "Сертификаты и handshake",
      "correct": true
    },
    {
      "text": "HSTS и secure cookies",
      "correct": true
    },
    {
      "text": "Mixed content и ошибки TLS",
      "correct": true
    },
    {
      "text": "Только CSS",
      "correct": false,
      "explanation": "Это не TLS."
    }
  ],
  "explanation": "Группа покрывает HTTPS-транспорт."
}
```

## Куда дальше

- [Практика: проверить HTTPS](theme.html?path=content/http-seti-i-rest-api/https-i-tls/praktika-proverit-https.md)
- [REST и контракт API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/chto-takoe-rest.md)
- [Auth, CORS и лимиты](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/sessii-i-cookies.md)
