---
title: Практика: управление
description: Собираем управление персонажем на Input System: Move, Jump, Look, клавиатура и геймпад.
keywords: Unity Input System практика, управление персонажем, Move, Jump, Look, CharacterController, InputActionReference

---

# Практика: управление

Соберём управление от третьего лица: ходьба, прыжок и обзор. Один и тот же
ассет действий будет работать с клавиатурой, мышью и геймпадом.

## Что нужно сделать

1. Создать `PlayerControls.inputactions` с картой `Player`.
2. Добавить действия `Move`, `Jump`, `Look`.
3. Привязать `Move` к WASD и левому стику.
4. Привязать `Jump` к Space и нижней кнопке геймпада.
5. Привязать `Look` к мыши и правому стику.
6. Написать скрипт движения на `CharacterController`.
7. Проверить клавиатуру и геймпад.

## Решение 1. Ассет действий

1. В Project создайте `Assets/Input`.
2. **Create → Input Actions**, имя `PlayerControls`.
3. Откройте ассет.
4. Создайте Action Map `Player`.
5. Добавьте действия:

| Action | Type | Control Type |
|---|---|---|
| `Move` | Value | Vector2 |
| `Jump` | Button | — |
| `Look` | Value | Vector2 |

## Решение 2. Привязки Move

1. Выберите `Move`.
2. Добавьте binding `2D Vector`.
3. Назначьте:

```text
Up    → W
Down  → S
Left  → A
Right → D
```

4. Добавьте второй binding: `Left Stick` геймпада.
5. Убедитесь, что у привязок выбраны control schemes `Keyboard&Mouse` и
   `Gamepad`.

## Решение 3. Привязки Jump и Look

`Jump`:

```text
Space          → Keyboard
South Button   → Gamepad
```

`Look`:

```text
Delta [Mouse]  → Mouse
Right Stick    → Gamepad
```

Для мыши можно добавить processor `Scale` с небольшим множителем, чтобы
чувствительность была комфортной.

## Решение 4. Скрипт

Создайте `Assets/Scripts/PlayerInputController.cs`:

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

[RequireComponent(typeof(CharacterController))]
public class PlayerInputController : MonoBehaviour
{
    [Header("Actions")]
    [SerializeField] private InputActionReference _moveAction;
    [SerializeField] private InputActionReference _jumpAction;
    [SerializeField] private InputActionReference _lookAction;

    [Header("Movement")]
    [SerializeField] private float _speed = 5f;
    [SerializeField] private float _jumpHeight = 1.5f;
    [SerializeField] private float _gravity = -9.81f;

    private CharacterController _controller;
    private float _verticalVelocity;

    private void Awake()
    {
        _controller = GetComponent<CharacterController>();
    }

    private void OnEnable()
    {
        _moveAction.action.Enable();
        _jumpAction.action.Enable();
        _lookAction.action.Enable();
    }

    private void OnDisable()
    {
        _moveAction.action.Disable();
        _jumpAction.action.Disable();
        _lookAction.action.Disable();
    }

    private void Update()
    {
        Move();
        Look();
        Jump();
    }

    private void Move()
    {
        Vector2 input = _moveAction.action.ReadValue<Vector2>();
        Vector3 direction = transform.right * input.x + transform.forward * input.y;
        _controller.Move(direction * (_speed * Time.deltaTime));
    }

    private void Look()
    {
        Vector2 look = _lookAction.action.ReadValue<Vector2>();
        transform.Rotate(Vector3.up, look.x * 0.1f);
    }

    private void Jump()
    {
        if (_controller.isGrounded && _verticalVelocity < 0f)
        {
            _verticalVelocity = -2f;
        }

        if (_jumpAction.action.WasPressedThisFrame() && _controller.isGrounded)
        {
            _verticalVelocity = Mathf.Sqrt(_jumpHeight * -2f * _gravity);
        }

        _verticalVelocity += _gravity * Time.deltaTime;
        _controller.Move(Vector3.up * (_verticalVelocity * Time.deltaTime));
    }
}
```

## Решение 5. Сборка сцены

1. Создайте куб или капсулу `Player`.
2. Добавьте `CharacterController`.
3. Добавьте `PlayerInputController`.
4. Перетащите действия `Move`, `Jump`, `Look` из ассета в поля скрипта.
5. Создайте плоскость `Ground`.
6. Нажмите **Play**.

Проверьте:

- WASD двигает персонажа;
- Space прыгает;
- мышь поворачивает;
- геймпад делает то же самое.

## Что должно получиться

- ассет `PlayerControls` с картой `Player`;
- `Move` работает от WASD и левого стика;
- `Jump` работает от Space и нижней кнопки;
- `Look` работает от мыши и правого стика;
- персонаж не проваливается сквозь землю;
- в Console нет ошибок.

## Частые ошибки

- **Действия не включены.** В `OnEnable` нет `Enable`.
- **Не назначены ссылки в Inspector.** `InputActionReference` пустой.
- **Персонаж проваливается.** Нет `CharacterController` или земли с коллайдером.
- **Мышь слишком чувствительна.** Добавьте processor `Scale` или уменьшите
  множитель.
- **Геймпад не работает.** Проверьте control scheme и привязки.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой компонент удобен для простого движения без физики?",
  "options": [
    {
      "text": "`CharacterController`",
      "correct": true,
      "explanation": "Он двигает персонажа через `Move` и обрабатывает столкновения."
    },
    {
      "text": "`AudioSource`",
      "correct": false,
      "explanation": "Он отвечает за звук."
    },
    {
      "text": "`Canvas`",
      "correct": false,
      "explanation": "Canvas — для UI."
    }
  ],
  "explanation": "`CharacterController` — простой способ движения персонажа."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно для работы управления?",
  "options": [
    {
      "text": "Включить действия в `OnEnable`",
      "correct": true
    },
    {
      "text": "Назначить `InputActionReference` в Inspector",
      "correct": true
    },
    {
      "text": "Настроить привязки для клавиатуры и геймпада",
      "correct": true
    },
    {
      "text": "Удалить `CharacterController`",
      "correct": false,
      "explanation": "Он нужен для движения."
    }
  ],
  "explanation": "Ассет, ссылки, включение действий и контроллер — минимум для управления."
}
```

## Куда дальше

- [Ввод: Input System: итог](theme.html?path=content/unity/vvod-input-system/itog-vvod-input-system.md)
- [Actions, Action Maps, Bindings](theme.html?path=content/unity/vvod-input-system/actions-action-maps-bindings.md)
- [ReadValue и Callbacks](theme.html?path=content/unity/vvod-input-system/readvalue-i-callbacks.md)
