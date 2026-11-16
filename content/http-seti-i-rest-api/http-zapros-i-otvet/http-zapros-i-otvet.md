---
title: HTTP: запрос и ответ
description: Итог группы: структура, методы, статусы, заголовки, URL, кэш и транспорты.
keywords: HTTP, итог, методы, статусы, заголовки, кэш, HTTP/2, HTTP/3

---

# HTTP: запрос и ответ

Главная идея группы: HTTP — это сообщение с методом, статусом,
заголовками и телом, а не просто «ссылка в браузере».

## Что запомнить

- запрос начинается с метода и пути;
- статус-код важнее текста ошибки;
- заголовки управляют форматом и кэшем;
- query уточняет выборку;
- `Content-Type` описывает тело;
- кэш требует безопасности;
- HTTP/2 и HTTP/3 меняют транспорт, но не смысл API;
- real-time — отдельный выбор.

## Чек-лист

- [ ] Я могу прочитать HTTP-запрос.
- [ ] Я различаю `GET` и `POST`.
- [ ] Я не путаю `401` и `403`.
- [ ] Я указываю `Content-Type`.
- [ ] Я понимаю `304`.
- [ ] Я знаю, когда нужен WebSocket.

## Частые ошибки

- **Игнорировать статус.**
- **Всегда отвечать `200`.**
- **Кэшировать приватные данные.**
- **Путать query и path.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в HTTP?",
  "options": [
    {
      "text": "Правильные метод, статус и заголовки",
      "correct": true,
      "explanation": "Это формирует контракт."
    },
    {
      "text": "Только тело запроса",
      "correct": false,
      "explanation": "Тело — лишь часть."
    },
    {
      "text": "Только URL",
      "correct": false,
      "explanation": "URL — лишь адрес."
    }
  ],
  "explanation": "HTTP-сообщение состоит из нескольких частей."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "Методы и статусы",
      "correct": true
    },
    {
      "text": "Заголовки и URL",
      "correct": true
    },
    {
      "text": "Кэш и транспорты",
      "correct": true
    },
    {
      "text": "Только CSS",
      "correct": false,
      "explanation": "Это не HTTP."
    }
  ],
  "explanation": "Группа покрывает HTTP-сообщение."
}
```

## Куда дальше

- [Практика: разобрать запрос](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/praktika-razobrat-zapros.md)
- [HTTPS и TLS](theme.html?path=content/http-seti-i-rest-api/https-i-tls/zachem-https.md)
- [REST и контракт API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/chto-takoe-rest.md)
