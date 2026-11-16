---
title: Animation Events
description: Вызов методов из анимационного клипа: шаги, удары, звуки и эффекты в нужный момент.
keywords: Unity Animation Events, AnimationEvent, вызов метода, клип, звук, эффект, тайминг

---

# Animation Events

**Animation Event** — точка на таймлайне клипа, которая вызывает метод в коде.
Она нужна, когда действие должно произойти в конкретный момент анимации: шаг,
удар, выстрел, звук или вспышка.

## Зачем нужны события

Анимация длится, например, 1.2 секунды. Удар должен произойти на 0.6 секунды, а
звук — на 0.65. Таймер в `Update` привязан к времени, а событие — к самому клипу.
Если клип ускорят или заменят, событие останется в нужной точке.

## Добавление события

1. Откройте Animation window с клипом.
2. Поставьте курсор на нужное время.
3. Нажмите **Add Event**.
4. В Inspector события укажите **Function**.
5. При необходимости добавьте параметр: `float`, `int`, `string` или `Object`.

## Метод

Событие вызывает метод на объекте, у которого есть `Animator`. Метод должен
быть доступен для вызова из анимации; надёжнее делать его `public`.

```csharp
using UnityEngine;

public class AnimationEventReceiver : MonoBehaviour
{
    public void OnFootstep()
    {
        Debug.Log("Шаг");
    }

    public void OnHit(float damage)
    {
        Debug.Log($"Удар на {damage} урона");
    }

    public void OnEffect(GameObject effectPrefab)
    {
        Instantiate(effectPrefab, transform.position, Quaternion.identity);
    }
}
```

## Пример: удар

1. Создайте клип `Attack`.
2. На 0.4 секунды добавьте событие `OnHit`.
3. В параметр передайте `10`.
4. В методе `OnHit` нанесите урон.

Так урон не зависит от FPS и срабатывает точно в момент замаха.

## Пример: звук шага

1. Добавьте событие `OnFootstep` в клип `Walk`.
2. В методе проиграйте `AudioSource.PlayOneShot`.
3. Поставьте события на моменты касания земли.

## Частые ошибки

- **Метод не найден.** Имя в событии не совпадает с методом.
- **Метод на другом объекте.** Событие ищет метод на объекте с Animator.
- **Неверная сигнатура.** Если в событии передан `float`, метод должен принимать
  `float`.
- **Слишком много событий.** Каждое событие — вызов; не стоит делать их каждый
  кадр.
- **Событие срабатывает дважды.** Проверьте, не дублируется ли оно в клипе.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где ищется метод для Animation Event?",
  "options": [
    {
      "text": "На объекте с компонентом Animator",
      "correct": true,
      "explanation": "Событие вызывает метод на анимированном объекте."
    },
    {
      "text": "В любом скрипте проекта",
      "correct": false,
      "explanation": "Unity не ищет метод по всему проекту."
    },
    {
      "text": "В папке `Library`",
      "correct": false,
      "explanation": "`Library` — служебный кэш."
    }
  ],
  "explanation": "Animation Event вызывает метод на объекте с Animator."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что можно делать через Animation Event?",
  "options": [
    {
      "text": "Проигрывать звук шага",
      "correct": true
    },
    {
      "text": "Наносить урон в момент удара",
      "correct": true
    },
    {
      "text": "Создавать эффект вспышки",
      "correct": true
    },
    {
      "text": "Менять настройки проекта",
      "correct": false,
      "explanation": "События предназначены для игровой логики в моменте анимации."
    }
  ],
  "explanation": "События синхронизируют логику, звук и эффекты с анимацией."
}
```

## Куда дальше

- [AudioSource](theme.html?path=content/unity/animaciya-zvuk-effekty/audiosource.md)
- [Animation Clips](theme.html?path=content/unity/animaciya-zvuk-effekty/animation-clips.md)
- [Практика: оживить](theme.html?path=content/unity/animaciya-zvuk-effekty/praktika-ozhivit.md)
