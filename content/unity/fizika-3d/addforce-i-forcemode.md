---
title: AddForce и ForceMode
description: Четыре режима ForceMode, разница между силой и импульсом и почему физику двигают в FixedUpdate.
keywords: Unity AddForce, ForceMode, Force, Impulse, VelocityChange, Acceleration, FixedUpdate, AddExplosionForce, AddTorque

---

# AddForce и ForceMode

`Rigidbody.AddForce` — основной способ толкать физическое тело, не переписывая
его скорость напрямую. Один и тот же вызов с разным `ForceMode` даёт совершенно
разный результат: постепенное ускорение, мгновенный толчок или изменение
скорости, не зависящее от массы.

## Сила, импульс и скорость

В физике сила меняет импульс: `F = m · a`, а импульс `J = F · Δt`. В Unity
`ForceMode` определяет, как переданное число превращается в скорость:

| Режим | Когда действует | Масса | Типичное применение |
|---|---|---|---|
| `Force` | Каждый физический шаг | Учитывается | Тяга, ветер, течение |
| `Acceleration` | Каждый физический шаг | Игнорируется | Гравитация, постоянное ускорение |
| `Impulse` | Один вызов, мгновенно | Учитывается | Прыжок, удар, взрыв |
| `VelocityChange` | Один вызов, мгновенно | Игнорируется | Рывок одинаковый для всех тел |

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/fizika-3d/addforce-forcemode.svg"
    alt="Схема четырёх режимов ForceMode: Force, Acceleration, Impulse, VelocityChange"
    width="900"
  >
  <figcaption>
    Force и Acceleration работают постоянно, Impulse и VelocityChange — мгновенно.
  </figcaption>
</figure>

## Четыре режима на практике

```csharp
// Постоянная тяга: вызывать каждый FixedUpdate.
_rb.AddForce(Vector3.forward * 10f, ForceMode.Force);

// Мгновенный прыжок: вызывать один раз.
_rb.AddForce(Vector3.up * 5f, ForceMode.Impulse);

// Рывок, одинаковый для тяжёлого и лёгкого тела.
_rb.AddForce(Vector3.right * 4f, ForceMode.VelocityChange);

// Постоянное ускорение без учёта массы.
_rb.AddForce(Vector3.up * 9.81f, ForceMode.Acceleration);
```

Если не указать режим, используется `ForceMode.Force`. Поэтому вызов
`AddForce(direction * 100f)` в `Update` каждый кадр даёт разное ускорение при
разном FPS и быстро разгоняет тело.

## Куда вызывать: FixedUpdate

Силы и изменение скорости применяйте в `FixedUpdate`. Этот метод вызывается с
постоянным шагом физики (`Fixed Timestep`, по умолчанию `0.02` с), поэтому
`ForceMode.Force` и `ForceMode.Acceleration` дают предсказуемый результат.

```csharp
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class Thruster : MonoBehaviour
{
    [SerializeField] private float _force = 10f;
    private Rigidbody _rb;

    private void Awake()
    {
        _rb = GetComponent<Rigidbody>();
    }

    private void FixedUpdate()
    {
        _rb.AddForce(Vector3.forward * _force, ForceMode.Force);
    }
}
```

`Update` подходит для чтения ввода и одноразовых событий, например нажатия
прыжка. Само применение импульса лучше всё равно выполнять в `FixedUpdate` или
сразу из метода, который вызывает игровая логика.

## Прыжок и взрыв

Прыжок — это импульс вверх. Значение `5` при массе `1` даёт примерно `5 м/с`
начальной скорости.

```csharp
public void Jump()
{
    _rb.AddForce(Vector3.up * 5f, ForceMode.Impulse);
}
```

Взрыв действует на все тела в радиусе. `AddExplosionForce` учитывает расстояние
до центра и может немного подбрасывать объекты вверх.

```csharp
private void Explode()
{
    Collider[] hits = Physics.OverlapSphere(transform.position, 5f);
    foreach (Collider hit in hits)
    {
        if (hit.TryGetComponent(out Rigidbody rb))
        {
            rb.AddExplosionForce(10f, transform.position, 5f, 0.5f,
                ForceMode.Impulse);
        }
    }
}
```

Для вращения есть `AddTorque` и `AddRelativeTorque`. Они принимают те же
`ForceMode`, но работают с угловой скоростью.

## Изменение torque в Unity 6

В Unity 6 изменился расчёт крутящего момента у `AddForceAtPosition` и
`AddExplosionForce` при `ForceMode.VelocityChange` и `ForceMode.Acceleration`.
Сила по-прежнему прикладывается, но вращение тело может получить иначе, чем в
2022.3. Это не ошибка компиляции, а другое поведение.

Если вы переносите сцену со взрывами или ударами по краю объекта:

- для предсказуемого результата используйте `ForceMode.Force` или
  `ForceMode.Impulse`;
- сравните поведение в обеих версиях;
- при необходимости добавьте вращение вручную через `AddTorque`.

## Частые ошибки

- **Вызывают `ForceMode.Force` один раз.** Сила действует только на одном
  шаге; для постоянной тяги нужен `FixedUpdate`.
- **Умножают `Impulse` на `Time.fixedDeltaTime`.** Импульс мгновенный, лишнее
  умножение делает толчок слабее.
- **Кладут `AddForce` в `Update`.** Результат зависит от FPS.
- **Путают `VelocityChange` и `Impulse`.** При разной массе тел результат
  будет разным.
- **Забывают про гравитацию.** Слишком слабый импульс почти сразу гасится
  гравитацией; учитывайте массу и желаемую высоту прыжка.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой ForceMode игнорирует массу тела?",
  "options": [
    {
      "text": "`ForceMode.VelocityChange`",
      "correct": true,
      "explanation": "Режим сразу задаёт изменение скорости, независимо от массы."
    },
    {
      "text": "`ForceMode.Impulse`",
      "correct": false,
      "explanation": "Импульс делится на массу: тяжёлое тело получит меньше скорости."
    },
    {
      "text": "`ForceMode.Force`",
      "correct": false,
      "explanation": "Сила даёт ускорение `F / m`, масса важна."
    }
  ],
  "explanation": "`VelocityChange` и `Acceleration` не учитывают массу, `Force` и `Impulse` — учитывают."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про AddForce?",
  "options": [
    {
      "text": "`ForceMode.Force` действует на каждом физическом шаге",
      "correct": true
    },
    {
      "text": "`ForceMode.Impulse` применяется мгновенно",
      "correct": true
    },
    {
      "text": "`ForceMode.Acceleration` не зависит от массы",
      "correct": true
    },
    {
      "text": "`ForceMode.Impulse` нужно умножать на `Time.fixedDeltaTime`",
      "correct": false,
      "explanation": "Импульс уже мгновенный, дополнительное умножение не нужно."
    }
  ],
  "explanation": "Режим определяет, постоянно ли действует величина и учитывается ли масса."
}
```

## Куда дальше

- [Масса, гравитация, damping](theme.html?path=content/unity/fizika-3d/massa-gravitaciya-damping.md)
- [linearVelocity](theme.html?path=content/unity/fizika-3d/linearvelocity.md)
- [Столкновения](theme.html?path=content/unity/fizika-3d/stolknoveniya.md)
