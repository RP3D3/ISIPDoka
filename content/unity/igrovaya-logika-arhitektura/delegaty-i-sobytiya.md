---
title: Делегаты и события
description: Action, event и UnityEvent: как развязать игровую логику и UI.
keywords: Unity делегаты, события, Action, event, UnityEvent, подписка, отписка

---

# Делегаты и события

Делегат — это ссылка на метод. Событие — механизм, который позволяет объекту
сообщить: «у меня что-то произошло», не зная, кто это слушает.

## Action

`Action` — готовый делегат без возвращаемого значения:

```csharp
using System;
using UnityEngine;

public class PlayerHealth : MonoBehaviour
{
    public event Action<int> HealthChanged;

    private int _health = 100;

    public void TakeDamage(int damage)
    {
        _health -= damage;
        HealthChanged?.Invoke(_health);
    }
}
```

`HealthChanged?.Invoke(_health)` вызывает всех подписчиков. Если подписчиков
нет, ничего не происходит.

## Подписка и отписка

```csharp
using UnityEngine;

public class HealthView : MonoBehaviour
{
    [SerializeField] private PlayerHealth _health;

    private void OnEnable()
    {
        _health.HealthChanged += OnHealthChanged;
    }

    private void OnDisable()
    {
        _health.HealthChanged -= OnHealthChanged;
    }

    private void OnHealthChanged(int value)
    {
        Debug.Log($"Здоровье: {value}");
    }
}
```

Подписка и отписка должны быть парными. Иначе объект останется в списке
подписчиков после уничтожения.

## Свои делегаты

```csharp
public delegate void ScoreHandler(int score);

public event ScoreHandler ScoreChanged;
```

Но в большинстве случаев хватает `Action`, `Action<T>` и `Func<T>`.

## UnityEvent

`UnityEvent` — событие, которое настраивается в Inspector. Оно удобно для
дизайнеров и простых связей между объектами.

```csharp
using UnityEngine;
using UnityEngine.Events;

public class ButtonExample : MonoBehaviour
{
    public UnityEvent OnPressed;

    public void Press()
    {
        OnPressed?.Invoke();
    }
}
```

<figure class="md-figure md-figure--center md-figure--small">
  <img
    src="content/unity/_assets/igrovaya-logika-arhitektura/unity-events.png"
    alt="Настройка UnityEvent в Inspector"
    width="342"
  >
  <figcaption>
    UnityEvent настраивается мышью в Inspector.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/UnityEvents.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Unity Events
    </a>
  </figcaption>
</figure>

## C# event или UnityEvent

| Ситуация | Что выбрать |
|---|---|
| Связь внутри кода | C# `event` / `Action` |
| Настройка в Inspector | `UnityEvent` |
| Много слушателей | C# event |
| Простая кнопка UI | `UnityEvent` |
| Нужна типобезопасность | C# event |

## Частые ошибки

- **Забыли отписаться.** Утечки и вызовы на уничтоженных объектах.
- **Вызывают событие без `?.`.** Если слушателей нет, будет
  `NullReferenceException`.
- **Дублируют подписку.** Один метод вызывается несколько раз.
- **Меняют коллекцию подписчиков во время вызова.** Может привести к ошибке.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `event`?",
  "options": [
    {
      "text": "Позволяет подписываться на уведомления объекта",
      "correct": true,
      "explanation": "Событие сообщает о произошедшем без жёсткой связи."
    },
    {
      "text": "Ускоряет физику",
      "correct": false,
      "explanation": "События не связаны с физикой."
    },
    {
      "text": "Заменяет `Update`",
      "correct": false,
      "explanation": "События вызываются по факту, а не каждый кадр."
    }
  ],
  "explanation": "Событие — уведомление подписчикам."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про события?",
  "options": [
    {
      "text": "Подписка и отписка должны быть парными",
      "correct": true
    },
    {
      "text": "`Action` — готовый делегат",
      "correct": true
    },
    {
      "text": "`UnityEvent` настраивается в Inspector",
      "correct": true
    },
    {
      "text": "Событие можно вызвать без слушателей и получить ошибку",
      "correct": false,
      "explanation": "Используйте `?.Invoke`, чтобы избежать ошибки."
    }
  ],
  "explanation": "События требуют аккуратной подписки и отписки."
}
```

## Куда дальше

- [ScriptableObject](theme.html?path=content/unity/igrovaya-logika-arhitektura/scriptableobject.md)
- [Счёт и здоровье](theme.html?path=content/unity/igrovaya-logika-arhitektura/schet-i-zdorove.md)
- [Практика: игровой цикл](theme.html?path=content/unity/igrovaya-logika-arhitektura/praktika-igrovoy-cikl.md)
