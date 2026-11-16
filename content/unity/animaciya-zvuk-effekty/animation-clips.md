---
title: Animation Clips
description: Анимационные клипы, ключевые кадры, кривые, loop и root motion.
keywords: Unity Animation Clip, ключевые кадры, Animation window, loop, root motion, кривые, анимация

---

# Animation Clips

**Animation Clip** — это ассет с анимацией: набор ключевых кадров для
Transform, компонентов или параметров материала. Animator Controller проигрывает
клипы и переключает их.

## Что внутри клипа

Клип хранит кривые:

- позицию, поворот и масштаб;
- значения компонентов;
- параметры материалов;
- события анимации.

Каждая кривая состоит из ключей: время и значение. Между ключами Unity
интерполирует значение.

<figure class="md-figure md-figure--center md-figure--small">
  <img
    src="content/unity/_assets/animaciya-zvuk-effekty/animation-clip.png"
    alt="Инспектор Animation Clip в Unity"
    width="375"
  >
  <figcaption>
    Animation Clip: длина, loop, скорость и кривые.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/AnimationClips.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Animation Clips
    </a>
  </figcaption>
</figure>

## Создание клипа

1. Выберите объект в Hierarchy.
2. Откройте **Window → Animation → Animation**.
3. Нажмите **Create** и сохраните клип в `Assets/Animations`.
4. Нажмите красную кнопку записи.
5. Переместите объект в Scene или измените свойство в Inspector.
6. Остановите запись.

Unity создаст Animator Controller и компонент Animator, если их не было.

## Loop и скорость

В Inspector клипа есть:

- **Loop Time** — повторять клип;
- **Loop Pose** — сглаживать стык;
- **Speed** — множитель скорости;
- **Cycle Offset** — смещение начала.

Для `Idle` и `Walk` обычно включают loop. Для `Jump` и `Attack` — нет.

## Root Motion

**Root Motion** позволяет анимации двигать персонажа. Если включить
`Apply Root Motion` у Animator, корневая кость будет перемещать объект.

Плюсы: движение точно совпадает с анимацией.
Минусы: сложнее контролировать скорость и коллизии.

Для простого персонажа на `CharacterController` часто отключают root motion и
двигают объект кодом.

## Код

```csharp
using UnityEngine;

public class AnimationSpeed : MonoBehaviour
{
    [SerializeField] private Animator _animator;
    [SerializeField] private float _normalSpeed = 1f;
    [SerializeField] private float _fastSpeed = 1.5f;

    public void SetFast(bool fast)
    {
        _animator.speed = fast ? _fastSpeed : _normalSpeed;
    }
}
```

`Animator.speed` меняет скорость всех клипов. Скорость конкретного состояния
можно задать в Controller.

## Частые ошибки

- **Клип не сохраняется.** Проверьте, что он лежит в `Assets`, а не во временной
  папке.
- **Loop не работает.** Включите `Loop Time` в клипе.
- **Анимация двигает объект, а код тоже двигает.** Конфликт root motion и
  скрипта.
- **Записали не тот компонент.** В Animation window видно, какие свойства
  анимируются.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что хранит Animation Clip?",
  "options": [
    {
      "text": "Ключевые кадры и кривые анимации",
      "correct": true,
      "explanation": "Клип — это набор кривых во времени."
    },
    {
      "text": "Настройки Rigidbody",
      "correct": false,
      "explanation": "Физика хранится в компоненте Rigidbody."
    },
    {
      "text": "Список сцен",
      "correct": false,
      "explanation": "Сцены — отдельные ассеты."
    }
  ],
  "explanation": "Animation Clip — ассет с кривыми и ключами."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Animation Clip?",
  "options": [
    {
      "text": "Loop Time повторяет клип",
      "correct": true
    },
    {
      "text": "Root Motion может двигать персонажа",
      "correct": true
    },
    {
      "text": "Клип можно создать в Animation window",
      "correct": true
    },
    {
      "text": "Клип обязательно должен быть в `Library`",
      "correct": false,
      "explanation": "Клипы лежат в `Assets`."
    }
  ],
  "explanation": "Клипы создаются в Animation window и хранятся в Assets."
}
```

## Куда дальше

- [Animation Events](theme.html?path=content/unity/animaciya-zvuk-effekty/animation-events.md)
- [Animator](theme.html?path=content/unity/animaciya-zvuk-effekty/animator.md)
- [Практика: оживить](theme.html?path=content/unity/animaciya-zvuk-effekty/praktika-ozhivit.md)
