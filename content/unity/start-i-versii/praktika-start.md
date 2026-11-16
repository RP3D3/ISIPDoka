---
title: Практика: первый проект
description: Создаём первый Unity-проект, сцену, куб, материал и скрипт вращения.
keywords: Unity практика, первый проект Unity, создать сцену, материал, скрипт Rotator, Play mode

---

# Практика: первый проект

Соберём маленькую сцену, чтобы пройти весь путь: проект → сцена → объекты →
материал → скрипт → Play. Это ещё не игра, но уже рабочий Unity-проект.

## Что нужно сделать

1. Создать проект `UnityCourse` на Unity 6 LTS с шаблоном **Universal 3D** или
   **3D (URP)**.
2. Сохранить сцену как `FirstScene` в папке `Assets/Scenes`.
3. Добавить на сцену куб, сферу и плоскость, расставить их.
4. Создать материал и покрасить куб.
5. Написать скрипт `Rotator`, повесить его на куб и проверить вращение в Play.

## Решение 1. Проект

1. Откройте Unity Hub → **New project**.
2. Выберите **Universal 3D** (Unity 6) или **3D (URP)** (2022.3).
3. Имя проекта: `UnityCourse`.
4. Путь: без кириллицы, например `D:\Unity\UnityCourse`.
5. Нажмите **Create project** и дождитесь импорта.

## Решение 2. Сцена

1. В Project откройте `Assets/Scenes`.
2. Нажмите `Ctrl + S` или **File → Save**.
3. Назовите сцену `FirstScene`.
4. Убедитесь, что файл появился в `Assets/Scenes/FirstScene.unity`.

## Решение 3. Объекты

1. В Hierarchy нажмите правой кнопкой → **3D Object → Cube**.
2. Добавьте **3D Object → Sphere**.
3. Добавьте **3D Object → Plane**.
4. Поставьте куб над плоскостью, сферу — рядом.
5. В Inspector у куба выставьте `Transform.Position`: например, `(0, 0.5, 0)`.

Если объект «утопает» в плоскости, поднимите его по `Y` на половину высоты.

## Решение 4. Материал

1. В Project создайте папку `Assets/Materials`.
2. Правой кнопкой → **Create → Material**.
3. Назовите материал `Red`.
4. В Inspector выберите цвет `Base Map` — красный.
5. Перетащите материал из Project на куб в Scene или Hierarchy.

Если куб остался серым, проверьте, что материал назначен в `MeshRenderer` →
`Materials`.

## Решение 5. Скрипт Rotator

Создайте в `Assets/Scripts` файл `Rotator.cs`:

```csharp
using UnityEngine;

public class Rotator : MonoBehaviour
{
    [SerializeField] private float _speed = 90f;

    private void Update()
    {
        transform.Rotate(0f, _speed * Time.deltaTime, 0f);
    }
}
```

Затем:

1. Перетащите `Rotator.cs` на куб в Hierarchy.
2. В Inspector у компонента `Rotator` выставьте `Speed`, например `90`.
3. Нажмите **Play**.
4. Куб должен вращаться вокруг оси `Y`.

Остановите Play. Изменения, сделанные во время Play, откатятся — это нормально.

## Что должно получиться

- проект открывается без ошибок;
- сцена `FirstScene` сохранена;
- на сцене есть куб, сфера и плоскость;
- куб красный;
- в Play куб вращается;
- в Console нет красных ошибок.

## Частые ошибки

- **Сцена не сохранилась.** Проверьте звёздочку рядом с именем сцены и путь
  `Assets/Scenes`.
- **Скрипт не добавляется.** Имя файла должно совпадать с именем класса:
  `Rotator.cs` → `public class Rotator`.
- **Куб не вращается.** Проверьте, что компонент `Rotator` висит именно на кубе,
  а не на камере.
- **Материал не применяется.** Перетащите его на объект или в слот `Materials`
  у `MeshRenderer`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где обычно лежат сцены Unity?",
  "options": [
    {
      "text": "В `Assets/Scenes`",
      "correct": true,
      "explanation": "Это стандартная папка для сцен."
    },
    {
      "text": "В `Library`",
      "correct": false,
      "explanation": "`Library` — служебный кэш."
    },
    {
      "text": "В `ProjectSettings`",
      "correct": false,
      "explanation": "Там настройки проекта, а не сцены."
    }
  ],
  "explanation": "Сцены — обычные ассеты в `Assets`, чаще всего в `Assets/Scenes`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно, чтобы куб вращался?",
  "options": [
    {
      "text": "Скрипт с `Update` и `transform.Rotate`",
      "correct": true
    },
    {
      "text": "Компонент скрипта на кубе",
      "correct": true
    },
    {
      "text": "Обязательный `Rigidbody` на кубе",
      "correct": false,
      "explanation": "Для вращения через `Transform` физика не нужна."
    },
    {
      "text": "Запуск Play mode",
      "correct": true
    }
  ],
  "explanation": "Достаточно скрипта на объекте и режима Play; Rigidbody не обязателен."
}
```

## Куда дальше

- [Сцена, GameObject и компонент](theme.html?path=content/unity/start-i-versii/scena-gameobject-component.md)
- [Папка Assets и метаданные](theme.html?path=content/unity/start-i-versii/papka-assets-i-metadannye.md)
- [Окна редактора](theme.html?path=content/unity/start-i-versii/okna-redaktora.md)
