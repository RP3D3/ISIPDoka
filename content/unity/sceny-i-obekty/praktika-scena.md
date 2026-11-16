---
title: Практика: сцена
description: Собираем сцену с иерархией, префабом, тегами и слоями, проверяем локальные координаты.
keywords: Unity практика, сцена, иерархия, префаб, теги, слои, localPosition, SetParent

---

# Практика: сцена

Соберём небольшую сцену, где объекты связаны иерархией, один объект является
префабом, а теги и слои помогают логике. Это упражнение на всё, что мы прошли.

## Что нужно сделать

1. Создать сцену `ObjectsScene` и сохранить её в `Assets/Scenes`.
2. Собрать иерархию `Player → Camera`, `Player → Weapon → Muzzle`.
3. Сделать префаб `Weapon` и поставить два экземпляра.
4. Назначить тег `Player` игроку и слой `Ignore Raycast` для `Muzzle`.
5. Проверить в коде, что `Muzzle` правильно считает мировую позицию.

## Решение 1. Сцена

1. В Project откройте `Assets/Scenes`.
2. Нажмите **File → New Scene** или `Ctrl + N`.
3. Сохраните как `ObjectsScene` через `Ctrl + S`.
4. Убедитесь, что файл лежит в `Assets/Scenes/ObjectsScene.unity`.

## Решение 2. Иерархия

1. Создайте пустой объект `Player` (**GameObject → Create Empty**).
2. Перетащите `Main Camera` внутрь `Player`.
3. Создайте пустой объект `Weapon` и сделайте его дочерним у `Player`.
4. Создайте пустой объект `Muzzle` и сделайте его дочерним у `Weapon`.
5. Выставьте `Weapon.localPosition`, например `(0.5, 1, 0)`.
6. Выставьте `Muzzle.localPosition`, например `(0, 0, 1)`.

Теперь при перемещении `Player` двигаются камера, оружие и точка выстрела.

## Решение 3. Префаб

1. Настройте `Weapon`: добавьте куб или модель.
2. Перетащите `Weapon` из Hierarchy в `Assets/Prefabs`.
3. Убедитесь, что объект на сцене стал экземпляром префаба.
4. Перетащите префаб ещё раз на сцену — появится второй экземпляр.
5. Измените цвет одного экземпляра и посмотрите, что второй не изменился.

## Решение 4. Теги и слои

1. Выберите `Player`.
2. В Inspector откройте `Tag` → **Add Tag** и создайте `Player`.
3. Назначьте тег `Player`.
4. Выберите `Muzzle`.
5. В `Layer` выберите `Ignore Raycast`.

Проверка в коде:

```csharp
using UnityEngine;

public class MuzzleCheck : MonoBehaviour
{
    [SerializeField] private Transform _muzzle;

    private void Start()
    {
        if (_muzzle == null)
        {
            Debug.LogError("Muzzle не назначен");
            return;
        }

        Debug.Log($"Muzzle world position: {_muzzle.position}");
        Debug.Log($"Muzzle local position: {_muzzle.localPosition}");
    }
}
```

Повесьте скрипт на `Player` и перетащите `Muzzle` в поле `_muzzle`.

## Решение 5. Проверка

1. Переместите `Player` в Scene.
2. Убедитесь, что `Muzzle` двигается вместе с ним.
3. Поверните `Player` — `Muzzle` должен повернуться вокруг родителя.
4. Посмотрите в Console: мировые и локальные координаты различаются.
5. Остановите Play: изменения, сделанные в Play, откатятся.

## Что должно получиться

- сцена `ObjectsScene` сохранена;
- `Player` — родитель камеры и оружия;
- `Weapon` — префаб с двумя экземплярами;
- у `Player` тег `Player`;
- `Muzzle` на слое `Ignore Raycast`;
- в Console выводятся позиции `Muzzle`.

## Частые ошибки

- **Камера не двигается.** Проверьте, что она действительно дочерняя у `Player`.
- **Префаб не создался.** Перетаскивайте объект в папку `Assets/Prefabs`, а не
  в пустое место.
- **Тег не находится.** Тег нужно сначала добавить в **Add Tag**.
- **Слой не влияет на raycast.** Проверьте `LayerMask` в скрипте или в
  настройках raycast.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как сделать `Weapon` дочерним у `Player`?",
  "options": [
    {
      "text": "Перетащить `Weapon` на `Player` в Hierarchy",
      "correct": true,
      "explanation": "Перетаскивание в Hierarchy создаёт родительскую связь."
    },
    {
      "text": "Переименовать `Weapon` в `Player`",
      "correct": false,
      "explanation": "Имя не создаёт иерархию."
    },
    {
      "text": "Добавить `Weapon` компонентом на `Player`",
      "correct": false,
      "explanation": "GameObject нельзя добавить компонентом."
    }
  ],
  "explanation": "Родительская связь задаётся в Hierarchy или через `SetParent`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что проверить после сборки сцены?",
  "options": [
    {
      "text": "`Muzzle` двигается вместе с `Player`",
      "correct": true
    },
    {
      "text": "У `Player` назначен тег `Player`",
      "correct": true
    },
    {
      "text": "`Muzzle` находится на нужном слое",
      "correct": true
    },
    {
      "text": "Все объекты имеют компонент `Rigidbody`",
      "correct": false,
      "explanation": "Rigidbody нужен только объектам с физикой."
    }
  ],
  "explanation": "Проверяем иерархию, теги, слои и отсутствие ошибок в Console."
}
```

## Куда дальше

- [Сцены и объекты: итог](theme.html?path=content/unity/sceny-i-obekty/itog-sceny-i-obekty.md)
- [GameObjects и компоненты](theme.html?path=content/unity/sceny-i-obekty/gameobject-i-component.md)
- [Префабы](theme.html?path=content/unity/sceny-i-obekty/prefaby.md)
