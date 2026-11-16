---
title: 2D-проект и спрайты
description: Шаблон 2D, импорт спрайтов, Pixels Per Unit, Pivot и настройки текстуры.
keywords: Unity 2D, спрайты, Sprite, Pixels Per Unit, Pivot, импорт текстур, 2D шаблон

---

# 2D-проект и спрайты

2D в Unity — это не отдельный движок, а набор инструментов: спрайты, физика 2D,
Tilemap, ортографическая камера и UI.

## Шаблон проекта

В Unity Hub выберите:

- **2D (URP)** или **Universal 2D** — современный вариант;
- **2D (Built-In)** — простой старый рендер.

Для курса подойдёт 2D URP. Если проект уже 3D, 2D-сцену тоже можно сделать, но
шаблон сразу настраивает камеру и освещение.

## Импорт спрайта

1. Перетащите PNG в `Assets/Sprites`.
2. Выберите файл.
3. В Inspector установите **Texture Type = Sprite (2D and UI)**.
4. Нажмите **Apply**.

Основные настройки:

| Настройка | Значение |
|---|---|
| Sprite Mode | Single, Multiple, Polygon |
| Pixels Per Unit | сколько пикселей в одной единице Unity |
| Pivot | точка привязки спрайта |
| Filter Mode | Point для пиксель-арта, Bilinear для мягких картинок |
| Compression | сжатие текстуры |

## Pixels Per Unit

Если спрайт 64×64 и `Pixels Per Unit = 64`, он будет размером 1×1 юнита.
Если поставить 32, спрайт станет 2×2 юнита.

Для пиксель-арта часто берут PPU, равный размеру тайла, например 16 или 32.

## Pivot

`Pivot` — точка, вокруг которой спрайт вращается и позиционируется. Для
персонажа обычно ставят `Bottom` или `Center`.

## Нарезка спрайтов

Если в одном PNG несколько кадров:

1. `Sprite Mode = Multiple`.
2. Откройте **Sprite Editor**.
3. Нарежьте по сетке или вручную.
4. Нажмите **Apply**.

Получится несколько спрайтов из одного файла.

## Частые ошибки

- **Забыли `Sprite (2D and UI)`.** Картинка не становится спрайтом.
- **Неправильный PPU.** Спрайт огромный или крошечный.
- **Pivot в углу.** Персонаж вращается странно.
- **Point/Bilinear не тот.** Пиксель-арт размывается или выглядит рвано.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что задаёт Pixels Per Unit?",
  "options": [
    {
      "text": "Сколько пикселей текстуры в одной единице Unity",
      "correct": true,
      "explanation": "Это влияет на размер спрайта в сцене."
    },
    {
      "text": "Количество кадров анимации",
      "correct": false,
      "explanation": "Кадры задаются в Sprite Editor."
    },
    {
      "text": "Громкость звука",
      "correct": false,
      "explanation": "Звук не связан со спрайтами."
    }
  ],
  "explanation": "PPU связывает пиксели текстуры с единицами сцены."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про импорт спрайтов?",
  "options": [
    {
      "text": "Texture Type должен быть Sprite (2D and UI)",
      "correct": true
    },
    {
      "text": "Pivot задаёт точку привязки",
      "correct": true
    },
    {
      "text": "Sprite Editor умеет нарезать несколько спрайтов",
      "correct": true
    },
    {
      "text": "Для пиксель-арта всегда нужен Bilinear",
      "correct": false,
      "explanation": "Для пиксель-арта чаще Point."
    }
  ],
  "explanation": "Спрайт настраивается при импорте: тип, PPU, pivot, фильтрация."
}
```

## Куда дальше

- [Sprite Renderer и Sorting](theme.html?path=content/unity/2d-trek/sprite-renderer-i-sorting.md)
- [Rigidbody2D и Collider2D](theme.html?path=content/unity/2d-trek/rigidbody2d-i-collider2d.md)
- [Практика: 2D-платформер](theme.html?path=content/unity/2d-trek/praktika-2d-platformer.md)
