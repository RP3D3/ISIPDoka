---
title: Generated C# class и Asset
description: Генерация C#-класса из Input Actions asset, работа с InputActionAsset и типизированными действиями.
keywords: Unity Input System, Generate C# Class, InputActionAsset, FindAction, PlayerControls, InputActionReference

---

# Generated C# class и Asset

Input Actions asset можно использовать по-разному: через `InputActionReference`,
через `PlayerInput` или через **сгенерированный C#-класс**. Последний вариант
даёт типизированный доступ к действиям и картам.

## Генерация класса

1. Выберите `.inputactions` asset в Project.
2. В Inspector включите **Generate C# Class**.
3. Укажите имя класса, например `PlayerControls`.
4. Нажмите **Apply**.
5. Рядом появится `.cs`-файл.

Не редактируйте сгенерированный файл вручную: при следующей генерации изменения
потеряются. Лучше обернуть его в свой класс.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/vvod-input-system/input-actions-menu.png"
    alt="Меню Input Actions asset с генерацией C# класса"
    width="790"
  >
  <figcaption>
    В меню ассета можно сгенерировать C#-класс и открыть настройки.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/Packages/com.unity.inputsystem@1.11/manual/ProjectWideActions.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Project-wide Actions
    </a>
  </figcaption>
</figure>

## Использование

Если в asset есть Action Map `Player` и действия `Move`, `Jump`, сгенерированный
класс обычно выглядит так:

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class GeneratedInputExample : MonoBehaviour
{
    private PlayerControls _controls;

    private void Awake()
    {
        _controls = new PlayerControls();
    }

    private void OnEnable()
    {
        _controls.Player.Enable();
        _controls.Player.Jump.performed += OnJump;
    }

    private void OnDisable()
    {
        _controls.Player.Jump.performed -= OnJump;
        _controls.Player.Disable();
    }

    private void Update()
    {
        Vector2 move = _controls.Player.Move.ReadValue<Vector2>();
        transform.Translate(new Vector3(move.x, 0f, move.y) * Time.deltaTime);
    }

    private void OnJump(InputAction.CallbackContext context)
    {
        Debug.Log("Прыжок");
    }
}
```

Имена свойств зависят от имён Action Map и Action. Если переименовать действие,
сгенерированный класс изменится.

## InputActionAsset

Если класс не генерировать, можно работать с `InputActionAsset` напрямую:

```csharp
[SerializeField] private InputActionAsset _actions;

private InputAction _move;

private void Awake()
{
    _move = _actions.FindAction("Player/Move");
}

private void OnEnable()
{
    _move.Enable();
}

private void OnDisable()
{
    _move.Disable();
}
```

`FindAction` ищет действие по пути `Map/Action`. Если действие не найдено,
вернётся `null` или будет исключение — зависит от перегрузки.

## Что выбрать

| Ситуация | Подход |
|---|---|
| Простой прототип | `PlayerInput` |
| Несколько действий в одном скрипте | `InputActionReference` |
| Большой проект | сгенерированный класс |
| Динамическая загрузка ассета | `InputActionAsset.FindAction` |

## Частые ошибки

- **Правят сгенерированный файл.** Изменения потеряются.
- **Переименовали действие и не перегенерировали класс.** Старое имя не
  компилируется.
- **Забывают `Enable`.** Действия не работают.
- **Путают `PlayerControls` и `.inputactions`.** Первое — C#-обёртка, второе —
  ассет.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает Generate C# Class?",
  "options": [
    {
      "text": "Создаёт C#-обёртку над Input Actions asset",
      "correct": true,
      "explanation": "Класс даёт типизированный доступ к картам и действиям."
    },
    {
      "text": "Удаляет старый Input Manager",
      "correct": false,
      "explanation": "Это настройка Active Input Handling."
    },
    {
      "text": "Создаёт Rigidbody",
      "correct": false,
      "explanation": "Генерация класса не связана с физикой."
    }
  ],
  "explanation": "Сгенерированный класс — удобная обёртка над ассетом."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про InputActionAsset?",
  "options": [
    {
      "text": "Это ассет `.inputactions`",
      "correct": true
    },
    {
      "text": "`FindAction` ищет действие по пути `Map/Action`",
      "correct": true
    },
    {
      "text": "Его можно назначить в Inspector",
      "correct": true
    },
    {
      "text": "Его нужно редактировать вручную в сгенерированном C#",
      "correct": false,
      "explanation": "Сгенерированный файл не редактируют вручную."
    }
  ],
  "explanation": "Ассет хранит действия, а `FindAction` даёт к ним доступ."
}
```

## Куда дальше

- [Project-wide Actions](theme.html?path=content/unity/vvod-input-system/project-wide-actions.md)
- [PlayerInput и события](theme.html?path=content/unity/vvod-input-system/playerinput-i-sobytiya.md)
- [Практика: управление](theme.html?path=content/unity/vvod-input-system/praktika-upravlenie.md)
