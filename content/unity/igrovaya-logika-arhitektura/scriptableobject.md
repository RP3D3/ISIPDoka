---
title: ScriptableObject
description: Конфиги и общие данные в ассетах: CreateAssetMenu, поля, экземпляры и подводные камни.
keywords: Unity ScriptableObject, CreateAssetMenu, конфиг, данные, ассеты, EnemyConfig, архитектура

---

# ScriptableObject

`ScriptableObject` — это ассет с данными и логикой, который не привязан к
GameObject. Он удобен для конфигов: параметры врагов, предметов, оружия,
уровней.

## Зачем нужен

Без ScriptableObject настройки часто хранят в префабах. Если у вас 20 врагов с
одинаковыми параметрами, приходится менять каждый. С конфигом данные лежат в
одном ассете, а враги читают его.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/igrovaya-logika-arhitektura/scriptable-object.svg"
    alt="Схема ScriptableObject: один конфиг используется несколькими врагами"
    width="900"
  >
  <figcaption>
    Один ассет конфигурации может использоваться многими объектами.
  </figcaption>
</figure>

## Создание

```csharp
using UnityEngine;

[CreateAssetMenu(fileName = "EnemyConfig", menuName = "Game/Enemy Config")]
public class EnemyConfig : ScriptableObject
{
    public string displayName = "Enemy";
    public int maxHealth = 100;
    public float speed = 2.5f;
    public int damage = 15;
    public GameObject prefab;
}
```

После компиляции в меню **Assets → Create → Game → Enemy Config** появится
пункт создания ассета.

## Использование

```csharp
using UnityEngine;

public class Enemy : MonoBehaviour
{
    [SerializeField] private EnemyConfig _config;

    private int _health;

    private void Awake()
    {
        _health = _config.maxHealth;
    }

    public void TakeDamage(int damage)
    {
        _health -= damage;
        Debug.Log($"{_config.displayName}: {_health}");
    }
}
```

Ссылку на конфиг назначают в Inspector. Один и тот же ассет можно передать
нескольким врагам.

## Общие данные и runtime

ScriptableObject — ассет. Если менять его поля в Play Mode, изменения могут
сохраниться в редакторе (в зависимости от настроек и версии). Для runtime-
состояния лучше копировать значения в обычные поля компонента:

```csharp
private int _currentHealth;

private void Awake()
{
    _currentHealth = _config.maxHealth;
}
```

Так здоровье конкретного врага не меняет общий конфиг.

## Частые ошибки

- **Меняют данные конфига в Play.** Можно случайно изменить ассет для всех.
- **Хранят runtime-состояние в ScriptableObject.** Оно общее для всех
  пользователей ассета.
- **Забывают `[CreateAssetMenu]`.** Ассет неудобно создавать.
- **Путают ScriptableObject и MonoBehaviour.** Первый не вешается на GameObject.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем ScriptableObject отличается от MonoBehaviour?",
  "options": [
    {
      "text": "Это ассет с данными, а не компонент GameObject",
      "correct": true,
      "explanation": "ScriptableObject живет в Project, а не на сцене."
    },
    {
      "text": "Он не может содержать поля",
      "correct": false,
      "explanation": "Может, и ещё как."
    },
    {
      "text": "Он работает только в 2D",
      "correct": false,
      "explanation": "Он не зависит от 2D/3D."
    }
  ],
  "explanation": "ScriptableObject — ассет для данных и логики."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про ScriptableObject?",
  "options": [
    {
      "text": "Подходит для конфигов врагов и предметов",
      "correct": true
    },
    {
      "text": "Создаётся через `[CreateAssetMenu]`",
      "correct": true
    },
    {
      "text": "Может использоваться несколькими объектами",
      "correct": true
    },
    {
      "text": "Его нужно добавлять компонентом на GameObject",
      "correct": false,
      "explanation": "Это ассет, а не компонент."
    }
  ],
  "explanation": "ScriptableObject — переиспользуемый ассет данных."
}
```

## Куда дальше

- [Пулинг и спавн](theme.html?path=content/unity/igrovaya-logika-arhitektura/puling-i-spavn.md)
- [Сохранение](theme.html?path=content/unity/igrovaya-logika-arhitektura/sohranenie.md)
- [Практика: игровой цикл](theme.html?path=content/unity/igrovaya-logika-arhitektura/praktika-igrovoy-cikl.md)
