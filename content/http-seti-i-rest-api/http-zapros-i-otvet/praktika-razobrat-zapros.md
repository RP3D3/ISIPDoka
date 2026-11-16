---
title: Практика: разобрать запрос
description: Упражнение: прочитать реальный HTTP-запрос в DevTools и curl.
keywords: практика, HTTP, DevTools, curl, заголовки, статус

---

# Практика: разобрать запрос

Откройте любой сайт и разберите один запрос.

## 1. DevTools

1. Откройте вкладку Network.
2. Обновите страницу.
3. Выберите запрос.
4. Посмотрите метод, статус, заголовки и тело.

## 2. curl

```bash
curl -v https://example.com/
```

## 3. Заполните карточку

- метод;
- путь;
- статус;
- `Content-Type`;
- `Cache-Control`;
- размер тела;
- есть ли редирект.

## 4. Найдите ошибку

Если статус `4xx`:

- проверьте URL и авторизацию;
- прочитайте тело ошибки.

Если `5xx`:

- проверьте логи сервера;
- не показывайте стек пользователю.

## Частые ошибки

- **Смотреть только на вид страницы.**
- **Игнорировать заголовки.**
- **Не читать тело ошибки.**
- **Путать статус и текст.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где смотреть HTTP-запрос в браузере?",
  "options": [
    {
      "text": "В DevTools, вкладка Network",
      "correct": true,
      "explanation": "Там видны метод, статус и заголовки."
    },
    {
      "text": "В CSS-файле",
      "correct": false,
      "explanation": "Это стили."
    },
    {
      "text": "В HTML-комментарии",
      "correct": false,
      "explanation": "Это не сетевой лог."
    }
  ],
  "explanation": "Network показывает обмен."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что смотреть в запросе?",
  "options": [
    {
      "text": "Метод и путь",
      "correct": true
    },
    {
      "text": "Статус",
      "correct": true
    },
    {
      "text": "Заголовки и тело",
      "correct": true
    },
    {
      "text": "Только цвет кнопки",
      "correct": false,
      "explanation": "Это не HTTP."
    }
  ],
  "explanation": "Практика учит читать обмен."
}
```

## Куда дальше

- [HTTP: запрос и ответ](theme.html?path=content/http-seti-i-rest-api/http-zapros-i-otvet/http-zapros-i-otvet.md)
- [HTTPS и TLS](theme.html?path=content/http-seti-i-rest-api/https-i-tls/zachem-https.md)
- [REST и контракт API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/chto-takoe-rest.md)
