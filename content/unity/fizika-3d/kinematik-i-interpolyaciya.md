---
title: Кинематик и интерполяция
description: isKinematic, MovePosition и MoveRotation, интерполяция Rigidbody и движущиеся платформы без рывков.
keywords: Unity isKinematic, MovePosition, MoveRotation, RigidbodyInterpolation, Interpolate, Extrapolate, движущаяся платформа, FixedUpdate

---

# Кинематик и интерполяция

Не всё в игре должно подчиняться силам. Двери, лифты, платформы и персонажи на
скриптовом управлении часто делают кинематическими: их положение задаёт код, а
физика только обнаруживает контакты. Отдельная настройка — интерполяция, которая
убирает рывки между шагами физики и кадрами рендера.

## isKinematic

Флажок **Is Kinematic** отключает влияние сил, гравитации и столкновений на
тело. Объект двигается только тогда, когда его двигает скрипт.

```csharp
_rb.isKinematic = true;
```

Что при этом работает:

- события триггеров;
- столкновения с динамическими телами (динамическое тело отталкивается,
  кинематическое остаётся на месте);
- `MovePosition` и `MoveRotation`;
- запросы `Physics.Raycast` по его коллайдеру.

Что не работает:

- `AddForce`, `AddTorque`, `AddExplosionForce`;
- гравитация;
- изменение `linearVelocity` как способ движения.

## MovePosition и MoveRotation

Для кинематического тела используют `MovePosition` и `MoveRotation`. Они
передвигают тело на следующем физическом шаге, а динамические тела
сталкиваются с ним как с обычной поверхностью.

```csharp
private void FixedUpdate()
{
    Vector3 next = Vector3.MoveTowards(
        _rb.position, _target, _speed * Time.fixedDeltaTime);

    _rb.MovePosition(next);
}
```

Для поворота используйте `MoveRotation` с заранее рассчитанным кватернионом:

```csharp
_rb.MoveRotation(targetRotation);
```

Вызывайте эти методы в `FixedUpdate`. В `Update` тело будет двигаться рывками,
потому что физика всё равно обновляется с постоянным шагом.

## Интерполяция

Физика считается 50 раз в секунду, а рендер может идти быстрее. Без
интерполяции позиция объекта обновляется ступеньками. Свойство
`Rigidbody.interpolation` сглаживает картинку:

| Значение | Поведение |
|---|---|
| `None` | Позиция меняется только на шаге физики |
| `Interpolate` | Смешивает прошлую и текущую позицию |
| `Extrapolate` | Предсказывает следующую позицию |

```csharp
_rb.interpolation = RigidbodyInterpolation.Interpolate;
```

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/fizika-3d/kinematik-interpolyaciya.svg"
    alt="Схема шагов FixedUpdate, кадров рендера и сглаживания интерполяцией"
    width="900"
  >
  <figcaption>
    Интерполяция сглаживает положение между шагами физики.
  </figcaption>
</figure>

`Interpolate` — безопасный выбор для персонажа и камеры. `Extrapolate` может
предугадывать движение, но на резких остановках иногда «перелетает».

## Движущаяся платформа

Платформа должна быть кинематической: её движение задаёт скрипт, а игрок
опирается на коллайдер. `MovePosition` переносит и физическое тело, и его
коллайдер.

```csharp
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class MovingPlatform : MonoBehaviour
{
    [SerializeField] private Vector3 _offset = new Vector3(0f, 0f, 5f);
    [SerializeField] private float _speed = 2f;

    private Rigidbody _rb;
    private Vector3 _start;
    private Vector3 _target;

    private void Awake()
    {
        _rb = GetComponent<Rigidbody>();
        _rb.isKinematic = true;
        _start = _rb.position;
        _target = _start + _offset;
    }

    private void FixedUpdate()
    {
        Vector3 next = Vector3.MoveTowards(
            _rb.position, _target, _speed * Time.fixedDeltaTime);

        _rb.MovePosition(next);

        if ((next - _target).sqrMagnitude < 0.0001f)
        {
            Vector3 temp = _start;
            _start = _target;
            _target = temp;
        }
    }
}
```

Если платформа должна везти игрока, игроку нужен `Rigidbody` и коллайдер.
Интерполяцию включайте и у платформы, и у игрока.

## Continuous collision detection

Быстрая кинематическая платформа может проскочить сквозь тонкий объект. Для
таких случаев существует `CollisionDetectionMode.ContinuousSpeculative`: он
поддерживает кинематические тела и проверяет путь заранее.

```csharp
_rb.collisionDetectionMode = CollisionDetectionMode.ContinuousSpeculative;
```

Для обычных лифтов и дверей достаточно `Discrete`.

## Частые ошибки

- **`MovePosition` в `Update`.** Физика обновляется в `FixedUpdate`, движение
  получается неровным.
- **Двигают кинематик через `transform.position`.** Коллайдер и физическое
  тело расходятся, контакты теряются.
- **Добавляют силу кинематическому телу.** `AddForce` не подействует.
- **Ждут, что кинематик будет отброшен ударом.** Он не реагирует на силы; при
  необходимости переключите `isKinematic` или используйте динамическое тело.
- **Включают интерполяцию объекту без `Rigidbody`.** Настройка есть только у
  `Rigidbody`.
- **Ставят `Extrapolate` объекту, за которым следит камера, без нужды.** На
  резких поворотах картинка может «дрожать»; чаще лучше `Interpolate` и
  обновление камеры в `LateUpdate`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает isKinematic?",
  "options": [
    {
      "text": "Отключает силы и гравитацию, оставляя управление скрипту",
      "correct": true,
      "explanation": "Тело двигается через `MovePosition` и `MoveRotation`."
    },
    {
      "text": "Делает тело невидимым для физики полностью",
      "correct": false,
      "explanation": "Коллайдер продолжает участвовать в контактах и запросах."
    },
    {
      "text": "Увеличивает массу тела",
      "correct": false,
      "explanation": "Масса и кинематичность — разные настройки."
    }
  ],
  "explanation": "Кинематическое тело не подчиняется силам, но остаётся участником физики."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про кинематик и интерполяцию?",
  "options": [
    {
      "text": "`MovePosition` вызывают в `FixedUpdate`",
      "correct": true
    },
    {
      "text": "`Interpolate` сглаживает движение между шагами физики",
      "correct": true
    },
    {
      "text": "Триггеры продолжают работать у кинематического тела",
      "correct": true
    },
    {
      "text": "`AddForce` действует на кинематическое тело",
      "correct": false,
      "explanation": "Силы игнорируются, пока включён `isKinematic`."
    }
  ],
  "explanation": "Кинематик управляется скриптом, а интерполяция улучшает картинку."
}
```

## Куда дальше

- [linearVelocity](theme.html?path=content/unity/fizika-3d/linearvelocity.md)
- [Столкновения](theme.html?path=content/unity/fizika-3d/stolknoveniya.md)
- [Версии физики](theme.html?path=content/unity/fizika-3d/versii-fiziki.md)
