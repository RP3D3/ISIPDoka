---
title: Input System и project-wide actions
description: Перенос ввода на Unity 6: версии пакета, asset-based workflow и Project-wide Actions.
keywords: Unity миграция Input System, Project-wide Actions, InputSystem.actions, InputActionReference, Unity 6

---

# Input System и project-wide actions

Input System в 2022.3 и Unity 6 работает похоже, но Project-wide Actions в
Unity 6 стали стабильными, а версии пакета отличаются.

## Версии

- **Unity 2022.3 LTS** — Input System 1.7+; Project-wide Actions были
  предварительными.
- **Unity 6** — Input System 1.11+; Project-wide Actions стабильны.

Если проект должен работать в обеих версиях, используйте обычный
`.inputactions` asset и `InputActionReference` / `PlayerInput`.

## Asset-based workflow

Это общий путь для обеих версий:

1. Создайте `.inputactions` asset.
2. Настройте Action Maps и Bindings.
3. Назначьте asset в `PlayerInput` или ссылки в скрипт.
4. Включайте и выключайте действия в `OnEnable` / `OnDisable`.

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class InputCompat : MonoBehaviour
{
    [SerializeField] private InputActionReference _move;

    private void OnEnable()
    {
        _move.action.Enable();
    }

    private void OnDisable()
    {
        _move.action.Disable();
    }

    private void Update()
    {
        Vector2 value = _move.action.ReadValue<Vector2>();
        transform.Translate(new Vector3(value.x, 0f, value.y) * Time.deltaTime);
    }
}
```

## Project-wide Actions

В Unity 6:

```csharp
InputAction move = InputSystem.actions.FindAction("Player/Move");
move.Enable();
```

В 2022.3 этот путь был предварительным. Для переносимого проекта лучше не
строить всю архитектуру на `InputSystem.actions`.

## UI Input

- **Unity 6** — новый Input System основной; `InputSystemUIInputModule` обычно
  уже используется.
- **2022.3** — модуль часто добавляют вручную.

При миграции проверьте EventSystem: `StandaloneInputModule` не работает с
Active Input Handling = New.

## Чек-лист

- [ ] Пакет Input System установлен.
- [ ] Active Input Handling = New или Both.
- [ ] EventSystem использует `InputSystemUIInputModule`.
- [ ] Все действия включаются и выключаются.
- [ ] Нет старого `Input.GetAxis`, если выбран только New.
- [ ] Project-wide Actions не используются в 2022.3 без необходимости.

## Частые ошибки

- **Оставили `StandaloneInputModule`.** UI не реагирует.
- **Не включили действия.** `ReadValue` возвращает ноль.
- **Строят проект на Project-wide Actions, а нужна 2022.3.** Механизм там
  предварительный.
- **Забыли перезапустить редактор после смены Active Input Handling.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что стабильно в Unity 6, но было предварительным в 2022.3?",
  "options": [
    {
      "text": "Project-wide Actions",
      "correct": true,
      "explanation": "В Unity 6 они стабильны."
    },
    {
      "text": "Rigidbody2D",
      "correct": false,
      "explanation": "Физика 2D существует в обеих версиях."
    },
    {
      "text": "Canvas",
      "correct": false,
      "explanation": "Canvas не связан с Input System."
    }
  ],
  "explanation": "Project-wide Actions — ключевое отличие версий ввода."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что проверить при миграции ввода?",
  "options": [
    {
      "text": "Active Input Handling",
      "correct": true
    },
    {
      "text": "EventSystem и InputSystemUIInputModule",
      "correct": true
    },
    {
      "text": "Включение действий",
      "correct": true
    },
    {
      "text": "Удалить все `.inputactions`",
      "correct": false,
      "explanation": "Ассеты действий нужны."
    }
  ],
  "explanation": "Ввод мигрирует через пакет, настройки и UI-модуль."
}
```

## Куда дальше

- [FindObjectOfType и другие API](theme.html?path=content/unity/versii-i-migraciya/find-api.md)
- [Пакеты, URP и TMP](theme.html?path=content/unity/versii-i-migraciya/pakety-urp-tmp.md)
- [Матрица API 2022.3 и Unity 6](theme.html?path=content/unity/versii-i-migraciya/matrica-api.md)
