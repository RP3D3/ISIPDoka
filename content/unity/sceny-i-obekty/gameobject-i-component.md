---
title: GameObjects и компоненты
description: Как GameObject собирается из компонентов, зачем нужен Transform и как не превратить объект в свалку.
keywords: Unity GameObject, компоненты Unity, Transform, AddComponent, TryGetComponent, композиция

---

# GameObjects и компоненты

В Unity почти всё строится на двух сущностях: **GameObject** и **компонент**.
GameObject — это контейнер с именем и положением на сцене. Компоненты — это
части, которые дают ему вид, физику, звук и поведение.

## GameObject — контейнер

GameObject сам по себе не рисуется и не двигается. У него есть:

- имя;
- тег;
- слой;
- набор компонентов;
- обязательный `Transform`.

Даже пустой GameObject с одним `Transform` полезен: он может быть точкой
спавна, контейнером для группы объектов или якорем для UI.

## Компоненты — возможности

Компоненты добавляют объекту конкретные возможности:

| Компонент | Зачем нужен |
|---|---|
| `Transform` | позиция, поворот, масштаб |
| `MeshFilter` | какая модель рисуется |
| `MeshRenderer` | как модель рисуется |
| `Collider` | форма для столкновений |
| `Rigidbody` | физика и инерция |
| `AudioSource` | звук |
| `Animator` | анимации |
| ваш скрипт | игровая логика |

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/sceny-i-obekty/gameobjects-examples.jpg"
    alt="Примеры GameObject в Unity: камера, свет, персонаж и куб"
    width="750"
  >
  <figcaption>
    Разные GameObject отличаются набором компонентов, а не отдельными классами
    объектов.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/GameObjects.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — GameObjects
    </a>
  </figcaption>
</figure>

## Композиция вместо наследования

В Unity не принято делать огромную иерархию классов вроде
`Character → Enemy → Boss`. Вместо этого вы собираете объект из компонентов:

```text
Enemy
├── Transform
├── Rigidbody
├── CapsuleCollider
├── Animator
├── AudioSource
└── EnemyAI (ваш скрипт)
```

Если враг должен летать, вы меняете настройки `Rigidbody`, а не пишете новый
класс `FlyingEnemy`. Если ему нужен звук — добавляете `AudioSource`. Это и есть
композиция.

## Как получить компонент

В скрипте компоненты ищут через `GetComponent` или `TryGetComponent`:

```csharp
using UnityEngine;

public class ComponentExample : MonoBehaviour
{
    private Rigidbody _rigidbody;

    private void Awake()
    {
        if (!TryGetComponent(out _rigidbody))
        {
            Debug.LogWarning("На объекте нет Rigidbody");
        }
    }
}
```

`TryGetComponent` безопаснее: он не выбрасывает исключение и сразу говорит, есть
ли компонент.

## Как добавить компонент

В редакторе: выберите GameObject → **Add Component** → найдите компонент.

В коде:

```csharp
gameObject.AddComponent<AudioSource>();
```

Но добавлять компоненты в `Update` или `Start` без необходимости не стоит:
обычно их настраивают в редакторе, а код только использует.

## Частые ошибки

- **Пытаются сделать всё одним скриптом.** Один скрипт на 1000 строк лучше
  разбить на несколько компонентов.
- **Ищут компонент каждый кадр.** `GetComponent` в `Update` — лишняя нагрузка.
  Кэшируйте ссылку в `Awake` или `Start`.
- **Забывают про `Transform`.** Это единственный обязательный компонент.
- **Путают GameObject и компонент.** `Rigidbody` — компонент, а не объект.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем GameObject отличается от компонента?",
  "options": [
    {
      "text": "GameObject — контейнер, компонент — часть его поведения",
      "correct": true,
      "explanation": "GameObject содержит компоненты, а не наоборот."
    },
    {
      "text": "GameObject — это скрипт, компонент — сцена",
      "correct": false,
      "explanation": "Скрипт тоже может быть компонентом, но сцена — отдельная сущность."
    },
    {
      "text": "Это одно и то же",
      "correct": false,
      "explanation": "Это разные уровни: объект и его части."
    }
  ],
  "explanation": "GameObject — контейнер на сцене, компоненты добавляют ему возможности."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про компоненты Unity?",
  "options": [
    {
      "text": "`Transform` есть у каждого GameObject",
      "correct": true
    },
    {
      "text": "Один GameObject может иметь несколько компонентов",
      "correct": true
    },
    {
      "text": "Скрипт `MonoBehaviour` может быть компонентом",
      "correct": true
    },
    {
      "text": "Компонент может существовать без GameObject",
      "correct": false,
      "explanation": "Компоненты живут на GameObject."
    }
  ],
  "explanation": "GameObject — контейнер, а компоненты задают его свойства и поведение."
}
```

## Куда дальше

- [Transform](theme.html?path=content/unity/sceny-i-obekty/transform.md)
- [Иерархия и родители](theme.html?path=content/unity/sceny-i-obekty/ierarhiya-i-roditeli.md)
- [Префабы](theme.html?path=content/unity/sceny-i-obekty/prefaby.md)
