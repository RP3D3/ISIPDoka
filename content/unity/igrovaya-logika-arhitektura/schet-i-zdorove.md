---
title: Счёт и здоровье
description: Здоровье, урон, лечение и счёт через события, без жёсткой связи с UI.
keywords: Unity здоровье, счёт, Health, damage, heal, Action, event, UI, игровая логика

---

# Счёт и здоровье

Здоровье и счёт — первые игровые данные, которые нужно обновлять в UI. Если
каждый скрипт напрямую ищет `Text` или `Slider`, проект быстро запутывается.
Лучше разделить данные и отображение.

## Здоровье

```csharp
using System;
using UnityEngine;

public class Health : MonoBehaviour
{
    [SerializeField] private int _maxHealth = 100;
    [SerializeField] private int _currentHealth = 100;

    public event Action<int, int> Changed;

    public int Current => _currentHealth;
    public int Max => _maxHealth;

    public void TakeDamage(int damage)
    {
        if (damage <= 0)
        {
            return;
        }

        _currentHealth = Mathf.Max(0, _currentHealth - damage);
        Changed?.Invoke(_currentHealth, _maxHealth);

        if (_currentHealth == 0)
        {
            Die();
        }
    }

    public void Heal(int amount)
    {
        if (amount <= 0)
        {
            return;
        }

        _currentHealth = Mathf.Min(_maxHealth, _currentHealth + amount);
        Changed?.Invoke(_currentHealth, _maxHealth);
    }

    private void Die()
    {
        Debug.Log("Объект уничтожен");
        Destroy(gameObject);
    }
}
```

Событие `Changed` сообщает UI новые значения. Сам `Health` не знает, как
выглядит полоска здоровья.

## UI

```csharp
using UnityEngine;
using UnityEngine.UI;

public class HealthBar : MonoBehaviour
{
    [SerializeField] private Health _health;
    [SerializeField] private Slider _slider;

    private void OnEnable()
    {
        _health.Changed += OnHealthChanged;
        OnHealthChanged(_health.Current, _health.Max);
    }

    private void OnDisable()
    {
        _health.Changed -= OnHealthChanged;
    }

    private void OnHealthChanged(int current, int max)
    {
        _slider.maxValue = max;
        _slider.value = current;
    }
}
```

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

    public void Reset()
    {
        Value = 0;
        Changed?.Invoke(Value);
    }
}
```

UI подписывается на `Changed` и обновляет текст. Так счёт можно менять из
любого места, не ища UI.

## Частые ошибки

- **UI сам ищет игрока через `Find`.** Лучше передать ссылку через Inspector.
- **Забыли отписаться.** После перезагрузки сцены возможны ошибки.
- **Здоровье уходит ниже нуля.** Ограничивайте через `Mathf.Max`.
- **Лечение выше максимума.** Ограничивайте через `Mathf.Min`.
- **Смерть срабатывает несколько раз.** Добавьте флаг или проверку.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему UI лучше обновлять через событие?",
  "options": [
    {
      "text": "UI не зависит от того, кто изменил здоровье",
      "correct": true,
      "explanation": "Событие разделяет данные и отображение."
    },
    {
      "text": "События работают быстрее любого кода",
      "correct": false,
      "explanation": "Дело не в скорости, а в архитектуре."
    },
    {
      "text": "Без событий Unity не компилируется",
      "correct": false,
      "explanation": "Можно обновлять UI и напрямую."
    }
  ],
  "explanation": "События уменьшают связанность игровой логики и UI."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про здоровье и счёт?",
  "options": [
    {
      "text": "Здоровье стоит ограничивать снизу нулём",
      "correct": true
    },
    {
      "text": "Лечение не должно превышать максимум",
      "correct": true
    },
    {
      "text": "UI может подписаться на событие изменения",
      "correct": true
    },
    {
      "text": "Смерть должна срабатывать каждый кадр",
      "correct": false,
      "explanation": "Достаточно одного раза."
    }
  ],
  "explanation": "Ограничения и события делают здоровье предсказуемым."
}
```

## Куда дальше

- [Делегаты и события](theme.html?path=content/unity/igrovaya-logika-arhitektura/delegaty-i-sobytiya.md)
- [ScriptableObject](theme.html?path=content/unity/igrovaya-logika-arhitektura/scriptableobject.md)
- [Практика: игровой цикл](theme.html?path=content/unity/igrovaya-logika-arhitektura/praktika-igrovoy-cikl.md)
