---
title: UI Input и touch
description: InputSystemUIInputModule, UI Action Map, OnScreenStick и OnScreenButton для мыши, геймпада и touch.
keywords: Unity UI Input, InputSystemUIInputModule, EventSystem, OnScreenStick, OnScreenButton, Touchscreen, UI Action Map

---

# UI Input и touch

UI в Unity тоже использует ввод. С новым Input System стандартный
`StandaloneInputModule` заменяется на **InputSystemUIInputModule**.

## EventSystem

У любого Canvas с интерактивными элементами есть `EventSystem`. Именно он
передаёт клики, навигацию и submit в кнопки и слайдеры.

С новым Input System:

1. Выберите `EventSystem`.
2. Убедитесь, что на нём есть `InputSystemUIInputModule`.
3. Назначьте **Actions Asset**.
4. Выберите **UI Action Map**.

Если вместо нового модуля стоит `StandaloneInputModule`, UI может не работать
при Active Input Handling = New.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/vvod-input-system/ui-input-module.png"
    alt="Компонент InputSystemUIInputModule в Unity"
    width="900"
  >
  <figcaption>
    `InputSystemUIInputModule` передаёт ввод в EventSystem и UI.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/Packages/com.unity.inputsystem@1.11/manual/UISupport.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — UI Support
    </a>
  </figcaption>
</figure>

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/vvod-input-system/ui-action-map.png"
    alt="UI Action Map в настройках Input System"
    width="900"
  >
  <figcaption>
    UI Action Map содержит действия для навигации и кликов.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/Packages/com.unity.inputsystem@1.11/manual/UISupport.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — UI Support
    </a>
  </figcaption>
</figure>

## UI Action Map

В ассете действий обычно есть карта `UI` с действиями:

- `Navigate` — перемещение по элементам;
- `Submit` — подтверждение;
- `Cancel` — отмена;
- `Point` — позиция курсора;
- `Click` — клик;
- `ScrollWheel` — прокрутка.

Эти действия можно назначить в `InputSystemUIInputModule`. В Unity 6 модуль
часто уже настроен, в Unity 2022.3 его нередко добавляют вручную.

## OnScreenStick и OnScreenButton

Для мобильных игр есть экранные контролы:

- **OnScreenStick** — виртуальный стик;
- **OnScreenButton** — экранная кнопка.

Они находятся в `UnityEngine.InputSystem.OnScreen` и работают через UI.

```csharp
using UnityEngine;
using UnityEngine.InputSystem.OnScreen;

public class MobileControlsExample : MonoBehaviour
{
    [SerializeField] private OnScreenStick _stick;
    [SerializeField] private OnScreenButton _jumpButton;

    private void OnEnable()
    {
        _jumpButton.onPress.AddListener(OnJumpPressed);
        _jumpButton.onRelease.AddListener(OnJumpReleased);
    }

    private void OnDisable()
    {
        _jumpButton.onPress.RemoveListener(OnJumpPressed);
        _jumpButton.onRelease.RemoveListener(OnJumpReleased);
    }

    private void OnJumpPressed()
    {
        Debug.Log("Прыжок с touch");
    }

    private void OnJumpReleased()
    {
        Debug.Log("Кнопка отпущена");
    }
}
```

`OnScreenStick` сам генерирует значение для действия, если указать **Control
Path** и **Action**.

## Touchscreen

Для прямого чтения касаний есть `Touchscreen.current`:

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class TouchExample : MonoBehaviour
{
    private void Update()
    {
        if (Touchscreen.current == null)
        {
            return;
        }

        var primary = Touchscreen.current.primaryTouch;
        if (primary.press.isPressed)
        {
            Vector2 position = primary.position.ReadValue();
            Debug.Log($"Касание: {position}");
        }
    }
}
```

Для сложных жестов лучше использовать `EnhancedTouch` или экранные контролы,
а не читать сырые касания в каждом скрипте.

## Версии Unity

- **Unity 6** — новый Input System основной; UI-модуль обычно уже используется.
- **Unity 2022.3** — Input System 1.7+; `InputSystemUIInputModule` часто нужно
  добавить и настроить вручную.

## Частые ошибки

- **В EventSystem остался `StandaloneInputModule`.** UI не реагирует на новый
  ввод.
- **Не назначен UI Action Map.** Кнопки не получают Submit/Click.
- **OnScreenStick без Control Path.** Стик не знает, какое действие двигать.
- **Читают Touchscreen в нескольких скриптах.** Легко получить конфликт
  обработки.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой модуль нужен EventSystem для нового Input System?",
  "options": [
    {
      "text": "`InputSystemUIInputModule`",
      "correct": true,
      "explanation": "Он передаёт ввод нового Input System в UI."
    },
    {
      "text": "`StandaloneInputModule`",
      "correct": false,
      "explanation": "Это модуль старого Input Manager."
    },
    {
      "text": "`CanvasScaler`",
      "correct": false,
      "explanation": "`CanvasScaler` масштабирует Canvas, а не обрабатывает ввод."
    }
  ],
  "explanation": "Для нового Input System UI использует `InputSystemUIInputModule`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про UI Input и touch?",
  "options": [
    {
      "text": "`OnScreenStick` — экранный стик",
      "correct": true
    },
    {
      "text": "`OnScreenButton` — экранная кнопка",
      "correct": true
    },
    {
      "text": "UI Action Map содержит Navigate, Submit, Cancel",
      "correct": true
    },
    {
      "text": "`StandaloneInputModule` — часть нового Input System",
      "correct": false,
      "explanation": "Это модуль старого ввода."
    }
  ],
  "explanation": "Экранные контролы и UI Action Map — основа мобильного UI."
}
```

## Куда дальше

- [Ввод: Input System: итог](theme.html?path=content/unity/vvod-input-system/itog-vvod-input-system.md)
- [Практика: управление](theme.html?path=content/unity/vvod-input-system/praktika-upravlenie.md)
- [Project-wide Actions](theme.html?path=content/unity/vvod-input-system/project-wide-actions.md)
