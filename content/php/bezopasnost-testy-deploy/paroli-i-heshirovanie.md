---
title: Пароли и хеширование
description: password_hash, password_verify и безопасное хранение паролей.
keywords: PHP, пароли, password_hash, password_verify, хеширование, безопасность

---

# Пароли и хеширование

Пароли нельзя хранить в открытом виде. Для них нужны медленные хеши.

## Создание хеша

```php
<?php

$hash = password_hash($password, PASSWORD_DEFAULT);
```

## Проверка

```php
<?php

if (password_verify($password, $user["password_hash"])) {
    echo "Вход разрешён";
}
```

## Обновление хеша

```php
<?php

if (password_needs_rehash($user["password_hash"], PASSWORD_DEFAULT)) {
    $newHash = password_hash($password, PASSWORD_DEFAULT);
    // сохранить новый хеш
}
```

## Что нельзя

- MD5;
- SHA1;
- открытый текст;
- самодельная соль;
- одинаковый пароль для всех.

## Дополнительно

- ограничивайте попытки входа;
- используйте HTTPS;
- не логируйте пароли;
- предлагайте двухфакторную аутентификацию.

## Частые ошибки

- **Хранить пароль в открытом виде.**
- **Использовать MD5 или SHA1.**
- **Сравнивать хеши через `==`.**
- **Писать пароль в лог.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какая функция проверяет пароль?",
  "options": [
    {
      "text": "`password_verify`",
      "correct": true,
      "explanation": "Она сравнивает пароль с хешем."
    },
    {
      "text": "`md5`",
      "correct": false,
      "explanation": "Это небезопасно."
    },
    {
      "text": "`strlen`",
      "correct": false,
      "explanation": "Она считает длину."
    }
  ],
  "explanation": "Для паролей есть специальные функции."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про пароли?",
  "options": [
    {
      "text": "Хранить только хеш",
      "correct": true
    },
    {
      "text": "Использовать `PASSWORD_DEFAULT`",
      "correct": true
    },
    {
      "text": "Проверять через `password_verify`",
      "correct": true
    },
    {
      "text": "Хранить пароль в открытом виде",
      "correct": false,
      "explanation": "Это утечка."
    }
  ],
  "explanation": "Пароли хешируют и проверяют специальными функциями."
}
```

## Куда дальше

- [Секреты и конфигурация](theme.html?path=content/php/bezopasnost-testy-deploy/sekrety-i-konfiguraciya.md)
- [PHPUnit и тестирование](theme.html?path=content/php/bezopasnost-testy-deploy/phpunit-i-testirovanie.md)
- [Безопасность, тесты и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/bezopasnost-testy-deploy.md)
