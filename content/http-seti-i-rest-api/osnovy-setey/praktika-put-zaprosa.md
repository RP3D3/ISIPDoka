---
title: Практика: путь запроса
description: Упражнение: разобрать путь запроса от браузера до ответа API.
keywords: практика, сети, путь запроса, DNS, TCP, HTTP

---

# Практика: путь запроса

Возьмите любой запрос к API и опишите каждый шаг.

## 1. Выберите запрос

```text
GET https://api.example.com/api/tasks?limit=20
```

## 2. Разберите шаги

- [ ] Домен `api.example.com`.
- [ ] DNS-запись `A` или `AAAA`.
- [ ] IP-адрес и порт `443`.
- [ ] TCP-соединение.
- [ ] TLS-сертификат.
- [ ] HTTP-метод `GET`.
- [ ] Путь `/api/tasks`.
- [ ] Query-параметр `limit=20`.
- [ ] Статус ответа.
- [ ] Формат тела.

## 3. Проверьте

```bash
dig api.example.com
curl -v "https://api.example.com/api/tasks?limit=20"
```

## 4. Найдите слабое место

Если запрос не работает, проверяйте по порядку:

1. DNS;
2. соединение;
3. TLS;
4. HTTP-статус;
5. тело ответа.

## Частые ошибки

- **Сразу менять код.** Сначала локализуйте слой.
- **Игнорировать статус.** Тело может быть пустым.
- **Забывать про query.** Параметры влияют на ответ.
- **Не смотреть заголовки.** Там бывает причина.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "С чего начать разбор запроса?",
  "options": [
    {
      "text": "С домена и DNS",
      "correct": true,
      "explanation": "Это первый шаг пути."
    },
    {
      "text": "С изменения базы",
      "correct": false,
      "explanation": "Сначала проверяют сеть."
    },
    {
      "text": "С удаления кэша",
      "correct": false,
      "explanation": "Это не первый шаг."
    }
  ],
  "explanation": "Путь начинается с DNS."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в разбор?",
  "options": [
    {
      "text": "DNS и IP",
      "correct": true
    },
    {
      "text": "TCP и TLS",
      "correct": true
    },
    {
      "text": "HTTP-метод и статус",
      "correct": true
    },
    {
      "text": "Только цвет интерфейса",
      "correct": false,
      "explanation": "Это не сетевой шаг."
    }
  ],
  "explanation": "Практика покрывает весь путь."
}
```

## Куда дальше

- [Основы сетей](theme.html?path=content/http-seti-i-rest-api/osnovy-setey/osnovy-setey.md)
- [HTTP: запрос и ответ](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/struktura-http-zaprosa.md)
- [REST и контракт API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/chto-takoe-rest.md)
