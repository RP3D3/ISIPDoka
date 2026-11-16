---
title: Версии физики
description: Что изменилось в физике Unity 6 по сравнению с 2022.3: linearVelocity, damping, PhysicsMaterial и крутящий момент.
keywords: Unity 6 физика, linearVelocity, velocity, linearDamping, drag, angularDamping, PhysicsMaterial, torque, совместимость, UNITY_6000_0_OR_NEWER

---

# Версии физики

Физика Unity 6 в основном совместима с 2022.3, но несколько свойств
переименовали, а поведение крутящего момента изменилось. Код, который
компилировался в 2022.3, может не собраться в Unity 6; код, который работает в
Unity 6, может вести себя иначе при переносе старой сцены. Эту разницу лучше
держать в одном compat-слое.

## Что переименовали

| Unity 2022.3 | Unity 6 | Смысл |
|---|---|---|
| `Rigidbody.velocity` | `Rigidbody.linearVelocity` | Линейная скорость |
| `Rigidbody.drag` | `Rigidbody.linearDamping` | Сопротивление движению |
| `Rigidbody.angularDrag` | `Rigidbody.angularDamping` | Сопротивление вращению |
| `Rigidbody2D.velocity` | `Rigidbody2D.linearVelocity` | Скорость в 2D |
| `Rigidbody2D.drag` | `Rigidbody2D.linearDamping` | Сопротивление в 2D |
| `Rigidbody2D.angularDrag` | `Rigidbody2D.angularDamping` | Вращение в 2D |

В Inspector подписи тоже поменялись: **Drag** стал **Linear Damping**,
**Angular Drag** — **Angular Damping**. Значения при этом не конвертируются
автоматически в какое-то другое число: это те же коэффициенты.

## Compat-слой

Препроцессор Unity определяет версию редактора. Для Unity 6 и новее есть
символ `UNITY_6000_0_OR_NEWER`; для 2022.3 он не определён, поэтому ветка
`#else` остаётся рабочей.

```csharp
using UnityEngine;

public static class RigidbodyCompat
{
    public static Vector3 GetVelocity(this Rigidbody rb)
    {
#if UNITY_6000_0_OR_NEWER
        return rb.linearVelocity;
#else
        return rb.velocity;
#endif
    }

    public static void SetVelocity(this Rigidbody rb, Vector3 value)
    {
#if UNITY_6000_0_OR_NEWER
        rb.linearVelocity = value;
#else
        rb.velocity = value;
#endif
    }

    public static void SetDamping(this Rigidbody rb, float linear, float angular)
    {
#if UNITY_6000_0_OR_NEWER
        rb.linearDamping = linear;
        rb.angularDamping = angular;
#else
        rb.drag = linear;
        rb.angularDrag = angular;
#endif
    }
}
```

В игровом коде остаётся одна строка, не зависящая от версии:

```csharp
_rb.SetVelocity(new Vector3(move.x * _speed, _rb.GetVelocity().y, move.z * _speed));
```

Тот же приём работает для `Rigidbody2D`: тип параметра меняется на `Vector2`, а
свойства — на `linearVelocity`, `linearDamping` и `angularDamping`.

## PhysicsMaterial

В Unity 6 класс материала переименован из `PhysicMaterial` в
`PhysicsMaterial`. В 2022.3 используется `PhysicMaterial`. Если вы назначаете
материал из кода, проверьте тип поля и версию:

```csharp
#if UNITY_6000_0_OR_NEWER
PhysicsMaterial material;
#else
PhysicMaterial material;
#endif
```

В Inspector это один и тот же ассет с полями **Friction** и **Bounciness**.
Основная работа с материалом обычно идёт мышью, поэтому переименование
затрагивает только скрипты.

## Torque в Unity 6

В Unity 6 изменился расчёт крутящего момента у `AddForceAtPosition` и
`AddExplosionForce` при `ForceMode.VelocityChange` и `ForceMode.Acceleration`.
Сила прикладывается в точку, но вращение тело получает иначе, чем в 2022.3.

Это важно для:

- взрывов, которые закручивают обломки;
- ударов по краю объекта;
- сцен, перенесённых с 2022.3 без изменения настроек.

Практические правила:

1. Для базовых примеров используйте `ForceMode.Force` и `ForceMode.Impulse`.
2. Сравните поведение взрыва в двух версиях.
3. Если вращение критично, добавьте `AddTorque` вручную.
4. Не считайте расхождение ошибкой компиляции: код собирается, меняется
   результат.

## Чек-лист миграции

- [ ] Заменить `velocity` на `linearVelocity` во всех 3D- и 2D-скриптах.
- [ ] Заменить `drag` и `angularDrag` на `linearDamping` и `angularDamping`.
- [ ] Проверить тип `PhysicMaterial` / `PhysicsMaterial`.
- [ ] Найти все `AddForceAtPosition` и `AddExplosionForce` с
  `VelocityChange` и `Acceleration`.
- [ ] Пересобрать сцену и проверить взрывы, удары и движущиеся платформы.
- [ ] Убедиться, что пакеты физики и URP обновлены вместе с редактором.

## Частые ошибки

- **Оставляют `velocity` в Unity 6.** Компилятор сообщает, что свойства нет.
- **Меняют только 3D-код.** У `Rigidbody2D` те же переименования.
- **Думают, что damping автоматически пересчитали.** Это те же коэффициенты,
  но проверьте ощущение движения после апгрейда.
- **Ищут ошибку в torque как в баге.** Это задокументированное изменение
  поведения.
- **Ставят `#if UNITY_2022_3_OR_NEWER` вместо `UNITY_6000_0_OR_NEWER`.**
  Символ 2022.3 определён и в Unity 6, поэтому ветка выберется неверно.
- **Забывают про `using UnityEngine;` в compat-файле.** Он должен лежать в
  отдельной сборке или папке, доступной остальным скриптам.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем в Unity 6 заменили Rigidbody.drag?",
  "options": [
    {
      "text": "`linearDamping`",
      "correct": true,
      "explanation": "Переименование отражает смысл: сопротивление линейному движению."
    },
    {
      "text": "`angularDamping`",
      "correct": false,
      "explanation": "Это замена `angularDrag`, сопротивления вращению."
    },
    {
      "text": "`linearVelocity`",
      "correct": false,
      "explanation": "Это замена `velocity`, а не сопротивления."
    }
  ],
  "explanation": "`drag` → `linearDamping`, `angularDrag` → `angularDamping`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что изменилось в Unity 6?",
  "options": [
    {
      "text": "`velocity` переименовали в `linearVelocity`",
      "correct": true
    },
    {
      "text": "`drag` переименовали в `linearDamping`",
      "correct": true
    },
    {
      "text": "У `Rigidbody2D` тоже появились `linearVelocity` и `linearDamping`",
      "correct": true
    },
    {
      "text": "Крутящий момент изменился для `ForceMode.Force` и `Impulse`",
      "correct": false,
      "explanation": "Изменение касается `VelocityChange` и `Acceleration`."
    }
  ],
  "explanation": "Переименования общие для 3D и 2D; torque изменился только в двух режимах."
}
```

## Куда дальше

- [linearVelocity](theme.html?path=content/unity/fizika-3d/linearvelocity.md)
- [AddForce и ForceMode](theme.html?path=content/unity/fizika-3d/addforce-i-forcemode.md)
- [Физика 3D](theme.html?path=content/unity/fizika-3d/itog-fizika-3d.md)
