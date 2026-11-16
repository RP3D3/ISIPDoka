---
title: Практика: защитить API
description: Упражнение: регистрация, вход, JWT, защищённые маршруты, CORS и лимит.
keywords: практика, auth, JWT, FastAPI, CORS, безопасность, rate limiting

---

# Практика: защитить API

Добавьте аутентификацию и ограничения в API задач.

## 1. Пользователь

```python
class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True, index=True)
    password_hash: Mapped[str]
```

## 2. Регистрация

```python
@app.post("/auth/register", status_code=201)
def register(payload: RegisterIn, db: Session = Depends(get_db)) -> dict[str, str]:
    user = User(
        email=payload.email,
        password_hash=password_hash.hash(payload.password),
    )
    db.add(user)
    db.commit()
    return {"status": "created"}
```

## 3. Вход

```python
@app.post("/auth/token")
def login(form: OAuth2PasswordRequestForm = Depends()) -> dict[str, str]:
    user = find_user(form.username)
    if user is None or not password_hash.verify(form.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Неверные данные")

    return {"access_token": create_token(user.id), "token_type": "bearer"}
```

## 4. Защита

```python
@app.get("/tasks", response_model=list[TaskRead])
def list_tasks(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[Task]:
    return list(db.scalars(select(Task).where(Task.user_id == user.id)).all())
```

## 5. Проверка

- [ ] Пароль не хранится открыто.
- [ ] Неверный пароль даёт `401`.
- [ ] Без токена защищённый маршрут даёт `401`.
- [ ] Чужой ресурс даёт `403` или `404`.
- [ ] CORS разрешает только нужный origin.
- [ ] Вход ограничен по частоте.

## Частые ошибки

- **Возвращать `password_hash` клиенту.**
- **Проверять роль на клиенте.**
- **Открывать CORS всем.**
- **Не ограничивать попытки входа.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать при неверном пароле?",
  "options": [
    {
      "text": "Вернуть `401`",
      "correct": true,
      "explanation": "Пользователь не аутентифицирован."
    },
    {
      "text": "Вернуть `200`",
      "correct": false,
      "explanation": "Это скрывает ошибку."
    },
    {
      "text": "Показать хеш",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Неверный вход — `401`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "Хеширование пароля",
      "correct": true
    },
    {
      "text": "JWT и защищённые маршруты",
      "correct": true
    },
    {
      "text": "CORS и лимит",
      "correct": true
    },
    {
      "text": "Пароль в открытом виде",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Практика собирает защиту API."
}
```

## Куда дальше

- [Auth, CORS и безопасность](theme.html?path=content/python/auth-cors-bezopasnost/auth-cors-bezopasnost.md)
- [Асинхронность, тесты и деплой](theme.html?path=content/python/async-testy-deploy/async-await.md)
- [Практика: Python-бэкенд](theme.html?path=content/python/praktika-python-backend/trebovaniya-i-scenarii.md)
