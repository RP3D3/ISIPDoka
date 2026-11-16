---
title: Основы сетей
description: Итог группы: клиент, сервер, IP, DNS, TCP, UDP, прокси и диагностика.
keywords: основы сетей, итог, IP, DNS, TCP, UDP, прокси

---

# Основы сетей

Главная идея группы: любой запрос — это путь через несколько слоёв, и
ломаться он может на каждом из них.

## Что запомнить

- клиент отправляет запрос, сервер отвечает;
- домен переводится в IP через DNS;
- IP указывает устройство, порт — сервис;
- TCP надёжный, UDP быстрый;
- прокси и NAT меняют путь запроса;
- `localhost` — это текущая машина;
- диагностика начинается с DNS, соединения и HTTP.

## Чек-лист

- [ ] Я понимаю разницу домена и IP.
- [ ] Я знаю основные порты.
- [ ] Я могу объяснить, зачем нужен DNS.
- [ ] Я не путаю TCP и UDP.
- [ ] Я умею проверить запрос через `curl -v`.

## Частые ошибки

- **Путать IP и порт.**
- **Считать NAT защитой.**
- **Игнорировать DNS и TTL.**
- **Проверять только браузер.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в основах сетей?",
  "options": [
    {
      "text": "Понимать путь запроса по слоям",
      "correct": true,
      "explanation": "Это помогает находить причину сбоя."
    },
    {
      "text": "Знать все IP-адреса наизусть",
      "correct": false,
      "explanation": "Это невозможно и не нужно."
    },
    {
      "text": "Использовать только UDP",
      "correct": false,
      "explanation": "Транспорт выбирают по задаче."
    }
  ],
  "explanation": "Слои помогают локализовать проблему."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "IP и порты",
      "correct": true
    },
    {
      "text": "DNS",
      "correct": true
    },
    {
      "text": "TCP, UDP и диагностика",
      "correct": true
    },
    {
      "text": "Только CSS-анимации",
      "correct": false,
      "explanation": "Это не сети."
    }
  ],
  "explanation": "Группа покрывает базовые сетевые слои."
}
```

## Куда дальше

- [Практика: путь запроса](theme.html?path=content/http-seti-i-rest-api/osnovy-setey/praktika-put-zaprosa.md)
- [HTTP: запрос и ответ](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/struktura-http-zaprosa.md)
- [HTTPS и TLS](theme.html?path=content/http-seti-i-rest-api/https-i-tls/zachem-https.md)
