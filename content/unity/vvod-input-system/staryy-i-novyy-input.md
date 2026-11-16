---
title: Старый и новый Input
description: Чем Input Manager отличается от Input System, как переключить Active Input Handling и что выбрать для нового проекта.
keywords: Unity Input System, Input Manager, Active Input Handling, Input.GetAxis, новый ввод, старый ввод

---

# Старый и новый Input

В Unity есть два способа читать ввод: старый **Input Manager** и новый **Input
System**. Они могут работать одновременно, но смешивать их в одном коде без
необходимости не стоит.

## Старый Input Manager

Старый ввод встроен в Unity и доступен через класс `Input`:

```csharp
float horizontal = Input.GetAxis("Horizontal");
float vertical = Input.GetAxis("Vertical");

if (Input.GetKeyDown(KeyCode.Space))
{
    Jump();
}
```

Плюсы: просто, без пакетов, много старых туториалов.
Минусы: сложнее с gamepad, переназначением, несколькими игроками и touch;
настройки размазаны по Input Manager.

## Новый Input System

Input System — отдельный пакет. Вместо «нажата клавиша W» вы описываете
**действие**: «двигаться», «прыгнуть», «стрелять». Действие привязывается к
клавишам, стикам, кнопкам геймпада и touch.

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class NewInputExample : MonoBehaviour
{
    public void OnMove(InputValue value)
    {
        Vector2 move = value.Get<Vector2>();
        transform.Translate(new Vector3(move.x, 0f, move.y) * Time.deltaTime);
    }
}
```

Плюсы: действия вместо клавиш, переназначение, control schemes, multiplayer,
единый путь для разных устройств.
Минусы: нужно установить пакет и разобраться с ассетом действий.

## Active Input Handling

Режим ввода выбирается в **Project Settings → Player → Other Settings → Active
Input Handling**:

- **Input Manager (Old)** — только старый `Input`;
- **Input System Package (New)** — только новый Input System;
- **Both** — оба, удобно при миграции.

После смены режима Unity попросит перезапустить редактор.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/vvod-input-system/active-input-handling.png"
    alt="Настройка Active Input Handling в Unity Player Settings"
    width="816"
  >
  <figcaption>
    Active Input Handling: старый Input Manager, новый Input System или оба.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/Packages/com.unity.inputsystem@1.11/manual/Installation.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Input System Installation
    </a>
  </figcaption>
</figure>

## Что выбрать

- **Новый проект** — Input System.
- **Старый проект без ввода** — можно мигрировать постепенно через `Both`.
- **Проект на `Input.GetAxis`** — не ломайте всё сразу: сначала оберните ввод в
  один класс, потом замените реализацию.
- **Обучение** — начните с Input System, но понимайте старый `Input`, он ещё
  встречается в туториалах.

## Частые ошибки

- **Включили только New, а код использует `Input.GetAxis`.** Будет ошибка:
  старый API отключён.
- **Забыли перезапустить редактор.** Настройка не применится.
- **Смешивают `Input` и `InputAction` в одном `Update` без плана.** Получается
  два источника истины.
- **Думают, что Input System — это только геймпады.** Он полезен и для
  клавиатуры, мыши, touch и UI.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где выбирается Active Input Handling?",
  "options": [
    {
      "text": "В Project Settings → Player → Other Settings",
      "correct": true,
      "explanation": "Там переключают Old, New или Both."
    },
    {
      "text": "В окне Console",
      "correct": false,
      "explanation": "Console — для логов, а не настроек ввода."
    },
    {
      "text": "В компоненте Transform",
      "correct": false,
      "explanation": "Transform не отвечает за ввод."
    }
  ],
  "explanation": "Режим ввода — настройка проекта, а не компонента."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Input System?",
  "options": [
    {
      "text": "Он работает через действия и привязки",
      "correct": true
    },
    {
      "text": "Он поддерживает несколько устройств и control schemes",
      "correct": true
    },
    {
      "text": "Он требует пакет Input System",
      "correct": true
    },
    {
      "text": "Он полностью заменяет C#",
      "correct": false,
      "explanation": "Ввод — API, логика всё равно пишется на C#."
    }
  ],
  "explanation": "Input System — пакет с действиями, привязками и поддержкой устройств."
}
```

## Куда дальше

- [Установка и настройка](theme.html?path=content/unity/vvod-input-system/ustanovka-i-nastroyka.md)
- [Actions, Action Maps, Bindings](theme.html?path=content/unity/vvod-input-system/actions-action-maps-bindings.md)
- [Практика: управление](theme.html?path=content/unity/vvod-input-system/praktika-upravlenie.md)
