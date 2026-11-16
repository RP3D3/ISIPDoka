---
title: Первый скрипт и синтаксис
description: Как запустить PHP, открыть и закрыть тег, вывести текст и не сломать файл.
keywords: PHP, первый скрипт, синтаксис, echo, php -S, CLI

---

# Первый скрипт и синтаксис

PHP-файл начинается с `<?php`. Всё, что внутри, выполняется на сервере.

## Минимальный скрипт

```php
<?php

declare(strict_types=1);

echo "Привет, мир!";
```

## Запуск

Через CLI:

```bash
php script.php
```

Через встроенный сервер:

```bash
php -S localhost:8000
```

Затем откройте `http://localhost:8000/script.php`.

## Теги

```php
<?php
echo "Код PHP";
?>

<p>HTML после PHP</p>
```

Закрывающий тег `?>` в файле только с PHP лучше не ставить: после него
легко случайно добавить пробел и сломать ответ.

## Комментарии

```php
<?php

// Однострочный комментарий
# Тоже однострочный
/* Многострочный
   комментарий */
```

## Частые ошибки

- **Забыть `<?php`.** Тогда код выведется как текст.
- **Сохранить файл как `.html`.** Сервер не выполнит PHP.
- **Забыть точку с запятой.** PHP сообщит об ошибке.
- **Ставить `?>` и добавлять пробелы после него.** Это ломает заголовки.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "С чего начинается PHP-код в файле?",
  "options": [
    {
      "text": "С тега `<?php`",
      "correct": true,
      "explanation": "Так сервер понимает, что дальше PHP."
    },
    {
      "text": "С тега `<html>`",
      "correct": false,
      "explanation": "Это HTML, а не PHP."
    },
    {
      "text": "Со слова `echo`",
      "correct": false,
      "explanation": "`echo` — команда внутри PHP."
    }
  ],
  "explanation": "PHP-блок открывается тегом `<?php`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про запуск PHP?",
  "options": [
    {
      "text": "Можно запустить через CLI",
      "correct": true
    },
    {
      "text": "Можно использовать встроенный сервер",
      "correct": true
    },
    {
      "text": "Файл должен иметь расширение `.php`",
      "correct": true
    },
    {
      "text": "PHP выполняется прямо в браузере",
      "correct": false,
      "explanation": "Браузер получает только результат."
    }
  ],
  "explanation": "PHP запускается на сервере или в CLI."
}
```

## Куда дальше

- [Переменные и типы](theme.html?path=content/php/osnovy-php/peremennye-i-tipy.md)
- [Операторы и ветвления](theme.html?path=content/php/osnovy-php/operatory-i-vetvleniya.md)
- [Практика: первый скрипт](theme.html?path=content/php/osnovy-php/praktika-pervyy-skript.md)
