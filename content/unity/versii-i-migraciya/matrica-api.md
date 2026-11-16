---
title: Матрица API 2022.3 и Unity 6
description: Главные отличия Unity 2022.3 LTS и Unity 6: физика, поиск объектов, ввод, пакеты и сборка.
keywords: Unity 2022.3, Unity 6, миграция, матрица API, linearVelocity, FindFirstObjectByType, Build Profiles

---

# Матрица API 2022.3 и Unity 6

Эта тема — карта отличий. Держите её под рукой, когда переносите проект или
смотрите туториал на другую версию.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/versii-i-migraciya/migration-path.svg"
    alt="Схема миграции с Unity 2022.3 на Unity 6"
    width="900"
  >
  <figcaption>
    Перед обновлением фиксируем проект в Git и проверяем ключевые API.
  </figcaption>
</figure>

## Физика

| Unity 2022.3 | Unity 6 |
|---|---|
| `Rigidbody.velocity` | `Rigidbody.linearVelocity` |
| `Rigidbody.drag` | `Rigidbody.linearDamping` |
| `Rigidbody.angularDrag` | `Rigidbody.angularDamping` |
| `Rigidbody2D.velocity` | `Rigidbody2D.linearVelocity` |
| `Rigidbody2D.drag` | `Rigidbody2D.linearDamping` |
| `Rigidbody2D.angularDrag` | `Rigidbody2D.angularDamping` |

В Unity 6 также изменилось поведение torque для `AddForceAtPosition` и
`AddExplosionForce` с `ForceMode.VelocityChange` и `ForceMode.Acceleration`.
Если физика внезапно стала другой, проверьте эти вызовы.

## Поиск объектов

| Unity 2022.3 | Unity 6 |
|---|---|
| `FindObjectOfType<T>()` | `FindFirstObjectByType<T>()` |
| `FindObjectsOfType<T>()` | `FindObjectsByType<T>(FindObjectsSortMode.None)` |
| `FindObjectOfType<T>()` для любого | `FindAnyObjectByType<T>()` |

Старые методы в Unity 6 устарели. В новом коде лучше вообще не искать объекты
через `Find*`, а передавать ссылки через Inspector.

## Ввод

| Unity 2022.3 | Unity 6 |
|---|---|
| Input System 1.7+ | Input System 1.11+ |
| Project-wide Actions предварительные | Project-wide Actions стабильны |
| Asset-based workflow — база | Project-wide Actions — удобный вариант |

Для совместимости используйте обычный `.inputactions` asset и
`InputActionReference`.

## Пакеты и рендер

| Unity 2022.3 | Unity 6 |
|---|---|
| URP 14.x | URP 17.x |
| TMP — отдельный пакет | TMP входит в uGUI 2.x |
| Cinemachine 2.x | Cinemachine 3.x |

Cinemachine 3.x поддерживает и 2022.3, и Unity 6. Не смешивайте 2.x и 3.x в
одном проекте.

## Сборка

| Unity 2022.3 | Unity 6 |
|---|---|
| `File → Build Settings` | `File → Build Profiles` |
| Scenes In Build | Список сцен в профиле |

## Символы версии

```csharp
#if UNITY_6000_0_OR_NEWER
    // Unity 6
#elif UNITY_2023_1_OR_NEWER
    // переходные версии
#else
    // Unity 2022.3
#endif
```

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем в Unity 6 заменили `Rigidbody.velocity`?",
  "options": [
    {
      "text": "`linearVelocity`",
      "correct": true,
      "explanation": "В Unity 6 свойство переименовали."
    },
    {
      "text": "`angularVelocity`",
      "correct": false,
      "explanation": "Это угловая скорость."
    },
    {
      "text": "`MovePosition`",
      "correct": false,
      "explanation": "Это метод движения, а не свойство скорости."
    }
  ],
  "explanation": "В Unity 6 скорость — `linearVelocity`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что изменилось в Unity 6?",
  "options": [
    {
      "text": "`Build Settings` → `Build Profiles`",
      "correct": true
    },
    {
      "text": "`FindObjectOfType` устарел",
      "correct": true
    },
    {
      "text": "Project-wide Actions стабильны",
      "correct": true
    },
    {
      "text": "`Rigidbody.velocity` стал основным",
      "correct": false,
      "explanation": "Наоборот, его заменили на `linearVelocity`."
    }
  ],
  "explanation": "Unity 6 обновила физику, поиск, ввод и сборку."
}
```

## Куда дальше

- [Rigidbody и Rigidbody2D](theme.html?path=content/unity/versii-i-migraciya/rigidbody-migraciya.md)
- [Input System и project-wide actions](theme.html?path=content/unity/versii-i-migraciya/input-migraciya.md)
- [FindObjectOfType и другие API](theme.html?path=content/unity/versii-i-migraciya/find-api.md)
