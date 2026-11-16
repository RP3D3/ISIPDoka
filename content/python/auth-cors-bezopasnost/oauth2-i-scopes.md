---
title: OAuth2 и scopes
description: OAuth2PasswordBearer, токен-эндпоинт, права и проверка пользователя.
keywords: Python, FastAPI, OAuth2, scopes, токен, права, безопасность

---

# OAuth2 и scopes

OAuth2 описывает получение токена. Scopes ограничивают доступ.

## Схема

```python
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")
```

## Токен-эндпоинт

```python
@app.post("/auth/token")
def login(form: OAuth2PasswordRequestForm = Depends()) -> dict[str, str]:
    user = authenticate(form.username, form.password)

    if user is None:
        raise HTTPException(status_code=401, detail="Неверные данные")

    token = create_access_token(user.id)
    return {"access_token": token, "token_type": "bearer"}
```

## Пользователь

```python
def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    ...
```

## Права

```python
def require_admin(user: User = Depends(get_current_user)) -> User:
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Нет прав")
    return user
```

## Частые ошибки

- **Путать аутентификацию и авторизацию.**
- **Не проверять scopes.**
- **Доверять роли с клиента.**
- **Возвращать `401` вместо `403`.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что означает `403`?",
  "options": [
    {
      "text": "Пользователь известен, но прав нет",
      "correct": true,
      "explanation": "Это авторизация."
    },
    {
      "text": "Пользователь не вошёл",
      "correct": false,
      "explanation": "Это `401`."
    },
    {
      "text": "Сервер упал",
      "correct": false,
      "explanation": "Это `500`."
    }
  ],
  "explanation": "`401` — кто ты, `403` — что тебе можно."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про OAuth2?",
  "options": [
    {
      "text": "Токен передают в заголовке",
      "correct": true
    },
    {
      "text": "Scopes ограничивают доступ",
      "correct": true
    },
    {
      "text": "Права проверяют на сервере",
      "correct": true
    },
    {
      "text": "Роль можно брать из JSON клиента",
      "correct": false,
      "explanation": "Клиенту нельзя доверять."
    }
  ],
  "explanation": "Права проверяются на сервере."
}
```

## Куда дальше

- [Сессии и cookies](theme.html?path=content/python/auth-cors-bezopasnost/sessii-i-cookies.md)
- [CORS](theme.html?path=content/python/auth-cors-bezopasnost/cors.md)
- [Rate limiting](theme.html?path=content/python/auth-cors-bezopasnost/rate-limiting.md)
