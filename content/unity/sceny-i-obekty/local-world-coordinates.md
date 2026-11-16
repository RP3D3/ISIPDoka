---
title: Локальные и мировые координаты
description: Чем world space отличается от local space, как работают TransformPoint и почему дочерние объекты двигаются вместе с родителем.
keywords: Unity local space, world space, localPosition, TransformPoint, InverseTransformPoint, TransformDirection, координаты

---

# Локальные и мировые координаты

Когда объект один, разницы между мировыми и локальными координатами почти нет.
Но как только появляется родитель, начинается путаница: объект вроде бы стоит
в `(0, 0, 0)`, а на сцене оказывается совсем в другом месте.

## Мировые координаты

**World space** — общая система координат сцены. Начало координат `(0, 0, 0)` —
это точка, от которой отсчитывается всё. `transform.position` работает в world
space.

## Локальные координаты

**Local space** — система координат родителя. `transform.localPosition`
показывает, где объект находится относительно родителя. Если родителя нет,
локальные координаты совпадают с мировыми.

Пример:

```text
Parent: position = (10, 0, 0)
Child:  localPosition = (0, 2, 0)
Child:  position = (10, 2, 0)
```

Ребёнок стоит на 2 единицы выше родителя, но в мире это `(10, 2, 0)`.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/sceny-i-obekty/transform-modes.png"
    alt="Переключатель Local и Global в инструментах Unity"
    width="900"
  >
  <figcaption>
    В Scene можно переключать оси между Local и Global — это меняет только
    отображение гизмо.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/PositioningGameObjects.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Positioning GameObjects
    </a>
  </figcaption>
</figure>

## Пересчёт между пространствами

Unity даёт готовые методы:

```csharp
using UnityEngine;

public class SpaceExample : MonoBehaviour
{
    public Transform target;

    private void Start()
    {
        // Локальная точка -> мировая
        Vector3 worldPoint = transform.TransformPoint(new Vector3(0f, 0f, 1f));

        // Мировая точка -> локальная
        Vector3 localPoint = transform.InverseTransformPoint(worldPoint);

        // Направление из локального в мировое
        Vector3 worldDirection = transform.TransformDirection(Vector3.forward);

        Debug.Log($"{worldPoint} / {localPoint} / {worldDirection}");
    }
}
```

- `TransformPoint` — точка из локальных координат в мировые.
- `InverseTransformPoint` — обратно.
- `TransformDirection` — направление без учёта позиции.
- `InverseTransformDirection` — обратное направление.

## Где это нужно

- **Дочерние объекты.** Оружие в руке персонажа двигается вместе с рукой,
  потому что оно дочернее.
- **Камера от третьего лица.** Позиция камеры считается относительно персонажа.
- **Спавн объектов.** Точка спавна может быть дочерней у платформы.
- **Локальные оси.** «Вперёд» у персонажа — это его локальная ось `Z`, а не
  мировая.

## Частые ошибки

- **Ставят дочернему объекту `position` вместо `localPosition`.** В редакторе
  это может сработать, но в коде проще и предсказуемее использовать
  `localPosition`.
- **Забывают, что масштаб родителя влияет на ребёнка.** Если родитель увеличен
  в 2 раза, ребёнок тоже станет больше.
- **Путают точку и направление.** Для точки нужен `TransformPoint`, для
  направления — `TransformDirection`.
- **Вращают родителя и удивляются, что дети повернулись.** Это ожидаемое
  поведение иерархии.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Родитель стоит в `(10, 0, 0)`, у ребёнка `localPosition = (0, 2, 0)`. Где ребёнок в мире?",
  "options": [
    {
      "text": "`(10, 2, 0)`",
      "correct": true,
      "explanation": "Мировая позиция складывается из позиции родителя и локальной позиции ребёнка."
    },
    {
      "text": "`(0, 2, 0)`",
      "correct": false,
      "explanation": "Это локальная позиция, а не мировая."
    },
    {
      "text": "`(10, 0, 0)`",
      "correct": false,
      "explanation": "Ребёнок смещён на 2 по `Y`."
    }
  ],
  "explanation": "`position` ребёнка учитывает Transform родителя."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про пространства координат?",
  "options": [
    {
      "text": "`position` — мировые координаты",
      "correct": true
    },
    {
      "text": "`localPosition` — координаты относительно родителя",
      "correct": true
    },
    {
      "text": "`TransformPoint` переводит точку из локальных координат в мировые",
      "correct": true
    },
    {
      "text": "Если у объекта нет родителя, `localPosition` всегда равен нулю",
      "correct": false,
      "explanation": "Без родителя локальные и мировые координаты совпадают, но не обязаны быть нулём."
    }
  ],
  "explanation": "World space — общая сцена, local space — система координат родителя."
}
```

## Куда дальше

- [Transform](theme.html?path=content/unity/sceny-i-obekty/transform.md)
- [Иерархия и родители](theme.html?path=content/unity/sceny-i-obekty/ierarhiya-i-roditeli.md)
- [Практика: сцена](theme.html?path=content/unity/sceny-i-obekty/praktika-scena.md)
