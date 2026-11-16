---
title: Практика: проверить HTTPS
description: Упражнение: проверить сертификат, HSTS и mixed content.
keywords: практика, HTTPS, TLS, сертификат, HSTS, mixed content

---

# Практика: проверить HTTPS

Возьмите любой сайт и проверьте его HTTPS.

## 1. Сертификат

В браузере:

- откройте информацию о сайте;
- проверьте домен;
- проверьте срок;
- проверьте издателя.

Через терминал:

```bash
openssl s_client -connect example.com:443 -servername example.com
```

## 2. Заголовки

```bash
curl -I https://example.com
```

Ищите:

- `Strict-Transport-Security`;
- `Content-Security-Policy`;
- `X-Content-Type-Options`.

## 3. Mixed content

Откройте DevTools, вкладку Console. Предупреждения о mixed content
покажут HTTP-ресурсы.

## 4. Чек-лист

- [ ] HTTPS открывается без предупреждений.
- [ ] Сертификат на нужный домен.
- [ ] Срок не истёк.
- [ ] HSTS включён.
- [ ] Нет mixed content.

## Частые ошибки

- **Игнорировать предупреждения.**
- **Смотреть только на замок.**
- **Забывать про поддомены.**
- **Не проверять срок.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что проверить у сертификата?",
  "options": [
    {
      "text": "Домен и срок действия",
      "correct": true,
      "explanation": "Это базовые проверки."
    },
    {
      "text": "Только цвет замка",
      "correct": false,
      "explanation": "Это не проверка."
    },
    {
      "text": "Количество картинок",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "Сертификат должен быть валидным."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "Проверка сертификата",
      "correct": true
    },
    {
      "text": "Проверка HSTS",
      "correct": true
    },
    {
      "text": "Поиск mixed content",
      "correct": true
    },
    {
      "text": "Отключение TLS",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Практика проверяет HTTPS по шагам."
}
```

## Куда дальше

- [HTTPS и TLS](theme.html?path=content/http-seti-i-rest-api/https-i-tls/https-i-tls.md)
- [REST и контракт API](theme.html?path=content/http-seti-i-rest-api/rest-i-kontrakt-api/chto-takoe-rest.md)
- [Auth, CORS и лимиты](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/sessii-i-cookies.md)
