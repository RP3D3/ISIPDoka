---
title: Практика: игровой цикл
description: Собираем мини-игру: здоровье, счёт, победа, поражение и рестарт сцены.
keywords: Unity практика, игровой цикл, GameManager, здоровье, счёт, победа, поражение, рестарт

---

# Практика: игровой цикл

Соберём маленький игровой цикл: игрок собирает предметы, теряет здоровье и
может победить или проиграть. Всё свяжем через события и GameManager.

## Что нужно сделать

1. Создать `GameManager` с состояниями `Playing`, `Win`, `Lose`.
2. Сделать `Health` игрока и `Score`.
3. Собрать 5 предметов, которые дают очки.
4. Добавить опасный объект, который наносит урон.
5. Показать здоровье и счёт в UI.
6. При победе или поражении показать панель и кнопку рестарта.

## Решение 1. GameManager

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public enum State { Playing, Win, Lose }

    public State Current { get; private set; } = State.Playing;

    public void Win()
    {
        if (Current != State.Playing)
        {
            return;
        }

        Current = State.Win;
        Time.timeScale = 0f;
    }

    public void Lose()
    {
        if (Current != State.Playing)
        {
            return;
        }

        Current = State.Lose;
        Time.timeScale = 0f;
    }

    public void Restart()
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}
```

## Решение 2. Здоровье

```csharp
using System;
using UnityEngine;

public class Health : MonoBehaviour
{
    [SerializeField] private int _max = 100;
    [SerializeField] private int _current = 100;

    public event Action<int, int> Changed;
    public event Action Died;

    public void TakeDamage(int damage)
    {
        _current = Mathf.Max(0, _current - damage);
        Changed?.Invoke(_current, _max);

        if (_current == 0)
        {
            Died?.Invoke();
        }
    }
}
```

## Решение 3. Счёт и предметы

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

```csharp
using UnityEngine;

public class Pickup : MonoBehaviour
{
    [SerializeField] private int _points = 10;

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

## Решение 4. Опасный объект

```csharp
using UnityEngine;

public class DamageZone : MonoBehaviour
{
    [SerializeField] private int _damage = 20;

    private void OnTriggerEnter(Collider other)
    {
        if (other.TryGetComponent(out Health health))
        {
            health.TakeDamage(_damage);
        }
    }
}
```

## Решение 5. UI и рестарт

1. Создайте `Canvas` с `Text` для счёта и `Slider` для здоровья.
2. Подпишите UI на события `Score.Changed` и `Health.Changed`.
3. Подпишите `GameManager` на `Health.Died` и на победу по счёту.
4. Создайте панель `ResultPanel` с текстом и кнопкой `Restart`.
5. В `OnClick` кнопки вызовите `GameManager.Restart`.

## Что должно получиться

- счёт растёт при сборе предметов;
- здоровье уменьшается при касании опасного объекта;
- при нуле здоровья появляется поражение;
- при сборе всех предметов появляется победа;
- кнопка рестарта перезапускает сцену;
- `Time.timeScale` возвращается в 1.

## Частые ошибки

- **Сцена не перезапускается.** Забыли вернуть `Time.timeScale = 1`.
- **UI не обновляется.** Нет подписки на события.
- **Смерть срабатывает много раз.** Добавьте проверку состояния.
- **Предметы не срабатывают.** Нет `Collider` с `isTrigger` или `Rigidbody`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делать перед `LoadScene` после паузы?",
  "options": [
    {
      "text": "Вернуть `Time.timeScale = 1f`",
      "correct": true,
      "explanation": "Иначе новая сцена стартует замороженной."
    },
    {
      "text": "Удалить `GameManager`",
      "correct": false,
      "explanation": "Он нужен для состояния игры."
    },
    {
      "text": "Выключить все коллайдеры",
      "correct": false,
      "explanation": "Это не связано с загрузкой сцены."
    }
  ],
  "explanation": "Перед сменой сцены восстановите обычное время."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно для игрового цикла?",
  "options": [
    {
      "text": "Состояния Playing, Win, Lose",
      "correct": true
    },
    {
      "text": "События изменения здоровья и счёта",
      "correct": true
    },
    {
      "text": "UI, подписанный на события",
      "correct": true
    },
    {
      "text": "Один скрипт на 2000 строк",
      "correct": false,
      "explanation": "Лучше разделить ответственность."
    }
  ],
  "explanation": "Игровой цикл — это состояния, данные, события и UI."
}
```

## Куда дальше

- [Игровая логика и архитектура: итог](theme.html?path=content/unity/igrovaya-logika-arhitektura/itog-igrovaya-logika-arhitektura.md)
- [GameManager](theme.html?path=content/unity/igrovaya-logika-arhitektura/gamemanager.md)
- [Счёт и здоровье](theme.html?path=content/unity/igrovaya-logika-arhitektura/schet-i-zdorove.md)
