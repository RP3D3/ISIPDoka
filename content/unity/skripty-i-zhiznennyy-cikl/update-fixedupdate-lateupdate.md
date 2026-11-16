---
title: Update, FixedUpdate, LateUpdate
description: Чем отличаются Update, FixedUpdate и LateUpdate, куда писать физику и как не сломать движение камеры.
keywords: Unity Update, FixedUpdate, LateUpdate, Time.deltaTime, fixedDeltaTime, Rigidbody, физика, камера

---

# Update, FixedUpdate, LateUpdate

В Unity несколько методов обновления. Они вызываются в разное время и для разных
задач. Если писать физику в `Update`, объект может дёргаться. Если двигать камеру
в `Update`, она может отставать от персонажа.

## Update

`Update` вызывается **каждый кадр**. Частота зависит от FPS: 60 кадров в секунду
или 144 — количество вызовов будет разным.

В `Update` обычно:

- читают ввод;
- двигают объекты без физики;
- обновляют таймеры и UI;
- вращают камеру мышью.

```csharp
private void Update()
{
    float horizontal = Input.GetAxis("Horizontal");
    transform.Translate(Vector3.right * horizontal * 5f * Time.deltaTime);
}
```

`Time.deltaTime` — время с прошлого кадра. Умножение на него делает движение
независимым от FPS.

## FixedUpdate

`FixedUpdate` вызывается с **фиксированным шагом физики**. По умолчанию это
`0.02` секунды, то есть 50 раз в секунду. Этот шаг настраивается в
`Project Settings → Time → Fixed Timestep`.

В `FixedUpdate` обычно:

- двигают `Rigidbody`;
- применяют силы;
- делают физические проверки;
- работают с `Rigidbody2D`.

```csharp
private void FixedUpdate()
{
    _rigidbody.MovePosition(_rigidbody.position + Vector3.forward * 2f * Time.fixedDeltaTime);
}
```

Для физики используйте `Time.fixedDeltaTime`, а не `Time.deltaTime`.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/skripty-i-zhiznennyy-cikl/update-fixed.svg"
    alt="Схема: Update вызывается каждый кадр, FixedUpdate — с фиксированным шагом физики"
    width="900"
  >
  <figcaption>
    `Update` зависит от FPS, `FixedUpdate` — от настройки физики.
  </figcaption>
</figure>

## LateUpdate

`LateUpdate` вызывается после всех `Update` в кадре. Он нужен, когда что-то
должно обновиться **после** движения других объектов.

Классический пример — камера от третьего лица:

```csharp
private void LateUpdate()
{
    transform.position = _target.position + _offset;
}
```

Если двигать камеру в `Update`, она может использовать позицию персонажа до
того, как персонаж переместился, и картинка будет дёргаться.

## Что куда писать

| Задача | Метод |
|---|---|
| Чтение ввода | `Update` |
| Движение `Rigidbody` | `FixedUpdate` |
| Применение силы | `FixedUpdate` |
| Следование камеры | `LateUpdate` |
| Таймер и UI | `Update` |
| Поворот мышью | `Update` или `LateUpdate` |

## Частые ошибки

- **Двигают `Rigidbody` через `transform.position` в `Update`.** Физика может
  конфликтовать с телепортацией.
- **Используют `Time.deltaTime` в `FixedUpdate`.** Там нужен
  `Time.fixedDeltaTime`.
- **Делают камеру в `Update`.** Лучше `LateUpdate`.
- **Думают, что `FixedUpdate` вызывается ровно 50 раз в секунду всегда.** При
  лагах Unity может вызвать его несколько раз за кадр.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Куда лучше писать движение `Rigidbody`?",
  "options": [
    {
      "text": "В `FixedUpdate`",
      "correct": true,
      "explanation": "Физика синхронизирована с фиксированным шагом."
    },
    {
      "text": "В `LateUpdate`",
      "correct": false,
      "explanation": "`LateUpdate` — для камеры и пост-обработки."
    },
    {
      "text": "В `Awake`",
      "correct": false,
      "explanation": "`Awake` — инициализация, а не цикл движения."
    }
  ],
  "explanation": "`Rigidbody` двигают в `FixedUpdate` через физические методы."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про методы обновления?",
  "options": [
    {
      "text": "`Update` зависит от FPS",
      "correct": true
    },
    {
      "text": "`FixedUpdate` использует фиксированный шаг физики",
      "correct": true
    },
    {
      "text": "`LateUpdate` вызывается после `Update`",
      "correct": true
    },
    {
      "text": "`FixedUpdate` вызывается ровно один раз за кадр",
      "correct": false,
      "explanation": "При лагах он может вызываться несколько раз за кадр."
    }
  ],
  "explanation": "`Update` — кадры, `FixedUpdate` — физика, `LateUpdate` — после кадра."
}
```

## Куда дальше

- [Поля в Inspector](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/polya-v-inspector.md)
- [Time и корутины](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/time-i-korutiny.md)
- [Практика: жизненный цикл](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/praktika-zhiznennyy-cikl.md)
