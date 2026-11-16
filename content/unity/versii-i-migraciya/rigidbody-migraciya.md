---
title: Rigidbody и Rigidbody2D
description: Перенос физики на Unity 6: linearVelocity, linearDamping, angularDamping и compat-слой.
keywords: Unity миграция физики, linearVelocity, linearDamping, angularDamping, Rigidbody2D, compat

---

# Rigidbody и Rigidbody2D

Физика — главное место, где код из 2022.3 ломается в Unity 6. Свойства
переименовали, а старые имена больше не компилируются.

## Было и стало

```csharp
// Unity 2022.3
rb.velocity = new Vector3(1f, 0f, 0f);
rb.drag = 0.5f;
rb.angularDrag = 0.1f;

// Unity 6
rb.linearVelocity = new Vector3(1f, 0f, 0f);
rb.linearDamping = 0.5f;
rb.angularDamping = 0.1f;
```

То же для `Rigidbody2D`:

```csharp
// 2022.3
rb2d.velocity = new Vector2(1f, 0f);
rb2d.drag = 0.5f;
rb2d.angularDrag = 0.1f;

// Unity 6
rb2d.linearVelocity = new Vector2(1f, 0f);
rb2d.linearDamping = 0.5f;
rb2d.angularDamping = 0.1f;
```

## Compat-слой

Если проект должен собираться в обеих версиях, спрячьте разницу в одном месте:

```csharp
using UnityEngine;

public static class RigidbodyCompat
{
    public static Vector3 GetVelocity(Rigidbody body)
    {
#if UNITY_6000_0_OR_NEWER
        return body.linearVelocity;
#else
        return body.velocity;
#endif
    }

    public static void SetVelocity(Rigidbody body, Vector3 value)
    {
#if UNITY_6000_0_OR_NEWER
        body.linearVelocity = value;
#else
        body.velocity = value;
#endif
    }

    public static void SetDamping(Rigidbody body, float linear, float angular)
    {
#if UNITY_6000_0_OR_NEWER
        body.linearDamping = linear;
        body.angularDamping = angular;
#else
        body.drag = linear;
        body.angularDrag = angular;
#endif
    }
}
```

Для `Rigidbody2D` сделайте аналогичный класс или перегрузки.

## Torque в Unity 6

В Unity 6 изменилось поведение torque для:

- `AddForceAtPosition` с `ForceMode.VelocityChange`;
- `AddForceAtPosition` с `ForceMode.Acceleration`;
- `AddExplosionForce` с теми же режимами.

Если объект после обновления начал вращаться иначе, проверьте эти вызовы.
Иногда достаточно заменить `ForceMode` на `Force` или `Impulse`.

## Что проверить

- все `velocity`, `drag`, `angularDrag`;
- код в `FixedUpdate`;
- `maxLinearVelocity`, если используете;
- физические материалы;
- сцены с транспортом и вращением.

## Частые ошибки

- **Ищут замену `velocity` в документации 2022.3.** В Unity 6 имя другое.
- **Меняют только 3D, забывают 2D.** У `Rigidbody2D` те же переименования.
- **Меняют скорость в `Update`.** Физику двигают в `FixedUpdate`.
- **Игнорируют torque.** Поведение вращения могло измениться.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем заменили `Rigidbody.drag` в Unity 6?",
  "options": [
    {
      "text": "`linearDamping`",
      "correct": true,
      "explanation": "Это линейное сопротивление."
    },
    {
      "text": "`angularDamping`",
      "correct": false,
      "explanation": "Это угловое сопротивление."
    },
    {
      "text": "`mass`",
      "correct": false,
      "explanation": "Масса не заменила drag."
    }
  ],
  "explanation": "`drag` → `linearDamping`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно проверить при миграции физики?",
  "options": [
    {
      "text": "`velocity` → `linearVelocity`",
      "correct": true
    },
    {
      "text": "`drag` → `linearDamping`",
      "correct": true
    },
    {
      "text": "`angularDrag` → `angularDamping`",
      "correct": true
    },
    {
      "text": "`mass` → `linearVelocity`",
      "correct": false,
      "explanation": "Масса не переименовывалась."
    }
  ],
  "explanation": "Переименования касаются скорости и сопротивления."
}
```

## Куда дальше

- [Input System и project-wide actions](theme.html?path=content/unity/versii-i-migraciya/input-migraciya.md)
- [FindObjectOfType и другие API](theme.html?path=content/unity/versii-i-migraciya/find-api.md)
- [Матрица API 2022.3 и Unity 6](theme.html?path=content/unity/versii-i-migraciya/matrica-api.md)
