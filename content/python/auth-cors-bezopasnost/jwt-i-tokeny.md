---
title: JWT и токены
description: Структура JWT, подпись, срок жизни и access/refresh-токены.
keywords: Python, JWT, токены, access token, refresh token, подпись

---

# JWT и токены

JWT — подписанный токен с данными. Он не шифрует полезную нагрузку, а
защищает её от подмены.

## Структура

```text
header.payload.signature
```

- header — алгоритм;
- payload — данные и `exp`;
- signature — подпись секретом.

## Создание

```python
from datetime import datetime, timedelta, timezone
import jwt

payload = {
    "sub": str(user_id),
    "exp": datetime.now(timezone.utc) + timedelta(minutes=15),
}

token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
```

## Проверка

```python
data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
```

## Access и refresh

- access — короткий, для запросов;
- refresh — длинный, только для обновления;
- refresh хранят безопаснее.

## Частые ошибки

- **Не ставить `exp`.**
- **Разрешать `none`-алгоритм.**
- **Хранить секрет в коде.**
- **Передавать токен в URL.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что защищает JWT?",
  "options": [
    {
      "text": "Подпись",
      "correct": true,
      "explanation": "Она не даёт изменить payload."
    },
    {
      "text": "CSS",
      "correct": false,
      "explanation": "Это стили."
    },
    {
      "text": "Порт",
      "correct": false,
      "explanation": "Это сеть."
    }
  ],
  "explanation": "JWT подписывают, но не шифруют."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про токены?",
  "options": [
    {
      "text": "У access-токена короткий срок",
      "correct": true
    },
    {
      "text": "Refresh нужен для обновления",
      "correct": true
    },
    {
      "text": "Токен передают в `Authorization`",
      "correct": true
    },
    {
      "text": "В payload можно хранить пароль",
      "correct": false,
      "explanation": "Payload читается без секрета."
    }
  ],
  "explanation": "Токены должны быть короткоживущими."
}
```

## Куда дальше

- [OAuth2 и scopes](theme.html?path=content/python/auth-cors-bezopasnost/oauth2-i-scopes.md)
- [Сессии и cookies](theme.html?path=content/python/auth-cors-bezopasnost/sessii-i-cookies.md)
- [CORS](theme.html?path=content/python/auth-cors-bezopasnost/cors.md)
