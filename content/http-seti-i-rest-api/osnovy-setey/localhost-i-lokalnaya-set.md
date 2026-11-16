---
title: Localhost и локальная сеть
description: 127.0.0.1, 0.0.0.0, LAN, hostnames и типичные проблемы запуска.
keywords: localhost, 127.0.0.1, 0.0.0.0, LAN, хост, порт, dev server

---

# Localhost и локальная сеть

`localhost` — это текущая машина. Локальная сеть — устройства рядом,
например через Wi-Fi.

## Loopback

```text
localhost → 127.0.0.1 (IPv4) или ::1 (IPv6)
```

Запрос не выходит в сеть. Это удобно для разработки.

## `127.0.0.1` и `0.0.0.0`

- `127.0.0.1` — слушать только локально;
- `0.0.0.0` — слушать на всех интерфейсах.

Если сервер запущен на `127.0.0.1`, с другого устройства его не видно.

## Локальная сеть

Устройства получают адреса вроде `192.168.1.20`. Они видят друг друга,
если разрешён firewall и сервис слушает нужный интерфейс.

## Проверка

```bash
curl http://127.0.0.1:8080
ipconfig
```

## Частые ошибки

- **Запустить на `127.0.0.1` и ждать доступа с телефона.**
- **Открыть `0.0.0.0` в публичную сеть без защиты.**
- **Путать хост и порт.**
- **Забыть про firewall.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что означает `127.0.0.1`?",
  "options": [
    {
      "text": "Текущая машина",
      "correct": true,
      "explanation": "Это loopback-адрес."
    },
    {
      "text": "Публичный адрес сайта",
      "correct": false,
      "explanation": "Он не выходит в интернет."
    },
    {
      "text": "Порт сервера",
      "correct": false,
      "explanation": "Это адрес, а не порт."
    }
  ],
  "explanation": "Loopback указывает на саму машину."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про локальную сеть?",
  "options": [
    {
      "text": "`0.0.0.0` слушает все интерфейсы",
      "correct": true
    },
    {
      "text": "`127.0.0.1` доступен только локально",
      "correct": true
    },
    {
      "text": "Firewall может блокировать порт",
      "correct": true
    },
    {
      "text": "`localhost` — это публичный IP",
      "correct": false,
      "explanation": "Это локальное имя."
    }
  ],
  "explanation": "Хост и интерфейс влияют на доступ."
}
```

## Куда дальше

- [Диагностика сети](theme.html?path=content/http-seti-i-rest-api/osnovy-setey/diagnostika-seti.md)
- [Основы сетей](theme.html?path=content/http-seti-i-rest-api/osnovy-setey/osnovy-setey.md)
- [Практика: путь запроса](theme.html?path=content/http-seti-i-rest-api/osnovy-setey/praktika-put-zaprosa.md)
