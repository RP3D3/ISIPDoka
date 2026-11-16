---
title: Пароли и хеширование
description: Почему нельзя хранить пароли открыто и как работает Argon2.
keywords: Python, пароли, хеширование, Argon2, bcrypt, безопасность

---

# Пароли и хеширование

Пароль нельзя хранить в открытом виде. В базе хранится только хеш.

## Хеширование

```python
from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

hashed = password_hash.hash("secret")
is_valid = password_hash.verify("secret", hashed)
```

## Почему Argon2

- медленный по дизайну;
- использует соль;
- устойчив к перебору;
- рекомендован для новых проектов.

## Проверка

```python
def check_password(password: str, hashed: str) -> bool:
    return password_hash.verify(password, hashed)
```

## Частые ошибки

- **Хранить пароль в открытом виде.**
- **Использовать MD5 или SHA-1.**
- **Логировать пароль.**
- **Сравнивать хеши обычным `==` без необходимости.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что хранится в базе?",
  "options": [
    {
      "text": "Хеш пароля",
      "correct": true,
      "explanation": "Сам пароль не хранят."
    },
    {
      "text": "Открытый пароль",
      "correct": false,
      "explanation": "Это утечка."
    },
    {
      "text": "Логин и пароль в URL",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Хранится только необратимый хеш."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно для паролей?",
  "options": [
    {
      "text": "Соль",
      "correct": true
    },
    {
      "text": "Медленный алгоритм",
      "correct": true
    },
    {
      "text": "Проверка без утечки",
      "correct": true
    },
    {
      "text": "MD5",
      "correct": false,
      "explanation": "Он слишком быстрый и слабый."
    }
  ],
  "explanation": "Хеширование должно быть медленным и солёным."
}
```

## Куда дальше

- [JWT и токены](theme.html?path=content/python/auth-cors-bezopasnost/jwt-i-tokeny.md)
- [OAuth2 и scopes](theme.html?path=content/python/auth-cors-bezopasnost/oauth2-i-scopes.md)
- [Сессии и cookies](theme.html?path=content/python/auth-cors-bezopasnost/sessii-i-cookies.md)
