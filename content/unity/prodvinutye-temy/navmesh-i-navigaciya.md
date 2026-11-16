---
title: NavMesh и навигация
description: Запекание NavMesh, NavMeshAgent, SetDestination, препятствия и версии AI Navigation.
keywords: Unity NavMesh, AI Navigation, NavMeshAgent, NavMeshSurface, SetDestination, навигация, pathfinding

---

# NavMesh и навигация

NavMesh — это карта проходимых зон. Агент строит по ней путь и обходит
препятствия, не проваливаясь сквозь стены.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/prodvinutye-temy/navmesh.svg"
    alt="Схема NavMesh: агент, препятствие, цель и путь"
    width="900"
  >
  <figcaption>
    NavMesh описывает проходимую зону, агент строит путь к цели.
  </figcaption>
</figure>

## Компоненты

- **NavMeshSurface** — запекает NavMesh по геометрии сцены.
- **NavMeshAgent** — двигает персонажа по NavMesh.
- **NavMeshObstacle** — динамическое препятствие.
- **NavMeshLink / OffMeshLink** — переход между зонами: лестница, прыжок.

В Unity 6 навигация вынесена в пакет **AI Navigation 2.x**. В Unity 2022.3
интерфейс может быть встроенным или из пакета 1.x — названия окон отличаются.

## Запекание

1. Установите пакет **AI Navigation**, если его нет.
2. Добавьте `NavMeshSurface` на объект окружения.
3. Настройте `Agent Radius` и `Agent Height`.
4. Нажмите **Bake**.
5. Проверьте синюю зону: по ней можно ходить.

Если зона не появилась, проверьте, что у геометрии есть коллайдеры или
`MeshRenderer`, а объекты отмечены как `Navigation Static` в старом workflow.

## Агент

```csharp
using UnityEngine;
using UnityEngine.AI;

[RequireComponent(typeof(NavMeshAgent))]
public class EnemyNavigator : MonoBehaviour
{
    [SerializeField] private Transform _target;

    private NavMeshAgent _agent;

    private void Awake()
    {
        _agent = GetComponent<NavMeshAgent>();
    }

    private void Start()
    {
        _agent.SetDestination(_target.position);
    }

    private void Update()
    {
        if (!_agent.pathPending && _agent.remainingDistance < 0.5f)
        {
            Debug.Log("Дошёл");
        }
    }
}
```

`SetDestination` запускает построение пути. Агент сам поворачивает и двигает
объект.

## Настройки агента

| Параметр | Что делает |
|---|---|
| `speed` | скорость |
| `angularSpeed` | скорость поворота |
| `acceleration` | ускорение |
| `stoppingDistance` | дистанция остановки |
| `areaMask` | какие зоны доступны |
| `autoBraking` | тормозить у цели |

Для патруля отключите `autoBraking`, чтобы агент плавно шёл между точками.

## Динамические препятствия

`NavMeshObstacle` с включённым **Carve** вырезает область из NavMesh. Агенты
перестраивают путь вокруг. Для движущихся объектов это удобнее, чем
перезапекать всю сцену.

## Частые ошибки

- **Нет NavMesh.** Агент стоит или выдаёт ошибку.
- **Агент вне NavMesh.** Поставьте его на синюю зону.
- **Слишком большой радиус.** Агент не проходит в двери.
- **`SetDestination` каждый кадр.** Путь пересчитывается постоянно.
- **Забыли `using UnityEngine.AI`.** Классы не найдены.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `SetDestination`?",
  "options": [
    {
      "text": "Запускает построение пути к точке",
      "correct": true,
      "explanation": "Агент начинает движение к цели."
    },
    {
      "text": "Запекает NavMesh",
      "correct": false,
      "explanation": "Запекание делает NavMeshSurface."
    },
    {
      "text": "Создаёт коллайдер",
      "correct": false,
      "explanation": "Коллайдеры не связаны с SetDestination."
    }
  ],
  "explanation": "`SetDestination` задаёт цель для NavMeshAgent."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно для навигации?",
  "options": [
    {
      "text": "Запечённый NavMesh",
      "correct": true
    },
    {
      "text": "`NavMeshAgent` на персонаже",
      "correct": true
    },
    {
      "text": "Цель и вызов `SetDestination`",
      "correct": true
    },
    {
      "text": "Удалить все коллайдеры",
      "correct": false,
      "explanation": "Коллайдеры помогают запекать препятствия."
    }
  ],
  "explanation": "NavMesh, агент и цель — минимум для навигации."
}
```

## Куда дальше

- [Addressables](theme.html?path=content/unity/prodvinutye-temy/addressables.md)
- [UI Toolkit](theme.html?path=content/unity/prodvinutye-temy/ui-toolkit.md)
- [Продвинутые темы: итог](theme.html?path=content/unity/prodvinutye-temy/itog-prodvinutye-temy.md)
