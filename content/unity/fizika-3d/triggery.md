---
title: Триггеры
description: isTrigger, события OnTriggerEnter, Stay и Exit, требования к Rigidbody и фильтрация по слоям.
keywords: Unity триггер, isTrigger, OnTriggerEnter, OnTriggerStay, OnTriggerExit, Collider, Rigidbody, LayerMask

---

# Триггеры

Триггер — это коллайдер, который замечает пересечение, но не толкает тела. Он
нужен для зон, дверей, монет, чекпоинтов и любой логики «объект оказался
внутри». Визуально граница триггера не видна, но события приходят так же
надёжно, как столкновения.

## isTrigger

Флажок **Is Trigger** в инспекторе коллайдера превращает его в триггер. Физика
перестаёт реагировать на контакт, но продолжает отслеживать пересечение.

```csharp
using UnityEngine;

public class TriggerZone : MonoBehaviour
{
    private void OnTriggerEnter(Collider other)
    {
        Debug.Log($"В зоне: {other.name}");
    }
}
```

Триггеры не создают отталкивания: объект проходит сквозь, а игра получает
событие. Это главное отличие от `OnCollision*`.

## События

- `OnTriggerEnter(Collider other)` — объект вошёл в зону;
- `OnTriggerStay(Collider other)` — находится в ней каждый физический шаг;
- `OnTriggerExit(Collider other)` — вышел.

`Stay` вызывается часто. Если нужно сработать один раз, храните флаг или
удаляйте объект после первого срабатывания.

## Кто должен иметь Rigidbody

Для событий триггера нужен хотя бы один `Rigidbody` у пары. Подходит и
кинематическое тело. Статический триггер и статический коллайдер событий не
дадут.

Наиболее частая схема:

- у игрока есть `Rigidbody` и коллайдер;
- у монеты есть триггер-коллайдер без `Rigidbody`;
- при входе игрока приходит `OnTriggerEnter`.

Если триггер должен двигаться, ему нужен `Rigidbody` с `isKinematic`.

## Слои и фильтрация

Триггеры подчиняются **Layer Collision Matrix**: если слой игрока и слой зоны
не сталкиваются, событий не будет. Внутри обработчика всё равно проверяйте,
кто именно вошёл.

```csharp
private void OnTriggerEnter(Collider other)
{
    if (!other.CompareTag("Player"))
    {
        return;
    }

    // Сработало только для игрока.
}
```

`CompareTag` требует существующего тега. Если тег не задан, Unity бросит
исключение. Альтернатива — проверить слой через `LayerMask`.

## Пример: подбор предмета

```csharp
using UnityEngine;
using UnityEngine.Events;

public class Pickup : MonoBehaviour
{
    [SerializeField] private UnityEvent _onPicked;

    private void OnTriggerEnter(Collider other)
    {
        if (!other.CompareTag("Player"))
        {
            return;
        }

        _onPicked.Invoke();
        Destroy(gameObject);
    }
}
```

`UnityEvent` позволяет назначить реакцию в инспекторе: прибавить счёт, включить
звук, обновить UI. Скрипт монеты не зависит от конкретного класса игрока.

## Частые ошибки

- **Триггер без `Rigidbody` у пары.** Событий не будет.
- **Ждут отталкивания от триггера.** Его нет по определению.
- **Статический триггер и статический объект.** Нужен динамический или
  кинематический `Rigidbody`.
- **`Destroy` в `OnTriggerStay`.** Метод вызовется несколько раз; объект может
  сработать дважды.
- **Забыли тег.** `CompareTag` на несуществующем теге бросит исключение.
- **Слой исключён в матрице.** Событие не придёт, даже если геометрия
  пересекается.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает коллайдер с включённым isTrigger?",
  "options": [
    {
      "text": "Замечает пересечение, но не толкает тело",
      "correct": true,
      "explanation": "Триггер вызывает события без физического отклика."
    },
    {
      "text": "Толкает тело сильнее обычного коллайдера",
      "correct": false,
      "explanation": "Триггеры не участвуют в разрешении контактов."
    },
    {
      "text": "Отключает объект полностью",
      "correct": false,
      "explanation": "Объект остаётся активным, меняется только поведение коллайдера."
    }
  ],
  "explanation": "Триггер — это зона событий, а не физическая поверхность."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про события триггера?",
  "options": [
    {
      "text": "Нужен хотя бы один Rigidbody у пары",
      "correct": true
    },
    {
      "text": "`OnTriggerStay` вызывается каждый физический шаг",
      "correct": true
    },
    {
      "text": "Слои участников должны сталкиваться",
      "correct": true
    },
    {
      "text": "Триггер отталкивает динамические тела",
      "correct": false,
      "explanation": "Отталкивание — работа обычных коллайдеров."
    }
  ],
  "explanation": "Триггеры дают события, но не меняют движение тел."
}
```

## Куда дальше

- [Столкновения](theme.html?path=content/unity/fizika-3d/stolknoveniya.md)
- [Слои, маски, Raycast](theme.html?path=content/unity/fizika-3d/sloi-maski-raycast.md)
- [Кинематик и интерполяция](theme.html?path=content/unity/fizika-3d/kinematik-i-interpolyaciya.md)
