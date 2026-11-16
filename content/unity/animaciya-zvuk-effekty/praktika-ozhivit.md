---
title: Практика: оживить
description: Анимируем куб, добавляем звук и эффект частиц, запускаем всё по событию.
keywords: Unity практика, анимация, Animator, Animation Clip, AudioSource, Particle System, эффект

---

# Практика: оживить

Соберём объект, который двигается, звучит и выпускает частицы. Это упражнение
на Animator, AudioSource и Particle System.

## Что нужно сделать

1. Создать клип `Pulse`, который меняет масштаб куба.
2. Создать Animator Controller с состояниями `Idle` и `Pulse`.
3. Добавить `AudioSource` и клип.
4. Добавить `Particle System` и настроить вспышку.
5. Написать скрипт, который по нажатию клавиши запускает анимацию, звук и
   эффект.

## Решение 1. Клип Pulse

1. Выберите куб.
2. Откройте **Window → Animation → Animation**.
3. Нажмите **Create**, сохраните `Pulse` в `Assets/Animations`.
4. Включите запись.
5. На 0 секунде оставьте масштаб `1`.
6. На 0.5 секунды поставьте масштаб `1.3`.
7. На 1 секунду верните `1`.
8. Остановите запись.

В Inspector клипа включите **Loop Time**, если хотите повторять.

## Решение 2. Controller

1. В Animator Controller создайте состояния `Idle` и `Pulse`.
2. `Idle` сделайте состоянием по умолчанию.
3. Создайте параметр `Pulse` типа **Trigger**.
4. Сделайте переход `Idle → Pulse` с условием `Pulse`.
5. Сделайте переход `Pulse → Idle` с `Has Exit Time`.
6. В компоненте Animator назначьте Controller.

## Решение 3. Звук

1. Добавьте на куб **Audio Source**.
2. Перетащите короткий клип в **AudioClip**.
3. Выключите **Play On Awake**.
4. Оставьте `spatialBlend = 0` для простоты.

## Решение 4. Частицы

1. **GameObject → Effects → Particle System**.
2. Сделайте его дочерним у куба.
3. В **Main** выключите `Loop`, поставьте `Start Lifetime = 0.5`.
4. В **Emission** добавьте **Burst** на 20 частиц.
5. В **Shape** выберите `Sphere`.
6. В **Renderer** назначьте материал.
7. Выключите `Play On Awake`.

## Решение 5. Скрипт

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class PulseEffect : MonoBehaviour
{
    [SerializeField] private Animator _animator;
    [SerializeField] private AudioSource _audio;
    [SerializeField] private ParticleSystem _particles;

    private void Update()
    {
        if (Keyboard.current != null && Keyboard.current.spaceKey.wasPressedThisFrame)
        {
            Play();
        }
    }

    public void Play()
    {
        _animator.SetTrigger("Pulse");
        _audio.PlayOneShot(_audio.clip);
        _particles.Play();
    }
}
```

Повесьте скрипт на куб и назначьте ссылки в Inspector.

## Что должно получиться

- куб пульсирует;
- слышен короткий звук;
- появляется вспышка частиц;
- повторное нажатие снова запускает эффект;
- в Console нет ошибок.

## Частые ошибки

- **Анимация не запускается.** Нет параметра `Pulse` или перехода.
- **Звук не слышен.** Нет `AudioListener` на камере или клип пустой.
- **Частицы не видны.** Материал несовместим с URP или `Play On Awake`
  выключен, а `Play` не вызывается.
- **Эффект запускается каждый кадр.** Проверьте `wasPressedThisFrame`, а не
  `isPressed`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как запустить одноразовую анимацию по кнопке?",
  "options": [
    {
      "text": "Через `Animator.SetTrigger`",
      "correct": true,
      "explanation": "Trigger запускает переход один раз."
    },
    {
      "text": "Через `AudioSource.Play`",
      "correct": false,
      "explanation": "Это запускает звук."
    },
    {
      "text": "Через `ParticleSystem.Play`",
      "correct": false,
      "explanation": "Это запускает частицы."
    }
  ],
  "explanation": "`SetTrigger` — стандартный способ одноразового перехода."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно проверить, если эффект не работает?",
  "options": [
    {
      "text": "Назначен ли Animator Controller",
      "correct": true
    },
    {
      "text": "Есть ли `AudioListener` на камере",
      "correct": true
    },
    {
      "text": "Совместим ли материал частиц с URP",
      "correct": true
    },
    {
      "text": "Удалён ли `ProjectSettings`",
      "correct": false,
      "explanation": "`ProjectSettings` нельзя удалять."
    }
  ],
  "explanation": "Проверяем ссылки, слушатель, материал и настройки Play."
}
```

## Куда дальше

- [Анимация, звук и эффекты: итог](theme.html?path=content/unity/animaciya-zvuk-effekty/itog-animaciya-zvuk-effekty.md)
- [Animator](theme.html?path=content/unity/animaciya-zvuk-effekty/animator.md)
- [Particle System](theme.html?path=content/unity/animaciya-zvuk-effekty/particle-system.md)
