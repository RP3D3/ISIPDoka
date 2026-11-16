---
title: Практика: 2D-платформер
description: Собираем 2D-платформер: спрайт, Tilemap, физика, анимация, монеты и камера.
keywords: Unity 2D практика, платформер, Tilemap, Rigidbody2D, анимация, камера, монеты

---

# Практика: 2D-платформер

Соберём маленький платформер: персонаж бегает и прыгает по Tilemap, собирает
монеты, камера следует за игроком.

## Что нужно сделать

1. Создать 2D-проект и импортировать спрайты.
2. Собрать уровень через Tilemap.
3. Добавить игрока с `Rigidbody2D` и `CapsuleCollider2D`.
4. Сделать анимацию `Idle` и `Run`.
5. Добавить монеты и UI.
6. Настроить камеру следования.

## Решение 1. Спрайты

1. Создайте `Assets/Sprites`.
2. Импортируйте PNG.
3. Поставьте `Texture Type = Sprite (2D and UI)`.
4. Для пиксель-арта: `Filter Mode = Point`, `Compression = None`.
5. Настройте `Pixels Per Unit`.

## Решение 2. Tilemap

1. **GameObject → 2D Object → Tilemap → Rectangular**.
2. Откройте **Window → 2D → Tile Palette**.
3. Создайте палитру и добавьте тайлы.
4. Нарисуйте пол и платформы.
5. Добавьте `TilemapCollider2D` и `CompositeCollider2D`.

## Решение 3. Игрок

1. Создайте GameObject `Player`.
2. Добавьте `SpriteRenderer`.
3. Добавьте `Rigidbody2D`:
   - `Gravity Scale = 3`;
   - `Freeze Rotation Z`.
4. Добавьте `CapsuleCollider2D`.
5. Добавьте скрипт движения.

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

[RequireComponent(typeof(Rigidbody2D))]
public class Player2D : MonoBehaviour
{
    [SerializeField] private InputActionReference _moveAction;
    [SerializeField] private InputActionReference _jumpAction;
    [SerializeField] private float _speed = 5f;
    [SerializeField] private float _jumpForce = 8f;
    [SerializeField] private Transform _groundCheck;
    [SerializeField] private LayerMask _groundMask;

    private Rigidbody2D _body;
    private bool _isGrounded;

    private void Awake()
    {
        _body = GetComponent<Rigidbody2D>();
    }

    private void OnEnable()
    {
        _moveAction.action.Enable();
        _jumpAction.action.Enable();
    }

    private void OnDisable()
    {
        _moveAction.action.Disable();
        _jumpAction.action.Disable();
    }

    private void Update()
    {
        _isGrounded = Physics2D.OverlapCircle(_groundCheck.position, 0.2f, _groundMask);

        if (_jumpAction.action.WasPressedThisFrame() && _isGrounded)
        {
            _body.linearVelocity = new Vector2(_body.linearVelocity.x, _jumpForce);
        }
    }

    private void FixedUpdate()
    {
        float move = _moveAction.action.ReadValue<Vector2>().x;
        _body.linearVelocity = new Vector2(move * _speed, _body.linearVelocity.y);
    }
}
```

В Unity 2022.3 замените `linearVelocity` на `velocity`.

## Решение 4. Анимация

1. Откройте Animation window.
2. Создайте клип `Idle` и `Run`.
3. Добавьте ключи спрайтов.
4. В Animator создайте параметр `Speed`.
5. Переход `Idle → Run` при `Speed > 0.1`.

## Решение 5. Монеты и UI

1. Создайте префаб `Coin` с `CircleCollider2D` и `isTrigger`.
2. При касании игроком увеличивайте счёт и удаляйте монету.
3. Создайте Canvas с текстом счёта.
4. Подпишите UI на событие счёта.

## Решение 6. Камера

```csharp
using UnityEngine;

public class Camera2DFollow : MonoBehaviour
{
    [SerializeField] private Transform _target;
    [SerializeField] private float _smooth = 5f;
    [SerializeField] private Vector3 _offset = new(0f, 1f, -10f);

    private void LateUpdate()
    {
        Vector3 desired = _target.position + _offset;
        transform.position = Vector3.Lerp(transform.position, desired, _smooth * Time.deltaTime);
    }
}
```

## Что должно получиться

- персонаж стоит на Tilemap;
- бегает и прыгает;
- анимация переключается;
- монеты собираются;
- счёт обновляется;
- камера следует за игроком.

## Частые ошибки

- **Игрок проваливается.** Нет `TilemapCollider2D` или слоя земли.
- **Прыжок не работает.** `OverlapCircle` не видит землю из-за LayerMask.
- **Анимация не переключается.** Нет параметра `Speed` или перехода.
- **Камера дрожит.** Двигайте её в `LateUpdate`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где двигать 2D-камеру за игроком?",
  "options": [
    {
      "text": "В `LateUpdate`",
      "correct": true,
      "explanation": "После движения игрока в кадре."
    },
    {
      "text": "В `Awake`",
      "correct": false,
      "explanation": "`Awake` — инициализация."
    },
    {
      "text": "В `OnDestroy`",
      "correct": false,
      "explanation": "Это момент удаления."
    }
  ],
  "explanation": "Камера следует в `LateUpdate`, чтобы не отставать."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно для 2D-платформера?",
  "options": [
    {
      "text": "Rigidbody2D и Collider2D",
      "correct": true
    },
    {
      "text": "Tilemap с коллайдером",
      "correct": true
    },
    {
      "text": "Анимация спрайтов",
      "correct": true
    },
    {
      "text": "3D CharacterController",
      "correct": false,
      "explanation": "В 2D используется физика 2D."
    }
  ],
  "explanation": "2D-платформер строится на спрайтах, Tilemap и Rigidbody2D."
}
```

## Куда дальше

- [2D-трек: итог](theme.html?path=content/unity/2d-trek/itog-2d-trek.md)
- [Rigidbody2D и Collider2D](theme.html?path=content/unity/2d-trek/rigidbody2d-i-collider2d.md)
- [Tilemap](theme.html?path=content/unity/2d-trek/tilemap.md)
