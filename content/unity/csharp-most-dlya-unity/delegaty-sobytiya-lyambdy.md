---
title: Делегаты, события и лямбды
description: Action, event, UnityEvent и лямбда-выражения: как связать код без жёстких зависимостей.
keywords: Unity C#, делегаты, события, Action, event, UnityEvent, лямбды, подписка, отписка

---

# Делегаты, события и лямбды

Делегат — это ссылка на метод. Событие — способ сообщить «у меня произошло
что-то важное», не зная, кто это слушает.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/csharp-most-dlya-unity/events.svg"
    alt="Схема события: Health вызывает HealthChanged, подписчики UI, звук и достижения"
    width="900"
  >
  <figcaption>
    Издатель вызывает событие, подписчики реагируют независимо друг от друга.
  </figcaption>
</figure>

## Action

`Action` — готовый делегат без возвращаемого значения:

```csharp
using System;
using UnityEngine;

public class Health : MonoBehaviour
{
    public event Action<int> Changed;

    private int _value = 100;

    public void TakeDamage(int damage)
    {
        _value -= damage;
        Changed?.Invoke(_value);
    }
}
```

`Changed?.Invoke(_value)` вызывает всех подписчиков. Если их нет, ничего не
происходит.

## Подписка

```csharp
public class HealthView : MonoBehaviour
{
    [SerializeField] private Health _health;

    private void OnEnable()
    {
        _health.Changed += OnHealthChanged;
    }

    private void OnDisable()
    {
        _health.Changed -= OnHealthChanged;
    }

    private void OnHealthChanged(int value)
    {
        Debug.Log($"Здоровье: {value}");
    }
}
```

Подписка и отписка должны быть парными. Иначе объект останется в списке
подписчиков после уничтожения.

## Лямбды

Лямбда — короткая функция на месте:

```csharp
_health.Changed += value => Debug.Log($"HP: {value}");
```

Удобно для одноразовой реакции. Но если лямбду нужно отписать, сохраните её в
поле:

```csharp
private Action<int> _onHealthChanged;

private void OnEnable()
{
    _onHealthChanged = value => Debug.Log(value);
    _health.Changed += _onHealthChanged;
}

private void OnDisable()
{
    _health.Changed -= _onHealthChanged;
}
```

## UnityEvent

`UnityEvent` настраивается в Inspector:

```csharp
using UnityEngine;
using UnityEngine.Events;

public class Lever : MonoBehaviour
{
    public UnityEvent OnPulled;

    public void Pull()
    {
        OnPulled?.Invoke();
    }
}
```

В Inspector можно назначить методы других компонентов без написания кода.

## Что выбрать

| Задача | Инструмент |
|---|---|
| Связь внутри кода | `Action` / `event` |
| Настройка в Inspector | `UnityEvent` |
| Одноразовая реакция | лямбда |
| Много слушателей | `event` |

## Частые ошибки

- **Забыли отписаться.** Утечки и вызовы на уничтоженных объектах.
- **Вызывают событие без `?.`.** Если слушателей нет — исключение.
- **Дублируют подписку.** Метод срабатывает несколько раз.
- **Лямбда без ссылки.** Её нельзя отписать.
- **Меняют список подписчиков во время вызова.** Может привести к ошибке.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое делегат?",
  "options": [
    {
      "text": "Ссылка на метод",
      "correct": true,
      "explanation": "Делегат хранит метод и позволяет вызвать его позже."
    },
    {
      "text": "Компонент Unity",
      "correct": false,
      "explanation": "Делегат — часть C#, а не компонент."
    },
    {
      "text": "Тип текстуры",
      "correct": false,
      "explanation": "Текстуры не связаны с делегатами."
    }
  ],
  "explanation": "Делегат — это ссылка на метод."
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
      "text": "Лямбду можно отписать без сохранения ссылки",
      "correct": false,
      "explanation": "Для отписки нужна та же ссылка на метод."
    }
  ],
  "explanation": "События требуют аккуратной подписки и отписки."
}
```

## Куда дальше

- [Коллекции в игре](theme.html?path=content/unity/csharp-most-dlya-unity/kollekcii-v-igre.md)
- [Корутины и IEnumerator](theme.html?path=content/unity/csharp-most-dlya-unity/korutiny-i-ienumerator.md)
- [Делегаты и события](theme.html?path=content/unity/igrovaya-logika-arhitektura/delegaty-i-sobytiya.md)
