---
title: EventSystem и Input Module
description: Как EventSystem, Input Module и Graphic Raycaster обрабатывают клики, чем отличаются InputSystemUIInputModule и StandaloneInputModule.
keywords: Unity EventSystem, InputSystemUIInputModule, StandaloneInputModule, Graphic Raycaster, UI клики, Input System, Active Input Handling

---

# EventSystem и Input Module

Кнопка сама по себе не узнаёт о клике. В Unity UI события проходят через
несколько компонентов: **EventSystem**, **Input Module** и **Raycaster**.
Если один из них отсутствует или настроен под другой способ ввода, интерфейс
перестаёт реагировать.

## Как проходит клик

Упрощённая цепочка выглядит так:

1. Input Module читает данные мыши, клавиатуры или геймпада.
2. EventSystem получает координаты и состояние кнопок.
3. Raycaster ищет графический элемент под курсором.
4. EventSystem отправляет событие найденному объекту.
5. `Selectable` — например, `Button` — обрабатывает нажатие и вызывает
   `onClick`.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/ui-i-interfeys/eventsystem-flow.svg"
    alt="Схема пути клика: ввод, Input Module, EventSystem, Graphic Raycaster, Button.onClick"
    width="900"
  >
  <figcaption>
    Путь клика по UI: Input Module передаёт данные EventSystem, Raycaster
    находит элемент, а Button вызывает подписанный метод.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/EventSystem.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Event System (схема автора)
    </a>
  </figcaption>
</figure>

## EventSystem

`EventSystem` — менеджер UI-событий на сцене. Обычно на сцене достаточно
одного такого объекта. Он хранит текущий выбранный элемент, обрабатывает
навигацию и знает, какой Input Module использовать.

Создать его можно через **GameObject → UI → Event System**. Если создать
Canvas или первый UI-элемент, Unity часто добавляет EventSystem автоматически.

Полезные возможности:

- `EventSystem.current` — доступ к текущему менеджеру;
- `SetSelectedGameObject` — выбрать кнопку для клавиатуры или геймпада;
- `firstSelectedGameObject` — объект, который выбирается первым;
- `currentInputModule` — активный модуль ввода.

```csharp
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class MenuFocus : MonoBehaviour
{
    [SerializeField] private Button _firstButton;

    private void OnEnable()
    {
        if (EventSystem.current != null)
        {
            EventSystem.current.SetSelectedGameObject(_firstButton.gameObject);
        }
    }
}
```

Выбирать можно только активный объект. Если кнопка выключена, фокус не
перейдёт.

## Input Module

Input Module — компонент на объекте EventSystem. Именно он решает, откуда
берутся нажатия.

| Модуль | С каким вводом работает | Когда используется |
|---|---|---|
| `InputSystemUIInputModule` | новый Input System (`com.unity.inputsystem`) | основной путь в Unity 6 |
| `StandaloneInputModule` | старый Input Manager | старые проекты и Unity 2022.3 |

В **Unity 6** новый Input System — основной путь для новых проектов. В
**Unity 2022.3** чаще встречаются проекты на старом Input Manager, и модуль
иногда добавляют или меняют вручную.

Настройка ввода находится в **Project Settings → Player → Other Settings →
Active Input Handling**:

- `Input Manager (Old)` — только старый ввод;
- `Input System Package (New)` — только новый Input System;
- `Both` — оба варианта.

Если выбран только новый Input System, а на EventSystem стоит
`StandaloneInputModule`, клики могут не работать. И наоборот: при старом
вводе `InputSystemUIInputModule` не получит данные.

Проверить активный модуль можно так:

```csharp
using UnityEngine;
using UnityEngine.EventSystems;

public class InputModuleInfo : MonoBehaviour
{
    private void Start()
    {
        var eventSystem = EventSystem.current;

        if (eventSystem == null)
        {
            Debug.LogWarning("На сцене нет EventSystem");
            return;
        }

        var module = eventSystem.currentInputModule;
        Debug.Log(module != null
            ? $"Input Module: {module.GetType().Name}"
            : "Input Module не назначен");
    }
}
```

## Graphic Raycaster

`Graphic Raycaster` ставится на Canvas и ищет `Graphic`-элементы под
указателем. Без него Canvas рисуется, но клики до кнопок не доходят.

Что проверить:

- на Canvas есть `Graphic Raycaster`;
- у кнопки и её фона включён `Raycast Target`;
- поверх кнопки нет прозрачной картинки, которая перехватывает клик;
- `CanvasGroup` не блокирует raycast случайно.

Для 3D-объектов с коллайдерами используют `PhysicsRaycaster`, для 2D —
`Physics2DRaycaster`. Это отдельные сценарии, не путайте их с UI-кликами.

## Навигация и UI под курсором

Для геймпада и клавиатуры важна навигация `Selectable`. В меню обычно
назначают первую кнопку, а дальше Unity переключает фокус по `Navigation`.

Иногда нужно понять, попал ли клик в интерфейс, а не в игру. Например, в
шутере нельзя стрелять, если курсор над меню.

```csharp
using UnityEngine;
using UnityEngine.EventSystems;

public class ClickGuard : MonoBehaviour
{
    public bool IsPointerOverUi()
    {
        return EventSystem.current != null
            && EventSystem.current.IsPointerOverGameObject();
    }
}
```

Для мыши этого достаточно. Для касаний у метода есть перегрузка с `fingerId`.

## Частые ошибки

- **На сцене нет EventSystem.** Кнопки выглядят рабочими, но не нажимаются.
- **Два EventSystem на сцене.** События обрабатываются непредсказуемо.
- **Модуль не соответствует Active Input Handling.** Клики теряются.
- **На Canvas нет Graphic Raycaster.** UI рисуется, но не принимает ввод.
- **Поверх кнопки лежит невидимая картинка с Raycast Target.** Она
  перехватывает клик.
- **Фокус назначают выключенному объекту.** `SetSelectedGameObject` не
  сработает.
- **Смешивают `Input.GetKeyDown` и новый Input System.** При режиме
  `Input System Package (New)` старый API может выбросить исключение.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой Input Module использовать с новым Input System?",
  "options": [
    {
      "text": "InputSystemUIInputModule",
      "correct": true,
      "explanation": "Этот модуль входит в пакет Input System и работает с новым вводом."
    },
    {
      "text": "StandaloneInputModule",
      "correct": false,
      "explanation": "Он рассчитан на старый Input Manager."
    },
    {
      "text": "Graphic Raycaster",
      "correct": false,
      "explanation": "Это Raycaster на Canvas, а не модуль ввода."
    }
  ],
  "explanation": "Модуль ввода должен соответствовать настройке Active Input Handling."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно для клика по UI?",
  "options": [
    {
      "text": "EventSystem на сцене",
      "correct": true
    },
    {
      "text": "Input Module, соответствующий настройкам ввода",
      "correct": true
    },
    {
      "text": "Graphic Raycaster на Canvas",
      "correct": true
    },
    {
      "text": "Rigidbody на кнопке",
      "correct": false,
      "explanation": "Для UI-кликов Rigidbody не нужен."
    }
  ],
  "explanation": "EventSystem, подходящий Input Module и Graphic Raycaster — минимальный набор для UI-событий."
}
```

## Куда дальше

- [Canvas](theme.html?path=content/unity/ui-i-interfeys/canvas.md)
- [Кнопки и события](theme.html?path=content/unity/ui-i-interfeys/knopki-i-sobytiya.md)
- [Меню и пауза](theme.html?path=content/unity/ui-i-interfeys/menyu-i-pauza.md)
