---
title: Ошибки и отладка
description: Уровни ошибок, исключения, логи и безопасный вывод ошибок в PHP.
keywords: PHP, ошибки, исключения, try catch, логи, отладка, display_errors

---

# Ошибки и отладка

Ошибки — нормальная часть разработки. Важно видеть их вовремя и не
показывать пользователю лишнее.

## Уровни ошибок

- notice;
- warning;
- fatal error;
- exception.

## Вывод ошибок

На локальной машине:

```php
<?php

ini_set("display_errors", "1");
error_reporting(E_ALL);
```

На сервере ошибки показывать нельзя. Их пишут в лог:

```php
<?php

ini_set("display_errors", "0");
ini_set("log_errors", "1");
```

## Исключения

```php
<?php

try {
    $result = 10 / 0;
} catch (DivisionByZeroError $e) {
    error_log($e->getMessage());
    echo "Не удалось выполнить операцию";
}
```

## Отладка

```php
<?php

var_dump($data);
print_r($data);
error_log(print_r($data, true));
```

`var_dump` показывает тип и значение. `print_r` удобен для массивов.

## Частые ошибки

- **Показывать ошибки в продакшене.** Это раскрывает пути и данные.
- **Подавлять все ошибки через `@`.** Проблема не исчезает.
- **Игнорировать warning.** Он часто указывает на баг.
- **Не писать в лог.** Без логов сложно разобраться.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать с ошибками на сервере?",
  "options": [
    {
      "text": "Писать в лог, а пользователю показывать общий ответ",
      "correct": true,
      "explanation": "Так не раскрываются детали."
    },
    {
      "text": "Показывать полный стек",
      "correct": false,
      "explanation": "Это небезопасно."
    },
    {
      "text": "Отключать PHP",
      "correct": false,
      "explanation": "Это не решение."
    }
  ],
  "explanation": "Логи — для команды, ответ — для клиента."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает отладке?",
  "options": [
    {
      "text": "`var_dump`",
      "correct": true
    },
    {
      "text": "`error_log`",
      "correct": true
    },
    {
      "text": "`try/catch`",
      "correct": true
    },
    {
      "text": "Показ паролей в браузере",
      "correct": false,
      "explanation": "Это утечка данных."
    }
  ],
  "explanation": "Отладка должна быть информативной и безопасной."
}
```

## Куда дальше

- [Основы PHP](theme.html?path=content/php/osnovy-php/osnovy-php.md)
- [Практика: первый скрипт](theme.html?path=content/php/osnovy-php/praktika-pervyy-skript.md)
- [Функции, массивы и ООП](theme.html?path=content/php/funkcii-massivy-oop/funkcii-i-zamykaniya.md)
