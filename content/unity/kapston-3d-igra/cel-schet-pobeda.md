---
title: Цель, счёт и победа
description: Предметы, счёт, условие победы, поражение и рестарт мини-игры.
keywords: Unity капстон, цель, счёт, победа, поражение, UI, рестарт, pickups

---

# Цель, счёт и победа

Игрок должен понимать, зачем он двигается. Цель, счёт и условия победы делают
уровень игрой, а не прогулкой.

## Предметы

```csharp
using UnityEngine;

public class Pickup : MonoBehaviour
{
    [SerializeField] private int _points = 1;

    private void OnTriggerEnter(Collider other)
    {
        if (other.TryGetComponent(out Score score))
        {
            score.Add(_points);
            Destroy(gameObject);
        }
    }
}
```

У предмета должен быть `Collider` с `isTrigger`. У игрока — `CharacterController`
или `Rigidbody`, чтобы триггер сработал.

## Счёт

```csharp
using System;
using UnityEngine;

public class Score : MonoBehaviour
{
    public event Action<int> Changed;

    public int Value { get; private set; }

    public void Add(int points)
    {
        Value += points;
        Changed?.Invoke(Value);
    }
}
```

UI подписывается на `Changed` и обновляет текст.

## Победа

```csharp
using UnityEngine;

public class WinZone : MonoBehaviour
{
    [SerializeField] private Score _score;
    [SerializeField] private int _required = 5;
    [SerializeField] private GameManager _gameManager;

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player") && _score.Value >= _required)
        {
            _gameManager.Win();
        }
    }
}
```

Если игрок пришёл без нужного счёта, можно показать подсказку «Соберите ещё
кристаллы».

## Поражение

```csharp
private void OnEnable()
{
    _health.Died += OnDied;
}

private void OnDisable()
{
    _health.Died -= OnDied;
}

private void OnDied()
{
    _gameManager.Lose();
}
```

## UI

На экране достаточно:

- счёт `Crystals: 3 / 5`;
- полоска здоровья;
- панель результата с кнопкой `Restart`;
- подсказка управления.

## Рестарт

```csharp
public void Restart()
{
    Time.timeScale = 1f;
    SceneManager.LoadScene(SceneManager.GetActiveScene().name);
}
```

Сцена должна быть в Build Settings / Build Profiles.

## Частые ошибки

- **Победа без проверки счёта.** Игрок обходит цель.
- **Нет подсказки.** Непонятно, почему выход не работает.
- **UI не обновляется.** Нет подписки на событие.
- **После рестарта `timeScale` остаётся 0.** Игра замирает.
- **Сцена не в сборке.** В билде рестарт не работает.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что должно быть у предмета, чтобы сработал триггер?",
  "options": [
    {
      "text": "`Collider` с `isTrigger`",
      "correct": true,
      "explanation": "Триггер срабатывает при входе в коллайдер."
    },
    {
      "text": "Только `AudioSource`",
      "correct": false,
      "explanation": "Звук не включает триггер."
    },
    {
      "text": "Только `Canvas`",
      "correct": false,
      "explanation": "Canvas — для UI."
    }
  ],
  "explanation": "Для триггера нужен коллайдер с `isTrigger`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что проверить перед победой?",
  "options": [
    {
      "text": "Счёт достиг нужного значения",
      "correct": true
    },
    {
      "text": "Игрок вошёл в зону выхода",
      "correct": true
    },
    {
      "text": "Сцена добавлена в сборку",
      "correct": true
    },
    {
      "text": "У игрока удалён `CharacterController`",
      "correct": false,
      "explanation": "Контроллер нужен для движения."
    }
  ],
  "explanation": "Победа проверяет счёт, зону и готовность сцены."
}
```

## Куда дальше

- [Сборка и полировка](theme.html?path=content/unity/kapston-3d-igra/sborka-i-polirovka.md)
- [Капстон: 3D-игра: итог](theme.html?path=content/unity/kapston-3d-igra/itog-kapston-3d-igra.md)
- [Враги и препятствия](theme.html?path=content/unity/kapston-3d-igra/vragi-i-prepyatstviya.md)
