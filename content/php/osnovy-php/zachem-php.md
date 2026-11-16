---
title: Зачем нужен PHP
description: Где PHP используется, как он работает на сервере и почему это язык бэкенда.
keywords: PHP, бэкенд, сервер, запрос, сайт, API

---

# Зачем нужен PHP

PHP — серверный язык. Он выполняется на сервере и отдаёт браузеру
готовый HTML, JSON или другой ответ.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/php/_assets/osnovy-php/php-request.svg"
    alt="Путь запроса: браузер, веб-сервер, PHP-скрипт и ответ"
    width="900"
  >
  <figcaption>
    Браузер не видит PHP-код. Он получает только результат работы.
  </figcaption>
</figure>

## Где PHP используют

- сайты и интернет-магазины;
- админки и личные кабинеты;
- REST API для фронтенда;
- CMS: WordPress, Bitrix, Drupal;
- backend на Laravel и Symfony.

## Как это работает

1. Браузер отправляет запрос.
2. Веб-сервер передаёт его PHP.
3. PHP выполняет код.
4. Клиент получает HTML или JSON.

## Что важно

- PHP-код хранится на сервере;
- пароли и ключи не попадают в браузер;
- один запрос — один цикл обработки;
- ошибки нужно логировать, а не показывать пользователю.

## Частые ошибки

- **Думать, что PHP выполняется в браузере.** Это серверный язык.
- **Смешивать HTML и сложную логику.** Код становится трудно читать.
- **Игнорировать версию PHP.** Поведение и функции отличаются.
- **Забывать про безопасность.** Ввод пользователя нельзя доверять.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где выполняется PHP-код?",
  "options": [
    {
      "text": "На сервере",
      "correct": true,
      "explanation": "Браузер получает только результат."
    },
    {
      "text": "В браузере",
      "correct": false,
      "explanation": "Браузер не выполняет PHP."
    },
    {
      "text": "В базе данных",
      "correct": false,
      "explanation": "База данных хранит данные, а не код."
    }
  ],
  "explanation": "PHP — серверный язык."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что можно сделать на PHP?",
  "options": [
    {
      "text": "Отдавать HTML-страницы",
      "correct": true
    },
    {
      "text": "Сделать REST API",
      "correct": true
    },
    {
      "text": "Обрабатывать формы",
      "correct": true
    },
    {
      "text": "Стилизовать кнопки в браузере",
      "correct": false,
      "explanation": "За стили отвечает CSS."
    }
  ],
  "explanation": "PHP работает с запросами, данными и ответами."
}
```

## Куда дальше

- [Первый скрипт и синтаксис](theme.html?path=content/php/osnovy-php/pervyy-skript-i-sintaksis.md)
- [Переменные и типы](theme.html?path=content/php/osnovy-php/peremennye-i-tipy.md)
- [Ошибки и отладка](theme.html?path=content/php/osnovy-php/oshibki-i-otladka.md)
