---
title: Tilemap
description: Grid, Tilemap, Tile Palette и коллайдеры для 2D-уровня.
keywords: Unity Tilemap, Grid, Tile Palette, TilemapCollider2D, CompositeCollider2D, 2D уровень

---

# Tilemap

**Tilemap** — система для сборки 2D-уровней из тайлов. Вместо сотен отдельных
спрайтов вы рисуете сетку, а Unity хранит её эффективно.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/2d-trek/tilemap.svg"
    alt="Схема Tilemap: Grid, Tile Palette, тайлы и TilemapCollider2D"
    width="900"
  >
  <figcaption>
    Tilemap рисует сетку тайлов, а TilemapCollider2D добавляет столкновения.
  </figcaption>
</figure>

## Создание

1. **GameObject → 2D Object → Tilemap → Rectangular**.
2. Появится `Grid` с `Tilemap`.
3. Откройте **Window → 2D → Tile Palette**.
4. Создайте палитру.
5. Перетащите спрайты тайлов в палитру.
6. Рисуйте кистью.

## Компоненты

```text
Grid
└── Tilemap
    ├── TilemapRenderer
    └── TilemapCollider2D
```

- `Grid` задаёт размер ячейки;
- `Tilemap` хранит тайлы;
- `TilemapRenderer` рисует;
- `TilemapCollider2D` добавляет коллизии.

## Коллайдеры

Для уровня:

1. Добавьте `TilemapCollider2D`.
2. Добавьте `CompositeCollider2D`.
3. У `Rigidbody2D` выберите `Static`.
4. В `TilemapCollider2D` включите **Used By Composite**.

Так сотни тайлов объединяются в один коллайдер.

## Слои

Разделяйте тайлмапы:

- `Ground` — пол;
- `Walls` — стены;
- `Decor` — декор без коллайдера;
- `Hazards` — опасные зоны.

Так проще настраивать коллайдеры и сортировку.

## Код

```csharp
using UnityEngine;
using UnityEngine.Tilemaps;

public class TilemapExample : MonoBehaviour
{
    [SerializeField] private Tilemap _tilemap;
    [SerializeField] private TileBase _tile;

    public void SetTile(Vector3Int cell)
    {
        _tilemap.SetTile(cell, _tile);
    }

    public void ClearTile(Vector3Int cell)
    {
        _tilemap.SetTile(cell, null);
    }
}
```

`Vector3Int` — координаты ячейки, а не мировые координаты.

## Частые ошибки

- **Тайлы не рисуются.** Не выбрана палитра или слой.
- **Коллайдер не работает.** Нет `TilemapCollider2D` или `CompositeCollider2D`.
- **Персонаж застревает.** Слишком мелкие ячейки или неправильный коллайдер.
- **Всё в одном Tilemap.** Сложно разделять слои и коллайдеры.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой компонент добавляет коллизии тайлам?",
  "options": [
    {
      "text": "`TilemapCollider2D`",
      "correct": true,
      "explanation": "Он создаёт коллайдеры для тайлов."
    },
    {
      "text": "`TilemapRenderer`",
      "correct": false,
      "explanation": "Он только рисует."
    },
    {
      "text": "`Grid`",
      "correct": false,
      "explanation": "Grid задаёт сетку."
    }
  ],
  "explanation": "TilemapCollider2D отвечает за столкновения тайлов."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Tilemap?",
  "options": [
    {
      "text": "Tile Palette хранит набор тайлов",
      "correct": true
    },
    {
      "text": "CompositeCollider2D объединяет коллайдеры",
      "correct": true
    },
    {
      "text": "Слои Tilemap помогают разделять уровень",
      "correct": true
    },
    {
      "text": "Tilemap заменяет UI",
      "correct": false,
      "explanation": "Tilemap — для уровня, UI — отдельная система."
    }
  ],
  "explanation": "Tilemap — удобный способ собирать 2D-уровни."
}
```

## Куда дальше

- [Камера и UI в 2D](theme.html?path=content/unity/2d-trek/kamera-i-ui-2d.md)
- [2D-трек: итог](theme.html?path=content/unity/2d-trek/itog-2d-trek.md)
- [Практика: 2D-платформер](theme.html?path=content/unity/2d-trek/praktika-2d-platformer.md)
