---
title: HTTP/2, HTTP/3 и real-time
description: Мультиплексирование, QUIC, WebSocket, SSE и long polling.
keywords: HTTP/2, HTTP/3, QUIC, WebSocket, SSE, long polling, real-time

---

# HTTP/2, HTTP/3 и real-time

HTTP/1.1, HTTP/2 и HTTP/3 отличаются транспортом и эффективностью. Для
обновлений в реальном времени есть отдельные механизмы.

## HTTP/1.1

- одно соединение — один запрос за раз;
- браузер открывает несколько соединений;
- заголовки передаются текстом.

## HTTP/2

- мультиплексирование в одном соединении;
- сжатие заголовков;
- бинарный протокол;
- приоритеты потоков.

## HTTP/3

- работает через QUIC поверх UDP;
- быстрее устанавливает соединение;
- меньше блокировок при потере пакетов.

## Real-time

- long polling — сервер держит запрос;
- SSE — односторонний поток событий;
- WebSocket — двусторонний канал.

## Когда что

- редкие обновления — polling;
- только сервер → клиент — SSE;
- чат и игры — WebSocket.

## Частые ошибки

- **Думать, что HTTP/2 ускорит любой запрос.**
- **Использовать WebSocket для редких обновлений.**
- **Забывать reconnect и heartbeat.**
- **Игнорировать прокси и таймауты.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что даёт HTTP/2?",
  "options": [
    {
      "text": "Мультиплексирование запросов в одном соединении",
      "correct": true,
      "explanation": "Это главное отличие от HTTP/1.1."
    },
    {
      "text": "Автоматическую базу данных",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Шифрование без TLS",
      "correct": false,
      "explanation": "TLS всё равно нужен."
    }
  ],
  "explanation": "HTTP/2 эффективнее использует соединение."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про real-time?",
  "options": [
    {
      "text": "SSE — поток от сервера",
      "correct": true
    },
    {
      "text": "WebSocket — двусторонний канал",
      "correct": true
    },
    {
      "text": "Long polling держит запрос",
      "correct": true
    },
    {
      "text": "WebSocket нужен для любой страницы",
      "correct": false,
      "explanation": "Для обычных страниц он избыточен."
    }
  ],
  "explanation": "Транспорт выбирают по задаче."
}
```

## Куда дальше

- [HTTP: запрос и ответ](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/http-zapros-i-otvet.md)
- [Практика: разобрать запрос](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/praktika-razobrat-zapros.md)
- [HTTPS и TLS](theme.html?path=content/http-seti-i-rest-api/https-i-tls/zachem-https.md)
