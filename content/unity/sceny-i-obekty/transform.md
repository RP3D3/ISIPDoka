---
title: Transform
description: Позиция, поворот и масштаб объекта: как работает Transform и чем localPosition отличается от position.
keywords: Unity Transform, position, localPosition, rotation, localScale, Translate, Rotate, Time.deltaTime

---

# Transform

`Transform` — обязательный компонент каждого GameObject. Он хранит положение,
поворот и масштаб объекта и используется всеми системами Unity: рендером,
физикой, камерой и вашими скриптами.

## Три свойства

У `Transform` есть три основные группы:

| Свойство | Что задаёт |
|---|---|
| `position` | положение в мировых координатах |
| `rotation` | поворот в мировых координатах |
| `localScale` | масштаб относительно родителя |

Для работы с родителем есть локальные версии: `localPosition`, `localRotation`,
`localScale`. Если у объекта нет родителя, локальные и мировые значения совпадают.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/sceny-i-obekty/transform-gizmo.png"
    alt="Гизмо Transform в Unity с осями перемещения"
    width="600"
  >
  <figcaption>
    Гизмо Transform показывает оси и позволяет двигать объект в Scene.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/class-Transform.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Transform
    </a>
  </figcaption>
</figure>

## Как читать координаты

В Unity ось `X` — вправо, `Y` — вверх, `Z` — вперёд. Для 2D обычно работают
только `X` и `Y`.

```csharp
using UnityEngine;

public class TransformExample : MonoBehaviour
{
    private void Start()
    {
        transform.position = new Vector3(0f, 2f, 0f);
        transform.localScale = Vector3.one * 1.5f;
        transform.rotation = Quaternion.Euler(0f, 45f, 0f);
    }
}
```

`Quaternion.Euler` задаёт поворот через привычные углы в градусах. Внутри Unity
хранит поворот кватернионом, чтобы вращения не давали искажений.

## Движение и вращение

Для плавного движения умножайте скорость на `Time.deltaTime`:

```csharp
private void Update()
{
    transform.Translate(Vector3.forward * 3f * Time.deltaTime);
    transform.Rotate(0f, 90f * Time.deltaTime, 0f);
}
```

`Time.deltaTime` — время между кадрами. Без него скорость зависела бы от FPS:
на быстром компьютере объект летел бы быстрее.

## position или localPosition

`position` — где объект находится в мире. `localPosition` — где он находится
относительно родителя.

Если родитель стоит в точке `(10, 0, 0)`, а ребёнок имеет `localPosition =
(0, 0, 0)`, то мировая позиция ребёнка — `(10, 0, 0)`. Поэтому для дочерних
объектов чаще используют локальные координаты.

## Частые ошибки

- **Меняют `position` каждый кадр без `Time.deltaTime`.** Скорость зависит от
  FPS.
- **Путают `localScale` и размер коллайдера.** Масштаб Transform влияет на
  физику, но не заменяет настройки коллайдера.
- **Вращают через `rotation.x`.** У `Quaternion` нет удобных `x/y/z` для
  градусов; используйте `Quaternion.Euler` или `transform.Rotate`.
- **Меняют Transform у объекта с `Rigidbody` в `Update`.** Для физических
  объектов используйте `Rigidbody` и `FixedUpdate`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем `localPosition` отличается от `position`?",
  "options": [
    {
      "text": "`localPosition` задаётся относительно родителя",
      "correct": true,
      "explanation": "`position` — мировые координаты, `localPosition` — локальные."
    },
    {
      "text": "`localPosition` работает только в 2D",
      "correct": false,
      "explanation": "Оба свойства работают и в 2D, и в 3D."
    },
    {
      "text": "Это одно и то же",
      "correct": false,
      "explanation": "Разница появляется, когда у объекта есть родитель."
    }
  ],
  "explanation": "Локальные координаты считаются от родителя, мировые — от начала сцены."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Transform?",
  "options": [
    {
      "text": "Он есть у каждого GameObject",
      "correct": true
    },
    {
      "text": "Хранит позицию, поворот и масштаб",
      "correct": true
    },
    {
      "text": "Для плавного движения учитывают `Time.deltaTime`",
      "correct": true
    },
    {
      "text": "Transform можно удалить с GameObject",
      "correct": false,
      "explanation": "Transform обязателен."
    }
  ],
  "explanation": "Transform — обязательный компонент, который хранит преобразования объекта."
}
```

## Куда дальше

- [Локальные и мировые координаты](theme.html?path=content/unity/sceny-i-obekty/local-world-coordinates.md)
- [Иерархия и родители](theme.html?path=content/unity/sceny-i-obekty/ierarhiya-i-roditeli.md)
- [GameObjects и компоненты](theme.html?path=content/unity/sceny-i-obekty/gameobject-i-component.md)
