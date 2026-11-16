---
title: Физика 3D
description: Итог группы: как связать Rigidbody, Collider, силы, скорость, столкновения, триггеры и Raycast в одну сцену.
keywords: Unity физика 3D, итог, Rigidbody, Collider, FixedUpdate, ForceMode, Raycast, триггеры, чек-лист

---

# Физика 3D

Физика в Unity собирается из нескольких простых идей: тело, форма, силы,
скорость и запросы. Если каждая часть настроена правильно, объекты падают,
сталкиваются, срабатывают триггеры и не проходят сквозь стены. Эта тема
собирает всё вместе и даёт чек-лист для собственной сцены.

## Что вы уже умеете

| Тема | Главная мысль |
|---|---|
| Rigidbody и Collider | Тело и форма — разные компоненты |
| Масса и damping | Масса меняет отклик на силы, damping гасит движение |
| AddForce | Режим `ForceMode` определяет, постоянно действует сила или мгновенно |
| linearVelocity | Прямая скорость в м/с, удобна для персонажа |
| Столкновения | `OnCollision*` дают контакт и относительную скорость |
| Триггеры | Зона событий без физического отталкивания |
| Слои и Raycast | Маска ограничивает запросы нужными слоями |
| Кинематик | Скрипт двигает тело через `MovePosition` |
| Версии | В Unity 6 — `linearVelocity` и `linearDamping` |

## Минимальный физический объект

Чтобы предмет просто упал на пол, нужно три вещи:

1. у предмета есть `Rigidbody`;
2. у предмета есть `Collider`;
3. у пола есть `Collider`.

Всё остальное — масса, материал, интерполяция — настраивает ощущение, но не
включает физику.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/fizika-3d/mesh-collider-convex.png"
    alt="Выпуклая оболочка Mesh Collider в Scene"
    width="560"
  >
  <figcaption>
    Выпуклый Mesh Collider: сложная форма упрощена до выпуклой оболочки.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/mesh-colliders-introduction.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Mesh colliders
    </a>
  </figcaption>
</figure>

## Полный пример

Скрипт мяча объединяет прыжок через импульс и проверку земли через `Raycast`.
Обратите внимание: силы и запросы выполняются в физическом контексте, а
вертикальная скорость не обнуляется вручную.

```csharp
using UnityEngine;

[RequireComponent(typeof(Rigidbody), typeof(SphereCollider))]
public class PhysicsBall : MonoBehaviour
{
    [SerializeField] private float _jumpImpulse = 5f;
    [SerializeField] private LayerMask _groundMask;
    [SerializeField] private float _groundDistance = 0.6f;

    private Rigidbody _rb;

    private void Awake()
    {
        _rb = GetComponent<Rigidbody>();
        _rb.interpolation = RigidbodyInterpolation.Interpolate;
    }

    public void Jump()
    {
        if (!IsGrounded())
        {
            return;
        }

        _rb.AddForce(Vector3.up * _jumpImpulse, ForceMode.Impulse);
    }

    private bool IsGrounded()
    {
        return Physics.Raycast(_rb.position, Vector3.down, _groundDistance,
            _groundMask, QueryTriggerInteraction.Ignore);
    }
}
```

Если мяч должен катиться от ввода, добавьте в `FixedUpdate` работу с
`linearVelocity`, сохраняя `y`. Если мяч должен реагировать на удары, оставьте
его динамическим и не переписывайте скорость каждый кадр.

## Чек-лист сцены

- [ ] У динамических объектов есть `Rigidbody` и `Collider`.
- [ ] Пол и стены — статические коллайдеры.
- [ ] Масса и damping заданы осознанно, а не «на глаз».
- [ ] Силы вызываются в `FixedUpdate`.
- [ ] Быстрые объекты используют непрерывное обнаружение столкновений.
- [ ] Триггеры имеют `Rigidbody` хотя бы у одной стороны.
- [ ] Слои и маски настроены, лучи не цепляют лишнее.
- [ ] Кинематические платформы двигаются через `MovePosition`.
- [ ] Для Unity 6 и 2022.3 различия спрятаны в compat-слое.
- [ ] В сцене нет объектов с `MeshCollider` без `Convex`, которые должны
  двигаться.

## Частые ошибки

- **Физика в `Update`.** Силы и скорость меняются с разной частотой; результат
  зависит от FPS.
- **`transform.position` у динамического тела.** Физика теряет контакты и
  начинает «дёргаться».
- **Скорость перезаписывается каждый кадр.** Силы и столкновения не успевают
  подействовать.
- **Триггер без `Rigidbody`.** События не приходят.
- **Луч без маски.** Проверка земли цепляет собственный коллайдер или декор.
- **Импульс вместо силы.** Прыжок срабатывает, но постоянная тяга не работает.
- **Забыли про версии.** `velocity` и `drag` в Unity 6 уже не те свойства.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где применяют силы и изменение скорости Rigidbody?",
  "options": [
    {
      "text": "В `FixedUpdate`",
      "correct": true,
      "explanation": "Физика идёт постоянным шагом, и результат не зависит от FPS."
    },
    {
      "text": "В `Update`",
      "correct": false,
      "explanation": "Частота кадров меняется, силы будут работать неравномерно."
    },
    {
      "text": "В `LateUpdate`",
      "correct": false,
      "explanation": "`LateUpdate` нужен для камеры и постобработки, а не для сил."
    }
  ],
  "explanation": "Физические воздействия синхронизируют с шагом физики."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно для работающей физической сцены?",
  "options": [
    {
      "text": "Rigidbody и Collider у динамического объекта",
      "correct": true
    },
    {
      "text": "Collider у пола и стен",
      "correct": true
    },
    {
      "text": "Маска слоёв для Raycast",
      "correct": true
    },
    {
      "text": "Rigidbody у каждого статического объекта",
      "correct": false,
      "explanation": "Статическим стенам Rigidbody не нужен."
    }
  ],
  "explanation": "Тело, форма, поверхности и корректные запросы — основа физической сцены."
}
```

## Куда дальше

- [Практика: физический уровень](theme.html?path=content/unity/fizika-3d/praktika-fizicheskiy-uroven.md)
- [Версии физики](theme.html?path=content/unity/fizika-3d/versii-fiziki.md)
- [Rigidbody и Collider](theme.html?path=content/unity/fizika-3d/rigidbody-i-collider.md)
