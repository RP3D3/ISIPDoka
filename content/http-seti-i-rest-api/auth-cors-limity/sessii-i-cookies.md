---
title: Сессии и cookies
description: Аутентификация на cookie, HttpOnly, Secure, SameSite и CSRF.
keywords: auth, сессия, cookie, HttpOnly, Secure, SameSite, CSRF

---

# Сессии и cookies

При сессионной аутентификации браузер хранит только ID сессии. Данные
пользователя остаются на сервере.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/http-seti-i-rest-api/_assets/auth-cors-limity/auth-cors.svg"
    alt="Аутентификация, авторизация, лимиты и CORS"
    width="900"
  >
  <figcaption>
    Аутентификация отвечает «кто ты», авторизация — «что можно».
  </figcaption>
</figure>

## Cookie

```http
Set-Cookie: session=abc; HttpOnly; Secure; SameSite=Lax; Path=/
```

- `HttpOnly` — недоступна из JavaScript;
- `Secure` — только по HTTPS;
- `SameSite` — ограничивает межсайтовые запросы;
- `Path` — область действия.

## Вход

1. Пользователь присылает логин и пароль.
2. Сервер проверяет хеш пароля.
3. Создаёт сессию.
4. Отдаёт cookie с ID.
5. Следующие запросы несут cookie.

## Выход

Удалите сессию на сервере и cookie у клиента. Недостаточно только удалить
cookie в браузере.

## Частые ошибки

- **Хранить пароль в cookie.**
- **Не ставить `HttpOnly`.**
- **Не менять ID сессии после входа.**
- **Забывать CSRF-защиту.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что хранит браузер при сессии?",
  "options": [
    {
      "text": "ID сессии",
      "correct": true,
      "explanation": "Данные сессии остаются на сервере."
    },
    {
      "text": "Пароль",
      "correct": false,
      "explanation": "Это небезопасно."
    },
    {
      "text": "Всю базу",
      "correct": false,
      "explanation": "Это невозможно."
    }
  ],
  "explanation": "Клиент хранит только идентификатор."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для cookie?",
  "options": [
    {
      "text": "`HttpOnly`",
      "correct": true
    },
    {
      "text": "`Secure`",
      "correct": true
    },
    {
      "text": "`SameSite`",
      "correct": true
    },
    {
      "text": "Пароль в открытом виде",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Cookie должны быть защищены."
}
```

## Куда дальше

- [API keys](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/api-keys.md)
- [JWT](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/jwt.md)
- [CORS](theme.html?path=content/http-seti-i-rest-api/auth-cors-limity/cors.md)
