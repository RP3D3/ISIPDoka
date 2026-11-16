---
title: Враги и препятствия
description: Простой патруль и преследование, урон, префабы врагов и опасные зоны.
keywords: Unity капстон, враги, AI, патруль, преследование, урон, префабы, препятствия

---

# Враги и препятствия

Для капстона не нужен сложный AI. Достаточно патруля, преследования и урона при
контакте.

## Простой патруль

```csharp
using UnityEngine;

public class Patrol : MonoBehaviour
{
    [SerializeField] private Transform[] _points;
    [SerializeField] private float _speed = 2f;

    private int _index;

    private void Update()
    {
        Transform target = _points[_index];
        transform.position = Vector3.MoveTowards(
            transform.position,
            target.position,
            _speed * Time.deltaTime);

        if (Vector3.Distance(transform.position, target.position) < 0.1f)
        {
            _index = (_index + 1) % _points.Length;
        }
    }
}
```

Для 3D-врага на NavMesh можно использовать `NavMeshAgent`, но для мини-игры
достаточно движения по точкам.

## Преследование

```csharp
using UnityEngine;

public class Chase : MonoBehaviour
{
    [SerializeField] private Transform _player;
    [SerializeField] private float _speed = 3f;
    [SerializeField] private float _range = 6f;

    private void Update()
    {
        float distance = Vector3.Distance(transform.position, _player.position);
        if (distance > _range)
        {
            return;
        }

        transform.position = Vector3.MoveTowards(
            transform.position,
            _player.position,
            _speed * Time.deltaTime);
    }
}
```

Можно добавить `LookAt`, чтобы враг смотрел на игрока.

## Урон

```csharp
using UnityEngine;

public class ContactDamage : MonoBehaviour
{
    [SerializeField] private int _damage = 10;
    [SerializeField] private float _cooldown = 1f;

    private float _nextTime;

    private void OnCollisionStay(Collision collision)
    {
        if (Time.time < _nextTime)
        {
            return;
        }

        if (collision.gameObject.TryGetComponent(out Health health))
        {
            health.TakeDamage(_damage);
            _nextTime = Time.time + _cooldown;
        }
    }
}
```

Кулдаун не даёт снимать всё здоровье за один кадр.

## Префабы

Врага лучше сделать префабом:

- `Enemy` с коллайдером, скриптом и моделью;
- параметры патруля — в компоненте;
- разные варианты — через Prefab Variant или ScriptableObject.

## Опасные зоны

Для пропасти или шипов:

```csharp
using UnityEngine;

public class KillZone : MonoBehaviour
{
    private void OnTriggerEnter(Collider other)
    {
        if (other.TryGetComponent(out PlayerRespawn respawn))
        {
            respawn.Respawn();
        }
    }
}
```

## Частые ошибки

- **Враг двигается сквозь стены.** Нет коллайдера или движения через
  `transform.position` без проверок.
- **Урон срабатывает каждый кадр.** Нужен кулдаун.
- **Враги клонируются вручную.** Используйте префаб.
- **Игрок застревает в враге.** Настройте слои и коллайдеры.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен кулдаун урона?",
  "options": [
    {
      "text": "Чтобы урон не срабатывал каждый кадр",
      "correct": true,
      "explanation": "Иначе игрок теряет всё здоровье мгновенно."
    },
    {
      "text": "Чтобы враг исчез",
      "correct": false,
      "explanation": "Кулдаун не удаляет врага."
    },
    {
      "text": "Чтобы включить UI",
      "correct": false,
      "explanation": "UI не связан с кулдауном."
    }
  ],
  "explanation": "Кулдаун ограничивает частоту урона."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что можно использовать для врагов?",
  "options": [
    {
      "text": "Патруль по точкам",
      "correct": true
    },
    {
      "text": "Преследование игрока",
      "correct": true
    },
    {
      "text": "Префабы и варианты",
      "correct": true
    },
    {
      "text": "Сложный Behaviour Tree на 20 узлов",
      "correct": false,
      "explanation": "Для мини-игры это избыточно."
    }
  ],
  "explanation": "Простого AI достаточно для капстона."
}
```

## Куда дальше

- [Цель, счёт и победа](theme.html?path=content/unity/kapston-3d-igra/cel-schet-pobeda.md)
- [Сборка и полировка](theme.html?path=content/unity/kapston-3d-igra/sborka-i-polirovka.md)
- [Игрок и управление](theme.html?path=content/unity/kapston-3d-igra/igrok-i-upravlenie.md)
