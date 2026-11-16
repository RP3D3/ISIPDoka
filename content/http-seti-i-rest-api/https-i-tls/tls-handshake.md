---
title: TLS handshake
description: ClientHello, ServerHello, сертификат, ключи и TLS 1.3.
keywords: TLS, handshake, ClientHello, ServerHello, ключи, TLS 1.3

---

# TLS handshake

Перед HTTPS-запросом клиент и сервер договариваются о версии, шифрах и
ключах. Это и есть TLS handshake.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/http-seti-i-rest-api/_assets/https-i-tls/tls-handshake.svg"
    alt="TLS handshake, сертификат и шифрованный HTTP"
    width="900"
  >
  <figcaption>
    HTTPS = HTTP + TLS. Сначала handshake, потом запрос.
  </figcaption>
</figure>

## Шаги

1. `ClientHello`: версии, шифры, случайное число.
2. `ServerHello`: выбранная версия и шифр.
3. Сервер присылает сертификат.
4. Клиент проверяет цепочку и домен.
5. Стороны вычисляют общий ключ.
6. Дальше идёт шифрованный HTTP.

## TLS 1.3

В TLS 1.3 handshake короче: меньше round-trip и больше безопасных
шифров по умолчанию.

## Session resumption

Повторное подключение может использовать сохранённую сессию. Это
ускоряет handshake.

## Частые ошибки

- **Думать, что handshake выполняется на каждый запрос.** Соединение
  переиспользуется.
- **Игнорировать задержку.** Handshake добавляет время.
- **Отключать современные версии TLS.**
- **Считать HTTPS медленным по умолчанию.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что происходит в TLS handshake?",
  "options": [
    {
      "text": "Стороны договариваются о шифровании и ключах",
      "correct": true,
      "explanation": "После этого HTTP идёт внутри TLS."
    },
    {
      "text": "Создаётся база данных",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Удаляются cookies",
      "correct": false,
      "explanation": "Это не handshake."
    }
  ],
  "explanation": "Handshake устанавливает защищённый канал."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про TLS handshake?",
  "options": [
    {
      "text": "Начинается с ClientHello",
      "correct": true
    },
    {
      "text": "Сервер присылает сертификат",
      "correct": true
    },
    {
      "text": "TLS 1.3 короче TLS 1.2",
      "correct": true
    },
    {
      "text": "Handshake нужен для каждого HTTP-запроса",
      "correct": false,
      "explanation": "Соединение переиспользуется."
    }
  ],
  "explanation": "Handshake создаёт защищённое соединение."
}
```

## Куда дальше

- [HSTS и secure cookies](theme.html?path=content/http-seti-i-rest-api/https-i-tls/hsts-i-secure-cookies.md)
- [Mixed content](theme.html?path=content/http-seti-i-rest-api/https-i-tls/mixed-content.md)
- [Ошибки TLS](theme.html?path=content/http-seti-i-rest-api/https-i-tls/oshibki-tls.md)
