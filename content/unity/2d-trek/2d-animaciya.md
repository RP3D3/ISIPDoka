---
title: 2D-анимация
description: Спрайт-анимация через Animation window, клипы, Animator и параметры.
keywords: Unity 2D анимация, sprite animation, Animation window, Animator, ключевые кадры, loop

---

# 2D-анимация

2D-анимация — это смена спрайтов во времени. В Unity её делают через Animation
window и Animator, как и 3D-анимацию.

## Создание клипа

1. Выберите объект со `SpriteRenderer`.
2. Откройте **Window → Animation → Animation**.
3. Нажмите **Create**.
4. Сохраните клип в `Assets/Animations`.
5. Включите запись.
6. Перетаскивайте спрайты в `Sprite` на таймлайне.
7. Остановите запись.

Unity создаст Animator Controller, если его не было.

## Настройки клипа

- **Sample Rate** — сколько кадров в секунду;
- **Loop Time** — повторять;
- **Loop Pose** — сглаживать стык;
- **Speed** — множитель скорости.

Для ходьбы обычно 8–12 кадров в секунду, для атаки — быстрее.

## Animator

В Controller создайте состояния:

```text
Idle → Walk → Jump
```

Параметры:

- `Speed` (Float) — для перехода Idle/Walk;
- `IsGrounded` (Bool);
- `Jump` (Trigger).

```csharp
using UnityEngine;

public class Player2DAnimation : MonoBehaviour
{
    [SerializeField] private Animator _animator;
    [SerializeField] private Rigidbody2D _body;

    private void Update()
    {
        float speed = Mathf.Abs(_body.linearVelocity.x);
        _animator.SetFloat("Speed", speed);
        _animator.SetBool("IsGrounded", Mathf.Abs(_body.linearVelocity.y) < 0.1f);
    }
}
```

В Unity 2022.3 используйте `_body.velocity.x`.

## Спрайт-лист

Если кадры лежат в одном PNG:

1. `Sprite Mode = Multiple`.
2. Нарежьте в Sprite Editor.
3. Выберите все кадры.
4. Перетащите в Animation window.

Unity создаст ключи для каждого спрайта.

## Частые ошибки

- **Спрайты не меняются.** Не выбран `SpriteRenderer` или запись не включена.
- **Анимация слишком быстрая.** Уменьшите Sample Rate.
- **Нет перехода.** Параметр не создан или условие не задано.
- **Персонаж скользит.** Анимация не совпадает со скоростью движения.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что меняется в 2D-анимации?",
  "options": [
    {
      "text": "Спрайт в `SpriteRenderer`",
      "correct": true,
      "explanation": "Кадры анимации — это разные спрайты."
    },
    {
      "text": "ТолькоTransform",
      "correct": false,
      "explanation": "Transform тоже можно анимировать, но спрайт-анимация меняет Sprite."
    },
    {
      "text": "Настройки физики",
      "correct": false,
      "explanation": "Физика не анимируется спрайтами."
    }
  ],
  "explanation": "2D-анимация меняет спрайт во времени."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про 2D-анимацию?",
  "options": [
    {
      "text": "Клип создаётся в Animation window",
      "correct": true
    },
    {
      "text": "Sample Rate задаёт частоту кадров",
      "correct": true
    },
    {
      "text": "Animator переключает состояния",
      "correct": true
    },
    {
      "text": "Для анимации нужен Rigidbody",
      "correct": false,
      "explanation": "Rigidbody нужен для физики, а не для самой анимации."
    }
  ],
  "explanation": "Клипы, Sample Rate и Animator — основа 2D-анимации."
}
```

## Куда дальше

- [Tilemap](theme.html?path=content/unity/2d-trek/tilemap.md)
- [Камера и UI в 2D](theme.html?path=content/unity/2d-trek/kamera-i-ui-2d.md)
- [Практика: 2D-платформер](theme.html?path=content/unity/2d-trek/praktika-2d-platformer.md)
