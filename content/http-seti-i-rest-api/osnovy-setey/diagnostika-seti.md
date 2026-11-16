---
title: Диагностика сети
description: ping, traceroute, dig, curl и проверка портов без паники.
keywords: диагностика, ping, traceroute, dig, curl, ss, netstat

---

# Диагностика сети

Когда запрос не работает, важно понять, где именно он ломается: DNS,
соединение, TLS или сам сервер.

## ping

```bash
ping example.com
```

Проверяет доступность хоста. ICMP может быть заблокирован, поэтому
отсутствие ответа не всегда значит «сервер мёртв».

## traceroute

```bash
traceroute example.com
```

Показывает маршрут до хоста. Полезно, когда сайт открывается только у
части пользователей.

## dig

```bash
dig example.com
dig example.com A
```

Проверяет DNS-записи. Если `dig` даёт адрес, а браузер нет — смотрите кэш
и настройки DNS.

## curl

```bash
curl -v https://example.com/api/health
```

Показывает заголовки, статус и тело. Это быстрый способ проверить API.

## Порты

```bash
ss -ltnp
netstat -ano
```

Показывают, какие порты слушаются и кто их занял.

## Частые ошибки

- **Думать, что ping — истина в последней инстанции.** ICMP могут
  блокировать.
- **Проверять только браузер.** Он скрывает детали.
- **Игнорировать DNS.** Ошибка может быть в записи, а не в сервере.
- **Забывать про firewall.** Порт может быть закрыт снаружи.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что показывает `curl -v`?",
  "options": [
    {
      "text": "Заголовки, статус и тело ответа",
      "correct": true,
      "explanation": "Это удобно для отладки API."
    },
    {
      "text": "Только DNS-записи",
      "correct": false,
      "explanation": "Для DNS есть dig."
    },
    {
      "text": "Только порты",
      "correct": false,
      "explanation": "Порты смотрит ss."
    }
  ],
  "explanation": "curl показывает HTTP-обмен."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает диагностике?",
  "options": [
    {
      "text": "`ping`",
      "correct": true
    },
    {
      "text": "`dig`",
      "correct": true
    },
    {
      "text": "`curl -v`",
      "correct": true
    },
    {
      "text": "Только перезагрузка браузера",
      "correct": false,
      "explanation": "Это не даёт деталей."
    }
  ],
  "explanation": "Разные инструменты проверяют разные слои."
}
```

## Куда дальше

- [Основы сетей](theme.html?path=content/http-seti-i-rest-api/osnovy-setey/osnovy-setey.md)
- [Практика: путь запроса](theme.html?path=content/http-seti-i-rest-api/osnovy-setey/praktika-put-zaprosa.md)
- [HTTP: запрос и ответ](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/struktura-http-zaprosa.md)
