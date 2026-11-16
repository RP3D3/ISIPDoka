---
title: DNS
description: Домены, записи A, AAAA, CNAME, MX и TXT, резолвинг и TTL.
keywords: DNS, домен, A, AAAA, CNAME, MX, TXT, TTL, резолвинг

---

# DNS

DNS переводит удобное имя домена в IP-адрес. Без DNS пришлось бы помнить
числа для каждого сайта.

## Домен

```text
api.example.com
```

- `com` — верхний уровень;
- `example` — домен второго уровня;
- `api` — поддомен.

## Основные записи

- `A` — IPv4-адрес;
- `AAAA` — IPv6-адрес;
- `CNAME` — псевдоним;
- `MX` — почтовый сервер;
- `TXT` — текстовые данные, например проверки домена.

## Резолвинг

1. Браузер проверяет свой кэш.
2. ОС проверяет системный кэш.
3. Запрос идёт к DNS-серверу провайдера.
4. Если ответа нет, сервер идёт к корневым и авторитативным DNS.
5. Ответ кэшируется на время TTL.

## TTL

TTL говорит, сколько секунд можно хранить ответ. Маленький TTL удобен при
переезде, но даёт больше запросов.

## Частые ошибки

- **Считать DNS только «переводом имени».** Там ещё почта и проверки.
- **Игнорировать TTL.** Изменения могут примениться не сразу.
- **Хардкодить IP в приложении.** Он может измениться.
- **Забывать про поддомены.** У них могут быть отдельные записи.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какая запись хранит IPv4-адрес?",
  "options": [
    {
      "text": "A",
      "correct": true,
      "explanation": "A — адрес IPv4."
    },
    {
      "text": "MX",
      "correct": false,
      "explanation": "MX — почта."
    },
    {
      "text": "TXT",
      "correct": false,
      "explanation": "TXT — текст."
    }
  ],
  "explanation": "A и AAAA отвечают за адреса."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про DNS?",
  "options": [
    {
      "text": "A — IPv4",
      "correct": true
    },
    {
      "text": "AAAA — IPv6",
      "correct": true
    },
    {
      "text": "CNAME — псевдоним",
      "correct": true
    },
    {
      "text": "TTL — размер пакета",
      "correct": false,
      "explanation": "TTL — время кэширования."
    }
  ],
  "explanation": "DNS хранит разные типы записей."
}
```

## Куда дальше

- [TCP и UDP](theme.html?path=content/http-seti-i-rest-api/osnovy-setey/tcp-i-udp.md)
- [Прокси, NAT и брандмауэры](theme.html?path=content/http-seti-i-rest-api/osnovy-setey/proxy-nat-i-firewall.md)
- [Диагностика сети](theme.html?path=content/http-seti-i-rest-api/osnovy-setey/diagnostika-seti.md)
