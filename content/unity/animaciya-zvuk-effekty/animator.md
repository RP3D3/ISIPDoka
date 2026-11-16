---
title: Animator
description: Компонент Animator, Animator Controller, параметры и переходы между состояниями.
keywords: Unity Animator, Animator Controller, параметры, SetFloat, SetBool, SetTrigger, состояния, переходы

---

# Animator

`Animator` — компонент, который проигрывает анимации и переключает состояния.
Он работает с **Animator Controller** — графом состояний и переходов.

## Как устроен Animator

У компонента есть:

- **Controller** — ассет Animator Controller;
- **Avatar** — для гуманоидных моделей;
- **Apply Root Motion** — двигать ли объект из анимации;
- **Update Mode** — когда обновлять анимацию;
- **Culling Mode** — когда останавливать анимацию вне камеры.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/animaciya-zvuk-effekty/animation-overview.jpg"
    alt="Схема работы анимации в Unity: клипы, Animator Controller и персонаж"
    width="900"
  >
  <figcaption>
    Клипы анимации, Animator Controller и компонент Animator работают вместе.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/AnimationOverview.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Animation Overview
    </a>
  </figcaption>
</figure>

## Animator Controller

Controller — это граф:

- **States** — состояния (`Idle`, `Walk`, `Jump`);
- **Transitions** — переходы между состояниями;
- **Parameters** — параметры, которые меняет код;
- **Layers** — слои анимации;
- **Sub-state machines** — вложенные группы состояний.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/animaciya-zvuk-effekty/animator-controller.png"
    alt="Окно Animator Controller с состояниями и переходами"
    width="739"
  >
  <figcaption>
    Animator Controller: состояния, переходы и параметры.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/Animator.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Animator
    </a>
  </figcaption>
</figure>

## Параметры

В Controller можно создать параметры:

- `Float` — скорость, направление;
- `Int` — режим, оружие;
- `Bool` — на земле, присел;
- `Trigger` — прыжок, атака.

```csharp
using UnityEngine;

public class PlayerAnimator : MonoBehaviour
{
    [SerializeField] private Animator _animator;
    [SerializeField] private float _speed;

    private void Update()
    {
        _animator.SetFloat("Speed", _speed);
        _animator.SetBool("IsGrounded", true);
    }

    public void Jump()
    {
        _animator.SetTrigger("Jump");
    }
}
```

`SetTrigger` сбрасывается автоматически после перехода. `SetBool` и `SetFloat`
хранят значение, пока вы его не измените.

## Переходы

У перехода есть:

- **Has Exit Time** — ждать ли конца клипа;
- **Transition Duration** — длительность смешивания;
- **Conditions** — условия по параметрам;
- **Interruption Source** — можно ли прервать переход.

Для прыжка обычно отключают **Has Exit Time** и ставят условие `Jump = true`,
чтобы анимация начиналась сразу.

## Частые ошибки

- **Меняют параметр, которого нет в Controller.** Будет ошибка в Console.
- **Забыли про `Has Exit Time`.** Переход ждёт конца клипа и кажется
  «заторможенным».
- **Путают Trigger и Bool.** Trigger — одноразовый импульс, Bool — состояние.
- **Не назначают Controller.** Animator ничего не проигрывает.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что хранит Animator Controller?",
  "options": [
    {
      "text": "Состояния, переходы и параметры",
      "correct": true,
      "explanation": "Это граф анимации."
    },
    {
      "text": "Только текстуры",
      "correct": false,
      "explanation": "Текстуры — отдельные ассеты."
    },
    {
      "text": "Настройки физики",
      "correct": false,
      "explanation": "Физика настраивается в Rigidbody и Project Settings."
    }
  ],
  "explanation": "Animator Controller описывает состояния и переходы."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про параметры Animator?",
  "options": [
    {
      "text": "`SetFloat` задаёт числовой параметр",
      "correct": true
    },
    {
      "text": "`SetBool` задаёт логический параметр",
      "correct": true
    },
    {
      "text": "`SetTrigger` запускает одноразовый переход",
      "correct": true
    },
    {
      "text": "Параметр можно использовать без создания в Controller",
      "correct": false,
      "explanation": "Параметр должен существовать в Controller."
    }
  ],
  "explanation": "Код меняет только те параметры, которые созданы в Controller."
}
```

## Куда дальше

- [Animation Clips](theme.html?path=content/unity/animaciya-zvuk-effekty/animation-clips.md)
- [Animation Events](theme.html?path=content/unity/animaciya-zvuk-effekty/animation-events.md)
- [Практика: оживить](theme.html?path=content/unity/animaciya-zvuk-effekty/praktika-ozhivit.md)
