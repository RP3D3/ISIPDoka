---
title: TCP и UDP
description: Надёжный TCP, быстрый UDP и их место в HTTP, DNS и real-time.
keywords: TCP, UDP, handshake, пакет, порт, надёжность, задержка

---

# TCP и UDP

TCP и UDP — два транспорта. TCP гарантирует доставку и порядок, UDP
отправляет данные без гарантий, но с меньшей задержкой.

## TCP

TCP:

- устанавливает соединение;
- подтверждает получение;
- повторяет потерянные пакеты;
- сохраняет порядок;
- управляет скоростью.

По TCP работают HTTP/1.1 и HTTP/2, SSH, PostgreSQL.

## UDP

UDP:

- не устанавливает соединение;
- не гарантирует доставку;
- не сохраняет порядок;
- имеет меньшие накладные расходы.

По UDP работают DNS, QUIC (а значит HTTP/3), видеозвонки и игры.

## Соединение TCP

```text
SYN → SYN-ACK → ACK
```

После этого можно передавать данные. Закрытие соединения — отдельный
обмен пакетами.

## Что выбрать

- нужна надёжность — TCP;
- важна минимальная задержка — UDP;
- HTTP/3 использует QUIC поверх UDP, но сам добавляет надёжность.

## Частые ошибки

- **Думать, что UDP всегда быстрее.** Зависит от задачи и потерь.
- **Считать UDP «ненадёжным» синонимом «плохого».** Для real-time это норма.
- **Игнорировать таймауты.** Соединение может зависнуть.
- **Забывать, что HTTP/3 не равен «просто UDP».** Там QUIC.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что гарантирует TCP?",
  "options": [
    {
      "text": "Доставку и порядок пакетов",
      "correct": true,
      "explanation": "TCP подтверждает и переотправляет."
    },
    {
      "text": "Минимальную задержку",
      "correct": false,
      "explanation": "Это не главная цель TCP."
    },
    {
      "text": "Шифрование",
      "correct": false,
      "explanation": "Шифрование — TLS."
    }
  ],
  "explanation": "TCP надёжный, но с накладными расходами."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про TCP и UDP?",
  "options": [
    {
      "text": "TCP устанавливает соединение",
      "correct": true
    },
    {
      "text": "UDP не гарантирует доставку",
      "correct": true
    },
    {
      "text": "DNS может работать по UDP",
      "correct": true
    },
    {
      "text": "HTTP/3 работает на чистом TCP",
      "correct": false,
      "explanation": "HTTP/3 использует QUIC поверх UDP."
    }
  ],
  "explanation": "Транспорт выбирают по задаче."
}
```

## Куда дальше

- [Прокси, NAT и брандмауэры](theme.html?path=content/http-seti-i-rest-api/osnovy-setey/proxy-nat-i-firewall.md)
- [Localhost и локальная сеть](theme.html?path=content/http-seti-i-rest-api/osnovy-setey/localhost-i-lokalnaya-set.md)
- [Диагностика сети](theme.html?path=content/http-seti-i-rest-api/osnovy-setey/diagnostika-seti.md)
