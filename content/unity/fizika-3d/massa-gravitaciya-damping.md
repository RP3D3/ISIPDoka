---
title: Масса, гравитация, damping
description: Как масса влияет на силы, зачем нужны useGravity и damping и чем Unity 6 отличается от 2022.3.
keywords: Unity масса, Rigidbody mass, useGravity, Physics.gravity, linearDamping, angularDamping, drag, angularDrag, constraints

---

# Масса, гравитация, damping

Три настройки `Rigidbody` чаще всего объясняют неправильно: масса, гравитация и
сопротивление. Масса не делает предмет «тяжелее» в смысле скорости падения,
гравитация может быть выключена у отдельного тела, а damping постепенно гасит
скорость. Если путать эти вещи, персонаж падает как камень, а ящик летит как
мячик.

## Масса

**Mass** — масса тела в килограммах. Она влияет на то, как тело отзывается на
силы и импульсы, и на то, как оно ведёт себя при столкновениях.

```csharp
_rb.mass = 5f;
```

При одинаковой силе тяжёлое тело ускоряется медленнее: `a = F / m`. Но в
свободном падении масса сокращается, поэтому все тела падают с одинаковым
ускорением. Если нужно, чтобы предмет падал быстрее, меняют гравитацию или
добавляют силу, а не массу.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/fizika-3d/compound-collider.jpg"
    alt="Inspector Rigidbody с массой, сопротивлением, гравитацией и интерполяцией"
    width="560"
  >
  <figcaption>
    Inspector Rigidbody: масса, Drag и Angular Drag (в Unity 6 —
    Linear/Angular Damping), гравитация и интерполяция.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/compound-colliders-introduction.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Compound colliders
    </a>
  </figcaption>
</figure>

## Гравитация

По умолчанию все динамические тела притягиваются вниз с ускорением
`Physics.gravity`, то есть примерно `(0, -9.81, 0)`. Отключить гравитацию у
одного тела можно флажком **Use Gravity**.

```csharp
_rb.useGravity = false;   // тело не тянет вниз
Physics.gravity = new Vector3(0f, -20f, 0f); // сильнее для всей сцены
```

Гравитацию сцены меняют в **Edit → Project Settings → Physics → Gravity**, а из
кода — через `Physics.gravity`. Это глобальная настройка: она влияет на все
тела с включённым `useGravity`.

## Damping

**Linear Damping** гасит поступательную скорость, **Angular Damping** —
вращение. Значение `0` означает отсутствие сопротивления, большие значения
быстрее останавливают тело.

| Версия | Поступательное | Вращательное |
|---|---|---|
| Unity 2022.3 | `drag` | `angularDrag` |
| Unity 6 | `linearDamping` | `angularDamping` |

В Inspector те же поля называются **Drag / Angular Drag** в 2022.3 и **Linear
Damping / Angular Damping** в Unity 6.

```csharp
using UnityEngine;

public static class RigidbodyDamping
{
    public static void Set(Rigidbody rb, float linear, float angular)
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

Типичные значения — от `0` до `1`. Damping не заменяет трение: трение работает
в точке контакта, а damping действует на тело всё время, даже в воздухе.

## Constraints

**Constraints** запрещают движение или вращение по выбранным осям. Это дешевле,
чем постоянно обнулять скорость вручную.

```csharp
// Персонаж не заваливается набок, но может поворачиваться вокруг Y.
_rb.constraints = RigidbodyConstraints.FreezeRotationX
                | RigidbodyConstraints.FreezeRotationZ;
```

Флаги можно комбинировать через `|`. Полная заморозка —
`RigidbodyConstraints.FreezeAll`. Ограничения не отключают гравитацию: тело
может падать, но не вращаться.

## Версии Unity

В Unity 2022.3 используйте `drag` и `angularDrag`, в Unity 6 —
`linearDamping` и `angularDamping`. Один и тот же код для обеих версий удобно
прятать в helper, как в примере выше. Для `Rigidbody2D` действует то же
правило: `velocity` → `linearVelocity`, `drag` → `linearDamping`,
`angularDrag` → `angularDamping`.

## Частые ошибки

- **Думают, что масса меняет скорость падения.** В вакууме и в поле тяжести
  масса сокращается.
- **Ставят damping `10`–`50` «для реализма».** Тело вязнет и перестаёт
  реагировать на прыжки; начинайте с малых значений.
- **Ищут `gravityScale` у 3D Rigidbody.** Это свойство есть только у
  `Rigidbody2D`; в 3D используют `useGravity` и `Physics.gravity`.
- **Меняют `Physics.gravity` из `Update`.** Настройка глобальная; задавайте её
  один раз при старте сцены.
- **Обнуляют скорость вместо `Constraints`.** Это ломает столкновения и
  выглядит неестественно.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "На что напрямую влияет масса тела?",
  "options": [
    {
      "text": "На ускорение от силы и на реакцию при столкновении",
      "correct": true,
      "explanation": "Чем больше масса, тем меньше ускорение при той же силе."
    },
    {
      "text": "На скорость свободного падения",
      "correct": false,
      "explanation": "В поле тяжести масса сокращается в формуле ускорения."
    },
    {
      "text": "На силу трения поверхности",
      "correct": false,
      "explanation": "Трение задаётся Physics Material, а не массой."
    }
  ],
  "explanation": "Масса — мера инертности: она меняет отклик на силы и импульсы."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про гравитацию и damping?",
  "options": [
    {
      "text": "`useGravity = false` отключает гравитацию у одного тела",
      "correct": true
    },
    {
      "text": "Damping постепенно уменьшает скорость тела",
      "correct": true
    },
    {
      "text": "В Unity 6 поле `drag` заменили на `linearDamping`",
      "correct": true
    },
    {
      "text": "`gravityScale` есть у 3D Rigidbody",
      "correct": false,
      "explanation": "`gravityScale` — свойство Rigidbody2D."
    }
  ],
  "explanation": "Гравитация может быть общей или отключённой у тела, а damping гасит движение."
}
```

## Куда дальше

- [Rigidbody и Collider](theme.html?path=content/unity/fizika-3d/rigidbody-i-collider.md)
- [AddForce и ForceMode](theme.html?path=content/unity/fizika-3d/addforce-i-forcemode.md)
- [linearVelocity](theme.html?path=content/unity/fizika-3d/linearvelocity.md)
