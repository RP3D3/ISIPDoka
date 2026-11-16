---
title: Иерархия и родители
description: Как работает Hierarchy, зачем нужны родительские связи и что происходит с Transform ребёнка при движении родителя.
keywords: Unity Hierarchy, родитель, дочерний объект, SetParent, transform.parent, иерархия, worldPositionStays

---

# Иерархия и родители

**Hierarchy** — не просто список объектов. Это дерево: у каждого объекта может
быть родитель и сколько угодно детей. Родительские связи влияют на Transform,
жизненный цикл и организацию сцены.

## Как читать Hierarchy

В окне Hierarchy объекты вложены друг в друга:

```text
Player
├── Camera
├── Weapon
│   └── Muzzle
└── UI
```

- `Player` — родитель для `Camera`, `Weapon` и `UI`.
- `Weapon` — родитель для `Muzzle`.
- `Muzzle` — дочерний объект оружия.

Если переместить `Player`, все дети переместятся вместе с ним. Если повернуть
`Player`, дети повернутся вокруг него.

<figure class="md-figure md-figure--center md-figure--small">
  <img
    src="content/unity/_assets/sceny-i-obekty/parenting-in-hierarchy.png"
    alt="Родительские и дочерние объекты в окне Hierarchy Unity"
    width="360"
  >
  <figcaption>
    В Hierarchy дочерние объекты вложены в родительские.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/Hierarchy.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Hierarchy
    </a>
  </figcaption>
</figure>

## Что наследуется

Дочерний объект наследует от родителя:

- позицию;
- поворот;
- масштаб.

Локальные координаты ребёнка остаются прежними, но мировые меняются. Именно
поэтому оружие в руке персонажа не нужно двигать отдельно: оно движется вместе
с рукой.

<figure class="md-figure md-figure--center md-figure--small">
  <img
    src="content/unity/_assets/sceny-i-obekty/parenting-example.png"
    alt="Пример родительского объекта и дочерних объектов в Unity"
    width="300"
  >
  <figcaption>
    Родитель задаёт систему координат для детей.
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

## Родитель в редакторе

1. Выберите дочерний объект в Hierarchy.
2. Перетащите его на родительский объект.
3. Отпустите — объект станет дочерним.

Чтобы убрать родителя, перетащите объект в пустое место Hierarchy или выберите
**GameObject → Break Prefab Instance**, если речь о префабе.

## Родитель в коде

```csharp
using UnityEngine;

public class ParentExample : MonoBehaviour
{
    public Transform weapon;
    public Transform hand;

    private void Start()
    {
        weapon.SetParent(hand);
        weapon.localPosition = Vector3.zero;
        weapon.localRotation = Quaternion.identity;
    }
}
```

У `SetParent` есть второй параметр `worldPositionStays`:

```csharp
weapon.SetParent(hand, true);  // сохранить мировую позицию
weapon.SetParent(hand, false); // использовать локальную позицию
```

По умолчанию `true`: объект визуально останется на месте, но его локальные
координаты пересчитаются. Если нужно, чтобы оружие «прилипло» к руке, чаще
используют `false` и затем задают `localPosition`.

## Когда родитель полезен

- оружие, шляпа и другие части персонажа;
- камера от третьего лица;
- UI-элементы внутри Canvas;
- движущаяся платформа с объектами на ней;
- группировка объектов в сцене.

## Частые ошибки

- **Делают родителем пустой объект и забывают про масштаб.** Масштаб родителя
  наследуется.
- **Меняют `position` ребёнка, хотя нужен `localPosition`.** В коде это часто
  приводит к неожиданным скачкам.
- **Удаляют родителя.** Вместе с ним удалятся все дети.
- **Путают иерархию сцены и иерархию префаба.** Это разные вещи, хотя выглядят
  похоже.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что произойдёт с дочерним объектом, если переместить родителя?",
  "options": [
    {
      "text": "Он переместится вместе с родителем",
      "correct": true,
      "explanation": "Дочерний Transform наследует преобразования родителя."
    },
    {
      "text": "Он останется на месте",
      "correct": false,
      "explanation": "Это было бы верно только без родительской связи."
    },
    {
      "text": "Он удалится",
      "correct": false,
      "explanation": "Перемещение родителя не удаляет детей."
    }
  ],
  "explanation": "Иерархия задаёт наследование позиции, поворота и масштаба."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про родительские связи?",
  "options": [
    {
      "text": "`SetParent` меняет родителя в коде",
      "correct": true
    },
    {
      "text": "Дочерний объект наследует масштаб родителя",
      "correct": true
    },
    {
      "text": "У объекта может быть несколько родителей",
      "correct": false,
      "explanation": "В Unity у Transform один родитель."
    },
    {
      "text": "При удалении родителя удаляются и дети",
      "correct": true
    }
  ],
  "explanation": "Иерархия — дерево: один родитель, много детей, наследование Transform."
}
```

## Куда дальше

- [Префабы](theme.html?path=content/unity/sceny-i-obekty/prefaby.md)
- [Локальные и мировые координаты](theme.html?path=content/unity/sceny-i-obekty/local-world-coordinates.md)
- [Практика: сцена](theme.html?path=content/unity/sceny-i-obekty/praktika-scena.md)
