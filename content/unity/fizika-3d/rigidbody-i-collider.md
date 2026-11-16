---
title: Rigidbody и Collider
description: Два компонента, из которых начинается любая физика в Unity: Rigidbody задаёт тело, Collider — его форму и границы.
keywords: Unity Rigidbody, Collider, Box Collider, Sphere Collider, Capsule Collider, Mesh Collider, Physics Material, масса, isKinematic

---

# Rigidbody и Collider

Физика в Unity начинается с двух компонентов. `Rigidbody` превращает объект в
тело, которым управляет физический движок. `Collider` задаёт форму этого тела и
границы, по которым движок обнаруживает контакты. Без коллайдера тело падает
сквозь всё, без `Rigidbody` коллайдер остаётся неподвижной геометрией уровня.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/fizika-3d/rigidbody-i-collider.png"
    alt="Capsule Collider на модели оружия в Scene и его настройки в Inspector"
    width="560"
  >
  <figcaption>
    Коллайдер задаёт форму объекта; на снимке — Capsule Collider в Inspector.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/rigidbody-configure-colliders.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Configure Rigidbody colliders
    </a>
  </figcaption>
</figure>

## Два компонента и их роли

| Компонент | Что делает | Без него |
|---|---|---|
| `Rigidbody` | Подчиняет объект физике: гравитации, силам, столкновениям | Объект не двигается сам и не реагирует на удары |
| `Collider` | Задаёт форму для контактов и попаданий лучей | Тело не с чем столкнуться, оно проваливается |

`Rigidbody` без коллайдера — это точка с массой: она падает, но ни за что не
цепляется. `Collider` без `Rigidbody` — статичная геометрия: по ней можно ходить,
но она не сдвинется от удара.

## Что настраивают у Rigidbody

- **Mass** — масса в килограммах. Влияет на силы и импульсы, но не на скорость
  свободного падения.
- **Linear Damping / Angular Damping** — сопротивление движению и вращению.
  В Unity 2022.3 эти поля называются **Drag** и **Angular Drag**.
- **Use Gravity** — учитывать ли мировую гравитацию.
- **Is Kinematic** — тело управляется скриптом, а не силами.
- **Constraints** — запрет движения или вращения по осям.
- **Interpolation** — сглаживание между шагами физики.
- **Collision Detection** — режим обнаружения быстрых столкновений.

Для старта достаточно `Mass = 1`, включённой гравитации и `Interpolation =
Interpolate` для объектов, за которыми следит камера.

## Коллайдеры

В 3D чаще всего используют примитивные формы:

| Коллайдер | Когда подходит |
|---|---|
| `BoxCollider` | Ящики, стены, полы, платформы |
| `SphereCollider` | Мячи, ядра, округлые предметы |
| `CapsuleCollider` | Персонажи и столбы |
| `MeshCollider` | Сложная геометрия, чаще статичная |

`MeshCollider` с включённым **Convex** может двигаться, но стоит дороже
примитивов. Для движущихся объектов лучше собрать форму из нескольких
`BoxCollider` — это составной коллайдер.

## Physics Material

Материал задаёт трение и упругость поверхности: **Friction** и **Bounciness**, а
также правила комбинирования с материалом второй поверхности. Создаётся через
**Assets → Create → Physics Material** и назначается в поле **Material**
коллайдера.

Мяч с высоким `Bounciness` отскакивает, лёд с низким `Friction` скользит. В
Unity 6 класс материала называется `PhysicsMaterial`, в Unity 2022.3 —
`PhysicMaterial`; в Inspector это один и тот же ассет.

## Настройка в коде

Компоненты можно добавить в редакторе, а можно указать их в атрибуте
`RequireComponent` — тогда Unity сама добавит недостающее.

```csharp
using UnityEngine;

[RequireComponent(typeof(Rigidbody), typeof(BoxCollider))]
public class PhysicsBox : MonoBehaviour
{
    private Rigidbody _rb;

    private void Awake()
    {
        _rb = GetComponent<Rigidbody>();
        _rb.mass = 2f;
        _rb.useGravity = true;
        _rb.interpolation = RigidbodyInterpolation.Interpolate;
        _rb.collisionDetectionMode = CollisionDetectionMode.ContinuousDynamic;
    }
}
```

`ContinuousDynamic` помогает быстрым объектам не проскакивать сквозь тонкие
стены. Для обычных платформ и ящиков хватает `Discrete`.

## Частые ошибки

- **Добавили только `Rigidbody`.** Объект падает сквозь пол: у него нет
  коллайдера.
- **Добавили только `Collider` и ждут падения.** Статичный коллайдер не
  подчиняется гравитации.
- **Двигают объект с `Rigidbody` через `transform.position`.** Физика
  «спорит» со скриптом, контакты теряются. Используйте `MovePosition` или силы.
- **Ставят `MeshCollider` без `Convex` на движущийся объект.** Такой коллайдер
  не может быть динамическим телом.
- **Меняют масштаб коллайдера через `Transform.localScale` каждый кадр.** Это
  дорого и плохо пересчитывается физикой; настраивайте размер коллайдера.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что произойдёт с объектом, у которого есть Rigidbody, но нет Collider?",
  "options": [
    {
      "text": "Он будет падать, но не сможет столкнуться с полом",
      "correct": true,
      "explanation": "Тело есть, а формы для контактов нет."
    },
    {
      "text": "Он не будет падать",
      "correct": false,
      "explanation": "Гравитация действует на Rigidbody независимо от коллайдера."
    },
    {
      "text": "Unity не даст добавить Rigidbody без Collider",
      "correct": false,
      "explanation": "Такая комбинация допустима, просто физически бесполезна."
    }
  ],
  "explanation": "Rigidbody отвечает за движение, Collider — за контакты. Нужны оба."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Collider и Rigidbody?",
  "options": [
    {
      "text": "Collider без Rigidbody остаётся статичным",
      "correct": true
    },
    {
      "text": "Rigidbody без Collider падает сквозь пол",
      "correct": true
    },
    {
      "text": "Physics Material задаёт трение и упругость",
      "correct": true
    },
    {
      "text": "Mass напрямую задаёт скорость свободного падения",
      "correct": false,
      "explanation": "В поле тяжести все тела падают с одинаковым ускорением."
    }
  ],
  "explanation": "Тело и форма — разные компоненты; материал поверхности настраивает трение и отскок."
}
```

## Куда дальше

- [Масса, гравитация, damping](theme.html?path=content/unity/fizika-3d/massa-gravitaciya-damping.md)
- [AddForce и ForceMode](theme.html?path=content/unity/fizika-3d/addforce-i-forcemode.md)
- [Столкновения](theme.html?path=content/unity/fizika-3d/stolknoveniya.md)
