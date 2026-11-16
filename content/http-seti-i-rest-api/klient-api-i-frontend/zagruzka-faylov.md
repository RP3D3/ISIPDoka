---
title: Загрузка файлов
description: FormData, multipart, прогресс, ограничения и отмена.
keywords: загрузка файлов, FormData, multipart, progress, fetch, axios

---

# Загрузка файлов

Файл отправляют как `multipart/form-data`. Не задавайте `Content-Type`
вручную: браузер добавит boundary.

## fetch

```js
const form = new FormData();
form.append("document", file);

await fetch("/api/files", {
  method: "POST",
  body: form,
});
```

## axios

```js
await axios.post("/api/files", form, {
  onUploadProgress: (event) => {
    console.log(event.loaded / event.total);
  },
});
```

## Проверки

- размер;
- MIME-тип;
- имя файла;
- права пользователя;
- антивирус на сервере.

## Частые ошибки

- **Вручную ставить `Content-Type: multipart/form-data`.**
- **Не ограничивать размер.**
- **Доверять имени файла.**
- **Отправлять файл в base64 без нужды.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что использовать для файла?",
  "options": [
    {
      "text": "`FormData`",
      "correct": true,
      "explanation": "Он формирует multipart-тело."
    },
    {
      "text": "JSON-строку",
      "correct": false,
      "explanation": "Это неэффективно для файлов."
    },
    {
      "text": "Query-параметр",
      "correct": false,
      "explanation": "Файл туда не поместится."
    }
  ],
  "explanation": "FormData — стандартный способ."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что важно при загрузке?",
  "options": [
    {
      "text": "Ограничение размера",
      "correct": true
    },
    {
      "text": "Проверка MIME",
      "correct": true
    },
    {
      "text": "Права пользователя",
      "correct": true
    },
    {
      "text": "Доверять имени файла",
      "correct": false,
      "explanation": "Имя можно подделать."
    }
  ],
  "explanation": "Загрузка требует проверок."
}
```

## Куда дальше

- [Клиент API и фронтенд](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/klient-api-i-frontend.md)
- [Практика: подключить фронтенд](theme.html?path=content/http-seti-i-rest-api/klient-api-i-frontend/praktika-podklyuchit-frontend.md)
- [Тестирование и отладка API](theme.html?path=content/http-seti-i-rest-api/testirovanie-i-otladka-api/curl.md)
