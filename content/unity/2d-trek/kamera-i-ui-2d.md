---
title: Камера и UI в 2D
description: Ортографическая камера, размер, Pixel Perfect, Canvas и масштабирование UI.
keywords: Unity 2D камера, orthographic, orthographic size, Pixel Perfect, Canvas, Canvas Scaler, 2D UI

---

# Камера и UI в 2D

В 2D камера обычно **ортографическая**: объекты не уменьшаются с расстоянием.
Размер видимой области задаётся `Orthographic Size`.

## Камера

В Inspector камеры:

- **Projection = Orthographic**;
- **Size** — половина высоты видимой области в юнитах;
- **Background** — цвет фона;
- **Culling Mask** — какие слои видит камера.

Если `Size = 5`, по высоте видно 10 юнитов.

## Pixel Perfect

Для пиксель-арта используйте пакет **2D Pixel Perfect** и компонент
`PixelPerfectCamera`:

- **Assets Pixels Per Unit** — PPU спрайтов;
- **Reference Resolution** — целевое разрешение;
- **Upscale Render Texture** — чёткие пиксели.

Без него спрайты могут «плыть» между пикселями.

## Canvas

Для UI создайте **GameObject → UI → Canvas**. Режимы:

- **Screen Space Overlay** — UI поверх всего, не зависит от камеры;
- **Screen Space Camera** — UI рендерится камерой, может учитывать перспективу;
- **World Space** — UI как объект в мире.

Для HUD обычно Overlay.

## Canvas Scaler

`Canvas Scaler` задаёт масштабирование:

- **Constant Pixel Size** — фиксированные пиксели;
- **Scale With Screen Size** — масштаб от разрешения;
- **Constant Physical Size** — физический размер.

Для игр чаще `Scale With Screen Size` и reference resolution 1920×1080.

## Сортировка UI

UI внутри Canvas сортируется по порядку в Hierarchy. Для нескольких Canvas
используйте **Sorting Layer** и **Order in Layer**.

## Частые ошибки

- **Камера перспективная.** Спрайты выглядят странно.
- **Size слишком большой.** Уровень кажется крошечным.
- **UI не масштабируется.** Canvas Scaler не настроен.
- **Pixel Perfect и PPU не совпадают.** Пиксели размываются.
- **Canvas перекрывает игру.** Проверьте Sorting Layer.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что задаёт `Orthographic Size`?",
  "options": [
    {
      "text": "Половину высоты видимой области в юнитах",
      "correct": true,
      "explanation": "При Size 5 видно 10 юнитов по высоте."
    },
    {
      "text": "Количество слоёв",
      "correct": false,
      "explanation": "Слои задаются в Culling Mask."
    },
    {
      "text": "Громкость звука",
      "correct": false,
      "explanation": "Звук не связан с камерой."
    }
  ],
  "explanation": "Orthographic Size — размер видимой области."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про 2D-камеру и UI?",
  "options": [
    {
      "text": "Для 2D обычно используют Orthographic",
      "correct": true
    },
    {
      "text": "Canvas Scaler масштабирует UI",
      "correct": true
    },
    {
      "text": "Pixel Perfect помогает пиксель-арту",
      "correct": true
    },
    {
      "text": "UI всегда должен быть World Space",
      "correct": false,
      "explanation": "HUD обычно Screen Space Overlay."
    }
  ],
  "explanation": "Камера, Canvas Scaler и Pixel Perfect — основа 2D-вида."
}
```

## Куда дальше

- [2D-трек: итог](theme.html?path=content/unity/2d-trek/itog-2d-trek.md)
- [Практика: 2D-платформер](theme.html?path=content/unity/2d-trek/praktika-2d-platformer.md)
- [Tilemap](theme.html?path=content/unity/2d-trek/tilemap.md)
