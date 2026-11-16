---
title: linearVelocity
description: Прямое управление скоростью Rigidbody: движение персонажа, прыжок, ограничение скорости и совместимость Unity 6 с 2022.3.
keywords: Unity linearVelocity, velocity, Rigidbody скорость, прыжок, FixedUpdate, ClampMagnitude, RigidbodyCompat

---

# linearVelocity

`Rigidbody.linearVelocity` — текущая скорость тела в мировых координатах,
измеряется в метрах в секунду. Это самый прямой способ задать движение: в
отличие от `AddForce`, вы не просите движок ускорить тело, а сразу говорите,
с какой скоростью оно должно двигаться.

## Скорость тела

Свойство читается и записывается как `Vector3`. Гравитация и столкновения
продолжают работать, но при следующей записи вы заменяете всю скорость целиком.

```csharp
Vector3 v = _rb.linearVelocity;
v.y = 5f;              // вверх
_rb.linearVelocity = v;
```

Если написать `_rb.linearVelocity = Vector3.zero`, тело остановится по всем
осям, включая падение. Поэтому при горизонтальном движении вертикальную
составляющую сохраняют.

## Unity 6 и 2022.3

| Версия | Свойство |
|---|---|
| Unity 2022.3 | `Rigidbody.velocity` |
| Unity 6 | `Rigidbody.linearVelocity` |

Чтобы пример работал в обеих версиях, различия прячут в одном helper-классе.

```csharp
using UnityEngine;

public static class RigidbodyVelocity
{
    public static Vector3 Get(Rigidbody rb)
    {
#if UNITY_6000_0_OR_NEWER
        return rb.linearVelocity;
#else
        return rb.velocity;
#endif
    }

    public static void Set(Rigidbody rb, Vector3 value)
    {
#if UNITY_6000_0_OR_NEWER
        rb.linearVelocity = value;
#else
        rb.velocity = value;
#endif
    }
}
```

Дальше в коде используется только `RigidbodyVelocity.Get/Set`, и тема версий
перестаёт мешать чтению логики.

## Горизонтальное движение

Типовая схема для персонажа: взять текущую скорость, заменить `x` и `z` по
вводу, оставить `y` как есть. Так прыжок и падение остаются на физике.

```csharp
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class PlayerMove : MonoBehaviour
{
    [SerializeField] private float _speed = 6f;
    private Rigidbody _rb;
    private Vector3 _move; // заполняется из Input System

    private void Awake()
    {
        _rb = GetComponent<Rigidbody>();
    }

    private void FixedUpdate()
    {
        Vector3 velocity = RigidbodyVelocity.Get(_rb);
        velocity.x = _move.x * _speed;
        velocity.z = _move.z * _speed;
        RigidbodyVelocity.Set(_rb, velocity);
    }
}
```

`_move` — это направление в мировых осях, полученное из ввода. Если персонаж
поворачивается, направление нужно привести к его локальным осям через
`transform.TransformDirection`.

## Прыжок

Прыжок через скорость — это замена вертикальной составляющей. Горизонтальная
скорость сохраняется, поэтому прыжок в движении выглядит естественно.

```csharp
public void Jump()
{
    Vector3 velocity = RigidbodyVelocity.Get(_rb);
    velocity.y = 7f;
    RigidbodyVelocity.Set(_rb, velocity);
}
```

Проверку «стою ли на земле» делают отдельно, обычно через `Physics.Raycast`.
Без неё прыжок сработает и в воздухе.

## Ограничение скорости

`Vector3.ClampMagnitude` не даёт разогнаться выше заданного предела. Это проще,
чем обнулять скорость при достижении порога.

```csharp
[SerializeField] private float _maxSpeed = 10f;

private void FixedUpdate()
{
    Vector3 velocity = RigidbodyVelocity.Get(_rb);
    velocity = Vector3.ClampMagnitude(velocity, _maxSpeed);
    RigidbodyVelocity.Set(_rb, velocity);
}
```

Ограничение по всем осям сразу может мешать падению: тело с ограничением `10`
будет падать не быстрее `10 м/с`. Если нужен только горизонтальный предел,
ограничивайте `x` и `z` отдельно.

## Частые ошибки

- **Меняют скорость в `Update`.** Физику двигают в `FixedUpdate`, иначе
  результат зависит от FPS.
- **Каждый кадр обнуляют `y`.** Персонаж перестаёт падать и прыгать.
- **Пишут `velocity` в Unity 6.** Свойство переименовано в `linearVelocity`;
  старый код нужно обновить или спрятать за `#if`.
- **Задают скорость кинематическому телу.** Для `isKinematic` используйте
  `MovePosition` и `MoveRotation`.
- **Смешивают `AddForce` и прямую запись скорости.** Силы накапливаются, но
  очередная запись скорости их перекрывает.
- **Нормализуют ввод без ограничения.** По диагонали скорость может оказаться
  больше, чем по осям.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как называется свойство скорости Rigidbody в Unity 6?",
  "options": [
    {
      "text": "`linearVelocity`",
      "correct": true,
      "explanation": "В Unity 6 `velocity` переименовали в `linearVelocity`."
    },
    {
      "text": "`velocity`",
      "correct": false,
      "explanation": "Это имя использовалось в Unity 2022.3 и более ранних версиях."
    },
    {
      "text": "`speed`",
      "correct": false,
      "explanation": "У Rigidbody нет свойства `speed`."
    }
  ],
  "explanation": "В 2022.3 — `velocity`, в Unity 6 — `linearVelocity`; различие прячут за `#if`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про linearVelocity?",
  "options": [
    {
      "text": "Измеряется в метрах в секунду",
      "correct": true
    },
    {
      "text": "Задаёт скорость в мировых координатах",
      "correct": true
    },
    {
      "text": "Запись заменяет текущую скорость целиком",
      "correct": true
    },
    {
      "text": "Двигает кинематическое тело",
      "correct": false,
      "explanation": "Для `isKinematic` используют `MovePosition` и `MoveRotation`."
    }
  ],
  "explanation": "Скорость — мировая, в м/с; при записи вы заменяете все три компоненты."
}
```

## Куда дальше

- [AddForce и ForceMode](theme.html?path=content/unity/fizika-3d/addforce-i-forcemode.md)
- [Кинематик и интерполяция](theme.html?path=content/unity/fizika-3d/kinematik-i-interpolyaciya.md)
- [Слои, маски, Raycast](theme.html?path=content/unity/fizika-3d/sloi-maski-raycast.md)
