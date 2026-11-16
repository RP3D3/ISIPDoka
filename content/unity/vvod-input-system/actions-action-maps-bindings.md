---
title: Actions, Action Maps, Bindings
description: Как Input System разделяет смысл действия, карту действий и привязку к клавишам или геймпаду.
keywords: Unity Input System, Input Action, Action Map, Binding, Composite, 2D Vector, processors, interactions

---

# Actions, Action Maps, Bindings

Input System строится на трёх понятиях: **действие**, **карта действий** и
**привязка**. Если их не различать, ассет `.inputactions` выглядит как случайный
набор строк.

## Action

**Action** — это смысл: «двигаться», «прыгнуть», «стрелять», «открыть меню».
Действие не знает, какая клавиша его вызывает.

У действия есть тип:

- **Button** — нажатие;
- **Value** — число или вектор;
- **PassThrough** — значение без накопления.

Например, `Move` — `Value` с типом `Vector2`, а `Jump` — `Button`.

## Action Map

**Action Map** — группа действий. Обычно делают карты:

- `Player` — движение, прыжок, стрельба;
- `UI` — навигация, подтверждение, отмена;
- `Vehicle` — управление машиной;
- `Menu` — пауза и настройки.

Карты можно включать и выключать. Когда открыто меню, `Player` отключают, а
`UI` включают — персонаж не реагирует на движение.

## Binding

**Binding** — привязка действия к конкретному контролу:

```text
Move → WASD (Keyboard)
Move → Left Stick (Gamepad)
Jump → Space (Keyboard)
Jump → South Button (Gamepad)
```

Одно действие может иметь несколько привязок. Тогда игрок может играть и на
клавиатуре, и на геймпаде.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/vvod-input-system/workflow-actions.png"
    alt="Схема работы Input Actions в Unity Input System"
    width="900"
  >
  <figcaption>
    Ассет действий связывает действия, карты и устройства.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/Packages/com.unity.inputsystem@1.11/manual/Workflows.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Input System Workflows
    </a>
  </figcaption>
</figure>

## Composite

**Composite** объединяет несколько контролов в одно значение. Классический
пример — `2D Vector`:

```text
Move (2D Vector)
├── Up    → W
├── Down  → S
├── Left  → A
└── Right → D
```

Без composite пришлось бы вручную склеивать четыре кнопки в `Vector2`.

## Processors и Interactions

- **Processor** меняет значение: `Scale`, `Invert`, `Normalize`, `Deadzone`.
- **Interaction** меняет момент срабатывания: `Tap`, `Hold`, `Press`, `Slow Tap`.

Например, `Hold` позволяет сделать «удерживать E, чтобы подобрать предмет», а
`Deadzone` убирает дрожание стика.

## Как использовать в коде

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class ActionExample : MonoBehaviour
{
    [SerializeField] private InputActionReference _moveAction;
    [SerializeField] private InputActionReference _jumpAction;

    private void OnEnable()
    {
        _moveAction.action.Enable();
        _jumpAction.action.Enable();
        _jumpAction.action.performed += OnJump;
    }

    private void OnDisable()
    {
        _jumpAction.action.performed -= OnJump;
        _moveAction.action.Disable();
        _jumpAction.action.Disable();
    }

    private void Update()
    {
        Vector2 move = _moveAction.action.ReadValue<Vector2>();
        transform.Translate(new Vector3(move.x, 0f, move.y) * Time.deltaTime);
    }

    private void OnJump(InputAction.CallbackContext context)
    {
        Debug.Log("Прыжок");
    }
}
```

`InputActionReference` — это ассет-ссылка на действие. Её удобно назначать в
Inspector.

## Частые ошибки

- **Путают Action и Binding.** Действие — смысл, привязка — клавиша.
- **Делают отдельное действие на каждую клавишу.** Лучше одно действие `Move`
  с composite.
- **Забывают включить действие.** Вызов `ReadValue` у выключенного действия
  вернёт значение по умолчанию.
- **Смешивают карты Player и UI.** Когда открыто меню, игрок продолжает
  двигаться.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое Binding в Input System?",
  "options": [
    {
      "text": "Привязка действия к конкретному контролу",
      "correct": true,
      "explanation": "Например, `Jump` → Space."
    },
    {
      "text": "Группа действий для меню",
      "correct": false,
      "explanation": "Это Action Map."
    },
    {
      "text": "Скрипт для обработки ввода",
      "correct": false,
      "explanation": "Скрипт использует действия, но binding — часть ассета."
    }
  ],
  "explanation": "Binding связывает смысл действия с физическим контролом."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Action Map?",
  "options": [
    {
      "text": "Это группа действий",
      "correct": true
    },
    {
      "text": "Карты можно включать и выключать",
      "correct": true
    },
    {
      "text": "Обычно есть карты Player и UI",
      "correct": true
    },
    {
      "text": "Action Map — это файл текстуры",
      "correct": false,
      "explanation": "Это логическая группа действий в Input Actions asset."
    }
  ],
  "explanation": "Action Map группирует действия и позволяет переключать контекст."
}
```

## Куда дальше

- [Control Schemes](theme.html?path=content/unity/vvod-input-system/control-schemes.md)
- [ReadValue и Callbacks](theme.html?path=content/unity/vvod-input-system/readvalue-i-callbacks.md)
- [Практика: управление](theme.html?path=content/unity/vvod-input-system/praktika-upravlenie.md)
