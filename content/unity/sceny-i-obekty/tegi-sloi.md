---
title: Теги, слои и порядок
description: Как теги и слои помогают находить объекты, настраивать столкновения и управлять порядком отрисовки.
keywords: Unity теги, слои, Tags, Layers, CompareTag, LayerMask, Physics.Raycast, sorting order

---

# Теги, слои и порядок

Теги и слои часто путают, потому что оба являются строками в Inspector. Но
работают они по-разному: теги помогают **идентифицировать** объект, слои —
управляют **взаимодействием** и **отрисовкой**.

## Теги

**Тег** — метка объекта. Например, `Player`, `Enemy`, `Pickup`, `MainCamera`.

```csharp
if (other.CompareTag("Player"))
{
    Debug.Log("Игрок коснулся объекта");
}
```

`CompareTag` быстрее и безопаснее, чем `other.tag == "Player"`: он не создаёт
лишних строк и явно показывает намерение.

Теги задаются в Inspector или через **Add Tag**. Не путайте тег с именем
GameObject: имя можно менять, тег — это отдельная метка.

## Слои

**Слой** (`Layer`) — категория для физики, камеры и raycast. В Unity есть
встроенные слои (`Default`, `TransparentFX`, `Ignore Raycast`, `Water`, `UI`) и
пользовательские.

Слои используются в:

- **Physics Settings** — какие слои сталкиваются друг с другом;
- **Camera Culling Mask** — какие слои видит камера;
- **Raycast** — по каким слоям искать;
- **Light Culling Mask** — какие слои освещает свет.

```csharp
using UnityEngine;

public class GroundCheck : MonoBehaviour
{
    [SerializeField] private LayerMask _groundMask;

    private void Update()
    {
        bool onGround = Physics.Raycast(transform.position, Vector3.down, 1.1f, _groundMask);
        Debug.Log(onGround ? "На земле" : "В воздухе");
    }
}
```

`LayerMask` в Inspector выглядит как выпадающий список слоёв. Это удобнее, чем
хранить число вручную.

## Тег или слой

| Задача | Что использовать |
|---|---|
| Понять, что перед нами игрок | тег `Player` |
| Исключить слой из столкновений | слой `NoCollision` |
| Найти только землю для raycast | `LayerMask` |
| Отличить врага от предмета | тег или компонент |
| Скрыть слой от камеры | `Culling Mask` |

Если нужна сложная логика, лучше проверять компонент:

```csharp
if (other.TryGetComponent(out PlayerHealth player))
{
    player.TakeDamage(10);
}
```

Тег — простая метка, а компонент — типизированная проверка.

## Порядок отрисовки

В 3D порядок обычно определяется глубиной. В 2D и UI важен **Sorting Layer** и
**Order in Layer**:

- `Sorting Layer` — группа слоёв отрисовки;
- `Order in Layer` — число внутри группы, больше — ближе к камере.

Для UI порядок задаётся иерархией Canvas и компонентом `Canvas`. Если спрайт
пропал, проверьте слой сортировки и `Z`-позицию.

## Частые ошибки

- **Сравнивают теги через `==`.** Используйте `CompareTag`.
- **Делают слой для каждой мелочи.** Слоёв ограниченное количество, а
  пользовательских — ещё меньше.
- **Забывают про `LayerMask`.** Raycast по умолчанию может попасть в сам объект
  игрока.
- **Меняют тег в рантайме.** Это возможно, но усложняет поиск и отладку.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем слой отличается от тега?",
  "options": [
    {
      "text": "Слой управляет физикой и отрисовкой, тег — метка объекта",
      "correct": true,
      "explanation": "Слои используются в LayerMask, камерах и физике."
    },
    {
      "text": "Слой — это имя объекта",
      "correct": false,
      "explanation": "Имя, тег и слой — разные поля."
    },
    {
      "text": "Тег используется только в 2D",
      "correct": false,
      "explanation": "Теги работают и в 2D, и в 3D."
    }
  ],
  "explanation": "Тег — метка, слой — категория для физики и отрисовки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Где используются слои?",
  "options": [
    {
      "text": "В `LayerMask` для raycast",
      "correct": true
    },
    {
      "text": "В настройках столкновений физики",
      "correct": true
    },
    {
      "text": "В `Culling Mask` камеры",
      "correct": true
    },
    {
      "text": "В имени GameObject",
      "correct": false,
      "explanation": "Имя объекта не связано со слоем."
    }
  ],
  "explanation": "Слои — категории для физики, камер, света и raycast."
}
```

## Куда дальше

- [Префабы](theme.html?path=content/unity/sceny-i-obekty/prefaby.md)
- [Сцены и объекты: итог](theme.html?path=content/unity/sceny-i-obekty/itog-sceny-i-obekty.md)
- [Практика: сцена](theme.html?path=content/unity/sceny-i-obekty/praktika-scena.md)
