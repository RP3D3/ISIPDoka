---
title: ReadValue и Callbacks
description: Два способа читать Input Action: опрос через ReadValue и подписка на started, performed и canceled.
keywords: Unity Input System, ReadValue, CallbackContext, started, performed, canceled, WasPressedThisFrame, InputAction

---

# ReadValue и Callbacks

У Input Action есть два основных способа использования:

1. **Опрос** — каждый кадр спрашиваем текущее значение.
2. **Callbacks** — подписываемся на события действия.

Оба подхода нормальны. Для движения обычно берут `ReadValue`, для прыжка и
стрельбы — callback.

## Опрос: ReadValue

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class MoveByAction : MonoBehaviour
{
    [SerializeField] private InputActionReference _moveAction;

    private void OnEnable()
    {
        _moveAction.action.Enable();
    }

    private void OnDisable()
    {
        _moveAction.action.Disable();
    }

    private void Update()
    {
        Vector2 move = _moveAction.action.ReadValue<Vector2>();
        transform.Translate(new Vector3(move.x, 0f, move.y) * Time.deltaTime);
    }
}
```

`ReadValue<Vector2>` возвращает текущее значение. Если действие выключено, будет
значение по умолчанию.

Для кнопок есть удобные методы:

```csharp
if (_jumpAction.action.WasPressedThisFrame())
{
    Jump();
}

if (_jumpAction.action.IsPressed())
{
    ChargeJump();
}
```

## Callbacks

```csharp
private void OnEnable()
{
    _jumpAction.action.Enable();
    _jumpAction.action.started += OnJumpStarted;
    _jumpAction.action.performed += OnJumpPerformed;
    _jumpAction.action.canceled += OnJumpCanceled;
}

private void OnDisable()
{
    _jumpAction.action.started -= OnJumpStarted;
    _jumpAction.action.performed -= OnJumpPerformed;
    _jumpAction.action.canceled -= OnJumpCanceled;
    _jumpAction.action.Disable();
}

private void OnJumpStarted(InputAction.CallbackContext context)
{
    Debug.Log("Нажатие началось");
}

private void OnJumpPerformed(InputAction.CallbackContext context)
{
    Debug.Log("Действие выполнено");
}

private void OnJumpCanceled(InputAction.CallbackContext context)
{
    Debug.Log("Нажатие отпущено");
}
```

- `started` — действие начало выполняться.
- `performed` — действие достигло порога или завершилось.
- `canceled` — действие отменено или отпущено.

<figure class="md-figure md-figure--center md-figure--small">
  <img
    src="content/unity/_assets/vvod-input-system/actions-binding.png"
    alt="Привязка действия к кнопке в Input Actions Unity"
    width="273"
  >
  <figcaption>
    Действие и его привязка в Input Actions asset.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/Packages/com.unity.inputsystem@1.11/manual/Actions.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Actions
    </a>
  </figcaption>
</figure>

## CallbackContext

`InputAction.CallbackContext` содержит информацию о вызове:

```csharp
private void OnJump(InputAction.CallbackContext context)
{
    Debug.Log($"Фаза: {context.phase}");
    Debug.Log($"Устройство: {context.control?.device}");
    Debug.Log($"Значение: {context.ReadValue<float>()}");
}
```

Полезные свойства: `phase`, `control`, `action`, `time`, `startTime`,
`duration`, `ReadValue<T>()`.

## Что выбрать

| Задача | Подход |
|---|---|
| Движение стиком | `ReadValue<Vector2>` в `Update` |
| Прыжок | `performed` |
| Удержание кнопки | `started` / `canceled` или `IsPressed` |
| Стрельба с очередью | `performed` + таймер |
| UI-навигация | callbacks или UI Input Module |

## Частые ошибки

- **Забывают `Enable`.** Callback не вызовется, `ReadValue` вернёт ноль.
- **Подписываются в `Start`, а отписываются в `OnDisable`.** Если объект
  выключили до `Start`, будет рассинхрон.
- **Делают тяжёлую логику в callback.** Callback приходит из системы ввода;
  лучше запомнить флаг и обработать в `Update`.
- **Используют `WasPressedThisFrame` в `FixedUpdate`.** Можно пропустить кадр;
  для физики лучше флаг из `Update`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой метод читает текущее значение действия?",
  "options": [
    {
      "text": "`ReadValue<T>()`",
      "correct": true,
      "explanation": "Он возвращает текущее значение действия."
    },
    {
      "text": "`Enable()`",
      "correct": false,
      "explanation": "`Enable` включает действие, но не читает значение."
    },
    {
      "text": "`Disable()`",
      "correct": false,
      "explanation": "`Disable` выключает действие."
    }
  ],
  "explanation": "`ReadValue<T>` — основной способ опроса действия."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про callbacks действия?",
  "options": [
    {
      "text": "`performed` срабатывает при выполнении действия",
      "correct": true
    },
    {
      "text": "`canceled` срабатывает при отмене или отпускании",
      "correct": true
    },
    {
      "text": "`CallbackContext` содержит фазу и устройство",
      "correct": true
    },
    {
      "text": "Callback работает без `Enable`",
      "correct": false,
      "explanation": "Действие должно быть включено."
    }
  ],
  "explanation": "Callbacks дают фазу, контекст и устройство, но требуют включённого действия."
}
```

## Куда дальше

- [PlayerInput и события](theme.html?path=content/unity/vvod-input-system/playerinput-i-sobytiya.md)
- [Generated C# class и Asset](theme.html?path=content/unity/vvod-input-system/generated-csharp-class.md)
- [Практика: управление](theme.html?path=content/unity/vvod-input-system/praktika-upravlenie.md)
