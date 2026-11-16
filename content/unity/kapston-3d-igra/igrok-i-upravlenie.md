---
title: Игрок и управление
description: CharacterController, Input System, камера от третьего лица и возрождение.
keywords: Unity капстон, игрок, CharacterController, Input System, камера, respawn, управление

---

# Игрок и управление

Игрок — центральный объект. Сначала делаем движение, камеру и возрождение, потом
добавляем врагов и цели.

## Состав игрока

```text
Player
├── CharacterController
├── PlayerInputController
├── Health
├── PlayerRespawn
└── CameraRoot
    └── Main Camera
```

Камера может быть дочерней у `CameraRoot`, а не у самого игрока, чтобы вращение
не ломало движение.

## Движение

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

[RequireComponent(typeof(CharacterController))]
public class PlayerInputController : MonoBehaviour
{
    [SerializeField] private InputActionReference _moveAction;
    [SerializeField] private InputActionReference _jumpAction;
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
    }

    private void OnDisable()
    {
        _moveAction.action.Disable();
        _jumpAction.action.Disable();
    }

    private void Update()
    {
        Vector2 input = _moveAction.action.ReadValue<Vector2>();
        Vector3 move = transform.right * input.x + transform.forward * input.y;
        _controller.Move(move * (_speed * Time.deltaTime));

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

## Камера

Простая камера от третьего лица:

```csharp
using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    [SerializeField] private Transform _target;
    [SerializeField] private Vector3 _offset = new(0f, 3f, -5f);
    [SerializeField] private float _smooth = 10f;

    private void LateUpdate()
    {
        Vector3 desired = _target.position + _offset;
        transform.position = Vector3.Lerp(transform.position, desired, _smooth * Time.deltaTime);
        transform.LookAt(_target.position + Vector3.up * 1.5f);
    }
}
```

Для обзора мышью можно вращать `CameraRoot` по `Look` action.

## Здоровье и возрождение

```csharp
using UnityEngine;

public class PlayerRespawn : MonoBehaviour
{
    [SerializeField] private Transform _spawnPoint;
    [SerializeField] private Health _health;

    private CharacterController _controller;

    private void Awake()
    {
        _controller = GetComponent<CharacterController>();
    }

    public void SetCheckpoint(Vector3 position)
    {
        _spawnPoint.position = position;
    }

    public void Respawn()
    {
        _controller.enabled = false;
        transform.position = _spawnPoint.position;
        _controller.enabled = true;
        _health.ResetHealth();
    }
}
```

При телепортации `CharacterController` лучше выключить и включить, иначе он
может сопротивляться перемещению.

## Частые ошибки

- **Камера двигает игрока.** Разделите `CameraRoot` и `Player`.
- **Игрок проваливается.** Нет коллайдера у земли.
- **Прыжок не работает.** `isGrounded` ложный из-за размера контроллера.
- **После респавна игрок застревает.** Выключите `CharacterController` на
  время телепорта.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой компонент удобен для движения игрока без физики?",
  "options": [
    {
      "text": "`CharacterController`",
      "correct": true,
      "explanation": "Он даёт `Move` и обработку столкновений."
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
  "explanation": "CharacterController — простой вариант для персонажа."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно для управления игроком?",
  "options": [
    {
      "text": "Включить действия Input System",
      "correct": true
    },
    {
      "text": "Настроить камеру",
      "correct": true
    },
    {
      "text": "Добавить коллайдер земле",
      "correct": true
    },
    {
      "text": "Удалить `CharacterController`",
      "correct": false,
      "explanation": "Он нужен для движения."
    }
  ],
  "explanation": "Ввод, камера и коллизии — минимум для игрока."
}
```

## Куда дальше

- [Враги и препятствия](theme.html?path=content/unity/kapston-3d-igra/vragi-i-prepyatstviya.md)
- [Цель, счёт и победа](theme.html?path=content/unity/kapston-3d-igra/cel-schet-pobeda.md)
- [Сборка и полировка](theme.html?path=content/unity/kapston-3d-igra/sborka-i-polirovka.md)
