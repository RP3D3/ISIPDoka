---
title: Ввод: Input System
description: Итог группы: действия, карты, привязки, control schemes, callbacks, PlayerInput и Project-wide Actions.
keywords: Unity Input System итог, Input Action, Action Map, Binding, Control Scheme, PlayerInput, Project-wide Actions

---

# Ввод: Input System

Мы прошли путь от установки пакета до UI и touch. Теперь ввод можно описывать
действиями, а не разрозненными проверками клавиш.

## Что теперь должно быть понятно

- **Action** — смысл действия, **Binding** — конкретный контрол.
- **Action Map** группирует действия и позволяет переключать контекст.
- **Control Scheme** описывает устройства: Keyboard&Mouse, Gamepad, Touch.
- `ReadValue<T>` — опрос, callbacks — реакция на `started/performed/canceled`.
- `PlayerInput` связывает ассет с GameObject и умеет переключать карты.
- Сгенерированный C#-класс даёт типизированный доступ к действиям.
- **Project-wide Actions** стабильны в Unity 6, в 2022.3 были предварительными.
- Для UI нужен `InputSystemUIInputModule`.
- Для touch есть `OnScreenStick`, `OnScreenButton` и `Touchscreen`.

## Мини-таблица

| Вопрос | Ответ |
|---|---|
| Где установить пакет? | Package Manager → `com.unity.inputsystem` |
| Где включить новый ввод? | Player → Active Input Handling |
| Что такое Action? | Смысл: Move, Jump, Fire |
| Что такое Binding? | Клавиша, кнопка или стик |
| Как читать значение? | `action.ReadValue<T>()` |
| Как поймать нажатие? | `action.performed += ...` |
| Как переключить карту? | `PlayerInput.SwitchCurrentActionMap` |
| Где Project-wide Actions? | Project Settings → Input System Package |
| Какой UI-модуль? | `InputSystemUIInputModule` |

## Версии Unity

| Unity 2022.3 LTS | Unity 6 |
|---|---|
| Input System 1.7+ | Input System 1.11+ |
| Project-wide Actions предварительные | Project-wide Actions стабильны |
| UI-модуль часто добавляют вручную | Новый Input System — основной путь |
| Asset-based workflow — база | Project-wide Actions — удобный вариант |

Если проект должен работать в обеих версиях, используйте обычный
`.inputactions` asset, `PlayerInput` и `InputActionReference`.

## Чек-лист

- [ ] Я установил Input System и выбрал Active Input Handling.
- [ ] Я понимаю разницу Action, Action Map и Binding.
- [ ] Я умею настраивать control schemes.
- [ ] Я использую `ReadValue` для движения и callbacks для кнопок.
- [ ] Я включаю и выключаю действия.
- [ ] Я умею переключать Action Map при открытии меню.
- [ ] Я знаю, как подключить UI-модуль.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое Action Map?",
  "options": [
    {
      "text": "Группа действий для контекста",
      "correct": true,
      "explanation": "Например, Player или UI."
    },
    {
      "text": "Привязка к конкретной клавише",
      "correct": false,
      "explanation": "Это Binding."
    },
    {
      "text": "Настройка физики",
      "correct": false,
      "explanation": "Action Map не связан с физикой."
    }
  ],
  "explanation": "Action Map группирует действия и позволяет включать нужный контекст."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Input System?",
  "options": [
    {
      "text": "`ReadValue<T>` читает текущее значение",
      "correct": true
    },
    {
      "text": "`performed` — callback выполнения действия",
      "correct": true
    },
    {
      "text": "`PlayerInput` умеет переключать Action Map",
      "correct": true
    },
    {
      "text": "Для UI всегда нужен `StandaloneInputModule`",
      "correct": false,
      "explanation": "С новым Input System нужен `InputSystemUIInputModule`."
    }
  ],
  "explanation": "Input System строится на действиях, callbacks и картах."
}
```

## Куда дальше

- [Практика: управление](theme.html?path=content/unity/vvod-input-system/praktika-upravlenie.md)
- [Старый и новый Input](theme.html?path=content/unity/vvod-input-system/staryy-i-novyy-input.md)
- [Actions, Action Maps, Bindings](theme.html?path=content/unity/vvod-input-system/actions-action-maps-bindings.md)
