---
title: Sprite Renderer и Sorting
description: Отрисовка спрайтов, Sorting Layer, Order in Layer и управление спрайтом из кода.
keywords: Unity Sprite Renderer, Sorting Layer, Order in Layer, flipX, sprite, 2D отрисовка

---

# Sprite Renderer и Sorting

`SpriteRenderer` рисует спрайт. В 2D порядок отрисовки задаётся не глубиной, а
**Sorting Layer** и **Order in Layer**.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/2d-trek/2d-sorting.svg"
    alt="Схема Sorting Layers: Background, Ground, Player, Foreground"
    width="900"
  >
  <figcaption>
    Sorting Layer задаёт группу, Order in Layer — порядок внутри группы.
  </figcaption>
</figure>

## Sprite Renderer

Компонент хранит:

- **Sprite** — какой спрайт рисовать;
- **Color** — цвет и прозрачность;
- **Flip X/Y** — отражение;
- **Sorting Layer** — группа;
- **Order in Layer** — число внутри группы;
- **Material** — материал.

## Sorting Layer

Создайте слои в **Edit → Project Settings → Tags and Layers → Sorting Layers**:

```text
Background
Ground
Player
Foreground
```

Чем выше слой в списке, тем ближе он к камере. Внутри слоя работает
`Order in Layer`: больше число — ближе.

## Пример

```csharp
using UnityEngine;

public class SpriteOrder : MonoBehaviour
{
    [SerializeField] private SpriteRenderer _renderer;

    public void SetFront()
    {
        _renderer.sortingLayerName = "Foreground";
        _renderer.sortingOrder = 10;
    }

    public void SetBack()
    {
        _renderer.sortingLayerName = "Ground";
        _renderer.sortingOrder = 0;
    }
}
```

## Отражение

```csharp
_renderer.flipX = moveDirection < 0f;
```

`flipX` переворачивает спрайт по горизонтали. Для анимации лучше менять
`transform.localScale.x`, если нужно отразить всё вместе с коллайдером.

## Частые ошибки

- **Все спрайты в Default.** Порядок неуправляем.
- **Меняют `Z`, а не Sorting Layer.** В 2D это может сработать, но не
  предсказуемо.
- **FlipX не влияет на коллайдер.** Коллайдер остаётся прежним.
- **Материал несовместим с URP.** Спрайт может стать розовым.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что задаёт порядок внутри Sorting Layer?",
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
      "text": "Pivot",
      "correct": false,
      "explanation": "Pivot — точка привязки."
    }
  ],
  "explanation": "Order in Layer сортирует спрайты внутри слоя."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про SpriteRenderer?",
  "options": [
    {
      "text": "Рисует спрайт",
      "correct": true
    },
    {
      "text": "Имеет Sorting Layer и Order in Layer",
      "correct": true
    },
    {
      "text": "Умеет отражать спрайт через Flip X/Y",
      "correct": true
    },
    {
      "text": "Заменяет Rigidbody2D",
      "correct": false,
      "explanation": "Физика — отдельный компонент."
    }
  ],
  "explanation": "SpriteRenderer отвечает за отрисовку и сортировку спрайта."
}
```

## Куда дальше

- [Rigidbody2D и Collider2D](theme.html?path=content/unity/2d-trek/rigidbody2d-i-collider2d.md)
- [2D-анимация](theme.html?path=content/unity/2d-trek/2d-animaciya.md)
- [Практика: 2D-платформер](theme.html?path=content/unity/2d-trek/praktika-2d-platformer.md)
