---
title: Практика: физический уровень
description: Собираем небольшую сцену с мячом, платформой и триггером: прыжок, столкновения и проверка земли.
keywords: Unity практика, физический уровень, Rigidbody, платформа, триггер, прыжок, Raycast, LayerMask

---

# Практика: физический уровень

Соберём маленький уровень, в котором есть пол, мяч, движущаяся платформа и
зона сбора. Это не отдельная игра, а проверка всех механизмов группы: тело,
коллайдер, силы, скорость, столкновения, триггер и луч.

## Шаг 1. Соберите сцену

1. Создайте новую 3D-сцену.
2. Добавьте `Cube`, растяните его в пол: `Scale = (10, 0.5, 10)`.
3. Добавьте второй `Cube` — платформу `Scale = (3, 0.3, 3)` на высоте `1`.
4. Добавьте `Sphere` — мяч радиусом `0.5`, поставьте его над полом.
5. Создайте пустой объект `Pickup` и добавьте ему `BoxCollider` с
   `Is Trigger = true`.

Пол и платформа остаются статическими: у них есть коллайдеры, но нет
`Rigidbody`. Мячу нужны `Rigidbody` и `SphereCollider`.

## Шаг 2. Настройте мяч

На мяче:

- `Mass = 1`;
- `Use Gravity` включён;
- `Interpolation = Interpolate`;
- `Collision Detection = Continuous Dynamic`, если платформа тонкая.

Добавьте скрипт прыжка. Проверка земли идёт лучом вниз, а импульс применяется
только когда мяч стоит на поверхности.

```csharp
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class BallJump : MonoBehaviour
{
    [SerializeField] private float _jumpImpulse = 5f;
    [SerializeField] private LayerMask _groundMask;
    [SerializeField] private float _groundDistance = 0.6f;

    private Rigidbody _rb;

    private void Awake()
    {
        _rb = GetComponent<Rigidbody>();
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

Создайте слой `Ground`, назначьте его полу и платформе и выберите его в поле
`Ground Mask`. Вызовите `Jump()` из своего скрипта ввода по нажатию кнопки.

## Шаг 3. Добавьте движущуюся платформу

Сделайте платформу кинематической и двигайте её через `MovePosition`. Так
коллайдер и физическое тело останутся синхронными.

```csharp
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class MovingPlatform : MonoBehaviour
{
    [SerializeField] private Vector3 _offset = new Vector3(0f, 0f, 4f);
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

Поставьте платформу так, чтобы мяч мог на неё запрыгнуть. Включите
`Interpolation = Interpolate` и у платформы, и у мяча.

## Шаг 4. Сделайте триггер

На объекте `Pickup` включите `Is Trigger`. У мяча уже есть `Rigidbody`, поэтому
события будут приходить. Добавьте на `Pickup` скрипт, который реагирует только
на игрока (в нашем случае — на мяч) и исчезает после сбора.

```csharp
using UnityEngine;
using UnityEngine.Events;

public class Pickup : MonoBehaviour
{
    [SerializeField] private UnityEvent _onPicked;

    private void OnTriggerEnter(Collider other)
    {
        if (!other.CompareTag("Player"))
        {
            return;
        }

        _onPicked.Invoke();
        Destroy(gameObject);
    }
}
```

Назначьте мячу тег `Player` или замените проверку тега на проверку слоя. В
событие `On Picked` добавьте `Debug.Log`, включение эффекта или увеличение
счёта.

## Проверка результата

- [ ] Мяч падает на пол и не проваливается.
- [ ] Мяч стоит на платформе и не проскакивает сквозь неё.
- [ ] Прыжок срабатывает только на земле.
- [ ] Платформа двигается плавно и не «телепортируется».
- [ ] При входе в зону `Pickup` появляется сообщение, объект исчезает.
- [ ] В Console нет ошибок и предупреждений о коллайдерах.

## Частые ошибки

- **Мяч проваливается сквозь пол.** У пола нет коллайдера или у мяча нет
  `Rigidbody`.
- **Прыжок работает в воздухе.** Луч слишком длинный или маска включает не те
  слои.
- **Платформа дёргается.** `MovePosition` вызывается в `Update` или
  интерполяция выключена.
- **Триггер не срабатывает.** У пары нет `Rigidbody` или слой исключён в
  матрице столкновений.
- **Мяч застревает в платформе.** Включите `Continuous Dynamic` и проверьте
  толщину коллайдера.
- **Событие срабатывает дважды.** `Destroy` вызывается в `OnTriggerStay`, а не
  в `OnTriggerEnter`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Мяч проскакивает сквозь тонкую платформу. Что сделать?",
  "options": [
    {
      "text": "Включить Continuous Dynamic у Rigidbody мяча",
      "correct": true,
      "explanation": "Непрерывное обнаружение проверяет путь за шаг физики."
    },
    {
      "text": "Увеличить массу мяча в десять раз",
      "correct": false,
      "explanation": "Масса не мешает проскакиванию сквозь тонкий коллайдер."
    },
    {
      "text": "Отключить гравитацию",
      "correct": false,
      "explanation": "Тогда мяч вообще перестанет падать."
    }
  ],
  "explanation": "Быстрым телам нужно непрерывное обнаружение столкновений."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что проверить, если триггер не срабатывает?",
  "options": [
    {
      "text": "У одной из сторон есть Rigidbody",
      "correct": true
    },
    {
      "text": "У коллайдера включён `Is Trigger`",
      "correct": true
    },
    {
      "text": "Слои не исключены в Layer Collision Matrix",
      "correct": true
    },
    {
      "text": "У триггера включён `Continuous Dynamic`",
      "correct": false,
      "explanation": "Это настройка Rigidbody для быстрых столкновений, к событиям триггера отношения не имеет."
    }
  ],
  "explanation": "Триггеру нужны коллайдер, тело у пары и разрешённые слои."
}
```

## Куда дальше

- [Физика 3D](theme.html?path=content/unity/fizika-3d/itog-fizika-3d.md)
- [Слои, маски, Raycast](theme.html?path=content/unity/fizika-3d/sloi-maski-raycast.md)
- [Триггеры](theme.html?path=content/unity/fizika-3d/triggery.md)
