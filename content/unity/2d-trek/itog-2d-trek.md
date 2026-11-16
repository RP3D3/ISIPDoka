---
title: 2D-трек
description: Итог 2D: спрайты, Sorting, Rigidbody2D, анимация, Tilemap, камера и UI.
keywords: Unity 2D итог, спрайты, Sorting Layer, Rigidbody2D, Tilemap, 2D камера, UI

---

# 2D-трек

Мы собрали базу для 2D-игры: спрайты, сортировка, физика, анимация, Tilemap,
камера и UI.

## Что теперь должно быть понятно

- Спрайт импортируется как **Sprite (2D and UI)**.
- **Pixels Per Unit** задаёт масштаб спрайта.
- **Sorting Layer** и **Order in Layer** управляют порядком отрисовки.
- В 2D используется **Rigidbody2D** и **Collider2D**.
- В Unity 6 скорость — `linearVelocity`, в 2022.3 — `velocity`.
- 2D-анимация меняет спрайты в Animation window.
- **Tilemap** собирает уровень из тайлов.
- Для пиксель-арта полезен **Pixel Perfect**.
- UI масштабируется через **Canvas Scaler**.

## Мини-таблица

| Вопрос | Ответ |
|---|---|
| Как импортировать спрайт? | Texture Type = Sprite (2D and UI) |
| Что задаёт размер спрайта? | Pixels Per Unit |
| Где порядок отрисовки? | Sorting Layer + Order in Layer |
| Какая физика в 2D? | Rigidbody2D, Collider2D |
| Как сделать уровень? | Tilemap + Tile Palette |
| Как сделать камеру 2D? | Orthographic |
| Как масштабировать UI? | Canvas Scaler |

## Чек-лист

- [ ] Я могу импортировать и нарезать спрайт.
- [ ] Я настроил Sorting Layers.
- [ ] Я использую Rigidbody2D и Collider2D.
- [ ] Я помню про `linearVelocity` в Unity 6.
- [ ] Я могу создать 2D-анимацию.
- [ ] Я умею рисовать Tilemap.
- [ ] Я настроил камеру и Canvas.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что задаёт порядок спрайтов внутри слоя?",
  "options": [
    {
      "text": "Order in Layer",
      "correct": true,
      "explanation": "Больше число — ближе к камере."
    },
    {
      "text": "Pixels Per Unit",
      "correct": false,
      "explanation": "PPU задаёт масштаб."
    },
    {
      "text": "Gravity Scale",
      "correct": false,
      "explanation": "Это физика."
    }
  ],
  "explanation": "Order in Layer сортирует спрайты."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про 2D-трек?",
  "options": [
    {
      "text": "Tilemap собирает уровень из тайлов",
      "correct": true
    },
    {
      "text": "Rigidbody2D — физика 2D",
      "correct": true
    },
    {
      "text": "Pixel Perfect помогает пиксель-арту",
      "correct": true
    },
    {
      "text": "В 2D используется 3D `Rigidbody`",
      "correct": false,
      "explanation": "Для 2D нужен `Rigidbody2D`."
    }
  ],
  "explanation": "2D-трек использует спрайты, 2D-физику и Tilemap."
}
```

## Куда дальше

- [Практика: 2D-платформер](theme.html?path=content/unity/2d-trek/praktika-2d-platformer.md)
- [2D-проект и спрайты](theme.html?path=content/unity/2d-trek/2d-proekt-i-sprayty.md)
- [Rigidbody2D и Collider2D](theme.html?path=content/unity/2d-trek/rigidbody2d-i-collider2d.md)
