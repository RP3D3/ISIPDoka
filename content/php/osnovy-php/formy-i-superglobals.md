---
title: Формы и суперглобалы
description: Как PHP получает данные из форм через $_GET и $_POST и почему ввод нельзя доверять.
keywords: PHP, формы, GET, POST, суперглобалы, htmlspecialchars, валидация

---

# Формы и суперглобалы

Данные из формы приходят в PHP через суперглобалы. Их нельзя считать
безопасными.

## HTML-форма

```html
<form method="post" action="/save.php">
  <input type="text" name="name">
  <button type="submit">Сохранить</button>
</form>
```

## `$_POST`

```php
<?php

$name = $_POST["name"] ?? "";
```

`??` возвращает пустую строку, если ключа нет.

## `$_GET`

```php
<?php

$page = $_GET["page"] ?? "home";
```

Данные из `$_GET` видны в URL. Не передавайте в них пароли.

## Экранирование

```php
<?php

$name = $_POST["name"] ?? "";
$safeName = htmlspecialchars($name, ENT_QUOTES, "UTF-8");

echo "Привет, " . $safeName;
```

## Проверка

```php
<?php

$errors = [];

if (trim($name) === "") {
    $errors[] = "Имя обязательно";
}

if (mb_strlen($name) > 100) {
    $errors[] = "Имя слишком длинное";
}
```

## Частые ошибки

- **Выводить `$_POST` без экранирования.** Это риск XSS.
- **Использовать `$_REQUEST`.** Смешивает источники данных.
- **Доверять данным из URL.** Их легко подменить.
- **Не проверять обязательные поля.** Пользователь может отправить пустую форму.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где данные формы из `method=\"post\"`?",
  "options": [
    {
      "text": "В `$_POST`",
      "correct": true,
      "explanation": "POST-данные приходят в этот суперглобал."
    },
    {
      "text": "В `$_GET`",
      "correct": false,
      "explanation": "Там данные из строки запроса."
    },
    {
      "text": "В `$_FILES`",
      "correct": false,
      "explanation": "Там загруженные файлы."
    }
  ],
  "explanation": "Метод формы определяет суперглобал."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно делать с данными формы?",
  "options": [
    {
      "text": "Проверять обязательные поля",
      "correct": true
    },
    {
      "text": "Экранировать вывод",
      "correct": true
    },
    {
      "text": "Ограничивать длину",
      "correct": true
    },
    {
      "text": "Вставлять в SQL без подготовки",
      "correct": false,
      "explanation": "Это риск SQL-инъекции."
    }
  ],
  "explanation": "Ввод нужно проверять и экранировать."
}
```

## Куда дальше

- [Ошибки и отладка](theme.html?path=content/php/osnovy-php/oshibki-i-otladka.md)
- [Основы PHP](theme.html?path=content/php/osnovy-php/osnovy-php.md)
- [HTTP, формы и сессии](theme.html?path=content/php/http-formy-sessii/http-zapros-i-otvet.md)
