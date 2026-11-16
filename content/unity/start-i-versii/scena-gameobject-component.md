---
title: Сцена, GameObject и компонент
description: Как устроена сцена Unity, чем GameObject отличается от компонента и почему Unity построен на композиции.
keywords: Unity сцена, GameObject, компонент, Transform, MonoBehaviour, композиция, префаб

---

# Сцена, GameObject и компонент

Почти весь Unity держится на трёх словах: **сцена**, **GameObject** и
**компонент**. Если понять их связь, редактор перестаёт быть набором непонятных
окон.

## Сцена

**Сцена** (`Scene`) — это контейнер для объектов. Один уровень, одно меню, один
экран загрузки — обычно отдельная сцена. Сцена сохраняется в файл `.unity` и
лежит в `Assets/Scenes`.

В одной сцене могут быть:

- камера;
- свет;
- игрок;
- враги;
- предметы;
- UI;
- пустые объекты-контейнеры.

Сцены можно загружать через `SceneManager.LoadScene`, но это будет позже.

## GameObject

**GameObject** — объект на сцене. У него есть имя, тег, слой и набор компонентов.
Сам по себе GameObject почти ничего не умеет: он не рисуется, не двигается и не
сталкивается. Всё это делают компоненты.

Примеры GameObject:

- `Main Camera`;
- `Directional Light`;
- куб;
- персонаж;
- пустой объект `SpawnPoint`;
- объект с одним скриптом.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/start-i-versii/gameobjects-examples.jpg"
    alt="Примеры GameObject в Unity: камера, свет, персонаж и куб"
    width="750"
  >
  <figcaption>
    Камера, свет, персонаж и куб — разные GameObject с разными компонентами.
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

## Компонент

**Компонент** — часть GameObject. Компоненты добавляют объекту возможности:

| Компонент | Что делает |
|---|---|
| `Transform` | положение, поворот и масштаб; есть у каждого GameObject |
| `MeshRenderer` | рисует модель |
| `Collider` | участвует в столкновениях |
| `Rigidbody` | включает физику |
| `AudioSource` | проигрывает звук |
| ваш скрипт | добавляет игровую логику |

Ключевая идея: **объект собирается из компонентов**, как из конструктора. Вместо
огромного класса `Enemy` с наследованием от `Character` вы делаете GameObject
`Enemy` и добавляете ему `Rigidbody`, `Collider`, `Animator`, `AudioSource` и
скрипт `EnemyAI`.

## Пример: куб и свет

Куб — это GameObject с компонентами `Transform`, `MeshFilter`, `MeshRenderer` и
`BoxCollider`. Свет — GameObject с `Transform` и `Light`.

<figure class="md-figure md-figure--center md-figure--small">
  <img
    src="content/unity/_assets/start-i-versii/gameobject-cube.png"
    alt="GameObject куба в Unity с компонентами Transform, Mesh Filter, Mesh Renderer и Box Collider"
    width="480"
  >
  <figcaption>
    Куб: один GameObject и несколько компонентов.
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

<figure class="md-figure md-figure--center md-figure--small">
  <img
    src="content/unity/_assets/start-i-versii/gameobject-light.png"
    alt="GameObject источника света в Unity с компонентом Light"
    width="480"
  >
  <figcaption>
    Свет: другой GameObject и другой набор компонентов.
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

## Как добавить компонент

В редакторе:

1. Выберите GameObject в Hierarchy.
2. В Inspector нажмите **Add Component**.
3. Найдите нужный компонент или скрипт.
4. Настройте его поля.

В коде компонент можно добавить так:

```csharp
using UnityEngine;

public class AddRigidbodyExample : MonoBehaviour
{
    private void Start()
    {
        gameObject.AddComponent<Rigidbody>();
    }
}
```

Но чаще компоненты добавляют в редакторе, а код только читает их через
`GetComponent` или `TryGetComponent`.

## Скрипт — тоже компонент

Любой скрипт, который наследуется от `MonoBehaviour`, можно добавить на
GameObject. Например, вращатель куба:

```csharp
using UnityEngine;

public class Rotator : MonoBehaviour
{
    [SerializeField] private float _speed = 90f;

    private void Update()
    {
        transform.Rotate(0f, _speed * Time.deltaTime, 0f);
    }
}
```

Файл `Rotator.cs` кладут в `Assets`, затем перетаскивают на куб или добавляют
через **Add Component → Rotator**.

## Частые ошибки

- **Имя файла не совпадает с именем класса.** `Rotator.cs` должен содержать
  `public class Rotator`.
- **Скрипт добавили, но он не работает.** Проверьте, что компонент висит на
  нужном GameObject и что в Console нет ошибок.
- **Ищут GameObject через `Find`.** В учебных сценах лучше передавать ссылки
  через Inspector.
- **Путают префаб и объект на сцене.** Изменение объекта на сцене не меняет
  префаб, пока вы явно не примените изменения.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой компонент есть у каждого GameObject?",
  "options": [
    {
      "text": "`Transform`",
      "correct": true,
      "explanation": "Без Transform объект не имеет положения в сцене."
    },
    {
      "text": "`Rigidbody`",
      "correct": false,
      "explanation": "Rigidbody добавляют только объектам с физикой."
    },
    {
      "text": "`AudioSource`",
      "correct": false,
      "explanation": "AudioSource нужен только для звука."
    }
  ],
  "explanation": "Transform — обязательный компонент любого GameObject."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про GameObject и компоненты?",
  "options": [
    {
      "text": "GameObject — контейнер для компонентов",
      "correct": true
    },
    {
      "text": "Скрипт `MonoBehaviour` можно добавить компонентом",
      "correct": true
    },
    {
      "text": "GameObject — это файл C#",
      "correct": false,
      "explanation": "GameObject существует на сцене, а C#-файл — это ассет."
    },
    {
      "text": "Поведение объекта задаётся набором компонентов",
      "correct": true
    }
  ],
  "explanation": "Unity собирает поведение из компонентов, а не из одной огромной иерархии классов."
}
```

## Куда дальше

- [Папка Assets и метаданные](theme.html?path=content/unity/start-i-versii/papka-assets-i-metadannye.md)
- [Окна редактора](theme.html?path=content/unity/start-i-versii/okna-redaktora.md)
- [Практика: первый проект](theme.html?path=content/unity/start-i-versii/praktika-start.md)
