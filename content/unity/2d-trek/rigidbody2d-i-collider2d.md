---
title: Rigidbody2D и Collider2D
description: Физика 2D: типы тел, гравитация, скорость, коллайдеры и версии API.
keywords: Unity Rigidbody2D, Collider2D, BoxCollider2D, CircleCollider2D, gravityScale, linearVelocity, 2D физика

---

# Rigidbody2D и Collider2D

В 2D используются компоненты с суффиксом `2D`: `Rigidbody2D`, `BoxCollider2D`,
`CircleCollider2D`, `Physics2D`. Обычные 3D-компоненты с ними не работают.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/2d-trek/2d-physics.svg"
    alt="Схема Rigidbody2D, BoxCollider2D и CircleCollider2D"
    width="900"
  >
  <figcaption>
    Rigidbody2D отвечает за физику, Collider2D — за форму столкновений.
  </figcaption>
</figure>

## Типы Rigidbody2D

- **Dynamic** — двигается от гравитации и сил;
- **Kinematic** — двигается кодом, но сталкивается с другими;
- **Static** — не двигается, для стен и пола.

Для игрока обычно Dynamic, для платформы — Kinematic или Static.

## Основные свойства

| Свойство | Что делает |
|---|---|
| `mass` | масса |
| `gravityScale` | множитель гравитации |
| `linearVelocity` | скорость в Unity 6 |
| `linearDamping` | сопротивление в Unity 6 |
| `angularDamping` | угловое сопротивление в Unity 6 |
| `constraints` | запрет движения/вращения |

В Unity 2022.3 те же свойства называются `velocity`, `drag`, `angularDrag`.

```csharp
private void FixedUpdate()
{
#if UNITY_6000_0_OR_NEWER
    _body.linearVelocity = new Vector2(_speed, _body.linearVelocity.y);
#else
    _body.velocity = new Vector2(_speed, _body.velocity.y);
#endif
}
```

## Коллайдеры

- `BoxCollider2D` — прямоугольник;
- `CircleCollider2D` — круг;
- `CapsuleCollider2D` — капсула;
- `PolygonCollider2D` — произвольная форма;
- `CompositeCollider2D` — объединение коллайдеров.

Для персонажа часто берут `CapsuleCollider2D`, для земли — `BoxCollider2D`.

## Движение

```csharp
private void FixedUpdate()
{
    Vector2 target = _body.position + Vector2.right * _speed * Time.fixedDeltaTime;
    _body.MovePosition(target);
}
```

`MovePosition` учитывает физику и лучше подходит для Kinematic-тел. Для
Dynamic-тел можно менять скорость.

## Частые ошибки

- **Используют 3D-коллайдер.** `Rigidbody2D` с ним не взаимодействует.
- **Меняют `transform.position` в `Update`.** Физика может конфликтовать.
- **Забыли `gravityScale`.** Объект не падает или падает слишком быстро.
- **Путают `velocity` и `linearVelocity`.** В Unity 6 старое имя не работает.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой компонент отвечает за физику 2D?",
  "options": [
    {
      "text": "`Rigidbody2D`",
      "correct": true,
      "explanation": "Он работает с Physics2D."
    },
    {
      "text": "`Rigidbody`",
      "correct": false,
      "explanation": "Это 3D-физика."
    },
    {
      "text": "`CharacterController`",
      "correct": false,
      "explanation": "Он для 3D-персонажа."
    }
  ],
  "explanation": "В 2D используется Rigidbody2D."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про 2D-физику?",
  "options": [
    {
      "text": "`BoxCollider2D` — прямоугольный коллайдер",
      "correct": true
    },
    {
      "text": "`gravityScale` управляет гравитацией",
      "correct": true
    },
    {
      "text": "В Unity 6 скорость — `linearVelocity`",
      "correct": true
    },
    {
      "text": "`Rigidbody` работает с `Collider2D`",
      "correct": false,
      "explanation": "3D и 2D физика не смешиваются."
    }
  ],
  "explanation": "2D-физика использует компоненты с суффиксом 2D."
}
```

## Куда дальше

- [2D-анимация](theme.html?path=content/unity/2d-trek/2d-animaciya.md)
- [Tilemap](theme.html?path=content/unity/2d-trek/tilemap.md)
- [Практика: 2D-платформер](theme.html?path=content/unity/2d-trek/praktika-2d-platformer.md)
