---
title: PlayerInput и события
description: Компонент PlayerInput, Unity Events, C# Events и подключение нескольких игроков.
keywords: Unity PlayerInput, PlayerInputManager, Unity Events, C# Events, multiplayer, SwitchCurrentActionMap

---

# PlayerInput и события

`PlayerInput` — готовый компонент, который связывает Input Actions asset с
GameObject. Он умеет включать нужную карту, переключать control scheme и
отправлять события в ваш код.

## Добавление PlayerInput

1. Выберите GameObject игрока.
2. **Add Component → Player Input**.
3. В поле **Actions** перетащите `.inputactions` asset.
4. Выберите **Default Map**, например `Player`.
5. Выберите **Behavior**.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/vvod-input-system/workflow-playerinput.png"
    alt="Схема работы PlayerInput в Unity Input System"
    width="900"
  >
  <figcaption>
    `PlayerInput` связывает ассет действий с игровым объектом.
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

## Режимы Behavior

- **Send Messages** — Unity вызывает методы с именем действия:
  `OnMove`, `OnJump`, `OnFire`.
- **Invoke Unity Events** — в Inspector настраиваются события.
- **Invoke C# Events** — вы подписываетесь на `onActionTriggered` в коде.

### Send Messages

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerMessages : MonoBehaviour
{
    public void OnMove(InputValue value)
    {
        Vector2 move = value.Get<Vector2>();
        transform.Translate(new Vector3(move.x, 0f, move.y) * Time.deltaTime);
    }

    public void OnJump(InputValue value)
    {
        if (value.isPressed)
        {
            Debug.Log("Прыжок");
        }
    }
}
```

Метод должен быть `public` и принимать `InputValue` или `InputAction.CallbackContext`.

### C# Events

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerEvents : MonoBehaviour
{
    private PlayerInput _playerInput;

    private void Awake()
    {
        _playerInput = GetComponent<PlayerInput>();
        _playerInput.onActionTriggered += OnAction;
    }

    private void OnDestroy()
    {
        _playerInput.onActionTriggered -= OnAction;
    }

    private void OnAction(InputAction.CallbackContext context)
    {
        if (context.action.name == "Jump" && context.performed)
        {
            Debug.Log("Прыжок");
        }
    }
}
```

## Переключение Action Map

```csharp
_playerInput.SwitchCurrentActionMap("UI");
```

Когда открыто меню, переключите карту на `UI`, а при закрытии — обратно на
`Player`. Иначе персонаж продолжит двигаться под меню.

## Несколько игроков

Для локального мультиплеера есть `PlayerInputManager`:

- **Join Behavior** — по кнопке или автоматически;
- **Player Prefab** — шаблон игрока;
- **Notification Behavior** — как сообщать о подключении.

Каждый игрок получает свой `PlayerInput` и своё устройство.

## Частые ошибки

- **Метод `OnMove` private.** Send Messages не найдёт его.
- **Неверное имя действия.** Метод должен совпадать с именем Action.
- **Забыли отписаться от `onActionTriggered`.** После уничтожения объекта
  возможны ошибки.
- **Не переключают карту при открытии меню.** Игрок двигается под UI.
- **Один PlayerInput на нескольких игроков.** Для мультиплеера нужен
  `PlayerInputManager`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает PlayerInput?",
  "options": [
    {
      "text": "Связывает Input Actions asset с GameObject",
      "correct": true,
      "explanation": "Он включает карты, схемы и отправляет события."
    },
    {
      "text": "Заменяет Rigidbody",
      "correct": false,
      "explanation": "PlayerInput отвечает за ввод, а не физику."
    },
    {
      "text": "Рисует UI",
      "correct": false,
      "explanation": "UI — отдельная система."
    }
  ],
  "explanation": "PlayerInput — мост между ассетом действий и объектом."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про PlayerInput?",
  "options": [
    {
      "text": "Умеет вызывать методы `OnMove`, `OnJump`",
      "correct": true
    },
    {
      "text": "Может переключать Action Map",
      "correct": true
    },
    {
      "text": "Поддерживает несколько игроков через PlayerInputManager",
      "correct": true
    },
    {
      "text": "Работает без Input Actions asset",
      "correct": false,
      "explanation": "Ему нужен ассет действий или действия, назначенные вручную."
    }
  ],
  "explanation": "PlayerInput связывает ассет, карты и события игрока."
}
```

## Куда дальше

- [Generated C# class и Asset](theme.html?path=content/unity/vvod-input-system/generated-csharp-class.md)
- [Project-wide Actions](theme.html?path=content/unity/vvod-input-system/project-wide-actions.md)
- [Практика: управление](theme.html?path=content/unity/vvod-input-system/praktika-upravlenie.md)
