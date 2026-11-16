---
title: Control Schemes
description: Наборы устройств Keyboard&Mouse, Gamepad и Touch, переключение схем и подсказки управления.
keywords: Unity Input System, Control Scheme, Keyboard Mouse, Gamepad, Touch, PlayerInput, устройства

---

# Control Schemes

**Control Scheme** — это набор устройств, для которого предназначены привязки.
Например, `Keyboard&Mouse`, `Gamepad`, `Touch`. Схемы помогают не показывать
игроку кнопки геймпада, если он играет на клавиатуре.

## Зачем нужны схемы

- разные подсказки управления;
- автоматическое переключение при нажатии на другое устройство;
- multiplayer с разными устройствами;
- проверка, что привязки не конфликтуют.

Без схем можно жить, но чем больше платформ, тем полезнее их описать.

## Стандартные схемы

В Input Actions asset обычно создают:

| Схема | Устройства |
|---|---|
| `Keyboard&Mouse` | клавиатура и мышь |
| `Gamepad` | геймпад |
| `Touch` | сенсорный экран |
| `Joystick` | джойстик, если нужен отдельно |

У каждого binding можно указать, к каким схемам он относится.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/vvod-input-system/player-input.png"
    alt="Компонент Player Input с настройками действий и control scheme"
    width="456"
  >
  <figcaption>
    `PlayerInput` связывает ассет действий с объектом и хранит текущую схему.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/Packages/com.unity.inputsystem@1.11/manual/PlayerInput.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Player Input
    </a>
  </figcaption>
</figure>

## Настройка

1. Откройте `.inputactions`.
2. В панели **Control Schemes** нажмите **+**.
3. Создайте `Keyboard&Mouse` и добавьте `Keyboard`, `Mouse`.
4. Создайте `Gamepad`.
5. У привязок выберите нужные схемы.

Если схема не указана, привязка считается общей.

## Переключение

`PlayerInput` умеет автоматически переключать схему, когда игрок нажимает
кнопку на другом устройстве. В Inspector есть параметр **Auto-Switch**.

В коде текущую схему можно прочитать:

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class SchemeDebug : MonoBehaviour
{
    [SerializeField] private PlayerInput _playerInput;

    private void Update()
    {
        if (_playerInput != null)
        {
            Debug.Log($"Схема: {_playerInput.currentControlScheme}");
        }
    }
}
```

Для UI-подсказок удобно хранить тексты для каждой схемы и переключать их при
смене устройства.

## Подсказки управления

Пример:

```csharp
private void ShowHint(string scheme)
{
    _hintText.text = scheme switch
    {
        "Gamepad" => "A — прыжок",
        "Keyboard&Mouse" => "Space — прыжок",
        "Touch" => "Кнопка на экране — прыжок",
        _ => "Прыжок"
    };
}
```

## Частые ошибки

- **Все привязки без схем.** Игрок видит подсказки не для своего устройства.
- **Схема создана, но не назначена привязкам.** Она не работает.
- **Путают Control Scheme и Action Map.** Схема — устройства, карта — контекст
  действий.
- **Забывают про мышь.** Для обзора камеры нужны и клавиатура, и мышь.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что описывает Control Scheme?",
  "options": [
    {
      "text": "Набор устройств для привязок",
      "correct": true,
      "explanation": "Например, Keyboard&Mouse или Gamepad."
    },
    {
      "text": "Группу действий игрока",
      "correct": false,
      "explanation": "Это Action Map."
    },
    {
      "text": "Настройки физики",
      "correct": false,
      "explanation": "Control Scheme не связан с физикой."
    }
  ],
  "explanation": "Control Scheme говорит, для каких устройств предназначены привязки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Зачем нужны control schemes?",
  "options": [
    {
      "text": "Показывать подсказки под устройство",
      "correct": true
    },
    {
      "text": "Поддерживать клавиатуру и геймпад",
      "correct": true
    },
    {
      "text": "Автоматически переключаться между устройствами",
      "correct": true
    },
    {
      "text": "Заменять Action Map",
      "correct": false,
      "explanation": "Это разные сущности: устройства и контекст действий."
    }
  ],
  "explanation": "Схемы помогают разным устройствам работать предсказуемо."
}
```

## Куда дальше

- [ReadValue и Callbacks](theme.html?path=content/unity/vvod-input-system/readvalue-i-callbacks.md)
- [PlayerInput и события](theme.html?path=content/unity/vvod-input-system/playerinput-i-sobytiya.md)
- [Практика: управление](theme.html?path=content/unity/vvod-input-system/praktika-upravlenie.md)
