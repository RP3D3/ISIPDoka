---
title: SQL-инъекции и XSS
description: Две главные ошибки бэкенда и как их не допускать в PHP.
keywords: PHP, SQL-инъекции, XSS, безопасность, подготовленные запросы, экранирование

---

# SQL-инъекции и XSS

SQL-инъекция меняет запрос через ввод. XSS выполняет чужой скрипт в
браузере пользователя.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/php/_assets/bezopasnost-testy-deploy/secure-deploy.svg"
    alt="Угрозы, защита, тесты и деплой PHP-бэкенда"
    width="900"
  >
  <figcaption>
    Безопасность — часть обычной работы, а не отдельный этап.
  </figcaption>
</figure>

## SQL-инъекция

Плохо:

```php
<?php

$sql = "SELECT * FROM users WHERE email = '" . $_GET["email"] . "'";
```

Хорошо:

```php
<?php

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->execute(["email" => $_GET["email"]]);
```

## XSS

Плохо:

```php
<?php

echo $_POST["comment"];
```

Хорошо:

```php
<?php

$comment = htmlspecialchars($_POST["comment"], ENT_QUOTES, "UTF-8");
echo $comment;
```

## Дополнительно

- проверяйте типы и длину;
- используйте CSP;
- не вставляйте пользовательский HTML без очистки;
- храните шаблоны отдельно от данных.

## Частые ошибки

- **Склеивать SQL с вводом.**
- **Выводить HTML без экранирования.**
- **Доверять клиентской проверке.**
- **Считать, что HTTPS заменяет валидацию.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что защищает от SQL-инъекций?",
  "options": [
    {
      "text": "Подготовленные запросы",
      "correct": true,
      "explanation": "Данные передаются отдельно от SQL."
    },
    {
      "text": "HTML-экранирование",
      "correct": false,
      "explanation": "Это защита от XSS."
    },
    {
      "text": "Красивый интерфейс",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "Параметры отделяют данные от SQL."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает против XSS?",
  "options": [
    {
      "text": "`htmlspecialchars`",
      "correct": true
    },
    {
      "text": "Экранирование вывода",
      "correct": true
    },
    {
      "text": "Проверка входных данных",
      "correct": true
    },
    {
      "text": "Вывод без обработки",
      "correct": false,
      "explanation": "Это и есть риск."
    }
  ],
  "explanation": "XSS предотвращают экранированием."
}
```

## Куда дальше

- [CSRF и сессии](theme.html?path=content/php/bezopasnost-testy-deploy/csrf-i-sessii.md)
- [Пароли и хеширование](theme.html?path=content/php/bezopasnost-testy-deploy/paroli-i-heshirovanie.md)
- [Безопасность, тесты и деплой](theme.html?path=content/php/bezopasnost-testy-deploy/bezopasnost-testy-deploy.md)
