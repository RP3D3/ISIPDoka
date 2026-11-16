---
title: Headers и редиректы
description: Как управлять заголовками ответа, кэшем и перенаправлениями в PHP.
keywords: PHP, headers, header, Location, редирект, Content-Type, кэш

---

# Headers и редиректы

Заголовки сообщают клиенту, что пришло и что с этим делать.

## `header`

```php
<?php

header("Content-Type: application/json; charset=utf-8");
```

## Редирект

```php
<?php

header("Location: /login.php", true, 302);
exit;
```

`exit` обязателен: код после редиректа не должен выполняться.

## Статус-код

```php
<?php

http_response_code(404);
echo "Страница не найдена";
```

## JSON

```php
<?php

header("Content-Type: application/json; charset=utf-8");
echo json_encode(["ok" => true]);
```

## Кэш

```php
<?php

header("Cache-Control: no-store");
```

Для приватных данных кэш лучше отключать.

## Частые ошибки

- **Выводить текст до `header`.** Заголовки уже отправлены.
- **Забывать `exit` после `Location`.**
- **Всегда отдавать `200`.** Ошибки должны иметь свой статус.
- **Подставлять в заголовок пользовательский ввод.** Это риск инъекции.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `header(\"Location: /login.php\")`?",
  "options": [
    {
      "text": "Отправляет редирект",
      "correct": true,
      "explanation": "Клиент перейдёт на новый адрес."
    },
    {
      "text": "Создаёт базу данных",
      "correct": false,
      "explanation": "Это не связано."
    },
    {
      "text": "Удаляет cookie",
      "correct": false,
      "explanation": "Для этого нужен отдельный вызов."
    }
  ],
  "explanation": "`Location` задаёт адрес перенаправления."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про заголовки?",
  "options": [
    {
      "text": "`Content-Type` задаёт тип ответа",
      "correct": true
    },
    {
      "text": "После `Location` нужен `exit`",
      "correct": true
    },
    {
      "text": "`http_response_code` меняет статус",
      "correct": true
    },
    {
      "text": "Заголовки можно отправлять после вывода текста",
      "correct": false,
      "explanation": "Обычно это уже невозможно."
    }
  ],
  "explanation": "Заголовки управляют ответом."
}
```

## Куда дальше

- [CSRF и XSS в формах](theme.html?path=content/php/http-formy-sessii/csrf-i-xss-v-formah.md)
- [HTTP, формы и сессии](theme.html?path=content/php/http-formy-sessii/http-formy-sessii.md)
- [Практика: обработка формы](theme.html?path=content/php/http-formy-sessii/praktika-forma-obrabotka.md)
