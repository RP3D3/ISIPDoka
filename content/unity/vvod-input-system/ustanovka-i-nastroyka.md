---
title: Установка и настройка
description: Устанавливаем Input System через Package Manager, включаем новый ввод и создаём первый Input Actions asset.
keywords: Unity Input System установка, Package Manager, com.unity.inputsystem, Input Actions asset, Active Input Handling

---

# Установка и настройка

Input System — отдельный пакет. Пока он не установлен, классы
`UnityEngine.InputSystem` недоступны, а старый `Input` продолжает работать.

## Установка

1. Откройте **Window → Package Manager**.
2. Нажмите **+ → Add package by name**.
3. Введите `com.unity.inputsystem`.
4. Дождитесь установки.
5. Если Unity предложит перезапустить редактор — согласитесь.

Версии:

- Unity 2022.3 LTS — Input System 1.7+;
- Unity 6 — Input System 1.11+ (точная версия зависит от редактора).

Не гонитесь за самой новой версией: берите ту, что совместима с вашей Unity.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/vvod-input-system/input-system-package.png"
    alt="Пакет Input System в Unity Package Manager"
    width="744"
  >
  <figcaption>
    Input System устанавливается как пакет Unity.
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

## Включение нового ввода

После установки:

1. Откройте **Project Settings → Player → Other Settings**.
2. Найдите **Active Input Handling**.
3. Выберите **Input System Package (New)** или **Both**.
4. Перезапустите редактор.

`Both` удобен на время миграции: старый `Input` и новый Input System работают
одновременно. Для нового проекта обычно достаточно `New`.

## Первый Input Actions asset

1. В Project создайте папку `Assets/Input`.
2. Правой кнопкой → **Create → Input Actions**.
3. Назовите файл `PlayerControls`.
4. Откройте ассет двойным щелчком.
5. Создайте Action Map `Player`.
6. Добавьте Action `Move` с типом **Value** и Control Type **Vector2**.
7. Добавьте Action `Jump` с типом **Button**.

Ассет `.inputactions` — это JSON-файл с картами действий, привязками и control
schemes. Его можно редактировать в окне Input Actions или в текстовом виде.

## Настройки пакета

В **Project Settings → Input System Package** есть:

- **Update Mode** — когда обновляется ввод;
- **Background Behavior** — что делать при потере фокуса;
- **Play Mode Input Behavior** — как вести себя при входе в Play;
- **Project-wide Actions** — общий ассет действий (в Unity 6).

Для первого проекта оставьте значения по умолчанию.

## Частые ошибки

- **Пакет не установлен, а код уже использует `InputAction`.** Будет ошибка
  компиляции.
- **Выбран только New, но остался старый код.** `Input.GetAxis` перестанет
  компилироваться.
- **Ассет создан, но действия не включены.** Для `InputAction` нужно вызвать
  `Enable` или включить action map.
- **Путают `.inputactions` и сгенерированный C#-класс.** Это разные ассеты.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как установить Input System?",
  "options": [
    {
      "text": "Через Package Manager по имени `com.unity.inputsystem`",
      "correct": true,
      "explanation": "Это официальный пакет Unity."
    },
    {
      "text": "Скопировать папку в `Library`",
      "correct": false,
      "explanation": "`Library` — кэш, пакеты так не ставят."
    },
    {
      "text": "Включить галочку в Transform",
      "correct": false,
      "explanation": "Transform не связан с пакетами."
    }
  ],
  "explanation": "Input System ставится через Package Manager."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно сделать после установки пакета?",
  "options": [
    {
      "text": "Выбрать Active Input Handling",
      "correct": true
    },
    {
      "text": "Перезапустить редактор, если Unity попросит",
      "correct": true
    },
    {
      "text": "Создать Input Actions asset",
      "correct": true
    },
    {
      "text": "Удалить папку `ProjectSettings`",
      "correct": false,
      "explanation": "`ProjectSettings` хранит настройки проекта, её нельзя удалять."
    }
  ],
  "explanation": "Пакет, режим ввода и ассет действий — три шага настройки."
}
```

## Куда дальше

- [Actions, Action Maps, Bindings](theme.html?path=content/unity/vvod-input-system/actions-action-maps-bindings.md)
- [Старый и новый Input](theme.html?path=content/unity/vvod-input-system/staryy-i-novyy-input.md)
- [Практика: управление](theme.html?path=content/unity/vvod-input-system/praktika-upravlenie.md)
