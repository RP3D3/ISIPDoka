---
title: Простая камера следования
description: Камера от третьего лица своими руками: LateUpdate, offset, Vector3.Lerp, LookAt и сглаживание без рывков.
keywords: Unity камера следования, LateUpdate, offset, Vector3.Lerp, LookAt, SmoothDamp, третье лицо, камера за персонажем

---

# Простая камера следования

Камера следования — первый «настоящий» скрипт камеры в большинстве проектов.
Она держит персонажа в кадре, плавно догоняет его и смотрит чуть выше центра.
Такую камеру можно собрать на нескольких строках, не подключая сторонние
пакеты.

## Идея

У камеры есть цель `target` и смещение `offset`. Желаемая позиция камеры —
это `target.position + offset`. Каждый кадр камера плавно приближается к этой
точке и поворачивается на цель.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/kamera-svet-materialy/follow-camera.svg"
    alt="Схема камеры следования: цель, смещение offset, плавное движение и LookAt"
    width="900"
  >
  <figcaption>
    Желаемая позиция — цель плюс смещение; камера догоняет её в `LateUpdate`.
    Авторская схема.
  </figcaption>
</figure>

Смещение обычно задают в мировых координатах: `(0, 4, -6)` означает «четыре
единицы вверх и шесть назад» относительно цели. Если персонаж поворачивается,
а камера должна оставаться у него за спиной, смещение нужно поворачивать вместе
с целью.

## Каркас скрипта

```csharp
using UnityEngine;

public class FollowCamera : MonoBehaviour
{
    [SerializeField] private Transform target;
    [SerializeField] private Vector3 offset = new Vector3(0f, 4f, -6f);
    [SerializeField] private float followSpeed = 8f;
    [SerializeField] private float lookHeight = 1.5f;

    private void LateUpdate()
    {
        if (target == null)
        {
            return;
        }

        Vector3 desiredPosition = target.position + offset;
        float t = 1f - Mathf.Exp(-followSpeed * Time.deltaTime);
        transform.position = Vector3.Lerp(transform.position, desiredPosition, t);

        Vector3 lookPoint = target.position + Vector3.up * lookHeight;
        transform.LookAt(lookPoint);
    }
}
```

Скрипт вешают на объект камеры, а в поле `Target` перетаскивают персонажа.
`LateUpdate` вызывается после всех `Update`, поэтому камера видит уже итоговое
положение персонажа за кадр.

## Плавное движение

`Vector3.Lerp` линейно интерполирует между текущей и желаемой позицией. Третий
аргумент — доля пути от `0` до `1`. Если передавать туда постоянное число,
скорость сглаживания начнёт зависеть от FPS: при 144 кадрах камера будет
догонять быстрее, чем при 30.

Выражение `1f - Mathf.Exp(-followSpeed * Time.deltaTime)` даёт
frame-rate-independent сглаживание. При `followSpeed = 8` камера достаточно
быстро реагирует на движение, но не телепортируется к цели.

Альтернатива — `Vector3.SmoothDamp`:

```csharp
private Vector3 _velocity;

private void LateUpdate()
{
    Vector3 desiredPosition = target.position + offset;
    transform.position = Vector3.SmoothDamp(
        transform.position,
        desiredPosition,
        ref _velocity,
        0.15f);
}
```

`SmoothDamp` хранит скорость в отдельной переменной и тоже не зависит от FPS.
Для большинства игр этого достаточно.

## Поворот на цель

`transform.LookAt(lookPoint)` поворачивает камеру так, чтобы её ось `forward`
смотрела в указанную точку. Смещение `lookHeight` поднимает точку взгляда к
голове персонажа, иначе камера будет смотреть в ноги.

Если нужен более мягкий поворот, можно интерполировать поворот отдельно:

```csharp
Quaternion desiredRotation = Quaternion.LookRotation(lookPoint - transform.position);
transform.rotation = Quaternion.Slerp(transform.rotation, desiredRotation, t);
```

Не смешивайте `LookAt` и `Slerp` в одном кадре: выберите один способ.

## Препятствия между камерой и целью

Простая камера не знает о стенах. Если между ней и персонажем оказывается
геометрия, камера может показать стену изнутри. Один из базовых приёмов —
проверить луч от цели к камере и подвинуть камеру ближе:

```csharp
private void LateUpdate()
{
    Vector3 desiredPosition = target.position + offset;

    if (Physics.Linecast(target.position, desiredPosition, out RaycastHit hit))
    {
        desiredPosition = hit.point + hit.normal * 0.2f;
    }

    transform.position = Vector3.Lerp(transform.position, desiredPosition, 12f * Time.deltaTime);
}
```

`Physics.Linecast` возвращает `true`, если луч встретил коллайдер. Слои стен и
персонажа стоит разнести, чтобы камера не цеплялась за сам объект слежения.
Это учебный вариант; в реальном проекте добавляют маску слоёв и отдельное
сглаживание.

## Частые ошибки

- **Двигают камеру в `Update`.** Камера может использовать позицию персонажа до
  его перемещения, и картинка дёргается. Для камеры есть `LateUpdate`.
- **Передают в `Lerp` постоянный `t`.** Скорость начинает зависеть от FPS.
- **Забывают проверить `target`.** Если цель удалена или не назначена, скрипт
  падает с `NullReferenceException`.
- **Путают локальное и мировое смещение.** При повороте персонажа мировой
  `offset` не поворачивается вместе с ним.
- **Следят за `Rigidbody` без интерполяции.** Включите `Interpolate` у
  `Rigidbody`, иначе движение может выглядеть рваным даже в `LateUpdate`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему камеру следования двигают в `LateUpdate`?",
  "options": [
    {
      "text": "Чтобы она видела итоговые позиции объектов за кадр",
      "correct": true,
      "explanation": "`LateUpdate` вызывается после всех `Update`, поэтому камера не отстаёт на кадр."
    },
    {
      "text": "Потому что в `LateUpdate` работает физика",
      "correct": false,
      "explanation": "Физика работает в `FixedUpdate`."
    },
    {
      "text": "Потому что `LateUpdate` вызывается только один раз за игру",
      "correct": false,
      "explanation": "`LateUpdate` вызывается каждый кадр, просто позже остальных обновлений."
    }
  ],
  "explanation": "Камера должна обновляться последней, иначе она будет использовать устаревшие позиции."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает убрать рывки камеры?",
  "options": [
    {
      "text": "Движение камеры в `LateUpdate`",
      "correct": true
    },
    {
      "text": "Сглаживание через `Lerp` или `SmoothDamp`",
      "correct": true
    },
    {
      "text": "Интерполяция у `Rigidbody` цели",
      "correct": true
    },
    {
      "text": "Движение камеры в `FixedUpdate`",
      "correct": false,
      "explanation": "Камера не физический объект; `FixedUpdate` может дать рывки."
    }
  ],
  "explanation": "Правильный порядок обновления, сглаживание и интерполяция физики вместе дают плавную картинку."
}
```

## Куда дальше

- [Камера](theme.html?path=content/unity/kamera-svet-materialy/kamera.md)
- [Cinemachine 3](theme.html?path=content/unity/kamera-svet-materialy/cinemachine-3.md)
- [Практика: камера и свет](theme.html?path=content/unity/kamera-svet-materialy/praktika-kamera-i-svet.md)
- [Камера, свет и материалы (итог)](theme.html?path=content/unity/kamera-svet-materialy/itog-kamera-svet-materialy.md)
