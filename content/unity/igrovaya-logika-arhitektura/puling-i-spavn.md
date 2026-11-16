---
title: Пулинг и спавн
description: Спавн объектов, пул вместо Instantiate/Destroy и сброс состояния при переиспользовании.
keywords: Unity пулинг, Object Pool, Instantiate, Destroy, спавн, spawn point, Queue, производительность

---

# Пулинг и спавн

`Instantiate` и `Destroy` удобны, но при сотнях пуль и эффектов создают нагрузку
на GC и память. **Пул объектов** переиспользует уже созданные экземпляры.

## Обычный спавн

```csharp
using UnityEngine;

public class SimpleSpawner : MonoBehaviour
{
    [SerializeField] private GameObject _bulletPrefab;
    [SerializeField] private Transform _spawnPoint;

    public void Fire()
    {
        Instantiate(_bulletPrefab, _spawnPoint.position, _spawnPoint.rotation);
    }
}
```

Для прототипа этого достаточно. Для интенсивной стрельбы лучше пул.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/igrovaya-logika-arhitektura/pooling.svg"
    alt="Схема пула объектов: Spawner, Pool, Scene и возврат объекта"
    width="900"
  >
  <figcaption>
    Пул хранит неактивные объекты и выдаёт их вместо создания новых.
  </figcaption>
</figure>

## Простой пул

```csharp
using System.Collections.Generic;
using UnityEngine;

public class BulletPool : MonoBehaviour
{
    [SerializeField] private GameObject _bulletPrefab;
    [SerializeField] private int _initialSize = 20;

    private readonly Queue<GameObject> _pool = new();

    private void Awake()
    {
        for (int i = 0; i < _initialSize; i++)
        {
            GameObject bullet = Instantiate(_bulletPrefab, transform);
            bullet.SetActive(false);
            _pool.Enqueue(bullet);
        }
    }

    public GameObject Get()
    {
        if (_pool.Count > 0)
        {
            GameObject bullet = _pool.Dequeue();
            bullet.SetActive(true);
            return bullet;
        }

        return Instantiate(_bulletPrefab);
    }

    public void Return(GameObject bullet)
    {
        bullet.SetActive(false);
        bullet.transform.SetParent(transform);
        _pool.Enqueue(bullet);
    }
}
```

## Сброс состояния

При возврате в пул нужно сбросить:

- скорость `Rigidbody`;
- таймеры;
- здоровье;
- партиклы;
- подписки на события.

Иначе пуля «вылетит» со старой скоростью или эффект останется включённым.

```csharp
public void Return(GameObject bullet)
{
    if (bullet.TryGetComponent(out Rigidbody body))
    {
        body.linearVelocity = Vector3.zero;
        body.angularVelocity = Vector3.zero;
    }

    bullet.SetActive(false);
    _pool.Enqueue(bullet);
}
```

В Unity 2022.3 используйте `body.velocity`; в Unity 6 — `linearVelocity`.

## Spawn points

Точки спавна удобно делать дочерними объектами:

```text
EnemySpawner
├── Point_01
├── Point_02
└── Point_03
```

Спавнер выбирает случайную точку и создаёт врага.

## Частые ошибки

- **Возвращают объект дважды.** В пуле появляются дубликаты.
- **Не сбрасывают скорость.** Объект ведёт себя странно.
- **Пул без ограничения.** Если объектов больше, чем в пуле, создаются новые.
- **`Destroy` вместо возврата.** Пул теряет смысл.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен пул объектов?",
  "options": [
    {
      "text": "Чтобы переиспользовать объекты вместо постоянного создания",
      "correct": true,
      "explanation": "Это снижает нагрузку на GC и память."
    },
    {
      "text": "Чтобы удалить все объекты со сцены",
      "correct": false,
      "explanation": "Пул хранит неактивные объекты."
    },
    {
      "text": "Чтобы заменить физику",
      "correct": false,
      "explanation": "Пул не связан с физикой напрямую."
    }
  ],
  "explanation": "Пул переиспользует уже созданные объекты."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно при возврате объекта в пул?",
  "options": [
    {
      "text": "Выключить объект",
      "correct": true
    },
    {
      "text": "Сбросить скорость `Rigidbody`",
      "correct": true
    },
    {
      "text": "Сбросить таймеры и состояние",
      "correct": true
    },
    {
      "text": "Удалить объект через `Destroy`",
      "correct": false,
      "explanation": "Тогда пул не сможет его переиспользовать."
    }
  ],
  "explanation": "Перед возвратом объект нужно привести в исходное состояние."
}
```

## Куда дальше

- [Сохранение](theme.html?path=content/unity/igrovaya-logika-arhitektura/sohranenie.md)
- [Загрузка сцен](theme.html?path=content/unity/igrovaya-logika-arhitektura/zagruzka-scen.md)
- [Практика: игровой цикл](theme.html?path=content/unity/igrovaya-logika-arhitektura/praktika-igrovoy-cikl.md)
