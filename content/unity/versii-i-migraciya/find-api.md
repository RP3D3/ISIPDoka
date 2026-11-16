---
title: FindObjectOfType и другие API
description: Замена устаревших Find-методов в Unity 6 и почему ссылки через Inspector лучше.
keywords: Unity FindObjectOfType, FindFirstObjectByType, FindAnyObjectByType, FindObjectsByType, миграция API

---

# FindObjectOfType и другие API

В Unity 6 методы `FindObjectOfType` и `FindObjectsOfType` считаются
устаревшими. Их заменили более явные методы.

## Замены

| Было | Стало |
|---|---|
| `FindObjectOfType<T>()` | `FindFirstObjectByType<T>()` |
| `FindObjectOfType<T>()`, если порядок не важен | `FindAnyObjectByType<T>()` |
| `FindObjectsOfType<T>()` | `FindObjectsByType<T>(FindObjectsSortMode.None)` |

`FindFirstObjectByType` возвращает первый найденный объект.
`FindAnyObjectByType` может вернуть любой — быстрее, если конкретный не нужен.
`FindObjectsByType` возвращает массив; сортировку лучше отключать, если она не
нужна.

## Пример

```csharp
using UnityEngine;

public class FindExample : MonoBehaviour
{
    private void Start()
    {
        var player = FindFirstObjectByType<Player>();
        if (player != null)
        {
            Debug.Log(player.name);
        }

        var enemies = FindObjectsByType<Enemy>(FindObjectsSortMode.None);
        Debug.Log($"Врагов: {enemies.Length}");
    }
}
```

## Почему лучше ссылки

`Find*` ищет по всей сцене. Это медленно и скрывает зависимости. Лучше:

```csharp
[SerializeField] private Player _player;
```

или получить компонент на объекте:

```csharp
if (TryGetComponent(out Player player))
{
    // ...
}
```

Ссылки через Inspector видны в редакторе и не ломаются при переименовании.

## Когда Find допустим

- в `Start` или `Awake` один раз;
- в инструментах и редакторных скриптах;
- в прототипе, который вы потом перепишете;
- когда объект действительно динамический и его нельзя назначить заранее.

Не вызывайте `Find*` в `Update`.

## Частые ошибки

- **`FindObjectOfType` в Unity 6.** Будет предупреждение об устаревании.
- **`FindObjectsOfType` каждый кадр.** Очень медленно.
- **Ищут неактивные объекты.** `Find*` по умолчанию не находит выключенные.
- **Скрывают зависимости.** Через месяц непонятно, откуда взялся объект.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем заменили `FindObjectOfType<T>()`?",
  "options": [
    {
      "text": "`FindFirstObjectByType<T>()`",
      "correct": true,
      "explanation": "Это явный современный метод."
    },
    {
      "text": "`GetComponent<T>()`",
      "correct": false,
      "explanation": "Он ищет только на своём объекте."
    },
    {
      "text": "`Instantiate<T>()`",
      "correct": false,
      "explanation": "Это создание объекта."
    }
  ],
  "explanation": "В Unity 6 используют `FindFirstObjectByType`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про поиск объектов?",
  "options": [
    {
      "text": "Ссылки через Inspector надёжнее `Find*`",
      "correct": true
    },
    {
      "text": "`FindObjectsByType` возвращает массив",
      "correct": true
    },
    {
      "text": "`Find*` в `Update` — плохая практика",
      "correct": true
    },
    {
      "text": "`FindObjectOfType` — новый метод Unity 6",
      "correct": false,
      "explanation": "Наоборот, он устарел."
    }
  ],
  "explanation": "Современный код предпочитает ссылки и точечный поиск."
}
```

## Куда дальше

- [Пакеты, URP и TMP](theme.html?path=content/unity/versii-i-migraciya/pakety-urp-tmp.md)
- [Сборка и Build Profiles](theme.html?path=content/unity/versii-i-migraciya/build-migraciya.md)
- [Матрица API 2022.3 и Unity 6](theme.html?path=content/unity/versii-i-migraciya/matrica-api.md)
