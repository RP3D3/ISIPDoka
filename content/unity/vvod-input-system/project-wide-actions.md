---
title: Project-wide Actions
description: Общий Input Actions asset проекта в Unity 6, InputSystem.actions и отличия от обычного ассета.
keywords: Unity Project-wide Actions, InputSystem.actions, Unity 6, Input System, project settings, действия проекта

---

# Project-wide Actions

В Unity 6 появился общий набор действий проекта — **Project-wide Actions**. Он
доступен через `InputSystem.actions` и не требует назначать ассет в каждый
`PlayerInput`.

## Что это

Обычно `.inputactions` asset назначают в компонент `PlayerInput` или в поле
скрипта. Project-wide Actions — это один ассет, который Unity считает общим для
всего проекта.

Он удобен для:

- прототипов;
- UI-навигации;
- простых игр с одним игроком;
- быстрого доступа к действиям без ссылок.

## Настройка

1. Откройте **Project Settings → Input System Package**.
2. Найдите **Project-wide Actions**.
3. Создайте или назначьте `.inputactions` asset.
4. Откройте ассет и настройте карты и действия.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/vvod-input-system/input-actions-asset.png"
    alt="Project-wide Input Actions asset в настройках Unity"
    width="371"
  >
  <figcaption>
    Project-wide Actions — общий ассет действий проекта.
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

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/vvod-input-system/project-actions.png"
    alt="Project Settings Input System Package с настройкой Project-wide Actions"
    width="900"
  >
  <figcaption>
    Project-wide Actions назначаются в настройках пакета Input System.
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

## Использование в коде

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class ProjectActionsExample : MonoBehaviour
{
    private InputAction _move;

    private void Awake()
    {
        _move = InputSystem.actions.FindAction("Player/Move");
    }

    private void OnEnable()
    {
        _move?.Enable();
    }

    private void OnDisable()
    {
        _move?.Disable();
    }

    private void Update()
    {
        if (_move == null)
        {
            return;
        }

        Vector2 value = _move.ReadValue<Vector2>();
        transform.Translate(new Vector3(value.x, 0f, value.y) * Time.deltaTime);
    }
}
```

`InputSystem.actions` может быть `null`, если Project-wide Actions не назначены.
Всегда проверяйте это.

## Версии Unity

- **Unity 6** — Project-wide Actions стабильны и являются основным путём для
  простых проектов.
- **Unity 2022.3** — Project-wide Actions появились в Input System 1.7, но были
  предварительными. Основной путь — обычный `.inputactions` asset и
  `PlayerInput` / `InputActionReference`.

Если проект должен работать в обеих версиях, используйте обычный asset и
передавайте ссылки через Inspector.

## Project-wide или обычный asset

| Ситуация | Что выбрать |
|---|---|
| Один игрок, быстрый прототип | Project-wide Actions |
| Несколько игроков | обычный asset + `PlayerInput` |
| Нужно несколько наборов управления | обычные assets |
| Поддержка 2022.3 без сюрпризов | обычный asset |
| UI и общие действия | Project-wide Actions удобны |

## Частые ошибки

- **`InputSystem.actions` равен `null`.** Ассет не назначен в Project Settings.
- **Действие не включено.** Нужно вызвать `Enable` у действия или карты.
- **Путают Project-wide Actions и `PlayerInput`.** Это разные способы
  подключения.
- **Ожидают стабильности в 2022.3.** Там механизм был предварительным.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где назначаются Project-wide Actions?",
  "options": [
    {
      "text": "В Project Settings → Input System Package",
      "correct": true,
      "explanation": "Там выбирается общий ассет действий."
    },
    {
      "text": "В компоненте Transform",
      "correct": false,
      "explanation": "Transform не связан с вводом."
    },
    {
      "text": "В окне Console",
      "correct": false,
      "explanation": "Console — для логов."
    }
  ],
  "explanation": "Project-wide Actions — настройка проекта."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Project-wide Actions?",
  "options": [
    {
      "text": "Доступны через `InputSystem.actions`",
      "correct": true
    },
    {
      "text": "Стабильны в Unity 6",
      "correct": true
    },
    {
      "text": "В 2022.3 были предварительными",
      "correct": true
    },
    {
      "text": "Обязательны для любого проекта",
      "correct": false,
      "explanation": "Можно использовать обычный `.inputactions` asset."
    }
  ],
  "explanation": "Project-wide Actions удобны, но не обязательны."
}
```

## Куда дальше

- [UI Input и touch](theme.html?path=content/unity/vvod-input-system/ui-input-i-touch.md)
- [Generated C# class и Asset](theme.html?path=content/unity/vvod-input-system/generated-csharp-class.md)
- [Практика: управление](theme.html?path=content/unity/vvod-input-system/praktika-upravlenie.md)
