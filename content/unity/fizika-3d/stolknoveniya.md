---
title: Столкновения
description: OnCollisionEnter, Stay и Exit, объект Collision, относительная скорость и режимы обнаружения столкновений.
keywords: Unity OnCollisionEnter, OnCollisionStay, OnCollisionExit, Collision, relativeVelocity, contacts, collision detection, Continuous

---

# Столкновения

Столкновение — это физический контакт двух коллайдеров, на который движок
реагирует отталкиванием и событиями. В отличие от триггеров, столкновения
меняют движение тел. Скрипт может узнать точку удара, нормаль и относительную
скорость и превратить их в урон, звук или эффект.

## Когда возникают события

Для `OnCollision*` нужно одновременно:

- у обоих объектов есть `Collider`;
- хотя бы у одного есть `Rigidbody`;
- ни один коллайдер не помечен как `isTrigger`;
- слои объектов не исключены в **Physics → Layer Collision Matrix**.

Статика со статикой и два кинематических тела не сталкиваются: физике нечего
разрешать. Динамическое тело с коллайдером уровня — обычный случай.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/fizika-3d/physics-intro.jpg"
    alt="Отладочная визуализация физики Unity: сетки коллайдеров на экране"
    width="560"
  >
  <figcaption>
    Отладочная визуализация физики: сетки коллайдеров показывают геометрию
    контактов.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/PhysicsSection.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Physics
    </a>
  </figcaption>
</figure>

## Три события

```csharp
private void OnCollisionEnter(Collision collision)
{
    Debug.Log($"Контакт с {collision.gameObject.name}");
}

private void OnCollisionStay(Collision collision)
{
    // Вызывается каждый физический шаг, пока тела касаются.
}

private void OnCollisionExit(Collision collision)
{
    Debug.Log("Контакт закончился");
}
```

`Enter` — начало контакта, `Stay` — продолжение, `Exit` — разрыв. `Stay`
вызывается часто, поэтому тяжёлые вычисления в нём лучше не делать.

## Что внутри Collision

| Свойство | Что содержит |
|---|---|
| `gameObject` | Объект, с которым столкнулись |
| `collider` | Его коллайдер |
| `rigidbody` | Его Rigidbody, если есть |
| `contactCount` | Количество точек контакта |
| `GetContact(0)` | Точка, нормаль и расстояние |
| `relativeVelocity` | Относительная скорость тел в момент удара |
| `impulse` | Суммарный импульс контакта |

```csharp
ContactPoint contact = collision.GetContact(0);
Vector3 point = contact.point;
Vector3 normal = contact.normal;
```

Нормаль перпендикулярна поверхности в точке контакта. По ней удобно ставить
эффект искр или вычислять угол удара.

## Относительная скорость и урон

`collision.relativeVelocity.magnitude` — скорость сближения тел. Это готовое
число для порога урона: слабые касания игнорируются, сильные удары наносят
урон.

```csharp
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class ImpactDamage : MonoBehaviour
{
    [SerializeField] private float _minSpeed = 4f;
    [SerializeField] private int _damagePerUnit = 5;

    private void OnCollisionEnter(Collision collision)
    {
        float speed = collision.relativeVelocity.magnitude;
        if (speed < _minSpeed)
        {
            return;
        }

        int damage = Mathf.RoundToInt((speed - _minSpeed) * _damagePerUnit);

        // Health — ваш компонент здоровья.
        if (collision.gameObject.TryGetComponent(out Health health))
        {
            health.TakeDamage(damage);
        }
    }
}
```

Порог зависит от масштаба сцены. Для мяча диаметром `0.5` и скорости `4 м/с`
удар уже заметный, для автомобиля нужны десятки.

## Режимы обнаружения

Быстрое тело может за один шаг перескочить тонкую стену. В поле **Collision
Detection** выбирают режим:

- **Discrete** — по умолчанию, дешевле всего;
- **Continuous** — проверяет путь за шаг, подходит для быстрых объектов;
- **Continuous Dynamic** — непрерывно проверяет и другие динамические тела;
- **Continuous Speculative** — предварительная проверка, в том числе для
  кинематических тел.

Начинайте с `Discrete`, включайте непрерывный режим только у пуль, мячей и
других быстрых объектов.

## Частые ошибки

- **Нет `Rigidbody` ни у одного объекта.** Статические коллайдеры не шлют
  события друг другу.
- **Коллайдер помечен `isTrigger`.** Вместо `OnCollision*` придут
  `OnTrigger*`.
- **Оба тела кинематические.** Они проходят друг сквозь друга.
- **Скрипт висит на дочернем объекте без коллайдера.** Событие приходит
  объекту с `Rigidbody`, а не любому дочернему.
- **Ждут событий от статической стены.** Событие получает динамическое тело,
  а стена — только если у неё есть свой скрипт и подходящий коллайдер.
- **Слишком высокий порог урона.** `relativeVelocity` — это скорость
  сближения, а не скорость одного объекта.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что обязательно для события OnCollisionEnter?",
  "options": [
    {
      "text": "Хотя бы один некинематический Rigidbody и два коллайдера",
      "correct": true,
      "explanation": "Иначе физике нечего разрешать или событие некому отправить."
    },
    {
      "text": "Rigidbody у обоих объектов",
      "correct": false,
      "explanation": "Достаточно одного динамического тела."
    },
    {
      "text": "Оба коллайдера с `isTrigger`",
      "correct": false,
      "explanation": "С триггерами приходят события `OnTrigger*`."
    }
  ],
  "explanation": "Нужны коллайдеры, одно динамическое тело и разрешённые слои."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что можно узнать из объекта Collision?",
  "options": [
    {
      "text": "Точку и нормаль контакта",
      "correct": true
    },
    {
      "text": "Относительную скорость тел",
      "correct": true
    },
    {
      "text": "Объект, с которым произошло столкновение",
      "correct": true
    },
    {
      "text": "Массу обоих тел напрямую",
      "correct": false,
      "explanation": "Массу получают через `collision.rigidbody.mass`, а не из самого Collision."
    }
  ],
  "explanation": "Collision даёт контакты, скорость сближения и ссылки на участников."
}
```

## Куда дальше

- [Триггеры](theme.html?path=content/unity/fizika-3d/triggery.md)
- [Слои, маски, Raycast](theme.html?path=content/unity/fizika-3d/sloi-maski-raycast.md)
- [Кинематик и интерполяция](theme.html?path=content/unity/fizika-3d/kinematik-i-interpolyaciya.md)
