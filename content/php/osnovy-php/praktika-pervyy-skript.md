---
title: Практика: первый скрипт
description: Упражнение: создать форму, принять данные и безопасно вывести результат.
keywords: практика, PHP, первый скрипт, форма, POST, htmlspecialchars

---

# Практика: первый скрипт

Сделайте небольшой скрипт, который принимает имя из формы и показывает
приветствие.

## 1. Форма

```html
<form method="post" action="hello.php">
  <input type="text" name="name" placeholder="Ваше имя">
  <button type="submit">Отправить</button>
</form>
```

## 2. Обработка

```php
<?php

declare(strict_types=1);

$name = trim($_POST["name"] ?? "");

if ($name === "") {
    echo "Введите имя";
    exit;
}

$safeName = htmlspecialchars($name, ENT_QUOTES, "UTF-8");
echo "Привет, " . $safeName;
```

## 3. Проверка

- [ ] Форма отправляется методом POST.
- [ ] Пустое имя обрабатывается.
- [ ] Вывод экранирован.
- [ ] Нет ошибок PHP.
- [ ] Скрипт запускается через `php -S`.

## 4. Усложнение

Добавьте:

- ограничение длины имени;
- вывод даты;
- простой массив разрешённых имён.

## Частые ошибки

- **Выводить имя без `htmlspecialchars`.**
- **Не проверять пустую строку.**
- **Использовать `$_REQUEST`.**
- **Забыть `action` у формы.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что сделать с именем перед выводом?",
  "options": [
    {
      "text": "Экранировать через `htmlspecialchars`",
      "correct": true,
      "explanation": "Это защищает от XSS."
    },
    {
      "text": "Удалить все буквы",
      "correct": false,
      "explanation": "Это не нужно."
    },
    {
      "text": "Вставить в SQL-запрос",
      "correct": false,
      "explanation": "Это риск инъекции."
    }
  ],
  "explanation": "Вывод из формы нужно экранировать."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в практику?",
  "options": [
    {
      "text": "Форма с POST",
      "correct": true
    },
    {
      "text": "Проверка пустого значения",
      "correct": true
    },
    {
      "text": "Безопасный вывод",
      "correct": true
    },
    {
      "text": "Показ пароля в URL",
      "correct": false,
      "explanation": "Это небезопасно."
    }
  ],
  "explanation": "Практика тренирует приём и вывод данных."
}
```

## Куда дальше

- [Основы PHP](theme.html?path=content/php/osnovy-php/osnovy-php.md)
- [Функции, массивы и ООП](theme.html?path=content/php/funkcii-massivy-oop/massivy-i-ih-funkcii.md)
- [HTTP, формы и сессии](theme.html?path=content/php/http-formy-sessii/get-post-i-validaciya.md)
