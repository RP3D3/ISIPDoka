---
title: HTTP, формы и сессии
description: Итог группы: запрос, валидация, cookies, сессии, файлы и заголовки.
keywords: HTTP, формы, сессии, cookies, валидация, итог

---

# HTTP, формы и сессии

Главная идея группы: PHP принимает HTTP-запрос, проверяет данные и
формирует предсказуемый ответ.

## Что запомнить

- HTTP не хранит состояние;
- GET читает, POST изменяет;
- данные из запроса нельзя доверять;
- вывод нужно экранировать;
- cookies и сессии хранят состояние;
- файлы проверяют по размеру и типу;
- заголовки управляют ответом;
- CSRF-токен защищает формы.

## Чек-лист

- [ ] Я понимаю разницу GET и POST.
- [ ] Я проверяю обязательные поля.
- [ ] Я экранирую вывод.
- [ ] Я использую `httponly` и `samesite`.
- [ ] Я делаю редирект после POST.
- [ ] Я проверяю CSRF-токен.

## Частые ошибки

- **Доверять `$_POST` без проверки.**
- **Выводить HTML из ввода.**
- **Не делать `exit` после редиректа.**
- **Хранить пароль в cookie.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что главное в работе с формами?",
  "options": [
    {
      "text": "Проверять данные и безопасно выводить их",
      "correct": true,
      "explanation": "Это основа безопасной формы."
    },
    {
      "text": "Доверять клиентской проверке",
      "correct": false,
      "explanation": "Сервер тоже должен проверять."
    },
    {
      "text": "Передавать пароль в URL",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Форма требует проверки на сервере."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в группу?",
  "options": [
    {
      "text": "GET и POST",
      "correct": true
    },
    {
      "text": "Cookies и сессии",
      "correct": true
    },
    {
      "text": "Файлы и заголовки",
      "correct": true
    },
    {
      "text": "Только CSS-анимации",
      "correct": false,
      "explanation": "Это не HTTP-тема."
    }
  ],
  "explanation": "Группа покрывает путь формы и ответа."
}
```

## Куда дальше

- [Практика: обработка формы](theme.html?path=content/php/http-formy-sessii/praktika-forma-obrabotka.md)
- [Базы данных и PDO](theme.html?path=content/php/bazy-dannyh-i-pdo/sql-dlya-php.md)
- [API и фронтенд](theme.html?path=content/php/api-i-frontend/json-i-format-otveta.md)
