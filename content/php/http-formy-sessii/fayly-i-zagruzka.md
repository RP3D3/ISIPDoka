---
title: Файлы и загрузка
description: Как принимать файлы, проверять размер и тип и хранить их безопасно.
keywords: PHP, загрузка файлов, $_FILES, move_uploaded_file, MIME, безопасность

---

# Файлы и загрузка

Загрузка файла — это обычный POST с `multipart/form-data`. Файл нельзя
доверять ни по имени, ни по расширению.

## Форма

```html
<form method="post" enctype="multipart/form-data">
  <input type="file" name="document">
  <button type="submit">Загрузить</button>
</form>
```

## `$_FILES`

```php
<?php

$file = $_FILES["document"] ?? null;

if ($file === null || $file["error"] !== UPLOAD_ERR_OK) {
    exit("Файл не загружен");
}
```

## Проверка

```php
<?php

$maxSize = 2 * 1024 * 1024;

if ($file["size"] > $maxSize) {
    exit("Файл слишком большой");
}

$allowed = ["application/pdf", "image/jpeg", "image/png"];
$mime = mime_content_type($file["tmp_name"]);

if (!in_array($mime, $allowed, true)) {
    exit("Неподдерживаемый тип");
}
```

## Сохранение

```php
<?php

$name = bin2hex(random_bytes(16)) . ".pdf";
$path = __DIR__ . "/storage/" . $name;

move_uploaded_file($file["tmp_name"], $path);
```

Не используйте исходное имя файла. Храните загрузки вне публичной папки,
если это возможно.

## Частые ошибки

- **Доверять имени файла.** Его можно подделать.
- **Не ограничивать размер.**
- **Хранить файлы в публичной папке.**
- **Разрешать выполнение загруженных скриптов.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что нужно проверить у загруженного файла?",
  "options": [
    {
      "text": "Размер и MIME-тип",
      "correct": true,
      "explanation": "Это базовые проверки."
    },
    {
      "text": "Только имя файла",
      "correct": false,
      "explanation": "Имя можно подделать."
    },
    {
      "text": "Только цвет иконки",
      "correct": false,
      "explanation": "Это не связано."
    }
  ],
  "explanation": "Файл проверяют по размеру и типу."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что безопаснее делать с загрузками?",
  "options": [
    {
      "text": "Генерировать новое имя",
      "correct": true
    },
    {
      "text": "Ограничивать размер",
      "correct": true
    },
    {
      "text": "Хранить вне публичной папки",
      "correct": true
    },
    {
      "text": "Разрешать любые расширения",
      "correct": false,
      "explanation": "Это опасно."
    }
  ],
  "explanation": "Загрузки требуют ограничений и изоляции."
}
```

## Куда дальше

- [Headers и редиректы](theme.html?path=content/php/http-formy-sessii/headers-i-redirekty.md)
- [CSRF и XSS в формах](theme.html?path=content/php/http-formy-sessii/csrf-i-xss-v-formah.md)
- [HTTP, формы и сессии](theme.html?path=content/php/http-formy-sessii/http-formy-sessii.md)
