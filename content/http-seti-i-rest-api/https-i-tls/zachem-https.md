---
title: Зачем HTTPS
description: Шифрование, целостность и подтверждение домена в HTTPS.
keywords: HTTPS, TLS, шифрование, целостность, сертификат, безопасность

---

# Зачем HTTPS

HTTPS — это HTTP внутри TLS. Он защищает данные в пути между клиентом и
сервером.

## Три задачи

- **Шифрование** — провайдер и Wi-Fi не видят содержимое.
- **Целостность** — данные нельзя незаметно изменить.
- **Аутентификация** — сертификат подтверждает домен.

## Что HTTPS не делает

- не заменяет авторизацию;
- не защищает от XSS;
- не делает пароли безопасными в базе;
- не скрывает домен и IP.

## Где нужен

- вход и регистрация;
- оплата;
- API с токенами;
- любые формы;
- весь сайт целиком.

## Частые ошибки

- **Думать, что HTTPS решает все проблемы безопасности.**
- **Оставлять HTTP для части страниц.**
- **Использовать самоподписанный сертификат в продакшене.**
- **Забывать про HSTS.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что даёт HTTPS?",
  "options": [
    {
      "text": "Шифрование и проверку домена",
      "correct": true,
      "explanation": "TLS защищает канал и подтверждает сертификат."
    },
    {
      "text": "Автоматическую авторизацию",
      "correct": false,
      "explanation": "Это задача приложения."
    },
    {
      "text": "Защиту от SQL-инъекций",
      "correct": false,
      "explanation": "Для этого нужны параметры запросов."
    }
  ],
  "explanation": "HTTPS защищает транспорт."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что защищает HTTPS?",
  "options": [
    {
      "text": "Содержимое канала",
      "correct": true
    },
    {
      "text": "Целостность данных",
      "correct": true
    },
    {
      "text": "Подлинность домена",
      "correct": true
    },
    {
      "text": "Права пользователя в приложении",
      "correct": false,
      "explanation": "Это авторизация."
    }
  ],
  "explanation": "HTTPS отвечает за транспорт."
}
```

## Куда дальше

- [TLS и сертификаты](theme.html?path=content/http-seti-i-rest-api/https-i-tls/tls-i-sertifikaty.md)
- [TLS handshake](theme.html?path=content/http-seti-i-rest-api/https-i-tls/tls-handshake.md)
- [HSTS и secure cookies](theme.html?path=content/http-seti-i-rest-api/https-i-tls/hsts-i-secure-cookies.md)
