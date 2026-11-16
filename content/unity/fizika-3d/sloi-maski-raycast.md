---
title: Слои, маски, Raycast
description: Как устроены слои и LayerMask, как читать RaycastHit и делать проверку земли без лишних попаданий.
keywords: Unity LayerMask, слои, Physics.Raycast, RaycastHit, QueryTriggerInteraction, NameToLayer, GetMask, проверка земли

---

# Слои, маски, Raycast

Слои нужны, чтобы физика и лучи не проверяли весь мир. Маска слоя — это набор
битов, а не номер слоя. Если перепутать эти две вещи, `Physics.Raycast` будет
попадать не туда или не попадать вообще. В этой теме — слои, маски, `Raycast` и
`RaycastHit`.

## Слои

У каждого GameObject есть номер слоя от `0` до `31`. Первые несколько заняты
встроенными слоями (`Default`, `TransparentFX`, `Ignore Raycast`, `Water`,
`UI`), остальные можно создавать в **Edit → Project Settings → Tags and
Layers**.

```csharp
int groundLayer = LayerMask.NameToLayer("Ground");
gameObject.layer = groundLayer;
```

`NameToLayer` возвращает номер слоя, а не маску. Номер нужен, когда вы
назначаете слой объекту. Для запросов физики нужна маска.

## Маска

Маска — это число, в котором каждый бит отвечает за слой. Слой `8`
превращается в маску `1 << 8`, то есть `256`.

```csharp
int mask = 1 << 8;                       // только слой 8
int several = LayerMask.GetMask("Ground", "Props");
```

В Inspector поле типа `LayerMask` выглядит как выпадающий список слоёв. Unity
сама собирает маску из галочек, поэтому в скрипте достаточно передать поле в
`Physics.Raycast`.

```csharp
[SerializeField] private LayerMask _groundMask;
```

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/fizika-3d/sloi-maski-raycast.svg"
    alt="Схема луча Raycast, попадания в слой Ground и битов маски LayerMask"
    width="900"
  >
  <figcaption>
    Луч проверяет только слои, чьи биты включены в маске.
  </figcaption>
</figure>

## Raycast

`Physics.Raycast` пускает луч из точки в направлении и возвращает `true`, если
нашёл коллайдер. Полная форма принимает дистанцию, маску и режим триггеров.

```csharp
using UnityEngine;

public class RaycastExample : MonoBehaviour
{
    [SerializeField] private LayerMask _mask;
    [SerializeField] private float _distance = 10f;

    private void Update()
    {
        if (Physics.Raycast(transform.position, transform.forward,
                out RaycastHit hit, _distance, _mask,
                QueryTriggerInteraction.Ignore))
        {
            Debug.Log($"Попали в {hit.collider.name} на {hit.distance:F1} м");
        }
    }
}
```

`QueryTriggerInteraction.Ignore` исключает триггеры. `Collide` наоборот
разрешает их, а `UseGlobal` берёт настройку `Physics.queriesHitTriggers`.

## RaycastHit

`RaycastHit` содержит всё о попадании:

| Поле | Что означает |
|---|---|
| `point` | Точка попадания в мире |
| `normal` | Нормаль поверхности |
| `distance` | Расстояние от начала луча |
| `collider` | Коллайдер, в который попали |
| `rigidbody` | Rigidbody этого коллайдера, если есть |
| `transform` | Transform объекта |

По нормали ставят декали и эффекты, по `collider` определяют тип поверхности,
по `rigidbody` прикладывают силу в точку удара.

## Проверка земли

Классический пример: луч вниз из центра персонажа. Дистанция должна быть чуть
больше половины высоты коллайдера, иначе персонаж «зависнет» в воздухе или
будет считать землёй собственные ноги.

```csharp
using UnityEngine;

public class GroundCheck : MonoBehaviour
{
    [SerializeField] private LayerMask _groundMask;
    [SerializeField] private float _distance = 1.1f;

    public bool IsGrounded()
    {
        return Physics.Raycast(transform.position, Vector3.down, _distance,
            _groundMask, QueryTriggerInteraction.Ignore);
    }

    private void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.yellow;
        Gizmos.DrawLine(transform.position,
            transform.position + Vector3.down * _distance);
    }
}
```

`OnDrawGizmosSelected` рисует луч в Scene, когда объект выбран. Это проще, чем
угадывать дистанцию вслепую.

### Другие запросы

- `Physics.SphereCast` — луч с толщиной, удобен для проверки прохода.
- `Physics.OverlapSphere` — все коллайдеры в радиусе, например для взрыва.
- `Physics.RaycastAll` — все попадания по лучу, возвращает массив.
- `Physics.Linecast` — проверка отрезка между двумя точками.

Для одиночного попадания `Raycast` дешевле, чем `RaycastAll`: не создаёт массив.

## Частые ошибки

- **Передают номер слоя вместо маски.** `Physics.Raycast(..., 8)` проверит
  слой `3`, а не `8`. Нужно `1 << 8` или `LayerMask.GetMask`.
- **Луч начинается внутри коллайдера.** Такой коллайдер обычно не
  засчитывается; начинайте луч снаружи или используйте `OverlapSphere`.
- **Забыли дистанцию.** По умолчанию луч бесконечный и может попасть в объект
  на другом конце сцены.
- **Не исключили триггеры.** Луч попадёт в зону и вернёт не ту поверхность.
- **Не проверяют слой земли.** Персонаж считает землёй собственный коллайдер
  или другой объект.
- **Строят маску в `Update` каждый кадр.** `LayerMask.GetMask` лучше вызвать
  один раз в `Awake` и закэшировать.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что возвращает LayerMask.GetMask(\"Ground\")?",
  "options": [
    {
      "text": "Битовую маску для запросов физики",
      "correct": true,
      "explanation": "`GetMask` собирает маску из имён слоёв."
    },
    {
      "text": "Номер слоя Ground",
      "correct": false,
      "explanation": "Номер слоя возвращает `LayerMask.NameToLayer`."
    },
    {
      "text": "Ссылку на объект Ground",
      "correct": false,
      "explanation": "Слой — это число, а не объект сцены."
    }
  ],
  "explanation": "Для запросов нужна маска; номер слоя — только для назначения `gameObject.layer`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Raycast и RaycastHit?",
  "options": [
    {
      "text": "`RaycastHit.point` — точка попадания в мире",
      "correct": true
    },
    {
      "text": "`QueryTriggerInteraction.Ignore` исключает триггеры",
      "correct": true
    },
    {
      "text": "`Physics.Raycast` возвращает `bool`",
      "correct": true
    },
    {
      "text": "`LayerMask.NameToLayer` возвращает маску",
      "correct": false,
      "explanation": "Метод возвращает номер слоя, а не маску."
    }
  ],
  "explanation": "Луч возвращает признак попадания и заполняет `RaycastHit` данными о контакте."
}
```

## Куда дальше

- [Триггеры](theme.html?path=content/unity/fizika-3d/triggery.md)
- [Кинематик и интерполяция](theme.html?path=content/unity/fizika-3d/kinematik-i-interpolyaciya.md)
- [Практика: физический уровень](theme.html?path=content/unity/fizika-3d/praktika-fizicheskiy-uroven.md)
